/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Compass, Mail, Send, Sparkles, MapPin, Phone, MessageCircle, Instagram } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handleLinkClick = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="luxury-footer" className="bg-brand-black text-brand-cream border-t border-white/5 pt-20 pb-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background radial spotlight flare */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(circle_at_center,rgba(200,161,90,0.06)_0%,transparent_65%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/5 pb-16">
          
          {/* Column 1: Core Logo and Tagline */}
          <div className="space-y-6 flex flex-col items-start">
            <div className="w-48 cursor-pointer" onClick={() => handleLinkClick('home')}>
              <Logo size="custom" customHeight={120} showText={true} />
            </div>
            <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed max-w-xs pt-2">
              An award-winning boutique Arabic calligraphy studio honoring ancient, divine traditions with material luxury and contemporary elegance.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-5">
            <h4 className="font-serif text-sm text-white tracking-widest uppercase font-semibold flex items-center space-x-2">
              <Sparkles size={12} className="text-brand-gold" />
              <span>Sitemap</span>
            </h4>
            
            <ul className="space-y-3 text-xs sm:text-sm font-sans font-light text-gray-400">
              <li>
                <button onClick={() => handleLinkClick('home')} className="hover:text-brand-gold transition-colors focus:outline-none cursor-pointer">
                  Exhibition Home
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('shop')} className="hover:text-brand-gold transition-colors focus:outline-none cursor-pointer">
                  The Boutique
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('gallery')} className="hover:text-brand-gold transition-colors focus:outline-none cursor-pointer">
                  The Digital Salon Gallery
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('custom-order')} className="hover:text-brand-gold transition-colors focus:outline-none cursor-pointer">
                  Bespoke Commission Form
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('about')} className="hover:text-brand-gold transition-colors focus:outline-none cursor-pointer">
                  Atelier Heritage
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('contact')} className="hover:text-brand-gold transition-colors focus:outline-none cursor-pointer">
                  Atelier Contact Channels
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Atelier Location coordinates */}
          <div className="space-y-5">
            <h4 className="font-serif text-sm text-white tracking-widest uppercase font-semibold flex items-center space-x-2">
              <Compass size={12} className="text-brand-gold" />
              <span>The Atelier HQ</span>
            </h4>

            <ul className="space-y-4 text-xs sm:text-sm font-sans font-light text-gray-400">
              <li className="flex items-start space-x-3">
                <MapPin size={16} className="text-brand-gold shrink-0 mt-0.5" />
                <span>Suite 88A, Luxury Galleria Block, Knightsbridge, London, UK</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={16} className="text-brand-gold shrink-0 mt-0.5" />
                <span>+44 20 7946 0192 (Call)</span>
              </li>
              <li className="flex items-start space-x-3">
                <MessageCircle size={16} className="text-brand-gold shrink-0 mt-0.5" />
                <span>+44 74 0000 0000 (WhatsApp)</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter sign-up */}
          <div className="space-y-5">
            <h4 className="font-serif text-sm text-white tracking-widest uppercase font-semibold flex items-center space-x-2">
              <Mail size={12} className="text-brand-gold" />
              <span>Newsletter Ledger</span>
            </h4>
            
            <p className="text-gray-400 text-xs font-light leading-relaxed">
              Subscribe to receive private invitations to physical exhibition salon unveilings and bespoke collection releases.
            </p>

            <form id="newsletter-form" onSubmit={handleSubscribe} className="relative mt-4">
              <input
                id="newsletter-email-input"
                type="email"
                required
                placeholder="Enter email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#121212] border border-white/10 rounded pr-12 pl-4 py-3 text-xs text-white focus:outline-none focus:border-brand-gold transition-colors font-sans"
              />
              <button
                id="newsletter-submit-btn"
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-brand-gold hover:text-white transition-colors focus:outline-none cursor-pointer"
                aria-label="Subscribe"
              >
                <Send size={14} />
              </button>
            </form>

            {subscribed && (
              <span className="text-[11px] text-brand-gold font-sans block mt-2 animate-fade-in">
                Successfully ledgered. Welcome to the Inner Circle.
              </span>
            )}
          </div>

        </div>

        {/* Bottom copyright details */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-[11px] text-gray-500 font-sans font-light">
          <p>© {currentYear} Jarin Atelier. Sacred Traditional Handcrafts. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">Facebook</a>
            <a href="https://wa.me/something" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">WhatsApp</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
