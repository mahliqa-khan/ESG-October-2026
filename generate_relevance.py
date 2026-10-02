#!/usr/bin/env python3
"""Generate framework/relevance.json: topic relevance (1-5) for each of the 77 SASB industries.

Method: each SASB sector carries a base vector for the 12 topics. Individual industries then
override specific topics where the industry clearly differs from its sector base. The base
vectors and the overrides are the judgement calls; they are recorded here so the derivation is
auditable and can be replaced topic-by-topic with sourced values.

STATUS: DRAFT. These weightings are reasoned, not sourced. SASB publishes a topic list per
industry; the authoritative filter is to take that list and grade from it. Until then every
industry is marked needs-verification.
"""
import json

TOPICS = [
    "ghg", "energy", "water-waste", "biodiversity", "health-safety", "labour-rights",
    "diversity", "product-safety", "board-oversight", "business-ethics", "data-privacy",
    "tax-transparency",
]

SECTOR_BASE = {
    "Resource Transformation":                    [4, 4, 4, 2, 4, 3, 3, 4, 3, 3, 2, 2],
    "Extractives & Minerals Processing":          [5, 5, 5, 4, 5, 4, 3, 2, 4, 4, 2, 3],
    "Infrastructure":                             [4, 5, 4, 3, 4, 3, 2, 3, 3, 3, 3, 2],
    "Financials":                                 [3, 2, 1, 1, 2, 2, 4, 2, 4, 4, 5, 3],
    "Technology & Communications":                [2, 3, 2, 1, 2, 3, 4, 3, 3, 3, 5, 3],
    "Consumer Goods":                             [3, 3, 3, 2, 3, 4, 3, 4, 3, 3, 3, 2],
    "Food & Beverage":                            [4, 3, 4, 3, 4, 4, 3, 5, 3, 3, 2, 2],
    "Health Care":                                [2, 3, 3, 1, 3, 2, 3, 5, 3, 3, 4, 2],
    "Renewable Resources & Alternative Energy":   [4, 5, 4, 4, 4, 3, 2, 3, 3, 3, 2, 2],
    "Services":                                   [2, 2, 2, 1, 2, 3, 4, 3, 3, 3, 4, 2],
    "Transportation":                             [5, 4, 3, 2, 4, 3, 3, 4, 3, 3, 2, 2],
}

OVERRIDES = {
    "EM-EP": {"ghg": 5, "energy": 5, "water-waste": 4, "biodiversity": 4, "health-safety": 5},
    "EM-MD": {"ghg": 5, "biodiversity": 3, "health-safety": 4},
    "EM-RM": {"ghg": 5, "health-safety": 4, "product-safety": 3},
    "EM-SV": {"ghg": 4, "health-safety": 5, "labour-rights": 4},
    "EM-CO": {"ghg": 5, "water-waste": 4, "biodiversity": 4, "health-safety": 5, "labour-rights": 4},
    "EM-IS": {"ghg": 5, "energy": 4, "health-safety": 5, "labour-rights": 4},
    "EM-MM": {"ghg": 4, "water-waste": 5, "biodiversity": 5, "health-safety": 5, "labour-rights": 4},
    "EM-CM": {"ghg": 4, "energy": 4, "water-waste": 3, "biodiversity": 3, "health-safety": 4},
    "RT-CH": {"ghg": 4, "water-waste": 5, "biodiversity": 2, "health-safety": 5, "product-safety": 5},
    "RT-IG": {"energy": 4, "water-waste": 3, "product-safety": 4},
    "RT-EE": {"ghg": 3, "water-waste": 4, "product-safety": 4, "data-privacy": 3},
    "RT-AE": {"ghg": 4, "product-safety": 5, "business-ethics": 5},
    "RT-CP": {"ghg": 4, "water-waste": 5, "biodiversity": 3},
    "IF-EU": {"ghg": 5, "energy": 5, "water-waste": 5, "biodiversity": 4, "health-safety": 4},
    "IF-GU": {"ghg": 4, "energy": 4, "health-safety": 5},
    "IF-WU": {"ghg": 3, "energy": 4, "water-waste": 5, "biodiversity": 3, "health-safety": 4},
    "IF-WM": {"ghg": 4, "water-waste": 5, "biodiversity": 3, "health-safety": 5},
    "IF-RE": {"ghg": 4, "energy": 5, "water-waste": 3, "biodiversity": 2},
    "IF-RS": {"ghg": 3, "energy": 4, "water-waste": 2},
    "IF-HB": {"ghg": 4, "energy": 4, "water-waste": 4, "biodiversity": 4, "health-safety": 4},
    "IF-EN": {"ghg": 4, "energy": 4, "water-waste": 3, "health-safety": 5, "labour-rights": 4},
    "FN-CB": {"data-privacy": 5, "business-ethics": 5, "board-oversight": 5, "tax-transparency": 3, "ghg": 3},
    "FN-IN": {"ghg": 3, "data-privacy": 5, "product-safety": 3, "business-ethics": 4},
    "FN-AC": {"ghg": 4, "diversity": 5, "business-ethics": 5, "board-oversight": 5},
    "FN-CF": {"data-privacy": 5, "business-ethics": 4, "labour-rights": 3},
    "FN-IB": {"business-ethics": 5, "board-oversight": 5, "data-privacy": 5},
    "FN-MF": {"data-privacy": 4, "business-ethics": 4},
    "FN-EX": {"data-privacy": 5, "business-ethics": 5, "board-oversight": 5},
    "TC-SI": {"ghg": 2, "energy": 4, "data-privacy": 5, "diversity": 5, "labour-rights": 4},
    "TC-HW": {"ghg": 3, "water-waste": 4, "labour-rights": 5, "product-safety": 3},
    "TC-SC": {"ghg": 4, "water-waste": 5, "labour-rights": 4, "product-safety": 4},
    "TC-IM": {"ghg": 3, "energy": 4, "data-privacy": 5, "product-safety": 4},
    "TC-TL": {"ghg": 3, "energy": 3, "data-privacy": 5},
    "TC-ES": {"ghg": 3, "labour-rights": 5, "product-safety": 4},
    "CG-AA": {"ghg": 3, "water-waste": 4, "labour-rights": 5, "product-safety": 4},
    "CG-HP": {"ghg": 3, "water-waste": 4, "product-safety": 5},
    "CG-MR": {"ghg": 3, "product-safety": 4, "data-privacy": 4},
    "CG-AM": {"ghg": 3, "energy": 4, "product-safety": 5},
    "CG-BF": {"ghg": 3, "water-waste": 3, "product-safety": 4},
    "CG-EC": {"ghg": 3, "data-privacy": 5, "labour-rights": 4},
    "CG-TO": {"product-safety": 5, "labour-rights": 4},
    "FB-AG": {"ghg": 4, "water-waste": 5, "biodiversity": 5, "health-safety": 4, "labour-rights": 4},
    "FB-AB": {"ghg": 3, "water-waste": 5, "product-safety": 4, "business-ethics": 4},
    "FB-FR": {"ghg": 4, "water-waste": 4, "product-safety": 4, "labour-rights": 4},
    "FB-MP": {"ghg": 5, "water-waste": 5, "biodiversity": 4, "product-safety": 5, "health-safety": 4},
    "FB-NB": {"ghg": 3, "water-waste": 5, "product-safety": 4},
    "FB-PF": {"ghg": 4, "water-waste": 4, "product-safety": 5, "health-safety": 4},
    "FB-RN": {"ghg": 3, "labour-rights": 5, "health-safety": 5, "product-safety": 4},
    "FB-TB": {"product-safety": 5, "business-ethics": 5, "labour-rights": 4},
    "HC-BP": {"product-safety": 5, "business-ethics": 5, "data-privacy": 4, "health-safety": 3},
    "HC-DY": {"product-safety": 5, "data-privacy": 5, "health-safety": 4, "labour-rights": 4},
    "HC-DR": {"product-safety": 5, "data-privacy": 4, "business-ethics": 3},
    "HC-DI": {"product-safety": 5, "business-ethics": 4},
    "HC-MC": {"data-privacy": 5, "product-safety": 5, "business-ethics": 4},
    "HC-MS": {"product-safety": 5, "health-safety": 3, "data-privacy": 3},
    "RR-BI": {"ghg": 3, "water-waste": 4, "biodiversity": 5, "health-safety": 4},
    "RR-FM": {"ghg": 3, "biodiversity": 5, "health-safety": 5, "labour-rights": 4},
    "RR-FC": {"ghg": 3, "energy": 5, "water-waste": 3, "product-safety": 4},
    "RR-PP": {"ghg": 3, "energy": 4, "water-waste": 5, "biodiversity": 4, "health-safety": 5},
    "RR-ST": {"ghg": 2, "energy": 5, "biodiversity": 4, "product-safety": 3},
    "RR-WT": {"ghg": 2, "energy": 5, "biodiversity": 4, "health-safety": 4},
    "SV-AD": {"data-privacy": 5, "business-ethics": 4},
    "SV-CA": {"data-privacy": 4, "business-ethics": 5, "labour-rights": 4},
    "SV-ED": {"data-privacy": 4, "product-safety": 4, "labour-rights": 3},
    "SV-HL": {"ghg": 3, "energy": 4, "water-waste": 3, "labour-rights": 4, "health-safety": 4},
    "SV-LF": {"ghg": 3, "health-safety": 5, "labour-rights": 3},
    "SV-ME": {"data-privacy": 5, "product-safety": 4, "business-ethics": 4},
    "SV-PS": {"business-ethics": 4, "data-privacy": 5, "tax-transparency": 3},
    "TR-AF": {"ghg": 5, "energy": 5, "health-safety": 5, "product-safety": 5},
    "TR-MT": {"ghg": 5, "energy": 4, "water-waste": 4, "biodiversity": 4, "health-safety": 5},
    "TR-RA": {"ghg": 4, "energy": 4, "health-safety": 5, "product-safety": 4},
    "TR-RO": {"ghg": 5, "energy": 4, "health-safety": 5, "labour-rights": 4, "product-safety": 5},
    "TR-AL": {"ghg": 5, "energy": 5, "product-safety": 5, "labour-rights": 3},
    "TR-AP": {"ghg": 4, "water-waste": 3, "product-safety": 5, "labour-rights": 4},
    "TR-AU": {"ghg": 5, "product-safety": 5, "labour-rights": 4, "data-privacy": 4},
    "TR-CR": {"ghg": 4, "data-privacy": 4, "product-safety": 4},
    "TR-CL": {"ghg": 5, "water-waste": 4, "biodiversity": 4, "health-safety": 5, "product-safety": 4},
}


def clamp(v):
    return max(1, min(5, v))


def main():
    with open("framework/framework.json", encoding="utf-8") as fh:
        fw = json.load(fh)

    by_industry = {}
    unknown = []
    for row in fw["sasbIndustries"]:
        base = SECTOR_BASE[row["sasbSector"]]
        for ind in row["industries"]:
            code = ind["code"]
            if not code:
                continue
            vector = {t: base[i] for i, t in enumerate(TOPICS)}
            for topic, value in OVERRIDES.get(code, {}).items():
                if topic in vector:
                    vector[topic] = clamp(value)
            by_industry[code] = vector

    for code in OVERRIDES:
        if code not in by_industry:
            unknown.append(code)

    out = {
        "id": "relevance-by-industry",
        "frameworkVersion": fw["version"],
        "status": "DRAFT - NOT SOURCED",
        "method": (
            "Each SASB sector carries a base vector for the 12 topics; individual industries "
            "override specific topics where they clearly differ from the sector base. Base "
            "vectors and overrides are judgement calls recorded in generate_relevance.py, not "
            "reproduced from a standard."
        ),
        "verificationRequired": (
            "SASB publishes a disclosure-topic list for every industry. The authoritative "
            "filter is to take that list and grade relevance from it. Until then these "
            "weightings are a reasoned draft."
        ),
        "scale": {"min": 1, "max": 5, "meaning": "inherent exposure of the industry to the topic"},
        "topics": TOPICS,
        "byIndustry": by_industry,
    }

    with open("framework/relevance.json", "w", encoding="utf-8") as fh:
        json.dump(out, fh, indent=2)
        fh.write("\n")

    counts = {}
    for vector in by_industry.values():
        for t, v in vector.items():
            counts.setdefault(v, 0)
            counts[v] += 1
    print("industries: %d | topics each: %d | values: %d" % (
        len(by_industry), len(TOPICS), len(by_industry) * len(TOPICS)))
    print("distribution:", dict(sorted(counts.items())))
    if unknown:
        print("WARNING override codes not found in framework.json:", unknown)


if __name__ == "__main__":
    main()
