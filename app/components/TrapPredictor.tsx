'use client';
import React, { useState } from 'react';
import { 
  Target, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Lightbulb, 
  Copy,
  Check,
  ShieldAlert
} from 'lucide-react';
import { TrapPredictorResult, TrapQuestion } from '@/lib/types';

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
  const [mode, setMode] = useState('');
  const [modelUsed, setModelUsed] = useState('');
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const applyPreset = (preset: typeof PRESET_TOPICS[0]) => {
    setCourseName(preset.course);
    setTopic(preset.topic);
    setError(null);
  };

  const handleClear = () => {
    setCourseName('');
    setTopic('');
    setError(null);
    setResult(null);
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
      setMode(json.mode || '');
      setModelUsed(json.modelUsed || 'gemini-3-flash-preview');
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan sistem.');
    } finally {
      setLoading(false);
    }
  };

  const copyTrap = (idx: number, trap: TrapQuestion) => {
    const text = `SOAL JEBAKAN: "${trap.question}"\n❌ Kesalahan Umum: ${trap.commonMistake}\n✅ Konsep Benar: ${trap.correctConcept}\n💡 Pro Tip: ${trap.proTip}`;
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
      
      {/* Left Input Form Panel */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-subtle p-4 sm:p-5 transition-all">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-zest-50 text-zest-600 flex items-center justify-center font-bold text-[11px]">
              02
            </span>
            <span className="font-bold text-xs tracking-wide uppercase text-slate-700">
              Exam Trap Predictor
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zest-600 font-semibold bg-zest-50 px-2 py-0.5 rounded-full border border-zest-100">
              Deteksi Trik Dosen
            </span>
            {(courseName || topic) && (
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
          Prediksi Jebakan Soal Ujian
        </h2>
        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
          Bongkar pertanyaan mengecoh, batas kondisi (<em>edge cases</em>), dan kesalahan umum yang sering membuat mahasiswa kehilangan poin di lembar ujian.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Mata Kuliah
            </label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Contoh: Struktur Data & Algoritma"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zest-500/20 focus:border-zest-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Topik Kunci / Bab yang Diujikan
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Contoh: Pointer, Rekursi & Memori Stack/Heap"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zest-500/20 focus:border-zest-500 transition"
              required
            />
          </div>

          {/* Quick presets */}
          <div>
            <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
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
                  <span className="text-zest-600 opacity-0 group-hover:opacity-100 text-[10px] font-semibold shrink-0 ml-2">
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
            className="w-full bg-chambray-600 hover:bg-chambray-700 active:bg-chambray-800 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-xl text-xs sm:text-sm shadow-brand flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-ronchi-300" />
                <span>Menganalisis Trik & Jebakan...</span>
              </>
            ) : (
              <>
                <Target className="w-4 h-4 text-zest-400" />
                <span>Prediksi Soal Jebakan Dosen</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400">
          <span>Perspektif Pembuat Soal</span>
          <span>Analisis Kondisi Batas</span>
        </div>
      </div>

      {/* Right Output Panel */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-subtle p-4 sm:p-5 min-h-[460px] flex flex-col justify-between transition-all">
        {loading ? (
          <div className="py-12 px-4 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-zest-50 text-zest-600 flex items-center justify-center animate-pulse">
              <Target className="w-6 h-6 animate-spin text-zest-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Memetakan Pola Soal Jebakan...
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                AI sedang mensimulasikan pola pikir dosen saat menyusun soal ujian bertrik tinggi.
              </p>
            </div>
            <div className="w-full space-y-3 pt-6 max-w-lg">
              <div className="h-16 bg-slate-100 rounded-xl animate-pulse"></div>
              <div className="h-28 bg-slate-100 rounded-xl animate-pulse"></div>
            </div>
          </div>
        ) : result ? (
          <div className="space-y-4">
            {/* Mindset Warning Banner */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-ronchi-50 border border-ronchi-200/90 flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-ronchi-200 text-ronchi-900 shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wide text-ronchi-900 mb-0.5">
                  Mindset Pembuat Soal (Dosen):
                </h4>
                <p className="text-xs text-ronchi-950 leading-relaxed font-medium">
                  {result.examMindsetWarning}
                </p>
              </div>
            </div>

            {/* Trap Questions List */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wide text-slate-700">
                  Daftar Soal Jebakan ({result.trapQuestions.length})
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {result.courseName}
                </span>
              </div>

              <div className="space-y-3">
                {result.trapQuestions.map((trap: TrapQuestion, idx: number) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-chambray-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-900">
                          Jebakan Tipe #{idx + 1}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          trap.severity === 'TRAP_HIGH'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : trap.severity === 'TRAP_MEDIUM'
                            ? 'bg-zest-50 text-zest-700 border border-zest-200'
                            : 'bg-pigeon-50 text-chambray-800 border border-pigeon-200'
                        }`}>
                          {trap.severity.replace('TRAP_', '')}
                        </span>
                        <button
                          onClick={() => copyTrap(idx, trap)}
                          className="text-[11px] text-slate-400 hover:text-chambray-600 font-medium flex items-center gap-1 transition"
                          title="Salin soal ini"
                        >
                          {copiedIdx === idx ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedIdx === idx ? 'Tersalin' : 'Salin'}</span>
                        </button>
                      </div>
                    </div>

                    <p className="text-xs font-bold text-slate-800 leading-snug">
                      &ldquo;{trap.question}&rdquo;
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-rose-50/70 border border-rose-100 text-rose-900">
                        <span className="font-bold text-[10px] text-rose-700 uppercase flex items-center gap-1 mb-0.5">
                          <ShieldAlert className="w-3 h-3" /> Kesalahan Umum:
                        </span>
                        <p className="leading-relaxed">{trap.commonMistake}</p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-100 text-emerald-900">
                        <span className="font-bold text-[10px] text-emerald-700 uppercase flex items-center gap-1 mb-0.5">
                          <CheckCircle2 className="w-3 h-3" /> Konsep Benar:
                        </span>
                        <p className="leading-relaxed">{trap.correctConcept}</p>
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-chambray-50 border border-chambray-100 text-xs text-chambray-900 flex items-center gap-2">
                      <Lightbulb className="w-3.5 h-3.5 text-chambray-600 shrink-0" />
                      <span className="leading-relaxed"><strong>Pro Tip:</strong> {trap.proTip}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Empty placeholder */
          <div className="py-14 px-4 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-12 h-12 rounded-2xl bg-zest-50 text-zest-600 flex items-center justify-center mb-3">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-1">
              Simulasi Jebakan Ujian Belum Dijalankan
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mb-4 leading-relaxed">
              Masukkan topik ujian yang ingin diuji di sebelah kiri atau pilih salah satu topik ujian populer untuk simulasi instan.
            </p>
            <button
              onClick={() => applyPreset(PRESET_TOPICS[0])}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-ronchi-500" />
              <span>Coba Topik: Pointer & Rekursi</span>
            </button>
          </div>
        )}

        {/* Footer info badge */}
        {result && (
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Model: {modelUsed}</span>
            <span className={mode === 'fallback_demo' ? 'text-amber-600 font-medium' : 'text-emerald-600 font-medium'}>
              {mode === 'fallback_demo' ? '⚡ Mode Demo Cerdas' : '🟢 Live Gemini AI'}
            </span>
          </div>
        )}
      </div>

    </div>
  );
}
