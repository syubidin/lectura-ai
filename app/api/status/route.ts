import { NextResponse } from 'next/server';
import { testGeminiConnection } from '@/lib/gemini';

export async function GET() {
  try {
    const diagnostic = await testGeminiConnection();
    return NextResponse.json({
      success: true,
      ...diagnostic,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        connected: false,
        error: err?.message || 'Gagal mengecek status Gemini API',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

