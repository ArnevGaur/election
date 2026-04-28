'use client';
import { motion } from 'framer-motion';

export default function Card({ children, className = '', hover = true, onClick, padding = 'p-6', ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -3, boxShadow: 'var(--shadow-card-hover)' } : {}}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`rounded-2xl ${padding} transition-colors duration-200 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{
        background: 'var(--color-surface)',
        boxShadow: 'var(--shadow-card)',
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
}
