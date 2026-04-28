'use client';
import { motion } from 'framer-motion';
import { ExternalLink, Shield, BookOpen, Users, Globe } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const fadeUp = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function AboutPage() {
  const { t, mounted } = useApp();
  if (!mounted) return <div className="min-h-screen" />;

  const principles = [
    { icon: Shield, title: { en: 'Non-partisan', hi: 'निष्पक्ष' }, desc: { en: 'We do not promote any political party, ideology, or candidate.', hi: 'हम किसी राजनीतिक दल को बढ़ावा नहीं देते।' } },
    { icon: BookOpen, title: { en: 'Education First', hi: 'शिक्षा सबसे पहले' }, desc: { en: 'Our goal is to inform and educate, not to influence your vote.', hi: 'हमारा लक्ष्य शिक्षित करना है, प्रभावित करना नहीं।' } },
    { icon: Users, title: { en: 'For Everyone', hi: 'सभी के लिए' }, desc: { en: 'Designed for first-time voters, students, and anyone curious about democracy.', hi: 'पहली बार मतदाताओं, छात्रों और सभी के लिए।' } },
    { icon: Globe, title: { en: 'Accessible', hi: 'सुलभ' }, desc: { en: 'Multiple languages, simple mode, voice narration, and high contrast.', hi: 'कई भाषाएं, सरल मोड, वॉइस नैरेशन।' } },
  ];

  const resources = [
    { name: 'Election Commission of India', url: 'https://eci.gov.in', desc: { en: 'Official portal', hi: 'आधिकारिक पोर्टल' } },
    { name: 'National Voters Service Portal', url: 'https://nvsp.in', desc: { en: 'Register & manage voter details', hi: 'पंजीकरण और मतदाता विवरण' } },
    { name: 'Voter Helpline (1950)', url: 'https://voters.eci.gov.in', desc: { en: 'Toll-free helpline', hi: 'टोल-फ्री हेल्पलाइन' } },
    { name: 'Know Your Candidate', url: 'https://affidavit.eci.gov.in', desc: { en: 'Candidate affidavits & disclosures', hi: 'उम्मीदवार शपथ पत्र' } },
  ];

  return (
    <div className="max-w-3xl mx-auto px-5 py-12">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <p className="text-[13px] font-semibold tracking-wide uppercase mb-2" style={{ color: 'var(--color-accent)' }}>
          {t({ en: 'About', hi: 'परिचय' })}
        </p>
        <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tight mb-3" style={{ color: 'var(--color-text-primary)' }}>
          {t({ en: 'About Election Guide', hi: 'इलेक्शन गाइड के बारे में' })}
        </h1>
        <p className="text-[15px] leading-[1.7]" style={{ color: 'var(--color-text-secondary)' }}>
          {t({ en: 'A free, open educational project helping citizens understand the democratic process through interactive learning.', hi: 'एक मुफ्त शैक्षिक परियोजना जो नागरिकों को लोकतांत्रिक प्रक्रिया समझने में मदद करती है।' })}
        </p>
      </motion.div>

      {/* Principles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-14">
        {principles.map((p, i) => (
          <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
            <div className="flex gap-3.5 p-4 rounded-xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--color-accent-subtle)' }}>
                <p.icon size={16} style={{ color: 'var(--color-accent)' }} />
              </div>
              <div>
                <h3 className="text-[14px] font-semibold mb-0.5" style={{ color: 'var(--color-text-primary)' }}>{t(p.title)}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{t(p.desc)}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Resources */}
      <h2 className="text-[18px] font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>{t({ en: 'Official Resources', hi: 'आधिकारिक संसाधन' })}</h2>
      <div className="space-y-2 mb-14">
        {resources.map((r, i) => (
          <motion.a
            key={i}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.06 }}
            className="flex items-center justify-between p-4 rounded-xl no-underline group transition-all border"
            style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            <div>
              <p className="text-[14px] font-medium transition-colors" style={{ color: 'var(--color-text-primary)' }}>{r.name}</p>
              <p className="text-[12px]" style={{ color: 'var(--color-text-tertiary)' }}>{t(r.desc)}</p>
            </div>
            <ExternalLink size={15} style={{ color: 'var(--color-text-tertiary)' }} className="flex-shrink-0" />
          </motion.a>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="p-5 rounded-xl text-center" style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border-subtle)' }}>
        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--color-text-tertiary)' }}>
          {t({ en: 'This project is purely educational and is not affiliated with any government body, political party, or organization.', hi: 'यह परियोजना पूरी तरह शैक्षिक है और किसी सरकारी निकाय या राजनीतिक दल से संबद्ध नहीं है।' })}
        </p>
      </div>
    </div>
  );
}
