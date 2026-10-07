"use client";

import { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconArrowRight,
  IconCheck,
  IconCopy,
  IconLoader2,
  IconAlertCircle,
  IconSparkles,
} from "@tabler/icons-react";
import { EASE } from "./motion";
import { useLanguage } from "./LanguageContext";

const WaitlistContext = createContext(null);

export function WaitlistProvider({ children }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");
  const [agents, setAgents] = useState(["Claude Code"]);
  const [devices, setDevices] = useState(["iPhone Actionable Push"]);
  const [surveyPrompted, setSurveyPrompted] = useState(false);

  const { t } = useLanguage();

  const submitHero = (overrideEmail) => {
    setError("");
    const targetEmail = (overrideEmail !== undefined ? overrideEmail : email).trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(targetEmail);
    if (!valid) {
      setStatus("error");
      setError("invalid_email");
      return;
    }

    setEmail(targetEmail);
    setSurveyPrompted(true);
    setStatus("idle");

    // Smooth scroll down to the validation survey CTA
    const el = document.getElementById("survey");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const submitSurvey = async (overrideEmail) => {
    setError("");
    const targetEmail = (overrideEmail !== undefined ? overrideEmail : email).trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(targetEmail);
    if (!valid) {
      setStatus("error");
      setError("invalid_email");
      return;
    }

    if (!agents.length || !devices.length) {
      setStatus("error");
      setError("require_survey");
      return;
    }

    setEmail(targetEmail);
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: targetEmail,
          agents,
          devices,
          source: "survey_closing",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "submit_failed");
      }

      setStatus("success");
    } catch (err) {
      console.error("Waitlist submit error:", err);
      setStatus("error");
      setError(
        err?.message && !err.message.includes("fetch") && !err.message.includes("Failed")
          ? err.message
          : "submit_failed"
      );
    }
  };

  const toggle = (setter) => (value) =>
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );

  return (
    <WaitlistContext.Provider
      value={{
        email,
        setEmail,
        status,
        setStatus,
        error,
        setError,
        submitHero,
        submitSurvey,
        agents,
        devices,
        toggleAgent: toggle(setAgents),
        toggleDevice: toggle(setDevices),
        surveyPrompted,
        setSurveyPrompted,
      }}
    >
      {children}
    </WaitlistContext.Provider>
  );
}

export const useWaitlist = () => useContext(WaitlistContext);

export function WaitlistForm({ id, source = "hero", tone = "light" }) {
  const {
    email,
    setEmail,
    status,
    setStatus,
    error,
    setError,
    submitHero,
    submitSurvey,
  } = useWaitlist();
  const { t } = useLanguage();
  const dark = tone === "dark";

  if (status === "success" && source === "survey") {
    return <SuccessCard tone={tone} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (source === "hero") {
      submitHero();
    } else {
      submitSurvey();
    }
  };

  const getErrorMessage = (code) => {
    if (!code) return "";
    if (code === "invalid_email") return t.survey.invalidEmailAlert;
    if (code === "require_survey") return t.survey.requireSurveyAlert;
    if (code === "submit_failed") return t.survey.submitFailedAlert;
    return code;
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="w-full">
      <div
        className={`group relative flex flex-col gap-2.5 rounded-[24px] p-2 transition-shadow duration-300 sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:p-1.5 ${
          dark
            ? "bg-white/[0.06] ring-1 ring-white/15 focus-within:ring-white/40"
            : "bg-card ring-1 ring-line-strong shadow-[0_1px_0_rgb(255_255_255/0.8)_inset,0_18px_40px_-24px_rgb(14_14_16/0.25)] focus-within:ring-ok/50"
        } ${
          status === "error" ? (dark ? "ring-stop/70" : "ring-stop/60") : ""
        }`}
      >
        <label htmlFor={id} className="sr-only">
          Email developer
        </label>
        <input
          id={id}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") {
              setStatus("idle");
              setError("");
            }
          }}
          placeholder={t.hero.emailPlaceholder}
          aria-invalid={status === "error"}
          aria-describedby={`${id}-hint`}
          className={`h-14 min-w-0 flex-1 bg-transparent px-5 text-[16px] focus:outline-none sm:h-12 sm:px-5 sm:text-[15px] ${
            dark ? "text-white placeholder:text-white/45" : "text-ink placeholder:text-ink-3"
          }`}
        />
        <motion.button
          type="submit"
          disabled={status === "loading"}
          whileTap={{ scale: 0.98 }}
          className={`relative inline-flex h-13 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-[15px] font-medium transition-colors disabled:cursor-wait cursor-pointer sm:h-12 ${
            dark
              ? "bg-white text-ink hover:bg-white/90"
              : "bg-ink text-white hover:bg-[#25252a]"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {status === "loading" ? (
              <motion.span
                key="l"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-2"
              >
                <IconLoader2 size={17} className="animate-spin" aria-hidden />
                <span>{t.hero.ctaLoading}</span>
              </motion.span>
            ) : (
              <motion.span
                key="i"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-2"
              >
                <span>{t.hero.ctaButton}</span>
                <IconArrowRight
                  size={17}
                  stroke={1.8}
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence initial={false}>
        {status === "error" && error && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`mt-3 flex items-center gap-1.5 px-2 text-[13px] ${
              source === "hero" ? "justify-center text-center" : "justify-start text-left"
            } ${
              dark ? "text-[#ffb4ab]" : "text-stop font-medium"
            }`}
          >
            <IconAlertCircle size={15} aria-hidden />
            <span>{getErrorMessage(error)}</span>
          </motion.p>
        )}
      </AnimatePresence>

      <p
        id={`${id}-hint`}
        className={`mt-3 px-2 text-[13px] ${
          source === "hero" ? "text-center" : "text-left"
        } ${dark ? "text-white/60" : "text-ink-3"}`}
      >
        {t.hero.microcopy}
      </p>
    </form>
  );
}

export function SuccessCard({ tone }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const dark = tone === "dark";

  const share = async () => {
    const url = "https://vibetification.com";
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`rounded-[28px] p-6 text-left sm:p-7 ${
        dark
          ? "bg-white/[0.06] ring-1 ring-white/15"
          : "bg-white ring-1 ring-ok/30 shadow-[0_12px_32px_-16px_rgb(16_185_129/0.25)]"
      }`}
      role="status"
    >
      <div className="flex items-start gap-4">
        <motion.span
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 18, delay: 0.15 }}
          className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ok text-white shadow-sm"
        >
          <IconCheck size={20} stroke={2.4} aria-hidden />
        </motion.span>
        <div className="min-w-0 flex-1">
          <h4 className={`text-[17px] font-semibold leading-snug ${dark ? "text-white" : "text-ink"}`}>
            {t.survey.successTitle}
          </h4>
          <p className={`mt-1.5 text-[14px] leading-relaxed ${dark ? "text-white/75" : "text-ink-2"}`}>
            {t.survey.successDesc}
          </p>
          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3">
            <button
              type="button"
              onClick={share}
              className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-colors cursor-pointer ${
                dark
                  ? "bg-white text-ink hover:bg-white/90"
                  : "bg-ink text-white hover:bg-[#25252a]"
              }`}
            >
              {copied ? <IconCheck size={16} aria-hidden /> : <IconCopy size={16} aria-hidden />}
              <span>{copied ? t.survey.copiedText : t.survey.shareBtn}</span>
            </button>
            <span className={`text-[13px] ${dark ? "text-white/60" : "text-ink-3"}`}>
              {t.survey.jumpQueue}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
