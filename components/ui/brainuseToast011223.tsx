// // 'use client';

// // import { useCallback } from 'react';

// // /**
// //  * Minimal example "toast" hook. 
// //  * Replace with a real toast library like react-hot-toast for production usage.
// //  */
// // export function useToast() {
// //   const toast = useCallback(
// //     (opts: { title: string; description?: string; variant?: string }) => {
// //       window.alert(`${opts.title}\n\n${opts.description || ''}`);
// //     },
// //     []
// //   );

// //   return { toast };
// // }


// 'use client';

// import { useCallback } from 'react';

// /**
//  * Very simplistic “toast” hook that just uses alert().
//  * Replace with a real toast library in production.
//  */
// export function useToast() {
//   const toast = useCallback(
//     (opts: { title: string; description?: string; variant?: string }) => {
//       window.alert(`${opts.title}\n\n${opts.description || ''}`);
//     },
//     []
//   );

//   return { toast };
// }
'use client';

import { useCallback } from 'react';

/**
 * Simple “toast” hook that just uses alert().
 */
export function useToast() {
  const toast = useCallback(
    (opts: { title: string; description?: string; variant?: string }) => {
      alert(`${opts.title}\n\n${opts.description || ''}`);
    },
    []
  );

  return { toast };
}
