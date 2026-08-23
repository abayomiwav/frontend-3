import { cn } from '@/lib/utils';

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={cn(className)} aria-hidden="true">
      <rect width="32" height="32" rx="3" fill="#14171C" />
      <polyline
        points="8,9 14,16 8,23"
        stroke="var(--color-primary)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.35"
      />
      <polyline
        points="14,9 20,16 14,23"
        stroke="var(--color-primary)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.65"
      />
      <polyline
        points="20,9 26,16 20,23"
        stroke="var(--color-primary)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LogoWordmark({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark className="h-8 w-8 shrink-0" />
      <span className="font-display text-lg font-bold tracking-tight">StellarExpress</span>
    </span>
  );
}
