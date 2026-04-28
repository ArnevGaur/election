'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ChevronRight, ClipboardCheck, IdCard, Users, Vote, Calculator, Trophy, Clock, MessageCircle, Award, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Button from '@/components/ui/Button';
import InteractiveExplorer from '@/components/ui/InteractiveExplorer';

const ease = [0.25, 0.1, 0.25, 1];
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } };

export default function HomePage() {
  const { t, mounted } = useApp();
  if (!mounted) return <div className="min-h-screen" />;

  return (
    <div>
      <Hero t={t} />
      <Process t={t} />
      <Features t={t} />
      <ExplorerSection t={t} />
      <CTA t={t} />
    </div>
  );
}

/* ────────────────────────────────────────
   HERO — Typography-first, Vercel-style
   ──────────────────────────────────────── */
function Hero({ t }) {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle top glow */}
      <div className="hero-glow" />

      <div className="max-w-[980px] mx-auto px-6 pt-32 pb-24 md:pt-44 md:pb-36 relative z-10 text-center">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          {/* Badge */}
          <motion.div variants={fadeUp} className="flex justify-center mb-8">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold tracking-wide"
              style={{
                color: 'var(--color-accent-text)',
                background: 'var(--color-accent-subtle)',
                border: '1px solid var(--color-accent-muted)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-accent)' }} />
              {t({ en: 'Free · Interactive · Non-partisan', hi: 'मुफ्त · इंटरैक्टिव · निष्पक्ष' })}
            </div>
          </motion.div>

          {/* Headline — the main event */}
          <motion.h1
            variants={fadeUp}
            className="text-[clamp(2.8rem,7vw,5.5rem)] font-extrabold leading-[1.0] tracking-[-0.03em] mb-7"
          >
            <span style={{ color: 'var(--color-text-primary)' }}>
              {t({ en: 'Understand', hi: 'चुनावों को' })}
            </span>
            <br />
            <span className="gradient-text">
              {t({ en: 'Elections', hi: 'समझें' })}
            </span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={fadeUp}
            className="text-[18px] md:text-[20px] leading-[1.65] max-w-[620px] mx-auto mb-12"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {t({
              en: 'Walk through every step of democracy — from registration to results — with interactive guides, AI assistance, and visual timelines.',
              hi: 'पंजीकरण से परिणाम तक — लोकतांत्रिक प्रक्रिया के हर चरण को इंटरैक्टिव गाइड, AI सहायता और विज़ुअल टाइमलाइन के साथ समझें।'
            })}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/journey">
              <Button size="lg" icon={ArrowRight} iconRight>
                {t({ en: 'Start Learning', hi: 'सीखना शुरू करें' })}
              </Button>
            </Link>
            <Link href="/timeline">
              <Button variant="ghost" size="lg">
                {t({ en: 'Explore Timeline', hi: 'टाइमलाइन देखें' })}
                <span style={{ color: 'var(--color-text-tertiary)', marginLeft: '4px' }}>→</span>
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Step pills — flowing across, not boxed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease }}
          className="mt-20 flex flex-wrap justify-center gap-3"
        >
          {[
            { label: { en: 'Register', hi: 'पंजीकरण' }, num: '01' },
            { label: { en: 'Voter ID', hi: 'वोटर आईडी' }, num: '02' },
            { label: { en: 'Candidates', hi: 'उम्मीदवार' }, num: '03' },
            { label: { en: 'Vote', hi: 'वोट' }, num: '04' },
            { label: { en: 'Counting', hi: 'गिनती' }, num: '05' },
            { label: { en: 'Results', hi: 'परिणाम' }, num: '06' },
          ].map((s, i) => (
            <Link href="/journey" key={i}>
              <div
                className="group flex items-center gap-3 px-5 py-3 rounded-full transition-all duration-300 cursor-pointer"
                style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--color-border-hover)';
                  e.currentTarget.style.background = 'var(--color-surface-raised)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.background = 'var(--color-surface)';
                }}
              >
                <span className="text-[11px] font-mono font-bold" style={{ color: 'var(--color-accent)' }}>{s.num}</span>
                <span className="text-[13px] font-medium" style={{ color: 'var(--color-text-secondary)' }}>{t(s.label)}</span>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade line */}
      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, var(--color-border-hover) 50%, transparent 100%)' }} />
    </section>
  );
}

/* ────────────────────────────────────────
   PROCESS — Numbered cards, editorial feel
   ──────────────────────────────────────── */
function Process({ t }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const cards = [
    { title: { en: 'Register', hi: 'पंजीकरण' }, desc: { en: 'Sign up as a voter online or at your local office. Takes just 5 minutes.', hi: 'ऑनलाइन या स्थानीय कार्यालय में मतदाता के रूप में साइन अप करें।' }, icon: ClipboardCheck },
    { title: { en: 'Get Voter ID', hi: 'आईडी प्राप्त करें' }, desc: { en: 'Receive your Voter ID card — your passport to participate in democracy.', hi: 'अपना वोटर आईडी कार्ड प्राप्त करें — लोकतंत्र में भाग लेने का पासपोर्ट।' }, icon: IdCard },
    { title: { en: 'Research', hi: 'शोध करें' }, desc: { en: 'Study candidates, read manifestos, and check backgrounds before you vote.', hi: 'उम्मीदवारों का अध्ययन करें, घोषणापत्र पढ़ें।' }, icon: Users },
    { title: { en: 'Cast Your Vote', hi: 'वोट डालें' }, desc: { en: 'Visit your polling booth, cast your vote on the EVM. It\'s secret and secure.', hi: 'मतदान केंद्र जाएं, EVM पर अपना वोट डालें।' }, icon: Vote },
  ];

  return (
    <section ref={ref} className="max-w-[980px] mx-auto px-6 py-28 md:py-36">
      <motion.div
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={stagger}
        className="mb-16"
      >
        <motion.p variants={fadeUp} className="text-[13px] font-semibold tracking-wider uppercase mb-4" style={{ color: 'var(--color-accent)' }}>
          {t({ en: 'How it works', hi: 'कैसे काम करता है' })}
        </motion.p>
        <motion.h2 variants={fadeUp} className="text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.02em]">
          <span style={{ color: 'var(--color-text-primary)' }}>
            {t({ en: 'Four steps to', hi: 'लोकतंत्र में भागीदारी' })}
          </span>
          <br />
          <span style={{ color: 'var(--color-text-secondary)' }}>
            {t({ en: 'participate in democracy.', hi: 'के चार चरण।' })}
          </span>
        </motion.h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease }}
          >
            <div
              className="relative surface-raised rounded-2xl p-7 h-full group cursor-pointer noise"
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--color-border-hover)';
                e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0">
                  <span
                    className="text-[42px] font-extrabold leading-none block"
                    style={{ color: 'var(--color-text-tertiary)', opacity: 0.5 }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <card.icon size={18} style={{ color: 'var(--color-accent)' }} />
                    <h3 className="text-[17px] font-bold" style={{ color: 'var(--color-text-primary)' }}>{t(card.title)}</h3>
                  </div>
                  <p className="text-[14px] leading-[1.7]" style={{ color: 'var(--color-text-secondary)' }}>{t(card.desc)}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   FEATURES — Clean, icon-led grid
   ──────────────────────────────────────── */
function Features({ t }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    { icon: Sparkles, title: { en: 'Interactive Journey', hi: 'इंटरैक्टिव यात्रा' }, desc: { en: 'Step-by-step guided modules with quizzes, voice narration, and progress tracking.', hi: 'क्विज़, वॉइस नैरेशन और प्रगति ट्रैकिंग के साथ चरण-दर-चरण गाइड।' } },
    { icon: Clock, title: { en: 'Visual Timeline', hi: 'विज़ुअल टाइमलाइन' }, desc: { en: 'See the complete election cycle unfold with animated milestones and scenarios.', hi: 'एनिमेटेड मील के पत्थरों के साथ पूरा चुनाव चक्र देखें।' } },
    { icon: MessageCircle, title: { en: 'AI Assistant', hi: 'AI सहायक' }, desc: { en: 'Ask in English or Hindi. Get instant, accurate answers about any election topic.', hi: 'अंग्रेजी या हिंदी में पूछें। तुरंत सटीक जवाब पाएं।' } },
    { icon: Award, title: { en: 'Earn Badges', hi: 'बैज अर्जित करें' }, desc: { en: 'Complete modules, ace quizzes, and earn achievement badges as you learn.', hi: 'मॉड्यूल पूरे करें, क्विज़ में अव्वल रहें, बैज अर्जित करें।' } },
  ];

  return (
    <section ref={ref}>
      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, var(--color-border-hover) 50%, transparent 100%)' }} />
      <div className="max-w-[980px] mx-auto px-6 py-28 md:py-36">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
          className="mb-16"
        >
          <motion.p variants={fadeUp} className="text-[13px] font-semibold tracking-wider uppercase mb-4" style={{ color: 'var(--color-accent)' }}>
            {t({ en: 'Features', hi: 'विशेषताएं' })}
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.02em]">
            <span style={{ color: 'var(--color-text-primary)' }}>
              {t({ en: 'Everything you need to', hi: 'लोकतंत्र समझने के लिए' })}
            </span>
            <br />
            <span style={{ color: 'var(--color-text-secondary)' }}>
              {t({ en: 'understand democracy.', hi: 'सब कुछ।' })}
            </span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px rounded-2xl overflow-hidden" style={{ background: 'var(--color-border)' }}>
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            >
              <div
                className="relative p-8 h-full transition-all duration-300 cursor-default noise"
                style={{ background: 'var(--color-bg)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--color-bg-secondary)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--color-bg)';
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: 'var(--color-accent-subtle)', border: '1px solid var(--color-accent-muted)' }}
                >
                  <feat.icon size={18} style={{ color: 'var(--color-accent)' }} />
                </div>
                <h3 className="text-[16px] font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>{t(feat.title)}</h3>
                <p className="text-[14px] leading-[1.7]" style={{ color: 'var(--color-text-secondary)' }}>{t(feat.desc)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   EXPLORER — Interactive Data
   ──────────────────────────────────────── */
function ExplorerSection({ t }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref}>
      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, var(--color-border-hover) 50%, transparent 100%)' }} />
      <div className="max-w-[980px] mx-auto px-6 py-28 md:py-36">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={stagger}
          className="mb-12"
        >
          <motion.p variants={fadeUp} className="text-[13px] font-semibold tracking-wider uppercase mb-4" style={{ color: 'var(--color-accent)' }}>
            {t({ en: 'Data at a glance', hi: 'एक नज़र में डेटा' })}
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.02em]">
            <span style={{ color: 'var(--color-text-primary)' }}>
              {t({ en: 'Explore the scale', hi: 'लोकतंत्र के पैमाने को' })}
            </span>
            <br />
            <span style={{ color: 'var(--color-text-secondary)' }}>
              {t({ en: 'of democracy.', hi: 'समझें।' })}
            </span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <InteractiveExplorer />
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   CTA — Minimal, confident
   ──────────────────────────────────────── */
function CTA({ t }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref}>
      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, var(--color-border-hover) 50%, transparent 100%)' }} />
      <div className="max-w-[980px] mx-auto px-6 py-28 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="text-center"
        >
          <p className="text-[13px] font-semibold tracking-wider uppercase mb-6" style={{ color: 'var(--color-accent)' }}>
            {t({ en: 'Get started', hi: 'शुरू करें' })}
          </p>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.02em] mb-6" style={{ color: 'var(--color-text-primary)' }}>
            {t({ en: 'Ready to become an', hi: 'एक जागरूक मतदाता' })}
            <br />
            <span className="gradient-text">{t({ en: 'informed voter?', hi: 'बनने के लिए तैयार?' })}</span>
          </h2>
          <p className="text-[16px] leading-[1.7] mb-10 max-w-md mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            {t({ en: '10 minutes to understand the entire election process.', hi: 'पूरी चुनाव प्रक्रिया समझने में 10 मिनट।' })}
          </p>
          <Link href="/journey">
            <Button size="lg" icon={ArrowRight} iconRight>
              {t({ en: 'Start Learning', hi: 'सीखना शुरू करें' })}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
