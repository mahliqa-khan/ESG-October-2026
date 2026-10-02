# Where Are We?

Status as at 1 October 2026. Steps 1 and 2 are complete. Three steps remain.

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

## The one caveat

You checked the *codes* — the names of the 77 industries. You have not checked the
*weightings* — the 924 numbers that say how risky each topic is for each industry.

Those numbers were reasoned out, not taken from a published source. If they are wrong, every
score the tool produces is wrong. This is the same kind of risk the codes carried before you
verified them.

> Analogy: the codes are the street names. You have confirmed the streets exist and are
> spelled correctly. The weightings are the directions — we have written them down, but
> nobody has driven the route to check they get you there.

## What is left

1. **Check the weightings.** Confirm the numbers match how SASB describes each industry.
2. **Evidence tiering.** Right now, a company that *claims* it has a policy scores the same
   as one that can *prove* it. That should not be true.
3. **Backtesting.** Run the model against companies that are known to have had ESG failures.
   If it would not have flagged them, the model needs fixing.
4. **Move off the browser.** Data currently lives in one person's browser. It needs a proper
   database so a team can use it.

## What you need to decide

Nothing is blocking. The question is order of work:

- Check the weightings now, before anyone relies on the scores, or
- Go straight to evidence tiering and come back to weightings later.

The first is safer. The second is faster.
