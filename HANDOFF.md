# Spotlight Series Microsite — Handoff Note

**Date:** 2026-04-22  
**From:** STTT Claude project  
**To:** OAV Claude project  
**Folder to move:** `sttt/plans/figma-make/spotlight-series-microsite/`  
**Destination:** `oav/plans/figma-make/spotlight-series-microsite/` (mirror same structure)

---

## What this is

A Figma-make React prototype of the **University of Chicago Amyloidosis Program Spotlight Series Microsite** — a public-facing page for the June 2026 oAv spotlight. It lives under `src/app/` and is a Vite + React + TypeScript project.

The design spec it's built against is `sttt/plans/figma-make/guidelines/20-spotlight-series-microsite.md`.

---

## Current state — what's been built

### Page layout (`SpotlightPage.tsx`)
Two-column layout after the Hero:
- **Left column** (`flex: 1`): Overview → Team → Highlights → Trials, stacked vertically
- **Right column** (`300px`, `position: sticky`, `top: 96px`): `SessionsSidebar` — always visible as user scrolls

Hero (`HeroSection`) is full-width above the two-column area.

`CalendarSection.tsx` still exists in the components folder but is no longer rendered — sessions are surfaced exclusively via the sticky sidebar.

### Components (`src/app/components/spotlight/`)

| File | Status | Notes |
|---|---|---|
| `HeroSection.tsx` | Complete | UoC logo, June 2026 subtitle, Amyloidosis badge |
| `OverviewSection.tsx` | Complete | Real UChicago programme description from uoc_spotlight_draft.docx |
| `TeamSection.tsx` | Complete | 7 clinicians rendered in 2-col grid |
| `HighlightsSection.tsx` | Complete | Placeholder highlights copy — needs real UoC content |
| `TrialsSection.tsx` | Complete | 2 trials with inline interest form |
| `SessionsSidebar.tsx` | Complete | New sticky sidebar — compact session rows with Register buttons |
| `CalendarSection.tsx` | Dormant | Not rendered, kept for reference |
| `data.ts` | Updated | See data section below |

---

## Data — current state of `data.ts`

### Clinicians (7 total)

| ID | Name | Photo | Session label |
|---|---|---|---|
| 1 | Dr. Nitasha Sarswat | Unsplash placeholder | Cardiac Amyloidosis — Disease-Modifying Therapy |
| 2 | Dr. Jeremy A. Slivnick | Unsplash placeholder | Advanced Cardiac Imaging |
| 3 | Dr. Ben Derman | Unsplash placeholder | MGUS & Amyloidosis — AL vs ATTR |
| 4 | Rachel Campagna, MS, CGC | **MISSING — pending headshot** | TTR & Genes / Genetic Testing |
| 5 | Dr. Kourosh Rezania | **MISSING — pending headshot** | Neurological Manifestations / Amyloidosis PN |
| 6 | Dr. Edwin K. McDonald IV | **MISSING — pending headshot** | GI Manifestations |
| 7 | Dr. Jennifer Moriatis Wolf | **MISSING — pending headshot** | Orthopedic Complications |

### Sessions (4 total)

| ID | Date | Day | Time | Title | Status |
|---|---|---|---|---|---|
| 1 | JUN 3 | Wed | 7:00 PM ET | Cardiac Amyloidosis — Current Approaches | upcoming |
| 2 | JUN 10 | Wed | 7:00 PM ET | Advanced Cardiac Imaging | upcoming |
| 3 | JUN 17 | Wed | 7:00 PM ET | TTR Onboarding — Living with ATTR | upcoming |
| 4 | MAY 27 | Tue | 5:00 PM CT | TTR & Genes / ACT EARLY | upcoming |

---

## Outstanding items — what still needs to happen

### Blockers
- **Rachel Campagna headshot** — not yet provided by presenter. Request in presenter email.
- **Dr. Rezania, Dr. McDonald, Dr. Wolf headshots** — not yet provided.
- **June 3 and June 10 session details** — presenters and titles not yet confirmed. Currently using placeholder titles from data.ts.
- **ACT EARLY PI name** — needed for session 4 (May 27). Third sub-session of Rachel's block.
- **David's slide template decision** — oAv branding vs UChicago branding. Blocking presenter email send.

### Content gaps
- `HighlightsSection.tsx` has placeholder copy. Needs real UoC programme highlights, accomplishments, and recent publications from the UoC team.
- Clinician bios for Dr. Rezania, Dr. McDonald, and Dr. Wolf were written from public web profiles — confirm with UoC before publishing.
- `TrialsSection.tsx` has 2 trial entries (NCT05029076, NCT04136171) — verify these are still actively recruiting at UoC before the page goes live.
- Ancillary staff line in `TeamSection.tsx` reads "Clinic Nursing · Medical Social Work · Physical and Occupational Therapy" — confirm with UoC (Stacey noted clinic RN/NP, SW, PT/OT as candidates).

### Design / dev
- No mobile responsive styles implemented yet — the spec (§9 of 20-spotlight-series-microsite.md) defines breakpoints. Not built.
- Unsplash placeholder photos for Dr. Sarswat, Slivnick, Derman will need replacing with real headshots before publish.
- Register buttons in the sidebar are not wired to any registration URL — placeholders only.
- Video CTAs in clinician cards (`PlayCircle` buttons) are not wired to any video links.
- Appointment URLs all point to `https://www.uchicagomedicine.org` — need per-clinician profile URLs.

---

## Presenter email — status

An email template was drafted for Rachel Campagna (and will be the template for all June UoC presenters). It is **not yet sent** — blocked on:
1. David confirming slide template (oAv vs UChicago branding)
2. Session date finalisation (5/27 is confirmed; June dates pending)

Rachel's contact: Rachel.Campagna@uchicagomedicine.org / 773-834-3150

---

## Key people

| Person | Role | Contact |
|---|---|---|
| Stacey Goodman | oAv clinical lead | stacey.goodmanmd@gmail.com / 615-604-8179 |
| David Gusick | oAv operations, slide template decision | david@somebodytotalkto.com |
| Nitasha Sarswat | UoC Amyloidosis Program Director | nsarswat@uchicagomedicine.org |
| Rachel Campagna | Presenter (Genetics) | Rachel.Campagna@uchicagomedicine.org |

---

## Source documents (in `sttt/plans/reference/`)

- `WEDNESAY SESSions.docx` — master session calendar (Stacey's working doc)
- `uoc_spotlight_draft.docx` — UoC programme overview and team bios draft (Stacey)
