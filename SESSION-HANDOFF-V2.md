# Spotlight Series — Session Handoff v2
**Date:** 2026-04-24 | **Status:** v2 prototype complete. Awaiting client design sign-off before Drupal build.

---

## 1. What Was Done This Session

### A. Parallel v2 Prototype Built
A second version of the microsite was created based on the client review call (transcript: `Phase 3B2 4.txt`). The original v1 is **untouched** at `/#/spotlight`. The v2 is live at `/#/spotlight-v2`.

**New files created:**
| File | Description |
|---|---|
| `src/app/components/spotlight-v2/HeroSection.tsx` | Revised hero with spotlight icon, breadcrumb strip, STTT logo |
| `src/app/components/spotlight-v2/OverviewSection.tsx` | Hero quote + 3 visual pillars (replaces dense paragraphs) |
| `src/app/components/spotlight-v2/TeamSection.tsx` | Compact horizontal cards + bio modal |
| `src/app/components/spotlight-v2/HighlightsSection.tsx` | 75% shorter copy per entry |
| `src/app/pages/SpotlightPageV2.tsx` | Page assembling all v2 components |

**Modified files:**
| File | Change |
|---|---|
| `src/app/routes.tsx` | Added `/spotlight-v2` route |
| `src/styles/theme.css` | Mobile overrides for v2 components |

### B. v2 vs v1 — Change Summary

| Area | v1 | v2 |
|---|---|---|
| Hero — FEATURING label | Pill badge, white text | Spotlight light-rays SVG icon + warm cream `#FFE8A3` text |
| Hero — breadcrumb strip | Two-line stacked layout | Single line: `SomeBodyToTalkTo › Spotlight Series › Amyloidosis › University of Chicago · June 2026` + STTT logo right-pinned (71px desktop) |
| Hero — UoC logo | 56px | 32px desktop / 18px mobile |
| Hero — mobile strip | Breadcrumb wrapping awkwardly | Stacked two-row identity block, centred, STTT logo below |
| Overview section | Two dense paragraphs | Single hero blockquote + 3 pillars (Multidisciplinary Care / Genetics & Prevention / Active Research) |
| Team cards | Portrait cards ~400px tall, inline expandable bio | Horizontal compact rows ~90px tall, bio behind "View more" modal |
| Highlights | 6 entries, 4–5 sentences each | 6 entries, 1–2 sentences each (~75% cut) |
| Trials section | Unchanged | Unchanged (reused from v1) |
| Sessions sidebar | Unchanged | Unchanged (reused from v1) |
| data.ts | Single source of truth | v2 imports from v1 — no duplication |

### C. Hero Strip — Approved Format
```
SomeBodyToTalkTo › Spotlight Series › Amyloidosis › University of Chicago · June 2026
```
- Font sizes: SomeBodyToTalkTo 20px bold maroon, Spotlight Series 20px semibold maroon, Amyloidosis 20px near-black, University of Chicago · June 2026 20px gray
- Separators `›` in muted rose `#C0A0A4`
- STTT logo right-aligned, 71px desktop / 51px mobile
- Mobile: hides breadcrumb, shows stacked two-row block + STTT logo centred below

### D. FEATURING Label — Approved Treatment
- Spotlight light-rays SVG icon (stroke `#FFE8A3`)
- "FEATURING" in warm cream `#FFE8A3`, 12px, weight 700, letter-spacing 0.14em
- No decorative lines or borders

---

## 2. Architecture — Unchanged from v1

```
Server A — STTT (separate server)
  Drupal 10, separate DB
  Owns: User Profiles (Presenters), Sessions, Clinical Trials
  Exposes: JSON:API (already live, OAV consumes for calendar)
  Needs: 5 new fields added to User Profile

Server B — Portals (OAV + SCD + future)
  Single Drupal, single DB, Domain Access module
  OAV = domain, SCD = domain, future portals = new domains
  Owns: Spotlight Series content type (locally editable by Stacey)
  Fetches: Presenter/Session/Trial data from STTT JSON:API
  Express Interest: Webform saves locally + emails recipients
```

---

## 3. Build Sequence — Unchanged

```
Phase 1 — Server A (STTT): Add 5 fields to User Profile
Phase 2 — Server B: Create Spotlight Series content type
Phase 3 — Server B (OAV theme): Build Twig template
Phase 4 — Content entry + launch
Phase 5 — SCD (when ready)
```

---

## 4. Sessions in data.ts (7 total)

| Date | Day | Time | Title | Presenter |
|---|---|---|---|---|
| MAY 27 | Tue | 5:00 PM CT | TTR & Genes / ACT EARLY | Rachel Campagna |
| JUN 3 | Wed | 6:00 PM CT | Cardiac Amyloidosis — Disease-Modifying Therapy | Dr. Sarswat |
| JUN 10 | Wed | 6:00 PM CT | Advanced Cardiac Imaging | Dr. Slivnick |
| JUN 17 | Wed | 6:00 PM CT | Maintenance Treatment in AL Amyloidosis | Dr. Derman |
| JUN 24 | Wed | 6:00 PM CT | Neurological Manifestations / Amyloidosis PN | Dr. Rezania |
| JUL 1 | Wed | 6:00 PM CT | Kidney Transplantation in Amyloidosis | Dr. Concepcion |
| JUL 8 | Wed | 6:00 PM CT | Orthopedic Complications | Dr. Jennifer Wolf |

---

## 5. Outstanding Blockers

| Item | Owner | Status |
|---|---|---|
| v1 vs v2 hero design — final sign-off | Stacey / David | ⏳ Pending |
| Hero quote copy (1 sentence, v2 placeholder) | Stacey / UoC | ⏳ Pending |
| Real programme highlights copy | UoC team | ⏳ Pending |
| Slide template decision (oAv vs UChicago) | David | ⏳ Pending |
| Presenter email to Rachel Campagna | Sukh | 🔴 Blocked on slide decision |
| YouTube / appointment / registration URLs per clinician | UoC team | ⏳ Pending |
| ACT EARLY PI name (May 27 session 3) | Stacey | ⏳ Pending |
| 5/6 Sarah Paciulli presenter onboarding | Sukh / David | 🔴 Overdue |
| Express Interest form recipients (email addresses) | Stacey | ⏳ Pending |

---

## 6. Key People

| Person | Role | Contact |
|---|---|---|
| Sukh Singh | Technical lead | sukh@somebodytotalkto.com |
| Stacey Goodman | oAv clinical lead, content editor | stacey.goodmanmd@gmail.com / 615-604-8179 |
| David Gusick | oAv operations, design decisions | david@somebodytotalkto.com |
| Nitasha Sarswat | UoC Program Director | nsarswat@uchicagomedicine.org |
| Rachel Campagna | Presenter — Genetics | Rachel.Campagna@uchicagomedicine.org |

---

## 7. Key File Locations

| File | Path |
|---|---|
| v1 prototype components | `src/app/components/spotlight/` |
| v2 prototype components | `src/app/components/spotlight-v2/` |
| Shared data (clinicians, sessions, trials) | `src/app/components/spotlight/data.ts` |
| Hero options demo | `plans/figma-make/spotlight-series-microsite/hero-options-demo.html` |
| Routes | `src/app/routes.tsx` |
| Mobile CSS overrides | `src/styles/theme.css` |
| Wednesday sessions doc | `plans/reference/WEDNESAY SESSions.docx` |
| Full architecture summary | `sttt/plans/spotlight-series-project-summary.md` |

---

## 8. To Start the Next Conversation

Paste this at the top:

> "Please read `drupal-oav/plans/figma-make/spotlight-series-microsite/SESSION-HANDOFF-V2.md` — this is the complete handoff for the OAV Spotlight Series project. The drupal-oav folder is mounted. v1 prototype is at `/#/spotlight`, v2 (client feedback applied) is at `/#/spotlight-v2`. Familiarise yourself before we continue."
