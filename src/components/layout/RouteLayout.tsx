import { Outlet } from 'react-router-dom';

import { Header } from './Header';
import { Footer } from './Footer';
import { ConsentNotice } from './ConsentNotice';

/**
 * The single app-shell layout route (story #07 §RL). Nested in the route table (#41)
 * as `<Route element={<RouteLayout />}>` with every page route as its children.
 *
 * Renders the shell exactly ONCE so no page can duplicate or omit a landmark:
 *  - <Header /> renders SkipLink first (story 03) — RouteLayout does NOT add a second.
 *    The header also carries the site's single persistent "Get an Estimate" CTA (in Nav).
 *  - the single <main id="main"> is the SkipLink target and wraps the routed page (<Outlet />).
 *  - <Footer /> and <ConsentNotice /> follow once. No sticky CTA bar — the header CTA
 *    is the one persistent estimate affordance.
 *
 * RouteLayout is pure structure — no <h1>, no business copy.
 */
export function RouteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ConsentNotice />
    </div>
  );
}
