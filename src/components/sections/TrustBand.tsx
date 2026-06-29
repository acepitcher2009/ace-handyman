import { ShieldCheck, UserCheck, BadgeCheck, Store } from 'lucide-react';

import { CredentialBadge } from '../ui/CredentialBadge';
import { ReviewsWidget } from './ReviewsWidget';

import { business, flags } from '../../data/business';
import { serviceAreas } from '../../data/serviceAreas';

interface TrustBandProps {
  /** 'home' = neutral; 'area' = lead the area summary with the current town. */
  variant?: 'home' | 'area';
  /** Slug of the current service area, when variant === 'area'. */
  currentAreaSlug?: string;
  className?: string;
}

/**
 * Recurring trust strip (PRD §2/§4.1/§4.3). Three §G rules converge here:
 *  - VERIFIED "28+ years" with scope-implying phrasing ONLY when flags.tenureScopeConfirmed;
 *  - flag-gated CredentialBadges (each gated at this call site on its flags.* boolean);
 *  - the live, never-hardcoded rating (delegated entirely to ReviewsWidget).
 * Trust accents use text-trust — never the CTA color.
 */
export function TrustBand({ variant = 'home', currentAreaSlug, className = '' }: TrustBandProps) {
  // VERIFIED "28+ years" — scope-implying phrasing ONLY when tenureScopeConfirmed is true (CONVENTIONS §G).
  const tenureText = flags.tenureScopeConfirmed
    ? `${business.tenureYears}+ years serving Bryan–College Station`
    : `${business.tenureYears}+ years in business`;

  // Area summary built from data — not a hardcoded literal list.
  const areaNames = serviceAreas.map((a) => a.name);
  const currentAreaName =
    variant === 'area' && currentAreaSlug
      ? serviceAreas.find((a) => a.slug === currentAreaSlug)?.name
      : undefined;
  const areaSummary = currentAreaName
    ? `Serving ${currentAreaName} and the wider Brazos County area`
    : `Serving ${areaNames.slice(0, -1).join(', ')}, and ${areaNames[areaNames.length - 1]}`;

  return (
    <section aria-label="Why choose us" className={`bg-mist ${className}`.trim()}>
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
        <ul className="flex flex-col gap-3">
          <li className="text-lg font-semibold text-trust">{tenureText}</li>
          <li className="text-base text-body">{areaSummary}</li>
          {/* Flag-gated credential badges — none render in v1 (all flags default false). */}
          <li className="flex flex-wrap gap-2">
            {flags.insuredBonded && <CredentialBadge icon={ShieldCheck} label="Insured & bonded" />}
            {flags.backgroundChecks && (
              <CredentialBadge icon={UserCheck} label="Background-checked craftsmen" />
            )}
            {flags.nationalGuarantee && (
              <CredentialBadge icon={BadgeCheck} label="Backed by a national guarantee" />
            )}
            {flags.aceHardwareAffiliation && (
              <CredentialBadge icon={Store} label="Part of the Ace family" />
            )}
          </li>
        </ul>

        {/* Live rating — surfaced ONLY via ReviewsWidget. No hardcoded rating in this file. */}
        <div className="w-full md:max-w-sm">
          <ReviewsWidget />
        </div>
      </div>
    </section>
  );
}
