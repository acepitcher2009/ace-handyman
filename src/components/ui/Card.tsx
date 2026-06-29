import type { ElementType, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  /** Semantic element to render as (default 'div'); e.g. 'article' for ServiceCard. */
  as?: ElementType;
  /**
   * Apply the standard p-6 inner padding (default true). Set false when the card has an
   * edge-to-edge media header and manages its own inner padding (e.g. ServiceCard).
   */
  padded?: boolean;
  className?: string;
}

export function Card({ children, as: Tag = 'div', padded = true, className = '' }: CardProps) {
  return (
    <Tag
      className={`overflow-hidden rounded-md bg-surface shadow-card ${padded ? 'p-6' : ''} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
