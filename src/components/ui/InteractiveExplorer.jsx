'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Users, Vote, Building } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const statesData = [
  { id: 'up', name: { en: 'Uttar Pradesh', hi: 'उत्तर प्रदेश' }, seats: 80, voters: '15.3 Cr', phases: 7 },
  { id: 'mh', name: { en: 'Maharashtra', hi: 'महाराष्ट्र' }, seats: 48, voters: '9.2 Cr', phases: 5 },
  { id: 'wb', name: { en: 'West Bengal', hi: 'पश्चिम बंगाल' }, seats: 42, voters: '7.5 Cr', phases: 7 },
  { id: 'br', name: { en: 'Bihar', hi: 'बिहार' }, seats: 40, voters: '7.6 Cr', phases: 7 },
  { id: 'tn', name: { en: 'Tamil Nadu', hi: 'तमिलनाडु' }, seats: 39, voters: '6.2 Cr', phases: 1 },
  { id: 'mp', name: { en: 'Madhya Pradesh', hi: 'मध्य प्रदेश' }, seats: 29, voters: '5.6 Cr', phases: 4 },
];

export default function InteractiveExplorer() {
  const { t } = useApp();
  const [activeState, setActiveState] = useState(statesData[0]);

  return (
    <div className="rounded-2xl overflow-hidden surface-raised flex flex-col md:flex-row min-h-[400px] noise border border-[var(--color-border)]">
      {/* Sidebar: States List */}
      <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-[var(--color-border)] p-4 flex flex-col gap-2 overflow-y-auto max-h-[300px] md:max-h-[500px]">
        <h3 className="text-[13px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2 px-2">
          {t({ en: 'Select Region', hi: 'क्षेत्र चुनें' })}
        </h3>
        {statesData.map((state) => (
          <button
            key={state.id}
            onClick={() => setActiveState(state)}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-3 ${
              activeState.id === state.id
                ? 'bg-[var(--color-accent-subtle)] border border-[var(--color-accent-muted)]'
                : 'bg-transparent border border-transparent hover:bg-[var(--color-surface-raised)]'
            }`}
          >
            <MapPin size={16} className={activeState.id === state.id ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-tertiary)]'} />
            <span className={`text-[14px] font-medium ${activeState.id === state.id ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}>
              {t(state.name)}
            </span>
          </button>
        ))}
      </div>

      {/* Main Content: State Data */}
      <div className="w-full md:w-2/3 p-6 md:p-10 relative overflow-hidden flex flex-col justify-center">
        {/* Abstract Map Background Graphic */}
        <motion.div
          className="absolute right-[-10%] top-[-10%] opacity-5 pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
        >
          <svg width="400" height="400" viewBox="0 0 200 200" fill="none">
            <path d="M100 0L200 50V150L100 200L0 150V50L100 0Z" fill="currentColor" />
          </svg>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeState.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-2">
              {t(activeState.name)}
            </h2>
            <p className="text-[var(--color-accent)] font-semibold text-[14px] mb-8">
              {t({ en: 'Constituency Overview', hi: 'निर्वाचन क्षेत्र अवलोकन' })}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Stat Card 1 */}
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-subtle)] text-[var(--color-accent)] flex items-center justify-center">
                  <Building size={20} />
                </div>
                <div>
                  <p className="text-[12px] text-[var(--color-text-tertiary)] uppercase font-semibold mb-1">
                    {t({ en: 'Lok Sabha Seats', hi: 'लोकसभा सीटें' })}
                  </p>
                  <p className="text-2xl font-bold text-[var(--color-text-primary)]">{activeState.seats}</p>
                </div>
              </div>

              {/* Stat Card 2 */}
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-subtle)] text-[var(--color-accent)] flex items-center justify-center">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-[12px] text-[var(--color-text-tertiary)] uppercase font-semibold mb-1">
                    {t({ en: 'Eligible Voters', hi: 'योग्य मतदाता' })}
                  </p>
                  <p className="text-2xl font-bold text-[var(--color-text-primary)]">{activeState.voters}</p>
                </div>
              </div>

              {/* Stat Card 3 */}
              <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 flex items-start gap-4 sm:col-span-2">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-subtle)] text-[var(--color-accent)] flex items-center justify-center">
                  <Vote size={20} />
                </div>
                <div>
                  <p className="text-[12px] text-[var(--color-text-tertiary)] uppercase font-semibold mb-1">
                    {t({ en: 'Election Phases', hi: 'चुनाव चरण' })}
                  </p>
                  <p className="text-2xl font-bold text-[var(--color-text-primary)]">{activeState.phases}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
