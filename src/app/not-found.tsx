import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { LogoMark } from '@/components/logo-mark';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <LogoMark className="h-14 w-14 opacity-70" />
      <p className="mt-8 font-display text-6xl font-bold tracking-tight">404</p>
      <h1 className="mt-3 font-display text-2xl font-bold">This route doesn’t exist</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you’re looking for doesn’t exist, or has moved somewhere we haven’t linked yet.
      </p>
      <Button className="mt-8" asChild>
        <Link href="/">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
      </Button>
    </Container>
  );
}
