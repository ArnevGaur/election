'use client';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

export default function Badge({ badge, unlocked = false, size = 'md' }) {
  const Icon = LucideIcons[badge.icon] || LucideIcons.Award;
  const dim = size === 'sm' ? 40 : 52;
  const iconSize = size === 'sm' ? 16 : 22;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`flex flex-col items-center gap-1.5 ${unlocked ? '' : 'opacity-30 grayscale'}`}
    >
      <div
        className="flex items-center justify-center rounded-xl transition-all"
        style={{
          width: dim, height: dim,
          background: unlocked ? badge.color + '12' : 'var(--color-bg-tertiary)',
          border: `1.5px solid ${unlocked ? badge.color + '40' : 'var(--color-border)'}`,
        }}
      >
        <Icon size={iconSize} style={{ color: unlocked ? badge.color : 'var(--color-text-tertiary)' }} />
      </div>
      <span className="text-[10px] font-medium text-center max-w-[70px] leading-tight" style={{ color: 'var(--color-text-tertiary)' }}>
        {typeof badge.title === 'object' ? badge.title.en : badge.title}
      </span>
    </motion.div>
  );
}
