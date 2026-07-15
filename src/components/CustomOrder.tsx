/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageSquare, ShieldCheck, Mail, Send, CheckCircle2, CloudUpload } from 'lucide-react';
import { CustomOrderInput } from '../types';

export default function CustomOrder() {
  const [formInput, setFormInput] = useState<CustomOrderInput>({
    name: '',
    phone: '',
    email: '',
    size: '24" x 36"',
    frameColor: 'Imperial Gold',
    canvasType: 'Premium Belgian Linen',
    preferredText: '',
    giftMessage: '',
    referenceFile: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormInput((prev) => ({ ...prev, referenceFile: files[0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate luxury API call or email submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  const sizes = ['12" x 16"', '16" x 24"', '24" x 36"', '30" x 40"', '36" x 48"', 'Custom Dimensions'];
  const frames = ['Imperial Gold', 'Obsidian Black', 'Raw Walnut', 'Champagne Silver', 'Unframed Canvas'];
  const canvasTypes = ['Premium Belgian Linen', 'Fine Art Archival Cotton', 'Metallic Gold Canvas'];

  // Dynamic visual parameters based on client selections
  const getFrameStyles = () => {
    switch (formInput.frameColor) {
      case 'Imperial Gold':
        return 'border-[16px] sm:border-[20px] border-[#C8A15A] shadow-[0_25px_60px_rgba(200,161,90,0.3)] outline outline-1 outline-brand-gold/60';
      case 'Obsidian Black':
        return 'border-[16px] sm:border-[20px] border-[#121212] shadow-[0_25px_50px_rgba(0,0,0,0.75)] outline outline-1 outline-[#DFBA73]/30';
      case 'Raw Walnut':
        return 'border-[16px] sm:border-[20px] border-[#533a2d] shadow-[0_25px_50px_rgba(83,58,45,0.4)] outline outline-1 outline-stone-800';
      case 'Champagne Silver':
        return 'border-[16px] sm:border-[20px] border-[#b0b3b8] shadow-[0_25px_50px_rgba(176,179,184,0.25)] outline outline-1 outline-stone-400';
      case 'Unframed Canvas':
      default:
        return 'border-[4px] border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.65)]';
    }
  };

  const getCanvasStyles = () => {
    switch (formInput.canvasType) {
      case 'Premium Belgian Linen':
        return 'bg-[#eedbc5] text-brand-black';
      case 'Fine Art Archival Cotton':
        return 'bg-[#faf6f0] text-[#121212]';
      case 'Metallic Gold Canvas':
        return 'bg-gradient-to-tr from-[#8c6b2e] via-[#c8a15a] to-[#dfba73] text-[#070707]';
      default:
        return 'bg-[#eedbc5] text-brand-black';
    }
  };

  const getAspectClass = () => {
    if (formInput.size === 'Custom Dimensions') return 'aspect-square';
    if (formInput.size === '12" x 16"' || formInput.size === '30" x 40"') return 'aspect-[3/4]';
    return 'aspect-[2/3]'; // standard portrait
  };

  return (
    <section
      id="custom-order-section"
      className="bg-brand-black text-brand-cream py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-white/5"
    >
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-gold/2 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 text-brand-gold text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold">
            <Sparkles size={12} />
            <span>COMMISSION WORKS</span>
            <Sparkles size={12} />
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-wide font-light mb-4">
            Bespoke Art Commission
          </h2>
          
          <div className="w-16 h-[1.5px] bg-brand-gold mx-auto mb-6" />
          
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-gray-400 tracking-wider font-light leading-relaxed">
            Co-create a timeless masterpiece. Choose your preferred Quranic verses, size parameters, luxury canvas weave, and hand-polished timber mouldings. Watch your selection preview live on our design board.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: INTERACTIVE VISUAL DESK PREVIEW */}
          <div className="lg:col-span-5 w-full flex flex-col items-center lg:sticky lg:top-24">
            <div className="w-full bg-[#0b0c0c] border border-brand-gold/20 rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col items-center space-y-6 relative overflow-hidden">
              {/* Natural downlighting spotlight overlay */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-brand-gold/15 rounded-full blur-[40px] pointer-events-none" />
              
              <div className="w-full flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex flex-col">
                  <span className="text-[9px] text-brand-gold tracking-[0.25em] uppercase font-bold">
                    COMMISSION BOARD
                  </span>
                  <h4 className="font-serif text-sm text-white font-medium mt-0.5">
                    Live Specification Preview
                  </h4>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-pulse" />
              </div>

              {/* Dynamic Mockup Preview Frame */}
              <div className="w-full flex items-center justify-center py-4">
                <motion.div
                  layout
                  className={`w-full max-w-[280px] transition-all duration-700 ${getAspectClass()} ${getFrameStyles()} rounded overflow-hidden flex flex-col relative`}
                >
                  {/* Canvas surface texture details */}
                  <div className={`w-full h-full p-6 flex flex-col items-center justify-between relative ${getCanvasStyles()} transition-colors duration-500`}>
                    
                    {/* Shadow inner border for 3D depth */}
                    <div className="absolute inset-0 border border-brand-black/15 pointer-events-none" />
                    
                    {/* Atmospheric lighting shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-brand-black/25 pointer-events-none" />

                    {/* Top Arabic Scribe Metadata */}
                    <div className="text-[8px] tracking-[0.25em] text-center uppercase opacity-50 font-sans pointer-events-none select-none">
                      JARIN ATELIER ARCHIVE
                    </div>

                    {/* Central Masterpiece Calligraphy */}
                    <div className="flex-1 flex flex-col items-center justify-center p-2 relative z-10 w-full">
                      {formInput.preferredText ? (
                        <div className="text-center space-y-3 w-full">
                          {/* Live render calligraphic signature placeholder lines */}
                          <svg viewBox="0 0 100 100" className="w-16 h-16 mx-auto opacity-75 object-contain" fill="none" stroke="currentColor">
                            <path d="M 15 65 Q 40 85, 70 50 Q 85 30, 50 15 Q 15 45, 80 80" strokeWidth="3" strokeLinecap="round"/>
                            <circle cx="50" cy="50" r="3" fill="currentColor" />
                          </svg>
                          <p className="font-serif text-xs italic tracking-wider line-clamp-3 leading-relaxed px-2 border-t border-brand-black/10 pt-2 text-brand-black/80 font-semibold uppercase">
                            "{formInput.preferredText}"
                          </p>
                        </div>
                      ) : (
                        <div className="text-center space-y-2 opacity-35 select-none pointer-events-none">
                          <svg viewBox="0 0 100 100" className="w-20 h-20 mx-auto" fill="none" stroke="currentColor">
                            <path d="M 30 70 Q 50 85, 70 70 M 50 15 L 50 80 M 20 40 Q 50 10, 80 40" strokeWidth="2.5" strokeLinecap="round" />
                          </svg>
                          <span className="font-serif text-[10px] tracking-widest uppercase block">
                            Calligraphy Awaiting Text
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Specification Badge */}
                    <div className="flex flex-col items-center text-center opacity-70 scale-95 relative z-10 pointer-events-none select-none">
                      <span className="text-[10px] font-serif tracking-widest font-bold border-t border-brand-black/20 pt-1.5 uppercase">
                        {formInput.size}
                      </span>
                      <span className="text-[7px] tracking-widest uppercase mt-0.5 block font-sans">
                        {formInput.canvasType}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Specification Ledger */}
              <div className="w-full bg-brand-black/50 border border-white/5 rounded-xl p-4 space-y-2.5 text-xs">
                <div className="flex justify-between items-center text-[10px] text-gray-500 uppercase tracking-widest">
                  <span>PARAMETER</span>
                  <span>SELECTION</span>
                </div>
                <div className="h-[1px] bg-white/5" />
                <div className="flex justify-between">
                  <span className="text-gray-400">Dimensions:</span>
                  <span className="text-brand-gold uppercase font-bold tracking-wide">{formInput.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Frame Moulding:</span>
                  <span className="text-brand-gold uppercase font-bold tracking-wide">{formInput.frameColor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Canvas Base:</span>
                  <span className="text-brand-gold uppercase font-bold tracking-wide">{formInput.canvasType}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: QUESTIONNAIRE FORM */}
          <div className="lg:col-span-7 w-full">
            <AnimatePresence mode="wait">
              {!submitSuccess ? (
                <motion.form
                  id="custom-order-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6 }}
                  className="bg-[#121212] border border-white/5 rounded-2xl p-6 sm:p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-8"
                >
                  <div className="border-b border-white/5 pb-6">
                    <h3 className="font-serif text-xl text-white font-medium mb-1">
                      Atelier Consultation Questionnaire
                    </h3>
                    <p className="text-xs text-brand-gold/80 tracking-wider">
                      Our art concierge will review your selections and contact you in 24 hours.
                    </p>
                  </div>

                  {/* Grid 1: Basic Contact Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="name-input" className="text-xs tracking-widest uppercase font-semibold text-gray-400">
                        Your Name *
                      </label>
                      <input
                        id="name-input"
                        type="text"
                        name="name"
                        value={formInput.name}
                        onChange={handleInputChange}
                        required
                        placeholder="E.g., Sulaiman Al-Hassan"
                        className="w-full bg-brand-black border border-white/10 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors font-sans font-light"
                      />
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label htmlFor="phone-input" className="text-xs tracking-widest uppercase font-semibold text-gray-400">
                        Phone Number *
                      </label>
                      <input
                        id="phone-input"
                        type="tel"
                        name="phone"
                        value={formInput.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="E.g., +1 (555) 019-2834"
                        className="w-full bg-brand-black border border-white/10 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors font-sans font-light"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label htmlFor="email-input" className="text-xs tracking-widest uppercase font-semibold text-gray-400">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        id="email-input"
                        type="email"
                        name="email"
                        value={formInput.email}
                        onChange={handleInputChange}
                        required
                        placeholder="E.g., sulaiman@domain.com"
                        className="w-full bg-brand-black border border-white/10 rounded pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors font-sans font-light"
                      />
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    </div>
                  </div>

                  {/* Grid 2: Frame Specifications */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="size-select" className="text-xs tracking-widest uppercase font-semibold text-gray-400">
                        Artwork Size
                      </label>
                      <select
                        id="size-select"
                        name="size"
                        value={formInput.size}
                        onChange={handleInputChange}
                        className="w-full bg-brand-black border border-white/10 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors font-sans font-light cursor-pointer"
                      >
                        {sizes.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label htmlFor="frame-select" className="text-xs tracking-widest uppercase font-semibold text-gray-400">
                        Frame Color
                      </label>
                      <select
                        id="frame-select"
                        name="frameColor"
                        value={formInput.frameColor}
                        onChange={handleInputChange}
                        className="w-full bg-brand-black border border-white/10 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors font-sans font-light cursor-pointer"
                      >
                        {frames.map((f) => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label htmlFor="canvas-select" className="text-xs tracking-widest uppercase font-semibold text-gray-400">
                        Canvas Type
                      </label>
                      <select
                        id="canvas-select"
                        name="canvasType"
                        value={formInput.canvasType}
                        onChange={handleInputChange}
                        className="w-full bg-brand-black border border-white/10 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors font-sans font-light cursor-pointer"
                      >
                        {canvasTypes.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Calligraphic Text Details */}
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-center">
                      <label htmlFor="preferred-text-area" className="text-xs tracking-widest uppercase font-semibold text-gray-400">
                        Preferred Arabic Verse, Names or Phrase *
                      </label>
                      <span className="font-serif text-[10px] text-brand-gold uppercase tracking-widest italic font-semibold">
                        Surah, Ayat, or Names
                      </span>
                    </div>
                    <textarea
                      id="preferred-text-area"
                      name="preferredText"
                      value={formInput.preferredText}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder="Specify the exact Arabic script, Quranic chapter/verse, or custom family name (e.g. Surah Al-Ikhlas or the names 'Zayd and Sarah' in Thuluth script)"
                      className="w-full bg-brand-black border border-white/10 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors font-sans font-light resize-none"
                    />
                  </div>

                  {/* Reference Attachment and Gift message */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Reference upload with UI guidance */}
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="file-upload-input" className="text-xs tracking-widest uppercase font-semibold text-gray-400">
                        Reference Image or Room View (Optional)
                      </label>
                      <div className="relative border border-dashed border-white/10 rounded-lg p-6 bg-brand-black flex flex-col items-center justify-center text-center hover:border-brand-gold/40 transition-colors cursor-pointer group">
                        <input
                          id="file-upload-input"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <CloudUpload className="text-gray-500 group-hover:text-brand-gold transition-colors mb-2" size={24} />
                        <span className="text-xs text-gray-300 font-sans font-light">
                          {formInput.referenceFile ? formInput.referenceFile.name : 'Drag & drop image or click to browse'}
                        </span>
                        <span className="text-[10px] text-gray-500 font-sans mt-1">
                          PNG, JPG, JPEG up to 10MB
                        </span>
                      </div>
                    </div>

                    {/* Gift message input */}
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="gift-message-area" className="text-xs tracking-widest uppercase font-semibold text-gray-400">
                        Personalized Gift Message (Optional)
                      </label>
                      <textarea
                        id="gift-message-area"
                        name="giftMessage"
                        value={formInput.giftMessage}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="If this is a premium gift, write the message to be scripted onto a gold wax-sealed letter in the packaging box..."
                        className="w-full bg-brand-black border border-white/10 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors font-sans font-light resize-none h-full max-h-[105px]"
                      />
                    </div>

                  </div>

                  {/* Submission Button */}
                  <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <ShieldCheck size={18} className="text-brand-gold" />
                      <span className="text-[11px] font-sans font-light">
                        Fully encrypted transaction & private direct consultation.
                      </span>
                    </div>

                    <button
                      id="custom-submit-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-10 py-3.5 bg-brand-gold text-brand-black hover:bg-white text-[13px] tracking-[0.2em] font-semibold uppercase rounded transition-all duration-500 shadow-lg hover:shadow-[0_10px_20px_rgba(200,161,90,0.2)] flex items-center justify-center space-x-2 focus:outline-none cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-brand-black border-t-transparent rounded-full animate-spin" />
                          <span>Transmitting Selections...</span>
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          <span>Submit Selections</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  id="custom-order-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#121212] border border-brand-gold/30 rounded-2xl p-10 sm:p-16 text-center shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold flex items-center justify-center text-brand-gold mb-2">
                    <CheckCircle2 size={32} />
                  </div>

                  <h3 className="font-serif text-3xl text-white font-medium">
                    Bespoke Order Received
                  </h3>

                  <div className="w-12 h-[1px] bg-brand-gold/50 mx-auto" />

                  <p className="font-sans text-sm text-gray-300 leading-relaxed max-w-xl mx-auto font-light">
                    Thank you for entrusting your vision to Jarin Atelier. Your specifications have been safely cataloged. Our chief art concierge will personally reach out to you via your email address (<strong>{formInput.email}</strong>) and WhatsApp within 24 hours to coordinate the initial sketch consult.
                  </p>

                  <a
                    href={`https://wa.me/8801890770297?text=${encodeURIComponent("Assalamu alaikum, I just submitted a Bespoke Order request. Please confirm my commission details. JazakAllah.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 px-8 py-3 bg-[#25D366] text-white hover:bg-[#1ebe5a] text-[11px] tracking-[0.2em] font-semibold uppercase rounded transition-all duration-500 focus:outline-none cursor-pointer shadow-md hover:shadow-lg"
                  >
                    <Send size={15} />
                    <span>Send Order to WhatsApp</span>
                  </a>

                  <div className="pt-6">
                    <button
                      id="custom-done-btn"
                      onClick={() => setSubmitSuccess(false)}
                      className="px-8 py-3 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black text-[11px] tracking-[0.2em] font-semibold uppercase rounded transition-all duration-500 focus:outline-none cursor-pointer"
                    >
                      Commission Another Masterpiece
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
