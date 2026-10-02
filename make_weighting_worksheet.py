#!/usr/bin/env python3
"""Generate worksheet-weightings.md: a fill-in-the-blank sheet to verify the 924 industry
weightings against SASB's published disclosure-topic list for each industry."""
import json

SHORT = {
    "ghg": "GHG", "energy": "EN", "water-waste": "WW", "biodiversity": "BD",
    "health-safety": "HS", "labour-rights": "LR", "diversity": "DV",
    "product-safety": "PS", "board-oversight": "BO", "business-ethics": "BE",
    "data-privacy": "DP", "tax-transparency": "TX",
}
LONG = {
    "ghg": "Climate & GHG Emissions", "energy": "Energy Management",
    "water-waste": "Water, Waste & Circularity", "biodiversity": "Biodiversity & Land Use",
    "health-safety": "Workforce Health & Safety", "labour-rights": "Labour Practices & Human Rights",
    "diversity": "Diversity, Equity & Talent", "product-safety": "Product Safety & Quality",
    "board-oversight": "Board Oversight & ESG Governance",
    "business-ethics": "Business Ethics & Anti-Corruption",
    "data-privacy": "Data Privacy & Cybersecurity", "tax-transparency": "Tax & Transparency",
}
ORDER = list(SHORT.keys())


def load():
    with open("framework/framework.json", encoding="utf-8") as fh:
        fw = json.load(fh)
    with open("framework/relevance.json", encoding="utf-8") as fh:
        rel = json.load(fh)
    return fw, rel


def sectors_of(fw):
    out = []
    for row in fw["sasbIndustries"]:
        for ind in row["industries"]:
            if ind["code"]:
                out.append((row["sasbSector"], ind["code"], ind["name"], ind.get("workingSector", "")))
    return out


def grades_high_to_low(vector):
    return sorted(ORDER, key=lambda t: (-vector[t], ORDER.index(t)))


def main():
    fw, rel = load()
    by = rel["byIndustry"]
    industries = sectors_of(fw)
    lines = []
    add = lines.append

    add("# Weighting Verification Worksheet")
    add("")
    add("Task: check that our grades match SASB's published disclosure-topic list for each")
    add("industry. 77 industries, 12 topics each.")
    add("")
    add("## The rule")
    add("")
    add("| Does SASB list the topic for this industry? | Our grade should be |")
    add("|---|---|")
    add("| Yes | 3 to 5 |")
    add("| No | 1 or 2 |")
    add("")
    add("A grade that breaks the rule is an error. Fix it in `framework/relevance.json` under")
    add("`byIndustry.<CODE>`.")
    add("")
    add("**What this cannot check.** SASB publishes the *list* of topics, not how heavily each")
    add("one weighs. So you can confirm a topic is in the right industries, but not whether a 4")
    add("should be a 5. That part is validated by backtesting, not citation.")
    add("")
    add("## Topic codes")
    add("")
    add("| Code | Topic | Code | Topic |")
    add("|---|---|---|---|")
    pairs = [(SHORT[t], LONG[t]) for t in ORDER]
    for i in range(0, len(pairs), 2):
        a = pairs[i]
        b = pairs[i + 1] if i + 1 < len(pairs) else ("", "")
        add("| **%s** | %s | **%s** | %s |" % (a[0], a[1], b[0], b[1]))
    add("")
    add("## How to fill each entry")
    add("")
    add("- **Current grades** — ours, highest first.")
    add("- **Implied listed** — the topics we say apply (grade 3 or more).")
    add("- **SASB's topics** — write what the SASB page actually lists.")
    add("- **Verdict** — `match`, `gap` (SASB lists a topic we grade 1–2), or `error` (we grade")
    add("  3+ for a topic SASB does not list). ")
    add("")
    add("Where SASB lists a topic we do not have at all (air quality, community relations,")
    add("product design, and so on), note it — that is a gap in our topic list, not a wrong number.")
    add("")
    add("---")
    add("")

    current_sector = None
    for i, (sector, code, name, working) in enumerate(sorted(industries, key=lambda x: (x[0], x[1])), 1):
        if sector != current_sector:
            current_sector = sector
            add("## %s" % sector)
            add("")
        vector = by.get(code)
        if not vector:
            add("### %d. %s — %s" % (i, code, name))
            add("")
            add("No weightings found in `relevance.json`. Add them before verifying.")
            add("")
            continue
        ordered = grades_high_to_low(vector)
        grade_str = " · ".join("%s %d" % (SHORT[t], vector[t]) for t in ordered)
        listed = [SHORT[t] for t in ordered if vector[t] >= 3]
        unlisted = [SHORT[t] for t in ordered if vector[t] < 3]
        add("### %d. %s — %s" % (i, code, name))
        add("")
        add("- **Current grades:** %s" % grade_str)
        add("- **Implied listed:** %s" % (", ".join(listed) or "none"))
        add("- **Implied not listed:** %s" % (", ".join(unlisted) or "none"))
        add("- **SASB's topics:** ")
        add("- **Verdict:** ")
        add("- **Notes:** ")
        add("")

    add("---")
    add("")
    add("## Sign-off")
    add("")
    add("| Field | Value |")
    add("|---|---|")
    add("| Industries checked | |")
    add("| Gaps found (topics we lack) | |")
    add("| Errors corrected | |")
    add("| Checked by | |")
    add("| Date | |")
    add("")

    with open("worksheet-weightings.md", "w", encoding="utf-8") as fh:
        fh.write("\n".join(lines))
    print("industries: %d" % len(industries))
    print("wrote worksheet-weightings.md")


if __name__ == "__main__":
    main()
