import { useConsent } from '../layout/useConsent';

import { business } from '../../data/business';

import type { PostalAddress } from '../../data/business';

interface MapProps {
  /** Required, non-null — the type proves an address exists (CONVENTIONS §G). */
  address: PostalAddress;
  /** Set true if the embed provider sets cookies; defers behind consent. */
  setsCookies?: boolean;
  className?: string;
}

/**
 * Embedded location map (PRD §4.3/§4.9/§7).
 *
 * SINGLE MAP RULE (plan Gaps §G-2 option a): rendered ONLY when business.address is present.
 * The call site gates with {business.address && <Map address={business.address} />}; because
 * MapProps.address is non-null, TypeScript proves an address exists inside this component, so
 * Map can never render without one. There is NO empty box / placeholder path — when there is
 * no address, Map is simply not rendered. Area-level / town-centroid maps are deferred (option b).
 */
export function Map({ address, setsCookies = false, className = '' }: MapProps) {
  const consent = useConsent();

  // Build the map query from the address fields — never a hardcoded address literal.
  const query = encodeURIComponent(
    `${address.street}, ${address.city}, ${address.region} ${address.postalCode}`
  );
  const src = `https://www.google.com/maps?q=${query}&output=embed`;

  // CONSENT GATE: defer a cookie-setting embed until consent is granted (PRD §5).
  if (setsCookies && consent !== 'granted') {
    return (
      <p className={`rounded-md bg-mist p-6 text-center text-base text-body ${className}`.trim()}>
        Accept embedded content to load the map.
      </p>
    );
  }

  return (
    <div className={className}>
      <iframe
        title={`Map to ${business.name}`}
        src={src}
        className="h-72 w-full rounded-md border border-line"
        loading="lazy"
      />
    </div>
  );
}
