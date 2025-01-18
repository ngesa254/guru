

// // Fixed dynamic imports with loading states
// const Canvas = dynamic(
//   () => import('@/components/Canvas').then(mod => mod.default),
//   { 
//     ssr: false,
//     loading: () => (
//       <div className="flex items-center justify-center h-full">
//         <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent" />
//       </div>
//     )
//   }
// );

// const Chat = dynamic(
//   () => import('@/components/Chat').then(mod => mod.default),
//   {
//     loading: () => <div className="animate-pulse h-full bg-gray-100" />
//   }
// );

// // All interfaces stay the same
// // ... [your existing interfaces]

// // Enhanced store with version control and collaboration
// const useBrainStore = create<BrainState>((set, get) => ({
//   // ... [your existing store implementation]
  
//   // Add version control functions
//   versions: [],
//   currentVersion: '',
//   createVersion: (author: string, changes: string) => {
//     const newVersion = {
//       id: crypto.randomUUID(),
//       timestamp: new Date().toISOString(),
//       author,
//       changes,
//       elements: get().canvasElements
//     };
//     set(state => ({
//       versions: [...state.versions, newVersion],
//       currentVersion: newVersion.id
//     }));
//   },
//   switchVersion: (versionId: string) => {
//     const version = get().versions.find(v => v.id === versionId);
//     if (version) {
//       set({
//         canvasElements: version.elements,
//         currentVersion: versionId
//       });
//     }
//   },

//   // Enhanced collaboration functions
//   addCollaborator: (collaborator: User) => 
//     set(state => ({
//       collaborators: [...state.collaborators, collaborator]
//     })),
  
//   removeCollaborator: (userId: string) =>
//     set(state => ({
//       collaborators: state.collaborators.filter(c => c.id !== userId)
//     })),
  
//   updateCursorPosition: (userId: string, position: CursorPosition) =>
//     set(state => ({
//       cursors: {
//         ...state.cursors,
//         [userId]: { ...position, timestamp: new Date().toISOString() }
//       }
//     }))
// }));

// // Now we can safely import Search after store creation
// import { Search } from '@/components/Search';

// // Client Component with all features
// function BrainPageClient() {
//   const store = useBrainStore();
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const { toast } = useToast();

//   // Enhanced WebSocket integration
//   useEffect(() => {
//     const ws = wsService.connect();
    
//     ws.onmessage = (event) => {
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
//       }
//     };

//     // Handle connection errors
//     ws.onerror = () => {
//       toast({
//         title: 'Connection Error',
//         description: 'Lost connection to collaboration server',
//         variant: 'destructive'
//       });
//     };

//     return () => wsService.disconnect();
//   }, []);

//   // Enhanced research handler with all transformations
//   const handleResearch = async (query: string) => {
//     store.setLoading(true);
//     try {
//       const response = await fetch('/api/research', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ query })
//       });

//       if (!response.ok) throw new Error('Research failed');
//       const data = await response.json();

//       // Handle different types of research data
//       if (data.daily_passengers || data.ev_parking_spaces) {
//         // Add chart
//         store.addCanvasElement({
//           id: crypto.randomUUID(),
//           type: 'chart',
//           content: {
//             data: [
//               { name: 'Daily Passengers', value: data.daily_passengers },
//               { name: 'EV Spaces', value: data.ev_parking_spaces }
//             ],
//             type: 'bar'
//           },
//           position: { x: 100, y: 100 },
//           size: { width: 400, height: 300 },
//           metadata: {
//             source: data.sources?.[0]?.url,
//             timestamp: new Date().toISOString(),
//             confidence: data.confidence
//           }
//         });
//       }

//       if (data.competitors) {
//         // Add competitor table
//         store.addCanvasElement({
//           id: crypto.randomUUID(),
//           type: 'table',
//           content: {
//             headers: ['Company', 'Stations', 'Locations'],
//             data: data.competitors.map(comp => [
//               comp.name,
//               comp.stations,
//               comp.locations.join(', ')
//             ])
//           },
//           position: { x: 100, y: 400 },
//           size: { width: 600, height: 300 }
//         });
//       }

//       if (data.requirements) {
//         // Add requirements list
//         store.addCanvasElement({
//           id: crypto.randomUUID(),
//           type: 'text',
//           content: {
//             title: 'Project Requirements',
//             items: data.requirements
//           },
//           position: { x: 100, y: 100 },
//           size: { width: 400, height: 300 }
//         });
//       }

//       store.setResearchData(data);
//       store.addMessage({
//         id: crypto.randomUUID(),
//         content: JSON.stringify(data),
//         type: 'ai',
//         timestamp: new Date(),
//         metadata: { confidence: data.confidence, sources: data.sources }
//       });

//     } catch (err) {
//       store.setError(err instanceof Error ? err.message : 'Research failed');
//     } finally {
//       store.setLoading(false);
//     }
//   };

//   // Enhanced search result handler
//   const handleSearchResult = useCallback((result: SearchResult) => {
//     if (result.type === 'research') {
//       store.setResearchData(result.content);
//       handleResearch(result.content);
//     }
//   }, [store, handleResearch]);

//   // Version control handlers
//   const handleVersionCreate = useCallback(() => {
//     store.createVersion('current-user', 'Manual save');
//     toast({
//       title: 'Version Created',
//       description: 'Canvas state has been saved'
//     });
//   }, [store]);

//   // Collaboration handlers
//   const handleCursorUpdate = useCallback((position: { x: number; y: number }) => {
//     wsService.sendMessage('CURSOR_UPDATE', { position });
//   }, []);

//   return (
//     <div className="h-full flex flex-col">
//       {/* Top Bar with Search and Version Control */}
//       <div className="border-b border-gray-200 p-4">
//         <div className="flex items-center justify-between">
//           <Search 
//             onResult={handleSearchResult}
//             onUpdateIndex={store.updateSearchIndex}
//             mode={store.searchMode}
//           />
//           <Button
//             onClick={handleVersionCreate}
//             className="ml-4"
//           >
//             Save Version
//           </Button>
//         </div>
//       </div>

//       {/* Main Workspace */}
//       <div className="flex-1 overflow-hidden">
//         <Split
//           initialPrimarySize="30%"
//           minPrimarySize="20%"
//           minSecondarySize="40%"
//           className="h-full"
//         >
//           {/* Chat Panel */}
//           <div className="h-full overflow-hidden">
//             <Chat
//               messages={store.messages}
//               onSendMessage={handleResearch}
//               isLoading={store.isLoading}
//             />
//           </div>

//           {/* Canvas Panel */}
//           <div className="h-full overflow-hidden bg-gray-50">
//             <Canvas
//               elements={store.canvasElements}
//               onElementAdd={store.addCanvasElement}
//               onElementUpdate={store.updateCanvasElement}
//               onElementRemove={store.removeCanvasElement}
//               scale={store.scale}
//               viewMode={store.viewMode}
//               gridVisible={store.gridVisible}
//               snapToGrid={store.snapToGrid}
//               onCursorUpdate={handleCursorUpdate}
//               collaborators={store.collaborators}
//               cursorPositions={store.cursors}
//             />
//           </div>
//         </Split>
//       </div>

//       {/* Error Display */}
//       {store.error && (
//         <div className="absolute bottom-4 right-4 bg-red-50 p-4 rounded-lg shadow-lg">
//           <h3 className="text-red-800 font-medium">Error</h3>
//           <p className="text-red-600">{store.error}</p>
//           <button
//             onClick={() => store.setError(null)}
//             className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
//           >
//             Dismiss
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// // Export default function that returns the client component
// export default function BrainPage() {
//   return <BrainPageClient />;
// }



// //1222 4:22



// 'use client';

// import React, { useEffect, useState, useCallback } from 'react';
// import dynamic from 'next/dynamic';
// import { Split } from '@geoffcox/react-splitter';
// import { create } from 'zustand';
// import _ from 'lodash';
// import { wsService } from '@/lib/websocket';
// import { Button } from '@/components/ui/button';
// import { useToast } from '@/components/ui/use-toast';








// // // Dynamic imports with proper client-side loading
// // const Canvas = dynamic(
// //   () => import('@/components/Canvas').then(mod => mod.default),
// //   { ssr: false }
// // );

// // const Chat = dynamic(
// //   () => import('@/components/Chat').then(mod => mod.default)
// // );

// // const Canvas = dynamic(
// //   () => import('@/components/Canvas').then(mod => mod.default),
// //   { 
// //     ssr: false,
// //     loading: () => (
// //       <div className="flex items-center justify-center h-full">
// //         <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent" />
// //       </div>
// //     )
// //   }
// // );

// // Fixed dynamic imports with loading states
// const Canvas = dynamic(
//   () => import('@/components/Canvas').then(mod => mod.default),
//   { 
//     ssr: false,
//     loading: () => (
//       <div className="flex items-center justify-center h-full">
//         <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent" />
//       </div>
//     )
//   }
// );

// // const Chat = dynamic(
// //   () => import('@/components/Chat').then(mod => mod.default),
// //   {
// //     loading: () => <div className="animate-pulse h-full bg-gray-100" />
// //   }
// // );

// const Chat = dynamic(
//   () => import('@/components/Chat').then(mod => mod.default),
//   {
//     loading: () => <div className="animate-pulse h-full bg-gray-100" />
//   }
// );

// // // Maintain dynamic imports
// // const Canvas = dynamic(() => import('@/components/Canvas'), {
// //   ssr: false,
// //   loading: () => (
// //     <div className="flex items-center justify-center h-full">
// //       <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent" />
// //     </div>
// //   )
// // });

// // const Chat = dynamic(() => import('@/components/Chat'), {
// //   loading: () => <div className="animate-pulse h-full bg-gray-100" />
// // });


// // // Keep all original interfaces
// // interface ResearchResponse {
// //   daily_passengers?: number;
// //   ev_parking_spaces?: number;
// //   confidence?: number;
// //   sources?: Array<{
// //     url: string;
// //     title: string;
// //     timestamp: string;
// //   }>;
// //   competitors?: Array<{
// //     name: string;
// //     stations: number;
// //     locations: string[];
// //   }>;
// //   requirements?: string[];
// // }

// interface User {
//   id: string;
//   name: string;
//   avatar?: string;
//   lastActive?: string;
//   status?: 'active' | 'idle' | 'offline';
//   role?: 'editor' | 'viewer' | 'admin';
// }

// // Rest of the interfaces and type definitions stay the same
// interface ResearchResponse {
//   daily_passengers?: number;
//   ev_parking_spaces?: number;
//   confidence?: number;
//   sources?: Array<{
//     url: string;
//     title: string;
//     timestamp: string;
//   }>;
//   competitors?: Array<{
//     name: string;
//     stations: number;
//     locations: string[];
//   }>;
//   requirements?: string[];
// }


// interface ProposalData {
//   generated_proposal: string;
//   metadata: {
//     author: string;
//     version: string;
//   };
// }

// interface Message {
//   id: string;
//   content: string;
//   type: 'user' | 'ai' | 'system';
//   timestamp: Date;
//   metadata?: {
//     confidence?: number;
//     sources?: Array<{
//       url: string;
//       title: string;
//       timestamp: string;
//     }>;
//   };
// }

// interface CanvasElement {
//   id: string;
//   type: 'text' | 'code' | 'chart' | 'diagram' | 'table' | 'mermaid' | 'meeting-transcript' | 'proposal';
//   content: any;
//   position: { x: number; y: number };
//   size: { width: number; height: number };
//   scale?: number;
//   rotation?: number;
//   selected?: boolean;
//   groupId?: string;
//   metadata?: {
//     source?: string;
//     timestamp?: string;
//     author?: string;
//     version?: string;
//     confidence?: number;
//     lastModified?: string;
//   };
// }

// // Maintain original store structure
// interface BrainState {
//   // Existing state
//   messages: Message[];
//   canvasElements: CanvasElement[];
//   isLoading: boolean;
//   error: string | null;
//   researchData: ResearchResponse | null;
//   proposalData: ProposalData | null;
//   collaborators: User[];
//   cursors: Record<string, { x: number; y: number; timestamp: string }>;
//   scale: number;
//   viewMode: 'edit' | 'view' | 'present';
//   gridVisible: boolean;
//   snapToGrid: boolean;
  
//   // Search-specific state
//   searchMode: 'search' | 'research';
//   searchQuery: string;
//   searchResults: SearchResult[];
//   searchIndex: Record<string, any>;
  
//   // Existing actions
//   addMessage: (message: Message) => void;
//   addCanvasElement: (element: CanvasElement) => void;
//   updateCanvasElement: (id: string, updates: Partial<CanvasElement>) => void;
//   removeCanvasElement: (id: string) => void;
//   setResearchData: (data: ResearchResponse) => void;
//   setProposalData: (data: ProposalData) => void;
//   setLoading: (loading: boolean) => void;
//   setError: (error: string | null) => void;
  
//   // Search actions
//   setSearchMode: (mode: 'search' | 'research') => void;
//   setSearchQuery: (query: string) => void;
//   updateSearchIndex: (content: any) => void;
//   searchElements: (query: string) => SearchResult[];
//   performSearch: (query: string) => Promise<void>;
// }

// // Add search result interface
// interface SearchResult {
//   id: string;
//   type: string;
//   title: string;
//   content: any;
//   timestamp: string;
// }

// interface CursorPosition {
//   x: number;
//   y: number;
//   timestamp: string;
// }

// interface Version {
//   id: string;
//   timestamp: string;
//   author: string;
//   changes: string;
//   elements: CanvasElement[];
// }

// const useBrainStore = create<BrainState>((set, get) => ({

// import { Search } from '@/components/Search';
// const { searchElements, updateSearchIndex } = useBrainStore()

//   // Existing state
//   messages: [],
//   canvasElements: [],
//   isLoading: false,
//   error: null,
//   researchData: null,
//   proposalData: null,
//   collaborators: [],
//   cursors: {},
//   scale: 1,
//   viewMode: 'edit',
//   gridVisible: true,
//   snapToGrid: true,
  
//   // Search state
//   searchMode: 'search',
//   searchQuery: '',
//   searchResults: [],
//   searchIndex: {},
  
//   addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
//   addCanvasElement: (element) => {
//     const newElement = {
//       ...element,
//       metadata: {
//         ...element.metadata,
//         timestamp: new Date().toISOString()
//       }
//     };
//     set((state) => ({ canvasElements: [...state.canvasElements, newElement] }));
//     wsService.sendMessage('ELEMENT_ADD', { element: newElement });
//   },
//   updateCanvasElement: (id, updates) => 
//     set((state) => ({
//       canvasElements: state.canvasElements.map(el =>
//         el.id === id ? { ...el, ...updates } : el
//       )
//     })),
//   removeCanvasElement: (id) =>
//     set((state) => ({
//       canvasElements: state.canvasElements.filter(el => el.id !== id)
//     })),
//   setResearchData: (data) => set({ researchData: data }),
//   setProposalData: (data) => set({ proposalData: data }),
//   setLoading: (loading) => set({ isLoading: loading }),
//   setError: (error) => set({ error }),

//   // Search actions implementation
//   setSearchMode: (mode) => set({ searchMode: mode }),
//   setSearchQuery: (query) => set({ searchQuery: query }),
  
//   updateSearchIndex: (content) => {
//     const textContent = JSON.stringify(content)
//       .toLowerCase()
//       .replace(/[^\w\s]/g, ' ');
    
//     const words = textContent.split(/\s+/).filter(Boolean);
//     set((state) => ({
//       searchIndex: {
//         ...state.searchIndex,
//         [content.id]: { words, text: textContent }
//       }
//     }));
//   },

//   searchElements: (query) => {
//     const state = get();
//     const searchTerms = query.toLowerCase().split(/\s+/);
    
//     // Search through indexed content
//     return Object.entries(state.searchIndex)
//       .filter(([_, content]) => 
//         searchTerms.every(term => content.text.includes(term))
//       )
//       .map(([id]) => {
//         const element = state.canvasElements.find(el => el.id === id);
//         return {
//           id,
//           type: element?.type || 'unknown',
//           title: element?.metadata?.title || `${element?.type} element`,
//           content: element?.content,
//           timestamp: element?.metadata?.timestamp || new Date().toISOString()
//         };
//       });
//   },

//   performSearch: async (query) => {
//     set({ isLoading: true });
//     try {
//       if (get().searchMode === 'research') {
//         // Handle research mode
//         const response = await fetch('/api/research', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ query })
//         });
        
//         if (!response.ok) throw new Error('Research failed');
//         const data = await response.json();
//         set({ searchResults: [{
//           id: crypto.randomUUID(),
//           type: 'research',
//           title: 'Research Results',
//           content: data,
//           timestamp: new Date().toISOString()
//         }]});
//       } else {
//         // Handle regular search
//         const results = get().searchElements(query);
//         set({ searchResults: results });
//       }
//     } catch (error) {
//       set({ error: error instanceof Error ? error.message : 'Search failed' });
//     } finally {
//       set({ isLoading: false });
//     }
//   },

//   // Add version control functions
//   versions: [],
//   currentVersion: '',
//   createVersion: (author: string, changes: string) => {
//     const newVersion = {
//       id: crypto.randomUUID(),
//       timestamp: new Date().toISOString(),
//       author,
//       changes,
//       elements: get().canvasElements
//     };
//     set(state => ({
//       versions: [...state.versions, newVersion],
//       currentVersion: newVersion.id
//     }));
//   },
//   switchVersion: (versionId: string) => {
//     const version = get().versions.find(v => v.id === versionId);
//     if (version) {
//       set({
//         canvasElements: version.elements,
//         currentVersion: versionId
//       });
//     }
//   },

//   // Enhanced collaboration functions
//   addCollaborator: (collaborator: User) => 
//     set(state => ({
//       collaborators: [...state.collaborators, collaborator]
//     })),
  
//   removeCollaborator: (userId: string) =>
//     set(state => ({
//       collaborators: state.collaborators.filter(c => c.id !== userId)
//     })),
  
//   updateCursorPosition: (userId: string, position: CursorPosition) =>
//     set(state => ({
//       cursors: {
//         ...state.cursors,
//         [userId]: { ...position, timestamp: new Date().toISOString() }
//       }
//     }))

// }));





// // export default function BrainPage() {
// //   const store = useBrainStore();
// //   const [sidebarOpen, setSidebarOpen] = useState(true);

// // Client Component Wrapper
// function BrainPageClient() {
//   const store = useBrainStore();
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const { toast } = useToast();

// //   // Maintain WebSocket integration
// //   useEffect(() => {
// //     const ws = wsService.connect();
    
// //     ws.onmessage = (event) => {
// //       const data = JSON.parse(event.data);
// //       switch (data.type) {
// //         case 'ELEMENT_ADD':
// //           store.addCanvasElement(data.element);
// //           break;
// //         case 'ELEMENT_UPDATE':
// //           store.updateCanvasElement(data.elementId, data.updates);
// //           break;
// //       }
// //     };

// //     return () => wsService.disconnect();
// //   }, []);




  
// //   // Keep research integration
// //   const handleResearch = async (query: string) => {
// //     store.setLoading(true);
// //     try {
// //       const response = await fetch('/api/research', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ query })
// //       });

// //       if (!response.ok) throw new Error('Research failed');
// //       const data = await response.json();

// //       if (data.daily_passengers || data.ev_parking_spaces) {
// //         store.addCanvasElement({
// //           id: crypto.randomUUID(),
// //           type: 'chart',
// //           content: {
// //             data: [
// //               { name: 'Daily Passengers', value: data.daily_passengers },
// //               { name: 'EV Spaces', value: data.ev_parking_spaces }
// //             ],
// //             type: 'bar'
// //           },
// //           position: { x: 100, y: 100 },
// //           size: { width: 400, height: 300 },
// //           metadata: {
// //             source: data.sources?.[0]?.url,
// //             timestamp: new Date().toISOString(),
// //             confidence: data.confidence
// //           }
// //         });
// //       }

// //       store.setResearchData(data);
// //       store.addMessage({
// //         id: crypto.randomUUID(),
// //         content: JSON.stringify(data),
// //         type: 'ai',
// //         timestamp: new Date(),
// //         metadata: { confidence: data.confidence, sources: data.sources }
// //       });
// //     } catch (err) {
// //       store.setError(err instanceof Error ? err.message : 'Research failed');
// //     } finally {
// //       store.setLoading(false);
// //     }
// //   };

// // //   return (
// // //     <div className="h-full flex flex-col">
// // //       {/* Maintain Search Integration */}
// // //       <div className="border-b border-gray-200">
// // //         <AssistantUI />
// // //       </div>

// // //       {/* Main Workspace */}
// // //       <div className="flex-1 overflow-hidden">
// // //         <Split
// // //           initialPrimarySize="30%"
// // //           minPrimarySize="20%"
// // //           minSecondarySize="40%"
// // //           className="h-full"
// // //         >
// // //           {/* Chat Panel */}
// // //           <div className="h-full overflow-hidden">
// // //             <Chat
// // //               messages={store.messages}
// // //               onSendMessage={handleResearch}
// // //               isLoading={store.isLoading}
// // //             />
// // //           </div>

// // //           {/* Canvas Panel */}
// // //           <div className="h-full overflow-hidden bg-gray-50">
// // //             <Canvas
// // //               elements={store.canvasElements}
// // //               onElementAdd={store.addCanvasElement}
// // //               onElementUpdate={store.updateCanvasElement}
// // //               onElementRemove={store.removeCanvasElement}
// // //               scale={store.scale}
// // //               viewMode={store.viewMode}
// // //               gridVisible={store.gridVisible}
// // //               snapToGrid={store.snapToGrid}
// // //             />
// // //           </div>
// // //         </Split>
// // //       </div>

// // //       {/* Error Display */}
// // //       {store.error && (
// // //         <div className="absolute bottom-4 right-4 bg-red-50 p-4 rounded-lg shadow-lg">
// // //           <h3 className="text-red-800 font-medium">Error</h3>
// // //           <p className="text-red-600">{store.error}</p>
// // //           <button
// // //             onClick={() => store.setError(null)}
// // //             className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
// // //           >
// // //             Dismiss
// // //           </button>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }


// // // Add back search handlers
// // const handleSearchResult = useCallback((result: SearchResult) => {
// //   if (result.type === 'research') {
// //     store.setResearchData(result.content);
// //     // Convert to canvas element if needed
// //     handleResearch(result.content);
// //   }
// // }, [store, handleResearch]);


// //  return (
// //     <div className="h-full flex flex-col">
// //       <div className="border-b border-gray-200">
// //         <Search 
// //           onResult={handleSearchResult}
// //           onUpdateIndex={store.updateSearchIndex}
// //           mode={store.searchMode}
// //         />
// //       </div>

// //     {/* Main Workspace */}
// //     <div className="flex-1 overflow-hidden">
// //       <Split
// //         initialPrimarySize="30%"
// //         minPrimarySize="20%"
// //         minSecondarySize="40%"
// //         className="h-full"
// //       >
// //         {/* Chat Panel */}
// //         <div className="h-full overflow-hidden">
// //           <Chat
// //             messages={store.messages}
// //             onSendMessage={handleResearch}
// //             isLoading={store.isLoading}
// //           />
// //         </div>

// //         {/* Canvas Panel */}
// //         <div className="h-full overflow-hidden bg-gray-50">
// //           <Canvas
// //             elements={store.canvasElements}
// //             onElementAdd={store.addCanvasElement}
// //             onElementUpdate={store.updateCanvasElement}
// //             onElementRemove={store.removeCanvasElement}
// //             scale={store.scale}
// //             viewMode={store.viewMode}
// //             gridVisible={store.gridVisible}
// //             snapToGrid={store.snapToGrid}
// //           />
// //         </div>
// //       </Split>
// //     </div>

// //     {/* Error Display */}
// //     {store.error && (
// //       <div className="absolute bottom-4 right-4 bg-red-50 p-4 rounded-lg shadow-lg">
// //         <h3 className="text-red-800 font-medium">Error</h3>
// //         <p className="text-red-600">{store.error}</p>
// //         <button
// //           onClick={() => store.setError(null)}
// //           className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
// //         >
// //           Dismiss
// //         </button>
// //       </div>
// //     )}
// //   </div>
// // );
// // }

// // // Export default function that returns the client component
// // export default function BrainPage() {
// // return <BrainPageClient />;
// // }

//  // Enhanced WebSocket integration
//  useEffect(() => {
//   const ws = wsService.connect();
  
//   ws.onmessage = (event) => {
//     const data = JSON.parse(event.data);
//     switch (data.type) {
//       case 'ELEMENT_ADD':
//         store.addCanvasElement(data.element);
//         break;
//       case 'ELEMENT_UPDATE':
//         store.updateCanvasElement(data.elementId, data.updates);
//         break;
//       case 'CURSOR_UPDATE':
//         store.updateCursorPosition(data.userId, data.position);
//         break;
//       case 'COLLABORATOR_UPDATE':
//         store.addCollaborator(data.collaborator);
//         break;
//       case 'COLLABORATOR_LEAVE':
//         store.removeCollaborator(data.userId);
//         break;
//     }
//   };

//   // Handle connection errors
//   ws.onerror = () => {
//     toast({
//       title: 'Connection Error',
//       description: 'Lost connection to collaboration server',
//       variant: 'destructive'
//     });
//   };

//   return () => wsService.disconnect();
// }, []);

// // Enhanced research handler with all transformations
// const handleResearch = async (query: string) => {
//   store.setLoading(true);
//   try {
//     const response = await fetch('/api/research', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ query })
//     });

//     if (!response.ok) throw new Error('Research failed');
//     const data = await response.json();

//     // Handle different types of research data
//     if (data.daily_passengers || data.ev_parking_spaces) {
//       // Add chart
//       store.addCanvasElement({
//         id: crypto.randomUUID(),
//         type: 'chart',
//         content: {
//           data: [
//             { name: 'Daily Passengers', value: data.daily_passengers },
//             { name: 'EV Spaces', value: data.ev_parking_spaces }
//           ],
//           type: 'bar'
//         },
//         position: { x: 100, y: 100 },
//         size: { width: 400, height: 300 },
//         metadata: {
//           source: data.sources?.[0]?.url,
//           timestamp: new Date().toISOString(),
//           confidence: data.confidence
//         }
//       });
//     }

//     if (data.competitors) {
//       // Add competitor table
//       store.addCanvasElement({
//         id: crypto.randomUUID(),
//         type: 'table',
//         content: {
//           headers: ['Company', 'Stations', 'Locations'],
//           data: data.competitors.map(comp => [
//             comp.name,
//             comp.stations,
//             comp.locations.join(', ')
//           ])
//         },
//         position: { x: 100, y: 400 },
//         size: { width: 600, height: 300 }
//       });
//     }

//     if (data.competitors?.length > 0) {
//       // Add competitor visualization
//       store.addCanvasElement({
//         id: crypto.randomUUID(),
//         type: 'mermaid',
//         content: `
//           graph TD
//           Hub[Central Hub]
//           ${data.competitors.map(comp => `
//           ${comp.name}[${comp.name}]
//           Hub --> ${comp.name}
//           ${comp.locations.map(loc => `${comp.name} --> ${loc}`).join('\n')}
//           `).join('\n')}
//         `,
//         position: { x: 100, y: 100 },
//         size: { width: 600, height: 400 }
//       });
//     }

//     if (data.requirements) {
//       // Add requirements list
//       store.addCanvasElement({
//         id: crypto.randomUUID(),
//         type: 'text',
//         content: {
//           title: 'Project Requirements',
//           items: data.requirements
//         },
//         position: { x: 100, y: 100 },
//         size: { width: 400, height: 300 }
//       });
//     }

//     store.setResearchData(data);
//     store.addMessage({
//       id: crypto.randomUUID(),
//       content: JSON.stringify(data),
//       type: 'ai',
//       timestamp: new Date(),
//       metadata: { confidence: data.confidence, sources: data.sources }
//     });

//   } catch (err) {
//     store.setError(err instanceof Error ? err.message : 'Research failed');
//   } finally {
//     store.setLoading(false);
//   }
// };

// // Enhanced search result handler
// const handleSearchResult = useCallback((result: SearchResult) => {
//   if (result.type === 'research') {
//     store.setResearchData(result.content);
//     handleResearch(result.content);
//   }
// }, [store, handleResearch]);

// // Version control handlers
// const handleVersionCreate = useCallback(() => {
//   store.createVersion('current-user', 'Manual save');
//   toast({
//     title: 'Version Created',
//     description: 'Canvas state has been saved'
//   });
// }, [store]);

// // Collaboration handlers
// const handleCursorUpdate = useCallback((position: { x: number; y: number }) => {
//   wsService.sendMessage('CURSOR_UPDATE', { position });
// }, []);

// return (
//   <div className="h-full flex flex-col">
//     {/* Top Bar with Search and Version Control */}
//     <div className="border-b border-gray-200 p-4">
//       <div className="flex items-center justify-between">
//         <Search 
//           onResult={handleSearchResult}
//           onUpdateIndex={store.updateSearchIndex}
//           mode={store.searchMode}
//         />
//         <Button
//           onClick={handleVersionCreate}
//           className="ml-4"
//         >
//           Save Version
//         </Button>
//       </div>
//     </div>

//     {/* Main Workspace */}
//     <div className="flex-1 overflow-hidden">
//       <Split
//         initialPrimarySize="30%"
//         minPrimarySize="20%"
//         minSecondarySize="40%"
//         className="h-full"
//       >
//         {/* Chat Panel */}
//         <div className="h-full overflow-hidden">
//           <Chat
//             messages={store.messages}
//             onSendMessage={handleResearch}
//             isLoading={store.isLoading}
//           />
//         </div>

//         {/* Canvas Panel */}
//         <div className="h-full overflow-hidden bg-gray-50">
//           <Canvas
//             elements={store.canvasElements}
//             onElementAdd={store.addCanvasElement}
//             onElementUpdate={store.updateCanvasElement}
//             onElementRemove={store.removeCanvasElement}
//             scale={store.scale}
//             viewMode={store.viewMode}
//             gridVisible={store.gridVisible}
//             snapToGrid={store.snapToGrid}
//             onCursorUpdate={handleCursorUpdate}
//             collaborators={store.collaborators}
//             cursorPositions={store.cursors}
//           />
//         </div>
//       </Split>
//     </div>

//     {/* Error Display */}
//     {store.error && (
//       <div className="absolute bottom-4 right-4 bg-red-50 p-4 rounded-lg shadow-lg">
//         <h3 className="text-red-800 font-medium">Error</h3>
//         <p className="text-red-600">{store.error}</p>
//         <button
//           onClick={() => store.setError(null)}
//           className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
//         >
//           Dismiss
//         </button>
//       </div>
//     )}
//   </div>
// );
// }

// // Export default function that returns the client component
// export default function BrainPage() {
// return <BrainPageClient />;
// }




//1223 5:00

'use client';

// Core imports first
import React, { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
// import { Split } from '@geoffcox/react-splitter';
import { create } from 'zustand';
import _ from 'lodash';
import { wsService } from '@/lib/websocket';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
// Change this line to use the correct path
import { Search } from '@/components/Search';  // Import from correct path



const Split = dynamic(
  () => import('@geoffcox/react-splitter').then(mod => mod.Split), 
  { ssr: false }
);
// 2. Dynamic imports with loading states
const Canvas = dynamic(
  () => import('@/components/Canvas').then(mod => mod.default),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent" />
      </div>
    )
  }
);

const Chat = dynamic(
  () => import('@/components/Chat').then(mod => mod.default),
  {
    loading: () => <div className="animate-pulse h-full bg-gray-100" />
  }
);



// // Dynamic imports with loading states
// const Canvas = dynamic(
//   () => import('@/components/Canvas').then(mod => mod.default),
//   { 
//     ssr: false,
//     loading: () => (
//       <div className="flex items-center justify-center h-full">
//         <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent" />
//       </div>
//     )
//   }
// );

// const Chat = dynamic(
//   () => import('@/components/Chat').then(mod => mod.default),
//   {
//     loading: () => <div className="animate-pulse h-full bg-gray-100" />
//   }
// );

// All required interfaces
interface User {
  id: string;
  name: string;
  avatar?: string;
  lastActive?: string;
  status?: 'active' | 'idle' | 'offline';
  role?: 'editor' | 'viewer' | 'admin';
}

interface CursorPosition {
  x: number;
  y: number;
  timestamp: string;
}

interface Version {
  id: string;
  timestamp: string;
  author: string;
  changes: string;
  elements: CanvasElement[];
}

interface ResearchResponse {
  daily_passengers?: number;
  ev_parking_spaces?: number;
  confidence?: number;
  sources?: Array<{
    url: string;
    title: string;
    timestamp: string;
  }>;
  competitors?: Array<{
    name: string;
    stations: number;
    locations: string[];
  }>;
  requirements?: string[];
}

interface ProposalData {
  generated_proposal: string;
  metadata: {
    author: string;
    version: string;
  };
}

interface Message {
  id: string;
  content: string;
  type: 'user' | 'ai' | 'system';
  timestamp: Date;
  metadata?: {
    confidence?: number;
    sources?: Array<{
      url: string;
      title: string;
      timestamp: string;
    }>;
  };
}

interface CanvasElement {
  id: string;
  type: 'text' | 'code' | 'chart' | 'diagram' | 'table' | 'mermaid' | 'meeting-transcript' | 'proposal';
  content: any;
  position: { x: number; y: number };
  size: { width: number; height: number };
  scale?: number;
  rotation?: number;
  selected?: boolean;
  groupId?: string;
  metadata?: {
    source?: string;
    timestamp?: string;
    author?: string;
    version?: string;
    confidence?: number;
    lastModified?: string;
  };
}

interface SearchResult {
  id: string;
  type: string;
  title: string;
  content: any;
  timestamp: string;
}

// Complete BrainState interface
interface BrainState {
  // Core state
  messages: Message[];
  canvasElements: CanvasElement[];
  isLoading: boolean;
  error: string | null;
  researchData: ResearchResponse | null;
  proposalData: ProposalData | null;
  collaborators: User[];
  cursors: Record<string, CursorPosition>;
  scale: number;
  viewMode: 'edit' | 'view' | 'present';
  gridVisible: boolean;
  snapToGrid: boolean;
  versions: Version[];
  currentVersion: string;
  
  // Search state
  searchMode: 'search' | 'research';
  searchQuery: string;
  searchResults: SearchResult[];
  searchIndex: Record<string, any>;
  
   /* @TODO: Work functionality placeholders
   * These interfaces define the work-related features that will be implemented 
   * to support OneDrive integration, document management, etc.
   */
   workMode: 'web' | 'onedrive' | 'local';  // Tracks current work context
   workspaceData: {
     oneDriveFiles?: any[];    // Will hold OneDrive file metadata
     localFiles?: any[];       // Will hold local file references
   };
   
   // Placeholder actions for work functionality
   connectToOneDrive: () => Promise<void>;
   fetchWorkspaceFiles: () => Promise<void>;
   syncWithOneDrive: () => Promise<void>;

  // Core actions
  addMessage: (message: Message) => void;
  addCanvasElement: (element: CanvasElement) => void;
  updateCanvasElement: (id: string, updates: Partial<CanvasElement>) => void;
  removeCanvasElement: (id: string) => void;
  setResearchData: (data: ResearchResponse) => void;
  setProposalData: (data: ProposalData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Version control actions
  createVersion: (author: string, changes: string) => void;
  switchVersion: (versionId: string) => void;
  
  // Collaboration actions
  addCollaborator: (collaborator: User) => void;
  removeCollaborator: (userId: string) => void;
  updateCursorPosition: (userId: string, position: CursorPosition) => void;
  
  // Search actions
  setSearchMode: (mode: 'search' | 'research') => void;
  setSearchQuery: (query: string) => void;
  updateSearchIndex: (content: any) => void;
  searchElements: (query: string) => SearchResult[];
  performSearch: (query: string) => Promise<void>;

    // Research-specific actions
    performWebResearch: (query: string) => Promise<void>;
    performWorkSearch: (query: string) => Promise<void>;
    
    // Proposal-related actions
    getPreviousProposal: (templateId: string) => Promise<void>;
    updateProposalWithRequirements: (proposalId: string, requirements: string[]) => Promise<void>;
    
    // Work planning actions
    getProjectSchedule: (projectId: string) => Promise<void>;
    updateProjectAssignments: (projectId: string, assignments: Record<string, string>) => Promise<void>;




  }


// Complete store implementation
const useBrainStore = create<BrainState>((set, get) => ({
  // Initialize all state
  messages: [],
  canvasElements: [],
  isLoading: false,
  error: null,
  researchData: null,
  proposalData: null,
  collaborators: [],
  cursors: {},
  scale: 1,
  viewMode: 'edit',
  gridVisible: true,
  snapToGrid: true,
  versions: [],
  currentVersion: '',
  searchMode: 'search',
  searchQuery: '',
  searchResults: [],
  searchIndex: {},
  
  // Core actions
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  addCanvasElement: (element) => {
    const newElement = {
      ...element,
      metadata: {
        ...element.metadata,
        timestamp: new Date().toISOString()
      }
    };
    set((state) => ({ canvasElements: [...state.canvasElements, newElement] }));
    wsService.sendMessage('ELEMENT_ADD', { element: newElement });
  },
  updateCanvasElement: (id, updates) => 
    set((state) => ({
      canvasElements: state.canvasElements.map(el =>
        el.id === id ? { ...el, ...updates } : el
      )
    })),
  removeCanvasElement: (id) =>
    set((state) => ({
      canvasElements: state.canvasElements.filter(el => el.id !== id)
    })),
  setResearchData: (data) => set({ researchData: data }),
  setProposalData: (data) => set({ proposalData: data }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),



  performWebResearch: async (query: string) => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      if (!response.ok) throw new Error('Research failed');
      const data = await response.json();

      // Handle research data visualization
      if (data.daily_passengers || data.ev_parking_spaces) {
        get().addCanvasElement({
          id: crypto.randomUUID(),
          type: 'chart',
          content: {
            data: [
              { name: 'Daily Passengers', value: data.daily_passengers },
              { name: 'EV Spaces', value: data.ev_parking_spaces }
            ],
            type: 'bar'
          },
          position: { x: 100, y: 100 },
          size: { width: 400, height: 300 }
        });
      }

      if (data.competitors) {
        // Add competitor visualization
        get().addCanvasElement({
          id: crypto.randomUUID(),
          type: 'mermaid',
          content: `
            graph TD
              Hub[Central Hub]
              ${data.competitors.map(comp => `
                ${comp.name}[${comp.name}]
                Hub --> ${comp.name}
                ${comp.locations.map(loc => `${comp.name} --> ${loc}`).join('\n')}
              `).join('\n')}
          `,
          position: { x: 100, y: 100 },
          size: { width: 600, height: 400 }
        });
      }

      set({ researchData: data });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Research failed' });
    } finally {
      set({ isLoading: false });
    }
  },

  performWorkSearch: async (query: string) => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/work', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'schedule', query })
      });

      if (!response.ok) throw new Error('Work search failed');
      const data = await response.json();

      // Create timeline visualization
      get().addCanvasElement({
        id: crypto.randomUUID(),
        type: 'timeline',
        content: {
          deliverables: data.deliverables,
          timeline: data.timeline,
          owners: data.owners
        },
        position: { x: 100, y: 100 },
        size: { width: 800, height: 400 }
      });

      set({ workData: data });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Work search failed' });
    } finally {
      set({ isLoading: false });
    }
  },

  // Version control actions
  createVersion: (author, changes) => {
    const newVersion = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      author,
      changes,
      elements: get().canvasElements
    };
    set(state => ({
      versions: [...state.versions, newVersion],
      currentVersion: newVersion.id
    }));
  },
  switchVersion: (versionId) => {
    const version = get().versions.find(v => v.id === versionId);
    if (version) {
      set({
        canvasElements: version.elements,
        currentVersion: versionId
      });
    }
  },

  // Collaboration actions
  addCollaborator: (collaborator) => 
    set(state => ({
      collaborators: [...state.collaborators, collaborator]
    })),
  removeCollaborator: (userId) =>
    set(state => ({
      collaborators: state.collaborators.filter(c => c.id !== userId)
    })),
  updateCursorPosition: (userId, position) =>
    set(state => ({
      cursors: {
        ...state.cursors,
        [userId]: {
          ...position,
          timestamp: new Date().toISOString()
        }
      }
    })),

  // Search actions
  setSearchMode: (mode) => set({ searchMode: mode }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  updateSearchIndex: (content) => {
    const textContent = JSON.stringify(content)
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ');
    
    const words = textContent.split(/\s+/).filter(Boolean);
    set((state) => ({
      searchIndex: {
        ...state.searchIndex,
        [content.id]: { words, text: textContent }
      }
    }));
  },
  searchElements: (query) => {
    const state = get();
    const searchTerms = query.toLowerCase().split(/\s+/);
    
    return Object.entries(state.searchIndex)
      .filter(([_, content]) => 
        searchTerms.every(term => content.text.includes(term))
      )
      .map(([id]) => {
        const element = state.canvasElements.find(el => el.id === id);
        return {
          id,
          type: element?.type || 'unknown',
          title: element?.metadata?.title || `${element?.type} element`,
          content: element?.content,
          timestamp: element?.metadata?.timestamp || new Date().toISOString()
        };
      });
  },
  performSearch: async (query) => {
    set({ isLoading: true });
    try {
      if (get().searchMode === 'research') {
        const response = await fetch('/api/research', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query })
        });
        
        if (!response.ok) throw new Error('Research failed');
        const data = await response.json();
        set({ searchResults: [{
          id: crypto.randomUUID(),
          type: 'research',
          title: 'Research Results',
          content: data,
          timestamp: new Date().toISOString()
        }]});
      } else {
        const results = get().searchElements(query);
        set({ searchResults: results });
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Search failed' });
    } finally {
      set({ isLoading: false });
    }
  }
}));





// Client Component with all features
function BrainPageClient() {
  const store = useBrainStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toast } = useToast();

  // Enhanced WebSocket integration
  useEffect(() => {
    const ws = wsService.connect();
    
    ws.onmessage = (event) => {
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
      }
    };

    ws.onerror = () => {
      toast({
        title: 'Connection Error',
        description: 'Lost connection to collaboration server',
        variant: 'destructive'
      });
    };

    return () => wsService.disconnect();
  }, []);

  // Complete research handler with all transformations
  const handleResearch = async (query: string) => {
    store.setLoading(true);
    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      if (!response.ok) throw new Error('Research failed');
      const data = await response.json();

      // Handle metrics visualization
      if (data.daily_passengers || data.ev_parking_spaces) {
        store.addCanvasElement({
          id: crypto.randomUUID(),
          type: 'chart',
          content: {
            data: [
              { name: 'Daily Passengers', value: data.daily_passengers },
              { name: 'EV Spaces', value: data.ev_parking_spaces }
            ],
            type: 'bar'
          },
          position: { x: 100, y: 100 },
          size: { width: 400, height: 300 },
          metadata: {
            source: data.sources?.[0]?.url,
            timestamp: new Date().toISOString(),
            confidence: data.confidence
          }
        });
      }

      // Handle competitor analysis
      if (data.competitors?.length > 0) {
        // Add competitor table
        store.addCanvasElement({
          id: crypto.randomUUID(),
          type: 'table',
          content: {
            headers: ['Company', 'Stations', 'Locations'],
            data: data.competitors.map(comp => [
              comp.name,
              comp.stations,
              comp.locations.join(', ')
            ])
          },
          position: { x: 100, y: 400 },
          size: { width: 600, height: 300 }
        });

        // Add competitor network visualization
        store.addCanvasElement({
          id: crypto.randomUUID(),
          type: 'mermaid',
          content: `
            graph TD
              Hub[Central Hub]
              ${data.competitors.map(comp => `
                ${comp.name}[${comp.name}]
                Hub --> ${comp.name}
                ${comp.locations.map(loc => `${comp.name} --> ${loc}`).join('\n')}
              `).join('\n')}
          `,
          position: { x: 750, y: 100 },
          size: { width: 600, height: 400 }
        });
      }

      // Handle requirements
      if (data.requirements) {
        store.addCanvasElement({
          id: crypto.randomUUID(),
          type: 'text',
          content: {
            title: 'Project Requirements',
            items: data.requirements
          },
          position: { x: 100, y: 100 },
          size: { width: 400, height: 300 }
        });
      }

      store.setResearchData(data);
      store.addMessage({
        id: crypto.randomUUID(),
        content: JSON.stringify(data),
        type: 'ai',
        timestamp: new Date(),
        metadata: { confidence: data.confidence, sources: data.sources}
    });
      } catch (err) {
        store.setError(err instanceof Error ? err.message : 'Research failed');
      } finally {
        store.setLoading(false);
      }
    };
  
    // Enhanced search result handlers
    const handleSearchResult = useCallback((result: SearchResult) => {
      if (result.type === 'research') {
        store.setResearchData(result.content);
        handleResearch(result.content);
      } else {
        // Handle navigation to existing element
        const element = store.canvasElements.find(el => el.id === result.id);
        if (element) {
          // Add focus/scroll to element
          const canvasElement = document.getElementById(element.id);
          if (canvasElement) {
            canvasElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }
    }, [store, handleResearch]);
  
    // Version control handlers
    const handleVersionCreate = useCallback(() => {
      store.createVersion('current-user', 'Manual save');
      toast({
        title: 'Version Created',
        description: 'Canvas state has been saved'
      });
    }, [store]);
  
    const handleVersionSwitch = useCallback((versionId: string) => {
      store.switchVersion(versionId);
      toast({
        title: 'Version Switched',
        description: 'Canvas state has been restored'
      });
    }, [store]);
  
    // Collaboration handlers
    const handleCursorUpdate = useCallback((position: { x: number; y: number }) => {
      wsService.sendMessage('CURSOR_UPDATE', { position });
    }, []);
  
    const handleCollaboratorJoin = useCallback((user: User) => {
      wsService.sendMessage('COLLABORATOR_UPDATE', { collaborator: user });
    }, []);
  
    // Canvas element handlers
    const handleElementAdd = useCallback((element: CanvasElement) => {
      store.addCanvasElement(element);
      store.updateSearchIndex(element);
    }, [store]);
  
    const handleElementUpdate = useCallback((id: string, updates: Partial<CanvasElement>) => {
      store.updateCanvasElement(id, updates);
      const updatedElement = store.canvasElements.find(el => el.id === id);
      if (updatedElement) {
        store.updateSearchIndex(updatedElement);
      }
    }, [store]);
  
    // Keyboard shortcuts
    useEffect(() => {
      const handleKeydown = (e: KeyboardEvent) => {
        // Save version
        if (e.ctrlKey && e.key === 's') {
          e.preventDefault();
          handleVersionCreate();
        }
        // Undo (implemented in Canvas component)
        if (e.ctrlKey && e.key === 'z') {
          e.preventDefault();
          // Canvas handles undo
        }
        // Toggle grid
        if (e.ctrlKey && e.key === 'g') {
          e.preventDefault();
          store.setGridVisible(!store.gridVisible);
        }
      };
  
      window.addEventListener('keydown', handleKeydown);
      return () => window.removeEventListener('keydown', handleKeydown);
    }, [store, handleVersionCreate]);
  
    return (
      <div className="h-full flex flex-col">
        {/* Top Bar with Search and Version Control */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <Search 
              onResult={handleSearchResult}
              onUpdateIndex={store.updateSearchIndex}
              mode={store.searchMode}
              onModeChange={store.setSearchMode}
            />
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => store.setViewMode(
                  store.viewMode === 'edit' ? 'present' : 'edit'
                )}
              >
                {store.viewMode === 'edit' ? 'Present' : 'Edit'}
              </Button>
              <Button
                onClick={handleVersionCreate}
                className="ml-2"
              >
                Save Version
              </Button>
            </div>
          </div>
        </div>
  
        {/* Main Workspace */}
        <div className="flex-1 overflow-hidden">
          <Split
            initialPrimarySize="30%"
            minPrimarySize="20%"
            minSecondarySize="40%"
            className="h-full"
          >
            {/* Chat Panel */}
            <div className="h-full overflow-hidden">
              <Chat
                messages={store.messages}
                onSendMessage={handleResearch}
                isLoading={store.isLoading}
                collaborators={store.collaborators}
                onCollaboratorJoin={handleCollaboratorJoin}
              />
            </div>
  
            {/* Canvas Panel */}
            <div className="h-full overflow-hidden bg-gray-50">
              <Canvas
                elements={store.canvasElements}
                onElementAdd={handleElementAdd}
                onElementUpdate={handleElementUpdate}
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
  
        {/* Error Display */}
        {store.error && (
          <div className="absolute bottom-4 right-4 bg-red-50 p-4 rounded-lg shadow-lg">
            <h3 className="text-red-800 font-medium">Error</h3>
            <p className="text-red-600">{store.error}</p>
            <button
              onClick={() => store.setError(null)}
              className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>
    );
  }
  
  // Export default function that returns the client component
  export default function BrainPage() {
    return <BrainPageClient />;
  }