import { state, getAssessment, setStatus, assign, navigate } from "./store.js";
import { assessmentResult, answerParts, optionFor, evidenceTierFor, bandFor } from "./scoring.js";
import { esc, STATUS_LABEL, unitLabel, industryIndex } from "./ui.js";
import {
  scoreCard, riskTable, provenanceTable, legend, barRow, bandColor,
  sasbTopicName,
} from "./dashboard.js";

const NEXT = { draft: "submitted", submitted: "reviewed", reviewed: "approved" };
const NEXT_LABEL = {
  draft: "Submit for review",
  submitted: "Mark reviewed",
  reviewed: "Approve",
};

function evidenceTable(a, fw) {
  const rows = [];
  fw.topics.forEach((t) => {
    t.questions.forEach((q) => {
      if (q.scored === false) return;
      const { value, evidence, source } = answerParts((a.answers || {})[q.id]);
      if (value === undefined || value === null || value === "") return;
      const option = optionFor(q, value, fw);
      if (!option) return;
      const tier = evidenceTierFor(evidence, fw);
      const penalty = tier && typeof tier.penalty === "number" ? tier.penalty : 0;
      const effective = Math.max(1, option.score - penalty);
      const discount = penalty > 0;
      rows.push(`<tr>
        <td>${esc(t.name)}</td>
        <td>${esc(option.label)}</td>
        <td><span class="pill" style="background:${discount ? "#b45309" : "#334155"}">${esc(tier ? tier.label : "—")}</span></td>
        <td>${esc(source || "")}</td>
        <td class="num">${option.score.toFixed(2)}</td>
        <td class="num">${discount ? `<s>${option.score.toFixed(2)}</s> ` : ""}${effective.toFixed(2)}</td>
      </tr>`);
    });
  });
  if (!rows.length) return "";
  return `<h3>Answer evidence</h3>
    <div class="muted small">A claim scores below proof of the same claim: the last column is the
      maturity score after the evidence discount.</div>
    <table class="table evidence-table">
      <thead><tr><th>Topic</th><th>Answer</th><th>Evidence</th><th>Source</th><th>Score</th><th>Effective</th></tr></thead>
      <tbody>${rows.join("")}</tbody>
    </table>`;
}

function howToRead(fw, result) {
  const pillarList = fw.pillars
    .map((p) => `<li><strong>${esc(p.name)}</strong> — ${esc(p.description || "")}</li>`)
    .join("");
  const max = (fw.scoreScale && fw.scoreScale.max) || 5;
  const bandList = (fw.riskBands || [])
    .map((b, i) => {
      const from = i === 0 ? 0 : (fw.riskBands[i - 1].max + 0.01);
      return `<li><strong>${esc(b.label)}</strong> — ${from.toFixed(2)} to ${b.max > max ? max.toFixed(2) : b.max.toFixed(2)}: ${esc(b.action)}</li>`;
    })
    .join("");
  return `
    <section class="explain-panel">
      <h3>How to read this page</h3>
      <p>Every score on this page is on a scale of <strong>0 to ${max}</strong>, where
        <strong>0 is no risk</strong> and <strong>${max} is the highest risk</strong>. A score of
        ${max} means the issue is fully exposed and the company is doing nothing about it; 0 means
        the risk is fully managed away.</p>
      <p><strong>Residual risk</strong> is the risk that is <em>left over</em> after allowing for how
        well the company manages each issue. Every topic has two parts:</p>
      <ul>
        <li><strong>Exposure</strong> — how much this issue matters for the industry (set from the
          SASB Standards: listed = 5, not listed = 2). It does not change company to company.</li>
        <li><strong>Maturity</strong> — how well the company manages it, from the questionnaire
          answers (after the evidence discount). Higher is better.</li>
      </ul>
      <p class="muted">A topic with high exposure and weak management leaves a high residual risk.
        Topics with no answers fall back to exposure only.</p>
      <p>Scores map to risk bands as follows:</p>
      <ul>${bandList}</ul>
      <p>The result is grouped into three pillars:</p>
      <ul>${pillarList}</ul>
    </section>`;
}

function sasbScope(a, fw, result) {
  const units = a.industries || a.sectors || a.sector;
  const idx = industryIndex(fw);
  const codes = (Array.isArray(units) ? units : [{ id: units, weight: 100 }])
    .map((u) => (typeof u === "string" ? u : u.id))
    .filter(Boolean);
  const listed = result.results.filter((r) => r.exposure >= 3);
  const notListed = result.results.filter((r) => r.exposure < 3);

  const industryLine = codes
    .map((c) => {
      const meta = idx[c];
      return `<span class="scope-ind">${esc(meta ? meta.name : c)} <code>${esc(c)}</code></span>`;
    })
    .join(", ");

  const listedRows = listed
    .map((r) => {
      const sasb = sasbTopicName(r.topicId, fw);
      return `<tr>
        <td>${esc(r.name)}</td>
        <td>${esc(sasb || "—")}</td>
        <td class="num">${r.exposure}</td>
        <td class="num"><strong>${r.residual.toFixed(2)}</strong></td>
      </tr>`;
    })
    .join("");

  const notListedLine = notListed.length
    ? `<div class="muted small">Not material for this industry under SASB (exposure 2):
        ${notListed.map((r) => esc(r.name)).join(", ")}.</div>`
    : "";

  return `
    <section class="scope-panel">
      <h3>Scope — what applies to this company</h3>
      <div class="scope-source">Industry per <strong>SASB Standards</strong> (IFRS Foundation):
        ${industryLine || "not set"}.</div>
      <div class="muted small">The topics below are the SASB disclosure topics for this industry.
        Our topic list and these mappings were fact-checked against the SASB Standards
        (framework v${esc(fw.version)}). Topics SASB does not list are still asked, but carry low
        exposure and do not drive the result.</div>
      <table class="table">
        <thead><tr><th>Our topic</th><th>SASB disclosure topic</th><th>Exposure</th><th>Residual</th></tr></thead>
        <tbody>${listedRows || '<tr><td colspan="4" class="muted">No industry selected.</td></tr>'}</tbody>
      </table>
      ${notListedLine}
    </section>`;
}

export function resultsView(id) {
  const a = getAssessment(id);
  if (!a) return `<section class="panel"><p>Assessment not found.</p></section>`;
  const fw = state.framework;
  const result = assessmentResult(a, fw);

  const pillarCards = fw.pillars
    .map((p) => {
      const s = result.pillars[p.id];
      if (!s) return "";
      const band = s.score == null ? "n/a" : bandFor(s.score, fw).label;
      const coverage = `${s.topicsAnswered} of ${s.topics} topics answered`;
      return scoreCard(p.name, s.score, band, coverage);
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
        ${scoreCard("Residual risk", result.overall, result.band.label,
          `${result.results.filter((r) => r.coverage > 0).length} of ${result.results.length} topics answered`)}
        ${pillarCards}
      </div>
      ${legend()}
      <div class="banner">${esc(result.band.action)}</div>

      ${howToRead(fw, result)}

      ${sasbScope(a, fw, result)}

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

      <h3>Risk by topic</h3>
      ${riskTable(result.results)}

      ${evidenceTable(a, fw)}

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
