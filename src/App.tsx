/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Layout from './components/Layout';
import LoadingScreen from './components/LoadingScreen';
import { AtelierProvider } from './atelier-context';
import Home from './pages/Home';
// Home stays in the main bundle (it's the landing page); other pages load on demand
const ShopPage = lazy(() => import('./pages/Shop'));
const GalleryPage = lazy(() => import('./pages/Gallery'));
const CustomOrderPage = lazy(() => import('./pages/CustomOrder'));
const AboutPage = lazy(() => import('./pages/About'));
const ContactPage = lazy(() => import('./pages/Contact'));

const page = (el: React.ReactNode) => (
  <Suspense fallback={<div className="min-h-[60vh]" />}>{el}</Suspense>
);

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={page(<ShopPage />)} />
          <Route path="/gallery" element={page(<GalleryPage />)} />
          <Route path="/bespoke" element={page(<CustomOrderPage />)} />
          <Route path="/about" element={page(<AboutPage />)} />
          <Route path="/contact" element={page(<ContactPage />)} />
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
