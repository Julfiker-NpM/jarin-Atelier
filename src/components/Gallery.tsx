/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, ZoomOut, X, Sparkles, SlidersHorizontal, Info, Compass } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';
import ArtworkFrame from './ArtworkFrame';
import ThreeGallery from './ThreeGallery';

export default function Gallery() {
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Newest' | 'Popular' | 'Wedding' | 'Islamic' | 'Canvas'>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [zoomScale, setZoomScale] = useState(1);

  const filteredItems = activeFilter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => {
        if (activeFilter === 'Newest') return item.category === 'Newest';
        if (activeFilter === 'Popular') return item.category === 'Popular';
        if (activeFilter === 'Wedding') return item.category === 'Wedding';
        if (activeFilter === 'Islamic') return item.category === 'Islamic';
        if (activeFilter === 'Canvas') return item.category === 'Canvas';
        return true;
      });

  const handleOpenLightbox = (item: GalleryItem) => {
    setSelectedItem(item);
    setZoomScale(1);
  };

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => Math.max(prev - 0.25, 1));
  };

  return (
    <section
      id="gallery-section"
      className="bg-brand-black text-brand-cream py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-white/5"
    >
      {/* Dynamic atmospheric radial background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-gold/2 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 text-brand-gold text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold">
            <Sparkles size={12} />
            <span>MUSEUM EXHIBITION</span>
            <Sparkles size={12} />
          </div>
          
          <h2 className="reveal font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-wide font-light mb-4">
            The Digital Salon
          </h2>
          
          <div className="w-16 h-[1.5px] bg-brand-gold mx-auto mb-6" />
          
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-gray-400 tracking-wider font-light">
            Browse our archival catalog of luxury collections. Click any masterpiece to step closer and examine the brushwork.
          </p>
        </div>

        {/* Gallery View Mode Toggle */}
        <div className="flex justify-center mb-10">
          <div className="bg-[#0f0f0f] border border-white/10 p-1.5 rounded-xl flex space-x-2 shadow-2xl">
            <button
              id="toggle-view-3d"
              onClick={() => setViewMode('3d')}
              className={`flex items-center space-x-2 px-5 py-2 rounded-lg text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                viewMode === '3d'
                  ? 'bg-brand-gold text-brand-black font-semibold shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Compass size={13} />
              <span>3D Virtual Salon</span>
            </button>

            <button
              id="toggle-view-2d"
              onClick={() => setViewMode('2d')}
              className={`flex items-center space-x-2 px-5 py-2 rounded-lg text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                viewMode === '2d'
                  ? 'bg-brand-gold text-brand-black font-semibold shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles size={13} />
              <span>2D Curated Grid</span>
            </button>
          </div>
        </div>

        {viewMode === '3d' ? (
          /* Immersive 3D Gallery View */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 animate-fade-in"
          >
            <ThreeGallery onOpenFullResolution={(item) => handleOpenLightbox(item)} />
          </motion.div>
        ) : (
          /* Traditional 2D Filtered Grid View */
          <>
            {/* Filter Navigation */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 border-b border-white/5 pb-8">
              <div className="flex items-center space-x-2 text-brand-gold text-xs tracking-widest uppercase font-medium">
                <SlidersHorizontal size={14} />
                <span>Curate View:</span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-2">
                {(['All', 'Newest', 'Popular', 'Wedding', 'Islamic', 'Canvas'] as const).map((filter) => (
                  <button
                    id={`gallery-filter-${filter.toLowerCase()}`}
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 text-xs tracking-widest uppercase transition-all duration-500 rounded focus:outline-none cursor-pointer ${
                      activeFilter === filter
                        ? 'text-brand-gold border-b-2 border-brand-gold font-bold bg-white/5'
                        : 'text-gray-400 hover:text-white hover:bg-white/2'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Luxury Gallery Wall — asymmetrical masonry composition */}
            <motion.div
              className="columns-1 sm:columns-2 lg:columns-3 gap-8 [column-fill:_balance]"
            >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              const wallAspect = (['square', 'portrait', 'landscape', 'square', 'portrait', 'landscape'] as const)[idx % 6];
              return (
              <motion.div
                id={`gallery-card-${item.id}`}
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group break-inside-avoid mb-8 cursor-zoom-in"
                onClick={() => handleOpenLightbox(item)}
              >
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <ArtworkFrame
                    label={item.imageLabel}
                    arabicLabel={item.arabicTitle}
                    aspectRatio={wallAspect}
                    imageUrl={item.imageUrl}
                  />
                  
                  {/* Hover magnifying overlay indicator */}
                  <div className="absolute inset-0 bg-brand-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                    <div className="w-10 h-10 rounded-full border border-brand-gold/50 bg-brand-black/60 flex items-center justify-center text-brand-gold shadow-lg">
                      <ZoomIn size={18} />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] text-brand-gold tracking-[0.3em] uppercase font-sans">
                      {item.category} COLLECTION
                    </span>
                    <span className="text-[10px] text-gray-500 font-serif italic">
                      {item.imageLabel}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg text-white font-medium group-hover:text-brand-gold transition-colors duration-300">
                    {item.title}
                  </h3>

                  {item.arabicTitle && (
                    <p className="font-arabic text-sm text-gray-400 mt-0.5 mb-2">
                      {item.arabicTitle}
                    </p>
                  )}

                  <p className="text-gray-400 text-xs font-light line-clamp-2 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
          </AnimatePresence>
        </motion.div>
      </>
    )}

        {/* Dynamic Lightbox zoom overlay */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              id="gallery-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/98 backdrop-blur-md flex flex-col justify-between"
            >
              {/* Lightbox Topbar */}
              <div className="w-full h-20 border-b border-white/5 px-6 flex items-center justify-between bg-brand-black">
                <div className="flex flex-col">
                  <span className="text-[10px] text-brand-gold tracking-[0.3em] uppercase">
                    {selectedItem.category} EXPOSITION
                  </span>
                  <h4 className="font-serif text-white text-base font-semibold">
                    {selectedItem.title}
                  </h4>
                </div>
                
                {/* Controls */}
                <div className="flex items-center space-x-4">
                  <button
                    id="lightbox-zoom-out"
                    onClick={handleZoomOut}
                    className="p-2 text-gray-400 hover:text-brand-gold transition-colors focus:outline-none cursor-pointer"
                    title="Zoom Out"
                    disabled={zoomScale === 1}
                  >
                    <ZoomOut size={18} className={zoomScale === 1 ? 'opacity-30' : ''} />
                  </button>
                  
                  <span className="text-xs text-gray-500 font-sans w-12 text-center select-none">
                    {Math.round(zoomScale * 100)}%
                  </span>

                  <button
                    id="lightbox-zoom-in"
                    onClick={handleZoomIn}
                    className="p-2 text-gray-400 hover:text-brand-gold transition-colors focus:outline-none cursor-pointer"
                    title="Zoom In"
                    disabled={zoomScale === 2.5}
                  >
                    <ZoomIn size={18} className={zoomScale === 2.5 ? 'opacity-30' : ''} />
                  </button>

                  <div className="h-6 w-[1px] bg-white/10 mx-2" />

                  <button
                    id="lightbox-close"
                    onClick={() => setSelectedItem(null)}
                    className="p-2.5 rounded-full bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-all focus:outline-none cursor-pointer"
                    aria-label="Close Lightbox"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Lightbox Mid: The Masterpiece display stage */}
              <div className="flex-1 flex items-center justify-center p-6 overflow-hidden relative">
                <motion.div
                  className="w-full max-w-2xl max-h-[75vh] flex items-center justify-center p-2"
                  style={{ scale: zoomScale }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <ArtworkFrame
                    label={selectedItem.imageLabel}
                    arabicLabel={selectedItem.arabicTitle}
                    aspectRatio="square"
                    imageUrl={selectedItem.imageUrl}
                    className="max-h-[70vh] shadow-[0_30px_70px_rgba(200,161,90,0.15)] rounded-xl"
                  />
                </motion.div>
              </div>

              {/* Lightbox Bottombar: Description placard */}
              <div className="w-full bg-brand-black border-t border-white/5 py-6 px-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
                <div className="max-w-2xl space-y-2 mb-4 md:mb-0">
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <Info size={14} className="text-brand-gold" />
                    <span className="font-serif text-sm text-brand-gold tracking-widest uppercase font-semibold">
                      Masterpiece Description
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>
                
                <div className="flex flex-col items-center md:items-end border-t md:border-t-0 border-white/5 pt-4 md:pt-0 w-full md:w-auto">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-sans">
                    Hand-Signed Heritage
                  </span>
                  <span className="font-serif text-xs text-brand-gold tracking-wider font-semibold mt-1">
                    Jarin Atelier Certificate Included
                  </span>
                </div>
              </div>
              </motion.div>
            )
          }
          </AnimatePresence>

      </div>
    </section>
  );
}
