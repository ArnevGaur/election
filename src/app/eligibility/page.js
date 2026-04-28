'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft, Info, FileText } from 'lucide-react';
import Button from '@/components/ui/Button';

const questions = [
  {
    id: 'age',
    q: { en: 'Are you 18 years of age or older?', hi: 'क्या आप 18 वर्ष या उससे अधिक उम्र के हैं?' },
    desc: { en: 'You must be 18 on or before January 1st of the election year.', hi: 'चुनाव वर्ष की 1 जनवरी को या उससे पहले आपकी उम्र 18 वर्ष होनी चाहिए।' }
  },
  {
    id: 'citizen',
    q: { en: 'Are you an Indian citizen?', hi: 'क्या आप एक भारतीय नागरिक हैं?' },
    desc: { en: 'Only citizens of India are eligible to vote in Indian elections.', hi: 'केवल भारत के नागरिक ही भारतीय चुनावों में मतदान करने के पात्र हैं।' }
  },
  {
    id: 'resident',
    q: { en: 'Are you ordinarily resident in the polling area?', hi: 'क्या आप आमतौर पर मतदान क्षेत्र के निवासी हैं?' },
    desc: { en: 'You must reside at the address where you wish to register.', hi: 'आपको उस पते पर निवास करना चाहिए जहां आप पंजीकरण करना चाहते हैं।' }
  }
];

export default function EligibilityWizard() {
  const { t, mounted } = useApp();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  if (!mounted) return <div className="min-h-screen" />;

  const handleAnswer = (val) => {
    setAnswers({ ...answers, [questions[step].id]: val });
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const isEligible = answers.age && answers.citizen && answers.resident;

  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-36 min-h-screen px-6 flex justify-center">
      <div className="max-w-[600px] w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="w-12 h-12 rounded-2xl bg-[var(--color-accent-subtle)] text-[var(--color-accent)] flex items-center justify-center mx-auto mb-4 border border-[var(--color-accent-muted)]">
            <ClipboardCheck size={24} />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-3">
            {t({ en: 'Am I Eligible?', hi: 'क्या मैं योग्य हूँ?' })}
          </h1>
          <p className="text-[var(--color-text-secondary)]">
            {t({ en: 'Take this quick 3-question check to see if you can vote and what documents you need.', hi: 'यह देखने के लिए कि क्या आप मतदान कर सकते हैं और आपको किन दस्तावेजों की आवश्यकता है, यह त्वरित 3-प्रश्न जांच लें।' })}
          </p>
        </motion.div>

        <div className="surface-raised rounded-2xl p-6 md:p-8 border border-[var(--color-border)] relative overflow-hidden noise shadow-[var(--shadow-card)]">
          {!showResult ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col h-[300px]"
              >
                <div className="mb-4 flex items-center justify-between text-[12px] font-bold text-[var(--color-text-tertiary)] uppercase tracking-wider">
                  <span>{t({ en: 'Question', hi: 'प्रश्न' })} {step + 1} / 3</span>
                </div>
                
                <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">
                  {t(questions[step].q)}
                </h2>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] mb-auto">
                  <Info size={16} className="text-[var(--color-text-tertiary)] shrink-0 mt-0.5" />
                  <p className="text-[13px] leading-relaxed text-[var(--color-text-secondary)]">
                    {t(questions[step].desc)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <Button variant="secondary" size="lg" onClick={() => handleAnswer(false)} className="w-full justify-center">
                    {t({ en: 'No', hi: 'नहीं' })}
                  </Button>
                  <Button variant="primary" size="lg" onClick={() => handleAnswer(true)} className="w-full justify-center">
                    {t({ en: 'Yes', hi: 'हाँ' })}
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div className="mb-6 flex justify-center">
                {isEligible ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                    <CheckCircle2 size={64} className="text-[#10b981]" />
                  </motion.div>
                ) : (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                    <XCircle size={64} className="text-[#ef4444]" />
                  </motion.div>
                )}
              </div>
              
              <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)] mb-4">
                {isEligible 
                  ? t({ en: 'You are eligible to vote!', hi: 'आप मतदान करने के पात्र हैं!' })
                  : t({ en: 'You are not currently eligible.', hi: 'आप वर्तमान में पात्र नहीं हैं।' })
                }
              </h2>

              {isEligible ? (
                <div className="text-left bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 mb-6">
                  <h3 className="font-bold text-[15px] text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                    <FileText size={16} className="text-[var(--color-accent)]" />
                    {t({ en: 'Required Documents to Register', hi: 'पंजीकरण के लिए आवश्यक दस्तावेज' })}
                  </h3>
                  <ul className="space-y-2 text-[13px] text-[var(--color-text-secondary)]">
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--color-accent)]">•</span>
                      {t({ en: 'Passport size photograph', hi: 'पासपोर्ट आकार का फोटो' })}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--color-accent)]">•</span>
                      {t({ en: 'Identity proof (Aadhaar, PAN, Passport)', hi: 'पहचान प्रमाण (आधार, पैन, पासपोर्ट)' })}
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--color-accent)]">•</span>
                      {t({ en: 'Address proof (Aadhaar, Utility Bill, Passport)', hi: 'पता प्रमाण (आधार, बिजली बिल, पासपोर्ट)' })}
                    </li>
                  </ul>
                  <div className="mt-5 pt-5 border-t border-[var(--color-border)] flex justify-between items-center">
                    <Button variant="ghost" size="sm" onClick={() => {setStep(0); setShowResult(false); setAnswers({});}}>
                      {t({ en: 'Start Over', hi: 'फिर से शुरू करें' })}
                    </Button>
                    <a href="https://voters.eci.gov.in/" target="_blank" rel="noopener noreferrer">
                      <Button size="sm" icon={ArrowRight} iconRight>
                        {t({ en: 'Register on NVSP', hi: 'NVSP पर पंजीकरण करें' })}
                      </Button>
                    </a>
                  </div>
                </div>
              ) : (
                <p className="text-[14px] text-[var(--color-text-secondary)] max-w-sm mx-auto mb-8 leading-relaxed">
                  {t({ en: 'Based on your answers, you do not meet the criteria to register as a voter in India at this time. Please check the Election Commission guidelines for exceptions.', hi: 'आपके उत्तरों के आधार पर, आप इस समय भारत में मतदाता के रूप में पंजीकरण करने के मानदंडों को पूरा नहीं करते हैं। कृपया अपवादों के लिए चुनाव आयोग के दिशानिर्देशों की जांच करें।' })}
                </p>
              )}

              {!isEligible && (
                <Button variant="secondary" onClick={() => {setStep(0); setShowResult(false); setAnswers({});}}>
                  {t({ en: 'Retake Check', hi: 'पुनः जाँच करें' })}
                </Button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// Stub for ClipboardCheck icon if not imported at top
function ClipboardCheck(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>
}
