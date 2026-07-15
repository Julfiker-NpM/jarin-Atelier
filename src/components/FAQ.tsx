/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Sparkles, HelpCircle } from 'lucide-react';
import { FAQS } from '../data';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('faq-01'); // First item open by default

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq-accordion-section"
      className="bg-brand-black text-brand-cream py-24 px-4 sm:px-6 lg:px-8 relative border-t border-white/5"
    >
      <div className="max-w-3xl mx-auto relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 text-brand-gold text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold">
            <HelpCircle size={12} />
            <span>EXPERT GUIDANCE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-wide font-light mb-4">
            Frequently Asked Inquiries
          </h2>
          <div className="w-16 h-[1.5px] bg-brand-gold mx-auto" />
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                id={`faq-item-${faq.id}`}
                key={faq.id}
                className="border border-white/5 bg-[#121212]/30 rounded-xl overflow-hidden transition-colors duration-500 hover:border-brand-gold/15"
              >
                {/* Trigger Button */}
                <button
                  id={`faq-btn-${faq.id}`}
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-6 flex justify-between items-center space-x-4 focus:outline-none cursor-pointer"
                >
                  <span className="font-serif text-base sm:text-lg text-white font-medium hover:text-brand-gold transition-colors duration-300">
                    {faq.question}
                  </span>
                  <div className="text-brand-gold p-1.5 rounded-full border border-brand-gold/10 bg-brand-black flex items-center justify-center">
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {/* Animated content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-white/3 font-sans text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
