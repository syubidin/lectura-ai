import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sanitizeInput, checkRateLimit } from '@/lib/security';
import { deconstructNote } from '@/lib/gemini';

const Schema = z.object({
  content: z.string().min(10, 'Catatan minimal 10 karakter').max(10000, 'Catatan maksimal 10.000 karakter'),
  subject: z.string().min(2, 'Nama subjek minimal 2 karakter').max(100)
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

    const cleanContent = sanitizeInput(parsed.data.content);
    const cleanSubject = sanitizeInput(parsed.data.subject);

    const result = await deconstructNote(cleanContent, cleanSubject);

    return NextResponse.json({
      success: true,
      data: result.data,
      mode: result.mode,
      modelUsed: result.modelUsed,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    console.error('API Error /deconstruct:', err);
    return NextResponse.json({ success: false, error: 'Gagal memproses catatan kuliah.' }, { status: 500 });
  }
}
