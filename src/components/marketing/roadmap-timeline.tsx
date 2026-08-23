import { Check, Circle, Clock } from 'lucide-react';
import { roadmap } from '@/lib/data';
import { cn } from '@/lib/utils';

const statusStyles = {
  done: {
    icon: Check,
    dot: 'bg-primary text-primary-foreground',
    label: 'Shipped',
    edge: 'border-l-primary',
  },
  active: {
    icon: Clock,
    dot: 'bg-accent text-accent-foreground',
    label: 'In progress',
    edge: 'border-l-accent',
  },
  next: {
    icon: Circle,
    dot: 'bg-secondary text-foreground border border-border',
    label: 'Up next',
    edge: 'border-l-border',
  },
  later: {
    icon: Circle,
    dot: 'bg-secondary text-muted-foreground border border-border',
    label: 'Exploring',
    edge: 'border-l-border',
  },
} as const;

export function RoadmapTimeline() {
  return (
    <div className="relative mx-auto max-w-3xl">
      <div aria-hidden className="absolute bottom-0 left-5 top-0 w-0 border-l-2 border-dashed border-border" />
      <div className="space-y-10">
        {roadmap.map((phase) => {
          const style = statusStyles[phase.status];
          return (
            <div key={phase.title} className="relative flex gap-6">
              <div
                className={cn('relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full', style.dot)}
              >
                <style.icon className="h-4 w-4" />
              </div>
              <div
                className={cn(
                  'panel-hover flex-1 border-2 border-l-4 border-border bg-card p-6',
                  style.edge,
                )}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wide text-accent">
                    {phase.quarter}
                  </span>
                  <span className="border border-border bg-secondary px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase text-muted-foreground">
                    {style.label}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-lg font-bold">{phase.title}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
