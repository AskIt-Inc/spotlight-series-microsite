import React from 'react';
import { Download, User } from 'lucide-react';
import { sessions, type Session } from './data';

const FONT = 'gotham, sans-serif';

interface SessionRowProps {
  session: Session;
}

const SessionRow: React.FC<SessionRowProps> = ({ session }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      style={{
        background: 'var(--oav-page-bg)',
        border: '1px solid var(--oav-border)',
        borderRadius: '8px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      {/* Date block */}
      <div
        style={{
          width: '64px',
          flexShrink: 0,
          textAlign: 'center' as const,
          background: 'var(--oav-card-bg)',
          border: '1px solid var(--oav-border)',
          borderRadius: '6px',
          padding: '8px 4px',
          borderTop: '3px solid #8B1F2D',
        }}
      >
        <div
          style={{
            fontSize: '10px',
            fontWeight: 700,
            textTransform: 'uppercase' as const,
            color: '#8B1F2D',
            fontFamily: FONT,
            lineHeight: 1,
          }}
        >
          {session.month}
        </div>
        <div
          style={{
            fontSize: '22px',
            fontWeight: 700,
            color: '#000000',
            fontFamily: FONT,
            lineHeight: 1.2,
            marginTop: '2px',
          }}
        >
          {session.day}
        </div>
        <div
          style={{
            fontSize: '10px',
            fontWeight: 300,
            color: '#9CA3AF',
            fontFamily: FONT,
            lineHeight: 1,
            marginTop: '2px',
          }}
        >
          {session.dayOfWeek}
        </div>
      </div>

      {/* Session details */}
      <div style={{ flex: 1 }}>
        {/* Time */}
        <div
          style={{
            fontSize: '12px',
            fontWeight: 300,
            color: '#9CA3AF',
            marginBottom: '4px',
            fontFamily: FONT,
          }}
        >
          {session.time}
        </div>

        {/* Session title */}
        <div
          style={{
            fontSize: '16px',
            fontWeight: 300,
            color: '#000000',
            fontFamily: FONT,
          }}
        >
          {session.title}
        </div>

        {/* Presenter + status badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '4px',
            flexWrap: 'wrap' as const,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '14px',
              color: '#000000',
              fontFamily: FONT,
            }}
          >
            <User size={12} color="#000000" style={{ flexShrink: 0 }} />
            {session.presenter}
          </div>

          {session.status === 'upcoming' && (
            <span
              style={{
                background: '#FBF0F1',
                color: '#8B1F2D',
                border: '1px solid #F0D0D3',
                padding: '2px 10px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 300,
                fontFamily: FONT,
                display: 'inline-block',
              }}
            >
              Upcoming
            </span>
          )}
          {session.status === 'completed' && (
            <span
              style={{
                background: '#F5F5F5',
                color: '#000000',
                border: '1px solid #E5E5E5',
                padding: '2px 10px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 300,
                fontFamily: FONT,
                display: 'inline-block',
              }}
            >
              Completed
            </span>
          )}
        </div>
      </div>

      {/* Register CTA */}
      <div style={{ flexShrink: 0 }}>
        {session.status === 'upcoming' && (
          <button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              padding: '8px 20px',
              background: hovered ? '#6E1A24' : '#8B1F2D',
              color: '#ffffff',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: 300,
              whiteSpace: 'nowrap' as const,
              cursor: 'pointer',
              border: 'none',
              fontFamily: FONT,
              transition: 'background 0.15s ease',
            }}
          >
            Register
          </button>
        )}
        {session.status === 'completed' && (
          <span
            style={{
              background: '#F5F5F5',
              color: '#000000',
              border: '1px solid #E5E5E5',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 300,
              fontFamily: FONT,
              display: 'inline-block',
            }}
          >
            Completed
          </span>
        )}
      </div>
    </div>
  );
};

export const CalendarSection: React.FC = () => {
  const sessionCount = sessions.length;

  return (
    <section
      style={{
        background: 'var(--oav-card-bg)',
        borderTop: '1px solid var(--oav-border)',
        padding: '56px 24px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section heading row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap' as const,
            gap: '12px',
            marginBottom: '32px',
          }}
        >
          <div>
            <h2
              style={{
                fontSize: '28px',
                fontWeight: 300,
                color: '#000000',
                margin: 0,
                lineHeight: 1.3,
                fontFamily: FONT,
              }}
            >
              June Sessions
            </h2>
            <p
              style={{
                fontSize: '14px',
                color: '#9CA3AF',
                marginTop: '4px',
                marginBottom: 0,
                fontFamily: FONT,
                lineHeight: 1.5,
              }}
            >
              {sessionCount} session{sessionCount !== 1 ? 's' : ''} this month — register for the ones that interest you
            </p>
          </div>

          <a
            href="#"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              color: '#005EB8',
              textDecoration: 'none',
              fontFamily: FONT,
              marginTop: '6px',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#004A93'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#005EB8'; }}
          >
            <Download size={14} color="#005EB8" />
            Download full calendar (PDF)
          </a>
        </div>

        {/* Session list */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '12px',
          }}
        >
          {sessions.map((session) => (
            <SessionRow key={session.id} session={session} />
          ))}
        </div>
      </div>
    </section>
  );
};
