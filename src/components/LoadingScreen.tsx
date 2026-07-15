/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

interface LoadingScreenProps {
  onComplete: () => void;
  key?: string;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 800); // Wait for exit animation
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="loading-screen"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070707] text-brand-cream overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Pitch-black background with a central breathing golden point-light spotlight */}
          <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
            <div className="w-[120px] h-[120px] rounded-full bg-brand-gold/25 blur-[45px] animate-[pulseLight_4s_infinite_ease-in-out]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,161,90,0.08)_0%,transparent_70%)]" />
          </div>

          {/* Floating Luxury Dust Particles */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {[...Array(25)].map((_, i) => {
              const size = Math.random() * 3 + 1;
              const delay = Math.random() * 6;
              const duration = Math.random() * 12 + 8;
              const left = Math.random() * 100;
              return (
                <div
                  key={i}
                  className="absolute rounded-full bg-brand-gold/40 animate-[floatParticle_infinite_linear]"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${left}%`,
                    bottom: `-20px`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`,
                    opacity: Math.random() * 0.4 + 0.1,
                  }}
                />
              );
            })}
          </div>
          
          <div className="relative z-10 flex flex-col items-center justify-center max-w-xs px-4">
            {/* Animating Jarin Atelier Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-48 sm:w-56 drop-shadow-[0_0_25px_rgba(200,161,90,0.2)]"
            >
              <Logo size="custom" customHeight={220} showText={false} />
            </motion.div>

            {/* Studio Brand Name and Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mt-8"
            >
              <h1 className="font-serif text-3xl tracking-[0.3em] text-white font-light">
                JARIN
              </h1>
              <h2 className="font-serif text-xs tracking-[0.4em] text-brand-gold mt-1 uppercase font-semibold">
                – ATELIER –
              </h2>
              <div className="w-16 h-[1px] bg-brand-gold/30 mx-auto my-5" />
              <p className="font-serif italic text-xs text-gray-400 tracking-[0.2em]">
                Where Faith Meets Art
              </p>
            </motion.div>

            {/* Delicate Loading Indicator bar */}
            <div className="absolute bottom-[-80px] left-8 right-8 h-[1px] bg-white/5 overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-gradient-to-r from-transparent via-brand-gold to-transparent"
                initial={{ left: '-100%', width: '100%', position: 'absolute' }}
                animate={{ left: '100%' }}
                transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity }}
              />
            </div>
          </div>

          {/* Luxury corner accent ornaments */}
          <div className="absolute top-8 left-8 w-6 h-6 border-t border-l border-brand-gold/20" />
          <div className="absolute top-8 right-8 w-6 h-6 border-t border-r border-brand-gold/20" />
          <div className="absolute bottom-8 left-8 w-6 h-6 border-b border-l border-brand-gold/20" />
          <div className="absolute bottom-8 right-8 w-6 h-6 border-b border-r border-brand-gold/20" />

          {/* Core Animation CSS for Spotlight & Particles */}
          <style>{`
            @keyframes pulseLight {
              0%, 100% { transform: scale(1); opacity: 0.6; }
              50% { transform: scale(1.2); opacity: 0.9; }
            }
            @keyframes floatParticle {
              0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
              }
              10% {
                opacity: 0.5;
              }
              90% {
                opacity: 0.5;
              }
              100% {
                transform: translateY(-105vh) translateX(40px);
                opacity: 0;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
