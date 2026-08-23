'use client';

import { motion } from 'framer-motion';
import { Container, Section } from '@/components/ui/container';
import { SectionHeader } from './section-header';
import { automationWorkflows } from '@/lib/data';

export function AutomationSection() {
  return (
    <Section className="border-t border-border bg-secondary/30">
      <Container>
        <SectionHeader
          eyebrow="Runs itself"
          title="The contract acts the moment conditions are met"
          description="No cron job to babysit, no dashboard button to remember to click — every rule below fires automatically, on-chain."
        />
        <div className="mt-14 border border-border bg-foreground font-mono text-xs text-background">
          <div className="border-b border-background/20 px-5 py-2.5 text-background/60">
            $ tail -f automation.log
          </div>
          {automationWorkflows.map((flow, i) => (
            <motion.div
              key={flow.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex flex-col gap-1 border-b border-background/10 px-5 py-4 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-4"
            >
              <span className="shrink-0 text-primary">[{flow.trigger}]</span>
              <span className="shrink-0 font-semibold text-background">{flow.title}</span>
              <span className="text-background/60">{flow.description}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
