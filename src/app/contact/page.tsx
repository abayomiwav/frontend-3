import type { Metadata } from 'next';
import { Mail, MessageCircle, Truck } from 'lucide-react';
import { PageHero } from '@/components/marketing/page-hero';
import { ContactForm } from '@/components/marketing/contact-form';
import { Container, Section } from '@/components/ui/container';
import { siteConfig } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Talk to the StellarExpress team — general questions, fleet operators, security, or press.',
};

const channels = [
  { icon: Mail, title: 'Email', description: 'hello@stellarexpress.org' },
  { icon: MessageCircle, title: 'Discord', description: 'Fastest way to reach the team' },
  { icon: Truck, title: 'Fleet operators', description: 'Multi-carrier and bulk shipment setups' },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to a real person"
        description="Questions about a shipment, a security disclosure, or interested in StellarExpress for a fleet — we read everything."
      />
      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-6">
            {channels.map((channel) => (
              <div key={channel.title} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <channel.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{channel.title}</p>
                  <p className="text-sm text-muted-foreground">{channel.description}</p>
                </div>
              </div>
            ))}
            <a
              href={siteConfig.discord}
              target="_blank"
              rel="noreferrer"
              className="inline-block text-sm font-medium text-primary hover:underline"
            >
              Join the Discord →
            </a>
          </div>
          <ContactForm />
        </Container>
      </Section>
    </>
  );
}
