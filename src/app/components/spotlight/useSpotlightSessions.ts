import { useState, useEffect } from 'react';
import { sessions as staticSessions } from './data';

// ─── API endpoint ────────────────────────────────────────────────────────────
const API_URL =
  'https://somebodytotalkto.com/api/spotlight/microsite/sessions?indication=4&partner=12758';

// ─── Raw API shape ────────────────────────────────────────────────────────────
export interface ApiSession {
  uuid: string;
  title: string;
  description: string;
  date: string;                  // e.g. "Jun 3, 2026"
  time: string;                  // e.g. "6:00 PM"
  times_by_zone: {
    ET: string;
    CT: string;
    MT: string;
    PT: string;
  };
  timestamp: number;             // Unix seconds UTC
  indications: string[];
  partner: string;
  presenters: Array<{
    display_name: string;
    first_name: string;
    last_name: string;
    name_suffix: string;
    title: string;
    photo_url: string;
  }>;
  reg_link: {
    url: string;
    title: string;
  };
  short_url: string;
  series_label: string;
}

// ─── Normalised shape used by SessionsSidebar ─────────────────────────────────
export interface NormalizedSession {
  id: string;
  month: string;           // 3-letter uppercase: "JUN"
  day: string;             // day of month: "3"
  dayOfWeek: string;       // 3-letter: "Tue"
  time: string;            // "5:00 PM CT"
  title: string;
  presenter: string;
  presenterLastName: string; // trimmed lowercase — used for team card reg-link lookup
  status: 'upcoming' | 'completed';
  regUrl: string;
}

// ─── Reg-URL lookup map ───────────────────────────────────────────────────────
// Returns Map<presenterLastName (lowercase, trimmed) → regUrl>
// Use this in TeamSection to wire Register buttons without adding regUrl to data.ts.
export function buildRegUrlMap(sessions: NormalizedSession[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const s of sessions) {
    if (s.presenterLastName && s.regUrl) {
      map.set(s.presenterLastName, s.regUrl);
    }
  }
  return map;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MONTH_MAP: Record<string, string> = {
  Jan: 'JAN', Feb: 'FEB', Mar: 'MAR', Apr: 'APR', May: 'MAY', Jun: 'JUN',
  Jul: 'JUL', Aug: 'AUG', Sep: 'SEP', Oct: 'OCT', Nov: 'NOV', Dec: 'DEC',
};

function normalise(s: ApiSession): NormalizedSession {
  // Parse date string: "Jun 3, 2026" → month="JUN", day="3"
  const parts = s.date.split(' ');                        // ["Jun", "3,", "2026"]
  const month = MONTH_MAP[parts[0]] ?? parts[0].toUpperCase().slice(0, 3);
  const day   = parts[1]?.replace(',', '') ?? '';

  // Day-of-week from timestamp
  const d = new Date(s.timestamp * 1000);
  const dayOfWeek = DAY_NAMES[d.getDay()];

  // Prefer CT time, fall back to raw time
  const ctTime = s.times_by_zone?.CT;
  const time   = ctTime ? `${ctTime} CT` : s.time;

  // Presenter: first presenter display_name, collapse double-spaces
  const presenterRaw  = s.presenters?.[0]?.display_name ?? '';
  const presenter     = presenterRaw.replace(/\s{2,}/g, ' ').trim();
  // Last name from the structured field — trim whitespace (some entries have leading space)
  const presenterLastName = (s.presenters?.[0]?.last_name ?? '').trim().toLowerCase();

  // Status: completed if timestamp is in the past
  const status: 'upcoming' | 'completed' =
    s.timestamp < Date.now() / 1000 ? 'completed' : 'upcoming';

  return {
    id:        s.uuid,
    month,
    day,
    dayOfWeek,
    time,
    title:     s.title,
    presenter,
    presenterLastName,
    status,
    regUrl:    s.reg_link?.url ?? '',
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useSpotlightSessions() {
  const [sessions, setSessions] = useState<NormalizedSession[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(API_URL)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<{ data: ApiSession[] }>;
      })
      .then(json => {
        if (cancelled) return;
        const normalised = json.data.map(normalise);
        // Sort: completed first (ascending by timestamp), upcoming last (ascending)
        normalised.sort((a, b) => {
          if (a.status === b.status) return 0;
          return a.status === 'completed' ? -1 : 1;
        });
        setSessions(normalised);
        setLoading(false);
      })
      .catch(err => {
        if (cancelled) return;
        console.error('[useSpotlightSessions] fetch failed:', err);
        // Fallback: convert static sessions to NormalizedSession shape
        const fallback: NormalizedSession[] = staticSessions.map(s => ({
          id:                String(s.id),
          month:             s.month,
          day:               s.day,
          dayOfWeek:         s.dayOfWeek,
          time:              s.time,
          title:             s.title,
          presenter:         s.presenter,
          presenterLastName: '',
          status:            s.status === 'cancelled' ? 'completed' : s.status,
          regUrl:            '',
        }));
        setSessions(fallback);
        setError('Live schedule unavailable — showing cached data.');
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  return { sessions, loading, error };
}
