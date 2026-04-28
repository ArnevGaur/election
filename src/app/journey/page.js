'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { ChevronDown, ChevronUp, Volume2, VolumeX, CheckCircle2, Lightbulb, BookOpen, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { electionSteps } from '@/data/electionSteps';
import { useVoiceNarration } from '@/hooks/useVoiceNarration';
import Button from '@/components/ui/Button';
import Toggle from '@/components/ui/Toggle';
import StateSelector from '@/components/personalization/StateSelector';
import Badge from '@/components/ui/Badge';
import { badges as badgeDefs } from '@/data/badges';

export default function JourneyPage() {
  const { t, language, simpleMode, setSimpleMode, progress, completeStep, recordQuizScore, mounted } = useApp();
  const [activeStep, setActiveStep] = useState(0);
  const [eli10, setEli10] = useState(false);

  if (!mounted) return <div className="min-h-screen" />;

  const step = electionSteps[activeStep];
  const isCompleted = (id) => progress.completedSteps.includes(id);
  const progressPercent = Math.round((progress.completedSteps.length / electionSteps.length) * 100);

  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <p className="text-[13px] font-semibold tracking-wide uppercase mb-2" style={{ color: 'var(--color-accent)' }}>
          {t({ en: 'Interactive Guide', hi: 'इंटरैक्टिव गाइड' })}
        </p>
        <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tight mb-2" style={{ color: 'var(--color-text-primary)' }}>
          {t({ en: 'Your Election Journey', hi: 'आपकी चुनाव यात्रा' })}
        </h1>
        <p className="text-[15px] max-w-lg" style={{ color: 'var(--color-text-secondary)' }}>
          {t({ en: 'Follow each step to understand the complete election process.', hi: 'पूरी चुनाव प्रक्रिया समझने के लिए हर चरण का पालन करें।' })}
        </p>
      </motion.div>

      {/* Progress + Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-8 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-32 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
              <motion.div className="h-full rounded-full" style={{ background: 'var(--color-accent)' }} animate={{ width: `${progressPercent}%` }} />
            </div>
            <span className="text-[13px] font-semibold" style={{ color: 'var(--color-accent)' }}>{progressPercent}%</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Toggle enabled={eli10} onChange={setEli10} label={t({ en: 'Explain Simply', hi: 'सरल भाषा' })} size="sm" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Step nav */}
          <div className="space-y-1">
            {electionSteps.map((s, i) => {
              const Icon = LucideIcons[s.icon] || LucideIcons.Circle;
              const completed = isCompleted(s.id);
              const active = i === activeStep;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveStep(i)}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left cursor-pointer border-none transition-all duration-150"
                  style={{
                    background: active ? 'var(--color-accent-subtle)' : 'transparent',
                    borderLeft: active ? '2px solid var(--color-accent)' : '2px solid transparent',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--color-bg-secondary)'; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{
                    background: completed ? '#dcfce7' : active ? 'var(--color-accent-subtle)' : 'var(--color-bg-tertiary)',
                  }}>
                    {completed ? <CheckCircle2 size={15} color="#16a34a" /> : <Icon size={15} style={{ color: active ? 'var(--color-accent)' : 'var(--color-text-tertiary)' }} />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold truncate" style={{ color: active ? 'var(--color-accent)' : 'var(--color-text-primary)' }}>
                      {t(s.title)}
                    </p>
                    <p className="text-[11px] truncate" style={{ color: 'var(--color-text-tertiary)' }}>{t(s.subtitle)}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Badges */}
          <div className="rounded-xl p-4" style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border-subtle)' }}>
            <h4 className="text-[12px] font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--color-text-tertiary)' }}>
              {t({ en: 'Badges', hi: 'बैज' })}
            </h4>
            <div className="flex flex-wrap gap-3">
              {badgeDefs.slice(0, 4).map(b => (
                <Badge key={b.id} badge={b} unlocked={progress.badges.includes(b.id)} size="sm" />
              ))}
            </div>
          </div>

          {/* State */}
          <StateSelector />
        </div>

        {/* Content */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <StepContent key={step.id} step={step} eli10={eli10} onComplete={completeStep} onQuizComplete={recordQuizScore} isCompleted={isCompleted(step.id)} onNext={() => setActiveStep(prev => Math.min(prev + 1, electionSteps.length - 1))} isLast={activeStep === electionSteps.length - 1} />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function StepContent({ step, eli10, onComplete, onQuizComplete, isCompleted, onNext, isLast }) {
  const { t, language } = useApp();
  const { isSpeaking, toggle: toggleVoice } = useVoiceNarration();
  const [showWhy, setShowWhy] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const Icon = LucideIcons[step.icon] || LucideIcons.Circle;
  const content = eli10 ? t(step.simple) : t(step.description);

  const handleQuizSubmit = () => {
    const correct = step.quiz.reduce((acc, q, i) => acc + (quizAnswers[i] === q.correct ? 1 : 0), 0);
    onQuizComplete(step.slug, correct, step.quiz.length);
    onComplete(step.id);
    setQuizSubmitted(true);
  };

  return (
    <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }}>
      <div className="rounded-xl p-6 sm:p-8" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-accent-subtle)' }}>
              <Icon size={22} style={{ color: 'var(--color-accent)' }} />
            </div>
            <div>
              <h2 className="text-[18px] sm:text-[22px] font-bold" style={{ color: 'var(--color-text-primary)' }}>{t(step.title)}</h2>
              <p className="text-[13px]" style={{ color: 'var(--color-text-tertiary)' }}>{t(step.subtitle)}</p>
            </div>
          </div>
          <button onClick={() => toggleVoice(content, language)} className="w-8 h-8 rounded-md flex items-center justify-center cursor-pointer border-none" style={{ background: 'transparent' }}>
            {isSpeaking ? <VolumeX size={16} style={{ color: 'var(--color-accent)' }} /> : <Volume2 size={16} style={{ color: 'var(--color-text-tertiary)' }} />}
          </button>
        </div>

        {isCompleted && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-medium mb-5" style={{ background: '#dcfce7', color: '#16a34a' }}>
            <CheckCircle2 size={14} /> {t({ en: 'Completed', hi: 'पूरा हो गया' })}
          </div>
        )}

        <p className="text-[15px] leading-[1.7] mb-6" style={{ color: 'var(--color-text-secondary)' }}>{content}</p>

        {/* Documents */}
        {step.documents && t(step.documents)?.length > 0 && (
          <div className="mb-6 p-4 rounded-lg" style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border-subtle)' }}>
            <h4 className="text-[13px] font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
              <BookOpen size={14} style={{ color: 'var(--color-accent)' }} /> {t({ en: 'Documents Required', hi: 'आवश्यक दस्तावेज' })}
            </h4>
            <ul className="space-y-1.5">
              {t(step.documents).map((doc, i) => (
                <li key={i} className="text-[13px] flex items-center gap-2" style={{ color: 'var(--color-text-secondary)' }}>
                  <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--color-accent)' }} /> {doc}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Why it matters */}
        <button onClick={() => setShowWhy(!showWhy)} className="flex items-center gap-2 text-[13px] font-medium mb-3 cursor-pointer bg-transparent border-none p-0" style={{ color: 'var(--color-accent)' }}>
          <Lightbulb size={14} /> {t({ en: 'Why This Matters', hi: 'यह क्यों मायने रखता है' })} {showWhy ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
        <AnimatePresence>
          {showWhy && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-6">
              <div className="p-4 rounded-lg" style={{ background: '#fefce8', border: '1px solid #fef08a' }}>
                <p className="text-[13px] leading-relaxed" style={{ color: '#854d0e' }}>{t(step.whyItMatters)}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quiz */}
        {step.quiz.length > 0 && (
          <div className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <h4 className="text-[14px] font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
              {t({ en: '✓ Quick Check', hi: '✓ त्वरित जांच' })}
            </h4>
            <div className="space-y-4">
              {step.quiz.map((q, qi) => (
                <div key={qi} className="space-y-2">
                  <p className="text-[14px] font-medium" style={{ color: 'var(--color-text-primary)' }}>{t(q.question)}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, oi) => {
                      const selected = quizAnswers[qi] === oi;
                      const correct = quizSubmitted && oi === q.correct;
                      const wrong = quizSubmitted && selected && oi !== q.correct;
                      return (
                        <button
                          key={oi}
                          onClick={() => !quizSubmitted && setQuizAnswers(prev => ({ ...prev, [qi]: oi }))}
                          disabled={quizSubmitted}
                          className="p-3 rounded-lg text-[13px] text-left cursor-pointer transition-all border"
                          style={{
                            background: correct ? '#dcfce7' : wrong ? '#fef2f2' : selected ? 'var(--color-accent-subtle)' : 'var(--color-surface)',
                            borderColor: correct ? '#86efac' : wrong ? '#fca5a5' : selected ? 'var(--color-accent)' : 'var(--color-border)',
                            color: correct ? '#166534' : wrong ? '#991b1b' : 'var(--color-text-primary)',
                          }}
                        >
                          {t(opt)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            {!quizSubmitted ? (
              <div className="mt-4">
                <Button onClick={handleQuizSubmit} disabled={Object.keys(quizAnswers).length < step.quiz.length} size="sm">
                  {t({ en: 'Check Answers', hi: 'उत्तर जांचें' })}
                </Button>
              </div>
            ) : (
              <div className="mt-4 flex items-center gap-3">
                <span className="text-[13px] font-medium" style={{ color: '#16a34a' }}>
                  ✓ {step.quiz.reduce((a, q, i) => a + (quizAnswers[i] === q.correct ? 1 : 0), 0)}/{step.quiz.length} {t({ en: 'correct', hi: 'सही' })}
                </span>
                {!isLast && <Button variant="ghost" size="sm" icon={ArrowRight} iconRight onClick={onNext}>{t({ en: 'Next', hi: 'अगला' })}</Button>}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
