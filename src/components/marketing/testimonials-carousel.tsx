import { Quote } from 'lucide-react';
import { Container, Section } from '@/components/ui/container';
import { SectionHeader } from './section-header';
import { testimonials } from '@/lib/data';
import { cn } from '@/lib/utils';

export function TestimonialsCarousel() {
  return (
    <Section className="border-t border-border bg-secondary/30">
      <Container>
        <SectionHeader eyebrow="Senders & carriers" title="What people moving goods are saying" />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={cn(
                'panel-hover corner-ticks flex flex-col border-2 border-t-4 border-border bg-card p-6',
                i % 2 === 0 ? 'border-t-primary' : 'border-t-accent',
              )}
            >
              <Quote className="h-6 w-6 text-primary" />
              <p className="mt-4 flex-1 text-balance text-base leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-5 border-t border-border pt-4">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="font-mono text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
