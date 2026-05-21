# Card for Each Session - Development Requirements

## Context

David has designed the first card type: **Card for Each Session**. This is one of three planned card formats:

1. Card for Each Session
2. Wednesday Calendar List View
3. Monday + Wednesday List View

This requirement covers only **Card for Each Session**.

The current implementation already exists here:

- Local file: `/Users/sukhjindersingh/Sites/drupal-oav/plans/figma-make/spotlight-series-microsite/public/facebook-promo.html`
- Published page: `https://askit-inc.github.io/spotlight-series-microsite/facebook-promo.html`

The development task is to update the existing `facebook-promo.html` implementation so it visually matches David's screenshots and continues to fetch/populate card data from the API.

## Goal

Create a reusable, API-driven, print-ready promotional card for an individual session.

The card should:

- load session data from the existing API search flow;
- populate session, presenter, registration, QR, and description fields dynamically;
- match David's latest screenshot layout;
- export cleanly as PNG and PDF;
- remain suitable for print and digital sharing.

## Existing Implementation To Reuse

The existing `facebook-promo.html` already includes several required pieces and should not be rebuilt from scratch.

Already built:

- `6x4` print surface configured as `1800 x 1200 px @ 300 DPI`.
- `3x5` size option configured as `1500 x 900 px @ 300 DPI`.
- Print button.
- PNG export using `dom-to-image-more`.
- PDF export using `jsPDF`.
- Search panel to load session data.
- API fetch from:

```text
https://www.somebodytotalkto.com/api/spotlight/microsite/session/search
```

- Session search result selection.
- `populateCard(row)` function for mapping API data into the card.
- Presenter headshot support via `headshot_base64`.
- QR code support via `qr_base64`.
- Short URL display via `short_url`.
- Timezone display via `times_by_zone`.
- Footer disclaimer.

## Source References

David's card screenshots:

- `/Users/sukhjindersingh/Sites/drupal-oav/plans/figma-make/spotlight-series-microsite/Reference-1.jpeg`
- `/Users/sukhjindersingh/Sites/drupal-oav/plans/figma-make/spotlight-series-microsite/Reference-2.jpeg`

Current implementation:

- `/Users/sukhjindersingh/Sites/drupal-oav/plans/figma-make/spotlight-series-microsite/public/facebook-promo.html`

## Priority

High priority. This is required for immediate Spotlight / session promotion and should be treated as an urgent print/export alignment task.

## Required Updates

### 1. Match David's Header Layout

Current implementation has a logo bar, but it must be adjusted to match the screenshot.

Required header structure:

- Left: Amyloidosis Foundation logo.
- Center: session day/date and primary time.
- Right: Somebody To Talk To logo, or configured campaign logo if the campaign requires a different right-side logo.

Center text format:

```text
Thursday, May 21st
@ 6pm ET
```

Requirements:

- Add or populate the center date/time block in the top header.
- Use bold black text.
- Keep vertical divider lines between the three header areas.
- Keep header background white.
- Logos must remain clear and undistorted.

### 2. Match David's Burgundy Program Band

The existing burgundy session band should be updated to match the screenshot more closely.

The band must include:

- Program/series label in gold/yellow.
- Main session title in white.

Example:

```text
Rare Disease Patient Discussion Series
Advocacy 101: Finding Your Voice & Speaking Up with Confidence
```

Requirements:

- Program label should be visible even if the API `series_label` is empty, using the correct fallback from session/program data.
- Session title should be the strongest text element in the band.
- Long titles must wrap cleanly.
- Text must not overflow outside the burgundy band.
- David's screenshot uses a flatter burgundy band. Avoid adding extra visual complexity unless needed.

### 3. Main Content Layout

The current three-column content structure is correct and should be retained:

1. Presenter column
2. Session detail column
3. QR code column

Update spacing, sizing, and typography to match David's screenshots.

### 4. Presenter Column

Required presenter area:

- Circular presenter headshot.
- Presenter name below the image.
- Presenter credential/title below the name.

Examples from screenshots:

```text
Jennifer Boyd,
PA
```

```text
Thomas Bartlett
Patient Advocate
```

Requirements:

- Continue using `presenters[0]` from the API.
- Continue using `headshot_base64` when available.
- Preserve circular crop.
- Presenter name should use burgundy bold text.
- Credential/title should display clearly below the name.
- If API title is missing but the presenter role exists elsewhere, map the correct field so the card does not look incomplete.

### 5. Session Detail Column

Required content:

- Date/time pill.
- Session description.
- `Register free:` label.
- Short registration URL.

Date/time pill:

```text
May 25, 2026
6:00 PM ET · 5:00 PM CT · 4:00 PM MT · 3:00 PM PT
```

Requirements:

- Continue mapping `date` to the date line.
- Continue mapping `times_by_zone` to ET, CT, MT, PT.
- Keep pale pink background and burgundy text.
- Keep the calendar icon.

Description:

- Continue stripping HTML tags from API `description`.
- Target visible length: approximately 300-400 characters.
- Description must not push the registration row or footer out of the card.
- If API description is too long, use a dedicated short promo description if available; otherwise apply controlled trimming or dynamic font sizing.

Registration URL:

- Continue preferring API `short_url`.
- Fallback to raw `reg_link.url` only when no short URL exists.
- Display text should remove `https://`.
- Short URL display must match the QR code destination.

### 6. QR Code Column

Required QR area:

- QR code box.
- Label below:

```text
SCAN TO REGISTER
```

Requirements:

- Continue using API `qr_base64`.
- QR code must remain scan-safe after PNG/PDF export.
- Keep quiet space around the QR code.
- Label should be uppercase burgundy.
- QR code destination must match the registration URL shown on the card.

### 7. Footer

Keep the existing footer disclaimer:

```text
This session is free and open to patients, caregivers, and healthcare professionals. Registration required.
```

Requirements:

- Footer should remain visible in both `4x6` and `3x5`.
- Footer should not overlap with the description or registration link.
- Keep italic gray styling similar to the screenshot.

## API Data Mapping Requirements

The current API-driven mapping should be preserved and tightened.

Required mappings:

| API field | Card use |
| --- | --- |
| `title` | Main session title |
| `description` | Session description, stripped of HTML |
| `date` | Date pill and header date |
| `time` | Header time fallback |
| `times_by_zone.ET` | Header time and timezone row |
| `times_by_zone.CT` | Timezone row |
| `times_by_zone.MT` | Timezone row |
| `times_by_zone.PT` | Timezone row |
| `presenters[0].first_name` / `last_name` / `display_name` | Presenter name |
| `presenters[0].name_suffix` | Presenter credential suffix when available |
| `presenters[0].title` | Presenter title/role |
| `headshot_base64` | Presenter image |
| `short_url` | Displayed registration short URL |
| `reg_link.url` | Registration URL fallback |
| `qr_base64` | QR code image |
| `series_label` | Program/series label when populated |
| `session_type` | Prefix stripping / fallback label logic |
| `partner` | Partner/campaign display only when intentionally needed |

## Validation Rules

- Card must load from API search results.
- Card must support one selected session at a time.
- Title cannot be empty after prefix stripping.
- Date and timezones must display correctly.
- Presenter name must display from available API fields.
- Headshot must display if `headshot_base64` is returned.
- If no headshot exists, fallback should be visually acceptable.
- QR code must display if `qr_base64` is returned.
- Short URL should display from `short_url` when available.
- Short URL and QR destination must be generated from the same registration URL.
- Description must not overflow.
- PNG export must produce high-resolution output.
- PDF export must preserve readable text and scan-safe QR code.

## Acceptance Criteria

- Existing `facebook-promo.html` remains API-driven.
- Search loads live session data from the existing session search endpoint.
- Selecting a session populates the card.
- Card visually matches David's screenshots for the individual session card.
- Header includes left logo, center date/time, and right logo.
- Burgundy band includes program label and session title.
- Presenter image, name, and title/credential display correctly.
- Date/time pill displays date and all four time zones.
- Description fits in the available area.
- QR code displays and scans.
- `Register free:` short URL displays and matches the QR destination.
- Footer disclaimer is visible.
- `4x6` PNG export works.
- `4x6` PDF export works.
- `3x5` mode still works or is intentionally removed if no longer required.

## Out Of Scope For Now

Do not include these in this requirement:

- Menu/action integration from session instance operations.
- Wednesday Calendar List View card.
- Monday + Wednesday List View card.
- Full Spotlight public session list filter.
- Full microsite-to-Drupal dynamic migration.
- BugHerd setup.

Session-instance integration can be handled later after the standalone card output is aligned and approved.

## Open Questions

1. Should the right-side logo always be `Somebody To Talk To`, or should it change by campaign/partner?
2. Should University of Chicago cards use University of Chicago / Amyloidosis Foundation / One Amyloidosis Voice branding instead of the current Somebody To Talk To header?
3. What is the correct fallback when API `series_label` is empty?
4. Should the program label come from `series_label`, `session_type`, indication, or a hardcoded campaign setting?
5. Should `3x5` remain supported, or is only `4x6` required for the current print workflow?
6. What is the final safe maximum description length after print testing?

## Risk Notes

- The current implementation is already close, so rebuilding it would waste time and increase risk.
- The largest risk is visual overflow from long titles/descriptions.
- Another risk is mismatched registration paths: the displayed short URL and QR code must point to the same session registration destination.
- If the API returns empty `series_label`, `partner`, or presenter title fields, the card may look incomplete unless fallback rules are defined.
- Export quality must be tested from the actual page, not assumed from the browser preview.
