import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

import { portfolio } from '../../data/portfolio';

interface PortfolioGridProps {
  /** Optional section heading; rendered as an <h2> when present. */
  heading?: string;
  className?: string;
}

export function PortfolioGrid({ heading, className = '' }: PortfolioGridProps) {
  return (
    <section className={`px-4 py-16 ${className}`.trim()}>
      <div className="mx-auto max-w-6xl">
        {heading && <h2 className="font-display text-3xl text-ink">{heading}</h2>}

        {portfolio.length === 0 ? (
          // EMPTY-STATE — photos not supplied yet (PRD §10; Gaps G-3). No fabricated projects.
          <div
            className={`rounded-md border border-line bg-mist p-6 ${heading ? 'mt-8' : ''}`.trim()}
          >
            <p className="text-base text-body">
              Our project gallery is coming soon. Tell us about your project and we&apos;ll help you
              get it done.
            </p>
            {/* Single CTA color — shared Button primary (Ace Red). */}
            <div className="mt-4">
              <Button to="/contact">Request an Estimate</Button>
            </div>
          </div>
        ) : (
          <ul
            className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ${heading ? 'mt-8' : ''}`.trim()}
          >
            {portfolio.map((item) => (
              <li key={item.src}>
                <Card as="figure" className="overflow-hidden p-0">
                  {/* Required descriptive alt; lazy + explicit width/height reserve space (no CLS). */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={800}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full object-cover motion-safe:transition-opacity"
                  />
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
