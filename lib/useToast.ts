// /home/user/Guru-AI/lib/useToast.ts
'use client';

import { useCallback } from 'react';

export function useToast() {
  const toast = useCallback(
    (opts: { title: string; description?: string; variant?: string }) => {
      // Quick hack: show an alert
      // In real usage, integrate e.g. react-hot-toast or your custom toast
      alert(`${opts.title}\n\n${opts.description || ''}`);
    },
    []
  );

  return { toast };
}
