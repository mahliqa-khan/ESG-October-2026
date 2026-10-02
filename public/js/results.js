import { state, getAssessment, setStatus, assign, navigate } from "./store.js";
import { assessmentResult } from "./scoring.js";
import { esc, STATUS_LABEL } from "./ui.js";
import {
  scoreCard, topicHeatmap, riskTable, provenanceTable, legend, barRow, bandColor,
} from "./dashboard.js";

const NEXT = { draft: "submitted", submitted: "reviewed", reviewed: "approved" };
const NEXT_LABEL = {
  draft: "Submit for review",
  submitted: "Mark reviewed",
  reviewed: "Approve",
};

export function resultsView(id) {
  const a = getAssessment(id);
  if (!a) return `<section class="panel"><p>Assessment not found.</p></section>`;
  const fw = state.framework;
  const result = assessmentResult(a, fw);

  const pillarCards = fw.pillars
    .map((p) => {
      const s = result.pillars[p.id];
      if (!s) return "";
      const band = result.results.filter((r) => r.pillar === p.id)
        .reduce((worst, r) => (r.residual > worst.residual ? r : worst), { residual: 0 }).band;
      return scoreCard(p.name, s.score, band, `${s.topicsAnswered}/${s.topics} topics`);
    })
    .join("");

  const next = NEXT[a.status];
  const gate = a.status === "approved"
    ? `<div class="banner ok">Approved by ${esc(a.approver)}. Answers are locked.</div>`
    : `<button class="btn primary" data-action="advance" data-next="${next}">
         ${NEXT_LABEL[a.status]}</button>`;

  return `
    <section class="panel">
      <div class="panel-head">
        <div>
          <h2>${esc(a.investee)} — results</h2>
          <div class="muted">${esc(a.period || "")} · holding ${(a.holdingWeight || 0).toFixed(1)}% ·
            <span class="pill" style="background:#334155">${esc(STATUS_LABEL[a.status])}</span></div>
        </div>
        <div class="head-actions">
          <a class="btn" href="#/assessment/${a.id}">Questionnaire</a>
          <button class="btn" data-action="export">Export JSON</button>
        </div>
      </div>

      <div class="score-cards">
        ${scoreCard("Residual risk", result.overall, result.band.label, `${Math.round(result.coverage * 100)}% coverage`)}
        ${pillarCards}
      </div>
      <div class="banner">${esc(result.band.action)}</div>

      ${a.status === "approved" ? "" : `
      <div class="workflow">
        <div class="wf-field">
          <label>Reviewer</label>
          <input data-assign="reviewer" value="${esc(a.reviewer)}" placeholder="name" />
        </div>
        <div class="wf-field">
          <label>Approver</label>
          <input data-assign="approver" value="${esc(a.approver)}" placeholder="name" />
        </div>
        <div class="wf-gate">${gate}</div>
      </div>
      <div class="muted small" data-error></div>`}

      ${legend()}
      <h3>Risk by topic</h3>
      ${topicHeatmap(result.results, fw)}
      <h3>Priority actions</h3>
      ${riskTable(result.results)}

      <h3>Provenance / audit trail</h3>
      <div class="muted small">Framework version ${esc(a.frameworkVersion)} ·
        created ${new Date(a.createdAt).toLocaleString()} · updated ${new Date(a.updatedAt).toLocaleString()}</div>
      ${provenanceTable(a)}
    </section>`;
}

export function bindResults(root, id) {
  root.querySelectorAll("[data-assign]").forEach((input) => {
    input.addEventListener("change", () => assign(id, input.dataset.assign, input.value.trim()));
  });
  const advance = root.querySelector('[data-action="advance"]');
  if (advance) {
    advance.addEventListener("click", () => {
      const res = setStatus(id, advance.dataset.next);
      if (res && res.error) {
        const err = root.querySelector("[data-error]");
        if (err) err.textContent = res.error;
      }
    });
  }
  const exp = root.querySelector('[data-action="export"]');
  if (exp) {
    exp.addEventListener("click", () => {
      const a = getAssessment(id);
      const blob = new Blob([JSON.stringify(a, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${a.investee.replace(/\s+/g, "-").toLowerCase()}-assessment.json`;
      link.click();
      URL.revokeObjectURL(url);
    });
  }
}

export { barRow, bandColor, navigate };
