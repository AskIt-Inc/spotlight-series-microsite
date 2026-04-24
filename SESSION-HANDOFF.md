# Spotlight Series — Session Handoff
**Date:** 2026-04-23 | **Status:** Design phase complete. Architecture defined. Build not started.

---

## 1. What Was Done This Session

### A. Rachel Campagna — Presenter Onboarding
- Received and loaded Rachel's presenter info from email thread
- **Name for materials:** Rachel Campagna, MS, CGC
- **Session:** May 27, 5 PM CT (genetics + ACT EARLY lead-in)
- **Email:** Rachel.Campagna@uchicagomedicine.org | **Office:** 773-834-3150
- **Blocker:** Headshot not provided. Slide template decision (oAv vs UChicago branding) pending from David.
- **Presenter email:** Drafted but not sent — blocked on David's slide decision + session date confirmation.

### B. Wednesday Sessions Doc — Updated
Key session updates from `WEDNESAY SESSions.docx`:
- May 27: Rachel Campagna (confirmed, 5 PM CT, 3 sub-sessions + ACT EARLY PI TBD)
- Jun 3 / 10 / 17: Wednesdays (not Thursdays as previously in design), 6 PM CT
- Jun 17: TTR Onboarding
- 5/6: Sarah Paciulli — overdue for presenter onboarding (was flagged as urgent)

### C. Figma-make Prototype — Built & Updated
**Location:** `drupal-oav/plans/figma-make/spotlight-series-microsite/`

**Components completed:**
| File | Status |
|---|---|
| `HeroSection.tsx` | ✅ UoC logo, June 2026, Amyloidosis badge |
| `OverviewSection.tsx` | ✅ Real UChicago programme description |
| `TeamSection.tsx` | ✅ 9 clinicians, 2-col grid, bio/CTAs |
| `HighlightsSection.tsx` | ✅ Placeholder copy — needs real UoC content |
| `TrialsSection.tsx` | ✅ 2 trials + inline Express Interest form |
| `SessionsSidebar.tsx` | ✅ New sticky sidebar, sorted by date |
| `SpotlightPage.tsx` | ✅ Two-column layout, sticky sidebar at top: 96px |
| `data.ts` | ✅ 9 clinicians, 4 sessions, 2 trials |

**Layout:** Hero full-width → two-column (left: content, right: sticky sessions sidebar at `top: 96px` to clear the 72px app header).

**Design tokens (OAV microsite):** `#8B1F2D` maroon brand, `#4eaac8` teal accent, Gotham font, `#f0f9fc` light teal bg.

### D. Clinicians in data.ts (9 total)

| # | Name | Photo | Session |
|---|---|---|---|
| 1 | Dr. Nitasha Sarswat | ✅ STTT CDN | Yes |
| 2 | Dr. Jeremy A. Slivnick | ✅ STTT CDN | Yes |
| 3 | Dr. Ben Derman | ✅ STTT CDN | Yes |
| 4 | Dr. Kourosh Rezania | ✅ STTT CDN | Yes |
| 5 | Dr. Marco Bonilla | ✅ STTT CDN | No |
| 6 | Dr. Beatrice Concepcion | ✅ STTT CDN | Yes |
| 7 | Dr. Edwin K. McDonald IV | ✅ STTT CDN | No |
| 8 | Dr. Jennifer Moriatis Wolf | ✅ STTT CDN | Yes |
| 9 | Rachel Campagna, MS, CGC | ✅ STTT CDN | Yes |

### E. Sessions in data.ts (4 total)

| Date | Day | Time | Title | Presenter |
|---|---|---|---|---|
| MAY 27 | Tue | 5:00 PM CT | TTR & Genes / ACT EARLY | Rachel Campagna |
| JUN 3 | Wed | 6:00 PM CT | Cardiac Amyloidosis — Disease-Modifying Therapy | Dr. Sarswat |
| JUN 10 | Wed | 6:00 PM CT | Advanced Cardiac Imaging | Dr. Slivnick |
| JUN 17 | Wed | 6:00 PM CT | What is the Role of Maintenance Treatment in AL Amyloidosis? | Dr. Derman |

### F. Hero Brand Hierarchy Demo
**File:** `drupal-oav/plans/figma-make/spotlight-series-microsite/hero-options-demo.html`

13 options across two themes — open in browser to view with live UoC logo:
- **Options 1–8:** Quatro Drupal theme (`#b70000` red, Helvetica Neue) — for Twig template build
- **Options A–E:** Microsite theme (`#4eaac8` teal + `#8B1F2D` maroon, Gotham) — for standalone/React build

**No option has been selected yet.** Next step: Stacey/David pick a direction.

---

## 2. Architecture — Confirmed Final

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
  Express Interest: Webform saves locally, emails recipients
```

### What Stacey edits (Server B — same admin she uses now):
Hero copy, programme description, highlights (Paragraphs), ancillary staff, partner logo, STTT presenter/session/trial IDs, Domain Access (OAV vs SCD).

### Multi-indication reuse:
- OAV = Amyloidosis (first, reference implementation)
- SCD portal = second (same template, different domain + indication)
- Future portals = install same module, configure indication, done

---

## 3. Build Sequence

```
Phase 1 — Server A (STTT): Add 5 fields to User Profile
  field_speciality, field_clinician_type, field_youtube_url,
  field_appointment_url, field_registration_url

Phase 2 — Server B (Portal Drupal): Create Spotlight Series content type
  All locally editable fields + STTT ID reference fields + Domain Access

Phase 3 — Server B (OAV theme): Build Twig template
  Reads local fields from node + fetches from STTT JSON:API (cached, same pattern as calendar)
  Express Interest Webform with email handler

Phase 4 — Content entry + launch
  Populate 9 UoC presenter profiles in STTT
  Stacey creates Spotlight Series node, assigns to OAV domain, publishes

Phase 5 — SCD (when ready)
  Same template, new node, SCD domain — no rebuild
```

---

## 4. Outstanding Blockers

| Item | Owner | Status |
|---|---|---|
| Slide template decision (oAv vs UChicago) | David | ⏳ Pending |
| Hero design option selection (1–8 or A–E) | Stacey/David | ⏳ Pending |
| Presenter email to Rachel | Sukh | 🔴 Blocked on above |
| Real programme highlights copy | UoC team | ⏳ Pending |
| YouTube / appointment / registration URLs per clinician | UoC team | ⏳ Pending |
| ACT EARLY PI name (May 27 session 3) | Stacey | ⏳ Pending |
| Jun 3 and Jun 10 confirmed presenters/titles | Stacey | ⏳ Pending |
| 5/6 Sarah Paciulli presenter onboarding | Sukh/David | 🔴 Overdue |

---

## 5. Key People

| Person | Role | Contact |
|---|---|---|
| Sukh Singh | Technical lead | sukh@somebodytotalkto.com |
| Stacey Goodman | oAv clinical lead, content editor | stacey.goodmanmd@gmail.com / 615-604-8179 |
| David Gusick | oAv operations, slide/design decisions | david@somebodytotalkto.com |
| Nitasha Sarswat | UoC Program Director | nsarswat@uchicagomedicine.org |
| Rachel Campagna | Presenter — Genetics | Rachel.Campagna@uchicagomedicine.org |

---

## 6. Key File Locations

| File | Path |
|---|---|
| Figma-make prototype | `drupal-oav/plans/figma-make/spotlight-series-microsite/` |
| Hero options demo | `drupal-oav/plans/figma-make/spotlight-series-microsite/hero-options-demo.html` |
| Wednesday sessions doc | `drupal-oav/plans/reference/WEDNESAY SESSions.docx` (also in sttt/plans/reference/) |
| UoC spotlight draft | `sttt/plans/reference/uoc_spotlight_draft.docx` |
| Full architecture summary | `sttt/plans/spotlight-series-project-summary.md` |

---

## 7. To Start the Next Conversation

Paste this at the top:

> "Please read `drupal-oav/plans/figma-make/spotlight-series-microsite/SESSION-HANDOFF.md` — this is the complete handoff for the OAV Spotlight Series project. The drupal-oav folder is mounted. Familiarise yourself before we continue."
