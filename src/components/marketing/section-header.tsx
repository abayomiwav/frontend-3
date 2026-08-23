import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mx-auto max-w-2xl',
        align === 'center' ? 'text-center' : 'mx-0 max-w-2xl text-left',
        className,
      )}
    >
      {eyebrow && (
        <Badge variant="primary" className="mb-4">
          {eyebrow}
        </Badge>
      )}
      <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-balance text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
