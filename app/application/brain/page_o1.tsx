// // // /home/user/Guru-AI/app/application/brain/page.tsx
// // 'use client';

// // import React, { useEffect, useState, useCallback } from 'react';
// // import dynamic from 'next/dynamic';
// // import { useToast } from '@/components/ui/brainuseToast';
// // import { wsService } from '@/lib/brainwebsocket';
// // import { Button } from '@/components/ui/brainbutton';
// // // Adjust depending on whether your store folder is named 'store' or 'stores':
// // import { useBrainStore } from '@/store/brainStore';

// // // We'll dynamically import the Split component if it's not SSR-compatible
// // const Split = dynamic(
// //   () => import('@geoffcox/react-splitter').then(mod => mod.Split),
// //   { ssr: false }
// // );

// // // Dynamically import the Canvas and Chat
// // const BrainCanvas = dynamic(
// //   () => import('@/components/Canvas/brainCanvas').then(mod => mod.default),
// //   { ssr: false }
// // );

// // const BrainChat = dynamic(
// //   () => import('@/components/Chat/brainChat').then(mod => mod.default),
// //   { ssr: false }
// // );

// // /**
// //  * The main BRAIN UI:
// //  *  - A top bar for toggling "web" vs. "work"
// //  *  - A left Chat panel for searching / chatting
// //  *  - A right Canvas panel for dynamic AI-driven collaboration
// //  *  - Real-time collaboration placeholders (WebSocket)
// //  *  - AI proposal creation
// //  *  - Version control
// //  */
// // export default function BrainPage() {
// //   const store = useBrainStore();
// //   const { toast } = useToast();

// //   // Track which tab is active for searching
// //   const [activeTab, setActiveTab] = useState<'web' | 'work'>('web');

// //   // ----- WebSocket for Real-Time Collaboration -----
// //   useEffect(() => {
// //     const ws = wsService.connect();
// //     ws.onmessage = (event: MessageEvent) => {
// //       const data = JSON.parse(event.data);
// //       switch (data.type) {
// //         case 'ELEMENT_ADD':
// //           store.addCanvasElement(data.element);
// //           break;
// //         case 'ELEMENT_UPDATE':
// //           store.updateCanvasElement(data.elementId, data.updates);
// //           break;
// //         case 'CURSOR_UPDATE':
// //           store.updateCursorPosition(data.userId, data.position);
// //           break;
// //         case 'COLLABORATOR_UPDATE':
// //           store.addCollaborator(data.collaborator);
// //           break;
// //         case 'COLLABORATOR_LEAVE':
// //           store.removeCollaborator(data.userId);
// //           break;
// //         default:
// //           break;
// //       }
// //     };

// //     ws.onerror = () => {
// //       toast({
// //         title: 'Connection Error',
// //         description: 'Lost connection to collaboration server',
// //         variant: 'destructive',
// //       });
// //     };

// //     return () => {
// //       wsService.disconnect();
// //     };
// //   }, [store, toast]);

// //   // ----- Tab Switching (Web / Work) -----
// //   const handleTabSwitch = (tab: 'web' | 'work') => {
// //     setActiveTab(tab);
// //   };

// //   // ----- “Search or Chat” Logic -----
// //   // If user is on "web", call /api/web. If on "work", call /api/work.
// //   const handleQuery = useCallback(
// //     async (query: string) => {
// //       store.setLoading(true);
// //       try {
// //         const endpoint = activeTab === 'web' ? '/api/web' : '/api/work';
// //         const res = await fetch(endpoint, {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify({ query }),
// //         });
// //         if (!res.ok) throw new Error(`${activeTab.toUpperCase()} search failed`);
// //         const data = await res.json();

// //         // Add an AI message with the returned data
// //         store.addMessage({
// //           id: crypto.randomUUID(),
// //           content: JSON.stringify(data, null, 2),
// //           type: 'ai',
// //           timestamp: new Date(),
// //         });

// //         // Visualize data on the canvas
// //         if (data.daily_passengers || data.ev_parking_spaces) {
// //           // Add a chart
// //           store.addCanvasElement({
// //             id: crypto.randomUUID(),
// //             type: 'chart',
// //             content: {
// //               data: [
// //                 { name: 'Daily Passengers', value: data.daily_passengers },
// //                 { name: 'EV Spaces', value: data.ev_parking_spaces },
// //               ],
// //               type: 'bar',
// //             },
// //             position: { x: 80, y: 100 },
// //             size: { width: 400, height: 250 },
// //             metadata: {
// //               source: data.sources?.[0]?.url,
// //               confidence: data.confidence,
// //               timestamp: new Date().toISOString(),
// //             },
// //           });
// //         }

// //         if (data.competitors?.length > 0) {
// //           // Add competitor table
// //           store.addCanvasElement({
// //             id: crypto.randomUUID(),
// //             type: 'table',
// //             content: {
// //               headers: ['Company', 'Stations', 'Locations'],
// //               data: data.competitors.map((c: any) => [
// //                 c.name,
// //                 c.stations,
// //                 c.locations.join(', '),
// //               ]),
// //             },
// //             position: { x: 80, y: 380 },
// //             size: { width: 600, height: 200 },
// //           });
// //         }

// //         if (data.projectMilestones) {
// //           // Add a milestone table if from "work"
// //           store.addCanvasElement({
// //             id: crypto.randomUUID(),
// //             type: 'table',
// //             content: {
// //               headers: ['Milestone', 'Workback Schedule', 'Owner'],
// //               data: data.projectMilestones.map((m: any) => [
// //                 m.milestone,
// //                 m.workbackSchedule,
// //                 m.owner,
// //               ]),
// //             },
// //             position: { x: 80, y: 600 },
// //             size: { width: 500, height: 200 },
// //             metadata: {
// //               source: 'Internal Work Data',
// //               timestamp: new Date().toISOString(),
// //             },
// //           });
// //         }

// //         if (data.requirements?.length > 0) {
// //           // Add a text element with requirements
// //           store.addCanvasElement({
// //             id: crypto.randomUUID(),
// //             type: 'text',
// //             content: {
// //               title: 'Requirements',
// //               items: data.requirements,
// //             },
// //             position: { x: 600, y: 100 },
// //             size: { width: 300, height: 180 },
// //           });
// //         }

// //       } catch (err: any) {
// //         store.setError(err.message || 'Search failed');
// //       } finally {
// //         store.setLoading(false);
// //       }
// //     },
// //     [activeTab, store]
// //   );

// //   // ----- Proposal Creation -----
// //   const handleProposalRequest = useCallback(
// //     async (requirements: string[]) => {
// //       store.setLoading(true);
// //       try {
// //         const res = await fetch('/api/generate_proposal', {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify({ requirements }),
// //         });
// //         if (!res.ok) throw new Error('Proposal generation failed');
// //         const data = await res.json();

// //         // Add a “proposal” element
// //         store.addCanvasElement({
// //           id: crypto.randomUUID(),
// //           type: 'proposal',
// //           content: {
// //             text: data.generated_proposal,
// //           },
// //           position: { x: 250, y: 850 },
// //           size: { width: 600, height: 250 },
// //           metadata: {
// //             author: data.metadata.author,
// //             version: data.metadata.version,
// //             timestamp: new Date().toISOString(),
// //           },
// //         });

// //         // Also add a chat message
// //         store.addMessage({
// //           id: crypto.randomUUID(),
// //           content: `Proposal generated:\n${data.generated_proposal}`,
// //           type: 'ai',
// //           timestamp: new Date(),
// //         });

// //         store.setProposalData(data);
// //       } catch (err: any) {
// //         store.setError(err.message || 'Proposal generation failed');
// //       } finally {
// //         store.setLoading(false);
// //       }
// //     },
// //     [store]
// //   );

// //   // ----- Versioning (Save / Switch) -----
// //   const handleVersionCreate = useCallback(() => {
// //     store.createVersion('current-user', 'Manual save');
// //     toast({
// //       title: 'Version Created',
// //       description: 'Canvas state has been saved.',
// //     });
// //   }, [store, toast]);

// //   const handleVersionSwitch = useCallback(
// //     (versionId: string) => {
// //       store.switchVersion(versionId);
// //       toast({
// //         title: 'Version Switched',
// //         description: 'Canvas state restored.',
// //       });
// //     },
// //     [store, toast]
// //   );

// //   // ----- Collaboration Cursor -----
// //   const handleCursorUpdate = useCallback((pos: { x: number; y: number }) => {
// //     wsService.sendMessage('CURSOR_UPDATE', { position: pos });
// //   }, []);

// //   return (
// //     <div className="h-full flex flex-col">
// //       {/* Top Bar: tab switching and version saving */}
// //       <div className="border-b border-gray-200 p-4 flex items-center justify-between">
// //         <div className="flex gap-2">
// //           <Button
// //             variant={activeTab === 'web' ? 'default' : 'outline'}
// //             onClick={() => handleTabSwitch('web')}
// //           >
// //             WEB
// //           </Button>
// //           <Button
// //             variant={activeTab === 'work' ? 'default' : 'outline'}
// //             onClick={() => handleTabSwitch('work')}
// //           >
// //             WORK
// //           </Button>
// //         </div>
// //         <Button onClick={handleVersionCreate}>Save Version</Button>
// //       </div>

// //       {/* Main layout: Chat on left, Canvas on right */}
// //       <div className="flex-1 overflow-hidden">
// //         <Split
// //           initialPrimarySize="30%"
// //           minPrimarySize="20%"
// //           minSecondarySize="40%"
// //           className="h-full"
// //         >
// //           {/* Chat Panel */}
// //           <div className="h-full overflow-hidden border-r border-gray-200">
// //             <BrainChat
// //               messages={store.messages}
// //               onSendMessage={handleQuery}
// //               isLoading={store.isLoading}
// //               collaborators={store.collaborators}
// //               onProposalRequest={handleProposalRequest}
// //             />
// //           </div>

// //           {/* Canvas Panel */}
// //           <div className="h-full overflow-hidden bg-gray-50">
// //             <BrainCanvas
// //               elements={store.canvasElements}
// //               onElementAdd={(el) => {
// //                 store.addCanvasElement(el);
// //                 store.updateSearchIndex(el);
// //               }}
// //               onElementUpdate={(id, updates) => {
// //                 store.updateCanvasElement(id, updates);
// //                 const updatedEl = store.canvasElements.find(e => e.id === id);
// //                 if (updatedEl) {
// //                   store.updateSearchIndex(updatedEl);
// //                 }
// //               }}
// //               onElementRemove={store.removeCanvasElement}
// //               scale={store.scale}
// //               viewMode={store.viewMode}
// //               gridVisible={store.gridVisible}
// //               snapToGrid={store.snapToGrid}
// //               onCursorUpdate={handleCursorUpdate}
// //               collaborators={store.collaborators}
// //               cursorPositions={store.cursors}
// //               onVersionSwitch={handleVersionSwitch}
// //               versions={store.versions}
// //               currentVersion={store.currentVersion}
// //             />
// //           </div>
// //         </Split>
// //       </div>

// //       {/* Error display */}
// //       {store.error && (
// //         <div
// //           role="alert"
// //           aria-live="assertive"
// //           className="absolute bottom-4 right-4 bg-red-50 p-4 rounded-lg shadow-lg"
// //         >
// //           <h3 className="text-red-800 font-medium">Error</h3>
// //           <p className="text-red-600">{store.error}</p>
// //           <button
// //             onClick={() => store.setError(null)}
// //             className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
// //             aria-label="Dismiss error"
// //           >
// //             Dismiss
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }



// 'use client';

// import React, { useEffect, useState, useCallback } from 'react';
// import dynamic from 'next/dynamic';
// import { useBrainStore } from '@/store/brainStore';
// import { wsService } from '@/lib/brainwebsocket';
// import { Button } from '@/components/ui/brainbutton';
// import { useToast } from '@/components/ui/brainuseToast';

// // We'll dynamically import the Split (if using react-splitter)
// const Split = dynamic(
//   () => import('@geoffcox/react-splitter').then(mod => mod.Split),
//   { ssr: false }
// );

// // Dynamic imports for Canvas and Chat
// const BrainCanvas = dynamic(
//   () => import('@/components/Canvas/brainCanvas').then(mod => mod.default),
//   { ssr: false }
// );
// const BrainChat = dynamic(
//   () => import('@/components/Chat/brainChat').then(mod => mod.default),
//   { ssr: false }
// );

// /**
//  * The "BRAIN" page is a standalone section of the Work AI Assistant:
//  *  - Toggling between "Web" and "Work" for queries
//  *  - Real-time collaboration (WebSocket mock)
//  *  - Canvas for dynamic AI-driven editing
//  *  - Generating proposals with a mock /api/generate_proposal
//  */
// export default function BrainPage() {
//   const store = useBrainStore();
//   const { toast } = useToast();
//   const [activeTab, setActiveTab] = useState<'web' | 'work'>('web');

//   // Connect to mock WebSocket for collaboration
//   useEffect(() => {
//     const ws = wsService.connect();

//     ws.onmessage = (event: MessageEvent) => {
//       const data = JSON.parse(event.data);
//       switch (data.type) {
//         case 'ELEMENT_ADD':
//           store.addCanvasElement(data.element);
//           break;
//         case 'ELEMENT_UPDATE':
//           store.updateCanvasElement(data.elementId, data.updates);
//           break;
//         case 'CURSOR_UPDATE':
//           store.updateCursorPosition(data.userId, data.position);
//           break;
//         case 'COLLABORATOR_UPDATE':
//           store.addCollaborator(data.collaborator);
//           break;
//         case 'COLLABORATOR_LEAVE':
//           store.removeCollaborator(data.userId);
//           break;
//         default:
//           break;
//       }
//     };

//     ws.onerror = () => {
//       toast({
//         title: 'Connection Error',
//         description: 'Lost connection to the collaboration server',
//         variant: 'destructive',
//       });
//     };

//     return () => {
//       wsService.disconnect();
//     };
//   }, [store, toast]);

//   // Tab switch between "web" or "work"
//   const handleTabSwitch = (tab: 'web' | 'work') => {
//     setActiveTab(tab);
//   };

//   // Chat query: calls either /api/web or /api/work
//   const handleQuery = useCallback(
//     async (query: string) => {
//       store.setLoading(true);
//       try {
//         const endpoint = activeTab === 'web' ? '/api/web' : '/api/work';
//         const res = await fetch(endpoint, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ query }),
//         });
//         if (!res.ok) throw new Error(`${activeTab.toUpperCase()} query failed`);
//         const data = await res.json();

//         // Insert an AI chat message
//         store.addMessage({
//           id: crypto.randomUUID(),
//           content: JSON.stringify(data, null, 2),
//           type: 'ai',
//           timestamp: new Date(),
//         });

//         // Visualize data on the canvas
//         if (data.daily_passengers || data.ev_parking_spaces) {
//           store.addCanvasElement({
//             id: crypto.randomUUID(),
//             type: 'chart',
//             content: {
//               data: [
//                 { name: 'Daily Passengers', value: data.daily_passengers },
//                 { name: 'EV Spaces', value: data.ev_parking_spaces },
//               ],
//               type: 'bar',
//             },
//             position: { x: 80, y: 100 },
//             size: { width: 400, height: 250 },
//             metadata: {
//               source: data.sources?.[0]?.url,
//               confidence: data.confidence,
//               timestamp: new Date().toISOString(),
//             },
//           });
//         }

//         if (data.competitors?.length > 0) {
//           store.addCanvasElement({
//             id: crypto.randomUUID(),
//             type: 'table',
//             content: {
//               headers: ['Company', 'Stations', 'Locations'],
//               data: data.competitors.map((comp: any) => [
//                 comp.name,
//                 comp.stations,
//                 comp.locations.join(', '),
//               ]),
//             },
//             position: { x: 80, y: 380 },
//             size: { width: 600, height: 200 },
//           });
//         }

//         if (data.projectMilestones) {
//           store.addCanvasElement({
//             id: crypto.randomUUID(),
//             type: 'table',
//             content: {
//               headers: ['Milestone', 'Workback Schedule', 'Owner'],
//               data: data.projectMilestones.map((m: any) => [
//                 m.milestone,
//                 m.workbackSchedule,
//                 m.owner,
//               ]),
//             },
//             position: { x: 80, y: 600 },
//             size: { width: 500, height: 200 },
//             metadata: {
//               source: 'Internal Work Data',
//               timestamp: new Date().toISOString(),
//             },
//           });
//         }

//         if (data.requirements?.length > 0) {
//           store.addCanvasElement({
//             id: crypto.randomUUID(),
//             type: 'text',
//             content: {
//               title: 'Requirements',
//               items: data.requirements,
//             },
//             position: { x: 700, y: 100 },
//             size: { width: 300, height: 180 },
//           });
//         }
//       } catch (err: any) {
//         store.setError(err.message || 'Query failed');
//       } finally {
//         store.setLoading(false);
//       }
//     },
//     [activeTab, store]
//   );

//   // Generate proposal
//   const handleProposalRequest = useCallback(
//     async (requirements: string[]) => {
//       store.setLoading(true);
//       try {
//         const response = await fetch('/api/generate_proposal', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ requirements }),
//         });
//         if (!response.ok) throw new Error('Proposal generation failed');
//         const data = await response.json();

//         // Add a "proposal" element
//         store.addCanvasElement({
//           id: crypto.randomUUID(),
//           type: 'proposal',
//           content: {
//             text: data.generated_proposal,
//           },
//           position: { x: 200, y: 850 },
//           size: { width: 600, height: 250 },
//           metadata: {
//             author: data.metadata.author,
//             version: data.metadata.version,
//             timestamp: new Date().toISOString(),
//           },
//         });

//         // Also store it in proposalData
//         store.setProposalData(data);

//         // And show in chat
//         store.addMessage({
//           id: crypto.randomUUID(),
//           content: `Proposal generated:\n${data.generated_proposal}`,
//           type: 'ai',
//           timestamp: new Date(),
//         });
//       } catch (err: any) {
//         store.setError(err.message || 'Proposal generation error');
//       } finally {
//         store.setLoading(false);
//       }
//     },
//     [store]
//   );

//   // Version control
//   const handleVersionCreate = useCallback(() => {
//     store.createVersion('current-user', 'Manual Save');
//     toast({
//       title: 'Version Created',
//       description: 'Canvas state has been saved.',
//     });
//   }, [store, toast]);

//   const handleVersionSwitch = useCallback(
//     (versionId: string) => {
//       store.switchVersion(versionId);
//       toast({
//         title: 'Version Switched',
//         description: 'Canvas state has been restored.',
//       });
//     },
//     [store, toast]
//   );

//   // Handle collaborator cursor
//   const handleCursorUpdate = useCallback((pos: { x: number; y: number }) => {
//     wsService.sendMessage('CURSOR_UPDATE', { position: pos });
//   }, []);

//   return (
//     <div className="h-full flex flex-col">
//       {/* Top bar for toggling tabs and saving versions */}
//       <div className="border-b border-gray-200 p-4 flex items-center justify-between">
//         <div className="flex gap-2">
//           <Button
//             variant={activeTab === 'web' ? 'default' : 'outline'}
//             onClick={() => handleTabSwitch('web')}
//           >
//             WEB
//           </Button>
//           <Button
//             variant={activeTab === 'work' ? 'default' : 'outline'}
//             onClick={() => handleTabSwitch('work')}
//           >
//             WORK
//           </Button>
//         </div>
//         <Button onClick={handleVersionCreate}>Save Version</Button>
//       </div>

//       {/* Main content: Chat on left, Canvas on right */}
//       <div className="flex-1 overflow-hidden">
//         <Split
//           initialPrimarySize="30%"
//           minPrimarySize="20%"
//           minSecondarySize="40%"
//           className="h-full"
//         >
//           {/* Chat Panel */}
//           <div className="h-full overflow-hidden border-r border-gray-200">
//             <BrainChat
//               messages={store.messages}
//               onSendMessage={handleQuery}
//               isLoading={store.isLoading}
//               collaborators={store.collaborators}
//               onProposalRequest={handleProposalRequest}
//             />
//           </div>

//           {/* Canvas Panel */}
//           <div className="h-full overflow-hidden bg-gray-50 relative">
//             <BrainCanvas
//               elements={store.canvasElements}
//               onElementAdd={(el) => {
//                 store.addCanvasElement(el);
//                 store.updateSearchIndex(el);
//               }}
//               onElementUpdate={(id, updates) => {
//                 store.updateCanvasElement(id, updates);
//                 const updatedEl = store.canvasElements.find(e => e.id === id);
//                 if (updatedEl) {
//                   store.updateSearchIndex(updatedEl);
//                 }
//               }}
//               onElementRemove={store.removeCanvasElement}
//               scale={store.scale}
//               viewMode={store.viewMode}
//               gridVisible={store.gridVisible}
//               snapToGrid={store.snapToGrid}
//               onCursorUpdate={handleCursorUpdate}
//               collaborators={store.collaborators}
//               cursorPositions={store.cursors}
//               onVersionSwitch={handleVersionSwitch}
//               versions={store.versions}
//               currentVersion={store.currentVersion}
//             />
//           </div>
//         </Split>
//       </div>

//       {/* Error display */}
//       {store.error && (
//         <div
//           role="alert"
//           aria-live="assertive"
//           className="absolute bottom-4 right-4 bg-red-50 p-4 rounded-lg shadow-lg"
//         >
//           <h3 className="text-red-800 font-medium">Error</h3>
//           <p className="text-red-600">{store.error}</p>
//           <button
//             onClick={() => store.setError(null)}
//             className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
//             aria-label="Dismiss error"
//           >
//             Dismiss
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }



'use client';

import React, { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useBrainStore } from '@/store/brainStore';
import { wsService } from '@/lib/brainwebsocket';
import { Button } from '@/components/ui/brainButton';
import { useToast } from '@/components/ui/brainuseToast';

// We'll dynamically import react-splitter if needed
const Split = dynamic(
  () => import('@geoffcox/react-splitter').then(mod => mod.Split),
  { ssr: false }
);

// Dynamically import the Canvas and Chat
const BrainCanvas = dynamic(
  () => import('@/components/Canvas/brainCanvas').then(mod => mod.default),
  { ssr: false }
);
const BrainChat = dynamic(
  () => import('@/components/Chat/brainChat').then(mod => mod.default),
  { ssr: false }
);

/**
 * The "BRAIN" page with no references to useSession or a separate Search component.
 * We rely solely on the Chat interface to handle queries to “web” or “work.”
 */
export default function BrainPage() {
  const store = useBrainStore();
  const { toast } = useToast();

  // Track active tab for queries
  const [activeTab, setActiveTab] = useState<'web' | 'work'>('web');

  // Connect to mock WebSocket
  useEffect(() => {
    const ws = wsService.connect();

    ws.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case 'ELEMENT_ADD':
          store.addCanvasElement(data.element);
          break;
        case 'ELEMENT_UPDATE':
          store.updateCanvasElement(data.elementId, data.updates);
          break;
        case 'CURSOR_UPDATE':
          store.updateCursorPosition(data.userId, data.position);
          break;
        case 'COLLABORATOR_UPDATE':
          store.addCollaborator(data.collaborator);
          break;
        case 'COLLABORATOR_LEAVE':
          store.removeCollaborator(data.userId);
          break;
        default:
          break;
      }
    };

    ws.onerror = () => {
      toast({
        title: 'Connection Error',
        description: 'Lost connection to the collaboration server',
        variant: 'destructive',
      });
    };

    return () => {
      wsService.disconnect();
    };
  }, [store, toast]);

  // Switch tabs
  const handleTabSwitch = (tab: 'web' | 'work') => {
    setActiveTab(tab);
  };

  // Chat query => call either /api/web or /api/work
  const handleQuery = useCallback(
    async (query: string) => {
      store.setLoading(true);
      try {
        const endpoint = activeTab === 'web' ? '/api/web' : '/api/work';
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query }),
        });
        if (!res.ok) throw new Error(`${activeTab.toUpperCase()} query failed`);
        const data = await res.json();

        // Add an AI chat message
        store.addMessage({
          id: crypto.randomUUID(),
          content: JSON.stringify(data, null, 2),
          type: 'ai',
          timestamp: new Date(),
        });

        // Visualize data on the canvas
        if (data.daily_passengers || data.ev_parking_spaces) {
          store.addCanvasElement({
            id: crypto.randomUUID(),
            type: 'chart',
            content: {
              data: [
                { name: 'Daily Passengers', value: data.daily_passengers },
                { name: 'EV Spaces', value: data.ev_parking_spaces },
              ],
              type: 'bar',
            },
            position: { x: 80, y: 100 },
            size: { width: 400, height: 250 },
            metadata: {
              source: data.sources?.[0]?.url,
              confidence: data.confidence,
              timestamp: new Date().toISOString(),
            },
          });
        }

        if (data.competitors?.length > 0) {
          store.addCanvasElement({
            id: crypto.randomUUID(),
            type: 'table',
            content: {
              headers: ['Company', 'Stations', 'Locations'],
              data: data.competitors.map((comp: any) => [
                comp.name,
                comp.stations,
                comp.locations.join(', '),
              ]),
            },
            position: { x: 80, y: 380 },
            size: { width: 600, height: 200 },
          });
        }

        if (data.projectMilestones) {
          store.addCanvasElement({
            id: crypto.randomUUID(),
            type: 'table',
            content: {
              headers: ['Milestone', 'Workback Schedule', 'Owner'],
              data: data.projectMilestones.map((m: any) => [
                m.milestone,
                m.workbackSchedule,
                m.owner,
              ]),
            },
            position: { x: 80, y: 600 },
            size: { width: 500, height: 200 },
            metadata: {
              source: 'Internal Work Data',
              timestamp: new Date().toISOString(),
            },
          });
        }

        if (data.requirements?.length > 0) {
          store.addCanvasElement({
            id: crypto.randomUUID(),
            type: 'text',
            content: {
              title: 'Requirements',
              items: data.requirements,
            },
            position: { x: 700, y: 100 },
            size: { width: 300, height: 180 },
          });
        }
      } catch (err: any) {
        store.setError(err.message || 'Query failed');
      } finally {
        store.setLoading(false);
      }
    },
    [activeTab, store]
  );

  // Generate proposal
  const handleProposalRequest = useCallback(
    async (requirements: string[]) => {
      store.setLoading(true);
      try {
        const response = await fetch('/api/generate_proposal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ requirements }),
        });
        if (!response.ok) throw new Error('Proposal generation failed');
        const data = await response.json();

        store.addCanvasElement({
          id: crypto.randomUUID(),
          type: 'proposal',
          content: {
            text: data.generated_proposal,
          },
          position: { x: 200, y: 850 },
          size: { width: 600, height: 250 },
          metadata: {
            author: data.metadata.author,
            version: data.metadata.version,
            timestamp: new Date().toISOString(),
          },
        });

        // Also show in chat
        store.addMessage({
          id: crypto.randomUUID(),
          content: `Proposal generated:\n${data.generated_proposal}`,
          type: 'ai',
          timestamp: new Date(),
        });

        store.setProposalData(data);
      } catch (err: any) {
        store.setError(err.message || 'Proposal generation error');
      } finally {
        store.setLoading(false);
      }
    },
    [store]
  );

  // Versioning
  const handleVersionCreate = useCallback(() => {
    store.createVersion('current-user', 'Manual Save');
    toast({
      title: 'Version Created',
      description: 'Canvas state has been saved.',
    });
  }, [store, toast]);

  const handleVersionSwitch = useCallback(
    (versionId: string) => {
      store.switchVersion(versionId);
      toast({
        title: 'Version Switched',
        description: 'Canvas state has been restored.',
      });
    },
    [store, toast]
  );

  // Cursor
  const handleCursorUpdate = useCallback((pos: { x: number; y: number }) => {
    wsService.sendMessage('CURSOR_UPDATE', { position: pos });
  }, []);

  return (
    <div className="h-full flex flex-col">
      {/* Top bar: tab switching + version save */}
      <div className="border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'web' ? 'default' : 'outline'}
            onClick={() => handleTabSwitch('web')}
          >
            WEB
          </Button>
          <Button
            variant={activeTab === 'work' ? 'default' : 'outline'}
            onClick={() => handleTabSwitch('work')}
          >
            WORK
          </Button>
        </div>
        <Button onClick={handleVersionCreate}>Save Version</Button>
      </div>

      {/* Main area: Chat (left), Canvas (right) */}
      <div className="flex-1 overflow-hidden">
        <Split
          initialPrimarySize="30%"
          minPrimarySize="20%"
          minSecondarySize="40%"
          className="h-full"
        >
          {/* Chat */}
          <div className="h-full overflow-hidden border-r border-gray-200">
            <BrainChat
              messages={store.messages}
              onSendMessage={handleQuery}
              isLoading={store.isLoading}
              collaborators={store.collaborators}
              onProposalRequest={handleProposalRequest}
            />
          </div>

          {/* Canvas */}
          <div className="h-full overflow-hidden bg-gray-50 relative">
            <BrainCanvas
              elements={store.canvasElements}
              onElementAdd={(el) => {
                store.addCanvasElement(el);
                store.updateSearchIndex(el);
              }}
              onElementUpdate={(id, updates) => {
                store.updateCanvasElement(id, updates);
                const updatedEl = store.canvasElements.find(e => e.id === id);
                if (updatedEl) {
                  store.updateSearchIndex(updatedEl);
                }
              }}
              onElementRemove={store.removeCanvasElement}
              scale={store.scale}
              viewMode={store.viewMode}
              gridVisible={store.gridVisible}
              snapToGrid={store.snapToGrid}
              onCursorUpdate={handleCursorUpdate}
              collaborators={store.collaborators}
              cursorPositions={store.cursors}
              onVersionSwitch={handleVersionSwitch}
              versions={store.versions}
              currentVersion={store.currentVersion}
            />
          </div>
        </Split>
      </div>

      {/* Error display */}
      {store.error && (
        <div
          role="alert"
          aria-live="assertive"
          className="absolute bottom-4 right-4 bg-red-50 p-4 rounded-lg shadow-lg"
        >
          <h3 className="text-red-800 font-medium">Error</h3>
          <p className="text-red-600">{store.error}</p>
          <button
            onClick={() => store.setError(null)}
            className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
            aria-label="Dismiss error"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}

