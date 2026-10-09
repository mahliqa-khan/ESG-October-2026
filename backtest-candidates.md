# Backtest — candidate companies

**Status: SUGGESTIONS TO VERIFY.** The names and events below are drawn from widely reported public
news and are a starting shortlist only. Before you score anything, confirm for yourself (a) the
company is still a valid example, (b) the SASB industry is right, and (c) the "expected" outcome is
one you personally accept. Nothing here is sourced or authoritative.

## How to use this

For each company:
1. Create an assessment, pick its **SASB industry** (code in the table).
2. Answer the questionnaire from its **public disclosures** (annual report, sustainability report,
   news). Set the evidence tier honestly — a website claim is `claimed`, an audited report is
   `documented` or `verified`.
3. Note the **residual score and band**.
4. Compare to the **expected** column. Where they disagree, that is a finding to investigate —
   either the data, the weights, or the penalties need attention.

## Group A — stress cases (tool *should* flag High or Severe)

| Company | SASB industry | Publicly reported issue | Expected |
|---|---|---|---|
| Boeing | RT-AE Aerospace & Defense | 737 MAX safety crises; quality/oversight failures | High / Severe |
| Volkswagen | TR-AU Automobiles | "Dieselgate" emissions-cheating scandal | High / Severe |
| BP | EM-EP Oil & Gas – Exploration & Production | Deepwater Horizon spill | High / Severe |
| Vale | EM-MM Metals & Mining | Brumadinho tailings-dam disaster | High / Severe |
| PG&E | IF-EU Electric Utilities | Wildfire liability and safety record | High / Severe |
| Wells Fargo | FN-CB Commercial Banks | Fake-accounts / sales-practices scandal | High / Severe |
| Danske Bank | FN-CB Commercial Banks | Estonia money-laundering case | High |
| Meta (Facebook) | TC-IM Internet Media & Services | Cambridge Analytica data-privacy case | High |
| Boohoo | CG-AA Apparel, Accessories & Footwear | Supply-chain labour-abuse allegations | High |
| Rio Tinto | EM-MM Metals & Mining | Juukan Gorge heritage-site destruction | High / Severe |

## Group B — control cases (tool *should* stay Low or Moderate)

| Company | SASB industry | Why included | Expected |
|---|---|---|---|
| Ørsted | IF-EU Electric Utilities | Widely cited renewables transition leader | Low / Moderate |
| Schneider Electric | RT-EE Electrical & Electronic Equipment | Long-standing sustainability/ESG ratings leader | Low / Moderate |
| Microsoft | TC-SI Software & IT Services | Mature governance, disclosure and assurance | Low / Moderate |
| Unilever | CG-HP Household & Personal Products | Established sustainability reporting | Low / Moderate |
| Novo Nordisk | HC-BP Biotechnology & Pharmaceuticals | Strong governance and access programmes | Low / Moderate |
| Salesforce | TC-SI Software & IT Services | Early net-zero and governance commitments | Low / Moderate |

## What a good result looks like

- **Separation:** Group A scores clearly higher risk than Group B. If they overlap, the model is not
  discriminating.
- **No false alarms:** Group B should not land Severe.
- **Sensitivity to evidence:** for one Group A company, re-score with the same answers but downgrade
  the tiers to `claimed`. The score should rise. If it barely moves, the penalties are too weak.

## Known limitations to note in results

- Industry **exposure** is fixed by SASB, so all banks start at the same exposure; only management
  maturity separates Wells Fargo from a clean bank. That is by design, but it means the model leans
  on questionnaire answers heavily.
- Several scandals are **governance/business-ethics** issues. If a company's scandal is in a topic
  SASB does not list for its industry (exposure 2), the model may under-flag it — worth watching.