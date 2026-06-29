import { SeoHead } from '../components/layout/SeoHead';
import { PortfolioGrid } from '../components/sections/PortfolioGrid';

export function PortfolioPage() {
  return (
    <>
      <SeoHead
        title="Our Work | Ace Handyman Services - Bryan College Station"
        description="See past handyman and home-repair projects across College Station, Bryan, and Brazos County. Request an estimate for yours."
        path="/portfolio"
      />
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <h1 className="font-display text-4xl text-ink">Our Work in Bryan–College Station</h1>
      </section>
      {/* PortfolioGrid shows its empty-state (with CTA) while portfolio is []. No fabricated projects. */}
      <PortfolioGrid />
    </>
  );
}
