import React from 'react';
import { Edit3 } from 'lucide-react';

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

        {/* ⚠ Content needed from UoC */}
        <div
          style={{
            background: '#FFFBEB',
            border: '1px dashed #D97706',
            borderRadius: '6px',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px',
          }}
        >
          <Edit3 size={18} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#92400E', fontFamily: FONT, marginBottom: '8px', textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>
              Content needed from University of Chicago
            </div>
            <p style={{ fontSize: '14px', color: '#92400E', margin: '0 0 12px 0', fontFamily: FONT, lineHeight: 1.6 }}>
              Please provide the programme's key highlights, recent accomplishments, and notable publications. Suggested content to include:
            </p>
            <ul style={{ fontSize: '14px', color: '#92400E', margin: 0, paddingLeft: '18px', fontFamily: FONT, lineHeight: 1.7 }}>
              <li>Any designations or accreditations the programme has received (e.g. Centre of Excellence status)</li>
              <li>Recent publications or research milestones</li>
              <li>Clinical trial enrolment figures or notable study outcomes</li>
              <li>New services or clinics launched (e.g. genetic screening, multidisciplinary clinics)</li>
              <li>Awards, conference presentations, or media recognition</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
