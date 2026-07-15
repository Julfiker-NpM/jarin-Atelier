/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Featured from '../components/Featured';
import About from '../components/About';
import WhyChooseUs from '../components/WhyChooseUs';
import SocialProof from '../components/SocialProof';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import PageFrame from '../components/PageFrame';
import { useAtelier } from '../atelier-context';

export default function Home() {
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlistIds, acquireProduct } = useAtelier();

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
      <About />
      <WhyChooseUs />
      <SocialProof />
      <Testimonials />
      <FAQ />
      <Contact />
    </PageFrame>
  );
}
