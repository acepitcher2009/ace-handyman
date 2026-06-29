import { useRoutes } from 'react-router-dom';

import { routes } from './routes';

/**
 * The app's route renderer. Consumes the shared `routes` table (src/routes.tsx) via
 * useRoutes, so the SAME table renders client-side (BrowserRouter in main.tsx) and at build
 * time (StaticRouter in scripts/prerender.mjs). Default export to match main.tsx's import.
 */
export default function App() {
  return useRoutes(routes);
}
