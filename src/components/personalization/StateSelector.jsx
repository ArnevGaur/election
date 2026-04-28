'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Globe, Calendar, ChevronDown } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { stateData, stateList } from '@/data/stateData';

export default function StateSelector() {
  const { selectedState, setSelectedState, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const info = selectedState ? stateData[selectedState] : null;

  return (
    <div className="rounded-xl p-4" style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border-subtle)' }}>
      <div className="flex items-center gap-2 mb-3">
        <MapPin size={14} style={{ color: 'var(--color-accent)' }} />
        <h4 className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: 'var(--color-text-tertiary)' }}>
          {t({ en: 'Your State', hi: 'आपका राज्य' })}
        </h4>
      </div>

      <div className="relative mb-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] cursor-pointer border transition-colors"
          style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: selectedState ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)' }}
        >
          <span>{selectedState || t({ en: 'Select state', hi: 'राज्य चुनें' })}</span>
          <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} style={{ color: 'var(--color-text-tertiary)' }} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="absolute top-full left-0 right-0 mt-1 rounded-lg max-h-40 overflow-y-auto z-20"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)' }}
            >
              {stateList.map(state => (
                <button
                  key={state}
                  onClick={() => { setSelectedState(state); setIsOpen(false); }}
                  className="w-full text-left px-3 py-2 text-[13px] cursor-pointer border-none bg-transparent transition-colors"
                  style={{ color: selectedState === state ? 'var(--color-accent)' : 'var(--color-text-secondary)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--color-bg-secondary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {state}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {info && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-2.5 overflow-hidden">
            <InfoRow icon={Globe} label={t({ en: 'Authority', hi: 'प्राधिकरण' })} value={info.authority} link={info.website} />
            <InfoRow icon={Phone} label={t({ en: 'Helpline', hi: 'हेल्पलाइन' })} value={info.helpline} />
            <InfoRow icon={Calendar} label={t({ en: 'Deadline', hi: 'समय सीमा' })} value={info.registrationDeadline} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value, link }) {
  return (
    <div className="flex items-start gap-2.5 text-[12px]">
      <Icon size={13} style={{ color: 'var(--color-text-tertiary)' }} className="mt-0.5 flex-shrink-0" />
      <div>
        <span style={{ color: 'var(--color-text-tertiary)' }}>{label}: </span>
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer" className="no-underline font-medium" style={{ color: 'var(--color-accent)' }}>{value}</a>
        ) : (
          <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{value}</span>
        )}
      </div>
    </div>
  );
}
