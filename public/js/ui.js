import { state, navigate, createAssessment, setActor, removeAssessment, loadExample } from "./store.js";
import { assessmentResult, portfolioResult, normSectors } from "./scoring.js";
import { scoreCard, portfolioHeatmap, legend, bandColor, barRow } from "./dashboard.js";

export function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function industryIndex(framework) {
  const idx = {};
  (framework.sasbIndustries || []).forEach((row) =>
    (row.industries || []).forEach((ind) => {
      if (ind.code) idx[ind.code] = { name: ind.name, sasbSector: row.sasbSector };
    })
  );
  return idx;
}

export function unitLabel(units, framework) {
  const list = normSectors(units);
  if (!list.length) return "no industry";
  const idx = industryIndex(framework);
  const total = list.reduce((s, x) => s + x.weight, 0);
  return list
    .map((s) => {
      const name =
        (idx[s.id] && idx[s.id].name) ||
        (framework.sectors.find((x) => x.id === s.id) || {}).name ||
        s.id;
      if (list.length === 1) return name;
      const pct = total > 0 ? Math.round((s.weight / total) * 100) : Math.round(100 / list.length);
      return `${name} ${pct}%`;
    })
    .join(" + ");
}

const STATUS_LABEL = {
  draft: "Draft",
  submitted: "Submitted for review",
  reviewed: "Reviewed",
  approved: "Approved",
};

export function actorBar() {
  return `
    <div class="actor">
      <label for="actor-input">Signed in as</label>
      <input id="actor-input" type="text" placeholder="your name" value="${esc(state.actor)}" />
      <span class="muted">Recorded against every change in the audit trail.</span>
    </div>`;
}

export function portfolioView() {
  const fw = state.framework;
  const rows = state.assessments;
  const agg = portfolioResult(rows, fw);

  if (!rows.length) {
    return `
      <section class="panel">
        <h2>Portfolio</h2>
        <p class="muted">No assessments yet. Create one to generate a sector-specific questionnaire.</p>
        <button class="btn primary" data-action="new">New assessment</button>
      </section>`;
  }

  const pillarCards = fw.pillars
    .map((p) => {
      const s = agg.pillars[p.id];
      const band = s == null ? null : agg.band && s <= 1.5 ? "Low" : s <= 2.5 ? "Moderate" : s <= 3.5 ? "High" : "Severe";
      return scoreCard(p.name, s, band, "");
    })
    .join("");

  const list = rows
    .map((a) => {
      const r = assessmentResult(a, fw);
      return `
        <tr>
          <td><a href="#/assessment/${a.id}">${esc(a.investee)}</a></td>
          <td>${esc(unitLabel(a.industries || a.sectors, fw))}</td>
          <td class="num">${(a.holdingWeight || 0).toFixed(1)}%</td>
          <td class="num"><strong>${r.overall == null ? "—" : r.overall.toFixed(2)}</strong></td>
          <td><span class="pill" style="background:${bandColor(r.band.label)}">${r.band.label}</span></td>
          <td>${esc(STATUS_LABEL[a.status] || a.status)}</td>
          <td class="num">${Math.round(r.coverage * 100)}%</td>
          <td><button class="btn small danger" data-action="delete" data-id="${a.id}">Remove</button></td>
        </tr>`;
    })
    .join("");

  return `
    <section class="panel">
      <div class="panel-head">
        <h2>Portfolio</h2>
        <button class="btn primary" data-action="new">New assessment</button>
      </div>
      <div class="score-cards">
        ${scoreCard("Portfolio residual risk", agg.overall, agg.band.label, `${agg.assessed} of ${agg.total} assessed`)}
        ${pillarCards}
      </div>
      ${legend()}
      <h3>Risk by topic across portfolio</h3>
      ${portfolioHeatmap(agg, fw)}
      <h3>Assessments</h3>
      <table class="table">
        <thead>
          <tr>
            <th>Investee</th><th>Industry</th><th>Weight</th><th>Residual</th>
            <th>Band</th><th>Status</th><th>Coverage</th><th></th>
          </tr>
        </thead>
        <tbody>${list}</tbody>
      </table>
    </section>`;
}

export function historyView() {
  const fw = state.framework;
  const rows = state.assessments
    .slice()
    .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));

  if (!rows.length) {
    return `
      <section class="panel">
        <h2>History</h2>
        <p class="muted">No past runs yet. Create an assessment, or load the worked example.</p>
        <button class="btn primary" data-action="new">New assessment</button>
        <button class="btn" data-action="example">Load example</button>
      </section>`;
  }

  const list = rows
    .map((a) => {
      const r = assessmentResult(a, fw);
      return `
        <tr>
          <td>${new Date(a.updatedAt || a.createdAt).toLocaleString()}</td>
          <td><a href="#/results/${a.id}">${esc(a.investee)}</a></td>
          <td>${esc(unitLabel(a.industries || a.sectors, fw))}</td>
          <td>${esc(a.period || "—")}</td>
          <td class="num"><strong>${r.overall == null ? "—" : r.overall.toFixed(2)}</strong></td>
          <td><span class="pill" style="background:${bandColor(r.band.label)}">${r.band.label}</span></td>
          <td>${esc(STATUS_LABEL[a.status] || a.status)}</td>
          <td class="num">${Math.round(r.coverage * 100)}%</td>
        </tr>`;
    })
    .join("");

  return `
    <section class="panel">
      <div class="panel-head">
        <h2>History</h2>
        <div class="head-actions">
          <button class="btn" data-action="example">Load example</button>
          <button class="btn primary" data-action="new">New assessment</button>
        </div>
      </div>
      <p class="muted">Every assessment, most recently updated first. Select one to reopen its results.</p>
      <table class="table">
        <thead>
          <tr>
            <th>Run</th><th>Investee</th><th>Industry</th><th>Period</th>
            <th>Residual</th><th>Band</th><th>Status</th><th>Coverage</th>
          </tr>
        </thead>
        <tbody>${list}</tbody>
      </table>
    </section>`;
}

export function bindHistory(root) {
  root.querySelectorAll('[data-action="new"]').forEach((b) =>
    b.addEventListener("click", () => navigate("new"))
  );
  root.querySelectorAll('[data-action="example"]').forEach((b) =>
    b.addEventListener("click", () => {
      const a = loadExample();
      if (a) navigate("results", { id: a.id });
    })
  );
}

export function newAssessmentView() {
  const fw = state.framework;
  const groups = (fw.sasbIndustries || [])
    .map((row) => {
      const items = row.industries
        .filter((i) => i.code)
        .map(
          (i) => `
          <label class="sector-row">
            <input type="checkbox" data-industry="${i.code}" />
            <span class="sector-name">${esc(i.name)}</span>
            <input type="number" data-weight="${i.code}" min="0" max="100" step="1" value="0" disabled />
            <span class="muted small">%</span>
          </label>`
        )
        .join("");
      return `<div class="sector-group">
        <div class="sector-group-name">${esc(row.sasbSector)}</div>${items}</div>`;
    })
    .join("");
  const industryCount = (fw.sasbIndustries || []).reduce(
    (n, r) => n + r.industries.filter((i) => i.code).length,
    0
  );
  return `
    <section class="panel narrow">
      <h2>New assessment</h2>
      <form id="new-form" class="form">
        <label>Investee / portfolio company
          <input name="investee" required placeholder="e.g. Northwind Manufacturing Ltd" />
        </label>
        <fieldset class="sector-fieldset">
          <legend>Industry mix (${industryCount} industries; select all that apply)</legend>
          <input type="search" data-industry-filter placeholder="Filter industries…" />
          <div class="industry-scroll">${groups}</div>
          <div class="muted small" data-sector-total></div>
        </fieldset>
        <label>Holding weight (% of portfolio)
          <input name="holdingWeight" type="number" step="0.1" min="0" max="100" value="0" />
        </label>
        <label>Reporting period
          <input name="period" placeholder="e.g. FY2025" value="FY2025" />
        </label>
        <div class="form-actions">
          <button class="btn primary" type="submit">Create assessment</button>
          <a class="btn" href="#/portfolio">Cancel</a>
        </div>
      </form>
      <p class="muted">For a single-business company pick one sector. For a conglomerate, pick
      every sector it operates in and weight them (usually by revenue share) — exposure is then
      blended across the mix.</p>
    </section>`;
}

export function bindPortfolio(root) {
  root.querySelectorAll('[data-action="new"]').forEach((b) =>
    b.addEventListener("click", () => navigate("new"))
  );
  root.querySelectorAll('[data-action="delete"]').forEach((b) =>
    b.addEventListener("click", () => {
      const a = state.assessments.find((x) => x.id === b.dataset.id);
      if (a && confirm(`Remove assessment for ${a.investee}?`)) removeAssessment(a.id);
    })
  );
}

export function bindNewAssessment(root) {
  const form = root.querySelector("#new-form");
  if (!form) return;

  const boxes = Array.from(form.querySelectorAll("[data-industry]"));
  const total = form.querySelector("[data-sector-total]");
  const filter = form.querySelector("[data-industry-filter]");
  const weightOf = (id) => form.querySelector(`[data-weight="${id}"]`);

  if (filter) {
    filter.addEventListener("input", () => {
      const term = filter.value.trim().toLowerCase();
      boxes.forEach((c) => {
        const row = c.closest(".sector-row");
        const match = !term || row.textContent.toLowerCase().includes(term);
        row.style.display = match ? "" : "none";
      });
    });
  }

  function refresh() {
    const picked = boxes.filter((c) => c.checked);
    picked.forEach((c) => {
      const w = weightOf(c.dataset.industry);
      if (!w) return;
      w.disabled = false;
      if (Number(w.value) === 0) {
        w.value = picked.length === 1 ? 100 : Math.round(100 / picked.length);
      }
    });
    boxes.filter((c) => !c.checked).forEach((c) => {
      const w = weightOf(c.dataset.industry);
      if (w) {
        w.disabled = true;
        w.value = 0;
      }
    });
    if (total) {
      const sum = picked.reduce(
        (s, c) => s + (Number((weightOf(c.dataset.industry) || {}).value) || 0),
        0
      );
      total.textContent = picked.length
        ? `${picked.length} industry(ies) selected, shares total ${sum}% (normalised automatically)`
        : "Select at least one industry.";
    }
  }

  boxes.forEach((c) => c.addEventListener("change", refresh));
  form.querySelectorAll("[data-weight]").forEach((w) => w.addEventListener("input", refresh));
  refresh();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const industries = boxes
      .filter((c) => c.checked)
      .map((c) => ({
        id: c.dataset.industry,
        weight: Number((weightOf(c.dataset.industry) || {}).value) || 0,
      }));
    if (!industries.length) {
      if (total) total.textContent = "Select at least one industry before creating the assessment.";
      return;
    }
    const a = createAssessment(Object.assign(data, { industries }));
    navigate("assessment", { id: a.id });
  });
}

export function bindActor(root) {
  const input = root.querySelector("#actor-input");
  if (!input) return;
  input.addEventListener("change", () => setActor(input.value.trim()));
}

export { STATUS_LABEL, barRow };
