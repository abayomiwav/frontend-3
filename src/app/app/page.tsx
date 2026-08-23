import type { Metadata } from 'next';
import { AuthenticatedDashboard } from '@/components/dashboard/authenticated-dashboard';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your StellarExpress shipments, escrow status, and the open carrier marketplace.',
};

export default function AppPage() {
  return <AuthenticatedDashboard />;
}
