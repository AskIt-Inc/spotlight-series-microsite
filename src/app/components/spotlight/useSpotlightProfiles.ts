// ─── Profiles API hook ────────────────────────────────────────────────────────
// Fetches partner profiles, strips HTML bios, filters internal test accounts.
// Returns a Map<lastNameLower → bio> for use in TeamSection.
// data.ts bios remain as silent fallback when API is unavailable.

import { useState, useEffect } from 'react';

const PROFILES_URL =
  'https://somebodytotalkto.com/api/spotlight/microsite/profiles?indication=4&partner=12758';

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
  return {
    uid:         p.uid,
    lastNameKey: p.last_name.trim().toLowerCase(),
    bio:         stripHtml(p.bio),
    photoUrl:    p.photo_url,
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useSpotlightProfiles() {
  const [bioMap, setBioMap] = useState<Map<string, NormalizedProfile>>(new Map());

  useEffect(() => {
    fetch(PROFILES_URL)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<{ data: ApiProfile[] }>;
      })
      .then(json => {
        const map = new Map<string, NormalizedProfile>();
        for (const p of json.data) {
          if (isTestUser(p)) continue;      // skip internal accounts
          const profile = normalise(p);
          if (!profile.lastNameKey) continue;
          map.set(profile.lastNameKey, profile);
        }
        setBioMap(map);
      })
      .catch(err => {
        // Silent fallback — data.ts bios remain in use
        console.warn('[useSpotlightProfiles] fetch failed, using static bios:', err);
      });
  }, []);

  return { bioMap };
}
