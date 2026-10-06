"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconDeviceWatch,
  IconCheck,
  IconX,
  IconMicrophone,
  IconPlayerPlay,
  IconPlayerStop,
  IconCopy,
  IconShieldLock,
  IconDeviceLaptop,
  IconDeviceMobile,
  IconArrowDown,
  IconQrcode,
  IconSparkles,
  IconTerminal2,
  IconRefresh,
} from "@tabler/icons-react";
import { SplitWords, Reveal, SectionIndex, EASE } from "./motion";
import { useLanguage } from "./LanguageContext";

export default function Features() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const itemRefs = useRef([]);

  const features = [
    {
      key: "wrist",
      title: t.features.f1Title,
      lead: t.features.f1Lead,
      body: t.features.f1Body,
      tint: "#10b981",
      Visual: WristVisual,
    },
    {
      key: "summary",
      title: t.features.f2Title,
      lead: t.features.f2Lead,
      body: t.features.f2Body,
      tint: "#d8d4ca",
      Visual: SummaryVisual,
    },
    {
      key: "voice",
      title: t.features.f3Title,
      lead: t.features.f3Lead,
      body: t.features.f3Body,
      tint: "#b9adff",
      Visual: VoiceVisual,
    },
    {
      key: "agent",
      title: t.features.f4AgentTitle,
      lead: t.features.f4AgentLead,
      body: t.features.f4AgentBody,
      tint: "#10b981",
      Visual: AgentPairingVisual,
    },
    {
      key: "zero",
      title: t.features.f5Title,
      lead: t.features.f5Lead,
      body: t.features.f5Body,
      tint: "#10b981",
      Visual: ZeroVisual,
    },
  ];

  // Robust bidirectional scroll spy: calculates closest item to the viewport focal line
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const triggerY = window.innerHeight * 0.44;
          let closestIndex = 0;
          let minDistance = Infinity;

          itemRefs.current.forEach((el, index) => {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            // Calculate distance between element's vertical center/focal point and the trigger line
            const elementCenter = rect.top + rect.height * 0.4;
            const distance = Math.abs(elementCenter - triggerY);

            if (distance < minDistance) {
              minDistance = distance;
              closestIndex = index;
            }
          });

          setActive(closestIndex);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [features.length]);

  const ActiveVisual = features[active]?.Visual || features[0].Visual;

  return (
    <section id="features" className="relative scroll-mt-24 bg-paper-2/60 py-28 sm:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="max-w-[860px]">
          <SectionIndex n="02">{t.features.sectionIndex}</SectionIndex>
          <h2 className="type-heading mt-8 text-[clamp(2.3rem,5vw,4.6rem)] text-ink">
            <SplitWords>
              {t.features.headingStart}
              <span className="type-serif">{t.features.headingSerif1}</span>
              {" "}
              <span className="type-serif pr-[0.1em]">{t.features.headingSerif2}</span>
            </SplitWords>
          </h2>
          <Reveal>
            <p className="mt-6 max-w-[560px] text-[17px] leading-[1.65] text-ink-2 sm:text-[19px]">
              {t.features.subtitle}
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-10 lg:mt-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20 w-full min-w-0 max-w-full">
          <div className="w-full min-w-0 max-w-full">
            {features.map((f, i) => (
              <FeatureText
                key={f.key}
                f={f}
                i={i}
                active={active === i}
                onActive={() => setActive(i)}
                setRef={(el) => (itemRefs.current[i] = el)}
              />
            ))}
          </div>

          {/* Desktop: sticky stage swapping visuals smoothly */}
          <div className="hidden lg:block">
            <div className="sticky top-28 h-[calc(100vh-9rem)] max-h-[720px]">
              <Stage tint={features[active]?.tint || "#10b981"}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 24, scale: 0.98, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -16, scale: 0.98, filter: "blur(8px)" }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="flex h-full w-full items-center justify-center"
                  >
                    <ActiveVisual />
                  </motion.div>
                </AnimatePresence>
              </Stage>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stage({ tint, children, className = "" }) {
  return (
    <div
      className={`relative h-full w-full max-w-full overflow-hidden rounded-[28px] sm:rounded-[36px] bg-card ring-1 ring-line ${className}`}
    >
      <motion.div
        aria-hidden
        className="absolute inset-0"
        animate={{
          background: `radial-gradient(70% 60% at 50% 100%, ${tint}44 0%, transparent 70%)`,
        }}
        transition={{ duration: 0.8, ease: EASE }}
      />
      <div className="relative flex h-full w-full max-w-full items-center justify-center p-4 sm:p-8 lg:p-10">
        {children}
      </div>
    </div>
  );
}

function FeatureText({ f, i, active, onActive, setRef }) {
  const flagship = i === 0;
  const Visual = f.Visual;

  return (
    <article
      ref={setRef}
      onClick={onActive}
      className="border-t border-line py-12 lg:flex lg:min-h-[75vh] lg:flex-col lg:justify-center lg:py-16 cursor-pointer w-full min-w-0 max-w-full overflow-hidden sm:overflow-visible"
    >
      <div
        className={`transition-opacity duration-300 ${
          active ? "lg:opacity-100" : "lg:opacity-30 hover:lg:opacity-60"
        }`}
      >
        <div className="type-label flex items-center gap-3 text-ink-3">
          <span className="tabular-nums text-ink">0{i + 1}</span>
          {flagship && <span>Primary hook</span>}
        </div>
        <h3
          className={`type-heading mt-5 text-ink ${
            flagship
              ? "text-[clamp(2.2rem,4vw,3.4rem)]"
              : "text-[clamp(1.9rem,3.2vw,2.6rem)]"
          }`}
        >
          {f.title}
        </h3>
        <p className="mt-4 text-[19px] font-medium leading-snug text-ink sm:text-[21px]">
          {f.lead}
        </p>
        <p className="mt-4 max-w-[520px] text-[16px] leading-[1.7] text-ink-2 sm:text-[17px]">
          {f.body}
        </p>
      </div>

      {/* Mobile view: visual rendered directly inside card */}
      <div className="mt-8 w-full min-w-0 max-w-full lg:hidden">
        <Stage tint={f.tint} className="min-h-[400px] w-full max-w-full">
          <Visual />
        </Stage>
      </div>
    </article>
  );
}

/* ---------- 01 Pocket & Wrist ---------- */
function WristVisual() {
  const { t } = useLanguage();
  const [buzzing, setBuzzing] = useState(false);
  const [count, setCount] = useState(0);
  const [decision, setDecision] = useState(null);

  const buzz = () => {
    setBuzzing(true);
    setCount((c) => c + 1);
    setTimeout(() => setBuzzing(false), 1300);
  };

  return (
    <div className="flex w-full max-w-[420px] min-w-0 flex-col items-center">
      <div className="relative">
        {/* Emerald green pulse rings */}
        <AnimatePresence>
          {buzzing &&
            [0, 1, 2].map((i) => (
              <motion.span
                key={`${count}-${i}`}
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[56px] sm:rounded-[64px] ring-2 ring-emerald-500/60"
                initial={{ opacity: 0.9, scale: 1 }}
                animate={{ opacity: 0, scale: 1.3 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.3, delay: i * 0.22, ease: "easeOut" }}
              />
            ))}
        </AnimatePresence>
        {/* Responsive watch body so it fits on 320px+ viewports with ample room */}
        <motion.div
          animate={
            buzzing
              ? { x: [0, -5, 5, -4, 4, -2, 2, 0], rotate: [0, -1, 1, -1, 1, 0] }
              : { x: 0, rotate: 0 }
          }
          transition={{ duration: 0.5, repeat: buzzing ? 1 : 0 }}
          className="relative w-[236px] sm:w-[252px] rounded-[56px] sm:rounded-[64px] bg-[#1a1a1c] p-[7px] sm:p-[8px] shadow-[0_40px_80px_-30px_rgb(14_14_16/0.6),inset_0_0_0_2px_#3a3a3c]"
        >
          <div className="flex aspect-[4/4.7] flex-col justify-between rounded-[48px] sm:rounded-[54px] bg-black px-3.5 py-3.5 sm:px-4 sm:py-4 text-white">
            <div className="flex items-center justify-between text-[11px] text-white/60">
              <span className="flex items-center gap-1 font-mono">
                <IconDeviceWatch size={13} aria-hidden /> Vibetification
              </span>
              <span>10:42</span>
            </div>
            <div className="text-[14px] sm:text-[15px] font-semibold leading-tight">
              {t.features.f1WatchTitle}
            </div>
            {/* Buttons with generous padding and non-collapsing shrink-0 icons */}
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setDecision("approve")}
                aria-pressed={decision === "approve"}
                className={`flex min-h-[38px] sm:min-h-[42px] px-2.5 sm:px-3 py-1 sm:py-1.5 items-center justify-center gap-1 sm:gap-1.5 rounded-full text-[11px] sm:text-[12px] font-semibold transition-colors cursor-pointer ${
                  decision === "approve"
                    ? "bg-ok text-white font-bold shadow-xs"
                    : "bg-white/15 text-white hover:bg-white/25"
                }`}
              >
                <IconCheck size={14} stroke={2.6} className="shrink-0 text-white" aria-hidden />
                <span>{t.features.f1Approve}</span>
              </button>
              <button
                type="button"
                onClick={() => setDecision("reject")}
                aria-pressed={decision === "reject"}
                className={`flex min-h-[38px] sm:min-h-[42px] px-2.5 sm:px-3 py-1 sm:py-1.5 items-center justify-center gap-1 sm:gap-1.5 rounded-full text-[11px] sm:text-[12px] font-semibold transition-colors cursor-pointer ${
                  decision === "reject"
                    ? "bg-stop text-white font-bold shadow-xs"
                    : "bg-white/15 text-white hover:bg-white/25"
                }`}
              >
                <IconX size={14} stroke={2.6} className="shrink-0 text-white" aria-hidden />
                <span>{t.features.f1Reject}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-10 flex w-full flex-col items-center gap-3 text-center">
        <button
          type="button"
          onClick={buzz}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-[14px] font-medium text-white transition-colors hover:bg-[#25252a] cursor-pointer"
        >
          <IconDeviceWatch size={16} aria-hidden />
          <span>{t.features.f1TestBtn}</span>
        </button>
        <p className="text-[13px] text-ink-3" aria-live="polite">
          {count > 0 ? t.features.f1CountMsg(count) : t.features.f1DefaultMsg}
          {decision === "approve" && t.features.f1ApprovedMsg}
          {decision === "reject" && t.features.f1RejectedMsg}
        </p>
      </div>
    </div>
  );
}

/* ---------- 02 Micro-summaries ---------- */
const RAW = [
  "PASS tests/auth.spec.ts (1.2s)",
  "PASS tests/session.spec.ts (0.8s)",
  "PASS tests/rotate.spec.ts (0.6s)",
  "Coverage: 98.4% files",
  "  src/auth/middleware.ts   | 96.1 |",
  "  src/auth/session.ts      | 99.2 |",
  "  src/auth/rotate.ts       | 100  |",
  "No security alerts reported.",
  "M  src/auth/middleware.ts  +62 -31",
  "M  src/auth/session.ts     +48 -22",
  "A  src/auth/rotate.ts      +74",
  "...",
];

function SummaryVisual() {
  const { t } = useLanguage();
  const [view, setView] = useState("summary");
  return (
    <div className="w-full max-w-[460px]">
      <div
        role="tablist"
        aria-label="Bandingkan tampilan"
        className="mx-auto flex w-fit rounded-full bg-ink/[0.06] p-1"
      >
        {[
          ["diff", t.features.f2RawBtn],
          ["summary", t.features.f2CleanBtn],
        ].map(([k, label]) => (
          <button
            key={k}
            role="tab"
            type="button"
            aria-selected={view === k}
            onClick={() => setView(k)}
            className={`relative min-h-10 rounded-full px-5 text-[14px] transition-colors cursor-pointer ${
              view === k ? "text-white" : "text-ink-2 hover:text-ink"
            }`}
          >
            {view === k && (
              <motion.span
                layoutId="summary-pill"
                className="absolute inset-0 rounded-full bg-ink"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
            <span className="relative">{label}</span>
          </button>
        ))}
      </div>

      <div className="relative mt-8 h-[300px]">
        <AnimatePresence mode="popLayout" initial={false}>
          {view === "diff" ? (
            <motion.div
              key="diff"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="absolute inset-0 overflow-hidden rounded-[24px] bg-night p-5 font-mono text-[12px] leading-[1.7] text-white/55"
            >
              <div className="mb-2 text-white/40">{t.features.f2RawTag}</div>
              {RAW.map((l, i) => (
                <div key={i} className="whitespace-pre">
                  {l}
                </div>
              ))}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-night to-transparent" />
            </motion.div>
          ) : (
            <motion.div
              key="summary"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="absolute inset-0 flex flex-col justify-center rounded-[24px] bg-white p-7 ring-1 ring-line shadow-[0_24px_60px_-30px_rgb(14_14_16/0.35)]"
            >
              <span className="type-label flex items-center gap-2 text-ok-ink">
                <IconCheck size={15} stroke={2.4} aria-hidden />
                {t.features.f2CleanTag}
              </span>
              <p className="type-heading mt-4 text-[26px] leading-[1.2] text-ink">
                {t.features.f2CleanText}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- 03 Voice to clean prompt ---------- */
function VoiceVisual() {
  const { t, lang } = useLanguage();
  const [step, setStep] = useState(0); // 0 idle, 1 recording, 2 refined

  const casualText =
    lang === "id"
      ? "Tambahin retry logic kalau timeout"
      : "Add retry logic if timeout";
  const refinedText =
    lang === "id"
      ? "Implement exponential backoff retry on timeout (max 3 tries)."
      : "Implement exponential backoff retry logic on timeout (max 3 attempts).";

  useEffect(() => {
    if (step !== 1) return;
    const timer = setTimeout(() => setStep(2), 2200);
    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="w-full max-w-[440px] min-w-0">
      <div className="rounded-[20px] sm:rounded-[24px] bg-white p-4 sm:p-5 ring-1 ring-line">
        <div className="flex items-center justify-between">
          <span className="type-label flex items-center gap-2 text-ink-2">
            <IconMicrophone size={15} aria-hidden />
            {t.features.f3CasualLabel}
          </span>
          <button
            type="button"
            onClick={() => setStep(step === 1 ? 0 : 1)}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-ink px-4 text-[13px] font-medium text-white hover:bg-[#25252a] cursor-pointer"
          >
            {step === 1 ? (
              <IconPlayerStop size={14} aria-hidden />
            ) : (
              <IconPlayerPlay size={14} aria-hidden />
            )}
            <span>{step === 1 ? t.features.f3StopBtn : t.features.f3PlayBtn}</span>
          </button>
        </div>

        <div className="mt-5 flex h-12 items-center gap-[2px] sm:gap-[3px] overflow-hidden" aria-hidden>
          {Array.from({ length: 28 }).map((_, i) => {
            const base = 6 + Math.abs(Math.sin(i * 1.7)) * 26;
            return (
              <motion.span
                key={i}
                className="w-[3px] sm:w-[4px] flex-1 rounded-full bg-voice"
                animate={
                  step === 1
                    ? {
                        height: [
                          base * 0.3,
                          base,
                          base * 0.5,
                          base * 0.9,
                          base * 0.3,
                        ],
                      }
                    : { height: step === 2 ? base * 0.5 : 4 }
                }
                transition={
                  step === 1
                    ? {
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.025,
                        ease: "easeInOut",
                      }
                    : { duration: 0.4 }
                }
                style={{ opacity: step === 0 ? 0.25 : 0.9 }}
              />
            );
          })}
        </div>

        <p className="mt-4 text-[15px] sm:text-[17px] text-ink break-words">
          &ldquo;
          {step === 0 ? (
            <span className="text-ink-3">{casualText}</span>
          ) : (
            casualText.split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.035 }}
              >
                {ch}
              </motion.span>
            ))
          )}
          &rdquo;
        </p>
      </div>

      <div className="flex justify-center py-3 text-ink-3" aria-hidden>
        <motion.span
          animate={step === 2 ? { y: [0, 4, 0] } : {}}
          transition={{ duration: 0.6 }}
        >
          <IconArrowDown size={20} />
        </motion.span>
      </div>

      <motion.div
        animate={{ opacity: step === 2 ? 1 : 0.4 }}
        className="rounded-[20px] sm:rounded-[24px] bg-night p-4 sm:p-5 font-mono text-[12px] sm:text-[13px] leading-relaxed text-white break-words"
      >
        <span className="text-[#c3b8ff]">{t.features.f3RefinedLabel}</span>
        <AnimatePresence mode="wait">
          {step === 2 ? (
            <motion.p
              key="r"
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mt-2 text-white/90"
            >
              &ldquo;{refinedText}&rdquo;
            </motion.p>
          ) : (
            <motion.p key="w" exit={{ opacity: 0 }} className="mt-2 text-white/40">
              {step === 1 ? t.features.f3Refining : t.features.f3HintPlay}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* ---------- 04 Universal Agent Pairing & Quick QR ---------- */
const AGENT_LIST = [
  { name: "Claude Code", status: "Native Hook", cmd: "claude-code" },
  { name: "Cursor Agent", status: "Daemon Bridge", cmd: "cursor" },
  { name: "Aider", status: "Git Hook", cmd: "aider" },
  { name: "Gemini CLI", status: "WebSocket", cmd: "gemini" },
];

function AgentPairingVisual() {
  const { t } = useLanguage();
  const [selectedAgent, setSelectedAgent] = useState("Claude Code");
  const [scanning, setScanning] = useState(false);
  const [paired, setPaired] = useState(true);

  const triggerScan = () => {
    setScanning(true);
    setPaired(false);
    setTimeout(() => {
      setScanning(false);
      setPaired(true);
    }, 1200);
  };

  return (
    <div className="w-full max-w-[460px] min-w-0">
      {/* Agent Selector Badges */}
      <div className="mb-4">
        <span className="type-label block text-[11px] font-semibold text-ink-3 mb-2 font-mono">
          {t.features.f4AgentSelectLabel}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {AGENT_LIST.map((ag) => {
            const active = selectedAgent === ag.name;
            return (
              <button
                key={ag.name}
                type="button"
                onClick={() => {
                  setSelectedAgent(ag.name);
                  triggerScan();
                }}
                className={`flex items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-[12px] font-mono transition-all cursor-pointer ${
                  active
                    ? "bg-ink text-white shadow-xs font-semibold ring-1 ring-ink"
                    : "bg-white text-ink-2 ring-1 ring-line hover:ring-line-strong"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    active ? "bg-emerald-400" : "bg-ink/30"
                  }`}
                />
                <span>{ag.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Terminal QR Code Console */}
      <div className="relative overflow-hidden rounded-[20px] sm:rounded-[26px] bg-night p-3.5 sm:p-5 text-white font-mono shadow-xl ring-1 ring-white/10 w-full min-w-0">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 text-[10px] sm:text-[11px] text-white/50">
          <span className="flex items-center gap-1.5 text-white/80">
            <IconTerminal2 size={13} className="text-emerald-400" />
            <span className="truncate">vibetification link · QR</span>
          </span>
          <span className="text-[10px] bg-white/[0.08] px-2 py-0.5 rounded text-white/60 shrink-0">
            ws://localhost:4820
          </span>
        </div>

        {/* QR Code and Scanner Display */}
        <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full min-w-0">
          {/* Stylized QR Code with scanning laser */}
          <div className="relative flex h-28 w-28 sm:h-32 sm:w-32 shrink-0 items-center justify-center rounded-2xl bg-white p-2 sm:p-2.5 shadow-md">
            {/* Corner Alignment Targets */}
            <div className="absolute top-2 left-2 h-3.5 w-3.5 sm:h-4 sm:w-4 border-2 border-ink rounded-[3px] flex items-center justify-center">
              <span className="h-1.5 w-1.5 bg-ink rounded-xs" />
            </div>
            <div className="absolute top-2 right-2 h-3.5 w-3.5 sm:h-4 sm:w-4 border-2 border-ink rounded-[3px] flex items-center justify-center">
              <span className="h-1.5 w-1.5 bg-ink rounded-xs" />
            </div>
            <div className="absolute bottom-2 left-2 h-3.5 w-3.5 sm:h-4 sm:w-4 border-2 border-ink rounded-[3px] flex items-center justify-center">
              <span className="h-1.5 w-1.5 bg-ink rounded-xs" />
            </div>

            {/* Stylized QR Pixels */}
            <div className="grid grid-cols-5 gap-1 p-2 sm:p-3">
              {Array.from({ length: 25 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-2 sm:h-2.5 w-2 sm:w-2.5 rounded-[1px] ${
                    i % 3 === 0 || i % 7 === 0 ? "bg-ink" : "bg-ink/20"
                  }`}
                />
              ))}
            </div>

            {/* Animated Laser Scanning Line */}
            {scanning && (
              <motion.div
                initial={{ top: "8%" }}
                animate={{ top: ["8%", "92%", "8%"] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-2 h-[2px] bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.9)]"
              />
            )}
          </div>

          {/* Connection Details */}
          <div className="flex-1 text-left space-y-1.5 sm:space-y-2 w-full min-w-0">
            <div className="text-[11px] sm:text-[12px] text-white/80 leading-snug break-all sm:break-normal">
              <span className="text-emerald-400 font-bold">$ </span>
              <span>vibetification link --agent={selectedAgent.toLowerCase().replace(" ", "-")}</span>
            </div>
            <div className="text-[10px] sm:text-[11px] text-white/45">
              <span>Token: </span>
              <span className="text-white/70 font-mono">vibe_pair_9f2...</span>
              <span className="text-emerald-400 ml-1.5">[Ready]</span>
            </div>
            <div className="text-[10px] sm:text-[11px] text-white/45">
              <span>Target: </span>
              <span className="text-white/80">{selectedAgent}</span>
            </div>
          </div>
        </div>

        {/* Pairing Status Banner */}
        <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[10px] sm:text-[11px]">
          <div className="flex items-center gap-1.5 min-w-0 truncate">
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${
                paired ? "bg-emerald-400" : "bg-amber-400 animate-ping"
              }`}
            />
            <span className="text-white/85 truncate">
              {paired
                ? `${t.features.f4AgentPairedMsg} ${selectedAgent}`
                : t.features.f4AgentScanningMsg}
            </span>
          </div>
          <button
            type="button"
            onClick={triggerScan}
            className="flex items-center gap-1 text-[10px] sm:text-[11px] text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer shrink-0 ml-2"
          >
            <IconRefresh size={12} className={scanning ? "animate-spin" : ""} />
            <span>{t.features.f4AgentScanBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- 05 Zero setup & Privacy-First ---------- */
function ZeroVisual() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText("npx vibetification init");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="w-full max-w-[460px] min-w-0">
      {/* Terminal row with Coming Soon tag */}
      <div className="flex items-center justify-between gap-2 sm:gap-3 rounded-[20px] sm:rounded-[22px] bg-night py-2.5 px-3.5 sm:py-3 sm:pl-5 sm:pr-3 font-mono text-[13px] sm:text-[15px] text-white w-full min-w-0">
        <div className="flex items-center gap-2 min-w-0 truncate">
          <span className="min-w-0 truncate text-[12px] sm:text-[15px]">
            <span className="text-white/40">$ </span>npx vibetification init
          </span>
          <span className="rounded-full bg-emerald-500/20 border border-emerald-500/35 px-2 py-0.5 text-[9px] sm:text-[10px] text-emerald-400 font-mono font-semibold uppercase tracking-wider shrink-0">
            {t.features.f5ComingSoon}
          </span>
        </div>
        <button
          type="button"
          onClick={copy}
          aria-label="Salin perintah"
          className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl text-white/70 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
        >
          {copied ? <IconCheck size={16} aria-hidden /> : <IconCopy size={16} aria-hidden />}
        </button>
      </div>

      <div className="relative mt-8 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3 w-full min-w-0">
        <div className="rounded-[18px] sm:rounded-[22px] bg-white p-3 sm:p-4 ring-1 ring-line min-w-0">
          <IconDeviceLaptop size={20} stroke={1.6} aria-hidden className="text-ink" />
          <div className="mt-2 text-[13px] sm:text-[14px] font-medium text-ink truncate">
            {t.features.f5LaptopTitle}
          </div>
          <div className="mt-1 text-[11px] sm:text-[12px] leading-snug text-ink-3">
            {t.features.f5LaptopDesc}
          </div>
        </div>

        <div className="relative h-px w-6 sm:w-20 bg-line-strong shrink-0" aria-hidden>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-ok"
              animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="rounded-[18px] sm:rounded-[22px] bg-white p-3 sm:p-4 ring-1 ring-line min-w-0">
          <IconDeviceMobile size={20} stroke={1.6} aria-hidden className="text-ink" />
          <div className="mt-2 text-[13px] sm:text-[14px] font-medium text-ink truncate">
            {t.features.f5MobileTitle}
          </div>
          <div className="mt-1 text-[11px] sm:text-[12px] leading-snug text-ink-3">
            {t.features.f5MobileDesc}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-[13px] sm:text-[14px] text-ok-ink">
        <IconShieldLock size={16} stroke={1.8} aria-hidden />
        <span>{t.features.f5ZeroRetention}</span>
      </div>
    </div>
  );
}
