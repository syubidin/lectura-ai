'use client';
import React from 'react';
import { BookOpen, ShieldCheck, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-14 border-t border-slate-200/80 bg-white/70 backdrop-blur-sm py-8 text-xs text-slate-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Brand Info */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-chambray-600 flex items-center justify-center text-white shadow-sm">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm">
                Lectura<span className="text-chambray-600 font-extrabold">AI</span>
              </span>
              <p className="text-[10px] text-slate-400">
                Academic Copilot & Study Accelerator
              </p>
            </div>
          </div>

          {/* Security & Architecture Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px]">
            <span className="flex items-center gap-1.5 text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Validasi Skema Zod
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <Sparkles className="w-3.5 h-3.5 text-ronchi-500" />
              Google Gemini 3 Flash
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600">
              Next.js Full-Stack App
            </span>
          </div>

          {/* Copyright */}
          <div className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} Lectura AI. Didesain untuk kesuksesan akademik.
          </div>

        </div>
      </div>
    </footer>
  );
}
