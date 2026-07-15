/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Star, Heart, Palette, Truck } from 'lucide-react';

const STATS = [
  { icon: Heart, value: '500+', label: 'Happy Clients' },
  { icon: Palette, value: '1,200+', label: 'Completed Artworks' },
  { icon: Star, value: '100%', label: 'Handcrafted' },
  { icon: Truck, value: '30+', label: 'Nations Delivered' },
];

export default function SocialProof() {
  return (
    <section className="relative bg-brand-black text-brand-cream py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center space-x-2 text-brand-gold text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold">
            <span className="h-px w-8 bg-brand-gold/50" />
            <span>Trusted Worldwide</span>
            <span className="h-px w-8 bg-brand-gold/50" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-wide">
            A Legacy of <span className="gold-text">Devotion</span> & Craft
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center px-4"
            >
              <div className="mx-auto mb-4 w-12 h-12 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold">
                <stat.icon size={20} />
              </div>
              <div className="font-serif text-4xl sm:text-5xl text-brand-gold font-medium leading-none mb-2">
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-xs tracking-[0.2em] uppercase text-gray-400 font-sans">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
