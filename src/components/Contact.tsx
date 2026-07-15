/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Phone, Mail, MapPin, Send, MessageCircle, Instagram, Facebook, ShieldAlert } from 'lucide-react';
import Logo from './Logo';

export default function Contact() {
  const [formInput, setFormInput] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormInput({ name: '', email: '', message: '' });
    }, 1500);
  };

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: <MessageCircle size={18} />,
      link: 'https://wa.me/447400000000',
      label: 'Direct Chat',
      color: 'hover:border-green-500/40 hover:text-green-400',
    },
    {
      name: 'Messenger',
      icon: <MessageSquare size={18} />,
      link: 'https://m.me/jarin.atelier',
      label: 'Chat Now',
      color: 'hover:border-blue-500/40 hover:text-blue-400',
    },
    {
      name: 'Instagram',
      icon: <Instagram size={18} />,
      link: 'https://instagram.com/jarin_atelier',
      label: '@jarin_atelier',
      color: 'hover:border-pink-500/40 hover:text-pink-400',
    },
    {
      name: 'Facebook',
      icon: <Facebook size={18} />,
      link: 'https://facebook.com/jarin.atelier',
      label: 'Official Page',
      color: 'hover:border-blue-600/40 hover:text-blue-500',
    },
  ];

  return (
    <section
      id="contact-page-section"
      className="bg-brand-black text-brand-cream py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-white/5"
    >
      {/* Golden spotlight leakage background */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-gold/2 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* About/Contact Header with Official Logo */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="w-44 mb-6">
            <Logo size="custom" customHeight={150} showText={true} />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-wide font-light mb-4">
            Contact Jarin Atelier
          </h2>
          <div className="w-16 h-[1.5px] bg-brand-gold mx-auto" />
        </div>

        {/* Form and Details Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column: Direct Inquiries & Contact Forms */}
          <div className="space-y-10">
            <div>
              <h3 className="font-serif text-2xl text-white font-medium mb-4">
                Arrange a Private Consultation
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
                Whether you desire to commission custom calligraphy, inquire about framing profiles, or discuss trade collaborations with an interior design practice, our concierge team is pleased to assist.
              </p>
            </div>

            {/* Direct Social Messengers Links */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {socialLinks.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`border border-white/5 bg-[#121212]/40 rounded-xl p-4 flex flex-col items-center text-center transition-all duration-500 focus:outline-none ${soc.color}`}
                >
                  <div className="text-brand-gold mb-2">{soc.icon}</div>
                  <span className="font-serif text-xs text-white font-medium block">
                    {soc.name}
                  </span>
                  <span className="text-[9px] text-gray-500 tracking-wider block mt-0.5 uppercase">
                    {soc.label}
                  </span>
                </a>
              ))}
            </div>

            {/* Contact Form */}
            <form id="contact-quick-form" onSubmit={handleFormSubmit} className="space-y-6 bg-[#121212]/30 p-6 sm:p-8 border border-white/5 rounded-2xl shadow-inner">
              <h4 className="font-serif text-base text-white tracking-wide uppercase font-semibold">
                Direct In-App Courier Message
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="contact-name" className="text-[10px] tracking-widest uppercase font-semibold text-gray-500">
                    Your Full Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formInput.name}
                    onChange={handleInputChange}
                    required
                    placeholder="E.g., Sulaiman Al-Hassan"
                    className="w-full bg-brand-black border border-white/10 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors font-sans font-light"
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="contact-email" className="text-[10px] tracking-widest uppercase font-semibold text-gray-500">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formInput.email}
                    onChange={handleInputChange}
                    required
                    placeholder="E.g., sulaiman@domain.com"
                    className="w-full bg-brand-black border border-white/10 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors font-sans font-light"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="contact-message" className="text-[10px] tracking-widest uppercase font-semibold text-gray-500">
                  Your Consultation Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formInput.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Inquire about custom scripts, delivery estimates, or framing consultation details..."
                  className="w-full bg-brand-black border border-white/10 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors font-sans font-light resize-none"
                />
              </div>

              {isSuccess && (
                <div className="bg-brand-gold/10 border border-brand-gold/30 rounded p-4 text-xs text-brand-gold flex items-center space-x-2">
                  <span className="font-semibold">Message Safely Logged:</span>
                  <span>We will reach out to you within 24 hours. Thank you.</span>
                </div>
              )}

              <button
                id="contact-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 bg-brand-gold text-brand-black hover:bg-white text-xs tracking-[0.2em] font-semibold uppercase rounded transition-all duration-500 shadow-md hover:shadow-[0_4px_12px_rgba(200,161,90,0.25)] flex items-center justify-center space-x-2 focus:outline-none cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-brand-black border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <Send size={12} />
                    <span>Send Courier Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Physical Studio Details & Interactive Vector Map */}
          <div className="space-y-10">
            <div>
              <h3 className="font-serif text-2xl text-white font-medium mb-4">
                Atelier Location & Hours
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
                Our main executive consultation salon and archival gallery is located in the premium artistic district of London. Private gallery tours are strictly by appointment only.
              </p>
            </div>

            {/* Direct Coordinates Details cards */}
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="p-2.5 rounded-lg border border-brand-gold/15 bg-[#121212] text-brand-gold">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-sans font-semibold">
                    Atelier Address
                  </span>
                  <span className="font-serif text-sm text-white mt-1 block">
                    Suite 88A, Luxury Galleria Block, Knightsbridge, London, UK
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2.5 rounded-lg border border-brand-gold/15 bg-[#121212] text-brand-gold">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-sans font-semibold">
                    Concierge Hotlines
                  </span>
                  <span className="font-serif text-sm text-white mt-1 block">
                    +44 20 7946 0192 (Direct Call) | +44 74 0000 0000 (WhatsApp)
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2.5 rounded-lg border border-brand-gold/15 bg-[#121212] text-brand-gold">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest block font-sans font-semibold">
                    Direct Email Enquiries
                  </span>
                  <span className="font-serif text-sm text-white mt-1 block hover:text-brand-gold transition-colors">
                    concierge@jarinatelier.com
                  </span>
                </div>
              </div>
            </div>

            {/* Luxury Interactive Vector Map Placeholder */}
            <div className="relative border border-white/5 rounded-2xl bg-brand-black p-4 shadow-[0_15px_40px_rgba(0,0,0,0.6)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-brand-black/20 z-10 pointer-events-none" />
              
              {/* Premium Vector Stylized Map Card */}
              <div className="relative h-64 rounded-xl overflow-hidden bg-[#181818] border border-white/5 flex flex-col items-center justify-center select-none">
                
                {/* SVG Luxury stylized street outline grids */}
                <svg
                  viewBox="0 0 500 250"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0 opacity-20 w-full h-full object-cover"
                >
                  {/* Street grids lines */}
                  <line x1="0" y1="50" x2="500" y2="50" stroke="#C8A15A" strokeWidth="0.8" />
                  <line x1="0" y1="120" x2="500" y2="120" stroke="#C8A15A" strokeWidth="1.2" />
                  <line x1="0" y1="190" x2="500" y2="190" stroke="#C8A15A" strokeWidth="0.8" />
                  
                  <line x1="100" y1="0" x2="100" y2="250" stroke="#C8A15A" strokeWidth="0.8" />
                  <line x1="250" y1="0" x2="250" y2="250" stroke="#C8A15A" strokeWidth="1.5" />
                  <line x1="400" y1="0" x2="400" y2="250" stroke="#C8A15A" strokeWidth="0.8" />
                  
                  <circle cx="250" cy="120" r="45" stroke="#C8A15A" strokeWidth="1" strokeDasharray="5 3" />
                  <circle cx="250" cy="120" r="2" fill="#C8A15A" />
                </svg>

                {/* Map Center Spotlight indicator pin */}
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-10 h-10 rounded-full border border-brand-gold/60 bg-brand-black flex items-center justify-center text-brand-gold shadow-lg"
                  >
                    <MapPin size={18} />
                  </motion.div>
                  
                  {/* Ripple effect rings */}
                  <span className="absolute top-4 w-12 h-12 bg-brand-gold/15 border border-brand-gold/30 rounded-full animate-ping pointer-events-none" />

                  <span className="font-serif text-xs text-white font-medium mt-3 tracking-widest uppercase bg-brand-black/90 px-3 py-1.5 border border-brand-gold/20 rounded shadow-md">
                    Jarin Atelier London
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
