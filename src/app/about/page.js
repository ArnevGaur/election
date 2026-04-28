'use client';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, Shield, Heart, Users, Globe } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Card from '@/components/ui/Card';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function AboutPage() {
  const { t, mounted } = useApp();
  if (!mounted) return <div className="min-h-screen" />;

  const resources = [
    { name: 'Election Commission of India', url: 'https://eci.gov.in', desc: { en: 'Official portal of India\'s Election Commission', hi: 'भारत के चुनाव आयोग का आधिकारिक पोर्टल' } },
    { name: 'National Voters Service Portal', url: 'https://nvsp.in', desc: { en: 'Register, check status, and manage voter details', hi: 'पंजीकरण करें, स्थिति जांचें और मतदाता विवरण प्रबंधित करें' } },
    { name: 'Voter Helpline (1950)', url: 'https://voters.eci.gov.in', desc: { en: 'Toll-free helpline for voter-related queries', hi: 'मतदाता संबंधित प्रश्नों के लिए टोल-फ्री हेल्पलाइन' } },
    { name: 'Know Your Candidate', url: 'https://affidavit.eci.gov.in', desc: { en: 'View candidate affidavits and financial disclosures', hi: 'उम्मीदवार शपथ पत्र और वित्तीय खुलासे देखें' } },
  ];

  const principles = [
    { icon: Shield, title: { en: 'Non-partisan', hi: 'निष्पक्ष' }, desc: { en: 'We do not promote any political party, ideology, or candidate.', hi: 'हम किसी भी राजनीतिक दल, विचारधारा या उम्मीदवार को बढ़ावा नहीं देते।' } },
    { icon: BookOpen, title: { en: 'Education First', hi: 'शिक्षा सबसे पहले' }, desc: { en: 'Our goal is to inform and educate, not to influence your vote.', hi: 'हमारा लक्ष्य सूचित और शिक्षित करना है, आपके वोट को प्रभावित करना नहीं।' } },
    { icon: Users, title: { en: 'For Everyone', hi: 'सभी के लिए' }, desc: { en: 'Designed for first-time voters, students, and anyone curious about democracy.', hi: 'पहली बार वोट देने वालों, छात्रों और लोकतंत्र के बारे में उत्सुक सभी के लिए।' } },
    { icon: Globe, title: { en: 'Accessible', hi: 'सुलभ' }, desc: { en: 'Multiple languages, simple mode, voice narration, and high contrast for all users.', hi: 'सभी उपयोगकर्ताओं के लिए कई भाषाएं, सरल मोड, वॉइस नैरेशन।' } },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
          {t({ en: 'About Election Guide', hi: 'इलेक्शन गाइड के बारे में' })}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          {t({
            en: 'Election Guide Assistant is a free, open educational project that helps citizens understand the democratic process through interactive learning.',
            hi: 'इलेक्शन गाइड असिस्टेंट एक मुफ्त, शैक्षिक परियोजना है जो नागरिकों को लोकतांत्रिक प्रक्रिया समझने में मदद करती है।'
          })}
        </p>
      </motion.div>

      {/* Principles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
        {principles.map((p, i) => (
          <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <Card className="h-full">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center flex-shrink-0">
                  <p.icon size={20} className="text-indigo-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{t(p.title)}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{t(p.desc)}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Resources */}
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">{t({ en: 'Official Resources', hi: 'आधिकारिक संसाधन' })}</h2>
      <div className="space-y-3 mb-14">
        {resources.map((r, i) => (
          <motion.a
            key={i}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors no-underline group"
          >
            <div>
              <p className="font-medium text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{r.name}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{t(r.desc)}</p>
            </div>
            <ExternalLink size={18} className="text-slate-400 group-hover:text-indigo-500 transition-colors flex-shrink-0" />
          </motion.a>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="p-6 bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-200/50 dark:border-amber-800/30 text-center">
        <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed flex items-start justify-center gap-2">
          <Heart size={16} className="flex-shrink-0 mt-0.5" />
          {t({
            en: 'This project is purely educational and is not affiliated with any government body, political party, or organization. Information presented is for learning purposes and may not reflect the most current regulations.',
            hi: 'यह परियोजना पूरी तरह शैक्षिक है और किसी सरकारी निकाय, राजनीतिक दल या संगठन से संबद्ध नहीं है।'
          })}
        </p>
      </div>
    </div>
  );
}
