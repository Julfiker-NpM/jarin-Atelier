/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import About from '../components/About';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import PageFrame from '../components/PageFrame';

export default function AboutPage() {
  return (
    <PageFrame title="Our Story">
      <About />
      <WhyChooseUs />
      <Testimonials />
    </PageFrame>
  );
}
