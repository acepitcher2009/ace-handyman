import { useParams, Navigate } from 'react-router-dom';

import { SeoHead } from '../components/layout/SeoHead';
import { ServiceGrid } from '../components/sections/ServiceGrid';
import { TrustBand } from '../components/sections/TrustBand';
import { Map } from '../components/sections/Map';
import { ClosingCtaBlock } from '../components/sections/ClosingCtaBlock';

import { serviceAreas } from '../data/serviceAreas';
import { business } from '../data/business';

/**
 * ONE template over serviceAreas.ts — rendered for each of the 4 /service-areas/:slug
 * routes (not duplicated per town). Resolves the current ServiceArea from the route slug;
 * an unknown slug redirects home so no blank page renders.
 */
export function ServiceAreaPage() {
  const { slug } = useParams<{ slug: string }>();
  const area = serviceAreas.find((a) => a.slug === slug);
  if (!area) return <Navigate to="/" replace />;

  // Location <h1> built from data — never a hardcoded town name.
  const h1 = `Handyman in ${area.name}, TX`;

  return (
    <>
      <SeoHead
        title={area.metaTitle}
        description={area.metaDescription}
        path={`/service-areas/${area.slug}`}
      />
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <h1 className="font-display text-4xl text-ink">{h1}</h1>
        {/* DRAFTED area intro from data — never inlined. */}
        <p className="mt-4 max-w-3xl text-lg text-body">{area.intro}</p>
      </section>

      {/* Links to all 8 services — the 4×8 matrix. */}
      <ServiceGrid heading={`Services in ${area.name}`} />

      <TrustBand variant="area" currentAreaSlug={area.slug} />

      {/* Map ONLY when an address exists (single Map rule, Gaps §G-2 option a). No placeholder in v1. */}
      {business.address && (
        <section className="mx-auto w-full max-w-6xl px-6 py-12">
          <Map address={business.address} />
        </section>
      )}

      <ClosingCtaBlock />
    </>
  );
}
