'use client';
import { motion } from 'framer-motion';

export default function Toggle({ enabled, onChange, label, size = 'md' }) {
  const w = size === 'sm' ? 32 : 40;
  const h = size === 'sm' ? 18 : 22;
  const dot = size === 'sm' ? 12 : 16;
  const move = size === 'sm' ? 14 : 18;

  return (
    <button
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={() => onChange(!enabled)}
      className="flex items-center gap-2.5 cursor-pointer bg-transparent border-none p-0"
    >
      <div
        className="relative rounded-full transition-colors duration-200"
        style={{
          width: w, height: h,
          background: enabled ? 'var(--color-accent)' : 'var(--color-border)',
        }}
      >
        <motion.div
          className="absolute rounded-full shadow-sm"
          style={{
            width: dot, height: dot,
            top: (h - dot) / 2, left: 3,
            background: '#fff',
          }}
          animate={{ x: enabled ? move : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>
      {label && <span className="text-[13px]" style={{ color: 'var(--color-text-secondary)' }}>{label}</span>}
    </button>
  );
}
