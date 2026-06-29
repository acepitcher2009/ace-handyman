import { Link } from 'react-router-dom';

import { serviceAreas } from '../../data/serviceAreas';

interface ServiceAreaLinksProps {
  /** Optional section heading; rendered as an <h2> when present. */
  heading?: string;
  className?: string;
}

export function ServiceAreaLinks({ heading, className = '' }: ServiceAreaLinksProps) {
  return (
    <section className={`px-4 py-12 ${className}`.trim()}>
      <div className="mx-auto max-w-4xl">
        {heading && <h2 className="font-display text-3xl text-ink">{heading}</h2>}
        <ul className={`flex flex-wrap gap-4 ${heading ? 'mt-6' : ''}`.trim()}>
          {serviceAreas.map((area) => (
            <li key={area.slug}>
              {/* Trust/ink color, NOT a CTA fill (CONVENTIONS §E single-CTA-color). Descriptive text = town name. */}
              <Link
                to={`/service-areas/${area.slug}`}
                className="inline-flex min-h-11 items-center rounded-md border border-line px-4 py-2 font-sans text-base font-semibold text-trust underline-offset-4 hover:bg-mist hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {area.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
