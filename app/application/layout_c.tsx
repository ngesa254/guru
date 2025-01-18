
// // import Sidebar from '@/components/Sidebar';

// // export default function DashboardLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   return (
// //     <div className="h-screen flex flex-shrink-0 flex-row justify-start ">
// //       <Sidebar />
// //       <div className="flex-1 overflow-y-auto p-4">{children}</div>
// //     </div>
// //   );
// // }


// // app/application/layout.tsx
// 'use client';

// import React, { Suspense } from 'react';
// import dynamic from 'next/dynamic';
// import Sidebar from '@/components/Sidebar';
// import { Toaster } from '@/components/ui/toaster';
// import { ErrorBoundary } from 'react-error-boundary';
// import { Search } from '@/components/Search';

// // Dynamically import components that need client-side rendering
// const Header = dynamic(() => import('@/components/Header'), { ssr: false });

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Header with Search */}
//       <header className="border-b p-4 flex items-center justify-between">
//         <div className="flex items-center">
//           <h1 className="text-2xl font-semibold">EV Charging Station Analysis</h1>
//         </div>
//         <Search /> {/* Global search functionality */}
//       </header>

//       <div className="flex flex-1 h-full">
//         {/* Sidebar */}
//         <div className="w-64 border-r bg-gray-50">
//           <Sidebar />
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 overflow-hidden">
//           <ErrorBoundary fallback={<div>Error loading application</div>}>
//             {children}
//           </ErrorBoundary>
//         </div>
//       </div>
      
//       <Toaster />
//     </div>
//   );
// }


// 1222 8:11
// 'use client';

// import React, { Suspense } from 'react';
// import dynamic from 'next/dynamic';
// import Sidebar from '@/components/Sidebar';
// import { Toaster } from '@/components/ui/toaster';
// import { ErrorBoundary } from 'react-error-boundary';
// import { Search } from '@/components/Search';
// import { Analytics } from '@vercel/analytics/react';

// // Error Fallback Component
// function ErrorFallback({ error, resetErrorBoundary }: { 
//   error: Error; 
//   resetErrorBoundary: () => void;
// }) {
//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
//       <div className="max-w-md w-full space-y-4 bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-xl font-semibold text-gray-800">Something went wrong</h2>
//         <p className="text-sm text-gray-600">{error.message}</p>
//         <button
//           onClick={resetErrorBoundary}
//           className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//         >
//           Try again
//         </button>
//       </div>
//     </div>
//   );
// }

// // Dynamically import components that need client-side rendering
// const Header = dynamic(() => import('@/components/Header'), {
//   ssr: false,
//   loading: () => (
//     <div className="h-16 animate-pulse bg-gray-100 border-b" />
//   ),
// });

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="min-h-screen flex flex-col bg-white">
//       {/* Header with Search */}
//       <Suspense 
//         fallback={
//           <div className="h-16 animate-pulse bg-gray-100 border-b" />
//         }
//       >
//         <header className="border-b p-4 flex items-center justify-between bg-white">
//           <div className="flex items-center space-x-4">
//             <h1 className="text-2xl font-semibold">EV Charging Station Analysis</h1>
//           </div>
//           <div className="flex items-center space-x-4">
//             <Search />
//           </div>
//         </header>
//       </Suspense>

//       <div className="flex flex-1 h-full">
//         {/* Sidebar */}
//         <Suspense 
//           fallback={
//             <div className="w-64 animate-pulse bg-gray-100" />
//           }
//         >
//           <div className="w-64 border-r bg-gray-50 overflow-y-auto">
//             <Sidebar />
//           </div>
//         </Suspense>

//         {/* Main Content */}
//         <div className="flex-1 overflow-hidden">
//           <ErrorBoundary
//             FallbackComponent={ErrorFallback}
//             onReset={() => {
//               // Reset application state here
//               window.location.reload();
//             }}
//           >
//             <Suspense 
//               fallback={
//                 <div className="flex items-center justify-center h-full">
//                   <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent" />
//                 </div>
//               }
//             >
//               {children}
//             </Suspense>
//           </ErrorBoundary>
//         </div>
//       </div>
      
//       {/* Toast Notifications */}
//       <Toaster />
//       <Analytics />
//     </div>
//   );
// }



'use client';

import React, { Suspense } from 'react';
import Sidebar from '@/components/Sidebar';
import { Toaster } from '@/components/ui/toaster';
import { ErrorBoundary } from 'react-error-boundary';
import Search from '@/components/Search'; // Changed to default import
import { Analytics } from '@vercel/analytics/react';


// Error Fallback Component
function ErrorFallback({ error, resetErrorBoundary }: { 
  error: Error; 
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full space-y-4 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800">Something went wrong</h2>
        <p className="text-sm text-gray-600">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header with Search */}
      <Suspense 
        fallback={
          <div className="h-16 animate-pulse bg-gray-100 border-b" />
        }
      >
        <header className="border-b p-4 flex items-center justify-between bg-white">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold">EV Charging Station Analysis</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Search />
          </div>
        </header>
      </Suspense>

      <div className="flex flex-1 h-full">
        {/* Sidebar */}
        <Suspense 
          fallback={
            <div className="w-64 animate-pulse bg-gray-100" />
          }
        >
          <div className="w-64 border-r bg-gray-50 overflow-y-auto">
            <Sidebar />
          </div>
        </Suspense>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
              // Reset application state here
              window.location.reload();
            }}
          >
            <Suspense 
              fallback={
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent" />
                </div>
              }
            >
              {children}
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
      
      {/* Toast Notifications */}
      <Toaster />
      <Analytics />
    </div>
  );
}