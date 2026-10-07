"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext(null);

export const TRANSLATIONS = {
  id: {
    nav: {
      alphaBadge: "alpha",
      problem: "Masalah",
      features: "Fitur Utama",
      workflow: "Perbandingan",
      survey: "Validasi Survey",
      cta: "Dapatkan Akses Awal",
      menuClose: "Tutup menu",
      menuOpen: "Buka menu",
    },
    hero: {
      pillBadge: "Private Alpha: Dibangun untuk Claude Code, Gemini, Cursor, & Agent Otonom",
      h1Lead: "Stop babysitting your ",
      h1Serif1: "coding",
      h1Serif2: "agents.",
      subheadline:
        "Biarkan AI menyelesaikan refactor dan test di laptopmu selagi kamu beranjak dari meja. Vibetification mengirim notifikasi ringkasan status ke HP atau smartwatch, memberi kendali penuh untuk approve atau revisi kode dalam satu kali tap.",
      emailPlaceholder: "nama@perusahaan.com",
      ctaButton: "Dapatkan Akses Awal",
      ctaLoading: "Mendaftarkan...",
      microcopy: "Gratis akses tier Pro seumur hidup untuk 10 pendaftar pertama.",
      surveyNotice:
        "Tinggal selangkah lagi! Pilih preferensi Agent & Device di bawah untuk menyelesaikan pendaftaran.",
    },
    demo: {
      splitBadge: "Split Interactive Mockup",
      splitSub: "(Terminal VS Code Gelap ↔ Lock Screen iPhone & Smartwatch)",
      resetDemo: "Reset Demo",
      agentStatusWaiting: "menunggu_persetujuan_jam",
      agentStatusDone: "sinyal_dieksekusi",
      phoneHeader: "Lock Screen Push",
      justNow: "Baru saja",
      phoneNotifTitle: "Auth Refactor Ready",
      phoneNotifBody: '"Auth flow selesai, 12 test passed, 0 error. Deploy sekarang?"',
      actionHint: "Tekan tombol aksi untuk menguji sinkronisasi:",
      btnApprove: "Approve & Push",
      btnVoice: "Voice Reply",
      btnAbort: "Abort",
      watchHeader: "SMARTWATCH (WRIST ACTION)",
      watchSubtitleWaiting: "Getaran halus di jam tangan",
      watchSubtitleRecording: "Merekam suara pengguna...",
      voiceSimText: '"Tambahin retry logic kalau timeout"',
      waitingCalloutTitle: "Waiting confirmation: Apply changes? (y/n)",
      waitingCalloutDesc:
        "Sinyal notifikasi telah dikirim ke perangkat ponsel dan jam tanganmu.",
    },
    problem: {
      sectionIndex: "Masalah",
      headingStart: "Katanya vibe coding. Kenapa masih terjebak ",
      headingSerif1: "melototi",
      headingSerif2: "terminal?",
      p1Title: "1. Terminal Anxiety",
      p1Body:
        "Kamu menyuruh agent merombak arsitektur, ingin pergi bikin kopi, tapi ragu karena tahu dia bakal macet minta konfirmasi izin file di menit kedua.",
      p1Note:
        "Laptop ditinggal 40 menit, tapi progres terhenti di menit kedua tanpa ada notifikasi.",
      p2Title: "2. Mobile SSH yang Menyiksa",
      p2Body:
        "Mencoba remote via SSH dari ponsel hanya berujung scrolling 400 baris git diff mentah di layar 6 inci yang sempit dan membingungkan.",
      p2Note: "... [392 baris lagi terpotong di layar ponsel] ...",
    },
    features: {
      sectionIndex: "Fitur Utama",
      headingStart: "Didesain Khusus untuk ",
      headingSerif1: "Arsitektur",
      headingSerif2: "Otonom",
      subtitle:
        "Setiap pilar fitur menyelesaikan friksi nyata saat membiarkan AI coding agent bekerja sendiri.",
      f1Title: "Pocket & Wrist Actions",
      f1Lead: "Approval satu ketukan. Dari saku atau pergelangan tangan.",
      f1Body:
        "Notifikasi interaktif langsung di lock screen ponsel atau getaran halus di jam tangan. Tekan Approve untuk commit, atau Reject untuk batalkan tanpa membuka laptop.",
      f1WatchTitle: "Auth Refactor Ready",
      f1Approve: "Approve",
      f1Reject: "Reject",
      f1TestBtn: "Uji Getaran Jam",
      f1CountMsg: (c) => `Getaran halus terdeteksi di smartwatch (${c}x)`,
      f1DefaultMsg: "Klik tombol untuk menguji getaran interaktif",
      f1ApprovedMsg: " · Commit disetujui",
      f1RejectedMsg: " · Perubahan dibatalkan",

      f2Title: "Smart Micro-Summaries",
      f2Lead: "Intinya saja. Diff panjang biar tetap di terminal.",
      f2Body:
        "Vibetification memadatkan puluhan baris output terminal menjadi satu kalimat keputusan bersih.",
      f2RawBtn: "Lihat Raw Diff",
      f2CleanBtn: "Lihat Micro-Summary",
      f2CleanTag: "CLEAN MICRO-DECISION",
      f2CleanText: '"Auth flow selesai, 12 test passed, 0 error. Deploy sekarang?"',
      f2RawTag: "Raw Terminal Output (348 lines):",

      f3Title: "Voice-to-Clean-Prompt",
      f3Lead: "Bicara santai, dieksekusi presisi.",
      f3Body:
        'Sedang jalan santai? Balas via suara lewat HP atau jam: "Tambahin retry logic kalau timeout". Sistem memolesnya menjadi prompt teknis terstruktur sebelum dioper ke CLI.',
      f3PlayBtn: "Play demo",
      f3StopBtn: "Pause",
      f3CasualLabel: "Casual Voice:",
      f3RefinedLabel: "Refined Prompt:",
      f3Listening: "Mendengarkan rekaman suara...",
      f3Refining: "Memoles prompt teknis...",
      f3HintPlay: "Tekan Play demo untuk mendengar contoh.",

      f4AgentTitle: "Hubungkan Agent Kesayanganmu",
      f4AgentLead: "Satu jembatan untuk semua agent. Konek instan lewat scan QR code.",
      f4AgentBody:
        "Mendukung Claude Code, Cursor Agent, Aider, Gemini CLI, hingga custom daemon skrip lokalmu. Tanpa konfigurasi jaringan rumit atau port-forwarding, cukup scan QR code dari HP dan agent langsung tersinkronisasi.",
      f4AgentScanBtn: "Uji Scan QR Code",
      f4AgentPairedMsg: "✓ Terhubung ke",
      f4AgentScanningMsg: "Memindai QR pairing token...",
      f4AgentSelectLabel: "Pilih Agent:",
      f4AgentQrLabel: "Scan pairing QR code di terminal:",

      f5Title: "Zero Setup & Privacy-First",
      f5Lead: "Satu baris perintah. Nol konfigurasi jaringan.",
      f5Body:
        "Tanpa port-forwarding, tanpa VPN, tanpa langganan cloud rumit. Cukup scan QR code sekali. Kode sumber tidak pernah meninggalkan laptop: hanya sinyal status dan approval.",
      f5ComingSoon: "Coming Soon",
      f5LaptopTitle: "Laptop",
      f5LaptopDesc: "Kode sumber tetap di sini",
      f5MobileTitle: "HP & jam",
      f5MobileDesc: "Hanya sinyal status dan approval",
      f5ZeroRetention: "Zero Source Code Retention",
    },
    workflow: {
      sectionIndex: "Perbandingan",
      headingStart: "Pergeseran Alur Kerja: ",
      headingSerif1: "Babysitting",
      headingMid: " vs ",
      headingSerif2: "Kebebasan",
      subtitle:
        "Vibetification menggeser kebiasaan memantau terminal secara pasif menjadi persetujuan otonom berbasis sinyal langsung di pergelangan tangan.",
      colBefore: "Tanpa Vibetification (Manual Babysitting)",
      colAfter: "Bersama Vibetification (Wrist & Mobile Control)",
      solTag: "Solusi Vibetification",
      row1Before: "Diam di depan monitor menunggu terminal running.",
      row1After: "Jalankan task, tutup lid laptop, pergi beraktivitas santai.",
      row1Detail:
        "Laptop menjalankan test suite di latar belakang selagi kamu menikmati kopi.",
      row2Before: "Bolak-balik mengecek layar tiap beberapa menit karena cemas.",
      row2After: "HP atau jam tangan bergetar hanya saat butuh keputusanmu.",
      row2Detail:
        "Tidak ada notifikasi spam. Haptic feedback hanya aktif saat ada blokade konfirmasi.",
      row3Before: 'Repot remote desktop ke laptop cuma buat ketik "yes".',
      row3After: "Ketuk satu tombol di lock screen atau smartwatch sambil jalan.",
      row3Detail:
        "Actionable Push terintegrasi dengan Claude Code dan Cursor agent daemon.",
      row4Before: "Konteks kerja buyar karena distraksi alt-tab ke medsos.",
      row4After: "Fokus pada hal lain sampai notifikasi esensial masuk.",
      row4Detail:
        "Deep work tetap terjaga tanpa kecemasan kehilangan kendali atas progres kode.",
    },
    survey: {
      sectionIndex: "Validasi Survey & Akses Awal",
      headingStart: "Kembalikan kebebasan ",
      headingSerif: "ngoding",
      headingEnd: " kamu.",
      subtitle:
        "Biarkan AI menanggung beban eksekusi berat di background. Ambil kendali penuh dari mana saja tanpa terikat meja kerja.",
      surveyBadge: "Validation Survey",
      surveySubtitle: "Bantu kami memprioritaskan integrasi pertamamu",
      surveyTitle: "Bantu kami memprioritaskan integrasi pertamamu:",
      agentLabel: "• Agent (Pilih minimal 1):",
      deviceLabel: "• Device (Pilih minimal 1):",
      statusNote: "Preferensi disimpan otomatis ke antrean alpha pribadimu.",
      requireSurveyAlert:
        "Silakan pilih minimal 1 Agent dan 1 Device untuk melanjutkan pendaftaran.",
      invalidEmailAlert: "Masukkan alamat email yang valid, contoh: nama@perusahaan.com",
      submitFailedAlert: "Gagal mengirim data. Silakan coba beberapa saat lagi.",
      successTitle: "Pendaftaran Berhasil!",
      successDesc:
        "Terima kasih telah mendaftar! Email dan preferensi integrasimu sudah tersimpan. Undangan akses Private Alpha akan kami kirimkan ke emailmu begitu batch berikutnya dibuka.",
      shareBtn: "Bagikan ke Teman Developer",
      copiedText: "Link tersalin!",
      jumpQueue: "Ajak rekan developermu untuk mencoba bersama.",
    },
    footer: {
      tagline: "Stop babysitting your coding agents.",
      statusOperational: "Status: All Systems Operational (Alpha)",
      productCol: "Product:",
      overview: "Overview",
      supportedAgents: "Supported Agents",
      roadmap: "Roadmap",
      communityCol: "Community:",
      xTwitter: "X / Twitter",
      discord: "Discord Server",
      github: "GitHub Discussions",
      contactCol: "Contact & Legal:",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      copyright:
        "© 2026 vibetification. All rights reserved. Zero source code retention. Only signals and approvals.",
      comingSoonAlert:
        "Coming Soon! Komunitas resmi Vibetification akan dibuka saat peluncuran Private Alpha.",
      closeModal: "Tutup",
    },
    modals: {
      privacyTitle: "Privacy Policy · Zero Code Retention",
      p1Head: "1. Zero Source Code Retention:",
      p1Desc:
        "Vibetification didesain dengan prinsip bahwa kode sumbermu tidak pernah meninggalkan laptop. Seluruh file repositori tetap berjalan 100% secara lokal.",
      p2Head: "2. Signal Only:",
      p2Desc:
        "Kami hanya mentransmisikan sinyal ringkasan status terenkripsi (contoh: jumlah test lolos, nama branch, dan permintaan izin).",
      p3Head: "3. Enkripsi End-to-End:",
      p3Desc:
        "Kanal komunikasi antara CLI laptop dan aplikasi ponsel/smartwatch diamankan menggunakan enkripsi peer-to-peer.",

      termsTitle: "Terms of Service · Private Alpha",
      t1Head: "1. Lifetime Pro Tier:",
      t1Desc:
        "Sebanyak 10 pendaftar pertama yang terverifikasi dalam Private Alpha berhak mendapatkan lisensi tier Pro gratis seumur hidup.",
      t2Head: "2. Alpha Evaluation:",
      t2Desc:
        "Layanan ini berada dalam tahap pengujian private alpha aktif. Pengguna diharapkan memberikan laporan umpan balik teknis dan laporan isu di GitHub.",
      t3Head: "3. Batasan Tanggung Jawab:",
      t3Desc:
        "Vibetification menyediakan mekanisme persetujuan remote dan tidak bertanggung jawab atas eksekusi logika kode yang disetujui pengguna.",

      roadmapTitle: "Product Roadmap",
      r1Tag: "[Fase 1: Sekarang]",
      r1Desc: "Private Alpha CLI hook untuk Claude Code dan Cursor Agent.",
      r2Tag: "[Fase 2: Actionable Push]",
      r2Desc:
        "Notifikasi interaktif iOS/Android & Smartwatch extension (Apple Watch / Wear OS).",
      r3Tag: "[Fase 3: Voice-to-Clean-Prompt]",
      r3Desc:
        "Audio transform pipeline & integrasi multi-agent concurrency.",

      agentsTitle: "Supported Coding Agents",
      claudeDesc:
        "Claude Code: Interceptor native untuk konfirmasi file edit dan command execution.",
      cursorDesc:
        "Cursor Agent: Terminal hook yang menangkap status background build dan linting.",
      aiderDesc: "Aider: Git commit approval dan auto-push bridge.",
      geminiDesc:
        "Gemini CLI & Custom Scripts: REST/WebSocket local daemon hook untuk skrip kustommu.",
    },
  },

  en: {
    nav: {
      alphaBadge: "alpha",
      problem: "Problems",
      features: "Core Features",
      workflow: "Comparison",
      survey: "Validation Survey",
      cta: "Get Early Access",
      menuClose: "Close menu",
      menuOpen: "Open menu",
    },
    hero: {
      pillBadge: "Private Alpha: Built for Claude Code, Gemini, Cursor, & Autonomous Agents",
      h1Lead: "Stop babysitting your ",
      h1Serif1: "coding",
      h1Serif2: "agents.",
      subheadline:
        "Let AI complete refactors and test suites on your laptop while you step away from your desk. Vibetification delivers concise status summaries to your phone or smartwatch, giving you full control to approve or revise in a single tap.",
      emailPlaceholder: "name@company.com",
      ctaButton: "Get Early Access",
      ctaLoading: "Registering...",
      microcopy: "Free lifetime Pro tier access for the first 10 developers.",
      surveyNotice:
        "Almost done! Select your Agent & Device preferences below to finalize registration.",
    },
    demo: {
      splitBadge: "Split Interactive Mockup",
      splitSub: "(Dark VS Code Terminal ↔ Lock Screen iPhone & Smartwatch)",
      resetDemo: "Reset Demo",
      agentStatusWaiting: "paused_for_wrist_approval",
      agentStatusDone: "signal_executed",
      phoneHeader: "Lock Screen Push",
      justNow: "Just now",
      phoneNotifTitle: "Auth Refactor Ready",
      phoneNotifBody: '"Auth flow complete, 12 tests passed, 0 errors. Deploy now?"',
      actionHint: "Tap an action button to test real-time sync:",
      btnApprove: "Approve & Push",
      btnVoice: "Voice Reply",
      btnAbort: "Abort",
      watchHeader: "SMARTWATCH (WRIST ACTION)",
      watchSubtitleWaiting: "Subtle wrist vibration",
      watchSubtitleRecording: "Recording developer voice...",
      voiceSimText: '"Add exponential backoff retry logic if timeout"',
      waitingCalloutTitle: "Waiting confirmation: Apply changes? (y/n)",
      waitingCalloutDesc:
        "Notification signal sent directly to your mobile phone and smartwatch.",
    },
    problem: {
      sectionIndex: "The Problem",
      headingStart: "They promised vibe coding. Why are you still ",
      headingSerif1: "staring",
      headingSerif2: "at terminals?",
      p1Title: "1. Terminal Anxiety",
      p1Body:
        "You prompt an agent to refactor architecture, step out to grab a coffee, but hesitate because you know it will stall asking for file permissions 2 minutes in.",
      p1Note:
        "Laptop left unattended for 40 minutes, yet progress halted in minute two with zero notification.",
      p2Title: "2. Excruciating Mobile SSH",
      p2Body:
        "Attempting remote SSH from your phone only leads to endlessly scrolling through a 400-line raw git diff on a cramped 6-inch screen.",
      p2Note: "... [392 more lines truncated on mobile screen] ...",
    },
    features: {
      sectionIndex: "Core Features",
      headingStart: "Engineered for ",
      headingSerif1: "Autonomous",
      headingSerif2: "Architectures",
      subtitle:
        "Each feature pillar resolves real friction encountered when letting autonomous coding agents work on their own.",
      f1Title: "Pocket & Wrist Actions",
      f1Lead: "One-tap approval. Straight from your pocket or wrist.",
      f1Body:
        "Interactive notifications directly on your phone lock screen or subtle vibrations on your smartwatch. Tap Approve to commit, or Reject to abort without opening your laptop.",
      f1WatchTitle: "Auth Refactor Ready",
      f1Approve: "Approve",
      f1Reject: "Reject",
      f1TestBtn: "Simulate Wrist Haptic",
      f1CountMsg: (c) => `Subtle haptic detected on smartwatch (${c}x)`,
      f1DefaultMsg: "Click the button to test interactive haptics",
      f1ApprovedMsg: " · Commit approved",
      f1RejectedMsg: " · Changes aborted",

      f2Title: "Smart Micro-Summaries",
      f2Lead: "Only what matters. Keep noisy diffs in the terminal.",
      f2Body:
        "Vibetification condenses dozens of terminal output lines into a clean, decisive sentence.",
      f2RawBtn: "View Raw Diff",
      f2CleanBtn: "View Micro-Summary",
      f2CleanTag: "CLEAN MICRO-DECISION",
      f2CleanText: '"Auth flow complete, 12 tests passed, 0 errors. Deploy now?"',
      f2RawTag: "Raw Terminal Output (348 lines):",

      f3Title: "Voice-to-Clean-Prompt",
      f3Lead: "Speak casually, execute with precision.",
      f3Body:
        'Out on a walk? Reply via voice on your phone or watch: "Add retry logic on timeout". The system refines it into a structured technical prompt before dispatching it to the CLI.',
      f3PlayBtn: "Play demo",
      f3StopBtn: "Pause",
      f3CasualLabel: "Casual Voice:",
      f3RefinedLabel: "Refined Prompt:",
      f3Listening: "Listening to audio input...",
      f3Refining: "Refining technical prompt...",
      f3HintPlay: "Press Play demo to hear an example.",

      f4AgentTitle: "Connect Your Favorite Agents",
      f4AgentLead: "One unified bridge for all agents. Instant pairing via QR scan.",
      f4AgentBody:
        "Seamlessly connect Claude Code, Cursor Agent, Aider, Gemini CLI, and custom scripts. Just scan the QR code once from your phone or smartwatch to connect your agent instantly with zero port-forwarding.",
      f4AgentScanBtn: "Simulate QR Scan",
      f4AgentPairedMsg: "✓ Connected to",
      f4AgentScanningMsg: "Scanning pairing token...",
      f4AgentSelectLabel: "Select Agent:",
      f4AgentQrLabel: "Scan terminal pairing QR code:",

      f5Title: "Zero Setup & Privacy-First",
      f5Lead: "One command line. Zero network configuration.",
      f5Body:
        "No port-forwarding, no VPN, no tedious cloud subscriptions. Just scan a QR code once. Your source code never leaves your laptop: only status signals and approvals.",
      f5ComingSoon: "Coming Soon",
      f5LaptopTitle: "Laptop",
      f5LaptopDesc: "Source code stays 100% local",
      f5MobileTitle: "Phone & Watch",
      f5MobileDesc: "Only status signals & approvals",
      f5ZeroRetention: "Zero Source Code Retention",
    },
    workflow: {
      sectionIndex: "Comparison",
      headingStart: "Workflow Shift: ",
      headingSerif1: "Babysitting",
      headingMid: " vs ",
      headingSerif2: "Freedom",
      subtitle:
        "Vibetification transforms passive terminal babysitting into proactive wrist-level autonomous approvals.",
      colBefore: "Without Vibetification (Manual Babysitting)",
      colAfter: "With Vibetification (Wrist & Mobile Control)",
      solTag: "Vibetification Solution",
      row1Before: "Sitting in front of the monitor waiting for the terminal to run.",
      row1After: "Launch tasks, close laptop lid, and enjoy your time freely.",
      row1Detail:
        "Your laptop executes test suites in the background while you enjoy a coffee.",
      row2Before: "Anxiously checking the screen every couple of minutes.",
      row2After: "Phone or watch only vibrates when a decision is required.",
      row2Detail:
        "No notification spam. Haptic feedback is exclusively triggered upon confirmation gates.",
      row3Before: 'Opening mobile remote desktop just to type "yes".',
      row3After: "Tap one button on your lock screen or smartwatch on the move.",
      row3Detail:
        "Actionable Push integrates seamlessly with Claude Code & Cursor agent daemons.",
      row4Before: "Losing mental focus due to alt-tabbing into social media.",
      row4After: "Focus on meaningful tasks until essential notifications arrive.",
      row4Detail:
        "Maintain deep work without anxiety over losing track of autonomous code progress.",
    },
    survey: {
      sectionIndex: "Validation Survey & Early Access",
      headingStart: "Reclaim your coding ",
      headingSerif: "freedom.",
      headingEnd: "",
      subtitle:
        "Let AI bear the heavy execution burden in the background. Take full command from anywhere without being chained to your desk.",
      surveyBadge: "Validation Survey",
      surveySubtitle: "Help us prioritize your first integration",
      surveyTitle: "Help us prioritize your first integration:",
      agentLabel: "• Agent (Select at least 1):",
      deviceLabel: "• Device (Select at least 1):",
      statusNote: "Preferences automatically saved to your private alpha queue.",
      requireSurveyAlert:
        "Please select at least 1 Agent and 1 Device to complete your registration.",
      invalidEmailAlert: "Please enter a valid developer email, e.g. name@company.com",
      submitFailedAlert: "Failed to submit. Please try again later.",
      successTitle: "Registration Confirmed!",
      successDesc:
        "Thank you for signing up! Your email and integration preferences have been recorded. We will send your Private Alpha invite as the next batch opens.",
      shareBtn: "Share with Fellow Developers",
      copiedText: "Link copied!",
      jumpQueue: "Invite your developer teammates to build together.",
    },
    footer: {
      tagline: "Stop babysitting your coding agents.",
      statusOperational: "Status: All Systems Operational (Alpha)",
      productCol: "Product:",
      overview: "Overview",
      supportedAgents: "Supported Agents",
      roadmap: "Roadmap",
      communityCol: "Community:",
      xTwitter: "X / Twitter",
      discord: "Discord Server",
      github: "GitHub Discussions",
      contactCol: "Contact & Legal:",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      copyright:
        "© 2026 vibetification. All rights reserved. Zero source code retention. Only signals and approvals.",
      comingSoonAlert:
        "Coming Soon! The official Vibetification community will open during the Private Alpha launch.",
      closeModal: "Close",
    },
    modals: {
      privacyTitle: "Privacy Policy · Zero Code Retention",
      p1Head: "1. Zero Source Code Retention:",
      p1Desc:
        "Vibetification is architected around the core principle that your source code never leaves your laptop. Repository files remain 100% on your local machine.",
      p2Head: "2. Signal Only:",
      p2Desc:
        "We only transmit encrypted metadata signals (e.g., test counts passed, branch names, and approval gate requests).",
      p3Head: "3. End-to-End Encryption:",
      p3Desc:
        "The communication channel between your local CLI daemon and mobile/smartwatch apps is secured using peer-to-peer encryption.",

      termsTitle: "Terms of Service · Private Alpha",
      t1Head: "1. Lifetime Pro Tier:",
      t1Desc:
        "The first 10 verified developers in the Private Alpha are granted lifetime free access to the Pro tier.",
      t2Head: "2. Alpha Evaluation:",
      t2Desc:
        "This service is under active private alpha evaluation. Users are encouraged to provide technical feedback and report issues on GitHub.",
      t3Head: "3. Limitation of Liability:",
      t3Desc:
        "Vibetification provides remote authorization signals and is not liable for code execution logic approved by the user.",

      roadmapTitle: "Product Roadmap",
      r1Tag: "[Phase 1: Current]",
      r1Desc: "Private Alpha CLI hooks for Claude Code and Cursor Agent.",
      r2Tag: "[Phase 2: Actionable Push]",
      r2Desc:
        "Interactive notifications for iOS/Android & Smartwatch extensions (Apple Watch / Wear OS).",
      r3Tag: "[Phase 3: Voice-to-Clean-Prompt]",
      r3Desc:
        "Audio transform pipeline & multi-agent concurrent coordination.",

      agentsTitle: "Supported Coding Agents",
      claudeDesc:
        "Claude Code: Native interceptor for file modification approvals and command execution gates.",
      cursorDesc:
        "Cursor Agent: Terminal daemon hook capturing background build and lint status.",
      aiderDesc: "Aider: Git commit approval gate and auto-push bridge.",
      geminiDesc:
        "Gemini CLI & Custom Scripts: REST/WebSocket local daemon hook for custom developer scripts.",
    },
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("id");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("vibetification_lang");
      if (saved === "id" || saved === "en") {
        queueMicrotask(() => setLang(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const changeLang = (l) => {
    setLang(l);
    localStorage.setItem("vibetification_lang", l);
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.id;

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
