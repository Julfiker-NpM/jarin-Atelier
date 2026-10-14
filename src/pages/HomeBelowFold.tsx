/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import About from '../components/About';
import WhyChooseUs from '../components/WhyChooseUs';
import SocialProof from '../components/SocialProof';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';

// Everything below the first screen of the home page, loaded as its own chunk
export default function HomeBelowFold() {
  return (
    <>
      <About />
      <WhyChooseUs />
      <SocialProof />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
