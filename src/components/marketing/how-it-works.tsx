import { ArrowRight, CircleDollarSign, PackageCheck, ShieldCheck, Truck } from 'lucide-react';
import { Container, Section } from '@/components/ui/container';
import { SectionHeader } from './section-header';

const steps = [
  {
    icon: CircleDollarSign,
    title: 'Sender funds the escrow',
    description: 'The full amount moves into the contract the moment a shipment is created.',
  },
  {
    icon: Truck,
    title: 'A carrier accepts the job',
    description: 'Payout terms are visible on the open marketplace before anyone claims it.',
  },
  {
    icon: PackageCheck,
    title: 'Pickup releases a share',
    description: 'Confirming pickup pays out immediately, before delivery even starts.',
  },
  {
    icon: ShieldCheck,
    title: 'Delivery releases the rest',
    description: 'Receiver confirms arrival, and the remaining escrow pays out — no approval needed.',
  },
];

export function HowItWorks() {
  return (
    <Section className="border-t border-border">
      <Container>
        <SectionHeader
          eyebrow="How it works"
          title="Payment that follows the shipment, not a promise"
          description="Every step below is enforced by the escrow contract itself — no dashboard toggle can skip it."
        />
        <div className="mt-14 flex flex-col border border-border lg:flex-row">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="relative flex-1 border-b border-border p-6 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-accent">
                  {String(i + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
                </span>
                <step.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              {i < steps.length - 1 && (
                <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-muted-foreground lg:block" />
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
