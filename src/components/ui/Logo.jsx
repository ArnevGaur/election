'use client';

export default function Logo({ size = 24, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Book base */}
      <path
        d="M6 24V10a2 2 0 012-2h4l4 4 4-4h4a2 2 0 012 2v14"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Center spine */}
      <path
        d="M16 12v12"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Checkmark */}
      <path
        d="M11 18l3 3 7-7"
        stroke="var(--color-accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Sun rays */}
      <path
        d="M16 4v2M22 6l-1.5 1.5M10 6l1.5 1.5"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}
