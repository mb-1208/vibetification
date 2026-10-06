"use client";

import { motion } from "framer-motion";
import { IconCheck, IconSparkles } from "@tabler/icons-react";
import { SplitWords, Reveal, SectionIndex } from "./motion";
import { useWaitlist, WaitlistForm } from "./waitlist";
import { useLanguage } from "./LanguageContext";

const AGENT_OPTIONS = [
  "Claude Code",
  "Cursor Agent",
  "Aider",
  "Gemini CLI",
  "Custom Script",
];

const DEVICE_OPTIONS = [
  "iPhone Actionable Push",
  "Android Phone",
  "Smartwatch (Apple Watch/Wear OS)",
];

export default function SurveyClosing() {
  const { agents, devices, toggleAgent, toggleDevice, surveyPrompted } = useWaitlist();
  const { t } = useLanguage();

  return (
    <section id="survey" className="relative scroll-mt-24 py-28 sm:py-40">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="mx-auto max-w-[940px]">
          {/* Section Indicator */}
          <SectionIndex n="04">{t.survey.sectionIndex}</SectionIndex>

          {/* CLOSING SECTION COPY */}
          <div className="mt-8">
            <h2 className="type-heading text-[clamp(2.4rem,5.2vw,4.8rem)] text-ink">
              <SplitWords>
                {t.survey.headingStart}
                <span className="type-serif pr-[0.1em]">{t.survey.headingSerif}</span>
                {t.survey.headingEnd}
              </SplitWords>
            </h2>

            <Reveal delay={0.15}>
              <p className="mt-6 max-w-[680px] text-[17px] leading-[1.65] text-ink-2 sm:text-[20px]">
                {t.survey.subtitle}
              </p>
            </Reveal>
          </div>

          {/* Interactive Card containing Survey (Top) & Email Form (Bottom) */}
          <Reveal delay={0.25} className="mt-14 sm:mt-18">
            <div className="relative overflow-hidden rounded-[36px] bg-card p-6 ring-1 ring-line shadow-[0_24px_64px_-32px_rgb(14_14_16/0.2)] sm:p-10 lg:p-12">
              {/* Subtle background ambient aura */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-signal/10 blur-[80px]"
              />

              {/* Prompt banner if redirected from Hero */}
              {surveyPrompted && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 flex items-center gap-3 rounded-[20px] bg-emerald-500/10 p-4 border border-emerald-500/25 text-emerald-950"
                >
                  <IconSparkles size={18} className="text-emerald-600 shrink-0" />
                  <p className="text-[14px] font-medium leading-snug">
                    {t.hero.surveyNotice}
                  </p>
                </motion.div>
              )}

              {/* 1. VALIDATION SURVEY (POSISI DI ATAS FORM SESUAI REQ #15) */}
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="type-label text-[11px] font-semibold uppercase tracking-wider text-ok-ink">
                      {t.survey.surveyBadge}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-ink/30" />
                    <span className="type-label text-[11px] text-ink-3">
                      {t.survey.surveySubtitle}
                    </span>
                  </div>
                  <h3 className="type-heading mt-3 text-[22px] text-ink sm:text-[26px]">
                    {t.survey.surveyTitle}
                  </h3>
                </div>

                {/* Question 1: Agents */}
                <div>
                  <label className="type-label block text-[13px] font-medium text-ink">
                    {t.survey.agentLabel}
                  </label>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {AGENT_OPTIONS.map((agent) => {
                      const checked = agents.includes(agent);
                      return (
                        <button
                          key={agent}
                          type="button"
                          onClick={() => toggleAgent(agent)}
                          aria-pressed={checked}
                          className={`group relative inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 font-mono text-[13px] transition-all duration-200 cursor-pointer ${
                            checked
                              ? "bg-ink text-white ring-1 ring-ink shadow-sm"
                              : "bg-paper hover:bg-paper-2 text-ink-2 ring-1 ring-line hover:ring-line-strong"
                          }`}
                        >
                          <span
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors ${
                              checked
                                ? "border-white bg-white text-ink"
                                : "border-ink/30 bg-transparent group-hover:border-ink/60"
                            }`}
                          >
                            {checked && <IconCheck size={12} stroke={3} />}
                          </span>
                          <span>{agent}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Question 2: Devices */}
                <div>
                  <label className="type-label block text-[13px] font-medium text-ink">
                    {t.survey.deviceLabel}
                  </label>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {DEVICE_OPTIONS.map((device) => {
                      const checked = devices.includes(device);
                      return (
                        <button
                          key={device}
                          type="button"
                          onClick={() => toggleDevice(device)}
                          aria-pressed={checked}
                          className={`group relative inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 font-mono text-[13px] transition-all duration-200 cursor-pointer ${
                            checked
                              ? "bg-ink text-white ring-1 ring-ink shadow-sm"
                              : "bg-paper hover:bg-paper-2 text-ink-2 ring-1 ring-line hover:ring-line-strong"
                          }`}
                        >
                          <span
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors ${
                              checked
                                ? "border-white bg-white text-ink"
                                : "border-ink/30 bg-transparent group-hover:border-ink/60"
                            }`}
                          >
                            {checked && <IconCheck size={12} stroke={3} />}
                          </span>
                          <span>{device}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Status indicator note */}
                <div className="flex items-center gap-2 pt-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-ok" />
                  <span className="type-label text-[12px] text-ink-3">
                    {t.survey.statusNote}
                  </span>
                </div>
              </div>

              {/* Hairline Divider */}
              <div className="my-10 h-px bg-line" />

              {/* 2. EMAIL INPUT & CTA SPEC (SEKARANG DI BAWAH SURVEY SESUAI REQ #15) */}
              <div className="max-w-[620px]">
                <WaitlistForm id="closing-email" source="survey" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
