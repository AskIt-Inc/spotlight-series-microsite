Here is a complete reference summary of the design system as it exists in this build.

STTT Partner Portal — Design System Reference
Stack
Layer	Technology
Framework	React 18 + TypeScript, Vite
Routing	react-router (Data Mode, createBrowserRouter)
Styling	Tailwind CSS v4 + inline style={} props
Icons	lucide-react exclusively
Charts	recharts
QR Codes	qrcode.react → QRCodeSVG
Theme	ThemeContext.tsx — 3-state: system / light / dark
Typography
Single font family throughout the entire app:

'Roboto', system-ui, sans-serif
Loaded from Google Fonts at weights: 300, 400, 500, 700, 800

Referenced in code as either:

fontFamily: "'Roboto', system-ui, sans-serif" — asset/print components
fontFamily: "'Roboto', sans-serif" — UI chrome
fontFamily: "var(--font-body)" — via CSS token in small badge components
fontFamily: "monospace" — FormatBadge only (PDF, PNG labels)
Base type scale (from theme.css @layer base):

html → font-size: 16px
h1 → --text-2xl, weight 500, line-height 1.5
h2 → --text-xl, weight 500
h3 → --text-lg, weight 500
h4, label, button → --text-base, weight 500
input → --text-base, weight 400
Color Palette
Brand Colors (hardcoded in components)
Name	Light value	Dark value	Use
STTT Teal (primary)	#4eaac8	#5ec5e0	Buttons, active nav, links, accents
Teal hover/dark	#2a758e	#7dd4ea	Hover states, dark panels
Teal light surface	#d4eef5	#183a48	Utility bar bg, tinted surfaces
Teal brand surface	#f0f9fc	#162f3a	Very light tinted cards
Semantic CSS Custom Properties
All interactive components use these tokens — never raw hex values in UI chrome:

/* Backgrounds */
--sttt-page-bg:        #f6f8f9  / dark: #111317
--sttt-card-bg:        #ffffff  / dark: #1c1f26
--sttt-utility-bg:     #d4eef5  / dark: #13252e   ← utility bar
--sttt-icon-bg:        #f6f8f9  / dark: #252830
--sttt-input-bg:       #ffffff  / dark: #252830
--sttt-stripe-row:     #f9f9f9  / dark: #22252c   ← table stripes

/* Text */
--sttt-text-primary:   #42474c  / dark: #e0e2e6
--sttt-text-secondary: #5c656d  / dark: #a0a6b0
--sttt-text-muted:     #9ca3af  / dark: #6b7280

/* Borders */
--sttt-border:         #e5e7eb  / dark: #2d323a
--sttt-border-light:   #d1d5db  / dark: #3a4049
--sttt-utility-border: #b8dce8  / dark: #1c3644

/* Brand tokens */
--sttt-brand:          #4eaac8  / dark: #5ec5e0
--sttt-brand-hover:    #2a758e  / dark: #7dd4ea
--sttt-brand-light:    #d4eef5  / dark: #183a48

/* Structural */
--sttt-header-bg:      #ffffff  / dark: #181b21
--sttt-footer-bg:      #ffffff  / dark: #181b21
--sttt-card-shadow:    0 2px 8px rgba(0,0,0,0.08)  / dark: 0 2px 12px rgba(0,0,0,0.35)
Indication (disease) Colors
Used in IndicationBadge and indication-specific asset tinting:

Indication	Light bg	Light text
Duchenne Muscular Dystrophy	#e0f2fe	#0369a1
Sickle Cell Disease	#fce7f3	#9d174d
Amyloidosis	#ede9fe	#6d28d9
Status Colors
Used in StatusBadge:

Status	Bg	Text
Upcoming	#dbeafe	#1d4ed8
Completed	#f3f4f6	#6b7280
Cancelled	#fee2e2	#dc2626
Workflow Colors (Editor only)
Used in WorkflowBadge:

Status	Bg	Border	Text
Draft	#f6f8f9	#e5e7eb	#5c656d
Pending Approval	#D9EBF2	#4BBDE8	#2A9AC8
Approved	#EEF7E4	#7CC242	#6aad36
Spacing & Shape
Base spacing unit: 4px — all spacing in multiples of 4 (8, 12, 16, 24, 32, 48)
Card border-radius: 8px
Button / input border-radius: 4px
Badge / pill border-radius: 9999px (full round)
Card shadow: 0 2px 8px rgba(0,0,0,0.08)
Max content width: 1440px, centered, px-4 gutters
Layout Architecture
ThemeProvider
  └── RouterProvider
        ├── /                    → Layout.tsx (partner portal shell)
        │     ├── /dashboard           → DashboardHubPage
        │     ├── /dashboard/marketing → DashboardPage
        │     ├── /dashboard/sessions  → SessionsListPage
        │     ├── /dashboard/sessions/:id → SessionDetailVariant4
        │     ├── /dashboard/submissions → SubmissionsPage
        │     ├── /dashboard/submissions/:id → SubmissionDetailPage
        │     ├── /dashboard/assets   → AssetsPage
        │     ├── /dashboard/assets/designs → AssetDesignsPage
        │     ├── /dashboard/calendar → CalendarPage
        │     └── /dashboard/reporting → ReportingPage
        │
        ├── /editor              → EditorLayout.tsx (editor shell)
        │     ├── /editor/dashboard → EditorDashboard
        │     └── /editor/wizard    → WizardPage (3-step)
        │
        ├── /profile/:slug       → ProfilePage (public, no layout wrapper)
        └── /site                → SiteHomePage
Header (Layout.tsx — locked structure)
Two tiers, sticky on scroll:

Tier 1 — Utility bar

Height: ~36px (py-1.5)
Background: var(--sttt-utility-bg) → #d4eef5
Border-bottom: 1px solid var(--sttt-utility-border)
Left: partner account name (13px, weight 400)
Right: Theme toggle (System/Light/Dark) · Help · Log out — all 13px, lucide icons at 14px
Tier 2 — Main header

Height: 72px
Background: var(--sttt-header-bg) → white
Shadow: var(--sttt-card-shadow)
Left: STTT logo (60px tall) + "Partner Marketing Portal" label (14px, weight 300)
Center/Right: SiteNav (hidden on mobile) + AvatarDropdown
Navigation tab bar (below Tier 2):

Min-height 48px, border-top: 1px solid var(--sttt-border)
Items: Dashboard · Sessions · Marketing · Submissions · Reporting
Active: color: var(--sttt-brand), border-bottom: 3px solid var(--sttt-brand), weight 500
Inactive: color: var(--sttt-text-primary), weight 400, 14px
Footer (Layout.tsx — locked structure)
Background: var(--sttt-footer-bg)
Border-top: 1px solid var(--sttt-border)
Padding: 24px top/bottom (py-6)
Row 1: Legal links left (Privacy Policy · Terms of Use · 501(c)(3)) + copyright right — 13px, --sttt-text-secondary
Row 2: Legal disclaimer paragraph — 12px, --sttt-text-muted, weight 300, centered
Shared Component Library
Component	File	Purpose
StatusBadge	StatusBadge.tsx	Upcoming / Completed / Cancelled pill
IndicationBadge	IndicationBadge.tsx	Disease indication colored pill
FormatBadge	FormatBadge.tsx	PDF / PNG / etc. mono-grey square badge
WorkflowBadge	editor/WorkflowBadge.tsx	Draft / Pending / Approved pill (editor)
EmptyState	EmptyState.tsx	Icon + heading + subtext + optional CTA button
AvatarDropdown	AvatarDropdown.tsx	Avatar circle → dropdown (Dashboard, My Account, Logout)
AssetCard	AssetCard.tsx	Asset tile with download + preview actions
AssetDetailModal	AssetDetailModal.tsx	Full-screen asset preview overlay
AssetTypeBadge	AssetTypeBadge.tsx	Calendar / Flyer / SocialPost etc.
ProgressBar	editor/ProgressBar.tsx	3-step wizard stepper with connecting lines
AssetPreviewFrame	assets/AssetPreviewFrame.tsx	CSS-transform scale wrapper for pixel-exact previews
Asset Preview Components
All live under /src/app/components/assets/. Each renders at its true pixel dimensions and is wrapped in <AssetPreviewFrame> to scale down for display.

Component	Native size	Use
FacebookPostPreview	1200 × 630 px	OG / Facebook share image
InstagramPostPreview	1080 × 1080 px	Square Instagram post
InstagramStoryPreview	1080 × 1920 px	Vertical story
FlyerPreview	816 × 1056 px	US Letter print flyer (single session)
CalendarFlyerPreview	816 × 1056 px	Monthly schedule flyer (multi-session)
QRCodeAssetPreview	512 × 512 px	QR code with branding
All share the same AssetData interface (from FacebookPostPreview.tsx):

interface AssetData {
  title: string;
  description: string;
  indicationName: string;
  presenter: string;
  dateFormatted: string;   // "Thursday, March 5, 2026"
  timeFormatted: string;   // "7:00 PM"
  timezone: string;        // "ET"
  registrationUrl: string;
}
Data Model (mock-data.ts)
Core interfaces available globally:

PartnerAccount — partner org, type, allowed indications, branding
Indication — disease indication with slug
SessionInstance — session with datetime, speakers, status, heroImageUrl
Asset — file asset with type, format, indication links, status lifecycle
PromoKit — bundle of assets for a session
CopyBlock — pre-approved channel copy (LinkedIn, Facebook, Email, SMS, etc.)
TrackingLink — UTM-tagged short URL per partner/channel
Three indications in mock data: Duchenne Muscular Dystrophy, Sickle Cell Disease, Amyloidosis

Key Coding Conventions
Styling approach: Mix of Tailwind utility classes (layout, spacing) + inline style={{}} props (colors, font sizes, brand-specific values). CSS custom properties always used for theme-sensitive colors.
No absolute positioning except overlays/modals and the flyer footer panel.
All navigation via useNavigate() or <NavLink> / <Link> — never <a href> for internal routes.
Every list/table must have a loading skeleton state and an EmptyState fallback.
Icons: Lucide React only. Icon-only buttons always have aria-label.
Font size in inline styles — never rely solely on Tailwind text-size classes because base h1–h4 styles in theme.css may override.
as const required on string CSS enum values used in inline styles (e.g. textTransform: "uppercase" as const).
Dark mode is applied via .dark class on <html> by ThemeContext. All dark mode values live in theme.css .dark {} block — no dark: Tailwind prefixes needed for token-based colors.
