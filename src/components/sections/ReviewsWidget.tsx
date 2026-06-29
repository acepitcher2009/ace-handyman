import { useEffect, useState } from 'react';

import { Button } from '../ui/Button';
import { useConsent } from '../layout/useConsent';

import { reviewsWidget } from '../../data/reviews';

type WidgetState = 'loading' | 'loaded';

interface ReviewsWidgetProps {
  /** Optional heading for the surface; the page/TrustBand may pass its own. */
  heading?: string;
  /**
   * Heading level for the rendered title — defaults to 'h2' since this surface's heading
   * is its own section title. Callers nested under another section heading pass 'h3' to
   * keep the document outline gap-free (no skipped levels).
   */
  headingLevel?: 'h2' | 'h3';
  /** Show the estimate CTA in the empty-state (default true). Set false where it's unwanted, e.g. the Reviews page. */
  showCta?: boolean;
  className?: string;
}

/**
 * Live reviews surface — the rating is NEVER ours to print (CONVENTIONS §G).
 *
 * Three states:
 *  - empty   — reviews.ts embedSrc is null (v1 default, Gaps §G-5): a trust-framed line
 *              plus an estimate CTA. Never a fabricated rating.
 *  - loading — skeleton placeholder while the embed mounts (motion-safe pulse).
 *  - loaded  — the embed (iframe) plus attribution; the rating value lives inside the embed.
 *
 * Consent: when reviewsWidget.setsCookies is true the embed is deferred until consent is
 * granted (via the useConsent hook); ConsentNotice renders the accept/decline banner.
 */
export function ReviewsWidget({
  heading,
  headingLevel = 'h2',
  showCta = true,
  className = '',
}: ReviewsWidgetProps) {
  // Heading element resolved from the level prop so the title sits correctly in the outline.
  const Heading = headingLevel;

  // EMPTY-STATE: no live source configured yet (reviews.ts embedSrc is null in v1 — Gaps §G-5).
  if (!reviewsWidget.embedSrc) {
    return (
      <section
        className={`rounded-md bg-mist p-6 text-center ${className}`.trim()}
        aria-label="Reviews"
      >
        {heading && <Heading className="font-display text-2xl text-ink">{heading}</Heading>}
        <p className="mt-3 text-base text-body">
          We&rsquo;re proud of the work we do across Bryan&ndash;College Station.
          {showCta && <> Tell us about your project and we&rsquo;ll get you an estimate.</>}
        </p>
        {/* Estimate CTA suppressed where it doesn't belong (e.g. the Reviews page). */}
        {showCta && (
          <div className="mt-4 flex justify-center">
            {/* Single CTA color — shared Button primary (Ace Red), NOT a trust-colored control. */}
            <Button to="/contact">Request an Estimate</Button>
          </div>
        )}
      </section>
    );
  }

  return (
    <section className={`rounded-md bg-surface p-6 ${className}`.trim()} aria-label="Reviews">
      {heading && <Heading className="font-display text-2xl text-ink">{heading}</Heading>}
      <LiveReviewsEmbed src={reviewsWidget.embedSrc} setsCookies={reviewsWidget.setsCookies} />
      {/* Attribution for the displayed rating — the rating value lives in the embed, never printed by us. */}
      <p className="mt-3 text-sm text-trust">Ratings sourced live from Google.</p>
    </section>
  );
}

interface LiveReviewsEmbedProps {
  src: string;
  setsCookies: boolean;
}

// Loaded/loading embed: shows a skeleton until the iframe reports load. No rating literal anywhere.
function LiveReviewsEmbed({ src, setsCookies }: LiveReviewsEmbedProps) {
  const consent = useConsent();
  const [state, setState] = useState<WidgetState>('loading');

  useEffect(() => {
    // Fallback in case onLoad never fires (e.g. provider script container).
    const t = window.setTimeout(() => setState('loaded'), 4000);
    return () => window.clearTimeout(t);
  }, []);

  // CONSENT GATE: a cookie-setting embed must not load until consent is granted (PRD §5).
  // ConsentNotice (a fixed banner) presents the accept/decline choice; useConsent reads the result.
  if (setsCookies && consent !== 'granted') {
    return (
      <p className="rounded-md bg-mist p-6 text-center text-base text-body">
        Accept embedded content to load our live reviews.
      </p>
    );
  }

  return (
    <div className="relative min-h-11">
      {state === 'loading' && (
        <div
          className="absolute inset-0 rounded-md bg-mist motion-safe:animate-pulse"
          aria-hidden="true"
        />
      )}
      <iframe
        title="Google reviews"
        src={src}
        onLoad={() => setState('loaded')}
        className="h-64 w-full rounded-md border border-line"
        loading="lazy"
      />
    </div>
  );
}
