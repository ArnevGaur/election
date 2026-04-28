'use client';
import { motion } from 'framer-motion';

export default function Card({ children, className = '', hover = true, onClick, padding = 'p-5', ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -2, boxShadow: 'var(--shadow-card-hover)' } : {}}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`rounded-xl ${padding} transition-colors duration-150 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
}
