// //   Version v0.1

// /* ----------------------------------------------------------------------------------
//    /home/user/Guru-AI/components/Canvas/brainCanvas.tsx

//    This component represents the multi-player collaborative Canvas.
//    - It displays text/content imported from the chat (via Zustand store).
//    - Allows real-time editing (mock WebSocket).
//    - Provides a "SAVE" button to call /api/save_canvas to simulate saving to OneDrive.
//    - Has a version restore/back button (placeholder).
//    - Includes an "x" button or similar to close/hide the Canvas.

//    In real-world usage, you'd integrate a robust editor or a drawing canvas. Here it's
//    just a text area or simple content for demonstration. We simulate multi-user updates
//    with the mock WebSocket in /home/user/Guru-AI/lib/brainwebsocket.ts.
// ----------------------------------------------------------------------------------- */
// "use client";

// import React, { useEffect, useState } from 'react';
// import { useBrainStore } from '@/store/brainStore';
// import BrainButton from '@/components/ui/brainButton';
// import { useToast } from '@/components/ui/brainuseToast';
// import { connectToBrainWebSocket, disconnectFromBrainWebSocket } from '@/lib/brainwebsocket';

// export default function BrainCanvas() {
//   const { canvasContent, setCanvasContent, setCanvasOpen } = useBrainStore();
//   const [tempContent, setTempContent] = useState(canvasContent);
//   const { showToast } = useToast();

//   // Connect to mock WebSocket for real-time collaboration
//   useEffect(() => {
//     connectToBrainWebSocket();

//     // Simulate receiving updates from other users
//     const interval = setInterval(() => {
//       // This is where you'd receive updates from the WebSocket
//       // We'll skip any real logic, but you can imagine merging remote changes
//     }, 5000);

//     return () => {
//       clearInterval(interval);
//       disconnectFromBrainWebSocket();
//     };
//   }, []);

//   // Handler to close/hide the Canvas
//   const handleCloseCanvas = () => {
//     setCanvasOpen(false);
//   };

//   // Handler for saving final proposal to OneDrive (mocked endpoint)
//   const handleSave = async () => {
//     try {
//       const response = await fetch('/api/save_canvas', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ canvasContent: tempContent })
//       });
//       const data = await response.json();
//       if (data.status === 'success') {
//         showToast(data.message, 'success'); // e.g. "Proposal saved successfully!"
//       } else {
//         showToast('Error saving proposal.', 'error');
//       }
//     } catch (error) {
//       console.error(error);
//       showToast('Error saving proposal.', 'error');
//     }
//   };

//   // Placeholder for version control (back button to restore previous versions).
//   const handleRestoreVersion = () => {
//     // In a real app, you'd keep a history of changes. This is a placeholder.
//     showToast('Version control placeholder', 'info');
//   };

//   // Update store content whenever the local content changes (or vice versa).
//   useEffect(() => {
//     setCanvasContent(tempContent);
//   }, [tempContent, setCanvasContent]);

//   return (
//     <div className="flex flex-col gap-2">
//       <div className="flex justify-between items-center">
//         <h2 className="font-bold text-xl">Canvas Collaboration</h2>
//         <button
//           onClick={handleCloseCanvas}
//           aria-label="Close Canvas"
//           className="text-gray-500 hover:text-gray-800"
//         >
//           X
//         </button>
//       </div>

//       <div className="border p-2 mb-2 h-64 overflow-auto bg-gray-50 rounded">
//         {/* A simple text area to represent the "Canvas" text */}
//         <textarea
//           className="w-full h-full p-2 bg-white rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={tempContent}
//           onChange={(e) => setTempContent(e.target.value)}
//         />
//       </div>

//       <div className="flex items-center gap-2">
//         <BrainButton onClick={handleSave}>SAVE</BrainButton>
//         <BrainButton onClick={handleRestoreVersion} variant="secondary">
//           Restore Previous Version
//         </BrainButton>
//       </div>

//       {/* Additional placeholders for future expansions:
//           - Tag colleagues, invite them, see real-time presence, etc. */}
//       <p className="text-sm text-gray-500 mt-2">
//         (Future feature placeholder: Multi-user presence, tagging colleagues, etc.)
//       </p>
//     </div>
//   );
// }


// "use client";

// import React, { useEffect, useState } from 'react';
// import { useBrainStore } from '@/store/brainStore';
// import BrainButton from '@/components/ui/brainButton';
// import { useToast } from '@/components/ui/brainuseToast';
// import { connectToBrainWebSocket, disconnectFromBrainWebSocket } from '@/lib/brainwebsocket';

// // Example icons (from lucide-react) or placeholders:
// import { Share2, X, ChevronLeft, ChevronRight } from 'lucide-react';

// export default function BrainCanvas() {
//   const { canvasContent, setCanvasContent, setCanvasOpen } = useBrainStore();
//   const [tempContent, setTempContent] = useState(canvasContent);
//   const { showToast } = useToast();

//   // Track versions locally (simple example)
//   const [versions, setVersions] = useState<string[]>([]);
//   const [versionIndex, setVersionIndex] = useState<number>(0);

//   // Toggle this to show user icons if "Share" is clicked
//   const [sharing, setSharing] = useState(false);

//   useEffect(() => {
//     connectToBrainWebSocket();
//     const interval = setInterval(() => {
//       // Placeholder for receiving real-time updates
//     }, 5000);

//     return () => {
//       clearInterval(interval);
//       disconnectFromBrainWebSocket();
//     };
//   }, []);

//   // Keep tempContent in sync with store content if it changes externally
//   useEffect(() => {
//     setTempContent(canvasContent);
//   }, [canvasContent]);

//   // Also update store content whenever local content changes
//   useEffect(() => {
//     setCanvasContent(tempContent);
//   }, [tempContent, setCanvasContent]);

//   // Handler to close/hide the Canvas
//   const handleCloseCanvas = () => {
//     setCanvasOpen(false);
//   };

//   // Handler for the "Share" button: simulate inviting 2 employees
//   const handleShare = () => {
//     setSharing(true);
//     // In a real app, you'd also open a share dialog or invite them
//   };

//   // Handler for saving final proposal to OneDrive (mocked endpoint)
//   const handleSave = async () => {
//     try {
//       const response = await fetch('/api/save_canvas', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ canvasContent: tempContent })
//       });
//       const data = await response.json();
//       if (data.status === 'success') {
//         showToast(data.message, 'success'); // e.g. "Proposal saved successfully!"

//         // Create a new "version" snapshot of the content
//         setVersions((prev) => [...prev, tempContent]);
//         setVersionIndex(versions.length); // Move index to the latest version
//       } else {
//         showToast('Error saving proposal.', 'error');
//       }
//     } catch (error) {
//       console.error(error);
//       showToast('Error saving proposal.', 'error');
//     }
//   };

//   // Go to previous version
//   const handlePrevVersion = () => {
//     if (versionIndex > 0) {
//       setVersionIndex(versionIndex - 1);
//       setTempContent(versions[versionIndex - 1]);
//     }
//   };

//   // Go to next version
//   const handleNextVersion = () => {
//     if (versionIndex < versions.length - 1) {
//       setVersionIndex(versionIndex + 1);
//       setTempContent(versions[versionIndex + 1]);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-2">
//       {/* Header row with "Canvas Collaboration" + user icons + share + close */}
//       <div className="flex justify-between items-center">
//         <div className="flex flex-col">
//           <h2 className="font-bold text-xl">Canvas Collaboration</h2>

//           {/* If sharing == true, show some user icons to simulate employees joining */}
//           {sharing && (
//             <div className="flex space-x-2 mt-1">
//               <img
//                 src="/african.svg"
//                 alt="User1"
//                 className="w-6 h-6 rounded-full"
//               />
//               <img
//                 src="/zuri-icon.svg"
//                 alt="User2"
//                 className="w-6 h-6 rounded-full"
//               />
//             </div>
//           )}
//         </div>

//         {/* Right side: Share button + Close button */}
//         <div className="flex items-center gap-4">
//           <button
//             onClick={handleShare}
//             aria-label="Share Canvas"
//             className="text-gray-500 hover:text-gray-800"
//           >
//             <Share2 className="h-5 w-5" />
//           </button>
//           <button
//             onClick={handleCloseCanvas}
//             aria-label="Close Canvas"
//             className="text-gray-500 hover:text-gray-800"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>
//       </div>

//       {/* Main text area (the "Canvas") */}
//       <div className="border p-2 mb-2 h-64 overflow-auto bg-gray-50 rounded">
//         <textarea
//           className="w-full h-full p-2 bg-white rounded border border-gray-300
//                      focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={tempContent}
//           onChange={(e) => setTempContent(e.target.value)}
//         />
//       </div>

//       {/* Versions navigation (replacing "Restore Previous Version" button) */}
//       <div className="flex items-center justify-between">
//         {/* Versions nav (left/ right chevrons) */}
//         <div className="flex items-center space-x-2">
//           <button onClick={handlePrevVersion} aria-label="Previous Version">
//             <ChevronLeft className="h-4 w-4" />
//           </button>
//           <span className="text-sm">
//             Version {versionIndex + 1} of {versions.length === 0 ? 1 : versions.length}
//           </span>
//           <button onClick={handleNextVersion} aria-label="Next Version">
//             <ChevronRight className="h-4 w-4" />
//           </button>
//         </div>

//         {/* Save button (unchanged logic) */}
//         <BrainButton onClick={handleSave}>SAVE</BrainButton>
//       </div>

//       {/* Future placeholders */}
//       <p className="text-sm text-gray-500 mt-2">
//         (Future feature placeholder: Multi-user presence, tagging colleagues, etc.)
//       </p>
//     </div>
//   );
// }



// /* ----------------------------------------------------------------------------------
//    /home/user/Guru-AI/components/Canvas/brainCanvas.tsx

//    FIXED: Removed the two-way "tempContent" <-> "canvasContent" useEffect loop
//    that caused infinite renders. Now the textarea is controlled solely by the
//    Zustand store’s `canvasContent`.

//    CHANGES:
//    1) We removed local state for `tempContent`.
//    2) The `<textarea>` reads/writes directly to/from the Zustand store.
//    3) When "Save" is clicked, we push `canvasContent` into a local `versions` array.
//    4) Navigating versions updates the store’s `canvasContent` accordingly.
//    5) Everything else (share button, user icons, chevrons, etc.) remains the same.
// ----------------------------------------------------------------------------------- */
// "use client";

// import React, { useEffect, useState } from 'react';
// import { useBrainStore } from '@/store/brainStore';
// import BrainButton from '@/components/ui/brainButton';
// import { useToast } from '@/components/ui/brainuseToast';
// import { connectToBrainWebSocket, disconnectFromBrainWebSocket } from '@/lib/brainwebsocket';

// // Example icons (from lucide-react) or placeholders:
// import { Share2, X, ChevronLeft, ChevronRight } from 'lucide-react';

// export default function BrainCanvas() {
//   const { canvasContent, setCanvasContent, setCanvasOpen } = useBrainStore();
//   const { showToast } = useToast();

//   // We'll store "versions" in local state. Each "SAVE" captures the current store content.
//   const [versions, setVersions] = useState<string[]>([]);
//   const [versionIndex, setVersionIndex] = useState<number>(0);

//   // Toggle this to show user icons if "Share" is clicked
//   const [sharing, setSharing] = useState(false);

//   // Connect to mock WebSocket on mount, disconnect on unmount
//   useEffect(() => {
//     connectToBrainWebSocket();
//     const interval = setInterval(() => {
//       // Placeholder for receiving real-time updates from other collaborators
//     }, 5000);

//     return () => {
//       clearInterval(interval);
//       disconnectFromBrainWebSocket();
//     };
//   }, []);

//   // Handler to close/hide the Canvas
//   const handleCloseCanvas = () => {
//     setCanvasOpen(false);
//   };

//   // Handler for the "Share" button: simulate inviting 2 employees
//   const handleShare = () => {
//     setSharing(true);
//     // In a real app, you'd also open a share dialog or invite them
//   };

//   // Handler for saving final proposal to OneDrive (mocked endpoint)
//   const handleSave = async () => {
//     try {
//       const response = await fetch('/api/save_canvas', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ canvasContent })
//       });
//       const data = await response.json();
//       if (data.status === 'success') {
//         showToast(data.message, 'success'); // e.g. "Proposal saved successfully!"

//         // Create a new "version" snapshot of the content
//         setVersions((prev) => [...prev, canvasContent]);
//         setVersionIndex(versions.length); // Move index to the latest version
//       } else {
//         showToast('Error saving proposal.', 'error');
//       }
//     } catch (error) {
//       console.error(error);
//       showToast('Error saving proposal.', 'error');
//     }
//   };

//   // Go to previous version
//   const handlePrevVersion = () => {
//     if (versionIndex > 0) {
//       const newIndex = versionIndex - 1;
//       setVersionIndex(newIndex);
//       // Replace the store's content with the older version
//       setCanvasContent(versions[newIndex]);
//     }
//   };

//   // Go to next version
//   const handleNextVersion = () => {
//     if (versionIndex < versions.length - 1) {
//       const newIndex = versionIndex + 1;
//       setVersionIndex(newIndex);
//       // Replace the store's content with the newer version
//       setCanvasContent(versions[newIndex]);
//     }
//   };

//   // Update the store content as the user types in the textarea
//   const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setCanvasContent(e.target.value);
//   };

//   return (
//     <div className="flex flex-col gap-2">
//       {/* Header row with "Canvas Collaboration" + user icons + share + close */}
//       <div className="flex justify-between items-center">
//         <div className="flex flex-col">
//           <h2 className="font-bold text-xl">Canvas Collaboration</h2>

//           {/* If sharing == true, show some user icons to simulate employees joining */}
//           {sharing && (
//             <div className="flex space-x-2 mt-1">
//               <img
//                 src="/african.svg"
//                 alt="User1"
//                 className="w-6 h-6 rounded-full"
//               />
//               <img
//                 src="/zuri-icon.svg"
//                 alt="User2"
//                 className="w-6 h-6 rounded-full"
//               />
//             </div>
//           )}
//         </div>

//         {/* Right side: Share button + Close button */}
//         <div className="flex items-center gap-4">
//           <button
//             onClick={handleShare}
//             aria-label="Share Canvas"
//             className="text-gray-500 hover:text-gray-800"
//           >
//             <Share2 className="h-5 w-5" />
//           </button>
//           <button
//             onClick={handleCloseCanvas}
//             aria-label="Close Canvas"
//             className="text-gray-500 hover:text-gray-800"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>
//       </div>

//       {/* Main text area (the "Canvas") */}
//       <div className="border p-2 mb-2 h-64 overflow-auto bg-gray-50 rounded">
//         <textarea
//           className="w-full h-full p-2 bg-white rounded border border-gray-300
//                      focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={canvasContent}
//           onChange={handleTextChange}
//         />
//       </div>

//       {/* Versions navigation (replacing "Restore Previous Version" button) */}
//       <div className="flex items-center justify-between">
//         {/* Versions nav (left/ right chevrons) */}
//         <div className="flex items-center space-x-2">
//           <button onClick={handlePrevVersion} aria-label="Previous Version">
//             <ChevronLeft className="h-4 w-4" />
//           </button>
//           <span className="text-sm">
//             Version {versionIndex + 1} of {versions.length === 0 ? 1 : versions.length}
//           </span>
//           <button onClick={handleNextVersion} aria-label="Next Version">
//             <ChevronRight className="h-4 w-4" />
//           </button>
//         </div>

//         {/* Save button */}
//         <BrainButton onClick={handleSave}>SAVE</BrainButton>
//       </div>

//       {/* Future placeholders */}
//       <p className="text-sm text-gray-500 mt-2">
//         (Future feature placeholder: Multi-user presence, tagging colleagues, etc.)
//       </p>
//     </div>
//   );
// }



// /* ----------------------------------------------------------------------------------
//    /home/user/Guru-AI/components/Canvas/brainCanvas.tsx

//    FIXES:
//    1) Ensures the textarea's `value` is always a string by using `value={canvasContent || ''}`
//       in case `canvasContent` is undefined/null.
//    2) Preserves versioning logic, share button, partial highlight from Chat, side-by-side
//       display, etc.
// ----------------------------------------------------------------------------------- */
// "use client";

// import React, { useEffect, useState } from 'react';
// import { useBrainStore } from '@/store/brainStore';
// import BrainButton from '@/components/ui/brainButton';
// import { useToast } from '@/components/ui/brainuseToast';
// import { connectToBrainWebSocket, disconnectFromBrainWebSocket } from '@/lib/brainwebsocket';

// // Example icons (from lucide-react) or placeholders:
// import { Share2, X, ChevronLeft, ChevronRight } from 'lucide-react';

// export default function BrainCanvas() {
//   const { canvasContent, setCanvasContent, setCanvasOpen } = useBrainStore();
//   const { showToast } = useToast();

//   // We'll store "versions" in local state. Each "SAVE" captures the current store content.
//   const [versions, setVersions] = useState<string[]>([]);
//   const [versionIndex, setVersionIndex] = useState<number>(0);

//   // Toggle this to show user icons if "Share" is clicked
//   const [sharing, setSharing] = useState(false);

//   // Connect to mock WebSocket on mount, disconnect on unmount
//   useEffect(() => {
//     connectToBrainWebSocket();
//     const interval = setInterval(() => {
//       // Placeholder for receiving real-time updates from other collaborators
//     }, 5000);

//     return () => {
//       clearInterval(interval);
//       disconnectFromBrainWebSocket();
//     };
//   }, []);

//   // Handler to close/hide the Canvas
//   const handleCloseCanvas = () => {
//     setCanvasOpen(false);
//   };

//   // Handler for the "Share" button: simulate inviting 2 employees
//   const handleShare = () => {
//     setSharing(true);
//     // In a real app, you'd also open a share dialog or invite them
//   };

//   // Handler for saving final proposal to OneDrive (mocked endpoint)
//   const handleSave = async () => {
//     try {
//       // Always ensure we pass a string, falling back to empty string if necessary
//       const contentToSave = canvasContent || '';

//       const response = await fetch('/api/save_canvas', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ canvasContent: contentToSave })
//       });
//       const data = await response.json();
//       if (data.status === 'success') {
//         showToast(data.message, 'success'); // e.g. "Proposal saved successfully!"

//         // Create a new "version" snapshot of the content
//         setVersions((prev) => [...prev, contentToSave]);
//         setVersionIndex(versions.length); // Move index to the latest version
//       } else {
//         showToast('Error saving proposal.', 'error');
//       }
//     } catch (error) {
//       console.error(error);
//       showToast('Error saving proposal.', 'error');
//     }
//   };

//   // Go to previous version
//   const handlePrevVersion = () => {
//     if (versionIndex > 0) {
//       const newIndex = versionIndex - 1;
//       setVersionIndex(newIndex);
//       setCanvasContent(versions[newIndex] || '');
//     }
//   };

//   // Go to next version
//   const handleNextVersion = () => {
//     if (versionIndex < versions.length - 1) {
//       const newIndex = versionIndex + 1;
//       setVersionIndex(newIndex);
//       setCanvasContent(versions[newIndex] || '');
//     }
//   };

//   // Update the store content as the user types in the textarea
//   const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setCanvasContent(e.target.value);
//   };

//   return (
//     <div className="flex flex-col gap-2">
//       {/* Header row with "Canvas Collaboration" + user icons + share + close */}
//       <div className="flex justify-between items-center">
//         <div className="flex flex-col">
//           <h2 className="font-bold text-xl">Canvas Collaboration</h2>

//           {/* If sharing == true, show some user icons to simulate employees joining */}
//           {sharing && (
//             <div className="flex space-x-2 mt-1">
//               <img
//                 src="/african.svg"
//                 alt="User1"
//                 className="w-6 h-6 rounded-full"
//               />
//               <img
//                 src="/zuri-icon.svg"
//                 alt="User2"
//                 className="w-6 h-6 rounded-full"
//               />
//             </div>
//           )}
//         </div>

//         {/* Right side: Share button + Close button */}
//         <div className="flex items-center gap-4">
//           <button
//             onClick={handleShare}
//             aria-label="Share Canvas"
//             className="text-gray-500 hover:text-gray-800"
//           >
//             <Share2 className="h-5 w-5" />
//           </button>
//           <button
//             onClick={handleCloseCanvas}
//             aria-label="Close Canvas"
//             className="text-gray-500 hover:text-gray-800"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>
//       </div>

//       {/* Main text area (the "Canvas") */}
//       <div className="border p-2 mb-2 h-64 overflow-auto bg-gray-50 rounded">
//         <textarea
//           className="w-full h-full p-2 bg-white rounded border border-gray-300
//                      focus:outline-none focus:ring-2 focus:ring-blue-500"
//           // Always ensure the value is a string
//           value={canvasContent || ''}
//           onChange={handleTextChange}
//         />
//       </div>

//       {/* Versions navigation */}
//       <div className="flex items-center justify-between">
//         {/* Versions nav (left/ right chevrons) */}
//         <div className="flex items-center space-x-2">
//           <button onClick={handlePrevVersion} aria-label="Previous Version">
//             <ChevronLeft className="h-4 w-4" />
//           </button>
//           <span className="text-sm">
//             Version {versionIndex + 1} of {versions.length === 0 ? 1 : versions.length}
//           </span>
//           <button onClick={handleNextVersion} aria-label="Next Version">
//             <ChevronRight className="h-4 w-4" />
//           </button>
//         </div>

//         {/* Save button */}
//         <BrainButton onClick={handleSave}>SAVE</BrainButton>
//       </div>

//       {/* Future placeholders */}
//       <p className="text-sm text-gray-500 mt-2">
//         (Future feature placeholder: Multi-user presence, tagging colleagues, etc.)
//       </p>
//     </div>
//   );
// }



// // WORKING v0.2

// "use client";

// import React, { useEffect, useState } from 'react';
// import { useBrainStore } from '@/store/brainStore';
// import BrainButton from '@/components/ui/brainButton';
// import { useToast } from '@/components/ui/brainuseToast';
// import { connectToBrainWebSocket, disconnectFromBrainWebSocket } from '@/lib/brainwebsocket';

// // Example icons (from lucide-react) or placeholders:
// import { Share2, X, ChevronLeft, ChevronRight } from 'lucide-react';

// export default function BrainCanvas() {
//   const { canvasContent, setCanvasContent, setCanvasOpen } = useBrainStore();
//   const { showToast } = useToast();

//   // We'll store "versions" in local state. Each "SAVE" captures the current store content.
//   const [versions, setVersions] = useState<string[]>([]);
//   const [versionIndex, setVersionIndex] = useState<number>(0);

//   // Toggle this to show user icons if "Share" is clicked
//   const [sharing, setSharing] = useState(false);

//   // Connect to mock WebSocket on mount, disconnect on unmount
//   useEffect(() => {
//     connectToBrainWebSocket();
//     const interval = setInterval(() => {
//       // Placeholder for receiving real-time updates from other collaborators
//     }, 5000);

//     return () => {
//       clearInterval(interval);
//       disconnectFromBrainWebSocket();
//     };
//   }, []);

//   // Handler to close/hide the Canvas
//   const handleCloseCanvas = () => {
//     setCanvasOpen(false);
//   };

//   // Handler for the "Share" button: simulate inviting 2 employees
//   const handleShare = () => {
//     setSharing(true);
//     // In a real app, you'd also open a share dialog or invite them
//   };

//   // Handler for saving final proposal to OneDrive (mocked endpoint)
//   const handleSave = async () => {
//     try {
//       // Ensure we pass a string, fallback to empty string if necessary
//       const contentToSave = canvasContent || '';

//       const response = await fetch('/api/save_canvas', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ canvasContent: contentToSave })
//       });
//       const data = await response.json();
//       if (data.status === 'success') {
//         showToast(data.message, 'success'); // e.g. "Proposal saved successfully!"

//         // Create a new "version" snapshot of the content
//         setVersions((prev) => [...prev, contentToSave]);
//         setVersionIndex(versions.length); // Move index to the latest version
//       } else {
//         showToast('Error saving proposal.', 'error');
//       }
//     } catch (error) {
//       console.error(error);
//       showToast('Error saving proposal.', 'error');
//     }
//   };

//   // Go to previous version
//   const handlePrevVersion = () => {
//     if (versionIndex > 0) {
//       const newIndex = versionIndex - 1;
//       setVersionIndex(newIndex);
//       setCanvasContent(versions[newIndex] || '');
//     }
//   };

//   // Go to next version
//   const handleNextVersion = () => {
//     if (versionIndex < versions.length - 1) {
//       const newIndex = versionIndex + 1;
//       setVersionIndex(newIndex);
//       setCanvasContent(versions[newIndex] || '');
//     }
//   };

//   // Update the store content as the user types in the textarea
//   const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setCanvasContent(e.target.value);
//   };

//   return (
//     <div className="flex flex-col gap-2">
//       {/* Header row with "Canvas Collaboration" + user icons + share + close */}
//       <div className="flex justify-between items-center">
//         <div className="flex flex-col">
//           <h2 className="font-bold text-xl">Canvas Collaboration</h2>

//           {/* If sharing == true, show some user icons to simulate employees joining */}
//           {sharing && (
//             <div className="flex space-x-2 mt-1">
//               <img
//                 src="/african.svg"
//                 alt="User1"
//                 className="w-6 h-6 rounded-full"
//               />
//               <img
//                 src="/zuri-icon.svg"
//                 alt="User2"
//                 className="w-6 h-6 rounded-full"
//               />
//             </div>
//           )}
//         </div>

//         {/* Right side: Share button + Close button */}
//         <div className="flex items-center gap-4">
//           <button
//             onClick={handleShare}
//             aria-label="Share Canvas"
//             className="text-gray-500 hover:text-gray-800"
//           >
//             <Share2 className="h-5 w-5" />
//           </button>
//           <button
//             onClick={handleCloseCanvas}
//             aria-label="Close Canvas"
//             className="text-gray-500 hover:text-gray-800"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>
//       </div>

//       {/* Main text area (the "Canvas") */}
//       <div className="border p-2 mb-2 h-64 overflow-auto bg-gray-50 rounded">
//         <textarea
//           className="w-full h-full p-2 bg-white rounded border border-gray-300
//                      focus:outline-none focus:ring-2 focus:ring-blue-500"
//           // Always ensure the value is a string
//           value={canvasContent || ''}
//           onChange={handleTextChange}
//         />
//       </div>

//       {/* Versions navigation */}
//       <div className="flex items-center justify-between">
//         {/* Versions nav (left/ right chevrons) */}
//         <div className="flex items-center space-x-2">
//           <button onClick={handlePrevVersion} aria-label="Previous Version">
//             <ChevronLeft className="h-4 w-4" />
//           </button>
//           <span className="text-sm">
//             Version {versionIndex + 1} of {versions.length === 0 ? 1 : versions.length}
//           </span>
//           <button onClick={handleNextVersion} aria-label="Next Version">
//             <ChevronRight className="h-4 w-4" />
//           </button>
//         </div>

//         {/* Save button */}
//         <BrainButton onClick={handleSave}>SAVE</BrainButton>
//       </div>

//       {/* Future placeholders */}
//       <p className="text-sm text-gray-500 mt-2">
//         (Future feature placeholder: Multi-user presence, tagging colleagues, etc.)
//       </p>
//     </div>
//   );
// }


// // v0.3

// "use client";

// import React, { useEffect, useState } from 'react';
// import { useBrainStore } from '@/store/brainStore';
// import BrainButton from '@/components/ui/brainButton';
// import { useToast } from '@/components/ui/brainuseToast';
// import { connectToBrainWebSocket, disconnectFromBrainWebSocket } from '@/lib/brainwebsocket';

// // Example icons from 'lucide-react' or placeholders
// import { Share2, X, ChevronLeft, ChevronRight } from 'lucide-react';

// export default function BrainCanvas() {
//   const { canvasContent, setCanvasContent, setCanvasOpen } = useBrainStore();
//   const { showToast } = useToast();

//   // We'll store "versions" in local state. Each "SAVE" captures the current store content.
//   const [versions, setVersions] = useState<string[]>([]);
//   const [versionIndex, setVersionIndex] = useState<number>(0);

//   // Toggle this to show user icons if "Share" is clicked
//   const [sharing, setSharing] = useState(false);

//   // Connect to mock WebSocket on mount, disconnect on unmount
//   useEffect(() => {
//     connectToBrainWebSocket();
//     const interval = setInterval(() => {
//       // Placeholder for receiving real-time updates from other collaborators
//     }, 5000);

//     return () => {
//       clearInterval(interval);
//       disconnectFromBrainWebSocket();
//     };
//   }, []);

//   // Handler to close/hide the Canvas
//   const handleCloseCanvas = () => {
//     setCanvasOpen(false);
//   };

//   // Handler for the "Share" button: simulate inviting 2 employees
//   const handleShare = () => {
//     setSharing(true);
//     // In a real app, you'd open a share dialog or invite them
//   };

//   // Handler for saving final proposal to OneDrive (mocked endpoint)
//   const handleSave = async () => {
//     try {
//       // Ensure we pass a string, fallback to empty string if necessary
//       const contentToSave = canvasContent || '';

//       const response = await fetch('/api/save_canvas', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ canvasContent: contentToSave })
//       });
//       const data = await response.json();
//       if (data.status === 'success') {
//         showToast(data.message, 'success'); // e.g. "Proposal saved successfully!"

//         // Create a new "version" snapshot of the content
//         setVersions((prev) => [...prev, contentToSave]);
//         setVersionIndex(versions.length); // Move index to the latest version
//       } else {
//         showToast('Error saving proposal.', 'error');
//       }
//     } catch (error) {
//       console.error(error);
//       showToast('Error saving proposal.', 'error');
//     }
//   };

//   // Go to previous version
//   const handlePrevVersion = () => {
//     if (versionIndex > 0) {
//       const newIndex = versionIndex - 1;
//       setVersionIndex(newIndex);
//       setCanvasContent(versions[newIndex] || '');
//     }
//   };

//   // Go to next version
//   const handleNextVersion = () => {
//     if (versionIndex < versions.length - 1) {
//       const newIndex = versionIndex + 1;
//       setVersionIndex(newIndex);
//       setCanvasContent(versions[newIndex] || '');
//     }
//   };

//   // Update the store content as the user types in the textarea
//   const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setCanvasContent(e.target.value);
//   };

//   return (
//     <div className="flex flex-col gap-2">
//       {/* Header row with "Canvas Collaboration" + user icons + share + close */}
//       <div className="flex justify-between items-center">
//         <div className="flex flex-col">
//           <h2 className="font-bold text-xl">Canvas Collaboration</h2>

//           {/* If sharing == true, show some user icons to simulate employees joining */}
//           {sharing && (
//             <div className="flex space-x-2 mt-1">
//               <img
//                 src="/african.svg"
//                 alt="User1"
//                 className="w-6 h-6 rounded-full"
//               />
//               <img
//                 src="/zuri-icon.svg"
//                 alt="User2"
//                 className="w-6 h-6 rounded-full"
//               />
//             </div>
//           )}
//         </div>

//         {/* Right side: Share button + Close button */}
//         <div className="flex items-center gap-4">
//           <button
//             onClick={handleShare}
//             aria-label="Share Canvas"
//             className="text-gray-500 hover:text-gray-800"
//           >
//             <Share2 className="h-5 w-5" />
//           </button>
//           <button
//             onClick={handleCloseCanvas}
//             aria-label="Close Canvas"
//             className="text-gray-500 hover:text-gray-800"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>
//       </div>

//       {/* Main text area (the "Canvas") */}
//       <div className="border p-2 mb-2 h-64 overflow-auto bg-gray-50 rounded">
//         <textarea
//           className="w-full h-full p-2 bg-white rounded border border-gray-300
//                      focus:outline-none focus:ring-2 focus:ring-blue-500"
//           // Always ensure the value is a string
//           value={canvasContent || ''}
//           onChange={handleTextChange}
//         />
//       </div>

//       {/* Versions navigation */}
//       <div className="flex items-center justify-between">
//         {/* Left/Right chevrons */}
//         <div className="flex items-center space-x-2">
//           <button onClick={handlePrevVersion} aria-label="Previous Version">
//             <ChevronLeft className="h-4 w-4" />
//           </button>
//           <span className="text-sm">
//             Version {versionIndex + 1} of {versions.length === 0 ? 1 : versions.length}
//           </span>
//           <button onClick={handleNextVersion} aria-label="Next Version">
//             <ChevronRight className="h-4 w-4" />
//           </button>
//         </div>

//         {/* Save button */}
//         <BrainButton onClick={handleSave}>SAVE</BrainButton>
//       </div>

//       {/* Future placeholders */}
//       <p className="text-sm text-gray-500 mt-2">
//         (Future feature placeholder: Multi-user presence, tagging colleagues, etc.)
//       </p>
//     </div>
//   );
// }


// WORKED BUT NEEDS UPDATE
// "use client";

// import React, { useEffect, useState } from 'react';
// import { useBrainStore } from '@/store/brainStore';
// import BrainButton from '@/components/ui/brainButton';
// import { useToast } from '@/components/ui/brainuseToast';
// import { connectToBrainWebSocket, disconnectFromBrainWebSocket } from '@/lib/brainwebsocket';

// // Example icons from 'lucide-react'
// import { Share2, X, ChevronLeft, ChevronRight } from 'lucide-react';

// export default function BrainCanvas() {
//   const { canvasContent, setCanvasContent, setCanvasOpen } = useBrainStore();
//   const { showToast } = useToast();

//   // We'll store "versions" in local state. Each "SAVE" captures the current store content.
//   const [versions, setVersions] = useState<string[]>([]);
//   const [versionIndex, setVersionIndex] = useState<number>(0);

//   // Toggle this to show user icons if "Share" is clicked
//   const [sharing, setSharing] = useState(false);

//   // Connect to mock WebSocket on mount, disconnect on unmount
//   useEffect(() => {
//     connectToBrainWebSocket();
//     const interval = setInterval(() => {
//       // Simulate receiving real-time updates from other collaborators
//     }, 5000);

//     return () => {
//       clearInterval(interval);
//       disconnectFromBrainWebSocket();
//     };
//   }, []);

//   // Handler to close/hide the Canvas
//   const handleCloseCanvas = () => {
//     setCanvasOpen(false);
//   };

//   // Handler for the "Share" button: simulate 2 employees joining
//   const handleShare = () => {
//     setSharing(true);
//   };

//   // Handler for saving final proposal (mock endpoint /api/save_canvas)
//   const handleSave = async () => {
//     try {
//       const contentToSave = canvasContent || '';
//       const response = await fetch('/api/save_canvas', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ canvasContent: contentToSave }),
//       });
//       const data = await response.json();
//       if (data.status === 'success') {
//         showToast(data.message, 'success'); // e.g. "Proposal saved successfully!"
//         // Create a new "version" snapshot
//         setVersions((prev) => [...prev, contentToSave]);
//         setVersionIndex(versions.length); // Move index to this new version
//       } else {
//         showToast('Error saving proposal.', 'error');
//       }
//     } catch (error) {
//       console.error(error);
//       showToast('Error saving proposal.', 'error');
//     }
//   };

//   // Go to previous version
//   const handlePrevVersion = () => {
//     if (versionIndex > 0) {
//       const newIndex = versionIndex - 1;
//       setVersionIndex(newIndex);
//       setCanvasContent(versions[newIndex] || '');
//     }
//   };

//   // Go to next version
//   const handleNextVersion = () => {
//     if (versionIndex < versions.length - 1) {
//       const newIndex = versionIndex + 1;
//       setVersionIndex(newIndex);
//       setCanvasContent(versions[newIndex] || '');
//     }
//   };

//   // Update store content as user types
//   const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setCanvasContent(e.target.value ?? '');
//   };

//   return (
//     <div className="flex flex-col gap-2">
//       {/* Header row: "Canvas Collaboration" + share + close */}
//       <div className="flex justify-between items-center">
//         <div className="flex flex-col">
//           <h2 className="font-bold text-xl">Canvas Collaboration</h2>
//           {/* If "sharing" is true, display 2 user icons */}
//           {sharing && (
//             <div className="flex space-x-2 mt-1">
//               <img
//                 src="/african.svg"
//                 alt="User1"
//                 className="w-6 h-6 rounded-full"
//               />
//               <img
//                 src="/zuri-icon.svg"
//                 alt="User2"
//                 className="w-6 h-6 rounded-full"
//               />
//             </div>
//           )}
//         </div>

//         <div className="flex items-center gap-4">
//           <button
//             onClick={handleShare}
//             aria-label="Share Canvas"
//             className="text-gray-500 hover:text-gray-800"
//           >
//             <Share2 className="h-5 w-5" />
//           </button>
//           <button
//             onClick={handleCloseCanvas}
//             aria-label="Close Canvas"
//             className="text-gray-500 hover:text-gray-800"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>
//       </div>

//       {/* Main textarea for the Canvas */}
//       <div className="border p-2 mb-2 h-64 overflow-auto bg-gray-50 rounded">
//         <textarea
//           className="w-full h-full p-2 bg-white rounded border border-gray-300
//                      focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={canvasContent || ''}
//           onChange={handleTextChange}
//         />
//       </div>

//       {/* Versions navigation + Save */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-2">
//           <button onClick={handlePrevVersion} aria-label="Previous Version">
//             <ChevronLeft className="h-4 w-4" />
//           </button>
//           <span className="text-sm">
//             Version {versionIndex + 1} of {versions.length === 0 ? 1 : versions.length}
//           </span>
//           <button onClick={handleNextVersion} aria-label="Next Version">
//             <ChevronRight className="h-4 w-4" />
//           </button>
//         </div>

//         <BrainButton onClick={handleSave}>SAVE</BrainButton>
//       </div>

//       <p className="text-sm text-gray-500 mt-2">
//         (Future feature placeholder: Multi-user presence, tagging colleagues, etc.)
//       </p>
//     </div>
//   );
// }



// /* ----------------------------------------------------------------------------------
//    /home/user/Guru-AI/components/Canvas/brainCanvas.tsx

//    CHANGES per your request:
//    1) Use a "save all" icon (from lucide-react) instead of the "Save" text button.
//    2) Move this new "Save" icon to the header row (on the left side of the Share button).
//    3) Replace the old "Save" BrainButton with a "CREATE" button (placeholder).
   
//    All other original functionality (partial highlight, versioning, share, etc.) is intact.
// ----------------------------------------------------------------------------------- */

// "use client";

// import React, { useEffect, useState } from 'react';
// import { useBrainStore } from '@/store/brainStore';
// import BrainButton from '@/components/ui/brainButton';
// import { useToast } from '@/components/ui/brainuseToast';
// import { connectToBrainWebSocket, disconnectFromBrainWebSocket } from '@/lib/brainwebsocket';

// // Import icons from 'lucide-react'
// import { Share2, X, ChevronLeft, ChevronRight, Save as SaveIcon } from 'lucide-react';

// export default function BrainCanvas() {
//   const { canvasContent, setCanvasContent, setCanvasOpen } = useBrainStore();
//   const { showToast } = useToast();

//   // We'll store "versions" in local state. Each "SAVE" captures the current store content.
//   const [versions, setVersions] = useState<string[]>([]);
//   const [versionIndex, setVersionIndex] = useState<number>(0);

//   // Toggle this to show user icons if "Share" is clicked
//   const [sharing, setSharing] = useState(false);

//   // Connect to mock WebSocket on mount, disconnect on unmount
//   useEffect(() => {
//     connectToBrainWebSocket();
//     const interval = setInterval(() => {
//       // Placeholder for receiving real-time updates from other collaborators
//     }, 5000);

//     return () => {
//       clearInterval(interval);
//       disconnectFromBrainWebSocket();
//     };
//   }, []);

//   // Handler to close/hide the Canvas
//   const handleCloseCanvas = () => {
//     setCanvasOpen(false);
//   };

//   // Handler for the "Share" button: simulate inviting 2 employees
//   const handleShare = () => {
//     setSharing(true);
//   };

//   // Handler for saving final proposal (mocked endpoint /api/save_canvas)
//   const handleSave = async () => {
//     try {
//       const contentToSave = canvasContent || '';
//       const response = await fetch('/api/save_canvas', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ canvasContent: contentToSave }),
//       });
//       const data = await response.json();
//       if (data.status === 'success') {
//         showToast(data.message, 'success'); // e.g. "Proposal saved successfully!"

//         // Create a new "version" snapshot of the content
//         setVersions((prev) => [...prev, contentToSave]);
//         setVersionIndex(versions.length); // Move index to the latest version
//       } else {
//         showToast('Error saving proposal.', 'error');
//       }
//     } catch (error) {
//       console.error(error);
//       showToast('Error saving proposal.', 'error');
//     }
//   };

//   // Go to previous version
//   const handlePrevVersion = () => {
//     if (versionIndex > 0) {
//       const newIndex = versionIndex - 1;
//       setVersionIndex(newIndex);
//       setCanvasContent(versions[newIndex] || '');
//     }
//   };

//   // Go to next version
//   const handleNextVersion = () => {
//     if (versionIndex < versions.length - 1) {
//       const newIndex = versionIndex + 1;
//       setVersionIndex(newIndex);
//       setCanvasContent(versions[newIndex] || '');
//     }
//   };

//   // Update store content as user types in the textarea
//   const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setCanvasContent(e.target.value ?? '');
//   };

//   return (
//     <div className="flex flex-col gap-2">
//       {/* Header row: "Canvas Collaboration" + Save icon + Share + Close */}
//       <div className="flex justify-between items-center">
//         <div className="flex flex-col">
//           <h2 className="font-bold text-xl">Canvas Collaboration</h2>
//           {/* If "sharing" is true, display 2 user icons */}
//           {sharing && (
//             <div className="flex space-x-2 mt-1">
//               <img
//                 src="/african.svg"
//                 alt="User1"
//                 className="w-6 h-6 rounded-full"
//               />
//               <img
//                 src="/zuri-icon.svg"
//                 alt="User2"
//                 className="w-6 h-6 rounded-full"
//               />
//             </div>
//           )}
//         </div>

//         {/* Right side: Save icon + Share + Close */}
//         <div className="flex items-center gap-4">
//           {/* Save icon button (moved from below) */}
//           <button
//             onClick={handleSave}
//             aria-label="Save Canvas"
//             className="text-gray-500 hover:text-gray-800"
//           >
//             <SaveIcon className="h-5 w-5" />
//           </button>

//           {/* Share button */}
//           <button
//             onClick={handleShare}
//             aria-label="Share Canvas"
//             className="text-gray-500 hover:text-gray-800"
//           >
//             <Share2 className="h-5 w-5" />
//           </button>

//           {/* Close button */}
//           <button
//             onClick={handleCloseCanvas}
//             aria-label="Close Canvas"
//             className="text-gray-500 hover:text-gray-800"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>
//       </div>

//       {/* Main textarea for the Canvas */}
//       <div className="border p-2 mb-2 h-64 overflow-auto bg-gray-50 rounded">
//         <textarea
//           className="w-full h-full p-2 bg-white rounded border border-gray-300
//                      focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={canvasContent || ''}
//           onChange={handleTextChange}
//         />
//       </div>

//       {/* Versions navigation + (NEW) "CREATE" button */}
//       <div className="flex items-center justify-between">
//         {/* Left/Right chevrons for version navigation */}
//         <div className="flex items-center space-x-2">
//           <button onClick={handlePrevVersion} aria-label="Previous Version">
//             <ChevronLeft className="h-4 w-4" />
//           </button>
//           <span className="text-sm">
//             Version {versionIndex + 1} of {versions.length === 0 ? 1 : versions.length}
//           </span>
//           <button onClick={handleNextVersion} aria-label="Next Version">
//             <ChevronRight className="h-4 w-4" />
//           </button>
//         </div>

//         {/* Instead of "SAVE", now we show a "CREATE" button (placeholder). */}
//         <BrainButton onClick={() => {
//           // Placeholder logic for "CREATE"
//           // All original functionality remains intact
//         }}>
//           CREATE
//         </BrainButton>
//       </div>

//       <p className="text-sm text-gray-500 mt-2">
//         (Future feature placeholder: Multi-user presence, tagging colleagues, etc.)
//       </p>
//     </div>
//   );
// }



"use client";

import React, { useEffect, useState } from 'react';
import { useBrainStore } from '@/store/brainStore';
import BrainButton from '@/components/ui/brainButton';
import { useToast } from '@/components/ui/brainuseToast';
import { connectToBrainWebSocket, disconnectFromBrainWebSocket } from '@/lib/brainwebsocket';

// IMPORTANT: make sure these icons actually exist in your lucide-react version
import { Save as SaveIcon, Share2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function BrainCanvas() {
  const { canvasContent, setCanvasContent, setCanvasOpen } = useBrainStore();
  const { showToast } = useToast();

  const [versions, setVersions] = useState<string[]>([]);
  const [versionIndex, setVersionIndex] = useState<number>(0);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    connectToBrainWebSocket();
    const interval = setInterval(() => {
      // Placeholder for receiving real-time updates
    }, 5000);

    return () => {
      clearInterval(interval);
      disconnectFromBrainWebSocket();
    };
  }, []);

  const handleCloseCanvas = () => {
    setCanvasOpen(false);
  };

  const handleShare = () => {
    setSharing(true);
  };

  // Our SAVE logic
  const handleSave = async () => {
    try {
      const contentToSave = canvasContent || '';
      const response = await fetch('/api/save_canvas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ canvasContent: contentToSave }),
      });
      const data = await response.json();

      if (data.status === 'success') {
        showToast(data.message, 'success');
        setVersions((prev) => [...prev, contentToSave]);
        setVersionIndex(versions.length);
      } else {
        showToast('Error saving proposal.', 'error');
      }
    } catch (error) {
      console.error(error);
      showToast('Error saving proposal.', 'error');
    }
  };

  // Versions logic
  const handlePrevVersion = () => {
    if (versionIndex > 0) {
      const newIndex = versionIndex - 1;
      setVersionIndex(newIndex);
      setCanvasContent(versions[newIndex] || '');
    }
  };

  const handleNextVersion = () => {
    if (versionIndex < versions.length - 1) {
      const newIndex = versionIndex + 1;
      setVersionIndex(newIndex);
      setCanvasContent(versions[newIndex] || '');
    }
  };

  // Update store content as user types
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCanvasContent(e.target.value ?? '');
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Header row: "Canvas Collaboration" + Save icon + Share + Close */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="font-bold text-xl">Canvas Collaboration</h2>
          {sharing && (
            <div className="flex space-x-2 mt-1">
              <img
                src="/african.svg"
                alt="User1"
                className="w-6 h-6 rounded-full"
              />
              <img
                src="/zuri-icon.svg"
                alt="User2"
                className="w-6 h-6 rounded-full"
              />
            </div>
          )}
        </div>

        {/* Right side: Save icon + Share + Close */}
        <div className="flex items-center gap-4">
          {/* Save button as an icon */}
          <button
            onClick={handleSave}
            aria-label="Save Canvas"
            className="text-gray-500 hover:text-gray-800"
          >
            <SaveIcon className="h-5 w-5" />
          </button>

          {/* Share button */}
          <button
            onClick={handleShare}
            aria-label="Share Canvas"
            className="text-gray-500 hover:text-gray-800"
          >
            <Share2 className="h-5 w-5" />
          </button>

          {/* Close button */}
          <button
            onClick={handleCloseCanvas}
            aria-label="Close Canvas"
            className="text-gray-500 hover:text-gray-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main textarea */}
      <div className="border p-2 mb-2 h-64 overflow-auto bg-gray-50 rounded">
        <textarea
          className="w-full h-full p-2 bg-white rounded border border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={canvasContent || ''}
          onChange={handleTextChange}
        />
      </div>

      {/* Versions nav + "CREATE" button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button onClick={handlePrevVersion} aria-label="Previous Version">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm">
            Version {versionIndex + 1} of {versions.length === 0 ? 1 : versions.length}
          </span>
          <button onClick={handleNextVersion} aria-label="Next Version">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* The CREATE button (placeholder) */}
        <BrainButton onClick={() => {
          // Placeholder logic for "CREATE"
        }}>
          CREATE
        </BrainButton>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        (Future feature placeholder: Multi-user presence, tagging colleagues, etc.)
      </p>
    </div>
  );
}
