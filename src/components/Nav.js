"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { EASE } from "./motion";
import { useLanguage } from "./LanguageContext";

export function LogoSymbol({ size = "md", className = "" }) {
  const is2Xs = size === "2xs";
  const isXs = size === "xs";
  const isSm = size === "sm";
  const dim = is2Xs
    ? "h-2.5 w-2.5 rounded-[3.2px]"
    : isXs
    ? "h-3.5 w-3.5 rounded-[4.5px]"
    : isSm
    ? "h-5 w-5 rounded-[6.5px]"
    : "h-7 w-7 rounded-[9px]";
  const font = is2Xs
    ? "text-[7.5px]"
    : isXs
    ? "text-[10px]"
    : isSm
    ? "text-[14px]"
    : "text-[20px]";
  const dot = is2Xs
    ? "top-[1px] -right-[0.2px] h-[1.3px] w-[1.3px] ring-[0.4px]"
    : isXs
    ? "top-[1.6px] -right-[0.2px] h-[1.8px] w-[1.8px] ring-[0.6px]"
    : isSm
    ? "top-[2.5px] -right-[0.3px] h-[2.5px] w-[2.5px] ring-[0.8px]"
    : "top-[3.8px] -right-[0.5px] h-[3.5px] w-[3.5px] ring-[1px]";
  const shift = is2Xs
    ? "translate-x-[0.1px] -translate-y-[0.1px]"
    : isXs
    ? "translate-x-[0.2px] -translate-y-[0.2px]"
    : isSm
    ? "translate-x-[0.3px] -translate-y-[0.3px]"
    : "translate-x-[0.5px] -translate-y-[0.5px]";

  return (
    <span
      className={`relative flex shrink-0 items-center justify-center bg-emerald-500 text-white shadow-[0_2px_8px_-2px_rgba(16,185,129,0.35)] transition-transform duration-200 group-hover:scale-105 ${dim} ${className}`}
    >
      <span className={`relative inline-flex items-center justify-center ${shift}`}>
        <span className={`type-serif italic font-normal leading-none select-none ${font}`}>
          v
        </span>
        {/* Notification dot nestled with background-colored knockout ring */}
        <span
          aria-hidden
          className={`absolute shrink-0 aspect-square rounded-full bg-white ring-emerald-500 ${dot}`}
        />
      </span>
    </span>
  );
}

export function Wordmark({ className = "" }) {
  const { t } = useLanguage();
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoSymbol />
      <span className="inline-flex items-baseline gap-2">
        <span
          className="text-[20px] font-semibold tracking-[-0.03em] text-ink flex items-baseline"
          style={{ fontVariationSettings: '"wdth" 92' }}
        >
          <span className="type-serif italic font-normal text-[23px] tracking-normal pr-[0.05em] text-ink">
            vibe
          </span>
          <span>tification</span>
        </span>
        <span className="type-label rounded-md bg-ink/[0.06] px-1.5 py-0.5 text-[11px] text-ink-2 font-mono">
          {t?.nav?.alphaBadge || "alpha"}
        </span>
      </span>
    </span>
  );
}

export default function Nav() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.3,
  });

  const links = [
    { href: "#problem", n: "01", label: t.nav.problem },
    { href: "#features", n: "02", label: t.nav.features },
    { href: "#workflow", n: "03", label: t.nav.workflow },
    { href: "#survey", n: "04", label: t.nav.survey },
  ];

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  // Highlight the section currently in view so the nav doubles as a reading position.
  useEffect(() => {
    const ids = ["problem", "features", "workflow", "survey"];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <div
          className={`relative mx-auto flex max-w-[1240px] items-center justify-between rounded-full py-2 pl-5 pr-2 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
            scrolled
              ? "bg-paper/90 shadow-[0_0_0_1px_rgb(14_14_16/0.07),0_12px_32px_-18px_rgb(14_14_16/0.35)] backdrop-blur-md sm:backdrop-blur-xl sm:backdrop-saturate-150"
              : "bg-transparent"
          }`}
        >
          <a href="#top" aria-label="Vibetification" className="rounded-md group">
            <Wordmark />
          </a>

          <nav aria-label="Navigasi utama" className="hidden items-center md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`relative rounded-full px-4 py-2 text-[14px] transition-colors ${
                  active === l.href ? "text-ink" : "text-ink-2 hover:text-ink"
                }`}
              >
                {active === l.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-ink/[0.06]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">
                  <span className="type-label mr-1.5 text-[11px] text-ink-3">
                    {l.n}
                  </span>
                  {l.label}
                </span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            {/* Language Switcher Pill */}
            <div className="flex items-center rounded-full bg-paper/90 p-0.5 ring-1 ring-line text-[11px] font-mono font-medium">
              <button
                type="button"
                onClick={() => setLang("id")}
                aria-label="Bahasa Indonesia"
                className={`rounded-full px-2.5 py-1 transition-all cursor-pointer ${
                  lang === "id"
                    ? "bg-ink text-white shadow-xs font-semibold"
                    : "text-ink-3 hover:text-ink"
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLang("en")}
                aria-label="English"
                className={`rounded-full px-2.5 py-1 transition-all cursor-pointer ${
                  lang === "en"
                    ? "bg-ink text-white shadow-xs font-semibold"
                    : "text-ink-3 hover:text-ink"
                }`}
              >
                EN
              </button>
            </div>

            {/* Desktop CTA redirected to #survey */}
            <a
              href="#survey"
              className="hidden h-10 items-center rounded-full bg-ink px-5 text-[14px] font-medium text-white transition-colors hover:bg-[#25252a] sm:inline-flex cursor-pointer"
            >
              {t.nav.cta}
            </a>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.menuClose : t.nav.menuOpen}
              className="flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/[0.06] md:hidden cursor-pointer"
            >
              {open ? (
                <IconX size={20} stroke={1.8} />
              ) : (
                <IconMenu2 size={20} stroke={1.8} />
              )}
            </button>
          </div>

          {/* Reading progress: High visibility green line (Point 13) */}
          <motion.span
            aria-hidden
            style={{ scaleX: progress }}
            className={`absolute inset-x-6 bottom-0 h-[2.5px] origin-left bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] transition-opacity duration-500 ${
              scrolled ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col bg-paper px-6 pb-10 pt-28 md:hidden"
          >
            <nav aria-label="Navigasi seluler" className="flex flex-col space-y-1">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, ease: EASE }}
                  className="flex items-center justify-between rounded-2xl py-3.5 px-3 text-[18px] text-ink transition-colors hover:bg-ink/[0.04]"
                >
                  <span>{l.label}</span>
                  <span className="type-label text-[12px] text-ink-3">{l.n}</span>
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto space-y-4 pt-8">
              <a
                href="#survey"
                onClick={() => setOpen(false)}
                className="flex h-12 w-full items-center justify-center rounded-full bg-ink text-[15px] font-medium text-white transition-colors hover:bg-[#25252a]"
              >
                {t.nav.cta}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
