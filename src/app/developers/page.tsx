import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/marketing/page-hero';
import { SectionHeader } from '@/components/marketing/section-header';
import { Container, Section } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { GithubIcon } from '@/components/social-icons';
import { repos, techStack } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Developers',
  description: 'StellarExpress is open source — React, Next.js, Soroban, NestJS, and Prisma across three repositories.',
};

const categories = Array.from(new Set(techStack.map((t) => t.category)));

export default function DevelopersPage() {
  return (
    <>
      <PageHero
        eyebrow="Developers"
        title="StellarExpress is open source, top to bottom"
        description="Contracts, backend, and frontend all live in the open under StellarExpress. Fork it, self-host it, or send a pull request."
      >
        <div className="mt-8 flex justify-center">
          <Button size="lg" asChild>
            <a href="https://github.com/StellarExpress" target="_blank" rel="noreferrer">
              <GithubIcon className="h-4 w-4" /> View on GitHub
            </a>
          </Button>
        </div>
      </PageHero>

      <Section>
        <Container>
          <SectionHeader eyebrow="Repositories" title="Three repos, one product" />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {repos.map((repo) => (
              <a
                key={repo.name}
                href={repo.href}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-semibold text-primary">
                      StellarExpress/{repo.name}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{repo.description}</p>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-secondary/30">
        <Container>
          <SectionHeader eyebrow="Stack" title="Built with tools you already know" />
          <div className="mt-12 space-y-8">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {category}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {techStack
                    .filter((t) => t.category === category)
                    .map((tech) => (
                      <span
                        key={tech.name}
                        className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium"
                      >
                        {tech.name}
                      </span>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-display text-2xl font-bold">Contributing</h2>
          <p className="max-w-xl text-muted-foreground">
            Issues labeled <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-sm">good first issue</code>{' '}
            are a great place to start. Read the docs, open a PR, and join the Discord for review.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/docs">Read Documentation</Link>
            </Button>
            <Button asChild>
              <a href="https://github.com/StellarExpress" target="_blank" rel="noreferrer">
                Browse issues
              </a>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
