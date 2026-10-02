# ESG Assessment Tool — Progress Report

Date: 1 October 2026 · Status: Steps 1–2 complete, Step 3 next

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

**Industry-level weighting (Step 2).** All 77 industries now carry their own topic weightings
(924 values), so the industry a company is assigned drives its exposure. Assessments can blend
several industries by revenue share, so multi-business groups are modelled instead of being
forced into one sector.

## Verified

All 77 industry codes and 12 topic mappings were checked against the SASB codification and GRI
standards, and recorded on 1 October 2026. The universe is no longer provisional: 89 of 89
entries verified, 11 of 11 sectors marked complete, and all draft flags cleared.

## Current limitation

The industry weightings are reasoned, not sourced. `relevance.json` is marked
`DRAFT - NOT SOURCED`: the 924 values derive from sector base vectors and per-industry
overrides rather than from SASB's published disclosure-topic list for each industry. The
remaining task is to grade each industry from its published topic list.

## Future workflow

1. **Step 3 — Evidence tiering.** Score claimed, documented and verified evidence differently,
   instead of treating all answers as equal.
2. **Step 4 — Backtesting.** Test the model against companies with known ESG failures and
   against well-regarded firms, to calibrate thresholds and remove false positives.
3. **Step 5 — Persistence.** Move data from browser storage to a server database with user
   accounts, for multi-user deployment.

## Decision required

None blocking. Two candidate moves: verify the 924 weightings against each industry's
published SASB topic list — the same method that closed Step 1 — or proceed to Step 3 and
return to weighting verification once the model is proven.
