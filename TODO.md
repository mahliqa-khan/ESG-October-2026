# ESG Assessment Tool — TODO

Single source of truth for what is done and what is next. Reconciles the three lists that used to
live in `where-are-we.md`, `reading-notes.md` and `esg-ai-pipeline-spec.md`.

## Done

- **Step 1 — Topic universe.** 11 SASB sectors, 77 industries. Codes verified against the SASB
  Standards. Universe rebuilt around SASB's full 26 disclosure issues + 2 GRI-sourced topics
  (Board Oversight, Tax) = 28 topics. (`framework/framework.json`, v0.6.0)
- **Step 2 — Industry weightings.** All 77 industries fact-checked against their published SASB
  disclosure-topic lists (listed = 5, not listed = 2). 77 × 28 = 2,156 values.
  (`framework/relevance.json`, status VERIFIED; verdicts in `worksheet-weightings.md`)
- **Step 3 — Evidence tiering.** Each answer carries a proof tier (claimed / documented /
  verified) with a penalty (2 / 1 / 0, floored at 1), so a claim scores below proof of the same
  claim. Results show tier, source and discounted score. (`public/js/scoring.js`)
- **App.** Dashboard, per-industry questionnaires, live scoring, results, History page, a
  worked-example loader, and a review workflow (draft → submitted → reviewed → approved) with
  reviewer ≠ approver enforced and a provenance log.

## Next — Step 4: Backtesting

The genuine next step. Score a set of companies through the tool and check the model says what an
analyst would say.

- **Known ESG failures** (e.g. past governance or safety scandals) — the model should flag them High
  or Severe.
- **Well-regarded firms** — should land Low or Moderate, i.e. few false positives.
- This is also the **only** way to calibrate the parts SASB does not publish: the relative weights
  behind the 5-vs-lower grades, and whether the evidence penalties (2/1/0) are right.
- **Needs from the owner:** a shortlist of test companies (say 5–10), their industries, and a
  view on what the "right" answer is for each.

## After — Step 5: Persistence

- Move off browser `localStorage` to a server database.
- User accounts; enforce the review gate server-side (today it is a browser-side `if`).
- Migration path for existing localStorage data (the Export JSON format is the bridge).

## Open questions

- Tier set: is claimed / documented / verified right? Should `documented` split into policy vs
  actual implementation data?
- Evidence penalties (claimed 2, documented 1, verified 0) — confirm or tune via Step 4.
- Should the source field be required for documented and verified answers?

## Notes

- `esg-ai-pipeline-spec.md` was written for a report-generation tool; the app became an assessment
  tool, so criteria like units matching the standard and coverage diff do not map directly. Keep it
  as background, not the backlog.
- `reading-notes.md` "Step 2–5" builder checklist is superseded by this file.