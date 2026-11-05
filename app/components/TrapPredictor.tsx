'use client';
import React, { useState } from 'react';
import { 
  Target, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Check, 
  Lightbulb, 
  Copy,
  Info
} from 'lucide-react';
import { TrapPredictorResult } from '@/lib/types';

const PRESET_TOPICS = [
  { course: 'Struktur Data & Algoritma', topic: 'Pointer, Rekursi & Dynamic Programming' },
  { course: 'Basis Data Relasional', topic: 'Normalisasi 3NF vs BCNF & Dirty Read Transaction' },
  { course: 'Sistem Operasi', topic: 'Deadlock, Race Condition & Mutex vs Semaphore' },
  { course: 'Kalkulus Lanjut', topic: 'Limit Tak Wajar & Uji Konvergensi Deret Tak Hingga' },
];

export default function TrapPredictor() {
  const [courseName, setCourseName] = useState('');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TrapPredictorResult | null>(null);
  const [modelUsed, setModelUsed] = useState('');
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const applyPreset = (preset: typeof PRESET_TOPICS[0]) => {
    setCourseName(preset.course);
    setTopic(preset.topic);
    setError(null);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!courseName.trim() || !topic.trim()) {
      setError('Harap isi nama mata kuliah dan topik ujian.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/trap-predictor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseName, topic })
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Gagal memprediksi soal jebakan');

      setResult(json.data);
      setModelUsed(json.modelUsed || 'gemini-3-flash-preview');
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan sistem.');
    } finally {
      setLoading(false);
    }
  };

  const copyTrap = (idx: number, trap: any) => {
    const text = `SOAL JEBAKAN: "${trap.question}"\n❌ Kesalahan Umum: ${trap.commonMistake}\n✅ Konsep Benar: ${trap.correctConcept}\n💡 Pro Tip: ${trap.proTip}`;
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      {/* Left Input Form Panel */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-subtle p-5 sm:p-6 transition-all">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs">
              02
            </span>
            <span className="font-semibold text-xs tracking-wide uppercase text-slate-700">
              Exam Trap Predictor
            </span>
          </div>
          <span className="text-xs text-rose-600 font-semibold bg-rose-50 px-2 py-0.5 rounded-full">
            Deteksi Trik Dosen
          </span>
        </div>

        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1.5">
          Prediksi Jebakan Soal Ujian
        </h2>
        <p className="text-xs text-slate-500 mb-5 leading-relaxed">
          Bongkar pertanyaan mengecoh, batas kondisi (*edge cases*), dan kesalahan umum yang sering membuat mahasiswa kehilangan poin berharga di lembar ujian.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Nama Mata Kuliah
            </label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Contoh: Struktur Data & Algoritma"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Topik Kunci / Bab yang Diujikan
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Contoh: Pointer, Rekursi & Memori Stack/Heap"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition"
              required
            />
          </div>

          {/* Quick presets */}
          <div>
            <span className="text-[11px] font-semibold text-slate-500 block mb-2">
              Pilih Topik Ujian Populer:
            </span>
            <div className="space-y-1.5">
              {PRESET_TOPICS.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => applyPreset(p)}
                  className="w-full text-left p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200/60 text-xs transition flex items-center justify-between group"
                >
                  <span className="text-slate-700 font-medium truncate">
                    {p.course} — <span className="text-slate-500">{p.topic}</span>
                  </span>
                  <span className="text-indigo-600 opacity-0 group-hover:opacity-100 text-[10px] font-semibold shrink-0 ml-2">
                    Pilih
                  </span>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 active:bg-black text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-rose-400" />
                <span>Menganalisis Trik & Jebakan...</span>
              </>
            ) : (
              <>
                <Target className="w-4 h-4 text-rose-400" />
                <span>Prediksi Soal Jebakan Dosen</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Perspektif Pembuat Soal</span>
          <span>Analisis Kondisi Batas</span>
        </div>
      </div>

      {/* Right Output Panel */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-subtle p-5 sm:p-6 min-h-[500px] flex flex-col justify-between transition-all">
        {loading ? (
          <div className="py-12 px-4 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center animate-pulse">
              <Target className="w-6 h-6 animate-spin text-rose-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Memetakan Pola Soal Jebakan...
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                AI sedang mensimulasikan mindset dosen saat menyusun soal ujian bertrik tinggi.
              </p>
            </div>
            <div className="w-full space-y-3 pt-6 max-w-lg">
              <div className="h-16 bg-slate-100 rounded-xl animate-pulse"></div>
              <div className="h-28 bg-slate-100 rounded-xl animate-pulse"></div>
            </div>
          </div>
        ) : result ? (
          <div className="space-y-5">
            {/* Mindset Warning Banner */}
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wide text-amber-900 mb-1">
                  Mindset Pembuat Soal (Dosen):
                </h4>
                <p className="text-xs text-amber-800 leading-relaxed font-medium">
                  {result.examMindsetWarning}
                </p>
              </div>
            </div>

            {/* Trap Questions List */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wide text-slate-700">
                  Daftar Soal Jebakan ({result.trapQuestions.length})
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {result.courseName}
                </span>
              </div>

              <div className="space-y-4">
                {result.trapQuestions.map((trap, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200/80 bg-white shadow-subtle hover:border-slate-300 transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-900">
                          Jebakan Tipe #{idx + 1}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          trap.severity === 'TRAP_HIGH'
                            ? 'bg-rose-100 text-rose-700 border border-rose-200'
                            : 'bg-amber-100 text-amber-700 border border-amber-200'
                        }`}>
                          {trap.severity === 'TRAP_HIGH' ? 'Bahaya Tinggi' : 'Bahaya Sedang'}
                        </span>
                        <button
                          onClick={() => copyTrap(idx, trap)}
                          className="p-1 text-slate-400 hover:text-slate-600 rounded"
                          title="Salin soal ini"
                        >
                          {copiedIdx === idx ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-slate-800 italic bg-slate-50 p-3 rounded-lg border border-slate-100">
                      "{trap.question}"
                    </p>

                    {/* Side-by-side comparison */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                      <div className="p-3 rounded-lg bg-rose-50/60 border border-rose-100 space-y-1">
                        <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wide block">
                          ✕ Kesalahan Umum Mahasiswa
                        </span>
                        <p className="text-slate-700 leading-relaxed text-[11px] sm:text-xs">
                          {trap.commonMistake}
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-100 space-y-1">
                        <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide block">
                          ✓ Konsep & Jawaban Benar
                        </span>
                        <p className="text-slate-700 leading-relaxed text-[11px] sm:text-xs">
                          {trap.correctConcept}
                        </p>
                      </div>
                    </div>

                    {/* Pro Tip */}
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-900 font-medium">
                      <Lightbulb className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span><strong>Tips Taktis:</strong> {trap.proTip}</span>
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          /* Empty Ready State */
          <div className="h-full py-16 px-4 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">
              Siap Menyingkap Soal Jebakan
            </h3>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed mb-6">
              Masukkan mata kuliah dan topik di panel kiri untuk membuka analisis soal mengecoh dan antisipasi jawaban tepatnya.
            </p>
            <button
              onClick={() => applyPreset(PRESET_TOPICS[0])}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>Gunakan Contoh: Struktur Data & Pointer</span>
            </button>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Edge-Case Detection Engine</span>
          <span>Strategi Ujian Objektif & Esai</span>
        </div>
      </div>

    </div>
  );
}
