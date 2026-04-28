'use client';
import { createContext, useContext, useState, useCallback } from 'react';

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Hi! I'm your Niti assistant. Ask me anything about elections — registration, voting, candidates, or results!",
      timestamp: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const toggleChat = useCallback(() => setIsOpen(prev => !prev), []);

  const sendMessage = useCallback(async (content, language = 'en') => {
    const userMsg = { role: 'user', content, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content, language, context: currentPage, history: messages.slice(-6) })
      });

      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply, timestamp: Date.now() }]);
    } catch {
      // Fallback responses when API is unavailable
      const fallback = getFallbackResponse(content, language);
      setMessages(prev => [...prev, { role: 'assistant', content: fallback, timestamp: Date.now() }]);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, messages]);

  return (
    <ChatContext.Provider value={{ isOpen, setIsOpen, toggleChat, messages, sendMessage, isLoading, setCurrentPage }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
}

// Fallback responses when Gemini API is not available
function getFallbackResponse(input, lang) {
  const q = input.toLowerCase();
  const responses = {
    register: {
      en: "To register as a voter in India:\n1. Visit nvsp.in or your nearest Electoral Registration Office\n2. Fill out Form 6\n3. Submit with ID proof, address proof, and a photo\n4. You'll receive your Voter ID (EPIC) after verification\n\nYou must be 18+ on the qualifying date.",
      hi: "भारत में मतदाता के रूप में पंजीकरण करने के लिए:\n1. nvsp.in पर जाएं\n2. फॉर्म 6 भरें\n3. आईडी प्रूफ के साथ जमा करें\n4. सत्यापन के बाद वोटर आईडी मिलेगी"
    },
    document: {
      en: "Documents needed for voter registration:\n• Aadhaar Card\n• Passport-size photograph\n• Proof of address (utility bill, bank statement)\n• Age proof (for first-time voters)\n\nFor voting day, carry your EPIC card or any approved photo ID.",
      hi: "मतदाता पंजीकरण के लिए आवश्यक दस्तावेज:\n• आधार कार्ड\n• पासपोर्ट साइज फोटो\n• पते का प्रमाण\n• आयु प्रमाण"
    },
    miss: {
      en: "If you miss voting day, unfortunately you cannot vote after polling closes. There's no provision for late voting in India. That's why it's important to plan ahead!\n\nHowever, some voters can use postal ballots (service voters, senior citizens 80+, persons with disabilities).",
      hi: "अगर आप मतदान दिवस चूक जाते हैं, तो दुर्भाग्य से मतदान बंद होने के बाद वोट नहीं दे सकते।"
    },
    default: {
      en: "That's a great question about elections! I can help with:\n• Voter registration process\n• Documents needed\n• Voting day procedures\n• How counting works\n• Understanding results\n\nTry asking something specific like 'How do I register to vote?' or 'What documents do I need?'",
      hi: "यह चुनावों के बारे में एक अच्छा सवाल है! मैं मदद कर सकता हूं:\n• मतदाता पंजीकरण\n• आवश्यक दस्तावेज\n• मतदान प्रक्रिया\n\nकुछ विशिष्ट पूछें!"
    }
  };

  let key = 'default';
  if (q.includes('register') || q.includes('sign up') || q.includes('enroll')) key = 'register';
  else if (q.includes('document') || q.includes('id') || q.includes('proof')) key = 'document';
  else if (q.includes('miss') || q.includes('absent') || q.includes('skip')) key = 'miss';

  return responses[key][lang] || responses[key].en;
}
