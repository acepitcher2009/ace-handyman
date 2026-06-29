import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'link';

interface ButtonBaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

// Discriminated by which navigation prop is present.
interface ButtonAsLink extends ButtonBaseProps {
  /** Internal route -> react-router Link. */
  to: string;
  href?: never;
}
interface ButtonAsAnchor extends ButtonBaseProps {
  /** External link -> <a>. */
  href: string;
  /** Optional anchor target (e.g. '_blank' for external links). */
  target?: string;
  /** Optional anchor rel (pair '_blank' with 'noopener noreferrer'). */
  rel?: string;
  to?: never;
}
interface ButtonAsButton
  extends
    ButtonBaseProps,
    Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick' | 'disabled' | 'aria-label'> {
  to?: never;
  href?: never;
}
type ButtonProps = ButtonAsLink | ButtonAsAnchor | ButtonAsButton;

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-sans font-semibold ' +
  'min-h-11 px-6 py-3 text-base ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ' +
  'motion-safe:transition-colors motion-safe:duration-200';

const variants: Record<ButtonVariant, string> = {
  // SINGLE CTA COLOR — primary is the only CTA style (CONVENTIONS §E).
  primary: 'bg-primary text-surface shadow-card hover:bg-primary-dark',
  // Secondary = outline, neutral ink — NOT trust/success colored.
  secondary: 'border border-line bg-surface text-ink hover:bg-mist',
  // Link-style: primary ink, underline on hover; min-h-11 keeps the hit area >=44px.
  link: 'px-0 py-0 text-primary underline-offset-4 hover:underline',
};

export function Button(props: ButtonProps) {
  const { children, variant = 'primary', className = '' } = props;
  const classes = `${base} ${variants[variant]} ${className}`.trim();

  if ('to' in props && props.to !== undefined) {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    );
  }
  if ('href' in props && props.href !== undefined) {
    return (
      <a href={props.href} target={props.target} rel={props.rel} className={classes}>
        {children}
      </a>
    );
  }
  const { type = 'button', onClick, disabled } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={props['aria-label']}
      className={`${classes} disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {children}
    </button>
  );
}
