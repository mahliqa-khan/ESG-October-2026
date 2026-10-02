# ESG Framework — Research Reading Notes

Bookmark of what to read/research before building the AI-assisted ESG framework.

## What we're building (corrected scope)

A **software tool for investor firms** — asset managers, private equity, lenders — to run ESG
assessments on the companies they invest in. Questionnaires, scoring, dashboards. It is NOT
a report for our own company.

- **Users:** investor firms assessing their investees / portfolio companies.
- **Lens:** financial materiality (what affects enterprise value) first; impact recorded alongside.
- **Grounding:** SASB (industry-level financial materiality), ISSB IFRS S1/S2, PRI,
  ILPA ESG DDQ, SFDR (EU users), PCAF (financed emissions).
- **Shape:** configurable framework definition → generated questionnaire → scoring engine →
  dashboard, with human review and sign-off built in.
- **Why configurable:** other investor firms must be able to adapt the methodology to their
  own policy, so the framework is data, not hardcoded logic.

## Step tracker

- [x] **Step 0 — Scope.** Decided: a tool for investor firms, not our own report.
- [~] **Step 1 — Methodology as data.** Topics, questions, scoring rules, sector mappings. Output: `framework/framework.json`.
- [ ] **Step 2 — Scoring engine.** Exposure vs management maturity → residual risk.
- [ ] **Step 3 — App: questionnaires.** Generated per investee + sector, with evidence capture.
- [ ] **Step 4 — App: scoring and dashboard.** Per-topic, per-pillar and portfolio views.
- [ ] **Step 5 — Governance.** Reviewer/approver separation, provenance log, export.

## Reading priority

**Start with materiality** — it's the hinge the whole framework turns on. Everything else
(topics, metrics, targets, boundaries) is downstream of "what's material to us, and under
which lens."

1. **Materiality** — impact vs financial vs double; how to run a materiality assessment
   (sector guidance + stakeholder input). Read GRI 3 and ESRS 1 (double materiality) first.
2. **Your regime** — mandatory vs voluntary. If CSRD/ISSB applies to you, that decides your
   structure before any topic does. Legal/compliance question, not a sustainability one.
3. **Boundary & GHG accounting** — GHG Protocol (Scope 1/2/3, org boundary, operational
   control vs equity share). The most common source of restatement risk.
4. **Sector standards** — SASB industry standard + GRI sector standard for your industry.
   These narrow the universe of topics to a working list.
5. **Metrics & targets** — then the specific metric definitions (GRI 305-*, ESRS E1-*,
   SBTi criteria) and baseline/recalculation rules.
6. **Assurance & governance** — read last, but design for it early.

**If you only do one thing before building:** run a materiality assessment against your
actual business and geographies. Metrics are easy to look up later; getting materiality
wrong invalidates the whole output.

## The steps in plain English

**Step 0 — Regime gate. Are we legally required to report, or doing this voluntarily?**
Ask legal/finance one question: "are we required to report ESG anywhere?" The answer decides
everything after. If required, the law dictates what you disclose and you build to match it.
If voluntary, you choose. **You are voluntary, investor audience.**

**Step 1 — Materiality. What actually matters about our business?**
"Material" just means "important enough to report on." You look at your business (sector,
where you operate, your supply chain), talk to stakeholders, and produce a shortlist of the
topics that genuinely matter. This is the most important step — every topic, metric, and
target downstream comes from this list. Don't let AI pick these; it's a business judgement.
Read: GRI 3 and ESRS 1. Output: a signed-off list of material topics.

**Step 2 — Sector narrowing. Cut the list down to what applies to our industry.**
Standards publish industry-specific lists (SASB industry standard, GRI sector standard).
You overlay yours on the Step 1 shortlist and remove topics that don't apply. Output: a
clean working topic list.

**Step 3 — Boundary & GHG. Decide what we're actually measuring.**
"Boundary" means the edges of what you report: which entities, which countries, and for
emissions which of the three scopes (direct emissions, purchased energy, supply chain and
customers). Decide it once, write it down in one page. This is where most companies later
get caught out, so keep it precise. Output: a one-page boundary statement.

**Step 4 — Metrics & targets. Turn topics into numbers.**
Now — and only now — look up the actual metrics for the topics that survived Steps 1–3, and
define how you'll measure each one (unit, definition, starting year). A target without a
starting year is meaningless, so pair them. Output: a metric register.

**Step 5 — Assurance & governance. Who checks it and who signs it off?**
Decide who independently reviews the numbers and who formally approves the report. Skim
this early too, because it affects how you collect data in Steps 3–4. Output: assurance
level plus a named sign-off chain.

**Rule of thumb:** never jump ahead to metrics (Step 4). It's tempting, but measuring
things that aren't material is wasted effort. Each step should end with a decision, not a
pile of notes.
