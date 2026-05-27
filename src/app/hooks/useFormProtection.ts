import { useState, useRef } from 'react';

/**
 * Shared spam protection hook for all microsite forms.
 *
 * Two checks:
 *   1. Honeypot — a hidden field bots fill in, humans never see
 *   2. Timing   — rejects submissions under 3 seconds (bot speed)
 *
 * Usage:
 *   const { honeypotProps, getProtectionPayload, isSuspicious, resetTimer } = useFormProtection();
 *
 *   - Render <input {...honeypotProps} /> inside the form (visually hidden)
 *   - Spread getProtectionPayload() into the fetch body
 *   - Call resetTimer() when the form opens (formState === 'open')
 *   - If isSuspicious() returns true, fake-succeed without hitting the endpoint
 */
export function useFormProtection() {
  const [honeypot, setHoneypot] = useState('');
  const openedAt = useRef<number>(Date.now());

  /** Call when the form becomes visible so timing starts fresh. */
  const resetTimer = () => {
    openedAt.current = Date.now();
  };

  /**
   * Returns true if the submission looks automated.
   * Always fake-succeed on the frontend — never tell a bot it was rejected.
   */
  const isSuspicious = (): boolean => {
    if (honeypot.length > 0) return true;
    if (Date.now() - openedAt.current < 3000) return true;
    return false;
  };

  /** Spread into fetch body alongside real form fields. */
  const getProtectionPayload = () => ({
    _hp: honeypot,
    _t: openedAt.current,
  });

  /** Props to spread onto the hidden honeypot <input>. */
  const honeypotProps = {
    type: 'text' as const,
    name: 'website',
    value: honeypot,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setHoneypot(e.target.value),
    tabIndex: -1 as const,
    autoComplete: 'off' as const,
    'aria-hidden': true as const,
    style: {
      position: 'absolute' as const,
      left: '-9999px',
      width: '1px',
      height: '1px',
      overflow: 'hidden',
      opacity: 0,
    },
  };

  return { honeypotProps, getProtectionPayload, isSuspicious, resetTimer };
}
