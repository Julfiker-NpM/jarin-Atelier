/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Download, Send } from 'lucide-react';
import { InvoiceItem, downloadInvoice, shareInvoiceViaWhatsApp } from '../utils/invoice';

interface InvoiceActionsProps {
  items: InvoiceItem[];
  total: number;
  invoiceNo?: string;
}

function buildData(items: InvoiceItem[], total: number, invoiceNo?: string) {
  return {
    invoiceNo:
      invoiceNo ||
      `JA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
    items,
    total,
    billTo: 'Valued Customer',
  };
}

export default function InvoiceActions({ items, total, invoiceNo }: InvoiceActionsProps) {
  const [busy, setBusy] = useState(false);

  const handleDownload = async () => {
    setBusy(true);
    try {
      await downloadInvoice(buildData(items, total, invoiceNo));
    } finally {
      setBusy(false);
    }
  };

  const handleShare = async () => {
    setBusy(true);
    try {
      await shareInvoiceViaWhatsApp(buildData(items, total, invoiceNo));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm">
      <button
        id="invoice-download-btn"
        onClick={handleDownload}
        disabled={busy}
        className="inline-flex items-center justify-center space-x-2 w-full px-5 py-3 border border-brand-gold/50 text-brand-gold hover:bg-brand-gold/10 text-[11px] tracking-[0.2em] font-semibold uppercase rounded transition-all duration-300 focus:outline-none cursor-pointer disabled:opacity-50"
      >
        <Download size={15} />
        <span>Download Invoice</span>
      </button>

      <button
        id="invoice-whatsapp-btn"
        onClick={handleShare}
        disabled={busy}
        className="inline-flex items-center justify-center space-x-2 w-full px-5 py-3 bg-[#25D366] text-white hover:bg-[#1ebe5a] text-[11px] tracking-[0.2em] font-semibold uppercase rounded transition-all duration-300 focus:outline-none cursor-pointer disabled:opacity-50 shadow-md hover:shadow-lg"
      >
        <Send size={15} />
        <span>Share via WhatsApp</span>
      </button>
    </div>
  );
}
