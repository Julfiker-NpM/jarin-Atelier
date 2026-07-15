/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface ArtworkFrameProps {
  label: string;
  arabicLabel?: string;
  className?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'panoramic';
  glowColor?: string;
  imageUrl?: string;
}

export default function ArtworkFrame({
  label,
  arabicLabel,
  className = '',
  aspectRatio = 'portrait',
  glowColor = 'rgba(200, 161, 90, 0.15)',
  imageUrl,
}: ArtworkFrameProps) {
  const aspectClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    panoramic: 'aspect-[2/1]',
  };

  return (
    <motion.div
      className={`relative w-full ${aspectClasses[aspectRatio]} overflow-hidden select-none group ${className}`}
      whileHover={{ y: -10, scale: 1.02, rotate: -0.4 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Soft floating shadow + warm floor glow beneath the framed piece */}
      <div className="absolute -inset-1 rounded-xl bg-[radial-gradient(60%_50%_at_50%_100%,rgba(200,161,90,0.10),transparent_70%)] blur-xl opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Frame Outer Border (matte black with gilded edge) */}
      <div className="absolute inset-0 border-[10px] sm:border-[14px] border-[#0A0908] outline outline-1 outline-brand-gold/45 rounded-xl flex flex-col p-1.5 sm:p-3 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.75)]">
        
        {/* Inner Gold Matting Border */}
        <div className="relative w-full h-full border border-brand-gold/80 flex-1 flex flex-col overflow-hidden bg-brand-black canvas-texture shadow-[inset_0_0_34px_rgba(0,0,0,0.65)]">
          
          {/* Warm studio spotlight from above */}
          <div className="absolute inset-0 bg-[radial-gradient(85%_60%_at_50%_0%,rgba(255,240,214,0.14),transparent_70%)] pointer-events-none" />
          
          {/* Subtle Ambient Gold Particle Glow */}
          <div 
            className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-45 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 42%, ${glowColor} 0%, transparent 60%)`
            }}
          />

          {imageUrl ? (
            <>
              <img
                src={imageUrl}
                alt={label}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Luxury vignette to seat the artwork inside the gilded frame */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/55 pointer-events-none" />
            </>
          ) : (
            /* Luxury Vector Calligraphy Placeholder lines (Looks like high-end abstract calligraphy art) */
            <div className="absolute inset-0 flex items-center justify-center p-6 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
            <svg
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full max-w-[85%] max-h-[85%] object-contain"
            >
              {/* Abstract Calligraphic lines that look real */}
              <defs>
                <linearGradient id="goldSheen" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#DFBA73" />
                  <stop offset="50%" stopColor="#C8A15A" />
                  <stop offset="100%" stopColor="#8C6B2E" />
                </linearGradient>
                <filter id="blurFilter" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#C8A15A" floodOpacity="0.25" />
                </filter>
              </defs>

              <g filter="url(#blurFilter)">
                {/* Flowing background calligraphic strokes */}
                <path
                  d="M 30 140 Q 60 170, 100 170 Q 150 170, 170 120 Q 185 80, 155 50 Q 120 20, 80 50 Q 50 80, 90 120 Q 120 150, 150 110"
                  stroke="url(#goldSheen)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  className="opacity-70 group-hover:stroke-brand-gold transition-all duration-700"
                />
                
                {/* Central bold stylized signature stroke */}
                <path
                  d="M 100 35 L 100 135 C 100 170, 75 180, 50 160 Q 30 145, 55 125 Q 75 110, 100 135 Q 125 160, 150 135 L 150 75"
                  stroke="url(#goldSheen)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                  className="group-hover:stroke-brand-gold-dark transition-all duration-700"
                />

                {/* Classical arabic vowel marks & dots */}
                <path d="M 125 45 Q 135 35, 140 47" stroke="url(#goldSheen)" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 65 75 Q 58 65, 52 78" stroke="url(#goldSheen)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <circle cx="100" cy="18" r="4.5" fill="url(#goldSheen)" />
                <circle cx="75" cy="148" r="3.5" fill="url(#goldSheen)" />
                <circle cx="125" cy="148" r="3.5" fill="url(#goldSheen)" />
              </g>
            </svg>
            </div>
          )}

          {/* Glass reflection sheen (shifts gently on hover) */}
          <div className="absolute inset-0 glass-reflect opacity-50 transition-transform duration-700 ease-out group-hover:translate-x-3 pointer-events-none" />

          {/* Arabic Label overlay (Amiri Font) */}
          {arabicLabel && (
            <div className="absolute top-4 left-0 right-0 text-center pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-500">
              <span className="font-arabic text-sm tracking-widest text-brand-gold/80 block drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                {arabicLabel}
              </span>
            </div>
          )}

          {/* Elegant Overlay Museum Placard (Centered or bottom-center plate) */}
          <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md border border-brand-gold/25 py-2.5 px-3 flex flex-col items-center justify-center rounded transition-all duration-500 group-hover:border-brand-gold/55">
            <span className="font-serif text-xs text-brand-gold tracking-[0.25em] uppercase font-semibold text-center">
              {label}
            </span>
            <span className="text-[9px] text-gray-400 tracking-wider mt-0.5 uppercase font-sans text-center">
              Handcrafted Masterpiece
            </span>
          </div>

          {/* Premium Metallic Shine Effect on Hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_3s_infinite] pointer-events-none" />
        </div>
      </div>
      
      {/* Visual styling helper for Tailwind */}
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </motion.div>
  );
}
