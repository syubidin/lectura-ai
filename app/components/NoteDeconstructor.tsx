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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
      
      {/* Left Input Form Panel */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-subtle p-4 sm:p-5 transition-all">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-chambray-50 text-chambray-700 flex items-center justify-center font-bold text-[11px]">
              01
            </span>
            <span className="font-bold text-xs tracking-wide uppercase text-slate-700">
              Dekonstruksi Catatan
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLoadSample}
              className="text-xs text-chambray-600 hover:text-chambray-700 font-semibold hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-ronchi-500" />
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

        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-1">
          Urai Materi Kuliah Rumit
        </h2>
        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
          Tempelkan materi kuliah atau slide. AI akan memecahnya menjadi konsep kunci dan modul belajar 15-menit yang mudah dicerna otak.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Mata Kuliah / Subjek
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Contoh: Pemrograman Web / Kalkulus"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-chambray-500/20 focus:border-chambray-500 transition"
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
            <div className="flex justify-between items-center mb-1">
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
              rows={6}
              placeholder="Tempelkan teks materi kuliah di sini... (Ctrl+Enter untuk proses)"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-chambray-500/20 focus:border-chambray-500 transition leading-relaxed resize-y sm:rows-7"
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
            className="w-full bg-chambray-600 hover:bg-chambray-700 active:bg-chambray-800 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-xl text-xs sm:text-sm shadow-brand flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-ronchi-300" />
                <span>Mendekonstruksi Materi...</span>
              </>
            ) : (
              <>
                <BookOpen className="w-4 h-4" />
                <span>Dekonstruksi Sekarang</span>
                <span className="hidden sm:inline-flex items-center text-[10px] font-normal opacity-75 ml-1">
                  (Ctrl+Enter)
                </span>
              </>
            )}
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400">
          <span>Engine: Google Gemini AI</span>
          <span>Chunking Theory</span>
        </div>
      </div>

      {/* Right Output Panel */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-subtle p-4 sm:p-5 min-h-[460px] flex flex-col justify-between transition-all">
        {loading ? (
          <div className="py-12 px-4 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-chambray-50 text-chambray-600 flex items-center justify-center animate-pulse">
              <Sparkles className="w-6 h-6 animate-spin text-chambray-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Memecah Beban Kognitif Catatan...
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1">
                Gemini sedang memilah konsep esensial dan merancang modul belajar 15-menit.
              </p>
            </div>
            <div className="w-full space-y-3 pt-6 max-w-lg">
              <div className="h-16 bg-slate-100 rounded-xl animate-pulse"></div>
              <div className="h-24 bg-slate-100 rounded-xl animate-pulse"></div>
            </div>
          </div>
        ) : result ? (
          <div className="space-y-5">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-chambray-600 bg-chambray-50 px-2 py-0.5 rounded border border-chambray-200/60">
                  Hasil Dekonstruksi
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                  {result.title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
                  title="Salin hasil teks"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{copied ? 'Tersalin' : 'Salin'}</span>
                </button>
                <button
                  onClick={downloadMarkdown}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition shadow-xs"
                  title="Download format Markdown"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>.MD</span>
                </button>
              </div>
            </div>

            {/* Core Concepts */}
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-2 h-2 rounded-full bg-chambray-600"></span>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Konsep Inti Teridentifikasi
                </h4>
              </div>
              <div className="space-y-2">
                {result.coreConcepts.map((concept, idx) => {
                  const isCrucial = concept.importance?.toLowerCase().includes('krusial') || concept.importance?.toLowerCase().includes('high');
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:border-slate-300 transition"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-bold text-xs text-slate-900">
                          {concept.term}
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          isCrucial
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-pigeon-50 text-chambray-800 border border-pigeon-200'
                        }`}>
                          {concept.importance}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {concept.definition}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bite-sized Modules */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Modul Belajar 15-Menit (Chunking)
                  </h4>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">
                  {Object.values(checkedModules).filter(Boolean).length}/{result.biteSizedModules.length} Selesai
                </span>
              </div>
              <div className="space-y-2">
                {result.biteSizedModules.map((m, idx) => {
                  const isDone = !!checkedModules[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleModuleCheck(idx)}
                      className={`p-3 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                        isDone
                          ? 'bg-emerald-50/50 border-emerald-200'
                          : 'bg-white border-slate-200/80 hover:border-chambray-300 hover:bg-chambray-50/20 shadow-subtle'
                      }`}
                    >
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
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-xs font-bold ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                            {m.title}
                          </span>
                          <span className="text-[10px] font-mono text-chambray-700 bg-chambray-50 px-1.5 py-0.2 rounded border border-chambray-200/60 shrink-0">
                            <Clock className="w-2.5 h-2.5 inline mr-1 -mt-0.5" />
                            {m.timeMinutes}m
                          </span>
                        </div>
                        <p className={`text-xs leading-relaxed ${isDone ? 'line-through text-slate-400' : 'text-slate-600'}`}>
                          {m.action}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Formulas / Rules */}
            {result.keyFormulaOrRules && result.keyFormulaOrRules.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-ronchi-500"></span>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Kaidah & Rumus Ujian
                  </h4>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                  {result.keyFormulaOrRules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-mono">
                      <span className="text-chambray-600 font-bold">#</span>
                      <span className="leading-relaxed">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Empty placeholder */
          <div className="py-14 px-4 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-12 h-12 rounded-2xl bg-chambray-50 text-chambray-600 flex items-center justify-center mb-3">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-1">
              Belum Ada Catatan yang Didekonstruksi
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mb-4 leading-relaxed">
              Masukkan catatan kuliah Anda di formulir sebelah kiri atau klik tombol &quot;Contoh Catatan&quot; untuk langsung menguji sistem.
            </p>
            <button
              onClick={handleLoadSample}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-ronchi-500" />
              <span>Coba dengan Contoh Materi Web Dev</span>
            </button>
          </div>
        )}

        {/* Footer info badge */}
        {result && (
          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Model: {modelUsed}</span>
            <span className={mode === 'fallback' ? 'text-amber-600 font-medium' : 'text-emerald-600 font-medium'}>
              {mode === 'fallback' ? '⚡ Mode Demo Cerdas' : '🟢 Live Gemini AI'}
            </span>
          </div>
        )}
      </div>

    </div>
  );
}
