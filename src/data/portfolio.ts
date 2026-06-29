export interface PortfolioItem {
  src: string; // image path/URL — supplied by client
  alt: string; // required descriptive alt text (PRD §4.4, §7)
  serviceSlug?: string; // tag for service×area matrix linking
  areaSlug?: string;
}

// Empty until the client supplies real project photos (PRD §4.4, §10; Gaps G-3 own file).
// PortfolioGrid renders its empty-state with a CTA while this is empty. No fabricated projects.
export const portfolio: PortfolioItem[] = [];
