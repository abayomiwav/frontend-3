import type { Metadata } from 'next';
import { PageHero } from '@/components/marketing/page-hero';
import { Container, Section } from '@/components/ui/container';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms governing use of StellarExpress.',
};

const sections = [
  {
    title: '1. The service',
    body: 'StellarExpress provides a non-custodial interface to a shipment escrow implemented as a Soroban smart contract on the Stellar network. We do not hold, control, or have the ability to move escrowed funds — every state-changing action requires the relevant party’s signature.',
  },
  {
    title: '2. Your responsibilities',
    body: 'You are responsible for the security of your own signing keys or passkey device, for the accuracy of information you provide about a shipment, and for compliance with laws applicable to you regarding the goods you ship, carry, or receive.',
  },
  {
    title: '3. No carrier or logistics guarantee',
    body: 'StellarExpress is payment and coordination infrastructure, not a carrier, freight forwarder, or insurer. We do not guarantee delivery times, handling quality, or the condition of goods — the escrow protects payment terms, not the physical shipment itself.',
  },
  {
    title: '4. Network risk',
    body: 'The Stellar network, Soroban contracts, and any third-party wallet software carry inherent technical risk. StellarExpress is not liable for losses arising from network outages, contract bugs beyond our reasonable control, or third-party wallet failures.',
  },
  {
    title: '5. Dispute resolution',
    body: 'The configured arbiter’s decision on a raised dispute is final within the scope of funds still held in escrow. StellarExpress does not adjudicate disputes outside the contract’s dispute mechanism.',
  },
  {
    title: '6. Changes to these terms',
    body: 'We’ll notify active accounts of material changes to these terms at least 14 days before they take effect.',
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" description="Last updated August 2026." />
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
