'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';

interface WhatsAppButtonProps {
  phone?: string;
  message?: string;
}

export function WhatsAppButton({
  phone = '919390011378',
  message = "Hi Srinivasarao, I visited your portfolio and would like to connect!"
}: WhatsAppButtonProps) {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 group flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-white font-medium px-4 py-3 rounded-full shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
    >
      <div className="relative">
        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-200"></span>
        </span>
      </div>
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-sm font-semibold">
        Chat on WhatsApp
      </span>
    </a>
  );
}
