'use client';
import React, { useEffect, useRef } from 'react';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Target,
  Clock,
  Lightbulb,
  ShieldCheck,
  ChevronRight,
  Zap,
  Brain,
  CheckCircle2,
  Compass,
} from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
  onOpenFeature?: (featureId: string) => void;
}

export default function LandingPage({ onEnterApp, onOpenFeature }: LandingPageProps) {
  const heroRef     = useRef<HTMLDivElement>(null);
  const badgeRef    = useRef<HTMLDivElement>(null);
  const h1Ref       = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const metricsRef  = useRef<HTMLDivElement>(null);

  /* ─── Lightweight GSAP entrance animations (bulletproof) ──── */
  useEffect(() => {
    let isMounted = true;

    const runAnimations = async () => {
      try {
        const { gsap } = await import('gsap');
        if (!isMounted) return;

        // Respect user's motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        // Smooth staggered entrance for Hero elements only, safely with clearProps
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
        
        if (badgeRef.current) {
          tl.fromTo(badgeRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, clearProps: 'all' });
        }
        if (h1Ref.current) {
          tl.fromTo(h1Ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, clearProps: 'all' }, '-=0.3');
        }
        if (subtitleRef.current) {
          tl.fromTo(subtitleRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, clearProps: 'all' }, '-=0.35');
        }
        if (ctaRef.current) {
          tl.fromTo(ctaRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.45, clearProps: 'all' }, '-=0.3');
        }
        if (metricsRef.current) {
          tl.fromTo(
            Array.from(metricsRef.current.children),
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, clearProps: 'all' },
            '-=0.25'
          );
        }
      } catch (err) {
        console.error('GSAP animation error:', err);
      }
    };

    runAnimations();

    return () => {
      isMounted = false;
    };
  }, []);

  /* ─── 4 Core Academic Features ────────────────────────────── */
  const features = [
    {
      id: 'deconstruct',
      icon: BookOpen,
      iconBg: 'bg-chambray-50 text-chambray-700 border-chambray-200',
      tagBg: 'bg-chambray-50 text-chambray-700',
      borderHover: 'hover:border-chambray-400 hover:shadow-elevated',
      badge: 'Modul 01',
      title: 'Dekonstruksi Catatan',
      desc: 'Memecah catatan kuliah tebal menjadi konsep inti berbobot dan modul belajar 15-menit yang mudah dicerna otak (Chunking Theory).',
      tag: 'Chunking Theory',
    },
    {
      id: 'trap',
      icon: Target,
      iconBg: 'bg-zest-50 text-zest-600 border-zest-200',
      tagBg: 'bg-zest-50 text-zest-700',
      borderHover: 'hover:border-zest-400 hover:shadow-elevated',
      badge: 'Modul 02',
      title: 'Prediksi Soal Jebakan',
      desc: 'Simulasi pola pikir pembuat soal ujian untuk mengungkap pertanyaan mengecoh, jebakan kata, dan edge cases rawan keliru.',
      tag: 'Examiner Mindset',
    },
    {
      id: 'cram',
      icon: Clock,
      iconBg: 'bg-ronchi-50 text-ronchi-700 border-ronchi-200',
      tagBg: 'bg-ronchi-50 text-ronchi-800',
      borderHover: 'hover:border-ronchi-400 hover:shadow-elevated',
      badge: 'Modul 03',
      title: 'Rencana Belajar Darurat',
      desc: 'Alokasi waktu SKS taktis berbasis Prinsip Pareto 80/20 dan manajemen energi kognitif anti-burnout sebelum ujian.',
      tag: 'Pareto 80/20',
    },
    {
      id: 'feynman',
      icon: Lightbulb,
      iconBg: 'bg-pigeon-50 text-chambray-800 border-pigeon-300',
      tagBg: 'bg-pigeon-50 text-chambray-800',
      borderHover: 'hover:border-pigeon-400 hover:shadow-elevated',
      badge: 'Modul 04',
      title: 'Metode Richard Feynman',
      desc: 'Menyederhanakan konsep paling rumit menggunakan analogi dunia nyata yang intuitif tanpa jargon akademis berbelit.',
      tag: 'Mental Model',
    },
  ];

  /* ─── Metrics ─────────────────────────────────────────────── */
  const metrics = [
    { val: 'Google Gemini', label: 'AI Engine Utama',     sub: 'Latensi cepat ~1-2 detik' },
    { val: '4 Modul',       label: 'Instrumen Akademik',  sub: 'Active Recall & Chunking' },
    { val: 'Mode Demo',     label: 'Graceful Fallback',   sub: 'Tetap jalan tanpa kuota' },
    { val: '100% Responsif',label: 'Desain Teroptimasi',  sub: 'Lancar di HP & Laptop' },
  ];

  /* ─── How It Works ────────────────────────────────────────── */
  const howItWorks = [
    {
      step: '01',
      title: 'Masukkan Catatan Kuliah',
      desc: 'Tempelkan rangkuman, slide, materi PDF, atau gunakan tombol contoh instan yang tersedia.',
      icon: BookOpen,
      color: 'bg-chambray-600 text-white',
    },
    {
      step: '02',
      title: 'Pilih Modul Akademik',
      desc: 'Pilih kebutuhan studimu: ringkas catatan, bedah jebakan ujian, jadwal darurat, atau analogi Feynman.',
      icon: Compass,
      color: 'bg-bermuda-500 text-white',
    },
    {
      step: '03',
      title: 'Gemini AI Memproses',
      desc: 'Model AI mengekstrak konsep kunci dan menyusun instruksi terstruktur dalam hitungan detik.',
      icon: Brain,
      color: 'bg-ronchi-500 text-chambray-950',
    },
    {
      step: '04',
      title: 'Pelajari & Ekspor Markdown',
      desc: 'Gunakan checklist 15-menit, salin teks ke Notion/Obsidian, atau ekspor file .md langsung.',
      icon: CheckCircle2,
      color: 'bg-zest-500 text-white',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col font-sans selection:bg-chambray-600 selection:text-white">

      {/* ── Top Navigation Bar ── */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-chambray-700 via-chambray-600 to-bermuda-500 flex items-center justify-center text-white shadow-sm shadow-chambray-200">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900">
                Lectura<span className="text-chambray-600 font-extrabold">AI</span>
              </span>
              <span className="hidden sm:inline text-[10px] text-bermuda-600 font-medium -mt-0.5">
                Academic Copilot & Study Accelerator
              </span>
            </div>
          </div>

          {/* Nav Links & CTA */}
          <div className="flex items-center gap-4">
            <a
              href="#fitur"
              className="hidden sm:inline text-xs font-semibold text-slate-600 hover:text-chambray-600 transition"
            >
              Fitur
            </a>
            <a
              href="#cara-kerja"
              className="hidden sm:inline text-xs font-semibold text-slate-600 hover:text-chambray-600 transition"
            >
              Cara Kerja
            </a>
            <button
              onClick={onEnterApp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-chambray-600 hover:bg-chambray-700 active:bg-chambray-800 text-white text-xs sm:text-sm font-semibold shadow-brand transition-all hover:scale-[1.02]"
            >
              <span>Buka Aplikasi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* ── Hero Section ── */}
      <section ref={heroRef} className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-slate-200/70 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/40">
        
        {/* Subtle geometric background accents */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(#38598a 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[580px] h-[340px] rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #a7c4d7 0%, #38598a 70%, transparent 100%)' }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

          {/* Academic Badge */}
          <div ref={badgeRef} className="flex justify-center mb-5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-chambray-50 border border-chambray-200/80 text-chambray-700 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-ronchi-500" />
              <span>Didukung Google Gemini AI Engine</span>
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={h1Ref}
            className="text-3xl sm:text-5xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.18] max-w-3xl mx-auto"
          >
            Belajar Lebih Efisien,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-chambray-700 via-chambray-600 to-zest-500">
              Pahami Konsep Lebih Cepat
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="mt-4 text-xs sm:text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Platform asisten akademik bertenaga AI untuk mereduksi beban kognitif mahasiswa. Memecah catatan rumit menjadi modul 15-menit, memprediksi jebakan soal ujian, dan mengatur waktu belajar darurat berbasis sains kognitif.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onEnterApp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-chambray-600 hover:bg-chambray-700 active:bg-chambray-800 text-white font-semibold text-xs sm:text-sm shadow-brand hover:shadow-elevated transition-all"
            >
              <Zap className="w-4 h-4 text-ronchi-300" />
              <span>Mulai Belajar Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#fitur"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 font-semibold text-xs sm:text-sm shadow-subtle transition"
            >
              <span>Pelajari 4 Modul Fitur</span>
            </a>
          </div>

          {/* Metrics Strip */}
          <div ref={metricsRef} className="mt-12 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {metrics.map((m, i) => (
              <div key={i} className="p-3.5 sm:p-4 rounded-xl bg-white/90 backdrop-blur-xs border border-slate-200/80 shadow-subtle text-center">
                <p className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">{m.val}</p>
                <p className="text-[11px] font-semibold text-chambray-700 mt-0.5">{m.label}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{m.sub}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4 Pillars Feature Section ── */}
      <section id="fitur" className="py-14 sm:py-20 bg-white border-b border-slate-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="text-[11px] font-bold uppercase tracking-wider text-chambray-700 bg-chambray-50 px-3 py-1 rounded-full border border-chambray-200/70">
              Instrumen Belajar
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-3">
              4 Modul Utama Lectura AI
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              Setiap modul dibangun di atas metodologi pendidikan dan psikologi kognitif modern yang telah teruji efektivitasnya.
            </p>
          </div>

          {/* Features Grid: Fully Visible, Responsive & Clean */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.id}
                  onClick={() => {
                    if (onOpenFeature) onOpenFeature(feat.id);
                    else onEnterApp();
                  }}
                  className={`p-5 sm:p-6 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white transition-all duration-200 cursor-pointer group flex flex-col justify-between ${feat.borderHover}`}
                >
                  <div>
                    {/* Card Top */}
                    <div className="flex items-center justify-between mb-3.5">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center border shadow-xs ${feat.iconBg}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-400 group-hover:text-chambray-600 transition flex items-center gap-1">
                        Coba Modul
                        <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
                      </span>
                    </div>

                    {/* Badge & Title */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                        {feat.badge}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-chambray-700 transition">
                        {feat.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      {feat.desc}
                    </p>
                  </div>

                  {/* Card Bottom Tag */}
                  <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between text-[11px]">
                    <span className={`px-2 py-0.5 rounded font-medium ${feat.tagBg}`}>
                      {feat.tag}
                    </span>
                    <span className="text-chambray-600 font-semibold group-hover:underline">
                      Buka di Dashboard &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── How It Works Section ── */}
      <section id="cara-kerja" className="py-14 sm:py-20 bg-slate-50/80 border-b border-slate-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
            <span className="text-[11px] font-bold uppercase tracking-wider text-bermuda-700 bg-bermuda-50 px-3 py-1 rounded-full border border-bermuda-200">
              Alur Penggunaan
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-3">
              Cara Kerja Lectura AI
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Transformasi catatan rumit ke pemahaman siap ujian dalam 4 langkah terstruktur.
            </p>
          </div>

          {/* Steps Grid: Fully Visible & Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {howItWorks.map((h) => {
              const Icon = h.icon;
              return (
                <div
                  key={h.step}
                  className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle hover:border-chambray-300 hover:shadow-elevated transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-chambray-400">
                        LANGKAH {h.step}
                      </span>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-xs ${h.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">
                      {h.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {h.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center text-[10px] text-slate-400">
                    <span>Instan &middot; Terstruktur</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── Call to Action Banner ── */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-7 sm:p-10 rounded-3xl bg-gradient-to-br from-chambray-800 via-chambray-700 to-chambray-900 text-white relative overflow-hidden shadow-elevated flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Subtle glow circle */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl opacity-20"
              style={{ background: '#f0c74c' }}
            />

            <div className="relative z-10 max-w-xl text-center md:text-left space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ronchi-300 bg-chambray-950/60 px-3 py-1 rounded-full border border-chambray-600/50 inline-block">
                Siap Belajar Efisien?
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
                Mulai Uji Coba Lectura AI Sekarang
              </h2>
              <p className="text-xs sm:text-sm text-chambray-100 leading-relaxed">
                Akses instan ke dashboard interaktif. Dilengkapi contoh materi kuliah siap pakai untuk demonstrasi langsung tanpa perlu login.
              </p>
            </div>

            <button
              onClick={onEnterApp}
              className="relative z-10 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-chambray-900 font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4 text-zest-500" />
              <span>Buka Dashboard Aplikasi</span>
              <ArrowRight className="w-4 h-4 text-chambray-600" />
            </button>

          </div>
        </div>
      </section>

      {/* ── Minimalist Clean Footer ── */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white py-8 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-chambray-600 flex items-center justify-center text-white">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 text-sm">
                Lectura<span className="text-chambray-600 font-extrabold">AI</span>
              </span>
              <span className="text-[11px] text-slate-400">
                Academic Copilot & Study Accelerator
              </span>
            </div>

            {/* Tech Specs */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-[11px]">
              <span className="flex items-center gap-1.5 text-slate-600">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Validasi Skema Zod
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <Sparkles className="w-3.5 h-3.5 text-ronchi-500" />
                Google Gemini Engine
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600">Next.js Full-Stack</span>
            </div>

            {/* Copyright */}
            <div className="text-[11px] text-slate-400">
              © {new Date().getFullYear()} Lectura AI. Didesain untuk kesuksesan akademik.
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
}
