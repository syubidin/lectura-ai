'use client';
import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Copy, 
  Download, 
  Check, 
  FileText,
  CornerDownLeft,
  RotateCcw
} from 'lucide-react';
import { NoteDeconstructionResult } from '@/lib/types';

const SAMPLE_NOTE = {
  subject: 'Pemrograman Web Lanjut (Next.js & React)',
  content: `Server-Side Rendering (SSR) adalah teknik merender halaman web secara langsung di server sebelum dikirimkan ke browser pengguna sebagai HTML utuh. Keunggulannya adalah First Contentful Paint (FCP) yang sangat cepat dan optimasi SEO yang unggul karena crawler mesin pencari langsung membaca konten lengkap tanpa menunggu eksekusi JavaScript.

Sebaliknya, Client-Side Rendering (CSR) mengirimkan kerangka HTML minimal dengan bundel JavaScript besar yang dieksekusi di browser klien. CSR unggul dalam interaktivitas dinamis setelah halaman termuat, tetapi rentan terhadap initial load latency yang lambat.

Dalam Next.js App Router, komponen secara default adalah React Server Components (RSC) yang berjalan di server tanpa mengirim kode JavaScript komponen tersebut ke browser. Directive 'use client' hanya digunakan ketika komponen membutuhkan interaktivitas browser seperti state (useState), lifecycle hooks (useEffect), atau event listeners (onClick). Perhatikan prinsip immutability pada state React: jangan pernah mengubah state secara langsung karena React mengandalkan perbandingan referensi objek.`
};

export default function NoteDeconstructor() {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<NoteDeconstructionResult | null>(null);
  const [mode, setMode] = useState<string>('');
  const [modelUsed, setModelUsed] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [checkedModules, setCheckedModules] = useState<Record<number, boolean>>({});

  const handleLoadSample = () => {
    setSubject(SAMPLE_NOTE.subject);
    setContent(SAMPLE_NOTE.content);
    setError(null);
  };

  const handleClear = () => {
    setSubject('');
    setContent('');
    setError(null);
    setResult(null);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!subject.trim() || !content.trim()) {
      setError('Harap isi nama mata kuliah dan materi catatan.');
      return;
    }
    if (content.trim().length < 10) {
      setError('Catatan minimal 10 karakter.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/deconstruct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, content })
      });

      const json = await res.json();
      if (!json.success) {
        throw new Error(json.error || 'Terjadi kesalahan sistem');
      }

      setResult(json.data);
      setMode(json.mode);
      setModelUsed(json.modelUsed || 'gemini-3-flash-preview');
      setCheckedModules({});
    } catch (err: any) {
      setError(err.message || 'Gagal mendekonstruksi catatan.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit();
    }
  };

  const toggleModuleCheck = (idx: number) => {
    setCheckedModules(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const copyToClipboard = () => {
    if (!result) return;
    const text = `# ${result.title}

## KONSEP INTI:
${result.coreConcepts.map(c => `- **${c.term}** (${c.importance.toUpperCase()}): ${c.definition}`).join('\n')}

## MODUL BELAJAR 15-MENIT:
${result.biteSizedModules.map((m, i) => `${i + 1}. [${m.timeMinutes} Menit] ${m.title}\n   Tindakan: ${m.action}`).join('\n')}

## KAIDAH & RUMUS UTAMA:
${result.keyFormulaOrRules.map(r => `- ${r}`).join('\n')}

---
Dihasilkan oleh Lectura AI (${modelUsed || 'Gemini AI'})`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMarkdown = () => {
    if (!result) return;
    const text = `# ${result.title}\n\n## Konsep Inti:\n${result.coreConcepts.map(c => `- **${c.term}** (${c.importance}): ${c.definition}`).join('\n')}\n\n## Modul 15-Menit:\n${result.biteSizedModules.map(m => `### ${m.title} (${m.timeMinutes} Menit)\n${m.action}`).join('\n\n')}\n\n## Kaidah & Rumus:\n${result.keyFormulaOrRules.map(r => `- ${r}`).join('\n')}`;
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      {/* Left Input Form Panel */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-subtle p-5 sm:p-6 transition-all">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-xs">
              01
            </span>
            <span className="font-semibold text-xs tracking-wide uppercase text-slate-700">
              Dekonstruksi Catatan
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLoadSample}
              className="text-xs text-brand-600 hover:text-brand-700 font-medium hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              Contoh Catatan
            </button>
            {(subject || content) && (
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

        <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1.5">
          Urai Materi Kuliah Rumit
        </h2>
        <p className="text-xs text-slate-500 mb-5 leading-relaxed">
          Tempelkan materi kuliah atau poin slide. AI akan memecahnya menjadi konsep kunci berbobot dan modul belajar 15-menit yang mudah dicerna otak.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Mata Kuliah / Subjek
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Contoh: Pemrograman Web Lanjut / Kalkulus II"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
              required
            />
            {/* Quick chips */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {['Web Dev', 'Struktur Data', 'Kalkulus', 'Basis Data'].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setSubject(chip)}
                  className="text-[10px] bg-slate-100 hover:bg-slate-200/80 text-slate-600 px-2 py-0.5 rounded-md font-medium transition"
                >
                  +{chip}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Teks Catatan / Rangkuman Slide
              </label>
              <span className="text-[10px] text-slate-400 font-mono">
                {content.length} karakter
              </span>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={9}
              placeholder="Tempelkan teks materi kuliah, rangkuman bab buku, atau slide presentasi di sini... (Ctrl+Enter untuk proses)"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition leading-relaxed resize-y"
              required
            />
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
            className="w-full bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-sm shadow-brand-200 flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Mendekonstruksi Materi...</span>
              </>
            ) : (
              <>
                <BookOpen className="w-4 h-4" />
                <span>Dekonstruksi Sekarang</span>
                <span className="hidden sm:inline-flex items-center text-[10px] font-normal opacity-70 ml-1">
                  (Ctrl+Enter)
                </span>
              </>
            )}
          </button>
        </form>

        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Engine: Google Gemini AI</span>
          <span>Bite-sized Cognitive Load</span>
        </div>
      </div>

      {/* Right Output Panel */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-subtle p-5 sm:p-6 min-h-[500px] flex flex-col justify-between transition-all">
        {loading ? (
          <div className="py-12 px-4 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center animate-pulse">
              <Sparkles className="w-6 h-6 animate-spin text-brand-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Menganalisis & Menyusun Modul...
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Gemini AI sedang memilah konsep inti, merancang modul 15-menit, dan mengekstrak aturan kunci.
              </p>
            </div>
            {/* Shimmer skeleton */}
            <div className="w-full space-y-3 pt-6 max-w-lg">
              <div className="h-4 bg-slate-100 rounded-full animate-pulse w-3/4 mx-auto"></div>
              <div className="h-20 bg-slate-100 rounded-xl animate-pulse"></div>
              <div className="h-20 bg-slate-100 rounded-xl animate-pulse"></div>
            </div>
          </div>
        ) : result ? (
          <div>
            {/* Result Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    mode === 'live_ai' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {mode === 'live_ai' ? `Live AI (${modelUsed || 'Gemini 3 Flash'})` : 'Mode Demo Cerdas'}
                  </span>
                  <span className="text-xs text-slate-400">Hasil Analisis</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {result.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-medium transition"
                  title="Salin hasil sebagai Markdown"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
                <button
                  onClick={downloadMarkdown}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-medium transition"
                  title="Unduh file .md"
                >
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                  <span>Unduh</span>
                </button>
              </div>
            </div>

            {/* Section 1: Core Concepts */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wide text-slate-700">
                  01. Konsep Inti Teridentifikasi
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-medium">
                  {result.coreConcepts.length} Konsep
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.coreConcepts.map((concept, idx) => (
                  <div 
                    key={idx} 
                    className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/70 hover:border-slate-300 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">
                        {concept.term}
                      </span>
                      <span className={`text-[9px] font-semibold uppercase px-2 py-0.5 rounded-full shrink-0 ${
                        concept.importance === 'high'
                          ? 'bg-rose-100 text-rose-700 border border-rose-200/60'
                          : concept.importance === 'medium'
                          ? 'bg-amber-100 text-amber-700 border border-amber-200/60'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {concept.importance === 'high' ? 'Krusial' : concept.importance === 'medium' ? 'Penting' : 'Dasar'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {concept.definition}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Bite-sized 15-min modules */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wide text-slate-700">
                  02. Sesi Belajar Terfokus (15-Menit)
                </span>
                <span className="text-[11px] text-slate-400">
                  Klik centang untuk menandai progres
                </span>
              </div>

              <div className="space-y-2.5">
                {result.biteSizedModules.map((mod, idx) => {
                  const isDone = Boolean(checkedModules[idx]);
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleModuleCheck(idx)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                        isDone
                          ? 'bg-emerald-50/40 border-emerald-200 text-slate-400 line-through opacity-80'
                          : 'bg-white border-slate-200/80 hover:border-brand-300 hover:bg-brand-50/20 shadow-subtle'
                      }`}
                    >
                      <button
                        type="button"
                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition ${
                          isDone
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-slate-300 bg-white hover:border-brand-500'
                        }`}
                      >
                        {isDone && <Check className="w-3.5 h-3.5" />}
                      </button>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-slate-900">
                            {mod.title}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            <Clock className="w-2.5 h-2.5" />
                            {mod.timeMinutes} Menit
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {mod.action}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Key Formulas / Rules */}
            {result.keyFormulaOrRules && result.keyFormulaOrRules.length > 0 && (
              <div>
                <span className="text-xs font-bold uppercase tracking-wide text-slate-700 block mb-2.5">
                  03. Kaidah & Rumus Kunci Ujian
                </span>
                <div className="space-y-2">
                  {result.keyFormulaOrRules.map((rule, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono flex items-center justify-between gap-3 shadow-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-brand-400 font-bold">#</span>
                        <span>{rule}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        ) : (
          /* Empty Ready State */
          <div className="h-full py-16 px-4 flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
              <FileText className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">
              Siap Menganalisis Catatan Anda
            </h3>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed mb-6">
              Ketikkan atau tempel materi catatan di panel sebelah kiri, atau gunakan tombol di bawah untuk melihat contoh nyata seketika.
            </p>
            <button
              onClick={handleLoadSample}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Gunakan Contoh Catatan Siap Pakai</span>
            </button>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Active Learning Framework</span>
          <span>Diverifikasi Keamanan Zod</span>
        </div>
      </div>

    </div>
  );
}
