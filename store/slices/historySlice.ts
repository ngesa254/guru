import { StateCreator } from 'zustand';
import { StoreState } from '../useStore';

export interface HistoryState {
  past: any[];
  present: any;
  future: any[];
}

export interface HistorySlice {
  history: HistoryState;
  canUndo: boolean;
  canRedo: boolean;
  addToHistory: (state: any) => void;
  undo: () => void;
  redo: () => void;
}

export const createHistorySlice: StateCreator<
  StoreState & HistorySlice,
  [],
  [],
  HistorySlice
> = (set, get) => ({
  history: {
    past: [],
    present: null,
    future: []
  },
  canUndo: false,
  canRedo: false,

  addToHistory: (newPresent) => 
    set((state) => ({
      history: {
        past: [...state.history.past, state.history.present],
        present: newPresent,
        future: []
      },
      canUndo: true,
      canRedo: false
    })),

  undo: () => set((state) => {
    const { past, present, future } = state.history;
    if (past.length === 0) return state;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    return {
      history: {
        past: newPast,
        present: previous,
        future: [present, ...future]
      },
      canUndo: newPast.length > 0,
      canRedo: true
    };
  }),

  redo: () => set((state) => {
    const { past, present, future } = state.history;
    if (future.length === 0) return state;

    const next = future[0];
    const newFuture = future.slice(1);

    return {
      history: {
        past: [...past, present],
        present: next,
        future: newFuture
      },
      canUndo: true,
      canRedo: newFuture.length > 0
    };
  })
});