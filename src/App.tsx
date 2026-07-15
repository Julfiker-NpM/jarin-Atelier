/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Featured from './components/Featured';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import Gallery from './components/Gallery';
import CustomOrder from './components/CustomOrder';
import Shop from './components/Shop';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import { Product, CartItem } from './types';
import { PRODUCTS } from './data';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState('home'); // 'home' | 'shop' | 'gallery' | 'custom-order' | 'about' | 'contact'
  
  // Cart & Wishlist state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Initialize with local storage if available
  useEffect(() => {
    const savedCart = localStorage.getItem('jarin_cart');
    const savedWishlist = localStorage.getItem('jarin_wishlist');
    
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart items", e);
      }
    }
    if (savedWishlist) {
      try {
        setWishlistIds(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Failed to parse wishlist ids", e);
      }
    }
  }, []);

  // Persist to local storage
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem('jarin_cart', JSON.stringify(items));
  };

  const saveWishlist = (ids: string[]) => {
    setWishlistIds(ids);
    localStorage.setItem('jarin_wishlist', JSON.stringify(ids));
  };

  // Add Item to Shopping Cart
  const handleAddToCart = (
    product: Product,
    selectedSize: string = '',
    selectedFrame: string = '',
    selectedCanvas: string = ''
  ) => {
    const size = selectedSize || product.sizes[0];
    const frame = selectedFrame || product.frames[0];
    const canvas = selectedCanvas || product.canvasTypes[0];

    const existingIndex = cartItems.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedSize === size &&
        item.selectedFrame === frame &&
        item.selectedCanvas === canvas
    );

    let updatedCart = [...cartItems];
    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart.push({
        product,
        selectedSize: size,
        selectedFrame: frame,
        selectedCanvas: canvas,
        quantity: 1,
      });
    }
    
    saveCart(updatedCart);
    setIsCartOpen(true); // Open cart immediately to show acquisition feedback
  };

  const handleRemoveCartItem = (index: number) => {
    const updated = cartItems.filter((_, i) => i !== index);
    saveCart(updated);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  // Toggle Item in Wishlist Saved
  const handleToggleWishlist = (product: Product) => {
    let updatedWishlist = [...wishlistIds];
    if (updatedWishlist.includes(product.id)) {
      updatedWishlist = updatedWishlist.filter((id) => id !== product.id);
    } else {
      updatedWishlist.push(product.id);
    }
    saveWishlist(updatedWishlist);
  };

  // Cart total count
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Map wishlistIds back to Products
  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  // Navigate to detailed view in Shop
  const handleAcquireProduct = (product: Product) => {
    setCurrentTab('shop');
    // We scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="app-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col min-h-screen bg-brand-black text-brand-cream relative light-leak"
          >
            {/* 1. Header Navigation */}
            <Navbar
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              cartCount={cartCount}
              wishlistCount={wishlistIds.length}
              onOpenCart={() => setIsCartOpen(true)}
              onOpenWishlist={() => setIsWishlistOpen(true)}
            />

            {/* 2. Overlays / Drawers */}
            <Cart
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              cartItems={cartItems}
              onRemoveItem={handleRemoveCartItem}
              onClearCart={handleClearCart}
            />

            <Wishlist
              isOpen={isWishlistOpen}
              onClose={() => setIsWishlistOpen(false)}
              wishlistProducts={wishlistProducts}
              onRemoveWishlist={handleToggleWishlist}
              onAcquireProduct={handleAcquireProduct}
            />

            {/* 3. Main Stage Content View Router */}
            <main className="flex-grow">
              <AnimatePresence mode="wait">
                {currentTab === 'home' && (
                  <motion.div
                    key="tab-home"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Hero
                      onExploreClick={() => setCurrentTab('shop')}
                      onCustomClick={() => setCurrentTab('custom-order')}
                    />
                    <Featured
                      onProductSelect={handleAcquireProduct}
                      onAddToCart={(p) => handleAddToCart(p)}
                      onAddToWishlist={handleToggleWishlist}
                      wishlistIds={wishlistIds}
                      onViewAllClick={() => setCurrentTab('shop')}
                    />
                    <About />
                    <WhyChooseUs />
                    <Testimonials />
                    <FAQ />
                    <Contact />
                  </motion.div>
                )}

                {currentTab === 'shop' && (
                  <motion.div
                    key="tab-shop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Shop
                      onAddToCart={handleAddToCart}
                      onAddToWishlist={handleToggleWishlist}
                      wishlistIds={wishlistIds}
                    />
                  </motion.div>
                )}

                {currentTab === 'gallery' && (
                  <motion.div
                    key="tab-gallery"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Gallery />
                  </motion.div>
                )}

                {currentTab === 'custom-order' && (
                  <motion.div
                    key="tab-custom"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CustomOrder />
                  </motion.div>
                )}

                {currentTab === 'about' && (
                  <motion.div
                    key="tab-about"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <About />
                    <WhyChooseUs />
                    <Testimonials />
                  </motion.div>
                )}

                {currentTab === 'contact' && (
                  <motion.div
                    key="tab-contact"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Contact />
                    <FAQ />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>

            {/* 4. Footer */}
            <Footer setCurrentTab={setCurrentTab} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
