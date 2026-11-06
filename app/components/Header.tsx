'use client';
import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Activity, 
  Key, 
  X,
  Target,
  Clock,
  Lightbulb,
  ExternalLink,
  HelpCircle,
  Menu,
  ChevronRight,
  Home
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenOnboarding?: () => void;
  onBackToLanding?: () => void;
}

interface ApiStatus {
  loading: boolean;
  connected: boolean;
  model: string;
  latencyMs: number;
  message: string;
  hasKey: boolean;
  maskedKey: string;
}

export default function Header({ activeTab, setActiveTab, onOpenOnboarding, onBackToLanding }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [status, setStatus] = useState<ApiStatus>({
    loading: true,
    connected: false,
    model: 'gemini-3-flash-preview',
    latencyMs: 0,
    message: 'Memeriksa status API...',
    hasKey: false,
    maskedKey: ''
  });

  const [showStatusModal, setShowStatusModal] = useState(false);

  const checkStatus = async () => {
    setStatus(prev => ({ ...prev, loading: true }));
    try {
      const res = await fetch('/api/status', { cache: 'no-store' });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({
          loading: false,
          connected: data.connected,
          model: data.model || 'gemini-3-flash-preview',
          latencyMs: data.latencyMs || 0,
          message: data.message || 'Terhubung optimal',
          hasKey: data.hasKey,
          maskedKey: data.maskedKey
        });
      } else {
        setStatus({
          loading: false,
          connected: false,
          model: 'Offline',
          latencyMs: 0,
          message: data.error || 'Gagal tersambung ke Gemini',
          hasKey: data.hasKey || false,
          maskedKey: data.maskedKey || ''
        });
      }
    } catch {
      setStatus({
        loading: false,
        connected: false,
        model: 'Offline',
        latencyMs: 0,
        message: 'Koneksi ke backend terputus',
        hasKey: false,
        maskedKey: ''
      });
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const navItems = [
    { id: 'deconstruct', label: 'Dekonstruksi Catatan', icon: BookOpen },
    { id: 'trap', label: 'Prediksi Soal Jebakan', icon: Target },
    { id: 'cram', label: 'Rencana Belajar Darurat', icon: Clock },
    { id: 'feynman', label: 'Metode Feynman', icon: Lightbulb },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Brand Logo */}
            <div 
              onClick={onBackToLanding}
              className={`flex items-center gap-3 ${onBackToLanding ? 'cursor-pointer group' : ''}`}
              title={onBackToLanding ? 'Kembali ke Beranda Utama' : undefined}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-sm shadow-indigo-200 group-hover:scale-105 transition">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-indigo-600 transition">
                    Lectura<span className="text-indigo-600 font-extrabold">AI</span>
                  </span>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/60">
                    Academic
                  </span>
                </div>
                <span className="hidden sm:inline text-[11px] text-slate-500 font-medium">
                  Copilot Belajar & Persiapan Ujian
                </span>
              </div>
            </div>

            {/* Desktop Navigation Tabs - Icon Only */}
            <nav className="hidden md:flex items-center p-1 bg-slate-100/80 rounded-xl border border-slate-200/60 gap-0.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`p-2 rounded-lg transition-all duration-150 relative group ${
                      isActive
                        ? 'bg-white text-indigo-700 shadow-sm shadow-slate-200 border border-slate-200/60'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
                    }`}
                    title={item.label}
                    aria-label={item.label}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-500'}`} />
                    
                    {/* Tooltip on hover */}
                    <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-0.5 text-[10px] font-medium text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100 z-50">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Panduan Button */}
              {onOpenOnboarding && (
                <button
                  onClick={onOpenOnboarding}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition shadow-xs"
                  title="Buka panduan penggunaan aplikasi"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Panduan</span>
                </button>
              )}

              {/* Status AI Modal Pill */}
              <button
                onClick={() => setShowStatusModal(true)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-all shadow-xs ${
                  status.loading
                    ? 'bg-slate-50 border-slate-200 text-slate-500'
                    : status.connected
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100/70'
                    : 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100/70'
                }`}
                title="Status koneksi AI"
              >
                <span className="relative flex h-2 w-2">
                  {status.connected && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  )}
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      status.loading
                        ? 'bg-slate-400'
                        : status.connected
                        ? 'bg-emerald-500'
                        : 'bg-amber-500'
                    }`}
                  ></span>
                </span>
                <span className="font-semibold text-[11px]">
                  {status.loading
                    ? 'Cek AI...'
                    : status.connected
                    ? 'Gemini Aktif'
                    : 'Mode Demo'}
                </span>
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition shadow-xs"
                title="Buka menu navigasi"
                aria-label="Buka menu navigasi"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>

          </div>

          {/* Mobile Drawer / Hamburger Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden py-3 px-2 border-t border-slate-200/80 bg-white/95 backdrop-blur-md rounded-b-2xl shadow-lg space-y-1 animate-in slide-in-from-top-2 duration-150">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                Pilih Modul Belajar
              </p>
              
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span>{item.label}</span>
                    </div>
                    {isActive && <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-medium">Aktif</span>}
                  </button>
                );
              })}

              <div className="pt-2 mt-2 border-t border-slate-100 space-y-1">
                {onOpenOnboarding && (
                  <button
                    onClick={() => {
                      onOpenOnboarding();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 transition"
                  >
                    <HelpCircle className="w-4 h-4 text-indigo-600" />
                    <span>Panduan Penggunaan</span>
                  </button>
                )}

                {onBackToLanding && (
                  <button
                    onClick={() => {
                      onBackToLanding();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-indigo-600 hover:bg-indigo-50 transition"
                  >
                    <Home className="w-4 h-4" />
                    <span>Kembali ke Beranda Proyek</span>
                  </button>
                )}
              </div>
            </div>
          )}

        </div>
      </header>

      {/* Connection Diagnostic Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-elevated border border-slate-200 p-6 relative">
            <button
              onClick={() => setShowStatusModal(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2.5 rounded-xl ${status.connected ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                {status.connected ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Status Koneksi Google AI Studio
                </h3>
                <p className="text-xs text-slate-500">
                  Diagnostik real-time integrasi Gemini Engine
                </p>
              </div>
            </div>

            <div className="space-y-3 bg-slate-50 rounded-xl p-4 border border-slate-200/70 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-200/50">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-slate-400" />
                  Status Koneksi:
                </span>
                <span className={`font-semibold ${status.connected ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {status.connected ? 'Terhubung (Online)' : 'Demo Mode (Offline)'}
                </span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-200/50">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  Model Aktif:
                </span>
                <span className="font-mono font-medium text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {status.model}
                </span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-200/50">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-slate-400" />
                  API Key:
                </span>
                <span className="font-mono text-slate-700">
                  {status.maskedKey || 'Belum diatur di .env.local'}
                </span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500">Latensi Respons:</span>
                <span className="font-mono text-slate-700">
                  {status.latencyMs > 0 ? `${status.latencyMs} ms` : '-'}
                </span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-lg bg-indigo-50/60 border border-indigo-100 text-[11px] text-indigo-900 leading-relaxed">
              <strong>Info:</strong> API Key terbaca dari file <code>.env.local</code>. Ketika terhubung, setiap permintaan akan diproses langsung oleh model <strong>Gemini 3 Flash</strong> dengan fitur auto-fallback ke model cadangan jika terjadi lonjakan beban.
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={checkStatus}
                disabled={status.loading}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${status.loading ? 'animate-spin' : ''}`} />
                {status.loading ? 'Memeriksa...' : 'Cek Ulang Koneksi'}
              </button>
              <button
                onClick={() => setShowStatusModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium transition"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
