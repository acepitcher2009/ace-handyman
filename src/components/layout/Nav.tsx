import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

import { Button } from '../ui/Button';

import { navItems } from '../../data/nav';

interface NavProps {
  className?: string;
}

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  [
    'inline-flex min-h-11 items-center px-3 font-sans text-base font-semibold',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
    isActive ? 'text-primary underline underline-offset-8' : 'text-ink hover:text-primary',
  ].join(' ');

export function Nav({ className = '' }: NavProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const links = navItems.filter((item) => !item.isCta);
  const cta = navItems.find((item) => item.isCta);

  // Close the drawer on route change (covers link select + browser nav).
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Escape to close; restore focus to the trigger.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Move focus into the drawer when it opens.
  useEffect(() => {
    if (open) drawerRef.current?.querySelector<HTMLElement>('a, button')?.focus();
  }, [open]);

  // Trap Tab / Shift+Tab focus within the drawer while it is open.
  const onDrawerKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return;
    const drawer = drawerRef.current;
    if (!drawer) return;
    const focusable = drawer.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <nav aria-label="Primary" className={className}>
      {/* Desktop inline links (>=1024px) */}
      <ul className="hidden items-center gap-2 lg:flex">
        {links.map((item) => (
          <li key={item.path}>
            <NavLink to={item.path} end={item.path === '/'} className={linkClasses}>
              {item.label}
            </NavLink>
          </li>
        ))}
        {cta && (
          <li className="ml-2">
            <Button to={cta.path}>{cta.label}</Button>
          </li>
        )}
      </ul>

      {/* Mobile hamburger (<1024px) */}
      <button
        ref={menuButtonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:hidden"
      >
        {open ? (
          <X className="size-6" aria-hidden="true" />
        ) : (
          <Menu className="size-6" aria-hidden="true" />
        )}
      </button>

      {/* Mobile drawer + scrim */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/50 motion-safe:transition-opacity"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-nav-drawer"
            ref={drawerRef}
            role="dialog"
            aria-label="Site navigation"
            aria-modal="true"
            onKeyDown={onDrawerKeyDown}
            className="absolute right-0 top-0 flex h-full w-80 max-w-xs flex-col gap-2 bg-surface p-6 shadow-card motion-safe:transition-transform motion-safe:duration-300"
          >
            {links.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={linkClasses}
              >
                {item.label}
              </NavLink>
            ))}
            {cta && (
              <Button to={cta.path} className="mt-2 w-full">
                {cta.label}
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
