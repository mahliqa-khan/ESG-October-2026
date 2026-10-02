# Weighting Verification Worksheet

Task: check that our grades match SASB's published disclosure-topic list for each
industry. 77 industries, 12 topics each.

## The rule

| Does SASB list the topic for this industry? | Our grade should be |
|---|---|
| Yes | 3 to 5 |
| No | 1 or 2 |

A grade that breaks the rule is an error. Fix it in `framework/relevance.json` under
`byIndustry.<CODE>`.

**What this cannot check.** SASB publishes the *list* of topics, not how heavily each
one weighs. So you can confirm a topic is in the right industries, but not whether a 4
should be a 5. That part is validated by backtesting, not citation.

## Topic codes

| Code | Topic | Code | Topic |
|---|---|---|---|
| **GHG** | Climate & GHG Emissions | **EN** | Energy Management |
| **WW** | Water, Waste & Circularity | **BD** | Biodiversity & Land Use |
| **HS** | Workforce Health & Safety | **LR** | Labour Practices & Human Rights |
| **DV** | Diversity, Equity & Talent | **PS** | Product Safety & Quality |
| **BO** | Board Oversight & ESG Governance | **BE** | Business Ethics & Anti-Corruption |
| **DP** | Data Privacy & Cybersecurity | **TX** | Tax & Transparency |

## How to fill each entry

- **Current grades** — ours, highest first.
- **Implied listed** — the topics we say apply (grade 3 or more).
- **SASB's topics** — write what the SASB page actually lists.
- **Verdict** — `match`, `gap` (SASB lists a topic we grade 1–2), or `error` (we grade
  3+ for a topic SASB does not list). 

Where SASB lists a topic we do not have at all (air quality, community relations,
product design, and so on), note it — that is a gap in our topic list, not a wrong number.

---

## Consumer Goods

### 1. CG-AA — Apparel, Accessories & Footwear

- **Current grades:** LR 5 · WW 4 · PS 4 · GHG 3 · EN 3 · HS 3 · DV 3 · BO 3 · BE 3 · DP 3 · BD 2 · TX 2
- **Implied listed:** LR, WW, PS, GHG, EN, HS, DV, BO, BE, DP
- **Implied not listed:** BD, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 2. CG-AM — Appliance Manufacturing

- **Current grades:** PS 5 · EN 4 · LR 4 · GHG 3 · WW 3 · HS 3 · DV 3 · BO 3 · BE 3 · DP 3 · BD 2 · TX 2
- **Implied listed:** PS, EN, LR, GHG, WW, HS, DV, BO, BE, DP
- **Implied not listed:** BD, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 3. CG-BF — Building Products & Furnishings

- **Current grades:** LR 4 · PS 4 · GHG 3 · EN 3 · WW 3 · HS 3 · DV 3 · BO 3 · BE 3 · DP 3 · BD 2 · TX 2
- **Implied listed:** LR, PS, GHG, EN, WW, HS, DV, BO, BE, DP
- **Implied not listed:** BD, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 4. CG-EC — E-commerce

- **Current grades:** DP 5 · LR 4 · PS 4 · GHG 3 · EN 3 · WW 3 · HS 3 · DV 3 · BO 3 · BE 3 · BD 2 · TX 2
- **Implied listed:** DP, LR, PS, GHG, EN, WW, HS, DV, BO, BE
- **Implied not listed:** BD, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 5. CG-HP — Household & Personal Products

- **Current grades:** PS 5 · WW 4 · LR 4 · GHG 3 · EN 3 · HS 3 · DV 3 · BO 3 · BE 3 · DP 3 · BD 2 · TX 2
- **Implied listed:** PS, WW, LR, GHG, EN, HS, DV, BO, BE, DP
- **Implied not listed:** BD, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 6. CG-MR — Multiline & Specialty Retailers & Distributors

- **Current grades:** LR 4 · PS 4 · DP 4 · GHG 3 · EN 3 · WW 3 · HS 3 · DV 3 · BO 3 · BE 3 · BD 2 · TX 2
- **Implied listed:** LR, PS, DP, GHG, EN, WW, HS, DV, BO, BE
- **Implied not listed:** BD, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 7. CG-TO — Toys & Sporting Goods

- **Current grades:** PS 5 · LR 4 · GHG 3 · EN 3 · WW 3 · HS 3 · DV 3 · BO 3 · BE 3 · DP 3 · BD 2 · TX 2
- **Implied listed:** PS, LR, GHG, EN, WW, HS, DV, BO, BE, DP
- **Implied not listed:** BD, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

## Extractives & Minerals Processing

### 8. EM-CM — Construction Materials

- **Current grades:** GHG 4 · EN 4 · HS 4 · LR 4 · BO 4 · BE 4 · WW 3 · BD 3 · DV 3 · TX 3 · PS 2 · DP 2
- **Implied listed:** GHG, EN, HS, LR, BO, BE, WW, BD, DV, TX
- **Implied not listed:** PS, DP
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 9. EM-CO — Coal Operations

- **Current grades:** GHG 5 · EN 5 · HS 5 · WW 4 · BD 4 · LR 4 · BO 4 · BE 4 · DV 3 · TX 3 · PS 2 · DP 2
- **Implied listed:** GHG, EN, HS, WW, BD, LR, BO, BE, DV, TX
- **Implied not listed:** PS, DP
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 10. EM-EP — Oil & Gas - Exploration & Production

- **Current grades:** GHG 5 · EN 5 · HS 5 · WW 4 · BD 4 · LR 4 · BO 4 · BE 4 · DV 3 · TX 3 · PS 2 · DP 2
- **Implied listed:** GHG, EN, HS, WW, BD, LR, BO, BE, DV, TX
- **Implied not listed:** PS, DP
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 11. EM-IS — Iron & Steel Producers

- **Current grades:** GHG 5 · WW 5 · HS 5 · EN 4 · BD 4 · LR 4 · BO 4 · BE 4 · DV 3 · TX 3 · PS 2 · DP 2
- **Implied listed:** GHG, WW, HS, EN, BD, LR, BO, BE, DV, TX
- **Implied not listed:** PS, DP
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 12. EM-MD — Oil & Gas - Midstream

- **Current grades:** GHG 5 · EN 5 · WW 5 · HS 4 · LR 4 · BO 4 · BE 4 · BD 3 · DV 3 · TX 3 · PS 2 · DP 2
- **Implied listed:** GHG, EN, WW, HS, LR, BO, BE, BD, DV, TX
- **Implied not listed:** PS, DP
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 13. EM-MM — Metals & Mining

- **Current grades:** EN 5 · WW 5 · BD 5 · HS 5 · GHG 4 · LR 4 · BO 4 · BE 4 · DV 3 · TX 3 · PS 2 · DP 2
- **Implied listed:** EN, WW, BD, HS, GHG, LR, BO, BE, DV, TX
- **Implied not listed:** PS, DP
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 14. EM-RM — Oil & Gas - Refining & Marketing

- **Current grades:** GHG 5 · EN 5 · WW 5 · BD 4 · HS 4 · LR 4 · BO 4 · BE 4 · DV 3 · PS 3 · TX 3 · DP 2
- **Implied listed:** GHG, EN, WW, BD, HS, LR, BO, BE, DV, PS, TX
- **Implied not listed:** DP
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 15. EM-SV — Oil & Gas - Services

- **Current grades:** EN 5 · WW 5 · HS 5 · GHG 4 · BD 4 · LR 4 · BO 4 · BE 4 · DV 3 · TX 3 · PS 2 · DP 2
- **Implied listed:** EN, WW, HS, GHG, BD, LR, BO, BE, DV, TX
- **Implied not listed:** PS, DP
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

## Financials

### 16. FN-AC — Asset Management & Custody Activities

- **Current grades:** DV 5 · BO 5 · BE 5 · DP 5 · GHG 4 · TX 3 · EN 2 · HS 2 · LR 2 · PS 2 · WW 1 · BD 1
- **Implied listed:** DV, BO, BE, DP, GHG, TX
- **Implied not listed:** EN, HS, LR, PS, WW, BD
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 17. FN-CB — Commercial Banks

- **Current grades:** BO 5 · BE 5 · DP 5 · DV 4 · GHG 3 · TX 3 · EN 2 · HS 2 · LR 2 · PS 2 · WW 1 · BD 1
- **Implied listed:** BO, BE, DP, DV, GHG, TX
- **Implied not listed:** EN, HS, LR, PS, WW, BD
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 18. FN-CF — Consumer Finance

- **Current grades:** DP 5 · DV 4 · BO 4 · BE 4 · GHG 3 · LR 3 · TX 3 · EN 2 · HS 2 · PS 2 · WW 1 · BD 1
- **Implied listed:** DP, DV, BO, BE, GHG, LR, TX
- **Implied not listed:** EN, HS, PS, WW, BD
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 19. FN-EX — Security & Commodity Exchanges

- **Current grades:** BO 5 · BE 5 · DP 5 · DV 4 · GHG 3 · TX 3 · EN 2 · HS 2 · LR 2 · PS 2 · WW 1 · BD 1
- **Implied listed:** BO, BE, DP, DV, GHG, TX
- **Implied not listed:** EN, HS, LR, PS, WW, BD
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 20. FN-IB — Investment Banking & Brokerage

- **Current grades:** BO 5 · BE 5 · DP 5 · DV 4 · GHG 3 · TX 3 · EN 2 · HS 2 · LR 2 · PS 2 · WW 1 · BD 1
- **Implied listed:** BO, BE, DP, DV, GHG, TX
- **Implied not listed:** EN, HS, LR, PS, WW, BD
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 21. FN-IN — Insurance

- **Current grades:** DP 5 · DV 4 · BO 4 · BE 4 · GHG 3 · PS 3 · TX 3 · EN 2 · HS 2 · LR 2 · WW 1 · BD 1
- **Implied listed:** DP, DV, BO, BE, GHG, PS, TX
- **Implied not listed:** EN, HS, LR, WW, BD
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 22. FN-MF — Mortgage Finance

- **Current grades:** DV 4 · BO 4 · BE 4 · DP 4 · GHG 3 · TX 3 · EN 2 · HS 2 · LR 2 · PS 2 · WW 1 · BD 1
- **Implied listed:** DV, BO, BE, DP, GHG, TX
- **Implied not listed:** EN, HS, LR, PS, WW, BD
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

## Food & Beverage

### 23. FB-AB — Alcoholic Beverages

- **Current grades:** WW 5 · HS 4 · LR 4 · PS 4 · BE 4 · GHG 3 · EN 3 · BD 3 · DV 3 · BO 3 · DP 2 · TX 2
- **Implied listed:** WW, HS, LR, PS, BE, GHG, EN, BD, DV, BO
- **Implied not listed:** DP, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 24. FB-AG — Agricultural Products

- **Current grades:** WW 5 · BD 5 · PS 5 · GHG 4 · HS 4 · LR 4 · EN 3 · DV 3 · BO 3 · BE 3 · DP 2 · TX 2
- **Implied listed:** WW, BD, PS, GHG, HS, LR, EN, DV, BO, BE
- **Implied not listed:** DP, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 25. FB-FR — Food Retailers & Distributors

- **Current grades:** GHG 4 · WW 4 · HS 4 · LR 4 · PS 4 · EN 3 · BD 3 · DV 3 · BO 3 · BE 3 · DP 2 · TX 2
- **Implied listed:** GHG, WW, HS, LR, PS, EN, BD, DV, BO, BE
- **Implied not listed:** DP, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 26. FB-MP — Meat, Poultry & Dairy

- **Current grades:** GHG 5 · WW 5 · PS 5 · BD 4 · HS 4 · LR 4 · EN 3 · DV 3 · BO 3 · BE 3 · DP 2 · TX 2
- **Implied listed:** GHG, WW, PS, BD, HS, LR, EN, DV, BO, BE
- **Implied not listed:** DP, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 27. FB-NB — Non-Alcoholic Beverages

- **Current grades:** WW 5 · HS 4 · LR 4 · PS 4 · GHG 3 · EN 3 · BD 3 · DV 3 · BO 3 · BE 3 · DP 2 · TX 2
- **Implied listed:** WW, HS, LR, PS, GHG, EN, BD, DV, BO, BE
- **Implied not listed:** DP, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 28. FB-PF — Processed Foods

- **Current grades:** PS 5 · GHG 4 · WW 4 · HS 4 · LR 4 · EN 3 · BD 3 · DV 3 · BO 3 · BE 3 · DP 2 · TX 2
- **Implied listed:** PS, GHG, WW, HS, LR, EN, BD, DV, BO, BE
- **Implied not listed:** DP, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 29. FB-RN — Restaurants

- **Current grades:** HS 5 · LR 5 · WW 4 · PS 4 · GHG 3 · EN 3 · BD 3 · DV 3 · BO 3 · BE 3 · DP 2 · TX 2
- **Implied listed:** HS, LR, WW, PS, GHG, EN, BD, DV, BO, BE
- **Implied not listed:** DP, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 30. FB-TB — Tobacco

- **Current grades:** PS 5 · BE 5 · GHG 4 · WW 4 · HS 4 · LR 4 · EN 3 · BD 3 · DV 3 · BO 3 · DP 2 · TX 2
- **Implied listed:** PS, BE, GHG, WW, HS, LR, EN, BD, DV, BO
- **Implied not listed:** DP, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

## Health Care

### 31. HC-BP — Biotechnology & Pharmaceuticals

- **Current grades:** PS 5 · BE 5 · DP 4 · EN 3 · WW 3 · HS 3 · DV 3 · BO 3 · GHG 2 · LR 2 · TX 2 · BD 1
- **Implied listed:** PS, BE, DP, EN, WW, HS, DV, BO
- **Implied not listed:** GHG, LR, TX, BD
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 32. HC-DI — Health Care Distributors

- **Current grades:** PS 5 · BE 4 · DP 4 · EN 3 · WW 3 · HS 3 · DV 3 · BO 3 · GHG 2 · LR 2 · TX 2 · BD 1
- **Implied listed:** PS, BE, DP, EN, WW, HS, DV, BO
- **Implied not listed:** GHG, LR, TX, BD
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 33. HC-DR — Drug Retailers

- **Current grades:** PS 5 · DP 4 · EN 3 · WW 3 · HS 3 · DV 3 · BO 3 · BE 3 · GHG 2 · LR 2 · TX 2 · BD 1
- **Implied listed:** PS, DP, EN, WW, HS, DV, BO, BE
- **Implied not listed:** GHG, LR, TX, BD
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 34. HC-DY — Health Care Delivery

- **Current grades:** PS 5 · DP 5 · HS 4 · LR 4 · EN 3 · WW 3 · DV 3 · BO 3 · BE 3 · GHG 2 · TX 2 · BD 1
- **Implied listed:** PS, DP, HS, LR, EN, WW, DV, BO, BE
- **Implied not listed:** GHG, TX, BD
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 35. HC-MC — Managed Care

- **Current grades:** PS 5 · DP 5 · BE 4 · EN 3 · WW 3 · HS 3 · DV 3 · BO 3 · GHG 2 · LR 2 · TX 2 · BD 1
- **Implied listed:** PS, DP, BE, EN, WW, HS, DV, BO
- **Implied not listed:** GHG, LR, TX, BD
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 36. HC-MS — Medical Equipment & Supplies

- **Current grades:** PS 5 · EN 3 · WW 3 · HS 3 · DV 3 · BO 3 · BE 3 · DP 3 · GHG 2 · LR 2 · TX 2 · BD 1
- **Implied listed:** PS, EN, WW, HS, DV, BO, BE, DP
- **Implied not listed:** GHG, LR, TX, BD
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

## Infrastructure

### 37. IF-EN — Engineering & Construction Services

- **Current grades:** HS 5 · GHG 4 · EN 4 · LR 4 · WW 3 · BD 3 · PS 3 · BO 3 · BE 3 · DP 3 · DV 2 · TX 2
- **Implied listed:** HS, GHG, EN, LR, WW, BD, PS, BO, BE, DP
- **Implied not listed:** DV, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 38. IF-EU — Electric Utilities & Power Generators

- **Current grades:** GHG 5 · EN 5 · WW 5 · BD 4 · HS 4 · LR 3 · PS 3 · BO 3 · BE 3 · DP 3 · DV 2 · TX 2
- **Implied listed:** GHG, EN, WW, BD, HS, LR, PS, BO, BE, DP
- **Implied not listed:** DV, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 39. IF-GU — Gas Utilities & Distributors

- **Current grades:** HS 5 · GHG 4 · EN 4 · WW 4 · BD 3 · LR 3 · PS 3 · BO 3 · BE 3 · DP 3 · DV 2 · TX 2
- **Implied listed:** HS, GHG, EN, WW, BD, LR, PS, BO, BE, DP
- **Implied not listed:** DV, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 40. IF-HB — Home Builders

- **Current grades:** GHG 4 · EN 4 · WW 4 · BD 4 · HS 4 · LR 3 · PS 3 · BO 3 · BE 3 · DP 3 · DV 2 · TX 2
- **Implied listed:** GHG, EN, WW, BD, HS, LR, PS, BO, BE, DP
- **Implied not listed:** DV, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 41. IF-RE — Real Estate

- **Current grades:** EN 5 · GHG 4 · HS 4 · WW 3 · LR 3 · PS 3 · BO 3 · BE 3 · DP 3 · BD 2 · DV 2 · TX 2
- **Implied listed:** EN, GHG, HS, WW, LR, PS, BO, BE, DP
- **Implied not listed:** BD, DV, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 42. IF-RS — Real Estate Services

- **Current grades:** EN 4 · HS 4 · GHG 3 · BD 3 · LR 3 · PS 3 · BO 3 · BE 3 · DP 3 · WW 2 · DV 2 · TX 2
- **Implied listed:** EN, HS, GHG, BD, LR, PS, BO, BE, DP
- **Implied not listed:** WW, DV, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 43. IF-WM — Waste Management

- **Current grades:** EN 5 · WW 5 · HS 5 · GHG 4 · BD 3 · LR 3 · PS 3 · BO 3 · BE 3 · DP 3 · DV 2 · TX 2
- **Implied listed:** EN, WW, HS, GHG, BD, LR, PS, BO, BE, DP
- **Implied not listed:** DV, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 44. IF-WU — Water Utilities & Services

- **Current grades:** WW 5 · EN 4 · HS 4 · GHG 3 · BD 3 · LR 3 · PS 3 · BO 3 · BE 3 · DP 3 · DV 2 · TX 2
- **Implied listed:** WW, EN, HS, GHG, BD, LR, PS, BO, BE, DP
- **Implied not listed:** DV, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

## Renewable Resources & Alternative Energy

### 45. RR-BI — Biofuels

- **Current grades:** EN 5 · BD 5 · WW 4 · HS 4 · GHG 3 · LR 3 · PS 3 · BO 3 · BE 3 · DV 2 · DP 2 · TX 2
- **Implied listed:** EN, BD, WW, HS, GHG, LR, PS, BO, BE
- **Implied not listed:** DV, DP, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 46. RR-FC — Fuel Cells & Industrial Batteries

- **Current grades:** EN 5 · BD 4 · HS 4 · PS 4 · GHG 3 · WW 3 · LR 3 · BO 3 · BE 3 · DV 2 · DP 2 · TX 2
- **Implied listed:** EN, BD, HS, PS, GHG, WW, LR, BO, BE
- **Implied not listed:** DV, DP, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 47. RR-FM — Forestry Management

- **Current grades:** EN 5 · BD 5 · HS 5 · WW 4 · LR 4 · GHG 3 · PS 3 · BO 3 · BE 3 · DV 2 · DP 2 · TX 2
- **Implied listed:** EN, BD, HS, WW, LR, GHG, PS, BO, BE
- **Implied not listed:** DV, DP, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 48. RR-PP — Pulp & Paper Products

- **Current grades:** WW 5 · HS 5 · EN 4 · BD 4 · GHG 3 · LR 3 · PS 3 · BO 3 · BE 3 · DV 2 · DP 2 · TX 2
- **Implied listed:** WW, HS, EN, BD, GHG, LR, PS, BO, BE
- **Implied not listed:** DV, DP, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 49. RR-ST — Solar Technology & Project Developers

- **Current grades:** EN 5 · WW 4 · BD 4 · HS 4 · LR 3 · PS 3 · BO 3 · BE 3 · GHG 2 · DV 2 · DP 2 · TX 2
- **Implied listed:** EN, WW, BD, HS, LR, PS, BO, BE
- **Implied not listed:** GHG, DV, DP, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 50. RR-WT — Wind Technology & Project Developers

- **Current grades:** EN 5 · WW 4 · BD 4 · HS 4 · LR 3 · PS 3 · BO 3 · BE 3 · GHG 2 · DV 2 · DP 2 · TX 2
- **Implied listed:** EN, WW, BD, HS, LR, PS, BO, BE
- **Implied not listed:** GHG, DV, DP, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

## Resource Transformation

### 51. RT-AE — Aerospace & Defense

- **Current grades:** PS 5 · BE 5 · GHG 4 · EN 4 · WW 4 · HS 4 · LR 3 · DV 3 · BO 3 · BD 2 · DP 2 · TX 2
- **Implied listed:** PS, BE, GHG, EN, WW, HS, LR, DV, BO
- **Implied not listed:** BD, DP, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 52. RT-CH — Chemicals

- **Current grades:** WW 5 · HS 5 · PS 5 · GHG 4 · EN 4 · LR 3 · DV 3 · BO 3 · BE 3 · BD 2 · DP 2 · TX 2
- **Implied listed:** WW, HS, PS, GHG, EN, LR, DV, BO, BE
- **Implied not listed:** BD, DP, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 53. RT-CP — Containers & Packaging

- **Current grades:** WW 5 · GHG 4 · EN 4 · HS 4 · PS 4 · BD 3 · LR 3 · DV 3 · BO 3 · BE 3 · DP 2 · TX 2
- **Implied listed:** WW, GHG, EN, HS, PS, BD, LR, DV, BO, BE
- **Implied not listed:** DP, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 54. RT-EE — Electrical & Electronic Equipment

- **Current grades:** EN 4 · WW 4 · HS 4 · PS 4 · GHG 3 · LR 3 · DV 3 · BO 3 · BE 3 · DP 3 · BD 2 · TX 2
- **Implied listed:** EN, WW, HS, PS, GHG, LR, DV, BO, BE, DP
- **Implied not listed:** BD, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 55. RT-IG — Industrial Machinery & Goods

- **Current grades:** GHG 4 · EN 4 · HS 4 · PS 4 · WW 3 · LR 3 · DV 3 · BO 3 · BE 3 · BD 2 · DP 2 · TX 2
- **Implied listed:** GHG, EN, HS, PS, WW, LR, DV, BO, BE
- **Implied not listed:** BD, DP, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

## Services

### 56. SV-AD — Advertising & Marketing

- **Current grades:** DP 5 · DV 4 · BE 4 · LR 3 · PS 3 · BO 3 · GHG 2 · EN 2 · WW 2 · HS 2 · TX 2 · BD 1
- **Implied listed:** DP, DV, BE, LR, PS, BO
- **Implied not listed:** GHG, EN, WW, HS, TX, BD
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 57. SV-CA — Casinos & Gaming

- **Current grades:** BE 5 · LR 4 · DV 4 · DP 4 · PS 3 · BO 3 · GHG 2 · EN 2 · WW 2 · HS 2 · TX 2 · BD 1
- **Implied listed:** BE, LR, DV, DP, PS, BO
- **Implied not listed:** GHG, EN, WW, HS, TX, BD
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 58. SV-ED — Education

- **Current grades:** DV 4 · PS 4 · DP 4 · LR 3 · BO 3 · BE 3 · GHG 2 · EN 2 · WW 2 · HS 2 · TX 2 · BD 1
- **Implied listed:** DV, PS, DP, LR, BO, BE
- **Implied not listed:** GHG, EN, WW, HS, TX, BD
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 59. SV-HL — Hotels & Lodging

- **Current grades:** EN 4 · HS 4 · LR 4 · DV 4 · DP 4 · GHG 3 · WW 3 · PS 3 · BO 3 · BE 3 · TX 2 · BD 1
- **Implied listed:** EN, HS, LR, DV, DP, GHG, WW, PS, BO, BE
- **Implied not listed:** TX, BD
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 60. SV-LF — Leisure Facilities

- **Current grades:** HS 5 · DV 4 · DP 4 · GHG 3 · LR 3 · PS 3 · BO 3 · BE 3 · EN 2 · WW 2 · TX 2 · BD 1
- **Implied listed:** HS, DV, DP, GHG, LR, PS, BO, BE
- **Implied not listed:** EN, WW, TX, BD
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 61. SV-ME — Media & Entertainment

- **Current grades:** DP 5 · DV 4 · PS 4 · BE 4 · LR 3 · BO 3 · GHG 2 · EN 2 · WW 2 · HS 2 · TX 2 · BD 1
- **Implied listed:** DP, DV, PS, BE, LR, BO
- **Implied not listed:** GHG, EN, WW, HS, TX, BD
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 62. SV-PS — Professional & Commercial Services

- **Current grades:** DP 5 · DV 4 · BE 4 · LR 3 · PS 3 · BO 3 · TX 3 · GHG 2 · EN 2 · WW 2 · HS 2 · BD 1
- **Implied listed:** DP, DV, BE, LR, PS, BO, TX
- **Implied not listed:** GHG, EN, WW, HS, BD
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

## Technology & Communications

### 63. TC-ES — Electronic Manufacturing Services & Original Design Manufacturing

- **Current grades:** LR 5 · DP 5 · DV 4 · PS 4 · GHG 3 · EN 3 · BO 3 · BE 3 · TX 3 · WW 2 · HS 2 · BD 1
- **Implied listed:** LR, DP, DV, PS, GHG, EN, BO, BE, TX
- **Implied not listed:** WW, HS, BD
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 64. TC-HW — Hardware

- **Current grades:** LR 5 · DP 5 · WW 4 · DV 4 · GHG 3 · EN 3 · PS 3 · BO 3 · BE 3 · TX 3 · HS 2 · BD 1
- **Implied listed:** LR, DP, WW, DV, GHG, EN, PS, BO, BE, TX
- **Implied not listed:** HS, BD
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 65. TC-IM — Internet Media & Services

- **Current grades:** DP 5 · EN 4 · DV 4 · PS 4 · GHG 3 · LR 3 · BO 3 · BE 3 · TX 3 · WW 2 · HS 2 · BD 1
- **Implied listed:** DP, EN, DV, PS, GHG, LR, BO, BE, TX
- **Implied not listed:** WW, HS, BD
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 66. TC-SC — Semiconductors

- **Current grades:** WW 5 · DP 5 · GHG 4 · LR 4 · DV 4 · PS 4 · EN 3 · BO 3 · BE 3 · TX 3 · HS 2 · BD 1
- **Implied listed:** WW, DP, GHG, LR, DV, PS, EN, BO, BE, TX
- **Implied not listed:** HS, BD
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 67. TC-SI — Software & IT Services

- **Current grades:** DV 5 · DP 5 · EN 4 · LR 4 · PS 3 · BO 3 · BE 3 · TX 3 · GHG 2 · WW 2 · HS 2 · BD 1
- **Implied listed:** DV, DP, EN, LR, PS, BO, BE, TX
- **Implied not listed:** GHG, WW, HS, BD
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 68. TC-TL — Telecommunication Services

- **Current grades:** DP 5 · DV 4 · GHG 3 · EN 3 · LR 3 · PS 3 · BO 3 · BE 3 · TX 3 · WW 2 · HS 2 · BD 1
- **Implied listed:** DP, DV, GHG, EN, LR, PS, BO, BE, TX
- **Implied not listed:** WW, HS, BD
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

## Transportation

### 69. TR-AF — Air Freight & Logistics

- **Current grades:** GHG 5 · EN 5 · HS 5 · PS 5 · WW 3 · LR 3 · DV 3 · BO 3 · BE 3 · BD 2 · DP 2 · TX 2
- **Implied listed:** GHG, EN, HS, PS, WW, LR, DV, BO, BE
- **Implied not listed:** BD, DP, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 70. TR-AL — Airlines

- **Current grades:** GHG 5 · EN 5 · PS 5 · HS 4 · WW 3 · LR 3 · DV 3 · BO 3 · BE 3 · BD 2 · DP 2 · TX 2
- **Implied listed:** GHG, EN, PS, HS, WW, LR, DV, BO, BE
- **Implied not listed:** BD, DP, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 71. TR-AP — Auto Parts

- **Current grades:** PS 5 · GHG 4 · EN 4 · HS 4 · LR 4 · WW 3 · DV 3 · BO 3 · BE 3 · BD 2 · DP 2 · TX 2
- **Implied listed:** PS, GHG, EN, HS, LR, WW, DV, BO, BE
- **Implied not listed:** BD, DP, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 72. TR-AU — Automobiles

- **Current grades:** GHG 5 · PS 5 · EN 4 · HS 4 · LR 4 · DP 4 · WW 3 · DV 3 · BO 3 · BE 3 · BD 2 · TX 2
- **Implied listed:** GHG, PS, EN, HS, LR, DP, WW, DV, BO, BE
- **Implied not listed:** BD, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 73. TR-CL — Cruise Lines

- **Current grades:** GHG 5 · HS 5 · EN 4 · WW 4 · BD 4 · PS 4 · LR 3 · DV 3 · BO 3 · BE 3 · DP 2 · TX 2
- **Implied listed:** GHG, HS, EN, WW, BD, PS, LR, DV, BO, BE
- **Implied not listed:** DP, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 74. TR-CR — Car Rental & Leasing

- **Current grades:** GHG 4 · EN 4 · HS 4 · PS 4 · DP 4 · WW 3 · LR 3 · DV 3 · BO 3 · BE 3 · BD 2 · TX 2
- **Implied listed:** GHG, EN, HS, PS, DP, WW, LR, DV, BO, BE
- **Implied not listed:** BD, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 75. TR-MT — Marine Transportation

- **Current grades:** GHG 5 · HS 5 · EN 4 · WW 4 · BD 4 · PS 4 · LR 3 · DV 3 · BO 3 · BE 3 · DP 2 · TX 2
- **Implied listed:** GHG, HS, EN, WW, BD, PS, LR, DV, BO, BE
- **Implied not listed:** DP, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 76. TR-RA — Rail Transportation

- **Current grades:** HS 5 · GHG 4 · EN 4 · PS 4 · WW 3 · LR 3 · DV 3 · BO 3 · BE 3 · BD 2 · DP 2 · TX 2
- **Implied listed:** HS, GHG, EN, PS, WW, LR, DV, BO, BE
- **Implied not listed:** BD, DP, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 77. TR-RO — Road Transportation

- **Current grades:** GHG 5 · HS 5 · PS 5 · EN 4 · LR 4 · WW 3 · DV 3 · BO 3 · BE 3 · BD 2 · DP 2 · TX 2
- **Implied listed:** GHG, HS, PS, EN, LR, WW, DV, BO, BE
- **Implied not listed:** BD, DP, TX
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

---

## Sign-off

| Field | Value |
|---|---|
| Industries checked | |
| Gaps found (topics we lack) | |
| Errors corrected | |
| Checked by | |
| Date | |
