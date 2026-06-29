export interface Testimonial {
  quote: string;
  attribution: string; // required — owned/permissioned source
  permissioned: true; // literal true — a non-permissioned entry is a type error
}

export interface ReviewsWidgetConfig {
  embedSrc: string | null; // null until a live Google embed source is supplied (PRD §10, Gaps G-5)
  setsCookies: boolean; // drives ConsentNotice gating
}

// Empty until the client supplies owned, permissioned testimonials with attribution.
// NO scraped third-party text; NO rating literal anywhere in this file (PRD §4.6, §8; CONVENTIONS §G).
export const testimonials: Testimonial[] = [];

export const reviewsWidget: ReviewsWidgetConfig = {
  embedSrc: null,
  setsCookies: false,
};

// Target for the "Leave us a Google review" CTA on the Reviews page.
// INTERIM value: a Google search for the business (name + location are VERIFIED facts), so the
// CTA works today and leads to the Google listing where customers post reviews AND photos.
// Replace with the exact write-a-review deep link once the Google Place ID is known:
//   https://search.google.com/local/writereview?placeid=<PLACE_ID>
// (Use Google's Place ID Finder to get <PLACE_ID>.) Set to null to hide the CTA entirely.
export const googleReviewUrl: string | null =
  'https://www.google.com/search?q=Ace+Handyman+Services+Bryan+College+Station';
