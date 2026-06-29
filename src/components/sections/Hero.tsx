import { Button } from '../ui/Button';

import { siteCopy } from '../../data/business';
// Decorative hero photo — generic interior-renovation stock (Pexels, see IMAGE-CREDITS.md);
// NOT a photo of Ace's own work. Rendered behind a dark overlay with empty alt (decorative).
import heroImage from '../../assets/photos/hero.jpg';

interface HeroProps {
  className?: string;
}

export function Hero({ className = '' }: HeroProps) {
  return (
    <section className={`relative overflow-hidden px-4 py-24 sm:py-32 ${className}`.trim()}>
      {/* Decorative background image + dark gradient overlay for legible white text (AA). */}
      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/70 to-ink/40"
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-start gap-6">
        {/* The page delegates its single <h1> to the hero (PRD §4.1, §7); copy from data, never inlined. */}
        <h1 className="font-display text-4xl text-surface sm:text-5xl">
          {siteCopy.heroHeadline.text}
        </h1>
        <p className="max-w-2xl text-lg text-surface/90">{siteCopy.heroSubhead.text}</p>
        <Button to="/contact">Request an Estimate</Button>
      </div>
    </section>
  );
}
