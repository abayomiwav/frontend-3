'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 1.4,
}: {
  value: string;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const numeric = Number.parseFloat(value.replace(/,/g, ''));
  const isNumeric = !Number.isNaN(numeric);
  const decimals = value.includes('.') ? value.split('.')[1]?.length ?? 0 : 0;
  const [display, setDisplay] = useState(isNumeric ? '0' : value);

  useEffect(() => {
    if (!inView || !isNumeric) {
      return;
    }
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - (1 - progress) ** 3;
      const current = numeric * eased;
      setDisplay(
        decimals > 0 ? current.toFixed(decimals) : Math.round(current).toLocaleString('en-US'),
      );
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, isNumeric, numeric, duration, decimals]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      className="font-display text-4xl font-bold tabular-nums sm:text-5xl"
    >
      {prefix}
      {display}
      {suffix}
    </motion.span>
  );
}
