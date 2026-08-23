import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  trendDirection = 'up',
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        {trend && (
          <span
            className={cn(
              'text-xs font-medium',
              trendDirection === 'up' && 'text-success',
              trendDirection === 'down' && 'text-destructive',
              trendDirection === 'neutral' && 'text-muted-foreground',
            )}
          >
            {trend}
          </span>
        )}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold">{value}</p>
    </div>
  );
}
