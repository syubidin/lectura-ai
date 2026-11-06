'use client';
import React, { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  Zap, 
  Sparkles, 
  AlertCircle, 
  Check, 
  Flame,
  CheckCircle2
} from 'lucide-react';
import { CramPlanResult, CramPlanHour } from '@/lib/types';

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

  const handleClear = () => {
    setSubject('');
    setError(null);
    setResult(null);
    setCheckedBlocks({});
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
        color: 'bg-ronchi-50 text-ronchi-800 border-ronchi-200'
      };
    }
    return {
      label: 'Mode Terstruktur Optimal',
      color: 'bg-chambray-50 text-chambray-700 border-chambray-200'
    };
  };

  const urgency = getUrgencyBadge(hours);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
      
      {/* Left Input Form Panel */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-subtle p-4 sm:p-5 transition-all">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-ronchi-50 text-ronchi-700 flex items-center justify-center font-bold text-[11px]">
              03
            </span>
            <span className="font-bold text-xs tracking-wide uppercase text-slate-700">
              Cram-Proof Action Plan
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-ronchi-700 font-semibold bg-ronchi-50 px-2 py-0.5 rounded-full border border-ronchi-100">
              Prinsip Pareto 80/20
            </span>
            {subject && (
              <button
                type="button"
                onClick={handleClear}
                className="text-xs text-slate-400 hover:text-slate-600 font-medium"
                title="Bersihkan formulir"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-1">
          Rencana Belajar Darurat 24-Jam
        </h2>
        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
          Ujian tinggal hitungan jam? Jangan baca ulang dari awal. AI memetakan prioritas materi kunci dan manajemen energi kognitif agar memori tidak terkuras.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Mata Ujian / Subjek
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Contoh: Akuntansi Keuangan / Fisika Kuantum"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-ronchi-500/20 focus:border-ronchi-500 transition"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Sisa Waktu Menuju Ujian:
              </label>
              <span className="text-sm font-bold text-ronchi-600 font-mono">
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
              className="w-full accent-ronchi-500 bg-slate-200 h-2 rounded-lg cursor-pointer"
            />

            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
              <span>2 Jam (Panik)</span>
              <span>12 Jam</span>
              <span>24 Jam</span>
            </div>

            <div className={`mt-2 p-2 rounded-lg text-xs font-semibold border flex items-center gap-2 ${urgency.color}`}>
              <Flame className="w-4 h-4 shrink-0" />
              <span>{urgency.label}</span>
            </div>
          </div>

          {/* Quick hour presets */}
          <div>
            <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
              Pilih Waktu Cepat:
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {[3, 6, 12, 24].map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => handlePresetHours(h)}
                  className={`py-1.5 rounded-lg text-xs font-semibold border transition ${
                    hours === h
                      ? 'bg-chambray-600 text-white border-chambray-600 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {h} Jam
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
            className="w-full bg-chambray-600 hover:bg-chambray-700 active:bg-chambray-800 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-xl text-xs sm:text-sm shadow-brand flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-ronchi-300" />
                <span>Mengkalkulasi Alokasi Jam...</span>
              </>
            ) : (
              <>
                <Calendar className="w-4 h-4 text-ronchi-300" />
                <span>Susun Rencana {hours} Jam</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400">
          <span>Cognitive Energy Allocation</span>
          <span>Sleep Memory Consolidation</span>
        </div>
      </div>

      {/* Right Output Panel */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-subtle p-4 sm:p-5 min-h-[460px] flex flex-col justify-between transition-all">
        {loading ? (
          <div className="py-12 px-4 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-ronchi-50 text-ronchi-600 flex items-center justify-center animate-pulse">
              <Clock className="w-6 h-6 animate-spin text-ronchi-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Menyusun Matriks Waktu Darurat...
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
          <div className="space-y-4">
            {/* Survival Strategy Banner */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-ronchi-50 border border-ronchi-200/90">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-ronchi-700" />
                <span className="text-xs font-bold uppercase tracking-wide text-ronchi-900">
                  Strategi Bertahan ({result.hoursRemaining} Jam Menuju Ujian):
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                {result.survivalStrategy}
              </p>
            </div>

            {/* Hour-by-hour timeline matrix */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wide text-slate-700">
                  Matriks Jadwal Belajar Jam demi Jam
                </span>
                <span className="text-[10px] text-slate-400">
                  Tandai tugas yang sudah selesai
                </span>
              </div>

              <div className="space-y-2">
                {result.schedule.map((item: CramPlanHour, idx: number) => {
                  const isDone = Boolean(checkedBlocks[idx]);
                  const energyColor = 
                    item.cognitiveEnergy === 'HIGH'
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : item.cognitiveEnergy === 'MEDIUM'
                      ? 'bg-ronchi-50 text-ronchi-800 border-ronchi-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200';

                  return (
                    <div
                      key={idx}
                      onClick={() => toggleCheck(idx)}
                      className={`p-3 rounded-xl border transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
                        isDone
                          ? 'bg-slate-100/60 border-slate-200 opacity-60'
                          : 'bg-white border-slate-200/80 hover:border-chambray-300 shadow-subtle'
                      }`}
                    >
                      <div className="flex items-start gap-2.5 flex-1 min-w-0">
                        <button
                          type="button"
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border transition ${
                            isDone
                              ? 'border-emerald-600 bg-emerald-600 text-white'
                              : 'border-slate-300 bg-white hover:border-chambray-500'
                          }`}
                        >
                          {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>

                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-mono text-[11px] font-bold text-ronchi-700 bg-ronchi-50 px-2 py-0.2 rounded border border-ronchi-200 shrink-0">
                              {item.timeBlock}
                            </span>
                            <span className={`text-xs font-bold ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                              {item.phase}
                            </span>
                          </div>
                          <p className={`text-xs leading-relaxed ${isDone ? 'line-through text-slate-400' : 'text-slate-600'}`}>
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
            {result.recommendedBreaks && (
              <div className="p-3.5 rounded-xl bg-slate-900 text-slate-100 flex items-start gap-3 text-xs shadow-sm">
                <span className="text-base leading-none">😴</span>
                <div>
                  <span className="font-bold text-ronchi-300 uppercase text-[10px] tracking-wide block mb-0.5">
                    Protokol Pemulihan & Konsolidasi Memori:
                  </span>
                  <p className="text-slate-300 leading-relaxed text-[11px] sm:text-xs">
                    {result.recommendedBreaks}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Empty Ready State */
          <div className="py-14 px-4 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-12 h-12 rounded-2xl bg-ronchi-50 text-ronchi-600 flex items-center justify-center mb-3">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-1">
              Siap Mengatur Protokol Belajar Darurat
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mb-4 leading-relaxed">
              Tentukan jam tersisa menuju ujian Anda untuk menghitung alokasi waktu dan fase energi belajar paling efisien.
            </p>
            <button
              onClick={() => handlePresetHours(6, 'Kalkulus II & Persamaan Diferensial')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-ronchi-500" />
              <span>Gunakan Contoh: 6 Jam Sisa (Kalkulus II)</span>
            </button>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Anti-Panic Architecture</span>
          <span>Neuroscience-Backed Rest</span>
        </div>
      </div>

    </div>
  );
}
