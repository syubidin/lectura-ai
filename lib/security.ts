/**
 * Security & Input Sanitization Utilities
 */

// Simple HTML/script tag stripper to prevent client & prompt injection
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim();
}

// System prompt defense layer & token optimization
export function buildSecureSystemPrompt(instructions: string): string {
  return `
Role: Lectura AI, academic assistant.
Rules: Follow JSON format strictly without markdown wrapper or conversational prose. Indonesian (Bahasa Indonesia). Concise, punchy, high-yield academic insights.
Task:
${instructions}
`.trim();
}

// Rate limiting in-memory simple token bucket for demonstration
const ipStore = new Map<string, { count: number; lastReset: number }>();

export function checkRateLimit(identifier: string, limit = 60, windowMs = 60000): boolean {
  const now = Date.now();
  const record = ipStore.get(identifier);

  if (!record) {
    ipStore.set(identifier, { count: 1, lastReset: now });
    return true;
  }

  if (now - record.lastReset > windowMs) {
    ipStore.set(identifier, { count: 1, lastReset: now });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count += 1;
  return true;
}
