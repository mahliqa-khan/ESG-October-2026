#!/usr/bin/env python3
"""Generate worksheet-questions.md: a fill-in-the-blank sheet to verify that our
assessment questions cover the metrics SASB prescribes for each disclosure topic.

For each topic we list the SASB disclosure topic (from topicSources) and our questions.
The checker records SASB's prescribed metrics and whether each is covered by a question.
"""
import json


def load():
    with open("framework/framework.json", encoding="utf-8") as fh:
        return json.load(fh)


def main():
    fw = load()
    sources = {s["topicId"]: s for s in fw.get("topicSources", [])}
    lines = []
    add = lines.append

    add("# Question Coverage Worksheet")
    add("")
    add("Task: confirm that our assessment questions cover the metrics SASB prescribes for each")
    add("disclosure topic. Framework v%s. 28 topics." % fw["version"])
    add("")
    add("## Why this matters")
    add("")
    add("SASB tells us which topics are material for an industry; it also publishes the metrics a")
    add("company should disclose under each topic. Our questions are the tool's attempt to assess")
    add("those topics. If a SASB-prescribed metric has no question behind it, the tool scores that")
    add("topic on incomplete information. This sheet records where that gap is.")
    add("")
    add("## How to fill each entry")
    add("")
    add("- **SASB topic** — the disclosure topic this maps to (from `framework.json` `topicSources`).")
    add("- **SASB metrics** — copy the metric(s) SASB prescribes for this topic at industry level.")
    add("- **Our questions** — what we currently ask.")
    add("- **Coverage verdict** — `covered` (every SASB metric has a question), `partial` (some")
    add("  metrics unasked), or `gap` (SASB metric has no question at all).")
    add("")
    add("Where a SASB metric is missing, note whether to add a question or accept the gap, as done")
    add("for topics in `worksheet-weightings.md`.")
    add("")
    add("---")
    add("")

    for i, topic in enumerate(fw["topics"], 1):
        src = sources.get(topic["id"], {})
        sasb = src.get("sasb", {}) or {}
        sasb_topic = sasb.get("topic") or "No standalone SASB topic"
        gri_ref = (src.get("gri", {}) or {}).get("ref") or ""
        add("### %d. %s  (%s)" % (i, topic["name"], topic["id"]))
        add("")
        add("- **Pillar:** %s" % topic["pillar"])
        add("- **SASB topic:** %s" % sasb_topic)
        if gri_ref:
            add("- **GRI ref:** %s" % gri_ref)
        add("- **SASB metrics:** ")
        add("- **Coverage verdict:** ")
        add("")
        add("| Question id | Question | Covers which SASB metric? |")
        add("|---|---|---|")
        for q in topic.get("questions", []):
            add("| %s | %s | |" % (q["id"], q.get("text", "")))
        add("")

    add("---")
    add("")
    add("## Sign-off")
    add("")
    add("| Field | Value |")
    add("|---|---|")
    add("| Topics checked | |")
    add("| Metrics covered | |")
    add("| Gaps found | |")
    add("| Checked by | |")
    add("| Date | |")
    add("")

    with open("worksheet-questions.md", "w", encoding="utf-8") as fh:
        fh.write("\n".join(lines))
    print("topics: %d" % len(fw["topics"]))
    print("wrote worksheet-questions.md")


if __name__ == "__main__":
    main()