/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  return (
    <section
      id="testimonials-section"
      className="bg-brand-black text-brand-cream py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-white/5"
    >
      {/* Background Soft Ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-brand-gold/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-brand-olive/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 text-brand-gold text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold">
            <Quote size={12} />
            <span>COLLECTOR VOICE</span>
          </div>
          <h2 className="reveal font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-wide font-light mb-4">
            Words of Devoted Appreciation
          </h2>
          <div className="w-16 h-[1.5px] bg-brand-gold mx-auto" />
        </div>

        {/* Testimonials Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#121212]/30 border border-white/5 hover:border-brand-gold/15 rounded-2xl p-8 shadow-[0_15px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between relative group transition-colors duration-500"
            >
              {/* Card top details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-brand-gold">
                  <div className="flex space-x-0.5">
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} size={14} className="fill-current" />
                    ))}
                  </div>
                  <Quote size={18} className="opacity-20 group-hover:opacity-40 transition-opacity" />
                </div>

                <p className="font-sans text-xs sm:text-sm text-gray-300 font-light leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              {/* Card bottom details */}
              <div className="pt-6 border-t border-white/5 mt-6">
                <h4 className="font-serif text-sm text-white font-medium">
                  {t.name}
                </h4>
                <div className="flex items-center justify-between mt-1 text-[10px] text-gray-500">
                  <span className="font-sans tracking-wide">
                    {t.role}
                  </span>
                  <span className="font-sans italic">
                    {t.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Brand quality sign-off stamp */}
        <div className="text-center mt-16">
          <p className="font-serif text-xs text-brand-gold tracking-widest uppercase flex items-center justify-center space-x-2">
            <Sparkles size={12} />
            <span>99.8% Archival Customer Satisfaction Worldwide</span>
          </p>
        </div>

      </div>
    </section>
  );
}
