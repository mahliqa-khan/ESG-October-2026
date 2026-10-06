# Where Are We?

Status as at 6 October 2026. Steps 1 and 2 are complete and verified. Three steps remain.

---

## What we are building

A tool for investors. Someone picks a company they have invested in, answers a set of
questions about it, and gets a risk score back. A second person then checks the score before
anyone acts on it.

## How the score works

Two things get combined.

**1. How risky is this kind of business?**
A chemical plant is exposed to safety and pollution problems. A software company mostly is
not — but it is exposed to data privacy problems. This depends on *what the company does*,
not how well it does it. We call this **exposure**.

**2. How well does this company handle it?**
Does it have a policy? Does it measure the problem? Does it have targets? Has anyone
independently checked? This comes from the questions you answer. We call this **management**.

Combine the two and you get **residual risk** — what is left over after management has done
its job.

> Think of driving. Exposure is how fast the car goes. Management is the brakes.
> A fast car with good brakes is fine. A fast car with no brakes is a disaster.
> A slow car with no brakes barely matters.

High residual risk means escalate. Low means leave it alone.

## What is done

| Step | What it is | Status |
|---|---|---|
| 1 | The list of business types. 11 SASB sectors and 77 industries, taken from the official SASB standards. | Done, and you checked every code against the source |
| 2 | How risky each business type is. All 77 industries now carry their own weightings across 12 topics (924 numbers in total). | Done and working in the app |

The app is also built: dashboard, questionnaires, live scoring, results, and a review
workflow where one person submits, a second reviews, and a third approves.

## The caveat is closed

The codes and the weightings are both verified. Every one of the 77 industries was checked
against its published SASB disclosure-topic list: a topic SASB lists is graded 5, a topic it
does not list is graded 2.

The fact-check also fixed two gaps. SASB lists two issues our topic list was missing —
**Materials Sourcing & Efficiency** and **Product Design & Lifecycle Management** — so the
universe was expanded from 12 topics to SASB's full 26 issues, plus 2 GRI-sourced topics
(Board Oversight, Tax). That is 28 topics, 2,156 values, all checked.

> Analogy: the codes are the street names, and the weightings are the directions. Both have
> now been driven — SASB's published map for each industry matches ours.

## What is left

1. **Evidence tiering.** Right now, a company that *claims* it has a policy scores the same
   as one that can *prove* it. That should not be true.
2. **Backtesting.** Run the model against companies that are known to have had ESG failures.
   If it would not have flagged them, the model needs fixing.
3. **Move off the browser.** Data currently lives in one person's browser. It needs a proper
   database so a team can use it.

## What you need to decide

Nothing is blocking. Steps left are evidence tiering, backtesting, and persistence. The
weightings question that used to sit here is resolved.
