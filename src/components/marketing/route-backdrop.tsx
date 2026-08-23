export function RouteBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_70%_55%_at_50%_-10%,var(--color-primary)/0.12,transparent)]" />
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.14] dark:opacity-[0.18]"
        viewBox="0 0 1200 500"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M-50 420 C 200 420, 260 120, 480 140 S 760 380, 980 200 S 1150 60, 1300 90"
          stroke="var(--color-primary)"
          strokeWidth="2"
          strokeDasharray="10 10"
        />
        <circle cx="-50" cy="420" r="5" fill="var(--color-primary)" />
        <circle cx="480" cy="140" r="5" fill="var(--color-accent)" />
        <circle cx="980" cy="200" r="5" fill="var(--color-accent)" />
        <circle cx="1300" cy="90" r="5" fill="var(--color-primary)" />
      </svg>
    </div>
  );
}
