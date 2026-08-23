const items = [
  'LAGOS → ABUJA · IN TRANSIT',
  'SETTLEMENT 3–5s',
  'ESCROW: SOROBAN SMART CONTRACT',
  'IBADAN → LAGOS · OPEN JOB',
  'NETWORK FEE ~$0.00001',
  'PICKUP RELEASES 40% · DELIVERY RELEASES 60%',
  'PORT HARCOURT → ABUJA · ACCEPTED',
];

export function RouteTicker() {
  const track = [...items, ...items];
  return (
    <div className="overflow-hidden border-b border-border bg-foreground text-background">
      <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap py-1.5 text-[11px] font-medium uppercase tracking-wider">
        {track.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="opacity-80">{item}</span>
            <span className="text-primary">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
