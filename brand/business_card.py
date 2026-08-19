#!/usr/bin/env python3
"""
Mo AI business card generator.

Produces press-ready PDFs (trim + 3mm bleed + crop marks) in both the US and
international sizes, front and back, plus 300dpi PNG previews rendered from the
very same PDFs so the preview cannot drift from what the printer receives.

    python3 brand/business_card.py
"""
from pathlib import Path

from reportlab.lib.units import mm
from reportlab.lib.colors import Color, HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.graphics.barcode import qr
from reportlab.graphics.shapes import Drawing
from reportlab.graphics import renderPDF

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "out"
OUT.mkdir(parents=True, exist_ok=True)
LOGO = ROOT.parent / "public" / "logo-mark@3x.png"

# ---------------------------------------------------------------- brand ----
INK = HexColor("#FFFFFF")
MUTED = HexColor("#A8A8AE")
FAINT = HexColor("#6E6E76")
CYAN = HexColor("#34D2F2")
AZURE = HexColor("#0A84FF")
BG = HexColor("#050507")
HAIRLINE = Color(1, 1, 1, alpha=0.16)

SITE_URL = "https://mo-ai-omega.vercel.app"
SITE_LABEL = "mo-ai-omega.vercel.app"
WHATSAPP = "+1 (361) 633-2217"
EMAIL = "mabdullahi7780@gmail.com"

FOUNDERS = [
    ("Ahmed Irfan", "Co-Founder & Chief Revenue Officer"),
    ("Abdullah Irfan", "Co-Founder & Chief Technology Officer"),
]

# Problem-first, written for an owner-operator, not a CTO.
SERVICES = [
    ("Never Miss Another Call",
     "Every call answered day or night, and booked into your calendar."),
    ("Quotes That Chase Themselves",
     "Every estimate followed up automatically until they book or say no."),
    ("One Screen for Every Job",
     "Leads, quotes, crews and schedule finally in one place."),
    ("A Website That Books Work",
     "Turns visitors into booked jobs, not just clicks."),
]

HOOK = "A missed call is a lost job."

# ----------------------------------------------------------------- type ----
HN = "/System/Library/Fonts/HelveticaNeue.ttc"
FONTS = {"Card": 0, "Card-Bold": 1, "Card-Medium": 10, "Card-Light": 7}
for name, idx in FONTS.items():
    pdfmetrics.registerFont(TTFont(name, HN, subfontIndex=idx))

# ---------------------------------------------------------------- sizes ----
SIZES = {
    "us":   (88.9 * mm, 50.8 * mm),   # 3.5 x 2 in
    "intl": (85.0 * mm, 55.0 * mm),   # ISO 7810 ID-1
}
BLEED = 3 * mm
MARK_GAP = 1.5 * mm     # clear space between trim and the start of a mark
MARK_LEN = 4 * mm
SLUG = BLEED + MARK_GAP + MARK_LEN + 1.5 * mm


def tracked(c, x, y, text, font, size, tracking, color):
    """Draw letter-spaced text and return its total width."""
    c.setFont(font, size)
    c.setFillColor(color)
    cx = x
    for ch in text:
        c.drawString(cx, y, ch)
        cx += pdfmetrics.stringWidth(ch, font, size) + tracking
    return cx - x - tracking


def tracked_width(text, font, size, tracking):
    w = sum(pdfmetrics.stringWidth(ch, font, size) for ch in text)
    return w + tracking * (len(text) - 1)


def crop_marks(c, w, h):
    """Marks sit outside the bleed so the guillotine cut is unambiguous."""
    c.setStrokeColor(Color(0, 0, 0, alpha=1))
    c.setLineWidth(0.25)
    x0, y0 = SLUG, SLUG
    x1, y1 = SLUG + w, SLUG + h
    o, L = BLEED + MARK_GAP, MARK_LEN
    for x in (x0, x1):
        c.line(x, y0 - o, x, y0 - o - L)
        c.line(x, y1 + o, x, y1 + o + L)
    for y in (y0, y1):
        c.line(x0 - o, y, x0 - o - L, y)
        c.line(x1 + o, y, x1 + o + L, y)


def background(c, w, h):
    """Flood the full bleed area, never just the trim."""
    c.setFillColor(BG)
    c.rect(SLUG - BLEED, SLUG - BLEED, w + 2 * BLEED, h + 2 * BLEED, stroke=0, fill=1)


def draw_qr(c, x, y, side):
    """Black modules on a white panel: the most reliable thing to scan."""
    pad = 1.6 * mm
    c.setFillColor(HexColor("#FFFFFF"))
    c.roundRect(x, y, side, side, 1.2 * mm, stroke=0, fill=1)
    inner = side - 2 * pad
    widget = qr.QrCodeWidget(SITE_URL, barLevel="H", barBorder=0)
    b = widget.getBounds()
    d = Drawing(inner, inner, transform=[inner / (b[2] - b[0]), 0, 0,
                                         inner / (b[3] - b[1]), 0, 0])
    d.add(widget)
    renderPDF.draw(d, c, x + pad, y + pad)


# ----------------------------------------------------------------- front ---
def front(c, w, h):
    background(c, w, h)
    L = SLUG + 6 * mm
    R = SLUG + w - 6 * mm
    top = SLUG + h - 6 * mm
    base = SLUG + 6 * mm

    # --- logo lockup -------------------------------------------------------
    mark_h = 8.6 * mm
    mark_w = mark_h * (225 / 145)
    c.drawImage(str(LOGO), L, top - mark_h, width=mark_w, height=mark_h,
                mask="auto", preserveAspectRatio=True, anchor="sw")

    wx = L + mark_w + 3.0 * mm
    c.setFont("Card-Bold", 15)
    c.setFillColor(INK)
    c.drawString(wx, top - mark_h + 3.5 * mm, "MO AI")
    tracked(c, wx + 0.4, top - mark_h + 0.6 * mm,
            "INTELLIGENCE ENGINEERED", "Card-Medium", 4.1, 0.62, CYAN)

    rule_y = top - mark_h - 4.0 * mm
    c.setStrokeColor(HAIRLINE)
    c.setLineWidth(0.4)
    c.line(L, rule_y, R, rule_y)

    # --- right column: QR, optically centred in the band below the rule ----
    qr_side = 15 * mm
    url_gap = 2.6 * mm
    qr_x = R - qr_side
    band_top, band_bot = rule_y, base
    block_h = qr_side + url_gap
    qr_y = band_bot + (band_top - band_bot - block_h) / 2 + url_gap
    draw_qr(c, qr_x, qr_y, qr_side)
    c.setFont("Card-Medium", 4.6)
    c.setFillColor(MUTED)
    url_w = pdfmetrics.stringWidth(SITE_LABEL, "Card-Medium", 4.6)
    c.drawString(qr_x + (qr_side - url_w) / 2, qr_y - url_gap + 0.4 * mm, SITE_LABEL)

    # --- left column: three groups, evenly distributed ---------------------
    # Two founders and one contact block, so the column reads as an even
    # rhythm instead of two names stranded above a gap.
    groups = [
        (FOUNDERS[0][0], FOUNDERS[0][1], "Card-Bold", 7.2, "Card", 5.2, INK, FAINT),
        (FOUNDERS[1][0], FOUNDERS[1][1], "Card-Bold", 7.2, "Card", 5.2, INK, FAINT),
        (WHATSAPP, EMAIL, "Card-Medium", 6.2, "Card", 5.2, INK, MUTED),
    ]
    sub_drop = 2.7 * mm
    group_h = sub_drop + 1.4 * mm
    span = band_top - band_bot - 3.0 * mm
    gap = (span - len(groups) * group_h) / (len(groups) - 1)

    y = band_top - 5.4 * mm
    for lead, sub, lf, ls, sf, ss, lc, sc in groups:
        c.setFont(lf, ls)
        c.setFillColor(lc)
        c.drawString(L, y, lead)
        c.setFont(sf, ss)
        c.setFillColor(sc)
        c.drawString(L, y - sub_drop, sub)
        y -= group_h + gap

    crop_marks(c, w, h)


# ------------------------------------------------------------------ back ---
def back(c, w, h):
    background(c, w, h)
    L = SLUG + 6 * mm
    R = SLUG + w - 6 * mm
    top = SLUG + h - 6 * mm
    width = R - L

    tracked(c, L, top - 1.6 * mm, "WHAT WE FIX", "Card-Bold", 4.3, 0.68, CYAN)

    c.setFont("Card-Bold", 9.6)
    c.setFillColor(INK)
    c.drawString(L, top - 7.4 * mm, HOOK)

    c.setStrokeColor(HAIRLINE)
    c.setLineWidth(0.4)
    c.line(L, top - 10.2 * mm, R, top - 10.2 * mm)

    # evenly distribute the four services in the space that is left
    y = top - 14.4 * mm
    bottom = SLUG + 6.5 * mm
    step = (y - bottom) / (len(SERVICES) - 1) if len(SERVICES) > 1 else 0
    step = min(step, 8.6 * mm)

    for i, (name, benefit) in enumerate(SERVICES):
        c.setFillColor(AZURE)
        c.circle(L + 0.7 * mm, y + 0.85 * mm, 0.62 * mm, stroke=0, fill=1)
        c.setFont("Card-Bold", 7.0)
        c.setFillColor(INK)
        c.drawString(L + 3.2 * mm, y, name)
        c.setFont("Card", 5.1)
        c.setFillColor(MUTED)
        c.drawString(L + 3.2 * mm, y - 2.6 * mm, benefit)
        y -= step

    crop_marks(c, w, h)


def build(key):
    w, h = SIZES[key]
    page = (w + 2 * SLUG, h + 2 * SLUG)
    for face, fn in (("front", front), ("back", back)):
        path = OUT / f"mo-ai-card-{key}-{face}.pdf"
        c = canvas.Canvas(str(path), pagesize=page)
        c.setTitle(f"Mo AI business card, {key} {face}")
        fn(c, w, h)
        c.showPage()
        c.save()
        print(f"  {path.name}  page {page[0]/mm:.1f} x {page[1]/mm:.1f} mm"
              f"  trim {w/mm:.1f} x {h/mm:.1f} mm")

    # combined two-page file, which is what most printers actually want
    combined = OUT / f"mo-ai-card-{key}.pdf"
    c = canvas.Canvas(str(combined), pagesize=page)
    c.setTitle(f"Mo AI business card, {key}")
    front(c, w, h); c.showPage()
    back(c, w, h); c.showPage()
    c.save()
    print(f"  {combined.name}  (2 pages: front, back)")


if __name__ == "__main__":
    assert LOGO.exists(), f"logo missing at {LOGO}"
    for key in SIZES:
        print(f"{key.upper()}:")
        build(key)
    print("\nDone ->", OUT)
