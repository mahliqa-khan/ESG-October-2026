# Sourcing worksheet — Boeing (RT-AE, Aerospace & Defense)

Goal: replace the placeholder answers in `backtest/companies.json` with answers taken from
Boeing's own public disclosures, each with a source. This is what turns an illustrative score
into a real backtest.

## Where to look (in order)

1. **Annual report / Form 10-K** — governance, code of conduct, risk factors.
2. **Sustainability / ESG report** — policies, targets, energy, waste, safety.
3. **Proxy statement (DEF 14A)** — board oversight, remuneration, ethics programme.
4. **Regulator and news record** — for the adverse events (the "expected" side of the test).

Record the exact document and page. If you cannot find it, the honest answer is **claimed** (or
blank), not **documented**.

## How to set the evidence tier

| You found | Tier |
|---|---|
| Nothing, or a website statement only | `claimed` |
| A board-approved policy or data in the annual/ESG report | `documented` |
| An independent auditor/assurance statement | `verified` |

## Questions to answer (RT-AE material topics)

### Product Quality & Safety — the central issue for the 737 MAX backtest
| ID | Question | Current placeholder | What to look for / source |
|---|---|---|---|
| ps-1 | Is there a product quality and safety policy meeting applicable regulation? | 3 documented | Safety management system policy; FAA agreements. |
| ps-2 | Are recalls, defects and customer complaints tracked? | 2 claimed | Safety/quality reporting; incident disclosures. |
| ps-3 | Is product safety independently certified or audited? | 1 claimed | FAA oversight; independent audits post-737 MAX. |

### Business Ethics
| ID | Question | Current placeholder | What to look for / source |
|---|---|---|---|
| be-1 | Is there a code of conduct and anti-bribery policy? | 3 documented | Code of Conduct (public). |
| be-2 | Are employees trained and are third parties screened? | 2 claimed | Ethics training disclosure; supplier screening. |
| be-3 | Is there a confidential whistleblowing channel with reported outcomes? | 1 claimed | Ethics hotline; outcomes in ESG report. |

### Data Security
| ID | Question | Current placeholder | What to look for / source |
|---|---|---|---|
| ds-1 | Is there a cybersecurity policy and board-level accountability? | 3 documented | 10-K risk factors; board committee charter. |
| ds-2 | Are breaches, incidents and access controls monitored? | 2 claimed | Security disclosures. |
| ds-3 | Is the security control environment independently tested or certified? | 1 claimed | Audit/assurance statements. |

### Energy Management
| ID | Question | Current placeholder | What to look for / source |
|---|---|---|---|
| energy-1 | Is there a policy on energy efficiency and renewable sourcing? | 3 documented | ESG report energy policy. |
| energy-2 | Is energy consumption measured and tracked by site or business unit? | 2 claimed | Energy data tables. |
| energy-3 | Are renewable-energy targets time-bound and reported against? | 1 claimed | Target + baseline + progress. |

### Waste & Hazardous Materials Management
| ID | Question | Current placeholder | What to look for / source |
|---|---|---|---|
| wa-1 | Is there a policy for hazardous and non-hazardous waste management? | 3 documented | ESG report waste policy. |
| wa-2 | Are waste volumes, disposal routes and hazardous waste tracked? | 2 claimed | Waste data. |
| wa-3 | Are waste reduction or diversion targets set and verified? | 1 claimed | Target + assurance. |

### Product Design & Lifecycle Management
| ID | Question | Current placeholder | What to look for / source |
|---|---|---|---|
| pd-1 | Is there a policy covering product design, durability and end-of-life? | 3 documented | Design/quality policy. |
| pd-2 | Is the lifecycle impact of products measured? | 2 claimed | Lifecycle metrics. |
| pd-3 | Are design-for-lifecycle targets set and independently verified? | 1 claimed | Target + assurance. |

### Materials Sourcing & Efficiency
| ID | Question | Current placeholder | What to look for / source |
|---|---|---|---|
| materials-1 | Is there a policy on sustainable materials sourcing and use? | 3 documented | Supplier/materials policy. |
| materials-2 | Are material inputs and sourcing origins measured? | 2 claimed | Sourcing data. |
| materials-3 | Are sourcing and efficiency targets set and independently verified? | 1 claimed | Target + assurance. |

## After you fill it in

Update `backtest/companies.json` for Boeing, set `dataStatus` to `SOURCED` with the documents
used, then run `python3 backtest/run.py` and compare the new score to the expected High / Severe.