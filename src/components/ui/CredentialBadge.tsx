import type { LucideIcon } from 'lucide-react';

interface CredentialBadgeProps {
  /** Accessible text — carries the meaning (icon is decorative). */
  label: string;
  /** Decorative lucide icon component; rendered aria-hidden. */
  icon: LucideIcon;
  className?: string;
}

/**
 * Presentational trust badge — icon + label in the trust accent (Steel Blue / text-trust).
 *
 * CONTRACT (CONVENTIONS §G): this component DOES NOT assert anything and DOES NOT read
 * any ConfirmationFlags. The PARENT must render it only when the matching flag is true:
 *   {flags.insuredBonded && <CredentialBadge icon={ShieldCheck} label="Insured & bonded" />}
 * Never render a CredentialBadge unconditionally, and never import `flags` into this file.
 *
 * Trust accent only — never the CTA color (Ace Red is reserved for the Button primitive).
 */
export function CredentialBadge({ label, icon: Icon, className = '' }: CredentialBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-md bg-mist px-4 py-3 text-trust ${className}`.trim()}
    >
      <Icon className="size-5 text-trust" aria-hidden="true" />
      <span className="font-sans text-base font-semibold">{label}</span>
    </div>
  );
}
