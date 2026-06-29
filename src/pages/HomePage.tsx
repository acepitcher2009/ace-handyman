import { SeoHead } from '../components/layout/SeoHead';
import { Hero } from '../components/sections/Hero';
import { TrustBand } from '../components/sections/TrustBand';
import { ServiceGrid } from '../components/sections/ServiceGrid';
import { ServiceAreaLinks } from '../components/sections/ServiceAreaLinks';
import { ProgramsTeaser } from '../components/sections/ProgramsTeaser';
import { ClosingCtaBlock } from '../components/sections/ClosingCtaBlock';

export function HomePage() {
  return (
    <>
      <SeoHead
        title="Handyman in Bryan–College Station, TX | Ace Handyman Services"
        description="Trusted local handyman and home-repair services across College Station, Bryan, Caldwell, and Brazos County. Request an estimate."
        path="/"
      />
      {/* Hero owns the single <h1> (location keyword). */}
      <Hero />
      <TrustBand variant="home" />
      {/* Teaser: a subset of services that links out to the full /services catalog. */}
      <ServiceGrid heading="Our services" limit={6} viewAllTo="/services" />
      {/* Subtle banding for visual rhythm between full-bleed sections. */}
      <ServiceAreaLinks heading="Areas we serve" className="bg-mist" />
      <ProgramsTeaser variant="teaser" heading="Ongoing help, on your schedule" />
      <ClosingCtaBlock />
    </>
  );
}
