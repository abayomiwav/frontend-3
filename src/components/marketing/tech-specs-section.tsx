'use client';

import { motion } from 'framer-motion';
import { Container, Section } from '@/components/ui/container';
import { SectionHeader } from './section-header';

const specs = [
  { label: 'Settlement', value: '3–5 seconds', note: 'Stellar consensus, every transaction' },
  { label: 'Network fee', value: '~$0.00001', note: 'per operation, base fee' },
  { label: 'Contract runtime', value: 'Soroban', note: 'rules checked in code, every call' },
  { label: 'Authorization', value: 'Per-party signature', note: 'accept, pickup, delivery, dispute' },
  { label: 'Asset support', value: 'XLM / USDC / EURC / custom', note: 'any Stellar Asset Contract' },
  { label: 'Dispute authority', value: 'Bounded', note: 'arbiter can only split unreleased funds' },
  { label: 'Sign-in', value: 'Passkey or hardware wallet', note: 'no password, no seed screenshot' },
  { label: 'Audit trail', value: 'Permanent, public', note: 'every event timestamped on-ledger' },
];

export function TechSpecsSection() {
  return (
    <Section className="border-t border-border">
      <Container>
        <SectionHeader
          eyebrow="System"
          title="Built on infrastructure designed for real money movement"
          description="StellarExpress doesn't reinvent settlement — it puts a logistics-friendly interface on primitives Stellar already does well, and locks security in as the default."
        />

        <div className="mt-14 grid gap-0 border-2 border-foreground lg:grid-cols-2">
          <ol className="divide-y divide-border">
            {specs.map((spec, i) => (
              <motion.li
                key={spec.label}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="flex items-start gap-4 px-5 py-4"
              >
                <span className="mt-0.5 font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground/85">{spec.label}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">{spec.note}</p>
                </div>
                <span className="font-display text-sm font-bold text-primary">{spec.value}</span>
              </motion.li>
            ))}
          </ol>

          <div className="corner-ticks border-t-2 border-foreground bg-foreground p-6 font-mono text-xs text-background lg:border-l-2 lg:border-t-0">
            <p className="text-primary">$ stellarexpress status --contract escrow</p>
            <div className="mt-4 space-y-2 opacity-90">
              <p>network ......... testnet</p>
              <p>contract ........ CDLZ...GCYSC</p>
              <p>status ........... <span className="text-success">healthy</span></p>
              <p>open_shipments ... 4</p>
              <p>arbiter .......... configured</p>
              <p>custody .......... <span className="text-primary">non-custodial</span></p>
            </div>
            <p className="mt-6 flex items-center gap-2 text-background/60">
              <span className="h-2 w-2 animate-pulse bg-success" /> connection live
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
