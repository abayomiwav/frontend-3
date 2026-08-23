import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container, Section } from '@/components/ui/container';
import { LogoMark } from '@/components/logo-mark';

export function CtaSection() {
  return (
    <Section>
      <Container>
        <div className="relative border-2 border-foreground bg-primary text-center text-primary-foreground shadow-[8px_8px_0_0_var(--color-foreground)]">
          <div aria-hidden className="hazard-edge h-2 w-full" />
          <div className="px-8 py-16 sm:px-16 sm:py-20">
            <LogoMark className="mx-auto h-12 w-12" />
            <h2 className="mx-auto mt-6 max-w-2xl text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Ship your next order with the payment terms enforced by code
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-balance text-primary-foreground/85">
              Free to start as a sender or a carrier. Every shipment, big or small, gets the same
              milestone escrow protection.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Button variant="accent" size="lg" asChild>
                <Link href="/app">
                  Launch App <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-white/10"
                asChild
              >
                <Link href="/docs">Documentation</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
