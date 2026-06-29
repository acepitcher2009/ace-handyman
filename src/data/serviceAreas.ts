import type { Provenance } from './business';

export interface ServiceArea {
  slug: string;
  name: string;
  isPrimary?: boolean;
  intro: string; // DRAFTED — exact from PRD §4.3.x
  provenance: Extract<Provenance, 'DRAFTED'>;
  draft: true;
  metaTitle: string;
  metaDescription: string;
}

export const serviceAreas: ServiceArea[] = [
  {
    slug: 'college-station',
    name: 'College Station',
    isPrimary: true,
    intro:
      'Handyman and home-repair services for College Station, TX. From drywall and door ' +
      'repairs to bathroom updates and built-ins, we help College Station homeowners and ' +
      'businesses get projects done right.',
    provenance: 'DRAFTED',
    draft: true,
    metaTitle: 'Handyman in College Station, TX | Ace Handyman Services',
    metaDescription:
      'Drywall, doors, bathrooms, and more for College Station, TX homes and businesses. ' +
      'Request an estimate.',
  },
  {
    slug: 'bryan',
    name: 'Bryan',
    intro:
      'Local handyman services in Bryan, TX — home and commercial repairs handled by ' +
      'experienced craftsmen serving the Bryan community.',
    provenance: 'DRAFTED',
    draft: true,
    metaTitle: 'Handyman in Bryan, TX | Ace Handyman Services',
    metaDescription:
      'Home and commercial handyman services in Bryan, TX from experienced local craftsmen. ' +
      'Request an estimate.',
  },
  {
    slug: 'caldwell',
    name: 'Caldwell',
    intro: 'Handyman and home-repair services for Caldwell, TX and the surrounding area.',
    provenance: 'DRAFTED',
    draft: true,
    metaTitle: 'Handyman in Caldwell, TX | Ace Handyman Services',
    metaDescription:
      'Handyman and home-repair services for Caldwell, TX and the surrounding area. Request an ' +
      'estimate.',
  },
  {
    slug: 'brazos-county',
    name: 'Brazos County',
    intro:
      'Serving Brazos County and the surrounding Bryan–College Station region with dependable ' +
      'handyman and home-repair services.',
    provenance: 'DRAFTED',
    draft: true,
    metaTitle: 'Handyman in Brazos County, TX | Ace Handyman Services',
    metaDescription:
      'Dependable handyman and home-repair services across Brazos County and the Bryan–College ' +
      'Station region. Request an estimate.',
  },
];
