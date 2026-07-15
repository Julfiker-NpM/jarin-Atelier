/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingCart, Eye, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import ArtworkFrame from './ArtworkFrame';

interface FeaturedProps {
  onProductSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  wishlistIds: string[];
  onViewAllClick: () => void;
}

const CATEGORIES = [
  'All',
  'Allah',
  'Bismillah',
  'Ayatul Kursi',
  'Wedding',
  'Custom Name Art',
  'Canvas',
  'Wall Decor',
];

export default function Featured({
  onProductSelect,
  onAddToCart,
  onAddToWishlist,
  wishlistIds,
  onViewAllClick,
}: FeaturedProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All'
    ? PRODUCTS.slice(0, 4) // Show first 4 for home preview
    : PRODUCTS.filter((p) => p.category === activeCategory).slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section
      id="featured-collection-section"
      className="bg-brand-black text-brand-cream py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-white/5"
    >
      {/* Background Accent */}
      <div className="absolute inset-x-0 bottom-0 h-96 bg-[radial-gradient(circle_at_center,rgba(85,107,47,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Elegant Section Title */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center space-x-2 text-brand-gold text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold"
          >
            <Sparkles size={12} />
            <span>Curated Exhibition</span>
            <Sparkles size={12} />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-wide font-light mb-4"
          >
            Featured Signature Artworks
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-16 h-[1.5px] bg-brand-gold mx-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
            className="max-w-xl mx-auto text-xs sm:text-sm text-gray-400 tracking-wider font-light"
          >
            Indulge in a premium gallery experience showcasing our most sought-after handcrafted Islamic masterstrokes.
          </motion.p>
        </div>

        {/* Elegant Category Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto px-4">
          {CATEGORIES.map((category) => (
            <button
              id={`category-tab-${category.toLowerCase().replace(/\s+/g, '-')}`}
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 text-xs tracking-widest uppercase rounded-full transition-all duration-500 border focus:outline-none cursor-pointer ${
                activeCategory === category
                  ? 'bg-brand-gold border-brand-gold text-brand-black shadow-[0_4px_20px_rgba(200,161,90,0.25)] font-semibold'
                  : 'bg-transparent border-white/10 text-gray-300 hover:text-white hover:border-brand-gold/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Premium Products Exhibition Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product, index) => {
              const isWishlisted = wishlistIds.includes(product.id);
              return (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  className="group flex flex-col h-full bg-brand-black border border-white/5 p-4 rounded-xl hover:border-brand-gold/30 transition-all duration-500"
                >
                  {/* Museum Gold Frame Placeholder representation */}
                  <div className="relative mb-5 overflow-hidden rounded-lg">
                    {/* Unique layout for each ID so they look distinct */}
                    <ArtworkFrame
                      label={product.name}
                      arabicLabel={product.arabicName}
                      aspectRatio="portrait"
                      imageUrl={`/assets/${product.images[0]}.png`}
                      glowColor={index % 2 === 0 ? 'rgba(200, 161, 90, 0.16)' : 'rgba(85, 107, 47, 0.12)'}
                    />

                    {/* Quick Action Overlay Buttons */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      {/* Wishlist Button */}
                      <button
                        id={`wishlist-featured-${product.id}`}
                        onClick={() => onAddToWishlist(product)}
                        className={`p-2.5 rounded-full backdrop-blur-md border transition-all duration-500 focus:outline-none cursor-pointer ${
                          isWishlisted
                            ? 'bg-brand-gold/90 text-brand-black border-brand-gold shadow-[0_4px_12px_rgba(200,161,90,0.3)]'
                            : 'bg-brand-black/70 text-brand-cream border-white/10 hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold'
                        }`}
                        title="Add to Wishlist"
                      >
                        <Heart size={15} className={isWishlisted ? 'fill-current' : ''} />
                      </button>

                      {/* Quick View Details Button */}
                      <button
                        id={`quickview-featured-${product.id}`}
                        onClick={() => onProductSelect(product)}
                        className="p-2.5 rounded-full bg-brand-black/70 text-brand-cream border border-white/10 hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold backdrop-blur-md transition-all duration-500 focus:outline-none cursor-pointer"
                        title="Quick View"
                      >
                        <Eye size={15} />
                      </button>
                    </div>

                    {/* New/Popular Badge */}
                    {product.isPopular && (
                      <span className="absolute top-4 left-4 bg-brand-gold text-brand-black font-semibold text-[9px] tracking-widest uppercase py-1 px-3 rounded shadow-md z-10">
                        Signature Piece
                      </span>
                    )}
                    {product.isNew && (
                      <span className="absolute top-4 left-4 bg-brand-olive text-white font-semibold text-[9px] tracking-widest uppercase py-1 px-3 rounded shadow-md z-10">
                        Recently Revealed
                      </span>
                    )}
                  </div>

                  {/* Artwork Meta Description details */}
                  <div className="flex-1 flex flex-col">
                    <span className="text-[10px] text-brand-gold tracking-[0.25em] uppercase font-sans mb-1.5 block">
                      {product.category} Collection
                    </span>
                    
                    <h3 className="font-serif text-lg text-white font-medium group-hover:text-brand-gold transition-colors duration-300">
                      {product.name}
                    </h3>
                    
                    {product.arabicName && (
                      <p className="font-arabic text-sm text-gray-500 tracking-wider mt-1 mb-2">
                        {product.arabicName}
                      </p>
                    )}

                    <p className="text-gray-400 text-xs font-light line-clamp-2 mb-4 leading-relaxed flex-1">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                      <div className="flex items-baseline space-x-2">
                        <span className="font-serif text-lg text-brand-gold font-semibold">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="font-serif text-xs text-gray-500 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Premium Add to Cart trigger */}
                      <button
                        id={`add-to-cart-${product.id}`}
                        onClick={() => onAddToCart(product)}
                        className="flex items-center space-x-1 text-xs text-brand-cream hover:text-brand-gold font-medium uppercase tracking-widest transition-colors duration-300 focus:outline-none cursor-pointer"
                      >
                        <ShoppingCart size={14} />
                        <span>Add To Cart</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* View Entire Collection CTA Link */}
        <div className="text-center mt-16">
          <motion.button
            id="view-all-boutique-btn"
            onClick={onViewAllClick}
            whileHover={{ x: 6 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center space-x-2 text-brand-gold hover:text-white font-serif text-[13px] uppercase tracking-[0.25em] pb-1.5 border-b border-brand-gold/30 hover:border-white transition-colors duration-300 cursor-pointer"
          >
            <span>Enter Entire Boutique</span>
            <ArrowRight size={14} />
          </motion.button>
        </div>

      </div>
    </section>
  );
}
