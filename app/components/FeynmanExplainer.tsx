'use client';
import React, { useState } from 'react';
import { 
  Lightbulb, 
  Sparkles, 
  Brain, 
  ArrowRight, 
  AlertCircle, 
  HelpCircle, 
  Check, 
  Eye, 
  EyeOff,
  Quote
} from 'lucide-react';
import { FeynmanResult } from '@/lib/types';

const PRESET_TOPICS = [
  { topic: 'Asynchronous Event Loop di JavaScript', level: 'Pemula / ELI5' },
  { topic: 'Enkripsi Kunci Publik (RSA & SSL/TLS)', level: 'Mahasiswa S1' },
  { topic: 'Teori Relativitas Khusus Einstein (Time Dilation)', level: 'Pemula / ELI5' },
  { topic: 'Backpropagation pada Deep Neural Networks', level: 'Teknikal mendalam' },
];

export default function FeynmanExplainer() {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('Mahasiswa S1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FeynmanResult | null>(null);
  const [mode, setMode] = useState<string>('');
  const [showQuizHint, setShowQuizHint] = useState(false);

  const applyPreset = (preset: typeof PRESET_TOPICS[0]) => {
    setTopic(preset.topic);
    setLevel(preset.level);
    setError(null);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topic.trim()) {
      setError('Harap masukkan topik atau teori yang ingin dijelaskan.');
      return;
    }

    setLoading(true);
    setError(null);
    setShowQuizHint(false);

    try {
      const res = await fetch('/api/feynman', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, level })
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Gagal menghasilkan penjelasan Feynman');

      setResult(json.data);
      setMode(json.mode || '');
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan sistem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      {/* Left Input Form Panel */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-subtle p-5 sm:p-6 transition-all">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center font-bold text-xs">
              04
            </span>
            <span className="font-semibold text-xs tracking-wide uppercase text-slate-700">
              Feynman Explainer
            </span>
          </div>
          <span className="text-xs text-violet-600 font-semibold bg-violet-50 px-2 py-0.5 rounded-full">
            Analogi Sederhana
          </span>
        </div>

        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1.5">
          Pahami Konsep Rumit ala Feynman
        </h2>
        <p className="text-xs text-slate-500 mb-5 leading-relaxed">
          Ubah rumus abstrak atau teori yang membingungkan menjadi analogi dunia nyata yang intuitif, seolah dijelaskan oleh fisikawan peraih Nobel Richard Feynman.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Topik / Konsep yang Membingungkan
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Contoh: Asynchronous Event Loop / Teori Relativitas"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tingkat Penjelasan (Audiens Target)
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition"
            >
              <option value="Pemula / ELI5">Pemula (ELI5 â€” Anak 10 Tahun)</option>
              <option value="Mahasiswa S1">Mahasiswa S1 (Standar Kuliah)</option>
              <option value="Teknikal mendalam">Teknikal Mendalam (Studi Kasus Industri)</option>
            </select>
          </div>

          {/* Quick presets */}
          <div>
            <span className="text-[11px] font-semibold text-slate-500 block mb-2">
              Pilih Konsep Rumit Populer:
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
                    {p.topic}
                  </span>
                  <span className="text-violet-600 opacity-0 group-hover:opacity-100 text-[10px] font-semibold shrink-0 ml-2">
                    Coba
                  </span>
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
            className="w-full bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-sm shadow-violet-200 flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-white" />
                <span>Menyederhanakan Konsep...</span>
              </>
            ) : (
              <>
                <Lightbulb className="w-4 h-4 text-white" />
                <span>Jelaskan dengan Teknik Feynman</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Metode Nobel Laureate Richard Feynman</span>
          <span>Analogi Bebas Jargon</span>
        </div>
      </div>

      {/* Right Output Panel */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-subtle p-5 sm:p-6 min-h-[500px] flex flex-col justify-between transition-all">
        {loading ? (
          <div className="py-12 px-4 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center animate-pulse">
              <Brain className="w-6 h-6 animate-spin text-violet-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Memformulasikan Analogi Intuitif...
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                AI mencari korelasi dunia nyata yang paling mudah dibayangkan otak untuk mematahkan kebingungan konsep.
              </p>
            </div>
            <div className="w-full space-y-3 pt-6 max-w-lg">
              <div className="h-24 bg-slate-100 rounded-xl animate-pulse"></div>
              <div className="h-20 bg-slate-100 rounded-xl animate-pulse"></div>
            </div>
          </div>
        ) : result ? (
          <div className="space-y-5">
            {/* Demo Mode Banner */}
            {mode === 'fallback_demo' && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-xs text-amber-800">
                <span className="text-amber-500">âš¡</span>
                <span><strong>Mode Demo Cerdas</strong> â€” Ini adalah contoh penjelasan Feynman. Hubungkan API Key untuk penjelasan yang disesuaikan AI.</span>
              </div>
            )}
            {/* Featured Analogy Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-50/90 via-purple-50/50 to-brand-50/80 border border-violet-200/80 relative overflow-hidden">
              <Quote className="absolute -top-2 -right-2 w-16 h-16 text-violet-200/50 -rotate-12 pointer-events-none" />
              <div className="relative">
                <span className="text-[10px] font-bold uppercase tracking-wider text-violet-700 bg-white/80 px-2 py-0.5 rounded-full border border-violet-200/60 inline-block mb-2">
                  Analogi Sederhana:
                </span>
                <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed italic">
                  "{result.simpleAnalogy}"
                </p>
              </div>
            </div>

            {/* Step-by-step breakdown */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-slate-700 block mb-3">
                Dekonstruksi Langkah demi Langkah
              </span>
              <div className="space-y-2.5">
                {result.stepByStepExplanation.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition flex items-start gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Misconception & Self Quiz Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Misconception */}
              <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200/80 space-y-1.5">
                <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wide flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Miskonsepsi Terbesar:
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {result.commonMisconception}
                </p>
              </div>

              {/* Self Test Quiz */}
              <div className="p-4 rounded-xl bg-brand-50/70 border border-brand-200/80 space-y-2">
                <span className="text-[10px] font-bold text-brand-700 uppercase tracking-wide flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  Kuis Uji Pemahaman Mandiri:
                </span>
                <p className="text-xs text-slate-800 font-medium leading-relaxed">
                  {result.testYourselfQuestion}
                </p>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setShowQuizHint(!showQuizHint)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand-700 hover:text-brand-800"
                  >
                    {showQuizHint ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{showQuizHint ? 'Sembunyikan Petunjuk' : 'Lihat Kunci Evaluasi'}</span>
                  </button>
                  {showQuizHint && (
                    <div className="mt-2 p-2.5 rounded-lg bg-white border border-brand-200 text-xs text-slate-600 leading-relaxed animate-in fade-in">
                      Kunci: Jika Anda bisa menjawab pertanyaan ini menggunakan analogi restoran / mesin di atas tanpa rumus teknis, berarti pemahaman konsep Anda sudah kuat!
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* Empty Ready State */
          <div className="h-full py-16 px-4 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center mb-4">
              <Brain className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">
              Siap Menerjemahkan Konsep Abstrak
            </h3>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed mb-6">
              Ketikkan teori atau materi kuliah yang paling membingungkan di panel sebelah kiri untuk mendapatkan analogi intuitif seketika.
            </p>
            <button
              onClick={() => applyPreset(PRESET_TOPICS[0])}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-600" />
              <span>Gunakan Contoh: Asynchronous Event Loop</span>
            </button>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Intuitive Conceptual Learning</span>
          <span>ELI5 Cognitive Simplification</span>
        </div>
      </div>

    </div>
  );
}
