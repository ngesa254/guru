// /* ----------------------------------------------------------------------------------

// WORKING v0.1...

//    /home/user/Guru-AI/store/brainStore.ts

//    This file implements a Zustand store for managing the chat messages, current tab,
//    canvas content, and whether the canvas is open or closed. We also store placeholders
//    for user IDs, doc IDs, etc., as needed.

//    In a real system, you could store more elaborate states and connect them to real
//    backends or websockets.
// ----------------------------------------------------------------------------------- */
// "use client";

// import { create } from 'zustand';

// interface ChatMessage {
//   role: 'user' | 'ai';
//   content: string;
// }

// interface BrainState {
//   chatMessages: ChatMessage[];
//   setChatMessages: (msgs: ChatMessage[]) => void;

//   currentTab: 'Web' | 'Work';
//   setCurrentTab: (tab: 'Web' | 'Work') => void;

//   canvasContent: string;
//   setCanvasContent: (content: string) => void;

//   canvasOpen: boolean;
//   setCanvasOpen: (isOpen: boolean) => void;

//   // placeholders for multi-user or doc IDs
//   userIds?: string[];
//   docId?: string;
// }

// export const useBrainStore = create<BrainState>((set) => ({
//   chatMessages: [],
//   setChatMessages: (msgs) => set(() => ({ chatMessages: msgs })),

//   currentTab: 'Web',
//   setCurrentTab: (tab) => set(() => ({ currentTab: tab })),

//   canvasContent: '',
//   setCanvasContent: (content) => set(() => ({ canvasContent: content })),

//   canvasOpen: false,
//   setCanvasOpen: (isOpen) => set(() => ({ canvasOpen: isOpen })),

//   // placeholders for future expansions
//   userIds: [],
//   docId: undefined,
// }));



// // WORKING V0.2
// "use client";

// import { create } from 'zustand';

// interface ChatMessage {
//   role: 'user' | 'ai';
//   content: any;
// }

// interface BrainState {
//   chatMessages: ChatMessage[];
//   setChatMessages: (msgs: ChatMessage[]) => void;

//   currentTab: 'Web' | 'Work';
//   setCurrentTab: (tab: 'Web' | 'Work') => void;

//   // Must always be a string (never undefined or null) to avoid
//   // "Invalid value for prop `value` on <textarea>" errors
//   canvasContent: string;
//   setCanvasContent: (content: string) => void;

//   canvasOpen: boolean;
//   setCanvasOpen: (isOpen: boolean) => void;

//   // placeholders for multi-user or doc IDs
//   userIds?: string[];
//   docId?: string;
// }

// export const useBrainStore = create<BrainState>((set) => ({
//   chatMessages: [],
//   setChatMessages: (msgs) => set(() => ({ chatMessages: msgs })),

//   currentTab: 'Web',
//   setCurrentTab: (tab) => set(() => ({ currentTab: tab })),

//   // Ensure we default to an empty string
//   canvasContent: '',
//   setCanvasContent: (content) => set(() => ({ canvasContent: content })),

//   canvasOpen: false,
//   setCanvasOpen: (isOpen) => set(() => ({ canvasOpen: isOpen })),

//   // placeholders for future expansions
//   userIds: [],
//   docId: undefined,
// }));


// // v0.3

// "use client";

// import { create } from 'zustand';

// interface ChatMessage {
//   role: 'user' | 'ai';
//   content: string;
// }

// interface BrainState {
//   chatMessages: ChatMessage[];
//   setChatMessages: (msgs: ChatMessage[]) => void;

//   currentTab: 'Web' | 'Work';
//   setCurrentTab: (tab: 'Web' | 'Work') => void;

//   // Must always be a string
//   canvasContent: string;
//   setCanvasContent: (content: string) => void;

//   canvasOpen: boolean;
//   setCanvasOpen: (isOpen: boolean) => void;

//   // placeholders for multi-user or doc IDs
//   userIds?: string[];
//   docId?: string;
// }

// export const useBrainStore = create<BrainState>((set) => ({
//   chatMessages: [],
//   setChatMessages: (msgs) => set(() => ({ chatMessages: msgs })),

//   currentTab: 'Web',
//   setCurrentTab: (tab) => set(() => ({ currentTab: tab })),

//   canvasContent: '',
//   setCanvasContent: (content) => set(() => ({ canvasContent: content })),

//   canvasOpen: false,
//   setCanvasOpen: (isOpen) => set(() => ({ canvasOpen: isOpen })),

//   // placeholders for future expansions
//   userIds: [],
//   docId: undefined,
// }));


"use client";

import { create } from 'zustand';

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

interface BrainState {
  chatMessages: ChatMessage[];
  setChatMessages: (msgs: ChatMessage[]) => void;

  currentTab: 'Web' | 'Work';
  setCurrentTab: (tab: 'Web' | 'Work') => void;

  // Must always be a string
  canvasContent: string;
  setCanvasContent: (content: string | ((prev: string) => string)) => void;

  canvasOpen: boolean;
  setCanvasOpen: (isOpen: boolean) => void;

  // placeholders for multi-user or doc IDs
  userIds?: string[];
  docId?: string;
}

export const useBrainStore = create<BrainState>((set) => ({
  chatMessages: [],
  setChatMessages: (msgs) => set(() => ({ chatMessages: msgs })),

  currentTab: 'Web',
  setCurrentTab: (tab) => set(() => ({ currentTab: tab })),

  // Start with empty string to avoid "Invalid value" on <textarea>
  canvasContent: '',
  setCanvasContent: (content) => {
    // If the caller passes a function, handle it
    if (typeof content === 'function') {
      set((state) => ({
        canvasContent: content(state.canvasContent),
      }));
    } else {
      set(() => ({ canvasContent: content || '' }));
    }
  },

  canvasOpen: false,
  setCanvasOpen: (isOpen) => set(() => ({ canvasOpen: isOpen })),

  // placeholders for future expansions
  userIds: [],
  docId: undefined,
}));
