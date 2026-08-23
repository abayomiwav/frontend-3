import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest',
  {
    variants: {
      variant: {
        default: 'border-border bg-secondary text-secondary-foreground',
        primary: 'border-primary bg-primary/10 text-primary',
        accent: 'border-accent bg-accent/10 text-accent',
        outline: 'border-border text-foreground',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}
