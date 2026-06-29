import { Button } from '../ui/Button';
// Decorative texture — generic tools flat-lay (Pexels, see IMAGE-CREDITS.md), held far
// behind a dark gradient at low opacity so the white CTA copy stays AA-legible.
import toolsTexture from '../../assets/photos/tools-band.jpg';

interface ClosingCtaBlockProps {
  /** Section heading; rendered as an <h2>. */
  heading?: string;
  /** Supporting line under the heading. */
  body?: string;
  className?: string;
}

export function ClosingCtaBlock({
  heading = 'Ready to get started?',
  body = "Tell us about your project and we'll get back to you with an estimate.",
  className = '',
}: ClosingCtaBlockProps) {
  return (
    <section className={`px-4 py-16 ${className}`.trim()}>
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-lg bg-ink p-6 sm:p-12">
        {/* Decorative textured background + dark gradient for contrast. */}
        <img
          src={toolsTexture}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 size-full object-cover opacity-15"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-ink/90 to-trust/80"
        />

        <div className="relative">
          <h2 className="font-display text-3xl text-surface">{heading}</h2>
          <p className="mt-6 text-base text-surface/85">{body}</p>
          {/* Single CTA color — shared Button primary (Ace Red), the only CTA on the dark panel. */}
          <div className="mt-6">
            <Button to="/contact">Request an Estimate</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
