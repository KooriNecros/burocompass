"use client";

import { useEffect } from "react";

interface Props {
  message: string;
  onDismiss: () => void;
}

export default function ProfileToast({ message, onDismiss }: Props) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-2">
      <div className="bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm font-medium">
        <span>✓</span>
        <span>Profilo aggiornato: {message}</span>
        <button
          onClick={onDismiss}
          className="ml-2 text-white/70 hover:text-white text-xs"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
