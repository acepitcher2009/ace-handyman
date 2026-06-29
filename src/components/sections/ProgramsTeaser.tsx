import { Button } from '../ui/Button';

import { programs } from '../../data/programs';

type ProgramsVariant = 'teaser' | 'callout';

interface ProgramsTeaserProps {
  variant?: ProgramsVariant;
  /** Optional section heading; rendered as an <h2> when present. */
  heading?: string;
  className?: string;
}

export function ProgramsTeaser({
  variant = 'teaser',
  heading,
  className = '',
}: ProgramsTeaserProps) {
  return (
    <section className={`px-4 py-16 ${className}`.trim()}>
      <div
        className={`mx-auto rounded-lg bg-mist p-6 ${variant === 'callout' ? 'max-w-5xl sm:p-12' : 'max-w-4xl'}`.trim()}
      >
        {heading && <h2 className="font-display text-3xl text-ink">{heading}</h2>}

        <div className={`grid grid-cols-1 gap-8 sm:grid-cols-2 ${heading ? 'mt-8' : ''}`.trim()}>
          {programs.map((program) => (
            <article key={program.name}>
              <h3 className="font-display text-2xl text-ink">{program.name}</h3>
              {/* VERIFIED structural facts — exact literals from programs.ts (no prices/tiers). */}
              {program.billing && (
                <p className="mt-2 text-base font-semibold text-trust">
                  Billing: {program.billing}
                </p>
              )}
              {program.duration && (
                <p className="mt-2 text-base font-semibold text-trust">
                  {program.duration} in a single visit
                </p>
              )}
              {/* DRAFTED explainer — from the data file, not inlined. */}
              <p className="mt-3 text-base text-body">{program.explainer}</p>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <Button to="/maintenance-program">Learn about our programs</Button>
        </div>
      </div>
    </section>
  );
}
