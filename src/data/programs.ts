import type { Provenance } from './business';

export interface Program {
  name: string; // VERIFIED structure
  billing?: 'yearly or quarterly'; // exact literal — Maintenance Program
  duration?: '8 hours'; // exact literal — Full Day Package
  explainer: string; // DRAFTED — exact from PRD §4.7
  provenance: Provenance; // 'VERIFIED' structure facts; explainer is DRAFTED
  draft?: boolean; // true where the copy is DRAFTED
}

export const programs: Program[] = [
  {
    name: 'Maintenance Program',
    billing: 'yearly or quarterly',
    explainer:
      "Stay ahead of your home's to-do list with our Maintenance Program — choose yearly or " +
      'quarterly billing and keep a trusted craftsman on call for the projects that come up.',
    provenance: 'DRAFTED',
    draft: true,
  },
  {
    name: 'Full Day Package',
    duration: '8 hours',
    explainer:
      'Need a focused push? Our Full Day Package gives you a full 8 hours of skilled help in a ' +
      'single visit.',
    provenance: 'DRAFTED',
    draft: true,
  },
];
