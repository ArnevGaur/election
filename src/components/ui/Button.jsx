'use client';
import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', size = 'md', className = '', icon: Icon, iconRight, disabled, onClick, ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed';

  const variants = {
    primary: {
      background: 'var(--grad-primary)',
      color: '#ffffff',
      border: 'none',
      boxShadow: '0 4px 20px rgba(168,85,247,0.25)',
    },
    secondary: {
      background: 'rgba(255,255,255,0.04)',
      color: 'var(--color-text-primary)',
      border: '1px solid var(--color-border)',
      boxShadow: 'none',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-text-secondary)',
      border: 'none',
      boxShadow: 'none',
    },
  };

  const sizes = {
    sm: 'px-4 py-2 text-[13px]',
    md: 'px-5 py-2.5 text-[13px]',
    lg: 'px-7 py-3 text-[14px]',
  };

  const style = variants[variant] || variants.primary;

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.03, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={`${base} ${sizes[size]} ${className}`}
      style={style}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={e => {
        if (variant === 'primary') e.currentTarget.style.boxShadow = '0 8px 32px rgba(168,85,247,0.35)';
        if (variant === 'secondary') {
          e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
          e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)';
        }
        if (variant === 'ghost') e.currentTarget.style.color = 'var(--color-text-primary)';
      }}
      onMouseLeave={e => {
        if (variant === 'primary') e.currentTarget.style.boxShadow = style.boxShadow;
        if (variant === 'secondary') {
          e.currentTarget.style.background = style.background;
          e.currentTarget.style.borderColor = 'var(--color-border)';
        }
        if (variant === 'ghost') e.currentTarget.style.color = style.color;
      }}
      {...props}
    >
      {Icon && !iconRight && <Icon size={size === 'sm' ? 13 : 15} />}
      {children}
      {Icon && iconRight && <Icon size={size === 'sm' ? 13 : 15} />}
    </motion.button>
  );
}
