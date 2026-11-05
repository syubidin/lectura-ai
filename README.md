# 🎓 Lectura AI — Modern Academic Copilot & Cognitive Learning Engine

> **Bantu mahasiswa menguasai materi kuliah rumit, membongkar soal jebakan ujian dosen, dan menyusun rencana belajar kilat secara presisi bertenaga Google Gemini AI.**

[![Next.js](https://img.shields.io/badge/Framework-Next.js%2016-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript%205-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/AI%20Engine-Gemini%203%20Flash-4285F4?style=for-the-badge&logo=google)](https://aistudio.google.com/)
[![Security](https://img.shields.io/badge/Security-Zod%20%2B%20Sanitized-10B981?style=for-the-badge)](https://zod.dev/)
[![Author](https://img.shields.io/badge/Author-syubidin-indigo?style=for-the-badge&logo=github)](https://github.com/syubidin)

---

## 🌟 Mengapa Lectura AI?

Perkuliahan modern menghadapkan mahasiswa pada 3 tantangan kognitif besar:
1. **Beban Kognitif Berlebih (*Information Overload*)**: Catatan kuliah puluhan halaman dan slide PDF padat teks yang melelahkan otak jika dibaca ulang dari awal.
2. **Soal Jebakan Dosen (*Exam Traps*)**: Banyak mahasiswa gagal di ujian bukan karena tidak belajar, melainkan karena terkecoh oleh batas kondisi (*edge cases*) dan pertanyaan bertrik tinggi yang sengaja dipasang pembuat soal.
3. **Kepanikan H-1 Ujian (&lt; 24 Jam)**: Belajar sistem kebut semalam sering berakhir *burnout* karena tidak adanya strategi prioritas yang berbasis sains kognitif.

**Lectura AI** hadir sebagai *full-stack web application* dengan estetika minimalis, bersih, dan berstandar industri modern (terinspirasi dari *design system* Notion AI & Linear), mengubah materi padat menjadi modul aksi nyata yang terukur.

---

## ⚡ 4 Modul Unggulan (Superpowers)

### 1. 📖 Syllabus & Note Deconstructor (Ringkas Catatan 15-Menit)
* Mengurai teks catatan kuliah atau slide PDF yang rumit menjadi **Konsep Kunci Berbobot** (*Krusial*, *Penting*, *Dasar*).
* Membaginya menjadi **Sesi Belajar 15-Menit (*Bite-Sized Modules*)** yang dilengkapi *checklist* interaktif agar mahasiswa dapat mencentang progres belajarnya.
* Mengekstrak **Kaidah & Rumus Utama** dengan tombol 1-klik salin (*copy-to-clipboard*).
* Ekspor ringkasan langsung ke format **Markdown (.md)** untuk disimpan di Notion atau Obsidian.

### 2. 🎯 Exam Trap Predictor (Prediksi Soal Jebakan Dosen)
* Menganalisis mata kuliah dan topik tertentu dari **sudut pandang pembuat soal (dosen)**.
* Membongkar **Mindset Peringatan Ujian**: mengapa dosen sering menguji topik tersebut dan trik apa yang biasa digunakan.
* Menampilkan komparasi berdampingan:
  * ❌ **Kesalahan Umum Mahasiswa** (*Common Traps*)
  * ✅ **Konsep & Kunci Jawaban Benar**
  * 💡 **Pro-Tip Taktis** pengerjaan soal pilihan ganda maupun esai.

### 3. ⏱️ 24-Hour Cram-Proof Action Plan (Jadwal Belajar Darurat)
* Menggunakan **Prinsip Pareto 80/20**: menguasai 20% topik kunci yang menghasilkan 80% bobot nilai ujian.
* Dilengkapi *Interactive Time Slider* (2 hingga 24 Jam) dengan indikator otomatis (*Mode Panik*, *Akselerasi Intensif*, atau *Terstruktur*).
* Memetakan alokasi **Energi Kognitif (*HIGH*, *MEDIUM*, *RECOVERY*)** jam demi jam.
* Panduan wajib jendela istirahat/tidur agar hipokampus otak dapat mengonsolidasi memori jangka pendek menjadi memori jangka panjang.

### 4. 💡 Feynman Technique Explainer (Tutor Analogi Sederhana)
* Mengadopsi teknik pembelajaran fisikawan peraih Nobel **Richard Feynman**: jika Anda tidak bisa menjelaskannya dengan sederhana, berarti Anda belum memahaminya.
* Menerjemahkan teori abstrak menjadi **Analogi Dunia Nyata** yang sangat intuitif.
* Dekonstruksi konsep langkah demi langkah tanpa jargon membingungkan.
* Mengoreksi miskonsepsi terbesar serta menyediakan **Kuis Mandiri Interaktif** dengan tombol intip kunci evaluasi (*reveal hint*).

---

## 🎨 Filosofi Desain UI/UX

* **Minimalist & Calm Aesthetic**: Mengutamakan kenyamanan mata mahasiswa saat membaca dengan palet lembut (`slate-50`, putih murni, dan aksen `indigo-600`).
* **Interactive Onboarding Walkthrough**: Panduan interaktif 4 langkah untuk pengguna baru dengan navigasi touch/klik yang ramah di perangkat *mobile* dan *desktop*.
* **Real-time Diagnostic Header**: Dilengkapi pill status AI yang berkedip hijau lembut saat terhubung ke Google AI Studio, menampilkan latensi respons milidetik dan jendela diagnostik.
* **1-Click Quick Presets**: Setiap modul memiliki tombol contoh materi siap pakai, memungkinkan presentasi demo ke klien dalam 1 detik tanpa perlu mengetik panjang.
* **Aksesibilitas & Pintasan**: Dukungan tombol pintas <kbd>Ctrl + Enter</kbd> untuk memproses catatan kuliah seketika.

---

## 🛠️ Tech Stack & Arsitektur

```
lectura-ai/
├── app/
│   ├── api/
│   │   ├── deconstruct/route.ts      # Endpoint modul dekonstruksi catatan
│   │   ├── trap-predictor/route.ts   # Endpoint prediksi soal jebakan
│   │   ├── cram-plan/route.ts        # Endpoint rencana belajar 24 jam
│   │   ├── feynman/route.ts          # Endpoint tutor teknik Feynman
│   │   └── status/route.ts           # Diagnostik real-time koneksi Gemini
│   ├── components/
│   │   ├── Header.tsx                # Navbar + live AI status + modal diagnostik
│   │   ├── HeroSection.tsx           # Proposisi nilai + quick feature cards
│   │   ├── OnboardingModal.tsx       # Panduan interaktif mobile-friendly
│   │   ├── NoteDeconstructor.tsx     # Modul 01: Dekonstruksi materi
│   │   ├── TrapPredictor.tsx         # Modul 02: Soal jebakan dosen
│   │   ├── CramPlan.tsx              # Modul 03: Rencana 24 jam
│   │   ├── FeynmanExplainer.tsx      # Modul 04: Analogi Feynman
│   │   └── Footer.tsx                # Footer minimalis & status sistem
│   ├── globals.css                   # Custom subtle scrollbars & typography
│   ├── layout.tsx                    # Plus Jakarta Sans & metadata SEO
│   └── page.tsx                      # Main single-page interactive controller
├── lib/
│   ├── gemini.ts                     # REST client v1beta + multi-model fallback
│   ├── security.ts                   # Input sanitizer & Zod security wrapper
│   └── types.ts                      # Strict TypeScript interfaces
└── tailwind.config.js                # Custom palette, shadows, and radii
```

* **Core Engine**: Google Generative Language REST API (`v1beta`).
* **Active Model**: `gemini-3-flash-preview` dengan arsitektur auto-fallback ke `gemini-3.1-flash-lite` dan `gemini-3.5-flash` untuk menjamin *zero downtime* saat terjadi lonjakan antrean API publik.
* **Security Layer**:
  * Validasi skema ketat menggunakan **Zod**.
  * Sanitasi string terhadap injeksi tag HTML/Script.
  * In-memory Rate Limiting untuk perlindungan dari *spamming request*.

---

## 🚀 Panduan Instalasi Lokal

### 1. Klon Repositori
```bash
git clone https://github.com/syubidin/lectura-ai.git
cd lectura-ai
```

### 2. Pasang Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment Variables
Salin file `.env.example` menjadi `.env.local`:
```bash
cp .env.example .env.local
```

Buka `.env.local` dan masukkan API Key dari Google AI Studio:
```env
GEMINI_API_KEY=masukkan_api_key_google_ai_studio_anda
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
> *Dapatkan API Key gratis di [Google AI Studio](https://aistudio.google.com/app/apikey).*

### 4. Jalankan Aplikasi
```bash
npm run dev
```
Buka peramban Anda di [http://localhost:3000](http://localhost:3000).

---

## 🌐 Panduan Deploy Live Demo (Vercel)

Aplikasi ini dioptimalkan 100% untuk platform **Vercel** (*zero-config deployment*):

1. **Push ke GitHub**: Pastikan repositori Anda sudah ter-push ke akun `syubidin/lectura-ai`.
2. **Kunjungi Vercel**: Buka [vercel.com](https://vercel.com) dan login menggunakan akun GitHub Anda.
3. **Add New Project**: Pilih repositori **lectura-ai**.
4. **Environment Variables**:
   * Masukkan nama: `GEMINI_API_KEY`
   * Masukkan value: API Key Google AI Studio Anda.
5. **Deploy**: Klik tombol **Deploy**. Dalam ~1 menit, link live demo Anda aktif (contoh: `https://lectura-ai.vercel.app`) dan siap dibagikan kepada klien!

---

## 👤 Profil Pengembang

* **Nama / Username**: **syubidin**
* **GitHub**: [@syubidin](https://github.com/syubidin)
* **Email**: [syubyattala806@gmail.com](mailto:syubyattala806@gmail.com)

---

## 📄 Lisensi

Proyek ini dirilis di bawah lisensi [MIT License](LICENSE). Bebas digunakan, dikembangkan, dan disesuaikan untuk kebutuhan akademik maupun komersial.
