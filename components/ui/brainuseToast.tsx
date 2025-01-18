/* ----------------------------------------------------------------------------------
   /home/user/Guru-AI/components/ui/brainuseToast.tsx

   A small utility for showing toast notifications (like "Proposal saved!").
   Currently, it's a minimal placeholder that you could integrate with a real
   toast library (e.g., react-hot-toast) or a custom notification system.
----------------------------------------------------------------------------------- */
"use client";

import React from 'react';

type ToastType = 'success' | 'error' | 'info';

interface UseToastResult {
  showToast: (message: string, type?: ToastType) => void;
}

export function useToast(): UseToastResult {
  const showToast = (message: string, type: ToastType = 'info') => {
    // For now, just use browser alert as a placeholder.
    // In a real app, you might use a toast UI library or custom component.
    alert(`[${type.toUpperCase()}] ${message}`);
  };

  return { showToast };
}
