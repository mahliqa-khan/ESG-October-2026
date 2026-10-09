#!/usr/bin/env python3
"""Backtest runner — Step 4.

Scores companies from backtest/companies.json using the same arithmetic as
public/js/scoring.js:

    exposure(topic, industry) = relevance.json value (5 if SASB lists it, else 2)
    effective(answer)         = max(1, score - evidence_penalty)   # claimed 2, documented 1, verified 0
    maturity(topic)           = weighted mean of effective over answered questions
    residual(topic)           = exposure * (5 - maturity + 1) / 5   # = exposure if unanswered
    overall                   = exposure-weighted mean of topic residuals

Run:  python3 backtest/run.py
"""
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def load(rel):
    with open(os.path.join(ROOT, rel), encoding="utf-8") as fh:
        return json.load(fh)


def round2(n):
    return round(n + 1e-9, 2)


def band_for(score, bands):
    for b in bands:
        if score <= b["max"]:
            return b
    return bands[-1]


def score_company(company, fw, relevance):
    code = company["industry"]
    penalties = {t["id"]: t["penalty"] for t in fw["evidenceTiers"]["tiers"]}
    by_industry = relevance["byIndustry"][code]
    answers = company["answers"]

    rows = []
    for topic in fw["topics"]:
        tid = topic["id"]
        exposure = by_industry[tid]
        weighted = weight_sum = 0.0
        answered = 0
        for q in topic["questions"]:
            if q.get("scored") is False:
                continue
            a = answers.get(q["id"])
            if not a:
                continue
            value, evidence = a[0], a[1]
            effective = max(1, value - penalties.get(evidence, 0))
            w = q.get("weight", 1)
            weighted += effective * w
            weight_sum += w
            answered += 1
        maturity = round2(weighted / weight_sum) if weight_sum else None
        residual = exposure if maturity is None else round2(exposure * (5 - maturity + 1) / 5)
        rows.append({
            "topic": topic["name"],
            "pillar": topic["pillar"],
            "exposure": exposure,
            "maturity": maturity,
            "residual": residual,
            "answered": answered,
        })

    w_sum = sum(r["exposure"] for r in rows)
    overall = round2(sum(r["residual"] * r["exposure"] for r in rows) / w_sum) if w_sum else None
    band = band_for(overall, fw["riskBands"]) if overall is not None else {"label": "n/a"}
    return rows, overall, band


def main():
    fw = load("framework/framework.json")
    relevance = load("framework/relevance.json")
    data = load("backtest/companies.json")

    for company in data["companies"]:
        rows, overall, band = score_company(company, fw, relevance)
        print("=" * 68)
        print(f"{company['name']}  [{company['industry']}]  ({company.get('dataStatus', '')})")
        print(f"expected: {company.get('expected', '—')}   model: {overall} {band['label']}")
        print("-" * 68)
        print(f"{'Topic':34s} {'Exp':>4s} {'Mat':>6s} {'Residual':>9s}")
        for r in sorted(rows, key=lambda x: -x["residual"])[:8]:
            m = "—" if r["maturity"] is None else f"{r['maturity']:.2f}"
            print(f"{r['topic'][:34]:34s} {r['exposure']:>4} {m:>6} {r['residual']:>9.2f}")
        print(f"\nOVERALL RESIDUAL: {overall}  ({band['label']})")


if __name__ == "__main__":
    main()