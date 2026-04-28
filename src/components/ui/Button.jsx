'use client';
import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', size = 'md', className = '', icon: Icon, iconRight, disabled, onClick, ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed';

  const variants = {
    primary: {
      background: 'var(--color-accent)',
      color: '#ffffff',
      border: 'none',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--color-text-primary)',
      border: '1px solid var(--color-border)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-text-secondary)',
      border: 'none',
    },
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-[13px]',
    md: 'px-4 py-2 text-[13px]',
    lg: 'px-5 py-2.5 text-[14px]',
  };

  const style = variants[variant] || variants.primary;

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.015, y: disabled ? 0 : -1 }}
      whileTap={{ scale: disabled ? 1 : 0.985 }}
      className={`${base} ${sizes[size]} ${className}`}
      style={style}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={e => {
        if (variant === 'primary') e.currentTarget.style.background = 'var(--color-accent-hover)';
        if (variant === 'secondary') e.currentTarget.style.background = 'var(--color-bg-tertiary)';
        if (variant === 'ghost') e.currentTarget.style.color = 'var(--color-text-primary)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = style.background;
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
