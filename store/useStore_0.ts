// // import { create } from 'zustand';
// // import { persist } from 'zustand/middleware';

// // interface StoreState {
// //   firstName: string;
// //   setFirstName: (name: string) => void;
// // }

// // const useStore = create(
// //   persist<StoreState>(
// //     (set) => ({
// //       firstName: '',
// //       setFirstName: (name: string) => set({ firstName: name }),
// //     }),
// //     {
// //       name: 'user-storage', // name of the item in the storage (must be unique)
// //     }
// //   )
// // );

// // export default useStore;


// // 'use client';

// // import { create } from 'zustand';
// // import { devtools, persist } from 'zustand/middleware';

// // // Types
// // interface User {
// //   id: string;
// //   name: string;
// //   avatar?: string;
// //   cursor?: { x: number; y: number };
// // }

// // interface CanvasElement {
// //   id: string;
// //   type: 'text' | 'code' | 'chart' | 'diagram' | 'table';
// //   content: any;
// //   position: { x: number; y: number };
// //   size: { width: number; height: number };
// //   createdBy: string;
// //   lastModifiedBy: string;
// //   version: number;
// // }

// // interface Message {
// //   id: string;
// //   content: string;
// //   type: 'user' | 'ai';
// //   timestamp: Date;
// //   attachments?: any[];
// // }

// // interface StoreState {
// //   // User and Collaboration
// //   currentUser: User | null;
// //   collaborators: User[];
// //   cursorPositions: Record<string, { x: number; y: number }>;
// //   firstName: string; // Keeping your existing state
  
// //   // Canvas Elements
// //   elements: CanvasElement[];
// //   selectedElements: string[];
  
// //   // Chat and Messages
// //   messages: Message[];
// //   isProcessing: boolean;
  
// //   // UI State
// //   sidebarOpen: boolean;
// //   currentTool: string;
// //   scale: number;
  
// //   // Actions
// //   setFirstName: (name: string) => void; // Keeping your existing action
// //   setCurrentUser: (user: User | null) => void;
// //   updateCollaborator: (user: User) => void;
// //   removeCollaborator: (userId: string) => void;
// //   updateCursorPosition: (userId: string, position: { x: number; y: number }) => void;
  
// //   addElement: (element: Omit<CanvasElement, 'id' | 'version' | 'createdBy' | 'lastModifiedBy'>) => void;
// //   updateElement: (id: string, updates: Partial<CanvasElement>) => void;
// //   removeElement: (id: string) => void;
// //   setSelectedElements: (ids: string[]) => void;
  
// //   addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
// //   setProcessing: (isProcessing: boolean) => void;
  
// //   setSidebarOpen: (open: boolean) => void;
// //   setCurrentTool: (tool: string) => void;
// //   setScale: (scale: number) => void;
// // }

// // const useStore = create<StoreState>()(
// //   devtools(
// //     persist(
// //       (set) => ({
// //         // Initial State
// //         firstName: '', // Keeping your existing state
// //         currentUser: null,
// //         collaborators: [],
// //         cursorPositions: {},
// //         elements: [],
// //         selectedElements: [],
// //         messages: [],
// //         isProcessing: false,
// //         sidebarOpen: true,
// //         currentTool: 'select',
// //         scale: 1,
        
// //         // Actions
// //         setFirstName: (name) => set({ firstName: name }), // Keeping your existing action
// //         setCurrentUser: (user) => set({ currentUser: user }),
        
// //         updateCollaborator: (user) => set((state) => ({
// //           collaborators: [
// //             ...state.collaborators.filter(c => c.id !== user.id),
// //             user
// //           ]
// //         })),
        
// //         removeCollaborator: (userId) => set((state) => ({
// //           collaborators: state.collaborators.filter(c => c.id !== userId)
// //         })),
        
// //         updateCursorPosition: (userId, position) => set((state) => ({
// //           cursorPositions: {
// //             ...state.cursorPositions,
// //             [userId]: position
// //           }
// //         })),
        
// //         addElement: (element) => set((state) => ({
// //           elements: [
// //             ...state.elements,
// //             {
// //               ...element,
// //               id: crypto.randomUUID(),
// //               version: 1,
// //               createdBy: state.currentUser?.id || 'unknown',
// //               lastModifiedBy: state.currentUser?.id || 'unknown'
// //             }
// //           ]
// //         })),
        
// //         updateElement: (id, updates) => set((state) => ({
// //           elements: state.elements.map(el => 
// //             el.id === id
// //               ? {
// //                   ...el,
// //                   ...updates,
// //                   version: el.version + 1,
// //                   lastModifiedBy: state.currentUser?.id || 'unknown'
// //                 }
// //               : el
// //           )
// //         })),
        
// //         removeElement: (id) => set((state) => ({
// //           elements: state.elements.filter(el => el.id !== id),
// //           selectedElements: state.selectedElements.filter(elId => elId !== id)
// //         })),
        
// //         setSelectedElements: (ids) => set({ selectedElements: ids }),
        
// //         addMessage: (message) => set((state) => ({
// //           messages: [
// //             ...state.messages,
// //             {
// //               ...message,
// //               id: crypto.randomUUID(),
// //               timestamp: new Date()
// //             }
// //           ]
// //         })),
        
// //         setProcessing: (isProcessing) => set({ isProcessing }),
        
// //         setSidebarOpen: (open) => set({ sidebarOpen: open }),
        
// //         setCurrentTool: (tool) => set({ currentTool: tool }),
        
// //         setScale: (scale) => set({ scale })
// //       }),
// //       {
// //         name: 'canvas-storage',
// //         partialize: (state) => ({
// //           firstName: state.firstName,
// //           elements: state.elements,
// //           messages: state.messages,
// //           sidebarOpen: state.sidebarOpen,
// //           scale: state.scale,
// //           currentTool: state.currentTool
// //         })
// //       }
// //     )
// //   )
// // );

// // export default useStore;


// // 'use client';

// // import { create } from 'zustand';
// // import { devtools, persist } from 'zustand/middleware';

// // // Types
// // interface User {
// //   id: string;
// //   name: string;
// //   avatar?: string;
// //   cursor?: { x: number; y: number };
// // }

// // interface Connection {
// //   id: string;
// //   from: string;
// //   to: string;
// //   type: 'straight' | 'curved';
// //   controlPoints?: { x: number; y: number }[];
// // }

// // interface CanvasElement {
// //   id: string;
// //   type: 'text' | 'code' | 'chart' | 'diagram' | 'table';
// //   content: any;
// //   position: { x: number; y: number };
// //   size: { width: number; height: number };
// //   createdBy: string;
// //   lastModifiedBy: string;
// //   version: number;
// // }

// // interface Message {
// //   id: string;
// //   content: string;
// //   type: 'user' | 'ai';
// //   timestamp: Date;
// //   attachments?: any[];
// // }

// // interface StoreState {
// //   // User and Collaboration
// //   currentUser: User | null;
// //   collaborators: User[];
// //   cursorPositions: Record<string, { x: number; y: number }>;
// //   firstName: string;
  
// //   // Canvas Elements and Connections
// //   elements: CanvasElement[];
// //   connections: Connection[];
// //   groups: { [key: string]: string[] };
// //   selectedElements: string[];
// //   selectedConnections: string[];
  
// //   // Chat and Messages
// //   messages: Message[];
// //   isProcessing: boolean;
  
// //   // UI State
// //   sidebarOpen: boolean;
// //   currentTool: string;
// //   scale: number;
  
// //   // Actions
// //   setFirstName: (name: string) => void;
// //   setCurrentUser: (user: User | null) => void;
// //   updateCollaborator: (user: User) => void;
// //   removeCollaborator: (userId: string) => void;
// //   updateCursorPosition: (userId: string, position: { x: number; y: number }) => void;
  
// //   // Element Actions
// //   addElement: (element: Omit<CanvasElement, 'id' | 'version' | 'createdBy' | 'lastModifiedBy'>) => void;
// //   updateElement: (id: string, updates: Partial<CanvasElement>) => void;
// //   removeElement: (id: string) => void;
// //   setSelectedElements: (ids: string[]) => void;
  
// //   // Connection Actions
// //   addConnection: (connection: Omit<Connection, 'id'>) => void;
// //   updateConnection: (id: string, updates: Partial<Connection>) => void;
// //   removeConnection: (id: string) => void;
// //   setSelectedConnections: (ids: string[]) => void;
  
// //   // Message Actions
// //   addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
// //   setProcessing: (isProcessing: boolean) => void;
  
// //   // UI Actions
// //   setSidebarOpen: (open: boolean) => void;
// //   setCurrentTool: (tool: string) => void;
// //   setScale: (scale: number) => void;
// // }

// // const useStore = create<StoreState>()(
// //   devtools(
// //     persist(
// //       (set) => ({
// //         // Initial State
// //         firstName: '',
// //         currentUser: null,
// //         collaborators: [],
// //         cursorPositions: {},
// //         elements: [],
// //         connections: [], // Initialize connections array
// //         groups: {},
// //         selectedElements: [],
// //         selectedConnections: [],
// //         messages: [],
// //         isProcessing: false,
// //         sidebarOpen: true,
// //         currentTool: 'select',
// //         scale: 1,
        
// //         // Actions
// //         setFirstName: (name) => set({ firstName: name }),
// //         setCurrentUser: (user) => set({ currentUser: user }),
        
// //         updateCollaborator: (user) => set((state) => ({
// //           collaborators: [
// //             ...state.collaborators.filter(c => c.id !== user.id),
// //             user
// //           ]
// //         })),
        
// //         removeCollaborator: (userId) => set((state) => ({
// //           collaborators: state.collaborators.filter(c => c.id !== userId)
// //         })),
        
// //         updateCursorPosition: (userId, position) => set((state) => ({
// //           cursorPositions: {
// //             ...state.cursorPositions,
// //             [userId]: position
// //           }
// //         })),
        
// //         // Element Actions
// //         addElement: (element) => set((state) => ({
// //           elements: [
// //             ...state.elements,
// //             {
// //               ...element,
// //               id: crypto.randomUUID(),
// //               version: 1,
// //               createdBy: state.currentUser?.id || 'unknown',
// //               lastModifiedBy: state.currentUser?.id || 'unknown'
// //             }
// //           ]
// //         })),
        
// //         updateElement: (id, updates) => set((state) => ({
// //           elements: state.elements.map(el => 
// //             el.id === id
// //               ? {
// //                   ...el,
// //                   ...updates,
// //                   version: el.version + 1,
// //                   lastModifiedBy: state.currentUser?.id || 'unknown'
// //                 }
// //               : el
// //           )
// //         })),
        
// //         removeElement: (id) => set((state) => ({
// //           elements: state.elements.filter(el => el.id !== id),
// //           selectedElements: state.selectedElements.filter(elId => elId !== id)
// //         })),
        
// //         setSelectedElements: (ids) => set({ selectedElements: ids }),
        
// //         // Connection Actions
// //         addConnection: (connection) => set((state) => ({
// //           connections: [...state.connections, { ...connection, id: crypto.randomUUID() }]
// //         })),
        
// //         updateConnection: (id, updates) => set((state) => ({
// //           connections: state.connections.map(conn => 
// //             conn.id === id ? { ...conn, ...updates } : conn
// //           )
// //         })),
        
// //         removeConnection: (id) => set((state) => ({
// //           connections: state.connections.filter(conn => conn.id !== id),
// //           selectedConnections: state.selectedConnections.filter(connId => connId !== id)
// //         })),
        
// //         setSelectedConnections: (ids) => set({ selectedConnections: ids }),
        
// //         // Message Actions
// //         addMessage: (message) => set((state) => ({
// //           messages: [
// //             ...state.messages,
// //             {
// //               ...message,
// //               id: crypto.randomUUID(),
// //               timestamp: new Date()
// //             }
// //           ]
// //         })),
        
// //         setProcessing: (isProcessing) => set({ isProcessing }),
        
// //         // UI Actions
// //         setSidebarOpen: (open) => set({ sidebarOpen: open }),
// //         setCurrentTool: (tool) => set({ currentTool: tool }),
// //         setScale: (scale) => set({ scale })
// //       }),
// //       {
// //         name: 'canvas-storage',
// //         partialize: (state) => ({
// //           firstName: state.firstName,
// //           elements: state.elements,
// //           connections: state.connections,
// //           messages: state.messages,
// //           sidebarOpen: state.sidebarOpen,
// //           scale: state.scale,
// //           currentTool: state.currentTool
// //         })
// //       }
// //     )
// //   )
// // );

// // export default useStore;



// 'use client';

// import { create } from 'zustand';
// import { devtools, persist } from 'zustand/middleware';
// import { produce } from 'immer';

// // Types
// interface Point {
//   x: number;
//   y: number;
// }

// interface User {
//   id: string;
//   name: string;
//   avatar?: string;
//   cursor?: Point;
// }

// interface Connection {
//   id: string;
//   from: string;
//   to: string;
//   type: 'straight' | 'curved';
//   controlPoints?: Point[];
// }

// interface CanvasElement {
//   id: string;
//   type: 'text' | 'code' | 'chart' | 'diagram' | 'table';
//   content: any;
//   position: Point;
//   size: { width: number; height: number };
//   createdBy: string;
//   lastModifiedBy: string;
//   version: number;
//   scale?: number;
//   rotation?: number;
//   groupId?: string;
// }

// interface Message {
//   id: string;
//   content: string;
//   type: 'user' | 'ai';
//   timestamp: Date;
//   attachments?: any[];
// }

// interface StoreState {
//   // User and Collaboration
//   currentUser: User | null;
//   collaborators: User[];
//   cursorPositions: Record<string, Point>;
//   firstName: string;
  
//   // Canvas Elements and Connections
//   elements: CanvasElement[];
//   connections: Connection[];
//   groups: { [key: string]: string[] };
//   selectedElements: string[];
//   selectedConnections: string[];
  
//   // Chat and Messages
//   messages: Message[];
//   isProcessing: boolean;
  
//   // UI State
//   sidebarOpen: boolean;
//   currentTool: string;
//   scale: number;
//   error: string | null;
  
//   // Actions
//   setFirstName: (name: string) => void;
//   setCurrentUser: (user: User | null) => void;
//   updateCollaborator: (user: User) => void;
//   removeCollaborator: (userId: string) => void;
//   updateCursorPosition: (userId: string, position: Point) => void;
  
//   // Element Actions
//   addElement: (element: Omit<CanvasElement, 'id' | 'version' | 'createdBy' | 'lastModifiedBy'>) => void;
//   updateElement: (id: string, updates: Partial<CanvasElement>) => void;
//   removeElement: (id: string) => void;
//   setSelectedElements: (ids: string[]) => void;
  
//   // Connection Actions
//   addConnection: (connection: Omit<Connection, 'id'>) => void;
//   updateConnection: (id: string, updates: Partial<Connection>) => void;
//   removeConnection: (id: string) => void;
//   setSelectedConnections: (ids: string[]) => void;
  
//   // Message Actions
//   addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
//   setProcessing: (isProcessing: boolean) => void;
  
//   // UI Actions
//   setSidebarOpen: (open: boolean) => void;
//   setCurrentTool: (tool: string) => void;
//   setScale: (scale: number) => void;
//   setError: (error: string | null) => void;
// }

// const useStore = create<StoreState>()(
//   devtools(
//     persist(
//       (set, get) => ({
//         // Initial State with error handling
//         currentUser: null,
//         collaborators: [],
//         cursorPositions: {},
//         firstName: '',
//         elements: [],
//         connections: [],
//         groups: {},
//         selectedElements: [],
//         selectedConnections: [],
//         messages: [],
//         isProcessing: false,
//         sidebarOpen: true,
//         currentTool: 'select',
//         scale: 1,
//         error: null,
        
//         // Actions with error handling and immer integration
//         setFirstName: (name) => set({ firstName: name }),
//         setCurrentUser: (user) => set({ currentUser: user }),
        
//         updateCollaborator: (user) => set(
//           produce((state) => {
//             const index = state.collaborators.findIndex(c => c.id === user.id);
//             if (index >= 0) {
//               state.collaborators[index] = user;
//             } else {
//               state.collaborators.push(user);
//             }
//           })
//         ),
        
//         removeCollaborator: (userId) => set(
//           produce((state) => {
//             state.collaborators = state.collaborators.filter(c => c.id !== userId);
//             delete state.cursorPositions[userId];
//           })
//         ),
        
//         updateCursorPosition: (userId, position) => set(
//           produce((state) => {
//             state.cursorPositions[userId] = position;
//           })
//         ),
        
//         // Element Actions with validation
//         addElement: (element) => set(
//           produce((state) => {
//             try {
//               const newElement = {
//                 ...element,
//                 id: crypto.randomUUID(),
//                 version: 1,
//                 createdBy: state.currentUser?.id || 'unknown',
//                 lastModifiedBy: state.currentUser?.id || 'unknown'
//               };
//               state.elements.push(newElement);
//             } catch (error) {
//               state.error = 'Failed to add element';
//             }
//           })
//         ),
        
//         updateElement: (id, updates) => set(
//           produce((state) => {
//             const element = state.elements.find(el => el.id === id);
//             if (element) {
//               Object.assign(element, {
//                 ...updates,
//                 version: element.version + 1,
//                 lastModifiedBy: state.currentUser?.id || 'unknown'
//               });
//             }
//           })
//         ),
        
//         removeElement: (id) => set(
//           produce((state) => {
//             state.elements = state.elements.filter(el => el.id !== id);
//             state.selectedElements = state.selectedElements.filter(elId => elId !== id);
//             // Remove associated connections
//             state.connections = state.connections.filter(
//               conn => conn.from !== id && conn.to !== id
//             );
//           })
//         ),
        
//         // Connection handling
//         addConnection: (connection) => set(
//           produce((state) => {
//             try {
//               state.connections.push({
//                 ...connection,
//                 id: crypto.randomUUID()
//               });
//             } catch (error) {
//               state.error = 'Failed to add connection';
//             }
//           })
//         ),
        
//         updateConnection: (id, updates) => set(
//           produce((state) => {
//             const connection = state.connections.find(conn => conn.id === id);
//             if (connection) {
//               Object.assign(connection, updates);
//             }
//           })
//         ),
        
//         removeConnection: (id) => set(
//           produce((state) => {
//             state.connections = state.connections.filter(conn => conn.id !== id);
//             state.selectedConnections = state.selectedConnections.filter(
//               connId => connId !== id
//             );
//           })
//         ),
        
//         // Selection management
//         setSelectedElements: (ids) => set({ selectedElements: ids }),
//         setSelectedConnections: (ids) => set({ selectedConnections: ids }),
        
//         // Message handling
//         addMessage: (message) => set(
//           produce((state) => {
//             state.messages.push({
//               ...message,
//               id: crypto.randomUUID(),
//               timestamp: new Date()
//             });
//           })
//         ),
        
//         // UI state management
//         setProcessing: (isProcessing) => set({ isProcessing }),
//         setSidebarOpen: (open) => set({ sidebarOpen: open }),
//         setCurrentTool: (tool) => set({ currentTool: tool }),
//         setScale: (scale) => set({ scale }),
//         setError: (error) => set({ error })
//       }),
//       {
//         name: 'canvas-storage',
//         partialize: (state) => ({
//           firstName: state.firstName,
//           elements: state.elements,
//           connections: state.connections,
//           messages: state.messages,
//           sidebarOpen: state.sidebarOpen,
//           scale: state.scale,
//           currentTool: state.currentTool
//         })
//       }
//     )
//   )
// );

// export default useStore;




// 'use client';

// // store/useStore.ts
// import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';

// interface CursorPosition {
//   x: number;
//   y: number;
//   timestamp: string;
// }

// interface Collaborator {
//   id: string;
//   name: string;
//   avatar?: string;
// }

// interface StoreState {
//   collaborators: Collaborator[];
//   cursorPositions: Record<string, CursorPosition>;
//   scale: number;
//   addCollaborator: (collaborator: Collaborator) => void;
//   updateCursorPosition: (id: string, position: Omit<CursorPosition, 'timestamp'>) => void;
//   setScale: (scale: number) => void;
//   saveWorkspace: () => Promise<void>;
// }

// // Create store with SSR-safe initialization
// let store: ReturnType<typeof createStore>;

// const createStore = () =>
//   create<StoreState>()(
//     persist(
//       (set, get) => ({
//         collaborators: [],
//         cursorPositions: {},
//         scale: 1,

//         addCollaborator: (collaborator) =>
//           set((state) => ({
//             collaborators: [...state.collaborators, collaborator],
//           })),

//         updateCursorPosition: (id, position) =>
//           set((state) => ({
//             cursorPositions: {
//               ...state.cursorPositions,
//               [id]: {
//                 ...position,
//                 timestamp: new Date().toISOString(),
//               },
//             },
//           })),

//         setScale: (newScale) =>
//           set(() => ({
//             scale: newScale,
//           })),

//         saveWorkspace: async () => {
//           // Implementation here
//           await new Promise(resolve => setTimeout(resolve, 1000));
//         },
//       }),
//       {
//         name: 'canvas-storage',
//         storage: createJSONStorage(() => localStorage),
//       }
//     )
//   );

// // Initialize store in a way that's safe for SSR
// const useStore = (selector: (state: StoreState) => any) => {
//   if (typeof window === 'undefined') {
//     if (!store) {
//       store = createStore();
//     }
//     return store(selector);
//   }
  
//   if (!store) {
//     store = createStore();
//   }
  
//   return store(selector);
// };

// export default useStore;



'use client';

// import { create } from 'zustand';
// import { createJSONStorage, persist } from 'zustand/middleware';
// import { v4 as uuidv4 } from 'uuid';
// import { useEffect, useState, useCallback, useMemo } from 'react';
// import { shallow } from 'zustand/shallow';

// At the top of the file, update imports:
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { shallow } from 'zustand/shallow';

// Types for AI Integration
export interface AIResearchResponse {
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

// Add Connections type to existing types
export interface Connection {
  id: string;
  from: string;
  to: string;
  type: 'straight' | 'curved';
  controlPoints?: Array<{ x: number; y: number }>;
}

export interface ProposalData {
  generated_proposal: string;
  metadata: {
    author: string;
    version: string;
  };
}

// Basic types
export interface CursorPosition {
  x: number;
  y: number;
  timestamp: string;
}

export interface Collaborator {
  id: string;
  name: string;
  avatar?: string;
  lastActive?: string;
  status?: 'active' | 'idle' | 'offline';
  role?: 'editor' | 'viewer' | 'admin';
}

export interface CanvasElement {
  id: string;
  type: 'chart' | 'table' | 'code' | 'diagram' | 'mermaid' | 'meeting-transcript' | 'proposal';
  content: any;
  position: { x: number; y: number };
  size?: { width: number; height: number };
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
    createdBy?: string;
  };
}

// Version control types
export interface Version {
  id: string;
  timestamp: string;
  author: string;
  changes: string;
  elements: CanvasElement[];
}

export interface HistoryEntry {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
  details: any;
}

// State interface
interface StoreState {
  // Collaboration
  collaborators: Collaborator[];
  cursorPositions: Record<string, CursorPosition>;
  activeUsers: string[];
  
  // Canvas
  elements: CanvasElement[];
  selectedElements: string[];
  scale: number;
  viewMode: 'edit' | 'view' | 'present';
  
  // Version Control
  versions: Version[];
  currentVersion: string;
  history: HistoryEntry[];
  
  // UI State
  theme: 'light' | 'dark' | 'system';
  gridVisible: boolean;
  snapToGrid: boolean;
  
  // Search & Indexing
  searchIndex: Record<string, any>;
  tags: string[];

  connections: Connection[];
  selectedConnections: string[];

  groups: {
    id: string;
    name: string;
    elementIds: string[];
    createdAt: string;
    updatedAt: string;
  }[];
  pan: { x: number; y: number };
}

// Actions interface
interface StoreActions {
  // Collaboration actions
  addCollaborator: (collaborator: Collaborator) => void;
  removeCollaborator: (id: string) => void;
  updateCollaborator: (id: string, updates: Partial<Collaborator>) => void;
  updateCursorPosition: (id: string, position: Omit<CursorPosition, 'timestamp'>) => void;
  
  // Canvas actions
  addElement: (element: Omit<CanvasElement, 'id'>) => void;
  updateElement: (id: string, updates: Partial<CanvasElement>) => void;
  removeElement: (id: string) => void;
  setSelectedElements: (ids: string[]) => void;
  setScale: (scale: number) => void;
  
  // Version control actions
  createVersion: (author: string, changes: string) => void;
  switchVersion: (versionId: string) => void;
  addHistoryEntry: (entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => void;
  
  // Workspace actions
  saveWorkspace: () => Promise<void>;
  exportCanvas: () => Promise<Blob>;
  importCanvas: (data: any) => Promise<void>;
  
  // Search actions
  updateSearchIndex: (elementId: string, content: any) => void;
  searchElements: (query: string) => CanvasElement[];
  addTag: (tag: string) => void;

  // Connection actions
  addConnection: (connection: Omit<Connection, 'id'>) => void;
  updateConnection: (id: string, updates: Partial<Connection>) => void;
  removeConnection: (id: string) => void;
  setSelectedConnections: (ids: string[]) => void;

    // Group actions
    addGroup: (group: Omit<StoreState['groups'][0], 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateGroup: (id: string, updates: Partial<StoreState['groups'][0]>) => void;
    removeGroup: (id: string) => void;

    // Canvas view actions
  setPan: (pan: { x: number; y: number }) => void;
  
  // Undo/Redo actions
  undo: () => void;
  redo: () => void;
  
}

// Create store with all features
const useStore = create<StoreState & StoreActions>()(
  persist(
    (set, get) => ({
      // Initial state
      collaborators: [],
      cursorPositions: {},
      activeUsers: [],
      elements: [],
      selectedElements: [],
      scale: 1,
      viewMode: 'edit',
      versions: [],
      currentVersion: '',
      history: [],
      theme: 'system',
      gridVisible: true,
      snapToGrid: true,
      searchIndex: {},
      tags: [],
      connections: [],
      selectedConnections: [],

      
      groups: [],
      pan: { x: 0, y: 0 },

      // Add group actions
      addGroup: (group) =>
        set((state) => ({
          groups: [
            ...state.groups,
            {
              ...group,
              id: uuidv4(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        })),

      updateGroup: (id, updates) =>
        set((state) => ({
          groups: state.groups.map((group) =>
            group.id === id
              ? {
                  ...group,
                  ...updates,
                  updatedAt: new Date().toISOString(),
                }
              : group
          ),
        })),

      removeGroup: (id) =>
        set((state) => ({
          groups: state.groups.filter((group) => group.id !== id),
        })),

      // Add canvas view actions
      setPan: (pan) => set({ pan }),

      // Add undo/redo actions integrated with history slice
      undo: () => {
        const historyState = get().history;
        if (historyState.past.length === 0) return;

        const previous = historyState.past[historyState.past.length - 1];
        const newPast = historyState.past.slice(0, -1);

        set((state) => ({
          ...previous,
          history: {
            past: newPast,
            present: previous,
            future: [state.history.present, ...state.history.future],
          },
        }));
      },

      redo: () => {
        const historyState = get().history;
        if (historyState.future.length === 0) return;

        const next = historyState.future[0];
        const newFuture = historyState.future.slice(1);

        set((state) => ({
          ...next,
          history: {
            past: [...state.history.past, state.history.present],
            present: next,
            future: newFuture,
          },
        }));
      },


      // Collaboration actions
      addCollaborator: (collaborator) =>
        set((state) => ({
          collaborators: [...state.collaborators, collaborator],
          activeUsers: [...state.activeUsers, collaborator.id]
        })),

      removeCollaborator: (id) =>
        set((state) => ({
          collaborators: state.collaborators.filter(c => c.id !== id),
          activeUsers: state.activeUsers.filter(uid => uid !== id)
        })),

      updateCollaborator: (id, updates) =>
        set((state) => ({
          collaborators: state.collaborators.map(c =>
            c.id === id ? { ...c, ...updates } : c
          )
        })),

      updateCursorPosition: (id, position) =>
        set((state) => ({
          cursorPositions: {
            ...state.cursorPositions,
            [id]: {
              ...position,
              timestamp: new Date().toISOString()
            }
          }
        })),

      // Canvas actions
      addElement: (element) => {
        const newElement = {
          ...element,
          id: uuidv4(),
          metadata: {
            ...element.metadata,
            createdBy: 'current-user', // Replace with actual user ID
            timestamp: new Date().toISOString()
          }
        };
        set((state) => ({
          elements: [...state.elements, newElement]
        }));
        get().addHistoryEntry({
          userId: 'current-user',
          action: 'add_element',
          details: { elementId: newElement.id, type: newElement.type }
        });
      },

      updateElement: (id, updates) =>
        set((state) => ({
          elements: state.elements.map(el =>
            el.id === id
              ? {
                  ...el,
                  ...updates,
                  metadata: {
                    ...el.metadata,
                    lastModified: new Date().toISOString()
                  }
                }
              : el
          )
        })),

      removeElement: (id) =>
        set((state) => ({
          elements: state.elements.filter(el => el.id !== id),
          selectedElements: state.selectedElements.filter(eid => eid !== id)
        })),

      setSelectedElements: (ids) =>
        set({ selectedElements: ids }),

      setScale: (scale) =>
        set({ scale }),


        // Connection actions
        addConnection: (connection) => {
          const newConnection = {
            ...connection,
            id: uuidv4()
          };
          set((state) => ({
            connections: [...state.connections, newConnection]
          }));
        },
  
        updateConnection: (id, updates) =>
          set((state) => ({
            connections: state.connections.map(conn =>
              conn.id === id ? { ...conn, ...updates } : conn
            )
          })),
  
        removeConnection: (id) =>
          set((state) => ({
            connections: state.connections.filter(conn => conn.id !== id),
            selectedConnections: state.selectedConnections.filter(sid => sid !== id)
          })),
  
        setSelectedConnections: (ids) =>
          set({ selectedConnections: ids }),

      // // Version control actions
      // createVersion: (author, changes) => {
      //   const newVersion = {
      //     id: uuidv4(),
      //     timestamp: new Date().toISOString(),
      //     author,
      //     changes,
      //     elements: get().elements
      //   };
      //   set((state) => ({
      //     versions: [...state.versions, newVersion],
      //     currentVersion: newVersion.id
      //   }));
      // },

      createVersion: (author, changes) => {
        const newVersion = {
          id: uuidv4(),
          timestamp: new Date().toISOString(),
          author,
          changes,
          elements: get().elements
        };
        
        set((state) => ({
          versions: [...state.versions, newVersion],
          currentVersion: newVersion.id,
          history: [
            ...state.history,
            {
              id: uuidv4(),
              userId: author,
              action: 'create_version',
              timestamp: new Date().toISOString(),
              details: {
                versionId: newVersion.id,
                changes
              }
            }
          ]
        }));
      },



      switchVersion: (versionId) => {
        const version = get().versions.find(v => v.id === versionId);
        if (version) {
          set({
            elements: version.elements,
            currentVersion: versionId
          });
        }
      },

      addHistoryEntry: (entry) =>
        set((state) => ({
          history: [
            ...state.history,
            {
              ...entry,
              id: uuidv4(),
              timestamp: new Date().toISOString()
            }
          ]
        })),

      // Workspace actions
      saveWorkspace: async () => {
        try {
          const state = get();
          // Implement actual save logic here
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          get().addHistoryEntry({
            userId: 'current-user',
            action: 'save_workspace',
            details: { timestamp: new Date().toISOString() }
          });
        } catch (error) {
          console.error('Failed to save workspace:', error);
        }
      },

      exportCanvas: async () => {
        const state = get();
        const exportData = {
          elements: state.elements,
          metadata: {
            version: '1.0',
            exportedAt: new Date().toISOString(),
            author: 'current-user'
          }
        };
        return new Blob([JSON.stringify(exportData)], { type: 'application/json' });
      },

      importCanvas: async (data) => {
        try {
          set({
            elements: data.elements,
            scale: 1
          });
          get().addHistoryEntry({
            userId: 'current-user',
            action: 'import_canvas',
            details: { timestamp: new Date().toISOString() }
          });
        } catch (error) {
          console.error('Failed to import canvas:', error);
        }
      },

      // Search actions
      updateSearchIndex: (elementId, content) =>
        set((state) => ({
          searchIndex: {
            ...state.searchIndex,
            [elementId]: content
          }
        })),

      searchElements: (query) => {
        const state = get();
        return state.elements.filter(element => {
          const indexContent = state.searchIndex[element.id];
          if (!indexContent) return false;
          return JSON.stringify(indexContent)
            .toLowerCase()
            .includes(query.toLowerCase());
        });
      },

      addTag: (tag) =>
        set((state) => ({
          tags: [...new Set([...state.tags, tag])]
        }))
    }),
    {
      name: 'canvas-storage',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true
    }
  )
);



// Create a hook that ensures store is only used on client side
// import { useEffect, useState } from 'react';

// export function useHydratedStore<T>(selector: (state: StoreState & StoreActions) => T): T {
//   const store = useStore(selector);
//   const [isHydrated, setHydrated] = useState(false);

//   useEffect(() => {
//     setHydrated(true);
//   }, []);

//   return isHydrated ? store : selector(useStore.getState());
// }

// export default useHydratedStore;

// // Replace the existing useHydratedStore implementation at the bottom of your file with:
// function useHydratedStore<T>(selector: (state: StoreState & StoreActions) => T): T {
//   // Use the selector directly with useStore
//   const result = useStore(selector);
//   const [hydrated, setHydrated] = useState(false);

//   useEffect(() => {
//     setHydrated(true);
//   }, []);

//   // During server-side rendering and hydration, return initial state
//   if (!hydrated) {
//     // Get initial state using the selector
//     return selector(useStore.getState());
//   }

//   // After hydration, return the actual store result
//   return result;
// }

// // Keep these exports
// export { useStore, useHydratedStore };
// export default useHydratedStore;

// // Fixed hydration implementation
// import { useEffect, useState } from 'react';
// import { shallow } from 'zustand/shallow';

// function useHydratedStore<T>(selector: (state: StoreState & StoreActions) => T): T {
//   const [hydrated, setHydrated] = useState(false);
  
//   // Use shallow comparison by default
//   const selectedData = useStore(useCallback(selector, []), shallow);
  
//   useEffect(() => {
//     setHydrated(true);
//   }, []);
  
//   if (typeof window === 'undefined' || !hydrated) {
//     const initialState = useStore.getState();
//     return selector(initialState);
//   }
  
//   return selectedData;
// }

// // Exports
// export { useStore, useHydratedStore };
// export default useHydratedStore;

// // Fixed hydration implementation
// function useHydratedStore<T>(selector: (state: StoreState & StoreActions) => T): T {
//   const [hydrated, setHydrated] = useState(false);
  
//   // Memoize the selector
//   const memoizedSelector = useMemo(() => selector, [selector]);
  
//   // Use memoized selector with shallow comparison
//   const selectedData = useStore(memoizedSelector, shallow);
  
//   useEffect(() => {
//     setHydrated(true);
//   }, []);
  
//   if (typeof window === 'undefined' || !hydrated) {
//     const initialState = useStore.getState();
//     return selector(initialState);
//   }
  
//   return selectedData;
// }

// // Exports
// export { useStore, useHydratedStore };
// export default useHydratedStore;


// At the bottom of the file, replace the hydration implementation:
function useHydratedStore<T>(selector: (state: StoreState & StoreActions) => T): T {
  const [hydrated, setHydrated] = useState(false);
  
  // Memoize the selector
  const memoizedSelector = useMemo(() => selector, [selector]);
  
  // Use memoized selector with shallow comparison
  const selectedData = useStore(memoizedSelector, shallow);
  
  useEffect(() => {
    setHydrated(true);
  }, []);
  
  if (typeof window === 'undefined' || !hydrated) {
    const initialState = useStore.getState();
    return selector(initialState);
  }
  
  return selectedData;
}

export { useStore, useHydratedStore };
export default useHydratedStore;