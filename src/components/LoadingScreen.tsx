/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo } from 'react';
import Logo from './Logo';

interface LoadingScreenProps {
  /** When true the overlay fades out; the site is already rendering underneath. */
  leaving: boolean;
  onExited: () => void;
}

const EXIT_MS = 320;

// Pure CSS intro (no animation library) so the first-load bundle stays small.
// It matches the static splash in index.html, so there's no flash when React takes over.
export default function LoadingScreen({ leaving, onExited }: LoadingScreenProps) {
  useEffect(() => {
    if (!leaving) return;
    const t = window.setTimeout(onExited, EXIT_MS);
    return () => clearTimeout(t);
  }, [leaving, onExited]);

  // Stable random particles (computed once, not on every render)
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, () => ({
        size: Math.random() * 3 + 1,
        delay: Math.random() * 6,
        duration: Math.random() * 12 + 8,
        left: Math.random() * 100,
        opacity: Math.random() * 0.4 + 0.1,
      })),
    [],
  );

  return (
    <div
      id="loading-screen"
      aria-hidden={leaving}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#070707] text-brand-cream overflow-hidden"
      style={{
        opacity: leaving ? 0 : 1,
        pointerEvents: leaving ? 'none' : 'auto',
        transition: `opacity ${EXIT_MS}ms cubic-bezier(0.16,1,0.3,1)`,
      }}
    >
      {/* Pitch-black background with a central breathing golden point-light spotlight */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="w-[120px] h-[120px] rounded-full bg-brand-gold/25 blur-[45px] animate-[pulseLight_4s_infinite_ease-in-out]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,161,90,0.08)_0%,transparent_70%)]" />
      </div>

      {/* Floating luxury dust particles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-brand-gold/40 animate-[floatParticle_infinite_linear]"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              bottom: '-20px',
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center max-w-xs px-4">
        {/* Logo is already painted by the static splash in index.html — no fade-in */}
        <div className="w-48 sm:w-56 drop-shadow-[0_0_25px_rgba(200,161,90,0.2)]">
          <Logo size="custom" customHeight={220} showText={false} priority />
        </div>

        {/* Studio brand name and tagline */}
        <div className="text-center mt-8 animate-[introFadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_0.1s_both]">
          <div className="font-serif text-3xl tracking-[0.3em] text-white font-light">JARIN</div>
          <div className="font-serif text-xs tracking-[0.4em] text-brand-gold mt-1 uppercase font-semibold">
            – ATELIER –
          </div>
          <div className="w-16 h-[1px] bg-brand-gold/30 mx-auto my-5" />
          <p className="font-serif italic text-xs text-gray-400 tracking-[0.2em]">Where Faith Meets Art</p>
        </div>

        {/* Delicate loading indicator bar */}
        <div className="absolute bottom-[-80px] left-8 right-8 h-[1px] bg-white/5 overflow-hidden rounded-full">
          <div className="absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-brand-gold to-transparent animate-[loaderBar_1.4s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* Luxury corner accent ornaments */}
      <div className="absolute top-8 left-8 w-6 h-6 border-t border-l border-brand-gold/20" />
      <div className="absolute top-8 right-8 w-6 h-6 border-t border-r border-brand-gold/20" />
      <div className="absolute bottom-8 left-8 w-6 h-6 border-b border-l border-brand-gold/20" />
      <div className="absolute bottom-8 right-8 w-6 h-6 border-b border-r border-brand-gold/20" />

      <style>{`
        @keyframes pulseLight {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 0.9; }
        }
        @keyframes floatParticle {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-105vh) translateX(40px); opacity: 0; }
        }
        @keyframes introFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          #loading-screen * { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
