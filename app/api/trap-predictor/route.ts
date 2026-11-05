import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sanitizeInput, checkRateLimit } from '@/lib/security';
import { predictExamTraps } from '@/lib/gemini';

const Schema = z.object({
  topic: z.string().min(3, 'Topik minimal 3 karakter').max(200),
  courseName: z.string().min(2, 'Mata kuliah minimal 2 karakter').max(100)
});

export async function POST(req: NextRequest) {
  try {
    const clientIp = req.headers.get('x-forwarded-for') || '127.0.0.1';
    if (!checkRateLimit(clientIp, 60, 60000)) {
      return NextResponse.json({ success: false, error: 'Permintaan terlalu banyak. Harap tunggu 1 menit.' }, { status: 429 });
    }

    const body = await req.json();
    const parsed = Schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.issues[0].message }, { status: 400 });
    }

    const cleanTopic = sanitizeInput(parsed.data.topic);
    const cleanCourse = sanitizeInput(parsed.data.courseName);

    const result = await predictExamTraps(cleanTopic, cleanCourse);

    return NextResponse.json({
      success: true,
      data: result.data,
      mode: result.mode,
      modelUsed: result.modelUsed,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    console.error('API Error /trap-predictor:', err);
    return NextResponse.json({ success: false, error: 'Gagal memprediksi soal jebakan.' }, { status: 500 });
  }
}
