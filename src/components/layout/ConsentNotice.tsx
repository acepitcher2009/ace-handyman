import { useCallback, useState } from 'react';

import { Button } from '../ui/Button';

import {
  type Consent,
  embedsSetCookies,
  readStoredConsent,
  setStoredConsent,
} from './useConsent';

interface ConsentNoticeProps {
  className?: string;
}

export function ConsentNotice({ className = '' }: ConsentNoticeProps) {
  const [consent, setConsent] = useState<Consent>(readStoredConsent);

  const decide = useCallback((value: Exclude<Consent, 'unset'>) => {
    setStoredConsent(value);
    setConsent(value);
  }, []);

  // Never appears when no cookie-setting embed is configured, or once a decision exists.
  if (!embedsSetCookies() || consent !== 'unset') return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className={[
        'fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface shadow-sticky',
        'motion-safe:transition-transform',
        className,
      ].join(' ')}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-sans text-base text-body">
          We use third-party content (such as our reviews widget and map) that may set cookies. You
          can accept or decline these embeds.
        </p>
        <div className="flex items-center gap-3">
          <Button variant="secondary" type="button" onClick={() => decide('denied')}>
            Decline
          </Button>
          <Button type="button" onClick={() => decide('granted')}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
