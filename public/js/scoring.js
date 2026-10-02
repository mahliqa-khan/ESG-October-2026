export function clamp(n, min = 1, max = 5) {
  return Math.min(max, Math.max(min, n));
}

export function round(n, dp = 2) {
  const f = Math.pow(10, dp);
  return Math.round(n * f) / f;
}

export function scaleFor(question, framework) {
  const key = question.scale || framework.defaultScale;
  return framework.answerScales[key] || [];
}

export function optionFor(question, value, framework) {
  const scale = scaleFor(question, framework);
  return scale.find((o) => String(o.score) === String(value)) || null;
}

export function normSectors(input) {
  if (!input) return [];
  if (typeof input === "string") return [{ id: input, weight: 1 }];
  if (!Array.isArray(input)) return [];
  return input
    .map((s) => (typeof s === "string" ? { id: s, weight: 1 } : { id: s.id, weight: Number(s.weight) || 0 }))
    .filter((s) => s.id);
}

export function relevanceFor(topic, id, framework) {
  const byIndustry = framework && framework.relevance && framework.relevance.byIndustry;
  if (byIndustry && byIndustry[id] && byIndustry[id][topic.id] != null) {
    return byIndustry[id][topic.id];
  }
  if (topic.relevance && topic.relevance[id] != null) return topic.relevance[id];
  return 2;
}

export function exposureOf(topic, units, framework) {
  const list = normSectors(units).filter((s) => s.weight > 0);
  if (!list.length) return 2;
  const weightSum = list.reduce((s, x) => s + x.weight, 0);
  const blended = list.reduce(
    (s, x) => s + relevanceFor(topic, x.id, framework) * x.weight,
    0
  );
  return round(blended / weightSum, 2);
}

export function maturityOf(topic, answers, framework) {
  let weighted = 0;
  let weightSum = 0;
  let answered = 0;
  topic.questions.forEach((q) => {
    if (q.scored === false) return;
    const value = answers[q.id];
    if (value === undefined || value === null || value === "") return;
    const option = optionFor(q, value, framework);
    if (!option) return;
    const w = q.weight == null ? 1 : q.weight;
    weighted += option.score * w;
    weightSum += w;
    answered += 1;
  });
  if (!weightSum) return null;
  return { score: round(weighted / weightSum, 2), answered };
}

export function residualRisk(exposure, maturity, framework) {
  const max = (framework.scoreScale && framework.scoreScale.max) || 5;
  if (maturity == null) return { score: round(exposure, 2), basis: "exposure only, no answers" };
  const score = exposure * ((max - maturity + 1) / max);
  return { score: round(clamp(score, 0, max), 2), basis: "exposure adjusted for management maturity" };
}

export function bandFor(score, framework) {
  const bands = framework.riskBands || [];
  for (let i = 0; i < bands.length; i += 1) {
    if (score <= bands[i].max) return bands[i];
  }
  return bands[bands.length - 1] || { label: "n/a", action: "" };
}

export function coverageOf(topic, answers, framework) {
  const scored = topic.questions.filter((q) => q.scored !== false);
  if (!scored.length) return 1;
  const done = scored.filter((q) => {
    const v = answers[q.id];
    return v !== undefined && v !== null && v !== "";
  }).length;
  return round(done / scored.length, 2);
}

export function topicResult(topic, units, answers, framework) {
  const exposure = exposureOf(topic, units, framework);
  const maturity = maturityOf(topic, answers, framework);
  const residual = residualRisk(exposure, maturity ? maturity.score : null, framework);
  const band = bandFor(residual.score, framework);
  return {
    topicId: topic.id,
    pillar: topic.pillar,
    name: topic.name,
    exposure,
    maturity: maturity ? maturity.score : null,
    answered: maturity ? maturity.answered : 0,
    residual: residual.score,
    basis: residual.basis,
    band: band.label,
    action: band.action,
    coverage: coverageOf(topic, answers, framework),
  };
}

export function pillarScores(topicResults) {
  const byPillar = {};
  topicResults.forEach((r) => {
    if (!byPillar[r.pillar]) byPillar[r.pillar] = { weighted: 0, weight: 0, count: 0, answered: 0 };
    const b = byPillar[r.pillar];
    b.weighted += r.residual * r.exposure;
    b.weight += r.exposure;
    b.count += 1;
    b.answered += r.coverage > 0 ? 1 : 0;
  });
  const out = {};
  Object.keys(byPillar).forEach((p) => {
    const b = byPillar[p];
    out[p] = {
      pillar: p,
      score: b.weight ? round(b.weighted / b.weight, 2) : null,
      topics: b.count,
      topicsAnswered: b.answered,
    };
  });
  return out;
}

export function assessmentResult(assessment, framework) {
  const topics = framework.topics || [];
  const units = assessment.industries || assessment.sectors || assessment.sector;
  const results = topics.map((t) => topicResult(t, units, assessment.answers || {}, framework));
  const byPillar = pillarScores(results);
  const weightSum = results.reduce((s, r) => s + r.exposure, 0);
  const weighted = results.reduce((s, r) => s + r.residual * r.exposure, 0);
  const overall = weightSum ? round(weighted / weightSum, 2) : null;
  const band = overall == null ? { label: "n/a", action: "" } : bandFor(overall, framework);
  const coverage = results.length
    ? round(results.reduce((s, r) => s + r.coverage, 0) / results.length, 2)
    : 0;
  const worst = results.slice().sort((a, b) => b.residual - a.residual).slice(0, 5);
  return { results, pillars: byPillar, overall, band, coverage, worst };
}

export function portfolioResult(assessments, framework) {
  const scored = assessments
    .map((a) => ({ assessment: a, result: assessmentResult(a, framework) }))
    .filter((x) => x.result.overall != null);
  const weightSum = scored.reduce((s, x) => s + (x.assessment.holdingWeight || 0), 0);
  const weighted = scored.reduce(
    (s, x) => s + x.result.overall * (x.assessment.holdingWeight || 0),
    0
  );
  const overall = weightSum ? round(weighted / weightSum, 2) : null;
  const byPillar = {};
  (framework.pillars || []).forEach((p) => {
    const entries = scored.filter((x) => x.result.pillars[p.id]);
    const wSum = entries.reduce((s, x) => s + (x.assessment.holdingWeight || 0), 0);
    const wVal = entries.reduce(
      (s, x) => s + x.result.pillars[p.id].score * (x.assessment.holdingWeight || 0),
      0
    );
    byPillar[p.id] = wSum ? round(wVal / wSum, 2) : null;
  });
  const topicAgg = {};
  (framework.topics || []).forEach((t) => {
    const wSum = scored.reduce((s, x) => s + (x.assessment.holdingWeight || 0), 0);
    const wVal = scored.reduce((s, x) => {
      const r = x.result.results.find((y) => y.topicId === t.id);
      return s + (r ? r.residual * (x.assessment.holdingWeight || 0) : 0);
    }, 0);
    topicAgg[t.id] = wSum ? round(wVal / wSum, 2) : null;
  });
  return {
    overall,
    band: overall == null ? { label: "n/a", action: "" } : bandFor(overall, framework),
    pillars: byPillar,
    topics: topicAgg,
    assessed: scored.length,
    total: assessments.length,
    exposure: scored.reduce((s, x) => s + x.result.results.reduce((a, r) => a + r.exposure, 0), 0),
  };
}
