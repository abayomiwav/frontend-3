'use client';

import { useEffect, useState, type MouseEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AlertTriangle, ChevronRight, Loader2, Package, Plus, Truck, TrendingUp } from 'lucide-react';
import { Container, Section } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatCard } from './stat-card';
import { CreateShipmentForm } from './create-shipment-form';
import { TERMINAL_STATUSES, formatAmount, initials, statusStyles } from './shipment-ui';
import {
  ApiError,
  acceptShipment,
  getMe,
  getMyShipmentsAsCarrier,
  getMyShipmentsAsSender,
  getOpenShipments,
  type CurrentUser,
  type Shipment,
} from '@/lib/api';
import { getToken } from '@/lib/auth';
import { cn } from '@/lib/utils';

function ShipmentRow({
  shipment,
  role,
  action,
  linkable = true,
}: {
  shipment: Shipment;
  role: string;
  action?: ReactNode;
  linkable?: boolean;
}) {
  const status = statusStyles[shipment.status];
  const content = (
    <>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">
          {shipment.originLabel} → {shipment.destinationLabel}
        </p>
        <p className="mt-0.5 truncate font-mono text-xs text-muted-foreground">
          {role} · {shipment.category} · to {shipment.receiverName}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-semibold">
            {formatAmount(shipment.totalAmount, shipment.assetCode)}
          </p>
          <span
            className={cn(
              'mt-1 inline-block border px-2 py-0.5 font-mono text-[10px] font-semibold uppercase',
              status.className,
            )}
          >
            {status.label}
          </span>
        </div>
        {action ?? (linkable && <ChevronRight className="h-4 w-4 text-muted-foreground" />)}
      </div>
    </>
  );

  const className =
    'flex items-center justify-between gap-4 border-b border-l-4 border-r border-t border-border border-l-primary bg-card px-4 py-3';

  if (!linkable) {
    return <div className={className}>{content}</div>;
  }

  return (
    <Link href={`/app/shipments/${shipment.id}`} className={cn(className, 'transition-colors hover:bg-secondary/40')}>
      {content}
    </Link>
  );
}

export function AuthenticatedDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [sent, setSent] = useState<Shipment[]>([]);
  const [carried, setCarried] = useState<Shipment[]>([]);
  const [openJobs, setOpenJobs] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const load = async () => {
    setError(null);
    try {
      const [me, asSender, asCarrier, marketplace] = await Promise.all([
        getMe(),
        getMyShipmentsAsSender(),
        getMyShipmentsAsCarrier(),
        getOpenShipments(),
      ]);
      setUser(me);
      setSent(asSender);
      setCarried(asCarrier);
      setOpenJobs(marketplace);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Something went wrong loading your dashboard.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!getToken()) {
      router.replace('/signin');
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch-on-mount; load() is also reused as a refetch after mutations
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAccept = async (shipmentId: string) => {
    setError(null);
    try {
      await acceptShipment(shipmentId);
      await load();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Could not accept this shipment.');
    }
  };

  if (loading) {
    return (
      <Section className="pt-24">
        <Container className="flex items-center justify-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" /> Loading your dashboard…
        </Container>
      </Section>
    );
  }

  if (!user) {
    return (
      <Section className="pt-24">
        <Container className="mx-auto max-w-md text-center">
          <div className="mx-auto flex items-start gap-2 border-2 border-destructive bg-destructive/5 px-4 py-3 text-left text-sm">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
            <p className="text-foreground/85">
              {error ?? 'Could not load your account. Try signing in again.'}
            </p>
          </div>
        </Container>
      </Section>
    );
  }

  const mine = [...sent, ...carried];
  const active = mine.filter((s) => !TERMINAL_STATUSES.includes(s.status));
  const delivered = mine.filter((s) => s.status === 'DELIVERED' || s.status === 'RESOLVED');

  const stats = [
    { icon: Package, label: 'Total shipments', value: String(mine.length) },
    { icon: TrendingUp, label: 'Active now', value: String(active.length) },
    { icon: Package, label: 'Delivered', value: String(delivered.length) },
    { icon: Truck, label: 'Open marketplace jobs', value: String(openJobs.length) },
  ];

  return (
    <>
      <div className="border-b border-border bg-secondary/40">
        <Container className="flex flex-wrap items-center justify-between gap-4 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center border-2 border-foreground bg-primary text-sm font-bold text-primary-foreground">
              {initials(user.displayName)}
            </span>
            <div>
              <p className="font-display text-lg font-bold">{user.displayName}</p>
              <p className="font-mono text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={user.isCarrier ? 'accent' : 'primary'}>
              {user.isCarrier ? 'Carrier' : 'Sender'}
            </Badge>
            <Badge variant="outline">
              Member since{' '}
              {new Date(user.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              })}
            </Badge>
            {!user.stellarPublicKey && <Badge variant="outline">Wallet not linked</Badge>}
          </div>
        </Container>
      </div>

      <Section className="pt-12">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight">Your dashboard</h1>
              <p className="mt-1.5 text-muted-foreground">
                Real shipments tied to your account, pulled live from the API — not sample data.
              </p>
            </div>
            <Button size="sm" onClick={() => setShowCreate((v) => !v)}>
              <Plus className="h-4 w-4" /> {showCreate ? 'Close' : 'Create shipment'}
            </Button>
          </div>

          {error && (
            <div className="mt-4 flex items-start gap-2 border-2 border-destructive bg-destructive/5 px-4 py-3 text-sm">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
              <p className="text-foreground/85">{error}</p>
            </div>
          )}

          {showCreate && (
            <div className="mt-6">
              <CreateShipmentForm
                onCreated={() => {
                  setShowCreate(false);
                  load();
                }}
              />
            </div>
          )}

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="panel p-6">
              <h2 className="font-display text-lg font-bold">Your shipments</h2>
              <div className="mt-5 space-y-2.5">
                {mine.length === 0 && (
                  <p className="border border-dashed border-border bg-secondary/30 px-4 py-6 text-center text-sm text-muted-foreground">
                    No shipments yet. Create your first one above.
                  </p>
                )}
                {sent.map((s) => (
                  <ShipmentRow key={s.id} shipment={s} role="Sending" />
                ))}
                {carried.map((s) => (
                  <ShipmentRow key={s.id} shipment={s} role="Carrying" />
                ))}
              </div>
            </div>

            <div className="panel p-6">
              <h2 className="font-display text-lg font-bold">Open marketplace jobs</h2>
              <div className="mt-5 space-y-2.5">
                {openJobs.length === 0 && (
                  <p className="border border-dashed border-border bg-secondary/30 px-4 py-6 text-center text-sm text-muted-foreground">
                    No open jobs right now.
                  </p>
                )}
                {openJobs.map((s) => (
                  <ShipmentRow
                    key={s.id}
                    shipment={s}
                    role="Open"
                    linkable={false}
                    action={
                      user.isCarrier && s.senderId !== user.id ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e: MouseEvent) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAccept(s.id);
                          }}
                        >
                          Accept
                        </Button>
                      ) : undefined
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
