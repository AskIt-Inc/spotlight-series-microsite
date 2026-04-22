# Screen: Spotlight Series Microsite

**Route:** `/spotlight/[hospital-slug]/[month-year]`  
**Example URL:** `/spotlight/university-of-chicago/2025-06`  
**Context:** Drupal Twig — NOT a React SPA. Server-rendered page inside `somebody_theme`. Design system tokens apply via Tailwind v4 classes and CSS custom properties.  
**Layout wrapper:** Drupal public page — full site header and footer already rendered by Drupal. This spec covers the **page content region only**.  
**Max content width:** 1200px centered, `padding: 0 24px`  
**Auth required:** None — fully public

---

## Purpose

The Spotlight Series microsite is a dedicated public landing page for a single hospital programme partnership month. It serves three audiences simultaneously:

- **Patients** — discover sessions, learn about the clinical team, register for sessions, and explore clinical trials
- **Clinic staff** — a shareable, printable reference for their programme's STTT involvement
- **Prospective hospital partners** — a proof-of-concept demonstrating the value STTT delivers

The page tone is **warm, clinical, and credibility-forward** — not promotional. It reads like a programme directory, not a marketing page.

---

## 1. Page Layout — Section Order

```
+── Programme Hero ───────────────────────────────────────────────────────────+
|  STTT logo (left)             Partner hospital logo (right, if available)  |
|  "University of Chicago Amyloidosis Program"  ← H1 programme name         |
|  "June 2025 Spotlight Series"  ← subtitle                                 |
|  Indication badge (Amyloidosis)                                            |
+─────────────────────────────────────────────────────────────────────────────+
|                                                                             |
|  +── Programme Overview ──────────────────────────────────────────────────+|
|  |  Mission statement / programme description (rich text)                  |
|  |  Cross-disease messaging paragraph (optional — only if populated)       |
|  +─────────────────────────────────────────────────────────────────────────+|
|                                                                             |
|  +── Meet the Team ────────────────────────────────────────────────────────+|
|  |  "Meet the Team"  ← section heading                                     |
|  |  Clinician card grid (responsive — see §4)                              |
|  |  Ancillary staff acknowledgement (small text block at bottom)           |
|  +─────────────────────────────────────────────────────────────────────────+|
|                                                                             |
|  +── Programme Highlights ────────────────────────────────────────────────+|
|  |  "Programme Highlights"  ← section heading                              |
|  |  Rich text block (accomplishments, awards, recent publications)         |
|  +─────────────────────────────────────────────────────────────────────────+|
|                                                                             |
|  +── Open Clinical Trials ────────────────────────────────────────────────+|
|  |  "Open Clinical Trials"  ← section heading                              |
|  |  Trial cards (see §6) — populated via ClinicalTrials.gov API            |
|  |  Fallback: ClinicalTrials.gov external link if no results               |
|  +─────────────────────────────────────────────────────────────────────────+|
|                                                                             |
|  +── Session Calendar ────────────────────────────────────────────────────+|
|  |  "June Sessions"  ← section heading (month from series)                 |
|  |  Session rows (see §7) — one per linked session instance                |
|  |  "Download full calendar" link → PDF/PNG asset                          |
|  +─────────────────────────────────────────────────────────────────────────+|
|                                                                             |
+─────────────────────────────────────────────────────────────────────────────+
```

---

## 2. Programme Hero

```
background: linear-gradient(135deg, #f0f9fc 0%, #e8f4f8 100%)
border-bottom: 1px solid var(--sttt-border)
padding: 48px 24px 40px
```

Layout: Two-column flex row on desktop, stacked on mobile.

**Left column:**
```
display: flex
flex-direction: column
gap: 12px
```

| Element | Spec |
|---|---|
| STTT wordmark | SVG logo, height 36px, `margin-bottom: 8px` |
| Co-branding separator | `·` character, 16px, `#9ca3af`, if partner logo present |
| Partner hospital name (H1) | 28px, weight 700, `#42474c`, `margin-bottom: 4px` |
| Series subtitle | "June 2025 Spotlight Series" — 16px, weight 400, `#5c656d` |
| Indication badge | `IndicationBadge` component, `margin-top: 12px` |
| Cross-disease note | Only if populated — 13px, italic, `#9ca3af`, `margin-top: 6px`, e.g., "Also serving sickle cell disease patients" |

**Right column (partner logo, optional):**
```
display: flex
align-items: center
justify-content: flex-end
```

Partner logo: `max-height: 80px; max-width: 200px; object-fit: contain`  
If no partner logo: right column is empty (left column takes full width).

**UoC pilot logo assets (use for mockup):**

| File | Dimensions | Use |
|---|---|---|
| `plans/reference/uoc-logo.svg` | 353 × 149px | Preferred — horizontal wordmark lockup with maroon shield. Use this in the hero right column. Scale to `max-height: 64px`. |
| `plans/reference/University_of_Chicago_Coat_of_arms.png` | 1614 × 2048px | Shield/crest only (high resolution). Use as a secondary decorative element if needed — e.g., a faint watermark or favicon. Do not use as the primary logo in the hero. |

UoC brand colour: `#800000` (maroon). The SVG uses this as its primary fill. Do not recolour it.

---

## 3. Programme Overview

```
background: var(--sttt-card-bg)
border-bottom: 1px solid var(--sttt-border)
padding: 48px 24px
```

| Element | Spec |
|---|---|
| Section label | "About the Programme" — 11px, weight 600, uppercase, letter-spacing 0.8px, `#4eaac8`, `margin-bottom: 8px` |
| Body text | Rich text — 15px, weight 400, `#5c656d`, line-height 1.7, max-width 760px |
| Cross-disease paragraph | If populated: separated by `margin-top: 20px`, same type spec, prefixed with a `Globe` icon (16px, `#4eaac8`) |

No card wrapper — this section sits flush on the page background.

---

## 4. Meet the Team

```
background: var(--sttt-page-bg)
padding: 56px 24px
```

**Section heading:**

| Element | Spec |
|---|---|
| Label | "Meet the Team" — 22px, weight 700, `#42474c` |
| Subtitle | "The multidisciplinary team behind the [Hospital Name] programme" — 14px, `#9ca3af`, `margin-top: 4px` |
| Spacing | `margin-bottom: 32px` |

**Clinician card grid:**
```
display: grid
grid-template-columns: repeat(2, 1fr)   ← desktop
gap: 24px
```

Mobile: `grid-template-columns: 1fr`  
Tablet: `grid-template-columns: repeat(2, 1fr)`

### 4.1 Clinician Card Anatomy

```
background: var(--sttt-card-bg)
border: 1px solid var(--sttt-border)
border-radius: 8px
box-shadow: var(--sttt-card-shadow)
padding: 24px
display: flex
flex-direction: column
gap: 16px
```

**Top row — identity:**
```
display: flex
gap: 16px
align-items: flex-start
```

Headshot:
```
width: 80px
height: 80px
border-radius: 50%
object-fit: cover
flex-shrink: 0
border: 2px solid var(--sttt-border)
background: var(--sttt-icon-bg)   ← fallback if no photo
```

Headshot fallback (no photo): `User` icon, 36px, `#9ca3af`, centred in the circle.

Identity block (right of headshot):
```
display: flex
flex-direction: column
gap: 2px
```

| Element | Spec |
|---|---|
| Name | 16px, weight 700, `#42474c` |
| Credentials + Title | 13px, weight 400, `#5c656d`, e.g. "MD · Assistant Professor of Medicine" |
| Speciality | 13px, weight 500, `#4eaac8`, e.g. "Cardiac Amyloidosis · Advanced Heart Failure" |
| Clinician type badge | Small pill: `background: #f0f9fc; color: #4eaac8; border: 1px solid #d4eef5; border-radius: 9999px; padding: 2px 8px; font-size: 11px; font-weight: 600` — text: "Medical Doctor" / "Genetic Counsellor" / etc. |

**Bio section:**

```
font-size: 13px
color: #5c656d
line-height: 1.65
```

Bio text is clamped to 4 lines by default:
```
display: -webkit-box
-webkit-line-clamp: 4
-webkit-box-orient: vertical
overflow: hidden
```

"Read more" toggle link: `font-size: 12px; color: #4eaac8; font-weight: 500; margin-top: 4px; cursor: pointer` — expands bio to full text inline.

**Three-CTA row (bottom of card):**

```
display: flex
flex-direction: column
gap: 8px
margin-top: auto
padding-top: 8px
border-top: 1px solid var(--sttt-border)
```

CTA 1 — Watch video:
```
display: flex
align-items: center
gap: 8px
font-size: 13px
font-weight: 500
color: #4eaac8
cursor: pointer
```
Icon: `PlayCircle` (16px, `#4eaac8`)  
Label: "Watch: How Dr. [Surname] became interested in amyloidosis"  
Opens in a lightbox modal (video embed) or new tab if no embed available.

CTA 2 — Register for session (only rendered if a session instance is linked):
```
display: inline-flex
align-items: center
gap: 8px
padding: 8px 16px
background: #4eaac8
color: #ffffff
border-radius: 4px
font-size: 13px
font-weight: 500
width: 100%
justify-content: center
```
Icon: `Calendar` (14px, white), left of text  
Label: derived from per-series CTA label field, e.g., "Register: Cardiac Amyloidosis — Diagnosis & Treatment"

CTA 3 — Book appointment / hospital profile:
```
display: inline-flex
align-items: center
gap: 8px
padding: 8px 16px
background: transparent
border: 1px solid var(--sttt-border)
color: #5c656d
border-radius: 4px
font-size: 13px
font-weight: 400
width: 100%
justify-content: center
```
Icon: `ExternalLink` (13px, `#9ca3af`), right of text  
Label: "Schedule an appointment" or "View hospital profile"  
Opens in new tab.

**Card states:**

No-session variant: CTA 2 is omitted entirely. CTA 1 and CTA 3 remain.  
No-video variant: CTA 1 is omitted. Remaining CTAs reorder upward.  
No-appointment-link variant: CTA 3 is omitted.  
All-three-absent: card renders without the CTA row and border-top separator.

### 4.2 Ancillary Staff Acknowledgement

Rendered below the card grid:
```
margin-top: 24px
padding: 16px 20px
background: var(--sttt-card-bg)
border: 1px solid var(--sttt-border)
border-radius: 8px
display: flex
align-items: flex-start
gap: 12px
```

Icon: `Users` (18px, `#4eaac8`), top-aligned  
Label: "Our multidisciplinary team also includes:" — 13px, weight 500, `#42474c`  
Text: Plain list of ancillary roles — 13px, `#5c656d`, same line or wrapped, e.g., "Clinic Nursing · Medical Social Work · Physical Therapy · Occupational Therapy"

Only rendered if the ancillary staff field is populated on the Spotlight Series entity.

---

## 5. Programme Highlights

```
background: var(--sttt-card-bg)
border-top: 1px solid var(--sttt-border)
border-bottom: 1px solid var(--sttt-border)
padding: 48px 24px
```

| Element | Spec |
|---|---|
| Section label | "Programme Highlights" — same label spec as §3 |
| Body | Rich text — 15px, `#5c656d`, line-height 1.7, max-width 760px |

No card wrapper — flush on section background.  
If field is empty: section is omitted entirely from the page.

---

## 6. Open Clinical Trials

```
background: var(--sttt-page-bg)
padding: 56px 24px
```

**Section heading:**

| Element | Spec |
|---|---|
| Label | "Open Clinical Trials" — 22px, weight 700, `#42474c` |
| Subtitle | "Active trials at [Hospital Name] — [Indication]" — 14px, `#9ca3af`, `margin-top: 4px` |
| ClinicalTrials.gov link | `ExternalLink` icon (13px) + "View all on ClinicalTrials.gov" — teal link, 13px, `margin-top: 8px`, always shown |

**Trial card list:**
```
display: flex
flex-direction: column
gap: 16px
margin-top: 24px
```

### 6.1 Trial Card

```
background: var(--sttt-card-bg)
border: 1px solid var(--sttt-border)
border-radius: 8px
box-shadow: var(--sttt-card-shadow)
padding: 20px 24px
```

Layout:
```
display: flex
justify-content: space-between
align-items: flex-start
gap: 24px
```

**Left — trial info:**

| Element | Spec |
|---|---|
| Trial ID | `NCT12345678` — 11px, weight 600, monospace, `#9ca3af`, `margin-bottom: 4px` |
| Trial title | 15px, weight 600, `#42474c`, `margin-bottom: 6px` |
| Status badge | "Recruiting" — `background: #dbeafe; color: #1d4ed8; border-radius: 9999px; padding: 2px 10px; font-size: 11px; font-weight: 600` |
| Brief description | 13px, `#5c656d`, line-height 1.6, max 3 lines clamped, `margin-top: 8px` |
| Phase | "Phase [N]" — 12px, `#9ca3af`, `margin-top: 6px` |

**Right — CTA:**
```
flex-shrink: 0
```

"Express Interest" button:
```
padding: 8px 16px
background: transparent
border: 1px solid #4eaac8
color: #4eaac8
border-radius: 4px
font-size: 13px
font-weight: 500
white-space: nowrap
cursor: pointer
```

Hover: `background: #f0f9fc`

Clicking "Express Interest" opens the inline interest form (§6.2) below the card — it does not open a modal.

### 6.2 Clinical Trial Interest Form (Inline, Below Card)

Expands below the trial card on click with a smooth height transition:

```
background: #f0f9fc
border: 1px solid #d4eef5
border-radius: 0 0 8px 8px
margin-top: -8px
padding: 20px 24px
```

| Element | Spec |
|---|---|
| Heading | "Express your interest in this trial" — 14px, weight 600, `#42474c` |
| Subtext | "A member of the research team will be in touch." — 13px, `#5c656d`, `margin-bottom: 16px` |
| Name field | Full-width text input, label "Full name", required |
| Email field | Full-width email input, label "Email address", required |
| Phone field | Full-width tel input, label "Phone number (optional)" |
| Privacy notice | 12px, `#9ca3af`, "Your details will only be shared with the [Hospital Name] research team." |
| Submit button | Full-width primary teal, "Submit Interest", `margin-top: 12px` |
| Cancel link | "Cancel" — 12px, `#9ca3af`, `margin-top: 8px`, centred, collapses the form |

**Input field spec:**
```
width: 100%
padding: 8px 12px
border: 1px solid var(--sttt-border)
border-radius: 4px
font-size: 14px
color: var(--sttt-text-primary)
background: var(--sttt-input-bg)
margin-top: 4px
```

Focus: `border-color: #4eaac8; outline: none; box-shadow: 0 0 0 3px rgba(78,170,200,0.15)`

**Success state (after submit):**

Replace form content with:
```
display: flex
align-items: center
gap: 12px
padding: 16px
```
Icon: `CheckCircle` (20px, `#7CC242`)  
Text: "Thank you. The research team will be in touch soon." — 14px, weight 500, `#42474c`

**Fallback state (no API results):**

Replace trial card list with:
```
padding: 32px 24px
text-align: center
```
Icon: `FlaskConical` (40px, `#e5e7eb`)  
Heading: "No currently recruiting trials" — 15px, weight 600, `#42474c`, `margin-top: 12px`  
Body: "Check ClinicalTrials.gov for the latest information on trials at this programme." — 13px, `#9ca3af`  
Link: "Go to ClinicalTrials.gov →" — teal, 13px, `margin-top: 12px`

---

## 7. Session Calendar

```
background: var(--sttt-card-bg)
border-top: 1px solid var(--sttt-border)
padding: 56px 24px
```

**Section heading:**

| Element | Spec |
|---|---|
| Label | "[Month] Sessions" (e.g., "June Sessions") — 22px, weight 700, `#42474c` |
| Subtitle | "[N] sessions this month — register for the ones that interest you" — 14px, `#9ca3af`, `margin-top: 4px` |
| Download link | `Download` icon (14px) + "Download full calendar (PDF)" — teal link, 13px, floated right on desktop, below subtitle on mobile |

**Session list:**
```
display: flex
flex-direction: column
gap: 12px
margin-top: 24px
```

### 7.1 Session Row

```
background: var(--sttt-page-bg)
border: 1px solid var(--sttt-border)
border-radius: 8px
padding: 16px 20px
display: flex
align-items: center
gap: 20px
```

**Date block (left, fixed width):**
```
width: 64px
flex-shrink: 0
text-align: center
background: var(--sttt-card-bg)
border: 1px solid var(--sttt-border)
border-radius: 6px
padding: 8px 4px
```

| Element | Spec |
|---|---|
| Month | "JUN" — 10px, weight 700, uppercase, `#4eaac8` |
| Day | "12" — 22px, weight 700, `#42474c` |
| Day of week | "Thu" — 10px, weight 400, `#9ca3af` |

**Session details (flex-1):**

| Element | Spec |
|---|---|
| Time | "7:00 PM ET" — 12px, weight 500, `#9ca3af`, `margin-bottom: 4px` |
| Session title | 15px, weight 600, `#42474c` |
| Presenter name | `User` icon (12px) + "Dr. Nitasha Sarswat" — 13px, `#5c656d`, `margin-top: 4px` |
| StatusBadge | `Upcoming` badge, right of presenter name |

**Register CTA (right, fixed width):**
```
flex-shrink: 0
```

"Register" button:
```
padding: 7px 18px
background: #4eaac8
color: #ffffff
border-radius: 4px
font-size: 13px
font-weight: 500
white-space: nowrap
```

Hover: `background: #2a758e`

If session is completed: Button replaced with `StatusBadge` "Completed" pill. No registration link.

---

## 8. Loading State

While the page renders (API calls in progress):

**Programme overview:** One skeleton block — `height: 80px; border-radius: 4px; background: #f3f4f6`  
**Clinician cards:** 4 skeleton cards — `height: 280px` each, shimmer animation  
**Trial cards:** 2 skeleton rows — `height: 120px` each  
**Session rows:** 4 skeleton rows — `height: 72px` each  

Shimmer animation:
```css
@keyframes shimmer {
  0%   { background-position: -800px 0 }
  100% { background-position: 800px 0 }
}
background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 37%, #f3f4f6 63%);
background-size: 800px 100%;
animation: shimmer 1.5s infinite linear;
```

---

## 9. Responsive Behaviour

| Viewport | Behaviour |
|---|---|
| Mobile (< md) | Hero stacks vertically — logo above text. Clinician cards 1-column. Three CTAs stack full-width. Session row: date block above details, register button full-width below. Trial cards: CTA button full-width below description. |
| Tablet (md–lg) | Clinician cards 2-column. Session rows full layout. Hero 2-column. |
| Desktop (lg+) | Full layout as specified. Max content width 1200px centred. |

---

## 10. Real Content Reference (UoC Pilot)

Use this data to populate the mockup — it is the actual content from the first Spotlight Series pilot.

**Series:** University of Chicago Amyloidosis Program — June 2025  
**Indication:** Amyloidosis (badge color: `#ede9fe` / `#6d28d9`)

**Clinicians to show in mockup (select 2–3 for the design):**

| Name | Title | Speciality | Has Session | Has Video |
|---|---|---|---|---|
| Dr. Nitasha Sarswat | Assistant Professor of Medicine, Director of Amyloidosis Program | Cardiac Amyloidosis · Advanced Heart Failure | Yes | Yes |
| Dr. Jeremy A. Slivnick | Assistant Professor of Medicine | Cardiac Imaging · Echocardiography · MRI | Yes | Yes |
| Dr. Ben Derman | Assistant Professor of Medicine | Hematology & Oncology · Plasma Cell Disorders | Yes | Yes |
| Rachel Campagna MS CGC | Genetic Counsellor | Hereditary ATTR · Genetic Testing | Yes | Yes |

**Sample session CTA label for Dr. Sarswat:**  
"Register: Cardiac Amyloidosis — Current Approaches to Disease-Modifying Therapy"

**Sample ancillary staff text:**  
"Our multidisciplinary team also includes: Clinic Nursing · Medical Social Work · Physical and Occupational Therapy"
