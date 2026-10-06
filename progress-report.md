# ESG Assessment Tool — Progress Report

Date: 6 October 2026 · Status: Steps 1–2 complete and verified, Step 3 next

## What we are building

A web tool for investor firms — asset managers, private equity, lenders — to assess the ESG
risk of the companies they invest in. The user describes the company, answers questions about
how well it is managed, and receives a residual-risk score with required actions and a
human review workflow.

## Completed

**Framework structure (Step 1).** Built the universe: all 11 SASB sectors and 77 industries,
sourced from the SASB Standards rather than invented. This is the list that determines which
topics matter for which business, and it drives every downstream score.

**Scoring model.** Residual risk = exposure (what the company is exposed to by what it does)
adjusted for management maturity (policy → measurement → targets → independent verification).
Exposure blends across multiple industries, so conglomerates can be modelled by revenue share.

**Working application.** Portfolio dashboard, industry-specific questionnaires, live scoring,
results with priority actions, and an enforced review workflow: draft → submitted → reviewed
→ approved, where the approver must differ from the reviewer and every change is logged.

**Industry-level weighting (Step 2).** Every one of the 77 industries now carries its own topic
grading, so the industry a company is assigned drives its exposure. Assessments can blend
several industries by revenue share, so multi-business groups are modelled instead of being
forced into one sector.

**Topic universe expanded (Step 2 verification).** The fact-check against SASB's published
disclosure-topic lists exposed two topics our collapsed list was missing — Materials Sourcing
& Efficiency and Product Design & Lifecycle Management. The universe was rebuilt around SASB's
full set of 26 issues, plus 2 GRI-sourced topics (Board Oversight, Tax): 28 topics, 2,156
values.

## Verified

All 77 industry codes, the 12 original topic mappings, and now the industry weightings have
been checked against the SASB Standards. Steps 1 and 2 are both closed.

**Weighting verification (recorded 6 October 2026).** Each of the 77 industries was checked
against its published SASB disclosure-topic list: a listed (bold) topic is graded 5, a topic
SASB does not list is graded 2. `relevance.json` now reads `VERIFIED - all 77 industries
fact-checked against SASB`, with 2,156 values (421 graded 5, 1,735 graded 2). The per-industry
verdicts are recorded in `worksheet-weightings.md`.

## Current limitation

The grading is a binary check — listed (5) versus not listed (2) — which verifies *whether* a
topic is material, not *how much*. SASB publishes the topic list but not relative weights, so
the 5-versus-less-than-5 distinction is settled by backtesting, not citation. That is Step 4.

## Future workflow

1. **Step 3 — Evidence tiering.** Score claimed, documented and verified evidence differently,
   instead of treating all answers as equal.
2. **Step 4 — Backtesting.** Test the model against companies with known ESG failures and
   against well-regarded firms, to calibrate thresholds and remove false positives.
3. **Step 5 — Persistence.** Move data from browser storage to a server database with user
   accounts, for multi-user deployment.

## Decision required

None blocking. The weighting-verification question that previously sat here is resolved. The
next move is Step 3 (evidence tiering), with backtesting to follow.
