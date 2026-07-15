/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Award, Compass, Heart, Feather, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <section
      id="about-story-section"
      className="bg-brand-black text-brand-cream py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-white/5"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-gold/4 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* About Section Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center space-x-2 text-brand-gold text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold">
            <Compass size={12} />
            <span>Legacy & Heritage</span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-wide font-light mb-4">
            The Story of Jarin Atelier
          </h2>
          
          <div className="w-16 h-[1.5px] bg-brand-gold mx-auto mb-6" />
          
          <p className="font-serif italic text-xs sm:text-sm text-brand-gold/80 tracking-widest uppercase">
            A sanctuary where modern elegance honors divine tradition.
          </p>
        </div>

        {/* Master Column Storyboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Interactive Visual Calligraphy Studio Desk Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:pr-4"
          >
            {/* Visual Studio Oak/Mahogany Workspace Board */}
            <div className="relative border border-brand-gold/20 rounded-2xl bg-[#0b0c0c] p-6 sm:p-8 overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.8)]">
              {/* Natural Warm Sunlight Beams Streaming Over Desk (CSS Gradient Overlay) */}
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(200,161,90,0.18)_0%,transparent_50%,rgba(0,0,0,0.6)_100%)] pointer-events-none z-10" />
              {/* Subtle visual wood texture overlay */}
              <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,transparent_100%)] pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-brand-gold tracking-[0.3em] uppercase font-bold">
                      THE ARTIST'S DESK
                    </span>
                    <h3 className="font-serif text-xl text-white font-medium mt-1">
                      Visualizing the Sacred Sanctuary
                    </h3>
                  </div>
                  <div className="px-3 py-1 bg-brand-gold/10 border border-brand-gold/30 rounded text-[9px] text-brand-gold tracking-widest font-sans uppercase font-bold">
                    Tactile Inspection
                  </div>
                </div>

                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  Stepping inside our Knightsbridge atelier reveals a centuries-old sanctuary. Stretched Belgian linen drying under soft clerestory windows, the earthy aroma of natural hand-ground mineral pigments, and the precise, rhythmic sound of Persian reeds sweeping across textured canvases.
                </p>

                {/* Grid of the Calligrapher's Sacred Tools */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Tool 1: Persian Qalam */}
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-brand-gold/35 transition-all duration-500 hover:bg-white/[0.04] group/tool">
                    <div className="w-10 h-10 rounded-lg bg-brand-gold/5 border border-brand-gold/20 flex items-center justify-center text-brand-gold mb-3 transition-colors group-hover/tool:bg-brand-gold/20">
                      <Feather size={16} />
                    </div>
                    <h4 className="font-serif text-xs text-white font-semibold tracking-wider group-hover/tool:text-brand-gold transition-colors">
                      Persian Qalam Reeds
                    </h4>
                    <p className="text-[10px] text-gray-400 font-light mt-1.5 leading-normal">
                      Iranian bamboo reeds seasoned for years, hand-shaved at a sharp 35° angle to draw fine ink hairlines.
                    </p>
                  </div>

                  {/* Tool 2: Soot & Lapis Inks */}
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-brand-gold/35 transition-all duration-500 hover:bg-white/[0.04] group/tool">
                    <div className="w-10 h-10 rounded-lg bg-brand-gold/5 border border-brand-gold/20 flex items-center justify-center text-brand-gold mb-3 transition-colors group-hover/tool:bg-brand-gold/20">
                      <Sparkles size={16} />
                    </div>
                    <h4 className="font-serif text-xs text-white font-semibold tracking-wider group-hover/tool:text-brand-gold transition-colors">
                      Earthy Soot Inks
                    </h4>
                    <p className="text-[10px] text-gray-400 font-light mt-1.5 leading-normal">
                      Traditional recipes boiling kerosene lamp soot with organic gum Arabic and deep lapis-lazuli mineral blues.
                    </p>
                  </div>

                  {/* Tool 3: 24K Gold Leaf */}
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-brand-gold/35 transition-all duration-500 hover:bg-white/[0.04] group/tool">
                    <div className="w-10 h-10 rounded-lg bg-brand-gold/5 border border-brand-gold/20 flex items-center justify-center text-brand-gold mb-3 transition-colors group-hover/tool:bg-brand-gold/20">
                      <Award size={16} />
                    </div>
                    <h4 className="font-serif text-xs text-white font-semibold tracking-wider group-hover/tool:text-brand-gold transition-colors">
                      Agate-Burnished Gold
                    </h4>
                    <p className="text-[10px] text-gray-400 font-light mt-1.5 leading-normal">
                      Brilliant 24-karat gold leaf gently applied with soft badger brushes and burnished with smooth agate stone.
                    </p>
                  </div>

                  {/* Tool 4: Pure Linen */}
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-brand-gold/35 transition-all duration-500 hover:bg-white/[0.04] group/tool">
                    <div className="w-10 h-10 rounded-lg bg-brand-gold/5 border border-brand-gold/20 flex items-center justify-center text-brand-gold mb-3 transition-colors group-hover/tool:bg-brand-gold/20">
                      <Heart size={16} />
                    </div>
                    <h4 className="font-serif text-xs text-white font-semibold tracking-wider group-hover/tool:text-brand-gold transition-colors">
                      Belgian Canvas
                    </h4>
                    <p className="text-[10px] text-gray-400 font-light mt-1.5 leading-normal">
                      Heavy organic Belgian flax fibers, stretched tightly over kiln-dried red pine and primed with natural gesso layers.
                    </p>
                  </div>
                </div>

                {/* Scribe quote banner */}
                <div className="p-4 border border-brand-gold/20 rounded-xl bg-brand-black/90 flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute right-[-10px] bottom-[-20px] text-brand-gold/5 font-arabic text-7xl select-none pointer-events-none">
                    قلم
                  </div>
                  <p className="font-serif italic text-xs text-brand-gold/95 leading-relaxed relative z-10">
                    "When the Qalam touches the gessoed flax, it is not writing, but a celestial choreography—the hand surrenders to geometry to reflect a divine code."
                  </p>
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest mt-2 block font-sans font-semibold">
                    — Master Scribe, Jarin Atelier
                  </span>
                </div>
              </div>
            </div>

            {/* Accent gold circle frame seal */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 border border-brand-gold/15 rounded-full flex items-center justify-center p-1.5 hidden sm:flex pointer-events-none z-20 bg-[#070707]/90 backdrop-blur-sm shadow-xl">
              <div className="border border-dashed border-brand-gold/25 w-full h-full rounded-full flex items-center justify-center text-[7px] text-brand-gold tracking-widest font-sans uppercase text-center font-bold">
                Knightsbridge Scribe
              </div>
            </div>
          </motion.div>

          {/* Right Column: Mission, Vision, and Devotional Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10"
          >
            <div>
              <span className="font-serif text-xs text-brand-gold tracking-[0.2em] uppercase font-bold block mb-2">
                01. Our Passionate Devotion
              </span>
              <p className="font-sans text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                Founded with a devotion to preserving the high tradition of Islamic calligraphy, <strong>Jarin Atelier</strong> bridges the rich spiritual history of sacred writing with modern luxury interior aesthetics. We craft bespoke works of art designed to introduce light, serenity, and blessings into contemporary residences, galleries, and corporate workspaces.
              </p>
            </div>

            <div>
              <span className="font-serif text-xs text-brand-gold tracking-[0.2em] uppercase font-bold block mb-2">
                02. The Sacred Mission
              </span>
              <p className="font-sans text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                Our mission is to ensure that the beauty of Allah’s words resides in your sanctuary with true material authenticity. By rejecting printed mass-production, we protect and advocate for traditional handcrafted techniques, utilizing premium sustainable linens, real gold leaf gilding, and masterfully hand-joined timber structures.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/5">
              <div className="p-4 bg-brand-black/40 border border-white/5 rounded-lg">
                <div className="text-brand-gold mb-2">
                  <Sparkles size={18} />
                </div>
                <h4 className="font-serif text-sm text-white font-medium mb-1">
                  100% Spiritual Authenticity
                </h4>
                <p className="text-xs text-gray-400 font-light">
                  Never printed or mass-produced. Every single piece holds its own soul.
                </p>
              </div>

              <div className="p-4 bg-brand-black/40 border border-white/5 rounded-lg">
                <div className="text-brand-gold mb-2">
                  <Award size={18} />
                </div>
                <h4 className="font-serif text-sm text-white font-medium mb-1">
                  Museum Quality Specs
                </h4>
                <p className="text-xs text-gray-400 font-light">
                  Anti-reflective UV protective glazing and seasoned premium timbers.
                </p>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
