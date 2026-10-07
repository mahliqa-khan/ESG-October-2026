const KEY = "esg-assessments-v1";
import { normSectors } from "./scoring.js";

const ACTOR_KEY = "esg-actor-v1";

const listeners = new Set();

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function emit() {
  listeners.forEach((fn) => fn(state));
}

export const state = {
  framework: null,
  assessments: [],
  actor: localStorage.getItem(ACTOR_KEY) || "",
  route: { name: "portfolio", params: {} },
};

export function setActor(name) {
  state.actor = name;
  localStorage.setItem(ACTOR_KEY, name);
  emit();
}

export function setFramework(framework) {
  state.framework = framework;
  emit();
}

export function navigate(name, params = {}) {
  state.route = { name, params };
  emit();
}

function persist() {
  localStorage.setItem(KEY, JSON.stringify(state.assessments));
}

export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    state.assessments = raw ? JSON.parse(raw) : [];
  } catch (e) {
    state.assessments = [];
  }
  emit();
}

export function getAssessment(id) {
  return state.assessments.find((a) => a.id === id) || null;
}

export function newId() {
  return "a-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7);
}

function log(assessment, action, detail) {
  assessment.provenance = assessment.provenance || [];
  assessment.provenance.push({
    at: new Date().toISOString(),
    actor: state.actor || "unassigned",
    action,
    detail: detail || "",
  });
}

export function createAssessment({ investee, industries, sectors, sector, holdingWeight, period }) {
  const now = new Date().toISOString();
  const source = (industries && industries.length && industries) ||
    (sectors && sectors.length && sectors) || sector;
  const assessment = {
    id: newId(),
    investee,
    industries: normSectors(source),
    holdingWeight: Number(holdingWeight) || 0,
    period,
    answers: {},
    notes: {},
    status: "draft",
    reviewer: "",
    approver: "",
    createdAt: now,
    updatedAt: now,
    frameworkVersion: state.framework ? state.framework.version : "unknown",
    provenance: [],
  };
  log(assessment, "created", `${investee} (${sector})`);
  state.assessments.push(assessment);
  persist();
  emit();
  return assessment;
}

export function updateAssessment(id, patch, action, detail) {
  const a = getAssessment(id);
  if (!a) return null;
  Object.assign(a, patch);
  a.updatedAt = new Date().toISOString();
  if (action) log(a, action, detail);
  persist();
  emit();
  return a;
}

export function setAnswer(id, questionId, value) {
  const a = getAssessment(id);
  if (!a) return null;
  const prev = asAnswer(a.answers[questionId]);
  a.answers[questionId] = { ...prev, value };
  a.updatedAt = new Date().toISOString();
  if (String(prev.value) !== String(value)) {
    log(a, "answer", `${questionId}: ${prev.value === undefined ? "blank" : prev.value} -> ${value}`);
  }
  persist();
  return a;
}

export function setEvidence(id, questionId, evidence, source) {
  const a = getAssessment(id);
  if (!a) return null;
  const prev = asAnswer(a.answers[questionId]);
  a.answers[questionId] = { ...prev, evidence, source };
  a.updatedAt = new Date().toISOString();
  log(a, "evidence", `${questionId}: ${evidence}${source ? " (" + source + ")" : ""}`);
  persist();
  return a;
}

function asAnswer(prev) {
  if (prev && typeof prev === "object") {
    return { value: prev.value, evidence: prev.evidence, source: prev.source };
  }
  return { value: prev };
}

export function setNote(id, topicId, text) {
  const a = getAssessment(id);
  if (!a) return null;
  a.notes = a.notes || {};
  a.notes[topicId] = text;
  a.updatedAt = new Date().toISOString();
  persist();
  return a;
}

export function setStatus(id, status, detail) {
  const a = getAssessment(id);
  if (!a) return { error: "not found" };
  const order = ["draft", "submitted", "reviewed", "approved"];
  const from = order.indexOf(a.status);
  const to = order.indexOf(status);
  if (to > from + 1) {
    return { error: "Cannot skip a step. Move through submitted, then reviewed, then approved." };
  }
  if (status === "reviewed") {
    if (!a.reviewer) return { error: "Assign a reviewer before marking reviewed." };
  }
  if (status === "approved") {
    if (a.status !== "reviewed") return { error: "Assessment must be reviewed before approval." };
    if (!a.approver) return { error: "Assign an approver before approval." };
    if (a.approver && a.reviewer && a.approver === a.reviewer) {
      return { error: "Approver must be a different person from the reviewer." };
    }
  }
  a.status = status;
  a.updatedAt = new Date().toISOString();
  log(a, "status", `status -> ${status}`);
  persist();
  emit();
  return { ok: true };
}

export function assign(id, role, name) {
  const a = getAssessment(id);
  if (!a) return null;
  a[role] = name;
  a.updatedAt = new Date().toISOString();
  log(a, "assign", `${role} = ${name}`);
  persist();
  emit();
  return a;
}

export function removeAssessment(id) {
  state.assessments = state.assessments.filter((a) => a.id !== id);
  persist();
  emit();
}

export function exportJSON() {
  return JSON.stringify(
    { exportedAt: new Date().toISOString(), framework: state.framework, assessments: state.assessments },
    null,
    2
  );
}
