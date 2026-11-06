'use client';
import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Target, 
  Clock, 
  Lightbulb, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  X
} from 'lucide-react';

interface OnboardingProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFeature?: (featureId: string) => void;
}

export default function OnboardingModal({ isOpen, onClose, onSelectFeature }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const steps = [
    {
      badge: 'Selamat Datang',
      title: 'Selamat Datang di Lectura AI 👋',
      subtitle: 'Platform asisten akademik & copilot persiapan ujian modern berbasis riset sains kognitif.',
      content: (
        <div className="space-y-4 py-2">
          <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-100 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-brand-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                Dirancang Khusus untuk Mahasiswa
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Lectura AI memecahkan 3 masalah utama perkuliahan: catatan tebal yang melelahkan (<em>cognitive overload</em>), ketidaktahuan atas tipe soal jebakan dosen, dan panik belajar di menit-menit akhir (&lt; 24 jam).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 text-left">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-[10px] font-bold text-brand-600 uppercase block mb-1">
                Bertenaga AI Terkini
              </span>
              <p className="text-xs text-slate-700 font-medium">
                Google Gemini 3 Flash REST Engine
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-[10px] font-bold text-emerald-600 uppercase block mb-1">
                Aman & Privat
              </span>
              <p className="text-xs text-slate-700 font-medium">
                Sanitasi Input & Validasi Skema Zod
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      badge: '4 Modul Utama',
      title: 'Empat Modul Belajar Cerdas ⚡',
      subtitle: 'Setiap modul dirancang untuk menyelesaikan tahapan studi perkuliahan Anda secara taktis.',
      content: (
        <div className="space-y-2.5 py-1 text-left">
          {[
            {
              id: 'deconstruct',
              title: '01. Ringkas Catatan',
              desc: 'Pecah materi tebal jadi konsep kunci dan checklist 15-menit.',
              icon: BookOpen,
              color: 'text-brand-600 bg-brand-50 border-brand-100'
            },
            {
              id: 'trap',
              title: '02. Prediksi Soal Jebakan',
              desc: 'Antisipasi trik kata & kondisi batas (edge cases) pembuat soal ujian.',
              icon: Target,
              color: 'text-rose-600 bg-rose-50 border-rose-100'
            },
            {
              id: 'cram',
              title: '03. Jadwal Belajar 24-Jam',
              desc: 'Alokasi jam Pareto 80/20 & manajemen energi kognitif anti-burnout.',
              icon: Clock,
              color: 'text-amber-600 bg-amber-50 border-amber-100'
            },
            {
              id: 'feynman',
              title: '04. Tutor Feynman',
              desc: 'Analogi dunia nyata intuitif untuk memahami teori yang rumit.',
              icon: Lightbulb,
              color: 'text-violet-600 bg-violet-50 border-violet-100'
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => {
                  if (onSelectFeature) onSelectFeature(item.id);
                }}
                className="p-2.5 sm:p-3 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/80 transition flex items-center gap-3 cursor-pointer"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )
    },
    {
      badge: 'Fitur Produktivitas',
      title: 'Tips & Alur Kerja Taktis 💡',
      subtitle: 'Maksimalkan penggunaan Lectura AI untuk efisiensi pengerjaan tugas & revisi materi.',
      content: (
        <div className="space-y-3 py-2 text-left">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
            <span className="w-6 h-6 rounded-md bg-brand-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              1
            </span>
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                Gunakan Tombol &quot;Contoh Catatan&quot;
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                Setiap modul memiliki preset materi kuliah siap pakai. Klik tombol contoh untuk melihat analisis dalam 1 detik tanpa perlu mengetik.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
            <span className="w-6 h-6 rounded-md bg-brand-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              2
            </span>
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                Pintasan Keyboard (Ctrl + Enter)
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                Ketik catatan di textarea dan tekan <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px] font-mono text-slate-800">Ctrl + Enter</kbd> untuk langsung memproses tanpa menggerakkan kursor.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
            <span className="w-6 h-6 rounded-md bg-brand-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              3
            </span>
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                Salin & Ekspor Markdown (.md)
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                Ekspor hasil dekonstruksi langsung ke Notion, Obsidian, atau cetak sebagai lembar persiapan ujian (<em>cheat-sheet</em> ringkas).
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      badge: 'Siap Digunakan',
      title: 'Anda Siap Memulai! 🚀',
      subtitle: 'Semua sistem telah terhubung optimal ke Google Gemini AI Engine.',
      content: (
        <div className="py-4 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 mx-auto flex items-center justify-center">
            <Check className="w-8 h-8 stroke-[2.5]" />
          </div>

          <div className="max-w-sm mx-auto">
            <h4 className="text-sm font-bold text-slate-900 mb-1">
              Lectura AI Siap Menemani Studi Anda
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Mulai dengan modul <strong>Ringkas Catatan</strong> atau pilih modul lain yang sedang Anda butuhkan melalui navigasi tab di atas.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            <span>Status Engine: <strong>Gemini 3 Flash Online</strong></span>
          </div>
        </div>
      )
    }
  ];

  const current = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    try {
      localStorage.setItem('lectura_onboarding_completed', 'true');
    } catch {}
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full shadow-elevated border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-5 sm:px-6 pt-5 pb-3 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-100">
              {current.badge}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Langkah {currentStep + 1} dari {steps.length}
            </span>
          </div>

          <button
            onClick={handleComplete}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
            title="Tutup panduan"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-5 sm:px-6 py-4 overflow-y-auto flex-1">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            {current.title}
          </h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            {current.subtitle}
          </p>

          <div className="mt-3">
            {current.content}
          </div>
        </div>

        {/* Footer Bar */}
        <div className="px-5 sm:px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          {/* Step dots */}
          <div className="flex items-center gap-1.5">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentStep
                    ? 'w-6 bg-brand-600'
                    : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                }`}
                title={`Lompat ke langkah ${i + 1}`}
              />
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                onClick={handlePrev}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 transition flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 transition shadow-sm shadow-brand-200 flex items-center gap-1.5"
            >
              <span>{currentStep === steps.length - 1 ? 'Mulai Sekarang' : 'Lanjut'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
