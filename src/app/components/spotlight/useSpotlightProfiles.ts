// ─── Profiles API hook ────────────────────────────────────────────────────────
// Fetches partner profiles, strips HTML bios, filters internal test accounts.
// Returns a Map<lastNameLower → bio> for use in TeamSection.
// data.ts bios remain as silent fallback when API is unavailable.

import { useState, useEffect } from 'react';

const PROFILES_URLS = [
  'https://somebodytotalkto.com/api/spotlight/microsite/profiles?indication=4&partner=12758',
  'https://somebodytotalkto.com/api/spotlight/microsite/profiles?indication=4&partner=12761',
];

// ─── Raw API shape ────────────────────────────────────────────────────────────
export interface ApiProfile {
  uid: number;
  display_name: string;
  first_name: string;
  last_name: string;
  name_suffix: string;
  title: string;
  bio: string;        // HTML — strip before use
  photo_url: string;
  employer: string;
  indication: string;
}

// ─── Normalised shape ─────────────────────────────────────────────────────────
export interface NormalizedProfile {
  uid: number;
  lastNameKey: string;  // lowercase trimmed last_name — lookup key
  displayName: string;
  bio: string;          // plain text, HTML stripped
  photoUrl: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Strip HTML tags and decode common entities. */
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

/** Filter out internal test accounts — any name segment contains "test". */
function isTestUser(p: ApiProfile): boolean {
  const combined = [p.display_name, p.first_name, p.last_name]
    .join(' ')
    .toLowerCase();
  return combined.includes('test');
}

function normalise(p: ApiProfile): NormalizedProfile {
  const displayName = [p.title, p.first_name, p.last_name]
    .map(part => part.trim())
    .filter(Boolean)
    .join(' ')
    .replace(/\s{2,}/g, ' ')
    .trim();

  return {
    uid:         p.uid,
    lastNameKey: p.last_name.trim().toLowerCase(),
    displayName: displayName || p.display_name.trim(),
    bio:         stripHtml(p.bio),
    photoUrl:    p.photo_url,
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useSpotlightProfiles() {
  const [bioMap, setBioMap] = useState<Map<string, NormalizedProfile>>(new Map());

  useEffect(() => {
    Promise.all(
      PROFILES_URLS.map(url => (
        fetch(url)
          .then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json() as Promise<{ data: ApiProfile[] }>;
          })
          .catch(err => {
            console.warn(`[useSpotlightProfiles] profile fetch failed for ${url}:`, err);
            return { data: [] as ApiProfile[] };
          })
      ))
    )
      .then(responses => {
        const map = new Map<string, NormalizedProfile>();
        for (const response of responses) {
          for (const p of response.data) {
            if (isTestUser(p)) continue;      // skip internal accounts
            const profile = normalise(p);
            if (!profile.lastNameKey) continue;
            map.set(profile.lastNameKey, profile);
            const lastNameToken = profile.lastNameKey.split(/\s+/).pop();
            if (lastNameToken && !map.has(lastNameToken)) {
              map.set(lastNameToken, profile);
            }
          }
        }
        setBioMap(map);
      });
  }, []);

  return { bioMap };
}
