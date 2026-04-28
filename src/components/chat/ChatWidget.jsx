'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ArrowUp } from 'lucide-react';
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
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={toggleChat}
            className="fixed bottom-5 right-5 w-12 h-12 rounded-xl flex items-center justify-center z-50 cursor-pointer border-none"
            style={{ background: 'var(--color-accent)', color: '#0c0c0e', boxShadow: 'var(--shadow-btn)' }}
            aria-label="Open chat"
          >
            <MessageCircle size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 w-[calc(100%-2rem)] sm:w-[380px] h-[480px] rounded-2xl flex flex-col z-50 overflow-hidden surface-raised"
          >
            <div className="flex items-center justify-between px-4 py-3.5" style={{ borderBottom: '1px solid var(--color-border)' }}>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-accent)', color: '#0c0c0e' }}>
                  <MessageCircle size={13} />
                </div>
                <div>
                  <p className="text-[13px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    {t({ en: 'Election Assistant', hi: 'चुनाव सहायक' })}
                  </p>
                  <p className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
                    {t({ en: 'Ask anything', hi: 'कुछ भी पूछें' })}
                  </p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="w-7 h-7 rounded-md flex items-center justify-center cursor-pointer border-none transition-colors"
                style={{ background: 'transparent' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--color-surface-raised)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <X size={14} style={{ color: 'var(--color-text-tertiary)' }} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="max-w-[82%] px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-line"
                    style={msg.role === 'user' ? {
                      background: 'var(--color-accent)',
                      color: '#0c0c0e',
                      borderRadius: '14px 14px 4px 14px',
                      fontWeight: 500,
                    } : {
                      background: 'var(--color-surface-raised)',
                      color: 'var(--color-text-primary)',
                      borderRadius: '14px 14px 14px 4px',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-xl flex gap-1.5" style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)' }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: 'var(--color-accent)' }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: 'var(--color-accent)', animationDelay: '0.15s' }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: 'var(--color-accent)', animationDelay: '0.3s' }} />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {quickReplies.map((qr, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(t(qr), language)}
                    className="px-3 py-1.5 text-[12px] rounded-lg cursor-pointer transition-colors duration-200"
                    style={{ background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text-tertiary)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-border-hover)'; e.currentTarget.style.color = 'var(--color-text-primary)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-tertiary)'; }}
                  >
                    {t(qr)}
                  </button>
                ))}
              </div>
            )}

            <div className="p-3" style={{ borderTop: '1px solid var(--color-border)' }}>
              <div className="flex items-center gap-2 rounded-xl px-3 py-1" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
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
                  className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer border-none disabled:opacity-25"
                  style={{ background: 'var(--color-accent)', color: '#0c0c0e' }}
                >
                  <ArrowUp size={13} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
