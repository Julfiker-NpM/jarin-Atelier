/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Shop from '../components/Shop';
import PageFrame from '../components/PageFrame';
import { useAtelier } from '../atelier-context';

export default function ShopPage() {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlistIds } = useAtelier();

  return (
    <PageFrame title="The Boutique">
      <Shop
        onAddToCart={addToCart}
        onAddToWishlist={toggleWishlist}
        wishlistIds={wishlistIds}
      />
    </PageFrame>
  );
}
