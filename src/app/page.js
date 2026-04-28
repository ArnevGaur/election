'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ChevronRight, ClipboardCheck, IdCard, Users, Vote, Calculator, Trophy, Clock, MessageCircle, Award, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Button from '@/components/ui/Button';

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } } };

export default function HomePage() {
  const { t, mounted } = useApp();
  if (!mounted) return <div className="min-h-screen" />;

  return (
    <div className="max-w-[1200px] mx-auto px-5 py-8">
      <Hero t={t} />
      <HowItWorks t={t} />
      <Features t={t} />
      <CTA t={t} />
    </div>
  );
}

/* ───────── HERO ───────── */
function Hero({ t }) {
  const steps = [
    { icon: ClipboardCheck, label: 'Register', color: '#2a85ff' },
    { icon: IdCard, label: 'Get Voter ID', color: '#8e59ff' },
    { icon: Users, label: 'Know Candidates', color: '#ff6a55' },
    { icon: Vote, label: 'Cast Your Vote', color: '#83bf6e' },
    { icon: Calculator, label: 'Counting', color: '#ff9f38' },
    { icon: Trophy, label: 'Results', color: '#2a85ff' },
  ];

  return (
    <section className="grid lg:grid-cols-[1fr,420px] gap-8 mb-8">
      {/* Left — Main card */}
      <div
        className="rounded-2xl p-8 md:p-10"
        style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-card)' }}
      >
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-6 text-[12px] font-bold tracking-wide uppercase"
            style={{ background: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}
          >
            {t({ en: 'Free · Interactive · Non-partisan', hi: 'मुफ्त · इंटरैक्टिव · निष्पक्ष' })}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.1] tracking-tight mb-5"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {t({ en: 'Elections,', hi: 'चुनाव,' })}
            <br />
            <span style={{ color: 'var(--color-accent)' }}>
              {t({ en: 'Finally Explained.', hi: 'आखिरकार समझाए गए।' })}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-[15px] leading-relaxed max-w-lg mb-8"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {t({
              en: 'Walk through every step of the democratic process — from registration to results — with interactive guides, AI assistance, and visual timelines.',
              hi: 'पंजीकरण से परिणाम तक — लोकतांत्रिक प्रक्रिया के हर चरण को इंटरैक्टिव गाइड, AI सहायता, और विज़ुअल टाइमलाइन के साथ समझें।'
            })}
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap">
            <Link href="/journey">
              <Button size="lg" icon={ArrowRight} iconRight>
                {t({ en: 'Start Learning', hi: 'सीखना शुरू करें' })}
              </Button>
            </Link>
            <Link href="/timeline">
              <Button variant="secondary" size="lg">
                {t({ en: 'Explore Timeline', hi: 'टाइमलाइन देखें' })}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Right — Step Flow */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="rounded-2xl p-6"
        style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-card)' }}
      >
        <h3
          className="text-[15px] font-bold mb-4 px-1"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {t({ en: 'The 6 Steps', hi: '6 चरण' })}
        </h3>
        <div className="space-y-2">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
            >
              <Link href="/journey">
                <div
                  className="group flex items-center gap-3.5 px-3.5 py-3 rounded-xl transition-all duration-200 cursor-pointer"
                  style={{ background: 'transparent' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--color-bg)';
                    e.currentTarget.style.transform = 'translateX(2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: step.color + '15' }}
                  >
                    <step.icon size={18} style={{ color: step.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[13px] font-bold block" style={{ color: 'var(--color-text-primary)' }}>
                      {t({ en: `Step ${i + 1}`, hi: `चरण ${i + 1}` })}
                    </span>
                    <span className="text-[12px]" style={{ color: 'var(--color-text-secondary)' }}>{step.label}</span>
                  </div>
                  <ChevronRight size={16} style={{ color: 'var(--color-text-tertiary)' }} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ───────── HOW IT WORKS ───────── */
function HowItWorks({ t }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const cards = [
    { icon: '📋', title: { en: 'Register', hi: 'पंजीकरण' }, desc: { en: 'Sign up as a voter online or at your local office. Takes 5 minutes.', hi: 'ऑनलाइन या स्थानीय कार्यालय में मतदाता के रूप में साइन अप करें।' } },
    { icon: '🪪', title: { en: 'Get Your ID', hi: 'आईडी प्राप्त करें' }, desc: { en: 'Receive your Voter ID card — your passport to participate in democracy.', hi: 'अपना वोटर आईडी कार्ड प्राप्त करें।' } },
    { icon: '🔍', title: { en: 'Research', hi: 'शोध करें' }, desc: { en: 'Study candidates, read manifestos, check backgrounds before you vote.', hi: 'उम्मीदवारों का अध्ययन करें, घोषणापत्र पढ़ें।' } },
    { icon: '🗳️', title: { en: 'Vote', hi: 'वोट करें' }, desc: { en: 'Visit your polling booth, cast your vote on the EVM. It\'s secret and secure.', hi: 'मतदान केंद्र जाएं, EVM पर वोट करें।' } },
  ];

  return (
    <section
      ref={ref}
      className="rounded-2xl p-8 md:p-10 mb-8"
      style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-card)' }}
    >
      <motion.div variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
        <motion.p variants={fadeUp} className="text-[12px] font-bold tracking-wide uppercase mb-2" style={{ color: 'var(--color-text-tertiary)' }}>
          {t({ en: 'The Process', hi: 'प्रक्रिया' })}
        </motion.p>
        <motion.h2 variants={fadeUp} className="text-[clamp(1.5rem,3vw,2rem)] font-extrabold tracking-tight mb-8" style={{ color: 'var(--color-text-primary)' }}>
          {t({ en: 'How Elections Work', hi: 'चुनाव कैसे काम करते हैं' })}
        </motion.h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <div
              className="group rounded-2xl p-5 h-full transition-all duration-200"
              style={{ background: 'var(--color-bg)', border: 'none' }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.background = 'var(--color-surface)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'var(--color-bg)';
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{card.icon}</span>
                <span
                  className="text-[11px] font-bold px-2.5 py-1 rounded-lg"
                  style={{ background: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}
                >
                  {t({ en: `Step ${i + 1}`, hi: `चरण ${i + 1}` })}
                </span>
              </div>
              <h3 className="text-[15px] font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>{t(card.title)}</h3>
              <p className="text-[13px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{t(card.desc)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ───────── FEATURES ───────── */
function Features({ t }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const features = [
    { icon: Sparkles, title: { en: 'Interactive Journey', hi: 'इंटरैक्टिव यात्रा' }, desc: { en: 'Step-by-step guided modules with quizzes, voice narration, and progress tracking.', hi: 'क्विज़, वॉइस नैरेशन और प्रगति ट्रैकिंग के साथ चरण-दर-चरण गाइड।' }, color: '#2a85ff' },
    { icon: Clock, title: { en: 'Visual Timeline', hi: 'विज़ुअल टाइमलाइन' }, desc: { en: 'See the complete election cycle unfold with animated milestones and "what if" scenarios.', hi: 'एनिमेटेड मील के पत्थरों के साथ पूरा चुनाव चक्र देखें।' }, color: '#8e59ff' },
    { icon: MessageCircle, title: { en: 'AI Assistant', hi: 'AI सहायक' }, desc: { en: 'Ask questions in English or Hindi and get instant, accurate answers about elections.', hi: 'अंग्रेजी या हिंदी में सवाल पूछें और चुनावों के बारे में तुरंत सटीक जवाब पाएं।' }, color: '#83bf6e' },
    { icon: Award, title: { en: 'Earn Badges', hi: 'बैज अर्जित करें' }, desc: { en: 'Complete modules, ace quizzes, and earn achievement badges as you learn.', hi: 'मॉड्यूल पूरे करें, क्विज़ में अव्वल रहें, और सीखते हुए बैज अर्जित करें।' }, color: '#ff6a55' },
  ];

  return (
    <section ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
      {features.map((feat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
        >
          <div
            className="flex gap-4 p-6 rounded-2xl transition-all duration-200 h-full"
            style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-card)' }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = 'var(--shadow-card)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: feat.color + '15' }}
            >
              <feat.icon size={20} style={{ color: feat.color }} />
            </div>
            <div>
              <h3 className="text-[15px] font-bold mb-1.5" style={{ color: 'var(--color-text-primary)' }}>{t(feat.title)}</h3>
              <p className="text-[13px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{t(feat.desc)}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  );
}

/* ───────── CTA ───────── */
function CTA({ t }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="rounded-2xl p-10 md:p-14 text-center mb-8"
      style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-card)' }}
    >
      <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-extrabold tracking-tight mb-4" style={{ color: 'var(--color-text-primary)' }}>
        {t({ en: 'Ready to become an informed voter?', hi: 'एक जागरूक मतदाता बनने के लिए तैयार?' })}
      </h2>
      <p className="text-[15px] leading-relaxed mb-8 max-w-lg mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
        {t({ en: 'It takes 10 minutes to understand the entire election process. Start your journey now.', hi: 'पूरी चुनाव प्रक्रिया समझने में 10 मिनट लगते हैं। अभी शुरू करें।' })}
      </p>
      <Link href="/journey">
        <Button size="lg" icon={ArrowRight} iconRight>
          {t({ en: 'Start Learning', hi: 'सीखना शुरू करें' })}
        </Button>
      </Link>
    </motion.section>
  );
}
