import { state, load, setFramework, navigate, subscribe } from "./store.js";
import {
  actorBar, portfolioView, newAssessmentView,
  bindPortfolio, bindNewAssessment, bindActor,
} from "./ui.js";
import { questionnaireView, bindQuestionnaire } from "./questionnaire.js";
import { resultsView, bindResults } from "./results.js";

const root = document.getElementById("app");

function parseHash() {
  const hash = location.hash.replace(/^#\/?/, "");
  const parts = hash.split("/").filter(Boolean);
  if (!parts.length) return { name: "portfolio", params: {} };
  if (parts[0] === "new") return { name: "new", params: {} };
  return { name: parts[0], params: { id: parts[1] } };
}

function header() {
  const fw = state.framework;
  return `
    <header class="topbar">
      <div class="brand">
        <span class="brand-mark">ESG</span>
        <span class="brand-text">${fw ? fw.name : "Investor ESG Assessment"}<span class="version">v${fw ? fw.version : ""}</span></span>
      </div>
      <nav>
        <a href="#/portfolio" class="${state.route.name === "portfolio" ? "active" : ""}">Portfolio</a>
        <a href="#/new" class="${state.route.name === "new" ? "active" : ""}">New assessment</a>
      </nav>
    </header>`;
}

function footer() {
  return `
    <footer class="footer">
      <span>Framework is data: edit <code>framework/framework.json</code> to change topics, questions, sector weights or risk bands.</span>
      <span>Human review required before any decision.</span>
    </footer>`;
}

export function render() {
  if (!state.framework) {
    root.innerHTML = `<div class="loading">Loading framework…</div>`;
    return;
  }
  const r = state.route;
  let body = "";
  if (r.name === "new") body = newAssessmentView();
  else if (r.name === "assessment") body = questionnaireView(r.params.id);
  else if (r.name === "results") body = resultsView(r.params.id);
  else body = portfolioView();

  root.innerHTML = `${header()}${actorBar()}<main>${body}</main>${footer()}`;

  bindActor(root);
  if (r.name === "new") bindNewAssessment(root);
  else if (r.name === "assessment") bindQuestionnaire(root, r.params.id);
  else if (r.name === "results") bindResults(root, r.params.id);
  else bindPortfolio(root);
}

function syncRoute() {
  state.route = parseHash();
  render();
}

async function boot() {
  subscribe(render);
  window.addEventListener("hashchange", syncRoute);
  try {
    const [fwRes, relRes] = await Promise.all([
      fetch("/framework/framework.json"),
      fetch("/framework/relevance.json"),
    ]);
    const framework = await fwRes.json();
    framework.relevance = relRes.ok ? await relRes.json() : null;
    setFramework(framework);
  } catch (e) {
    root.innerHTML = `<div class="loading">Could not load framework.json. Run the app via <code>node server.js</code> rather than opening the file directly.</div>`;
    return;
  }
  load();
  syncRoute();
}

boot();
export { navigate };
