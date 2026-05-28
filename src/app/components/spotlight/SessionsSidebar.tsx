import React, { useState } from 'react';
import { User, Calendar, AlertCircle, Loader } from 'lucide-react';
import { useSpotlightSessions, type NormalizedSession } from './useSpotlightSessions';

const FONT = 'gotham, sans-serif';

const SidebarSessionRow: React.FC<{ session: NormalizedSession }> = ({ session }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        padding: '12px 16px',
        borderBottom: '1px solid var(--oav-border)',
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
      }}
    >
      {/* Date chip */}
      <div
        style={{
          width: '44px',
          flexShrink: 0,
          textAlign: 'center' as const,
          background: 'var(--oav-page-bg)',
          border: '1px solid var(--oav-border)',
          borderRadius: '6px',
          padding: '5px 4px',
        }}
      >
        <div
          style={{
            fontSize: '9px',
            fontWeight: 700,
            textTransform: 'uppercase' as const,
            color: '#8B1F2D',
            lineHeight: 1,
            fontFamily: FONT,
          }}
        >
          {session.month}
        </div>
        <div
          style={{
            fontSize: '17px',
            fontWeight: 700,
            color: '#000000',
            lineHeight: 1.2,
            marginTop: '2px',
            fontFamily: FONT,
          }}
        >
          {session.day}
        </div>
        <div
          style={{
            fontSize: '9px',
            color: '#9CA3AF',
            lineHeight: 1,
            marginTop: '2px',
            fontFamily: FONT,
          }}
        >
          {session.dayOfWeek}
        </div>
      </div>

      {/* Session details */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: '11px',
            color: '#9CA3AF',
            marginBottom: '3px',
            fontFamily: FONT,
          }}
        >
          {session.time}
        </div>
        <div
          style={{
            fontSize: '13px',
            fontWeight: 300,
            color: '#000000',
            lineHeight: 1.35,
            fontFamily: FONT,
          }}
        >
          {session.title}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginTop: '4px',
            fontSize: '12px',
            color: '#000000',
            fontFamily: FONT,
          }}
        >
          <User size={11} color="#9CA3AF" style={{ flexShrink: 0 }} />
          {session.presenter}
        </div>

        {session.status === 'upcoming' && session.regUrl && (
          <a
            href={session.regUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              marginTop: '8px',
              padding: '5px 12px',
              background: hovered ? '#6E1A24' : '#8B1F2D',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 300,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontFamily: FONT,
              transition: 'background 0.15s ease',
              textDecoration: 'none',
            }}
          >
            <Calendar size={11} color="#ffffff" style={{ flexShrink: 0 }} />
            Register
          </a>
        )}

        {session.status === 'completed' && (
          <span
            style={{
              display: 'inline-block',
              marginTop: '6px',
              padding: '2px 10px',
              background: '#F5F5F5',
              color: '#000000',
              borderRadius: '9999px',
              fontSize: '11px',
              fontWeight: 300,
              fontFamily: FONT,
              border: '1px solid #E5E5E5',
            }}
          >
            Completed
          </span>
        )}
      </div>
    </div>
  );
};

export const SessionsSidebar: React.FC = () => {
  const { sessions, loading, error } = useSpotlightSessions();

  return (
    <div
      style={{
        background: 'var(--oav-card-bg)',
        border: '1px solid var(--oav-border)',
        borderRadius: '8px',
        boxShadow: 'var(--oav-card-shadow)',
        overflow: 'hidden',
      }}
    >
      {/* Sidebar header */}
      <div
        style={{
          padding: '14px 16px',
          borderBottom: '1px solid var(--oav-border)',
          background: '#8B1F2D',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#ffffff',
            fontFamily: FONT,
          }}
        >
          Upcoming Sessions
        </div>
      </div>

      {/* Session rows — live from STTT API */}
      <div className="sessions-list">
        {loading && (
          <div style={{ padding: '24px 16px', display: 'flex', alignItems: 'center', gap: '10px', color: '#6B7280', fontFamily: FONT, fontSize: '13px' }}>
            <Loader size={14} style={{ animation: 'spin 1s linear infinite' }} />
            Loading sessions…
          </div>
        )}
        {!loading && error && (
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: '8px', background: '#FFFBEB', borderBottom: '1px solid #FDE68A' }}>
            <AlertCircle size={14} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span style={{ fontSize: '12px', color: '#92400E', fontFamily: FONT }}>{error}</span>
          </div>
        )}
        {!loading && sessions.map((session) => (
          <SidebarSessionRow key={session.id} session={session} />
        ))}
      </div>

    </div>
  );
};
