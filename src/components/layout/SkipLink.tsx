interface SkipLinkProps {
  /** Target id to jump to; defaults to the page main landmark. */
  targetId?: string;
  className?: string;
}

export function SkipLink({ targetId = 'main', className = '' }: SkipLinkProps) {
  return (
    <a
      href={`#${targetId}`}
      className={
        'sr-only focus:not-sr-only ' +
        'focus:absolute focus:left-4 focus:top-4 focus:z-50 ' +
        'focus:inline-flex focus:min-h-11 focus:items-center focus:rounded-md ' +
        'focus:bg-primary focus:px-6 focus:py-3 focus:text-base focus:font-semibold focus:text-surface ' +
        'focus:outline-2 focus:outline-offset-2 focus:outline-primary ' +
        className
      }
    >
      Skip to content
    </a>
  );
}
