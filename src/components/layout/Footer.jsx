'use client';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function Footer() {
  const { t } = useApp();

  return (
    <footer className="mt-auto">
      <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, var(--color-border-hover) 50%, transparent 100%)' }} />
      <div className="max-w-[980px] mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-[5px] flex items-center justify-center text-[9px] font-extrabold" style={{ background: 'var(--color-accent)', color: '#0c0c0e' }}>E</div>
              <span className="font-semibold text-[13px]" style={{ color: 'var(--color-text-primary)' }}>Election Guide</span>
            </div>
            <p className="text-[13px] leading-relaxed max-w-xs" style={{ color: 'var(--color-text-tertiary)' }}>
              {t({ en: 'Making democracy accessible through education.', hi: 'शिक्षा के माध्यम से लोकतंत्र को सुलभ बनाना।' })}
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-tertiary)' }}>
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
                  className="block text-[13px] transition-colors duration-200"
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
            <h4 className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-tertiary)' }}>
              {t({ en: 'Resources', hi: 'संसाधन' })}
            </h4>
            <div className="space-y-2">
              {[
                { href: 'https://eci.gov.in', label: 'Election Commission' },
                { href: 'https://nvsp.in', label: 'Voter Registration' },
                { href: 'https://voters.eci.gov.in', label: 'Voter Helpline' },
              ].map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[13px] transition-colors duration-200"
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

        <div className="mt-10 pt-5 text-center" style={{ borderTop: '1px solid var(--color-border)' }}>
          <p className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
            {t({ en: 'Educational project · Not affiliated with any political party', hi: 'शैक्षिक परियोजना · किसी राजनीतिक दल से संबद्ध नहीं' })}
          </p>
        </div>
      </div>
    </footer>
  );
}
