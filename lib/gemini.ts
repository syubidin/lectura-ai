import { buildSecureSystemPrompt } from './security';
import { 
  NoteDeconstructionResult, 
  TrapPredictorResult, 
  CramPlanResult, 
  FeynmanResult 
} from './types';

// Candidate models in order of priority (Fastest & most stable first)
const CANDIDATE_MODELS = [
  process.env.GEMINI_MODEL,
  'gemini-3-flash-preview',
  'gemini-3.1-flash-lite',
  'gemini-3.5-flash',
  'gemini-flash-latest'
].filter((m): m is string => Boolean(m && m.trim().length > 0));

/**
 * Diagnostic test for Gemini API connectivity
 */
export async function testGeminiConnection(): Promise<{
  connected: boolean;
  model: string;
  latencyMs: number;
  message: string;
  hasKey: boolean;
  maskedKey: string;
}> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  const hasKey = Boolean(apiKey && apiKey !== 'your_gemini_api_key_here');
  const maskedKey = hasKey
    ? `${apiKey!.substring(0, 8)}...${apiKey!.slice(-4)}`
    : 'Belum terpasang';

  if (!hasKey) {
    return {
      connected: false,
      model: 'None',
      latencyMs: 0,
      message: 'GEMINI_API_KEY belum terpasang di .env.local',
      hasKey: false,
      maskedKey
    };
  }

  const start = Date.now();
  for (const model of CANDIDATE_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Respond with valid JSON: {"status": "ok"}' }] }],
          generationConfig: {
            temperature: 0.1,
            responseMimeType: 'application/json'
          }
        }),
        signal: AbortSignal.timeout(8000)
      });

      if (res.ok) {
        const latencyMs = Date.now() - start;
        return {
          connected: true,
          model,
          latencyMs,
          message: `Terhubung optimal ke Google AI Studio (${model})`,
          hasKey: true,
          maskedKey
        };
      }
    } catch {
      // try next candidate
    }
  }

  return {
    connected: false,
    model: CANDIDATE_MODELS[0] || 'gemini-3-flash-preview',
    latencyMs: Date.now() - start,
    message: 'Gagal terhubung ke Google AI Studio. Periksa koneksi internet atau kuota API Key.',
    hasKey: true,
    maskedKey
  };
}

/**
 * Pemanggil REST API Google Generative Language (v1beta) dengan auto-fallback model
 */
async function callGeminiApi<T>(
  prompt: string, 
  fallbackData: T
): Promise<{ data: T; mode: 'live_ai' | 'fallback_demo'; modelUsed?: string; error?: string }> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiKey || apiKey === 'your_gemini_api_key_here' || apiKey === 'masukkan_api_key_anda_disini') {
    console.warn('[Lectura AI] GEMINI_API_KEY belum terpasang di .env.local. Berjalan dalam Mode Demo.');
    return { data: fallbackData, mode: 'fallback_demo', error: 'API key belum terpasang' };
  }

  let lastError = '';

  for (const model of CANDIDATE_MODELS) {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    try {
      // AbortSignal.timeout() may not exist in older Node versions — use a manual timeout
      let timeoutId: ReturnType<typeof setTimeout> | null = null;
      const controller = new AbortController();
      timeoutId = setTimeout(() => controller.abort(), 25000);

      let response: Response;
      try {
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.25,
              responseMimeType: 'application/json'
            }
          }),
          signal: controller.signal
        });
      } finally {
        if (timeoutId) clearTimeout(timeoutId);
      }

      if (!response.ok) {
        const errText = await response.text();
        lastError = `HTTP ${response.status} on ${model}: ${errText.substring(0, 150)}`;
        console.warn(`[Lectura AI] Model ${model} returned ${response.status}, trying fallback...`);
        continue; // Try next model
      }

      const jsonRes = await response.json();
      const parts = jsonRes?.candidates?.[0]?.content?.parts || [];
      
      // Filter out thinking parts if Gemini thought mode is enabled
      const textPart = parts.find((p: any) => !p.thought) || parts[parts.length - 1];
      const candidateText = textPart?.text;

      if (!candidateText) {
        lastError = `Empty response from ${model}`;
        continue;
      }

      // Pembersihan pembungkus markdown ```json jika ada
      const cleanJsonStr = candidateText
        .replace(/```json\n?/gi, '')
        .replace(/```/g, '')
        .trim();

      const parsedData = JSON.parse(cleanJsonStr) as T;
      return { 
        data: parsedData, 
        mode: 'live_ai',
        modelUsed: model 
      };
    } catch (err: any) {
      lastError = err?.message || String(err);
      // Network errors (no internet, ECONNREFUSED, DNS fail, AbortError) → try next model
      const isNetworkError = (
        lastError.includes('fetch failed') ||
        lastError.includes('ECONNREFUSED') ||
        lastError.includes('ENOTFOUND') ||
        lastError.includes('network') ||
        lastError.includes('abort') ||
        lastError.includes('timeout') ||
        lastError.includes('UND_ERR') ||
        lastError.includes('certificate') ||
        lastError.includes('connect')
      );
      if (isNetworkError) {
        console.warn(`[Lectura AI] Koneksi gagal ke ${model} (${lastError.split('\n')[0]}). Mencoba model berikutnya atau mode demo...`);
      } else {
        console.warn(`[Lectura AI Exception on ${model}]:`, lastError);
      }
    }
  }

  // All models failed → gracefully serve demo data
  console.warn('[Lectura AI]: Tidak dapat terhubung ke AI. Melanjutkan dengan Mode Demo Cerdas.');
  return { 
    data: fallbackData, 
    mode: 'fallback_demo',
    error: lastError 
  };
}

// 1. Modul Dekonstruksi Catatan
export async function deconstructNote(content: string, subject: string) {
  const prompt = buildSecureSystemPrompt(`
Analisislah materi kuliah / catatan berikut untuk subjek "${subject}".
Kembalikan JSON persis sesuai skema berikut tanpa teks tambahan:
{
  "title": "Judul Rangkuman Materi",
  "coreConcepts": [
    { "term": "Nama Konsep", "definition": "Penjelasan singkat, padat, dan jelas", "importance": "high" }
  ],
  "biteSizedModules": [
    { "timeMinutes": 15, "title": "Topik 15 Menit Pertama", "action": "Langkah konkret yang harus dipelajari/dikerjakan" }
  ],
  "keyFormulaOrRules": [ "Rumus / Kaidah Utama 1", "Kaidah Penting 2" ]
}

Materi Kuliah:
"""
${content}
"""
`);

  const fallback: NoteDeconstructionResult = {
    title: `Dekonstruksi Materi: ${subject || 'Catatan Kuliah'}`,
    coreConcepts: [
      { term: "Prinsip Modularitas", definition: "Memecah materi besar menjadi komponen mandiri agar beban kognitif berkurang drastis.", importance: "high" },
      { term: "Active Recall", definition: "Menguji ingatan aktif tanpa membuka catatan secara langsung untuk memperkuat sinapsis memori.", importance: "high" },
      { term: "Spaced Repetition", definition: "Mengulang kembali konsep inti pada interval waktu bertahap untuk retensi jangka panjang.", importance: "medium" }
    ],
    biteSizedModules: [
      { timeMinutes: 15, title: "Sesi 1: Pemetaan Konsep & Glosarium Kunci", action: "Identifikasi 3 istilah paling asing dan tuliskan definisinya dengan bahasa sendiri." },
      { timeMinutes: 15, title: "Sesi 2: Rekonstruksi Alur / Diagram Konsep", action: "Gambarkan alur kerja konsep atau rumus utama di selembar kertas kosong." },
      { timeMinutes: 15, title: "Sesi 3: Uji Coba Soal Studi Kasus Dasar", action: "Kerjakan 1 contoh soal tipikal tanpa melihat buku solusi." }
    ],
    keyFormulaOrRules: [
      "Prinsip 80/20: 20% konsep fondasi mengontrol 80% pemahaman materi tingkat lanjut.",
      "Kaidah Verifikasi: Jika tidak bisa menjelaskan ke orang awam, berarti belum paham seutuhnya."
    ]
  };

  return callGeminiApi<NoteDeconstructionResult>(prompt, fallback);
}

// 2. Modul Prediksi Soal Jebakan Dosen
export async function predictExamTraps(topic: string, courseName: string) {
  const prompt = buildSecureSystemPrompt(`
Prediksilah "Soal Jebakan Dosen" (Exam Traps) untuk mata kuliah "${courseName}" dengan topik "${topic}".
Fokuslah pada edge cases, jebakan terminologi mirip, dan trik yang sering membuat mahasiswa terkecoh.
Kembalikan JSON persis sesuai skema berikut tanpa teks tambahan:
{
  "courseName": "${courseName}",
  "topic": "${topic}",
  "examMindsetWarning": "Penjelasan sudut pandang dosen mengapa topik ini dijadikan soal jebakan",
  "trapQuestions": [
    {
      "question": "Contoh pertanyaan jebakan spesifik",
      "commonMistake": "Kesalahan umum yang sering dipilih/ditulis mahasiswa yang belum paham detil",
      "correctConcept": "Konsep yang benar dan jawaban yang diharapkan pemeriksa ujian",
      "severity": "TRAP_HIGH",
      "proTip": "Tips taktis mengenali jebakan ini saat membaca soal"
    }
  ]
}
`);

  const fallback: TrapPredictorResult = {
    courseName: courseName || "Mata Kuliah Inti",
    topic: topic || "Topik Ujian",
    examMindsetWarning: "Dosen tidak hanya menguji rumus baku, melainkan kondisi batas (edge cases) dan asumsi implisit yang sering diabaikan mahasiswa!",
    trapQuestions: [
      {
        question: "Apakah operasi rekursif selalu membutuhkan alokasi memori stack tambahan?",
        commonMistake: "Mengasumsikan semua rekursi menghabiskan stack memory sama besarnya tanpa memperhatikan jenis rekursi.",
        correctConcept: "Pada bahasa yang mendukung Tail-Call Optimization (TCO), rekursi ekor (tail recursion) dioptimasi menjadi loop konstan O(1) stack space.",
        severity: "TRAP_HIGH",
        proTip: "Perhatikan apakah panggilan rekursif adalah ekspresi terakhir tanpa ada operasi tunda."
      },
      {
        question: "Apakah mengubah property objek di React State akan langsung memicu render ulang?",
        commonMistake: "Melakukan mutasi objek langsung (obj.prop = baru) lalu mengira React mendeteksi perubahannya.",
        correctConcept: "React memeriksa referensi memori (shallow equality). Harus membuat salinan objek baru dengan spread operator ({ ...obj, prop: baru }).",
        severity: "TRAP_HIGH",
        proTip: "Ingat prinsip immutability: jangan pernah mengubah objek state secara langsung."
      }
    ]
  };

  return callGeminiApi<TrapPredictorResult>(prompt, fallback);
}

// 3. Modul Rencana Belajar Darurat 24-Jam
export async function generateCramPlan(subject: string, hoursRemaining: number) {
  const prompt = buildSecureSystemPrompt(`
Buatkan Rencana Belajar Darurat (Cram-Proof Action Plan) untuk mata kuliah "${subject}" dengan sisa waktu ujian ${hoursRemaining} jam.
Gunakan prinsip Pareto 80/20 dan manajemen energi kognitif (HIGH untuk konsep sulit di awal, MEDIUM untuk latihan soal, RECOVERY untuk istirahat otak).
Kembalikan JSON persis sesuai skema berikut tanpa teks tambahan:
{
  "subject": "${subject}",
  "hoursRemaining": ${hoursRemaining},
  "survivalStrategy": "Ringkasan strategi taktis 1-2 kalimat untuk memaksimalkan nilai dengan sisa waktu yang ada",
  "schedule": [
    {
      "timeBlock": "Jam 01 - Jam 02",
      "phase": "Fase Belajar (misal: Fondasi & Rumus Wajib)",
      "task": "Aksi spesifik yang harus diselesaikan pada blok waktu ini",
      "cognitiveEnergy": "HIGH"
    }
  ],
  "recommendedBreaks": "Panduan istirahat dan tidur yang krusial agar ingatan terkonsolidasi"
}
`);

  const fallback: CramPlanResult = {
    subject: subject || "Mata Kuliah Inti",
    hoursRemaining: hoursRemaining || 6,
    survivalStrategy: "Terapkan Aturan 80/20: Kuasai 3 topik utama yang berbobot 70% soal ujian daripada mencoba membaca seluruh buku secara dangkal.",
    schedule: [
      { 
        timeBlock: "Blok 1 (0-2 Jam)", 
        phase: "Audit Silabus & Past Papers", 
        task: "Identifikasi tipe soal yang selalu keluar 3 tahun terakhir dan catat 5 rumus kuncinya.", 
        cognitiveEnergy: "HIGH" 
      },
      { 
        timeBlock: "Blok 2 (2-4 Jam)", 
        phase: "Drilling Soal Tipikal", 
        task: "Kerjakan 3 variasi soal tersulit dengan metode 'Open Formula, Closed Solution'.", 
        cognitiveEnergy: "HIGH" 
      },
      { 
        timeBlock: "Blok 3 (4-5 Jam)", 
        phase: "Flash Review & Formula Sheet", 
        task: "Tuliskan seluruh rumus wajib dari memori ke satu lembar kertas A4.", 
        cognitiveEnergy: "MEDIUM" 
      },
      { 
        timeBlock: "Blok 4 (1 Jam Terakhir)", 
        phase: "Power Nap & Reset Kognitif", 
        task: "Tidur minimal 60-90 menit. Jangan belajar hal baru agar otak mengunci memori jangka pendek.", 
        cognitiveEnergy: "RECOVERY" 
      }
    ],
    recommendedBreaks: "Tidur minimal 90 menit sebelum ujian mutlak diperlukan agar hipokampus dapat mentransfer memori jangka pendek ke korteks."
  };

  return callGeminiApi<CramPlanResult>(prompt, fallback);
}

// 4. Modul Teknik Feynman
export async function explainFeynman(topic: string, level: string) {
  const prompt = buildSecureSystemPrompt(`
Jelaskan topik / konsep kompleks "${topic}" menggunakan Teknik Richard Feynman untuk tingkat audiens "${level}".
Gunakan analogi dunia nyata yang sangat jelas, hindari jargon berbelit-belit, dan jelaskan langkah demi langkah.
Kembalikan JSON persis sesuai skema berikut tanpa teks tambahan:
{
  "topic": "${topic}",
  "simpleAnalogy": "Analogi intuitif yang langsung masuk akal bagi orang awam",
  "stepByStepExplanation": [
    "Langkah atau prinsip 1 dijelaskan dengan lugas",
    "Langkah atau prinsip 2 dijelaskan dengan lugas",
    "Langkah atau prinsip 3 dijelaskan dengan lugas"
  ],
  "commonMisconception": "Miskonsepsi atau kekeliruan paling umum yang sering dipikirkan orang",
  "testYourselfQuestion": "Satu pertanyaan praktis untuk menguji apakah pengguna sudah benar-benar paham esensinya"
}
`);

  const fallback: FeynmanResult = {
    topic: topic || "Konsep Kompleks",
    simpleAnalogy: "Bayangkan sistem ini seperti dapur restoran cepat saji: Kasir menerima pesanan (Frontend), Tiket pesanan diteruskan ke dapur (API Request), dan Koki di dapur memasak bahan makanan sesuai resep (Backend Server & Database).",
    stepByStepExplanation: [
      "1. Pengirim memberikan instruksi spesifik tanpa perlu tahu bagaimana cara mesin internalnya dirakit.",
      "2. Saluran perantara memverifikasi bahwa format pesan sudah benar dan aman sebelum diproses.",
      "3. Pusat eksekusi menyelesaikan pekerjaan dan mengembalikan hasil matang ke pengguna."
    ],
    commonMisconception: "Banyak orang mengira konsep ini memerlukan hafalan rumus panjang, padahal yang terpenting adalah memahami hubungan sebab-akibat antar komponennya.",
    testYourselfQuestion: "Jika salah satu komponen perantara mengalami kendala, bagaimana komponen lainnya tetap dapat mengamankan data yang sudah masuk?"
  };

  return callGeminiApi<FeynmanResult>(prompt, fallback);
}
