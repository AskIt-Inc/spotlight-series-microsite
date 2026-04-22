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

        {/* Cross-disease paragraph */}
        <div
          style={{
            marginTop: '24px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
          }}
        >
          <Globe size={16} color="#8B1F2D" style={{ flexShrink: 0, marginTop: '3px' }} />
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
            The University of Chicago Medicine is a comprehensive academic medical centre committed to discovery
            and excellence across a broad range of rare and complex diseases. In partnership with STTT, UChicago
            Medicine is expanding patient access to education and specialist care beyond the clinic walls.
          </p>
        </div>
      </div>
    </section>
  );
};
