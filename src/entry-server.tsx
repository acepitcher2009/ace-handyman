/**
 * SSR entry for the build-time prerender (Strategy A — see scripts/prerender.mjs).
 *
 * `vite build --ssr src/entry-server.tsx --outDir dist-ssr` bundles App + the data arrays to
 * plain JS in dist-ssr/, which Node can import directly (no .tsx/JSX parsing in Node).
 * prerender.mjs imports `render` and the data slugs from the bundled output.
 *
 * `render(url)` renders the SAME route table the SPA uses, inside StaticRouter +
 * HelmetProvider. Under React 19, react-helmet-async@3 defers to React 19's native
 * hoistable-metadata support: SeoHead's <title>/<meta>/<link>/<script ld+json> are rendered
 * as ordinary elements in the markup string (React hoists them to <head> on the client).
 * For STATIC crawlable HTML we extract those metadata tags here and return them as `head`
 * (to inject into the shell's <head>), with the body stripped of them so they don't duplicate.
 */
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';

import App from './App';
import { routes } from './routes';
import { services } from './data/services';
import { serviceAreas } from './data/serviceAreas';
import { business } from './data/business';

export interface RenderResult {
  /** Rendered body markup for <div id="root">, with the metadata tags removed. */
  html: string;
  /** The route's <title>/<meta>/<link>/<script ld+json>, for injection into <head>. */
  head: string;
}

// Hoistable-metadata tags SeoHead emits (the only source of these in the tree). They are
// extracted from the rendered string and relocated into the static <head>.
const META_PATTERNS: RegExp[] = [
  /<title>[\s\S]*?<\/title>/g,
  /<meta\b[^>]*\/?>/g,
  /<link\b[^>]*rel="canonical"[^>]*\/?>/g,
  /<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g,
];

export function render(url: string): RenderResult {
  // helmetContext is unused under React 19 (helmet defers to native metadata) but is the
  // documented provider API; keep the provider so client/SSR trees stay identical.
  const helmetContext = {};
  const rendered = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );

  const headTags: string[] = [];
  let html = rendered;
  for (const pattern of META_PATTERNS) {
    const matches = html.match(pattern);
    if (matches) headTags.push(...matches);
    html = html.replace(pattern, '');
  }

  return { html, head: headTags.join('\n') };
}

// Re-export the route table + the data the prerender enumerates the route list from,
// so scripts/prerender.mjs reads them from the single SSR bundle.
export { routes, services, serviceAreas, business };
