/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Cart from './Cart';
import Wishlist from './Wishlist';
import { useAtelier } from '../atelier-context';

/**
 * Shared application shell. Lives outside the routed pages so the
 * navigation, footer and drawers persist while each page frame
 * mounts/unmounts independently.
 */
export default function Layout() {
  const {
    cartCount,
    wishlistIds,
    isCartOpen,
    isWishlistOpen,
    openCart,
    openWishlist,
    closeCart,
    closeWishlist,
    cartItems,
    removeCartItem,
    clearCart,
    wishlistProducts,
    toggleWishlist,
    acquireProduct,
  } = useAtelier();

  return (
    <div className="flex flex-col min-h-screen bg-brand-black text-brand-cream relative light-leak">
      <Navbar />

      <Cart
        isOpen={isCartOpen}
        onClose={closeCart}
        cartItems={cartItems}
        onRemoveItem={removeCartItem}
        onClearCart={clearCart}
      />

      <Wishlist
        isOpen={isWishlistOpen}
        onClose={closeWishlist}
        wishlistProducts={wishlistProducts}
        onRemoveWishlist={toggleWishlist}
        onAcquireProduct={acquireProduct}
      />

      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
