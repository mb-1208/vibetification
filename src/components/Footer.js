"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconBrandX,
  IconBrandDiscord,
  IconBrandGithub,
  IconMail,
  IconX,
  IconClock,
} from "@tabler/icons-react";
import { Wordmark } from "./Nav";
import { EASE } from "./motion";
import { useLanguage } from "./LanguageContext";

export default function Footer() {
  const [activeModal, setActiveModal] = useState(null); // 'privacy' | 'terms' | 'roadmap' | 'agents' | 'comingsoon' | null
  const { t } = useLanguage();

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setActiveModal(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleCommunityClick = (e) => {
    e.preventDefault();
    setActiveModal("comingsoon");
  };

  return (
    <>
      <footer className="relative border-t border-line bg-card/60 py-16 sm:py-24">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          {/* Top Line with Wordmark and Live Status */}
          <div className="flex flex-col gap-6 border-b border-line pb-12 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
              <a href="#top" aria-label="Vibetification" className="group">
                <Wordmark />
              </a>
              <span className="text-[14px] text-ink-3">
                {t.footer.tagline}
              </span>
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-3 sm:gap-8">
            {/* Column 1: Product */}
            <div>
              <div className="type-label text-[12px] font-semibold text-ink">
                {t.footer.productCol}
              </div>
              <ul className="mt-4 space-y-3 text-[14px] text-ink-2">
                <li>
                  <a href="#top" className="transition-colors hover:text-ink cursor-pointer">
                    {t.footer.overview}
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveModal("agents")}
                    className="transition-colors hover:text-ink text-left cursor-pointer"
                  >
                    {t.footer.supportedAgents}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveModal("roadmap")}
                    className="transition-colors hover:text-ink text-left cursor-pointer"
                  >
                    {t.footer.roadmap}
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Community (Shows Coming Soon Alert as per Req #6) */}
            <div>
              <div className="type-label text-[12px] font-semibold text-ink">
                {t.footer.communityCol}
              </div>
              <ul className="mt-4 space-y-3 text-[14px] text-ink-2">
                <li>
                  <button
                    type="button"
                    onClick={handleCommunityClick}
                    className="inline-flex items-center gap-2 transition-colors hover:text-ink text-left cursor-pointer"
                  >
                    <IconBrandX size={15} />
                    <span>{t.footer.xTwitter}</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleCommunityClick}
                    className="inline-flex items-center gap-2 transition-colors hover:text-ink text-left cursor-pointer"
                  >
                    <IconBrandDiscord size={15} />
                    <span>{t.footer.discord}</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleCommunityClick}
                    className="inline-flex items-center gap-2 transition-colors hover:text-ink text-left cursor-pointer"
                  >
                    <IconBrandGithub size={15} />
                    <span>{t.footer.github}</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact & Legal */}
            <div>
              <div className="type-label text-[12px] font-semibold text-ink">
                {t.footer.contactCol}
              </div>
              <ul className="mt-4 space-y-3 text-[14px] text-ink-2">
                <li>
                  <a
                    href="mailto:founders@vibetification.com"
                    className="inline-flex items-center gap-2 transition-colors hover:text-ink cursor-pointer"
                  >
                    <IconMail size={15} />
                    <span>founders@vibetification.com</span>
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveModal("privacy")}
                    className="transition-colors hover:text-ink text-left cursor-pointer"
                  >
                    {t.footer.privacyPolicy}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveModal("terms")}
                    className="transition-colors hover:text-ink text-left cursor-pointer"
                  >
                    {t.footer.termsOfService}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright & Disclaimer */}
          <div className="border-t border-line pt-8">
            <p className="type-label text-[12px] text-ink-3">
              {t.footer.copyright}
            </p>
          </div>
        </div>
      </footer>

      {/* Accessible Modals */}
      <AnimatePresence>
        {activeModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="relative w-full max-w-xl overflow-hidden rounded-[32px] bg-white p-6 shadow-2xl ring-1 ring-line sm:p-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-line pb-4">
                <h3 className="type-heading text-[20px] text-ink">
                  {activeModal === "privacy" && t.modals.privacyTitle}
                  {activeModal === "terms" && t.modals.termsTitle}
                  {activeModal === "roadmap" && t.modals.roadmapTitle}
                  {activeModal === "agents" && t.modals.agentsTitle}
                  {activeModal === "comingsoon" && "Community Channel"}
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-ink-3 hover:bg-paper hover:text-ink transition-colors cursor-pointer"
                  aria-label="Tutup modal"
                >
                  <IconX size={18} />
                </button>
              </div>

              <div className="mt-6 text-[14px] leading-relaxed text-ink-2 space-y-4">
                {/* Coming Soon Modal for Social Links (Req #6) */}
                {activeModal === "comingsoon" && (
                  <div className="rounded-[22px] bg-emerald-500/[0.08] p-5 ring-1 ring-emerald-500/25 text-emerald-950">
                    <div className="flex items-center gap-2.5 font-semibold text-emerald-800">
                      <IconClock size={18} />
                      <span>Coming Soon</span>
                    </div>
                    <p className="mt-2 text-[14px] text-ink-2 leading-relaxed">
                      {t.footer.comingSoonAlert}
                    </p>
                  </div>
                )}

                {activeModal === "privacy" && (
                  <>
                    <div className="rounded-[18px] bg-paper p-4 ring-1 ring-line">
                      <strong className="text-ink">{t.modals.p1Head}</strong>
                      <p className="mt-1 text-ink-3">{t.modals.p1Desc}</p>
                    </div>
                    <div className="rounded-[18px] bg-paper p-4 ring-1 ring-line">
                      <strong className="text-ink">{t.modals.p2Head}</strong>
                      <p className="mt-1 text-ink-3">{t.modals.p2Desc}</p>
                    </div>
                    <div className="rounded-[18px] bg-paper p-4 ring-1 ring-line">
                      <strong className="text-ink">{t.modals.p3Head}</strong>
                      <p className="mt-1 text-ink-3">{t.modals.p3Desc}</p>
                    </div>
                  </>
                )}

                {activeModal === "terms" && (
                  <>
                    <div className="rounded-[18px] bg-paper p-4 ring-1 ring-line">
                      <strong className="text-ink">{t.modals.t1Head}</strong>
                      <p className="mt-1 text-ink-3">{t.modals.t1Desc}</p>
                    </div>
                    <div className="rounded-[18px] bg-paper p-4 ring-1 ring-line">
                      <strong className="text-ink">{t.modals.t2Head}</strong>
                      <p className="mt-1 text-ink-3">{t.modals.t2Desc}</p>
                    </div>
                    <div className="rounded-[18px] bg-paper p-4 ring-1 ring-line">
                      <strong className="text-ink">{t.modals.t3Head}</strong>
                      <p className="mt-1 text-ink-3">{t.modals.t3Desc}</p>
                    </div>
                  </>
                )}

                {/* Roadmap without Q2 / Q3 (Req #7) */}
                {activeModal === "roadmap" && (
                  <div className="space-y-3 font-mono text-[13px]">
                    <div className="rounded-[18px] bg-paper p-4 ring-1 ring-line">
                      <span className="font-semibold text-ok-ink">
                        {t.modals.r1Tag}
                      </span>
                      <p className="mt-1 text-ink-2">{t.modals.r1Desc}</p>
                    </div>
                    <div className="rounded-[18px] bg-paper p-4 ring-1 ring-line">
                      <span className="font-semibold text-ok-ink">
                        {t.modals.r2Tag}
                      </span>
                      <p className="mt-1 text-ink-2">{t.modals.r2Desc}</p>
                    </div>
                    <div className="rounded-[18px] bg-paper p-4 ring-1 ring-line">
                      <span className="font-semibold text-ok-ink">
                        {t.modals.r3Tag}
                      </span>
                      <p className="mt-1 text-ink-2">{t.modals.r3Desc}</p>
                    </div>
                  </div>
                )}

                {activeModal === "agents" && (
                  <div className="space-y-3 font-mono text-[13px]">
                    <div className="rounded-[18px] bg-paper p-4 ring-1 ring-line">
                      <p className="text-ink-2">{t.modals.claudeDesc}</p>
                    </div>
                    <div className="rounded-[18px] bg-paper p-4 ring-1 ring-line">
                      <p className="text-ink-2">{t.modals.cursorDesc}</p>
                    </div>
                    <div className="rounded-[18px] bg-paper p-4 ring-1 ring-line">
                      <p className="text-ink-2">{t.modals.aiderDesc}</p>
                    </div>
                    <div className="rounded-[18px] bg-paper p-4 ring-1 ring-line">
                      <p className="text-ink-2">{t.modals.geminiDesc}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="rounded-full bg-ink px-6 py-2.5 text-[14px] font-medium text-white hover:bg-[#25252a] transition-colors cursor-pointer"
                >
                  {t.footer.closeModal}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
