# Encoding ESG Expertise — In Depth

A deeper treatment of what it actually means to capture domain judgement in a system, and why
it is harder than it looks.

---

## 1. The core problem

Expertise is not a database you can query. It is a set of four judgements:

1. **What to look at** — which topics, which facts, which questions matter.
2. **What counts as evidence** — what proof is acceptable, and how much.
3. **How much each thing matters** — relative weight, thresholds, materiality.
4. **What to do about it** — when to monitor, engage, escalate, or walk away.

Only the first is easy to extract. The other three are tactical and situational: experts act
on them fluently but cannot state them completely. This is Michael Polanyi's observation —
"we know more than we can tell" — and it is the central obstacle in encoding any expertise.

The consequence for design: **you cannot extract a model by interviewing someone.** You have
to reconstruct it from behaviour, artefacts, and cases, then test it.

## 2. The four kinds of knowledge (each needs a different extraction method)

| Kind | What it is | Experts are good at | Extraction method |
|---|---|---|---|
| Facts | Data points, definitions, codes | Recall with prompting | Documents, direct questions |
| Rules | If-then conditions | Stating when pushed ("what would make you reject this?") | Boundary questioning, exceptions |
| Weights | Relative importance | **Comparison**, not absolute numbers | Pairwise ranking, forced trade-offs |
| Frames | What counts as a question at all | Nothing — invisible to them | Observation, artefact differences, academic critique |

The key asymmetry: **people are reliable at comparison and case recall, and unreliable at
absolute numbers and self-description.** Ask "which of these two matters more, and why?" not
"what is the weight?" Ask "tell me about a company that worried you" not "what is your
process?"

## 3. Anatomy of an assessment model — the seven layers

Every ESG assessment tool, whether a spreadsheet or a rating agency, is built from the same
seven layers. Knowing them tells you exactly where the judgement sits.

**Layer 1 — Universe.** The list of topics that could possibly matter. This is the one layer
that is genuinely codified: SASB and GRI already did this work by industry. Design question:
do you adopt their universe or build your own?

**Layer 2 — Relevance gate.** Which topics apply to *this* company. Driven by sector, but also
geography, size, asset type, business model. Design question: is relevance binary (in/out) or
graded (a weight)? Graded is more honest but harder to defend.

**Layer 3 — Exposure.** Inherent risk before management — what you are exposed to by virtue of
what you do. Design questions: what drives exposure (sector, geography, size, intensity)?
Should it be linear or stepped? A data centre and a mine are not proportionally different;
they are categorically different.

**Layer 4 — Management.** How well the company controls the exposure. Almost always a maturity
ladder: absent → informal → formal → measured → verified. Design question: what are the rungs,
and are they about *having* something (a policy) or *doing* something (a result)? These are
very different and mixing them is the most common design error.

**Layer 5 — Evidence.** What proof counts, and at what confidence. **This is where most tools
are weakest — they score assertions rather than evidence.** A policy claimed by management, a
policy seen in a document, and a policy verified by an auditor are three different things. If
the model collapses them into one score, it is measuring confidence, not performance.

**Layer 6 — Decision rules.** The thresholds that turn a score into an action: monitor,
engage, escalate, exclude, price. Design questions: is the threshold absolute or relative to
the rest of the portfolio? Who owns the threshold — the analyst, the investment committee, or
the mandate?

**Layer 7 — Governance.** Overrides, escalation paths, sign-off, and versioning. The layer
everyone forgets and every auditor asks about first.

## 4. Why experts disagree — and why the disagreement is the product

When two practitioners give different answers, the instinct is to average them. That is wrong.
They disagree because they optimise different things:

- **Objective** — risk to the investment vs impact on the world vs return.
- **Horizon** — this quarter vs this decade.
- **Mandate** — a pension fund and a hedge fund can hold the same stock and want different
  answers.
- **Epistemics** — rules-based (apply the framework) vs judgement-based (read the situation).

Disagreement is not noise. It is the design space, and it marks exactly the points where you
must make a decision and record your reasoning. **A framework with no contentious choices is
not a framework — it is a copy of an existing one.**

## 5. Extraction techniques in depth

**Artefact archaeology.** Experts crystallise their judgement into documents: standards'
"basis for conclusions", consultation responses, rating-agency methodology papers, published
fund policies. You are not reading for rules; you are reading for *reasoning* and *rejected
alternatives*. The rejected alternatives are the most valuable content and the most commonly
skipped.

**Reverse-engineering.** Take a known output — a company rated A, a bond priced at a premium —
and work backwards to the model that would produce it. You will never recover it exactly, but
the constraints you infer are real data.

**Case-based elicitation.** Experts cannot state rules but they can sort cases. Give them
twenty anonymised companies and ask them to rank by risk. The *ranking* reveals the model; ask
why only where their ranking looks surprising to you. Those surprises are where the tacit
judgement lives.

**Protocol analysis.** Ask an expert to think aloud through one real case. Do not listen to the
conclusions — listen to the pauses, the reversals, and the things they check on instinct. "I
always look at board turnover first" is a rule they would never have stated if asked directly.

**Disagreement triangulation.** Put two credible sources side by side and find where they
conflict. Each conflict is a decision point. Resolve it explicitly, in writing, with a reason.

**Backtesting.** Use the past as a labelled dataset. Companies with known ESG failures, scored
using only pre-event information, are your test set. If the model would not have flagged them,
it is wrong — and you found out without needing an expert.

## 6. The fidelity test — how you know the encoding is faithful

A model is not correct because it looks reasonable. It is correct when it survives these:

- **Face validity** — does a practitioner recognise their own reasoning in it?
- **Discriminant validity** — does it separate the cases an expert would separate? A model
  that scores everything 2.8 has encoded nothing.
- **Calibration** — on known failures, does it flag? On well-regarded companies, does it
  avoid false alarms? Both directions matter equally.
- **Falsifiability** — can you state, in advance, what result would prove the model wrong?
  If not, it is not a model, it is an opinion with numbers attached.

## 7. Worked example — Climate & GHG, from judgement to structure

To make this concrete, here is one topic carried through all seven layers, with the judgement
calls made visible.

| Layer | Encoded decision | The judgement embedded |
|---|---|---|
| Universe | Included; derived from ISSB S2 / GHG Protocol | Climate is in every credible universe — the only real question is scope |
| Relevance | Sector-driven: energy 5, logistics 5, software 2 | A software firm's climate exposure is mostly reputational, not operational |
| Exposure | Intensity + regulatory exposure, not absolute emissions | Absolute tonnes punish size; intensity measures what you control |
| Management | Policy → measurement → target-with-baseline → verification | Ordered deliberately: **evidence of a result outranks evidence of an intention** |
| Evidence | Self-report < third-party data < assurance | The same claim at three confidence levels is three different scores |
| Decision | Band → monitor / engage / escalate | Thresholds chosen to be defensible to an investment committee, not precise |
| Governance | Approved scores locked; version tied to framework release | The model will change; assessments must record which model judged them |

Note the judgements that were decided, not discovered: intensity over absolute; verification
weighted above policy; thresholds set for defensibility rather than accuracy. None of these
are in the standards. All of them had to be chosen. Choosing them *is* the encoding.

## 8. The limits — what you cannot encode

- **Tacit residue.** Roughly the last fifth of expertise is mandate-specific and situational.
  You will not capture it from documents. You get it from a real deal, or you leave it to a
  human override — which is itself a legitimate design decision.
- **Model drift.** Standards and expectations change. Version everything and record which
  version produced each judgement, or you cannot explain history.
- **Gaming.** Once investees know the model, they optimise to the model, not the outcome.
  Keep some questions unstated, or rotate them.
- **False precision.** A score of 3.47 implies accuracy the underlying data does not support.
  Round aggressively; a band is more honest than a decimal.

## 9. The order of work

1. Adopt a universe (do not invent topics — it is already done for you).
2. Map the disagreement landscape for your mandate: find the 10 live arguments.
3. Decide each one explicitly, with a written reason.
4. Build the seven layers around those decisions.
5. Backtest against known failures and known good performers.
6. State what would falsify the model.
7. Version it, and record the version on every assessment it produces.
