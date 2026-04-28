'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, ArrowUp } from 'lucide-react';
import { useChat } from '@/context/ChatContext';
import { useApp } from '@/context/AppContext';

const quickReplies = [
  { en: "How do I register?", hi: "मैं कैसे पंजीकरण करूं?" },
  { en: "Documents needed?", hi: "कौन से दस्तावेज चाहिए?" },
  { en: "What if I miss voting?", hi: "अगर मैं वोटिंग चूक जाऊं?" },
];

export default function ChatWidget() {
  const { isOpen, toggleChat, messages, sendMessage, isLoading } = useChat();
  const { language, t, mounted } = useApp();
  const [input, setInput] = useState('');
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  useEffect(() => { if (isOpen) setTimeout(() => inputRef.current?.focus(), 100); }, [isOpen]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input.trim(), language);
    setInput('');
  };

  if (!mounted) return null;

  return (
    <>
      {/* Floating trigger */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleChat}
            className="fixed bottom-5 right-5 w-13 h-13 rounded-2xl flex items-center justify-center z-50 cursor-pointer border-none animate-glow"
            style={{ background: 'var(--grad-primary)', width: '52px', height: '52px' }}
            aria-label="Open chat"
          >
            <MessageCircle size={22} color="#fff" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-4 right-4 w-[calc(100%-2rem)] sm:w-[400px] h-[500px] rounded-2xl flex flex-col z-50 overflow-hidden glass-card"
            style={{ boxShadow: 'var(--shadow-xl), 0 0 40px rgba(168,85,247,0.1)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'var(--grad-primary)' }}>
                  <MessageCircle size={15} color="#fff" />
                </div>
                <div>
                  <p className="text-[13px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
                    {t({ en: 'Election Assistant', hi: 'चुनाव सहायक' })}
                  </p>
                  <p className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
                    {t({ en: 'AI-powered · Always available', hi: 'AI-संचालित · हमेशा उपलब्ध' })}
                  </p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer border-none transition-all duration-200"
                style={{ background: 'transparent' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <X size={16} style={{ color: 'var(--color-text-tertiary)' }} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="max-w-[82%] px-4 py-3 text-[13px] leading-relaxed whitespace-pre-line"
                    style={msg.role === 'user' ? {
                      background: 'var(--grad-primary)',
                      color: '#fff',
                      borderRadius: '16px 16px 4px 16px',
                    } : {
                      background: 'rgba(255,255,255,0.04)',
                      color: 'var(--color-text-primary)',
                      borderRadius: '16px 16px 16px 4px',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl flex gap-1.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--color-border)' }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: '#a855f7' }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: '#6366f1', animationDelay: '0.15s' }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: '#3b82f6', animationDelay: '0.3s' }} />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 2 && (
              <div className="px-5 pb-2 flex flex-wrap gap-1.5">
                {quickReplies.map((qr, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(t(qr), language)}
                    className="px-3 py-1.5 text-[12px] rounded-lg cursor-pointer transition-all duration-200"
                    style={{ background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)'; e.currentTarget.style.color = '#c084fc'; e.currentTarget.style.background = 'rgba(168,85,247,0.06)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-secondary)'; e.currentTarget.style.background = 'transparent'; }}
                  >
                    {t(qr)}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3" style={{ borderTop: '1px solid var(--color-border)' }}>
              <div className="flex items-center gap-2 rounded-xl px-4 py-1" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border)' }}>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder={t({ en: 'Ask about elections...', hi: 'चुनाव के बारे में पूछें...' })}
                  className="flex-1 py-2.5 text-[13px] outline-none border-none bg-transparent"
                  style={{ color: 'var(--color-text-primary)' }}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer border-none transition-all duration-200 disabled:opacity-30"
                  style={{ background: 'var(--grad-primary)' }}
                >
                  <ArrowUp size={14} color="#fff" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
