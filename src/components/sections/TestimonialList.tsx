import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

import { testimonials } from '../../data/reviews';

interface TestimonialListProps {
  /** Optional section heading; rendered as an <h2> when present. */
  heading?: string;
  /** Show the estimate CTA in the empty-state (default true). Set false where it's unwanted, e.g. the Reviews page. */
  showCta?: boolean;
  className?: string;
}

export function TestimonialList({ heading, showCta = true, className = '' }: TestimonialListProps) {
  return (
    <section className={`px-4 py-16 ${className}`.trim()}>
      <div className="mx-auto max-w-5xl">
        {heading && <h2 className="font-display text-3xl text-ink">{heading}</h2>}

        {testimonials.length === 0 ? (
          // EMPTY-STATE — no permissioned testimonials yet (v1; Gaps G-5). No fake quote, no rating.
          <div
            className={`rounded-md border border-line bg-mist p-6 ${heading ? 'mt-8' : ''}`.trim()}
          >
            <p className="text-base text-body">
              Customer testimonials are on the way.
              {showCta && <> In the meantime, tell us about your project and we&apos;ll be glad to help.</>}
            </p>
            {/* Estimate CTA suppressed where it doesn't belong (e.g. the Reviews page). */}
            {showCta && (
              <div className="mt-4">
                {/* Single CTA color — shared Button primary (Ace Red). */}
                <Button to="/contact">Request an Estimate</Button>
              </div>
            )}
          </div>
        ) : (
          <ul className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${heading ? 'mt-8' : ''}`.trim()}>
            {testimonials.map((t) => (
              <li key={`${t.attribution}:${t.quote}`}>
                <Card as="figure">
                  <blockquote className="text-base text-body">
                    <span className="font-display text-2xl text-trust" aria-hidden="true">
                      &ldquo;
                    </span>
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-3 text-sm font-semibold text-ink">
                    — {t.attribution}
                  </figcaption>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
