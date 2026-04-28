'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RotateCcw, CheckCircle2, XCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { quizQuestions } from '@/data/quizQuestions';
import { badges as badgeDefs } from '@/data/badges';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
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

  const handleAnswer = (optIndex) => {
    if (answered) return;
    setSelected(optIndex);
    setAnswered(true);
    setShowExplanation(true);
    const isCorrect = optIndex === question.correct;
    if (isCorrect) setScore(prev => prev + 1);
    setAnswers(prev => [...prev, { questionId: question.id, selected: optIndex, correct: question.correct, isCorrect }]);
  };

  const handleNext = () => {
    if (currentQ < total - 1) {
      setCurrentQ(prev => prev + 1);
      setSelected(null);
      setAnswered(false);
      setShowExplanation(false);
    } else {
      recordFullQuizScore(score, total);
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setAnswers([]);
    setFinished(false);
    setShowExplanation(false);
  };

  if (finished) {
    const percent = Math.round((score / total) * 100);
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <Card hover={false} className="!p-10 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Trophy size={36} className="text-white" />
              </div>
            </motion.div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {t({ en: 'Quiz Complete!', hi: 'क्विज़ पूरा!' })}
            </h2>

            <div className="text-5xl font-extrabold gradient-text my-4">{score}/{total}</div>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              {percent >= 80
                ? t({ en: '🎉 Outstanding! You\'re an election expert!', hi: '🎉 शानदार! आप एक चुनाव विशेषज्ञ हैं!' })
                : percent >= 50
                ? t({ en: '👍 Good job! Keep learning to improve.', hi: '👍 अच्छा काम! सीखते रहें।' })
                : t({ en: '📚 Keep going! Review the journey to learn more.', hi: '📚 जारी रखें! अधिक जानने के लिए यात्रा देखें।' })
              }
            </p>

            {/* Progress bar */}
            <div className="w-full max-w-xs mx-auto mb-8">
              <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" initial={{ width: 0 }} animate={{ width: `${percent}%` }} transition={{ duration: 1, delay: 0.3 }} />
              </div>
              <p className="text-sm text-slate-500 mt-2">{percent}% {t({ en: 'correct', hi: 'सही' })}</p>
            </div>

            {/* Earned badges */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">{t({ en: 'Your Badges', hi: 'आपके बैज' })}</h4>
              <div className="flex flex-wrap justify-center gap-4">
                {badgeDefs.map(b => (
                  <Badge key={b.id} badge={b} unlocked={progress.badges.includes(b.id)} />
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button onClick={handleRestart} icon={RotateCcw} variant="secondary">
                {t({ en: 'Try Again', hi: 'फिर से कोशिश करें' })}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {t({ en: 'Election Knowledge Quiz', hi: 'चुनाव ज्ञान क्विज़' })}
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          {t({ en: 'Test what you\'ve learned about elections!', hi: 'चुनावों के बारे में जो सीखा उसका परीक्षण करें!' })}
        </p>
      </motion.div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-slate-500 dark:text-slate-400">{t({ en: 'Question', hi: 'प्रश्न' })} {currentQ + 1}/{total}</span>
          <span className="font-medium text-indigo-600 dark:text-indigo-400">{t({ en: 'Score', hi: 'स्कोर' })}: {score}</span>
        </div>
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" animate={{ width: `${((currentQ + 1) / total) * 100}%` }} transition={{ duration: 0.3 }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentQ} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
          <Card hover={false} className="!p-8">
            <p className="text-lg font-semibold text-slate-900 dark:text-white mb-6">{t(question.question)}</p>

            <div className="space-y-3">
              {question.options.map((opt, i) => {
                const isCorrect = answered && i === question.correct;
                const isWrong = answered && i === selected && i !== question.correct;
                const isSelected = selected === i;
                return (
                  <motion.button
                    key={i}
                    whileHover={!answered ? { scale: 1.01 } : {}}
                    whileTap={!answered ? { scale: 0.99 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answered}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all cursor-pointer border ${
                      isCorrect ? 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700'
                      : isWrong ? 'bg-red-50 dark:bg-red-900/30 border-red-300 dark:border-red-700'
                      : isSelected ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700'
                      : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:border-indigo-200 dark:hover:border-indigo-700'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                      isCorrect ? 'bg-green-100 text-green-600' : isWrong ? 'bg-red-100 text-red-600' : 'bg-slate-100 dark:bg-slate-600 text-slate-500 dark:text-slate-300'
                    }`}>
                      {isCorrect ? <CheckCircle2 size={16} /> : isWrong ? <XCircle size={16} /> : String.fromCharCode(65 + i)}
                    </div>
                    <span className={`text-sm ${isCorrect ? 'text-green-700 dark:text-green-300 font-medium' : isWrong ? 'text-red-700 dark:text-red-300' : 'text-slate-700 dark:text-slate-200'}`}>
                      {t(opt)}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="overflow-hidden mt-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
                    <p className="text-sm text-blue-700 dark:text-blue-300 flex items-start gap-2">
                      <Sparkles size={16} className="flex-shrink-0 mt-0.5" />
                      {t(question.explanation)}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next button */}
            {answered && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 flex justify-end">
                <Button onClick={handleNext} icon={ArrowRight} iconRight>
                  {currentQ < total - 1 ? t({ en: 'Next Question', hi: 'अगला प्रश्न' }) : t({ en: 'See Results', hi: 'परिणाम देखें' })}
                </Button>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
