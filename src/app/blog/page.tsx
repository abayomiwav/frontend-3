import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/marketing/page-hero';
import { Container, Section } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { blogPosts } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes on logistics payments, dispute design, and building on Stellar.',
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes on logistics and Stellar"
        description="Product thinking, engineering notes, and stories from senders and carriers running shipments on StellarExpress."
      />
      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary"
              >
                <Badge variant="primary" className="w-fit">
                  {post.tag}
                </Badge>
                <h2 className="mt-4 text-balance font-display text-xl font-bold leading-snug">
                  {post.title}
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}{' '}
                    · {post.readingTime}
                  </span>
                  <span className="flex items-center gap-1 font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Read <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
