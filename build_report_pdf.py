#!/usr/bin/env python3
"""Render a designed one-page progress report. Usage: build_report_pdf.py out.pdf"""
import sys

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, Table, TableStyle,
)

NAVY = colors.HexColor("#0E2E4A")
ACCENT = colors.HexColor("#2E7D6B")
AMBER = colors.HexColor("#B8860B")
RED = colors.HexColor("#A62B2B")
INK = colors.HexColor("#1C2530")
MUTED = colors.HexColor("#5A6472")
LINE = colors.HexColor("#D5DBE1")
SOFT = colors.HexColor("#F5F7F9")
TINT = colors.HexColor("#EAF1EF")
AMBERBG = colors.HexColor("#FBF6E7")
REDBG = colors.HexColor("#FBEFEF")

FONT = "/System/Library/Fonts/Supplemental/Arial Unicode.ttf"
BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
ITAL = "/System/Library/Fonts/Supplemental/Arial Italic.ttf"

WIDTH = 0


def register():
    pdfmetrics.registerFont(TTFont("U", FONT))
    pdfmetrics.registerFont(TTFont("UB", BOLD))
    pdfmetrics.registerFont(TTFont("UI", ITAL))
    pdfmetrics.registerFontFamily("U", normal="U", bold="UB", italic="UI")


def styles():
    s = {}
    s["title"] = ParagraphStyle("title", fontName="UB", fontSize=20, leading=23, textColor=colors.white)
    s["sub"] = ParagraphStyle("sub", fontName="U", fontSize=10.5, leading=14, textColor=colors.HexColor("#B9C9D6"))
    s["meta"] = ParagraphStyle("meta", fontName="U", fontSize=8.5, leading=12,
                               textColor=colors.HexColor("#B9C9D6"), alignment=2)
    s["pill"] = ParagraphStyle("pill", fontName="UB", fontSize=8, leading=11,
                               textColor=colors.white, alignment=1)
    s["statn"] = ParagraphStyle("statn", fontName="UB", fontSize=21, leading=23, textColor=NAVY)
    s["statl"] = ParagraphStyle("statl", fontName="U", fontSize=8.5, leading=11, textColor=MUTED)
    s["h"] = ParagraphStyle("h", fontName="UB", fontSize=11.5, leading=14, textColor=NAVY,
                            spaceAfter=5)
    s["body"] = ParagraphStyle("body", fontName="U", fontSize=9.3, leading=13.4, textColor=INK)
    s["bullet"] = ParagraphStyle("bullet", parent=s["body"], leftIndent=11, bulletIndent=1,
                                 spaceAfter=3.5, leading=13)
    s["stepn"] = ParagraphStyle("stepn", fontName="UB", fontSize=9.5, leading=12,
                                textColor=colors.white, alignment=1)
    s["step"] = ParagraphStyle("step", fontName="U", fontSize=9.3, leading=13, textColor=INK)
    s["stepb"] = ParagraphStyle("stepb", fontName="UB", fontSize=9.3, leading=13, textColor=NAVY)
    s["callout"] = ParagraphStyle("callout", fontName="U", fontSize=9.3, leading=13.4, textColor=INK)
    s["callouth"] = ParagraphStyle("callouth", fontName="UB", fontSize=10.5, leading=13,
                                   textColor=RED, spaceAfter=3)
    return s


def hero(s):
    left = [
        Paragraph("ESG Assessment Tool", s["title"]),
        Spacer(1, 2),
        Paragraph("Progress Report", s["sub"]),
    ]
    right = [
        Paragraph("1 October 2026", s["meta"]),
        Spacer(1, 4),
    ]
    pill = Table([[Paragraph("STEPS 1–2 COMPLETE", s["pill"])]], colWidths=[140])
    pill.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), ACCENT),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ("LEFTPADDING", (0, 0), (-1, -1), 4),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
    ]))
    right.append(pill)
    inner = Table([[left, right]], colWidths=[WIDTH - 150, 150])
    inner.setStyle(TableStyle([
        ("VALIGN", (0, 0), (0, 0), "TOP"),
        ("VALIGN", (1, 0), (1, 0), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    bar = Table([[inner]], colWidths=[WIDTH])
    bar.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), NAVY),
        ("LEFTPADDING", (0, 0), (-1, -1), 18),
        ("RIGHTPADDING", (0, 0), (-1, -1), 18),
        ("TOPPADDING", (0, 0), (-1, -1), 16),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 16),
    ]))
    return bar


def stats(s):
    tiles = [
        ("77", "Industries weighted"),
        ("924", "Topic weightings"),
        ("89", "Codes verified"),
        ("3", "Workflow steps remaining"),
    ]
    cells = []
    for n, label in tiles:
        cells.append([Paragraph(n, s["statn"]), Paragraph(label, s["statl"])])
    cell_flow = []
    for c in cells:
        cell_flow.append(Table([[c[0]], [c[1]]], colWidths=[WIDTH / 4 - 12]))
    outer = Table([cell_flow], colWidths=[WIDTH / 4] * 4)
    outer.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("BACKGROUND", (0, 0), (-1, -1), SOFT),
        ("LINEAFTER", (0, 0), (-2, -1), 0.6, LINE),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
    ]))
    for i in range(4):
        outer.setStyle(TableStyle([("TOPPADDING", (i, 0), (i, 0), 9)]))
    return outer


def card2(title, items, edge):
    content = [Paragraph(title, ParagraphStyle("ch2", fontName="UB", fontSize=11, leading=14,
                                               textColor=edge, spaceAfter=5))]
    for it in items:
        content.append(Paragraph(it, ParagraphStyle(
            "b2", fontName="U", fontSize=9.3, leading=13.2, textColor=INK,
            leftIndent=11, bulletIndent=1, spaceAfter=3.5), bulletText="\u2013"))
    inner = Table([[content]], colWidths=[WIDTH - 8 - 12])
    inner.setStyle(TableStyle([
        ("LEFTPADDING", (0, 0), (-1, -1), 11),
        ("RIGHTPADDING", (0, 0), (-1, -1), 11),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
    ]))
    outer = Table([["", inner]], colWidths=[5, WIDTH - 5])
    outer.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, 0), edge),
        ("BACKGROUND", (1, 0), (1, 0), SOFT),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (0, 0), 0),
        ("RIGHTPADDING", (0, 0), (0, 0), 0),
        ("TOPPADDING", (0, 0), (0, 0), 0),
        ("BOTTOMPADDING", (0, 0), (0, 0), 0),
        ("LEFTPADDING", (1, 0), (1, 0), 0),
        ("TOPPADDING", (1, 0), (1, 0), 0),
        ("BOTTOMPADDING", (1, 0), (1, 0), 0),
        ("RIGHTPADDING", (1, 0), (1, 0), 0),
    ]))
    return outer


def heading(text, s):
    return Paragraph(text, s["h"])


def steps_block(items, s):
    rows = []
    for i, (title, text) in enumerate(items, 1):
        badge = Table([[Paragraph(str(i), s["stepn"])]], colWidths=[16])
        badge.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), NAVY),
            ("TOPPADDING", (0, 0), (-1, -1), 2),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ]))
        text_cell = [
            Paragraph(title, s["stepb"]),
            Paragraph(text, s["step"]),
        ]
        rows.append([badge, text_cell])
    t = Table(rows, colWidths=[22, WIDTH - 22])
    t.setStyle(TableStyle([
        ("VALIGN", (0, 0), (0, -1), "TOP"),
        ("VALIGN", (1, 0), (1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (0, -1), 2),
        ("RIGHTPADDING", (0, 0), (0, -1), 4),
        ("LEFTPADDING", (1, 0), (1, -1), 0),
        ("RIGHTPADDING", (1, 0), (1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LINEBELOW", (1, 0), (1, -2), 0.4, LINE),
    ]))
    return t


def callout(s):
    content = [
        Paragraph("Next decision", s["callouth"]),
        Paragraph("Nothing is blocking. Two candidate moves: verify the 924 weightings against "
                  "each industry's published SASB topic list — the method that closed Step 1 — "
                  "or proceed to Step 3 and return to weighting verification later.", s["callout"]),
    ]
    inner = Table([[content]], colWidths=[WIDTH - 8 - 12])
    inner.setStyle(TableStyle([
        ("LEFTPADDING", (0, 0), (-1, -1), 11),
        ("RIGHTPADDING", (0, 0), (-1, -1), 11),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
    ]))
    outer = Table([["", inner]], colWidths=[5, WIDTH - 5])
    outer.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, 0), RED),
        ("BACKGROUND", (1, 0), (1, 0), REDBG),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return outer


def build(out):
    global WIDTH
    register()
    s = styles()
    doc = BaseDocTemplate(out, pagesize=A4, leftMargin=16 * mm, rightMargin=16 * mm,
                          topMargin=14 * mm, bottomMargin=14 * mm,
                          title="ESG Assessment Tool - Progress Report",
                          author="ESG Framework Project")
    WIDTH = doc.width

    def deco(canv, d):
        canv.saveState()
        canv.setFont("U", 7.2)
        canv.setFillColor(MUTED)
        canv.drawString(d.leftMargin, 9 * mm, "ESG Assessment Tool  |  Progress Report  |  1 October 2026")
        canv.drawRightString(A4[0] - d.rightMargin, 9 * mm, "Page 1 of 1")
        canv.setStrokeColor(LINE)
        canv.setLineWidth(0.5)
        canv.line(d.leftMargin, 12.5 * mm, A4[0] - d.rightMargin, 12.5 * mm)
        canv.restoreState()

    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="f")
    doc.addPageTemplates([PageTemplate(id="p", frames=[frame], onPage=deco)])

    story = [
        hero(s),
        Spacer(1, 9),
        stats(s),
        Spacer(1, 10),
        heading("What we are building", s),
        Paragraph("A web tool for investor firms to assess the ESG risk of the companies they "
                  "invest in. The user describes the company, answers questions about how well "
                  "it is managed, and receives a residual-risk score with required actions and a "
                  "human review workflow.", s["body"]),
        Spacer(1, 9),
        card2("Completed", [
            "<b>Framework universe.</b> All 11 SASB sectors and 77 industries mapped, sourced "
            "from the SASB Standards rather than invented. This determines which topics matter "
            "for which business, and drives every downstream score.",
            "<b>Scoring model.</b> Residual risk equals exposure adjusted for management "
            "maturity (policy, measurement, targets, independent verification). Exposure blends "
            "across industries, so multi-business groups can be modelled by revenue share.",
            "<b>Working application.</b> Portfolio dashboard, sector-specific questionnaires, "
            "live scoring, priority actions, and an enforced review workflow where the approver "
            "must differ from the reviewer and every change is logged.",
            "<b>Industry-level weighting (Step 2).</b> All 77 industries now carry their own "
            "topic weightings, so the industry a company is assigned drives its exposure. "
            "Multi-business groups blend across industries by revenue share.",
            "<b>Verified universe.</b> All 77 industry codes and 12 topic mappings checked "
            "against the SASB codification and GRI standards on 1 October 2026. 89 of 89 "
            "entries verified; the universe is no longer provisional.",
        ], ACCENT),
        Spacer(1, 8),
        card2("Current limitation", [
            "The industry weightings are reasoned, not sourced. The 924 values derive from "
            "sector base vectors and per-industry overrides rather than from SASB's published "
            "disclosure-topic list for each industry.",
            "The remaining task is to grade each industry from its published topic list — the "
            "same checking method that closed Step 1.",
        ], AMBER),
        Spacer(1, 9),
        heading("Future workflow", s),
        steps_block([
            ("Evidence tiering", "Score claimed, documented and verified evidence differently, instead of treating all answers as equal."),
            ("Backtesting", "Test the model against companies with known ESG failures, and against well-regarded firms, to calibrate thresholds."),
            ("Persistence", "Move data from browser storage to a server database with user accounts, for multi-user deployment."),
        ], s),
        Spacer(1, 9),
        callout(s),
    ]
    doc.build(story)
    print("wrote %s" % out)


if __name__ == "__main__":
    build(sys.argv[1] if len(sys.argv) > 1 else "progress-report.pdf")
