import { useParams, Navigate, Link } from 'react-router-dom';

import { SeoHead } from '../components/layout/SeoHead';
import { ServiceAreaLinks } from '../components/sections/ServiceAreaLinks';
import { ClosingCtaBlock } from '../components/sections/ClosingCtaBlock';

import { services } from '../data/services';
import { serviceImages } from '../data/serviceImages';
import { programs } from '../data/programs';

/**
 * ONE template over services.ts — rendered for each of the 8 /services/:slug routes
 * (not duplicated per slug). Resolves the current Service from the route slug; an
 * unknown slug redirects to /services so no blank page renders.
 */
export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((s) => s.slug === slug);
  if (!service) return <Navigate to="/services" replace />;

  // §4.2.8 — the "8 hours" fact lives in programs.ts, never re-typed here.
  const fullDay = programs.find((p) => p.duration === '8 hours');
  // Decorative, illustrative category photo (see serviceImages.ts / IMAGE-CREDITS.md).
  const image = serviceImages[service.slug];

  return (
    <>
      <SeoHead
        title={service.metaTitle}
        description={service.metaDescription}
        path={`/services/${service.slug}`}
      />
      {/* Banner: decorative category image + dark overlay carrying the single <h1>. */}
      <section className="relative overflow-hidden px-6 py-20">
        {image && (
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover object-center"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/65 to-ink/40"
        />
        <div className="relative mx-auto w-full max-w-3xl">
          {/* Single <h1> with service + location keyword. */}
          <h1 className="font-display text-4xl text-surface">
            {service.title} in Bryan–College Station, TX
          </h1>
        </div>
      </section>

      <article className="mx-auto w-full max-w-3xl px-6 py-12">
        {/* DERIVED/DRAFTED description from data — no price/guarantee/turnaround added by the page. */}
        <p className="text-lg text-body">{service.description}</p>

        {/* §4.2.8 only — reference the Full Day Package (8 hours) from programs.ts, not a literal. */}
        {service.slug === 'general-home-repair' && fullDay && (
          <p className="mt-4 text-base text-body">
            Booking a focused push? Our {fullDay.name} gives you {fullDay.duration} of skilled help
            in a single visit —{' '}
            <Link
              to="/maintenance-program"
              className="text-primary underline-offset-4 hover:underline"
            >
              see the {fullDay.name}
            </Link>
            .
          </p>
        )}
      </article>

      {/* Completes the 4×8 matrix: every service-detail links to all 4 areas. */}
      <ServiceAreaLinks heading="Serving your area" />

      {/* One closing CTA → the Contact page (the form lives there, not inline). */}
      <ClosingCtaBlock />
    </>
  );
}
