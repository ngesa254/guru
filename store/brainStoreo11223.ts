// // // // /home/user/Guru-AI/stores/brainStore.ts
// // // import { create } from 'zustand';
// // // import { wsService } from '@/lib/brainwebsocket';

// // // export interface Message {
// // //   id: string;
// // //   content: string;
// // //   type: 'user' | 'ai' | 'system';
// // //   timestamp: Date;
// // //   metadata?: {
// // //     confidence?: number;
// // //     sources?: Array<{
// // //       url: string;
// // //       title: string;
// // //       timestamp: string;
// // //     }>;
// // //   };
// // // }

// // // export interface CanvasElement {
// // //   id: string;
// // //   type:
// // //     | 'text'
// // //     | 'chart'
// // //     | 'table'
// // //     | 'proposal'
// // //     | 'diagram'
// // //     | 'mermaid'
// // //     | 'timeline'
// // //     | 'meeting-transcript';
// // //   content: any;
// // //   position: { x: number; y: number };
// // //   size: { width: number; height: number };
// // //   scale?: number;
// // //   rotation?: number;
// // //   selected?: boolean;
// // //   groupId?: string;
// // //   metadata?: {
// // //     source?: string;
// // //     timestamp?: string;
// // //     author?: string;
// // //     version?: string;
// // //     confidence?: number;
// // //     lastModified?: string;
// // //   };
// // // }

// // // export interface ResearchResponse {
// // //   daily_passengers?: number;
// // //   ev_parking_spaces?: number;
// // //   confidence?: number;
// // //   sources?: Array<{
// // //     url: string;
// // //     title: string;
// // //     timestamp: string;
// // //   }>;
// // //   competitors?: Array<{
// // //     name: string;
// // //     stations: number;
// // //     locations: string[];
// // //   }>;
// // //   requirements?: string[];
// // // }

// // // export interface ProposalData {
// // //   generated_proposal: string;
// // //   metadata: {
// // //     author: string;
// // //     version: string;
// // //   };
// // // }

// // // export interface User {
// // //   id: string;
// // //   name: string;
// // //   avatar?: string;
// // //   lastActive?: string;
// // //   status?: 'active' | 'idle' | 'offline';
// // //   role?: 'editor' | 'viewer' | 'admin';
// // // }

// // // export interface CursorPosition {
// // //   x: number;
// // //   y: number;
// // //   timestamp: string;
// // // }

// // // export interface Version {
// // //   id: string;
// // //   timestamp: string;
// // //   author: string;
// // //   changes: string;
// // //   elements: CanvasElement[];
// // // }

// // // export interface SearchResult {
// // //   id: string;
// // //   type: string;
// // //   title: string;
// // //   content: any;
// // //   timestamp: string;
// // // }

// // // export interface BrainState {
// // //   messages: Message[];
// // //   canvasElements: CanvasElement[];
// // //   isLoading: boolean;
// // //   error: string | null;
// // //   researchData: ResearchResponse | null;
// // //   proposalData: ProposalData | null;
// // //   collaborators: User[];
// // //   cursors: Record<string, CursorPosition>;
// // //   scale: number;
// // //   viewMode: 'edit' | 'view' | 'present';
// // //   gridVisible: boolean;
// // //   snapToGrid: boolean;
// // //   versions: Version[];
// // //   currentVersion: string;

// // //   // Searching
// // //   searchMode: 'search' | 'research';
// // //   searchQuery: string;
// // //   searchResults: SearchResult[];
// // //   searchIndex: Record<string, any>;

// // //   // “Work” or “Web” data
// // //   workData?: any;

// // //   // Actions
// // //   addMessage: (message: Message) => void;
// // //   addCanvasElement: (element: CanvasElement) => void;
// // //   updateCanvasElement: (id: string, updates: Partial<CanvasElement>) => void;
// // //   removeCanvasElement: (id: string) => void;
// // //   setResearchData: (data: ResearchResponse) => void;
// // //   setProposalData: (data: ProposalData) => void;
// // //   setLoading: (loading: boolean) => void;
// // //   setError: (error: string | null) => void;

// // //   // Versioning
// // //   createVersion: (author: string, changes: string) => void;
// // //   switchVersion: (versionId: string) => void;

// // //   // Collaboration
// // //   addCollaborator: (collaborator: User) => void;
// // //   removeCollaborator: (userId: string) => void;
// // //   updateCursorPosition: (userId: string, position: { x: number; y: number }) => void;

// // //   // Search
// // //   setSearchMode: (mode: 'search' | 'research') => void;
// // //   setSearchQuery: (query: string) => void;
// // //   updateSearchIndex: (content: any) => void;
// // //   searchElements: (query: string) => SearchResult[];
// // //   performSearch: (query: string) => Promise<void>;

// // //   // Toggles
// // //   setGridVisible: (visible: boolean) => void;
// // //   setViewMode: (mode: 'edit' | 'view' | 'present') => void;
// // // }

// // // export const useBrainStore = create<BrainState>((set, get) => ({
// // //   messages: [],
// // //   canvasElements: [],
// // //   isLoading: false,
// // //   error: null,
// // //   researchData: null,
// // //   proposalData: null,
// // //   collaborators: [],
// // //   cursors: {},
// // //   scale: 1,
// // //   viewMode: 'edit',
// // //   gridVisible: true,
// // //   snapToGrid: true,
// // //   versions: [],
// // //   currentVersion: '',
// // //   searchMode: 'search',
// // //   searchQuery: '',
// // //   searchResults: [],
// // //   searchIndex: {},
// // //   workData: undefined,

// // //   addMessage: (message) =>
// // //     set((state) => ({ messages: [...state.messages, message] })),

// // //   addCanvasElement: (element) => {
// // //     const newElement = {
// // //       ...element,
// // //       metadata: {
// // //         ...element.metadata,
// // //         timestamp: new Date().toISOString(),
// // //       },
// // //     };
// // //     set((state) => ({ canvasElements: [...state.canvasElements, newElement] }));
// // //     wsService.sendMessage('ELEMENT_ADD', { element: newElement });
// // //   },

// // //   updateCanvasElement: (id, updates) =>
// // //     set((state) => ({
// // //       canvasElements: state.canvasElements.map((el) =>
// // //         el.id === id ? { ...el, ...updates } : el
// // //       ),
// // //     })),

// // //   removeCanvasElement: (id) =>
// // //     set((state) => ({
// // //       canvasElements: state.canvasElements.filter((el) => el.id !== id),
// // //     })),

// // //   setResearchData: (data) => set({ researchData: data }),
// // //   setProposalData: (data) => set({ proposalData: data }),
// // //   setLoading: (loading) => set({ isLoading: loading }),
// // //   setError: (error) => set({ error }),

// // //   // Versions
// // //   createVersion: (author, changes) => {
// // //     const newVersion: Version = {
// // //       id: crypto.randomUUID(),
// // //       timestamp: new Date().toISOString(),
// // //       author,
// // //       changes,
// // //       elements: get().canvasElements,
// // //     };
// // //     set((state) => ({
// // //       versions: [...state.versions, newVersion],
// // //       currentVersion: newVersion.id,
// // //     }));
// // //   },

// // //   switchVersion: (versionId) => {
// // //     const version = get().versions.find((v) => v.id === versionId);
// // //     if (version) {
// // //       set({
// // //         canvasElements: version.elements,
// // //         currentVersion: versionId,
// // //       });
// // //     }
// // //   },

// // //   // Collab
// // //   addCollaborator: (collaborator) =>
// // //     set((state) => ({
// // //       collaborators: [...state.collaborators, collaborator],
// // //     })),

// // //   removeCollaborator: (userId) =>
// // //     set((state) => ({
// // //       collaborators: state.collaborators.filter((c) => c.id !== userId),
// // //     })),

// // //   updateCursorPosition: (userId, position) => {
// // //     set((state) => ({
// // //       cursors: {
// // //         ...state.cursors,
// // //         [userId]: {
// // //           ...position,
// // //           timestamp: new Date().toISOString(),
// // //         },
// // //       },
// // //     }));
// // //   },

// // //   // Search
// // //   setSearchMode: (mode) => set({ searchMode: mode }),
// // //   setSearchQuery: (query) => set({ searchQuery: query }),
// // //   updateSearchIndex: (content) => {
// // //     const textContent = JSON.stringify(content)
// // //       .toLowerCase()
// // //       .replace(/[^\w\s]/g, ' ');
// // //     const words = textContent.split(/\s+/).filter(Boolean);
// // //     set((state) => ({
// // //       searchIndex: {
// // //         ...state.searchIndex,
// // //         [content.id ?? crypto.randomUUID()]: {
// // //           words,
// // //           text: textContent,
// // //         },
// // //       },
// // //     }));
// // //   },
// // //   searchElements: (query) => {
// // //     const state = get();
// // //     const searchTerms = query.toLowerCase().split(/\s+/);
// // //     return Object.entries(state.searchIndex)
// // //       .filter(([_, content]) =>
// // //         searchTerms.every((term) => content.text.includes(term))
// // //       )
// // //       .map(([id]) => {
// // //         const element = state.canvasElements.find((el) => el.id === id);
// // //         return {
// // //           id,
// // //           type: element?.type || 'unknown',
// // //           title: element?.metadata?.title || `${element?.type} element`,
// // //           content: element?.content,
// // //           timestamp: element?.metadata?.timestamp || new Date().toISOString(),
// // //         };
// // //       });
// // //   },
// // //   performSearch: async (query) => {
// // //     set({ isLoading: true });
// // //     try {
// // //       if (get().searchMode === 'research') {
// // //         // Make a “web” call
// // //         const res = await fetch('/api/web', {
// // //           method: 'POST',
// // //           headers: { 'Content-Type': 'application/json' },
// // //           body: JSON.stringify({ query }),
// // //         });
// // //         if (!res.ok) throw new Error('Research failed');
// // //         const data = await res.json();
// // //         set({
// // //           searchResults: [
// // //             {
// // //               id: crypto.randomUUID(),
// // //               type: 'research',
// // //               title: 'Research Results',
// // //               content: data,
// // //               timestamp: new Date().toISOString(),
// // //             },
// // //           ],
// // //         });
// // //       } else {
// // //         // Local search in existing elements
// // //         const results = get().searchElements(query);
// // //         set({ searchResults: results });
// // //       }
// // //     } catch (error: any) {
// // //       set({ error: error?.message || 'Search failed' });
// // //     } finally {
// // //       set({ isLoading: false });
// // //     }
// // //   },

// // //   // Toggles
// // //   setGridVisible: (visible) => set({ gridVisible: visible }),
// // //   setViewMode: (mode) => set({ viewMode: mode }),
// // // }));




// // // /home/user/Guru-AI/store/brainStore.ts
// // import { create } from 'zustand';
// // import { wsService } from '@/lib/brainwebsocket';

// // // ---------- Interfaces ----------
// // export interface Message {
// //   id: string;
// //   content: string;
// //   type: 'user' | 'ai' | 'system';
// //   timestamp: Date;
// //   metadata?: {
// //     confidence?: number;
// //     sources?: Array<{ url: string; title: string; timestamp: string }>;
// //   };
// // }

// // export interface CanvasElement {
// //   id: string;
// //   type:
// //     | 'text'
// //     | 'chart'
// //     | 'table'
// //     | 'proposal'
// //     | 'diagram'
// //     | 'mermaid'
// //     | 'timeline'
// //     | 'meeting-transcript';
// //   content: any;
// //   position: { x: number; y: number };
// //   size: { width: number; height: number };
// //   scale?: number;
// //   rotation?: number;
// //   selected?: boolean;
// //   groupId?: string;
// //   metadata?: {
// //     source?: string;
// //     timestamp?: string;
// //     author?: string;
// //     version?: string;
// //     confidence?: number;
// //     lastModified?: string;
// //   };
// // }

// // export interface ResearchResponse {
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

// // export interface ProposalData {
// //   generated_proposal: string;
// //   metadata: {
// //     author: string;
// //     version: string;
// //   };
// // }

// // export interface User {
// //   id: string;
// //   name: string;
// //   avatar?: string;
// //   lastActive?: string;
// //   status?: 'active' | 'idle' | 'offline';
// //   role?: 'editor' | 'viewer' | 'admin';
// // }

// // export interface CursorPosition {
// //   x: number;
// //   y: number;
// //   timestamp: string;
// // }

// // export interface Version {
// //   id: string;
// //   timestamp: string;
// //   author: string;
// //   changes: string;
// //   elements: CanvasElement[];
// // }

// // export interface SearchResult {
// //   id: string;
// //   type: string;
// //   title: string;
// //   content: any;
// //   timestamp: string;
// // }

// // // ---------- Store State ----------
// // export interface BrainState {
// //   messages: Message[];
// //   canvasElements: CanvasElement[];
// //   isLoading: boolean;
// //   error: string | null;
// //   researchData: ResearchResponse | null;
// //   proposalData: ProposalData | null;
// //   collaborators: User[];
// //   cursors: Record<string, CursorPosition>;
// //   scale: number;
// //   viewMode: 'edit' | 'view' | 'present';
// //   gridVisible: boolean;
// //   snapToGrid: boolean;
// //   versions: Version[];
// //   currentVersion: string;

// //   // Searching
// //   searchMode: 'search' | 'research';
// //   searchQuery: string;
// //   searchResults: SearchResult[];
// //   searchIndex: Record<string, any>;

// //   // “Work” or “Web” data
// //   workData?: any;

// //   // Actions
// //   addMessage: (message: Message) => void;
// //   addCanvasElement: (element: CanvasElement) => void;
// //   updateCanvasElement: (id: string, updates: Partial<CanvasElement>) => void;
// //   removeCanvasElement: (id: string) => void;
// //   setResearchData: (data: ResearchResponse) => void;
// //   setProposalData: (data: ProposalData) => void;
// //   setLoading: (loading: boolean) => void;
// //   setError: (error: string | null) => void;

// //   // Versioning
// //   createVersion: (author: string, changes: string) => void;
// //   switchVersion: (versionId: string) => void;

// //   // Collaboration
// //   addCollaborator: (collaborator: User) => void;
// //   removeCollaborator: (userId: string) => void;
// //   updateCursorPosition: (
// //     userId: string,
// //     position: { x: number; y: number }
// //   ) => void;

// //   // Search
// //   setSearchMode: (mode: 'search' | 'research') => void;
// //   setSearchQuery: (query: string) => void;
// //   updateSearchIndex: (content: any) => void;
// //   searchElements: (query: string) => SearchResult[];
// //   performSearch: (query: string) => Promise<void>;

// //   // Toggles
// //   setGridVisible: (visible: boolean) => void;
// //   setViewMode: (mode: 'edit' | 'view' | 'present') => void;
// // }

// // export const useBrainStore = create<BrainState>((set, get) => ({
// //   messages: [],
// //   canvasElements: [],
// //   isLoading: false,
// //   error: null,
// //   researchData: null,
// //   proposalData: null,
// //   collaborators: [],
// //   cursors: {},
// //   scale: 1,
// //   viewMode: 'edit',
// //   gridVisible: true,
// //   snapToGrid: true,
// //   versions: [],
// //   currentVersion: '',
// //   searchMode: 'search',
// //   searchQuery: '',
// //   searchResults: [],
// //   searchIndex: {},
// //   workData: undefined,

// //   // ---- Basic actions ----
// //   addMessage: (message) =>
// //     set((state) => ({ messages: [...state.messages, message] })),

// //   addCanvasElement: (element) => {
// //     const newElement = {
// //       ...element,
// //       metadata: {
// //         ...element.metadata,
// //         timestamp: new Date().toISOString(),
// //       },
// //     };
// //     set((state) => ({
// //       canvasElements: [...state.canvasElements, newElement],
// //     }));
// //     wsService.sendMessage('ELEMENT_ADD', { element: newElement });
// //   },

// //   updateCanvasElement: (id, updates) =>
// //     set((state) => ({
// //       canvasElements: state.canvasElements.map((el) =>
// //         el.id === id ? { ...el, ...updates } : el
// //       ),
// //     })),

// //   removeCanvasElement: (id) =>
// //     set((state) => ({
// //       canvasElements: state.canvasElements.filter((el) => el.id !== id),
// //     })),

// //   setResearchData: (data) => set({ researchData: data }),
// //   setProposalData: (data) => set({ proposalData: data }),
// //   setLoading: (loading) => set({ isLoading: loading }),
// //   setError: (error) => set({ error }),

// //   // ---- Versioning ----
// //   createVersion: (author, changes) => {
// //     const newVersion: Version = {
// //       id: crypto.randomUUID(),
// //       timestamp: new Date().toISOString(),
// //       author,
// //       changes,
// //       elements: get().canvasElements,
// //     };
// //     set((state) => ({
// //       versions: [...state.versions, newVersion],
// //       currentVersion: newVersion.id,
// //     }));
// //   },

// //   switchVersion: (versionId) => {
// //     const version = get().versions.find((v) => v.id === versionId);
// //     if (version) {
// //       set({
// //         canvasElements: version.elements,
// //         currentVersion: versionId,
// //       });
// //     }
// //   },

// //   // ---- Collaboration ----
// //   addCollaborator: (collaborator) =>
// //     set((state) => ({
// //       collaborators: [...state.collaborators, collaborator],
// //     })),

// //   removeCollaborator: (userId) =>
// //     set((state) => ({
// //       collaborators: state.collaborators.filter((c) => c.id !== userId),
// //     })),

// //   updateCursorPosition: (userId, position) => {
// //     set((state) => ({
// //       cursors: {
// //         ...state.cursors,
// //         [userId]: {
// //           ...position,
// //           timestamp: new Date().toISOString(),
// //         },
// //       },
// //     }));
// //   },

// //   // ---- Search ----
// //   setSearchMode: (mode) => set({ searchMode: mode }),
// //   setSearchQuery: (query) => set({ searchQuery: query }),
// //   updateSearchIndex: (content) => {
// //     const textContent = JSON.stringify(content)
// //       .toLowerCase()
// //       .replace(/[^\w\s]/g, ' ');
// //     const words = textContent.split(/\s+/).filter(Boolean);
// //     const id = content.id ?? crypto.randomUUID();

// //     set((state) => ({
// //       searchIndex: {
// //         ...state.searchIndex,
// //         [id]: {
// //           words,
// //           text: textContent,
// //         },
// //       },
// //     }));
// //   },
// //   searchElements: (query) => {
// //     const state = get();
// //     const searchTerms = query.toLowerCase().split(/\s+/);
// //     return Object.entries(state.searchIndex)
// //       .filter(([_, content]) =>
// //         searchTerms.every((term) => content.text.includes(term))
// //       )
// //       .map(([id]) => {
// //         const element = state.canvasElements.find((el) => el.id === id);
// //         return {
// //           id,
// //           type: element?.type || 'unknown',
// //           title: element?.metadata?.title || `${element?.type} element`,
// //           content: element?.content,
// //           timestamp: element?.metadata?.timestamp || new Date().toISOString(),
// //         };
// //       });
// //   },
// //   performSearch: async (query) => {
// //     set({ isLoading: true });
// //     try {
// //       if (get().searchMode === 'research') {
// //         // For "research" mode => call /api/web
// //         const res = await fetch('/api/web', {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify({ query }),
// //         });
// //         if (!res.ok) throw new Error('Research failed');
// //         const data = await res.json();
// //         set({
// //           searchResults: [
// //             {
// //               id: crypto.randomUUID(),
// //               type: 'research',
// //               title: 'Research Results',
// //               content: data,
// //               timestamp: new Date().toISOString(),
// //             },
// //           ],
// //         });
// //       } else {
// //         // Otherwise do a local search
// //         const results = get().searchElements(query);
// //         set({ searchResults: results });
// //       }
// //     } catch (error: any) {
// //       set({ error: error.message || 'Search failed' });
// //     } finally {
// //       set({ isLoading: false });
// //     }
// //   },

// //   // ---- Toggles ----
// //   setGridVisible: (visible) => set({ gridVisible: visible }),
// //   setViewMode: (mode) => set({ viewMode: mode }),
// // }));



// import { create } from 'zustand';
// import { wsService } from '@/lib/brainwebsocket';

// // -------------------- Interfaces --------------------
// export interface Message {
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

// export interface CanvasElement {
//   id: string;
//   type:
//     | 'text'
//     | 'chart'
//     | 'table'
//     | 'proposal'
//     | 'diagram'
//     | 'mermaid'
//     | 'timeline'
//     | 'meeting-transcript';
//   content: any;
//   position: { x: number; y: number };
//   size: { width: number; height: number };
//   metadata?: {
//     source?: string;
//     timestamp?: string;
//     author?: string;
//     version?: string;
//     confidence?: number;
//     lastModified?: string;
//   };
// }

// export interface ResearchResponse {
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

// export interface ProposalData {
//   generated_proposal: string;
//   metadata: {
//     author: string;
//     version: string;
//   };
// }

// export interface User {
//   id: string;
//   name: string;
//   avatar?: string;
//   status?: 'active' | 'idle' | 'offline';
//   role?: 'editor' | 'viewer' | 'admin';
// }

// export interface CursorPosition {
//   x: number;
//   y: number;
//   timestamp: string;
// }

// export interface Version {
//   id: string;
//   timestamp: string;
//   author: string;
//   changes: string;
//   elements: CanvasElement[];
// }

// // -------------------- Store Interface --------------------
// interface BrainState {
//   messages: Message[];
//   canvasElements: CanvasElement[];
//   isLoading: boolean;
//   error: string | null;
//   researchData: ResearchResponse | null;
//   proposalData: ProposalData | null;
//   collaborators: User[];
//   cursors: Record<string, CursorPosition>;
//   scale: number;
//   viewMode: 'edit' | 'view' | 'present';
//   gridVisible: boolean;
//   snapToGrid: boolean;
//   versions: Version[];
//   currentVersion: string;

//   // Actions
//   addMessage: (message: Message) => void;
//   addCanvasElement: (element: CanvasElement) => void;
//   updateCanvasElement: (id: string, updates: Partial<CanvasElement>) => void;
//   removeCanvasElement: (id: string) => void;
//   setResearchData: (data: ResearchResponse) => void;
//   setProposalData: (data: ProposalData) => void;
//   setLoading: (loading: boolean) => void;
//   setError: (error: string | null) => void;

//   // Versions
//   createVersion: (author: string, changes: string) => void;
//   switchVersion: (versionId: string) => void;

//   // Collaboration
//   collaborators: User[];
//   addCollaborator: (user: User) => void;
//   removeCollaborator: (userId: string) => void;
//   updateCursorPosition: (userId: string, position: { x: number; y: number }) => void;

//   // Toggles
//   scale: number; // Possibly adjust scale
//   viewMode: 'edit' | 'view' | 'present';
//   gridVisible: boolean;
//   snapToGrid: boolean;
//   setGridVisible: (visible: boolean) => void;
//   setViewMode: (mode: 'edit' | 'view' | 'present') => void;

//   // Search indexing placeholders (for local searching if desired)
//   searchIndex: Record<string, any>;
//   updateSearchIndex: (content: any) => void;
// }

// // -------------------- Store Implementation --------------------
// export const useBrainStore = create<BrainState>((set, get) => ({
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
//   versions: [],
//   currentVersion: '',
//   searchIndex: {},

//   // Actions
//   addMessage: (message) =>
//     set((state) => ({ messages: [...state.messages, message] })),

//   addCanvasElement: (element) => {
//     const newElement = {
//       ...element,
//       metadata: {
//         ...element.metadata,
//         timestamp: new Date().toISOString(),
//       },
//     };
//     set((state) => ({
//       canvasElements: [...state.canvasElements, newElement],
//     }));
//     wsService.sendMessage('ELEMENT_ADD', { element: newElement });
//   },

//   updateCanvasElement: (id, updates) =>
//     set((state) => ({
//       canvasElements: state.canvasElements.map((el) =>
//         el.id === id ? { ...el, ...updates } : el
//       ),
//     })),

//   removeCanvasElement: (id) =>
//     set((state) => ({
//       canvasElements: state.canvasElements.filter((el) => el.id !== id),
//     })),

//   setResearchData: (data) => set({ researchData: data }),
//   setProposalData: (data) => set({ proposalData: data }),
//   setLoading: (loading) => set({ isLoading: loading }),
//   setError: (error) => set({ error }),

//   // Versions
//   createVersion: (author, changes) => {
//     const newVersion: Version = {
//       id: crypto.randomUUID(),
//       timestamp: new Date().toISOString(),
//       author,
//       changes,
//       elements: get().canvasElements,
//     };
//     set((state) => ({
//       versions: [...state.versions, newVersion],
//       currentVersion: newVersion.id,
//     }));
//   },

//   switchVersion: (versionId) => {
//     const version = get().versions.find((v) => v.id === versionId);
//     if (version) {
//       set({
//         canvasElements: version.elements,
//         currentVersion: versionId,
//       });
//     }
//   },

//   // Collaboration
//   addCollaborator: (user) =>
//     set((state) => ({ collaborators: [...state.collaborators, user] })),

//   removeCollaborator: (userId) =>
//     set((state) => ({
//       collaborators: state.collaborators.filter((c) => c.id !== userId),
//     })),

//   updateCursorPosition: (userId, position) =>
//     set((state) => ({
//       cursors: {
//         ...state.cursors,
//         [userId]: {
//           ...position,
//           timestamp: new Date().toISOString(),
//         },
//       },
//     })),

//   // Toggles
//   setGridVisible: (visible) => set({ gridVisible: visible }),
//   setViewMode: (mode) => set({ viewMode: mode }),

//   // SearchIndex placeholder to store content for local references
//   updateSearchIndex: (content) => {
//     const text = JSON.stringify(content)
//       .toLowerCase()
//       .replace(/[^\w\s]/g, ' ');
//     const words = text.split(/\s+/).filter(Boolean);
//     set((state) => ({
//       searchIndex: {
//         ...state.searchIndex,
//         [content.id ?? crypto.randomUUID()]: { text, words },
//       },
//     }));
//   },
// }));

import { create } from 'zustand';
import { wsService } from '@/lib/brainwebsocket';

export interface Message {
  id: string;
  content: string;
  type: 'user' | 'ai' | 'system';
  timestamp: Date;
}
export interface CanvasElement {
  id: string;
  type: 'text' | 'chart' | 'table' | 'proposal' | 'diagram' | 'mermaid' | 'timeline' | 'meeting-transcript';
  content: any;
  position: { x: number; y: number };
  size: { width: number; height: number };
  metadata?: {
    source?: string;
    timestamp?: string;
    author?: string;
    version?: string;
    confidence?: number;
    lastModified?: string;
  };
}
export interface ProposalData {
  generated_proposal: string;
  metadata: {
    author: string;
    version: string;
  };
}
export interface User {
  id: string;
  name: string;
  avatar?: string;
  status?: 'active' | 'idle' | 'offline';
  role?: 'editor' | 'viewer' | 'admin';
}
export interface CursorPosition {
  x: number;
  y: number;
  timestamp: string;
}
export interface Version {
  id: string;
  timestamp: string;
  author: string;
  changes: string;
  elements: CanvasElement[];
}

export interface BrainState {
  messages: Message[];
  canvasElements: CanvasElement[];
  isLoading: boolean;
  error: string | null;
  proposalData: ProposalData | null;
  collaborators: User[];
  cursors: Record<string, CursorPosition>;
  scale: number;
  viewMode: 'edit' | 'view' | 'present';
  gridVisible: boolean;
  snapToGrid: boolean;
  versions: Version[];
  currentVersion: string;

  addMessage: (message: Message) => void;
  addCanvasElement: (element: CanvasElement) => void;
  updateCanvasElement: (id: string, updates: Partial<CanvasElement>) => void;
  removeCanvasElement: (id: string) => void;
  setProposalData: (data: ProposalData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  createVersion: (author: string, changes: string) => void;
  switchVersion: (versionId: string) => void;

  addCollaborator: (user: User) => void;
  removeCollaborator: (userId: string) => void;
  updateCursorPosition: (userId: string, position: { x: number; y: number }) => void;

  setGridVisible: (visible: boolean) => void;
  setViewMode: (mode: 'edit' | 'view' | 'present') => void;

  // Simple local “indexing” if we want to store content for reference
  searchIndex: Record<string, any>;
  updateSearchIndex: (content: any) => void;
}

export const useBrainStore = create<BrainState>((set, get) => ({
  messages: [],
  canvasElements: [],
  isLoading: false,
  error: null,
  proposalData: null,
  collaborators: [],
  cursors: {},
  scale: 1,
  viewMode: 'edit',
  gridVisible: true,
  snapToGrid: true,
  versions: [],
  currentVersion: '',
  searchIndex: {},

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  addCanvasElement: (element) => {
    const newElement = {
      ...element,
      metadata: {
        ...element.metadata,
        timestamp: new Date().toISOString(),
      },
    };
    set((state) => ({
      canvasElements: [...state.canvasElements, newElement],
    }));
    wsService.sendMessage('ELEMENT_ADD', { element: newElement });
  },

  updateCanvasElement: (id, updates) =>
    set((state) => ({
      canvasElements: state.canvasElements.map((el) =>
        el.id === id ? { ...el, ...updates } : el
      ),
    })),

  removeCanvasElement: (id) =>
    set((state) => ({
      canvasElements: state.canvasElements.filter((el) => el.id !== id),
    })),

  setProposalData: (data) => set({ proposalData: data }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  createVersion: (author, changes) => {
    const newVersion: Version = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      author,
      changes,
      elements: get().canvasElements,
    };
    set((state) => ({
      versions: [...state.versions, newVersion],
      currentVersion: newVersion.id,
    }));
  },

  switchVersion: (versionId) => {
    const version = get().versions.find((v) => v.id === versionId);
    if (version) {
      set({
        canvasElements: version.elements,
        currentVersion: versionId,
      });
    }
  },

  addCollaborator: (user) =>
    set((state) => ({
      collaborators: [...state.collaborators, user],
    })),

  removeCollaborator: (userId) =>
    set((state) => ({
      collaborators: state.collaborators.filter((c) => c.id !== userId),
    })),

  updateCursorPosition: (userId, position) =>
    set((state) => ({
      cursors: {
        ...state.cursors,
        [userId]: {
          ...position,
          timestamp: new Date().toISOString(),
        },
      },
    })),

  setGridVisible: (visible) => set({ gridVisible: visible }),
  setViewMode: (mode) => set({ viewMode: mode }),

  updateSearchIndex: (content) => {
    const text = JSON.stringify(content).toLowerCase().replace(/[^\w\s]/g, ' ');
    const words = text.split(/\s+/).filter(Boolean);
    set((state) => ({
      searchIndex: {
        ...state.searchIndex,
        [content.id ?? crypto.randomUUID()]: { text, words },
      },
    }));
  },
}));
