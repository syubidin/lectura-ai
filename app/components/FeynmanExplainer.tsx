'use client';
import React, { useState } from 'react';
import { 
  Lightbulb, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  Check,
  Eye,
  EyeOff,
  Quote
} from 'lucide-react';
import { FeynmanResult } from '@/lib/types';

const PRESET_TOPICS = [
  {
    topic: 'Asynchronous JavaScript & Event Loop',
    level: 'Mahasiswa S1'
  },
  {
    topic: 'Teori Relativitas Khusus Einstein (Time Dilation)',
    level: 'Pemula / ELI5'
  },
  {
    topic: 'Enkripsi Kriptografi Public-Key (RSA & Asymmetric)',
    level: 'Mahasiswa S1'
  }
];

export default function FeynmanExplainer() {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('Mahasiswa S1');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FeynmanResult | null>(null);
  const [mode, setMode] = useState<string>('');
  const [showQuizHint, setShowQuizHint] = useState(false);
  const [copied, setCopied] = useState(false);

  const applyPreset = (preset: typeof PRESET_TOPICS[0]) => {
    setTopic(preset.topic);
    setLevel(preset.level);
    setError(null);
  };

  const handleClear = () => {
    setTopic('');
    setError(null);
    setResult(null);
    setShowQuizHint(false);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topic.trim()) {
      setError('Harap masukkan topik atau konsep yang ingin dijelaskan.');
      return;
    }

    setLoading(true);
    setError(null);
    setShowQuizHint(false);

    try {
      const res = await fetch('/api/feynman', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, audienceLevel: level })
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Gagal memproses metode Feynman');

      setResult(json.data);
      setMode(json.mode || '');
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan sistem.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    const text = `# METODE FEYNMAN: ${result.topic}

## ANALOGI UTAMA:
"${result.simpleAnalogy}"

## LANGKAH PEMAHAMAN:
${result.stepByStepExplanation.map((s: string, i: number) => `${i + 1}. ${s}`).join('\n')}

## MISKONSEPSI UMUM:
${result.commonMisconception}

## UJI PEMAHAMAN MANDIRI:
${result.testYourselfQuestion}

Dihasilkan oleh Lectura AI (Gemini AI)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
      
      {/* Left Input Form Panel */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-subtle p-4 sm:p-5 transition-all">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-pigeon-100 text-chambray-800 flex items-center justify-center font-bold text-[11px]">
              04
            </span>
            <span className="font-bold text-xs tracking-wide uppercase text-slate-700">
              Feynman Explainer
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-chambray-700 font-semibold bg-pigeon-50 px-2 py-0.5 rounded-full border border-pigeon-200">
              Analogi Sederhana
            </span>
            {topic && (
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
          Pahami Konsep Rumit ala Feynman
        </h2>
        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
          Ubah rumus abstrak atau teori yang membingungkan menjadi analogi dunia nyata yang intuitif, seolah dijelaskan oleh fisikawan Richard Feynman.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Topik / Konsep yang Membingungkan
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Contoh: Event Loop / Teori Relativitas"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-chambray-500/20 focus:border-chambray-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tingkat Penjelasan (Audiens Target)
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-chambray-500/20 focus:border-chambray-500 transition"
            >
              <option value="Pemula / ELI5">Pemula (ELI5 — Anak 10 Tahun)</option>
              <option value="Mahasiswa S1">Mahasiswa S1 (Standar Kuliah)</option>
              <option value="Teknikal mendalam">Teknikal Mendalam (Studi Kasus Industri)</option>
            </select>
          </div>

          {/* Quick presets */}
          <div>
            <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
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
                  <span className="text-chambray-600 opacity-0 group-hover:opacity-100 text-[10px] font-semibold shrink-0 ml-2">
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
            className="w-full bg-chambray-600 hover:bg-chambray-700 active:bg-chambray-800 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-xl text-xs sm:text-sm shadow-brand flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-ronchi-300" />
                <span>Menciptakan Analogi Intuitif...</span>
              </>
            ) : (
              <>
                <Lightbulb className="w-4 h-4 text-ronchi-300" />
                <span>Sederhanakan ala Feynman</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400">
          <span>Teknik Nobel Richard Feynman</span>
          <span>Zero-Jargon Explanations</span>
        </div>
      </div>

      {/* Right Output Panel */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-subtle p-4 sm:p-5 min-h-[460px] flex flex-col justify-between transition-all">
        {loading ? (
          <div className="py-12 px-4 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-pigeon-50 text-chambray-600 flex items-center justify-center animate-pulse">
              <Lightbulb className="w-6 h-6 animate-spin text-chambray-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Menerjemahkan Teori ke Analogi Nyata...
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                AI membuang jargon rumit dan membangun gambaran mental yang mudah dipahami.
              </p>
            </div>
            <div className="w-full space-y-3 pt-6 max-w-lg">
              <div className="h-20 bg-slate-100 rounded-xl animate-pulse"></div>
              <div className="h-28 bg-slate-100 rounded-xl animate-pulse"></div>
            </div>
          </div>
        ) : result ? (
          <div className="space-y-4">
            {/* Header concept */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-chambray-700 bg-pigeon-50 px-2 py-0.5 rounded border border-pigeon-200">
                  Analogi Sederhana
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                  {result.topic}
                </h3>
              </div>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copied ? 'Tersalin' : 'Salin'}</span>
              </button>
            </div>

            {/* Core Analogy Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-chambray-50/90 via-pigeon-50/50 to-slate-50 border border-chambray-200/80 relative overflow-hidden">
              <Quote className="absolute -top-2 -right-2 w-16 h-16 text-chambray-200/40 -rotate-12 pointer-events-none" />
              <div className="relative">
                <span className="text-[10px] font-bold uppercase tracking-wider text-chambray-800 bg-white/80 px-2 py-0.5 rounded-full border border-chambray-200/60 inline-block mb-1.5">
                  Analogi Dunia Nyata:
                </span>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold italic">
                  &ldquo;{result.simpleAnalogy}&rdquo;
                </p>
              </div>
            </div>

            {/* Step by step breakdown */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wide text-slate-700 block mb-2.5">
                Dekonstruksi Langkah demi Langkah
              </span>
              <div className="space-y-2">
                {result.stepByStepExplanation.map((step: string, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-chambray-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Misconception */}
              <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200/80 space-y-1">
                <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wide flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Miskonsepsi Terbesar:
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {result.commonMisconception}
                </p>
              </div>

              {/* Self Test Quiz */}
              <div className="p-3.5 rounded-xl bg-chambray-50/70 border border-chambray-200/80 space-y-1.5">
                <span className="text-[10px] font-bold text-chambray-700 uppercase tracking-wide flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  Kuis Uji Pemahaman:
                </span>
                <p className="text-xs text-slate-800 font-medium leading-relaxed">
                  {result.testYourselfQuestion}
                </p>
                <div className="pt-0.5">
                  <button
                    type="button"
                    onClick={() => setShowQuizHint(!showQuizHint)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-chambray-700 hover:text-chambray-800"
                  >
                    {showQuizHint ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{showQuizHint ? 'Sembunyikan Kunci' : 'Lihat Kunci Evaluasi'}</span>
                  </button>
                  {showQuizHint && (
                    <div className="mt-1.5 p-2 rounded-lg bg-white border border-chambray-200 text-xs text-slate-600 leading-relaxed animate-in fade-in">
                      Kunci: Jika Anda bisa menjelaskan pertanyaan ini menggunakan analogi di atas tanpa rumus teknis, pemahaman konsep Anda sudah solid!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Ready State */
          <div className="py-14 px-4 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-12 h-12 rounded-2xl bg-pigeon-50 text-chambray-600 flex items-center justify-center mb-3">
              <Lightbulb className="w-6 h-6 text-ronchi-500" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-1">
              Belum Ada Konsep yang Disederhanakan
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mb-4 leading-relaxed">
              Ketikkan konsep yang ingin Anda pahami secara intuitif atau klik tombol contoh materi di sebelah kiri.
            </p>
            <button
              onClick={() => applyPreset(PRESET_TOPICS[0])}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-ronchi-500" />
              <span>Coba Topik: Asynchronous Event Loop</span>
            </button>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Metode Feynman Aktif</span>
          <span className={mode === 'fallback_demo' ? 'text-amber-600 font-medium' : 'text-emerald-600 font-medium'}>
            {mode === 'fallback_demo' ? '⚡ Mode Demo Cerdas' : '🟢 Live Gemini AI'}
          </span>
        </div>
      </div>

    </div>
  );
}
