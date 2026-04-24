import React from 'react';

const FONT = 'gotham, sans-serif';

// ─── Highlights v2 ────────────────────────────────────────────────────────────
// Client feedback: "reduce by 75%" — AI-generated text is too verbose.
// Each entry is trimmed to 1–2 tight sentences.

const highlights = [
  {
    label: 'One Program, Nine Specialists',
    text: 'Nine specialists across cardiology, hematology, neurology, nephrology, GI, orthopaedics, and cardiovascular genetics — one of the Midwest\'s most comprehensive amyloidosis teams.*',
  },
  {
    label: 'Advanced Cardiac Imaging',
    text: 'State-of-the-art cardiac MRI, CT, and echocardiography for accurate early detection, diagnosis, and ongoing monitoring of cardiac amyloidosis.*',
  },
  {
    label: 'CAR T-Cell & Stem Cell Therapy',
    text: 'Patients with AL amyloidosis have access to CAR T-cell therapy and autologous stem cell transplantation, with a research focus on MRD and racial disparities.*',
  },
  {
    label: 'Hereditary ATTR & Genetic Counselling',
    text: 'A dedicated cardiovascular genetic counsellor provides hereditary ATTR testing, pedigree analysis, and personalised guidance for patients and at-risk family members.*',
  },
  {
    label: 'Kidney Transplantation',
    text: 'Specialist nephrology care including evaluation for kidney and pancreas transplantation and management of amyloid-related kidney disease.*',
  },
  {
    label: 'Active in Landmark Clinical Research',
    text: 'Participation in ACT-EARLY (Phase 3, acoramidis) and MaesTTRo (global observational, eplontersen) — giving patients access to emerging therapies.*',
  },
];

export const HighlightsSection: React.FC = () => (
  <section
    style={{
      background: 'var(--oav-card-bg)',
      borderTop: '1px solid var(--oav-border)',
      borderBottom: '1px solid var(--oav-border)',
      padding: '40px 24px',
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
          marginBottom: '20px',
          fontFamily: FONT,
        }}
      >
        Program Highlights
      </div>

      {/* Highlight rows — compact */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {highlights.map((h) => (
          <div
            key={h.label}
            style={{
              borderLeft: '3px solid #8B1F2D',
              paddingLeft: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
            }}
          >
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#000000',
                fontFamily: FONT,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.5px',
              }}
            >
              {h.label}
            </div>
            <p
              style={{
                fontSize: '14px',
                fontWeight: 300,
                color: '#000000',
                lineHeight: 1.6,
                margin: 0,
                fontFamily: FONT,
              }}
            >
              {h.text}
            </p>
          </div>
        ))}
      </div>

      {/* Asterisk disclaimer */}
      <p
        style={{
          fontSize: '12px',
          color: '#9CA3AF',
          marginTop: '20px',
          marginBottom: 0,
          fontFamily: FONT,
          fontStyle: 'italic',
        }}
      >
        * Content generated for review purposes. Requires approval from University of Chicago Medicine before publication.
      </p>
    </div>
  </section>
);
