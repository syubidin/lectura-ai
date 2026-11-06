'use client';
import React from 'react';
import Image from 'next/image';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Target, 
  Clock, 
  Lightbulb, 
  GraduationCap, 
  Users, 
  ShieldCheck, 
  Cpu, 
  ChevronRight,
  Award
} from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
  onOpenFeature?: (featureId: string) => void;
}

export default function LandingPage({ onEnterApp, onOpenFeature }: LandingPageProps) {
  const teamMembers = [
    {
      nim: '17240703',
      name: 'PERIANDO PASARIBU',
      role: 'Research & System Logic',
      avatarColor: 'bg-indigo-600 text-white'
    },
    {
      nim: '17240710',
      name: 'MAICKEL RESTU ALAKSYAH',
      role: 'Project Lead & AI Prompt Engineering',
      avatarColor: 'bg-blue-600 text-white'
    },
    {
      nim: '17240647',
      name: 'FADIL NUR RAMADHAN',
      role: 'Frontend UI/UX & Quality Assurance',
      avatarColor: 'bg-emerald-600 text-white'
    }
  ];

  const features = [
    {
      id: 'deconstruct',
      icon: BookOpen,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
      title: 'Dekonstruksi Catatan',
      desc: 'Memecah catatan kuliah padat menjadi konsep inti dan modul belajar 15-menit yang mudah dicerna otak (Chunking Theory).'
    },
    {
      id: 'trap',
      icon: Target,
      color: 'text-rose-600 bg-rose-50 border-rose-100',
      title: 'Prediksi Soal Jebakan',
      desc: 'Simulasi pola pikir dosen untuk mengungkap pertanyaan mengecoh (edge cases) dan kesalahan umum mahasiswa.'
    },
    {
      id: 'cram',
      icon: Clock,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
      title: 'Rencana Belajar Darurat',
      desc: 'Alokasi waktu SKS terstruktur berbasis Prinsip Pareto 80/20 dan manajemen energi kognitif sebelum ujian.'
    },
    {
      id: 'feynman',
      icon: Lightbulb,
      color: 'text-violet-600 bg-violet-50 border-violet-100',
      title: 'Metode Richard Feynman',
      desc: 'Menyederhanakan konsep paling rumit menggunakan analogi dunia nyata yang intuitif tanpa jargon berbelit.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-sm shadow-indigo-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-slate-900 flex items-center gap-1.5">
                Lectura AI
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  v1.0
                </span>
              </span>
              <p className="text-[11px] text-slate-500 hidden sm:block">Academic AI Copilot & Cognitive Learning</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1.5 rounded-full">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
              Tugas Mata Kuliah Kecerdasan Buatan (AI)
            </span>
            <button
              onClick={onEnterApp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs sm:text-sm font-semibold shadow-sm shadow-indigo-200 transition"
            >
              <span>Buka Aplikasi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Institutional Badge */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 text-center">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-indigo-300 transition">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-slate-100">
                <Image 
                  src="/logo-ubsi.jpg" 
                  alt="Logo Universitas Bina Sarana Informatika"
                  fill
                  sizes="32px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Karya Proyek Mahasiswa</p>
                <p className="text-xs font-bold text-slate-800">Universitas Bina Sarana Informatika (UBSI)</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              <span>Program Studi Teknik Informatika — 2026</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Asisten Belajar Cerdas & <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700">
                Copilot Akademik Mahasiswa
              </span>
            </h1>
            
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Platform kecerdasan buatan terapan untuk mereduksi beban kognitif mahasiswa. Mentransformasi catatan rumit menjadi modul 15-menit, memprediksi jebakan soal dosen, dan mengatur strategi belajar SKS berbasis sains kognitif.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onEnterApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm shadow-md shadow-indigo-200 hover:shadow-indigo-300 transition"
              >
                <span>Masuk ke Dashboard Aplikasi</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#tim-penyusun"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-sm shadow-sm transition"
              >
                <Users className="w-4 h-4 text-slate-500" />
                <span>Lihat Tim Penyusun</span>
              </a>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-12 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { val: 'Google Gemini', label: 'AI Engine Utama', sub: 'Latensi Cepat ~1-2s' },
              { val: '4 Modul', label: 'Instrumen Akademik', sub: 'Active Learning' },
              { val: 'Graceful Mode', label: 'Dukungan Demo', sub: 'Tahan Gangguan Jaringan' },
              { val: '100% Responsif', label: 'Multi-Device', sub: 'Optimal di HP & Laptop' },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-xl bg-white border border-slate-200/70 shadow-subtle text-center">
                <p className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">{stat.val}</p>
                <p className="text-xs font-semibold text-slate-700 mt-0.5">{stat.label}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-14 sm:py-18 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Instrumen Pembelajaran
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-3">
              4 Pilar Fitur Lectura AI
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Setiap modul dibangun di atas metodologi pendidikan dan psikologi kognitif modern yang telah teruji efektivitasnya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div 
                  key={feat.id}
                  onClick={() => {
                    if (onOpenFeature) {
                      onOpenFeature(feat.id);
                    } else {
                      onEnterApp();
                    }
                  }}
                  className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-indigo-300 hover:shadow-subtle transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${feat.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold text-slate-400 group-hover:text-indigo-600 transition flex items-center gap-1">
                        Coba Modul
                        <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" />
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Active Learning</span>
                    <span className="text-indigo-600 font-medium">Buka di App &rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Academic Project & Team Credits Section */}
      <section id="tim-penyusun" className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-semibold mb-3">
              <Award className="w-3.5 h-3.5 text-indigo-600" />
              <span>Informasi Proyek Akademik</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Tugas Mata Kuliah: Kecerdasan Buatan
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Program Studi Teknik Informatika — Fakultas Teknologi Informasi<br />
              <strong>Universitas Bina Sarana Informatika (UBSI) — 2026</strong>
            </p>
          </div>

          {/* Team Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {teamMembers.map((member, i) => (
              <div 
                key={i}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-subtle hover:border-slate-300 transition flex flex-col items-center text-center"
              >
                <div className={`w-14 h-14 rounded-2xl ${member.avatarColor} flex items-center justify-center font-extrabold text-base mb-4 shadow-sm`}>
                  {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                
                <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 mb-1.5 border border-slate-200/60">
                  NIM: {member.nim}
                </span>

                <h3 className="text-sm font-bold text-slate-900 tracking-tight leading-snug">
                  {member.name}
                </h3>

                <p className="text-xs text-indigo-600 font-medium mt-1">
                  {member.role}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 w-full text-[11px] text-slate-400">
                  Teknik Informatika UBSI
                </div>
              </div>
            ))}
          </div>

          {/* Academic Statement Box */}
          <div className="max-w-2xl mx-auto mt-8 p-4 rounded-2xl bg-white border border-slate-200/80 text-center text-xs text-slate-500 leading-relaxed shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600 inline mr-1 -mt-0.5" />
            Proyek ini dikembangkan sebagai implementasi praktis teknologi <strong>Artificial Intelligence (Large Language Model)</strong> untuk meningkatkan produktivitas serta pemahaman materi perkuliahan secara mandiri dan interaktif.
          </div>

        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white relative overflow-hidden shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="relative z-10 max-w-xl text-center md:text-left space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-700/50 inline-block">
                Siap Belajar Efisien?
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Mulai Uji Coba Lectura AI Sekarang
              </h2>
              <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
                Akses instan ke dashboard interaktif. Dilengkapi contoh materi siap pakai untuk demonstrasi langsung.
              </p>
            </div>

            <button
              onClick={onEnterApp}
              className="relative z-10 inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-indigo-50 active:bg-slate-100 text-indigo-950 font-bold text-sm shadow-md transition shrink-0"
            >
              <span>Buka Aplikasi Sekarang</span>
              <ArrowRight className="w-4 h-4 text-indigo-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="mt-auto py-6 border-t border-slate-200 bg-slate-50 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 Lectura AI — Proyek Tugas Kuliah Kecerdasan Buatan</p>
          <p className="text-[11px] text-slate-400">Universitas Bina Sarana Informatika (UBSI)</p>
        </div>
      </footer>

    </div>
  );
}
