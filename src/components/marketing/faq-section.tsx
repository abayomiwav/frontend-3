import { Container, Section } from '@/components/ui/container';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SectionHeader } from './section-header';
import { faqs } from '@/lib/data';

export function FaqSection() {
  return (
    <Section className="border-t border-border">
      <Container className="mx-auto max-w-3xl">
        <SectionHeader eyebrow="FAQ" title="Questions before you ship your first order" />
        <Accordion type="single" collapsible className="mt-12">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  );
}
