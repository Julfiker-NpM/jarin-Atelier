/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence } from 'motion/react';
import LoadingScreen from './components/LoadingScreen';

// Only React + the intro screen are needed for first paint. The rest of the site
// downloads in the background while the intro plays.
const loadSite = () => import('./Site');
const Site = lazy(loadSite);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSite();
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
      ) : (
        <Suspense key="site" fallback={null}>
          <Site />
        </Suspense>
      )}
    </AnimatePresence>
  );
}
