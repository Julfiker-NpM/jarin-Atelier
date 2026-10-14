/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Featured from '../components/Featured';
import PageFrame from '../components/PageFrame';
import { useAtelier } from '../atelier-context';

const HomeBelowFold = lazy(() => import('./HomeBelowFold'));

// Render the lower sections once the first screen has painted and the browser is idle,
// so the page doesn't freeze rendering everything at once.
function useAfterFirstPaint() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) {
      w.requestIdleCallback(() => setReady(true), { timeout: 1500 });
    } else {
      const t = setTimeout(() => setReady(true), 300);
      return () => clearTimeout(t);
    }
  }, []);
  return ready;
}

export default function Home() {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlistIds, acquireProduct } = useAtelier();
  const showRest = useAfterFirstPaint();

  return (
    <PageFrame title="Home">
      <Hero
        onExploreClick={() => navigate('/shop')}
        onCustomClick={() => navigate('/bespoke')}
      />
      <Featured
        onProductSelect={acquireProduct}
        onAddToCart={addToCart}
        onAddToWishlist={toggleWishlist}
        wishlistIds={wishlistIds}
        onViewAllClick={() => navigate('/shop')}
      />
      {showRest ? (
        <Suspense fallback={<div className="min-h-[100vh]" />}>
          <HomeBelowFold />
        </Suspense>
      ) : (
        <div className="min-h-[100vh]" />
      )}
    </PageFrame>
  );
}
