'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ChevronRight, ClipboardCheck, IdCard, Users, Vote, Calculator, Trophy, Clock, MessageCircle, Award, Sparkles, Zap, Star } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Button from '@/components/ui/Button';

const stagger = { visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } };

export default function HomePage() {
  const { t, mounted } = useApp();
  if (!mounted) return <div className="min-h-screen" />;

  return (
    <>
      {/* Animated mesh background */}
      <div className="mesh-bg" />
      <div className="relative">
        <Hero t={t} />
        <Stats t={t} />
        <HowItWorks t={t} />
        <Features t={t} />
        <CTA t={t} />
      </div>
    </>
  );
}

/* ───────── HERO ───────── */
function Hero({ t }) {
  const steps = [
    { icon: ClipboardCheck, label: { en: 'Register', hi: 'पंजीकरण' }, color: '#a855f7' },
    { icon: IdCard, label: { en: 'Get Voter ID', hi: 'वोटर आईडी' }, color: '#6366f1' },
    { icon: Users, label: { en: 'Know Candidates', hi: 'उम्मीदवार जानें' }, color: '#3b82f6' },
    { icon: Vote, label: { en: 'Cast Your Vote', hi: 'वोट डालें' }, color: '#22d3ee' },
    { icon: Calculator, label: { en: 'Counting', hi: 'गिनती' }, color: '#f43f5e' },
    { icon: Trophy, label: { en: 'Results', hi: 'परिणाम' }, color: '#f59e0b' },
  ];

  return (
    <section className="max-w-[1200px] mx-auto px-5 pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="grid lg:grid-cols-[1.1fr,1fr] gap-12 lg:gap-16 items-center">
        {/* Left — Copy */}
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-[12px] font-bold tracking-widest uppercase"
            style={{
              background: 'rgba(168,85,247,0.1)',
              border: '1px solid rgba(168,85,247,0.2)',
              color: '#c084fc',
            }}
          >
            <Zap size={12} />
            {t({ en: 'Free · Interactive · Non-partisan', hi: 'मुफ्त · इंटरैक्टिव · निष्पक्ष' })}
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight mb-6"
          >
            <span style={{ color: 'var(--color-text-primary)' }}>
              {t({ en: 'Elections,', hi: 'चुनाव,' })}
            </span>
            <br />
            <span className="gradient-text">
              {t({ en: 'Finally Explained.', hi: 'आखिरकार समझाए गए।' })}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-[17px] leading-[1.7] max-w-lg mb-10"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {t({
              en: 'Walk through every step of the democratic process — from registration to results — with interactive guides, AI assistance, and visual timelines.',
              hi: 'पंजीकरण से परिणाम तक — लोकतांत्रिक प्रक्रिया के हर चरण को इंटरैक्टिव गाइड, AI सहायता, और विज़ुअल टाइमलाइन के साथ समझें।'
            })}
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center gap-4 flex-wrap">
            <Link href="/journey">
              <button className="btn-gradient px-7 py-3.5 rounded-xl text-[15px] font-bold cursor-pointer flex items-center gap-2.5">
                {t({ en: 'Start Learning', hi: 'सीखना शुरू करें' })}
                <ArrowRight size={16} />
              </button>
            </Link>
            <Link href="/timeline">
              <Button variant="secondary" size="lg">
                {t({ en: 'Explore Timeline', hi: 'टाइमलाइन देखें' })}
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right — Interactive Step Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="glass-card rounded-2xl p-6 gradient-border">
            <div className="flex items-center gap-2 mb-5 px-1">
              <div className="w-2 h-2 rounded-full" style={{ background: '#a855f7' }} />
              <h3 className="text-[14px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
                {t({ en: 'The Election Journey', hi: 'चुनाव यात्रा' })}
              </h3>
            </div>
            <div className="space-y-2">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                >
                  <Link href="/journey">
                    <div
                      className="group flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer"
                      style={{ background: 'transparent' }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = `${step.color}10`;
                        e.currentTarget.style.transform = 'translateX(4px)';
                        e.currentTarget.style.boxShadow = `0 0 20px ${step.color}15`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                        style={{ background: `${step.color}18`, border: `1px solid ${step.color}25` }}
                      >
                        <step.icon size={18} style={{ color: step.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[11px] font-bold uppercase tracking-wider block" style={{ color: step.color }}>
                          {t({ en: `Step ${i + 1}`, hi: `चरण ${i + 1}` })}
                        </span>
                        <span className="text-[14px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>{t(step.label)}</span>
                      </div>
                      <ChevronRight size={16} style={{ color: 'var(--color-text-tertiary)' }} className="opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────── STATS ───────── */
function Stats({ t }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const stats = [
    { value: '6', label: { en: 'Interactive Steps', hi: 'इंटरैक्टिव चरण' }, color: '#a855f7' },
    { value: '2', label: { en: 'Languages', hi: 'भाषाएं' }, color: '#6366f1' },
    { value: 'AI', label: { en: 'Powered Assistant', hi: 'AI सहायक' }, color: '#3b82f6' },
    { value: '∞', label: { en: 'Questions Answered', hi: 'सवालों के जवाब' }, color: '#22d3ee' },
  ];

  return (
    <section ref={ref} className="max-w-[1200px] mx-auto px-5 pb-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass-card rounded-2xl p-6 text-center group transition-all duration-300"
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = `${stat.color}40`;
              e.currentTarget.style.boxShadow = `0 0 30px ${stat.color}15`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div className="text-[2.5rem] font-extrabold mb-1" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-[13px] font-medium" style={{ color: 'var(--color-text-secondary)' }}>{t(stat.label)}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ───────── HOW IT WORKS ───────── */
function HowItWorks({ t }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const cards = [
    { icon: '📋', title: { en: 'Register', hi: 'पंजीकरण' }, desc: { en: 'Sign up as a voter online or at your local office. Takes 5 minutes.', hi: 'ऑनलाइन या स्थानीय कार्यालय में मतदाता के रूप में साइन अप करें।' }, color: '#a855f7' },
    { icon: '🪪', title: { en: 'Get Your ID', hi: 'आईडी प्राप्त करें' }, desc: { en: 'Receive your Voter ID card — your passport to participate in democracy.', hi: 'अपना वोटर आईडी कार्ड प्राप्त करें।' }, color: '#6366f1' },
    { icon: '🔍', title: { en: 'Research', hi: 'शोध करें' }, desc: { en: 'Study candidates, read manifestos, check backgrounds before you vote.', hi: 'उम्मीदवारों का अध्ययन करें, घोषणापत्र पढ़ें।' }, color: '#3b82f6' },
    { icon: '🗳️', title: { en: 'Vote', hi: 'वोट करें' }, desc: { en: 'Visit your polling booth, cast your vote on the EVM. It\'s secret and secure.', hi: 'मतदान केंद्र जाएं, EVM पर वोट करें।' }, color: '#22d3ee' },
  ];

  return (
    <section ref={ref} className="max-w-[1200px] mx-auto px-5 py-20">
      <div className="section-divider mb-20" />
      <motion.div variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="text-center mb-14">
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-[11px] font-bold tracking-widest uppercase" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#818cf8' }}>
          <Star size={11} />
          {t({ en: 'The Process', hi: 'प्रक्रिया' })}
        </motion.div>
        <motion.h2 variants={fadeUp} className="text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
          {t({ en: 'How Elections ', hi: 'चुनाव कैसे ' })}
          <span className="gradient-text">{t({ en: 'Work', hi: 'काम करते हैं' })}</span>
        </motion.h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
          >
            <div
              className="glass-card rounded-2xl p-6 h-full transition-all duration-300 group gradient-border cursor-pointer"
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = `0 0 30px ${card.color}15, 0 20px 40px rgba(0,0,0,0.3)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{card.icon}</span>
                <span
                  className="text-[11px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide"
                  style={{ background: `${card.color}15`, color: card.color, border: `1px solid ${card.color}25` }}
                >
                  {t({ en: `Step ${i + 1}`, hi: `चरण ${i + 1}` })}
                </span>
              </div>
              <h3 className="text-[16px] font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>{t(card.title)}</h3>
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
    { icon: Sparkles, title: { en: 'Interactive Journey', hi: 'इंटरैक्टिव यात्रा' }, desc: { en: 'Step-by-step guided modules with quizzes, voice narration, and progress tracking.', hi: 'क्विज़, वॉइस नैरेशन और प्रगति ट्रैकिंग के साथ चरण-दर-चरण गाइड।' }, color: '#a855f7' },
    { icon: Clock, title: { en: 'Visual Timeline', hi: 'विज़ुअल टाइमलाइन' }, desc: { en: 'See the complete election cycle unfold with animated milestones and "what if" scenarios.', hi: 'एनिमेटेड मील के पत्थरों के साथ पूरा चुनाव चक्र देखें।' }, color: '#6366f1' },
    { icon: MessageCircle, title: { en: 'AI Assistant', hi: 'AI सहायक' }, desc: { en: 'Ask questions in English or Hindi and get instant, accurate answers about elections.', hi: 'अंग्रेजी या हिंदी में सवाल पूछें और चुनावों के बारे में तुरंत सटीक जवाब पाएं।' }, color: '#3b82f6' },
    { icon: Award, title: { en: 'Earn Badges', hi: 'बैज अर्जित करें' }, desc: { en: 'Complete modules, ace quizzes, and earn achievement badges as you learn.', hi: 'मॉड्यूल पूरे करें, क्विज़ में अव्वल रहें, और सीखते हुए बैज अर्जित करें।' }, color: '#f43f5e' },
  ];

  return (
    <section ref={ref} className="max-w-[1200px] mx-auto px-5 py-20">
      <div className="section-divider mb-20" />
      <motion.div variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'} className="text-center mb-14">
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-[11px] font-bold tracking-widest uppercase" style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)', color: '#c084fc' }}>
          <Zap size={11} />
          {t({ en: 'Features', hi: 'विशेषताएं' })}
        </motion.div>
        <motion.h2 variants={fadeUp} className="text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
          {t({ en: 'Everything you need to ', hi: 'लोकतंत्र समझने के लिए ' })}
          <span className="gradient-text-warm">{t({ en: 'understand democracy', hi: 'सब कुछ' })}</span>
        </motion.h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {features.map((feat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
          >
            <div
              className="glass-card rounded-2xl p-7 h-full transition-all duration-300 group gradient-border"
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 0 30px ${feat.color}12, 0 16px 40px rgba(0,0,0,0.3)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="flex gap-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{ background: `${feat.color}15`, border: `1px solid ${feat.color}25` }}
                >
                  <feat.icon size={22} style={{ color: feat.color }} />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>{t(feat.title)}</h3>
                  <p className="text-[14px] leading-[1.7]" style={{ color: 'var(--color-text-secondary)' }}>{t(feat.desc)}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ───────── CTA ───────── */
function CTA({ t }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="max-w-[1200px] mx-auto px-5 py-20">
      <div className="section-divider mb-20" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl p-12 md:p-16 text-center"
        style={{
          background: 'linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(99,102,241,0.12) 50%, rgba(59,130,246,0.12) 100%)',
          border: '1px solid rgba(168,85,247,0.15)',
        }}
      >
        {/* Glow effects */}
        <div style={{ position: 'absolute', top: '-50%', left: '20%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-50%', right: '20%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

        <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold tracking-tight mb-5 relative" style={{ color: 'var(--color-text-primary)' }}>
          {t({ en: 'Ready to become an', hi: 'एक जागरूक मतदाता' })}
          <br />
          <span className="gradient-text">{t({ en: 'informed voter?', hi: 'बनने के लिए तैयार?' })}</span>
        </h2>
        <p className="text-[16px] leading-[1.7] mb-10 max-w-lg mx-auto relative" style={{ color: 'var(--color-text-secondary)' }}>
          {t({ en: 'It takes 10 minutes to understand the entire election process. Start your journey now.', hi: 'पूरी चुनाव प्रक्रिया समझने में 10 मिनट लगते हैं। अभी शुरू करें।' })}
        </p>
        <Link href="/journey" className="relative inline-block">
          <button className="btn-gradient px-8 py-4 rounded-xl text-[15px] font-bold cursor-pointer flex items-center gap-2.5 mx-auto">
            {t({ en: 'Start Learning Now', hi: 'अभी सीखना शुरू करें' })}
            <ArrowRight size={16} />
          </button>
        </Link>
      </motion.div>
    </section>
  );
}
