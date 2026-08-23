import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'group relative inline-flex items-center justify-center gap-2 whitespace-nowrap border-2 text-sm font-bold uppercase tracking-wide transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'border-foreground bg-primary text-primary-foreground shadow-[4px_4px_0_0_var(--color-foreground)] hover:-translate-x-px hover:-translate-y-px hover:shadow-[5px_5px_0_0_var(--color-foreground)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none',
        accent:
          'border-foreground bg-accent text-accent-foreground shadow-[4px_4px_0_0_var(--color-foreground)] hover:-translate-x-px hover:-translate-y-px hover:shadow-[5px_5px_0_0_var(--color-foreground)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none',
        outline: 'border-border bg-transparent hover:bg-secondary text-foreground',
        ghost: 'border-transparent bg-transparent hover:bg-secondary text-foreground',
        link: 'border-transparent text-primary underline-offset-4 hover:underline p-0 h-auto normal-case tracking-normal',
      },
      size: {
        sm: 'h-9 px-4 text-[12px]',
        md: 'h-11 px-6',
        lg: 'h-13 px-8 text-[15px]',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { buttonVariants };
