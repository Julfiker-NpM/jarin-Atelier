/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  arabicName?: string;
  category: 'Allah' | 'Bismillah' | 'Ayatul Kursi' | 'Wedding' | 'Custom Name Art' | 'Canvas' | 'Wall Decor';
  price: number;
  originalPrice?: number;
  rating: number;
  images: string[]; // Placeholder image IDs or colors
  description: string;
  sizes: string[];
  frames: string[];
  canvasTypes: string[];
  features: string[];
  arabicText?: string;
  isPopular?: boolean;
  isNew?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  arabicTitle?: string;
  category: 'Wedding' | 'Islamic' | 'Canvas' | 'Newest' | 'Popular';
  imageLabel: string;
  description: string;
  imageUrl?: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedFrame: string;
  selectedCanvas: string;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface CustomOrderInput {
  name: string;
  phone: string;
  email: string;
  size: string;
  frameColor: string;
  canvasType: string;
  preferredText: string;
  giftMessage?: string;
  referenceFile?: File | null;
}
