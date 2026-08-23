import { Container } from '@/components/ui/container';
import { stats } from '@/lib/data';
import { AnimatedCounter } from './animated-counter';

export function StatsBand() {
  return (
    <section className="border-y border-border bg-secondary/40 py-14">
      <Container className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            <p className="mt-1.5 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
