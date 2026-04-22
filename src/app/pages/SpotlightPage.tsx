import React from 'react';
import { HeroSection } from '../components/spotlight/HeroSection';
import { OverviewSection } from '../components/spotlight/OverviewSection';
import { TeamSection } from '../components/spotlight/TeamSection';
import { HighlightsSection } from '../components/spotlight/HighlightsSection';
import { TrialsSection } from '../components/spotlight/TrialsSection';
import { SessionsSidebar } from '../components/spotlight/SessionsSidebar';

export const SpotlightPage: React.FC = () => {
  return (
    <div>
      {/* Programme Hero — full width */}
      <HeroSection />

      {/* Two-column content area.
          On desktop: main content left, sticky sessions sidebar right.
          On mobile (≤768px): .spotlight-content-grid CSS stacks to column,
          .spotlight-sidebar-wrapper gets order:-1 so sessions appear above content. */}
      <div
        className="spotlight-content-grid"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px 64px',
          display: 'flex',
          gap: '32px',
          alignItems: 'flex-start',
        }}
      >
        {/* Left — main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <OverviewSection />
          <TeamSection />
          <HighlightsSection />
          <TrialsSection />
        </div>

        {/* Right — sticky sessions sidebar
            On mobile this becomes full-width and floats above content via CSS order:-1 */}
        <div
          className="spotlight-sidebar-wrapper"
          style={{
            width: '300px',
            flexShrink: 0,
            position: 'sticky' as const,
            top: '104px',
            alignSelf: 'flex-start',
          }}
        >
          <SessionsSidebar />
        </div>
      </div>
    </div>
  );
};
