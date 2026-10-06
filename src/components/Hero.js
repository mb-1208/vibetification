"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Aura from "./Aura";
import Demo from "./Demo";
import { WaitlistForm } from "./waitlist";
import { SplitWords, EASE } from "./motion";
import { useLanguage } from "./LanguageContext";

export default function Hero() {
  const [state, setState] = useState("waiting");
  const { t } = useLanguage();

  return (
    <section id="top" className="relative isolate pt-32 sm:pt-40">
      <Aura state={state} className="-z-10 h-[1100px]" />

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="mx-auto flex max-w-[980px] flex-col items-center text-center">
          {/* Pill Badge */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="type-label text-[13px] text-ink-2"
          >
            {t.hero.pillBadge}
          </motion.p>

          {/* H1 Main Headline */}
          <h1 className="type-display mt-6 text-[clamp(3.1rem,9vw,8.4rem)] text-ink">
            <SplitWords inView={false} delay={0.3} stagger={0.07}>
              {t.hero.h1Lead}
              <span className="type-serif">{t.hero.h1Serif1}</span>
              {" "}
              <span className="type-serif pr-[0.08em]">{t.hero.h1Serif2}</span>
            </SplitWords>
          </h1>

          {/* Sub-Headline */}
          <motion.p
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}
            className="mt-8 max-w-[640px] text-[17px] leading-[1.6] text-ink-2 sm:text-[19px]"
          >
            {t.hero.subheadline}
          </motion.p>

          {/* Primary Form */}
          <motion.div
            id="waitlist"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
            className="mt-10 w-full max-w-[580px] scroll-mt-32 text-center"
          >
            <WaitlistForm id="hero-email" source="hero" />
          </motion.div>
        </div>

        {/* Interactive Split Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.3, ease: EASE, delay: 1.0 }}
          className="mt-20 sm:mt-24"
        >
          <Demo state={state} setState={setState} />
        </motion.div>
      </div>
    </section>
  );
}
