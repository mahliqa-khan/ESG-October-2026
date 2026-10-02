# AI-Assisted ESG Framework Generation — Pipeline Spec & Schema

Version 0.1 — draft for review. Scope: how to generate an ESG framework/report with AI while keeping humans accountable at every gate.

---

## 1. Purpose

Define a repeatable pipeline for using AI to draft an ESG framework and its disclosures, grounded in real standards, with defined human review points, so that no unsourced claim ships and every required disclosure is explicitly accounted for.

## 2. Design principles

1. **Grounded, not generative.** The model drafts only against a canonical corpus of standards text. No source clause, no output.
2. **Human-owned judgements.** Materiality and scope are human inputs, never AI outputs.
3. **One framework at a time.** Framework and version are locked before drafting to prevent cross-framework drift.
4. **Citations are mandatory.** Every metric field carries a source reference or hard-fails.
5. **Separation of duties.** Reviewer and approver are different people.
6. **Provenance by default.** Every artefact is logged for assurance.

## 3. Three layers + gates

### Layer 1 — Pre-generation (constrain)
| Input | Purpose | Owner |
|---|---|---|
| Canonical standards corpus (GRI, IFRS S1/S2, ESRS, SASB, TNFD, GHG Protocol, CDP) | Prevents fabrication at source | Standards lead |
| Locked framework + version | Prevents framework drift | Framework owner |
| Entity / sector / jurisdictions | Selects sector-specific guidance | Framework owner |
| Mandatory vs voluntary routing | Sets strictness of downstream gates | Compliance |
| Reporting period, boundary, value chain | Prevents scope leakage | Finance + Sustainability |
| Materiality assessment result | Defines topics to draft against | Sustainability + stakeholders |

### Layer 2 — In-generation (structure)
- **Schema as a hard contract** (Section 4). Output must validate; invalid output is rejected, not patched.
- **Citation enforced per field.** Empty citation = hard fail.
- **Materiality topics are inputs.** The model may not introduce topics on its own.
- **Deterministic template.** Same framework version yields same structure; only content varies.

### Layer 3 — Post-generation (verify)
| Check | Catches | Rule |
|---|---|---|
| Citation resolution | Fabrication, drift | Every ref resolves to a real clause in corpus |
| Unit & scale check | tCO2e vs MtCO2e, absolute vs intensity | Unit must match standard's prescribed unit |
| Boundary check | Scope 1/2/3, market vs location, entity/geography | Boundary declared and consistent |
| Target/baseline check | Missing baseline year, recalculation policy | Baseline + target boundary present |
| Coverage diff | Omissions of required disclosures | Required-disclosure checklist vs output, present/absent explicit |
| Narrative review | Greenwashing, imbalance | Negatives and setbacks included |

### Gates (sequence)
```
AI draft + inline citations
        │
        ▼
Reviewer  — item-by-item against source (present/absent + citation valid)
        │
        ▼
Materiality sign-off — Sustainability + Finance
        │
        ▼
Approver — separate named individual
        │
        ▼
Legal / Compliance — required only for mandatory regimes (CSRD, ISSB where adopted)
```

### Cross-cutting — Provenance log
Records under every stage: retrieved source + clause, model name/version, prompt version, human edits (who/what/when), approval identity, timestamps. Needed for assurance and audit.

## 4. Output schema

```
Framework
├─ id, name, version, regime (mandatory | voluntary)
├─ reporting_period { start, end }
├─ boundary { entities[], geographies[], value_chain: up|down|both, ghg_scopes[] }
├─ materiality { approach: impact|financial|double, topics[] (human-set) }
├─ pillars[]
│   └─ Pillar { code: E|S|G, name }
│       └─ Topic { code, name, materiality_rationale, source_ref }
│           └─ Metric {
│                 code,                    # e.g. GRI 305-1, ESRS E1-6
│                 name, unit,
│                 definition,
│                 source_ref,              # REQUIRED — clause in corpus
│                 boundary,                # org | value_chain | scope_1|2|3
│                 value | narrative,
│                 baseline { year, value, recalculation_policy },
│                 target { value, year, boundary },
│                 assurance { level: none|limited|reasonable }
│               }
│           └─ RequiredDisclosure {
│                 code, description, present: bool, reason_if_absent
│               }
└─ provenance[]  # source, model, prompt, editor, approver, timestamp
```

**Validation rules**
- `source_ref` present and resolvable for every Metric — else reject.
- `unit` matches the standard's prescribed unit — else flag.
- `boundary` declared for every quantitative Metric — else flag.
- Every `RequiredDisclosure` has `present` set; if false, `reason_if_absent` required.
- `baseline` required wherever a `target` exists.
- `approver` != `reviewer`.

## 5. Failure modes to watch

1. Fabricated metrics / citations — reject any unsourced field.
2. Materiality decided by the model rather than the business.
3. Cross-framework blending (GRI/SASB/ISSB/ESRS definitions mixed).
4. Unit and scale errors (tCO2e vs MtCO2e; absolute vs intensity).
5. Boundary errors (Scope 1/2/3; market vs location; entity/geography).
6. Targets stated without baseline year or recalculation policy.
7. Required disclosures silently missing.
8. Mandatory regime treated as voluntary (skipping legal/compliance).
9. Cherry-picked narrative / greenwashing tone.
10. Broken provenance — cannot reconstruct what the model saw or what was edited.

## 6. Acceptance criteria

- [ ] Every metric resolves to a real clause in the locked corpus.
- [ ] Coverage diff shows 100% of required disclosures explicitly present or reasoned-absent.
- [ ] Materiality signed off by Sustainability and Finance.
- [ ] Approver distinct from reviewer; approval recorded.
- [ ] Legal/Compliance sign-off present for any mandatory regime.
- [ ] Provenance log complete and sufficient to reproduce the draft.
