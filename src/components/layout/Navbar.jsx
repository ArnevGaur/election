'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Languages, Menu, X, Accessibility } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Toggle from '@/components/ui/Toggle';

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
    <nav className="glass-nav sticky top-0 z-40 border-b" style={{ borderColor: 'var(--color-border)' }}>
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 no-underline group">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: 'var(--color-accent)' }}>
              E
            </div>
            <span className="font-semibold text-[15px]" style={{ color: 'var(--color-text-primary)' }}>
              Election Guide
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-1.5 text-[13px] font-medium rounded-md transition-colors no-underline"
                  style={{ color: active ? 'var(--color-accent)' : 'var(--color-text-secondary)' }}
                  onMouseEnter={e => { if (!active) e.target.style.color = 'var(--color-text-primary)'; }}
                  onMouseLeave={e => { if (!active) e.target.style.color = 'var(--color-text-secondary)'; }}
                >
                  {t(link.label)}
                  {active && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-[13px] left-0 right-0 h-[2px] rounded-full"
                      style={{ background: 'var(--color-accent)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1">
            {/* Progress */}
            {progressPercent > 0 && (
              <div className="hidden sm:flex items-center gap-2 mr-3 px-2.5 py-1 rounded-full" style={{ background: 'var(--color-accent-subtle)' }}>
                <div className="w-16 h-1 rounded-full overflow-hidden" style={{ background: 'var(--color-accent-muted)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'var(--color-accent)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-[11px] font-semibold" style={{ color: 'var(--color-accent)' }}>{progressPercent}%</span>
              </div>
            )}

            <NavButton onClick={toggleLanguage} label="Language" title={language === 'en' ? 'हिंदी' : 'EN'}>
              <span className="text-[11px] font-bold" style={{ color: 'var(--color-text-secondary)' }}>{language === 'en' ? 'हि' : 'EN'}</span>
            </NavButton>

            <div className="relative">
              <NavButton onClick={() => setAccessOpen(!accessOpen)} label="Accessibility">
                <Accessibility size={15} style={{ color: 'var(--color-text-secondary)' }} />
              </NavButton>
              <AnimatePresence>
                {accessOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-52 rounded-xl p-3.5 space-y-3 z-50"
                    style={{ background: 'var(--color-surface-raised)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)' }}
                  >
                    <Toggle enabled={simpleMode} onChange={setSimpleMode} label={t({ en: 'Simple Mode', hi: 'सरल मोड' })} size="sm" />
                    <Toggle enabled={highContrast} onChange={setHighContrast} label={t({ en: 'High Contrast', hi: 'हाई कंट्रास्ट' })} size="sm" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavButton onClick={toggleTheme} label="Theme">
              <motion.div key={theme} initial={{ rotate: -30, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.15 }}>
                {theme === 'dark'
                  ? <Sun size={15} style={{ color: '#fbbf24' }} />
                  : <Moon size={15} style={{ color: 'var(--color-text-secondary)' }} />
                }
              </motion.div>
            </NavButton>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-8 h-8 rounded-md flex items-center justify-center cursor-pointer border-none"
              style={{ background: 'transparent' }}
              aria-label="Menu"
            >
              {mobileOpen
                ? <X size={18} style={{ color: 'var(--color-text-primary)' }} />
                : <Menu size={18} style={{ color: 'var(--color-text-primary)' }} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t"
            style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
          >
            <div className="px-5 py-3 space-y-0.5">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-[14px] font-medium no-underline transition-colors"
                  style={{ color: pathname === link.href ? 'var(--color-accent)' : 'var(--color-text-secondary)' }}
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

function NavButton({ children, onClick, label }) {
  return (
    <button
      onClick={onClick}
      className="w-8 h-8 rounded-md flex items-center justify-center cursor-pointer border-none transition-colors"
      style={{ background: 'transparent' }}
      aria-label={label}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--color-bg-tertiary)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      {children}
    </button>
  );
}
