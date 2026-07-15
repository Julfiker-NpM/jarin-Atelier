/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Heart, Instagram, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { useAtelier } from '../atelier-context';

interface NavLinkDef {
  id: string;
  label: string;
  path: string;
}

const NAV_LINKS: NavLinkDef[] = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'shop', label: 'Boutique', path: '/shop' },
  { id: 'gallery', label: 'Exhibitions', path: '/gallery' },
  { id: 'custom-order', label: 'Bespoke Order', path: '/bespoke' },
  { id: 'about', label: 'Our Story', path: '/about' },
  { id: 'contact', label: 'Atelier Contact', path: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, wishlistIds, openCart, openWishlist } = useAtelier();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const handleNavClick = (path: string) => {
    setIsMobileMenuOpen(false);
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top micro-banner for luxury feel */}
      <div className="bg-brand-black border-b border-brand-gold/10 py-1.5 text-center text-[10px] tracking-[0.2em] text-brand-gold font-sans uppercase relative z-40 hidden sm:block">
        Complimentary fully-insured museum-grade shipping worldwide
      </div>

      <header
        id="luxury-navbar"
        className={`sticky top-0 z-30 transition-all duration-500 ${
          isScrolled
            ? 'glass-nav py-2 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'bg-transparent py-4 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Left Section: Mobile Menu Icon */}
            <div className="flex items-center md:hidden">
              <button
                id="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                className="text-brand-cream hover:text-brand-gold transition-colors focus:outline-none p-2"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

            {/* Left Section (Desktop): Navigation Links */}
            <nav className="hidden md:flex space-x-9 lg:space-x-12">
              {NAV_LINKS.slice(0, 3).map((link) => (
                 <button
                   id={`nav-link-${link.id}`}
                   key={link.id}
                   onClick={() => handleNavClick(link.path)}
                   className="relative py-2 text-xs lg:text-[13px] uppercase tracking-[0.22em] font-medium focus:outline-none cursor-pointer"
                 >
                   <span className={`nav-link-lux ${isActive(link.path) ? 'is-active' : ''}`}>
                     {link.label}
                   </span>
                   {isActive(link.path) && (
                     <motion.div
                       layoutId="activeNavLine"
                       className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-gold"
                       transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                     />
                   )}
                 </button>
               ))}
            </nav>

            {/* Center Section: Core Brand Logo */}
            <div 
              className="flex justify-center items-center cursor-pointer transition-transform duration-500 hover:scale-102"
              onClick={() => handleNavClick('/')}
            >
              <div className="w-40 sm:w-44 flex items-center justify-center">
                <Logo size="custom" customHeight={75} showText={true} />
              </div>
            </div>

            {/* Right Section (Desktop): Navigation + Icons */}
            <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8">
               
               {/* Other Navigation Links */}
                <nav className="hidden md:flex space-x-9 lg:space-x-12 mr-2">
                  {NAV_LINKS.slice(3).map((link) => (
                  <button
                    id={`nav-link-${link.id}`}
                    key={link.id}
                    onClick={() => handleNavClick(link.path)}
                    className="relative py-2 text-xs lg:text-[13px] uppercase tracking-[0.22em] font-medium focus:outline-none cursor-pointer"
                  >
                    <span className={`nav-link-lux ${isActive(link.path) ? 'is-active' : ''}`}>
                      {link.label}
                    </span>
                    {isActive(link.path) && (
                      <motion.div
                        layoutId="activeNavLine"
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-gold"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </nav>

              {/* Wishlist Button */}
              <button
                id="wishlist-btn"
                onClick={openWishlist}
                className="relative text-brand-cream hover:text-brand-gold transition-colors p-2 focus:outline-none cursor-pointer"
                aria-label="Wishlist"
              >
                <Heart size={20} className={wishlistIds.length > 0 ? 'fill-brand-gold text-brand-gold' : ''} />
                {wishlistIds.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-brand-black">
                    {wishlistIds.length}
                  </span>
                )}
              </button>

              {/* Shopping Cart Button */}
              <button
                id="cart-btn"
                onClick={openCart}
                className="relative text-brand-cream hover:text-brand-gold transition-colors p-2 focus:outline-none cursor-pointer"
                aria-label="Shopping Cart"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-brand-black">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/90 md:hidden"
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 bottom-0 left-0 w-4/5 max-w-sm z-50 bg-brand-black border-r border-brand-gold/15 p-6 flex flex-col justify-between md:hidden"
            >
              <div>
                {/* Header with Close */}
                <div className="flex items-center justify-between pb-6 border-b border-white/5">
                  <div className="w-32">
                    <Logo size="custom" customHeight={65} showText={false} />
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-brand-cream hover:text-brand-gold p-2"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="mt-8 space-y-6">
                  {NAV_LINKS.map((link, i) => (
                    <motion.button
                      id={`mobile-nav-link-${link.id}`}
                      key={link.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleNavClick(link.path)}
                      className="block w-full text-left font-serif text-lg tracking-[0.2em] uppercase transition-colors py-1 focus:outline-none"
                    >
                      <span className={isActive(link.path) ? 'text-brand-gold border-b border-brand-gold pb-1' : 'text-gray-300 hover:text-white'}>
                        {link.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Drawer Footer with Quick Studio Info */}
              <div className="border-t border-white/5 pt-6 space-y-4">
                <p className="font-serif italic text-xs text-gray-400 tracking-wider text-center">
                  "Where Faith Meets Art"
                </p>
                <div className="flex justify-center space-x-6 text-brand-gold">
                  <a href="https://instagram.com/jarin_atelier" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    <Instagram size={18} />
                  </a>
                  <a href="https://wa.me/8801890770297" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    <Send size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
