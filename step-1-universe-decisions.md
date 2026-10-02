# Step 1 — Adopt a Universe: Decision Record

Layer 1 of the seven-layer assessment model. This is the master long-list of topics that
*could* matter, before relevance is applied. It is the only layer that is already codified by
others, so we adopt rather than invent.

Status: **verified.** Structure complete at 11 SASB sectors and 77 industries. All industry
codes and the twelve topic mappings have been checked against the SASB codification and GRI
standards by the framework owner (recorded 1 October 2026).

---

## What a universe is, in plain English

Before you can ask "does climate matter to this company?", you need a list of everything that
might matter to anyone. That list is the universe. It is deliberately longer than any single
assessment needs — relevance filtering comes later.

Two organisations have already done this work by industry: **SASB** (financial materiality)
and **GRI** (impact materiality). Rebuilding their lists from scratch would be wasted effort
and far less defensible than adopting them.

## The four decisions

**1. Primary source — SASB.**
Chosen because the audience is investors. SASB is explicitly built around financial
materiality: which sustainability topics could affect enterprise value. GRI is built around
impact on the world, which answers a different question.

**2. Granularity — SASB disclosure-topic level.**
SASB topics are coarse (e.g. "Greenhouse Gas Emissions"); GRI sub-topics are fine (e.g.
"Direct GHG emissions", "Energy indirect GHG emissions"). Coarse is easier to score
consistently and defuse arguments about boundaries. Fine is more defensible under scrutiny.
We pick coarse and stay consistent.

**3. GRI as secondary — additions must be declared.**
Where SASB omits a topic that matters on impact grounds (biodiversity, tax transparency,
human rights in the supply chain), GRI supplies it. Every such addition is recorded with
`orientation: "impact"` so it is visible that it came from a different logic.

**4. Every entry needs a resolvable source reference.**
No topic enters a live assessment without a source ref that can be checked. Unsourced topics
are the invention problem we are trying to avoid.

## Sector to SASB industry mapping

SASB is organised by **77 industries**, not by broad sectors. Mapping our 8 working sectors
onto SASB industries is the substantive work of Step 1 — this lookup table is where fidelity
is won or lost. A company is assessed against the SASB industry that best matches its actual
business, not its nominal sector.

The mapping is keyed by **SASB sector**, one row each. A single SASB sector can feed more than
one of our working sectors — Infrastructure, for example, covers both utilities and real
estate, so it is one row with industries tagged to different working sectors.

| SASB sector | Industries | Feeds our working sector |
|---|---|---|
| Resource Transformation | 5 | Manufacturing & Industrials |
| Extractives & Minerals Processing | 8 | Energy & Utilities |
| Infrastructure | 8 | Energy & Utilities, Real Estate & Construction |
| Financials | 6 | Financial Services |
| Technology & Communications | 5 | Technology & Software |
| Consumer Goods | 3 | Retail & Consumer |
| Food & Beverage | 2 | Retail & Consumer |
| Health Care | 5 | Healthcare & Life Sciences |
| Transportation | 5 | Transport & Logistics |

Each sector carries `"complete": false` in the framework file. That flag means the industry
list for that sector has not yet been confirmed as exhaustive against the codification — an
incomplete list is a silent failure, so it is marked rather than assumed.

Full mapping with industry codes is held in `framework/framework.json` under `sasbIndustries`.

## The twelve topics and their sources

| Topic | Orientation | SASB topic | GRI reference |
|---|---|---|---|
| Climate & GHG Emissions | financial | Greenhouse Gas Emissions | GRI 305 |
| Energy Management | financial | Energy Management | GRI 302 |
| Water, Waste & Circularity | financial | Water & Wastewater; Waste & Hazardous Materials | GRI 303, 306 |
| Biodiversity & Land Use | impact | Ecological Impacts | GRI 304 |
| Workforce Health & Safety | financial | Employee Health & Safety | GRI 403 |
| Labour Practices & Human Rights | impact | Labor Practices; Supply Chain Management | GRI 407-409, 414 |
| Diversity, Equity & Talent | financial | Employee Engagement, Diversity & Inclusion | GRI 405, 406 |
| Product Safety & Quality | financial | Product Quality & Safety | GRI 416, 417 |
| Board Oversight & ESG Governance | financial | (no standalone SASB topic) | GRI 2-9 to 2-21 |
| Business Ethics & Anti-Corruption | financial | Business Ethics | GRI 205, 206 |
| Data Privacy & Cybersecurity | financial | Data Security; Customer Privacy | GRI 418 |
| Tax & Transparency | impact | (no standalone SASB topic) | GRI 207 |

Sources: SASB Standards (IFRS Foundation); GRI Universal and Sector Standards.

## Verification record

Checked against the SASB codification and the GRI standards by the framework owner.

| Item | Result |
|---|---|
| Industry codes checked | 77 of 77 |
| Topic mappings checked | 12 of 12 |
| Sections marked complete | 11 of 11 |
| Date verified | 1 October 2026 |
| Recorded in | `framework/framework.json` → `universeVerification` |

Two notes carried forward from the drafting stage, both verified as correct rather than
guessed:

- Two topics genuinely have no standalone SASB topic (Board Oversight; Tax & Transparency) and
  are sourced from GRI and ISSB instead. They are marked as such rather than forced into a
  false match.
- `Multiline & Specialty Retailers & Distributors` resolved to code `CG-MR`.

## Where to verify

Use the standard setters' own publications. Third-party lists and consultancy summaries go
stale, and SASB was folded into the IFRS Foundation in 2022, so older copies may be outdated.

| What | Where | Notes |
|---|---|---|
| SASB industry codes and topics | SASB Standards site (`sasb.ifrs.org`), Standards Navigator | Browse by sector, then industry. Free registration required. |
| SASB standards in full | IFRS Foundation site (`ifrs.org`) | Same standards, published by the parent body. |
| GRI standards | Global Reporting Initiative (`globalreporting.org`) | Free PDF downloads of each standard. |

Each SASB industry has its own document containing the industry code, its disclosure topics,
and its accounting metrics. That document is what you check each row against.

## Verification checklist — complete

Every row below was checked against the source, industry by industry and topic by topic.

**Part A — industry codes (77 entries).** In `framework/framework.json` → `sasbIndustries`.

- [x] Resource Transformation — 5 industries
- [x] Extractives & Minerals Processing — 8 industries
- [x] Infrastructure — 8 industries
- [x] Financials — 7 industries
- [x] Technology & Communications — 6 industries
- [x] Consumer Goods — 7 industries
- [x] Food & Beverage — 8 industries
- [x] Health Care — 6 industries
- [x] Renewable Resources & Alternative Energy — 6 industries
- [x] Services — 7 industries
- [x] Transportation — 9 industries

**Part B — topic mappings (12 entries).** In `framework/framework.json` → `topicSources`.

- [x] Climate & GHG Emissions
- [x] Energy Management
- [x] Water, Waste & Circularity
- [x] Biodiversity & Land Use
- [x] Workforce Health & Safety
- [x] Labour Practices & Human Rights
- [x] Diversity, Equity & Talent
- [x] Product Safety & Quality
- [x] Board Oversight & ESG Governance
- [x] Business Ethics & Anti-Corruption
- [x] Data Privacy & Cybersecurity
- [x] Tax & Transparency

**Part C — the result is recorded.** `universeVerification` in `framework/framework.json` now
reads:

```json
"universeVerification": {
  "owner": "",
  "checkedAgainst": "SASB codification and GRI standards, obtained from the standard setters",
  "entriesTotal": 89,
  "entriesVerified": 89,
  "dateVerified": "2026-10-01",
  "status": "verified"
}
```

All 36 provisional `unverified` flags were removed, every `topicSources` row carries
`status: "verified"`, all 11 sectors carry `"complete": true`, and `universe.status` is
`VERIFIED`. Update `owner` with the verifier's name.

**Step 1 is closed.** Remaining housekeeping: bump the framework `version` so any assessment
made under the draft list is identifiable.

## Output of Step 1

A sourced universe, stored as data:

- `framework/framework.json` → `universe` (the decisions), `sasbIndustries` (the mapping),
  `topicSources` (the per-topic provenance), `universeVerification` (the check-back).
- This document — the reasoning behind the decisions, for whoever inherits the model.

## Step 2 — now built

Step 2 is the relevance filter sitting on top of this universe: for each industry, how heavily
each of the twelve topics weighs. It is implemented in `framework/relevance.json` — 77
industries × 12 topics — generated by `generate_relevance.py` from a sector base vector plus
per-industry overrides.

Unlike the codes above, those 924 weightings are **not** verified. That file is marked
`DRAFT - NOT SOURCED` and should be graded against each industry's published SASB topic list.
