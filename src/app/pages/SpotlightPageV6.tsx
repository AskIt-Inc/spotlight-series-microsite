import React from 'react';
import { HeroSection }      from '../components/spotlight-v6/HeroSection';
import { OverviewSection }  from '../components/spotlight-v6/OverviewSection';
import { TeamSection }      from '../components/spotlight-v6/TeamSection';
import { TrialsSection }    from '../components/spotlight-v6/TrialsSection';
import { HighlightsSection } from '../components/spotlight-v2/HighlightsSection';
import { SessionsSidebar }  from '../components/spotlight/SessionsSidebar';

// ─── Spotlight Page — v6 (Provider cards: bio snippet on face instead of specialty tags) ───
// Changes from v5:
//   Team: CompactCard now shows first sentence of bio (≤120 chars) instead of specialty tags.
//         Full bio + specialty still available in the modal via "View more".

export const SpotlightPageV6: React.FC = () => {
  return (
    <div>
      <HeroSection />

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

        {/* Right — sticky sessions sidebar */}
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
