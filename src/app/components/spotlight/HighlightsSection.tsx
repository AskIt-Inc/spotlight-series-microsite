import React from 'react';

const FONT = 'gotham, sans-serif';

export const HighlightsSection: React.FC = () => {
  return (
    <section
      style={{
        background: 'var(--oav-card-bg)',
        borderTop: '1px solid var(--oav-border)',
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
          Programme Highlights
        </div>

        {/* Rich text body */}
        <div
          style={{
            fontSize: '16px',
            color: '#000000',
            lineHeight: 1.7,
            fontFamily: FONT,
          }}
        >
          <p style={{ margin: '0 0 16px 0' }}>
            The University of Chicago Amyloidosis Programme has established itself as one of the leading
            comprehensive amyloidosis centres in the United States. In 2024, the programme was recognised
            by the Amyloidosis Research Consortium as a designated Centre of Excellence — one of only a
            handful of programmes in the country to receive this distinction.
          </p>

          <p style={{ margin: '0 0 16px 0' }}>
            <strong style={{ fontWeight: 700, color: '#000000' }}>Recent programme achievements include:</strong>
          </p>

          <ul
            style={{
              margin: '0 0 16px 0',
              paddingLeft: '20px',
              display: 'flex',
              flexDirection: 'column' as const,
              gap: '8px',
            }}
          >
            <li>
              Publication of a landmark study on early detection of cardiac ATTR amyloidosis using
              technetium pyrophosphate (Tc-PYP) scintigraphy, now adopted as a standard diagnostic
              protocol at affiliated regional hospitals.
            </li>
            <li>
              Enrolment of over 150 patients across three concurrent phase 3 clinical trials targeting
              transthyretin stabilisation and RNA-silencing mechanisms.
            </li>
            <li>
              Launch of a dedicated hereditary ATTR family cascade screening clinic — the first
              of its kind in the greater Chicago metropolitan area.
            </li>
            <li>
              Presentation of original research at the American College of Cardiology (ACC) 2025
              Annual Scientific Session, including outcomes data from the programme's cardiac
              amyloidosis registry.
            </li>
          </ul>

          <p style={{ margin: 0 }}>
            The programme continues to expand its regional referral network, partnering with community
            cardiology practices and primary care providers to reduce the average time from symptom
            onset to confirmed diagnosis — currently a national priority in the amyloidosis field.
          </p>
        </div>
      </div>
    </section>
  );
};
