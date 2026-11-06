'use client';
import React from 'react';
import { BookOpen, Target, Clock, Lightbulb, ArrowRight } from 'lucide-react';

interface HeroProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function HeroSection({ activeTab, setActiveTab }: HeroProps) {
  const features = [
    {
      id: 'deconstruct',
      title: 'Dekonstruksi Catatan',
      desc: 'Pecah materi tebal jadi konsep kunci & modul 15-menit',
      icon: BookOpen,
      badge: 'Modul 01',
      color: 'hover:border-indigo-300 hover:bg-indigo-50/20'
    },
    {
      id: 'trap',
      title: 'Prediksi Soal Jebakan',
      desc: 'Bongkar edge-cases & trik pembuat soal ujian',
      icon: Target,
      badge: 'Modul 02',
      color: 'hover:border-rose-300 hover:bg-rose-50/20'
    },
    {
      id: 'cram',
      title: 'Rencana Belajar Darurat',
      desc: 'Matriks waktu taktis Pareto 80/20 anti-burnout',
      icon: Clock,
      badge: 'Modul 03',
      color: 'hover:border-amber-300 hover:bg-amber-50/20'
    },
    {
      id: 'feynman',
      title: 'Metode Richard Feynman',
      desc: 'Pahami teori abstrak lewat analogi dunia nyata',
      icon: Lightbulb,
      badge: 'Modul 04',
      color: 'hover:border-violet-300 hover:bg-violet-50/20'
    },
  ];

  return (
    <div className="mb-6 pt-1">
      {/* Quick Feature Switcher Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 max-w-7xl mx-auto">
        {features.map((f) => {
          const Icon = f.icon;
          const isSelected = activeTab === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setActiveTab(f.id)}
              className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-indigo-500 shadow-md ring-2 ring-indigo-500/10'
                  : `bg-white border-slate-200/80 shadow-subtle ${f.color}`
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-2">
                  {f.desc}
                </p>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium">
                <span className={isSelected ? 'text-indigo-600 font-semibold' : 'text-slate-400'}>
                  {isSelected ? 'Sedang Digunakan' : 'Pilih Modul'}
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

