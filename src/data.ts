/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, GalleryItem, Testimonial, FAQItem } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'art-01',
    name: 'Al-Khaliq Majesty',
    arabicName: 'الله جل جلاله',
    category: 'Allah',
    price: 380,
    originalPrice: 450,
    rating: 5.0,
    images: ['art-01'], // Used to render unique beautiful custom digital artwork frame
    description: 'An majestic, handcrafted rendition of the word "Allah" written in classic Thuluth script. Rendered with premium 24k gold leaf details on a deeply textured midnight charcoal canvas, enclosed in a hand-polished museum grade black oak frame.',
    sizes: ['16" x 24"', '24" x 36"', '32" x 48"'],
    frames: ['Imperial Gold', 'Obsidian Black', 'Raw Walnut', 'Unframed Canvas'],
    canvasTypes: ['Premium Belgian Linen', 'Fine Art Archival Cotton', 'Metallic Gold Canvas'],
    features: [
      '100% Handcrafted by master calligraphers',
      'Accented with authentic 24k Gold Leaf gilding',
      'Archival-grade pigments with 100+ year fade resistance',
      'Museum-grade anti-reflective glass protection'
    ],
    arabicText: 'الله',
    isPopular: true,
    isNew: false
  },
  {
    id: 'art-02',
    name: 'The Sacred Beginning',
    arabicName: 'بسم الله الرحمن الرحيم',
    category: 'Bismillah',
    price: 490,
    rating: 4.9,
    images: ['art-02'],
    description: 'The Bismillah Ar-Rahman Ar-Rahim beautifully composed in an elegant teardrop Diwani Jali script. A stunning visual reminder that graces your home with blessings, finished in textured golden tones on a rich warm mocha background.',
    sizes: ['18" x 24"', '30" x 40"', '36" x 48"'],
    frames: ['Imperial Gold', 'Obsidian Black', 'Classic Walnut', 'Unframed Canvas'],
    canvasTypes: ['Fine Art Archival Cotton', 'Premium Belgian Linen'],
    features: [
      'Authentic Diwani Jali script detailing',
      'Hand-applied gold leaf textures',
      'Premium custom canvas stretching',
      'Signed certificate of authenticity'
    ],
    arabicText: 'بسم الله الرحمن الرحيم',
    isPopular: false,
    isNew: true
  },
  {
    id: 'art-03',
    name: 'Al-Kursi Divine Shield',
    arabicName: 'آية الكرسي',
    category: 'Ayatul Kursi',
    price: 850,
    originalPrice: 980,
    rating: 5.0,
    images: ['art-03'],
    description: 'The monumental Verse of the Throne (Ayatul Kursi) meticulously hand-written in a breathtaking circular layout. The intricate script creates a protective and spiritual focal point for any premium living space, detailed in rich metallic gold on velvet-black.',
    sizes: ['24" x 24"', '36" x 36"', '48" x 48"'],
    frames: ['Imperial Gold', 'Obsidian Black', 'Raw Walnut'],
    canvasTypes: ['Premium Belgian Linen', 'Metallic Gold Canvas'],
    features: [
      'Circular geometric script design',
      'Intricate multi-layered gold leaf accents',
      'Framed in luxury deep-profile wood',
      'Protected with museum-grade UV glass'
    ],
    arabicText: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
    isPopular: true,
    isNew: false
  },
  {
    id: 'art-04',
    name: 'Eternal Covenant',
    arabicName: 'وجعل بينكم مودة ورحمة',
    category: 'Wedding',
    price: 420,
    rating: 4.8,
    images: ['art-04'],
    description: 'A customized wedding masterpiece incorporating the Quranic verse of love and mercy ("And He placed between you affection and mercy"). Perfect as an exquisite wedding gift, personalized with the couple\'s names written in gold Diwani script.',
    sizes: ['16" x 20"', '20" x 30"', '24" x 36"'],
    frames: ['Imperial Gold', 'Champagne Silver', 'Obsidian Black'],
    canvasTypes: ['Fine Art Archival Cotton', 'Premium Belgian Linen'],
    features: [
      'Customized with couple’s names & wedding date',
      'Hand-scripted with fine calligraphy details',
      'Finished in subtle warm gold and cream tones',
      'Presented in a premium satin-lined gift box'
    ],
    arabicText: 'وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
    isPopular: false,
    isNew: true
  },
  {
    id: 'art-05',
    name: 'Imperial Custom Name Art',
    arabicName: 'خط عربي مخصص باسمك',
    category: 'Custom Name Art',
    price: 320,
    rating: 4.9,
    images: ['art-05'],
    description: 'Own a piece of bespoke luxury. Commission our master artist to scribe your family name, individual name, or specialized house blessing in the script of your choice (Thuluth, Naskh, or Diwani), painted in brilliant gold on a custom background.',
    sizes: ['12" x 16"', '16" x 24"', '24" x 36"'],
    frames: ['Imperial Gold', 'Obsidian Black', 'Classic Walnut', 'Unframed Canvas'],
    canvasTypes: ['Fine Art Archival Cotton', 'Premium Belgian Linen', 'Metallic Gold Canvas'],
    features: [
      '100% Bespoke personalized calligraphy commission',
      'Direct consultation with our chief artist',
      'Your choice of traditional Arabic scripts',
      'Individually hand-signed and certified'
    ],
    arabicText: 'خط يدوي مخصص',
    isPopular: true,
    isNew: false
  },
  {
    id: 'art-06',
    name: 'The Sovereignty of Al-Mulk',
    arabicName: 'تبارك الذي بيده الملك',
    category: 'Wall Decor',
    price: 640,
    rating: 5.0,
    images: ['art-06'],
    description: 'A beautiful linear composition of the opening of Surah Al-Mulk ("Blessed is He in whose hand is dominion"). Spanning across a dramatic horizontal layout, it features high-relief gold lettering on an obsidian black canvas, expressing sovereignty.',
    sizes: ['12" x 36"', '16" x 48"', '20" x 60"'],
    frames: ['Obsidian Black', 'Imperial Gold', 'Unframed Canvas'],
    canvasTypes: ['Premium Belgian Linen'],
    features: [
      'Stunning wide panoramic horizontal aspect ratio',
      '3D raised-relief gold calligraphy technique',
      'Heavy textured luxury linen backdrop',
      'Fitted with integrated heavy-duty museum hanging wire'
    ],
    arabicText: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ',
    isPopular: false,
    isNew: false
  },
  {
    id: 'art-07',
    name: 'Al-Mu’minun Sanctuary',
    arabicName: 'قد أفلح المؤمنون',
    category: 'Canvas',
    price: 550,
    rating: 4.7,
    images: ['art-07'],
    description: 'A minimalist masterpiece utilizing vast off-white negative space and a single fluid, deep-olive and gold stroke representing Surah Al-Mu’minun. Designed with Apple-level elegance for contemporary minimalist homes and premium offices.',
    sizes: ['20" x 24"', '30" x 40"', '40" x 50"'],
    frames: ['Raw Walnut', 'Obsidian Black', 'Unframed Canvas'],
    canvasTypes: ['Fine Art Archival Cotton'],
    features: [
      'Minimalist gallery design with expansive white space',
      'Unique olive green and raw gold brush strokes',
      'Float-framed in natural sustainable walnut',
      'Ideal for modern luxury interior designs'
    ],
    arabicText: 'قَدْ أَفْلَحَ الْمُؤْمِنُونَ',
    isPopular: false,
    isNew: true
  },
  {
    id: 'art-08',
    name: 'Surah Ar-Rahman Cascade',
    arabicName: 'فبأي آلاء ربكما تكذبان',
    category: 'Wall Decor',
    price: 720,
    originalPrice: 800,
    rating: 5.0,
    images: ['art-08'],
    description: 'The celebrated verse "Which then of the bounties of your Lord will you deny?" repeated in cascading, waves of golden Thuluth script. A magnificent tribute to gratitude and divine abundance, creating a sense of serene spiritual motion.',
    sizes: ['18" x 36"', '24" x 48"', '32" x 64"'],
    frames: ['Imperial Gold', 'Obsidian Black', 'Raw Walnut'],
    canvasTypes: ['Premium Belgian Linen', 'Fine Art Archival Cotton'],
    features: [
      'Cascading calligraphic wave composition',
      'Hand-applied genuine gold leaf embellishments',
      'Thick textured gallery-wrapped linen',
      'Certified authentic museum release'
    ],
    arabicText: 'فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ',
    isPopular: true,
    isNew: false
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-01',
    title: 'Surah An-Nur Portal',
    arabicTitle: 'الله نور السماوات والأرض',
    category: 'Islamic',
    imageLabel: 'Artwork 01',
    description: 'Surah An-Nur ("God is the light of the heavens and the earth") rendered in a stunning solar burst layout inside a hand-gilded arch, representing the mihrab of faith.',
    imageUrl: '/assets/art-01.png'
  },
  {
    id: 'g-02',
    title: 'The Golden Bismillah',
    arabicTitle: 'بسم الله',
    category: 'Canvas',
    imageLabel: 'Artwork 02',
    description: 'Textured gold leaf cascading over a rich dark chocolate Belgian linen background, representing the infinite starting point of divine grace.',
    imageUrl: '/assets/art-02.png'
  },
  {
    id: 'g-03',
    title: 'Imperial Family Names',
    arabicTitle: 'أسماء العائلة المخصصة',
    category: 'Wedding',
    imageLabel: 'Artwork 03',
    description: 'A bespoke family lineage map written in classical Diwani script, accented with imperial crimson ink and gold leaf borders.',
    imageUrl: '/assets/art-03.png'
  },
  {
    id: 'g-04',
    title: 'The Crown of Ayatul Kursi',
    arabicTitle: 'تاج آية الكرسي',
    category: 'Popular',
    imageLabel: 'Artwork 04',
    description: 'A massive circular rendering of Ayatul Kursi detailed in 24k gold, which spent three months in hand-crafting before final polish.',
    imageUrl: '/assets/art-04.png'
  },
  {
    id: 'g-05',
    title: 'The Verse of Mercy & Love',
    arabicTitle: 'وجعل بينكم مودة ورحمة',
    category: 'Wedding',
    imageLabel: 'Artwork 05',
    description: 'An elegant wedding commission inside a champagne gold floating frame, detailed with soft cream tones and delicate floral borders.',
    imageUrl: '/assets/art-05.png'
  },
  {
    id: 'g-06',
    title: 'Minimalist Al-Asr Scribe',
    arabicTitle: 'والعصر إن الإنسان لفي خسر',
    category: 'Newest',
    imageLabel: 'Artwork 06',
    description: 'An ultra-minimalist horizontal calligraphy composition showcasing Surah Al-Asr with thick black ink and elegant gold highlights.',
    imageUrl: '/assets/art-06.png'
  },
  {
    id: 'g-07',
    title: 'Al-Wahid Sacred Panels',
    arabicTitle: 'الواحد الأحد جل جلاله',
    category: 'Islamic',
    imageLabel: 'Artwork 07',
    description: 'An outstanding hand-gilded dual-panel composition of Arabic calligraphy, written in thick, burning-crimson Thuluth letters over a highly textured forest-emerald background, encased in an imperial gold frame. Signed by Jarin.',
    imageUrl: '/assets/art-07.png'
  },
  {
    id: 'g-08',
    title: 'Serenade at Golden Hour',
    arabicTitle: 'غروب الشمس على المحيط',
    category: 'Canvas',
    imageLabel: 'Artwork 08',
    description: 'An exquisite hand-painted canvas detailing a magnificent sunset over a calm sea, featuring deep-crimson, yellow, and orange cloudscapes reflecting over soft teal-blue ripples. Set in a thick, textured luxury gold frame.',
    imageUrl: '/assets/art-08.png'
  },
  {
    id: 'g-09',
    title: 'A Beautiful Beginning',
    arabicTitle: 'ربنا هب لنا من أزواجنا مودة',
    category: 'Wedding',
    imageLabel: 'Artwork 09',
    description: 'Bespoke floral and calligraphic wedding commission forming a gorgeous golden heart structure, with swirling blue and teal marble details, complete with custom plaque and white roses display. Signed by Jarin.',
    imageUrl: '/assets/art-09.png'
  },
  {
    id: 'g-10',
    title: 'The Eternal Oath (Bismillah)',
    arabicTitle: 'بسم الله الرحمن الرحيم',
    category: 'Islamic',
    imageLabel: 'Artwork 10',
    description: 'Classical "Bismillah" composed beautifully in lime-green and white calligraphy on an organic textured field, housed in a contemporary matte-black gallery frame.',
    imageUrl: '/assets/art-10.png'
  },
  {
    id: 'g-11',
    title: 'Surah Al-Ikhlas Heritage',
    arabicTitle: 'قل هو الله أحد الله الصمد',
    category: 'Canvas',
    imageLabel: 'Artwork 11',
    description: 'Divine gold and bronze Thuluth script of Surah Al-Ikhlas over a dark textured earth and mahogany backdrop, framed in bold gallery obsidian-black. Signed by Jarin.',
    imageUrl: '/assets/art-01.png'
  },
  {
    id: 'g-12',
    title: 'Al-Malik Blue Sanctuary',
    arabicTitle: 'يا الله جل جلاله',
    category: 'Islamic',
    imageLabel: 'Artwork 12',
    description: 'An elegant composition of the divine name "Allah" scripted in modern white-contoured calligraphy against a highly textured rich royal cobalt blue backdrop. Framed in a premium dark wood frame.',
    imageUrl: '/assets/art-10.png'
  },
  {
    id: 'g-13',
    title: 'The Flame of Love (Hubb)',
    arabicTitle: 'وجعل بينكم مودة ورحمة حب',
    category: 'Popular',
    imageLabel: 'Artwork 13',
    description: 'An intense calligraphic expression representing divine and human affection, shaped like a flame in a striking crimson hue over a glowing sunburst abstract background, enclosed in a matte-black frame.',
    imageUrl: '/assets/art-03.png'
  },
  {
    id: 'g-14',
    title: 'Mecca Nocturne (Bengali Scribe)',
    arabicTitle: 'আমার জন্য আল্লাহই যথেষ্ট',
    category: 'Newest',
    imageLabel: 'Artwork 14',
    description: 'A deeply serene nocturnal canvas depicting the Holy Kaaba under starlight, highlighted by beautiful Bengali calligraphy on the left saying "Amar Jonno Allah\'i Jothesto" (Allah is enough for me). Housed in a dark wood frame.',
    imageUrl: '/assets/art-09.png'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-01',
    name: 'Sarah Al-Mansoori',
    role: 'Luxury Interior Designer, London',
    rating: 5,
    text: 'Jarin Atelier has redefined Islamic art for contemporary spaces. I commissioned the circular Ayatul Kursi for a high-end Mayfair penthouse project. The quality of the gold leaf, the precision of the framing, and the sheer presence of the artwork left our clients speechless. A truly world-class luxury experience.',
    date: 'June 18, 2026'
  },
  {
    id: 't-02',
    name: 'Farhan & Layla Qureshi',
    role: 'Art Collectors, Dubai',
    rating: 5,
    text: 'We bought the custom "Eternal Covenant" wedding calligraphy to celebrate our silver anniversary. It is not just an artwork; it is a sacred family heirloom. The gold lettering catches the light of our living room beautifully at sunset. The secure packaging and delivery to Dubai were immaculate.',
    date: 'May 04, 2026'
  },
  {
    id: 't-03',
    name: 'Dr. Tariq Mahmood',
    role: 'Corporate Art Advisor, Toronto',
    rating: 5,
    text: 'To find authentic, 100% handmade calligraphic art of this scale and material quality is exceptionally rare in the digital age. Jarin Atelier is a beacon of authentic craftsmanship. The custom work they created for our corporate headquarters is a profound daily source of inspiration.',
    date: 'March 22, 2026'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-01',
    question: 'Are the artworks truly 100% handmade?',
    answer: 'Yes, absolutely. At Jarin Atelier, we hold ourselves to the highest traditional standards. Every brushstroke, ink formulation, and gold leaf gilding is meticulously hand-applied by master calligraphers with decades of training. We never print or mass-produce calligraphy. Each piece is unique and comes with a signed, serial-numbered Certificate of Authenticity.'
  },
  {
    id: 'faq-02',
    question: 'What materials do you use for your frames and canvas?',
    answer: 'We source only the finest global materials. Our canvases are made of premium, extra-thick Belgian linen and heavy-duty archival museum-grade cotton. Our luxury frames are handcrafted from solid premium woods like American Oak, black walnut, and ash, finished with hand-burnished metallic gilding or rich matte lacquers. All glazed works are protected by museum-grade, anti-reflective, 99% UV-cut glass.'
  },
  {
    id: 'faq-03',
    question: 'How does the Custom Commission process work?',
    answer: 'Commissioning a custom artwork is a highly personal, luxury collaborative experience. After submitting your custom order request, our art concierge will contact you within 24 hours to schedule a consultation. We will discuss your preferred script, Arabic verses or names, sizing, color scheme, and framing options. Once approved, you will receive intermediate progress sketches and photo updates as your masterpiece is scripted.'
  },
  {
    id: 'faq-04',
    question: 'Do you ship internationally, and is the packaging secure?',
    answer: 'Yes, we ship our masterpieces globally with premium express couriers (DHL/FedEx) which are fully insured. Because of the delicate nature of luxury frames and gold leaf, our packaging is of military-grade security. Smaller pieces are nested in custom foam-insulated satin presentation boxes, while larger artworks are secured inside reinforced solid wooden crates to ensure they arrive in pixel-perfect museum condition.'
  },
  {
    id: 'faq-05',
    question: 'Can I choose a custom script or verse not listed in your shop?',
    answer: 'Absolutely. Our master calligraphers are proficient in all classical traditional scripts, including Thuluth, Diwani, Diwani Jali, Naskh, Kufic, and Riq’ah. You can request any verse from the Holy Quran, traditional prayers (duas), Arabic poetry, family names, or custom text during the Custom Order consultation.'
  }
];
