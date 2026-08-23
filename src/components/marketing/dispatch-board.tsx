'use client';

import { motion } from 'framer-motion';
import { activeShipments } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';

const statusCode = {
  open: { label: 'OPEN', className: 'text-muted-foreground' },
  accepted: { label: 'ACCEPTED', className: 'text-accent' },
  in_transit: { label: 'IN TRANSIT', className: 'text-primary' },
  delivered: { label: 'DELIVERED', className: 'text-success' },
};

export function DispatchBoard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="panel-thick w-full overflow-hidden"
    >
      <div className="flex items-center justify-between border-b-2 border-foreground bg-foreground px-5 py-2.5 text-background">
        <span className="font-mono text-xs font-bold uppercase tracking-widest">
          Live dispatch board
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-primary">
          <span className="h-1.5 w-1.5 animate-pulse bg-primary" /> Escrow active
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse font-mono text-xs">
          <thead>
            <tr className="border-b border-border bg-secondary/60 text-left uppercase tracking-widest text-muted-foreground">
              <th className="px-4 py-2 font-medium">Shipment</th>
              <th className="px-4 py-2 font-medium">Category</th>
              <th className="px-4 py-2 font-medium">Amount</th>
              <th className="px-4 py-2 font-medium">Split</th>
              <th className="px-4 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {activeShipments.map((s, i) => {
              const status = statusCode[s.status];
              return (
                <tr key={s.name} className="border-b border-border last:border-b-0 even:bg-secondary/20">
                  <td className="px-4 py-2.5">SHP-{String(482 - i).padStart(5, '0')}</td>
                  <td className="px-4 py-2.5 uppercase text-muted-foreground">{s.category}</td>
                  <td className="px-4 py-2.5 font-semibold">{formatCurrency(s.amount)}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{s.pickupBps}/{100 - s.pickupBps}</td>
                  <td className={`px-4 py-2.5 font-semibold ${status.className}`}>{status.label}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
