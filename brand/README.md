# Mo AI brand assets

## Business card

`business_card.py` generates every print file. Re-run it after any copy, contact
or URL change; do not hand-edit the PDFs.

```bash
python3 brand/business_card.py
```

Output lands in `brand/out/`:

| File | Contents |
| --- | --- |
| `mo-ai-card-us.pdf` | US 3.5 x 2in, 2 pages (front, back) |
| `mo-ai-card-intl.pdf` | International 85 x 55mm, 2 pages |
| `mo-ai-card-{size}-{face}.pdf` | Single-page variants |

**Spec.** 3mm bleed on all sides, crop marks outside the bleed, 6mm safe
margin, vector embedded type (Helvetica Neue), RGB.

**Rich black.** The card is solid black edge to edge. Ask the printer for rich
black (about C60 M40 Y40 K100); flat 100% K prints as charcoal.

**The QR is not editable once printed.** It encodes `SITE_URL` in
`business_card.py`, currently the Vercel URL. Change that constant and
regenerate before printing if a custom domain is bought. The generator verifies
nothing on its own, so re-scan the output after any change.

## Logo

The supplied artwork has a dark slate wordmark that disappears on black, so the
site and the card both use the mark as a glyph and set "Mo AI" in type.

| File | Use |
| --- | --- |
| `../public/logo-mark@3x.png` | The mark, used on the card and in the nav |
| `../public/logo-full-dark.png` | Full lockup recoloured for dark grounds |
| `../public/logo-original.png` | Supplied source artwork |

Accent colours are sampled from the mark: cyan `#34d2f2`, blue `#0a84ff`,
deep blue `#0b57e0`.
