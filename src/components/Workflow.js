"use client";

import { motion } from "framer-motion";
import { IconCheck, IconX } from "@tabler/icons-react";
import { SplitWords, Reveal, SectionIndex } from "./motion";
import { useLanguage } from "./LanguageContext";

export default function Workflow() {
  const { t, lang } = useLanguage();

  const comparisons = [
    {
      n: "01",
      before: t.workflow.row1Before,
      after: t.workflow.row1After,
      detail: t.workflow.row1Detail,
    },
    {
      n: "02",
      before: t.workflow.row2Before,
      after: t.workflow.row2After,
      detail: t.workflow.row2Detail,
    },
    {
      n: "03",
      before: t.workflow.row3Before,
      after: t.workflow.row3After,
      detail: t.workflow.row3Detail,
    },
    {
      n: "04",
      before: t.workflow.row4Before,
      after: t.workflow.row4After,
      detail: t.workflow.row4Detail,
    },
  ];

  return (
    <section id="workflow" className="relative scroll-mt-24 py-28 sm:py-40">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="max-w-[860px]">
          <SectionIndex n="03">{t.workflow.sectionIndex}</SectionIndex>
          <h2 key={lang} className="type-heading mt-8 text-[clamp(2.3rem,4.8vw,4.4rem)] text-ink">
            <SplitWords>
              {t.workflow.headingStart}
              <span className="type-serif">{t.workflow.headingSerif1}</span>
              {t.workflow.headingMid}
              <span className="type-serif pr-[0.1em]">{t.workflow.headingSerif2}</span>
            </SplitWords>
          </h2>
          <Reveal>
            <p className="mt-6 max-w-[620px] text-[17px] leading-[1.65] text-ink-2 sm:text-[19px]">
              {t.workflow.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Comparison Matrix Container */}
        <div className="mt-16 sm:mt-24">
          {/* Header row for desktop */}
          <div className="hidden grid-cols-2 gap-4 pb-4 lg:grid">
            <div className="flex items-center gap-3 px-6">
              <span className="h-2 w-2 rounded-full bg-ink/20" />
              <span className="type-label text-[13px] text-ink-3">
                {t.workflow.colBefore}
              </span>
            </div>
            <div className="flex items-center gap-3 px-6">
              <span className="h-2 w-2 rounded-full bg-ok" />
              <span className="type-label text-[13px] font-semibold text-ink">
                {t.workflow.colAfter}
              </span>
            </div>
          </div>

          {/* Matrix Rows */}
          <div className="space-y-4">
            {comparisons.map((item, idx) => (
              <ComparisonRow
                key={item.n}
                item={item}
                idx={idx}
                colBefore={t.workflow.colBefore}
                colAfter={t.workflow.colAfter}
                solTag={t.workflow.solTag}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ComparisonRow({ item, idx, colBefore, colAfter, solTag }) {
  return (
    <Reveal delay={idx * 0.08}>
      <div className="group relative overflow-hidden rounded-[28px] bg-card p-2 ring-1 ring-line transition-all duration-300 hover:ring-line-strong hover:shadow-[0_16px_40px_-24px_rgb(14_14_16/0.12)]">
        <div className="grid gap-2 lg:grid-cols-2">
          {/* Column 1: Tanpa Vibetification */}
          <div className="relative flex flex-col justify-between rounded-[22px] bg-paper-2/50 p-6 sm:p-7">
            <div className="lg:hidden flex items-center gap-2 mb-3">
              <span className="type-label text-[11px] text-ink-3">
                {colBefore}
              </span>
            </div>

            <div className="flex items-start gap-4">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink/[0.06] text-ink/40">
                <IconX size={15} stroke={2.2} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <span className="type-label text-[11px] text-ink-3 tabular-nums">
                  {item.n}
                </span>
                <p className="mt-1 text-[16px] leading-[1.5] text-ink-2 line-through decoration-ink/20">
                  {item.before}
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Bersama Vibetification */}
          <div className="relative flex flex-col justify-between rounded-[22px] bg-white p-6 shadow-sm ring-1 ring-line/80 sm:p-7">
            <div className="lg:hidden flex items-center gap-2 mb-3">
              <span className="type-label text-[11px] font-semibold text-ok-ink">
                {colAfter}
              </span>
            </div>

            <div className="flex items-start gap-4">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ok text-white shadow-xs">
                <IconCheck size={15} stroke={2.4} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <span className="type-label text-[11px] font-semibold text-ok-ink tabular-nums">
                  {solTag}
                </span>
                <p className="mt-1 text-[17px] font-medium leading-[1.5] text-ink">
                  {item.after}
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-3">
                  {item.detail}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
