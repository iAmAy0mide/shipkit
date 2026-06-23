"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const AnimatedCounter = ({ value }: { value: number }) => {
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const prev = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (prefersReduced) { setDisplay(value); return; }
    const start = prev.current;
    const end = value;
    const duration = 600;
    const startTime = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(start + (end - start) * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    prev.current = value;
    return () => cancelAnimationFrame(rafRef.current);
  }, [value, prefersReduced]);

  return <>{display}</>;
}

export default AnimatedCounter;