import { useState, useEffect } from 'react';
import { sessions as staticSessions } from './data';

// ─── API endpoint ────────────────────────────────────────────────────────────
const API_URL =
  'https://somebodytotalkto.com/api/spotlight/microsite/sessions?indication=4&partner=12758';
const COMPLETED_API_URL = `${API_URL}&status=completed`;

const SUPPORT_STAFF_PRESENTER_LAST_NAMES = new Set([
  'hodges',
  'hushka',
  'silverstein',
]);

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
  timestamp: number;
  month: string;           // 3-letter uppercase: "JUN"
  day: string;             // day of month: "3"
  dayOfWeek: string;       // 3-letter: "Tue"
  time: string;            // "5:00 PM CT"
  title: string;
  description: string;     // session description from API; empty string if unavailable
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
    if (s.status === 'upcoming' && s.presenterLastName && s.regUrl) {
      map.set(s.presenterLastName, s.regUrl);
    }
  }
  return map;
}

export function buildPresenterSessionMap(sessions: NormalizedSession[]): Map<string, NormalizedSession> {
  const map = new Map<string, NormalizedSession>();
  for (const s of sessions) {
    if (!s.presenterLastName) continue;
    const existing = map.get(s.presenterLastName);
    if (!existing || (existing.status === 'completed' && s.status === 'upcoming')) {
      map.set(s.presenterLastName, s);
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

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

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
    id:               s.uuid,
    timestamp:        s.timestamp,
    month,
    day,
    dayOfWeek,
    time,
    title:            s.title,
    description:      stripHtml(s.description ?? ''),
    presenter,
    presenterLastName,
    status,
    regUrl:           s.reg_link?.url ?? '',
  };
}

function isSupportStaffPresenter(s: ApiSession): boolean {
  return s.presenters?.some((presenter) => (
    SUPPORT_STAFF_PRESENTER_LAST_NAMES.has(presenter.last_name.trim().toLowerCase())
  )) ?? false;
}

function sortSessions(a: NormalizedSession, b: NormalizedSession) {
  if (a.status === b.status) {
    return a.status === 'completed'
      ? b.timestamp - a.timestamp
      : a.timestamp - b.timestamp;
  }
  return a.status === 'completed' ? 1 : -1;
}

function dedupeSessions(sessions: NormalizedSession[]) {
  const map = new Map<string, NormalizedSession>();
  for (const session of sessions) {
    map.set(session.id, session);
  }
  return Array.from(map.values());
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useSpotlightSessions() {
  const [sessions,    setSessions]    = useState<NormalizedSession[]>([]);
  const [completedSessions, setCompletedSessions] = useState<NormalizedSession[]>([]);
  const [allSessions, setAllSessions] = useState<NormalizedSession[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchRows = (url: string) => fetch(url)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<{ data: ApiSession[] }>;
      });

    Promise.all([
      fetchRows(API_URL),
      fetchRows(COMPLETED_API_URL).catch(() => ({ data: [] as ApiSession[] })),
    ])
      .then(([upcomingJson, completedJson]) => {
        if (cancelled) return;
        const allNormalised = dedupeSessions([
          ...upcomingJson.data.map(normalise),
          ...completedJson.data.map(normalise),
        ]);
        const displayNormalised = upcomingJson.data
          .filter(s => !isSupportStaffPresenter(s))
          .map(normalise);
        const completedDisplayNormalised = dedupeSessions([
          ...completedJson.data
          .filter(s => !isSupportStaffPresenter(s))
          .map(normalise)
          .filter(s => s.status === 'completed'),
        ]);
        allNormalised.sort(sortSessions);
        displayNormalised.sort(sortSessions);
        completedDisplayNormalised.sort(sortSessions);
        setSessions(displayNormalised);
        setCompletedSessions(completedDisplayNormalised);
        setAllSessions(allNormalised);
        setLoading(false);
      })
      .catch(err => {
        if (cancelled) return;
        console.error('[useSpotlightSessions] fetch failed:', err);
        // Fallback: convert static sessions to NormalizedSession shape
        const fallback: NormalizedSession[] = staticSessions.map(s => ({
          id:                String(s.id),
          timestamp:         0,
          month:             s.month,
          day:               s.day,
          dayOfWeek:         s.dayOfWeek,
          time:              s.time,
          title:             s.title,
          description:       '',
          presenter:         s.presenter,
          presenterLastName: '',
          status:            s.status === 'cancelled' ? 'completed' : s.status,
          regUrl:            '',
        }));
        setSessions(fallback);
        setCompletedSessions(fallback.filter(s => s.status === 'completed').sort(sortSessions));
        setAllSessions(fallback);
        setError('Live schedule unavailable — showing cached data.');
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  return { sessions, completedSessions, allSessions, loading, error };
}
