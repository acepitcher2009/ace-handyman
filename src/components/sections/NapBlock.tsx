import { business } from '../../data/business';

interface NapBlockProps {
  className?: string;
}

/**
 * Name-Address-Phone block (PRD §4.9/§7) — the canonical expression of CONVENTIONS §G:
 * business.name renders always (VERIFIED, exact); address/phone/email/hours each render
 * ONLY when present (non-null), never a placeholder. tel:/mailto: are real links (text-primary
 * as LINK color, not a CTA button).
 *
 * CONSISTENCY CONTRACT (PRD §7): NapBlock, Footer (#15), and the SeoHead JSON-LD (#02) all read
 * the SAME business.ts source, so the NAP cannot drift across header/footer/contact/schema.
 */
export function NapBlock({ className = '' }: NapBlockProps) {
  const { name, address, phone, email, hours } = business;

  return (
    <address className={`not-italic ${className}`.trim()}>
      {/* Name — VERIFIED, always rendered, exactly. */}
      <p className="font-display text-2xl text-ink">{name}</p>

      <dl className="mt-4 flex flex-col gap-3 text-base text-body">
        {/* Each row renders ONLY when its field is present — never a placeholder (CONVENTIONS §G). */}
        {address && (
          <div>
            <dt className="font-semibold text-ink">Address</dt>
            <dd className="mt-1">
              {address.street}, {address.city}, {address.region} {address.postalCode}
            </dd>
          </div>
        )}

        {phone && (
          <div>
            <dt className="font-semibold text-ink">Phone</dt>
            <dd className="mt-1">
              {/* tel: link — tap-to-call on mobile. text-primary here is LINK color, not a CTA button. */}
              <a href={`tel:${phone}`} className="text-primary underline-offset-4 hover:underline">
                {phone}
              </a>
            </dd>
          </div>
        )}

        {email && (
          <div>
            <dt className="font-semibold text-ink">Email</dt>
            <dd className="mt-1">
              <a
                href={`mailto:${email}`}
                className="text-primary underline-offset-4 hover:underline"
              >
                {email}
              </a>
            </dd>
          </div>
        )}

        {hours && (
          <div>
            <dt className="font-semibold text-ink">Hours</dt>
            <dd className="mt-1">
              {hours.days}: {hours.opens}&ndash;{hours.closes}
            </dd>
          </div>
        )}
      </dl>
    </address>
  );
}
