'use client';
import React from 'react';
import { BookOpen, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200/80 bg-white/60 backdrop-blur-sm py-10 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-sm shadow-indigo-200">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm">
                Lectura<span className="text-indigo-600 font-extrabold">AI</span>
              </span>
              <p className="text-[11px] text-slate-500">
                Asisten Akademik & Akselerator Pemahaman Mahasiswa
              </p>
            </div>
          </div>

          {/* Security & Architecture Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Validasi Aman Zod & Sanitasi Input
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Google Gemini 3 Flash REST Engine
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600">
              Next.js Full-Stack App Router
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
