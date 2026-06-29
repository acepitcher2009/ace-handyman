// scripts/prerender.mjs — runs after `vite build` + the SSR build. Node ESM. No SSG plugin.
//
// Strategy A (CONVENTIONS / story E.5): the React app + data are bundled to plain JS by
// `vite build --ssr src/entry-server.tsx --outDir dist-ssr`, so Node imports `render` and the
// data arrays from dist-ssr/ — no .tsx/JSX parsing in Node, zero new dependencies.
//
// It reads the built dist/index.html as the shell (which already references the hashed
// JS/CSS bundles, so each page still hydrates as an SPA), renders each route to a string with
// react-dom/server (via the SSR entry's render()), injects the route's helmet head + the
// rendered markup into the shell, and writes one index.html per route. Then it emits
// dist/sitemap.xml + dist/robots.txt. The route list is derived FROM DATA (single source,
// matching the routes table); the `*` 404 route is intentionally NOT emitted.
//
// Exits non-zero on failure (an unhandled rejection from top-level await rejects the process),
// so a render error fails `npm run build` rather than emitting partial output.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { render, services, serviceAreas, business } from '../dist-ssr/entry-server.js';
// NOTE (React 19 + react-helmet-async@3): helmet defers to React 19's native hoistable
// metadata, so SeoHead's tags render in the markup string. render() extracts them as `head`
// (for the static <head>) and returns the body stripped of them — see src/entry-server.tsx.

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');

// 1) Build the full route list FROM DATA (single source — matches src/routes.tsx).
const staticPaths = [
  '/',
  '/services',
  '/service-areas',
  '/portfolio',
  '/credentials',
  '/reviews',
  '/maintenance-program',
  '/about',
  '/contact',
];
const servicePaths = services.map((s) => `/services/${s.slug}`); // 8
const areaPaths = serviceAreas.map((a) => `/service-areas/${a.slug}`); // 4
const allPaths = [...staticPaths, ...servicePaths, ...areaPaths]; // 21 — excludes the `*` 404 route

// 2) Read the built shell (already references the hashed JS/CSS — SPA bundle preserved).
//    Drop the shell's placeholder <title> so each route carries ONLY its own SeoHead title
//    (avoids a duplicate <title> in <head>); the hashed <script>/<link> bundle tags are kept.
const shell = (await readFile(join(distDir, 'index.html'), 'utf8')).replace(
  /\s*<title>[\s\S]*?<\/title>/,
  ''
);

// 3) Render each route, inject helmet head + body, write dist/<route>/index.html.
for (const path of allPaths) {
  const { html, head } = render(path);

  const page = shell
    // Inject the route's head tags before </head> (keeps the built <script>/<link> bundle tags).
    .replace('</head>', `${head}\n</head>`)
    // Inject the rendered markup into the existing #root so it hydrates as an SPA.
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  const outFile = path === '/' ? join(distDir, 'index.html') : join(distDir, path, 'index.html');
  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, page, 'utf8');
}

// 4) sitemap.xml — absolute URLs only when siteUrl is set (Gaps G-6), else path-only.
const base = business.siteUrl ?? ''; // null => path-only <loc>, never a guessed domain
const urls = allPaths.map((p) => `  <url><loc>${base}${p}</loc></url>`).join('\n');
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
await writeFile(join(distDir, 'sitemap.xml'), sitemap, 'utf8');

// 5) robots.txt — allow crawl, reference the sitemap (absolute when siteUrl set, else relative).
const sitemapRef = base ? `${base}/sitemap.xml` : '/sitemap.xml';
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${sitemapRef}\n`;
await writeFile(join(distDir, 'robots.txt'), robots, 'utf8');

console.log(`Prerendered ${allPaths.length} routes + sitemap.xml + robots.txt`);
