'use client';
import { motion } from 'framer-motion';

export default function Card({ children, className = '', hover = true, onClick, padding = 'p-6', ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: 'var(--shadow-card-hover)' } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`glass-card gradient-border rounded-2xl ${padding} transition-all duration-300 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
}
