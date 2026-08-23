import type { Metadata } from 'next';
import { PageHero } from '@/components/marketing/page-hero';
import { PricingTable } from '@/components/marketing/pricing-table';
import { ComparisonSection } from '@/components/marketing/comparison-section';
import { FaqSection } from '@/components/marketing/faq-section';
import { CtaSection } from '@/components/marketing/cta-section';
import { Container, Section } from '@/components/ui/container';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Free for individual senders and carriers. Upgrade to Pro for priority placement and analytics, or Fleet for a logistics operation.',
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Simple pricing, for one shipment or a whole fleet"
        description="Start free as a sender or carrier. Upgrade when you need marketplace priority, analytics, and bulk tooling."
      />
      <Section>
        <Container>
          <PricingTable />
        </Container>
      </Section>
      <ComparisonSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
