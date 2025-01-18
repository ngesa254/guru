// // import { useState, useCallback } from 'react';

// // interface Point {
// //   x: number;
// //   y: number;
// // }

// // export function useCanvasGestures() {
// //   const [isPanning, setIsPanning] = useState(false);
// //   const [startPoint, setStartPoint] = useState<Point>({ x: 0, y: 0 });
// //   const [pan, setPan] = useState<Point>({ x: 0, y: 0 });
// //   const [scale, setScale] = useState(1);

// //   const handlePanStart = useCallback((e: React.MouseEvent) => {
// //     if (e.button === 1 || (e.button === 0 && e.altKey)) {
// //       setIsPanning(true);
// //       setStartPoint({
// //         x: e.clientX - pan.x,
// //         y: e.clientY - pan.y,
// //       });
// //     }
// //   }, [pan]);

// //   const handlePanMove = useCallback((e: React.MouseEvent) => {
// //     if (!isPanning) return;

// //     setPan({
// //       x: e.clientX - startPoint.x,
// //       y: e.clientY - startPoint.y,
// //     });
// //   }, [isPanning, startPoint]);

// //   const handlePanEnd = useCallback(() => {
// //     setIsPanning(false);
// //   }, []);

// //   const handleZoom = useCallback((e: React.WheelEvent) => {
// //     if (!e.ctrlKey) return;

// //     e.preventDefault();
// //     const delta = e.deltaY * -0.01;
// //     setScale(prevScale => Math.min(Math.max(0.1, prevScale + delta), 4));
// //   }, []);

// //   return {
// //     pan,
// //     scale,
// //     isPanning,
// //     handlers: {
// //       onMouseDown: handlePanStart,
// //       onMouseMove: handlePanMove,
// //       onMouseUp: handlePanEnd,
// //       onMouseLeave: handlePanEnd,
// //       onWheel: handleZoom,
// //     },
// //   };
// // }


// 'use client';

// import { useState, useCallback, useRef } from 'react';

// interface Point {
//   x: number;
//   y: number;
// }

// interface CanvasGesturesProps {
//   onPanChange: (updater: (prev: Point) => Point) => void;
//   onScaleChange: (scale: number) => void;
//   scale: number;
//   snapToGrid: boolean;
//   gridSize?: number;
// }

// export function useCanvasGestures({ 
//   onPanChange, 
//   onScaleChange,
//   scale, 
//   snapToGrid,
//   gridSize = 25 
// }: CanvasGesturesProps) {
//   const [isPanning, setIsPanning] = useState(false);
//   const [isZooming, setIsZooming] = useState(false);
//   const lastPos = useRef<Point>({ x: 0, y: 0 });
//   const startScale = useRef<number>(1);

//   // Pan handling
//   const handlePanStart = useCallback((e: React.MouseEvent) => {
//     if (e.button === 1 || (e.button === 0 && e.altKey)) {
//       setIsPanning(true);
//       lastPos.current = { x: e.clientX, y: e.clientY };
//       e.preventDefault();
//       document.body.style.cursor = 'grabbing';
//     }
//   }, []);

//   const handlePanMove = useCallback((e: React.MouseEvent) => {
//     if (!isPanning) return;

//     const dx = e.clientX - lastPos.current.x;
//     const dy = e.clientY - lastPos.current.y;

//     lastPos.current = { x: e.clientX, y: e.clientY };

//     onPanChange(prev => ({
//       x: prev.x + (snapToGrid ? Math.round(dx / gridSize) * gridSize : dx),
//       y: prev.y + (snapToGrid ? Math.round(dy / gridSize) * gridSize : dy)
//     }));
//   }, [isPanning, onPanChange, snapToGrid, gridSize]);

//   const handlePanEnd = useCallback(() => {
//     setIsPanning(false);
//     document.body.style.cursor = '';
//   }, []);

//   // Zoom handling
//   const handleZoom = useCallback((e: React.WheelEvent) => {
//     if (!e.ctrlKey) return;
//     e.preventDefault();

//     const delta = e.deltaY * -0.01;
//     const newScale = Math.min(Math.max(0.1, scale + delta), 4);
    
//     // Calculate zoom point
//     const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     // Apply scale and adjust pan to zoom toward cursor
//     onScaleChange(newScale);
//     onPanChange(prev => ({
//       x: prev.x - (x - prev.x) * (newScale / scale - 1),
//       y: prev.y - (y - prev.y) * (newScale / scale - 1)
//     }));
//   }, [scale, onScaleChange, onPanChange]);

//   // Pinch zoom handling for touch devices
//   const handleTouchStart = useCallback((e: React.TouchEvent) => {
//     if (e.touches.length === 2) {
//       setIsZooming(true);
//       startScale.current = scale;
//       e.preventDefault();
//     }
//   }, [scale]);

//   const handleTouchMove = useCallback((e: React.TouchEvent) => {
//     if (!isZooming || e.touches.length !== 2) return;

//     const touch1 = e.touches[0];
//     const touch2 = e.touches[1];
//     const dist = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
//     const newScale = Math.min(Math.max(0.1, startScale.current * (dist / 100)), 4);
    
//     onScaleChange(newScale);
//   }, [isZooming, onScaleChange]);

//   const handleTouchEnd = useCallback(() => {
//     setIsZooming(false);
//   }, []);

//   return {
//     isPanning,
//     isZooming,
//     gestureProps: {
//       onMouseDown: handlePanStart,
//       onMouseMove: handlePanMove,
//       onMouseUp: handlePanEnd,
//       onMouseLeave: handlePanEnd,
//       onWheel: handleZoom,
//       onTouchStart: handleTouchStart,
//       onTouchMove: handleTouchMove,
//       onTouchEnd: handleTouchEnd,
//       style: {
//         cursor: isPanning ? 'grabbing' : 'default',
//         touchAction: 'none', // Prevent default touch behaviors
//       }
//     }
//   };
// }



// components/Canvas/hooks/useCanvasGestures.ts
'use client';

import { useState, useCallback, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

interface GestureState {
  isPanning: boolean;
  isZooming: boolean;
  lastPosition: Point;
  scale: number;
  startScale: number;
  zoomPoint: Point | null;
}

interface UseCanvasGesturesProps {
  onPanChange: (pan: Point) => void;
  onScaleChange: (scale: number) => void;
  initialScale?: number;
  snapToGrid?: boolean;
  gridSize?: number;
}

export function useCanvasGestures({
  onPanChange,
  onScaleChange,
  initialScale = 1,
  snapToGrid = false,
  gridSize = 25
}: UseCanvasGesturesProps) {
  const [state, setState] = useState<GestureState>({
    isPanning: false,
    isZooming: false,
    lastPosition: { x: 0, y: 0 },
    scale: initialScale,
    startScale: initialScale,
    zoomPoint: null
  });

  const containerRef = useRef<HTMLDivElement>(null);

  // Pan handling
  const startPan = useCallback((e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      setState(prev => ({
        ...prev,
        isPanning: true,
        lastPosition: { x: e.clientX, y: e.clientY }
      }));
      e.preventDefault();
      document.body.style.cursor = 'grabbing';
    }
  }, []);

  const pan = useCallback((e: React.MouseEvent) => {
    if (!state.isPanning) return;

    const dx = e.clientX - state.lastPosition.x;
    const dy = e.clientY - state.lastPosition.y;

    const snappedDx = snapToGrid ? Math.round(dx / gridSize) * gridSize : dx;
    const snappedDy = snapToGrid ? Math.round(dy / gridSize) * gridSize : dy;

    setState(prev => ({
      ...prev,
      lastPosition: { x: e.clientX, y: e.clientY }
    }));

    onPanChange({ x: snappedDx, y: snappedDy });
  }, [state.isPanning, state.lastPosition, onPanChange, snapToGrid, gridSize]);

  const endPan = useCallback(() => {
    setState(prev => ({ ...prev, isPanning: false }));
    document.body.style.cursor = '';
  }, []);

  // Zoom handling with focal point
  const handleZoom = useCallback((e: React.WheelEvent) => {
    if (!e.ctrlKey || !containerRef.current) return;
    e.preventDefault();

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const delta = e.deltaY * -0.01;
    const newScale = Math.min(Math.max(0.1, state.scale + delta), 4);
    
    setState(prev => ({ 
      ...prev, 
      scale: newScale,
      zoomPoint: { x, y }
    }));

    // Calculate zoom with focal point
    const scaleFactor = newScale / state.scale;
    onScaleChange(newScale);
    onPanChange({
      x: x - (x - state.lastPosition.x) * scaleFactor,
      y: y - (y - state.lastPosition.y) * scaleFactor
    });
  }, [state.scale, state.lastPosition, onScaleChange, onPanChange]);

  // Touch/Pinch zoom handling
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const midX = (touch1.clientX + touch2.clientX) / 2;
      const midY = (touch1.clientY + touch2.clientY) / 2;

      setState(prev => ({
        ...prev,
        isZooming: true,
        startScale: prev.scale,
        zoomPoint: { x: midX, y: midY }
      }));
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!state.isZooming || e.touches.length !== 2) return;
    e.preventDefault();

    const touch1 = e.touches[0];
    const touch2 = e.touches[1];
    const dist = Math.hypot(
      touch1.clientX - touch2.clientX,
      touch1.clientY - touch2.clientY
    );

    const midX = (touch1.clientX + touch2.clientX) / 2;
    const midY = (touch1.clientY + touch2.clientY) / 2;
    const newScale = Math.min(Math.max(0.1, state.startScale * (dist / 100)), 4);

    setState(prev => ({
      ...prev,
      scale: newScale,
      lastPosition: { x: midX, y: midY }
    }));

    onScaleChange(newScale);
    if (state.zoomPoint) {
      onPanChange({
        x: midX - (midX - state.zoomPoint.x) * (newScale / state.startScale),
        y: midY - (midY - state.zoomPoint.y) * (newScale / state.startScale)
      });
    }
  }, [state.isZooming, state.startScale, state.zoomPoint, onScaleChange, onPanChange]);

  const handleTouchEnd = useCallback(() => {
    setState(prev => ({ ...prev, isZooming: false, zoomPoint: null }));
  }, []);

  return {
    ref: containerRef,
    handlers: {
      onMouseDown: startPan,
      onMouseMove: pan,
      onMouseUp: endPan,
      onMouseLeave: endPan,
      onWheel: handleZoom,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      style: {
        cursor: state.isPanning ? 'grabbing' : 'default',
        touchAction: 'none', // Prevent default touch behaviors
        transform: `scale(${state.scale})`,
        transformOrigin: state.zoomPoint ? 
          `${state.zoomPoint.x}px ${state.zoomPoint.y}px` : 
          'center'
      }
    },
    state: {
      isPanning: state.isPanning,
      isZooming: state.isZooming,
      scale: state.scale
    }
  };
}