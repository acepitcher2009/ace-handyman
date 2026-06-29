import { Link } from 'react-router-dom';

import { navItems } from '../../data/nav';
import { serviceAreas } from '../../data/serviceAreas';
import { business } from '../../data/business';

interface FooterProps {
  className?: string;
}

const linkClasses =
  'inline-flex min-h-11 items-center text-base text-body hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

export function Footer({ className = '' }: FooterProps) {
  return (
    <footer className={`border-t border-line bg-mist text-body ${className}`.trim()}>
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-12 md:grid-cols-4">
        {/* Brand — the single persistent estimate CTA lives in the header, not here. */}
        <div className="flex flex-col gap-4 md:col-span-1">
          <p className="font-display text-lg font-extrabold text-ink">{business.name}</p>
        </div>

        {/* Secondary nav — distinct landmark from the header's "Primary" nav. */}
        <nav aria-label="Footer" className="md:col-span-1">
          <h2 className="text-base font-semibold text-ink">Explore</h2>
          <ul className="mt-3 flex flex-col gap-1">
            {navItems
              .filter((item) => !item.isCta)
              .map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className={linkClasses}>
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        {/* Service areas */}
        <div className="md:col-span-1">
          <h2 className="text-base font-semibold text-ink">Service Areas</h2>
          <ul className="mt-3 flex flex-col gap-1">
            {serviceAreas.map((area) => (
              <li key={area.slug}>
                <Link to={`/service-areas/${area.slug}`} className={linkClasses}>
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Conditional NAP — each row ONLY when its field is present (CONVENTIONS §G). No placeholders. */}
        <div className="md:col-span-1">
          <h2 className="text-base font-semibold text-ink">Contact</h2>
          <address className="mt-3 flex flex-col gap-1 not-italic">
            {business.address && (
              <span className="text-base text-body">
                {business.address.street}, {business.address.city}, {business.address.region}{' '}
                {business.address.postalCode}
              </span>
            )}
            {business.phone && (
              <a href={`tel:${business.phone}`} className={linkClasses}>
                {business.phone}
              </a>
            )}
            {business.email && (
              <a href={`mailto:${business.email}`} className={linkClasses}>
                {business.email}
              </a>
            )}
            {business.hours && (
              <span className="text-base text-body">
                {business.hours.days} {business.hours.opens}–{business.hours.closes}
              </span>
            )}
          </address>
          {/* If every NAP field is null (current state), the <address> renders no rows — and no placeholder. */}
        </div>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto w-full max-w-7xl px-4 py-6 text-sm text-body">
          © {new Date().getFullYear()} {business.name}
        </p>
      </div>
    </footer>
  );
}
