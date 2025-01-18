import { useState, useCallback } from 'react';

interface ResizeState {
  isResizing: boolean;
  resizeHandle: string | null;
  startSize: { width: number; height: number } | null;
  startPosition: { x: number; y: number } | null;
}

export function useCanvasResize() {
  const [resizeState, setResizeState] = useState<ResizeState>({
    isResizing: false,
    resizeHandle: null,
    startSize: null,
    startPosition: null,
  });

  const startResize = useCallback((
    handle: string,
    initialSize: { width: number; height: number },
    initialPosition: { x: number; y: number }
  ) => {
    setResizeState({
      isResizing: true,
      resizeHandle: handle,
      startSize: initialSize,
      startPosition: initialPosition,
    });
  }, []);

  const updateResize = useCallback((
    deltaX: number,
    deltaY: number,
    maintainAspectRatio = false
  ) => {
    if (!resizeState.isResizing || !resizeState.startSize || !resizeState.startPosition) {
      return null;
    }

    // Calculate new size and position based on resize handle and deltas
    const { width: startWidth, height: startHeight } = resizeState.startSize;
    const { x: startX, y: startY } = resizeState.startPosition;
    
    let newSize = { width: startWidth, height: startHeight };
    let newPosition = { x: startX, y: startY };

    // Implement resize logic based on handle
    switch (resizeState.resizeHandle) {
      case 'n':
        newSize.height = startHeight - deltaY;
        newPosition.y = startY + deltaY;
        break;
      case 's':
        newSize.height = startHeight + deltaY;
        break;
      // Add other cases for different handles
    }

    if (maintainAspectRatio) {
      // Implement aspect ratio maintenance
    }

    return { size: newSize, position: newPosition };
  }, [resizeState]);

  const endResize = useCallback(() => {
    setResizeState({
      isResizing: false,
      resizeHandle: null,
      startSize: null,
      startPosition: null,
    });
  }, []);

  return {
    resizeState,
    startResize,
    updateResize,
    endResize,
  };
}