import type { Metadata } from 'next';
import { PageHero } from '@/components/marketing/page-hero';
import { FeatureRow } from '@/components/marketing/feature-row';
import { RolesSection } from '@/components/marketing/roles-section';
import { AutomationSection } from '@/components/marketing/automation-section';
import { CtaSection } from '@/components/marketing/cta-section';

export const metadata: Metadata = {
  title: 'Features',
  description: 'Milestone escrow, real-time tracking, a carrier marketplace, dispute resolution, and ratings — everything a shipment needs.',
};

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title="Everything a shipment needs, enforced on-chain"
        description="Every feature below runs against the same escrow contract, governed by the same rules — nothing lives in a separate trust boundary."
      />

      <FeatureRow
        eyebrow="Milestone escrow"
        title="Carriers get paid on pickup, not just on faith"
        description="Every shipment splits payment into two on-chain milestones — a share released the moment pickup is confirmed, the rest on confirmed delivery."
        bullets={[
          'Split percentage set per shipment by the sender',
          'Funds move only when the contract confirms the condition',
          'No invoice, no chasing a courier for payment',
          'Works with XLM, USDC, EURC, or any Stellar asset',
        ]}
        kind="escrow"
      />
      <FeatureRow
        eyebrow="Real-time tracking"
        title="Every update, logged and visible to both sides"
        description="From funded to delivered, each shipment has a structured timeline — not a string of phone calls to a dispatcher."
        bullets={[
          'Status updates posted by sender or carrier',
          'Location and notes attached to every step',
          'Full history stays attached to the shipment permanently',
          'Receiver sees exactly where their order is',
        ]}
        kind="tracking"
        reverse
      />
      <FeatureRow
        eyebrow="Carrier marketplace"
        title="Open jobs, visible payout terms, no bidding war"
        description="Any carrier can browse open shipments and see the exact split and deadline before accepting — no negotiation required."
        bullets={[
          'Filter by category, route, or payout',
          'Accept a job with one signed transaction',
          'Deadlines protect senders if nobody claims a job in time',
          'First to accept gets the job, transparently',
        ]}
        kind="marketplace"
      />
      <FeatureRow
        eyebrow="Dispute resolution"
        title="A referee who can't touch money already paid"
        description="If something goes wrong, either side can raise a dispute, freezing what's left in escrow until a configured arbiter reviews it."
        bullets={[
          'Raising a dispute halts further releases immediately',
          'The arbiter can only split funds still held in escrow',
          'Every resolution is recorded on-chain, permanently',
          'Bounded authority by design, not by policy',
        ]}
        kind="disputes"
        reverse
      />
      <FeatureRow
        eyebrow="Ratings & reviews"
        title="Reputation that travels with every delivery"
        description="Senders and carriers rate each other after delivery — building a track record that makes the next match easier to trust."
        bullets={[
          'Reviews only unlock after a shipment is delivered',
          'A carrier’s average rating updates automatically',
          'Trust built on completed jobs, not claims',
          'Ratings are public on every carrier profile',
        ]}
        kind="ratings"
      />

      <RolesSection />
      <AutomationSection />
      <CtaSection />
    </>
  );
}
