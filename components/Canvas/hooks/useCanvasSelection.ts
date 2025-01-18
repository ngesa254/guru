import { useState, useCallback } from 'react';

interface SelectionState {
  selectedElements: string[];
  selectedConnections: string[];
}

export function useCanvasSelection() {
  const [selection, setSelection] = useState<SelectionState>({
    selectedElements: [],
    selectedConnections: [],
  });

  const selectElement = useCallback((elementId: string, isMultiSelect: boolean) => {
    setSelection(prev => {
      if (isMultiSelect) {
        return {
          ...prev,
          selectedElements: prev.selectedElements.includes(elementId)
            ? prev.selectedElements.filter(id => id !== elementId)
            : [...prev.selectedElements, elementId],
        };
      }
      return {
        selectedConnections: [],
        selectedElements: [elementId],
      };
    });
  }, []);

  const selectConnection = useCallback((connectionId: string, isMultiSelect: boolean) => {
    setSelection(prev => {
      if (isMultiSelect) {
        return {
          ...prev,
          selectedConnections: prev.selectedConnections.includes(connectionId)
            ? prev.selectedConnections.filter(id => id !== connectionId)
            : [...prev.selectedConnections, connectionId],
        };
      }
      return {
        selectedElements: [],
        selectedConnections: [connectionId],
      };
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelection({
      selectedElements: [],
      selectedConnections: [],
    });
  }, []);

  return {
    ...selection,
    selectElement,
    selectConnection,
    clearSelection,
  };
}