'use client';

// At the top of the file, update imports:
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
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
// const useStore = create<StoreState & StoreActions>()(
//   persist(
//     (set, get) => ({
//       // Initial state
//       collaborators: [],
//       cursorPositions: {},
//       activeUsers: [],
//       elements: [],
//       selectedElements: [],
//       scale: 1,
//       viewMode: 'edit',
//       versions: [],
//       currentVersion: '',
//       history: [],
//       theme: 'system',
//       gridVisible: true,
//       snapToGrid: true,
//       searchIndex: {},
//       tags: [],
//       connections: [],
//       selectedConnections: [],

      
//       groups: [],
//       pan: { x: 0, y: 0 },

//       // Add group actions
//       addGroup: (group) =>
//         set((state) => ({
//           groups: [
//             ...state.groups,
//             {
//               ...group,
//               id: uuidv4(),
//               createdAt: new Date().toISOString(),
//               updatedAt: new Date().toISOString(),
//             },
//           ],
//         })),

//       updateGroup: (id, updates) =>
//         set((state) => ({
//           groups: state.groups.map((group) =>
//             group.id === id
//               ? {
//                   ...group,
//                   ...updates,
//                   updatedAt: new Date().toISOString(),
//                 }
//               : group
//           ),
//         })),

//       removeGroup: (id) =>
//         set((state) => ({
//           groups: state.groups.filter((group) => group.id !== id),
//         })),

//       // Add canvas view actions
//       setPan: (pan) => set({ pan }),

//       // Add undo/redo actions integrated with history slice
//       undo: () => {
//         const historyState = get().history;
//         if (historyState.past.length === 0) return;

//         const previous = historyState.past[historyState.past.length - 1];
//         const newPast = historyState.past.slice(0, -1);

//         set((state) => ({
//           ...previous,
//           history: {
//             past: newPast,
//             present: previous,
//             future: [state.history.present, ...state.history.future],
//           },
//         }));
//       },

//       redo: () => {
//         const historyState = get().history;
//         if (historyState.future.length === 0) return;

//         const next = historyState.future[0];
//         const newFuture = historyState.future.slice(1);

//         set((state) => ({
//           ...next,
//           history: {
//             past: [...state.history.past, state.history.present],
//             present: next,
//             future: newFuture,
//           },
//         }));
//       },


//       // Collaboration actions
//       addCollaborator: (collaborator) =>
//         set((state) => ({
//           collaborators: [...state.collaborators, collaborator],
//           activeUsers: [...state.activeUsers, collaborator.id]
//         })),

//       removeCollaborator: (id) =>
//         set((state) => ({
//           collaborators: state.collaborators.filter(c => c.id !== id),
//           activeUsers: state.activeUsers.filter(uid => uid !== id)
//         })),

//       updateCollaborator: (id, updates) =>
//         set((state) => ({
//           collaborators: state.collaborators.map(c =>
//             c.id === id ? { ...c, ...updates } : c
//           )
//         })),

//       updateCursorPosition: (id, position) =>
//         set((state) => ({
//           cursorPositions: {
//             ...state.cursorPositions,
//             [id]: {
//               ...position,
//               timestamp: new Date().toISOString()
//             }
//           }
//         })),

//       // Canvas actions
//       addElement: (element) => {
//         const newElement = {
//           ...element,
//           id: uuidv4(),
//           metadata: {
//             ...element.metadata,
//             createdBy: 'current-user', // Replace with actual user ID
//             timestamp: new Date().toISOString()
//           }
//         };
//         set((state) => ({
//           elements: [...state.elements, newElement]
//         }));
//         get().addHistoryEntry({
//           userId: 'current-user',
//           action: 'add_element',
//           details: { elementId: newElement.id, type: newElement.type }
//         });
//       },

//       updateElement: (id, updates) =>
//         set((state) => ({
//           elements: state.elements.map(el =>
//             el.id === id
//               ? {
//                   ...el,
//                   ...updates,
//                   metadata: {
//                     ...el.metadata,
//                     lastModified: new Date().toISOString()
//                   }
//                 }
//               : el
//           )
//         })),

//       removeElement: (id) =>
//         set((state) => ({
//           elements: state.elements.filter(el => el.id !== id),
//           selectedElements: state.selectedElements.filter(eid => eid !== id)
//         })),

//       setSelectedElements: (ids) =>
//         set({ selectedElements: ids }),

//       setScale: (scale) =>
//         set({ scale }),


//         // Connection actions
//         addConnection: (connection) => {
//           const newConnection = {
//             ...connection,
//             id: uuidv4()
//           };
//           set((state) => ({
//             connections: [...state.connections, newConnection]
//           }));
//         },
  
//         updateConnection: (id, updates) =>
//           set((state) => ({
//             connections: state.connections.map(conn =>
//               conn.id === id ? { ...conn, ...updates } : conn
//             )
//           })),
  
//         removeConnection: (id) =>
//           set((state) => ({
//             connections: state.connections.filter(conn => conn.id !== id),
//             selectedConnections: state.selectedConnections.filter(sid => sid !== id)
//           })),
  
//         setSelectedConnections: (ids) =>
//           set({ selectedConnections: ids }),

//       // // Version control actions
//       // createVersion: (author, changes) => {
//       //   const newVersion = {
//       //     id: uuidv4(),
//       //     timestamp: new Date().toISOString(),
//       //     author,
//       //     changes,
//       //     elements: get().elements
//       //   };
//       //   set((state) => ({
//       //     versions: [...state.versions, newVersion],
//       //     currentVersion: newVersion.id
//       //   }));
//       // },

//       createVersion: (author, changes) => {
//         const newVersion = {
//           id: uuidv4(),
//           timestamp: new Date().toISOString(),
//           author,
//           changes,
//           elements: get().elements
//         };

//         set((state) => ({
//           versions: [...state.versions, newVersion],
//           currentVersion: newVersion.id,
//           history: [
//             ...state.history,
//             {
//               id: uuidv4(),
//               userId: author,
//               action: 'create_version',
//               timestamp: new Date().toISOString(),
//               details: {
//                 versionId: newVersion.id,
//                 changes
//               }
//             }
//           ]
//         }));
//       },



//       switchVersion: (versionId) => {
//         const version = get().versions.find(v => v.id === versionId);
//         if (version) {
//           set({
//             elements: version.elements,
//             currentVersion: versionId
//           });
//         }
//       },

//       addHistoryEntry: (entry) =>
//         set((state) => ({
//           history: [
//             ...state.history,
//             {
//               ...entry,
//               id: uuidv4(),
//               timestamp: new Date().toISOString()
//             }
//           ]
//         })),

//       // Workspace actions
//       saveWorkspace: async () => {
//         try {
//           const state = get();
//           // Implement actual save logic here
//           await new Promise(resolve => setTimeout(resolve, 1000));
          
//           get().addHistoryEntry({
//             userId: 'current-user',
//             action: 'save_workspace',
//             details: { timestamp: new Date().toISOString() }
//           });
//         } catch (error) {
//           console.error('Failed to save workspace:', error);
//         }
//       },

//       exportCanvas: async () => {
//         const state = get();
//         const exportData = {
//           elements: state.elements,
//           metadata: {
//             version: '1.0',
//             exportedAt: new Date().toISOString(),
//             author: 'current-user'
//           }
//         };
//         return new Blob([JSON.stringify(exportData)], { type: 'application/json' });
//       },

//       importCanvas: async (data) => {
//         try {
//           set({
//             elements: data.elements,
//             scale: 1
//           });
//           get().addHistoryEntry({
//             userId: 'current-user',
//             action: 'import_canvas',
//             details: { timestamp: new Date().toISOString() }
//           });
//         } catch (error) {
//           console.error('Failed to import canvas:', error);
//         }
//       },

//       // Search actions
//       updateSearchIndex: (elementId, content) =>
//         set((state) => ({
//           searchIndex: {
//             ...state.searchIndex,
//             [elementId]: content
//           }
//         })),

//       searchElements: (query) => {
//         const state = get();
//         return state.elements.filter(element => {
//           const indexContent = state.searchIndex[element.id];
//           if (!indexContent) return false;
//           return JSON.stringify(indexContent)
//             .toLowerCase()
//             .includes(query.toLowerCase());
//         });
//       },

//       addTag: (tag) =>
//         set((state) => ({
//           tags: [...new Set([...state.tags, tag])]
//         }))
//     }),
//     {
//       name: 'canvas-storage',
//       storage: createJSONStorage(() => localStorage),
//       skipHydration: true
//     }
//   )
// );






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




// // Create store with all features - Modify the store creation slightly
// const useStoreBase = create<StoreState & StoreActions>()(
//   persist(
//     (set, get) => ({
//       // Keep ALL your existing state and actions implementation
//       collaborators: [],
//       cursorPositions: {},
//       activeUsers: [],
//       elements: [],
//       selectedElements: [],
//       scale: 1,
//       viewMode: 'edit',
//       versions: [],
//       currentVersion: '',
//       history: [],
//       theme: 'system',
//       gridVisible: true,
//       snapToGrid: true,
//       searchIndex: {},
//       tags: [],
//       connections: [],
//       selectedConnections: [],
//       groups: [],
//       pan: { x: 0, y: 0 },

//       // Keep ALL your existing actions...
//       addGroup: (group) => set((state) => ({
//         groups: [
//           ...state.groups,
//           {
//             ...group,
//             id: uuidv4(),
//             createdAt: new Date().toISOString(),
//             updatedAt: new Date().toISOString(),
//           },
//         ],
//       })),
//       // ... rest of your existing actions ...
//     }),
//     {
//       name: 'canvas-storage',
//       storage: typeof window !== 'undefined' 
//         ? createJSONStorage(() => localStorage)
//         : undefined,
//       skipHydration: true,
//       onRehydrateStorage: () => (state) => {
//         if (state) {
//           console.log('Hydration complete');
//         }
//       }
//     }
//   )
// );





// // At the bottom of the file, replace the hydration implementation:
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

// export { useStore, useHydratedStore };
// export default useHydratedStore;



// Add this after the other interfaces and before the store creation
interface CanvasState {
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
  error: string | null;
  
  // Search & Indexing
  searchIndex: Record<string, any>;
  tags: string[];

  // Connections
  connections: Connection[];
  selectedConnections: string[];

  // Groups
  groups: {
    id: string;
    name: string;
    elementIds: string[];
    createdAt: string;
    updatedAt: string;
  }[];
  pan: { x: number; y: number };

  // SSR Support
  getServerSnapshot: () => Omit<CanvasState, 'getServerSnapshot'>;
}

const useStoreBase = create<StoreState & StoreActions>()(
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


// Add getServerSnapshot for SSR
getServerSnapshot: () => ({
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
  error: null
}),


      // Group actions
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

      // Canvas view actions
      setPan: (pan) => set({ pan }),

      // History actions
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

      // Canvas element actions
      addElement: (element) => {
        const newElement = {
          ...element,
          id: uuidv4(),
          metadata: {
            ...element.metadata,
            createdBy: 'current-user',
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

      // Version control
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

      // Search and indexing
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
      storage: typeof window !== 'undefined' 
        ? createJSONStorage(() => localStorage)
        : undefined,
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        if (state) {
          console.log('Hydration complete');
        }
      }
    }
  )
);

// Implement memoized selector cache
const selectorCache = new Map();

// Updated hydration implementation
function useHydratedStore<T>(selector: (state: StoreState & StoreActions) => T): T {
  const [isHydrated, setHydrated] = useState<boolean>(false);
  
  // Create a stable key for the selector
  const selectorKey = selector.toString();
  
  // Get or create memoized selector
  const memoizedSelector = useMemo(() => {
    if (!selectorCache.has(selectorKey)) {
      selectorCache.set(selectorKey, selector);
    }
    return selectorCache.get(selectorKey);
  }, [selectorKey]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const unsubHydrate = useStoreBase.persist.onHydrate(() => setHydrated(false));
      const unsubFinishHydration = useStoreBase.persist.onFinishHydration(() => setHydrated(true));
      
      setHydrated(useStoreBase.persist.hasHydrated());
      
      return () => {
        unsubHydrate();
        unsubFinishHydration();
      };
    }
  }, []);

  const store = useStoreBase(memoizedSelector, shallow);
  
  if (typeof window === 'undefined' || !isHydrated) {
    const serverSnapshot = useStoreBase.getState();
    return memoizedSelector(serverSnapshot);
  }

  return store;
}

// Client-side hydration trigger
if (typeof window !== 'undefined') {
  useStoreBase.persist.rehydrate();
}

// export const useStore = useStoreBase;
// export default useHydratedStore;

export const useStore = useStoreBase;
export { useHydratedStore };
export default useHydratedStore;