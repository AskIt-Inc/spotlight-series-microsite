import React, { useState } from 'react';

const FONT = 'gotham, sans-serif';
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
        padding: '16px 24px',
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
          style={{ height: '56px', width: 'auto', display: 'block' }}
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
// Client-approved format (2026-04-24):
//   SomeBodyToTalkTo › Spotlight Series › Amyloidosis › University of Chicago · June 2026
// Single breadcrumb line, bigger than before.
const SEP = <span style={{ color: '#C0A0A4', fontWeight: 300, margin: '0 8px' }}>›</span>;

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
      }}
    >
      {/* Left accent bar — hidden on mobile */}
      <div
        className="series-strip-accent"
        style={{
          width: '4px',
          alignSelf: 'stretch',
          background: '#8B1F2D',
          borderRadius: '2px',
          flexShrink: 0,
          marginRight: '18px',
        }}
      />

      {/* Single breadcrumb row */}
      <div
        className="series-strip-text"
        style={{
          fontSize: '20px',
          fontFamily: FONT,
          lineHeight: 1.3,
          display: 'flex',
          flexWrap: 'wrap' as const,
          alignItems: 'center',
        }}
      >
        {/* Tier 1 — brand owner, dominant */}
        <span style={{ fontWeight: 700, color: '#8B1F2D', letterSpacing: '-0.3px' }}>
          SomeBodyToTalkTo
        </span>

        {SEP}

        {/* Tier 2 — series */}
        <span style={{ fontWeight: 600, color: '#8B1F2D' }}>
          Spotlight Series
        </span>

        {SEP}

        {/* Tier 3 — indication */}
        <span style={{ fontWeight: 400, color: '#111111' }}>
          Amyloidosis
        </span>

        {SEP}

        {/* Tier 4 — institution + period, lighter */}
        <span style={{ fontWeight: 300, color: '#6B7280' }}>
          University of Chicago · June 2026
        </span>
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
          gap: '48px',
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
          {/* "featuring" connector — client: bolder, brighter white, larger */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.4)' }} />
            <span
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#ffffff',
                fontFamily: FONT,
                letterSpacing: '3px',
                textTransform: 'uppercase' as const,
              }}
            >
              featuring
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.4)' }} />
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
