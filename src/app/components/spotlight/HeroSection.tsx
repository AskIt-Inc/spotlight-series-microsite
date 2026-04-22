import React, { useState } from 'react';

const FONT = 'gotham, sans-serif';
const UOC_LOGO_URL =
  'https://edge.sitecorecloud.io/unichicagomc-81nbqnb3/media/images/ucmc/landing-pages/ucm-logo-horizontal.png';

// Amyloidosis indication badge
const AmyloidosisBadge = () => (
  <span
    style={{
      background: 'rgba(255,255,255,0.15)',
      color: '#ffffff',
      border: '1px solid rgba(255,255,255,0.35)',
      padding: '4px 12px',
      borderRadius: '9999px',
      fontSize: '13px',
      fontWeight: 300,
      display: 'inline-block',
      fontFamily: FONT,
      letterSpacing: '0.02em',
    }}
  >
    Amyloidosis
  </span>
);

// UoC logo with white background pill for contrast on maroon
const UoCLogo = () => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '8px',
        padding: '20px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '220px',
      }}
    >
      {!imgFailed ? (
        <img
          src={UOC_LOGO_URL}
          alt="University of Chicago Medicine"
          style={{ height: '64px', width: 'auto', display: 'block' }}
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span
          style={{
            fontSize: '14px',
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

export const HeroSection: React.FC = () => {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #8B1F2D 0%, #6E1A24 100%)',
        borderBottom: '4px solid #6E1A24',
        padding: '64px 24px 56px',
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
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {/* STTT Spotlight Series programme eyebrow */}
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase' as const,
              letterSpacing: '2px',
              color: 'rgba(255,255,255,0.9)',
              fontFamily: FONT,
            }}
          >
            SomeBodyToTalkTo Spotlight Series · June 2026
          </div>

          {/* "featuring" connector */}
          <div
            style={{
              fontSize: '15px',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.65)',
              fontFamily: FONT,
              fontStyle: 'italic',
              marginBottom: '-4px',
            }}
          >
            featuring
          </div>

          {/* H1 — the featured institution */}
          <h1
            className="hero-h1"
            style={{
              fontSize: '40px',
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
              lineHeight: 1.2,
              fontFamily: FONT,
            }}
          >
            University of Chicago Amyloidosis Program
          </h1>

          {/* Indication badge */}
          <div style={{ marginTop: '8px' }}>
            <AmyloidosisBadge />
          </div>
        </div>

        {/* Right column — UoC logo (hidden on mobile via .hero-logo-col CSS class) */}
        <div className="hero-logo-col" style={{ flexShrink: 0 }}>
          <UoCLogo />
        </div>
      </div>
    </section>
  );
};
