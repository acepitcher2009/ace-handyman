import { ShieldCheck, UserCheck, BadgeCheck, Store } from 'lucide-react';

import { SeoHead } from '../components/layout/SeoHead';
import { TrustBand } from '../components/sections/TrustBand';
import { CredentialBadge } from '../components/ui/CredentialBadge';

import { flags } from '../data/business';

export function CredentialsPage() {
  // Render the badge list only when at least one credential is confirmed — in v1 all flags
  // are false, so no badge (and no empty <ul>) renders; only VERIFIED trust content shows.
  const hasAnyCredential =
    flags.insuredBonded ||
    flags.backgroundChecks ||
    flags.nationalGuarantee ||
    flags.aceHardwareAffiliation;

  return (
    <>
      <SeoHead
        title="Our Credentials | Ace Handyman Services - Bryan College Station"
        description="Why homeowners and businesses across Bryan–College Station trust us. Request an estimate."
        path="/credentials"
      />
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <h1 className="font-display text-4xl text-ink">Why Trust Us</h1>
        {/* Flag-gated credential badges — each gated at the call site (CONVENTIONS §G).
            NONE render in v1 (all flags false); no unconfirmed claim is asserted. */}
        {hasAnyCredential && (
          <ul className="mt-6 flex flex-wrap gap-3">
            {flags.insuredBonded && (
              <li>
                <CredentialBadge icon={ShieldCheck} label="Insured & bonded" />
              </li>
            )}
            {flags.backgroundChecks && (
              <li>
                <CredentialBadge icon={UserCheck} label="Background-checked craftsmen" />
              </li>
            )}
            {flags.nationalGuarantee && (
              <li>
                <CredentialBadge icon={BadgeCheck} label="Backed by a national guarantee" />
              </li>
            )}
            {flags.aceHardwareAffiliation && (
              <li>
                <CredentialBadge icon={Store} label="Part of the Ace family" />
              </li>
            )}
          </ul>
        )}
      </section>
      {/* VERIFIED trust content: scope-gated tenure + area + live reviews. */}
      <TrustBand variant="home" />
    </>
  );
}
