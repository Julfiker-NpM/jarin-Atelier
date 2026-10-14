/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Layout from './components/Layout';
import { AtelierProvider } from './atelier-context';
import Home from './pages/Home';

// The whole site (router, layout, home) is its own chunk, fetched while the intro plays.
// Other pages load only when visited.
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

export default function Site() {
  return (
    <BrowserRouter>
      <AtelierProvider>
        <AppRoutes />
      </AtelierProvider>
    </BrowserRouter>
  );
}
