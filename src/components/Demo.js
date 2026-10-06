"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconTerminal2,
  IconMicrophone,
  IconDeviceWatch,
  IconRefresh,
  IconCheck,
  IconX,
  IconGitBranch,
  IconWifi,
  IconBattery3,
} from "@tabler/icons-react";
import { EASE } from "./motion";
import { AURA } from "./Aura";
import { useLanguage } from "./LanguageContext";

const LOGS_BY_LANG = {
  id: {
    waiting: [
      { t: '$ claude-code run "refactor auth middleware & session token rotation"', k: "cmd" },
      { t: "[Claude Code Agent v2.4] Analyzing 18 files in /src/auth...", k: "info" },
      { t: "✓ Generated unit tests (12/12 passed in 1.4s)", k: "ok" },
      { t: "✓ Security lint passed: 0 vulnerabilities found", k: "ok" },
    ],
    approved: [
      { t: "✓ Remote Signal: [Approve & Push] diterima dari iPhone Lock Screen", k: "hl" },
      { t: '$ git add . && git commit -m "refactor(auth): session token rotation"', k: "cmd" },
      { t: "[main 9d28a1c] refactor(auth): session token rotation (14 files changed, +184, -72)", k: "info" },
      { t: "✓ Pushed to origin/main successfully. Task selesai saat kamu di luar meja!", k: "ok" },
    ],
    voice: [
      { t: "🎙 Remote Voice Signal: Diterima dari Smartwatch", k: "hl" },
      { t: 'Audio input: "Tambahin retry logic kalau timeout"', k: "voice" },
      { t: 'Polished prompt injected to CLI: "Add exponential backoff retry logic (max 3 attempts) for session token timeout errors."', k: "cmd" },
      { t: "Agent mengeksekusi revisi teknis sekarang...", k: "info" },
    ],
    aborted: [
      { t: "✕ Remote Signal: [Abort] dieksekusi", k: "err" },
      { t: "$ git checkout -- . && git clean -fd", k: "cmd" },
      { t: "Working tree bersih. Perubahan dibatalkan tanpa side-effects.", k: "info" },
    ],
  },
  en: {
    waiting: [
      { t: '$ claude-code run "refactor auth middleware & session token rotation"', k: "cmd" },
      { t: "[Claude Code Agent v2.4] Analyzing 18 files in /src/auth...", k: "info" },
      { t: "✓ Generated unit tests (12/12 passed in 1.4s)", k: "ok" },
      { t: "✓ Security lint passed: 0 vulnerabilities found", k: "ok" },
    ],
    approved: [
      { t: "✓ Remote Signal: [Approve & Push] received from iPhone Lock Screen", k: "hl" },
      { t: '$ git add . && git commit -m "refactor(auth): session token rotation"', k: "cmd" },
      { t: "[main 9d28a1c] refactor(auth): session token rotation (14 files changed, +184, -72)", k: "info" },
      { t: "✓ Pushed to origin/main successfully while you were away from your desk!", k: "ok" },
    ],
    voice: [
      { t: "🎙 Remote Voice Signal: Received from Smartwatch", k: "hl" },
      { t: 'Audio input: "Add retry logic if timeout"', k: "voice" },
      { t: 'Polished prompt injected to CLI: "Add exponential backoff retry logic (max 3 attempts) for session token timeout errors."', k: "cmd" },
      { t: "Agent executing technical revisions now...", k: "info" },
    ],
    aborted: [
      { t: "✕ Remote Signal: [Abort] executed", k: "err" },
      { t: "$ git checkout -- . && git clean -fd", k: "cmd" },
      { t: "Working tree clean. Changes reverted with zero side-effects.", k: "info" },
    ],
  },
};

const TONE = {
  cmd: "text-[#e8e6e1]",
  info: "text-[#8b8f99]",
  ok: "text-[#10b981]",
  hl: "text-[#34d399]",
  voice: "text-[#c3b8ff] italic",
  err: "text-[#ff8a8f]",
};

const LINE_STAGGER = 0.38;

export default function Demo({ state, setState }) {
  const { lang, t } = useLanguage();
  const [phase, setPhase] = useState("run");
  const [cycle, setCycle] = useState(0);

  const logs = LOGS_BY_LANG[lang] || LOGS_BY_LANG.id;
  const lines = logs[state] || logs.waiting;

  useEffect(() => {
    if (state !== "waiting") return;
    const startTimer = setTimeout(() => setPhase("run"), 0);
    const timer = setTimeout(
      () => setPhase("notified"),
      lines.length * LINE_STAGGER * 1000 + 900
    );
    return () => {
      clearTimeout(startTimer);
      clearTimeout(timer);
    };
  }, [state, cycle, lines.length]);

  const act = (next) => setState(next);
  const reset = () => {
    setState("waiting");
    setCycle((c) => c + 1);
  };

  const accent = AURA[state][1];

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-[32px] bg-card/70 p-2 ring-1 ring-line shadow-[0_40px_120px_-60px_rgb(14_14_16/0.55)] backdrop-blur-sm sm:rounded-[40px] sm:p-3">
        <div className="grid items-stretch gap-3 lg:grid-cols-[minmax(0,1fr)_72px_380px] lg:gap-0">
          {/* LEFT: VS Code-style terminal on the laptop */}
          <div className="relative flex min-h-[420px] flex-col overflow-hidden rounded-[24px] bg-night text-[13px] sm:rounded-[30px]">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3 sm:px-5">
              <div className="flex items-center gap-1">
                <span className="type-label flex items-center gap-2 rounded-lg bg-white/[0.06] px-3 py-1.5 text-[12px] text-white/80">
                  <IconTerminal2 size={14} stroke={1.8} aria-hidden />
                  agent-runner.ts
                </span>
                <span className="type-label hidden px-3 py-1.5 text-[12px] text-white/40 sm:inline">
                  Claude Code CLI
                </span>
              </div>
              <span className="type-label flex items-center gap-1.5 text-[11px] text-white/45">
                <IconGitBranch size={13} aria-hidden />
                main · zsh
              </span>
            </div>

            <div className="scroll-thin relative flex-1 overflow-x-auto px-4 py-5 font-mono leading-[1.75] sm:px-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${state}-${cycle}-${lang}`}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                >
                  {lines.map((l, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -6, filter: "blur(4px)" }}
                      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                      transition={{
                        duration: 0.45,
                        ease: EASE,
                        delay: 0.15 + i * LINE_STAGGER,
                      }}
                      className={`whitespace-pre-wrap break-words ${TONE[l.k]}`}
                    >
                      {l.t}
                    </motion.div>
                  ))}

                  {state === "waiting" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: EASE,
                        delay: 0.15 + lines.length * LINE_STAGGER,
                      }}
                      className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.08] p-4"
                    >
                      <div className="flex items-center gap-2 text-emerald-300 font-semibold font-mono">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                        </span>
                        {t.demo.waitingCalloutTitle}
                      </div>
                      <p className="mt-1.5 font-sans text-[13px] text-white/60">
                        {t.demo.waitingCalloutDesc}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2 border-t border-white/[0.06] px-4 py-3 font-mono text-[12px] text-white/45 sm:px-6">
              <span>claude-agent status:</span>
              <span className="text-white/85">
                {state === "waiting" ? t.demo.agentStatusWaiting : t.demo.agentStatusDone}
              </span>
              <span className="cursor-blink text-white/85">▍</span>
            </div>
          </div>

          {/* MIDDLE: Signal link between laptop and devices */}
          <SignalLink phase={phase} state={state} accent={accent} />

          {/* RIGHT: iPhone lock screen + Smartwatch */}
          <div className="relative flex items-center justify-center px-2 pb-10 pt-6 lg:px-6 lg:pb-6">
            <Phone state={state} phase={phase} act={act} />
            <Watch state={state} phase={phase} />
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col items-start justify-between gap-3 px-2 sm:flex-row sm:items-center">
        <p className="text-[14px] text-ink-2">{t.demo.actionHint}</p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[14px] text-ink ring-1 ring-line-strong transition-colors hover:bg-ink/[0.04] cursor-pointer"
        >
          <IconRefresh size={16} stroke={1.8} aria-hidden />
          <span>{t.demo.resetDemo}</span>
        </button>
      </div>
    </div>
  );
}

function SignalLink({ phase, state, accent }) {
  const outbound = state === "waiting";
  const live = (outbound && phase === "notified") || !outbound;
  return (
    <div aria-hidden className="relative hidden items-center lg:flex">
      <div className="relative h-px w-full bg-line-strong">
        <AnimatePresence>
          {live && (
            <motion.span
              key={`${state}-${phase}`}
              className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full"
              style={{ backgroundColor: accent, boxShadow: `0 0 0 4px ${accent}33` }}
              initial={{ left: outbound ? "0%" : "100%", opacity: 0 }}
              animate={{ left: outbound ? "100%" : "0%", opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Phone({ state, phase, act }) {
  const { lang, t } = useLanguage();
  const colors = AURA[state];
  const show = phase === "notified" || state !== "waiting";
  const btn =
    "flex min-h-11 items-center justify-center rounded-2xl px-2 text-[12px] font-medium transition-colors cursor-pointer text-center";

  return (
    <div className="relative w-[272px] shrink-0 sm:w-[292px]">
      <div className="relative aspect-[9/19] overflow-hidden rounded-[48px] bg-[#111] p-[9px] shadow-[0_30px_80px_-30px_rgb(14_14_16/0.6),inset_0_0_0_1.5px_#3a3a3c]">
        <div className="relative h-full w-full overflow-hidden rounded-[40px]">
          {/* Wallpaper with green/emerald reactive aura */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: `radial-gradient(120% 70% at 20% 10%, ${colors[2]} 0%, transparent 60%), radial-gradient(120% 80% at 90% 90%, ${colors[1]} 0%, transparent 65%), linear-gradient(180deg, ${colors[0]}, ${colors[1]})`,
            }}
            transition={{ duration: 1.2, ease: EASE }}
          />
          <div className="absolute inset-0 bg-black/10" />

          <div className="relative flex items-center justify-between px-7 pt-3.5 text-[12px] font-semibold text-white">
            <span>10:42</span>
            <span className="h-[26px] w-[86px] rounded-full bg-black" />
            <span className="flex items-center gap-1">
              <IconWifi size={13} stroke={2.2} />
              <IconBattery3 size={15} stroke={2} />
            </span>
          </div>

          <div className="relative mt-6 text-center text-white">
            <div className="text-[13px] font-medium opacity-85">
              {lang === "id" ? "Rabu, 7 Oktober" : "Wednesday, Oct 7"}
            </div>
            <div className="type-display mt-0.5 text-[76px] font-[500] leading-none tracking-[-0.04em]">
              10:42
            </div>
          </div>

          <div className="absolute inset-x-3 bottom-6">
            <AnimatePresence>
              {show && (
                <motion.div
                  initial={{ opacity: 0, y: -30, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className="overflow-hidden rounded-[24px] bg-white/80 p-3.5 text-ink shadow-[0_10px_30px_-12px_rgb(0_0_0/0.35)] backdrop-blur-xl backdrop-saturate-150"
                >
                  <div className="flex items-center justify-between text-[11px] text-ink-2">
                    <span className="flex items-center gap-1.5 font-semibold tracking-wide text-ink">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-ink text-[10px] font-bold text-white">
                        v
                      </span>
                      <span>VIBETIFICATION</span>
                    </span>
                    <span>{t.demo.justNow}</span>
                  </div>
                  <div className="mt-2 text-[14px] font-semibold leading-tight">
                    {t.demo.phoneNotifTitle}
                  </div>
                  <p className="mt-1 text-[13px] leading-snug text-ink-2">
                    {t.demo.phoneNotifBody}
                  </p>

                  <div className="mt-3 grid grid-cols-3 gap-1.5">
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => act("approved")}
                      aria-pressed={state === "approved"}
                      className={`${btn} ${
                        state === "approved"
                          ? "bg-ok text-white font-semibold shadow-xs"
                          : "bg-ink text-white hover:bg-[#25252a]"
                      }`}
                    >
                      {state === "approved" ? (
                        <IconCheck size={16} stroke={2.4} aria-label="Approved" />
                      ) : (
                        <span>{t.demo.btnApprove}</span>
                      )}
                    </motion.button>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => act("voice")}
                      aria-pressed={state === "voice"}
                      className={`${btn} ${
                        state === "voice"
                          ? "bg-voice text-white font-semibold shadow-xs"
                          : "bg-white/90 text-ink hover:bg-white ring-1 ring-line"
                      }`}
                    >
                      <span>{t.demo.btnVoice}</span>
                    </motion.button>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => act("aborted")}
                      aria-pressed={state === "aborted"}
                      className={`${btn} ${
                        state === "aborted"
                          ? "bg-stop text-white font-semibold shadow-xs"
                          : "bg-white/90 text-stop hover:bg-white ring-1 ring-line"
                      }`}
                    >
                      <span>{t.demo.btnAbort}</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="mx-auto mt-4 h-1 w-28 rounded-full bg-white/70" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Watch({ state, phase }) {
  const { t } = useLanguage();
  const voice = state === "voice";
  const buzz = phase === "notified" && state === "waiting";
  return (
    <motion.div
      animate={
        buzz
          ? {
              x: [0, -3, 3, -2, 2, -1, 0],
              rotate: [-6, -7, -5, -6.5, -5.5, -6],
            }
          : { x: 0, rotate: -6 }
      }
      transition={
        buzz
          ? { duration: 0.55, repeat: 1, repeatDelay: 0.25 }
          : { duration: 0.4 }
      }
      className="absolute -bottom-2 left-0 w-[152px] sm:left-2 lg:-left-6 lg:bottom-4"
      style={{ rotate: -6 }}
    >
      {/* Green Haptic rings */}
      <AnimatePresence>
        {buzz &&
          [0, 1].map((i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute inset-0 rounded-[44px] ring-2 ring-emerald-500/60"
              initial={{ opacity: 0.8, scale: 1 }}
              animate={{ opacity: 0, scale: 1.35 }}
              transition={{ duration: 1.2, delay: i * 0.3, ease: "easeOut" }}
            />
          ))}
      </AnimatePresence>
      <div className="relative rounded-[44px] bg-[#1a1a1c] p-[7px] shadow-[0_24px_50px_-20px_rgb(14_14_16/0.7),inset_0_0_0_1.5px_#3a3a3c]">
        <div className="flex aspect-[4/4.6] flex-col justify-between rounded-[37px] bg-black p-3.5 text-white">
          <div className="flex items-center justify-between text-[10px] text-white/60">
            <span className="flex items-center gap-1 font-mono">
              <IconDeviceWatch size={12} aria-hidden />
              Wrist
            </span>
            <span>10:42</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.span
              animate={{
                backgroundColor: voice
                  ? "#6f5cff"
                  : state === "approved"
                  ? "#10b981"
                  : state === "aborted"
                  ? "#e5484d"
                  : "#10b981",
              }}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
            >
              {voice ? (
                <IconMicrophone size={16} aria-hidden />
              ) : state === "aborted" ? (
                <IconX size={16} aria-hidden />
              ) : (
                <IconCheck size={16} stroke={2.4} aria-hidden />
              )}
            </motion.span>
            <span className="text-[11.5px] font-semibold leading-tight">
              Claude Code: 12 test passed
            </span>
          </div>
          <div className="flex h-5 items-center justify-between">
            <span className="text-[9.5px] leading-tight text-white/60">
              {voice ? t.demo.watchSubtitleRecording : t.demo.watchSubtitleWaiting}
            </span>
            {voice && (
              <span className="flex h-4 items-center gap-[2px]" aria-hidden>
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.span
                    key={i}
                    className="w-[3px] rounded-full bg-[#b9adff]"
                    animate={{ height: [4, 14, 6, 12, 4] }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
