'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { HelpCircle, X, ChevronDown, ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { timelineEvents, whatIfScenarios } from '@/data/timelineEvents';

export default function TimelinePage() {
  const { t, simpleMode, mounted } = useApp();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showWhatIf, setShowWhatIf] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState(null);

  if (!mounted) return <div className="min-h-screen" />;

  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <p className="text-[13px] font-semibold tracking-wide uppercase mb-2" style={{ color: 'var(--color-accent)' }}>
          {t({ en: 'Visual Overview', hi: 'विज़ुअल अवलोकन' })}
        </p>
        <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tight mb-2" style={{ color: 'var(--color-text-primary)' }}>
          {t({ en: 'Election Timeline', hi: 'चुनाव टाइमलाइन' })}
        </h1>
        <p className="text-[15px] max-w-lg" style={{ color: 'var(--color-text-secondary)' }}>
          {t({ en: 'From announcement to results — see how an election unfolds.', hi: 'घोषणा से परिणाम तक — देखें चुनाव कैसे होता है।' })}
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative mb-12">
        {/* Desktop: horizontal */}
        <div className="hidden md:block">
          {/* Track */}
          <div className="relative h-[2px] rounded-full mb-2" style={{ background: 'var(--color-border)' }}>
            <motion.div
              className="absolute top-0 left-0 h-full rounded-full"
              style={{ background: 'var(--color-accent)' }}
              initial={{ width: '0%' }}
              animate={{ width: selectedEvent !== null ? `${((selectedEvent + 1) / timelineEvents.length) * 100}%` : '0%' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
          <div className="grid grid-cols-6 gap-2">
            {timelineEvents.map((event, i) => {
              const Icon = LucideIcons[event.icon] || LucideIcons.Circle;
              const isSelected = selectedEvent === i;
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="text-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedEvent(isSelected ? null : i)}
                    className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center cursor-pointer border transition-all duration-150"
                    style={{
                      background: isSelected ? 'var(--color-accent-subtle)' : 'var(--color-surface)',
                      borderColor: isSelected ? 'var(--color-accent)' : 'var(--color-border)',
                    }}
                  >
                    <Icon size={20} style={{ color: isSelected ? 'var(--color-accent)' : 'var(--color-text-tertiary)' }} />
                  </motion.button>
                  <p className="text-[12px] font-medium mt-2.5" style={{ color: isSelected ? 'var(--color-accent)' : 'var(--color-text-primary)' }}>{t(event.title)}</p>
                  <p className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>{t(event.date)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden space-y-0">
          {timelineEvents.map((event, i) => {
            const Icon = LucideIcons[event.icon] || LucideIcons.Circle;
            const isSelected = selectedEvent === i;
            return (
              <div key={event.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => setSelectedEvent(isSelected ? null : i)}
                    className="w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer border transition-all flex-shrink-0"
                    style={{
                      background: isSelected ? 'var(--color-accent-subtle)' : 'var(--color-surface)',
                      borderColor: isSelected ? 'var(--color-accent)' : 'var(--color-border)',
                    }}
                  >
                    <Icon size={16} style={{ color: isSelected ? 'var(--color-accent)' : 'var(--color-text-tertiary)' }} />
                  </button>
                  {i < timelineEvents.length - 1 && (
                    <div className="w-[2px] h-12 my-1 rounded-full" style={{ background: 'var(--color-border)' }} />
                  )}
                </div>
                <div className="pb-6 pt-2 flex-1">
                  <button onClick={() => setSelectedEvent(isSelected ? null : i)} className="text-left bg-transparent border-none cursor-pointer p-0">
                    <p className="text-[14px] font-semibold" style={{ color: isSelected ? 'var(--color-accent)' : 'var(--color-text-primary)' }}>{t(event.title)}</p>
                    <p className="text-[12px]" style={{ color: 'var(--color-text-tertiary)' }}>{t(event.date)}</p>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {selectedEvent !== null && (
          <motion.div key={selectedEvent} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="mb-10">
            <div className="max-w-3xl mx-auto rounded-xl p-6" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {(() => { const Icon = LucideIcons[timelineEvents[selectedEvent].icon]; return <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-accent-subtle)' }}><Icon size={18} style={{ color: 'var(--color-accent)' }} /></div>; })()}
                  <div>
                    <h3 className="text-[16px] font-bold" style={{ color: 'var(--color-text-primary)' }}>{t(timelineEvents[selectedEvent].title)}</h3>
                    <p className="text-[12px]" style={{ color: 'var(--color-text-tertiary)' }}>{t(timelineEvents[selectedEvent].date)}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedEvent(null)} className="w-7 h-7 rounded-md flex items-center justify-center cursor-pointer border-none" style={{ background: 'transparent' }}>
                  <X size={15} style={{ color: 'var(--color-text-tertiary)' }} />
                </button>
              </div>
              <p className="text-[14px] leading-[1.7] mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                {simpleMode ? t(timelineEvents[selectedEvent].simple) : t(timelineEvents[selectedEvent].description)}
              </p>
              <div className="space-y-2">
                {timelineEvents[selectedEvent].details.map((d, di) => (
                  <div key={di} className="flex items-center gap-2 text-[13px]" style={{ color: 'var(--color-text-secondary)' }}>
                    <ChevronRight size={12} style={{ color: 'var(--color-accent)' }} /> {t(d)}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* What If */}
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => setShowWhatIf(!showWhatIf)}
          className="w-full flex items-center justify-between p-4 rounded-xl cursor-pointer border transition-all"
          style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
          onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
        >
          <div className="flex items-center gap-2.5">
            <HelpCircle size={16} style={{ color: 'var(--color-accent)' }} />
            <span className="text-[14px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              {t({ en: 'What Happens If...?', hi: 'अगर ऐसा हो तो...?' })}
            </span>
          </div>
          <motion.div animate={{ rotate: showWhatIf ? 180 : 0 }}>
            <ChevronDown size={16} style={{ color: 'var(--color-text-tertiary)' }} />
          </motion.div>
        </button>

        <AnimatePresence>
          {showWhatIf && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mt-3 space-y-2">
              {whatIfScenarios.map(s => (
                <div
                  key={s.id}
                  className="rounded-lg p-4 cursor-pointer transition-all border"
                  style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                  onClick={() => setSelectedScenario(selectedScenario === s.id ? null : s.id)}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-xs)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                >
                  <p className="text-[14px] font-medium" style={{ color: 'var(--color-text-primary)' }}>{t(s.question)}</p>
                  <AnimatePresence>
                    {selectedScenario === s.id && (
                      <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="text-[13px] leading-relaxed mt-2 overflow-hidden" style={{ color: 'var(--color-text-secondary)' }}>
                        {t(s.answer)}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
