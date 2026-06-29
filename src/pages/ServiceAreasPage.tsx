import { SeoHead } from '../components/layout/SeoHead';
import { ServiceAreaLinks } from '../components/sections/ServiceAreaLinks';

/**
 * The /service-areas hub (route in nav.ts and the route table). The page stories did not
 * deliver a dedicated hub, so this is a minimal compliant index: its own SeoHead, a single
 * <h1>, and the reused ServiceAreaLinks listing the 4 towns (each linking to its
 * /service-areas/:slug page). Token-clean — introduces no raw hex/arbitrary values.
 */
export function ServiceAreasPage() {
  return (
    <>
      <SeoHead
        title="Service Areas | Ace Handyman Services - Bryan College Station"
        description="Handyman and home-repair services across College Station, Bryan, Caldwell, and Brazos County, TX. Request an estimate."
        path="/service-areas"
      />
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <h1 className="font-display text-4xl text-ink">Service Areas in Bryan–College Station</h1>
        <p className="mt-4 max-w-3xl text-lg text-body">
          We serve homeowners and businesses across the Bryan–College Station region. Choose your
          area below to learn more, or request an estimate and tell us what you need.
        </p>
      </section>
      {/* Reused links section — lists the 4 serviceAreas, each to its /service-areas/:slug page. */}
      <ServiceAreaLinks />
    </>
  );
}
