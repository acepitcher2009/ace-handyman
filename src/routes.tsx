import { RouteLayout } from './components/layout/RouteLayout';

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ServiceAreasPage } from './pages/ServiceAreasPage';
import { ServiceAreaPage } from './pages/ServiceAreaPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { CredentialsPage } from './pages/CredentialsPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { MaintenanceProgramPage } from './pages/MaintenanceProgramPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

import type { RouteObject } from 'react-router-dom';

/**
 * SINGLE SOURCE OF TRUTH for the route table — consumed by `useRoutes` in App.tsx AND by
 * the build-time prerender (scripts/prerender.mjs, via the SSR entry). One layout route
 * (RouteLayout: Header + <main id="main"><Outlet/></main> + Footer + StickyCta +
 * ConsentNotice, rendered once) with one child per PRD §3 page.
 *
 * The 8 service-detail routes resolve through ONE ServiceDetailPage via /services/:slug;
 * the 4 service-area routes through ONE ServiceAreaPage via /service-areas/:slug — the
 * slugs live in services.ts / serviceAreas.ts, not in this table. Each :slug template
 * validates its slug against its data array and redirects on miss (its own logic).
 *
 * `*` → NotFoundPage renders client-side only; the prerender does NOT emit it.
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RouteLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'services/:slug', element: <ServiceDetailPage /> },
      { path: 'service-areas', element: <ServiceAreasPage /> },
      { path: 'service-areas/:slug', element: <ServiceAreaPage /> },
      { path: 'portfolio', element: <PortfolioPage /> },
      { path: 'credentials', element: <CredentialsPage /> },
      { path: 'reviews', element: <ReviewsPage /> },
      { path: 'maintenance-program', element: <MaintenanceProgramPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
