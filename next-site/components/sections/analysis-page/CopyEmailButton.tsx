'use client';

import { useState } from 'react';
import { Mail, Copy, Check } from 'lucide-react';

export default function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('frenchifyfee@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex items-center gap-3 bg-white border border-blue-200 rounded-xl px-4 py-3">
      <Mail className="text-blue-600 w-5 h-5" />
      <span className="font-mono font-semibold text-blue-700">frenchifyfee@gmail.com</span>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy email"
        className="ml-auto text-gray-400 hover:text-blue-600 transition-colors"
      >
        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}
