/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowDown, Compass, Sparkles } from 'lucide-react';
import Logo from './Logo';

interface HeroProps {
  onExploreClick: () => void;
  onCustomClick: () => void;
}

export default function Hero({ onExploreClick, onCustomClick }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // High-performance Framer Motion springs for fluid mouse tracking
  const rotateX = useSpring(0, { stiffness: 75, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 75, damping: 20 });
  const translatePercentX = useSpring(0, { stiffness: 75, damping: 20 });
  const translatePercentY = useSpring(0, { stiffness: 75, damping: 20 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Normalized coordinates from -0.5 to 0.5
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    
    rotateX.set(-y * 22); // Max 22 degrees tilt
    rotateY.set(x * 22);
    translatePercentX.set(x * 15); // Max 15px drift
    translatePercentY.set(y * 15);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    translatePercentX.set(0);
    translatePercentY.set(0);
  };

  return (
    <section 
      id="hero-section" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[105vh] flex flex-col items-center justify-center text-center overflow-hidden bg-[#070707] px-4 sm:px-6 lg:px-8 py-16"
    >
      {/* Cinematic Golden Spotlights & Particle Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft, centered museum down-light spotlight */}
        <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[80%] max-w-5xl h-[700px] bg-[radial-gradient(circle_at_center,rgba(200,161,90,0.18)_0%,transparent_70%)] opacity-90" />
        {/* Subtle, ambient floating dust in the spotlight rays */}
        <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-brand-gold/5 via-transparent to-transparent opacity-40" />
      </div>

      {/* Luxury Border Outline inside the Hero section */}
      <div className="absolute inset-4 sm:inset-6 border border-brand-gold/10 rounded-xl pointer-events-none z-10">
        <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-brand-gold/30" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-brand-gold/30" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-brand-gold/30" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-brand-gold/30" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl w-full flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 pt-8">
        
        {/* 1. INTERACTIVE 3D ARTWORK FRAME (Left Column on large displays) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            rotateX: rotateX,
            rotateY: rotateY,
            x: translatePercentX,
            y: translatePercentY,
            transformStyle: 'preserve-3d',
            perspective: 1200,
          }}
          className="w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] shrink-0"
        >
          {/* Large gilded centerpiece — clean gallery image, premium & uncluttered */}
          <div className="relative group p-3 sm:p-4 bg-white rounded-2xl border border-brand-gold/35 shadow-[0_30px_70px_-22px_rgba(181,135,60,0.40)] transition-all duration-700 hover:border-brand-gold/60">
            {/* Soft light sheen across the card */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/60 to-transparent opacity-70 pointer-events-none z-10" />

            <div className="relative overflow-hidden rounded-xl bg-brand-black">
              <img
                src="/assets/art-01.png"
                alt="Jarin Atelier — Surah An-Nur gold-gilded masterpiece"
                referrerPolicy="no-referrer"
                loading="eager"
                decoding="async"
                className="w-full h-auto object-cover rounded-xl transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
              {/* Hairline gold inner frame line */}
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-brand-gold/45 pointer-events-none" />
            </div>

            {/* Museum brass nameplate detail under the frame */}
            <div className="mt-4 sm:mt-5 py-2 px-4 bg-gradient-to-r from-brand-gold/5 via-brand-gold/15 to-brand-gold/5 border border-brand-gold/35 rounded text-center shadow-inner">
              <p className="font-serif text-[10px] tracking-[0.3em] text-brand-gold font-bold uppercase">
                JARIN ATELIER • EXCLUSIVITY
              </p>
              <p className="text-[8px] text-gray-500 font-sans uppercase tracking-widest mt-0.5">
                Archival Gold-Gilded Calligraphy On Belgian Linen
              </p>
            </div>
          </div>
        </motion.div>

        {/* 2. COPPERPLATE TYPOGRAPHY & INTRO (Right Column on large displays) */}
        <div className="flex-1 max-w-xl text-center lg:text-left flex flex-col items-center lg:items-start">
          
          {/* Brand Core Label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="text-brand-gold text-[10px] sm:text-xs tracking-[0.35em] uppercase font-semibold mb-6 flex items-center space-x-2"
          >
            <Sparkles size={11} className="text-brand-gold" />
            <span>THE CELESTIAL SALON EXHIBITION</span>
            <Sparkles size={11} className="text-brand-gold" />
          </motion.div>

          {/* Headline */}
           <motion.h1
             initial={{ opacity: 0, y: 28 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.65, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="font-serif text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-7xl xl:text-8xl text-white font-light tracking-[0.01em] mb-7"
           >
             Where Faith Meets
             <br />
             <span className="gold-text font-serif italic font-medium">Art</span>
           </motion.h1>

           {/* Subtitle */}
           <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.95, duration: 1.5 }}
              className="font-sans text-base sm:text-lg text-brand-muted tracking-wide font-light leading-relaxed mb-10 max-w-md lg:max-w-lg"
           >
             Timeless hand-gilded calligraphy, crafted as heirloom masterpieces for the modern sanctuary.
           </motion.p>

           {/* Action Buttons */}
           <motion.div
             initial={{ opacity: 0, y: 15 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 1.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
             className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-5 w-full px-4 sm:px-0"
           >
             {/* Explore Button */}
             <button
               id="hero-explore-btn"
               onClick={onExploreClick}
               className="group btn-gold w-full sm:w-auto px-9 py-4 text-[12px] tracking-[0.2em] font-semibold uppercase rounded-full flex items-center justify-center space-x-2 focus:outline-none cursor-pointer"
             >
               <Compass size={15} className="transition-transform group-hover:rotate-45 duration-500" />
               <span>Explore Collection</span>
             </button>

             {/* Bespoke Button */}
             <button
               id="hero-custom-btn"
               onClick={onCustomClick}
               className="group btn-outline w-full sm:w-auto px-9 py-4 text-[12px] tracking-[0.2em] font-semibold uppercase rounded-full flex items-center justify-center space-x-2 focus:outline-none cursor-pointer"
             >
               <span>Commission Custom Artwork</span>
             </button>
           </motion.div>

        </div>
      </div>

      {/* Scroll Indicator Icon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center text-brand-gold cursor-pointer z-10"
        onClick={() => {
          const featuredSection = document.getElementById('featured-collection-section');
          if (featuredSection) {
            featuredSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <span className="text-[9px] tracking-[0.25em] uppercase mb-2 font-sans opacity-70">
          Scroll To Enter Boutique
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
