import type { Metadata } from 'next';
import { HeartHandshake, Scale, ShieldCheck, Sparkles } from 'lucide-react';
import { PageHero } from '@/components/marketing/page-hero';
import { StatsBand } from '@/components/marketing/stats-band';
import { CtaSection } from '@/components/marketing/cta-section';
import { Container, Section } from '@/components/ui/container';
import { SectionHeader } from '@/components/marketing/section-header';

export const metadata: Metadata = {
  title: 'About',
  description: 'Why we built StellarExpress: a logistics escrow platform on Stellar, and the team behind it.',
};

const values = [
  {
    icon: ShieldCheck,
    title: 'Rules over trust',
    description: 'Nobody should have to fully trust a stranger with a package or a payment — rules, enforced on-chain, should do that work.',
  },
  {
    icon: Scale,
    title: 'Aligned incentives, not one-sided protection',
    description: 'A good escrow protects the sender and the carrier at the same time, not one at the other’s expense.',
  },
  {
    icon: HeartHandshake,
    title: 'Built for real shipments',
    description: 'Not a freight-exchange terminal wearing a consumer skin — every feature starts from an actual delivery going right or wrong.',
  },
  {
    icon: Sparkles,
    title: 'Open, always',
    description: 'Contracts, backend, and frontend are open source. Logistics payment infrastructure shouldn’t be a black box.',
  },
];

const team = [
  { name: 'Ifeoma Nwosu', role: 'Co-founder & CEO', focus: 'Product & carrier research' },
  { name: 'Segun Balogun', role: 'Co-founder & CTO', focus: 'Soroban contracts' },
  { name: 'Priya Nair', role: 'Head of Trust & Safety', focus: 'Dispute design' },
  { name: 'Daniel Osei', role: 'Backend Lead', focus: 'API & infrastructure' },
  { name: 'Farida Bello', role: 'Head of Design', focus: 'Product design' },
  { name: 'Kwame Boateng', role: 'Community', focus: 'Developer relations' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About StellarExpress"
        title="We build for the shipment, not just the checkout"
        description="Most logistics tools optimize for the platform's cut. StellarExpress optimizes for the moment a sender, a carrier, and a receiver actually need to trust each other for a few days."
      />

      <Section>
        <Container className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold">Why we started here</h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              Every small logistics operator we talked to described the same workaround: pay a
              carrier upfront and hope the goods actually move, or make the carrier front the trip
              on a promise of payment on delivery. Neither protects both sides. Cash on delivery
              protects nobody once the courier is already at the door.
            </p>
            <p>
              None of it was enforced by anything but goodwill. A payment split was a verbal
              agreement, not a rule. A dispute meant a phone call and whoever was more persistent
              winning, not a documented, bounded process.
            </p>
            <p>
              StellarExpress is what we built instead: one escrow per shipment, funds released in
              two milestones the contract enforces, and a dispute path that can only ever touch
              money that hasn’t already been paid out.
            </p>
          </div>
        </Container>
      </Section>

      <StatsBand />

      <Section className="border-t border-border">
        <Container>
          <SectionHeader eyebrow="What we believe" title="The principles behind every feature" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl border border-border bg-card p-6">
                <value.icon className="h-6 w-6 text-primary" />
                <h3 className="mt-4 font-display text-lg font-bold">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-secondary/30">
        <Container>
          <SectionHeader eyebrow="Team" title="A small team, building in the open" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-lg font-bold text-primary">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-semibold">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                  <p className="mt-0.5 text-xs text-accent">{member.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
