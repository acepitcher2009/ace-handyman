import type { Provenance } from './business';

export interface Service {
  slug: string;
  title: string;
  summary: string; // one-line, for ServiceCard / grid
  description: string; // DRAFTED detail copy — exact from PRD §4.2.x
  iconName: string; // lucide-react icon name (decorative; aria-hidden at render)
  provenance: Extract<Provenance, 'DERIVED'>;
  basis: string; // PRD §8 DERIVED evidence basis
  draft: true; // descriptions are DRAFTED — confirm before launch
  metaTitle: string;
  metaDescription: string;
}

export const services: Service[] = [
  {
    slug: 'drywall-ceiling-repair',
    title: 'Drywall & Ceiling Repair',
    summary: 'Clean, careful drywall and ceiling repairs that blend right in.',
    description:
      'Drywall and ceiling repair done cleanly and carefully — including sheetrock and ceiling ' +
      'repairs and water-damage ceiling restoration, with attention to dust containment and a ' +
      'finish that blends in.',
    iconName: 'Wrench',
    provenance: 'DERIVED',
    basis:
      'Review evidence — ceiling repair after a ceiling was stepped through with careful dust ' +
      'containment; water-damage ceiling repair where the repair was undetectable.',
    draft: true,
    metaTitle: 'Drywall & Ceiling Repair in Bryan–College Station, TX',
    metaDescription:
      'Drywall repair and water-damage ceiling restoration in College Station, Bryan, and ' +
      'Brazos County. Request an estimate.',
  },
  {
    slug: 'carpentry-built-ins',
    title: 'Carpentry & Built-ins',
    summary: 'Custom carpentry and built-in shelving, built solid and level.',
    description: 'Custom carpentry and built-in shelving, built solid and level for everyday use.',
    iconName: 'Hammer',
    provenance: 'DERIVED',
    basis: 'Review evidence — built-in shelving construction.',
    draft: true,
    metaTitle: 'Carpentry & Built-ins in Bryan–College Station, TX',
    metaDescription:
      'Custom carpentry and built-in shelving for homes and businesses across College Station ' +
      'and Bryan, TX. Request an estimate.',
  },
  {
    slug: 'furniture-fixture-assembly',
    title: 'Furniture & Fixture Assembly',
    summary: 'Furniture assembly and securely mounted fixtures.',
    description:
      'Furniture assembly and fixture installation — from putting together new furniture to ' +
      'securely mounting ceiling-hung racks anchored to carry their load safely.',
    iconName: 'PackageOpen',
    provenance: 'DERIVED',
    basis:
      'Review evidence — assembling new furniture; ceiling-mounted dish/pot rack installation, ' +
      'solid/level/anchored.',
    draft: true,
    metaTitle: 'Furniture & Fixture Assembly in Bryan–College Station, TX',
    metaDescription:
      'Furniture assembly and secure fixture mounting in College Station, Bryan, and Brazos ' +
      'County. Request an estimate.',
  },
  {
    slug: 'door-repair-installation',
    title: 'Doors — Repair & Installation',
    summary: 'Door repair and installation, including sliding doors.',
    description:
      'Door repair and installation, including sliding-door installs and fixing doors that ' +
      "stick, drag, or won't latch.",
    iconName: 'DoorOpen',
    provenance: 'DERIVED',
    basis: 'Review evidence — sliding door installation; `door repair` keyword tag, frequency 10.',
    draft: true,
    metaTitle: 'Door Repair & Installation in Bryan–College Station, TX',
    metaDescription:
      'Door repair and installation, including sliding doors, across College Station, Bryan, ' +
      'and Caldwell, TX. Request an estimate.',
  },
  {
    slug: 'bathroom-remodeling',
    title: 'Bathroom Remodeling',
    summary: 'Detail-oriented bathroom updates and remodels.',
    description:
      'Bathroom updates and remodels handled as detail-oriented, multi-day projects, with the ' +
      'work area cleaned up at the end of each day.',
    iconName: 'Bath',
    provenance: 'DERIVED',
    basis:
      'Review evidence — bathroom update described as multi-day, detail-oriented, cleaned daily.',
    draft: true,
    metaTitle: 'Bathroom Remodeling in Bryan–College Station, TX',
    metaDescription:
      'Detail-oriented bathroom updates and remodels for homeowners in College Station and ' +
      'Bryan, TX. Request an estimate.',
  },
  {
    slug: 'attic-structural',
    title: 'Attic & Structural',
    summary: 'Attic-access and structural bracing repairs.',
    description:
      'Attic-access and structural repairs — including structural bracing repair and improved ' +
      'attic-access solutions.',
    iconName: 'Home',
    provenance: 'DERIVED',
    basis:
      'Review evidence — emergency-attention structural bracing repair + improved attic access.',
    draft: true,
    metaTitle: 'Attic & Structural Repair in Bryan–College Station, TX',
    metaDescription:
      'Attic-access and structural bracing repairs across College Station, Bryan, and Brazos ' +
      'County. Request an estimate.',
  },
  {
    slug: 'commercial-storefront',
    title: 'Commercial / Storefront Services',
    summary: 'Repair services for local businesses and storefronts.',
    description:
      'Commercial and storefront repair services for local businesses, including boarding up ' +
      'display windows and keeping your storefront safe and presentable.',
    iconName: 'Store',
    provenance: 'DERIVED',
    basis: 'Review evidence — boarding up display windows for a commercial storefront customer.',
    draft: true,
    metaTitle: 'Commercial & Storefront Repair in Bryan–College Station, TX',
    metaDescription:
      'Storefront and commercial repair services for businesses in Bryan and College Station, ' +
      'TX. Request an estimate.',
  },
  {
    slug: 'general-home-repair',
    title: 'General Home Repair / Honey-Do',
    summary: 'Your home to-do list, handled in the time you schedule.',
    description:
      "Your home to-do list, handled. Book a visit and we'll work through your home-repair " +
      "tasks — big and small — within the time you've scheduled.",
    iconName: 'ListChecks',
    provenance: 'DERIVED',
    basis:
      'Review evidence — multi-task day handling "anything I asked within that time frame"; ' +
      '`home repairs` keyword tag, frequency 19.',
    draft: true,
    metaTitle: 'General Home Repair & Honey-Do in Bryan–College Station, TX',
    metaDescription:
      'Tackle your home to-do list with a single visit across College Station, Bryan, and ' +
      'Brazos County. Request an estimate.',
  },
];
