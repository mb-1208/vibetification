"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SplitWords, Reveal, SectionIndex, EASE } from "./motion";
import { useLanguage } from "./LanguageContext";

export default function Problem() {
  const { t, lang } = useLanguage();

  return (
    <section id="problem" className="relative scroll-mt-24 py-28 sm:py-40">
      <div className="mx-auto grid max-w-[1240px] gap-16 px-5 sm:px-8 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionIndex n="01">{t.problem.sectionIndex}</SectionIndex>
          <h2 key={lang} className="type-heading mt-8 text-[clamp(2.3rem,4.6vw,4.2rem)] text-ink">
            <SplitWords>
              {t.problem.headingStart}
              <span className="type-serif">{t.problem.headingSerif1}</span>
              {" "}
              <span className="type-serif pr-[0.18em]">{t.problem.headingSerif2}</span>
            </SplitWords>
          </h2>
        </div>

        <div className="flex flex-col">
          <ProblemRow
            n="1"
            title={t.problem.p1Title}
            body={t.problem.p1Body}
          >
            <StallTimeline note={t.problem.p1Note} />
          </ProblemRow>
          <ProblemRow
            n="2"
            title={t.problem.p2Title}
            body={t.problem.p2Body}
            last
          >
            <CrampedDiff note={t.problem.p2Note} />
          </ProblemRow>
        </div>
      </div>
    </section>
  );
}

function ProblemRow({ n, title, body, children, last }) {
  return (
    <article
      className={`grid gap-8 py-12 first:pt-0 sm:grid-cols-[72px_1fr] ${
        last ? "" : "border-b border-line"
      }`}
    >
      <Reveal>
        <span className="type-display block text-[64px] leading-none text-ink/15 tabular-nums">
          {n}
        </span>
      </Reveal>
      <div>
        <Reveal>
          <h3 className="type-heading text-[30px] text-ink sm:text-[36px]">{title}</h3>
          <p className="mt-4 max-w-[560px] text-[17px] leading-[1.65] text-ink-2">
            {body}
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          {children}
        </Reveal>
      </div>
    </article>
  );
}

/* The agent works for two minutes, then waits silently for the other 38. */
function StallTimeline({ note }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <div ref={ref} className="rounded-[28px] bg-night p-5 text-white sm:p-7">
      <div className="flex items-center justify-between font-mono text-[12px] text-white/50">
        <span>agent-stuck.log</span>
        <span className="text-[#34d399] font-semibold">PAUSED @ 02:14</span>
      </div>

      <div className="relative mt-8 h-2 rounded-full bg-white/[0.07]">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-[#10b981]"
          initial={{ width: "0%" }}
          animate={inView ? { width: "5.6%" } : {}}
          transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
        />
        <motion.div
          className="absolute -top-[5px] h-[18px] w-[18px] -translate-x-1/2 rounded-full border-[3px] border-night bg-[#34d399]"
          initial={{ left: "0%", scale: 0 }}
          animate={inView ? { left: "5.6%", scale: 1 } : {}}
          transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
        />
        <motion.div
          className="absolute inset-y-0 right-0 rounded-full"
          style={{
            left: "6.5%",
            backgroundImage:
              "repeating-linear-gradient(135deg, rgb(255 255 255 / 0.10) 0 6px, transparent 6px 12px)",
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.3 }}
        />
      </div>
      <div className="mt-3 flex justify-between font-mono text-[11px] text-white/40">
        <span>00:00</span>
        <span>40:00</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: EASE, delay: 1.4 }}
        className="mt-6 font-mono text-[13px] leading-relaxed"
      >
        <span className="text-emerald-300 font-semibold">Waiting confirmation:</span>{" "}
        <span className="text-white/85">Apply changes to 14 files? (y/n)</span>
        <p className="mt-2 font-sans text-[14px] text-white/55">
          {note}
        </p>
      </motion.div>
    </div>
  );
}

const DIFF = [
  ["@@ -142,24 +142,48 @@ import { createClient }...", "m"],
  ["- const session = await auth.getSession();", "d"],
  ["+ const token = await rotateJwtWithSecret(req);", "a"],
  ["  if (!token) throw new AuthError(401);", "c"],
  ["- res.setHeader('x-session', session.id);", "d"],
  ["+ res.setHeader('x-session', token.sid);", "a"],
  ["+ await audit.log({ sid: token.sid, ts });", "a"],
  ["  return next();", "c"],
  ["@@ -201,9 +225,17 @@ export async function...", "m"],
  ["- export const ttl = 3600;", "d"],
  ["+ export const ttl = env.SESSION_TTL ?? 900;", "a"],
  ["+ export const rotateEvery = ttl / 3;", "a"],
];
const DIFF_TONE = {
  m: "text-[#7aa2ff]",
  d: "text-[#ff8a8f]",
  a: "text-[#10b981]",
  c: "text-white/45",
 };

/* A 6-inch screen trying to show a 400-line diff: it never stops scrolling. */
function CrampedDiff({ note }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4 });
  return (
    <div ref={ref} className="flex flex-col items-start gap-6 sm:flex-row sm:items-end">
      <div className="relative h-[300px] w-[160px] shrink-0 overflow-hidden rounded-[30px] bg-[#111] p-[6px] shadow-[inset_0_0_0_1.5px_#3a3a3c]">
        <div className="relative h-full overflow-hidden rounded-[25px] bg-night">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2 font-mono text-[8px] text-white/50">
            <span>mobile-terminal.sh</span>
            <span className="text-[#ff8a8f]">400+</span>
          </div>
          <motion.div
            className="px-2.5 py-2 font-mono text-[7.5px] leading-[1.55]"
            animate={inView ? { y: ["0%", "-50%"] } : { y: "0%" }}
            transition={{ duration: 9, ease: "linear", repeat: Infinity }}
          >
            {[...DIFF, ...DIFF, ...DIFF, ...DIFF].map(([t, k], i) => (
              <div key={i} className={`whitespace-nowrap ${DIFF_TONE[k]}`}>
                {t}
              </div>
            ))}
          </motion.div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-night to-transparent" />
        </div>
      </div>
      <p className="max-w-[300px] font-mono text-[13px] leading-relaxed text-ink-3">
        {note}
      </p>
    </div>
  );
}
