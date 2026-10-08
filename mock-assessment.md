# Mock assessment — worked example

Use this to try the app end to end. It is a small example (2 topics, 6 questions) so it is
quick to type. Every value here is made up — it is only to show how the tool behaves.

## Step 1 — Create the assessment

- **New assessment** → Investee: `Northwind Toy Manufacturing`
- **Industry mix:** tick **Toys & Sporting Goods** (`CG-TO`), set weight `100`
- **Holding weight:** `2.5`
- **Reporting period:** `FY2025`

SASB lists two topics for CG-TO: Product Quality & Safety and Supply Chain Management. Those
are the ones graded 5 (high exposure); every other topic is 2.

## Step 2 — Answer the questions

For each question pick a **score (1–5)** and an **evidence tier** (Claimed / Documented /
Verified) and type a **source**. The tiers are what make the score real.

### Product Safety & Quality
| Question | Score | Evidence | Source |
|---|---|---|---|
| Is there a product quality and safety policy meeting applicable regulation? | 4 | Documented | Product Safety Policy v3, 2025 |
| Are recalls, defects and customer complaints tracked? | 3 | Documented | QA complaints log |
| Is product safety independently certified or audited? | 2 | Claimed | stated on supplier call |

### Supply Chain Management
| Question | Score | Evidence | Source |
|---|---|---|---|
| Is there a supply chain policy covering labour and environmental standards? | 3 | Documented | Supplier Code of Conduct, 2024 |
| Are tier-one and beyond suppliers assessed and monitored? | 2 | Claimed | website CSR page |
| Are supplier audits and remediation reported? | 1 | Claimed | no evidence provided |

Tip: leave one or two questions blank to see coverage change on the results page.

## Step 3 — Watch the scoring

The score you see is **not** the number you typed — the evidence tier discounts it first:

| You typed | Claimed | Documented | Verified |
|---|---|---|---|
| 5 | 3 | 4 | 5 |
| 4 | 2 | 3 | 4 |
| 3 | 1 | 2 | 3 |
| 2 | 1 | 1 | 2 |
| 1 | 1 | 1 | 1 |

So "Is product safety independently audited?" answered **2 as a claim** scores **1** — a claim
with no proof is treated almost like having nothing.

## Step 4 — Results

Go to **Results & approval**:

- **Answer evidence** table lists every answer with its tier, source, and discounted score — the
  tiers shown in orange are the ones that were marked down.
- **Risk by topic** shows residual risk: exposure adjusted for how well managed the company is.
- **Priority actions** lists the worst topics first.

## Step 5 — Try the review workflow

On the results page:

1. Set **Reviewer** to `A. Analyst`, click **Submit for review**, then **Mark reviewed**.
2. Set **Approver** to `B. Manager`, click **Approve**.
3. Try making **Approver** the same name as the reviewer — it is refused, and you cannot skip
   steps. That is the human-in-the-loop gate working.

The **audit trail** at the bottom records every change, who made it, and when.