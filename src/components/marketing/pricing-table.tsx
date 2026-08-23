import Link from 'next/link';
import { Check, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { pricingFeatures, pricingTiers } from '@/lib/data';

export function PricingTable() {
  return (
    <div className="overflow-x-auto border-2 border-foreground">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr className="border-b-2 border-foreground">
            <th className="w-56 p-5 text-left align-bottom" />
            {pricingTiers.map((tier) => (
              <th
                key={tier.name}
                className={cn(
                  'p-5 text-left align-bottom',
                  tier.highlighted
                    ? 'border-x-2 border-t-4 border-primary bg-primary text-primary-foreground'
                    : 'border-b-2 border-transparent',
                )}
              >
                <p className="font-mono text-[11px] uppercase tracking-widest opacity-70">
                  {tier.name}
                </p>
                <p className="mt-1 font-display text-2xl font-bold">
                  {tier.price}
                  <span className="text-sm font-normal opacity-70">{tier.period}</span>
                </p>
                <p
                  className={cn(
                    'mt-1 text-xs',
                    tier.highlighted ? 'text-primary-foreground/80' : 'text-muted-foreground',
                  )}
                >
                  {tier.description}
                </p>
                <Button
                  size="sm"
                  variant={tier.highlighted ? 'accent' : 'outline'}
                  className="mt-4 w-full"
                  asChild
                >
                  <Link href={tier.href}>{tier.cta}</Link>
                </Button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pricingFeatures.map((feature, i) => (
            <tr key={feature.label} className="border-b border-border last:border-b-0 even:bg-secondary/20">
              <td className="p-4 text-foreground/85">{feature.label}</td>
              {(['starter', 'pro', 'fleet'] as const).map((key) => (
                <td
                  key={key}
                  className={cn(
                    'p-4 text-center',
                    key === 'pro' &&
                      cn(
                        'border-x-2 border-primary/40 bg-primary/5',
                        i === pricingFeatures.length - 1 && 'border-b-2',
                      ),
                  )}
                >
                  {feature[key] ? (
                    <Check className="mx-auto h-4 w-4 text-primary" />
                  ) : (
                    <Minus className="mx-auto h-4 w-4 text-muted-foreground/30" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
