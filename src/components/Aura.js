"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/*
  The hero aura is the product's signal made visible. Its palette follows the demo state:
  amber while the agent waits for you, green when you approve, violet while voice is
  recording, red when you abort. Slow drift = "the agent is still working in the background".
*/
export const AURA = {
  waiting: ["#6ee7b7", "#10b981", "#a7f3d0"],
  approved: ["#8fe6bf", "#16a34a", "#bbf7d0"],
  voice: ["#b9adff", "#7a68ff", "#cfe6ff"],
  aborted: ["#ffa3a3", "#ff5d6c", "#ffd6c9"],
};

export default function Aura({ state = "waiting", className = "" }) {
  const [a, b, c] = AURA[state] || AURA.waiting;
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18 });
  const sy = useSpring(my, { stiffness: 40, damping: 18 });
  const x1 = useTransform(sx, (v) => v * 60);
  const y1 = useTransform(sy, (v) => v * 40);
  const x2 = useTransform(sx, (v) => v * -80);
  const y2 = useTransform(sy, (v) => v * -30);

  useEffect(() => {
    // Only attach interactive mouse physics on desktop screens with hover capability
    if (typeof window === "undefined" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }
    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  const colorT = { duration: 1.4, ease: [0.22, 1, 0.36, 1] };

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden grain ${className}`}
      style={{ contain: "paint" }}
    >
      {/* MOBILE: Ultra-lightweight native CSS radial-gradient (120fps smooth scrolling, zero blur pass overhead) */}
      <div
        className="sm:hidden absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle 320px at 50% 25%, ${a}88 0%, ${b}30 50%, transparent 80%)`,
        }}
      />

      {/* DESKTOP: Dynamic floating multi-orb aura */}
      <div className="hidden sm:block absolute inset-0">
        <motion.div style={{ x: x1, y: y1 }} className="absolute left-1/2 top-[-18%] h-[70vmax] w-[70vmax] -translate-x-1/2 will-change-transform">
          <motion.div
            className="h-full w-full rounded-full opacity-70 blur-[75px]"
            animate={{ backgroundColor: a, scale: [1, 1.06, 1], rotate: [0, 15, 0] }}
            transition={{ backgroundColor: colorT, scale: { duration: 16, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 22, repeat: Infinity, ease: "easeInOut" } }}
            style={{ borderRadius: "46% 54% 60% 40% / 50% 42% 58% 50%", transform: "translateZ(0)" }}
          />
        </motion.div>
        <motion.div style={{ x: x2, y: y2 }} className="absolute left-[8%] top-[6%] h-[44vmax] w-[44vmax] will-change-transform">
          <motion.div
            className="h-full w-full rounded-full opacity-60 blur-[80px]"
            animate={{ backgroundColor: b, x: [0, 45, 0], y: [0, 25, 0] }}
            transition={{ backgroundColor: colorT, x: { duration: 19, repeat: Infinity, ease: "easeInOut" }, y: { duration: 14, repeat: Infinity, ease: "easeInOut" } }}
            style={{ transform: "translateZ(0)" }}
          />
        </motion.div>
        <motion.div style={{ x: x2, y: y1 }} className="absolute right-[2%] top-[14%] h-[40vmax] w-[40vmax] will-change-transform">
          <motion.div
            className="h-full w-full rounded-full opacity-70 blur-[85px]"
            animate={{ backgroundColor: c, x: [0, -40, 0], y: [0, 30, 0] }}
            transition={{ backgroundColor: colorT, x: { duration: 21, repeat: Infinity, ease: "easeInOut" }, y: { duration: 17, repeat: Infinity, ease: "easeInOut" } }}
            style={{ transform: "translateZ(0)" }}
          />
        </motion.div>
      </div>

      {/* Fade the aura into the paper so it never fights the content below */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-paper" />
    </div>
  );
}
