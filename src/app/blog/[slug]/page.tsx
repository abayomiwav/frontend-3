import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Container, Section } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { CtaSection } from '@/components/marketing/cta-section';
import { blogPosts } from '@/lib/data';

const bodies: Record<string, string[]> = {
  'milestone-escrow-for-logistics': [
    'A single "pay on delivery" transfer protects the sender and nobody else. The carrier fronts fuel, time, and vehicle wear with no guarantee anything comes back if the sender simply refuses to confirm.',
    'A single "pay upfront" transfer flips the risk entirely onto the sender, who now has no leverage if the goods never move.',
    'Splitting the payment into two on-chain milestones — a share on confirmed pickup, the rest on confirmed delivery — means both sides have skin in the game at every stage, and neither has to extend blind trust to the other.',
  ],
  'dispute-resolution-with-bounded-authority': [
    'Most dispute processes give a mediator full discretion over the entire transaction. That sounds reasonable until you realize it means trusting one more party with the whole payment, not just the disputed part.',
    'StellarExpress’s arbiter can only ever touch what remains in escrow at the moment a dispute is raised. If 40% already paid out on pickup, that 40% is gone — untouchable, even by the arbiter. Only the remaining 60% is ever in play.',
    'This isn’t a policy we promise to follow. It’s enforced by the contract: `resolve_dispute` only has access to `total_amount - released_amount`, structurally, not by convention.',
  ],
  'soroban-for-shipment-escrow': [
    'We get asked why a logistics app needs a blockchain. The honest answer: for the settlement speed and fees, mostly not — a competent backend could handle payments fine.',
    'The real reason is enforcement. A payment rule enforced by a Soroban contract can’t be quietly changed by an engineer under pressure, bypassed by an admin panel, or overridden because a support ticket needed a favor.',
    'Stellar happened to already have fast, cheap settlement and mature primitives for asset transfer, which made it the practical choice for building this on top of.',
  ],
  'carrier-marketplace-incentives': [
    'Most delivery marketplaces show a carrier the price and the route, then settle payment terms separately, later, sometimes informally.',
    'On StellarExpress, the pickup/delivery split is visible before a carrier accepts — 40% now, 60% later, or whatever the sender set. Carriers we talked to said knowing the exact payout schedule up front changed which jobs they took, more than the total price did.',
    'Transparency about *when* you get paid turns out to matter as much as *how much*.',
  ],
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  const paragraphs = bodies[slug] ?? [];

  return (
    <>
      <Section className="pb-0 pt-16 sm:pt-24">
        <Container className="mx-auto max-w-2xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to blog
          </Link>
          <Badge variant="primary" className="mt-6">
            {post.tag}
          </Badge>
          <h1 className="mt-4 text-balance font-display text-3xl font-bold leading-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}{' '}
            · {post.readingTime}
          </p>
        </Container>
      </Section>

      <Section>
        <Container className="mx-auto max-w-2xl space-y-6 text-lg leading-relaxed text-foreground/90">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
