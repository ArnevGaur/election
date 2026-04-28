'use client';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function Footer() {
  const { t } = useApp();

  return (
    <footer className="mt-auto border-t" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto px-5 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] font-bold" style={{ background: 'var(--color-accent)' }}>E</div>
              <span className="font-semibold text-[14px]" style={{ color: 'var(--color-text-primary)' }}>Election Guide</span>
            </div>
            <p className="text-[13px] leading-relaxed max-w-xs" style={{ color: 'var(--color-text-tertiary)' }}>
              {t({ en: 'Making democracy accessible through education.', hi: 'शिक्षा के माध्यम से लोकतंत्र को सुलभ बनाना।' })}
            </p>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
              {t({ en: 'Navigate', hi: 'नेविगेट करें' })}
            </h4>
            <div className="space-y-2">
              {[
                { href: '/journey', label: { en: 'Election Journey', hi: 'चुनाव यात्रा' } },
                { href: '/timeline', label: { en: 'Timeline', hi: 'टाइमलाइन' } },
                { href: '/quiz', label: { en: 'Quiz', hi: 'क्विज़' } },
                { href: '/about', label: { en: 'About', hi: 'परिचय' } },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-[13px] no-underline transition-colors"
                  style={{ color: 'var(--color-text-tertiary)' }}
                  onMouseEnter={e => e.target.style.color = 'var(--color-text-primary)'}
                  onMouseLeave={e => e.target.style.color = 'var(--color-text-tertiary)'}
                >
                  {t(link.label)}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
              {t({ en: 'Official Resources', hi: 'आधिकारिक संसाधन' })}
            </h4>
            <div className="space-y-2">
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
                  className="block text-[13px] no-underline transition-colors"
                  style={{ color: 'var(--color-text-tertiary)' }}
                  onMouseEnter={e => e.target.style.color = 'var(--color-text-primary)'}
                  onMouseLeave={e => e.target.style.color = 'var(--color-text-tertiary)'}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t text-center" style={{ borderColor: 'var(--color-border-subtle)' }}>
          <p className="text-[12px]" style={{ color: 'var(--color-text-tertiary)' }}>
            {t({ en: 'Educational project · Not affiliated with any political party', hi: 'शैक्षिक परियोजना · किसी राजनीतिक दल से संबद्ध नहीं' })}
          </p>
        </div>
      </div>
    </footer>
  );
}
