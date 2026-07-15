/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingBag, Eye, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveWishlist: (product: Product) => void;
  onAcquireProduct: (product: Product) => void;
}

export default function Wishlist({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveWishlist,
  onAcquireProduct,
}: WishlistProps) {
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
            id="wishlist-drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 bottom-0 right-0 w-full sm:w-110 z-50 bg-brand-black border-l border-brand-gold/15 p-6 flex flex-col justify-between shadow-[0_0_60px_rgba(0,0,0,0.9)] text-brand-cream overflow-y-auto"
          >
            <div>
              {/* Header with Close */}
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="flex items-center space-x-2 text-brand-gold">
                  <Heart size={20} className="fill-current" />
                  <h3 className="font-serif text-lg uppercase tracking-widest font-semibold">
                    Your Saved Treasures
                  </h3>
                </div>
                <button
                  id="wishlist-close-btn"
                  onClick={onClose}
                  className="text-gray-400 hover:text-white p-2 focus:outline-none cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Wishlist Items list */}
              {wishlistProducts.length > 0 ? (
                <div className="mt-6 space-y-6">
                  {wishlistProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-start justify-between bg-[#121212]/50 border border-white/5 p-4 rounded-xl space-x-4"
                    >
                      <div className="flex-1 space-y-1">
                        <span className="text-[9px] text-brand-gold tracking-widest uppercase font-sans">
                          {product.category}
                        </span>
                        
                        <h4 className="font-serif text-sm text-white font-medium">
                          {product.name}
                        </h4>

                        <span className="font-serif text-xs text-brand-gold font-semibold block pt-1">
                          ${product.price}
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-col items-end space-y-3">
                        <button
                          id={`wishlist-acquire-fast-${product.id}`}
                          onClick={() => {
                            onAcquireProduct(product);
                            onClose();
                          }}
                          className="px-3 py-1.5 bg-brand-gold text-brand-black hover:bg-white text-[10px] tracking-widest uppercase font-semibold rounded transition-colors flex items-center space-x-1 focus:outline-none cursor-pointer"
                        >
                          <Eye size={12} />
                          <span>Acquire</span>
                        </button>

                        <button
                          id={`wishlist-remove-direct-${product.id}`}
                          onClick={() => onRemoveWishlist(product)}
                          className="text-gray-500 hover:text-red-400 p-2 transition-colors focus:outline-none cursor-pointer"
                          title="Remove From Saved"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 border border-dashed border-white/5 rounded-2xl bg-[#121212]/20 mt-10">
                  <Heart size={28} className="text-gray-600 mx-auto mb-4" />
                  <p className="font-serif text-sm text-gray-400 italic">No saved artworks in your vault.</p>
                </div>
              )}
            </div>

            {/* Bottom quick CTA */}
            <div className="border-t border-white/5 pt-6 mt-6 text-center">
              <p className="font-serif italic text-xs text-gray-400">
                "Where Faith Meets Art"
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
