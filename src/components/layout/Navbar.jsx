'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Accessibility } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Toggle from '@/components/ui/Toggle';
import Logo from '@/components/ui/Logo';

const navLinks = [
  { href: '/', label: { en: 'Home', hi: 'होम' } },
  { href: '/journey', label: { en: 'Journey', hi: 'यात्रा' } },
  { href: '/timeline', label: { en: 'Timeline', hi: 'टाइमलाइन' } },
  { href: '/quiz', label: { en: 'Quiz', hi: 'क्विज़' } },
  { href: '/about', label: { en: 'About', hi: 'परिचय' } },
];

export default function Navbar() {
  const { theme, toggleTheme, language, toggleLanguage, t, simpleMode, setSimpleMode, highContrast, setHighContrast, progressPercent, mounted } = useApp();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accessOpen, setAccessOpen] = useState(false);

  if (!mounted) return <nav className="h-14" />;

  return (
    <nav className="glass-nav sticky top-0 z-40">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Logo size={26} />
            <span className="font-bold text-[15px] tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              Niti
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map(link => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 text-[13px] font-medium rounded-lg transition-colors duration-200"
                  style={{
                    color: active ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
                  }}
                  onMouseEnter={e => {
                    if (!active) e.target.style.color = 'var(--color-text-secondary)';
                  }}
                  onMouseLeave={e => {
                    if (!active) e.target.style.color = 'var(--color-text-tertiary)';
                  }}
                >
                  {t(link.label)}
                </Link>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1">
            {progressPercent > 0 && (
              <div className="hidden sm:flex items-center gap-2 mr-2 px-2.5 py-1 rounded-md" style={{ background: 'var(--color-accent-subtle)' }}>
                <div className="w-12 h-1 rounded-full overflow-hidden" style={{ background: 'var(--color-accent-muted)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'var(--color-accent)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-[10px] font-semibold" style={{ color: 'var(--color-accent-text)' }}>{progressPercent}%</span>
              </div>
            )}

            <NavBtn onClick={toggleLanguage} ariaLabel="Toggle language">
              <span className="text-[11px] font-semibold" style={{ color: 'var(--color-text-tertiary)' }}>{language === 'en' ? 'हि' : 'EN'}</span>
            </NavBtn>

            <div className="relative">
              <NavBtn onClick={() => setAccessOpen(!accessOpen)} ariaLabel="Accessibility settings" ariaExpanded={accessOpen}>
                <Accessibility size={14} style={{ color: 'var(--color-text-tertiary)' }} />
              </NavBtn>
              <AnimatePresence>
                {accessOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.12 }}
                    className="absolute right-0 mt-2 w-52 rounded-xl p-3.5 space-y-3 z-50 surface-raised"
                  >
                    <Toggle enabled={simpleMode} onChange={setSimpleMode} label={t({ en: 'Simple Mode', hi: 'सरल मोड' })} size="sm" />
                    <Toggle enabled={highContrast} onChange={setHighContrast} label={t({ en: 'High Contrast', hi: 'हाई कंट्रास्ट' })} size="sm" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavBtn onClick={toggleTheme} ariaLabel="Toggle theme">
              <motion.div key={theme} initial={{ rotate: -20, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.12 }}>
                {theme === 'dark'
                  ? <Sun size={14} style={{ color: 'var(--color-accent)' }} />
                  : <Moon size={14} style={{ color: 'var(--color-text-tertiary)' }} />
                }
              </motion.div>
            </NavBtn>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-8 h-8 rounded-md flex items-center justify-center cursor-pointer border-none"
              style={{ background: 'transparent' }}
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen
                ? <X size={16} style={{ color: 'var(--color-text-primary)' }} />
                : <Menu size={16} style={{ color: 'var(--color-text-primary)' }} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
            style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-secondary)' }}
          >
            <div className="px-6 py-3 space-y-0.5">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-[14px] font-medium"
                  style={{ color: pathname === link.href ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)' }}
                >
                  {t(link.label)}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavBtn({ children, onClick, ariaLabel, ariaExpanded }) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      className="w-8 h-8 rounded-md flex items-center justify-center cursor-pointer border-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
      style={{ background: 'transparent' }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--color-surface-raised)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      {children}
    </button>
  );
}
