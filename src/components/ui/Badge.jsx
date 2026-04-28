'use client';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

export default function Badge({ badge, unlocked = false, size = 'md' }) {
  const Icon = LucideIcons[badge.icon] || LucideIcons.Award;
  const dim = size === 'sm' ? 48 : 64;
  const iconSize = size === 'sm' ? 20 : 28;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`flex flex-col items-center gap-2 ${unlocked ? '' : 'opacity-40 grayscale'}`}
    >
      <motion.div
        whileHover={unlocked ? { scale: 1.1, rotate: 5 } : {}}
        className={`flex items-center justify-center rounded-2xl ${unlocked ? 'badge-glow' : ''}`}
        style={{
          width: dim, height: dim,
          background: unlocked
            ? `linear-gradient(135deg, ${badge.color}20, ${badge.color}40)`
            : 'var(--color-bg-secondary)',
          border: `2px solid ${unlocked ? badge.color : 'var(--color-border)'}`,
        }}
      >
        <Icon size={iconSize} style={{ color: unlocked ? badge.color : 'var(--color-text-muted)' }} />
      </motion.div>
      <span className="text-xs font-medium text-center text-slate-700 dark:text-slate-300 max-w-[80px] leading-tight">
        {typeof badge.title === 'object' ? badge.title.en : badge.title}
      </span>
    </motion.div>
  );
}
