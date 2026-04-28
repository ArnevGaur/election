'use client';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function Footer() {
  const { t } = useApp();

  return (
    <footer className="relative mt-auto">
      <div className="section-divider" />
      <div className="max-w-[1200px] mx-auto px-5 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-extrabold" style={{ background: 'var(--grad-primary)' }}>E</div>
              <span className="font-bold text-[15px] gradient-text">Election Guide</span>
            </div>
            <p className="text-[13px] leading-relaxed max-w-xs" style={{ color: 'var(--color-text-tertiary)' }}>
              {t({ en: 'Making democracy accessible through education.', hi: 'शिक्षा के माध्यम से लोकतंत्र को सुलभ बनाना।' })}
            </p>
          </div>

          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              {t({ en: 'Navigate', hi: 'नेविगेट करें' })}
            </h4>
            <div className="space-y-2.5">
              {[
                { href: '/journey', label: { en: 'Election Journey', hi: 'चुनाव यात्रा' } },
                { href: '/timeline', label: { en: 'Timeline', hi: 'टाइमलाइन' } },
                { href: '/quiz', label: { en: 'Quiz', hi: 'क्विज़' } },
                { href: '/about', label: { en: 'About', hi: 'परिचय' } },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-[13px] transition-colors"
                  style={{ color: 'var(--color-text-tertiary)' }}
                  onMouseEnter={e => e.target.style.color = '#c084fc'}
                  onMouseLeave={e => e.target.style.color = 'var(--color-text-tertiary)'}
                >
                  {t(link.label)}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[12px] font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              {t({ en: 'Official Resources', hi: 'आधिकारिक संसाधन' })}
            </h4>
            <div className="space-y-2.5">
              {[
                { href: 'https://eci.gov.in', label: 'Election Commission' },
                { href: 'https://nvsp.in', label: 'Voter Registration (NVSP)' },
                { href: 'https://voters.eci.gov.in', label: 'Voter Helpline' },
              ].map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[13px] transition-colors"
                  style={{ color: 'var(--color-text-tertiary)' }}
                  onMouseEnter={e => e.target.style.color = '#c084fc'}
                  onMouseLeave={e => e.target.style.color = 'var(--color-text-tertiary)'}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 text-center" style={{ borderTop: '1px solid var(--color-border)' }}>
          <p className="text-[12px]" style={{ color: 'var(--color-text-tertiary)' }}>
            {t({ en: 'Educational project · Not affiliated with any political party', hi: 'शैक्षिक परियोजना · किसी राजनीतिक दल से संबद्ध नहीं' })}
          </p>
        </div>
      </div>
    </footer>
  );
}
