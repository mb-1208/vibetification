"use client";

import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

/**
 * Headline reveal: each word rises out of its own clipping mask.
 * Used only on section headlines so the eye is led to the one line that matters.
 */
export function SplitWords({ children, className = "", delay = 0, stagger = 0.055, as = "span", inView = true }) {
  const MotionTag = motion[as] || motion.span;
  const parts = Array.isArray(children) ? children : [children];

  // Flatten strings into words while keeping React elements (e.g. the serif accent) intact.
  const tokens = [];
  parts.forEach((part, pi) => {
    if (typeof part === "string") {
      part.split(/(\s+)/).forEach((w, wi) => {
        if (w.trim() === "") {
          if (w.length) tokens.push({ space: true, key: `s-${pi}-${wi}` });
        } else tokens.push({ node: w, key: `w-${pi}-${wi}` });
      });
    } else if (part) {
      tokens.push({ node: part, key: `n-${pi}` });
    }
  });

  let index = 0;
  const trigger = inView
    ? { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.6 } }
    : { initial: "hidden", animate: "show" };

  return (
    <MotionTag className={className} {...trigger} aria-label={undefined}>
      {tokens.map((t) => {
        if (t.space) return <span key={t.key}> </span>;
        const i = index++;
        return (
          <span key={t.key} className="inline-block overflow-hidden px-[0.2em] -mx-[0.2em] pt-[0.12em] -mt-[0.12em] pb-[0.28em] -mb-[0.28em] align-bottom">
            <motion.span
              className="inline-block will-change-transform pr-[0.12em]"
              variants={{
                hidden: { y: "105%", rotate: 4, opacity: 0 },
                show: {
                  y: "0%",
                  rotate: 0,
                  opacity: 1,
                  transition: { duration: 0.9, ease: EASE, delay: delay + i * stagger },
                },
              }}
            >
              {t.node}
            </motion.span>
          </span>
        );
      })}
    </MotionTag>
  );
}

/** Soft entrance for supporting blocks: short distance, no bounce, plays once. */
export function Reveal({ children, className = "", delay = 0, y = 18, as = "div", amount = 0.3, ...rest }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/** Section index label, e.g. "01 · Masalah". Mono, sentence case, no wide tracking. */
export function SectionIndex({ n, children, className = "" }) {
  return (
    <div className={`type-label flex items-center gap-3 text-ink-3 ${className}`}>
      <span className="tabular-nums text-ink">{n}</span>
      <span className="h-px w-8 bg-line-strong" />
      <span>{children}</span>
    </div>
  );
}
