'use client';
import { useRef, useEffect, useState } from 'react';

export default function ParallaxBackground() {
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Grid overlay — fixed, fades from top */}
      <div className="bg-grid" />

      {/* Gradient orbs with parallax — each moves at different speed */}
      <div
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Large amber orb — top right, slow parallax */}
        <div
          className="gradient-orb orb-amber animate-drift"
          style={{
            top: '-5%',
            right: '-8%',
            transform: `translateY(${scrollY * 0.04}px)`,
          }}
        />

        {/* Warm orb — center left, medium parallax */}
        <div
          className="gradient-orb orb-warm animate-drift-slow"
          style={{
            top: '35%',
            left: '-12%',
            transform: `translateY(${scrollY * -0.06}px)`,
          }}
        />

        {/* Cool orb — bottom right, fast parallax (counter direction) */}
        <div
          className="gradient-orb orb-cool animate-drift-reverse"
          style={{
            top: '65%',
            right: '-5%',
            transform: `translateY(${scrollY * -0.08}px)`,
          }}
        />

        {/* Small amber accent — mid page */}
        <div
          className="gradient-orb animate-drift-slow"
          style={{
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(229,164,78,0.05) 0%, transparent 70%)',
            filter: 'blur(60px)',
            top: '55%',
            left: '30%',
            transform: `translateY(${scrollY * 0.03}px)`,
          }}
        />
      </div>
    </>
  );
}
