# 🚀 Panduan Deploy Lectura AI

## Langkah 1 — Install Git

Buka browser dan download Git dari:
👉 **https://git-scm.com/download/win**

- Klik **"Click here to download"** (64-bit)
- Jalankan installer → klik Next terus sampai Finish
- Setelah selesai, buka **Command Prompt baru** (tutup yang lama)

Verifikasi: `git --version` → harus muncul versi

---

## Langkah 2 — Buat Repo di GitHub

1. Buka **https://github.com/new**
2. Repository name: `lectura-ai`
3. Pilih **Public**
4. ⚠️ **JANGAN centang** "Add README", "Add .gitignore", atau "Choose a license"
5. Klik **Create repository**

---

## Langkah 3 — Push ke GitHub

Buka Command Prompt, jalankan perintah berikut satu per satu:

```cmd
cd c:\projects\lectura-ai

git init -b main
git config user.name "syubidin"
git config user.email "syubyattala806@gmail.com"
git add .
git commit -m "feat: Lectura AI — minimalist redesign, Gemini 3 Flash, interactive onboarding"
git remote add origin https://github.com/syubidin/lectura-ai.git
git push -u origin main
```

> Saat `git push`, akan muncul popup login GitHub — masukkan username & password (atau token).

---

## Langkah 4 — Deploy ke Vercel (Live Demo)

1. Buka **https://vercel.com** → Sign in with GitHub
2. Klik **"Add New Project"**
3. Pilih repo `syubidin/lectura-ai` → klik **Import**
4. Di bagian **Environment Variables**, tambahkan:
   - Key: `GEMINI_API_KEY`
   - Value: (isi dengan API key dari Google AI Studio)
5. Klik **Deploy**
6. Tunggu ~1-2 menit → dapat URL live seperti `https://lectura-ai.vercel.app`

---

## Langkah 5 — Bagikan ke Client

Kirim URL Vercel ke client Anda. Contoh pesan:

> "Halo, berikut link live demo **Lectura AI** yang sudah saya buat:
> 🔗 https://lectura-ai.vercel.app
> 
> Silakan dicoba fitur-fiturnya: Dekonstruksi Catatan, Prediksi Soal, Rencana Belajar, dan Metode Feynman."

---

## Troubleshooting

| Masalah | Solusi |
|---------|--------|
| `git: command not found` | Install Git dulu (Langkah 1) |
| `remote origin already exists` | Jalankan: `git remote set-url origin https://github.com/syubidin/lectura-ai.git` |
| Login GitHub gagal | Gunakan Personal Access Token dari https://github.com/settings/tokens |
| Build error di Vercel | Pastikan `GEMINI_API_KEY` sudah diset di Environment Variables |

