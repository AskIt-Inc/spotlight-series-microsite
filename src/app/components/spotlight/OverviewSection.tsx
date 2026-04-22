import React from 'react';
import { Globe } from 'lucide-react';

const FONT = 'gotham, sans-serif';

export const OverviewSection: React.FC = () => {
  return (
    <section
      style={{
        background: 'var(--oav-card-bg)',
        borderBottom: '1px solid var(--oav-border)',
        padding: '48px 24px',
      }}
    >
      <div>
        {/* Section label */}
        <div
          style={{
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase' as const,
            letterSpacing: '1px',
            color: '#8B1F2D',
            marginBottom: '8px',
            fontFamily: FONT,
          }}
        >
          About the Programme
        </div>

        {/* Body text */}
        <p
          style={{
            fontSize: '16px',
            fontWeight: 300,
            color: '#000000',
            lineHeight: 1.7,
            margin: 0,
            fontFamily: FONT,
          }}
        >
          The University of Chicago Amyloidosis Program is a multidisciplinary team of experts with the dedication
          and experience to diagnose and manage this complex condition. Our mission is to provide our patients the
          best quality of life during and after treatment, and to continually pursue groundbreaking research into
          the disease and its causes — helping identify high-risk patients and develop effective, long-term
          treatments. We also offer genetic testing and counseling for patients and their families. While several
          types of amyloidosis affect the heart, our cardiologists primarily treat AL amyloidosis (also called
          primary amyloidosis), the most commonly diagnosed form with more than 4,000 new cases every year, and
          TTR amyloidosis, which can be hereditary or occur without a genetic link, causing proteins to build up
          in the heart and leading to fluid retention and, if untreated, congestive heart failure.
          African-Americans have a higher risk for hereditary TTR amyloidosis.
        </p>

        {/* ⚠ Content needed from UoC */}
        <div
          style={{
            marginTop: '24px',
            background: '#FFFBEB',
            border: '1px dashed #D97706',
            borderRadius: '6px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
          }}
        >
          <Globe size={16} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#92400E', fontFamily: FONT, marginBottom: '4px', textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>
              Content needed from University of Chicago
            </div>
            <p style={{ fontSize: '14px', color: '#92400E', margin: 0, fontFamily: FONT, lineHeight: 1.6 }}>
              Please provide an additional paragraph here about the programme — for example, what makes the UoC Amyloidosis Program unique, its research focus, or its patient care philosophy. This will appear directly below the programme overview text.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
