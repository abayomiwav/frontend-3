import { Check, Minus } from 'lucide-react';
import { Container, Section } from '@/components/ui/container';
import { SectionHeader } from './section-header';
import { comparisonRows } from '@/lib/data';

export function ComparisonSection() {
  return (
    <Section className="border-t border-border">
      <Container>
        <SectionHeader
          eyebrow="Why StellarExpress"
          title="Beyond pay-and-hope or cash on delivery"
          description="Traditional logistics payment relies entirely on trust or physical presence. StellarExpress enforces the terms both sides agreed to."
        />

        <div className="mt-14 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/60">
                <th className="p-4 text-left font-medium text-muted-foreground">Capability</th>
                <th className="p-4 text-left font-medium text-muted-foreground">Traditional courier</th>
                <th className="p-4 text-left font-medium text-muted-foreground">Cash on delivery</th>
                <th className="p-4 text-left font-medium text-primary">StellarExpress</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.label} className="border-b border-border last:border-b-0 even:bg-secondary/20">
                  <td className="p-4 font-medium text-foreground">{row.label}</td>
                  <td className="p-4 text-muted-foreground">{row.traditional}</td>
                  <td className="p-4 text-muted-foreground">{row.cod}</td>
                  <td className="p-4 font-medium text-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-primary" />
                      {row.stellarexpress}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Minus className="h-3 w-3" /> Comparisons reflect typical retail courier offerings; specifics vary by provider.
        </p>
      </Container>
    </Section>
  );
}
