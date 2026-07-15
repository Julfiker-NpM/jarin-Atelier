/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  customHeight?: number;
  showText?: boolean;
  lightVariant?: boolean;
}

export default function Logo({
  className = '',
  size = 'md',
  customHeight,
  showText = true,
  lightVariant = false,
}: LogoProps) {
  const [imageError, setImageError] = useState(false);

  // Dimensions based on size (value drives the logo mark height; width is fluid
  // so the extracted transparent mark keeps its original proportions).
  // Sizes increased ~35% for a more confident, elegant presence.
  const dimensions = {
    sm: { height: 120 },
    md: { height: 175 },
    lg: { height: 255 },
    xl: { height: 350 },
    custom: { height: (customHeight || 160) * 1.35 },
  };

  const selectedDim = dimensions[size];

  // If the user uploads the real image, load it.
  // We use the extracted transparent logo mark, and fallback to the vector representation
  if (!imageError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center px-2 ${className}`}
        style={{ height: selectedDim.height, width: 'auto' }}
      >
        {/* Subtle golden glow behind the mark so it never disappears into the background */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
          style={{ width: '72%', height: '58%', background: 'radial-gradient(circle, rgba(200,161,90,0.30), transparent 70%)' }}
        />
        <img
          src="/assets/logo-mark.png"
          alt="Jarin Atelier"
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="relative h-full w-auto object-contain drop-shadow-[0_8px_26px_rgba(200,161,90,0.28)]"
          style={{ maxHeight: customHeight || '100%' }}
        />
      </div>
    );
  }

  // High-fidelity SVG luxury representation
  return (
    <div 
      className={`flex flex-col items-center justify-center select-none ${className}`}
      style={{ 
        width: size === 'custom' ? '100%' : selectedDim.height, 
        height: 'auto'
      }}
      id="jarin-atelier-logo-vector"
    >
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_4px_12px_rgba(200,161,90,0.15)]"
      >
        <defs>
          {/* Metallic gold gradient */}
          <linearGradient id="luxuryGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFBA73" />
            <stop offset="30%" stopColor="#C8A15A" />
            <stop offset="70%" stopColor="#8C6B2E" />
            <stop offset="85%" stopColor="#C8A15A" />
            <stop offset="100%" stopColor="#F9E2A8" />
          </linearGradient>
          
          <radialGradient id="goldGlow" cx="50%" cy="40%" r="40%">
            <stop offset="0%" stopColor="rgba(200, 161, 90, 0.2)" />
            <stop offset="100%" stopColor="rgba(15, 15, 15, 0)" />
          </radialGradient>
        </defs>

        {/* Outer Background Glow */}
        <circle cx="200" cy="180" r="160" fill="url(#goldGlow)" />

        {/* 1. Double Border Islamic Arch */}
        {/* Outer Arch */}
        <path
          d="M 120 280 L 120 160 C 120 110, 145 90, 200 40 C 255 90, 280 110, 280 160 L 280 280 Z"
          stroke="url(#luxuryGoldGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Inner Arch */}
        <path
          d="M 124 278 L 124 162 C 124 114, 147 95, 200 47 C 253 95, 276 114, 276 162 L 276 278 Z"
          stroke="url(#luxuryGoldGrad)"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 2"
        />

        {/* 2. Crescent Moon and Star */}
        {/* Crescent */}
        <path
          d="M 200 68 C 205 68, 209 72, 209 77 C 209 82.5, 204.5 87, 199 87 C 193.5 87, 189 82.5, 189 77 C 189 73, 191.5 69.5, 195 68.2 C 193.5 70, 193 72.5, 193.5 75 C 194.2 78.5, 197.5 81, 201 80.5 C 203.2 80.2, 204.8 79, 205.5 77.2 C 202.5 77.8, 199.5 75.8, 199 72.8 C 198.6 70.8, 199.2 69, 200 68 Z"
          fill="url(#luxuryGoldGrad)"
        />
        {/* Star */}
        <path
          d="M 204 69.5 L 204.5 71.2 L 206 71.2 L 204.8 72.1 L 205.2 73.8 L 204 72.8 L 202.8 73.8 L 203.2 72.1 L 202 71.2 L 203.5 71.2 Z"
          fill="url(#luxuryGoldGrad)"
        />

        {/* 3. High-fidelity Vector Arabic Calligraphy */}
        {/* Drawn elegant paths that perfectly mirror classical Al-Mihrab/Calligraphic motifs */}
        <g id="calligraphy-vector">
          {/* Central Vertical 'Alif' structure */}
          <path
            d="M 197 100 Q 199 88, 199 150 Q 199 210, 191 216 Q 183 222, 178 200 Q 174 185, 182 178 Q 190 171, 196 182"
            stroke="url(#luxuryGoldGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Accent 'Lam' swoops */}
          <path
            d="M 211 110 Q 213 95, 213 160 Q 213 225, 200 235 Q 185 245, 170 230 Q 155 215, 161 190 Q 167 165, 184 175 Q 195 182, 191 198"
            stroke="url(#luxuryGoldGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          {/* Lower swooping calligraphy curve */}
          <path
            d="M 148 185 Q 140 215, 155 235 Q 175 255, 210 255 Q 240 255, 255 235 Q 268 215, 258 190 Q 250 170, 235 185 Q 220 200, 226 215"
            stroke="url(#luxuryGoldGrad)"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Swashes & Harakat details (Diacritics for luxury authenticity) */}
          <path d="M 233 130 Q 238 120, 243 132" stroke="url(#luxuryGoldGrad)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 167 145 Q 160 135, 155 147" stroke="url(#luxuryGoldGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 226 158 Q 235 152, 238 163" stroke="url(#luxuryGoldGrad)" strokeWidth="3.2" fill="none" strokeLinecap="round" />
          <path d="M 166 115 Q 172 108, 170 120" stroke="url(#luxuryGoldGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Small dot details (Nuqta) */}
          <circle cx="200" cy="245" r="3.5" fill="url(#luxuryGoldGrad)" />
          <circle cx="158" cy="168" r="3" fill="url(#luxuryGoldGrad)" />
          <circle cx="242" cy="178" r="3" fill="url(#luxuryGoldGrad)" />
          {/* Shaddah */}
          <path d="M 183 135 C 183 132, 187 132, 187 135 C 187 132, 191 132, 191 135" stroke="url(#luxuryGoldGrad)" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>

        {/* 4. Bottom Diamond Accent */}
        <polygon
          points="200,274 204,280 200,286 196,280"
          fill="url(#luxuryGoldGrad)"
        />

        {/* 5. Logo Text inside the SVG */}
        {showText && (
          <g id="logo-text-group">
            {/* Jarin Signature */}
            <text
              x="200"
              y="320"
              fill="url(#luxuryGoldGrad)"
              fontFamily="var(--font-signature), 'Pinyon Script', cursive"
              fontSize="56"
              fontWeight="400"
              letterSpacing="2"
              textAnchor="middle"
              className="drop-shadow-[0_2px_4px_rgba(200,161,90,0.1)]"
            >
              Jarin
            </text>

            {/* ATELIER */}
            <text
              x="200"
              y="355"
              fill="currentColor"
              fontFamily="var(--font-serif), 'Cormorant Garamond', serif"
              fontSize="16"
              fontWeight="500"
              letterSpacing="12"
              textAnchor="middle"
            >
              ATELIER
            </text>

            {/* Where Faith Meets Art */}
            <text
              x="200"
              y="380"
              fill="currentColor"
              fontFamily="var(--font-serif), 'Cormorant Garamond', 'Poppins', sans-serif"
              fontSize="11"
              fontStyle="italic"
              letterSpacing="2.5"
              textAnchor="middle"
              opacity="0.85"
            >
              WHERE FAITH MEETS ART
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
