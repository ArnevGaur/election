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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleChat}
            className="fixed bottom-5 right-5 w-12 h-12 rounded-full flex items-center justify-center z-50 cursor-pointer border-none"
            style={{ background: 'var(--color-accent)', boxShadow: 'var(--shadow-lg)' }}
            aria-label="Open chat"
          >
            <MessageCircle size={20} color="#fff" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-4 right-4 w-[calc(100%-2rem)] sm:w-[380px] h-[480px] rounded-2xl flex flex-col z-50 overflow-hidden"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-xl)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-accent)' }}>
                  <MessageCircle size={14} color="#fff" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    {t({ en: 'Election Assistant', hi: 'चुनाव सहायक' })}
                  </p>
                  <p className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
                    {t({ en: 'Ask anything about elections', hi: 'चुनावों के बारे में कुछ भी पूछें' })}
                  </p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="w-7 h-7 rounded-md flex items-center justify-center cursor-pointer border-none transition-colors"
                style={{ background: 'transparent' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--color-bg-tertiary)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <X size={15} style={{ color: 'var(--color-text-tertiary)' }} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="max-w-[82%] px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-line"
                    style={msg.role === 'user' ? {
                      background: 'var(--color-accent)',
                      color: '#fff',
                      borderRadius: '16px 16px 4px 16px',
                    } : {
                      background: 'var(--color-bg-secondary)',
                      color: 'var(--color-text-primary)',
                      borderRadius: '16px 16px 16px 4px',
                    }}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl flex gap-1.5" style={{ background: 'var(--color-bg-secondary)' }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: 'var(--color-text-tertiary)' }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: 'var(--color-text-tertiary)', animationDelay: '0.15s' }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: 'var(--color-text-tertiary)', animationDelay: '0.3s' }} />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {quickReplies.map((qr, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(t(qr), language)}
                    className="px-3 py-1.5 text-[12px] rounded-full cursor-pointer transition-colors border"
                    style={{ background: 'transparent', borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
                  >
                    {t(qr)}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex items-center gap-2 rounded-xl px-3 py-1" style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border-subtle)' }}>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder={t({ en: 'Ask about elections...', hi: 'चुनाव के बारे में पूछें...' })}
                  className="flex-1 py-2 text-[13px] outline-none border-none bg-transparent"
                  style={{ color: 'var(--color-text-primary)' }}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer border-none transition-opacity disabled:opacity-30"
                  style={{ background: 'var(--color-accent)' }}
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
