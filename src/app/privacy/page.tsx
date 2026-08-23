import type { Metadata } from 'next';
import { PageHero } from '@/components/marketing/page-hero';
import { Container, Section } from '@/components/ui/container';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How StellarExpress handles data — and what we deliberately never collect.',
};

const sections = [
  {
    title: '1. What we collect',
    body: 'Account information (name, email), shipment metadata you create (routes, categories, tracking notes), and standard web analytics. We do not collect or store your Stellar secret key at any point — every on-chain action is signed on your device.',
  },
  {
    title: '2. What’s on-chain vs. off-chain',
    body: 'Escrow balances, milestone releases, and dispute outcomes live on the Stellar network via the escrow smart contract and are public by nature of the ledger. Off-chain, we cache this data for fast dashboards, plus store shipment-specific metadata (receiver names, tracking notes, dispute reasons) that isn’t suitable for a public ledger.',
  },
  {
    title: '3. How we use data',
    body: 'To operate the product (dashboards, tracking, notifications), improve it (aggregated, de-identified usage patterns), and communicate with you about your shipments. We do not sell personal data.',
  },
  {
    title: '4. Third parties',
    body: 'We use standard infrastructure providers for hosting, email delivery, and error monitoring. Each is bound by a data processing agreement and receives only what’s necessary to provide their service.',
  },
  {
    title: '5. Your rights',
    body: 'You can export your off-chain shipment data or request account deletion at any time. Because on-chain activity is part of a public ledger, it cannot be deleted, but it was never linked to your identity by StellarExpress in the first place.',
  },
  {
    title: '6. Contact',
    body: 'Questions about this policy can be sent to privacy@stellarexpress.org.',
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" description="Last updated August 2026." />
      <Section>
        <Container className="mx-auto max-w-3xl space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="font-display text-xl font-bold">{section.title}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{section.body}</p>
            </div>
          ))}
        </Container>
      </Section>
    </>
  );
}
