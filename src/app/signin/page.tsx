'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertTriangle, Loader2, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container, Section } from '@/components/ui/container';
import { LogoMark } from '@/components/logo-mark';
import { signIn, ApiError } from '@/lib/api';
import { storeToken } from '@/lib/auth';
import { RouteBackdrop } from '@/components/marketing/route-backdrop';

const schema = z.object({
  email: z.email('Enter a valid email'),
  password: z.string().min(1, 'Enter your password'),
});

type FormValues = z.infer<typeof schema>;

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setError(null);
    try {
      const token = await signIn(values);
      storeToken(token);
      router.push('/app');
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Sign in failed. Please try again.');
    }
  };

  return (
    <Section className="relative flex min-h-[calc(100vh-3.5rem)] items-center overflow-hidden py-16">
      <RouteBackdrop />
      <Container className="mx-auto max-w-md">
        <div className="panel-thick p-8 shadow-[8px_8px_0_0_var(--color-primary)]">
          <div className="flex items-center gap-3">
            <LogoMark className="h-9 w-9" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                StellarExpress
              </p>
              <h1 className="font-display text-xl font-bold">Sign in</h1>
            </div>
          </div>

          {error && (
            <div className="mt-6 flex items-start gap-2 border-2 border-destructive bg-destructive/5 px-4 py-3 text-sm">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
              <p className="text-foreground/85">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email')}
                className="mt-1.5 w-full border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                placeholder="you@express.com"
              />
              {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                {...register('password')}
                className="mt-1.5 w-full border border-input bg-background px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1.5 text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
              Sign in
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            No account yet?{' '}
            <Link href="/signup" className="font-medium text-primary underline underline-offset-4">
              Sign up
            </Link>
          </p>
        </div>

        <p className="mt-4 text-center font-mono text-[11px] text-muted-foreground">
          Connects to the StellarExpress API — set NEXT_PUBLIC_API_URL to point at a deployed backend.
        </p>
      </Container>
    </Section>
  );
}
