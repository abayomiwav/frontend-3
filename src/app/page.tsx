import { Hero } from '@/components/marketing/hero';
import { HowItWorks } from '@/components/marketing/how-it-works';
import { BentoFeatures } from '@/components/marketing/bento-features';
import { RolesSection } from '@/components/marketing/roles-section';
import { TechSpecsSection } from '@/components/marketing/tech-specs-section';
import { AutomationSection } from '@/components/marketing/automation-section';
import { ComparisonSection } from '@/components/marketing/comparison-section';
import { TestimonialsCarousel } from '@/components/marketing/testimonials-carousel';
import { FaqSection } from '@/components/marketing/faq-section';
import { CtaSection } from '@/components/marketing/cta-section';
import { Container, Section } from '@/components/ui/container';
import { SectionHeader } from '@/components/marketing/section-header';

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />

      <Section className="border-t border-border">
        <Container>
          <SectionHeader
            eyebrow="What's on the platform"
            title="Five parts, one escrow contract"
            description="Every feature below runs against the same shipment record — nothing lives in a separate trust boundary."
          />
          <div className="mt-14">
            <BentoFeatures />
          </div>
        </Container>
      </Section>

      <RolesSection />
      <TechSpecsSection />
      <AutomationSection />
      <ComparisonSection />
      <TestimonialsCarousel />
      <FaqSection />
      <CtaSection />
    </>
  );
}
