/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Sparkles, PencilRuler, Hammer, Truck, Box, Gem } from 'lucide-react';

export default function WhyChooseUs() {
  const pillars = [
    {
      icon: <Hammer className="text-brand-gold" size={24} />,
      title: '100% Handmade',
      desc: 'Absolutely no printing. Every work is scripted brushstroke-by-brushstroke and gilded by hand with authentic 24k gold leaf.',
    },
    {
      icon: <Gem className="text-brand-gold" size={24} />,
      title: 'Premium Materials',
      desc: 'Sourced finest materials worldwide: Belgian raw linen, archival cotton, premium solid oak, and museum-grade anti-glare protective glass.',
    },
    {
      icon: <PencilRuler className="text-brand-gold" size={24} />,
      title: 'Custom Design',
      desc: 'Collaborate directly with our master calligrapher to design bespoke sizes, scripts, and backgrounds tailored to your interiors.',
    },
    {
      icon: <ShieldCheck className="text-brand-gold" size={24} />,
      title: 'Luxury Framing',
      desc: 'Each masterwork is mounted in a custom hand-jointed deep-profile wood frame with gold trim, finished with velvet backing.',
    },
    {
      icon: <Truck className="text-brand-gold" size={24} />,
      title: 'Worldwide Delivery',
      desc: 'Fully insured express shipping globally. We partner with white-glove transport services to guarantee flawless museum arrival.',
    },
    {
      icon: <Box className="text-brand-gold" size={24} />,
      title: 'Secure Crate Packaging',
      desc: 'Artworks are secured in custom foam-padded presentation boxes or reinforced wooden gallery crates depending on scale.',
    },
  ];

  return (
    <section
      id="why-choose-us-section"
      className="bg-brand-black text-brand-cream py-24 px-4 sm:px-6 lg:px-8 relative border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 text-brand-gold text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold">
            <Sparkles size={12} />
            <span>Artisan Standards</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-wide font-light mb-4">
            The Pillars of Jarin Craftsmanship
          </h2>
          <div className="w-16 h-[1.5px] bg-brand-gold mx-auto" />
        </div>

        {/* Pillars Bento-Style Luxury Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((p, index) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              className="bg-[#121212] border border-white/5 hover:border-brand-gold/25 p-8 rounded-xl transition-all duration-500 relative group"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/1 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              
              <div className="mb-5 w-12 h-12 rounded-lg bg-brand-black border border-brand-gold/15 flex items-center justify-center transition-all duration-500 group-hover:border-brand-gold/45 shadow-inner">
                {p.icon}
              </div>

              <h3 className="font-serif text-lg text-white font-medium mb-3 group-hover:text-brand-gold transition-colors duration-300">
                {p.title}
              </h3>

              <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
