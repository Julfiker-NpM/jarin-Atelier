/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, ArrowUpDown, Eye, Heart, ShoppingCart, Star, Sparkles, ArrowLeft, Check, ShieldAlert, HeartOff } from 'lucide-react';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import ArtworkFrame from './ArtworkFrame';

interface ShopProps {
  onAddToCart: (product: Product, size: string, frame: string, canvas: string) => void;
  onAddToWishlist: (product: Product) => void;
  wishlistIds: string[];
}

export default function Shop({ onAddToCart, onAddToWishlist, wishlistIds }: ShopProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'newest'>('popular');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Customizer selections for detailed view
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedFrame, setSelectedFrame] = useState('');
  const [selectedCanvas, setSelectedCanvas] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  // Filters & Sorting calculations
  const categories = ['All', 'Allah', 'Bismillah', 'Ayatul Kursi', 'Wedding', 'Custom Name Art', 'Canvas', 'Wall Decor'];

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (product.arabicName && product.arabicName.includes(searchQuery)) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'newest') return a.isNew ? -1 : 1;
    return b.rating - a.rating; // default: popular
  });

  const handleOpenProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes[0]);
    setSelectedFrame(product.frames[0]);
    setSelectedCanvas(product.canvasTypes[0]);
    setQuantity(1);
    setAddedMessage(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCartWithSpecs = (product: Product) => {
    onAddToCart(product, selectedSize, selectedFrame, selectedCanvas);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 3000);
  };

  return (
    <section id="shop-boutique-section" className="bg-brand-black text-brand-cream min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        <AnimatePresence mode="wait">
          {!selectedProduct ? (
            /* =========================================================================
               PRODUCT GRID VIEW
               ========================================================================= */
            <motion.div
              key="grid-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header Title */}
              <div className="text-center mb-16">
                <div className="flex items-center justify-center space-x-2 text-brand-gold text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold">
                  <Sparkles size={12} />
                  <span>THE BOUTIQUE</span>
                  <Sparkles size={12} />
                </div>
                <h2 className="reveal font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-wide font-light mb-4">
                  Curated Masterpieces
                </h2>
                <div className="w-16 h-[1.5px] bg-brand-gold mx-auto" />
              </div>

              {/* Filtering / Search Controls Toolbar */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center border-b border-white/5 pb-8 mb-12">
                
                {/* Search Field */}
                <div className="relative lg:col-span-1">
                  <input
                    id="shop-search-input"
                    type="text"
                    placeholder="Search masterworks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#121212] border border-white/10 rounded-full pl-11 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-gold transition-colors font-sans"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                </div>

                {/* Categories Scrollable Filters */}
                <div className="flex overflow-x-auto gap-2 lg:col-span-2 py-2 no-scrollbar">
                  {categories.map((cat) => (
                    <button
                      id={`shop-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`whitespace-nowrap px-4 py-2 rounded-full text-[10px] tracking-widest uppercase border transition-all duration-500 cursor-pointer focus:outline-none ${
                        selectedCategory === cat
                          ? 'bg-brand-gold border-brand-gold text-brand-black font-semibold'
                          : 'bg-transparent border-white/5 text-gray-400 hover:text-white hover:border-brand-gold/30'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Sort dropdown */}
                <div className="relative flex items-center justify-end space-x-2 lg:col-span-1">
                  <ArrowUpDown size={14} className="text-brand-gold" />
                  <select
                    id="shop-sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-[#121212] border border-white/10 rounded px-3 py-2 text-[11px] tracking-widest text-white uppercase focus:outline-none focus:border-brand-gold transition-colors font-sans font-medium cursor-pointer"
                  >
                    <option value="popular">Popularity</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="newest">Recently Scribed</option>
                  </select>
                </div>

              </div>

              {/* Product Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredProducts.map((product, index) => {
                    const isWishlisted = wishlistIds.includes(product.id);
                    return (
                      <motion.div
                        id={`product-card-${product.id}`}
                        key={product.id}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index % 4) * 0.08, duration: 0.6 }}
                        className="group flex flex-col bg-[#121212]/30 border border-white/5 rounded-xl p-4 hover:border-brand-gold/20 transition-all duration-500"
                      >
                        {/* Frame Wrapper */}
                        <div className="relative mb-5 overflow-hidden rounded-lg cursor-pointer" onClick={() => handleOpenProductDetails(product)}>
                          <ArtworkFrame
                            label={product.name}
                            arabicLabel={product.arabicName}
                            aspectRatio="portrait"
                            imageUrl={`/assets/${product.images[0]}.png`}
                          />
                          
                          {/* Badge */}
                          {product.isNew && (
                            <span className="absolute top-4 left-4 bg-brand-olive text-white font-semibold text-[9px] tracking-widest uppercase py-1 px-3 rounded shadow-md z-10">
                              Revealed
                            </span>
                          )}
                          {product.isPopular && (
                            <span className="absolute top-4 left-4 bg-brand-gold text-brand-black font-semibold text-[9px] tracking-widest uppercase py-1 px-3 rounded shadow-md z-10">
                              Signature
                            </span>
                          )}

                          {/* Quick action buttons overlay */}
                          <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                            <button
                              id={`shop-wishlist-${product.id}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                onAddToWishlist(product);
                              }}
                              className={`p-2 rounded-full backdrop-blur-md border transition-all duration-500 focus:outline-none cursor-pointer ${
                                isWishlisted
                                  ? 'bg-brand-gold text-brand-black border-brand-gold'
                                  : 'bg-brand-black/70 text-brand-cream border-white/10 hover:bg-brand-gold hover:text-brand-black'
                              }`}
                            >
                              <Heart size={14} className={isWishlisted ? 'fill-current' : ''} />
                            </button>

                            <button
                              id={`shop-quickview-${product.id}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setQuickViewProduct(product);
                              }}
                              className="p-2 rounded-full bg-brand-black/70 text-brand-cream border border-white/10 hover:bg-brand-gold hover:text-brand-black backdrop-blur-md transition-all duration-500 focus:outline-none cursor-pointer"
                            >
                              <Eye size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Text description metadata */}
                        <div className="flex-1 flex flex-col">
                          <span className="text-[9px] text-brand-gold tracking-[0.25em] uppercase font-sans mb-1 block">
                            {product.category}
                          </span>

                          <h3 className="font-serif text-base text-white font-medium group-hover:text-brand-gold transition-colors duration-300 cursor-pointer" onClick={() => handleOpenProductDetails(product)}>
                            {product.name}
                          </h3>

                          {product.arabicName && (
                            <p className="font-arabic text-xs text-gray-500 tracking-wider mt-0.5 mb-2">
                              {product.arabicName}
                            </p>
                          )}

                          <p className="text-gray-400 text-[11px] font-light line-clamp-2 leading-relaxed mb-4">
                            {product.description}
                          </p>

                          <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                            <span className="font-serif text-base text-brand-gold font-semibold">
                              ${product.price}
                            </span>

                            <button
                              id={`shop-add-cart-fast-${product.id}`}
                              onClick={() => onAddToCart(product, product.sizes[0], product.frames[0], product.canvasTypes[0])}
                              className="flex items-center space-x-1 text-[10px] text-brand-cream hover:text-brand-gold font-medium uppercase tracking-widest transition-colors focus:outline-none cursor-pointer"
                            >
                              <ShoppingCart size={12} />
                              <span>Acquire</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-24 border border-dashed border-white/5 rounded-2xl bg-[#121212]/20">
                  <p className="font-serif text-lg text-gray-400 italic">No masterworks match your current search constraints.</p>
                </div>
              )}
            </motion.div>
          ) : (
            /* =========================================================================
               DETAILED PRODUCT VIEW
               ========================================================================= */
            <motion.div
              key="details-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-12"
            >
              {/* Back to Boutique Button */}
              <button
                id="back-to-boutique-btn"
                onClick={() => setSelectedProduct(null)}
                className="inline-flex items-center space-x-2 text-gray-400 hover:text-brand-gold font-sans text-xs uppercase tracking-widest pb-1 border-b border-transparent hover:border-brand-gold transition-colors focus:outline-none cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>Return to Boutique Grid</span>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                
                {/* Left Column: Massive Gorgeous Artwork Frame Preview */}
                <div className="space-y-4">
                  <div className="museum-frame p-6 sm:p-10 rounded-2xl bg-brand-black/95 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/10 to-transparent pointer-events-none" />
                    
                    <ArtworkFrame
                      label={selectedProduct.name}
                      arabicLabel={selectedProduct.arabicName}
                      aspectRatio="portrait"
                      imageUrl={`/assets/${selectedProduct.images[0]}.png`}
                      className="rounded-lg shadow-inner"
                    />
                  </div>

                  <p className="text-[10px] text-center text-gray-500 uppercase tracking-widest font-sans">
                    * Frame shown represents Obsidian Black finish. Sizes listed refer to outer parameters.
                  </p>
                </div>

                {/* Right Column: Customizer Configurator Details */}
                <div className="space-y-8">
                  <div>
                    <span className="text-xs text-brand-gold tracking-[0.25em] uppercase block mb-1">
                      {selectedProduct.category} Collection
                    </span>
                    <h1 className="font-serif text-3xl sm:text-4xl text-white font-light tracking-wide leading-tight">
                      {selectedProduct.name}
                    </h1>
                    {selectedProduct.arabicName && (
                      <p className="font-arabic text-2xl text-brand-gold/90 mt-2 mb-4">
                        {selectedProduct.arabicName}
                      </p>
                    )}

                    <div className="flex items-center space-x-4 mt-4">
                      <span className="font-serif text-2xl text-brand-gold font-semibold">
                        ${selectedProduct.price}
                      </span>
                      {selectedProduct.originalPrice && (
                        <span className="font-serif text-sm text-gray-500 line-through">
                          ${selectedProduct.originalPrice}
                        </span>
                      )}
                      
                      <div className="h-4 w-[1px] bg-white/10" />

                      <div className="flex items-center space-x-1 text-brand-gold">
                        <Star size={14} className="fill-current" />
                        <span className="text-xs font-sans font-semibold">
                          {selectedProduct.rating.toFixed(1)}
                        </span>
                        <span className="text-[10px] text-gray-500 font-sans">
                          (Archival Review Verified)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-[1px] bg-white/10" />

                  {/* Artwork Description */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-xs text-brand-gold uppercase tracking-widest font-semibold">
                      Curator’s Remarks
                    </h3>
                    <p className="font-sans text-gray-300 text-sm leading-relaxed font-light">
                      {selectedProduct.description}
                    </p>
                  </div>

                  {/* CUSTOMIZER CONTROLS */}
                  <div className="space-y-6">
                    
                    {/* Choose Dimension */}
                    <div className="space-y-3">
                      <label className="text-[10px] tracking-widest uppercase font-semibold text-gray-400 block">
                        1. Select Framing Dimensions (Inches)
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.sizes.map((sz) => (
                          <button
                            id={`details-size-${sz.replace(/\s+/g, '-')}`}
                            key={sz}
                            onClick={() => setSelectedSize(sz)}
                            className={`px-4 py-2 border rounded text-xs tracking-widest uppercase transition-all duration-300 focus:outline-none cursor-pointer ${
                              selectedSize === sz
                                ? 'border-brand-gold bg-brand-gold/10 text-brand-gold font-semibold'
                                : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Choose Frame Wood */}
                    <div className="space-y-3">
                      <label className="text-[10px] tracking-widest uppercase font-semibold text-gray-400 block">
                        2. Hand-Polished Wooden Moulding finish
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.frames.map((fr) => (
                          <button
                            id={`details-frame-${fr.replace(/\s+/g, '-')}`}
                            key={fr}
                            onClick={() => setSelectedFrame(fr)}
                            className={`px-4 py-2 border rounded text-xs tracking-widest uppercase transition-all duration-300 focus:outline-none cursor-pointer ${
                              selectedFrame === fr
                                ? 'border-brand-gold bg-brand-gold/10 text-brand-gold font-semibold'
                                : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                            }`}
                          >
                            {fr}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Choose Canvas Fabric */}
                    <div className="space-y-3">
                      <label className="text-[10px] tracking-widest uppercase font-semibold text-gray-400 block">
                        3. Archive Canvas Material
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.canvasTypes.map((cv) => (
                          <button
                            id={`details-canvas-${cv.replace(/\s+/g, '-')}`}
                            key={cv}
                            onClick={() => setSelectedCanvas(cv)}
                            className={`px-4 py-2 border rounded text-xs tracking-widest uppercase transition-all duration-300 focus:outline-none cursor-pointer ${
                              selectedCanvas === cv
                                ? 'border-brand-gold bg-brand-gold/10 text-brand-gold font-semibold'
                                : 'border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                            }`}
                          >
                            {cv}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quantity Choice */}
                    <div className="flex items-center space-x-4 pt-4">
                      <div className="flex items-center border border-white/10 rounded overflow-hidden h-11 bg-brand-black">
                        <button
                          onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                          className="px-3 text-gray-400 hover:text-brand-gold transition-colors focus:outline-none cursor-pointer font-bold"
                        >
                          –
                        </button>
                        <span className="px-4 text-xs font-sans text-white font-semibold">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity((q) => q + 1)}
                          className="px-3 text-gray-400 hover:text-brand-gold transition-colors focus:outline-none cursor-pointer font-bold"
                        >
                          +
                        </button>
                      </div>

                      <button
                        id="details-add-cart-btn"
                        onClick={() => handleAddToCartWithSpecs(selectedProduct)}
                        className="flex-1 bg-brand-gold text-brand-black hover:bg-white text-xs tracking-[0.2em] font-semibold uppercase rounded h-11 transition-all duration-500 shadow-md hover:shadow-[0_8px_20px_rgba(200,161,90,0.3)] flex items-center justify-center space-x-2 focus:outline-none cursor-pointer"
                      >
                        <ShoppingCart size={15} />
                        <span>Acquire Masterwork</span>
                      </button>
                    </div>

                    {addedMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-brand-gold/15 border border-brand-gold/30 rounded p-4 text-xs text-brand-gold flex items-center space-x-2"
                      >
                        <Check size={14} />
                        <span>Masterpiece successfully registered to your shopping catalog portfolio.</span>
                      </motion.div>
                    )}

                  </div>

                  <div className="w-full h-[1px] bg-white/10" />

                  {/* Heritage and Certificate Badging details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 border border-brand-gold/20 rounded bg-[#121212] text-brand-gold">
                        <Star size={14} />
                      </div>
                      <div>
                        <h4 className="font-serif text-xs text-white font-medium mb-0.5">
                          Authenticity Certification
                        </h4>
                        <p className="text-[10px] text-gray-400 font-light">
                          Comes signed, cataloged, and sealed with custom gold wax.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="p-2 border border-brand-gold/20 rounded bg-[#121212] text-brand-gold">
                        <Check size={14} />
                      </div>
                      <div>
                        <h4 className="font-serif text-xs text-white font-medium mb-0.5">
                          Protected Shipments
                        </h4>
                        <p className="text-[10px] text-gray-400 font-light">
                          Shipped inside secure wooden custom crates, fully insured.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* QUICK VIEW OVERLAY MODAL */}
        <AnimatePresence>
          {quickViewProduct && (
            <motion.div
              id="shop-quickview-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
              onClick={() => setQuickViewProduct(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                className="w-full max-w-2xl bg-brand-black border border-brand-gold/20 rounded-2xl p-6 sm:p-8 overflow-hidden relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close */}
                <button
                  id="quickview-close-btn"
                  onClick={() => setQuickViewProduct(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 focus:outline-none cursor-pointer"
                >
                  ✕
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
                  <div>
                <ArtworkFrame
                  label={quickViewProduct.name}
                  arabicLabel={quickViewProduct.arabicName}
                  aspectRatio="portrait"
                  imageUrl={`/assets/${quickViewProduct.images[0]}.png`}
                />
                  </div>

                  <div className="space-y-4">
                    <span className="text-[9px] text-brand-gold tracking-[0.25em] uppercase">
                      {quickViewProduct.category} COLLECTION
                    </span>
                    <h3 className="font-serif text-2xl text-white font-medium">
                      {quickViewProduct.name}
                    </h3>
                    {quickViewProduct.arabicName && (
                      <p className="font-arabic text-xl text-brand-gold/80">
                        {quickViewProduct.arabicName}
                      </p>
                    )}
                    <p className="text-gray-400 text-xs font-light leading-relaxed">
                      {quickViewProduct.description}
                    </p>
                    <div className="text-lg font-serif text-brand-gold font-bold">
                      ${quickViewProduct.price}
                    </div>

                    <div className="pt-4 space-y-2">
                      <button
                        id="quickview-acquire-btn"
                        onClick={() => {
                          handleOpenProductDetails(quickViewProduct);
                          setQuickViewProduct(null);
                        }}
                        className="w-full px-6 py-2.5 bg-brand-gold text-brand-black hover:bg-white text-[10px] tracking-[0.2em] font-semibold uppercase rounded transition-colors focus:outline-none cursor-pointer"
                      >
                        Customize & Purchase
                      </button>

                      <button
                        id="quickview-wishlist-btn"
                        onClick={() => {
                          onAddToWishlist(quickViewProduct);
                          setQuickViewProduct(null);
                        }}
                        className="w-full px-6 py-2.5 border border-white/10 text-brand-cream hover:bg-white/5 text-[10px] tracking-[0.2em] font-semibold uppercase rounded transition-colors focus:outline-none cursor-pointer"
                      >
                        {wishlistIds.includes(quickViewProduct.id) ? 'Remove From Wishlist' : 'Save To Wishlist'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
