// /* ----------------------------------------------------------------------------------
//    /home/user/Guru-AI/app/application/brain/page.tsx

//    This is the main Next.js Page component for the "BRAIN" functionality. It:
//    - Renders the Chat interface (brainChat.tsx).
//    - Conditionally renders the Canvas (brainCanvas.tsx) in a pop-out or side panel style.
//    - Provides a button or link to open/close the Canvas, though you might also open it
//      via "Edit in Canvas" from chat messages.
//    - Uses Zustand store to manage app state, including whether the Canvas is open or closed.

//    NOTE: The layout for GURU-AI is in /home/user/Guru-AI/app/application/layout.tsx,
//          and the sidebar is in /home/user/Guru-AI/components/Sidebar.tsx. We do not
//          modify those here. We only focus on BRAIN.
// ----------------------------------------------------------------------------------- */
// "use client";

// import React, { useEffect } from 'react';
// import { useBrainStore } from '@/store/brainStore';
// import BrainChat from '@/components/Chat/brainChat';
// import BrainCanvas from '@/components/Canvas/brainCanvas';
// import BrainButton from '@/components/ui/brainButton';

// export default function BrainPage() {
//   const { canvasOpen, setCanvasOpen } = useBrainStore();

//   // Example function to toggle canvas
//   const handleToggleCanvas = () => {
//     setCanvasOpen(!canvasOpen);
//   };

//   // Accessibility consideration: focus management, skip links, etc.
//   // This is a minimal example; further improvements can be added later.

//   return (
//     <div className="flex flex-col h-full w-full p-4">
//       <h1 className="text-2xl font-bold mb-4">BRAIN Copilot</h1>

//       {/* A quick description or instructions for users */}
//       <p className="mb-4 text-gray-600">
//         Welcome to BRAIN Copilot. Use the chat interface below to research on the "Web" or retrieve "Work" data
//         (simulated OneDrive). Highlight and edit in Canvas for multi-user collaboration.
//       </p>

//       {/* Brain Chat Section */}
//       <div className="flex-1">
//         <BrainChat />
//       </div>

//       {/* A button to open Canvas if needed (though "Edit in Canvas" will also open it). */}
//       <div className="my-4">
//         <BrainButton onClick={handleToggleCanvas}>
//           {canvasOpen ? 'Close Canvas' : 'Open Canvas'}
//         </BrainButton>
//       </div>

//       {/* Conditionally render the Canvas (like a pop-out or side panel) */}
//       {canvasOpen && (
//         <div className="relative border p-4 mt-4 bg-white shadow-lg">
//           <BrainCanvas />
//         </div>
//       )}
//     </div>
//   );
// }



/* ----------------------------------------------------------------------------------
   /home/user/Guru-AI/app/application/brain/page.tsx

   UPDATED:
   - Changed the layout to display Chat (on the left) and Canvas (on the right) side by side.
   - Preserves the original toggling of Canvas with a button and ensures existing features still work.
----------------------------------------------------------------------------------- */
"use client";
import React from 'react';
import { useBrainStore } from '@/store/brainStore';
import BrainChat from '@/components/Chat/brainChat';
import BrainCanvas from '@/components/Canvas/brainCanvas';
import BrainButton from '@/components/ui/brainButton';

export default function BrainPage() {
  const { canvasOpen, setCanvasOpen } = useBrainStore();

  // Toggle Canvas open/close
  const handleToggleCanvas = () => {
    setCanvasOpen(!canvasOpen);
  };

  return (
    <div className="flex flex-col h-full w-full p-4">
      <h1 className="text-2xl font-bold mb-4">BRAIN Pamoja</h1>

      <p className="mb-4 text-gray-600">
      Multi-Player AI Collaboration | Ideate with AI, Collaborate with other Employees.
      </p>

      {/* Button to manually open/close the Canvas (optional usage).
         Edit in Canvas from a chat message also forces it open. */}
      {/* <div className="mb-4">
        <BrainButton onClick={handleToggleCanvas}>
          {canvasOpen ? 'Close Canvas' : 'Open Canvas'}
        </BrainButton>
      </div> */}

      {/* 
        FLEX layout to show Chat (left) and Canvas (right) side by side.
        - Chat is flex-1 so it expands
        - Canvas is conditionally rendered if canvasOpen == true
      */}
      <div className="flex flex-row h-[600px] space-x-4">
        {/* Chat Section */}
        <div className="flex-1 border rounded p-2">
          <BrainChat />
        </div>

        {/* Canvas Section (shows only if canvasOpen is true) */}
        {canvasOpen && (
          <div className="w-1/2 border rounded p-2 bg-white shadow-lg">
            <BrainCanvas />
          </div>
        )}
      </div>
    </div>
  );
}

