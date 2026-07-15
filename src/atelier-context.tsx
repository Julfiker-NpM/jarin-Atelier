/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product, CartItem } from './types';
import { PRODUCTS } from './data';

interface AtelierContextValue {
  cartItems: CartItem[];
  wishlistIds: string[];
  wishlistProducts: Product[];
  cartCount: number;
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  addToCart: (product: Product, selectedSize?: string, selectedFrame?: string, selectedCanvas?: string) => void;
  removeCartItem: (index: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  openCart: () => void;
  openWishlist: () => void;
  closeCart: () => void;
  closeWishlist: () => void;
  acquireProduct: (product: Product) => void;
}

const AtelierContext = createContext<AtelierContextValue | null>(null);

export function useAtelier(): AtelierContextValue {
  const ctx = useContext(AtelierContext);
  if (!ctx) {
    throw new Error('useAtelier must be used within an <AtelierProvider>');
  }
  return ctx;
}

export function AtelierProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Initialize from local storage if available
  useEffect(() => {
    const savedCart = localStorage.getItem('jarin_cart');
    const savedWishlist = localStorage.getItem('jarin_wishlist');

    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart items', e);
      }
    }
    if (savedWishlist) {
      try {
        setWishlistIds(JSON.parse(savedWishlist));
      } catch (e) {
        console.error('Failed to parse wishlist ids', e);
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

  const addToCart = (
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

  const removeCartItem = (index: number) => {
    const updated = cartItems.filter((_, i) => i !== index);
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const toggleWishlist = (product: Product) => {
    let updatedWishlist = [...wishlistIds];
    if (updatedWishlist.includes(product.id)) {
      updatedWishlist = updatedWishlist.filter((id) => id !== product.id);
    } else {
      updatedWishlist.push(product.id);
    }
    saveWishlist(updatedWishlist);
  };

  const openCart = () => setIsCartOpen(true);
  const openWishlist = () => setIsWishlistOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const closeWishlist = () => setIsWishlistOpen(false);

  const acquireProduct = (product: Product) => {
    navigate('/shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AtelierContext.Provider
      value={{
        cartItems,
        wishlistIds,
        wishlistProducts,
        cartCount,
        isCartOpen,
        isWishlistOpen,
        addToCart,
        removeCartItem,
        clearCart,
        toggleWishlist,
        openCart,
        openWishlist,
        closeCart,
        closeWishlist,
        acquireProduct,
      }}
    >
      {children}
    </AtelierContext.Provider>
  );
}
