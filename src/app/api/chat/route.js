import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { message, language, context, history } = await request.json();

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

    const systemPrompt = `You are an Election Guide Assistant for Indian elections. 
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
