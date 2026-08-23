'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { DispatchBoard } from './dispatch-board';
import { RouteBackdrop } from './route-backdrop';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border pb-20 pt-14 sm:pt-20">
      <RouteBackdrop />
      <Container className="max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="primary">Ship it. Track it. Trust the escrow.</Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-6 text-balance font-display text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl"
        >
          Move goods on Stellar, paid in two milestones.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground"
        >
          Food, electronics, documents, or furniture — every shipment on StellarExpress is backed
          by an on-chain escrow that pays the carrier a share on pickup and the rest on confirmed
          delivery. No upfront risk, no chasing payment.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Button size="lg" asChild>
            <Link href="/app">
              Launch App{' '}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/docs">
              <BookOpen className="h-4 w-4" /> Documentation
            </Link>
          </Button>
        </motion.div>
      </Container>

      <Container className="mt-14 max-w-5xl">
        <DispatchBoard />
      </Container>

      <Container className="max-w-5xl">
        <p className="mt-4 font-mono text-xs text-muted-foreground">
          NON-CUSTODIAL · SOROBAN SMART CONTRACT · OPEN SOURCE ·{' '}
          <a href="https://github.com/StellarExpress" className="underline hover:text-foreground">
            STELLAREXPRESS
          </a>
        </p>
      </Container>
    </section>
  );
}
