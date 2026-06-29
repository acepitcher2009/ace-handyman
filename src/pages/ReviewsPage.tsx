import { SeoHead } from '../components/layout/SeoHead';
import { TestimonialList } from '../components/sections/TestimonialList';
import { Button } from '../components/ui/Button';

import { siteCopy } from '../data/business';
import { googleReviewUrl } from '../data/reviews';

export function ReviewsPage() {
  return (
    <>
      <SeoHead
        title="Reviews & Testimonials | Ace Handyman Services - Bryan College Station"
        description="See what customers across Bryan–College Station say about our handyman and home-repair work, and leave us a review on Google."
        path="/reviews"
      />
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <h1 className="font-display text-4xl text-ink">Reviews &amp; Testimonials</h1>
        {/* DRAFTED framing — from data, never inlined. */}
        <p className="mt-4 max-w-3xl text-lg text-body">{siteCopy.reviewsFraming.text}</p>
        {/* The page's only CTA: leave a Google review (external). Renders only when configured. */}
        {googleReviewUrl && (
          <div className="mt-6">
            <Button href={googleReviewUrl} target="_blank" rel="noopener noreferrer">
              Leave us a review on Google
            </Button>
          </div>
        )}
      </section>
      {/* Single reviews surface — empty-state in v1; live Google reviews get pulled in here later.
          No estimate CTA here (showCta={false}); the page CTA is the Google-review link above. */}
      <TestimonialList heading="What customers say" showCta={false} />
    </>
  );
}
