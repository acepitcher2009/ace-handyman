import { SeoHead } from '../components/layout/SeoHead';
import { TrustBand } from '../components/sections/TrustBand';

import { business, flags, siteCopy } from '../data/business';

export function AboutPage() {
  return (
    <>
      <SeoHead
        title="About | Ace Handyman Services - Bryan College Station"
        description="Local handyman and home-repair craftsmen serving Bryan–College Station for more than 28 years. Request an estimate."
        path="/about"
      />
      <section className="mx-auto w-full max-w-3xl px-6 py-12">
        <h1 className="font-display text-4xl text-ink">About {business.name}</h1>
        {/* DRAFTED narrative — from data, never inlined. No invented history/staff counts. */}
        <p className="mt-4 text-lg text-body">{siteCopy.aboutNarrative.text}</p>

        {/* Owner named ONLY if confirmed public AND present. Not named in v1. */}
        {flags.ownerNamePublic && business.ownerName && (
          <p className="mt-4 text-base text-body">
            Our business is led by {business.ownerName}, who personally responds to customer
            reviews.
          </p>
        )}
        {/* National-brand affiliation ONLY if confirmed. Not asserted in v1. */}
        {flags.aceHardwareAffiliation && (
          <p className="mt-4 text-base text-body">Proud to be part of the Ace family.</p>
        )}
      </section>
      {/* Tenure scope is gated inside TrustBand (flags.tenureScopeConfirmed). */}
      <TrustBand variant="home" />
    </>
  );
}
