/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import LoadingScreen from './components/LoadingScreen';

// Start downloading the rest of the site immediately (module scope), not after the
// first React render. The entry bundle only holds React + the intro screen; the
// animation library and everything else live in the Site chunk.
const sitePromise = import('./Site');
const Site = lazy(() => sitePromise);

// Show the brand intro briefly on the first visit of a session only.
// Repeat navigations/reloads in the same tab go straight to the site.
const INTRO_KEY = 'ja-intro-seen';
function introAlreadySeen(): boolean {
  try {
    return sessionStorage.getItem(INTRO_KEY) === '1';
  } catch {
    return false;
  }
}

const MIN_INTRO_MS = 650; // short enough to keep LCP fast, long enough to read the logo

export default function App() {
  const [skipIntro] = useState(introAlreadySeen);
  const [siteReady, setSiteReady] = useState(false);
  const [minTimeDone, setMinTimeDone] = useState(skipIntro);
  // The intro overlay stays until the site has rendered underneath it, so there is never a blank frame.
  const [introGone, setIntroGone] = useState(false);

  useEffect(() => {
    let alive = true;
    sitePromise.then(
      () => alive && setSiteReady(true),
      () => alive && setSiteReady(true),
    );
    const t = skipIntro ? undefined : window.setTimeout(() => setMinTimeDone(true), MIN_INTRO_MS);
    try {
      sessionStorage.setItem(INTRO_KEY, '1');
    } catch {
      /* storage unavailable — intro just shows again next time */
    }
    return () => {
      alive = false;
      if (t) clearTimeout(t);
    };
  }, [skipIntro]);

  const showSite = siteReady && minTimeDone;
  const handleIntroExited = useCallback(() => setIntroGone(true), []);

  return (
    <>
      {showSite && (
        <Suspense fallback={null}>
          <Site />
        </Suspense>
      )}
      {!introGone && (
        <LoadingScreen leaving={showSite} onExited={handleIntroExited} />
      )}
    </>
  );
}
