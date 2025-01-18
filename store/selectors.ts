import { StoreState } from './useStore';

// Element selectors
export const selectedElementsSelector = (state: StoreState) => 
  state.elements.filter(el => state.selectedElements.includes(el.id));

export const elementsByTypeSelector = (state: StoreState) => 
  state.elements.reduce((groups, element) => ({
    ...groups,
    [element.type]: [...(groups[element.type] || []), element]
  }), {} as Record<string, typeof state.elements>);

// Collaboration selectors
export const activeCollaboratorsSelector = (state: StoreState) =>
  state.collaborators.filter(c => 
    state.cursorPositions[c.id] && 
    Date.now() - new Date(state.cursorPositions[c.id].timestamp).getTime() < 30000
  );

export const elementWithConnections = (elementId: string) => (state: StoreState) => ({
  element: state.elements.find(el => el.id === elementId),
  connections: state.connections.filter(
    conn => conn.from === elementId || conn.to === elementId
  )
});

// UI state selectors
export const canvasViewSelector = (state: StoreState) => ({
  scale: state.scale,
  pan: state.pan,
  showGrid: state.showGrid
});