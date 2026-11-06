'use client';
import React, { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  Zap, 
  Sparkles, 
  AlertCircle, 
  Check, 
  Moon, 
  BatteryMedium, 
  Flame,
  CheckCircle2
} from 'lucide-react';
import { CramPlanResult } from '@/lib/types';

export default function CramPlan() {
  const [subject, setSubject] = useState('');
  const [hours, setHours] = useState(6);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CramPlanResult | null>(null);
  const [mode, setMode] = useState<string>('');
  const [checkedBlocks, setCheckedBlocks] = useState<Record<number, boolean>>({});

  const handlePresetHours = (h: number, defaultSubject = 'Kalkulus II & Persamaan Diferensial') => {
    setHours(h);
    if (!subject) setSubject(defaultSubject);
    setError(null);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!subject.trim()) {
      setError('Harap masukkan nama mata kuliah / ujian.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/cram-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, hoursRemaining: Number(hours) })
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Gagal menyusun rencana belajar darurat');

      setResult(json.data);
      setMode(json.mode || '');
      setCheckedBlocks({});
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan sistem.');
    } finally {
      setLoading(false);
    }
  };

  const toggleCheck = (idx: number) => {
    setCheckedBlocks(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const getUrgencyBadge = (h: number) => {
    if (h <= 4) {
      return {
        label: 'Mode Panik / Survival Ekstrem',
        color: 'bg-rose-50 text-rose-700 border-rose-200'
      };
    }
    if (h <= 10) {
      return {
        label: 'Mode Akselerasi Pareto 80/20',
        color: 'bg-amber-50 text-amber-700 border-amber-200'
      };
    }
    return {
      label: 'Mode Terstruktur Optimal',
      color: 'bg-brand-50 text-brand-700 border-brand-200'
    };
  };

  const urgency = getUrgencyBadge(hours);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      {/* Left Input Form Panel */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-subtle p-5 sm:p-6 transition-all">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
              03
            </span>
            <span className="font-semibold text-xs tracking-wide uppercase text-slate-700">
              Cram-Proof Action Plan
            </span>
          </div>
          <span className="text-xs text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded-full">
            Prinsip Pareto 80/20
          </span>
        </div>

        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1.5">
          Rencana Belajar Darurat 24-Jam
        </h2>
        <p className="text-xs text-slate-500 mb-5 leading-relaxed">
          Ujian tinggal hitungan jam? Jangan membaca ulang dari halaman satu. AI memetakan prioritas topik kunci dan manajemen energi kognitif agar memori tidak terkuras.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Mata Ujian / Subjek
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Contoh: Akuntansi Keuangan / Fisika Kuantum"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Sisa Waktu Menuju Ujian:
              </label>
              <span className="text-sm font-bold text-amber-600 font-mono">
                {hours} Jam Tersisa
              </span>
            </div>

            <input
              type="range"
              min={2}
              max={24}
              step={1}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full accent-amber-500 bg-slate-200 h-2 rounded-lg cursor-pointer"
            />

            <div className="flex justify-between text-[10px] text-slate-400 mt-1.5 font-medium">
              <span>2 Jam (Panik)</span>
              <span>12 Jam</span>
              <span>24 Jam (Maksimal)</span>
            </div>

            <div className={`mt-2.5 p-2 rounded-lg text-xs font-semibold border flex items-center gap-2 ${urgency.color}`}>
              <Flame className="w-4 h-4 shrink-0" />
              <span>{urgency.label}</span>
            </div>
          </div>

          {/* Quick hour presets */}
          <div>
            <span className="text-[11px] font-semibold text-slate-500 block mb-2">
              Pilihan Cepat Waktu:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { h: 3, label: '3 Jam (Kritis)' },
                { h: 6, label: '6 Jam (Malam Ini)' },
                { h: 12, label: '12 Jam (H-1)' },
              ].map((p) => (
                <button
                  key={p.h}
                  type="button"
                  onClick={() => handlePresetHours(p.h)}
                  className={`p-2 rounded-xl text-xs font-medium border text-center transition ${
                    hours === p.h
                      ? 'bg-amber-50 border-amber-300 text-amber-800 font-bold'
                      : 'bg-slate-50 border-slate-200/70 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-white" />
                <span>Mengkalkulasi Alokasi Jam...</span>
              </>
            ) : (
              <>
                <Calendar className="w-4 h-4 text-white" />
                <span>Buat Jadwal Darurat</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Cognitive Energy Allocation</span>
          <span>Sleep Memory Consolidation</span>
        </div>
      </div>

      {/* Right Output Panel */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-subtle p-5 sm:p-6 min-h-[500px] flex flex-col justify-between transition-all">
        {loading ? (
          <div className="py-12 px-4 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center animate-pulse">
              <Clock className="w-6 h-6 animate-spin text-amber-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Merancang Matriks Waktu Darurat...
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                AI mengoptimalkan pembagian jam antara penguasaan konsep 80/20, latihan soal, dan jendela tidur konsolidasi.
              </p>
            </div>
            <div className="w-full space-y-3 pt-6 max-w-lg">
              <div className="h-20 bg-slate-100 rounded-xl animate-pulse"></div>
              <div className="h-16 bg-slate-100 rounded-xl animate-pulse"></div>
            </div>
          </div>
        ) : result ? (
          <div className="space-y-5">
            {/* Demo Mode Banner */}
            {mode === 'fallback_demo' && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-xs text-amber-800">
                <span className="text-amber-500">âš¡</span>
                <span><strong>Mode Demo Cerdas</strong> â€” Ini adalah contoh rencana belajar. Hubungkan API Key untuk jadwal yang dipersonalisasi AI.</span>
              </div>
            )}
            {/* Survival Strategy Banner */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
              <div className="flex items-center gap-2 mb-1.5">
                <Zap className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold uppercase tracking-wide text-amber-900">
                  Strategi Bertahan ({result.hoursRemaining} Jam Menuju Ujian):
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                {result.survivalStrategy}
              </p>
            </div>

            {/* Hour-by-hour timeline matrix */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wide text-slate-700">
                  Matriks Jadwal Belajar Jam demi Jam
                </span>
                <span className="text-[11px] text-slate-400">
                  Tandai tugas yang sudah selesai
                </span>
              </div>

              <div className="space-y-2.5">
                {result.schedule.map((item, idx) => {
                  const isDone = Boolean(checkedBlocks[idx]);
                  const energyColor = 
                    item.cognitiveEnergy === 'HIGH'
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : item.cognitiveEnergy === 'MEDIUM'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200';

                  return (
                    <div
                      key={idx}
                      onClick={() => toggleCheck(idx)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isDone
                          ? 'bg-slate-50 border-slate-200 opacity-60 line-through'
                          : 'bg-white border-slate-200/80 hover:border-amber-300 hover:bg-amber-50/20 shadow-subtle'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition ${
                            isDone
                              ? 'bg-amber-600 border-amber-600 text-white'
                              : 'border-slate-300 bg-white hover:border-amber-500'
                          }`}
                        >
                          {isDone && <Check className="w-3.5 h-3.5" />}
                        </button>

                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 shrink-0">
                              {item.timeBlock}
                            </span>
                            <span className="text-xs font-bold text-slate-900">
                              {item.phase}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {item.task}
                          </p>
                        </div>
                      </div>

                      <div className="self-end sm:self-center shrink-0">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${energyColor}`}>
                          Energi: {item.cognitiveEnergy}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommended Recovery note */}
            <div className="p-3.5 rounded-xl bg-slate-900 text-slate-100 flex items-start gap-3 text-xs shadow-sm">
              <Moon className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-brand-300 uppercase text-[10px] tracking-wide block mb-0.5">
                  Catatan Konsolidasi Memori (Wajib Tidur):
                </span>
                <p className="text-slate-300 leading-relaxed text-[11px] sm:text-xs">
                  {result.recommendedBreaks}
                </p>
              </div>
            </div>

          </div>
        ) : (
          /* Empty Ready State */
          <div className="h-full py-16 px-4 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Clock className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">
              Siap Mengatur Protokol Darurat
            </h3>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed mb-6">
              Pilih jumlah jam yang tersisa menuju ujian Anda untuk menghitung jadwal prioritas belajar paling efisien.
            </p>
            <button
              onClick={() => handlePresetHours(6, 'Kalkulus II & Persamaan Diferensial')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Gunakan Contoh: 6 Jam Sisa (Kalkulus II)</span>
            </button>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Anti-Panic Architecture</span>
          <span>Neuroscience-Backed Rest</span>
        </div>
      </div>

    </div>
  );
}
