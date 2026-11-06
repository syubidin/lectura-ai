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
  TrendingUp,
  Users,
} from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
  onOpenFeature?: (featureId: string) => void;
}

export default function LandingPage({ onEnterApp, onOpenFeature }: LandingPageProps) {
  const heroRef      = useRef<HTMLDivElement>(null);
  const badgeRef     = useRef<HTMLDivElement>(null);
  const h1Ref        = useRef<HTMLHeadingElement>(null);
  const subtitleRef  = useRef<HTMLParagraphElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const metricsRef   = useRef<HTMLDivElement>(null);
  const featuresRef  = useRef<HTMLDivElement>(null);
  const howRef       = useRef<HTMLDivElement>(null);
  const ctaBannerRef = useRef<HTMLDivElement>(null);

  /* ─── GSAP entrance animations ───────────────────────────── */
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // Respect reduced-motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      ctx = gsap.context(() => {
        // Hero entrance — staggered from bottom
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from(badgeRef.current,    { opacity: 0, y: 24, duration: 0.6 })
          .from(h1Ref.current,       { opacity: 0, y: 32, duration: 0.75 }, '-=0.3')
          .from(subtitleRef.current, { opacity: 0, y: 24, duration: 0.6  }, '-=0.4')
          .from(ctaRef.current,      { opacity: 0, y: 20, duration: 0.5  }, '-=0.35')
          .from(metricsRef.current ? metricsRef.current.children : [], {
            opacity: 0, y: 20, duration: 0.5, stagger: 0.08
          }, '-=0.3');

        // Features grid — scroll-triggered stagger
        if (featuresRef.current) {
          gsap.from(featuresRef.current.children, {
            opacity: 0, y: 36, duration: 0.6, stagger: 0.1,
            scrollTrigger: {
              trigger: featuresRef.current,
              start: 'top 82%',
            },
          });
        }

        // "How it works" steps
        if (howRef.current) {
          gsap.from(howRef.current.children, {
            opacity: 0, x: -24, duration: 0.55, stagger: 0.1,
            scrollTrigger: {
              trigger: howRef.current,
              start: 'top 80%',
            },
          });
        }

        // CTA banner
        if (ctaBannerRef.current) {
          gsap.from(ctaBannerRef.current, {
            opacity: 0, scale: 0.97, duration: 0.65,
            scrollTrigger: {
              trigger: ctaBannerRef.current,
              start: 'top 85%',
            },
          });
        }
      });
    };

    run();
    return () => { ctx?.revert(); };
  }, []);

  /* ─── Data ────────────────────────────────────────────────── */
  const features = [
    {
      id: 'deconstruct',
      icon: BookOpen,
      accent: 'text-brand-600 bg-brand-50 border-brand-100',
      hoverBorder: 'hover:border-brand-300',
      title: 'Dekonstruksi Catatan',
      desc: 'Memecah catatan kuliah padat menjadi konsep inti dan modul belajar 15-menit yang mudah dicerna otak (Chunking Theory).',
      tag: 'Cognitive Load',
    },
    {
      id: 'trap',
      icon: Target,
      accent: 'text-rose-600 bg-rose-50 border-rose-100',
      hoverBorder: 'hover:border-rose-300',
      title: 'Prediksi Soal Jebakan',
      desc: 'Simulasi pola pikir dosen untuk mengungkap pertanyaan mengecoh (edge cases) dan kesalahan umum mahasiswa.',
      tag: 'Exam Strategy',
    },
    {
      id: 'cram',
      icon: Clock,
      accent: 'text-amber-600 bg-amber-50 border-amber-100',
      hoverBorder: 'hover:border-amber-300',
      title: 'Rencana Belajar Darurat',
      desc: 'Alokasi waktu terstruktur berbasis Prinsip Pareto 80/20 dan manajemen energi kognitif sebelum ujian.',
      tag: 'Pareto 80/20',
    },
    {
      id: 'feynman',
      icon: Lightbulb,
      accent: 'text-violet-600 bg-violet-50 border-violet-100',
      hoverBorder: 'hover:border-violet-300',
      title: 'Metode Richard Feynman',
      desc: 'Menyederhanakan konsep paling rumit menggunakan analogi dunia nyata yang intuitif tanpa jargon berbelit.',
      tag: 'Deep Learning',
    },
  ];

  const metrics = [
    { val: 'Google Gemini', label: 'AI Engine Utama',      sub: 'Latensi ~1–2 detik' },
    { val: '4 Modul',       label: 'Instrumen Akademik',   sub: 'Active Learning' },
    { val: 'Offline Mode',  label: 'Demo Tahan Gangguan',  sub: 'Tanpa Internet Pun Oke' },
    { val: 'Responsif',     label: 'Multi-Device',         sub: 'HP, Tablet & Laptop' },
  ];

  const howItWorks = [
    { step: '01', icon: BookOpen,    title: 'Tempel Catatan Kuliah',   desc: 'Paste ringkasan, PPT, atau catatan tangan yang sudah di-ketik ke kolom input.' },
    { step: '02', icon: Brain,       title: 'Pilih Modul yang Sesuai', desc: 'Pilih salah satu dari 4 modul AI berdasarkan kebutuhan studimu saat ini.' },
    { step: '03', icon: Sparkles,    title: 'Gemini Memproses',        desc: 'Model AI menganalisis materi dan menghasilkan output terstruktur dalam hitungan detik.' },
    { step: '04', icon: TrendingUp,  title: 'Pelajari & Ekspor',       desc: 'Salin hasilnya, ekspor ke Markdown, atau langsung pelajari di layar.' },
  ];

  /* ─── JSX ─────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-brand-600 selection:text-white">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-violet-500 flex items-center justify-center text-white shadow-sm shadow-brand-200">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900">
              Lectura<span className="text-brand-600 font-extrabold">AI</span>
            </span>
          </div>

          {/* Nav Right */}
          <div className="flex items-center gap-3">
            <a
              href="#fitur"
              className="hidden md:inline text-sm text-slate-600 hover:text-brand-600 font-medium transition"
            >
              Fitur
            </a>
            <a
              href="#cara-kerja"
              className="hidden md:inline text-sm text-slate-600 hover:text-brand-600 font-medium transition"
            >
              Cara Kerja
            </a>
            <button
              onClick={onEnterApp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-sm font-semibold shadow-sm shadow-brand-200 transition"
            >
              <span>Buka Aplikasi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-slate-100">
        {/* Subtle background grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(to right, #7c3aed 1px, transparent 1px), linear-gradient(to bottom, #7c3aed 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Purple glow blob */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full blur-3xl opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Badge */}
          <div ref={badgeRef} className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-200/70 text-brand-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Didukung Google Gemini AI
            </span>
          </div>

          {/* Headline */}
          <div className="max-w-3xl mx-auto text-center">
            <h1
              ref={h1Ref}
              className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.12]"
            >
              Belajar Lebih Cerdas,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-violet-500 to-brand-700">
                Bukan Lebih Keras
              </span>
            </h1>

            <p
              ref={subtitleRef}
              className="mt-5 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed"
            >
              Lectura AI adalah copilot akademik bertenaga kecerdasan buatan yang membantu mahasiswa memahami materi lebih cepat, mengantisipasi soal ujian, dan merancang strategi belajar yang efisien — semua dalam satu platform.
            </p>

            <div ref={ctaRef} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onEnterApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-semibold text-sm shadow-brand transition"
              >
                <Zap className="w-4 h-4" />
                <span>Mulai Gratis Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#fitur"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-sm shadow-subtle transition"
              >
                Lihat Semua Fitur
              </a>
            </div>
          </div>

          {/* Metrics strip */}
          <div ref={metricsRef} className="mt-14 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {metrics.map((m, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-subtle text-center">
                <p className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">{m.val}</p>
                <p className="text-xs font-semibold text-slate-700 mt-0.5">{m.label}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{m.sub}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Features ── */}
      <section id="fitur" className="py-16 sm:py-20 bg-slate-50/60 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
              Instrumen Pembelajaran
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-3">
              4 Pilar Fitur Lectura AI
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              Setiap modul dibangun di atas metodologi pendidikan dan psikologi kognitif modern yang telah teruji efektivitasnya.
            </p>
          </div>

          <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.id}
                  onClick={() => {
                    if (onOpenFeature) onOpenFeature(feat.id);
                    else onEnterApp();
                  }}
                  className={`p-6 rounded-2xl border border-slate-200/80 bg-white hover:shadow-elevated ${feat.hoverBorder} transition-all duration-200 cursor-pointer group flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${feat.accent}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold text-slate-400 group-hover:text-brand-600 transition flex items-center gap-1">
                        Coba Modul
                        <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-1.5">{feat.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">{feat.tag}</span>
                    <span className="text-brand-600 font-medium">Buka di App →</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="cara-kerja" className="py-16 sm:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
              Alur Penggunaan
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-3">
              Cara Kerja Lectura AI
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Dari catatan mentah ke insight yang siap digunakan — hanya dalam 4 langkah.
            </p>
          </div>

          <div ref={howRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {howItWorks.map((h) => {
              const Icon = h.icon;
              return (
                <div key={h.step} className="relative p-5 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:shadow-subtle transition-all">
                  <span className="text-[11px] font-bold text-brand-400 font-mono tracking-widest">{h.step}</span>
                  <div className="mt-3 w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-brand">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="mt-3 text-sm font-bold text-slate-900">{h.title}</h4>
                  <p className="mt-1 text-[12px] text-slate-500 leading-relaxed">{h.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-14 bg-slate-50/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={ctaBannerRef}
            className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-brand-900 via-brand-800 to-violet-900 text-white relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
          >
            {/* Decorative glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-20"
              style={{ background: '#a78bfa' }}
            />

            <div className="relative z-10 max-w-xl text-center md:text-left space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-300 bg-brand-950/50 px-3 py-1 rounded-full border border-brand-700/50 inline-block">
                Siap Belajar Lebih Efisien?
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Mulai Gunakan Lectura AI Sekarang
              </h2>
              <p className="text-xs sm:text-sm text-brand-200 leading-relaxed">
                Akses instan ke dashboard interaktif. Dilengkapi contoh materi siap pakai untuk demonstrasi langsung tanpa perlu mendaftar.
              </p>
            </div>

            <button
              onClick={onEnterApp}
              className="relative z-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white hover:bg-brand-50 active:bg-slate-100 text-brand-900 font-bold text-sm shadow-lg transition shrink-0"
            >
              <Zap className="w-4 h-4 text-brand-600" />
              <span>Buka Aplikasi</span>
              <ArrowRight className="w-4 h-4 text-brand-600" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white/70 backdrop-blur-sm py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-700 via-brand-600 to-violet-500 flex items-center justify-center text-white shadow-sm shadow-brand-200">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm">
                  Lectura<span className="text-brand-600 font-extrabold">AI</span>
                </span>
                <p className="text-[11px] text-slate-500">Asisten Akademik & Akselerator Pemahaman Mahasiswa</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
              <span className="flex items-center gap-1.5 text-slate-600">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Validasi Aman Zod & Sanitasi Input
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                Google Gemini 3 Flash REST Engine
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600">Next.js Full-Stack App Router</span>
            </div>

            <div className="text-[11px] text-slate-400">
              © {new Date().getFullYear()} Lectura AI. Didesain untuk kesuksesan akademik.
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
}
