import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Simple in-memory rate limiter (resets when server restarts/scales, but sufficient for basic protection)
const rateLimit = new Map();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

// Basic XSS sanitization
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input.replace(/[<>]/g, '').trim();
};

export async function POST(request) {
  try {
    // Rate Limiting
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const currentTime = Date.now();
    const requestData = rateLimit.get(ip) || { count: 0, startTime: currentTime };

    if (currentTime - requestData.startTime > RATE_LIMIT_WINDOW_MS) {
      requestData.count = 1;
      requestData.startTime = currentTime;
    } else {
      requestData.count++;
      if (requestData.count > MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json({ reply: 'Too many requests. Please wait a moment.' }, { status: 429 });
      }
    }
    rateLimit.set(ip, requestData);

    let { message, language, context, history } = await request.json();
    
    // Sanitize
    message = sanitizeInput(message);
    if (!message) return NextResponse.json({ reply: 'Empty message received.' }, { status: 400 });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { reply: language === 'hi'
          ? 'AI सहायक अभी उपलब्ध नहीं है। कृपया बाद में पुनः प्रयास करें।'
          : 'AI assistant is not available right now. Please try again later.' },
        { status: 200 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const systemPrompt = `You are Niti, an AI assistant for Indian elections. 
You help users understand the election process in simple, neutral language.
Current context: The user is on the "${context}" page.
Language preference: ${language === 'hi' ? 'Hindi' : 'English'}
Rules:
- Keep answers concise (under 200 words)
- Be politically neutral — focus on education, not persuasion
- Use simple language suitable for first-time voters
- If asked about specific candidates or parties, politely redirect to the process
- Include relevant facts and figures when helpful
- ${language === 'hi' ? 'Respond in Hindi' : 'Respond in English'}`;

    const chatHistory = (history || []).map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const chat = model.startChat({
      history: chatHistory,
      systemInstruction: systemPrompt,
    });

    const result = await chat.sendMessage(message);
    const reply = result.response.text();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Gemini API error:', error);
    return NextResponse.json(
      { reply: 'Sorry, I encountered an error. Please try again.' },
      { status: 200 }
    );
  }
}
