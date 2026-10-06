"use client";

import SmoothScroll from "@/components/SmoothScroll";
import { LanguageProvider } from "@/components/LanguageContext";
import { WaitlistProvider } from "@/components/waitlist";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Features from "@/components/Features";
import Workflow from "@/components/Workflow";
import SurveyClosing from "@/components/SurveyClosing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <LanguageProvider>
      <SmoothScroll>
        <WaitlistProvider>
          <div className="relative min-h-screen bg-paper text-ink selection:bg-emerald-100 selection:text-emerald-950">
            {/* Main Navigation */}
            <Nav />

            {/* Page Sections */}
            <main>
              {/* 01. Hero Section (Above the fold, Pill badge, Headline, Primary form, Split interactive mockup) */}
              <Hero />

              {/* 02. Problem Agitator (Terminal Anxiety timeline, Mobile SSH 6" diff) */}
              <Problem />

              {/* 03. Core Feature Pillars (Bento Grid: Wrist actions, Micro-summaries, Voice prompt, Zero setup) */}
              <Features />

              {/* 04. Workflow Shift (Comparison Matrix: Manual Babysitting vs Wrist & Mobile Control) */}
              <Workflow />

              {/* 05. Micro-Survey, Closing CTA & Viral Loop */}
              <SurveyClosing />
            </main>

            {/* 06. Footer Architecture & Modals */}
            <Footer />
          </div>
        </WaitlistProvider>
      </SmoothScroll>
    </LanguageProvider>
  );
}
