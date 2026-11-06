import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lectura AI — Asisten Akademik & Copilot Belajar Mahasiswa',
  description: 'Platform AI copilot akademik modern: dekonstruksi catatan kuliah jadi modul 15-menit, prediksi soal jebakan dosen, dan rencana belajar kilat bertenaga Google Gemini AI.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon.svg',
  },
  keywords: ['AI akademik', 'belajar mahasiswa', 'Gemini AI', 'catatan kuliah', 'prediksi soal ujian', 'feynman', 'cram plan'],
  authors: [{ name: 'syubidin', url: 'https://github.com/syubidin' }],
  creator: 'syubidin',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-50 text-slate-900 min-h-screen antialiased selection:bg-brand-600 selection:text-white flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
