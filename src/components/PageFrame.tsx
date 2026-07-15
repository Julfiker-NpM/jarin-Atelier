/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface PageFrameProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const DEFAULT_TITLE = 'Jarin Atelier | Luxury Islamic Calligraphy & Custom Art';

/**
 * Each route renders inside its own PageFrame so every page is an
 * independent, self-contained "frame": it owns its entrance/exit
 * animation, scroll position, and document title.
 */
export default function PageFrame({ children, title, className = '' }: PageFrameProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    document.title = title ? `${title} | Jarin Atelier` : DEFAULT_TITLE;
  }, [title]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col flex-grow w-full ${className}`}
    >
      {children}
    </motion.div>
  );
}
