import { SeoHead } from '../components/layout/SeoHead';
import { EstimateForm } from '../components/sections/EstimateForm';
import { NapBlock } from '../components/sections/NapBlock';
import { Map } from '../components/sections/Map';
import { ServiceAreaLinks } from '../components/sections/ServiceAreaLinks';

import { business } from '../data/business';

export function ContactPage() {
  return (
    <>
      <SeoHead
        title="Request an Estimate | Ace Handyman Services - Bryan College Station"
        description="Tell us about your project in College Station, Bryan, Caldwell, or Brazos County and request a free estimate."
        path="/contact"
      />
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        {/* Single <h1> (location keyword); EstimateForm's page heading is an <h2>. */}
        <h1 className="font-display text-4xl text-ink">
          Request an Estimate in Bryan–College Station
        </h1>
        <div className="mt-8 grid gap-12 md:grid-cols-2">
          {/* Centerpiece form (page variant) — renders, validates, success state. */}
          <EstimateForm variant="page" />
          <div className="flex flex-col gap-8">
            {/* Name always; each NAP field only when present; no placeholder. */}
            <NapBlock />
            {/* Map ONLY when an address exists (single Map rule, Gaps §G-2). No placeholder in v1. */}
            {business.address && <Map address={business.address} />}
            {/* Service-area summary. */}
            <ServiceAreaLinks heading="Areas we serve" />
          </div>
        </div>
      </section>
    </>
  );
}
