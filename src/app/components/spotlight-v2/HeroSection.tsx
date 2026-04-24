import React, { useState } from 'react';

const FONT = 'gotham, sans-serif';
const STTT_LOGO_URL = 'https://somebodytotalkto.com/sites/default/files/STTT%20Logo%20Basic.png';
const UOC_LOGO_URL =
  'https://edge.sitecorecloud.io/unichicagomc-81nbqnb3/media/images/ucmc/landing-pages/ucm-logo-horizontal.png';

// ─── UoC logo — white pill, bigger to avoid squishing ────────────────────────
// Client feedback: UChicago logo was getting squished — increased height + container
const UoCLogo = () => {
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '10px',
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '240px',
      }}
    >
      {!imgFailed ? (
        <img
          src={UOC_LOGO_URL}
          alt="University of Chicago Medicine"
          style={{ height: '52px', width: 'auto', display: 'block' }}
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span
          style={{
            fontSize: '15px',
            fontWeight: 700,
            color: '#8B1F2D',
            fontFamily: FONT,
            textAlign: 'center' as const,
            lineHeight: 1.3,
          }}
        >
          University of Chicago Medicine
        </span>
      )}
    </div>
  );
};

// ─── Series strip (upper band — 40% of total hero height) ────────────────────
// Client feedback v3:
//   • Remove "SomeBodyToTalkTo" text — STTT logo carries the brand identity
//   • Format: [STTT logo] | [Amyloidosis Program Spotlight Series] [June 2026]
//   • Disease-first naming enables: "Sickle Cell Disease Program Spotlight Series" etc.
//   • Compact padding — this band should read as 40% of total hero height
const SeriesStrip: React.FC = () => (
  <div
    style={{
      background: '#ffffff',
      borderBottom: '1px solid #E8E8E8',
      padding: '10px 24px',
    }}
  >
    {/* series-strip-row: flex row on desktop, stacked column on mobile */}
    <div
      className="series-strip-row"
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      {/* STTT logo */}
      <img
        className="series-strip-logo-img"
        src={STTT_LOGO_URL}
        alt="SomeBodyToTalkTo"
        style={{ height: '52px', width: 'auto', display: 'block', flexShrink: 0 }}
        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
      />

      {/* Vertical rule — hidden on mobile */}
      <div
        className="series-strip-divider"
        style={{ width: '1px', height: '44px', background: '#DDD0D2', flexShrink: 0 }}
      />

      {/* Program identity: disease-first name + date */}
      <div style={{ fontFamily: FONT, minWidth: 0 }}>
        <div
          className="series-strip-title"
          style={{
            fontSize: '18px',
            fontWeight: 700,
            color: '#8B1F2D',
            letterSpacing: '-0.2px',
            lineHeight: 1.2,
          }}
        >
          Amyloidosis Program Spotlight Series
        </div>
        <div
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#8B1F2D',
            marginTop: '4px',
            letterSpacing: '0.04em',
          }}
        >
          June 2026
        </div>
      </div>
    </div>
  </div>
);

// ─── Hero section (lower maroon band — 60% of total hero height) ──────────────
// Client feedback v3:
//   • More vertical space than the strip above (60% of total)
//   • FEATURING label kept — client likes it
//   • UoC logo bigger, not squished
export const HeroSection: React.FC = () => (
  <>
    <SeriesStrip />

    {/* Maroon feature band — taller than strip to achieve 40/60 proportion */}
    <section
      style={{
        background: 'linear-gradient(135deg, #8B1F2D 0%, #6E1A24 100%)',
        borderBottom: '3px solid #6E1A24',
        padding: '28px 24px',
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
          gap: '24px',
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
          {/* FEATURING label — spotlight light rays icon + warm cream text */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFE8A3" strokeWidth="2" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="10" r="3"/>
              <line x1="12" y1="1" x2="12" y2="4"/>
              <line x1="4.22" y1="3.22" x2="6.34" y2="5.34"/>
              <line x1="1" y1="10" x2="4" y2="10"/>
              <line x1="19.78" y1="3.22" x2="17.66" y2="5.34"/>
              <line x1="23" y1="10" x2="20" y2="10"/>
              <path d="M7 17l1.5-4h7L17 17"/>
              <line x1="5" y1="21" x2="19" y2="21"/>
              <line x1="8" y1="21" x2="8" y2="17"/>
              <line x1="16" y1="21" x2="16" y2="17"/>
            </svg>
            <span style={{
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase' as const,
              color: '#FFE8A3',
              fontFamily: FONT,
            }}>
              FEATURING
            </span>
          </div>

          {/* H1 — featured institution */}
          <h1
            className="hero-h1"
            style={{
              fontSize: '34px',
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

        {/* Right column — UoC logo, bigger, not squished */}
        <div className="hero-logo-col" style={{ flexShrink: 0 }}>
          <UoCLogo />
        </div>
      </div>
    </section>
  </>
);
