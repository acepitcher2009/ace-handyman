import { SeoHead } from '../components/layout/SeoHead';
import { ServiceGrid } from '../components/sections/ServiceGrid';
import { ProgramsTeaser } from '../components/sections/ProgramsTeaser';
import { ClosingCtaBlock } from '../components/sections/ClosingCtaBlock';

import { siteCopy } from '../data/business';

export function ServicesPage() {
  return (
    <>
      <SeoHead
        title="Handyman Services in Bryan–College Station, TX | Ace Handyman Services"
        description="Drywall, carpentry, doors, bathrooms, commercial repairs, and more across College Station, Bryan, and Brazos County. Request an estimate."
        path="/services"
      />
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <h1 className="font-display text-4xl text-ink">
          Handyman Services in Bryan–College Station, TX
        </h1>
        {/* DRAFTED hub intro — from data, never inlined. */}
        <p className="mt-4 max-w-3xl text-lg text-body">{siteCopy.servicesHubIntro.text}</p>
      </section>
      <ServiceGrid heading="Our Services" />
      <ProgramsTeaser variant="callout" heading="Maintenance Program & Full Day Package" />
      <ClosingCtaBlock />
    </>
  );
}
