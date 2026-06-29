# DEPENDENCIES — Ace Handyman Services - Bryan College Station

> Feature packages this PRD requires, beyond the scaffold. Each is justified
> against a specific PRD requirement. Infrastructure already installed by the
> scaffold is **not** relisted (see "Already installed" at the bottom).
>
> Installed scaffold versions (verified in `package.json`): **Vite 8.1**,
> **React / React-DOM 19.2**, **TypeScript ~6.0**, Tailwind v4.3 + `@tailwindcss/vite`,
> oxlint, Prettier, `@vitejs/plugin-react` 6. Every choice below was checked for
> compatibility with that exact stack.

---

## Feature dependencies (runtime)

> **Routing/SSG approach corrected (2026-06-26).** The earlier draft proposed
> `vite-react-ssg` for build-time static HTML per route. **Verified via `npm view`,
> that package is incompatible with the scaffold:** every published version (0.9.0
> stable and the 0.9.1 beta) declares `peerDependencies.vite = ^2 || ^3 || ^4 || ^5
|| ^6 || ^7` — **it does NOT list Vite 8**, and the scaffold runs `vite@8.1.0`. It
> is dropped. Static-HTML-per-route (PRD §6/§7) is instead satisfied by a **custom
> post-build prerender script** using `react-dom/server` (already installed by the
> scaffold) — adding **no** Vite-8-incompatible third-party dependency.

| Package              | Version pin | PRD requirement it satisfies                                                                                                                                                                                                                                  | Compatibility note (verified via `npm view` 2026-06-26)                                                                                                                                                                                                                                                                           |
| -------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `react-router-dom`   | `^6.30.0`   | PRD §3 IA / §6 Routing — multi-page site needs a route table mapping each §3 path to one page component; service-detail and service-area pages are data-driven from one template each. CONVENTIONS §D names `react-router-dom` for the `App.tsx` route table. | `react-router-dom@6.30.4` peers `react >=16.8`, `react-dom >=16.8` — **installs clean on React 19**. Pinned to **v6** deliberately: v7+ folds routing into a framework with its own data/SSG model and would change the whole approach; v6 keeps a plain SPA route table that the prerender script (below) can statically render. |
| `react-helmet-async` | `^3.0.0`    | PRD §7 — unique per-page `<title>` + meta description, Open Graph + Twitter cards, canonical URL, and the `HomeAndConstructionBusiness` JSON-LD `<script>`. CONVENTIONS §D names it for the `SeoHead` component.                                              | **Must be `@^3`, not `^1`.** `react-helmet-async@1.3.0` peers React `^16 \|\| ^17 \|\| ^18` (**no 19**); `@3.0.0` peers `^16 \|\| ^17 \|\| ^18 \|\| ^19` — installs clean on React 19. Its `HelmetProvider` collects head tags during the prerender pass so `react-dom/server` output includes per-route `<head>`.                |
| `@emailjs/browser`   | `^4.4.0`    | PRD §5 / §6 — the estimate-request form (the site's centerpiece conversion) submits via EmailJS; all keys in `VITE_*` env vars, never committed.                                                                                                              | `@emailjs/browser@4.4.1`; framework-agnostic browser SDK, no React/Vite peer — clean on Vite 8 / React 19. Read keys via `import.meta.env.VITE_EMAILJS_*`.                                                                                                                                                                        |
| `lucide-react`       | `^0.460.0`  | PRD §4 (service highlight grid / service tiles), §4.5 (credential badges), §5 (nav hamburger, form/contact icons), §2 (trust-band icons). Provides the iconography for service tiles and nav without shipping raster assets.                                  | `lucide-react@1.21.0` peers `react: ^16 \|\| ^17 \|\| ^18 \|\| ^19` — clean on React 19. `^0.460.0` carries the same React-19 peer; either resolves cleanly. Tree-shakeable per-icon imports keep the §6 "minimal JS" budget.                                                                                                     |

**Static-HTML-per-route is met with no extra dependency.** The prerender step (Build
Order #41) is a small Node script (`scripts/prerender.mjs`) that imports the app and
its RR v6 route list (from `nav.ts` / `services.ts` / `serviceAreas.ts`), renders each
route with `renderToString` from **`react-dom/server`** (already in the scaffold), wraps
each in the built `index.html` shell with the route's `HelmetProvider`-collected head,
and writes one `index.html` per route into `dist/`. No `vite-react-ssg`, no
`vite-plugin-prerender` (an unmaintained PhantomJS-era plugin — rejected).

### Single install command

```
npm install react-router-dom@^6.30.0 react-helmet-async@^3.0.0 @emailjs/browser@^4.4.0 lucide-react@^0.460.0
```

> Verified to install on Vite 8 / React 19 **without** `--force` or `--legacy-peer-deps`.
>
> After install, in `package.json` the `build` script becomes:
> `tsc -b && vite build && node scripts/prerender.mjs`
> (typecheck → bundle → emit static HTML per route). `dev` stays `vite`. Wiring the
> script + the prerender file is the routing/prerender build story (Build Order #41),
> not a dependency.

---

## Environment variables (not packages — recorded so the form story can wire them)

The estimate form (PRD §5/§6) reads these from `.env` (git-ignored); only `VITE_`-prefixed
vars are exposed to the client bundle:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

A committed `.env.example` documents the names with empty values. **Missing keys must not
crash the build** — the form degrades to its error/fallback state (PRD §5 error state).

---

## Already installed by the scaffold — do NOT reinstall

`vite`, `react`, `react-dom`, `tailwindcss`, `@tailwindcss/vite`, `typescript`, `oxlint`,
`prettier`, `@vitejs/plugin-react`, `@types/node`, `@types/react`, `@types/react-dom`.

> **`react-dom/server` is part of the already-installed `react-dom`** — the prerender
> script uses it; it is not a new dependency.

---

## Sources

- Scaffold versions: `package.json` (this repo).
- Peer ranges verified via `npm view <pkg> peerDependencies` on 2026-06-26:
  - `vite-react-ssg@0.9.0` **and** latest → `vite: ^2 || ^3 || ^4 || ^5 || ^6 || ^7` (**no Vite 8** → rejected).
  - `react-helmet-async@1.3.0` → React `^16 || ^17 || ^18` (no 19); `@3.0.0` → adds `^19` (**use `@^3`**).
  - `react-router-dom@6.30.4` → `react >=16.8` (clean on 19).
  - `@emailjs/browser@4.4.1` → no React/Vite peer; `lucide-react@1.21.0` → React `^16…^19`.
  - `vite-plugin-prerender@1.0.8` → peers `vite >=2` but is an unmaintained PhantomJS-era plugin (rejected).
- CONVENTIONS.md §D (Routing approach) — the designer's "RR v6 route table + static
  pre-render per route" intent is preserved; only the _implementation_ of the pre-render
  changes (custom `react-dom/server` script instead of an incompatible SSG plugin).
