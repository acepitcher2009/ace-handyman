import { Link } from 'react-router-dom';

import { ServiceCard } from '../ui/ServiceCard';

import { services } from '../../data/services';

interface ServiceGridProps {
  /** Optional section heading; rendered as an <h2> when present. */
  heading?: string;
  /**
   * Cap the number of cards shown (teaser mode). Omit to show the full catalog
   * (the /services page and the per-area 4×8 matrix rely on the full list).
   */
  limit?: number;
  /** Optional "view all" link rendered below the grid (pairs with `limit` on the home teaser). */
  viewAllTo?: string;
  viewAllLabel?: string;
  className?: string;
}

export function ServiceGrid({
  heading,
  limit,
  viewAllTo,
  viewAllLabel = 'View all services',
  className = '',
}: ServiceGridProps) {
  const shown = limit ? services.slice(0, limit) : services;

  return (
    <section className={`px-4 py-16 ${className}`.trim()}>
      <div className="mx-auto max-w-6xl">
        {heading && <h2 className="font-display text-3xl text-ink">{heading}</h2>}
        <ul
          className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ${heading ? 'mt-8' : ''}`.trim()}
        >
          {shown.map((service) => (
            <li key={service.slug}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
        {viewAllTo && (
          <div className="mt-8">
            <Link
              to={viewAllTo}
              className="inline-flex min-h-11 items-center font-sans font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {viewAllLabel} →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
