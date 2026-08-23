'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Clock, MapPin, ShieldAlert, Star } from 'lucide-react';
import { escrowRules, openMarketplaceJobs, trackingTimeline } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';

type Kind = 'escrow' | 'tracking' | 'marketplace' | 'disputes' | 'ratings';

function EscrowMockup() {
  return (
    <div>
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Total escrowed</p>
          <p className="font-display text-2xl font-bold">{formatCurrency(2400)}</p>
        </div>
        <span className="border border-primary bg-primary/10 px-2.5 py-1 font-mono text-xs font-semibold text-primary">
          40 / 60 SPLIT
        </span>
      </div>
      <div className="flex h-3 w-full overflow-hidden border border-foreground">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '40%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-primary"
        />
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '60%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="bg-accent"
        />
      </div>
      <div className="mt-4 space-y-2.5">
        <div className="flex items-center justify-between border-l-4 border-primary bg-card px-4 py-3 border-t border-r border-b border-border text-sm">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" /> Released on pickup
          </span>
          <span className="font-semibold">{formatCurrency(960)}</span>
        </div>
        <div className="flex items-center justify-between border-l-4 border-primary bg-card px-4 py-3 border-t border-r border-b border-border text-sm">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent" /> Released on delivery
          </span>
          <span className="font-semibold">{formatCurrency(1440)}</span>
        </div>
      </div>
    </div>
  );
}

function TrackingMockup() {
  return (
    <div className="space-y-4">
      {trackingTimeline.map((step, i) => (
        <div key={step.status} className="flex gap-3">
          <div className="flex flex-col items-center">
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${i === trackingTimeline.length - 1 ? 'bg-success text-white' : 'bg-primary/10 text-primary'}`}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
            </span>
            {i < trackingTimeline.length - 1 && <span className="mt-1 h-full w-px flex-1 bg-border" />}
          </div>
          <div className="pb-4">
            <p className="text-sm font-medium">{step.status}</p>
            <p className="text-xs text-muted-foreground">
              {step.location} · {step.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function MarketplaceMockup() {
  return (
    <div className="space-y-2.5">
      {openMarketplaceJobs.map((job) => (
        <div
          key={job.route}
          className="flex items-center justify-between border-l-4 border-primary bg-card px-4 py-3 border-t border-r border-b border-border"
        >
          <div>
            <p className="flex items-center gap-1.5 text-sm font-medium">
              <MapPin className="h-3.5 w-3.5 text-muted-foreground" /> {job.route}
            </p>
            <p className="text-xs text-muted-foreground">{job.category}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">{formatCurrency(job.amount)}</p>
            <p className="flex items-center justify-end gap-1 text-xs text-warning">
              <Clock className="h-3 w-3" /> {job.deadline}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function DisputesMockup() {
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3 border-2 border-destructive bg-destructive/5 px-4 py-3.5">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
        <div>
          <p className="text-sm font-medium">Dispute raised</p>
          <p className="text-xs text-muted-foreground">Remaining 60% frozen — pending arbiter review</p>
        </div>
      </div>
      {escrowRules.slice(0, 4).map((rule) => (
        <div key={rule} className="flex items-start gap-2.5 border-l-4 border-primary bg-card px-4 py-3 border-t border-r border-b border-border">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p className="text-sm text-foreground/90">{rule}</p>
        </div>
      ))}
    </div>
  );
}

function RatingsMockup() {
  return (
    <div>
      <div className="flex items-center gap-4 border border-border bg-card p-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-xl font-bold text-primary">
          DA
        </div>
        <div>
          <p className="font-semibold">Deji Adewale</p>
          <div className="mt-1 flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star key={n} className="h-3.5 w-3.5 fill-warning text-warning" />
            ))}
            <span className="ml-1.5 text-xs text-muted-foreground">4.9 · 112 deliveries</span>
          </div>
        </div>
      </div>
      <div className="mt-3 space-y-2.5">
        <div className="border-l-4 border-primary bg-card px-4 py-3 border-t border-r border-b border-border text-sm text-muted-foreground">
          “Careful with the fragile items and updated me the whole way.” — Amaka C.
        </div>
        <div className="border-l-4 border-primary bg-card px-4 py-3 border-t border-r border-b border-border text-sm text-muted-foreground">
          “Picked up within the hour, delivered ahead of schedule.” — Tunde B.
        </div>
      </div>
    </div>
  );
}

export function FeatureMockup({ kind }: { kind: Kind }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className="panel-thick p-6 shadow-[6px_6px_0_0_var(--color-primary)] sm:p-8"
    >
      {kind === 'escrow' && <EscrowMockup />}
      {kind === 'tracking' && <TrackingMockup />}
      {kind === 'marketplace' && <MarketplaceMockup />}
      {kind === 'disputes' && <DisputesMockup />}
      {kind === 'ratings' && <RatingsMockup />}
    </motion.div>
  );
}
