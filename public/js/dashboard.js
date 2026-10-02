const BAND_COLORS = {
  Low: "#2E7D6B",
  Moderate: "#C9A227",
  High: "#D97706",
  Severe: "#B91C1C",
  "n/a": "#94A3B8",
};

export function bandColor(label) {
  return BAND_COLORS[label] || "#64748B";
}

function heatColor(score, max = 5) {
  if (score == null) return "#E2E8F0";
  const t = Math.min(1, Math.max(0, score / max));
  const from = [46, 125, 107];
  const mid = [201, 162, 39];
  const to = [185, 28, 28];
  let rgb;
  if (t < 0.5) {
    const k = t / 0.5;
    rgb = from.map((c, i) => Math.round(c + (mid[i] - c) * k));
  } else {
    const k = (t - 0.5) / 0.5;
    rgb = mid.map((c, i) => Math.round(c + (to[i] - c) * k));
  }
  return `rgb(${rgb.join(",")})`;
}

export function barRow(label, score, max = 5, sub) {
  const pct = score == null ? 0 : Math.min(100, (score / max) * 100);
  return `
    <div class="bar-row">
      <div class="bar-label">${label}${sub ? `<span class="bar-sub">${sub}</span>` : ""}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${pct}%;background:${heatColor(score, max)}"></div></div>
      <div class="bar-value">${score == null ? "—" : score.toFixed(2)}</div>
    </div>`;
}

export function scoreCard(title, value, band, sub) {
  return `
    <div class="score-card">
      <div class="score-card-title">${title}</div>
      <div class="score-card-value" style="color:${band ? bandColor(band) : "#0F172A"}">
        ${value == null ? "—" : value.toFixed(2)}
      </div>
      <div class="score-card-band">
        ${band ? `<span class="pill" style="background:${bandColor(band)}">${band}</span>` : ""}
        ${sub ? `<span class="muted">${sub}</span>` : ""}
      </div>
    </div>`;
}

export function topicHeatmap(topicResults, framework) {
  const cells = topicResults
    .map(
      (r) => `
      <div class="heat-cell" style="background:${heatColor(r.residual)}" title="${r.name}: ${r.residual} (${r.band})">
        <div class="heat-name">${r.name}</div>
        <div class="heat-score">${r.residual.toFixed(2)}</div>
        <div class="heat-meta">exposure ${r.exposure} · maturity ${r.maturity == null ? "—" : r.maturity}</div>
      </div>`
    )
    .join("");
  return `<div class="heat-grid">${cells}</div>`;
}

export function portfolioHeatmap(aggregate, framework) {
  const topics = framework.topics || [];
  const cells = topics
    .map((t) => {
      const score = aggregate.topics[t.id];
      return `
        <div class="heat-cell" style="background:${heatColor(score)}" title="${t.name}: ${score}">
          <div class="heat-name">${t.name}</div>
          <div class="heat-score">${score == null ? "—" : score.toFixed(2)}</div>
        </div>`;
    })
    .join("");
  return `<div class="heat-grid">${cells}</div>`;
}

export function riskTable(topicResults) {
  const rows = topicResults
    .slice()
    .sort((a, b) => b.residual - a.residual)
    .map(
      (r) => `
      <tr>
        <td>${r.name}</td>
        <td class="num">${r.exposure}</td>
        <td class="num">${r.maturity == null ? "—" : r.maturity.toFixed(2)}</td>
        <td class="num"><strong>${r.residual.toFixed(2)}</strong></td>
        <td><span class="pill" style="background:${bandColor(r.band)}">${r.band}</span></td>
        <td class="action">${r.action}</td>
        <td class="num">${Math.round(r.coverage * 100)}%</td>
      </tr>`
    )
    .join("");
  return `
    <table class="table">
      <thead>
        <tr>
          <th>Topic</th><th>Exposure</th><th>Maturity</th><th>Residual</th>
          <th>Band</th><th>Required action</th><th>Coverage</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

export function provenanceTable(assessment) {
  const rows = (assessment.provenance || [])
    .slice()
    .reverse()
    .map(
      (p) => `
      <tr>
        <td class="muted">${new Date(p.at).toLocaleString()}</td>
        <td>${p.actor}</td>
        <td>${p.action}</td>
        <td class="muted">${p.detail || ""}</td>
      </tr>`
    )
    .join("");
  return `
    <table class="table compact">
      <thead><tr><th>When</th><th>Who</th><th>Action</th><th>Detail</th></tr></thead>
      <tbody>${rows || '<tr><td colspan="4" class="muted">No activity recorded.</td></tr>'}</tbody>
    </table>`;
}

export function legend() {
  return `
    <div class="legend">
      <span class="legend-label">Residual risk</span>
      ${[1, 2, 3, 4, 5]
        .map((v) => `<span class="legend-swatch" style="background:${heatColor(v)}">${v}</span>`)
        .join("")}
      <span class="legend-label">low to high</span>
    </div>`;
}
