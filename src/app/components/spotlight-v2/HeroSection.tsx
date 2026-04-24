import React, { useState } from 'react';

const FONT = 'gotham, sans-serif';
const STTT_LOGO_URL = 'https://somebodytotalkto.com/sites/default/files/STTT%20Logo%20Basic.png';
const UOC_LOGO_URL =
  'https://edge.sitecorecloud.io/unichicagomc-81nbqnb3/media/images/ucmc/landing-pages/ucm-logo-horizontal.png';

// UoC logo — white background pill for contrast on maroon
const UoCLogo = () => {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '8px',
        padding: '6px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '200px',
      }}
    >
      {!imgFailed ? (
        <img
          src={UOC_LOGO_URL}
          alt="University of Chicago Medicine"
          style={{ height: '24px', width: 'auto', display: 'block' }}
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span
          style={{
            fontSize: '13px',
            fontWeight: 700,
            color: '#8B1F2D',
            fontFamily: FONT,
            textAlign: 'center' as const,
          }}
        >
          University of Chicago Medicine
        </span>
      )}
    </div>
  );
};

// ─── Series strip ─────────────────────────────────────────────────────────────
// Desktop (client-approved): single breadcrumb line with › separators at 20px
// Mobile: stacked two-row identity block via CSS class swap (series-strip-desktop / series-strip-mobile)
const SeriesStrip: React.FC = () => (
  <div
    style={{
      background: '#ffffff',
      borderBottom: '1px solid #E8E8E8',
      padding: '16px 24px',
    }}
  >
    <div
      className="series-strip-inner"
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
      }}
    >
      {/* Left: accent bar + text content */}
      <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0, gap: '18px' }}>

        {/* Left accent bar — hidden on mobile */}
        <div
          className="series-strip-accent"
          style={{
            width: '4px',
            alignSelf: 'stretch',
            background: '#8B1F2D',
            borderRadius: '2px',
            flexShrink: 0,
          }}
        />

        {/* ── DESKTOP: single breadcrumb line ── */}
        <div
          className="series-strip-desktop"
          style={{
            fontFamily: FONT,
            fontSize: '20px',
            display: 'flex',
            alignItems: 'baseline',
            flexWrap: 'nowrap' as const,
            gap: 0,
          }}
        >
          <span style={{ fontWeight: 700, color: '#8B1F2D', letterSpacing: '-0.3px', whiteSpace: 'nowrap' as const }}>
            SomeBodyToTalkTo
          </span>
          <span style={{ color: '#C0A0A4', fontWeight: 300, margin: '0 8px' }}>›</span>
          <span style={{ fontWeight: 600, color: '#8B1F2D', whiteSpace: 'nowrap' as const }}>
            Spotlight Series
          </span>
          <span style={{ color: '#C0A0A4', fontWeight: 300, margin: '0 8px' }}>›</span>
          <span style={{ fontWeight: 400, color: '#111111', whiteSpace: 'nowrap' as const }}>
            Amyloidosis
          </span>
          <span style={{ color: '#C0A0A4', fontWeight: 300, margin: '0 8px' }}>›</span>
          <span style={{ fontWeight: 300, color: '#6B7280', whiteSpace: 'nowrap' as const }}>
            University of Chicago · June 2026
          </span>
        </div>

        {/* ── MOBILE: stacked two-row identity block ── */}
        <div
          className="series-strip-mobile"
          style={{ fontFamily: FONT, display: 'none' }}
        >
          {/* Row 1: brand + series */}
          <div style={{ lineHeight: 1.2 }}>
            <span style={{ fontSize: '22px', fontWeight: 700, color: '#8B1F2D', letterSpacing: '-0.3px' }}>
              SomeBodyToTalkTo
            </span>
            <span style={{ fontSize: '17px', fontWeight: 600, color: '#8B1F2D', marginLeft: '8px', opacity: 0.8 }}>
              Spotlight Series
            </span>
          </div>
          {/* Row 2: indication + institution/date */}
          <div style={{ marginTop: '5px', lineHeight: 1.3 }}>
            <span style={{ fontSize: '17px', fontWeight: 500, color: '#1a1a1a' }}>
              Amyloidosis
            </span>
            <span style={{ fontSize: '15px', fontWeight: 300, color: '#6B7280', marginLeft: '8px' }}>
              University of Chicago · June 2026
            </span>
          </div>
        </div>

      </div>

      {/* Right: STTT logo — hidden on mobile */}
      <div className="series-strip-logo" style={{ flexShrink: 0 }}>
        <img
          src={STTT_LOGO_URL}
          alt="SomeBodyToTalkTo"
          style={{ height: '71px', width: 'auto', display: 'block' }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
      </div>
    </div>
  </div>
);

// ─── Hero section ─────────────────────────────────────────────────────────────
// Client feedback applied:
//   • "featuring" text: full white #ffffff, bolder (weight 600), bigger (14px), italic removed
//   • No gray/semi-transparent text in the maroon band — everything is solid white
//   • UoC institution name: remains white, prominent
export const HeroSection: React.FC = () => (
  <>
    <SeriesStrip />

    {/* Maroon feature band */}
    <section
      style={{
        background: 'linear-gradient(135deg, #8B1F2D 0%, #6E1A24 100%)',
        borderBottom: '3px solid #6E1A24',
        padding: '12px 24px',
      }}
    >
      <div
        className="hero-content-row"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        {/* Left column */}
        <div
          className="hero-left-col"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {/* "featuring" label — prominent, unique treatment */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0',
          }}>
            {/* Left accent pip */}
            <div style={{
              width: '3px',
              height: '22px',
              background: 'rgba(255,255,255,0.5)',
              borderRadius: '2px',
              marginRight: '10px',
              flexShrink: 0,
            }} />
            <span style={{
              fontSize: '15px',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#ffffff',
              fontFamily: 'Georgia, "Times New Roman", serif',
              letterSpacing: '1px',
            }}>
              featuring
            </span>
          </div>

          {/* H1 — featured institution */}
          <h1
            className="hero-h1"
            style={{
              fontSize: '32px',
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
              lineHeight: 1.2,
              fontFamily: FONT,
            }}
          >
            University of Chicago Amyloidosis Program
          </h1>
        </div>

        {/* Right column — UoC logo (hidden on mobile via .hero-logo-col CSS class) */}
        <div className="hero-logo-col" style={{ flexShrink: 0 }}>
          <UoCLogo />
        </div>
      </div>
    </section>
  </>
);
