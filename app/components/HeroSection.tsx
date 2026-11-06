'use client';
import React from 'react';
import { BookOpen, Target, Clock, Lightbulb } from 'lucide-react';

interface HeroProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function HeroSection({ activeTab, setActiveTab }: HeroProps) {
  const modules = [
    {
      id: 'deconstruct',
      title: 'Dekonstruksi Catatan',
      shortTitle: 'Ringkas Catatan',
      icon: BookOpen,
      badge: '01',
      activeColor: 'text-chambray-700 bg-white border-chambray-300 shadow-sm',
    },
    {
      id: 'trap',
      title: 'Prediksi Soal Jebakan',
      shortTitle: 'Soal Jebakan',
      icon: Target,
      badge: '02',
      activeColor: 'text-zest-600 bg-white border-zest-300 shadow-sm',
    },
    {
      id: 'cram',
      title: 'Rencana Belajar Darurat',
      shortTitle: 'Jadwal 24-Jam',
      icon: Clock,
      badge: '03',
      activeColor: 'text-ronchi-700 bg-white border-ronchi-300 shadow-sm',
    },
    {
      id: 'feynman',
      title: 'Metode Richard Feynman',
      shortTitle: 'Metode Feynman',
      icon: Lightbulb,
      badge: '04',
      activeColor: 'text-chambray-800 bg-white border-pigeon-300 shadow-sm',
    },
  ];

  return (
    <div className="mb-5">
      {/* Sleek Segmented Module Switcher */}
      <div className="bg-slate-200/60 p-1.5 rounded-2xl border border-slate-200/90 shadow-subtle">
        {/* Horizontal scroll container on mobile, flex grid on desktop */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar sm:grid sm:grid-cols-4">
          {modules.map((m) => {
            const Icon = m.icon;
            const isSelected = activeTab === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveTab(m.id)}
                className={`flex items-center justify-center sm:justify-start gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 whitespace-nowrap shrink-0 sm:shrink ${
                  isSelected
                    ? `${m.activeColor} ring-1 ring-slate-900/5`
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
                }`}
                title={m.title}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                    isSelected ? 'bg-chambray-600 text-white' : 'bg-slate-200/80 text-slate-500'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="hidden sm:inline font-bold tracking-tight text-xs leading-none">
                    {m.title}
                  </span>
                  <span className="sm:hidden font-bold tracking-tight text-xs leading-none">
                    {m.shortTitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
