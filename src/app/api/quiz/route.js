import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const rateLimit = new Map();
const RATE_LIMIT_WINDOW_MS = 60000;
const MAX_REQUESTS_PER_WINDOW = 5;

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const currentTime = Date.now();
    const requestData = rateLimit.get(ip) || { count: 0, startTime: currentTime };

    if (currentTime - requestData.startTime > RATE_LIMIT_WINDOW_MS) {
      requestData.count = 1;
      requestData.startTime = currentTime;
    } else {
      requestData.count++;
      if (requestData.count > MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
      }
    }
    rateLimit.set(ip, requestData);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('No API key');

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `Generate a JSON array of 3 multiple-choice questions about the Indian election process.
The questions must be educational for first-time voters.
Return ONLY raw JSON in this exact structure, with no markdown formatting or backticks:
[
  {
    "question": { "en": "English question?", "hi": "Hindi question?" },
    "options": [
      { "en": "Option 1", "hi": "विकल्प 1" },
      { "en": "Option 2", "hi": "विकल्प 2" },
      { "en": "Option 3", "hi": "विकल्प 3" },
      { "en": "Option 4", "hi": "विकल्प 4" }
    ],
    "correct": 0, // integer index of correct option
    "explanation": { "en": "Explanation in English.", "hi": "हिंदी में स्पष्टीकरण।" }
  }
]`;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();
    
    if (text.startsWith('```json')) {
      text = text.replace(/^```json\n/, '').replace(/\n```$/, '');
    }

    const questions = JSON.parse(text);
    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Quiz API Error:', error);
    return NextResponse.json({ error: 'Failed to generate quiz' }, { status: 500 });
  }
}
