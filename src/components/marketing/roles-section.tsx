import { Check, X } from 'lucide-react';
import { Container, Section } from '@/components/ui/container';
import { SectionHeader } from './section-header';
import { partyRoles, permissionMatrix } from '@/lib/data';

export function RolesSection() {
  return (
    <Section className="border-t border-border">
      <Container>
        <SectionHeader
          eyebrow="Who's involved"
          title="Four parties, each with exactly the authority they need"
          description="Sender, carrier, receiver, and arbiter — the contract enforces who can do what, so nobody can act outside their role."
        />

        <div className="mt-14 overflow-x-auto border border-border">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-foreground bg-secondary/60">
                <th className="w-64 p-4 text-left font-medium text-muted-foreground">Action</th>
                {partyRoles.map((role) => (
                  <th key={role.name} className="p-4 text-left align-top">
                    <p className="font-display text-base font-bold text-foreground">{role.name}</p>
                    <p className="mt-1 text-xs font-normal leading-snug text-muted-foreground">
                      {role.description}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissionMatrix.actions.map((action, rowIdx) => (
                <tr key={action} className="border-b border-border last:border-b-0 even:bg-secondary/20">
                  <td className="p-4 font-medium text-foreground">{action}</td>
                  {permissionMatrix.grid[rowIdx].map((allowed, colIdx) => (
                    <td key={colIdx} className="p-4 text-center">
                      {allowed ? (
                        <Check className="mx-auto h-4 w-4 text-primary" />
                      ) : (
                        <X className="mx-auto h-4 w-4 text-muted-foreground/40" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  );
}
