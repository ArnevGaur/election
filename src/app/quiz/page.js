'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RotateCcw, CheckCircle2, XCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { quizQuestions } from '@/data/quizQuestions';
import { badges as badgeDefs } from '@/data/badges';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export default function QuizPage() {
  const { t, progress, recordFullQuizScore, mounted } = useApp();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  if (!mounted) return <div className="min-h-screen" />;

  const question = quizQuestions[currentQ];
  const total = quizQuestions.length;

  const handleAnswer = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    setShowExplanation(true);
    if (i === question.correct) setScore(p => p + 1);
    setAnswers(p => [...p, { selected: i, correct: question.correct, isCorrect: i === question.correct }]);
  };

  const handleNext = () => {
    if (currentQ < total - 1) {
      setCurrentQ(p => p + 1);
      setSelected(null);
      setAnswered(false);
      setShowExplanation(false);
    } else {
      recordFullQuizScore(score, total);
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0); setSelected(null); setAnswered(false);
    setScore(0); setAnswers([]); setFinished(false); setShowExplanation(false);
  };

  // Results screen
  if (finished) {
    const pct = Math.round((score / total) * 100);
    return (
      <div className="max-w-xl mx-auto px-5 py-16">
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="rounded-xl p-8 sm:p-10 text-center" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: 'var(--color-accent-subtle)' }}>
              <Trophy size={28} style={{ color: 'var(--color-accent)' }} />
            </div>
            <h2 className="text-[22px] font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
              {t({ en: 'Quiz Complete', hi: 'क्विज़ पूरा' })}
            </h2>
            <div className="text-[48px] font-extrabold my-3" style={{ color: 'var(--color-accent)' }}>{score}/{total}</div>
            <p className="text-[14px] mb-6" style={{ color: 'var(--color-text-secondary)' }}>
              {pct >= 80 ? t({ en: 'Outstanding! You\'re an election expert.', hi: 'शानदार! आप चुनाव विशेषज्ञ हैं।' })
                : pct >= 50 ? t({ en: 'Good job! Keep learning to improve.', hi: 'अच्छा काम! सीखते रहें।' })
                : t({ en: 'Keep going! Review the journey to learn more.', hi: 'जारी रखें! अधिक जानने के लिए यात्रा देखें।' })}
            </p>
            <div className="w-48 mx-auto mb-8">
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
                <motion.div className="h-full rounded-full" style={{ background: 'var(--color-accent)' }} initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8 }} />
              </div>
              <p className="text-[12px] mt-1.5" style={{ color: 'var(--color-text-tertiary)' }}>{pct}%</p>
            </div>
            <div className="mb-8">
              <p className="text-[12px] font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--color-text-tertiary)' }}>
                {t({ en: 'Badges', hi: 'बैज' })}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {badgeDefs.map(b => <Badge key={b.id} badge={b} unlocked={progress.badges.includes(b.id)} />)}
              </div>
            </div>
            <Button onClick={handleRestart} icon={RotateCcw} variant="secondary">{t({ en: 'Try Again', hi: 'फिर से' })}</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-5 py-12">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <p className="text-[13px] font-semibold tracking-wide uppercase mb-2" style={{ color: 'var(--color-accent)' }}>
          {t({ en: 'Test Your Knowledge', hi: 'अपना ज्ञान जांचें' })}
        </p>
        <h1 className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
          {t({ en: 'Election Quiz', hi: 'चुनाव क्विज़' })}
        </h1>
      </motion.div>

      {/* Progress */}
      <div className="flex items-center justify-between text-[13px] mb-3">
        <span style={{ color: 'var(--color-text-tertiary)' }}>{currentQ + 1} / {total}</span>
        <span className="font-semibold" style={{ color: 'var(--color-accent)' }}>{t({ en: 'Score', hi: 'स्कोर' })}: {score}</span>
      </div>
      <div className="w-full h-1.5 rounded-full overflow-hidden mb-6" style={{ background: 'var(--color-border)' }}>
        <motion.div className="h-full rounded-full" style={{ background: 'var(--color-accent)' }} animate={{ width: `${((currentQ + 1) / total) * 100}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentQ} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }}>
          <div className="rounded-xl p-6" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <p className="text-[16px] font-semibold mb-5" style={{ color: 'var(--color-text-primary)' }}>{t(question.question)}</p>
            <div className="space-y-2.5">
              {question.options.map((opt, i) => {
                const isCorrect = answered && i === question.correct;
                const isWrong = answered && i === selected && i !== question.correct;
                return (
                  <motion.button
                    key={i}
                    whileHover={!answered ? { x: 2 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answered}
                    className="w-full flex items-center gap-3 p-3.5 rounded-lg text-left cursor-pointer border transition-all text-[14px]"
                    style={{
                      background: isCorrect ? '#dcfce7' : isWrong ? '#fef2f2' : selected === i ? 'var(--color-accent-subtle)' : 'var(--color-surface)',
                      borderColor: isCorrect ? '#86efac' : isWrong ? '#fca5a5' : selected === i ? 'var(--color-accent)' : 'var(--color-border)',
                      color: isCorrect ? '#166534' : isWrong ? '#991b1b' : 'var(--color-text-primary)',
                    }}
                  >
                    <span className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 text-[12px] font-bold" style={{
                      background: isCorrect ? '#bbf7d0' : isWrong ? '#fecaca' : 'var(--color-bg-tertiary)',
                      color: isCorrect ? '#166534' : isWrong ? '#991b1b' : 'var(--color-text-tertiary)',
                    }}>
                      {isCorrect ? <CheckCircle2 size={14} /> : isWrong ? <XCircle size={14} /> : String.fromCharCode(65 + i)}
                    </span>
                    {t(opt)}
                  </motion.button>
                );
              })}
            </div>
            <AnimatePresence>
              {showExplanation && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="overflow-hidden mt-4">
                  <div className="p-3.5 rounded-lg flex items-start gap-2" style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border-subtle)' }}>
                    <Sparkles size={14} style={{ color: 'var(--color-accent)' }} className="mt-0.5 flex-shrink-0" />
                    <p className="text-[13px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{t(question.explanation)}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {answered && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 flex justify-end">
                <Button onClick={handleNext} icon={ArrowRight} iconRight size="sm">
                  {currentQ < total - 1 ? t({ en: 'Next', hi: 'अगला' }) : t({ en: 'See Results', hi: 'परिणाम' })}
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
