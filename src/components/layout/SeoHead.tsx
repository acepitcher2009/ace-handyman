import { Helmet } from 'react-helmet-async';

import { business } from '../../data/business';
import { services } from '../../data/services';
import { serviceAreas } from '../../data/serviceAreas';

interface SeoHeadProps {
  /** Page <title> — unique per route. */
  title: string;
  /** Meta description — unique per route. */
  description: string;
  /** Route path beginning with '/', e.g. '/services/drywall-ceiling-repair'. */
  path: string;
  /** Absolute or root-relative OG/Twitter image; optional. */
  ogImage?: string;
  /** Override og:type (default 'website'). */
  ogType?: 'website' | 'article';
  /** Emit <meta name="robots" content="noindex"> (e.g. the 404 page). Default false. */
  noindex?: boolean;
}

export function SeoHead({
  title,
  description,
  path,
  ogImage,
  ogType = 'website',
  noindex = false,
}: SeoHeadProps) {
  // Canonical/url only when the site's own domain is known
  // (business.siteUrl may be null — plan Gaps §G-6).
  const canonical = business.siteUrl ? `${business.siteUrl}${path}` : null;

  // Assemble JSON-LD with NAP keys present ONLY when their source is non-null (CONVENTIONS §G).
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: business.name,
    areaServed: serviceAreas.map((area) => area.name),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Handyman services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service.title },
      })),
    },
  };

  if (canonical) jsonLd.url = canonical;

  if (business.address) {
    // Map the data-file PostalAddress shape (street/city/region/postalCode) onto
    // schema.org keys. Rendered only while business.address is non-null (CONVENTIONS §G).
    jsonLd.address = {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: 'US',
    };
  }

  if (business.phone) jsonLd.telephone = business.phone;

  if (business.hours) {
    // Map the data-file OpeningHours shape (days/opens/closes) onto a
    // schema.org OpeningHoursSpecification. Rendered only while hours are non-null.
    jsonLd.openingHoursSpecification = {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: business.hours.days,
      opens: business.hours.opens,
      closes: business.hours.closes,
    };
  }

  // NOTE: no `geo` until address/coordinates present; no `aggregateRating`
  // (live-data only — never a hardcoded literal); no `priceRange` (PRD §7).

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex" />}
      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {canonical && <meta property="og:url" content={canonical} />}
      {ogImage && <meta property="og:image" content={ogImage} />}

      <meta name="twitter:card" content={ogImage ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
