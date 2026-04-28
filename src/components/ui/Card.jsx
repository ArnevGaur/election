'use client';
import { motion } from 'framer-motion';

export default function Card({ children, className = '', hover = true, onClick, padding = 'p-6', ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -3 } : {}}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`relative surface-raised rounded-2xl ${padding} noise transition-all duration-300 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      onMouseEnter={e => {
        if (hover) {
          e.currentTarget.style.borderColor = 'var(--color-border-hover)';
          e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
        }
      }}
      onMouseLeave={e => {
        if (hover) {
          e.currentTarget.style.borderColor = 'var(--color-border)';
          e.currentTarget.style.boxShadow = 'var(--shadow-card)';
        }
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
