import { SeoHead } from '../components/layout/SeoHead';
import { ClosingCtaBlock } from '../components/sections/ClosingCtaBlock';

import { programs } from '../data/programs';

export function MaintenanceProgramPage() {
  return (
    <>
      <SeoHead
        title="Maintenance Program & Full Day Package | Ace Handyman Services"
        description="Keep a trusted craftsman on call with our Maintenance Program (yearly or quarterly) or book a Full Day Package (8 hours). Request an estimate."
        path="/maintenance-program"
      />
      <section className="mx-auto w-full max-w-3xl px-6 py-12">
        <h1 className="font-display text-4xl text-ink">
          Maintenance Program &amp; Full Day Package
        </h1>
        <div className="mt-6 flex flex-col gap-6">
          {programs.map((program) => (
            <article key={program.name} className="rounded-lg bg-mist p-6">
              <h2 className="font-display text-2xl text-ink">{program.name}</h2>
              {/* VERIFIED structural facts — exact literals from data ("yearly or quarterly" / "8 hours"). */}
              {program.billing && (
                <p className="mt-2 text-base font-semibold text-trust">
                  Billing: {program.billing}
                </p>
              )}
              {program.duration && (
                <p className="mt-2 text-base font-semibold text-trust">
                  Duration: {program.duration}
                </p>
              )}
              {/* DRAFTED explainer — from data; the two recombine to the PRD §4.7 paragraph. No prices. */}
              <p className="mt-3 text-base text-body">{program.explainer}</p>
            </article>
          ))}
        </div>
      </section>
      <ClosingCtaBlock heading="Sign up or request an estimate" />
    </>
  );
}
