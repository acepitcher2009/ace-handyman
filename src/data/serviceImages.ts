// Decorative, illustrative service photos.
//
// PROVENANCE: these are GENERIC royalty-free stock images of each service
// category (Pexels — free commercial use, no attribution required; see
// IMAGE-CREDITS.md at the project root). They are NOT photographs of Ace
// Handyman's own completed work, projects, or staff. They are rendered as
// decorative imagery (empty alt) — the service title carries the meaning —
// so the site never implies a stock photo is the business's actual work.
//
// To swap in real, owner-supplied project photos later: drop the file in
// src/assets/photos/, update the import below, and (if it depicts Ace's own
// work) give it descriptive alt text where it is rendered.
import drywallCeilingRepair from '../assets/photos/svc-drywall-ceiling-repair.jpg';
import carpentryBuiltIns from '../assets/photos/svc-carpentry-built-ins.jpg';
import furnitureFixtureAssembly from '../assets/photos/svc-furniture-fixture-assembly.jpg';
import doorRepairInstallation from '../assets/photos/svc-door-repair-installation.jpg';
import bathroomRemodeling from '../assets/photos/svc-bathroom-remodeling.jpg';
import atticStructural from '../assets/photos/svc-attic-structural.jpg';
import commercialStorefront from '../assets/photos/svc-commercial-storefront.jpg';
import generalHomeRepair from '../assets/photos/svc-general-home-repair.jpg';

/** Maps a Service.slug to its decorative category image (imported, hashed URL). */
export const serviceImages: Record<string, string> = {
  'drywall-ceiling-repair': drywallCeilingRepair,
  'carpentry-built-ins': carpentryBuiltIns,
  'furniture-fixture-assembly': furnitureFixtureAssembly,
  'door-repair-installation': doorRepairInstallation,
  'bathroom-remodeling': bathroomRemodeling,
  'attic-structural': atticStructural,
  'commercial-storefront': commercialStorefront,
  'general-home-repair': generalHomeRepair,
};
