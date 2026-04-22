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
      {/* §2 Programme Hero — full width */}
      <HeroSection />

      {/* Two-column content area */}
      <div
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
          {/* §3 Programme Overview */}
          <OverviewSection />

          {/* §4 Meet the Team */}
          <TeamSection />

          {/* §5 Programme Highlights */}
          <HighlightsSection />

          {/* §6 Open Clinical Trials */}
          <TrialsSection />
        </div>

        {/* Right — sticky sessions sidebar */}
        <div
          style={{
            width: '300px',
            flexShrink: 0,
            position: 'sticky' as const,
            top: '96px',
            alignSelf: 'flex-start',
          }}
        >
          <SessionsSidebar />
        </div>
      </div>
    </div>
  );
};
