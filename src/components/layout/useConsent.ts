import { useEffect, useState } from 'react';

import { reviewsWidget } from '../../data/reviews';

export type Consent = 'granted' | 'denied' | 'unset';

export const CONSENT_STORAGE_KEY = 'consent:embeds';

/** True when any configured third-party embed sets cookies (reviews widget today; map later). */
export function embedsSetCookies(): boolean {
  return reviewsWidget.setsCookies === true;
}

export function readStoredConsent(): Consent {
  if (typeof window === 'undefined') return 'unset';
  const v = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return v === 'granted' || v === 'denied' ? v : 'unset';
}

/** Persist a consent decision and notify listeners across the app. */
export function setStoredConsent(value: Exclude<Consent, 'unset'>): void {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  window.dispatchEvent(new Event('consent:changed'));
}

/** Shared hook so ReviewsWidget (#18) / Map (#21) can defer embeds until consent. */
export function useConsent(): Consent {
  const [consent, setConsent] = useState<Consent>(readStoredConsent);
  useEffect(() => {
    const sync = () => setConsent(readStoredConsent());
    window.addEventListener('storage', sync);
    window.addEventListener('consent:changed', sync as EventListener);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('consent:changed', sync as EventListener);
    };
  }, []);
  return consent;
}
