'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  Loader2,
  Package,
  Send,
  X,
} from 'lucide-react';
import { Container, Section } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  STATUS_ORDER,
  formatAmount,
  statusStyles,
} from '@/components/dashboard/shipment-ui';
import {
  ApiError,
  acceptShipment,
  addTrackingUpdate,
  cancelShipment,
  confirmDelivery,
  confirmPickup,
  getMe,
  getShipment,
  getTrackingUpdates,
  type CurrentUser,
  type Shipment,
  type TrackingUpdate,
} from '@/lib/api';
import { getToken } from '@/lib/auth';
import { cn } from '@/lib/utils';

function StatusStepper({ shipment }: { shipment: Shipment }) {
  if (['CANCELLED', 'EXPIRED', 'DISPUTED', 'RESOLVED'].includes(shipment.status)) {
    const status = statusStyles[shipment.status];
    return (
      <div className={cn('border-2 px-4 py-3 text-center font-mono text-sm font-semibold uppercase', status.className)}>
        {status.label}
      </div>
    );
  }

  const currentIndex = STATUS_ORDER.indexOf(shipment.status);
  return (
    <div className="flex items-center">
      {STATUS_ORDER.map((step, i) => {
        const status = statusStyles[step];
        const reached = i <= currentIndex;
        return (
          <div key={step} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center border-2 font-mono text-xs font-bold',
                  reached
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-secondary text-muted-foreground',
                )}
              >
                {i + 1}
              </div>
              <span
                className={cn(
                  'font-mono text-[10px] uppercase tracking-wide',
                  reached ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {status.label}
              </span>
            </div>
            {i < STATUS_ORDER.length - 1 && (
              <div className={cn('mx-2 h-0.5 flex-1', reached ? 'bg-primary' : 'bg-border')} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function ShipmentDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [updates, setUpdates] = useState<TrackingUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionPending, setActionPending] = useState(false);
  const [note, setNote] = useState('');
  const [noteStatus, setNoteStatus] = useState('');

  const load = async () => {
    setError(null);
    try {
      const [me, s, t] = await Promise.all([
        getMe(),
        getShipment(params.id),
        getTrackingUpdates(params.id),
      ]);
      setUser(me);
      setShipment(s);
      setUpdates(t);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Could not load this shipment.');
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
  }, [params.id]);

  const runAction = async (fn: () => Promise<Shipment>, fallbackError: string) => {
    setActionPending(true);
    setError(null);
    try {
      await fn();
      await load();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : fallbackError);
    } finally {
      setActionPending(false);
    }
  };

  const submitNote = async () => {
    if (!shipment || !noteStatus.trim()) return;
    setActionPending(true);
    setError(null);
    try {
      await addTrackingUpdate({ shipmentId: shipment.id, status: noteStatus, note: note || undefined });
      setNote('');
      setNoteStatus('');
      await load();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Could not post this update.');
    } finally {
      setActionPending(false);
    }
  };

  if (loading) {
    return (
      <Section className="pt-24">
        <Container className="flex items-center justify-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" /> Loading shipment…
        </Container>
      </Section>
    );
  }

  if (!shipment || !user) {
    return (
      <Section className="pt-24">
        <Container className="mx-auto max-w-md text-center">
          <div className="mx-auto flex items-start gap-2 border-2 border-destructive bg-destructive/5 px-4 py-3 text-left text-sm">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
            <p className="text-foreground/85">{error ?? 'Shipment not found.'}</p>
          </div>
          <Link href="/app" className="mt-4 inline-block text-sm font-medium text-primary underline underline-offset-4">
            Back to dashboard
          </Link>
        </Container>
      </Section>
    );
  }

  const isSender = shipment.senderId === user.id;
  const isCarrier = shipment.carrierId === user.id;
  const canAccept = shipment.status === 'OPEN' && !isSender && user.isCarrier;
  const canCancel = shipment.status === 'OPEN' && isSender;
  const canConfirmPickup = shipment.status === 'ACCEPTED' && isCarrier;
  const canConfirmDelivery = shipment.status === 'IN_TRANSIT' && (isSender || isCarrier);
  const canPostUpdate = (isSender || isCarrier) && !['CANCELLED', 'EXPIRED', 'DISPUTED', 'RESOLVED'].includes(shipment.status);

  return (
    <Section className="pt-12">
      <Container className="mx-auto max-w-3xl">
        <Link href="/app" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to dashboard
        </Link>

        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              {shipment.originLabel} → {shipment.destinationLabel}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              To {shipment.receiverName} · {shipment.receiverAddress}
            </p>
          </div>
          <p className="font-display text-xl font-bold">
            {formatAmount(shipment.totalAmount, shipment.assetCode)}
          </p>
        </div>

        {error && (
          <div className="mt-4 flex items-start gap-2 border-2 border-destructive bg-destructive/5 px-4 py-3 text-sm">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
            <p className="text-foreground/85">{error}</p>
          </div>
        )}

        <div className="panel mt-6 p-6">
          <StatusStepper shipment={shipment} />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="panel p-4">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Category</p>
            <p className="mt-1 text-sm font-semibold">{shipment.category}</p>
          </div>
          <div className="panel p-4">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Pickup release</p>
            <p className="mt-1 text-sm font-semibold">{shipment.pickupReleaseBps / 100}% on pickup</p>
          </div>
          <div className="panel p-4">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Deadline</p>
            <p className="mt-1 text-sm font-semibold">
              {new Date(shipment.deliveryDeadlineAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>

        {(canAccept || canCancel || canConfirmPickup || canConfirmDelivery) && (
          <div className="panel-thick mt-6 flex flex-wrap gap-3 p-6">
            {canAccept && (
              <Button
                disabled={actionPending}
                onClick={() => runAction(() => acceptShipment(shipment.id), 'Could not accept this shipment.')}
              >
                <Check className="h-4 w-4" /> Accept shipment
              </Button>
            )}
            {canConfirmPickup && (
              <Button
                disabled={actionPending}
                onClick={() => runAction(() => confirmPickup(shipment.id), 'Could not confirm pickup.')}
              >
                <Package className="h-4 w-4" /> Confirm pickup
              </Button>
            )}
            {canConfirmDelivery && (
              <Button
                disabled={actionPending}
                onClick={() => runAction(() => confirmDelivery(shipment.id), 'Could not confirm delivery.')}
              >
                <Check className="h-4 w-4" /> Confirm delivery
              </Button>
            )}
            {canCancel && (
              <Button
                variant="outline"
                disabled={actionPending}
                onClick={() => runAction(() => cancelShipment(shipment.id), 'Could not cancel this shipment.')}
              >
                <X className="h-4 w-4" /> Cancel shipment
              </Button>
            )}
          </div>
        )}

        <div className="panel mt-6 p-6">
          <h2 className="font-display text-lg font-bold">Tracking</h2>
          <div className="mt-4 space-y-3">
            {updates.length === 0 && (
              <p className="border border-dashed border-border bg-secondary/30 px-4 py-6 text-center text-sm text-muted-foreground">
                No tracking updates yet.
              </p>
            )}
            {updates.map((u) => (
              <div key={u.id} className="border-l-4 border-accent border-y border-r border-border bg-card px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold uppercase">{u.status}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    {new Date(u.createdAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                {u.location && <p className="mt-1 text-xs text-muted-foreground">{u.location}</p>}
                {u.note && <p className="mt-1 text-sm text-foreground/85">{u.note}</p>}
              </div>
            ))}
          </div>

          {canPostUpdate && (
            <div className="mt-5 border-t border-border pt-5">
              <p className="text-sm font-medium">Post a tracking update</p>
              <div className="mt-2.5 grid gap-2.5 sm:grid-cols-[1fr_2fr_auto]">
                <input
                  value={noteStatus}
                  onChange={(e) => setNoteStatus(e.target.value)}
                  placeholder="Status (e.g. Left warehouse)"
                  className="border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Note (optional)"
                  className="border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
                <Button size="sm" disabled={actionPending || !noteStatus.trim()} onClick={submitNote}>
                  <Send className="h-4 w-4" /> Post
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center gap-2">
          <Badge variant={isSender ? 'primary' : 'accent'}>{isSender ? 'You are sending' : 'You are carrying'}</Badge>
        </div>
      </Container>
    </Section>
  );
}
