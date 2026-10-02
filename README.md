# Investor ESG Assessment Framework

A small, dependency-free web app that lets an investor firm (asset manager, private equity,
lender) run ESG assessments on the companies it invests in: industry-specific questionnaires,
a scoring engine, dashboards, and a human review/approval workflow with an audit trail.

The framework itself is **data**, not code. Edit two files — `framework.json` for topics,
questions and risk bands, `relevance.json` for industry weightings — with no application
changes required.

## Run it

```
node server.js
```

Then open http://localhost:4173

Use a different port with `PORT=5000 node server.js`.

## How the assessment works

**Exposure** — every topic has a relevance weight (1–5) for each of the 77 industries. A
chemicals plant scores high on health and safety; a software firm scores low. This is the
inherent risk before management.

**Maturity** — each question is answered on a 1–5 scale:
1. No policy or process in place
2. Informal or ad hoc approach
3. Formal policy, partially implemented
4. Implemented, monitored and measured
5. Independently verified, targets on track

**Residual risk** — exposure adjusted for management maturity:

```
residual = exposure x (max - maturity + 1) / max
```

Strong management lowers residual risk; weak management leaves it near full exposure.

**Aggregation** — topics roll up into pillars (E, S, G) and an overall score, weighted by
exposure. The portfolio view weights each company by its holding weight.

## Human in the loop

The workflow is enforced, not advisory:

`draft` → `submitted` → `reviewed` → `approved`

- Steps cannot be skipped.
- A named reviewer must be assigned before an assessment can be marked reviewed.
- The approver must be a **different person** from the reviewer.
- Approved assessments lock their answers.
- Every action is written to a provenance log (who, what, when) visible on the results page.

## Files

| Path | Purpose |
|---|---|
| `framework/framework.json` | Framework definition: pillars, topics, questions, answer scales, risk bands, SASB sector and industry map |
| `framework/relevance.json` | Topic relevance (1–5) for each of the 77 industries; drives exposure |
| `generate_relevance.py` | Rebuilds `relevance.json` from base vectors and per-industry overrides |
| `public/js/scoring.js` | Scoring engine (pure functions, no UI) |
| `public/js/store.js` | State, persistence, approval gates, provenance log |
| `public/js/dashboard.js` | Charts, heatmaps, tables |
| `public/js/questionnaire.js` | Questionnaire view |
| `public/js/results.js` | Results and approval view |
| `public/js/ui.js` | Portfolio and new-assessment views |
| `public/js/app.js` | Router and bootstrap |
| `server.js` | Static file server |

## Customising

Open `framework/framework.json`:

- **Add a topic** — append to `topics` with a `pillar`, questions, and a fallback `relevance`.
- **Change a question** — edit its `text`, `weight`, or `ref` (the standard it comes from).
- **Data-only questions** — set `"scored": false` to capture a number without scoring it.
- **Risk bands** — edit `riskBands` to change thresholds and required actions.
- **Different scale** — add to `answerScales` and reference it with `"scale": "yourScale"`.

Industry weightings live in `framework/relevance.json`, keyed by industry code:

- **Change a weighting** — edit `byIndustry.<code>.<topicId>`, values 1–5.
- **Add an industry** — add it to `framework.json` under `sasbIndustries`, then add its vector
  to `relevance.json`. Both files must agree; industries with no vector fall back to the
  topic's default relevance.
- **Regenerate** — `python3 generate_relevance.py` rebuilds `relevance.json` from the sector
  base vectors and per-industry overrides at the top of that script.

Bump `version` when you change either file: each assessment records the version it was created
under.

## Notes and limitations

- Assessments are stored in browser `localStorage`, per browser. Use the **Export JSON**
  button to move data between machines. There is no server-side database or authentication.
- This is a decision-support tool. It does not replace legal, compliance or investment
  judgement, and it does not verify data supplied by investees.
- Grounding references (ISSB, SASB, GRI, GHG Protocol, UNGP, TNFD) indicate the standard a
  question derives from; they are labels, not reproduced standard text.
- The 77 industry codes are verified against the SASB codification. The 924 industry weightings
  are **not**: `relevance.json` is marked `DRAFT - NOT SOURCED` and should be graded against
  each industry's published SASB topic list before use.
