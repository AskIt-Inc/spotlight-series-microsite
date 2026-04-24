import React from 'react';
import { HeroSection } from '../components/spotlight-v2/HeroSection';
import { OverviewSection } from '../components/spotlight-v2/OverviewSection';
import { TeamSection } from '../components/spotlight-v2/TeamSection';
import { HighlightsSection } from '../components/spotlight-v2/HighlightsSection';
import { TrialsSection } from '../components/spotlight/TrialsSection';
import { SessionsSidebar } from '../components/spotlight/SessionsSidebar';

// ─── Spotlight Page — v2 (client feedback applied) ───────────────────────────
// Changes from v1:
//   Hero:       "featuring" bolder/whiter, Spotlight Series label larger
//   Overview:   Dense paragraphs → hero quote + 3 pillars
//   Team:       Horizontal compact cards, bio in modal (not inline)
//   Highlights: 75% shorter per entry
//   Trials:     Unchanged (already clean)
//   Sessions:   Unchanged (sidebar reused from v1)

export const SpotlightPageV2: React.FC = () => {
  return (
    <div>
      {/* Program Hero — full width */}
      <HeroSection />

      {/* Two-column layout (same grid as v1) */}
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
