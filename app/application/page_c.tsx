// // "use client";
// // import React from 'react'
// // import AssistantUI from '@/components/Search'
// // import { SessionProvider } from 'next-auth/react'

// // const page = () => {
// //   return (
// //          <div >
// //           <SessionProvider>
// //             <AssistantUI/> 
// //           </SessionProvider>
// //     </div>
// //   )
// // }

// // export default page

// // app/application/page.tsx
// 'use client';

// import React from 'react';
// import dynamic from 'next/dynamic';
// import { Split } from '@geoffcox/react-splitter';
// import { SessionProvider } from 'next-auth/react';
// import Chat from '@/components/Chat';

// 'use client';


// // Dynamically import Canvas to avoid SSR issues
// const Canvas = dynamic(() => import('@/components/Canvas'), { ssr: false });

// export default function ApplicationPage() {
//   return (
//     <SessionProvider>
//       <div className="h-full flex flex-col">
//         {/* Main Workspace */}
//         <div className="flex-1 overflow-hidden">
//           <Split
//             initialPrimarySize="30%"
//             minPrimarySize="20%"
//             minSecondarySize="40%"
//             className="h-full"
//           >
//             {/* Left panel - BizChat */}
//             <div className="h-full overflow-hidden">
//               <Chat />
//             </div>

//             {/* Right panel - Canvas */}
//             <div className="h-full overflow-hidden bg-gray-50">
//               <Canvas />
//             </div>
//           </Split>
//         </div>
//       </div>
//     </SessionProvider>
//   );
// }


'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Split } from '@geoffcox/react-splitter';
import { SessionProvider } from 'next-auth/react';
import Chat from '@/components/Chat';
import AssistantUI from '@/components/Search';

// Dynamically import Canvas with loading state
const Canvas = dynamic(() => import('@/components/Canvas'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent" />
    </div>
  )
});

export default function ApplicationPage() {
  return (
    <SessionProvider>
      <div className="h-full flex flex-col">
        {/* Assistant UI Integration */}
        <div className="border-b border-gray-200">
          <AssistantUI />
        </div>

        {/* Main Workspace */}
        <div className="flex-1 overflow-hidden">
          <Split
            initialPrimarySize="30%"
            minPrimarySize="20%"
            minSecondarySize="40%"
            className="h-full"
          >
            {/* Left panel - BizChat for AI research and collaboration */}
            <div className="h-full overflow-hidden">
              <Chat />
            </div>
            
            {/* Right panel - Canvas for real-time collaboration */}
            <div className="h-full overflow-hidden bg-gray-50">
              <Canvas />
            </div>
          </Split>
        </div>
      </div>
    </SessionProvider>
  );
}