#!/usr/bin/env python3
"""Render a Markdown spec to PDF using reportlab. Usage: build_pdf.py in.md out.pdf"""
import re
import sys

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer,
    Preformatted, Table, TableStyle, HRFlowable, KeepTogether,
)

NAVY = colors.HexColor("#10314F")
ACCENT = colors.HexColor("#2E7D6B")
GREY = colors.HexColor("#5A6472")
RULE = colors.HexColor("#D5DBE1")
CODEBG = colors.HexColor("#F4F6F8")

BODY = "/System/Library/Fonts/Supplemental/Arial Unicode.ttf"
BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
ITAL = "/System/Library/Fonts/Supplemental/Arial Italic.ttf"
MONO = "/System/Library/Fonts/Menlo.ttc"


def register_fonts():
    pdfmetrics.registerFont(TTFont("Uni", BODY))
    pdfmetrics.registerFont(TTFont("Uni-Bold", BOLD))
    pdfmetrics.registerFont(TTFont("Uni-Italic", ITAL))
    pdfmetrics.registerFontFamily("Uni", normal="Uni", bold="Uni-Bold", italic="Uni-Italic")
    try:
        pdfmetrics.registerFont(TTFont("UniCode", MONO, subfontIndex=0))
    except Exception:
        pdfmetrics.registerFont(TTFont("UniCode", BODY))


def styles():
    s = {}
    s["h1"] = ParagraphStyle("h1", fontName="Uni-Bold", fontSize=19, leading=24,
                             textColor=NAVY, spaceBefore=0, spaceAfter=8)
    s["h2"] = ParagraphStyle("h2", fontName="Uni-Bold", fontSize=13.5, leading=18,
                             textColor=NAVY, spaceBefore=16, spaceAfter=6)
    s["h3"] = ParagraphStyle("h3", fontName="Uni-Bold", fontSize=11.5, leading=15,
                             textColor=ACCENT, spaceBefore=12, spaceAfter=4)
    s["body"] = ParagraphStyle("body", fontName="Uni", fontSize=10, leading=15,
                               textColor=colors.HexColor("#1C2530"), spaceAfter=6,
                               alignment=TA_LEFT)
    s["bullet"] = ParagraphStyle("bullet", parent=s["body"], leftIndent=14,
                                 bulletIndent=3, spaceAfter=3, leading=14.5)
    s["code"] = ParagraphStyle("code", fontName="UniCode", fontSize=8.2, leading=11.5,
                               textColor=colors.HexColor("#22303C"), backColor=CODEBG,
                               borderPadding=7, spaceBefore=4, spaceAfter=8)
    s["cell"] = ParagraphStyle("cell", fontName="Uni", fontSize=8.6, leading=12,
                               textColor=colors.HexColor("#1C2530"))
    s["cellh"] = ParagraphStyle("cellh", fontName="Uni-Bold", fontSize=8.8, leading=12,
                                textColor=colors.white)
    s["ruleline"] = ParagraphStyle("rl", fontName="Uni", fontSize=1, leading=1)
    return s


def esc(t):
    return t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def inline(t):
    t = esc(t)
    t = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", t)
    t = re.sub(r"`(.+?)`", r'<font face="UniCode" size="8.6" color="#B03060">\1</font>', t)
    t = re.sub(r"(?<!\w)\*(?!\s)(.+?)(?<!\s)\*(?!\w)", r"<i>\1</i>", t)
    return t


def split_row(line):
    return [c.strip() for c in line.strip().strip("|").split("|")]


def is_sep(line):
    return bool(re.fullmatch(r"\|[\s:|-]+\|", line.strip()))


def col_widths(rows, avail):
    n = len(rows[0])
    weights = []
    for i in range(n):
        longest = max((len(r[i]) for r in rows if i < len(r)), default=1)
        weights.append(max(longest, 8))
    total = float(sum(weights))
    return [avail * w / total for w in weights]


def build_table(rows, st, avail):
    body = [[Paragraph(inline(c), st["cellh"] if i == 0 else st["cell"])
             for c in r] for i, r in enumerate(rows)]
    t = Table(body, colWidths=col_widths(rows, avail), repeatRows=1, hAlign="LEFT")
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#F7F9FB")]),
        ("GRID", (0, 0), (-1, -1), 0.4, RULE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    return t


def parse(md, st, avail):
    lines = md.split("\n")
    flow, i, n = [], 0, len(lines)
    while i < n:
        line = lines[i]
        stripped = line.strip()

        if stripped.startswith("```"):
            i += 1
            buf = []
            while i < n and not lines[i].strip().startswith("```"):
                buf.append(lines[i].rstrip())
                i += 1
            i += 1
            flow.append(Preformatted("\n".join(buf), st["code"]))
            continue

        if stripped.startswith("|") and i + 1 < n and is_sep(lines[i + 1]):
            rows = [split_row(stripped)]
            i += 2
            while i < n and lines[i].strip().startswith("|"):
                rows.append(split_row(lines[i]))
                i += 1
            flow.append(Spacer(1, 2))
            flow.append(build_table(rows, st, avail))
            flow.append(Spacer(1, 8))
            continue

        if re.fullmatch(r"-{3,}", stripped):
            flow.append(Spacer(1, 3))
            flow.append(HRFlowable(width="100%", thickness=0.6, color=RULE))
            flow.append(Spacer(1, 5))
            i += 1
            continue

        m = re.match(r"^(#{1,4})\s+(.*)$", stripped)
        if m:
            lvl = len(m.group(1))
            key = "h1" if lvl == 1 else ("h2" if lvl == 2 else "h3")
            flow.append(Paragraph(inline(m.group(2)), st[key]))
            i += 1
            continue

        m = re.match(r"^-\s+\[([ xX])\]\s+(.*)$", stripped)
        if m:
            box = "\u2611" if m.group(1).lower() == "x" else "\u2610"
            flow.append(Paragraph(inline(m.group(2)), st["bullet"], bulletText=box))
            i += 1
            continue

        m = re.match(r"^[-*]\s+(.*)$", stripped)
        if m:
            flow.append(Paragraph(inline(m.group(1)), st["bullet"], bulletText="\u2022"))
            i += 1
            continue

        m = re.match(r"^(\d+)\.\s+(.*)$", stripped)
        if m:
            flow.append(Paragraph(inline(m.group(2)), st["bullet"], bulletText=m.group(1) + "."))
            i += 1
            continue

        if not stripped:
            i += 1
            continue

        flow.append(Paragraph(inline(stripped), st["body"]))
        i += 1
    return flow


def make_doc(path):
    doc = BaseDocTemplate(path, pagesize=A4,
                          leftMargin=20 * mm, rightMargin=20 * mm,
                          topMargin=18 * mm, bottomMargin=18 * mm,
                          title="AI-Assisted ESG Framework Generation - Pipeline Spec",
                          author="ESG Framework Project")

    def deco(canv, d):
        canv.saveState()
        canv.setStrokeColor(RULE)
        canv.setLineWidth(0.5)
        canv.line(d.leftMargin, 14 * mm, A4[0] - d.rightMargin, 14 * mm)
        canv.setFont("Uni", 7.5)
        canv.setFillColor(GREY)
        canv.drawString(d.leftMargin, 10.5 * mm, "AI-Assisted ESG Framework Generation \u2014 Pipeline Spec")
        canv.drawRightString(A4[0] - d.rightMargin, 10.5 * mm, "Page %d" % canv.getPageNumber())
        canv.restoreState()

    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
    doc.addPageTemplates([PageTemplate(id="all", frames=[frame], onPage=deco)])
    return doc


def main():
    src = sys.argv[1] if len(sys.argv) > 1 else "esg-ai-pipeline-spec.md"
    out = sys.argv[2] if len(sys.argv) > 2 else src.rsplit(".", 1)[0] + ".pdf"
    register_fonts()
    st = styles()
    with open(src, "r", encoding="utf-8") as fh:
        md = fh.read()
    doc = make_doc(out)
    avail = doc.width
    doc.build(parse(md, st, avail))
    print("wrote %s" % out)


if __name__ == "__main__":
    main()
