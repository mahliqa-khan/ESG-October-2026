# Weighting Verification Worksheet

Task: check that our grades match SASB's published disclosure-topic list for each
industry. 77 industries, 28 topics each — SASB's full 26 disclosure issues plus 2
GRI-sourced topics (Board Oversight, Tax & Transparency). Framework v0.5.0.

## The rule

| Does SASB list the topic for this industry? | Our grade should be |
|---|---|
| Yes | 5 |
| No | 1 or 2 |

A grade that breaks the rule is an error. Fix it in `framework/relevance.json` under
`byIndustry.<CODE>`.

**Why 5, not 3–5.** SASB's own note on greyed-out issues: greyed issues "were not identified
during the standard-setting process as the most likely to be useful to investors, so they are
not included in the Standard." A listed (bold) topic is therefore the standard's material set
for that industry, and the owner's rule is to grade it 5.

**What this cannot check.** SASB publishes the *list* of topics, not how heavily each
one weighs. The 5-vs-4 distinction is settled by backtesting, not citation.

## Topic codes

| Code | Topic | Code | Topic |
|---|---|---|---|
| **GHG** | Climate & GHG Emissions | **EN** | Energy Management |
| **WW** | Water, Waste & Circularity | **BD** | Biodiversity & Land Use |
| **HS** | Workforce Health & Safety | **LR** | Labour Practices & Human Rights |
| **DV** | Diversity, Equity & Talent | **PS** | Product Safety & Quality |
| **BO** | Board Oversight & ESG Governance | **BE** | Business Ethics & Anti-Corruption |
| **DP** | Data Privacy & Cybersecurity | **TX** | Tax & Transparency |
| **MS** | Materials Sourcing & Efficiency | **PD** | Product Design & Lifecycle Management |

## SASB 26 issues -> our topics (coverage map)

Use this to map bold SASB issues to our topics before verdicting. **Covered** = maps to one of
our topics. **GAP** = SASB lists it but we have no topic for it (needs a new topic, like MS/PD).

| SASB issue | Dimension | Our topic | Status |
|---|---|---|---|
| GHG Emissions | E | GHG | covered |
| Air Quality | E | — | GAP |
| Energy Management | E | EN | covered |
| Water & Wastewater Management | E | WW | covered |
| Waste & Hazardous Materials Management | E | WW | covered |
| Ecological Impacts | E | BD | covered |
| Human Rights & Community Relations | S | LR (human rights) | partial (community GAP) |
| Customer Privacy | S | DP | covered |
| Data Security | S | DP | covered |
| Access & Affordability | S | — | GAP |
| Product Quality & Safety | S | PS | covered |
| Customer Welfare | S | — | GAP |
| Selling Practices & Product Labeling | S | — | GAP |
| Labor Practices | S | LR | covered |
| Employee Health & Safety | S | HS | covered |
| Employee Engagement, Diversity & Inclusion | S | DV | covered |
| Product Design & Lifecycle Management | B | PD | covered |
| Business Model Resilience | B | — | GAP |
| Supply Chain Management | B | LR | covered |
| Materials Sourcing & Efficiency | B | MS | covered |
| Physical Impacts of Climate Change | B | — | GAP |
| Business Ethics | G | BE | covered |
| Competitive Behavior | G | BE | partial |
| Management of the Legal & Regulatory Environment | G | — | GAP |
| Critical Incident Risk Management | G | — | GAP |
| Systemic Risk Management | G | — | GAP |

Covered: 16 of 26. Gaps: 10 (Air Quality, Community Relations, Access & Affordability, Customer
Welfare, Selling Practices, Business Model Resilience, Physical Impacts of Climate Change,
Legal & Regulatory Environment, Critical Incident Risk Management, Systemic Risk Management).

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
- **SASB's topics:** Product Quality & Safety; Supply Chain Management; Materials Sourcing & Efficiency
- **Verdict:** error (8 over-graded); gap (1 topic missing)
- **Notes:** SASB lists 3 topics for CG-AA; we map 2 and miss 1.
  - Product Quality & Safety -> product-safety (5) = match
  - Supply Chain Management -> supply-chain (5) = match
  - Materials Sourcing & Efficiency -> materials (5) = match
  - All other topics 2 (not listed). Applied in generate_relevance.py BOLD map.

### 2. CG-AM — Appliance Manufacturing

- **Current grades:** PS 5 · EN 4 · LR 4 · GHG 3 · WW 3 · HS 3 · DV 3 · BO 3 · BE 3 · DP 3 · BD 2 · TX 2
- **Implied listed:** PS, EN, LR, GHG, WW, HS, DV, BO, BE, DP
- **Implied not listed:** BD, TX
- **SASB's topics:** Product Quality & Safety; Product Design & Lifecycle Management
- **Verdict:** error (corrected); gap (1 topic missing)
- **Notes:** SASB lists 2 topics for CG-AM; we map 1 and miss 1.
  - Product Quality & Safety -> product-safety (5) = match
  - Product Design & Lifecycle Management -> added as 14th topic `product-design` (PD), graded 5 = match
  - All other topics corrected to 2 (not listed). Reweighted in generate_relevance.py.
  - RESOLVED: product-design added in framework.json v0.4.0; its 77 grades are still DRAFT.

### 3. CG-BF — Building Products & Furnishings

- **Current grades:** LR 4 · PS 4 · GHG 3 · EN 3 · WW 3 · HS 3 · DV 3 · BO 3 · BE 3 · DP 3 · BD 2 · TX 2
- **Implied listed:** LR, PS, GHG, EN, WW, HS, DV, BO, BE, DP
- **Implied not listed:** BD, TX
- **SASB's topics:** Energy Management; Product Quality & Safety; Product Design & Lifecycle Management; Supply Chain Management
- **Verdict:** match (all 4)
- **Notes:** All 4 SASB topics map to our topics and are graded 5; all others 2.
  - Energy Management -> energy (5)
  - Product Quality & Safety -> product-safety (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Supply Chain Management -> supply-chain (5)

- **Current grades:** DP 5 · LR 4 · PS 4 · GHG 3 · EN 3 · WW 3 · HS 3 · DV 3 · BO 3 · BE 3 · BD 2 · TX 2
- **Implied listed:** DP, LR, PS, GHG, EN, WW, HS, DV, BO, BE
- **Implied not listed:** BD, TX
- **SASB's topics:** Energy Management; Customer Privacy; Data Security; Employee Engagement, Diversity & Inclusion; Product Design & Lifecycle Management
- **Verdict:** match (all 5)
- **Notes:** All 5 SASB topics map to our topics and are graded 5; all others 2.
  - Energy Management -> energy (5)
  - Customer Privacy -> customer-privacy (5)
  - Data Security -> data-security (5)
  - Employee Engagement, Diversity & Inclusion -> diversity (5)
  - Product Design & Lifecycle Management -> product-design (5)

### 5. CG-HP — Household & Personal Products

- **Current grades:** PS 5 · WW 4 · LR 4 · GHG 3 · EN 3 · HS 3 · DV 3 · BO 3 · BE 3 · DP 3 · BD 2 · TX 2
- **Implied listed:** PS, WW, LR, GHG, EN, HS, DV, BO, BE, DP
- **Implied not listed:** BD, TX
- **SASB's topics:** Water & Wastewater Management; Product Quality & Safety; Product Design & Lifecycle Management; Supply Chain Management
- **Verdict:** match (all 4)
- **Notes:** All 4 SASB topics map to our topics and are graded 5; all others 2.
  - Water & Wastewater Management -> water (5)
  - Product Quality & Safety -> product-safety (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Supply Chain Management -> supply-chain (5)

### 6. CG-MR — Multiline & Specialty Retailers & Distributors

- **Current grades:** LR 4 · PS 4 · DP 4 · GHG 3 · EN 3 · WW 3 · HS 3 · DV 3 · BO 3 · BE 3 · BD 2 · TX 2
- **Implied listed:** LR, PS, DP, GHG, EN, WW, HS, DV, BO, BE
- **Implied not listed:** BD, TX
- **SASB's topics:** Energy Management; Data Security; Labor Practices; Employee Engagement, Diversity & Inclusion; Product Design & Lifecycle Management
- **Verdict:** match (all 5)
- **Notes:** All 5 SASB topics map to our topics and are graded 5; all others 2.
  - Energy Management -> energy (5)
  - Data Security -> data-security (5)
  - Labor Practices -> labour-rights (5)
  - Employee Engagement, Diversity & Inclusion -> diversity (5)
  - Product Design & Lifecycle Management -> product-design (5)

### 7. CG-TO — Toys & Sporting Goods

- **Current grades:** PS 5 · LR 4 · GHG 3 · EN 3 · WW 3 · HS 3 · DV 3 · BO 3 · BE 3 · DP 3 · BD 2 · TX 2
- **Implied listed:** PS, LR, GHG, EN, WW, HS, DV, BO, BE, DP
- **Implied not listed:** BD, TX
- **SASB's topics:** Product Quality & Safety; Supply Chain Management
- **Verdict:** match (both)
- **Notes:** Both SASB topics map to our topics and are graded 5; all others 2.
  - Product Quality & Safety -> product-safety (5)
  - Supply Chain Management -> supply-chain (5)

## Extractives & Minerals Processing

### 8. EM-CM — Construction Materials

- **Current grades:** GHG 4 · EN 4 · HS 4 · LR 4 · BO 4 · BE 4 · WW 3 · BD 3 · DV 3 · TX 3 · PS 2 · DP 2
- **Implied listed:** GHG, EN, HS, LR, BO, BE, WW, BD, DV, TX
- **Implied not listed:** PS, DP
- **SASB's topics:** GHG Emissions; Air Quality; Energy Management; Water & Wastewater Management; Waste & Hazardous Materials Management; Ecological Impacts; Employee Health & Safety; Product Design & Lifecycle Management; Competitive Behavior
- **Verdict:** match (all 9)
- **Notes:** All 9 SASB topics map to our topics and are graded 5; all others 2.
  - GHG Emissions -> ghg (5)
  - Air Quality -> air-quality (5)
  - Energy Management -> energy (5)
  - Water & Wastewater Management -> water (5)
  - Waste & Hazardous Materials Management -> waste (5)
  - Ecological Impacts -> biodiversity (5)
  - Employee Health & Safety -> health-safety (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Competitive Behavior -> competitive-behavior (5)

### 9. EM-CO — Coal Operations

- **Current grades:** GHG 5 · EN 5 · HS 5 · WW 4 · BD 4 · LR 4 · BO 4 · BE 4 · DV 3 · TX 3 · PS 2 · DP 2
- **Implied listed:** GHG, EN, HS, WW, BD, LR, BO, BE, DV, TX
- **Implied not listed:** PS, DP
- **SASB's topics:** GHG Emissions; Water & Wastewater Management; Waste & Hazardous Materials Management; Ecological Impacts; Human Rights & Community Relations; Labor Practices; Employee Health & Safety; Business Model Resilience; Critical Incident Risk Management
- **Verdict:** match (all 9)
- **Notes:** All 9 SASB topics map to our topics and are graded 5; all others 2.
  - GHG Emissions -> ghg (5)
  - Water & Wastewater Management -> water (5)
  - Waste & Hazardous Materials Management -> waste (5)
  - Ecological Impacts -> biodiversity (5)
  - Human Rights & Community Relations -> human-rights (5)
  - Labor Practices -> labour-rights (5)
  - Employee Health & Safety -> health-safety (5)
  - Business Model Resilience -> business-model (5)
  - Critical Incident Risk Management -> critical-incident (5)

### 10. EM-EP — Oil & Gas - Exploration & Production

- **Current grades:** GHG 5 · EN 5 · HS 5 · WW 4 · BD 4 · LR 4 · BO 4 · BE 4 · DV 3 · TX 3 · PS 2 · DP 2
- **Implied listed:** GHG, EN, HS, WW, BD, LR, BO, BE, DV, TX
- **Implied not listed:** PS, DP
- **SASB's topics:** GHG Emissions; Air Quality; Water & Wastewater Management; Ecological Impacts; Human Rights & Community Relations; Employee Health & Safety; Business Model Resilience; Business Ethics; Management of the Legal & Regulatory Environment; Critical Incident Risk Management
- **Verdict:** match (all 10)
- **Notes:** All 10 SASB topics map to our topics and are graded 5; all others 2.
  - GHG Emissions -> ghg (5)
  - Air Quality -> air-quality (5)
  - Water & Wastewater Management -> water (5)
  - Ecological Impacts -> biodiversity (5)
  - Human Rights & Community Relations -> human-rights (5)
  - Employee Health & Safety -> health-safety (5)
  - Business Model Resilience -> business-model (5)
  - Business Ethics -> business-ethics (5)
  - Management of the Legal & Regulatory Environment -> legal-regulatory (5)
  - Critical Incident Risk Management -> critical-incident (5)

### 11. EM-IS — Iron & Steel Producers

- **Current grades:** GHG 5 · WW 5 · HS 5 · EN 4 · BD 4 · LR 4 · BO 4 · BE 4 · DV 3 · TX 3 · PS 2 · DP 2
- **Implied listed:** GHG, WW, HS, EN, BD, LR, BO, BE, DV, TX
- **Implied not listed:** PS, DP
- **SASB's topics:** GHG Emissions; Air Quality; Energy Management; Water & Wastewater Management; Waste & Hazardous Materials Management; Employee Health & Safety; Supply Chain Management
- **Verdict:** match (all 7)
- **Notes:** All 7 SASB topics map to our topics and are graded 5; all others 2.
  - GHG Emissions -> ghg (5)
  - Air Quality -> air-quality (5)
  - Energy Management -> energy (5)
  - Water & Wastewater Management -> water (5)
  - Waste & Hazardous Materials Management -> waste (5)
  - Employee Health & Safety -> health-safety (5)
  - Supply Chain Management -> supply-chain (5)

### 12. EM-MD — Oil & Gas - Midstream

- **Current grades:** GHG 5 · EN 5 · WW 5 · HS 4 · LR 4 · BO 4 · BE 4 · BD 3 · DV 3 · TX 3 · PS 2 · DP 2
- **Implied listed:** GHG, EN, WW, HS, LR, BO, BE, BD, DV, TX
- **Implied not listed:** PS, DP
- **SASB's topics:** GHG Emissions; Air Quality; Ecological Impacts; Competitive Behavior; Critical Incident Risk Management
- **Verdict:** match (all 5)
- **Notes:** All 5 SASB topics map to our topics and are graded 5; all others 2.
  - GHG Emissions -> ghg (5)
  - Air Quality -> air-quality (5)
  - Ecological Impacts -> biodiversity (5)
  - Competitive Behavior -> competitive-behavior (5)
  - Critical Incident Risk Management -> critical-incident (5)

### 13. EM-MM — Metals & Mining

- **Current grades:** EN 5 · WW 5 · BD 5 · HS 5 · GHG 4 · LR 4 · BO 4 · BE 4 · DV 3 · TX 3 · PS 2 · DP 2
- **Implied listed:** EN, WW, BD, HS, GHG, LR, BO, BE, DV, TX
- **Implied not listed:** PS, DP
- **SASB's topics:** GHG Emissions; Air Quality; Energy Management; Water & Wastewater Management; Waste & Hazardous Materials Management; Ecological Impacts; Human Rights & Community Relations; Labor Practices; Employee Health & Safety; Business Ethics; Critical Incident Risk Management
- **Verdict:** match (all 11)
- **Notes:** All 11 SASB topics map to our topics and are graded 5; all others 2.
  - GHG Emissions -> ghg (5)
  - Air Quality -> air-quality (5)
  - Energy Management -> energy (5)
  - Water & Wastewater Management -> water (5)
  - Waste & Hazardous Materials Management -> waste (5)
  - Ecological Impacts -> biodiversity (5)
  - Human Rights & Community Relations -> human-rights (5)
  - Labor Practices -> labour-rights (5)
  - Employee Health & Safety -> health-safety (5)
  - Business Ethics -> business-ethics (5)
  - Critical Incident Risk Management -> critical-incident (5)

### 14. EM-RM — Oil & Gas - Refining & Marketing

- **Current grades:** GHG 5 · EN 5 · WW 5 · BD 4 · HS 4 · LR 4 · BO 4 · BE 4 · DV 3 · PS 3 · TX 3 · DP 2
- **Implied listed:** GHG, EN, WW, BD, HS, LR, BO, BE, DV, PS, TX
- **Implied not listed:** DP
- **SASB's topics:** GHG Emissions; Air Quality; Water & Wastewater Management; Waste & Hazardous Materials Management; Employee Health & Safety; Product Design & Lifecycle Management; Competitive Behavior; Management of the Legal & Regulatory Environment; Critical Incident Risk Management
- **Verdict:** match (all 9)
- **Notes:** All 9 SASB topics map to our topics and are graded 5; all others 2.
  - GHG Emissions -> ghg (5)
  - Air Quality -> air-quality (5)
  - Water & Wastewater Management -> water (5)
  - Waste & Hazardous Materials Management -> waste (5)
  - Employee Health & Safety -> health-safety (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Competitive Behavior -> competitive-behavior (5)
  - Management of the Legal & Regulatory Environment -> legal-regulatory (5)
  - Critical Incident Risk Management -> critical-incident (5)

### 15. EM-SV — Oil & Gas - Services

- **Current grades:** EN 5 · WW 5 · HS 5 · GHG 4 · BD 4 · LR 4 · BO 4 · BE 4 · DV 3 · TX 3 · PS 2 · DP 2
- **Implied listed:** EN, WW, HS, GHG, BD, LR, BO, BE, DV, TX
- **Implied not listed:** PS, DP
- **SASB's topics:** Water & Wastewater Management; GHG Emissions; Waste & Hazardous Materials Management; Ecological Impacts; Employee Health & Safety; Business Ethics; Management of the Legal & Regulatory Environment; Critical Incident Risk Management
- **Verdict:** match (all 8)
- **Notes:** All 8 SASB topics map to our topics and are graded 5; all others 2.
  - Water & Wastewater Management -> water (5)
  - GHG Emissions -> ghg (5)
  - Waste & Hazardous Materials Management -> waste (5)
  - Ecological Impacts -> biodiversity (5)
  - Employee Health & Safety -> health-safety (5)
  - Business Ethics -> business-ethics (5)
  - Management of the Legal & Regulatory Environment -> legal-regulatory (5)
  - Critical Incident Risk Management -> critical-incident (5)

## Financials

### 16. FN-AC — Asset Management & Custody Activities

- **Current grades:** DV 5 · BO 5 · BE 5 · DP 5 · GHG 4 · TX 3 · EN 2 · HS 2 · LR 2 · PS 2 · WW 1 · BD 1
- **Implied listed:** DV, BO, BE, DP, GHG, TX
- **Implied not listed:** EN, HS, LR, PS, WW, BD
- **SASB's topics:** Selling Practices & Product Labeling; Employee Engagement, Diversity & Inclusion; Product Design & Lifecycle Management; Business Ethics
- **Verdict:** match (all 4)
- **Notes:** All 4 SASB topics map to our topics and are graded 5; all others 2.
  - Selling Practices & Product Labeling -> selling-practices (5)
  - Employee Engagement, Diversity & Inclusion -> diversity (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Business Ethics -> business-ethics (5)

### 17. FN-CB — Commercial Banks

- **Current grades:** BO 5 · BE 5 · DP 5 · DV 4 · GHG 3 · TX 3 · EN 2 · HS 2 · LR 2 · PS 2 · WW 1 · BD 1
- **Implied listed:** BO, BE, DP, DV, GHG, TX
- **Implied not listed:** EN, HS, LR, PS, WW, BD
- **SASB's topics:** Data Security; Access & Affordability; Product Design & Lifecycle Management; Business Ethics; Systemic Risk Management
- **Verdict:** match (all 5)
- **Notes:** All 5 SASB topics map to our topics and are graded 5; all others 2.
  - Data Security -> data-security (5)
  - Access & Affordability -> access-affordability (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Business Ethics -> business-ethics (5)
  - Systemic Risk Management -> systemic-risk (5)

### 18. FN-CF — Consumer Finance

- **Current grades:** DP 5 · DV 4 · BO 4 · BE 4 · GHG 3 · LR 3 · TX 3 · EN 2 · HS 2 · PS 2 · WW 1 · BD 1
- **Implied listed:** DP, DV, BO, BE, GHG, LR, TX
- **Implied not listed:** EN, HS, PS, WW, BD
- **SASB's topics:** Customer Privacy; Data Security; Selling Practices & Product Labeling
- **Verdict:** match (all 3)
- **Notes:** All 3 SASB topics map to our topics and are graded 5; all others 2.
  - Customer Privacy -> customer-privacy (5)
  - Data Security -> data-security (5)
  - Selling Practices & Product Labeling -> selling-practices (5)

### 19. FN-EX — Security & Commodity Exchanges

- **Current grades:** BO 5 · BE 5 · DP 5 · DV 4 · GHG 3 · TX 3 · EN 2 · HS 2 · LR 2 · PS 2 · WW 1 · BD 1
- **Implied listed:** BO, BE, DP, DV, GHG, TX
- **Implied not listed:** EN, HS, LR, PS, WW, BD
- **SASB's topics:** Product Design & Lifecycle Management; Business Ethics; Systemic Risk Management
- **Verdict:** match (all 3)
- **Notes:** All 3 SASB topics map to our topics and are graded 5; all others 2.
  - Product Design & Lifecycle Management -> product-design (5)
  - Business Ethics -> business-ethics (5)
  - Systemic Risk Management -> systemic-risk (5)

### 20. FN-IB — Investment Banking & Brokerage

- **Current grades:** BO 5 · BE 5 · DP 5 · DV 4 · GHG 3 · TX 3 · EN 2 · HS 2 · LR 2 · PS 2 · WW 1 · BD 1
- **Implied listed:** BO, BE, DP, DV, GHG, TX
- **Implied not listed:** EN, HS, LR, PS, WW, BD
- **SASB's topics:** Employee Engagement, Diversity & Inclusion; Product Design & Lifecycle Management; Business Ethics; Systemic Risk Management
- **Verdict:** match (all 4)
- **Notes:** All 4 SASB topics map to our topics and are graded 5; all others 2.
  - Employee Engagement, Diversity & Inclusion -> diversity (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Business Ethics -> business-ethics (5)
  - Systemic Risk Management -> systemic-risk (5)

### 21. FN-IN — Insurance

- **Current grades:** DP 5 · DV 4 · BO 4 · BE 4 · GHG 3 · PS 3 · TX 3 · EN 2 · HS 2 · LR 2 · WW 1 · BD 1
- **Implied listed:** DP, DV, BO, BE, GHG, PS, TX
- **Implied not listed:** EN, HS, LR, WW, BD
- **SASB's topics:** Selling Practices & Product Labeling; Product Design & Lifecycle Management; Physical Impacts of Climate Change; Systemic Risk Management
- **Verdict:** match (all 4)
- **Notes:** All 4 SASB topics map to our topics and are graded 5; all others 2.
  - Selling Practices & Product Labeling -> selling-practices (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Physical Impacts of Climate Change -> climate-physical (5)
  - Systemic Risk Management -> systemic-risk (5)

### 22. FN-MF — Mortgage Finance

- **Current grades:** DV 4 · BO 4 · BE 4 · DP 4 · GHG 3 · TX 3 · EN 2 · HS 2 · LR 2 · PS 2 · WW 1 · BD 1
- **Implied listed:** DV, BO, BE, DP, GHG, TX
- **Implied not listed:** EN, HS, LR, PS, WW, BD
- **SASB's topics:** Selling Practices & Product Labeling; Physical Impacts of Climate Change
- **Verdict:** match (both)
- **Notes:** Both SASB topics map to our topics and are graded 5; all others 2.
  - Selling Practices & Product Labeling -> selling-practices (5)
  - Physical Impacts of Climate Change -> climate-physical (5)

## Food & Beverage

### 23. FB-AB — Alcoholic Beverages

- **Current grades:** WW 5 · HS 4 · LR 4 · PS 4 · BE 4 · GHG 3 · EN 3 · BD 3 · DV 3 · BO 3 · DP 2 · TX 2
- **Implied listed:** WW, HS, LR, PS, BE, GHG, EN, BD, DV, BO
- **Implied not listed:** DP, TX
- **SASB's topics:** Energy Management; Water & Wastewater Management; Selling Practices & Product Labeling; Product Design & Lifecycle Management; Supply Chain Management; Materials Sourcing & Efficiency
- **Verdict:** match (all 6)
- **Notes:** All 6 SASB topics map to our topics and are graded 5; all others 2.
  - Energy Management -> energy (5)
  - Water & Wastewater Management -> water (5)
  - Selling Practices & Product Labeling -> selling-practices (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Supply Chain Management -> supply-chain (5)
  - Materials Sourcing & Efficiency -> materials (5)

### 24. FB-AG — Agricultural Products

- **Current grades:** WW 5 · BD 5 · PS 5 · GHG 4 · HS 4 · LR 4 · EN 3 · DV 3 · BO 3 · BE 3 · DP 2 · TX 2
- **Implied listed:** WW, BD, PS, GHG, HS, LR, EN, DV, BO, BE
- **Implied not listed:** DP, TX
- **SASB's topics:** GHG Emissions; Energy Management; Water & Wastewater Management; Product Quality & Safety; Employee Health & Safety; Supply Chain Management; Materials Sourcing & Efficiency
- **Verdict:** match (all 7)
- **Notes:** All 7 SASB topics map to our topics and are graded 5; all others 2.
  - GHG Emissions -> ghg (5)
  - Energy Management -> energy (5)
  - Water & Wastewater Management -> water (5)
  - Product Quality & Safety -> product-safety (5)
  - Employee Health & Safety -> health-safety (5)
  - Supply Chain Management -> supply-chain (5)
  - Materials Sourcing & Efficiency -> materials (5)

### 25. FB-FR — Food Retailers & Distributors

- **Current grades:** GHG 4 · WW 4 · HS 4 · LR 4 · PS 4 · EN 3 · BD 3 · DV 3 · BO 3 · BE 3 · DP 2 · TX 2
- **Implied listed:** GHG, WW, HS, LR, PS, EN, BD, DV, BO, BE
- **Implied not listed:** DP, TX
- **SASB's topics:** GHG Emissions; Energy Management; Waste & Hazardous Materials Management; Data Security; Product Quality & Safety; Customer Welfare; Selling Practices & Product Labeling; Labor Practices; Supply Chain Management
- **Verdict:** match (all 9)
- **Notes:** All 9 SASB topics map to our topics and are graded 5; all others 2.
  - GHG Emissions -> ghg (5)
  - Energy Management -> energy (5)
  - Waste & Hazardous Materials Management -> waste (5)
  - Data Security -> data-security (5)
  - Product Quality & Safety -> product-safety (5)
  - Customer Welfare -> customer-welfare (5)
  - Selling Practices & Product Labeling -> selling-practices (5)
  - Labor Practices -> labour-rights (5)
  - Supply Chain Management -> supply-chain (5)

### 26. FB-MP — Meat, Poultry & Dairy

- **Current grades:** GHG 5 · WW 5 · PS 5 · BD 4 · HS 4 · LR 4 · EN 3 · DV 3 · BO 3 · BE 3 · DP 2 · TX 2
- **Implied listed:** GHG, WW, PS, BD, HS, LR, EN, DV, BO, BE
- **Implied not listed:** DP, TX
- **SASB's topics:** GHG Emissions; Energy Management; Water & Wastewater Management; Ecological Impacts; Product Quality & Safety; Customer Welfare; Employee Health & Safety; Product Design & Lifecycle Management; Supply Chain Management; Materials Sourcing & Efficiency
- **Verdict:** match (all 10)
- **Notes:** All 10 SASB topics map to our topics and are graded 5; all others 2.
  - GHG Emissions -> ghg (5)
  - Energy Management -> energy (5)
  - Water & Wastewater Management -> water (5)
  - Ecological Impacts -> biodiversity (5)
  - Product Quality & Safety -> product-safety (5)
  - Customer Welfare -> customer-welfare (5)
  - Employee Health & Safety -> health-safety (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Supply Chain Management -> supply-chain (5)
  - Materials Sourcing & Efficiency -> materials (5)

### 27. FB-NB — Non-Alcoholic Beverages

- **Current grades:** WW 5 · HS 4 · LR 4 · PS 4 · GHG 3 · EN 3 · BD 3 · DV 3 · BO 3 · BE 3 · DP 2 · TX 2
- **Implied listed:** WW, HS, LR, PS, GHG, EN, BD, DV, BO, BE
- **Implied not listed:** DP, TX
- **SASB's topics:** GHG Emissions; Energy Management; Water & Wastewater Management; Customer Welfare; Selling Practices & Product Labeling; Product Design & Lifecycle Management; Supply Chain Management; Materials Sourcing & Efficiency
- **Verdict:** match (all 8)
- **Notes:** All 8 SASB topics map to our topics and are graded 5; all others 2.
  - GHG Emissions -> ghg (5)
  - Energy Management -> energy (5)
  - Water & Wastewater Management -> water (5)
  - Customer Welfare -> customer-welfare (5)
  - Selling Practices & Product Labeling -> selling-practices (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Supply Chain Management -> supply-chain (5)
  - Materials Sourcing & Efficiency -> materials (5)
- **SASB's topics:** 
- **Verdict:** 
- **Notes:** 

### 28. FB-PF — Processed Foods

- **Current grades:** PS 5 · GHG 4 · WW 4 · HS 4 · LR 4 · EN 3 · BD 3 · DV 3 · BO 3 · BE 3 · DP 2 · TX 2
- **Implied listed:** PS, GHG, WW, HS, LR, EN, BD, DV, BO, BE
- **Implied not listed:** DP, TX
- **SASB's topics:** Energy Management; Water & Wastewater Management; Product Quality & Safety; Customer Welfare; Selling Practices & Product Labeling; Product Design & Lifecycle Management; Supply Chain Management; Materials Sourcing & Efficiency
- **Verdict:** match (all 8)
- **Notes:** All 8 SASB topics map to our topics and are graded 5; all others 2.
  - Energy Management -> energy (5)
  - Water & Wastewater Management -> water (5)
  - Product Quality & Safety -> product-safety (5)
  - Customer Welfare -> customer-welfare (5)
  - Selling Practices & Product Labeling -> selling-practices (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Supply Chain Management -> supply-chain (5)
  - Materials Sourcing & Efficiency -> materials (5)

### 29. FB-RN — Restaurants

- **Current grades:** HS 5 · LR 5 · WW 4 · PS 4 · GHG 3 · EN 3 · BD 3 · DV 3 · BO 3 · BE 3 · DP 2 · TX 2
- **Implied listed:** HS, LR, WW, PS, GHG, EN, BD, DV, BO, BE
- **Implied not listed:** DP, TX
- **SASB's topics:** Energy Management; Water & Wastewater Management; Waste & Hazardous Materials Management; Product Quality & Safety; Customer Welfare; Labor Practices; Supply Chain Management
- **Verdict:** match (all 7)
- **Notes:** All 7 SASB topics map to our topics and are graded 5; all others 2.
  - Energy Management -> energy (5)
  - Water & Wastewater Management -> water (5)
  - Waste & Hazardous Materials Management -> waste (5)
  - Product Quality & Safety -> product-safety (5)
  - Customer Welfare -> customer-welfare (5)
  - Labor Practices -> labour-rights (5)
  - Supply Chain Management -> supply-chain (5) 
- **Notes:** 

### 30. FB-TB — Tobacco

- **Current grades:** PS 5 · BE 5 · GHG 4 · WW 4 · HS 4 · LR 4 · EN 3 · BD 3 · DV 3 · BO 3 · DP 2 · TX 2
- **Implied listed:** PS, BE, GHG, WW, HS, LR, EN, BD, DV, BO
- **Implied not listed:** DP, TX
- **SASB's topics:** Customer Welfare; Selling Practices & Product Labeling
- **Verdict:** match (both)
- **Notes:** Both SASB topics map to our topics and are graded 5; all others 2.
  - Customer Welfare -> customer-welfare (5)
  - Selling Practices & Product Labeling -> selling-practices (5)

## Health Care

### 31. HC-BP — Biotechnology & Pharmaceuticals

- **Current grades:** PS 5 · BE 5 · DP 4 · EN 3 · WW 3 · HS 3 · DV 3 · BO 3 · GHG 2 · LR 2 · TX 2 · BD 1
- **Implied listed:** PS, BE, DP, EN, WW, HS, DV, BO
- **Implied not listed:** GHG, LR, TX, BD
- **SASB's topics:** Human Rights & Community Relations; Access & Affordability; Product Quality & Safety; Customer Welfare; Selling Practices & Product Labeling; Employee Engagement, Diversity & Inclusion; Supply Chain Management; Business Ethics
- **Verdict:** match (all 8)
- **Notes:** All 8 SASB topics map to our topics and are graded 5; all others 2.
  - Human Rights & Community Relations -> human-rights (5)
  - Access & Affordability -> access-affordability (5)
  - Product Quality & Safety -> product-safety (5)
  - Customer Welfare -> customer-welfare (5)
  - Selling Practices & Product Labeling -> selling-practices (5)
  - Employee Engagement, Diversity & Inclusion -> diversity (5)
  - Supply Chain Management -> supply-chain (5)
  - Business Ethics -> business-ethics (5)

### 32. HC-DI — Health Care Distributors

- **Current grades:** PS 5 · BE 4 · DP 4 · EN 3 · WW 3 · HS 3 · DV 3 · BO 3 · GHG 2 · LR 2 · TX 2 · BD 1
- **Implied listed:** PS, BE, DP, EN, WW, HS, DV, BO
- **Implied not listed:** GHG, LR, TX, BD
- **SASB's topics:** GHG Emissions; Product Quality & Safety; Customer Welfare; Product Design & Lifecycle Management; Business Ethics
- **Verdict:** match (all 5)
- **Notes:** All 5 SASB topics map to our topics and are graded 5; all others 2.
  - GHG Emissions -> ghg (5)
  - Product Quality & Safety -> product-safety (5)
  - Customer Welfare -> customer-welfare (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Business Ethics -> business-ethics (5)

### 33. HC-DR — Drug Retailers

- **Current grades:** PS 5 · DP 4 · EN 3 · WW 3 · HS 3 · DV 3 · BO 3 · BE 3 · GHG 2 · LR 2 · TX 2 · BD 1
- **Implied listed:** PS, DP, EN, WW, HS, DV, BO, BE
- **Implied not listed:** GHG, LR, TX, BD
- **SASB's topics:** Energy Management; Data Security; Product Quality & Safety; Customer Welfare
- **Verdict:** match (all 4)
- **Notes:** All 4 SASB topics map to our topics and are graded 5; all others 2.
  - Energy Management -> energy (5)
  - Data Security -> data-security (5)
  - Product Quality & Safety -> product-safety (5)
  - Customer Welfare -> customer-welfare (5)

### 34. HC-DY — Health Care Delivery

- **Current grades:** PS 5 · DP 5 · HS 4 · LR 4 · EN 3 · WW 3 · DV 3 · BO 3 · BE 3 · GHG 2 · TX 2 · BD 1
- **Implied listed:** PS, DP, HS, LR, EN, WW, DV, BO, BE
- **Implied not listed:** GHG, TX, BD
- **SASB's topics:** Energy Management; Waste & Hazardous Materials Management; Data Security; Access & Affordability; Product Quality & Safety; Customer Welfare; Selling Practices & Product Labeling; Employee Health & Safety; Employee Engagement, Diversity & Inclusion; Physical Impacts of Climate Change; Business Ethics
- **Verdict:** match (all 11)
- **Notes:** All 11 SASB topics map to our topics and are graded 5; all others 2.
  - Energy Management -> energy (5)
  - Waste & Hazardous Materials Management -> waste (5)
  - Data Security -> data-security (5)
  - Access & Affordability -> access-affordability (5)
  - Product Quality & Safety -> product-safety (5)
  - Customer Welfare -> customer-welfare (5)
  - Selling Practices & Product Labeling -> selling-practices (5)
  - Employee Health & Safety -> health-safety (5)
  - Employee Engagement, Diversity & Inclusion -> diversity (5)
  - Physical Impacts of Climate Change -> climate-physical (5)
  - Business Ethics -> business-ethics (5)

### 35. HC-MC — Managed Care

- **Current grades:** PS 5 · DP 5 · BE 4 · EN 3 · WW 3 · HS 3 · DV 3 · BO 3 · GHG 2 · LR 2 · TX 2 · BD 1
- **Implied listed:** PS, DP, BE, EN, WW, HS, DV, BO
- **Implied not listed:** GHG, LR, TX, BD
- **SASB's topics:** Data Security; Access & Affordability; Product Quality & Safety; Customer Welfare; Physical Impacts of Climate Change
- **Verdict:** match (all 5)
- **Notes:** All 5 SASB topics map to our topics and are graded 5; all others 2.
  - Data Security -> data-security (5)
  - Access & Affordability -> access-affordability (5)
  - Product Quality & Safety -> product-safety (5)
  - Customer Welfare -> customer-welfare (5)
  - Physical Impacts of Climate Change -> climate-physical (5)

### 36. HC-MS — Medical Equipment & Supplies

- **Current grades:** PS 5 · EN 3 · WW 3 · HS 3 · DV 3 · BO 3 · BE 3 · DP 3 · GHG 2 · LR 2 · TX 2 · BD 1
- **Implied listed:** PS, EN, WW, HS, DV, BO, BE, DP
- **Implied not listed:** GHG, LR, TX, BD
- **SASB's topics:** Access & Affordability; Product Quality & Safety; Selling Practices & Product Labeling; Product Design & Lifecycle Management; Supply Chain Management; Business Ethics
- **Verdict:** match (all 6)
- **Notes:** All 6 SASB topics map to our topics and are graded 5; all others 2.
  - Access & Affordability -> access-affordability (5)
  - Product Quality & Safety -> product-safety (5)
  - Selling Practices & Product Labeling -> selling-practices (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Supply Chain Management -> supply-chain (5)
  - Business Ethics -> business-ethics (5)

## Infrastructure

### 37. IF-EN — Engineering & Construction Services

- **Current grades:** HS 5 · GHG 4 · EN 4 · LR 4 · WW 3 · BD 3 · PS 3 · BO 3 · BE 3 · DP 3 · DV 2 · TX 2
- **Implied listed:** HS, GHG, EN, LR, WW, BD, PS, BO, BE, DP
- **Implied not listed:** DV, TX
- **SASB's topics:** Ecological Impacts; Product Quality & Safety; Employee Health & Safety; Product Design & Lifecycle Management; Business Ethics
- **Verdict:** match (all 5)
- **Notes:** All 5 SASB topics map to our topics and are graded 5; all others 2.
  - Ecological Impacts -> biodiversity (5)
  - Product Quality & Safety -> product-safety (5)
  - Employee Health & Safety -> health-safety (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Business Ethics -> business-ethics (5) 
- **Notes:** 

### 38. IF-EU — Electric Utilities & Power Generators

- **Current grades:** GHG 5 · EN 5 · WW 5 · BD 4 · HS 4 · LR 3 · PS 3 · BO 3 · BE 3 · DP 3 · DV 2 · TX 2
- **Implied listed:** GHG, EN, WW, BD, HS, LR, PS, BO, BE, DP
- **Implied not listed:** DV, TX
- **SASB's topics:** GHG Emissions; Air Quality; Water & Wastewater Management; Waste & Hazardous Materials Management; Access & Affordability; Employee Health & Safety; Business Model Resilience; Critical Incident Risk Management; Systemic Risk Management
- **Verdict:** match (all 9)
- **Notes:** All 9 SASB topics map to our topics and are graded 5; all others 2.
  - GHG Emissions -> ghg (5)
  - Air Quality -> air-quality (5)
  - Water & Wastewater Management -> water (5)
  - Waste & Hazardous Materials Management -> waste (5)
  - Access & Affordability -> access-affordability (5)
  - Employee Health & Safety -> health-safety (5)
  - Business Model Resilience -> business-model (5)
  - Critical Incident Risk Management -> critical-incident (5)
  - Systemic Risk Management -> systemic-risk (5)

### 39. IF-GU — Gas Utilities & Distributors

- **Current grades:** HS 5 · GHG 4 · EN 4 · WW 4 · BD 3 · LR 3 · PS 3 · BO 3 · BE 3 · DP 3 · DV 2 · TX 2
- **Implied listed:** HS, GHG, EN, WW, BD, LR, PS, BO, BE, DP
- **Implied not listed:** DV, TX
- **SASB's topics:** Access & Affordability; Business Model Resilience; Critical Incident Risk Management
- **Verdict:** match (all 3)
- **Notes:** All 3 SASB topics map to our topics and are graded 5; all others 2.
  - Access & Affordability -> access-affordability (5)
  - Business Model Resilience -> business-model (5)
  - Critical Incident Risk Management -> critical-incident (5)

### 40. IF-HB — Home Builders

- **Current grades:** GHG 4 · EN 4 · WW 4 · BD 4 · HS 4 · LR 3 · PS 3 · BO 3 · BE 3 · DP 3 · DV 2 · TX 2
- **Implied listed:** GHG, EN, WW, BD, HS, LR, PS, BO, BE, DP
- **Implied not listed:** DV, TX
- **SASB's topics:** Ecological Impacts; Employee Health & Safety; Product Design & Lifecycle Management; Business Model Resilience
- **Verdict:** match (all 4)
- **Notes:** All 4 SASB topics map to our topics and are graded 5; all others 2.
  - Ecological Impacts -> biodiversity (5)
  - Employee Health & Safety -> health-safety (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Business Model Resilience -> business-model (5)

### 41. IF-RE — Real Estate

- **Current grades:** EN 5 · GHG 4 · HS 4 · WW 3 · LR 3 · PS 3 · BO 3 · BE 3 · DP 3 · BD 2 · DV 2 · TX 2
- **Implied listed:** EN, GHG, HS, WW, LR, PS, BO, BE, DP
- **Implied not listed:** BD, DV, TX
- **SASB's topics:** Energy Management; Water & Wastewater Management; Product Design & Lifecycle Management; Physical Impacts of Climate Change
- **Verdict:** match (all 4)
- **Notes:** All 4 SASB topics map to our topics and are graded 5; all others 2.
  - Energy Management -> energy (5)
  - Water & Wastewater Management -> water (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Physical Impacts of Climate Change -> climate-physical (5)

### 42. IF-RS — Real Estate Services

- **Current grades:** EN 4 · HS 4 · GHG 3 · BD 3 · LR 3 · PS 3 · BO 3 · BE 3 · DP 3 · WW 2 · DV 2 · TX 2
- **Implied listed:** EN, HS, GHG, BD, LR, PS, BO, BE, DP
- **Implied not listed:** WW, DV, TX
- **SASB's topics:** Product Design & Lifecycle Management; Business Ethics
- **Verdict:** match (both)
- **Notes:** Both SASB topics map to our topics and are graded 5; all others 2.
  - Product Design & Lifecycle Management -> product-design (5)
  - Business Ethics -> business-ethics (5)

### 43. IF-WM — Waste Management

- **Current grades:** EN 5 · WW 5 · HS 5 · GHG 4 · BD 3 · LR 3 · PS 3 · BO 3 · BE 3 · DP 3 · DV 2 · TX 2
- **Implied listed:** EN, WW, HS, GHG, BD, LR, PS, BO, BE, DP
- **Implied not listed:** DV, TX
- **SASB's topics:** GHG Emissions; Air Quality; Waste & Hazardous Materials Management; Labor Practices; Employee Health & Safety; Business Model Resilience
- **Verdict:** match (all 6)
- **Notes:** All 6 SASB topics map to our topics and are graded 5; all others 2.
  - GHG Emissions -> ghg (5)
  - Air Quality -> air-quality (5)
  - Waste & Hazardous Materials Management -> waste (5)
  - Labor Practices -> labour-rights (5)
  - Employee Health & Safety -> health-safety (5)
  - Business Model Resilience -> business-model (5)

### 44. IF-WU — Water Utilities & Services

- **Current grades:** WW 5 · EN 4 · HS 4 · GHG 3 · BD 3 · LR 3 · PS 3 · BO 3 · BE 3 · DP 3 · DV 2 · TX 2
- **Implied listed:** WW, EN, HS, GHG, BD, LR, PS, BO, BE, DP
- **Implied not listed:** DV, TX
- **SASB's topics:** Energy Management; Water & Wastewater Management; Access & Affordability; Product Quality & Safety; Business Model Resilience; Materials Sourcing & Efficiency; Physical Impacts of Climate Change
- **Verdict:** match (all 7)
- **Notes:** All 7 SASB topics map to our topics and are graded 5; all others 2.
  - Energy Management -> energy (5)
  - Water & Wastewater Management -> water (5)
  - Access & Affordability -> access-affordability (5)
  - Product Quality & Safety -> product-safety (5)
  - Business Model Resilience -> business-model (5)
  - Materials Sourcing & Efficiency -> materials (5)
  - Physical Impacts of Climate Change -> climate-physical (5)

## Renewable Resources & Alternative Energy

### 45. RR-BI — Biofuels

- **Current grades:** EN 5 · BD 5 · WW 4 · HS 4 · GHG 3 · LR 3 · PS 3 · BO 3 · BE 3 · DV 2 · DP 2 · TX 2
- **Implied listed:** EN, BD, WW, HS, GHG, LR, PS, BO, BE
- **Implied not listed:** DV, DP, TX
- **SASB's topics:** Air Quality; Water & Wastewater Management; Product Design & Lifecycle Management; Supply Chain Management; Management of the Legal & Regulatory Environment; Critical Incident Risk Management
- **Verdict:** match (all 6)
- **Notes:** All 6 SASB topics map to our topics and are graded 5; all others 2.
  - Air Quality -> air-quality (5)
  - Water & Wastewater Management -> water (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Supply Chain Management -> supply-chain (5)
  - Management of the Legal & Regulatory Environment -> legal-regulatory (5)
  - Critical Incident Risk Management -> critical-incident (5)

### 46. RR-FC — Fuel Cells & Industrial Batteries

- **Current grades:** EN 5 · BD 4 · HS 4 · PS 4 · GHG 3 · WW 3 · LR 3 · BO 3 · BE 3 · DV 2 · DP 2 · TX 2
- **Implied listed:** EN, BD, HS, PS, GHG, WW, LR, BO, BE
- **Implied not listed:** DV, DP, TX
- **SASB's topics:** Energy Management; Employee Health & Safety; Product Design & Lifecycle Management; Materials Sourcing & Efficiency
- **Verdict:** match (all 4)
- **Notes:** All 4 SASB topics map to our topics and are graded 5; all others 2.
  - Energy Management -> energy (5)
  - Employee Health & Safety -> health-safety (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Materials Sourcing & Efficiency -> materials (5)

### 47. RR-FM — Forestry Management

- **Current grades:** EN 5 · BD 5 · HS 5 · WW 4 · LR 4 · GHG 3 · PS 3 · BO 3 · BE 3 · DV 2 · DP 2 · TX 2
- **Implied listed:** EN, BD, HS, WW, LR, GHG, PS, BO, BE
- **Implied not listed:** DV, DP, TX
- **SASB's topics:** Ecological Impacts; Human Rights & Community Relations; Physical Impacts of Climate Change
- **Verdict:** match (all 3)
- **Notes:** All 3 SASB topics map to our topics and are graded 5; all others 2.
  - Ecological Impacts -> biodiversity (5)
  - Human Rights & Community Relations -> human-rights (5)
  - Physical Impacts of Climate Change -> climate-physical (5)

### 48. RR-PP — Pulp & Paper Products

- **Current grades:** WW 5 · HS 5 · EN 4 · BD 4 · GHG 3 · LR 3 · PS 3 · BO 3 · BE 3 · DV 2 · DP 2 · TX 2
- **Implied listed:** WW, HS, EN, BD, GHG, LR, PS, BO, BE
- **Implied not listed:** DV, DP, TX
- **SASB's topics:** GHG Emissions; Air Quality; Energy Management; Water & Wastewater Management; Supply Chain Management
- **Verdict:** match (all 5)
- **Notes:** All 5 SASB topics map to our topics and are graded 5; all others 2.
  - GHG Emissions -> ghg (5)
  - Air Quality -> air-quality (5)
  - Energy Management -> energy (5)
  - Water & Wastewater Management -> water (5)
  - Supply Chain Management -> supply-chain (5)

### 49. RR-ST — Solar Technology & Project Developers

- **Current grades:** EN 5 · WW 4 · BD 4 · HS 4 · LR 3 · PS 3 · BO 3 · BE 3 · GHG 2 · DV 2 · DP 2 · TX 2
- **Implied listed:** EN, WW, BD, HS, LR, PS, BO, BE
- **Implied not listed:** GHG, DV, DP, TX
- **SASB's topics:** Energy Management; Water & Wastewater Management; Waste & Hazardous Materials Management; Ecological Impacts; Product Design & Lifecycle Management; Materials Sourcing & Efficiency
- **Verdict:** match (all 6)
- **Notes:** All 6 SASB topics map to our topics and are graded 5; all others 2.
  - Energy Management -> energy (5)
  - Water & Wastewater Management -> water (5)
  - Waste & Hazardous Materials Management -> waste (5)
  - Ecological Impacts -> biodiversity (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Materials Sourcing & Efficiency -> materials (5)

### 50. RR-WT — Wind Technology & Project Developers

- **Current grades:** EN 5 · WW 4 · BD 4 · HS 4 · LR 3 · PS 3 · BO 3 · BE 3 · GHG 2 · DV 2 · DP 2 · TX 2
- **Implied listed:** EN, WW, BD, HS, LR, PS, BO, BE
- **Implied not listed:** GHG, DV, DP, TX
- **SASB's topics:** Employee Health & Safety; Product Design & Lifecycle Management; Materials Sourcing & Efficiency
- **Verdict:** match (all 3)
- **Notes:** All 3 SASB topics map to our topics and are graded 5; all others 2.
  - Employee Health & Safety -> health-safety (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Materials Sourcing & Efficiency -> materials (5)

## Resource Transformation

### 51. RT-AE — Aerospace & Defense

- **Current grades:** PS 5 · BE 5 · GHG 4 · EN 4 · WW 4 · HS 4 · LR 3 · DV 3 · BO 3 · BD 2 · DP 2 · TX 2
- **Implied listed:** PS, BE, GHG, EN, WW, HS, LR, DV, BO
- **Implied not listed:** BD, DP, TX
- **SASB's topics:** Energy Management; Waste & Hazardous Materials Management; Data Security; Product Quality & Safety; Product Design & Lifecycle Management; Materials Sourcing & Efficiency; Business Ethics
- **Verdict:** match (all 7)
- **Notes:** All 7 SASB topics map to our topics and are graded 5; all others 2.
  - Energy Management -> energy (5)
  - Waste & Hazardous Materials Management -> waste (5)
  - Data Security -> data-security (5)
  - Product Quality & Safety -> product-safety (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Materials Sourcing & Efficiency -> materials (5)
  - Business Ethics -> business-ethics (5)

### 52. RT-CH — Chemicals

- **Current grades:** WW 5 · HS 5 · PS 5 · GHG 4 · EN 4 · LR 3 · DV 3 · BO 3 · BE 3 · BD 2 · DP 2 · TX 2
- **Implied listed:** WW, HS, PS, GHG, EN, LR, DV, BO, BE
- **Implied not listed:** BD, DP, TX
- **SASB's topics:** GHG Emissions; Air Quality; Energy Management; Water & Wastewater Management; Waste & Hazardous Materials Management; Human Rights & Community Relations; Employee Health & Safety; Product Design & Lifecycle Management; Management of the Legal & Regulatory Environment; Critical Incident Risk Management
- **Verdict:** match (all 10)
- **Notes:** All 10 SASB topics map to our topics and are graded 5; all others 2.
  - GHG Emissions -> ghg (5)
  - Air Quality -> air-quality (5)
  - Energy Management -> energy (5)
  - Water & Wastewater Management -> water (5)
  - Waste & Hazardous Materials Management -> waste (5)
  - Human Rights & Community Relations -> human-rights (5)
  - Employee Health & Safety -> health-safety (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Management of the Legal & Regulatory Environment -> legal-regulatory (5)
  - Critical Incident Risk Management -> critical-incident (5)

### 53. RT-CP — Containers & Packaging

- **Current grades:** WW 5 · GHG 4 · EN 4 · HS 4 · PS 4 · BD 3 · LR 3 · DV 3 · BO 3 · BE 3 · DP 2 · TX 2
- **Implied listed:** WW, GHG, EN, HS, PS, BD, LR, DV, BO, BE
- **Implied not listed:** DP, TX
- **SASB's topics:** GHG Emissions; Air Quality; Energy Management; Water & Wastewater Management; Waste & Hazardous Materials Management; Product Quality & Safety; Product Design & Lifecycle Management; Supply Chain Management
- **Verdict:** match (all 8)
- **Notes:** All 8 SASB topics map to our topics and are graded 5; all others 2.
  - GHG Emissions -> ghg (5)
  - Air Quality -> air-quality (5)
  - Energy Management -> energy (5)
  - Water & Wastewater Management -> water (5)
  - Waste & Hazardous Materials Management -> waste (5)
  - Product Quality & Safety -> product-safety (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Supply Chain Management -> supply-chain (5) 
- **Notes:** 

### 54. RT-EE — Electrical & Electronic Equipment

- **Current grades:** EN 4 · WW 4 · HS 4 · PS 4 · GHG 3 · LR 3 · DV 3 · BO 3 · BE 3 · DP 3 · BD 2 · TX 2
- **Implied listed:** EN, WW, HS, PS, GHG, LR, DV, BO, BE, DP
- **Implied not listed:** BD, TX
- **SASB's topics:** Energy Management; Waste & Hazardous Materials Management; Product Quality & Safety; Product Design & Lifecycle Management; Materials Sourcing & Efficiency; Business Ethics
- **Verdict:** match (all 6)
- **Notes:** All 6 SASB topics map to our topics and are graded 5; all others 2.
  - Energy Management -> energy (5)
  - Waste & Hazardous Materials Management -> waste (5)
  - Product Quality & Safety -> product-safety (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Materials Sourcing & Efficiency -> materials (5)
  - Business Ethics -> business-ethics (5)

### 55. RT-IG — Industrial Machinery & Goods

- **Current grades:** GHG 4 · EN 4 · HS 4 · PS 4 · WW 3 · LR 3 · DV 3 · BO 3 · BE 3 · BD 2 · DP 2 · TX 2
- **Implied listed:** GHG, EN, HS, PS, WW, LR, DV, BO, BE
- **Implied not listed:** BD, DP, TX
- **SASB's topics:** Energy Management; Employee Health & Safety; Product Design & Lifecycle Management; Materials Sourcing & Efficiency
- **Verdict:** match (all 4)
- **Notes:** All 4 SASB topics map to our topics and are graded 5; all others 2.
  - Energy Management -> energy (5)
  - Employee Health & Safety -> health-safety (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Materials Sourcing & Efficiency -> materials (5) 

## Services

### 56. SV-AD — Advertising & Marketing

- **Current grades:** DP 5 · DV 4 · BE 4 · LR 3 · PS 3 · BO 3 · GHG 2 · EN 2 · WW 2 · HS 2 · TX 2 · BD 1
- **Implied listed:** DP, DV, BE, LR, PS, BO
- **Implied not listed:** GHG, EN, WW, HS, TX, BD
- **SASB's topics:** Customer Privacy; Selling Practices & Product Labeling; Employee Engagement, Diversity & Inclusion
- **Verdict:** match (all 3)
- **Notes:** All 3 SASB topics map to our topics and are graded 5; all others 2.
  - Customer Privacy -> customer-privacy (5)
  - Selling Practices & Product Labeling -> selling-practices (5)
  - Employee Engagement, Diversity & Inclusion -> diversity (5)

### 57. SV-CA — Casinos & Gaming

- **Current grades:** BE 5 · LR 4 · DV 4 · DP 4 · PS 3 · BO 3 · GHG 2 · EN 2 · WW 2 · HS 2 · TX 2 · BD 1
- **Implied listed:** BE, LR, DV, DP, PS, BO
- **Implied not listed:** GHG, EN, WW, HS, TX, BD
- **SASB's topics:** Energy Management; Customer Welfare; Employee Health & Safety; Business Ethics
- **Verdict:** match (all 4)
- **Notes:** All 4 SASB topics map to our topics and are graded 5; all others 2.
  - Energy Management -> energy (5)
  - Customer Welfare -> customer-welfare (5)
  - Employee Health & Safety -> health-safety (5)
  - Business Ethics -> business-ethics (5)

### 58. SV-ED — Education

- **Current grades:** DV 4 · PS 4 · DP 4 · LR 3 · BO 3 · BE 3 · GHG 2 · EN 2 · WW 2 · HS 2 · TX 2 · BD 1
- **Implied listed:** DV, PS, DP, LR, BO, BE
- **Implied not listed:** GHG, EN, WW, HS, TX, BD
- **SASB's topics:** Data Security; Customer Welfare; Selling Practices & Product Labeling
- **Verdict:** match (all 3)
- **Notes:** All 3 SASB topics map to our topics and are graded 5; all others 2.
  - Data Security -> data-security (5)
  - Customer Welfare -> customer-welfare (5)
  - Selling Practices & Product Labeling -> selling-practices (5)

### 59. SV-HL — Hotels & Lodging

- **Current grades:** EN 4 · HS 4 · LR 4 · DV 4 · DP 4 · GHG 3 · WW 3 · PS 3 · BO 3 · BE 3 · TX 2 · BD 1
- **Implied listed:** EN, HS, LR, DV, DP, GHG, WW, PS, BO, BE
- **Implied not listed:** TX, BD
- **SASB's topics:** Energy Management; Water & Wastewater Management; Ecological Impacts; Labor Practices; Physical Impacts of Climate Change
- **Verdict:** match (all 5)
- **Notes:** All 5 SASB topics map to our topics and are graded 5; all others 2.
  - Energy Management -> energy (5)
  - Water & Wastewater Management -> water (5)
  - Ecological Impacts -> biodiversity (5)
  - Labor Practices -> labour-rights (5)
  - Physical Impacts of Climate Change -> climate-physical (5)

### 60. SV-LF — Leisure Facilities

- **Current grades:** HS 5 · DV 4 · DP 4 · GHG 3 · LR 3 · PS 3 · BO 3 · BE 3 · EN 2 · WW 2 · TX 2 · BD 1
- **Implied listed:** HS, DV, DP, GHG, LR, PS, BO, BE
- **Implied not listed:** EN, WW, TX, BD
- **SASB's topics:** Energy Management; Product Quality & Safety; Employee Health & Safety
- **Verdict:** match (all 3)
- **Notes:** All 3 SASB topics map to our topics and are graded 5; all others 2.
  - Energy Management -> energy (5)
  - Product Quality & Safety -> product-safety (5)
  - Employee Health & Safety -> health-safety (5)

### 61. SV-ME — Media & Entertainment

- **Current grades:** DP 5 · DV 4 · PS 4 · BE 4 · LR 3 · BO 3 · GHG 2 · EN 2 · WW 2 · HS 2 · TX 2 · BD 1
- **Implied listed:** DP, DV, PS, BE, LR, BO
- **Implied not listed:** GHG, EN, WW, HS, TX, BD
- **SASB's topics:** Customer Welfare; Selling Practices & Product Labeling; Competitive Behavior
- **Verdict:** match (all 3)
- **Notes:** All 3 SASB topics map to our topics and are graded 5; all others 2.
  - Customer Welfare -> customer-welfare (5)
  - Selling Practices & Product Labeling -> selling-practices (5)
  - Competitive Behavior -> competitive-behavior (5)

### 62. SV-PS — Professional & Commercial Services

- **Current grades:** DP 5 · DV 4 · BE 4 · LR 3 · PS 3 · BO 3 · TX 3 · GHG 2 · EN 2 · WW 2 · HS 2 · BD 1
- **Implied listed:** DP, DV, BE, LR, PS, BO, TX
- **Implied not listed:** GHG, EN, WW, HS, BD
- **SASB's topics:** Data Security; Employee Engagement, Diversity & Inclusion; Business Ethics
- **Verdict:** match (all 3)
- **Notes:** All 3 SASB topics map to our topics and are graded 5; all others 2.
  - Data Security -> data-security (5)
  - Employee Engagement, Diversity & Inclusion -> diversity (5)
  - Business Ethics -> business-ethics (5)

## Technology & Communications

### 63. TC-ES — Electronic Manufacturing Services & Original Design Manufacturing

- **Current grades:** LR 5 · DP 5 · DV 4 · PS 4 · GHG 3 · EN 3 · BO 3 · BE 3 · TX 3 · WW 2 · HS 2 · BD 1
- **Implied listed:** LR, DP, DV, PS, GHG, EN, BO, BE, TX
- **Implied not listed:** WW, HS, BD
- **SASB's topics:** Water & Wastewater Management; Waste & Hazardous Materials Management; Labor Practices; Employee Health & Safety; Product Design & Lifecycle Management; Materials Sourcing & Efficiency
- **Verdict:** match (all 6)
- **Notes:** All 6 SASB topics map to our topics and are graded 5; all others 2.
  - Water & Wastewater Management -> water (5)
  - Waste & Hazardous Materials Management -> waste (5)
  - Labor Practices -> labour-rights (5)
  - Employee Health & Safety -> health-safety (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Materials Sourcing & Efficiency -> materials (5)

### 64. TC-HW — Hardware

- **Current grades:** LR 5 · DP 5 · WW 4 · DV 4 · GHG 3 · EN 3 · PS 3 · BO 3 · BE 3 · TX 3 · HS 2 · BD 1
- **Implied listed:** LR, DP, WW, DV, GHG, EN, PS, BO, BE, TX
- **Implied not listed:** HS, BD
- **SASB's topics:** Data Security; Employee Engagement, Diversity & Inclusion; Product Design & Lifecycle Management; Supply Chain Management; Materials Sourcing & Efficiency
- **Verdict:** match (all 5)
- **Notes:** All 5 SASB topics map to our topics and are graded 5; all others 2.
  - Data Security -> data-security (5)
  - Employee Engagement, Diversity & Inclusion -> diversity (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Supply Chain Management -> supply-chain (5)
  - Materials Sourcing & Efficiency -> materials (5) 

### 65. TC-IM — Internet Media & Services

- **Current grades:** DP 5 · EN 4 · DV 4 · PS 4 · GHG 3 · LR 3 · BO 3 · BE 3 · TX 3 · WW 2 · HS 2 · BD 1
- **Implied listed:** DP, EN, DV, PS, GHG, LR, BO, BE, TX
- **Implied not listed:** WW, HS, BD
- **SASB's topics:** Energy Management; Customer Privacy; Data Security; Employee Engagement, Diversity & Inclusion; Competitive Behavior
- **Verdict:** match (all 5)
- **Notes:** All 5 SASB topics map to our topics and are graded 5; all others 2.
  - Energy Management -> energy (5)
  - Customer Privacy -> customer-privacy (5)
  - Data Security -> data-security (5)
  - Employee Engagement, Diversity & Inclusion -> diversity (5)
  - Competitive Behavior -> competitive-behavior (5)

### 66. TC-SC — Semiconductors

- **Current grades:** WW 5 · DP 5 · GHG 4 · LR 4 · DV 4 · PS 4 · EN 3 · BO 3 · BE 3 · TX 3 · HS 2 · BD 1
- **Implied listed:** WW, DP, GHG, LR, DV, PS, EN, BO, BE, TX
- **Implied not listed:** HS, BD
- **SASB's topics:** GHG Emissions; Energy Management; Water & Wastewater Management; Waste & Hazardous Materials Management; Employee Health & Safety; Employee Engagement, Diversity & Inclusion; Product Design & Lifecycle Management; Materials Sourcing & Efficiency; Competitive Behavior
- **Verdict:** match (all 9)
- **Notes:** All 9 SASB topics map to our topics and are graded 5; all others 2.
  - GHG Emissions -> ghg (5)
  - Energy Management -> energy (5)
  - Water & Wastewater Management -> water (5)
  - Waste & Hazardous Materials Management -> waste (5)
  - Employee Health & Safety -> health-safety (5)
  - Employee Engagement, Diversity & Inclusion -> diversity (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Materials Sourcing & Efficiency -> materials (5)
  - Competitive Behavior -> competitive-behavior (5)

### 67. TC-SI — Software & IT Services

- **Current grades:** DV 5 · DP 5 · EN 4 · LR 4 · PS 3 · BO 3 · BE 3 · TX 3 · GHG 2 · WW 2 · HS 2 · BD 1
- **Implied listed:** DV, DP, EN, LR, PS, BO, BE, TX
- **Implied not listed:** GHG, WW, HS, BD
- **SASB's topics:** Energy Management; Customer Privacy; Data Security; Employee Engagement, Diversity & Inclusion; Competitive Behavior; Systemic Risk Management
- **Verdict:** match (all 6)
- **Notes:** All 6 SASB topics map to our topics and are graded 5; all others 2.
  - Energy Management -> energy (5)
  - Customer Privacy -> customer-privacy (5)
  - Data Security -> data-security (5)
  - Employee Engagement, Diversity & Inclusion -> diversity (5)
  - Competitive Behavior -> competitive-behavior (5)
  - Systemic Risk Management -> systemic-risk (5)

### 68. TC-TL — Telecommunication Services

- **Current grades:** DP 5 · DV 4 · GHG 3 · EN 3 · LR 3 · PS 3 · BO 3 · BE 3 · TX 3 · WW 2 · HS 2 · BD 1
- **Implied listed:** DP, DV, GHG, EN, LR, PS, BO, BE, TX
- **Implied not listed:** WW, HS, BD
- **SASB's topics:** Energy Management; Customer Privacy; Data Security; Materials Sourcing & Efficiency; Competitive Behavior; Systemic Risk Management
- **Verdict:** match (all 6)
- **Notes:** All 6 SASB topics map to our topics and are graded 5; all others 2.
  - Energy Management -> energy (5)
  - Customer Privacy -> customer-privacy (5)
  - Data Security -> data-security (5)
  - Materials Sourcing & Efficiency -> materials (5)
  - Competitive Behavior -> competitive-behavior (5)
  - Systemic Risk Management -> systemic-risk (5) 

## Transportation

### 69. TR-AF — Air Freight & Logistics

- **Current grades:** GHG 5 · EN 5 · HS 5 · PS 5 · WW 3 · LR 3 · DV 3 · BO 3 · BE 3 · BD 2 · DP 2 · TX 2
- **Implied listed:** GHG, EN, HS, PS, WW, LR, DV, BO, BE
- **Implied not listed:** BD, DP, TX
- **SASB's topics:** GHG Emissions; Air Quality; Labor Practices; Employee Health & Safety; Supply Chain Management; Critical Incident Risk Management
- **Verdict:** match (all 6)
- **Notes:** All 6 SASB topics map to our topics and are graded 5; all others 2.
  - GHG Emissions -> ghg (5)
  - Air Quality -> air-quality (5)
  - Labor Practices -> labour-rights (5)
  - Employee Health & Safety -> health-safety (5)
  - Supply Chain Management -> supply-chain (5)
  - Critical Incident Risk Management -> critical-incident (5)

### 70. TR-AL — Airlines

- **Current grades:** GHG 5 · EN 5 · PS 5 · HS 4 · WW 3 · LR 3 · DV 3 · BO 3 · BE 3 · BD 2 · DP 2 · TX 2
- **Implied listed:** GHG, EN, PS, HS, WW, LR, DV, BO, BE
- **Implied not listed:** BD, DP, TX
- **SASB's topics:** GHG Emissions; Labor Practices; Competitive Behavior; Critical Incident Risk Management
- **Verdict:** match (all 4)
- **Notes:** All 4 SASB topics map to our topics and are graded 5; all others 2.
  - GHG Emissions -> ghg (5)
  - Labor Practices -> labour-rights (5)
  - Competitive Behavior -> competitive-behavior (5)
  - Critical Incident Risk Management -> critical-incident (5)

### 71. TR-AP — Auto Parts

- **Current grades:** PS 5 · GHG 4 · EN 4 · HS 4 · LR 4 · WW 3 · DV 3 · BO 3 · BE 3 · BD 2 · DP 2 · TX 2
- **Implied listed:** PS, GHG, EN, HS, LR, WW, DV, BO, BE
- **Implied not listed:** BD, DP, TX
- **SASB's topics:** Energy Management; Waste & Hazardous Materials Management; Product Quality & Safety; Product Design & Lifecycle Management; Materials Sourcing & Efficiency; Competitive Behavior
- **Verdict:** match (all 6)
- **Notes:** All 6 SASB topics map to our topics and are graded 5; all others 2.
  - Energy Management -> energy (5)
  - Waste & Hazardous Materials Management -> waste (5)
  - Product Quality & Safety -> product-safety (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Materials Sourcing & Efficiency -> materials (5)
  - Competitive Behavior -> competitive-behavior (5)

### 72. TR-AU — Automobiles

- **Current grades:** GHG 5 · PS 5 · EN 4 · HS 4 · LR 4 · DP 4 · WW 3 · DV 3 · BO 3 · BE 3 · BD 2 · TX 2
- **Implied listed:** GHG, PS, EN, HS, LR, DP, WW, DV, BO, BE
- **Implied not listed:** BD, TX
- **SASB's topics:** Product Quality & Safety; Labor Practices; Product Design & Lifecycle Management; Materials Sourcing & Efficiency
- **Verdict:** match (all 4)
- **Notes:** All 4 SASB topics map to our topics and are graded 5; all others 2.
  - Product Quality & Safety -> product-safety (5)
  - Labor Practices -> labour-rights (5)
  - Product Design & Lifecycle Management -> product-design (5)
  - Materials Sourcing & Efficiency -> materials (5)

### 73. TR-CL — Cruise Lines

- **Current grades:** GHG 5 · HS 5 · EN 4 · WW 4 · BD 4 · PS 4 · LR 3 · DV 3 · BO 3 · BE 3 · DP 2 · TX 2
- **Implied listed:** GHG, HS, EN, WW, BD, PS, LR, DV, BO, BE
- **Implied not listed:** DP, TX
- **SASB's topics:** GHG Emissions; Air Quality; Ecological Impacts; Product Quality & Safety; Labor Practices; Employee Health & Safety; Critical Incident Risk Management
- **Verdict:** match (all 7)
- **Notes:** All 7 SASB topics map to our topics and are graded 5; all others 2.
  - GHG Emissions -> ghg (5)
  - Air Quality -> air-quality (5)
  - Ecological Impacts -> biodiversity (5)
  - Product Quality & Safety -> product-safety (5)
  - Labor Practices -> labour-rights (5)
  - Employee Health & Safety -> health-safety (5)
  - Critical Incident Risk Management -> critical-incident (5)

### 74. TR-CR — Car Rental & Leasing

- **Current grades:** GHG 4 · EN 4 · HS 4 · PS 4 · DP 4 · WW 3 · LR 3 · DV 3 · BO 3 · BE 3 · BD 2 · TX 2
- **Implied listed:** GHG, EN, HS, PS, DP, WW, LR, DV, BO, BE
- **Implied not listed:** BD, TX
- **SASB's topics:** Product Quality & Safety; Product Design & Lifecycle Management
- **Verdict:** match (both)
- **Notes:** Both SASB topics map to our topics and are graded 5; all others 2.
  - Product Quality & Safety -> product-safety (5)
  - Product Design & Lifecycle Management -> product-design (5)

### 75. TR-MT — Marine Transportation

- **Current grades:** GHG 5 · HS 5 · EN 4 · WW 4 · BD 4 · PS 4 · LR 3 · DV 3 · BO 3 · BE 3 · DP 2 · TX 2
- **Implied listed:** GHG, HS, EN, WW, BD, PS, LR, DV, BO, BE
- **Implied not listed:** DP, TX
- **SASB's topics:** GHG Emissions; Air Quality; Ecological Impacts; Employee Health & Safety; Business Ethics; Critical Incident Risk Management
- **Verdict:** match (all 6)
- **Notes:** All 6 SASB topics map to our topics and are graded 5; all others 2.
  - GHG Emissions -> ghg (5)
  - Air Quality -> air-quality (5)
  - Ecological Impacts -> biodiversity (5)
  - Employee Health & Safety -> health-safety (5)
  - Business Ethics -> business-ethics (5)
  - Critical Incident Risk Management -> critical-incident (5)

### 76. TR-RA — Rail Transportation

- **Current grades:** HS 5 · GHG 4 · EN 4 · PS 4 · WW 3 · LR 3 · DV 3 · BO 3 · BE 3 · BD 2 · DP 2 · TX 2
- **Implied listed:** HS, GHG, EN, PS, WW, LR, DV, BO, BE
- **Implied not listed:** BD, DP, TX
- **SASB's topics:** GHG Emissions; Air Quality; Employee Health & Safety; Competitive Behavior; Critical Incident Risk Management
- **Verdict:** match (all 5)
- **Notes:** All 5 SASB topics map to our topics and are graded 5; all others 2.
  - GHG Emissions -> ghg (5)
  - Air Quality -> air-quality (5)
  - Employee Health & Safety -> health-safety (5)
  - Competitive Behavior -> competitive-behavior (5)
  - Critical Incident Risk Management -> critical-incident (5)

### 77. TR-RO — Road Transportation

- **Current grades:** GHG 5 · HS 5 · PS 5 · EN 4 · LR 4 · WW 3 · DV 3 · BO 3 · BE 3 · BD 2 · DP 2 · TX 2
- **Implied listed:** GHG, HS, PS, EN, LR, WW, DV, BO, BE
- **Implied not listed:** BD, DP, TX
- **SASB's topics:** GHG Emissions; Air Quality; Employee Health & Safety; Critical Incident Risk Management
- **Verdict:** match (all 4)
- **Notes:** All 4 SASB topics map to our topics and are graded 5; all others 2.
  - GHG Emissions -> ghg (5)
  - Air Quality -> air-quality (5)
  - Employee Health & Safety -> health-safety (5)
  - Critical Incident Risk Management -> critical-incident (5) 

---

## Sign-off

| Field | Value |
|---|---|
| Industries checked | 77 of 77 |
| Gaps found (topics we lack) | Materials Sourcing & Efficiency; Product Design & Lifecycle Management — both added as topics |
| Errors corrected | All 77 industries re-graded from SASB's published bold topic lists (5 = listed, 2 = not) |
| Checked by | Mahliqa Khan |
| Date | 2026-10-06 |
