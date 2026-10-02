import { state, setAnswer, setNote, getAssessment, navigate } from "./store.js";
import { assessmentResult, scaleFor, exposureOf } from "./scoring.js";
import { esc, STATUS_LABEL, unitLabel } from "./ui.js";
import { barRow, bandColor, legend } from "./dashboard.js";

function questionControl(q, value, framework) {
  if (q.type === "number") {
    return `<input type="number" step="any" data-q="${q.id}" value="${esc(value)}"
      placeholder="value" /> <span class="muted">${esc(q.unit || "")}</span>`;
  }
  const scale = scaleFor(q, framework);
  const opts = scale
    .map((o, i) => {
      const checked = String(value) === String(o.score) ? "checked" : "";
      return `<label class="opt"><input type="radio" name="${q.id}" data-q="${q.id}"
        value="${o.score}" ${checked} /><span class="opt-score">${o.score}</span>
        <span class="opt-label">${esc(o.label)}</span></label>`;
    })
    .join("");
  return `<div class="opts">${opts}</div>`;
}

function topicBlock(topic, assessment, framework, readOnly) {
  const exposure = exposureOf(topic, assessment.industries || assessment.sectors, framework);
  const result = assessmentResult(assessment, framework).results.find((r) => r.topicId === topic.id);
  const questions = topic.questions
    .map((q) => {
      const value = assessment.answers[q.id];
      const meta = [
        q.ref ? `<span class="tag">${esc(q.ref)}</span>` : "",
        q.scored === false ? `<span class="tag alt">data only</span>` : "",
      ]
        .filter(Boolean)
        .join(" ");
      return `
        <div class="question" data-question="${q.id}">
          <div class="q-text">${esc(q.text)} ${meta}</div>
          <div class="q-control" ${readOnly ? 'data-readonly="1"' : ""}>${questionControl(q, value, framework)}</div>
        </div>`;
    })
    .join("");
  const note = (assessment.notes && assessment.notes[topic.id]) || "";
  return `
    <section class="topic-block" id="topic-${topic.id}">
      <header class="topic-head">
        <div>
          <h3>${esc(topic.name)}</h3>
          <div class="muted">Pillar ${topic.pillar} · exposure ${exposure} · residual
            <strong style="color:${bandColor(result ? result.band : "n/a")}">
            ${result ? result.residual.toFixed(2) : "—"}</strong>
            ${result ? `<span class="pill" style="background:${bandColor(result.band)}">${result.band}</span>` : ""}
          </div>
        </div>
        <div class="topic-progress">${result ? Math.round(result.coverage * 100) : 0}% answered</div>
      </header>
      ${questions}
      <label class="note-label">Analyst note / evidence
        <textarea data-note="${topic.id}" rows="2" ${readOnly ? "readonly" : ""}
          placeholder="Evidence reviewed, source documents, open questions">${esc(note)}</textarea>
      </label>
    </section>`;
}

export function questionnaireView(id) {
  const a = getAssessment(id);
  if (!a) return `<section class="panel"><p>Assessment not found.</p></section>`;
  const fw = state.framework;
  const readOnly = a.status === "approved";
  const result = assessmentResult(a, fw);
  const sector = unitLabel(a.industries || a.sectors, fw);

  const pillarRows = fw.pillars
    .map((p) => {
      const s = result.pillars[p.id];
      return s ? barRow(p.name, s.score, 5, `${s.topicsAnswered}/${s.topics} topics`) : "";
    })
    .join("");

  const blocks = fw.pillars
    .map((p) => {
      const topics = fw.topics.filter((t) => t.pillar === p.id);
      return `<h3 class="pillar-head">${esc(p.name)}</h3>${topics
        .map((t) => topicBlock(t, a, fw, readOnly))
        .join("")}`;
    })
    .join("");

  return `
    <section class="panel">
      <div class="panel-head">
        <div>
          <h2>${esc(a.investee)}</h2>
          <div class="muted">
            ${esc(sector)} · ${esc(a.period || "")} ·
            holding ${(a.holdingWeight || 0).toFixed(1)}% ·
            <span class="pill" style="background:#334155">${esc(STATUS_LABEL[a.status] || a.status)}</span>
          </div>
        </div>
        <div class="head-actions">
          <a class="btn" href="#/results/${a.id}">Results & approval</a>
          <button class="btn" data-action="back">Portfolio</button>
        </div>
      </div>
      <div class="questionnaire-layout">
        <aside class="sidebar">
          <div class="side-block">
            <div class="side-title">Live scores</div>
            <div class="side-overall">${result.overall == null ? "—" : result.overall.toFixed(2)}
              <span class="pill" style="background:${bandColor(result.band.label)}">${result.band.label}</span>
            </div>
            ${pillarRows}
            <div class="muted small">Questionnaire ${Math.round(result.coverage * 100)}% complete</div>
          </div>
          <div class="side-block">
            <div class="side-title">Jump to topic</div>
            <ul class="jump">
              ${fw.topics
                .map((t) => {
                  const r = result.results.find((x) => x.topicId === t.id);
                  return `<li><a href="#topic-${t.id}">
                    <span class="dot" style="background:${bandColor(r ? r.band : "n/a")}"></span>
                    ${esc(t.name)}</a></li>`;
                })
                .join("")}
            </ul>
          </div>
          ${legend()}
        </aside>
        <div class="questionnaire-body">
          ${readOnly ? '<div class="banner">Approved and locked. Create a revision to change answers.</div>' : ""}
          ${blocks}
        </div>
      </div>
    </section>`;
}

export function bindQuestionnaire(root, id) {
  root.querySelectorAll("[data-q]").forEach((input) => {
    input.addEventListener("change", () => {
      setAnswer(id, input.dataset.q, input.value);
      rerenderScores(root, id);
    });
  });
  root.querySelectorAll("[data-note]").forEach((ta) => {
    ta.addEventListener("change", () => setNote(id, ta.dataset.note, ta.value));
  });
  const back = root.querySelector('[data-action="back"]');
  if (back) back.addEventListener("click", () => navigate("portfolio"));
}

function rerenderScores(root, id) {
  const a = getAssessment(id);
  const fw = state.framework;
  const result = assessmentResult(a, fw);
  const overall = root.querySelector(".side-overall");
  if (overall) {
    overall.innerHTML = `${result.overall == null ? "—" : result.overall.toFixed(2)}
      <span class="pill" style="background:${bandColor(result.band.label)}">${result.band.label}</span>`;
  }
  result.results.forEach((r) => {
    const block = root.querySelector(`#topic-${r.topicId}`);
    if (!block) return;
    const val = block.querySelector(".topic-head strong");
    if (val) {
      val.textContent = r.residual.toFixed(2);
      val.style.color = bandColor(r.band);
    }
    const pill = block.querySelector(".topic-head .pill");
    if (pill) {
      pill.textContent = r.band;
      pill.style.background = bandColor(r.band);
    }
    const prog = block.querySelector(".topic-progress");
    if (prog) prog.textContent = `${Math.round(r.coverage * 100)}% answered`;
  });
}
