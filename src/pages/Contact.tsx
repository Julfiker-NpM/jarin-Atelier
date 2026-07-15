/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Contact from '../components/Contact';
import FAQ from '../components/FAQ';
import PageFrame from '../components/PageFrame';

export default function ContactPage() {
  return (
    <PageFrame title="Atelier Contact">
      <Contact />
      <FAQ />
    </PageFrame>
  );
}
