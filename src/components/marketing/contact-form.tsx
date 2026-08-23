'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const schema = z.object({
  name: z.string().min(2, 'Tell us your name'),
  email: z.email('Enter a valid email'),
  topic: z.enum(['general', 'fleet', 'security', 'press']),
  message: z.string().min(10, 'Give us a little more detail'),
});

type FormValues = z.infer<typeof schema>;

const topics: { value: FormValues['topic']; label: string }[] = [
  { value: 'general', label: 'General question' },
  { value: 'fleet', label: 'Fleet / logistics operator' },
  { value: 'security', label: 'Security disclosure' },
  { value: 'press', label: 'Press' },
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { topic: 'general' } });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-10 text-center">
        <CheckCircle2 className="h-8 w-8 text-primary" />
        <h3 className="font-display text-xl font-bold">Message sent</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Thanks for reaching out — a member of the team will reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-border bg-card p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            {...register('name')}
            className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            placeholder="Amaka Chukwu"
          />
          {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            placeholder="you@express.com"
          />
          {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="topic" className="text-sm font-medium">
          Topic
        </label>
        <select
          id="topic"
          {...register('topic')}
          className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
        >
          {topics.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          {...register('message')}
          className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          placeholder="Tell us about the routes or volume you're shipping…"
        />
        {errors.message && <p className="mt-1.5 text-xs text-destructive">{errors.message.message}</p>}
      </div>

      <Button type="submit" size="lg" className="mt-7 w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Send message
      </Button>
    </form>
  );
}
