import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { SkipLink } from './SkipLink';
import { Nav } from './Nav';

import { business } from '../../data/business';

interface HeaderProps {
  className?: string;
}

export function Header({ className = '' }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* First focusable element on the page (PRD §5). */}
      <SkipLink />
      <header
        className={[
          'sticky top-0 z-30 border-b border-line bg-surface',
          'motion-safe:transition-shadow motion-safe:duration-200',
          scrolled ? 'shadow-card' : '',
          className,
        ].join(' ')}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3">
          {/* Text wordmark — logo asset is MISSING, so NO <img> / placeholder (CONVENTIONS §G). */}
          <Link
            to="/"
            className="font-display text-lg font-extrabold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {business.name}
          </Link>

          <Nav />

          {/*
            NO phone affordance in the header: business.phone is null (PRD §10).
            A tel: link would render here ONLY when business.phone is non-null —
            never a placeholder. There is no number today, so nothing renders.
          */}
        </div>
      </header>
    </>
  );
}
