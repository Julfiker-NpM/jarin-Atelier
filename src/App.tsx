/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';
import { AtelierProvider } from './atelier-context';
import Home from './pages/Home';
import ShopPage from './pages/Shop';
import GalleryPage from './pages/Gallery';
import CustomOrderPage from './pages/CustomOrder';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/bespoke" element={<CustomOrderPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
      ) : (
        <BrowserRouter>
          <AtelierProvider>
            <AppRoutes />
          </AtelierProvider>
        </BrowserRouter>
      )}
    </AnimatePresence>
  );
}
