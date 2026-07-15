/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Canvas-based invoice image generator. Draws a professional, portrait
 * invoice (ideal for WhatsApp sharing) entirely client-side with no
 * external dependencies, then exposes helpers to download it or share
 * it (image file) via WhatsApp.
 */

export interface InvoiceItem {
  name: string;
  quantity: number;
  price: number; // unit price
}

export interface InvoiceData {
  invoiceNo: string;
  date: string;
  items: InvoiceItem[];
  total: number;
  billTo?: string;
  note?: string;
}

const GOLD = '#B5873C';
const GOLD_LIGHT = '#D8B25E';
const INK = '#211C15';
const MUTED = '#6B6258';
const LINE = 'rgba(33, 28, 21, 0.12)';

const BUSINESS = {
  name: 'Jarin Atelier',
  tagline: 'Where Faith Meets Art',
  address: 'House 38, Road 18, Sector 14, Uttara, Dhaka 1230',
  phone: '+880 1890 770297',
  whatsapp: '+880 1890 770297',
  email: 'jarinateliar26@gmail.com',
  web: 'jarin-atelier.com',
};

// Portrait A-format friendly dimensions (good for WhatsApp previews)
const W = 800;
const H = 1180;
const M = 56; // outer margin

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function drawLine(ctx: CanvasRenderingContext2D, x1: number, y: number, x2: number) {
  ctx.strokeStyle = LINE;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x1, y);
  ctx.lineTo(x2, y);
  ctx.stroke();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(' ');
  let lineStr = '';
  let yy = y;
  for (const word of words) {
    const test = lineStr ? `${lineStr} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && lineStr) {
      ctx.fillText(lineStr, x, yy);
      lineStr = word;
      yy += lineHeight;
    } else {
      lineStr = test;
    }
  }
  if (lineStr) ctx.fillText(lineStr, x, yy);
}

export async function drawInvoice(canvas: HTMLCanvasElement, data: InvoiceData) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.scale(dpr, dpr);
  ctx.textBaseline = 'alphabetic';

  // Warm ivory background
  ctx.fillStyle = '#FAF7F1';
  ctx.fillRect(0, 0, W, H);

  // Double gold frame
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 3;
  ctx.strokeRect(M - 18, M - 18, W - (M - 18) * 2, H - (M - 18) * 2);
  ctx.strokeStyle = 'rgba(181, 135, 60, 0.35)';
  ctx.lineWidth = 1;
  ctx.strokeRect(M - 10, M - 10, W - (M - 10) * 2, H - (M - 10) * 2);

  let y = M;

  // ---- Header: logo + brand ----
  const logo = await loadImage('/assets/logo-mark.png');
  const logoH = 86;
  if (logo) {
    const ratio = Math.min(logoH / logo.height, logoH / logo.width);
    const dw = logo.width * ratio;
    const dh = logo.height * ratio;
    ctx.drawImage(logo, M, y, dw, dh);
  }
  ctx.fillStyle = INK;
  ctx.font = '700 30px Jost, sans-serif';
  ctx.fillText('JARIN ATELIER', M + 104, y + 38);
  ctx.fillStyle = GOLD;
  ctx.font = '600 13px Jost, sans-serif';
  ctx.fillText('WHERE FAITH MEETS ART', M + 104, y + 60);

  // Invoice title (right aligned)
  ctx.fillStyle = GOLD;
  ctx.font = '700 26px Jost, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('ORDER INVOICE', W - M, y + 30);
  ctx.fillStyle = MUTED;
  ctx.font = '400 13px Jost, sans-serif';
  ctx.fillText(`No. ${data.invoiceNo}`, W - M, y + 54);
  ctx.fillText(data.date, W - M, y + 74);
  ctx.textAlign = 'left';

  y += 122;
  drawLine(ctx, M, y, W - M);

  // ---- FROM / BILL TO ----
  y += 30;
  ctx.fillStyle = GOLD;
  ctx.font = '600 12px Jost, sans-serif';
  ctx.fillText('FROM', M, y);
  ctx.fillText('BILL TO', W - M - 300, y);

  y += 22;
  ctx.fillStyle = INK;
  ctx.font = '600 15px Jost, sans-serif';
  ctx.fillText(BUSINESS.name, M, y);
  ctx.fillText(data.billTo || 'Valued Customer', W - M - 300, y);

  y += 22;
  ctx.fillStyle = MUTED;
  ctx.font = '400 12.5px Jost, sans-serif';
  wrapText(ctx, BUSINESS.address, M, y, 300, 17);
  y += 17 * 3;
  ctx.fillText(`Phone / WhatsApp: ${BUSINESS.whatsapp}`, M, y);
  y += 17;
  ctx.fillText(`Email: ${BUSINESS.email}`, M, y);
  ctx.fillText('Thank you for your order.', W - M - 300, y - 17);

  y += 36;
  drawLine(ctx, M, y, W - M);

  // ---- Items table ----
  y += 30;
  ctx.fillStyle = GOLD;
  ctx.font = '600 12px Jost, sans-serif';
  ctx.fillText('ITEM', M, y);
  ctx.textAlign = 'center';
  ctx.fillText('QTY', W / 2, y);
  ctx.textAlign = 'right';
  ctx.fillText('AMOUNT', W - M, y);
  ctx.textAlign = 'left';

  y += 12;
  drawLine(ctx, M, y, W - M);
  y += 26;

  ctx.font = '500 14px Jost, sans-serif';
  for (const it of data.items) {
    ctx.fillStyle = INK;
    ctx.fillText(it.name, M, y);
    ctx.fillStyle = MUTED;
    ctx.textAlign = 'center';
    ctx.fillText(String(it.quantity), W / 2, y);
    ctx.fillStyle = INK;
    ctx.textAlign = 'right';
    ctx.fillText(`$${it.price * it.quantity}`, W - M, y);
    ctx.textAlign = 'left';
    y += 36;
  }

  drawLine(ctx, M, y, W - M);
  y += 32;

  // ---- Totals ----
  ctx.font = '400 14px Jost, sans-serif';
  ctx.fillStyle = MUTED;
  ctx.textAlign = 'right';
  ctx.fillText('Subtotal', W - M - 130, y);
  ctx.fillStyle = INK;
  ctx.fillText(`$${data.total}`, W - M, y);
  y += 28;
  ctx.fillStyle = MUTED;
  ctx.fillText('Shipping', W - M - 130, y);
  ctx.fillText('COMPLIMENTARY', W - M, y);
  y += 34;

  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 1.5;
  drawLine(ctx, W - M - 230, y - 16, W - M);
  ctx.fillStyle = GOLD;
  ctx.font = '700 18px Jost, sans-serif';
  ctx.fillText('TOTAL', W - M - 130, y);
  ctx.fillText(`$${data.total}`, W - M, y);
  ctx.textAlign = 'left';

  // ---- Footer ----
  const fy = H - M - 36;
  drawLine(ctx, M, fy - 26, W - M);
  ctx.fillStyle = MUTED;
  ctx.font = '400 12.5px Jost, sans-serif';
  ctx.fillText(
    'A certified handwritten wax-sealed Certificate of Authenticity will accompany your crate.',
    M,
    fy
  );
  ctx.fillStyle = GOLD;
  ctx.font = '600 13px Jost, sans-serif';
  ctx.fillText('Jarin Atelier — Where Faith Meets Art', M, fy + 22);
  ctx.fillStyle = MUTED;
  ctx.font = '400 11px Jost, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(BUSINESS.web, W - M, fy + 22);
  ctx.textAlign = 'left';
}

export async function generateInvoiceBlob(data: InvoiceData): Promise<Blob> {
  const canvas = document.createElement('canvas');
  await drawInvoice(canvas, data);
  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('Failed to render invoice'))),
      'image/png'
    );
  });
}

export async function downloadInvoice(
  data: InvoiceData,
  filename = 'jarin-atelier-invoice.png'
) {
  const blob = await generateInvoiceBlob(data);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function shareInvoiceViaWhatsApp(data: InvoiceData, message?: string) {
  const blob = await generateInvoiceBlob(data);
  const file = new File([blob], 'jarin-atelier-invoice.png', { type: 'image/png' });
  const text =
    message ||
    `Assalamu alaikum, please find my Jarin Atelier order invoice (${data.invoiceNo}). JazakAllah.`;

  const nav = navigator as unknown as {
    canShare?: (data: { files: File[] }) => boolean;
    share?: (data: { files: File[]; text: string }) => Promise<void>;
  };

  // Prefer native share with the image file (shares straight into WhatsApp on mobile)
  if (nav.canShare && nav.canShare({ files: [file] })) {
    try {
      await nav.share({ files: [file], text });
      return;
    } catch {
      // user cancelled or sharing failed — fall through to download + WhatsApp text
    }
  }

  // Fallback: download the PNG and open WhatsApp with a pre-filled message
  await downloadInvoice(data);
  const phone = '8801890770297';
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
}
