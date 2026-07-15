/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, ShieldCheck, CheckCircle2, Send } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export default function Cart({ isOpen, onClose, cartItems, onRemoveItem, onClearCart }: CartProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 0 : 0; // Complimentary shipping
  const total = subtotal + shipping;

  const handleCheckoutSubmit = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
    }, 2000);
  };

  const handleDone = () => {
    setCheckoutComplete(false);
    onClearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/80"
          />

          {/* Drawer Panel */}
          <motion.div
            id="cart-drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 bottom-0 right-0 w-full sm:w-110 z-50 bg-brand-black border-l border-brand-gold/15 p-6 flex flex-col justify-between shadow-[0_0_60px_rgba(0,0,0,0.9)] text-brand-cream overflow-y-auto"
          >
            <AnimatePresence mode="wait">
              {!checkoutComplete ? (
                /* =============================================================
                   ACTIVE CART STATE
                   ============================================================= */
                <motion.div
                  key="cart-active"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col h-full justify-between"
                >
                  <div>
                    {/* Header with Close */}
                    <div className="flex items-center justify-between pb-4 border-b border-white/5">
                      <div className="flex items-center space-x-2 text-brand-gold">
                        <ShoppingBag size={20} />
                        <h3 className="font-serif text-lg uppercase tracking-widest font-semibold">
                          Your Acquisition Portfolio
                        </h3>
                      </div>
                      <button
                        id="cart-close-btn"
                        onClick={onClose}
                        className="text-gray-400 hover:text-white p-2 focus:outline-none cursor-pointer"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    {/* Cart Items List */}
                    {cartItems.length > 0 ? (
                      <div className="mt-6 space-y-6 max-h-[55vh] overflow-y-auto pr-2 no-scrollbar">
                        {cartItems.map((item, index) => (
                          <div
                            key={`${item.product.id}-${index}`}
                            className="flex items-start justify-between bg-[#121212]/50 border border-white/5 p-4 rounded-xl space-x-4"
                          >
                            <div className="flex-1 space-y-1.5">
                              <span className="text-[9px] text-brand-gold tracking-widest uppercase font-sans">
                                {item.product.category}
                              </span>
                              
                              <h4 className="font-serif text-sm text-white font-medium">
                                {item.product.name}
                              </h4>

                              {/* Selected Specifications */}
                              <div className="text-[10px] text-gray-400 font-sans font-light space-y-0.5">
                                <p>Size: <span className="text-gray-200">{item.selectedSize}</span></p>
                                <p>Frame: <span className="text-gray-200">{item.selectedFrame}</span></p>
                                <p>Canvas: <span className="text-gray-200">{item.selectedCanvas}</span></p>
                                <p>Quantity: <span className="text-gray-200">{item.quantity}</span></p>
                              </div>
                            </div>

                            {/* Price / Remove */}
                            <div className="flex flex-col items-end justify-between h-full min-h-[90px]">
                              <span className="font-serif text-sm text-brand-gold font-semibold">
                                ${item.product.price * item.quantity}
                              </span>

                              <button
                                id={`cart-remove-btn-${index}`}
                                onClick={() => onRemoveItem(index)}
                                className="text-gray-500 hover:text-red-400 p-2 transition-colors focus:outline-none cursor-pointer mt-4"
                                title="Remove Item"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-20 border border-dashed border-white/5 rounded-2xl bg-[#121212]/20 mt-10">
                        <ShoppingBag size={28} className="text-gray-600 mx-auto mb-4" />
                        <p className="font-serif text-sm text-gray-400 italic">Your acquisition portfolio is empty.</p>
                      </div>
                    )}
                  </div>

                  {/* Summary / Purchase Checkout footer */}
                  {cartItems.length > 0 && (
                    <div className="border-t border-white/5 pt-6 mt-6 space-y-6">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-400">
                          <span>Artwork Subtotal</span>
                          <span className="font-serif font-medium">${subtotal}</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                          <span>White-Glove Transport</span>
                          <span className="text-brand-gold font-semibold uppercase text-xs tracking-widest">Complimentary</span>
                        </div>
                        <div className="w-full h-[1px] bg-white/5 my-2" />
                        <div className="flex justify-between text-white font-serif text-base font-semibold">
                          <span>Total Investment</span>
                          <span className="text-brand-gold">${total}</span>
                        </div>
                      </div>

                      <button
                        id="cart-checkout-btn"
                        onClick={handleCheckoutSubmit}
                        disabled={isCheckingOut}
                        className="w-full py-3.5 bg-brand-gold text-brand-black hover:bg-white text-xs tracking-[0.2em] font-semibold uppercase rounded transition-all duration-500 shadow-md hover:shadow-[0_8px_20px_rgba(200,161,90,0.3)] flex items-center justify-center space-x-2 focus:outline-none cursor-pointer"
                      >
                        {isCheckingOut ? (
                          <>
                            <div className="w-4 h-4 border-2 border-brand-black border-t-transparent rounded-full animate-spin" />
                            <span>Securing Connection...</span>
                          </>
                        ) : (
                          <span>Establish Acquisition Checkout</span>
                        )}
                      </button>

                      <div className="flex justify-center items-center space-x-2 text-gray-500 text-[10px] text-center">
                        <ShieldCheck size={14} className="text-brand-gold" />
                        <span>Secured by authentic museum-grade Jarin Atelier ledger.</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                /* =============================================================
                   CHECKOUT COMPLETED RECEIPT STATE
                   ============================================================= */
                <motion.div
                  key="cart-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col h-full justify-between items-center text-center py-8 space-y-8"
                >
                  <div className="space-y-6 flex-1 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-brand-gold/15 border border-brand-gold flex items-center justify-center text-brand-gold animate-bounce">
                      <CheckCircle2 size={32} />
                    </div>

                    <h3 className="font-serif text-2xl text-white font-medium">
                      Acquisition Successful
                    </h3>

                    <div className="w-12 h-[1px] bg-brand-gold/50 mx-auto" />

                    {/* Styled Receipt details */}
                    <div className="w-full max-w-sm bg-[#121212] border border-white/5 rounded-xl p-5 text-left space-y-3 font-sans text-xs">
                      <div className="flex justify-between border-b border-white/5 pb-2 text-[10px] text-gray-500 uppercase tracking-widest font-semibold">
                        <span>Invoice Ledger</span>
                        <span>#JA-2026-9042</span>
                      </div>
                      
                      {cartItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-gray-300">
                          <span>{item.product.name} (x{item.quantity})</span>
                          <span className="font-serif font-medium text-brand-gold">${item.product.price * item.quantity}</span>
                        </div>
                      ))}

                      <div className="w-full h-[1px] bg-white/5 my-2" />

                      <div className="flex justify-between text-white font-serif font-semibold text-sm">
                        <span>Total Paid</span>
                        <span className="text-brand-gold">${total}</span>
                      </div>

                      <p className="text-[10px] text-gray-500 text-center leading-relaxed mt-4 pt-2 border-t border-white/5 font-light italic">
                        A certified handwritten wax-sealed Certificate of Authenticity will accompany your crate.
                      </p>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed max-w-sm font-light">
                      Your acquisition request has been safely captured on our ledger system. Our White-glove concierge will message you shortly to finalize shipping details.
                    </p>

                    <a
                      href={`https://wa.me/8801890770297?text=${encodeURIComponent("Assalamu alaikum, I just placed an order (Invoice #JA-2026-9042). Please confirm my order details. JazakAllah.")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-2 w-full max-w-sm py-3 bg-[#25D366] text-white hover:bg-[#1ebe5a] text-[11px] tracking-[0.2em] font-semibold uppercase rounded transition-all duration-500 focus:outline-none cursor-pointer shadow-md hover:shadow-lg"
                    >
                      <Send size={15} />
                      <span>Confirm Order on WhatsApp</span>
                    </a>
                  </div>

                  <button
                    id="cart-done-btn"
                    onClick={handleDone}
                    className="w-full py-3 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black text-[11px] tracking-[0.2em] font-semibold uppercase rounded transition-all duration-500 focus:outline-none cursor-pointer"
                  >
                    Return to Atelier
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
