'use client';

import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  MapPin,
  PackageSearch,
  ShieldAlert,
  Star,
  Truck,
  Wallet,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { escrowRules, openMarketplaceJobs, trackingTimeline } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';

function Tile({
  className,
  eyebrow,
  icon: Icon,
  title,
  description,
  children,
}: {
  className?: string;
  eyebrow: string;
  icon: React.ElementType;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className={`panel flex flex-col p-6 ${className ?? ''}`}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        <Badge variant="outline" className="border-none px-0 py-0 text-muted-foreground">
          {eyebrow}
        </Badge>
      </div>
      <h3 className="mt-3 font-display text-xl font-bold sm:text-2xl">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      {children && <div className="mt-5 flex-1">{children}</div>}
    </motion.div>
  );
}

export function BentoFeatures() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-flow-dense lg:grid-cols-3">
      <Tile
        className="lg:col-span-2 lg:row-span-2"
        eyebrow="Milestone escrow"
        icon={Wallet}
        title="Carriers get paid on pickup, not just on faith"
        description="Every shipment splits payment into two on-chain milestones — a share on confirmed pickup, the rest on confirmed delivery."
      >
        <div className="border border-foreground">
          <div className="flex h-3 w-full overflow-hidden">
            <div className="w-[40%] bg-primary" />
            <div className="w-[60%] bg-accent" />
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <div className="border-l-4 border-primary border-y border-r border-border bg-card px-3 py-2.5">
            <p className="font-mono text-[10px] uppercase text-muted-foreground">On pickup</p>
            <p className="mt-0.5 font-display font-bold text-success">{formatCurrency(960)} released</p>
          </div>
          <div className="border-l-4 border-accent border-y border-r border-border bg-card px-3 py-2.5">
            <p className="font-mono text-[10px] uppercase text-muted-foreground">On delivery</p>
            <p className="mt-0.5 font-display font-bold text-muted-foreground">
              {formatCurrency(1440)} pending
            </p>
          </div>
        </div>
        <ul className="mt-4 space-y-2">
          {escrowRules.slice(0, 3).map((rule) => (
            <li key={rule} className="flex items-start gap-2 text-xs text-foreground/80">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
              {rule}
            </li>
          ))}
        </ul>
      </Tile>

      <Tile
        eyebrow="Real-time tracking"
        icon={PackageSearch}
        title="Every update, logged"
        description="A structured timeline, not a string of calls to a dispatcher."
      >
        <div className="space-y-2.5">
          {trackingTimeline.slice(0, 3).map((step) => (
            <div key={step.status} className="flex items-start gap-2 text-xs">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
              <div>
                <p className="font-medium">{step.status}</p>
                <p className="text-muted-foreground">{step.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Tile>

      <Tile
        eyebrow="Carrier marketplace"
        icon={Truck}
        title="Open jobs, visible terms"
        description="See the exact split and deadline before accepting."
      >
        <div className="space-y-2">
          {openMarketplaceJobs.slice(0, 2).map((job) => (
            <div
              key={job.route}
              className="flex items-center justify-between border border-border bg-card px-3 py-2 text-xs"
            >
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="h-3 w-3 text-muted-foreground" /> {job.route}
              </span>
              <span className="flex items-center gap-1 text-warning">
                <Clock className="h-3 w-3" /> {job.deadline}
              </span>
            </div>
          ))}
        </div>
      </Tile>

      <Tile
        className="lg:col-span-2"
        eyebrow="Dispute resolution"
        icon={ShieldAlert}
        title="A referee who can't touch money already paid"
        description="Raising a dispute freezes what's left in escrow. The arbiter can only ever split funds not yet released — never funds already paid to a carrier."
      >
        <div className="flex items-start gap-3 border-2 border-destructive bg-destructive/5 px-4 py-3">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
          <p className="text-xs text-foreground/85">
            Dispute raised on SHP-00482 — remaining 60% frozen pending arbiter review
          </p>
        </div>
      </Tile>

      <Tile
        eyebrow="Ratings & reviews"
        icon={Star}
        title="Reputation that travels"
        description="Trust built on completed jobs, not claims."
      >
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star key={n} className="h-4 w-4 fill-warning text-warning" />
          ))}
          <span className="ml-1.5 font-mono text-xs text-muted-foreground">4.9 / 112</span>
        </div>
      </Tile>
    </div>
  );
}
