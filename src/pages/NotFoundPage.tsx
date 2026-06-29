import { Link } from 'react-router-dom';

import { SeoHead } from '../components/layout/SeoHead';

/**
 * Graceful 404 (route `*`). Single <h1>, a link home, and a noindex SeoHead so crawlers
 * skip it. The prerender does NOT emit a static file for `*` (it is not in the route list),
 * so this renders client-side only. Token-clean — no raw hex/arbitrary values.
 */
export function NotFoundPage() {
  return (
    <>
      <SeoHead
        title="Page not found | Ace Handyman Services - Bryan College Station"
        description="The page you were looking for could not be found."
        path="/404"
        noindex
      />
      <section className="mx-auto w-full max-w-3xl px-6 py-24 text-center">
        <h1 className="font-display text-4xl text-ink">Page not found</h1>
        <p className="mt-4 text-lg text-body">
          Sorry — we couldn&rsquo;t find the page you were looking for.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex min-h-11 items-center rounded-md bg-primary px-6 py-3 font-sans text-base font-semibold text-surface hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Back to home
        </Link>
      </section>
    </>
  );
}
