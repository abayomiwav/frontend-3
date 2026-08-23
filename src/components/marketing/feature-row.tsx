import { Check } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { FeatureMockup } from './feature-mockup';

interface FeatureRowProps {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  kind: 'escrow' | 'tracking' | 'marketplace' | 'disputes' | 'ratings';
  reverse?: boolean;
}

export function FeatureRow({ eyebrow, title, description, bullets, kind, reverse }: FeatureRowProps) {
  return (
    <Container>
      <div
        className={cn(
          'grid items-center gap-14 py-16 lg:grid-cols-2 lg:gap-20',
          reverse && 'lg:[&>*:first-child]:order-2',
        )}
      >
        <div>
          <Badge variant="accent">{eyebrow}</Badge>
          <h3 className="mt-5 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h3>
          <p className="mt-4 text-balance text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
          <ul className="mt-6 space-y-3">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-sm text-foreground/90">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-3 w-3" />
                </span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
        <FeatureMockup kind={kind} />
      </div>
    </Container>
  );
}
