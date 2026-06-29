// Shared provenance marker used across the data layer.
export type Provenance = 'VERIFIED' | 'DERIVED' | 'DRAFTED';

export interface PostalAddress {
  street: string;
  city: string;
  region: string; // e.g. 'TX'
  postalCode: string;
}

export interface OpeningHours {
  // Populated only when full hours are supplied (PRD §10 — currently only "Open" is known).
  days: string; // e.g. 'Mon–Fri'
  opens: string; // e.g. '08:00'
  closes: string; // e.g. '17:00'
}

export interface ConfirmationFlags {
  insuredBonded: boolean; // PRD §8 NEEDS-CONFIRMATION
  backgroundChecks: boolean; // PRD §8 NEEDS-CONFIRMATION
  nationalGuarantee: boolean; // PRD §8 NEEDS-CONFIRMATION
  aceHardwareAffiliation: boolean; // PRD §8 NEEDS-CONFIRMATION
  tenureScopeConfirmed: boolean; // gates scope-implying "28+ years" phrasing
  ownerNamePublic: boolean; // gates naming the owner ("Blake") on About
}

export interface FeatureFlags {
  photoUpload: boolean; // Gaps G-4 — EmailJS attachment support; enable when backend confirmed
}

export interface BusinessData {
  name: string; // VERIFIED — exact
  phone: string | null; // MISSING — PRD §10
  email: string | null; // MISSING — PRD §10
  address: PostalAddress | null; // MISSING — also gates Map + geo schema
  hours: OpeningHours | null; // MISSING — only "Open" known
  ownerName: string | null; // NEEDS-CONFIRMATION — null until confirmed
  siteUrl: string | null; // Gaps G-6 — own domain is a §10 open item
  tenureYears: number; // VERIFIED — 28 ("28+ years")
}

export interface DraftedCopy {
  text: string;
  provenance: 'DRAFTED';
  draft: true;
}

export interface SiteCopy {
  heroHeadline: DraftedCopy;
  heroSubhead: DraftedCopy;
  servicesHubIntro: DraftedCopy;
  aboutNarrative: DraftedCopy;
  reviewsFraming: DraftedCopy;
  formSuccess: DraftedCopy;
}

export const business: BusinessData = {
  name: 'Ace Handyman Services - Bryan College Station',
  phone: null,
  email: null,
  address: null,
  hours: null,
  ownerName: null,
  siteUrl: null,
  tenureYears: 28,
};

export const flags: ConfirmationFlags = {
  insuredBonded: false,
  backgroundChecks: false,
  nationalGuarantee: false,
  aceHardwareAffiliation: false,
  tenureScopeConfirmed: false,
  ownerNamePublic: false,
};

export const features: FeatureFlags = {
  photoUpload: false,
};

// DRAFTED copy — exact text from PRD §4; review before launch.
export const siteCopy: SiteCopy = {
  heroHeadline: {
    text: 'Trusted handyman and home-repair services in Bryan–College Station.',
    provenance: 'DRAFTED',
    draft: true,
  },
  heroSubhead: {
    text:
      'From drywall and door repairs to bathroom updates and built-ins — local craftsmen ' +
      'serving College Station, Bryan, Caldwell, and Brazos County.',
    provenance: 'DRAFTED',
    draft: true,
  },
  servicesHubIntro: {
    text:
      'We handle a wide range of home and commercial repair and improvement projects across ' +
      'the Bryan–College Station area. Explore our services below, or request an estimate and ' +
      'tell us what you need.',
    provenance: 'DRAFTED',
    draft: true,
  },
  aboutNarrative: {
    text:
      "For more than 28 years, we've been helping homeowners and businesses across " +
      'Bryan–College Station tackle repairs and improvements of every size. We take pride in ' +
      'careful, respectful work — showing up on time, cleaning up after ourselves, and ' +
      'standing behind the job.',
    provenance: 'DRAFTED',
    draft: true,
  },
  reviewsFraming: {
    text: 'See what our customers across Bryan–College Station have to say.',
    provenance: 'DRAFTED',
    draft: true,
  },
  formSuccess: {
    text: "Thanks — we've received your request and will get back to you soon.",
    provenance: 'DRAFTED',
    draft: true,
  },
};
