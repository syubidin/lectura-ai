'use client';
import React from 'react';
import { BookOpen, Target, Clock, Lightbulb, ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function HeroSection({ activeTab, setActiveTab }: HeroProps) {
  const features = [
    {
      id: 'deconstruct',
      title: 'Ringkas Catatan',
      desc: 'Pecah materi tebal jadi modul 15-menit',
      icon: BookOpen,
      badge: 'Bite-sized',
      color: 'hover:border-indigo-300 hover:bg-indigo-50/30'
    },
    {
      id: 'trap',
      title: 'Prediksi Jebakan Dosen',
      desc: 'Bongkar edge-cases & trik pembuat soal',
      icon: Target,
      badge: 'Exam Traps',
      color: 'hover:border-rose-300 hover:bg-rose-50/30'
    },
    {
      id: 'cram',
      title: 'Jadwal 24-Jam',
      desc: 'Protokol darurat Pareto 80/20 anti-burnout',
      icon: Clock,
      badge: 'Cram-Proof',
      color: 'hover:border-amber-300 hover:bg-amber-50/30'
    },
    {
      id: 'feynman',
      title: 'Tutor Feynman',
      desc: 'Pahami teori abstrak dengan analogi nyata',
      icon: Lightbulb,
      badge: 'Simple Analogy',
      color: 'hover:border-violet-300 hover:bg-violet-50/30'
    },
  ];

  return (
    <div className="mb-8 pt-4">
      {/* Top Value Headline */}
      <div className="text-center max-w-3xl mx-auto mb-8 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Copilot Akademik Berbasis Google Gemini AI</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Belajar Lebih Cerdas, <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600">
            Tuntaskan Ujian Tanpa Rasa Cemas
          </span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Platform produktivitas akademik berbasis riset kognitif. Dirancang khusus untuk mahasiswa yang menghadapi materi padat, waktu terbatas, dan standar ujian yang menantang.
        </p>
      </div>

      {/* Quick Feature Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
        {features.map((f) => {
          const Icon = f.icon;
          const isSelected = activeTab === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setActiveTab(f.id)}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-indigo-500 shadow-md ring-2 ring-indigo-500/10'
                  : `bg-white/80 border-slate-200/80 shadow-subtle ${f.color}`
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {f.badge}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                  {f.title}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug line-clamp-2">
                  {f.desc}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium">
                <span className={isSelected ? 'text-indigo-600 font-semibold' : 'text-slate-400'}>
                  {isSelected ? 'Sedang Aktif' : 'Buka Modul'}
                </span>
                <ArrowRight className={`w-3 h-3 ${isSelected ? 'text-indigo-600' : 'text-slate-300'}`} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

