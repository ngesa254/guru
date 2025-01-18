// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// interface Element {
//   id: string;
//   type: 'text' | 'code' | 'chart' | 'diagram' | 'table';
//   content: any;
//   position: { x: number; y: number };
// }

// interface CanvasProps {
//   elements?: Element[];
//   onElementAdd?: (element: Element) => void;
//   onElementUpdate?: (id: string, updates: Partial<Element>) => void;
//   onElementRemove?: (id: string) => void;
// }

// export default function Canvas({
//   elements = [],
//   onElementAdd,
//   onElementUpdate,
//   onElementRemove,
// }: CanvasProps) {
//   const canvasRef = useRef<HTMLDivElement>(null);
//   const [selectedElement, setSelectedElement] = useState<string | null>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

//   // Handle mouse movement
//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!canvasRef.current) return;
    
//     const rect = canvasRef.current.getBoundingClientRect();
//     setCursorPosition({
//       x: e.clientX - rect.left,
//       y: e.clientY - rect.top,
//     });
//   };

//   // Handle element selection
//   const handleElementClick = (elementId: string) => {
//     setSelectedElement(elementId);
//   };

//   // Render different element types
//   const renderElement = (element: Element) => {
//     switch (element.type) {
//       case 'text':
//         return (
//           <div className="p-4 bg-white rounded-lg shadow-lg">
//             {element.content}
//           </div>
//         );
//       case 'code':
//         return (
//           <pre className="p-4 bg-gray-800 text-white rounded-lg">
//             <code>{element.content}</code>
//           </pre>
//         );
//       case 'chart':
//         return (
//           <div className="p-4 bg-white rounded-lg shadow-lg">
//             {/* Chart implementation */}
//             <div className="w-64 h-64 bg-gray-100 flex items-center justify-center">
//               Chart Placeholder
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div
//       ref={canvasRef}
//       className="relative w-full h-full bg-gray-50 overflow-hidden cursor-crosshair"
//       onMouseMove={handleMouseMove}
//     >
//       {/* Grid Background */}
//       <div className="absolute inset-0 bg-grid opacity-10" />

//       {/* Canvas Elements */}
//       <AnimatePresence>
//         {elements.map((element) => (
//           <motion.div
//             key={element.id}
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ 
//               opacity: 1, 
//               scale: 1,
//               x: element.position.x,
//               y: element.position.y,
//             }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             className={`absolute ${
//               selectedElement === element.id ? 'ring-2 ring-blue-500' : ''
//             }`}
//             onClick={() => handleElementClick(element.id)}
//             style={{
//               left: element.position.x,
//               top: element.position.y,
//             }}
//             drag
//             dragMomentum={false}
//             onDragStart={() => setIsDragging(true)}
//             onDragEnd={(_, info) => {
//               setIsDragging(false);
//               if (onElementUpdate) {
//                 onElementUpdate(element.id, {
//                   position: {
//                     x: element.position.x + info.offset.x,
//                     y: element.position.y + info.offset.y,
//                   },
//                 });
//               }
//             }}
//           >
//             {renderElement(element)}
//           </motion.div>
//         ))}
//       </AnimatePresence>

//       {/* Context Menu or Tools */}
//       <div className="absolute bottom-4 right-4 flex space-x-2">
//         <button
//           className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
//           onClick={() => {
//             if (onElementAdd) {
//               onElementAdd({
//                 id: Math.random().toString(36).substr(2, 9),
//                 type: 'text',
//                 content: 'New Text Element',
//                 position: cursorPosition,
//               });
//             }
//           }}
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M12 4v16m8-8H4"
//             />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// }


// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import { motion } from 'framer-motion';
// import { useGesture } from '@use-gesture/react';

// interface CanvasElement {
//   id: string;
//   type: string;
//   content: any;
//   position: { x: number; y: number };
//   scale?: number;
//   rotation?: number;
//   selected?: boolean;
// }

// interface CanvasProps {
//   elements: CanvasElement[];
//   onElementAdd?: (element: CanvasElement) => void;
//   onElementUpdate?: (id: string, updates: Partial<CanvasElement>) => void;
//   onElementRemove?: (id: string) => void;
//   showGrid?: boolean;
//   zoom?: number;
// }

// export default function Canvas({
//   elements,
//   onElementAdd,
//   onElementUpdate,
//   onElementRemove,
//   showGrid = true,
//   zoom = 1,
// }: CanvasProps) {
//   const canvasRef = useRef<HTMLDivElement>(null);
//   const [selectedElements, setSelectedElements] = useState<string[]>([]);
//   const [isDragging, setIsDragging] = useState(false);

//   // Pan and zoom state
//   const [{ x, y }, setPan] = useState({ x: 0, y: 0 });
//   const [scale, setScale] = useState(1);

//   // Selection box state
//   const [selectionBox, setSelectionBox] = useState<{
//     start: { x: number; y: number };
//     end: { x: number; y: number };
//   } | null>(null);

//   // Gesture handling for pan and zoom
//   const bind = useGesture({
//     onDrag: ({ movement: [mx, my], event }) => {
//       if ((event.target as HTMLElement).classList.contains('canvas-base')) {
//         setPan({ x: mx, y: my });
//       }
//     },
//     onWheel: ({ delta: [, dy] }) => {
//       setScale(Math.max(0.5, Math.min(2, scale - dy * 0.01)));
//     },
//   });

//   // Handle element selection
//   const handleElementClick = (elementId: string, event: React.MouseEvent) => {
//     if (event.shiftKey) {
//       setSelectedElements(prev => 
//         prev.includes(elementId)
//           ? prev.filter(id => id !== elementId)
//           : [...prev, elementId]
//       );
//     } else {
//       setSelectedElements([elementId]);
//     }
//   };

//   // Handle keyboard shortcuts
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'Delete' && selectedElements.length > 0) {
//         selectedElements.forEach(id => onElementRemove?.(id));
//         setSelectedElements([]);
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [selectedElements, onElementRemove]);

//   return (
//     <div className="relative w-full h-full overflow-hidden">
//       <div
//         {...bind()}
//         ref={canvasRef}
//         className="canvas-base absolute w-full h-full"
//         style={{
//           transform: `translate(${x}px, ${y}px) scale(${scale})`,
//         }}
//       >
//         {/* Grid */}
//         {showGrid && (
//           <div className="absolute inset-0 grid grid-cols-[repeat(40,minmax(25px,1fr))] grid-rows-[repeat(40,minmax(25px,1fr))] opacity-10">
//             {Array.from({ length: 1600 }).map((_, i) => (
//               <div key={i} className="border border-gray-200" />
//             ))}
//           </div>
//         )}

//         {/* Elements */}
//         {elements.map((element) => (
//           <motion.div
//             key={element.id}
//             className={`absolute cursor-move ${
//               selectedElements.includes(element.id)
//                 ? 'ring-2 ring-blue-500'
//                 : ''
//             }`}
//             initial={false}
//             animate={{
//               x: element.position.x,
//               y: element.position.y,
//               scale: element.scale || 1,
//               rotate: element.rotation || 0,
//             }}
//             drag
//             dragMomentum={false}
//             onDragStart={() => setIsDragging(true)}
//             onDragEnd={(_, info) => {
//               setIsDragging(false);
//               if (onElementUpdate) {
//                 onElementUpdate(element.id, {
//                   position: {
//                     x: element.position.x + info.offset.x,
//                     y: element.position.y + info.offset.y,
//                   },
//                 });
//               }
//             }}
//             onClick={(e) => handleElementClick(element.id, e)}
//           >
//             {/* Render element content based on type */}
//             {renderElement(element)}
            
//             {/* Resize handles */}
//             {selectedElements.includes(element.id) && (
//               <div className="absolute inset-0 border-2 border-blue-500">
//                 {/* Resize handles here */}
//               </div>
//             )}
//           </motion.div>
//         ))}

//         {/* Selection box */}
//         {selectionBox && (
//           <div
//             className="absolute border-2 border-blue-500 bg-blue-50 bg-opacity-20"
//             style={{
//               left: Math.min(selectionBox.start.x, selectionBox.end.x),
//               top: Math.min(selectionBox.start.y, selectionBox.end.y),
//               width: Math.abs(selectionBox.end.x - selectionBox.start.x),
//               height: Math.abs(selectionBox.end.y - selectionBox.start.y),
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// // Helper function to render different element types
// function renderElement(element: CanvasElement) {
//   switch (element.type) {
//     case 'text':
//       return (
//         <div className="p-4 bg-white rounded-lg shadow-lg min-w-[100px]">
//           {element.content}
//         </div>
//       );
//     case 'code':
//       return (
//         <div className="min-w-[200px]">
//           <CodeBlock
//             code={element.content}
//             language="javascript"
//             showLineNumbers={true}
//           />
//         </div>
//       );
//     case 'chart':
//       return (
//         <div className="w-[400px] h-[300px]">
//           <Chart {...element.content} />
//         </div>
//       );
//     default:
//       return null;
//   }
// }



// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import { motion } from 'framer-motion';

// interface CanvasElement {
//   id: string;
//   type: string;
//   content: any;
//   position: { x: number; y: number };
//   scale?: number;
//   rotation?: number;
//   selected?: boolean;
// }

// interface CanvasProps {
//   elements: CanvasElement[];
//   onElementAdd?: (element: CanvasElement) => void;
//   onElementUpdate?: (id: string, updates: Partial<CanvasElement>) => void;
//   onElementRemove?: (id: string) => void;
//   showGrid?: boolean;
//   zoom?: number;
// }

// export default function Canvas({
//   elements,
//   onElementAdd,
//   onElementUpdate,
//   onElementRemove,
//   showGrid = true,
//   zoom = 1,
// }: CanvasProps) {
//   const canvasRef = useRef<HTMLDivElement>(null);
//   const [selectedElements, setSelectedElements] = useState<string[]>([]);
//   const [isDragging, setIsDragging] = useState(false);
//   const [pan, setPan] = useState({ x: 0, y: 0 });
//   const [scale, setScale] = useState(1);

//   // Handle panning with mouse drag
//   const [isPanning, setIsPanning] = useState(false);
//   const [startPanPos, setStartPanPos] = useState({ x: 0, y: 0 });

//   const handleMouseDown = (e: React.MouseEvent) => {
//     if (e.button === 1 || (e.button === 0 && e.altKey)) { // Middle mouse or Alt+Left click
//       setIsPanning(true);
//       setStartPanPos({ x: e.clientX - pan.x, y: e.clientY - pan.y });
//     }
//   };

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (isPanning) {
//       setPan({
//         x: e.clientX - startPanPos.x,
//         y: e.clientY - startPanPos.y
//       });
//     }
//   };

//   const handleMouseUp = () => {
//     setIsPanning(false);
//   };

//   // Handle zoom with wheel
//   const handleWheel = (e: React.WheelEvent) => {
//     if (e.ctrlKey) {
//       e.preventDefault();
//       const delta = e.deltaY * -0.01;
//       setScale(prevScale => Math.min(Math.max(0.1, prevScale + delta), 4));
//     }
//   };

//   useEffect(() => {
//     const preventDefault = (e: WheelEvent) => {
//       if (e.ctrlKey) e.preventDefault();
//     };

//     document.addEventListener('wheel', preventDefault, { passive: false });
//     return () => document.removeEventListener('wheel', preventDefault);
//   }, []);

//   // Handle element selection
//   const handleElementClick = (elementId: string, event: React.MouseEvent) => {
//     if (event.shiftKey) {
//       setSelectedElements(prev => 
//         prev.includes(elementId)
//           ? prev.filter(id => id !== elementId)
//           : [...prev, elementId]
//       );
//     } else {
//       setSelectedElements([elementId]);
//     }
//   };

//   // Handle keyboard shortcuts
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'Delete' && selectedElements.length > 0) {
//         selectedElements.forEach(id => onElementRemove?.(id));
//         setSelectedElements([]);
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [selectedElements, onElementRemove]);

//   return (
//     <div 
//       className="relative w-full h-full overflow-hidden"
//       onMouseDown={handleMouseDown}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//       onMouseLeave={handleMouseUp}
//       onWheel={handleWheel}
//     >
//       <div
//         ref={canvasRef}
//         className="canvas-base absolute w-full h-full"
//         style={{
//           transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
//           transition: 'transform 0.1s ease-out',
//         }}
//       >
//         {/* Grid */}
//         {showGrid && (
//           <div className="absolute inset-0 grid grid-cols-[repeat(40,minmax(25px,1fr))] grid-rows-[repeat(40,minmax(25px,1fr))] opacity-10">
//             {Array.from({ length: 1600 }).map((_, i) => (
//               <div key={i} className="border border-gray-200" />
//             ))}
//           </div>
//         )}

//         {/* Elements */}
//         {elements.map((element) => (
//           <motion.div
//             key={element.id}
//             className={`absolute cursor-move ${
//               selectedElements.includes(element.id)
//                 ? 'ring-2 ring-blue-500'
//                 : ''
//             }`}
//             initial={false}
//             animate={{
//               x: element.position.x,
//               y: element.position.y,
//               scale: element.scale || 1,
//               rotate: element.rotation || 0,
//             }}
//             drag
//             dragMomentum={false}
//             onDragStart={() => setIsDragging(true)}
//             onDragEnd={(_, info) => {
//               setIsDragging(false);
//               if (onElementUpdate) {
//                 onElementUpdate(element.id, {
//                   position: {
//                     x: element.position.x + info.offset.x,
//                     y: element.position.y + info.offset.y,
//                   },
//                 });
//               }
//             }}
//             onClick={(e) => handleElementClick(element.id, e)}
//           >
//             {renderElement(element)}
            
//             {/* Selection indicator */}
//             {selectedElements.includes(element.id) && (
//               <div className="absolute inset-0 border-2 border-blue-500 rounded pointer-events-none" />
//             )}
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function renderElement(element: CanvasElement) {
//   switch (element.type) {
//     case 'text':
//       return (
//         <div className="p-4 bg-white rounded-lg shadow-lg min-w-[100px]">
//           {element.content}
//         </div>
//       );
//     case 'code':
//       return (
//         <div className="min-w-[200px]">
//           <pre className="p-4 bg-gray-800 text-white rounded-lg">
//             <code>{element.content}</code>
//           </pre>
//         </div>
//       );
//     case 'chart':
//       return (
//         <div className="w-[400px] h-[300px] bg-white p-4 rounded-lg shadow-lg">
//           {element.content}
//         </div>
//       );
//     default:
//       return null;
//   }
// }





// 'use client';

// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import { motion } from 'framer-motion';

// import { useCanvasHistory } from './hooks/useCanvasHistory';
// import { useCanvasGestures } from './hooks/useCanvasGestures';
// import { useCanvasSelection } from './hooks/useCanvasSelection';
// import { useCanvasResize } from './hooks/useCanvasResize';

// // Types
// interface Point {
//   x: number;
//   y: number;
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
//   type: string;
//   content: any;
//   position: Point;
//   size: { width: number; height: number };
//   scale?: number;
//   rotation?: number;
//   selected?: boolean;
//   groupId?: string;
// }

// interface CanvasState {
//   elements: CanvasElement[];
//   connections: Connection[];
//   groups: { [key: string]: string[] }; // groupId -> elementIds
// }

// interface HistoryEntry {
//   elements: CanvasElement[];
//   connections: Connection[];
//   groups: { [key: string]: string[] };
// }

// // Props
// interface CanvasProps {
//   elements: CanvasElement[];
//   connections?: Connection[];
//   onElementAdd?: (element: CanvasElement) => void;
//   onElementUpdate?: (id: string, updates: Partial<CanvasElement>) => void;
//   onElementRemove?: (id: string) => void;
//   onConnectionAdd?: (connection: Connection) => void;
//   onConnectionRemove?: (id: string) => void;
//   showGrid?: boolean;
//   zoom?: number;
// }

// export default function Canvas({
//   elements: initialElements,
//   connections: initialConnections = [],
//   onElementAdd,
//   onElementUpdate,
//   onElementRemove,
//   onConnectionAdd,
//   onConnectionRemove,
//   showGrid = true,
//   zoom = 1,
// }: CanvasProps) {
//   // State
//   const [elements, setElements] = useState<CanvasElement[]>(initialElements);
//   const [connections, setConnections] = useState<Connection[]>(initialConnections);
//   const [groups, setGroups] = useState<{ [key: string]: string[] }>({});
//   const [selectedElements, setSelectedElements] = useState<string[]>([]);
//   const [selectedConnections, setSelectedConnections] = useState<string[]>([]);
//   const [isDragging, setIsDragging] = useState(false);
//   const [isResizing, setIsResizing] = useState(false);
//   const [resizeHandle, setResizeHandle] = useState<string | null>(null);
//   const [pan, setPan] = useState({ x: 0, y: 0 });
//   const [scale, setScale] = useState(1);

//   const { state: canvasState, canUndo, canRedo, undo, redo, saveState } = 
//     useCanvasHistory({ elements: initialElements, connections: initialConnections });
    
//   const { pan, scale, handlers: gestureHandlers } = useCanvasGestures();
  
//   const { selectedElements, selectedConnections, selectElement, selectConnection, clearSelection } = 
//     useCanvasSelection();
    
//   const { resizeState, startResize, updateResize, endResize } = useCanvasResize();
  
//   // History management
//   const [history, setHistory] = useState<HistoryEntry[]>([]);
//   const [historyIndex, setHistoryIndex] = useState(-1);
//   const canvasRef = useRef<HTMLDivElement>(null);

//   // Save state to history
//   const saveToHistory = useCallback(() => {
//     const newEntry: HistoryEntry = {
//       elements: [...elements],
//       connections: [...connections],
//       groups: { ...groups },
//     };

//     setHistory(prev => {
//       const newHistory = prev.slice(0, historyIndex + 1);
//       return [...newHistory, newEntry];
//     });
//     setHistoryIndex(prev => prev + 1);
//   }, [elements, connections, groups, historyIndex]);

//   // Undo/Redo
//   const undo = useCallback(() => {
//     if (historyIndex > 0) {
//       const prevState = history[historyIndex - 1];
//       setElements(prevState.elements);
//       setConnections(prevState.connections);
//       setGroups(prevState.groups);
//       setHistoryIndex(prev => prev - 1);
//     }
//   }, [history, historyIndex]);

//   const redo = useCallback(() => {
//     if (historyIndex < history.length - 1) {
//       const nextState = history[historyIndex + 1];
//       setElements(nextState.elements);
//       setConnections(nextState.connections);
//       setGroups(nextState.groups);
//       setHistoryIndex(prev => prev + 1);
//     }
//   }, [history, historyIndex]);

//   // Element manipulation
//   const handleResize = useCallback((
//     elementId: string,
//     handle: string,
//     deltaX: number,
//     deltaY: number
//   ) => {
//     setElements(prev => prev.map(el => {
//       if (el.id !== elementId) return el;

//       const newSize = { ...el.size };
//       const newPosition = { ...el.position };

//       switch (handle) {
//         case 'n':
//           newSize.height -= deltaY;
//           newPosition.y += deltaY;
//           break;
//         case 's':
//           newSize.height += deltaY;
//           break;
//         case 'e':
//           newSize.width += deltaX;
//           break;
//         case 'w':
//           newSize.width -= deltaX;
//           newPosition.x += deltaX;
//           break;
//         case 'ne':
//           newSize.width += deltaX;
//           newSize.height -= deltaY;
//           newPosition.y += deltaY;
//           break;
//         case 'nw':
//           newSize.width -= deltaX;
//           newSize.height -= deltaY;
//           newPosition.x += deltaX;
//           newPosition.y += deltaY;
//           break;
//         case 'se':
//           newSize.width += deltaX;
//           newSize.height += deltaY;
//           break;
//         case 'sw':
//           newSize.width -= deltaX;
//           newSize.height += deltaY;
//           newPosition.x += deltaX;
//           break;
//       }

//       return {
//         ...el,
//         size: newSize,
//         position: newPosition,
//       };
//     }));
//   }, []);

//   // Group management
//   const createGroup = useCallback(() => {
//     if (selectedElements.length < 2) return;

//     const groupId = `group-${Date.now()}`;
//     setGroups(prev => ({
//       ...prev,
//       [groupId]: selectedElements,
//     }));

//     saveToHistory();
//   }, [selectedElements, saveToHistory]);

//   const ungroup = useCallback(() => {
//     const groupsToRemove = Object.entries(groups)
//       .filter(([_, elementIds]) => 
//         elementIds.some(id => selectedElements.includes(id))
//       )
//       .map(([groupId]) => groupId);

//     setGroups(prev => {
//       const newGroups = { ...prev };
//       groupsToRemove.forEach(groupId => {
//         delete newGroups[groupId];
//       });
//       return newGroups;
//     });

//     saveToHistory();
//   }, [groups, selectedElements, saveToHistory]);

//   // Connection management
//   const startConnection = useCallback((elementId: string, point: Point) => {
//     // Implementation for starting a connection
//   }, []);

//   const updateConnection = useCallback((point: Point) => {
//     // Implementation for updating connection path
//   }, []);

//   const finishConnection = useCallback((targetElementId: string) => {
//     // Implementation for finishing connection
//   }, []);

//   // Render functions
//   const renderResizeHandles = (element: CanvasElement) => (
//     <>
//       {['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'].map(handle => (
//         <div
//           key={handle}
//           className={`absolute w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-${handle}-resize`}
//           style={{
//             ...getResizeHandlePosition(handle, element.size),
//             transform: 'translate(-50%, -50%)',
//           }}
//           onMouseDown={(e) => {
//             e.stopPropagation();
//             setIsResizing(true);
//             setResizeHandle(handle);
//           }}
//         />
//       ))}
//     </>
//   );

//   const renderConnections = () => (
//     <svg className="absolute inset-0 pointer-events-none">
//       {connections.map(connection => (
//         <g key={connection.id}>
//           <path
//             d={generateConnectionPath(connection)}
//             stroke={selectedConnections.includes(connection.id) ? '#3B82F6' : '#94A3B8'}
//             strokeWidth="2"
//             fill="none"
//           />
//         </g>
//       ))}
//     </svg>
//   );

//   // Event handlers
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'Delete') {
//         if (selectedElements.length > 0) {
//           onElementRemove?.(selectedElements[0]);
//           setSelectedElements([]);
//         }
//       }
//       if (e.ctrlKey || e.metaKey) {
//         if (e.key === 'z') {
//           if (e.shiftKey) {
//             redo();
//           } else {
//             undo();
//           }
//         }
//         if (e.key === 'g') {
//           e.preventDefault();
//           if (e.shiftKey) {
//             ungroup();
//           } else {
//             createGroup();
//           }
//         }
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [selectedElements, onElementRemove, undo, redo, createGroup, ungroup]);

//   return (
//     <div className="relative w-full h-full overflow-hidden">
//       <div
//         ref={canvasRef}
//         className="canvas-base absolute w-full h-full"
//         style={{
//           transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
//         }}
//       >
//         {showGrid && renderGrid()}
//         {renderConnections()}
        
//         {elements.map((element) => (
//           <motion.div
//             key={element.id}
//             className={`absolute ${
//               selectedElements.includes(element.id) ? 'ring-2 ring-blue-500' : ''
//             }`}
//             initial={false}
//             animate={{
//               x: element.position.x,
//               y: element.position.y,
//               scale: element.scale || 1,
//               rotate: element.rotation || 0,
//             }}
//             drag
//             dragMomentum={false}
//             onDragStart={() => setIsDragging(true)}
//             onDragEnd={() => {
//               setIsDragging(false);
//               saveToHistory();
//             }}
//           >
//             {renderElement(element)}
//             {selectedElements.includes(element.id) && renderResizeHandles(element)}
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // Helper functions
// function getResizeHandlePosition(handle: string, size: { width: number; height: number }) {
//   const positions = {
//     n: { left: '50%', top: '0%' },
//     s: { left: '50%', top: '100%' },
//     e: { left: '100%', top: '50%' },
//     w: { left: '0%', top: '50%' },
//     ne: { left: '100%', top: '0%' },
//     nw: { left: '0%', top: '0%' },
//     se: { left: '100%', top: '100%' },
//     sw: { left: '0%', top: '100%' },
//   };
//   return positions[handle as keyof typeof positions];
// }

// function generateConnectionPath(connection: Connection): string {
//   // Implementation for generating SVG path
//   return '';
// }

// function renderGrid() {
//   return (
//     <div className="absolute inset-0 grid grid-cols-[repeat(40,minmax(25px,1fr))] grid-rows-[repeat(40,minmax(25px,1fr))] opacity-10">
//       {Array.from({ length: 1600 }).map((_, i) => (
//         <div key={i} className="border border-gray-200" />
//       ))}
//     </div>
//   );
// }

// function renderElement(element: CanvasElement) {
//   // Implementation for rendering different element types
//   return null;
// }





// 'use client';

// import React, { useEffect, useRef, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useCanvasHistory } from './hooks/useCanvasHistory';
// import { useCanvasGestures } from './hooks/useCanvasGestures';
// import { useCanvasSelection } from './hooks/useCanvasSelection';
// import { useCanvasResize } from './hooks/useCanvasResize';
// import CodeBlock from '../CodeBlock';
// import Chart from '../Chart';

// // Types
// interface Point {
//   x: number;
//   y: number;
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
//   scale?: number;
//   rotation?: number;
//   selected?: boolean;
//   groupId?: string;
// }

// interface CanvasProps {
//   elements: CanvasElement[];
//   connections?: Connection[];
//   onElementAdd?: (element: CanvasElement) => void;
//   onElementUpdate?: (id: string, updates: Partial<CanvasElement>) => void;
//   onElementRemove?: (id: string) => void;
//   onConnectionAdd?: (connection: Connection) => void;
//   onConnectionRemove?: (id: string) => void;
//   showGrid?: boolean;
//   zoom?: number;
// }

// export default function Canvas({
//   elements: initialElements,
//   connections: initialConnections = [],
//   onElementAdd,
//   onElementUpdate,
//   onElementRemove,
//   onConnectionAdd,
//   onConnectionRemove,
//   showGrid = true,
//   zoom = 1,
// }: CanvasProps) {
//   const canvasRef = useRef<HTMLDivElement>(null);

//   // Initialize hooks
//   const {
//     state: { elements, connections, groups },
//     canUndo,
//     canRedo,
//     undo,
//     redo,
//     saveState
//   } = useCanvasHistory({
//     elements: initialElements,
//     connections: initialConnections,
//     groups: {}
//   });

//   const {
//     pan,
//     scale,
//     handlers: gestureHandlers
//   } = useCanvasGestures();

//   const {
//     selectedElements,
//     selectedConnections,
//     selectElement,
//     selectConnection,
//     clearSelection
//   } = useCanvasSelection();

//   const {
//     resizeState,
//     startResize,
//     updateResize,
//     endResize
//   } = useCanvasResize();

//   // Connection handlers
//   const handleStartConnection = useCallback((elementId: string, point: Point) => {
//     // Connection creation logic
//   }, []);

//   const handleUpdateConnection = useCallback((point: Point) => {
//     // Connection update logic
//   }, []);

//   const handleFinishConnection = useCallback((targetId: string) => {
//     // Connection completion logic
//   }, []);

//   // Element handlers
//   const handleElementUpdate = useCallback((
//     elementId: string,
//     updates: Partial<CanvasElement>
//   ) => {
//     onElementUpdate?.(elementId, updates);
//     saveState({
//       elements: elements.map(el => 
//         el.id === elementId ? { ...el, ...updates } : el
//       ),
//       connections,
//       groups
//     });
//   }, [elements, connections, groups, onElementUpdate, saveState]);

//   const handleElementResize = useCallback((
//     elementId: string,
//     size: { width: number; height: number },
//     position: Point
//   ) => {
//     handleElementUpdate(elementId, { size, position });
//   }, [handleElementUpdate]);

//   // Keyboard shortcuts
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'Delete' && selectedElements.length > 0) {
//         selectedElements.forEach(id => {
//           onElementRemove?.(id);
//           selectedConnections.forEach(connId => {
//             if (connections.find(conn => 
//               conn.id === connId && (conn.from === id || conn.to === id)
//             )) {
//               onConnectionRemove?.(connId);
//             }
//           });
//         });
//         clearSelection();
//       }

//       if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
//         if (e.shiftKey) {
//           redo();
//         } else {
//           undo();
//         }
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [
//     selectedElements,
//     selectedConnections,
//     connections,
//     onElementRemove,
//     onConnectionRemove,
//     clearSelection,
//     undo,
//     redo
//   ]);

//   // Render functions
//   const renderElement = useCallback((element: CanvasElement) => {
//     switch (element.type) {
//       case 'text':
//         return (
//           <div className="p-4 bg-white rounded-lg shadow-lg min-w-[100px]">
//             {element.content}
//           </div>
//         );
//       case 'code':
//         return (
//           <div className="min-w-[200px]">
//             <CodeBlock
//               code={element.content}
//               language="typescript"
//               showLineNumbers={true}
//             />
//           </div>
//         );
//       case 'chart':
//         return (
//           <div className="w-[400px] h-[300px]">
//             <Chart {...element.content} />
//           </div>
//         );
//       case 'diagram':
//         return (
//           <div className="p-4 bg-white rounded-lg shadow-lg">
//             {/* Diagram rendering logic */}
//             {element.content}
//           </div>
//         );
//       case 'table':
//         return (
//           <div className="p-4 bg-white rounded-lg shadow-lg">
//             {/* Table rendering logic */}
//             {element.content}
//           </div>
//         );
//       default:
//         return null;
//     }
//   }, []);

//   return (
//     <div 
//       className="relative w-full h-full overflow-hidden bg-gray-50"
//       {...gestureHandlers}
//     >
//       <div
//         ref={canvasRef}
//         className="canvas-base absolute w-full h-full"
//         style={{
//           transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
//           transition: 'transform 0.1s ease-out',
//         }}
//       >
//         {/* Grid */}
//         {showGrid && (
//           <div className="absolute inset-0 grid grid-cols-[repeat(40,minmax(25px,1fr))] grid-rows-[repeat(40,minmax(25px,1fr))] opacity-10">
//             {Array.from({ length: 1600 }).map((_, i) => (
//               <div key={i} className="border border-gray-200" />
//             ))}
//           </div>
//         )}

//         {/* Connections */}
//         <svg className="absolute inset-0 pointer-events-none">
//           <AnimatePresence>
//             {connections.map(connection => (
//               <motion.path
//                 key={connection.id}
//                 d={generateConnectionPath(connection)}
//                 stroke={selectedConnections.includes(connection.id) ? '#3B82F6' : '#94A3B8'}
//                 strokeWidth="2"
//                 fill="none"
//                 initial={{ pathLength: 0, opacity: 0 }}
//                 animate={{ pathLength: 1, opacity: 1 }}
//                 exit={{ pathLength: 0, opacity: 0 }}
//                 transition={{ duration: 0.3 }}
//               />
//             ))}
//           </AnimatePresence>
//         </svg>

//         {/* Elements */}
//         <AnimatePresence>
//           {elements.map((element) => (
//             <motion.div
//               key={element.id}
//               className={`absolute ${
//                 selectedElements.includes(element.id) ? 'ring-2 ring-blue-500' : ''
//               }`}
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{
//                 opacity: 1,
//                 scale: element.scale || 1,
//                 x: element.position.x,
//                 y: element.position.y,
//                 rotate: element.rotation || 0,
//               }}
//               exit={{ opacity: 0, scale: 0.8 }}
//               drag
//               dragMomentum={false}
//               onDragStart={() => startResize(element.id, element.size, element.position)}
//               onDrag={(e, info) => {
//                 if (resizeState.isResizing) {
//                   const updates = updateResize(info.offset.x, info.offset.y);
//                   if (updates) {
//                     handleElementResize(element.id, updates.size, updates.position);
//                   }
//                 }
//               }}
//               onDragEnd={() => {
//                 endResize();
//                 saveState({ elements, connections, groups });
//               }}
//               onClick={(e) => selectElement(element.id, e.shiftKey)}
//             >
//               {renderElement(element)}
              
//               {/* Resize handles */}
//               {selectedElements.includes(element.id) && (
//                 <div className="absolute inset-0">
//                   {['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'].map(handle => (
//                     <div
//                       key={handle}
//                       className={`absolute w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-${handle}-resize`}
//                       style={{
//                         ...getResizeHandlePosition(handle),
//                         transform: 'translate(-50%, -50%)',
//                       }}
//                       onMouseDown={(e) => {
//                         e.stopPropagation();
//                         startResize(element.id, element.size, element.position);
//                       }}
//                     />
//                   ))}
//                 </div>
//               )}
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

// // Helper functions
// function getResizeHandlePosition(handle: string) {
//   const positions: { [key: string]: { left: string; top: string } } = {
//     n: { left: '50%', top: '0%' },
//     s: { left: '50%', top: '100%' },
//     e: { left: '100%', top: '50%' },
//     w: { left: '0%', top: '50%' },
//     ne: { left: '100%', top: '0%' },
//     nw: { left: '0%', top: '0%' },
//     se: { left: '100%', top: '100%' },
//     sw: { left: '0%', top: '100%' },
//   };
//   return positions[handle];
// }

// function generateConnectionPath(connection: Connection): string {
//   // Implement connection path generation
//   // For now, return a straight line between points
//   return `M ${connection.from} L ${connection.to}`;
// }






// 'use client';

// import React, { useEffect, useRef, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// import useStore from '@/store/useStore';
// import { wsService } from '@/lib/websocket';
// import { selectedElementsSelector, activeCollaboratorsSelector } from '@/store/selectors';

// import { useCanvasHistory } from './hooks/useCanvasHistory';
// import { useCanvasGestures } from './hooks/useCanvasGestures';
// import { useCanvasSelection } from './hooks/useCanvasSelection';
// import { useCanvasResize } from './hooks/useCanvasResize';
// import CodeBlock from '../CodeBlock';
// import Chart from '../Chart';
// import { CursorPresence } from '../CursorPresence';
// import { CollaborationToolbar } from '../CollaborationToolbar';


// 'use client';

// import React, { useEffect, useRef, useCallback, useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// import useStore from '../../app/store/useStore';
// import { wsService } from '../../app/lib/websocket';
// import { selectedElementsSelector, activeCollaboratorsSelector } from '../../app/store/selectors';

// import { useCanvasHistory } from './hooks/useCanvasHistory';
// import { useCanvasGestures } from './hooks/useCanvasGestures';
// import { useCanvasSelection } from './hooks/useCanvasSelection';
// import { useCanvasResize } from './hooks/useCanvasResize';
// import CodeBlock from '../CodeBlock';
// import Chart from '../Chart';
// import { CursorPresence } from '../CursorPresence';
// import { CollaborationToolbar } from '../CollaborationToolbar';

// // 'use client';

// // import React, { useEffect, useRef, useCallback } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';

// // Use path aliases instead of relative paths
// // import useStore from '@/store/useStore';

// // import { wsService } from '@/lib/websocket';

// // import { selectedElementsSelector, activeCollaboratorsSelector } from '@/store/selectors';

// // Keep local imports as relative paths
// // import { useCanvasHistory } from './hooks/useCanvasHistory';
// // import { useCanvasGestures } from './hooks/useCanvasGestures';
// // import { useCanvasSelection } from './hooks/useCanvasSelection';
// // import { useCanvasResize } from './hooks/useCanvasResize';
// // import CodeBlock from '../CodeBlock';
// // import Chart from '../Chart';
// // import { CursorPresence } from '../CursorPresence';
// // import { CollaborationToolbar } from '../CollaborationToolbar';


// // Types
// interface Point {
//   x: number;
//   y: number;
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
//   scale?: number;
//   rotation?: number;
//   selected?: boolean;
//   groupId?: string;
// }

// export default function Canvas() {
//   const canvasRef = useRef<HTMLDivElement>(null);

  

//   // // Store state and actions
//   // const {
//   //   elements,
//   //   connections,
//   //   groups,
//   //   addElement,
//   //   updateElement,
//   //   removeElement,
//   //   selectedElements,
//   //   setSelectedElements,
//   //   cursorPositions,
//   //   updateCursorPosition,
//   //   collaborators,
//   //   scale,
//   //   setScale,
//   //   history,
//   //   undo,
//   //   redo,
//   // } = useStore();


//    // Memoized store selectors
//    const {
//     elements = [],
//     connections = [],
//     groups = {},
//     addElement,
//     updateElement,
//     removeElement,
//     selectedElements,
//     setSelectedElements,
//     cursorPositions,
//     updateCursorPosition,
//     collaborators,
//     scale,
//     setScale,
//     error,
//     setError,
//     addConnection,
//     updateConnection,
//     removeConnection,
//   } = useStore();


//   // Custom hooks
//   const {
//     state: { elements: historyElements, connections: historyConnections, groups: historyGroups },
//     canUndo,
//     canRedo,
//     saveState
//   } = useCanvasHistory({
//     elements,
//     connections,
//     groups
//   });

//   const { handlers: gestureHandlers, pan } = useCanvasGestures();
//   const { startResize, updateResize, endResize, resizeState } = useCanvasResize();

//   // Selectors
//   // const selectedElementsList = useStore(selectedElementsSelector);
//   // const activeCollaborators = useStore(activeCollaboratorsSelector);

//    // Memoized selections
//    const selectedElementsList = useMemo(() => 
//     elements.filter(el => selectedElements.includes(el.id)),
//     [elements, selectedElements]
//   );

//   const activeCollaborators = useMemo(() => 
//     collaborators.filter(c => 
//       cursorPositions[c.id] && 
//       Date.now() - new Date(cursorPositions[c.id].timestamp).getTime() < 30000
//     ),
//     [collaborators, cursorPositions]
//   );
  

//   // WebSocket setup
//   useEffect(() => {
//     wsService.connect();
//     return () => wsService.disconnect();
//   }, []);

//   // Cursor handling
//   const handleMouseMove = useCallback((e: React.MouseEvent) => {
//     if (!canvasRef.current) return;
    
//     const rect = canvasRef.current.getBoundingClientRect();
//     const position = {
//       x: (e.clientX - rect.left) / scale,
//       y: (e.clientY - rect.top) / scale
//     };
    
//     updateCursorPosition(position);
//     wsService.sendMessage('CURSOR_UPDATE', { position });
//   }, [updateCursorPosition, scale]);

//   // Element manipulation
//   const handleElementUpdate = useCallback((
//     elementId: string,
//     updates: Partial<CanvasElement>
//   ) => {
//     updateElement(elementId, updates);
//     wsService.sendMessage('ELEMENT_UPDATE', { elementId, updates });
//     saveState({
//       elements: elements.map(el => 
//         el.id === elementId ? { ...el, ...updates } : el
//       ),
//       connections,
//       groups
//     });
//   }, [elements, connections, groups, updateElement, saveState]);

//   const handleElementAdd = useCallback((element: Omit<CanvasElement, 'id'>) => {
//     const newElement = addElement(element);
//     wsService.sendMessage('ELEMENT_ADD', { element: newElement });
//     saveState({
//       elements: [...elements, newElement],
//       connections,
//       groups
//     });
//   }, [addElement, elements, connections, groups, saveState]);

//   const handleElementRemove = useCallback((elementId: string) => {
//     removeElement(elementId);
//     wsService.sendMessage('ELEMENT_REMOVE', { elementId });
//   }, [removeElement]);

//   // Connection handlers
//   const handleStartConnection = useCallback((elementId: string, point: Point) => {
//     // Connection creation logic
//   }, []);

//   const handleUpdateConnection = useCallback((point: Point) => {
//     // Connection update logic
//   }, []);

//   const handleFinishConnection = useCallback((targetId: string) => {
//     // Connection completion logic
//   }, []);

//   // Keyboard shortcuts
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'Delete' && selectedElements.length > 0) {
//         selectedElements.forEach(handleElementRemove);
//         setSelectedElements([]);
//       }

//       if (e.ctrlKey || e.metaKey) {
//         if (e.key === 'z') {
//           if (e.shiftKey) redo();
//           else undo();
//         }
//         // Add more shortcuts here
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [selectedElements, setSelectedElements, handleElementRemove, undo, redo]);

//   // Render functions
//   const renderElement = useCallback((element: CanvasElement) => {
//     switch (element.type) {
//       case 'text':
//         return (
//           <div className="p-4 bg-white rounded-lg shadow-lg min-w-[100px]">
//             {element.content}
//           </div>
//         );
//       case 'code':
//         return (
//           <div className="min-w-[200px]">
//             <CodeBlock
//               code={element.content}
//               language="typescript"
//               showLineNumbers={true}
//             />
//           </div>
//         );
//       case 'chart':
//         return (
//           <div className="w-[400px] h-[300px]">
//             <Chart {...element.content} />
//           </div>
//         );
//       case 'diagram':
//       case 'table':
//         return (
//           <div className="p-4 bg-white rounded-lg shadow-lg">
//             {element.content}
//           </div>
//         );
//       default:
//         return null;
//     }
//   }, []);

//   return (
//     <div 
//       className="relative w-full h-full overflow-hidden bg-gray-50"
//       {...gestureHandlers}
//       onMouseMove={handleMouseMove}
//     >
//       {/* Collaboration Toolbar */}
//       <CollaborationToolbar />

//       {/* Main Canvas */}
//       <div
//         ref={canvasRef}
//         className="canvas-base absolute w-full h-full"
//         style={{
//           transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
//           transformOrigin: '0 0',
//           transition: 'transform 0.1s ease-out',
//         }}
//       >
//         {/* Grid */}
//         <div className="absolute inset-0 grid grid-cols-[repeat(40,minmax(25px,1fr))] grid-rows-[repeat(40,minmax(25px,1fr))] opacity-10 pointer-events-none">
//           {Array.from({ length: 1600 }).map((_, i) => (
//             <div key={i} className="border border-gray-200" />
//           ))}
//         </div>

//         {/* Connections */}
//         <svg className="absolute inset-0 pointer-events-none">
//           <AnimatePresence>
//             {connections.map(connection => (
//               <motion.path
//                 key={connection.id}
//                 d={generateConnectionPath(connection)}
//                 stroke={selectedElements.includes(connection.id) ? '#3B82F6' : '#94A3B8'}
//                 strokeWidth="2"
//                 fill="none"
//                 initial={{ pathLength: 0, opacity: 0 }}
//                 animate={{ pathLength: 1, opacity: 1 }}
//                 exit={{ pathLength: 0, opacity: 0 }}
//                 transition={{ duration: 0.3 }}
//               />
//             ))}
//           </AnimatePresence>
//         </svg>

//         {/* Elements */}
//         <AnimatePresence>
//           {elements.map((element) => (
//             <motion.div
//               key={element.id}
//               className={`absolute ${
//                 selectedElements.includes(element.id) ? 'ring-2 ring-blue-500' : ''
//               }`}
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{
//                 opacity: 1,
//                 scale: element.scale || 1,
//                 x: element.position.x,
//                 y: element.position.y,
//                 rotate: element.rotation || 0,
//               }}
//               exit={{ opacity: 0, scale: 0.8 }}
//               drag
//               dragMomentum={false}
//               onDragStart={() => startResize(element.id, element.size, element.position)}
//               onDrag={(e, info) => {
//                 if (resizeState.isResizing) {
//                   const updates = updateResize(info.offset.x, info.offset.y);
//                   if (updates) {
//                     handleElementUpdate(element.id, {
//                       size: updates.size,
//                       position: updates.position,
//                     });
//                   }
//                 }
//               }}
//               onDragEnd={endResize}
//             >
//               {renderElement(element)}
              
//               {/* Resize Handles */}
//               {selectedElements.includes(element.id) && (
//                 <div className="absolute inset-0">
//                   {['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'].map(handle => (
//                     <div
//                       key={handle}
//                       className={`absolute w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-${handle}-resize`}
//                       style={{
//                         ...getResizeHandlePosition(handle),
//                         transform: 'translate(-50%, -50%)',
//                       }}
//                       onMouseDown={(e) => {
//                         e.stopPropagation();
//                         startResize(element.id, element.size, element.position);
//                       }}
//                     />
//                   ))}
//                 </div>
//               )}
//             </motion.div>
//           ))}
//         </AnimatePresence>

//         {/* Collaborator Cursors */}
//         {activeCollaborators.map((collaborator) => (
//           <CursorPresence
//             key={collaborator.id}
//             user={collaborator}
//             position={cursorPositions[collaborator.id]}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // Helper functions
// function getResizeHandlePosition(handle: string) {
//   const positions: { [key: string]: { left: string; top: string } } = {
//     n: { left: '50%', top: '0%' },
//     s: { left: '50%', top: '100%' },
//     e: { left: '100%', top: '50%' },
//     w: { left: '0%', top: '50%' },
//     ne: { left: '100%', top: '0%' },
//     nw: { left: '0%', top: '0%' },
//     se: { left: '100%', top: '100%' },
//     sw: { left: '0%', top: '100%' },
//   };
//   return positions[handle];
// }

// function generateConnectionPath(connection: Connection): string {
//   if (connection.type === 'curved' && connection.controlPoints?.length === 2) {
//     const [cp1, cp2] = connection.controlPoints;
//     return `M ${connection.from} C ${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${connection.to}`;
//   }
//   return `M ${connection.from} L ${connection.to}`;
// }


//WORKING ALMOST

// 'use client';

// import React, { useEffect, useRef, useCallback, useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// // Update these imports to match your file structure
// import useStore from '../../store/useStore';
// import { wsService } from '../../lib/websocket';
// import { selectedElementsSelector, activeCollaboratorsSelector } from '../../store/selectors';

// // Local imports remain the same
// import { useCanvasHistory } from './hooks/useCanvasHistory';
// import { useCanvasGestures } from './hooks/useCanvasGestures';
// import { useCanvasSelection } from './hooks/useCanvasSelection';
// import { useCanvasResize } from './hooks/useCanvasResize';
// import CodeBlock from '../CodeBlock';
// import Chart from '../Chart';
// import { CursorPresence } from '../CursorPresence';
// import { CollaborationToolbar } from '../CollaborationToolbar';



// // 'use client';

// // import React, { useEffect, useRef, useCallback, useMemo } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';

// // // import useStore from '../../app/store/useStore';
// // // import { wsService } from '../../app/lib/websocket';
// // // import { wsService } from '../../lib/websocket';
// // // import { selectedElementsSelector, activeCollaboratorsSelector } from '../../app/store/selectors';


// // import useStore from '@/store/useStore';
// // // import { wsService } from '@/lib/websocket';
// // // import { wsService } from '../../lib/websocket';
// // import { wsService } from '@/lib/websocket';

// // import { selectedElementsSelector, activeCollaboratorsSelector } from '@/store/selectors';



// // import { useCanvasHistory } from './hooks/useCanvasHistory';
// // import { useCanvasGestures } from './hooks/useCanvasGestures';
// // import { useCanvasSelection } from './hooks/useCanvasSelection';
// // import { useCanvasResize } from './hooks/useCanvasResize';
// // import CodeBlock from '../CodeBlock';
// // import Chart from '../Chart';
// // import { CursorPresence } from '../CursorPresence';
// // import { CollaborationToolbar } from '../CollaborationToolbar';

// // Types
// interface Point {
//   x: number;
//   y: number;
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
//   scale?: number;
//   rotation?: number;
//   selected?: boolean;
//   groupId?: string;
// }

// export default function Canvas() {
//   const canvasRef = useRef<HTMLDivElement>(null);

//   // Memoized store selectors with error handling
//   const {
//     elements = [],
//     connections = [],
//     groups = {},
//     addElement,
//     updateElement,
//     removeElement,
//     selectedElements,
//     setSelectedElements,
//     cursorPositions,
//     updateCursorPosition,
//     collaborators,
//     scale,
//     setScale,
//     error,
//     setError,
//     addConnection,
//     updateConnection,
//     removeConnection,
//     undo,   // Add this
//     redo    // Add this
//   } = useStore();

//   // Custom hooks with error boundaries
//   const {
//     state: { elements: historyElements, connections: historyConnections, groups: historyGroups },
//     canUndo,
//     canRedo,
//     saveState
//   } = useCanvasHistory({
//     elements,
//     connections,
//     groups
//   });

//   const { handlers: gestureHandlers, pan } = useCanvasGestures();
//   const { startResize, updateResize, endResize, resizeState } = useCanvasResize();

//   // Memoized selections with error handling
//   const selectedElementsList = useMemo(() => 
//     elements.filter(el => selectedElements.includes(el.id)),
//     [elements, selectedElements]
//   );

//   const activeCollaborators = useMemo(() => 
//     collaborators.filter(c => 
//       cursorPositions[c.id] && 
//       Date.now() - new Date(cursorPositions[c.id].timestamp).getTime() < 30000
//     ),
//     [collaborators, cursorPositions]
//   );

//   // WebSocket setup with error handling
//   useEffect(() => {
//     try {
//       wsService.connect();
//       return () => wsService.disconnect();
//     } catch (error) {
//       setError('Failed to establish WebSocket connection');
//     }
//   }, []);

//   // Cursor handling with error handling
//   const handleMouseMove = useCallback((e: React.MouseEvent) => {
//     try {
//       if (!canvasRef.current) return;
      
//       const rect = canvasRef.current.getBoundingClientRect();
//       const position = {
//         x: (e.clientX - rect.left) / scale,
//         y: (e.clientY - rect.top) / scale
//       };
      
//       updateCursorPosition(position);
//       wsService.sendMessage('CURSOR_UPDATE', { position });
//     } catch (error) {
//       setError('Failed to update cursor position');
//     }
//   }, [updateCursorPosition, scale, setError]);

//   // Element manipulation with error handling
//   const handleElementUpdate = useCallback((
//     elementId: string,
//     updates: Partial<CanvasElement>
//   ) => {
//     try {
//       updateElement(elementId, updates);
//       wsService.sendMessage('ELEMENT_UPDATE', { elementId, updates });
//       saveState({
//         elements: elements.map(el => 
//           el.id === elementId ? { ...el, ...updates } : el
//         ),
//         connections,
//         groups
//       });
//     } catch (error) {
//       setError('Failed to update element');
//     }
//   }, [elements, connections, groups, updateElement, saveState, setError]);

//   const handleElementAdd = useCallback((element: Omit<CanvasElement, 'id'>) => {
//     try {
//       const newElement = addElement(element);
//       wsService.sendMessage('ELEMENT_ADD', { element: newElement });
//       saveState({
//         elements: [...elements, newElement],
//         connections,
//         groups
//       });
//     } catch (error) {
//       setError('Failed to add element');
//     }
//   }, [addElement, elements, connections, groups, saveState, setError]);

//   const handleElementRemove = useCallback((elementId: string) => {
//     try {
//       removeElement(elementId);
//       wsService.sendMessage('ELEMENT_REMOVE', { elementId });
//     } catch (error) {
//       setError('Failed to remove element');
//     }
//   }, [removeElement, setError]);

//   // Enhanced connection handlers with error handling
//   const handleStartConnection = useCallback((elementId: string, point: Point) => {
//     try {
//       const newConnection: Omit<Connection, 'id'> = {
//         from: elementId,
//         to: '',
//         type: 'straight',
//         controlPoints: [point]
//       };
//       addConnection(newConnection);
//     } catch (error) {
//       setError('Failed to start connection');
//     }
//   }, [addConnection, setError]);

//   const handleUpdateConnection = useCallback((point: Point) => {
//     try {
//       const lastConnection = connections[connections.length - 1];
//       if (lastConnection) {
//         updateConnection(lastConnection.id, {
//           controlPoints: [...(lastConnection.controlPoints || []), point]
//         });
//       }
//     } catch (error) {
//       setError('Failed to update connection');
//     }
//   }, [connections, updateConnection, setError]);

//   const handleFinishConnection = useCallback((targetId: string) => {
//     try {
//       const lastConnection = connections[connections.length - 1];
//       if (lastConnection) {
//         updateConnection(lastConnection.id, { to: targetId });
//       }
//     } catch (error) {
//       setError('Failed to finish connection');
//     }
//   }, [connections, updateConnection, setError]);

//   // Keyboard shortcuts with error handling
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       try {
//         if (e.key === 'Delete' && selectedElements.length > 0) {
//           selectedElements.forEach(handleElementRemove);
//           setSelectedElements([]);
//         }

//         if (e.ctrlKey || e.metaKey) {
//           if (e.key === 'z') {
//             if (e.shiftKey) redo();
//             else undo();
//           }
//           // Add more shortcuts here
//         }
//       } catch (error) {
//         setError('Failed to process keyboard shortcut');
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [selectedElements, setSelectedElements, handleElementRemove, undo, redo]);

//   // Render functions with error handling
//   const renderElement = useCallback((element: CanvasElement) => {
//     try {
//       switch (element.type) {
//         case 'text':
//           return (
//             <div className="p-4 bg-white rounded-lg shadow-lg min-w-[100px]">
//               {element.content}
//             </div>
//           );
//         case 'code':
//           return (
//             <div className="min-w-[200px]">
//               <CodeBlock
//                 code={element.content}
//                 language="typescript"
//                 showLineNumbers={true}
//               />
//             </div>
//           );
//         case 'chart':
//           return (
//             <div className="w-[400px] h-[300px]">
//               <Chart {...element.content} />
//             </div>
//           );
//         case 'diagram':
//         case 'table':
//           return (
//             <div className="p-4 bg-white rounded-lg shadow-lg">
//               {element.content}
//             </div>
//           );
//         default:
//           return null;
//       }
//     } catch (error) {
//       setError('Failed to render element');
//       return null;
//     }
//   }, [setError]);

//   return (
//     <div 
//       className="relative w-full h-full overflow-hidden bg-gray-50"
//       {...gestureHandlers}
//       onMouseMove={handleMouseMove}
//     >
//       {/* Error Display */}
//       {error && (
//         <div className="absolute top-4 left-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           {error}
//           <button 
//             className="ml-2 font-bold"
//             onClick={() => setError(null)}
//           >
//             ×
//           </button>
//         </div>
//       )}

//       {/* Collaboration Toolbar */}
//       <CollaborationToolbar />

//       {/* Main Canvas */}
//       <div
//         ref={canvasRef}
//         className="canvas-base absolute w-full h-full"
//         style={{
//           transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
//           transformOrigin: '0 0',
//           transition: 'transform 0.1s ease-out',
//         }}
//       >
//         {/* Grid */}
//         <div className="absolute inset-0 grid grid-cols-[repeat(40,minmax(25px,1fr))] grid-rows-[repeat(40,minmax(25px,1fr))] opacity-10 pointer-events-none">
//           {Array.from({ length: 1600 }).map((_, i) => (
//             <div key={i} className="border border-gray-200" />
//           ))}
//         </div>

//         {/* Connections */}
//         <svg className="absolute inset-0 pointer-events-none">
//           <AnimatePresence>
//             {connections.map(connection => (
//               <motion.path
//                 key={connection.id}
//                 d={generateConnectionPath(connection)}
//                 stroke={selectedElements.includes(connection.id) ? '#3B82F6' : '#94A3B8'}
//                 strokeWidth="2"
//                 fill="none"
//                 initial={{ pathLength: 0, opacity: 0 }}
//                 animate={{ pathLength: 1, opacity: 1 }}
//                 exit={{ pathLength: 0, opacity: 0 }}
//                 transition={{ duration: 0.3 }}
//               />
//             ))}
//           </AnimatePresence>
//         </svg>

//         {/* Elements */}
//         <AnimatePresence>
//           {elements.map((element) => (
//             <motion.div
//               key={element.id}
//               className={`absolute ${
//                 selectedElements.includes(element.id) ? 'ring-2 ring-blue-500' : ''
//               }`}
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{
//                 opacity: 1,
//                 scale: element.scale || 1,
//                 x: element.position.x,
//                 y: element.position.y,
//                 rotate: element.rotation || 0,
//               }}
//               exit={{ opacity: 0, scale: 0.8 }}
//               drag
//               dragMomentum={false}
//               onDragStart={() => startResize(element.id, element.size, element.position)}
//               onDrag={(e, info) => {
//                 if (resizeState.isResizing) {
//                   const updates = updateResize(info.offset.x, info.offset.y);
//                   if (updates) {
//                     handleElementUpdate(element.id, {
//                       size: updates.size,
//                       position: updates.position,
//                     });
//                   }
//                 }
//               }}
//               onDragEnd={endResize}
//             >
//               {renderElement(element)}
              
//               {/* Resize Handles */}
//               {selectedElements.includes(element.id) && (
//                 <div className="absolute inset-0">
//                   {['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'].map(handle => (
//                     <div
//                       key={handle}
//                       className={`absolute w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-${handle}-resize`}
//                       style={{
//                         ...getResizeHandlePosition(handle),
//                         transform: 'translate(-50%, -50%)',
//                       }}
//                       onMouseDown={(e) => {
//                         e.stopPropagation();
//                         startResize(element.id, element.size, element.position);
//                       }}
//                     />
//                   ))}
//                 </div>
//               )}
//             </motion.div>
//           ))}
//         </AnimatePresence>

//         {/* Collaborator Cursors */}
//         {activeCollaborators.map((collaborator) => (
//           <CursorPresence
//             key={collaborator.id}
//             user={collaborator}
//             position={cursorPositions[collaborator.id]}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // Helper functions with error handling
// function getResizeHandlePosition(handle: string) {
//   const positions: { [key: string]: { left: string; top: string } } = {
//     n: { left: '50%', top: '0%' },
//     s: { left: '50%', top: '100%' },
//     e: { left: '100%', top: '50%' },
//     w: { left: '0%', top: '50%' },
//     ne: { left: '100%', top: '0%' },
//     nw: { left: '0%', top: '0%' },
//     se: { left: '100%', top: '100%' },
//     sw: { left: '0%', top: '100%' },
//   };
//   return positions[handle];
// }

// function generateConnectionPath(connection: Connection): string {
//   try {
//     if (connection.type === 'curved' && connection.controlPoints?.length === 2) {
//       const [cp1, cp2] = connection.controlPoints;
//       return `M ${connection.from} C ${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${connection.to}`;
//     }
//     return `M ${connection.from} L ${connection.to}`;
//   } catch (error) {
//     console.error('Failed to generate connection path:', error);
//     return '';
//   }
// }







// TRY

// 'use client';

// import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import useStore from '../../store/useStore';
// import { wsService } from '../../lib/websocket';
// import { useCanvasHistory } from './hooks/useCanvasHistory';
// import { useCanvasGestures } from './hooks/useCanvasGestures';
// import { useCanvasSelection } from './hooks/useCanvasSelection';
// import { useCanvasResize } from './hooks/useCanvasResize';
// import CodeBlock from '../CodeBlock';
// import Chart from '../Chart';
// import { CursorPresence } from '../CursorPresence';
// import { CollaborationToolbar } from '../CollaborationToolbar';
// import MermaidDiagram from '../MermaidDiagram';
// import { CanvasToolbar } from '../CanvasToolbar';

// // Types for AI Integration
// interface AIResearchResponse {
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

// interface Point {
//   x: number;
//   y: number;
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
//   type: 'text' | 'code' | 'chart' | 'diagram' | 'table' | 'mermaid' | 'meeting-transcript' | 'proposal';
//   content: any;
//   position: Point;
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
//   };
// }

// export default function Canvas() {
//   const canvasRef = useRef<HTMLDivElement>(null);
//   const [isConnecting, setIsConnecting] = useState(false);
//   const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState(Date.now());
//   const [loading, setLoading] = useState(false);

//   // Store selectors with expanded functionality
//   const {
//     elements = [],
//     connections = [],
//     groups = {},
//     addElement,
//     updateElement,
//     removeElement,
//     selectedElements,
//     setSelectedElements,
//     cursorPositions,
//     updateCursorPosition,
//     collaborators,
//     scale,
//     setScale,
//     error,
//     setError,
//     addConnection,
//     updateConnection,
//     removeConnection,
//     undo,
//     redo,
//     // New state handlers for AI integration
//     setResearchResults,
//     setProposalData,
//     addCollaborator,
//     removeCollaborator,
//     updateCollaborator
//   } = useStore();

//   // Custom hooks
//   const { state: historyState, canUndo, canRedo, saveState } = useCanvasHistory({
//     elements,
//     connections,
//     groups
//   });

//   const { handlers: gestureHandlers, pan } = useCanvasGestures();
//   const { startResize, updateResize, endResize, resizeState } = useCanvasResize();
//   const { selection, updateSelection } = useCanvasSelection();



// // Element handlers - These MUST come first
// const handleElementAdd = useCallback((element: Omit<CanvasElement, 'id'>) => {
//   const newElement = addElement(element);
//   wsService.sendMessage('ELEMENT_ADD', { element: newElement });
  
//   const timeoutId = setTimeout(() => {
//     saveState({
//       elements: [...elements, newElement],
//       connections,
//       groups
//     });
//   }, 1000);

//   return () => clearTimeout(timeoutId);
// }, [addElement, elements, connections, groups, saveState]);

// const handleElementUpdate = useCallback((
//   elementId: string,
//   updates: Partial<CanvasElement>
// ) => {
//   updateElement(elementId, updates);
//   wsService.sendMessage('ELEMENT_UPDATE', { elementId, updates });
  
//   const timeoutId = setTimeout(() => {
//     saveState({
//       elements: elements.map(el => 
//         el.id === elementId ? { ...el, ...updates } : el
//       ),
//       connections,
//       groups
//     });
//   }, 1000);

//   return () => clearTimeout(timeoutId);
// }, [elements, connections, groups, updateElement, saveState]);

// const handleElementRemove = useCallback((elementId: string) => {
//   try {
//     const connectedPaths = connections.filter(
//       conn => conn.from === elementId || conn.to === elementId
//     );
//     connectedPaths.forEach(path => removeConnection(path.id));

//     removeElement(elementId);
//     wsService.sendMessage('ELEMENT_REMOVE', { elementId });

//     saveState({
//       elements: elements.filter(el => el.id !== elementId),
//       connections: connections.filter(
//         conn => conn.from !== elementId && conn.to !== elementId
//       ),
//       groups
//     });
//   } catch (error) {
//     setError('Failed to remove element and its connections');
//   }
// }, [removeElement, removeConnection, elements, connections, groups, saveState, setError]);

// // Visualization element creators
// const createChartElement = useCallback((data: AIResearchResponse) => {
//   const chartElement: Omit<CanvasElement, 'id'> = {
//     type: 'chart',
//     content: {
//       data: [
//         { name: 'Daily Passengers', value: data.daily_passengers },
//         { name: 'EV Spaces', value: data.ev_parking_spaces }
//       ],
//       type: 'bar'
//     },
//     position: { x: 100, y: 100 },
//     size: { width: 400, height: 300 },
//     metadata: {
//       source: data.sources?.[0]?.url,
//       timestamp: new Date().toISOString(),
//       confidence: data.confidence
//     }
//   };
//   handleElementAdd(chartElement);
// }, [handleElementAdd]);

// const createCompetitorTable = useCallback((competitors: AIResearchResponse['competitors']) => {
//   if (!competitors) return;
  
//   const tableElement: Omit<CanvasElement, 'id'> = {
//     type: 'table',
//     content: {
//       headers: ['Company', 'Stations', 'Locations'],
//       rows: competitors.map(comp => [
//         comp.name,
//         comp.stations.toString(),
//         comp.locations.join(', ')
//       ])
//     },
//     position: { x: 100, y: 450 },
//     size: { width: 400, height: 200 }
//   };
//   handleElementAdd(tableElement);
// }, [handleElementAdd]);

// // AI Integration handlers
// const handleResearchQuery = async (query: string) => {
//   try {
//     setLoading(true);
//     const response = await fetch('/api/research', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ query })
//     });

//     if (!response.ok) throw new Error('Research query failed');
    
//     const data: AIResearchResponse = await response.json();
    
//     if (data.daily_passengers || data.ev_parking_spaces) {
//       createChartElement(data);
//     }
//     if (data.competitors) {
//       createCompetitorTable(data.competitors);
//     }
    
//     setResearchResults(data);
//   } catch (error) {
//     setError('Failed to process research query');
//   } finally {
//     setLoading(false);
//   }
// };







//   // AI Research Integration
//   const handleResearchQuery = async (query: string) => {
//     try {
//       setLoading(true);
//       const response = await fetch('/api/research', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ query })
//       });

//       if (!response.ok) throw new Error('Research query failed');
      
//       const data: AIResearchResponse = await response.json();
      
//       if (data.daily_passengers || data.ev_parking_spaces) {
//         createChartElement(data);
//       }
//       if (data.competitors) {
//         createCompetitorTable(data.competitors);
//       }
      
//       setResearchResults(data);
      
//     } catch (error) {
//       setError('Failed to process research query');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Create visualization elements from research data
//   const createChartElement = useCallback((data: AIResearchResponse) => {
//     const chartElement: Omit<CanvasElement, 'id'> = {
//       type: 'chart',
//       content: {
//         data: [
//           { name: 'Daily Passengers', value: data.daily_passengers },
//           { name: 'EV Spaces', value: data.ev_parking_spaces }
//         ],
//         type: 'bar'
//       },
//       position: { x: 100, y: 100 },
//       size: { width: 400, height: 300 },
//       metadata: {
//         source: data.sources?.[0]?.url,
//         timestamp: new Date().toISOString(),
//         confidence: data.confidence
//       }
//     };
//     handleElementAdd(chartElement);
//   }, [handleElementAdd]);

//   const createCompetitorTable = useCallback((competitors: AIResearchResponse['competitors']) => {
//     if (!competitors) return;
    
//     const tableElement: Omit<CanvasElement, 'id'> = {
//       type: 'table',
//       content: {
//         headers: ['Company', 'Stations', 'Locations'],
//         rows: competitors.map(comp => [
//           comp.name,
//           comp.stations.toString(),
//           comp.locations.join(', ')
//         ])
//       },
//       position: { x: 100, y: 450 },
//       size: { width: 400, height: 200 }
//     };
//     handleElementAdd(tableElement);
//   }, [handleElementAdd]);

//   // Proposal Generation
//   const handleProposalGeneration = async (template: string, requirements: string[]) => {
//     try {
//       setLoading(true);
//       const response = await fetch('/api/generate_proposal', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ template, requirements })
//       });

//       if (!response.ok) throw new Error('Proposal generation failed');
      
//       const data: ProposalData = await response.json();
      
//       const proposalElement: Omit<CanvasElement, 'id'> = {
//         type: 'proposal',
//         content: {
//           title: data.generated_proposal,
//           content: requirements,
//           metadata: data.metadata
//         },
//         position: { x: 100, y: 100 },
//         size: { width: 500, height: 400 },
//         metadata: {
//           author: data.metadata.author,
//           version: data.metadata.version,
//           timestamp: new Date().toISOString()
//         }
//       };
      
//       handleElementAdd(proposalElement);
//       setProposalData(data);
      
//     } catch (error) {
//       setError('Failed to generate proposal');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Template-based operations
//   const handleTemplateBasedCreation = async (templateType: string, data: any) => {
//     try {
//       switch (templateType) {
//         case 'research':
//           await handleResearchQuery(data.query);
//           break;
//         case 'proposal':
//           await handleProposalGeneration(data.template, data.requirements);
//           break;
//         default:
//           throw new Error(`Unknown template type: ${templateType}`);
//       }
//     } catch (error) {
//       setError(`Failed to process ${templateType} template`);
//     }
//   };

//   // Cursor handling with throttling
//   const handleMouseMove = useCallback((e: React.MouseEvent) => {
//     const now = Date.now();
//     if (now - lastUpdateTimestamp < 50) return;

//     if (!canvasRef.current) return;
    
//     const rect = canvasRef.current.getBoundingClientRect();
//     const position = {
//       x: (e.clientX - rect.left) / scale,
//       y: (e.clientY - rect.top) / scale
//     };
    
//     updateCursorPosition(position);
//     wsService.sendMessage('CURSOR_UPDATE', { position });
//     setLastUpdateTimestamp(now);
//   }, [updateCursorPosition, scale, lastUpdateTimestamp]);

//   // Element handlers with debouncing
//   const handleElementUpdate = useCallback((
//     elementId: string,
//     updates: Partial<CanvasElement>
//   ) => {
//     updateElement(elementId, updates);
//     wsService.sendMessage('ELEMENT_UPDATE', { elementId, updates });
    
//     const timeoutId = setTimeout(() => {
//       saveState({
//         elements: elements.map(el => 
//           el.id === elementId ? { ...el, ...updates } : el
//         ),
//         connections,
//         groups
//       });
//     }, 1000);

//     return () => clearTimeout(timeoutId);
//   }, [elements, connections, groups, updateElement, saveState]);

//   const handleElementAdd = useCallback((element: Omit<CanvasElement, 'id'>) => {
//     const newElement = addElement(element);
//     wsService.sendMessage('ELEMENT_ADD', { element: newElement });
    
//     const timeoutId = setTimeout(() => {
//       saveState({
//         elements: [...elements, newElement],
//         connections,
//         groups
//       });
//     }, 1000);

//     return () => clearTimeout(timeoutId);
//   }, [addElement, elements, connections, groups, saveState]);

//   const handleElementRemove = useCallback((elementId: string) => {
//     try {
//       // Remove connected paths first
//       const connectedPaths = connections.filter(
//         conn => conn.from === elementId || conn.to === elementId
//       );
//       connectedPaths.forEach(path => removeConnection(path.id));

//       // Remove the element
//       removeElement(elementId);
//       wsService.sendMessage('ELEMENT_REMOVE', { elementId });

//       // Update history
//       saveState({
//         elements: elements.filter(el => el.id !== elementId),
//         connections: connections.filter(
//           conn => conn.from !== elementId && conn.to !== elementId
//         ),
//         groups
//       });
//     } catch (error) {
//       setError('Failed to remove element and its connections');
//     }
//   }, [removeElement, removeConnection, elements, connections, groups, saveState, setError]);

//   // Connection handlers
//   const handleStartConnection = useCallback((elementId: string, point: Point) => {
//     try {
//       const newConnection: Omit<Connection, 'id'> = {
//         from: elementId,
//         to: '',
//         type: 'straight',
//         controlPoints: [point]
//       };
//       addConnection(newConnection);
//     } catch (error) {
//       setError('Failed to start connection');
//     }
//   }, [addConnection, setError]);

//   const handleUpdateConnection = useCallback((point: Point) => {
//     try {
//       const lastConnection = connections[connections.length - 1];
//       if (lastConnection) {
//         updateConnection(lastConnection.id, {
//           controlPoints: [...(lastConnection.controlPoints || []), point]
//         });
//       }
//     } catch (error) {
//       setError('Failed to update connection');
//     }
//   }, [connections, updateConnection, setError]);

//   const handleFinishConnection = useCallback((targetId: string) => {
//     try {
//       const lastConnection = connections[connections.length - 1];
//       if (lastConnection) {
//         updateConnection(lastConnection.id, { to: targetId });
//       }
//     } catch (error) {
//       setError('Failed to finish connection');
//     }
//   }, [connections, updateConnection, setError]);

//   // Workspace operations
//   const saveWorkspace = useCallback(async () => {
//     try {
//       const workspace = {
//         elements,
//         connections,
//         groups,
//         metadata: {
//           lastModified: new Date().toISOString(),
//           version: '1.0'
//         }
//       };
      
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       console.log('Workspace saved:', workspace);
      
//     } catch (error) {
//       setError('Failed to save workspace');
//     }
//   }, [elements, connections, groups]);

//   // Keyboard shortcuts
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       try {
//         if (e.key === 'Delete' && selectedElements.length > 0) {
//           selectedElements.forEach(handleElementRemove);
//           setSelectedElements([]);
//         }

//         if (e.ctrlKey || e.metaKey) {
//           switch (e.key.toLowerCase()) {
//             case 'z':
//               if (e.shiftKey) redo();
//               else undo();
//               break;
//             case 's':
//               e.preventDefault();
//               saveWorkspace();
//               break;
//             case 'c':
//               // Copy implementation
//               break;
//             case 'v':
//               // Paste implementation
//               break;
//             case 'g':
//               e.preventDefault();
//               // Group implementation
//               break;
//           }
//         }
//       } catch (error) {
//         setError('Failed to process keyboard shortcut');
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [selectedElements, handleElementRemove, setSelectedElements, undo, redo, saveWorkspace]);

//   // WebSocket setup
//   useEffect(() => {
//     if (isConnecting) return;

//     const connectWebSocket = async () => {
//       try {
//         setIsConnecting(true);
//         await wsService.connect();
//       } catch (error) {
//         setError('Failed to establish WebSocket connection');
//       } finally {
//         setIsConnecting(false);
//       }
//     };

//     connectWebSocket();
//     return () => wsService.disconnect();
//   }, [setError]);

//   // Enhanced render function
//   const renderElement = useCallback((element: CanvasElement) => {
//     try {
//       switch (element.type) {
//         case 'text':
//           return (
//             <div className="p-4 bg-white rounded-lg shadow-lg min-w-[100px]">
//               {element.content}
//             </div>
//           );
//         case 'code':
//           return (
//             <div className="min-w-[200px]">
//               <CodeBlock
//                 code={element.content}
//                 language="typescript"
//                 showLineNumbers={true}
//               />
//             </div>
//           );
//         case 'chart':
//           return (
//             <div className="w-96 h-64">
//               <Chart {...element.content} />
//             </div>
//           );
//         case 'mermaid':
//           return (
//             <div className="p-4 bg-white rounded-lg shadow-lg">
//               <MermaidDiagram content={element.content} />
//             </div>
//           );

//         case 'meeting-transcript':
//           return (
//             <div className="p-4 bg-white rounded-lg shadow-lg max-w-2xl">
//               <div className="text-sm text-gray-500 mb-2">
//                 Meeting Transcript - {new Date(element.metadata?.timestamp || '').toLocaleString()}
//               </div>
//               {element.content}
//             </div>
//           );
//         case 'proposal':
//           return (
//             <div className="p-6 bg-white rounded-lg shadow-lg max-w-3xl">
//               <div className="text-lg font-semibold mb-4">
//                 {element.content.title}
//               </div>
//               <div className="space-y-2">
//                 {element.content.content.map((req: string, index: number) => (
//                   <div key={index} className="flex items-start gap-2">
//                     <span className="text-blue-500">•</span>
//                     <span>{req}</span>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-4 text-sm text-gray-500">
//                 Author: {element.metadata?.author} | Version: {element.metadata?.version}
//               </div>
//             </div>
//           );
//         case 'diagram':
//         case 'table':
//           return (
//             <div className="p-4 bg-white rounded-lg shadow-lg">
//               {element.content}
//             </div>
//           );
//         default:
//           return null;
//       }
//     } catch (error) {
//       setError('Failed to render element');
//       return null;
//     }
//   }, [setError]);

//   return (
//     <div 
//       className="relative w-full h-full overflow-hidden bg-gray-50"
//       {...gestureHandlers}
//       onMouseMove={handleMouseMove}
//     >
//       {/* Loading Indicator */}
//       {loading && (
//         <div className="absolute top-4 right-4 flex items-center space-x-2">
//           <div className="spinner" />
//           <span className="text-gray-600">Processing...</span>
//         </div>
//       )}

//       {/* Error Display */}
//       {error && (
//         <div className="absolute top-4 left-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           {error}
//           <button 
//             className="ml-2 font-bold"
//             onClick={() => setError(null)}
//           >
//             ×
//           </button>
//         </div>
//       )}

//       {/* Collaboration Toolbar */}
//       <CollaborationToolbar />

//       {/* Main Canvas */}
//       <div
//         ref={canvasRef}
//         className="canvas-base absolute w-full h-full"
//         style={{
//           transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
//           transformOrigin: '0 0',
//           transition: 'transform 0.1s ease-out',
//         }}
//       >
//         {/* Grid */}
//         <div className="absolute inset-0 grid grid-cols-[repeat(40,minmax(25px,1fr))] grid-rows-[repeat(40,minmax(25px,1fr))] opacity-10 pointer-events-none">
//           {Array.from({ length: 1600 }).map((_, i) => (
//             <div key={i} className="border border-gray-200" />
//           ))}
//         </div>

//         {/* Connections */}
//         <svg className="absolute inset-0 pointer-events-none">
//           <AnimatePresence>
//             {connections.map(connection => (
//               <motion.path
//                 key={connection.id}
//                 d={generateConnectionPath(connection)}
//                 stroke={selectedElements.includes(connection.id) ? '#3B82F6' : '#94A3B8'}
//                 strokeWidth="2"
//                 fill="none"
//                 initial={{ pathLength: 0, opacity: 0 }}
//                 animate={{ pathLength: 1, opacity: 1 }}
//                 exit={{ pathLength: 0, opacity: 0 }}
//                 transition={{ duration: 0.3 }}
//               />
//             ))}
//           </AnimatePresence>
//         </svg>

//         {/* Elements */}
//         <AnimatePresence>
//           {elements.map((element) => (
//             <motion.div
//               key={element.id}
//               className={`absolute ${
//                 selectedElements.includes(element.id) ? 'ring-2 ring-blue-500' : ''
//               }`}
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{
//                 opacity: 1,
//                 scale: element.scale || 1,
//                 x: element.position.x,
//                 y: element.position.y,
//                 rotate: element.rotation || 0,
//               }}
//               exit={{ opacity: 0, scale: 0.8 }}
//               drag
//               dragMomentum={false}
//               onDragStart={() => startResize(element.id, element.size, element.position)}
//               onDrag={(e, info) => {
//                 if (resizeState.isResizing) {
//                   const updates = updateResize(info.offset.x, info.offset.y);
//                   if (updates) {
//                     handleElementUpdate(element.id, {
//                       size: updates.size,
//                       position: updates.position,
//                     });
//                   }
//                 }
//               }}
//               onDragEnd={endResize}
//             >
//               {renderElement(element)}
              
//               {/* Resize Handles */}
//               {selectedElements.includes(element.id) && (
//                 <div className="absolute inset-0">
//                   {['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'].map(handle => (
//                     <div
//                       key={handle}
//                       className={`absolute w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-${handle}-resize`}
//                       style={{
//                         ...getResizeHandlePosition(handle),
//                         transform: 'translate(-50%, -50%)',
//                       }}
//                       onMouseDown={(e) => {
//                         e.stopPropagation();
//                         startResize(element.id, element.size, element.position);
//                       }}
//                     />
//                   ))}
//                 </div>
//               )}
//             </motion.div>
//           ))}
//         </AnimatePresence>

//         {/* Collaborator Cursors */}
//         {activeCollaborators.map((collaborator) => (
//           <CursorPresence
//             key={collaborator.id}
//             user={collaborator}
//             position={cursorPositions[collaborator.id]}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// // Helper functions with error handling
// function getResizeHandlePosition(handle: string) {
//   const positions: { [key: string]: { left: string; top: string } } = {
//     n: { left: '50%', top: '0%' },
//     s: { left: '50%', top: '100%' },
//     e: { left: '100%', top: '50%' },
//     w: { left: '0%', top: '50%' },
//     ne: { left: '100%', top: '0%' },
//     nw: { left: '0%', top: '0%' },
//     se: { left: '100%', top: '100%' },
//     sw: { left: '0%', top: '100%' },
//   };
//   return positions[handle];
// }

// function generateConnectionPath(connection: Connection): string {
//   try {
//     if (!connection.from || !connection.to) return '';
    
//     if (connection.type === 'curved' && connection.controlPoints?.length === 2) {
//       const [cp1, cp2] = connection.controlPoints;
//       return `M ${connection.from} C ${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${connection.to}`;
//     }

//     return `M ${connection.from} L ${connection.to}`;
//   } catch (error) {
//     console.error('Failed to generate connection path:', error);
//     return '';
//   }
// }


// try 2 - Sonnet 3.5


// 'use client';

// import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import useStore from '../../store/useStore';
// import { wsService } from '../../lib/websocket';
// import { useCanvasHistory } from './hooks/useCanvasHistory';
// import { useCanvasGestures } from './hooks/useCanvasGestures';
// import { useCanvasSelection } from './hooks/useCanvasSelection';
// import { useCanvasResize } from './hooks/useCanvasResize';
// import CodeBlock from '../CodeBlock';
// import Chart from '../Chart';
// import { CursorPresence } from '../CursorPresence';
// import { CollaborationToolbar } from '../CollaborationToolbar';
// import MermaidDiagram from '../MermaidDiagram';
// import { CanvasToolbar } from '../CanvasToolbar';

// import Toolbar from '../Toolbar';


// // Types for AI Integration
// interface AIResearchResponse {
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

// interface Point {
//   x: number;
//   y: number;
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
//   type: 'text' | 'code' | 'chart' | 'diagram' | 'table' | 'mermaid' | 'meeting-transcript' | 'proposal';
//   content: any;
//   position: Point;
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
//   };
// }


// // Helper functions
// function getResizeHandlePosition(handle: string) {
//   const positions: { [key: string]: { left: string; top: string } } = {
//     n: { left: '50%', top: '0%' },
//     s: { left: '50%', top: '100%' },
//     e: { left: '100%', top: '50%' },
//     w: { left: '0%', top: '50%' },
//     ne: { left: '100%', top: '0%' },
//     nw: { left: '0%', top: '0%' },
//     se: { left: '100%', top: '100%' },
//     sw: { left: '0%', top: '100%' },
//   };
//   return positions[handle];
// }

// function generateConnectionPath(connection: Connection): string {
//   try {
//     if (!connection.from || !connection.to) return '';
    
//     if (connection.type === 'curved' && connection.controlPoints?.length === 2) {
//       const [cp1, cp2] = connection.controlPoints;
//       return `M ${connection.from} C ${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${connection.to}`;
//     }

//     return `M ${connection.from} L ${connection.to}`;
//   } catch (error) {
//     console.error('Failed to generate connection path:', error);
//     return '';
//   }
// }

// function Canvas() {
//   const canvasRef = useRef<HTMLDivElement>(null);
//   const [isConnecting, setIsConnecting] = useState(false);
//   const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState(Date.now());
//   const [loading, setLoading] = useState(false);

//   // Store selectors with expanded functionality
//   const {
//     elements = [],
//     connections = [],
//     groups = {},
//     addElement,
//     updateElement,
//     removeElement,
//     selectedElements,
//     setSelectedElements,
//     cursorPositions,
//     updateCursorPosition,
//     collaborators,
//     scale,
//     setScale,
//     error,
//     setError,
//     addConnection,
//     updateConnection,
//     removeConnection,
//     undo,
//     redo,
//     // New state handlers for AI integration
//     setResearchResults,
//     setProposalData,
//     addCollaborator,
//     removeCollaborator,
//     updateCollaborator
//   } = useStore();

//   // Custom hooks
//   const { state: historyState, canUndo, canRedo, saveState } = useCanvasHistory({
//     elements,
//     connections,
//     groups
//   });

//   const { handlers: gestureHandlers, pan } = useCanvasGestures();
//   const { startResize, updateResize, endResize, resizeState } = useCanvasResize();
//   const { selection, updateSelection } = useCanvasSelection();

//   // Base element handlers - MUST be defined first
//   const handleElementAdd = useCallback((element: Omit<CanvasElement, 'id'>) => {
//     const newElement = addElement(element);
//     wsService.sendMessage('ELEMENT_ADD', { element: newElement });
    
//     const timeoutId = setTimeout(() => {
//       saveState({
//         elements: [...elements, newElement],
//         connections,
//         groups
//       });
//     }, 1000);

//     return () => clearTimeout(timeoutId);
//   }, [addElement, elements, connections, groups, saveState]);

//   const handleElementUpdate = useCallback((
//     elementId: string,
//     updates: Partial<CanvasElement>
//   ) => {
//     updateElement(elementId, updates);
//     wsService.sendMessage('ELEMENT_UPDATE', { elementId, updates });
    
//     const timeoutId = setTimeout(() => {
//       saveState({
//         elements: elements.map(el => 
//           el.id === elementId ? { ...el, ...updates } : el
//         ),
//         connections,
//         groups
//       });
//     }, 1000);

//     return () => clearTimeout(timeoutId);
//   }, [elements, connections, groups, updateElement, saveState]);

//   const handleElementRemove = useCallback((elementId: string) => {
//     try {
//       const connectedPaths = connections.filter(
//         conn => conn.from === elementId || conn.to === elementId
//       );
//       connectedPaths.forEach(path => removeConnection(path.id));

//       removeElement(elementId);
//       wsService.sendMessage('ELEMENT_REMOVE', { elementId });

//       saveState({
//         elements: elements.filter(el => el.id !== elementId),
//         connections: connections.filter(
//           conn => conn.from !== elementId && conn.to !== elementId
//         ),
//         groups
//       });
//     } catch (error) {
//       setError('Failed to remove element and its connections');
//     }
//   }, [removeElement, removeConnection, elements, connections, groups, saveState, setError]);

//   // Connection handlers
//   const handleStartConnection = useCallback((elementId: string, point: Point) => {
//     try {
//       const newConnection: Omit<Connection, 'id'> = {
//         from: elementId,
//         to: '',
//         type: 'straight',
//         controlPoints: [point]
//       };
//       addConnection(newConnection);
//     } catch (error) {
//       setError('Failed to start connection');
//     }
//   }, [addConnection, setError]);

//   const handleUpdateConnection = useCallback((point: Point) => {
//     try {
//       const lastConnection = connections[connections.length - 1];
//       if (lastConnection) {
//         updateConnection(lastConnection.id, {
//           controlPoints: [...(lastConnection.controlPoints || []), point]
//         });
//       }
//     } catch (error) {
//       setError('Failed to update connection');
//     }
//   }, [connections, updateConnection, setError]);

//   const handleFinishConnection = useCallback((targetId: string) => {
//     try {
//       const lastConnection = connections[connections.length - 1];
//       if (lastConnection) {
//         updateConnection(lastConnection.id, { to: targetId });
//       }
//     } catch (error) {
//       setError('Failed to finish connection');
//     }
//   }, [connections, updateConnection, setError]);

//   // Visualization creators
//   const createChartElement = useCallback((data: AIResearchResponse) => {
//     const chartElement: Omit<CanvasElement, 'id'> = {
//       type: 'chart',
//       content: {
//         data: [
//           { name: 'Daily Passengers', value: data.daily_passengers },
//           { name: 'EV Spaces', value: data.ev_parking_spaces }
//         ],
//         type: 'bar'
//       },
//       position: { x: 100, y: 100 },
//       size: { width: 400, height: 300 },
//       metadata: {
//         source: data.sources?.[0]?.url,
//         timestamp: new Date().toISOString(),
//         confidence: data.confidence
//       }
//     };
//     handleElementAdd(chartElement);
//   }, [handleElementAdd]);

//   const createCompetitorTable = useCallback((competitors: AIResearchResponse['competitors']) => {
//     if (!competitors) return;
    
//     const tableElement: Omit<CanvasElement, 'id'> = {
//       type: 'table',
//       content: {
//         headers: ['Company', 'Stations', 'Locations'],
//         rows: competitors.map(comp => [
//           comp.name,
//           comp.stations.toString(),
//           comp.locations.join(', ')
//         ])
//       },
//       position: { x: 100, y: 450 },
//       size: { width: 400, height: 200 }
//     };
//     handleElementAdd(tableElement);
//   }, [handleElementAdd]);

//   // AI Research Integration
//   const handleResearchQuery = async (query: string) => {
//     try {
//       setLoading(true);
//       const response = await fetch('/api/research', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ query })
//       });

//       if (!response.ok) throw new Error('Research query failed');
      
//       const data: AIResearchResponse = await response.json();
      
//       if (data.daily_passengers || data.ev_parking_spaces) {
//         createChartElement(data);
//       }
//       if (data.competitors) {
//         createCompetitorTable(data);
//       }
      
//       setResearchResults(data);
//     } catch (error) {
//       setError('Failed to process research query');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Proposal Generation
//   const handleProposalGeneration = async (template: string, requirements: string[]) => {
//     try {
//       setLoading(true);
//       const response = await fetch('/api/generate_proposal', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ template, requirements })
//       });

//       if (!response.ok) throw new Error('Proposal generation failed');
      
//       const data: ProposalData = await response.json();
      
//       const proposalElement: Omit<CanvasElement, 'id'> = {
//         type: 'proposal',
//         content: {
//           title: data.generated_proposal,
//           content: requirements,
//           metadata: data.metadata
//         },
//         position: { x: 100, y: 100 },
//         size: { width: 500, height: 400 },
//         metadata: {
//           author: data.metadata.author,
//           version: data.metadata.version,
//           timestamp: new Date().toISOString()
//         }
//       };
      
//       handleElementAdd(proposalElement);
//       setProposalData(data);
//     } catch (error) {
//       setError('Failed to generate proposal');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Template operations
//   const handleTemplateBasedCreation = async (templateType: string, data: any) => {
//     try {
//       switch (templateType) {
//         case 'research':
//           await handleResearchQuery(data.query);
//           break;
//         case 'proposal':
//           await handleProposalGeneration(data.template, data.requirements);
//           break;
//         default:
//           throw new Error(`Unknown template type: ${templateType}`);
//       }
//     } catch (error) {
//       setError(`Failed to process ${templateType} template`);
//     }
//   };

//   // Cursor handling with throttling
//   const handleMouseMove = useCallback((e: React.MouseEvent) => {
//     const now = Date.now();
//     if (now - lastUpdateTimestamp < 50) return;

//     if (!canvasRef.current) return;
    
//     const rect = canvasRef.current.getBoundingClientRect();
//     const position = {
//       x: (e.clientX - rect.left) / scale,
//       y: (e.clientY - rect.top) / scale
//     };
    
//     updateCursorPosition(position);
//     wsService.sendMessage('CURSOR_UPDATE', { position });
//     setLastUpdateTimestamp(now);
//   }, [updateCursorPosition, scale, lastUpdateTimestamp]);

//   // Workspace operations
//   const saveWorkspace = useCallback(async () => {
//     try {
//       const workspace = {
//         elements,
//         connections,
//         groups,
//         metadata: {
//           lastModified: new Date().toISOString(),
//           version: '1.0'
//         }
//       };
      
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       console.log('Workspace saved:', workspace);
//     } catch (error) {
//       setError('Failed to save workspace');
//     }
//   }, [elements, connections, groups]);

//   // Keyboard shortcuts
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       try {
//         if (e.key === 'Delete' && selectedElements.length > 0) {
//           selectedElements.forEach(handleElementRemove);
//           setSelectedElements([]);
//         }

//         if (e.ctrlKey || e.metaKey) {
//           switch (e.key.toLowerCase()) {
//             case 'z':
//               if (e.shiftKey) redo();
//               else undo();
//               break;
//             case 's':
//               e.preventDefault();
//               saveWorkspace();
//               break;
//             case 'c':
//               // Will implement copy functionality
//               break;
//             case 'v':
//               // Will implement paste functionality
//               break;
//             case 'g':
//               e.preventDefault();
//               // Will implement group functionality
//               break;
//           }
//         }
//       } catch (error) {
//         setError('Failed to process keyboard shortcut');
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [selectedElements, handleElementRemove, setSelectedElements, undo, redo, saveWorkspace]);

//   // WebSocket setup
//   useEffect(() => {
//     if (isConnecting) return;

//     const connectWebSocket = async () => {
//       try {
//         setIsConnecting(true);
//         await wsService.connect();
//       } catch (error) {
//         setError('Failed to establish WebSocket connection');
//       } finally {
//         setIsConnecting(false);
//       }
//     };

//     connectWebSocket();
//     return () => wsService.disconnect();
//   }, [setError]);

//   // Enhanced render function
//   const renderElement = useCallback((element: CanvasElement) => {
//     try {
//       switch (element.type) {
//         case 'text':
//           return (
//             <div className="p-4 bg-white rounded-lg shadow-lg min-w-[100px]">
//               {element.content}
//             </div>
//           );
//         case 'code':
//           return (
//             <div className="min-w-[200px]">
//               <CodeBlock
//                 code={element.content}
//                 language="typescript"
//                 showLineNumbers={true}
//               />
//             </div>
//           );
//         case 'chart':
//           return (
//             <div className="w-96 h-64">
//               <Chart {...element.content} />
//             </div>
//           );
//         case 'mermaid':
//           return (
//             <div className="p-4 bg-white rounded-lg shadow-lg">
//               <MermaidDiagram content={element.content} />
//             </div>
//           );
//         case 'meeting-transcript':
//           return (
//             <div className="p-4 bg-white rounded-lg shadow-lg max-w-2xl">
//               <div className="text-sm text-gray-500 mb-2">
//                 Meeting Transcript - {new Date(element.metadata?.timestamp || '').toLocaleString()}
//               </div>
//               {element.content}
//             </div>
//           );
//         case 'proposal':
//           return (
//             <div className="p-6 bg-white rounded-lg shadow-lg max-w-3xl">
//               <div className="text-lg font-semibold mb-4">
//                 {element.content.title}
//               </div>
//               <div className="space-y-2">
//                 {element.content.content.map((req: string, index: number) => (
//                   <div key={index} className="flex items-start gap-2">
//                     <span className="text-blue-500">•</span>
//                     <span>{req}</span>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-4 text-sm text-gray-500">
//                 Author: {element.metadata?.author} | Version: {element.metadata?.version}
//               </div>
//             </div>
//           );
//         case 'diagram':
//         case 'table':
//           return (
//             <div className="p-4 bg-white rounded-lg shadow-lg">
//               {element.content}
//             </div>
//           );
//         default:
//           return null;
//       }
//     } catch (error) {
//       setError('Failed to render element');
//       return null;
//     }
//   }, [setError]);

//   return (
//     <div 
//       className="relative w-full h-full overflow-hidden bg-gray-50"
//       {...gestureHandlers}
//       onMouseMove={handleMouseMove}
//     >
//       {/* Loading Indicator */}
//       {loading && (
//         <div className="absolute top-4 right-4 flex items-center space-x-2">
//           <div className="spinner" />
//           <span className="text-gray-600">Processing...</span>
//         </div>
//       )}

//       {/* Error Display */}
//       {error && (
//         <div className="absolute top-4 left-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           {error}
//           <button 
//             className="ml-2 font-bold"
//             onClick={() => setError(null)}
//           >
//             ×
//           </button>
//         </div>
//       )}

//       {/* Collaboration Toolbar */}
//       <CollaborationToolbar />

//       {/* Canvas Toolbar */}
//       <CanvasToolbar
//         onAddElement={handleElementAdd}
//       />

//       {/* Main Canvas */}
//       <div
//         ref={canvasRef}
//         className="canvas-base absolute w-full h-full"
//         style={{
//           transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
//           transformOrigin: '0 0',
//           transition: 'transform 0.1s ease-out',
//         }}
//       >
//         {/* Grid */}
//         <div className="absolute inset-0 grid grid-cols-[repeat(40,minmax(25px,1fr))] grid-rows-[repeat(40,minmax(25px,1fr))] opacity-10 pointer-events-none">
//           {Array.from({ length: 1600 }).map((_, i) => (
//             <div key={i} className="border border-gray-200" />
//           ))}
//         </div>

//         {/* Connections */}
//         <svg className="absolute inset-0 pointer-events-none">
//           <AnimatePresence>
//             {connections.map(connection => (
//               <motion.path
//                 key={connection.id}
//                 d={generateConnectionPath(connection)}
//                 stroke={selectedElements.includes(connection.id) ? '#3B82F6' : '#94A3B8'}
//                 strokeWidth="2"
//                 fill="none"
//                 initial={{ pathLength: 0, opacity: 0 }}
//                 animate={{ pathLength: 1, opacity: 1 }}
//                 exit={{ pathLength: 0, opacity: 0 }}
//                 transition={{ duration: 0.3 }}
//               />
//             ))}
//           </AnimatePresence>
//         </svg>

//         {/* Elements */}
//         <AnimatePresence>
//           {elements.map((element) => (
//             <motion.div
//               key={element.id}
//               className={`absolute ${
//                 selectedElements.includes(element.id) ? 'ring-2 ring-blue-500' : ''
//               }`}
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{
//                 opacity: 1,
//                 scale: element.scale || 1,
//                 x: element.position.x,
//                 y: element.position.y,
//                 rotate: element.rotation || 0,
//               }}
//               exit={{ opacity: 0, scale: 0.8 }}
//               drag
//               dragMomentum={false}
//               onDragStart={() => startResize(element.id, element.size, element.position)}
//               onDrag={(e, info) => {
//                 if (resizeState.isResizing) {
//                   const updates = updateResize(info.offset.x, info.offset.y);
//                   if (updates) {
//                     handleElementUpdate(element.id, {
//                       size: updates.size,
//                       position: updates.position,
//                     });
//                   }
//                 }
//               }}
//               onDragEnd={endResize}
//             >
//               {renderElement(element)}
              
//               {/* Resize Handles */}
//               {selectedElements.includes(element.id) && (
//                 <div className="absolute inset-0">
//                   {['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'].map(handle => (
//                     <div
//                       key={handle}
//                       className={`absolute w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-${handle}-resize`}
//                       style={{
//                         ...getResizeHandlePosition(handle),
//                         transform: 'translate(-50%, -50%)',
//                       }}
//                       onMouseDown={(e) => {
//                         e.stopPropagation();
//                         startResize(element.id, element.size, element.position);
//                       }}
//                     />
//                   ))}
//                 </div>
//               )}
//             </motion.div>
//           ))}
//         </AnimatePresence>

//         {/* Collaborator Cursors */}
//         {activeCollaborators.map((collaborator) => (
//           <CursorPresence
//             key={collaborator.id}
//             user={collaborator}
//             position={cursorPositions[collaborator.id]}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Canvas;



// 01

// 'use client';

// import React, { useEffect, useRef, useCallback, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import useStore from '../../store/useStore';
// import { wsService } from '../../lib/websocket';
// import { useCanvasHistory } from './hooks/useCanvasHistory';
// import { useCanvasGestures } from './hooks/useCanvasGestures';
// import { useCanvasSelection } from './hooks/useCanvasSelection';
// import { useCanvasResize } from './hooks/useCanvasResize';
// import CodeBlock from '../CodeBlock';
// import Chart from '../Chart';
// import { CursorPresence } from '../CursorPresence';
// import { CollaborationToolbar } from '../CollaborationToolbar';
// import MermaidDiagram from '../MermaidDiagram';
// // Import CanvasToolbar as a default import (not named)
// import CanvasToolbar from '../CanvasToolbar';
// import Toolbar from '../Toolbar';

// // Types for AI Integration
// interface AIResearchResponse {
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

// interface Point {
//   x: number;
//   y: number;
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
//   type: 'text' | 'code' | 'chart' | 'diagram' | 'table' | 'mermaid' | 'meeting-transcript' | 'proposal';
//   content: any;
//   position: Point;
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
//   };
// }

// // Helper functions
// function getResizeHandlePosition(handle: string) {
//   const positions: { [key: string]: { left: string; top: string } } = {
//     n: { left: '50%', top: '0%' },
//     s: { left: '50%', top: '100%' },
//     e: { left: '100%', top: '50%' },
//     w: { left: '0%', top: '50%' },
//     ne: { left: '100%', top: '0%' },
//     nw: { left: '0%', top: '0%' },
//     se: { left: '100%', top: '100%' },
//     sw: { left: '0%', top: '100%' },
//   };
//   return positions[handle];
// }

// function generateConnectionPath(connection: Connection): string {
//   try {
//     if (!connection.from || !connection.to) return '';

//     if (connection.type === 'curved' && connection.controlPoints?.length === 2) {
//       const [cp1, cp2] = connection.controlPoints;
//       return `M ${connection.from} C ${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${connection.to}`;
//     }

//     return `M ${connection.from} L ${connection.to}`;
//   } catch (error) {
//     console.error('Failed to generate connection path:', error);
//     return '';
//   }
// }

// function Canvas() {
//   const canvasRef = useRef<HTMLDivElement>(null);
//   const [isConnecting, setIsConnecting] = useState(false);
//   const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState(Date.now());
//   const [loading, setLoading] = useState(false);
//   const [showGrid, setShowGrid] = useState(true);

//   // Store selectors with expanded functionality
//   const {
//     elements = [],
//     connections = [],
//     groups = {},
//     addElement,
//     updateElement,
//     removeElement,
//     selectedElements,
//     setSelectedElements,
//     cursorPositions,
//     updateCursorPosition,
//     collaborators,
//     scale,
//     setScale,
//     error,
//     setError,
//     addConnection,
//     updateConnection,
//     removeConnection,
//     undo,
//     redo,
//     // New state handlers for AI integration
//     setResearchResults,
//     setProposalData,
//     addCollaborator,
//     removeCollaborator,
//     updateCollaborator
//   } = useStore();

//   // Custom hooks
//   const { state: historyState, canUndo, canRedo, saveState } = useCanvasHistory({
//     elements,
//     connections,
//     groups
//   });

//   const { handlers: gestureHandlers, pan } = useCanvasGestures();
//   const { startResize, updateResize, endResize, resizeState } = useCanvasResize();
//   const { selection, updateSelection } = useCanvasSelection();

//   // Base element handlers
//   const handleElementAdd = useCallback((element: Omit<CanvasElement, 'id'>) => {
//     const newElement = addElement(element);
//     wsService.sendMessage('ELEMENT_ADD', { element: newElement });

//     const timeoutId = setTimeout(() => {
//       saveState({
//         elements: [...elements, newElement],
//         connections,
//         groups
//       });
//     }, 1000);

//     return () => clearTimeout(timeoutId);
//   }, [addElement, elements, connections, groups, saveState]);

//   const handleElementUpdate = useCallback((
//     elementId: string,
//     updates: Partial<CanvasElement>
//   ) => {
//     updateElement(elementId, updates);
//     wsService.sendMessage('ELEMENT_UPDATE', { elementId, updates });

//     const timeoutId = setTimeout(() => {
//       saveState({
//         elements: elements.map(el =>
//           el.id === elementId ? { ...el, ...updates } : el
//         ),
//         connections,
//         groups
//       });
//     }, 1000);

//     return () => clearTimeout(timeoutId);
//   }, [elements, connections, groups, updateElement, saveState]);

//   const handleElementRemove = useCallback((elementId: string) => {
//     try {
//       const connectedPaths = connections.filter(
//         conn => conn.from === elementId || conn.to === elementId
//       );
//       connectedPaths.forEach(path => removeConnection(path.id));

//       removeElement(elementId);
//       wsService.sendMessage('ELEMENT_REMOVE', { elementId });

//       saveState({
//         elements: elements.filter(el => el.id !== elementId),
//         connections: connections.filter(
//           conn => conn.from !== elementId && conn.to !== elementId
//         ),
//         groups
//       });
//     } catch (error) {
//       setError('Failed to remove element and its connections');
//     }
//   }, [removeElement, removeConnection, elements, connections, groups, saveState, setError]);

//   // Connection handlers
//   const handleStartConnection = useCallback((elementId: string, point: Point) => {
//     try {
//       const newConnection: Omit<Connection, 'id'> = {
//         from: elementId,
//         to: '',
//         type: 'straight',
//         controlPoints: [point]
//       };
//       addConnection(newConnection);
//     } catch (error) {
//       setError('Failed to start connection');
//     }
//   }, [addConnection, setError]);

//   const handleUpdateConnection = useCallback((point: Point) => {
//     try {
//       const lastConnection = connections[connections.length - 1];
//       if (lastConnection) {
//         updateConnection(lastConnection.id, {
//           controlPoints: [...(lastConnection.controlPoints || []), point]
//         });
//       }
//     } catch (error) {
//       setError('Failed to update connection');
//     }
//   }, [connections, updateConnection, setError]);

//   const handleFinishConnection = useCallback((targetId: string) => {
//     try {
//       const lastConnection = connections[connections.length - 1];
//       if (lastConnection) {
//         updateConnection(lastConnection.id, { to: targetId });
//       }
//     } catch (error) {
//       setError('Failed to finish connection');
//     }
//   }, [connections, updateConnection, setError]);

//   // Visualization creators
//   const createChartElement = useCallback((data: AIResearchResponse) => {
//     const chartElement: Omit<CanvasElement, 'id'> = {
//       type: 'chart',
//       content: {
//         data: [
//           { name: 'Daily Passengers', value: data.daily_passengers },
//           { name: 'EV Spaces', value: data.ev_parking_spaces }
//         ],
//         type: 'bar'
//       },
//       position: { x: 100, y: 100 },
//       size: { width: 400, height: 300 },
//       metadata: {
//         source: data.sources?.[0]?.url,
//         timestamp: new Date().toISOString(),
//         confidence: data.confidence
//       }
//     };
//     handleElementAdd(chartElement);
//   }, [handleElementAdd]);

//   const createCompetitorTable = useCallback((competitors: AIResearchResponse['competitors']) => {
//     if (!competitors) return;

//     const tableElement: Omit<CanvasElement, 'id'> = {
//       type: 'table',
//       content: {
//         headers: ['Company', 'Stations', 'Locations'],
//         rows: competitors.map(comp => [
//           comp.name,
//           comp.stations.toString(),
//           comp.locations.join(', ')
//         ])
//       },
//       position: { x: 100, y: 450 },
//       size: { width: 400, height: 200 }
//     };
//     handleElementAdd(tableElement);
//   }, [handleElementAdd]);

//   // AI Research Integration
//   const handleResearchQuery = async (query: string) => {
//     try {
//       setLoading(true);
//       const response = await fetch('/api/research', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ query })
//       });

//       if (!response.ok) throw new Error('Research query failed');

//       const data: AIResearchResponse = await response.json();

//       if (data.daily_passengers || data.ev_parking_spaces) {
//         createChartElement(data);
//       }
//       if (data.competitors) {
//         createCompetitorTable(data);
//       }

//       setResearchResults(data);
//     } catch (error) {
//       setError('Failed to process research query');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Proposal Generation
//   const handleProposalGeneration = async (template: string, requirements: string[]) => {
//     try {
//       setLoading(true);
//       const response = await fetch('/api/generate_proposal', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ template, requirements })
//       });

//       if (!response.ok) throw new Error('Proposal generation failed');

//       const data: ProposalData = await response.json();

//       const proposalElement: Omit<CanvasElement, 'id'> = {
//         type: 'proposal',
//         content: {
//           title: data.generated_proposal,
//           content: requirements,
//           metadata: data.metadata
//         },
//         position: { x: 100, y: 100 },
//         size: { width: 500, height: 400 },
//         metadata: {
//           author: data.metadata.author,
//           version: data.metadata.version,
//           timestamp: new Date().toISOString()
//         }
//       };

//       handleElementAdd(proposalElement);
//       setProposalData(data);
//     } catch (error) {
//       setError('Failed to generate proposal');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Template operations
//   const handleTemplateBasedCreation = async (templateType: string, data: any) => {
//     try {
//       switch (templateType) {
//         case 'research':
//           await handleResearchQuery(data.query);
//           break;
//         case 'proposal':
//           await handleProposalGeneration(data.template, data.requirements);
//           break;
//         default:
//           throw new Error(`Unknown template type: ${templateType}`);
//       }
//     } catch (error) {
//       setError(`Failed to process ${templateType} template`);
//     }
//   };

//   // Cursor handling with throttling
//   const handleMouseMove = useCallback((e: React.MouseEvent) => {
//     const now = Date.now();
//     if (now - lastUpdateTimestamp < 50) return;

//     if (!canvasRef.current) return;

//     const rect = canvasRef.current.getBoundingClientRect();
//     const position = {
//       x: (e.clientX - rect.left) / scale,
//       y: (e.clientY - rect.top) / scale
//     };

//     updateCursorPosition(position);
//     wsService.sendMessage('CURSOR_UPDATE', { position });
//     setLastUpdateTimestamp(now);
//   }, [updateCursorPosition, scale, lastUpdateTimestamp]);

//   // Workspace operations
//   const saveWorkspace = useCallback(async () => {
//     try {
//       const workspace = {
//         elements,
//         connections,
//         groups,
//         metadata: {
//           lastModified: new Date().toISOString(),
//           version: '1.0'
//         }
//       };

//       // Simulate save delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       console.log('Workspace saved:', workspace);
//     } catch (error) {
//       setError('Failed to save workspace');
//     }
//   }, [elements, connections, groups, setError]);

//   // Keyboard shortcuts
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       try {
//         if (e.key === 'Delete' && selectedElements.length > 0) {
//           selectedElements.forEach(handleElementRemove);
//           setSelectedElements([]);
//         }

//         if (e.ctrlKey || e.metaKey) {
//           switch (e.key.toLowerCase()) {
//             case 'z':
//               if (e.shiftKey) redo();
//               else undo();
//               break;
//             case 's':
//               e.preventDefault();
//               saveWorkspace();
//               break;
//             case 'c':
//               // Will implement copy functionality
//               break;
//             case 'v':
//               // Will implement paste functionality
//               break;
//             case 'g':
//               e.preventDefault();
//               // Will implement group functionality
//               break;
//           }
//         }
//       } catch (error) {
//         setError('Failed to process keyboard shortcut');
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [selectedElements, handleElementRemove, setSelectedElements, undo, redo, saveWorkspace, setError]);

//   // WebSocket setup
//   useEffect(() => {
//     if (isConnecting) return;

//     const connectWebSocket = async () => {
//       try {
//         setIsConnecting(true);
//         await wsService.connect();
//       } catch (error) {
//         setError('Failed to establish WebSocket connection');
//       } finally {
//         setIsConnecting(false);
//       }
//     };

//     connectWebSocket();
//     return () => wsService.disconnect();
//   }, [setError, isConnecting]);

//   // Additional handlers for zoom, grid, share, and add element by type
//   const handleZoomIn = useCallback(() => setScale((prev) => prev + 0.1), [setScale]);
//   const handleZoomOut = useCallback(() => setScale((prev) => Math.max(prev - 0.1, 0.1)), [setScale]);
//   const handleToggleGrid = useCallback(() => setShowGrid((prev) => !prev), []);
//   const handleShare = useCallback(() => { console.log('Share functionality placeholder'); }, []);
//   const handleAddElementByType = useCallback((type: string) => {
//     const defaultElement: Omit<CanvasElement, 'id'> = {
//       type,
//       content: type === 'text' ? 'New Text Element' : {},
//       position: { x: 100, y: 100 },
//       size: { width: 200, height: 100 },
//     };
//     handleElementAdd(defaultElement);
//   }, [handleElementAdd]);

//   // Enhanced render function
//   const renderElement = useCallback((element: CanvasElement) => {
//     try {
//       switch (element.type) {
//         case 'text':
//           return (
//             <div className="p-4 bg-white rounded-lg shadow-lg min-w-[100px]">
//               {element.content}
//             </div>
//           );
//         case 'code':
//           return (
//             <div className="min-w-[200px]">
//               <CodeBlock
//                 code={element.content}
//                 language="typescript"
//                 showLineNumbers={true}
//               />
//             </div>
//           );
//         case 'chart':
//           return (
//             <div className="w-96 h-64">
//               <Chart {...element.content} />
//             </div>
//           );
//         case 'mermaid':
//           return (
//             <div className="p-4 bg-white rounded-lg shadow-lg">
//               <MermaidDiagram content={element.content} />
//             </div>
//           );
//         case 'meeting-transcript':
//           return (
//             <div className="p-4 bg-white rounded-lg shadow-lg max-w-2xl">
//               <div className="text-sm text-gray-500 mb-2">
//                 Meeting Transcript - {new Date(element.metadata?.timestamp || '').toLocaleString()}
//               </div>
//               {element.content}
//             </div>
//           );
//         case 'proposal':
//           return (
//             <div className="p-6 bg-white rounded-lg shadow-lg max-w-3xl">
//               <div className="text-lg font-semibold mb-4">
//                 {element.content.title}
//               </div>
//               <div className="space-y-2">
//                 {element.content.content.map((req: string, index: number) => (
//                   <div key={index} className="flex items-start gap-2">
//                     <span className="text-blue-500">•</span>
//                     <span>{req}</span>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-4 text-sm text-gray-500">
//                 Author: {element.metadata?.author} | Version: {element.metadata?.version}
//               </div>
//             </div>
//           );
//         case 'diagram':
//         case 'table':
//           return (
//             <div className="p-4 bg-white rounded-lg shadow-lg">
//               {element.content}
//             </div>
//           );
//         default:
//           return null;
//       }
//     } catch (error) {
//       setError('Failed to render element');
//       return null;
//     }
//   }, [setError]);

//   return (
//     <div
//       className="relative w-full h-full overflow-hidden bg-gray-50"
//       {...gestureHandlers}
//       onMouseMove={handleMouseMove}
//     >
//       {/* Loading Indicator */}
//       {loading && (
//         <div className="absolute top-4 right-4 flex items-center space-x-2">
//           <div className="spinner" />
//           <span className="text-gray-600">Processing...</span>
//         </div>
//       )}

//       {/* Error Display */}
//       {error && (
//         <div className="absolute top-4 left-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           {error}
//           <button
//             className="ml-2 font-bold"
//             onClick={() => setError(null)}
//           >
//             ×
//           </button>
//         </div>
//       )}

//       {/* Collaboration Toolbar */}
//       <CollaborationToolbar />

//       {/* Canvas Toolbar */}
//       <CanvasToolbar
//         onAddElement={handleAddElementByType}
//         onUndo={undo}
//         onRedo={redo}
//         onZoomIn={handleZoomIn}
//         onZoomOut={handleZoomOut}
//         onToggleGrid={handleToggleGrid}
//         onSave={saveWorkspace}
//         onShare={handleShare}
//         showGrid={showGrid}
//         canUndo={canUndo}
//         canRedo={canRedo}
//       />

//       {/* Main Canvas */}
//       <div
//         ref={canvasRef}
//         className="canvas-base absolute w-full h-full"
//         style={{
//           transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
//           transformOrigin: '0 0',
//           transition: 'transform 0.1s ease-out',
//         }}
//       >
//         {/* Grid */}
//         {showGrid && (
//           <div className="absolute inset-0 grid grid-cols-[repeat(40,minmax(25px,1fr))] grid-rows-[repeat(40,minmax(25px,1fr))] opacity-10 pointer-events-none">
//             {Array.from({ length: 1600 }).map((_, i) => (
//               <div key={i} className="border border-gray-200" />
//             ))}
//           </div>
//         )}

//         {/* Connections */}
//         <svg className="absolute inset-0 pointer-events-none">
//           <AnimatePresence>
//             {connections.map(connection => (
//               <motion.path
//                 key={connection.id}
//                 d={generateConnectionPath(connection)}
//                 stroke={selectedElements.includes(connection.id) ? '#3B82F6' : '#94A3B8'}
//                 strokeWidth="2"
//                 fill="none"
//                 initial={{ pathLength: 0, opacity: 0 }}
//                 animate={{ pathLength: 1, opacity: 1 }}
//                 exit={{ pathLength: 0, opacity: 0 }}
//                 transition={{ duration: 0.3 }}
//               />
//             ))}
//           </AnimatePresence>
//         </svg>

//         {/* Elements */}
//         <AnimatePresence>
//           {elements.map((element) => (
//             <motion.div
//               key={element.id}
//               className={`absolute ${selectedElements.includes(element.id) ? 'ring-2 ring-blue-500' : ''}`}
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{
//                 opacity: 1,
//                 scale: element.scale || 1,
//                 x: element.position.x,
//                 y: element.position.y,
//                 rotate: element.rotation || 0,
//               }}
//               exit={{ opacity: 0, scale: 0.8 }}
//               drag
//               dragMomentum={false}
//               onDragStart={() => startResize(element.id, element.size, element.position)}
//               onDrag={(e, info) => {
//                 if (resizeState.isResizing) {
//                   const updates = updateResize(info.offset.x, info.offset.y);
//                   if (updates) {
//                     handleElementUpdate(element.id, {
//                       size: updates.size,
//                       position: updates.position,
//                     });
//                   }
//                 }
//               }}
//               onDragEnd={endResize}
//             >
//               {renderElement(element)}

//               {/* Resize Handles */}
//               {selectedElements.includes(element.id) && (
//                 <div className="absolute inset-0">
//                   {['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'].map(handle => (
//                     <div
//                       key={handle}
//                       className={`absolute w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-${handle}-resize`}
//                       style={{
//                         ...getResizeHandlePosition(handle),
//                         transform: 'translate(-50%, -50%)',
//                       }}
//                       onMouseDown={(e) => {
//                         e.stopPropagation();
//                         startResize(element.id, element.size, element.position);
//                       }}
//                     />
//                   ))}
//                 </div>
//               )}
//             </motion.div>
//           ))}
//         </AnimatePresence>

//         {/* Collaborator Cursors */}
//         {collaborators.map((collaborator) => (
//           <CursorPresence
//             key={collaborator.id}
//             user={collaborator}
//             position={cursorPositions[collaborator.id]}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Canvas;



// Sonnet 1220 940



// // 'use client';

// // import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // // import useStore from '../../store/useStore';
// // import useHydratedStore  from '../../store/useStore';


// 'use client';

// import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useHydratedStore } from '@/store/useStore';  // Update this import
// import { wsService } from '@/lib/websocket';
// // ... rest of your imports

// // import { useHydratedStore } from '@/store/useStore';

// // import { wsService } from '../../lib/websocket';
// import { useCanvasHistory } from './hooks/useCanvasHistory';
// import { useCanvasGestures } from './hooks/useCanvasGestures';
// import { useCanvasSelection } from './hooks/useCanvasSelection';
// import { useCanvasResize } from './hooks/useCanvasResize';
// import CodeBlock from '../CodeBlock';
// import Chart from '../Chart';
// import { CursorPresence } from '../CursorPresence';
// import { CollaborationToolbar } from '../CollaborationToolbar';

// import MermaidDiagram from '../MermaidDiagram';
// import CanvasToolbar from '../CanvasToolbar';

// // Types for AI Integration
// interface AIResearchResponse {
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

// interface Point {
//   x: number;
//   y: number;
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
//   type: 'text' | 'code' | 'chart' | 'diagram' | 'table' | 'mermaid' | 'meeting-transcript' | 'proposal';
//   content: any;
//   position: Point;
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
//   };
// }

// // Helper functions
// function getResizeHandlePosition(handle: string) {
//   const positions: { [key: string]: { left: string; top: string } } = {
//     n: { left: '50%', top: '0%' },
//     s: { left: '50%', top: '100%' },
//     e: { left: '100%', top: '50%' },
//     w: { left: '0%', top: '50%' },
//     ne: { left: '100%', top: '0%' },
//     nw: { left: '0%', top: '0%' },
//     se: { left: '100%', top: '100%' },
//     sw: { left: '0%', top: '100%' },
//   };
//   return positions[handle];
// }

// function generateConnectionPath(connection: Connection): string {
//   try {
//     if (!connection.from || !connection.to) return '';
    
//     if (connection.type === 'curved' && connection.controlPoints?.length === 2) {
//       const [cp1, cp2] = connection.controlPoints;
//       return `M ${connection.from} C ${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${connection.to}`;
//     }

//     return `M ${connection.from} L ${connection.to}`;
//   } catch (error) {
//     console.error('Failed to generate connection path:', error);
//     return '';
//   }
// }

// function Canvas() {
//   const canvasRef = useRef<HTMLDivElement>(null);
//   const [isConnecting, setIsConnecting] = useState(false);
//   const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState(Date.now());
//   const [loading, setLoading] = useState(false);

//   // Store selectors with expanded functionality
//   // const {
//   //   elements = [],
//   //   connections = [],
//   //   groups = {},
//   //   addElement,
//   //   updateElement,
//   //   removeElement,
//   //   selectedElements,
//   //   setSelectedElements,
//   //   cursorPositions,
//   //   updateCursorPosition,
//   //   collaborators = [],
//   //   scale,
//   //   setScale,
//   //   error,
//   //   setError,
//   //   addConnection,
//   //   updateConnection,
//   //   removeConnection,
//   //   undo,
//   //   redo,
//   //   showGrid = true,
//   //   setShowGrid,
//   //   // New state handlers for AI integration
//   //   setResearchResults,
//   //   setProposalData,
//   //   addCollaborator,
//   //   removeCollaborator,
//   //   updateCollaborator
//   // } = useStore();


//   const {
//     // Canvas elements
//     elements = [],
//     connections = [],
//     groups = {},
//     selectedElements,
//     scale,
    
//     // View settings
//     viewMode,
//     gridVisible,
//     snapToGrid,
    
//     // Version control
//     versions,
//     history,
//     currentVersion,
    
//     // Collaboration
//     collaborators = [],
//     cursorPositions,
//     activeUsers,
    
//     // UI State
//     error,
    
//     // Actions
//     addElement,
//     updateElement,
//     removeElement,
//     setSelectedElements,
//     updateCursorPosition,
//     setScale,
//     setError,
//     addConnection,
//     updateConnection,
//     removeConnection,
//     undo,
//     redo,
//     setShowGrid,
//     setResearchResults,
//     setProposalData,
//     addCollaborator,
//     removeCollaborator,
//     updateCollaborator,
//     createVersion,
//     switchVersion,
//     addHistoryEntry,
//     saveWorkspace
//   } = useHydratedStore((state) => state);

//   // Active collaborators calculation
//   const activeCollaborators = useMemo(() => 
//     collaborators.filter(c => 
//       cursorPositions[c.id] && 
//       Date.now() - new Date(cursorPositions[c.id].timestamp).getTime() < 30000
//     ),
//     [collaborators, cursorPositions]
//   );

//   // Custom hooks
//   const { state: historyState, canUndo, canRedo, saveState } = useCanvasHistory({
//     elements,
//     connections,
//     groups
//   });

//   const { handlers: gestureHandlers, pan } = useCanvasGestures();
//   const { startResize, updateResize, endResize, resizeState } = useCanvasResize();
//   const { selection, updateSelection } = useCanvasSelection();

//   // Base element handlers
//   const handleElementAdd = useCallback((element: Omit<CanvasElement, 'id'>) => {
//     const newElement = addElement(element);
//     wsService.sendMessage('ELEMENT_ADD', { element: newElement });
    
//     const timeoutId = setTimeout(() => {
//       saveState({
//         elements: [...elements, newElement],
//         connections,
//         groups
//       });
//     }, 1000);

//     return () => clearTimeout(timeoutId);
//   }, [addElement, elements, connections, groups, saveState]);

//   const handleElementUpdate = useCallback((
//     elementId: string,
//     updates: Partial<CanvasElement>
//   ) => {
//     updateElement(elementId, updates);
//     wsService.sendMessage('ELEMENT_UPDATE', { elementId, updates });
    
//     const timeoutId = setTimeout(() => {
//       saveState({
//         elements: elements.map(el => 
//           el.id === elementId ? { ...el, ...updates } : el
//         ),
//         connections,
//         groups
//       });
//     }, 1000);

//     return () => clearTimeout(timeoutId);
//   }, [elements, connections, groups, updateElement, saveState]);

//   const handleElementRemove = useCallback((elementId: string) => {
//     try {
//       const connectedPaths = connections.filter(
//         conn => conn.from === elementId || conn.to === elementId
//       );
//       connectedPaths.forEach(path => removeConnection(path.id));

//       removeElement(elementId);
//       wsService.sendMessage('ELEMENT_REMOVE', { elementId });

//       saveState({
//         elements: elements.filter(el => el.id !== elementId),
//         connections: connections.filter(
//           conn => conn.from !== elementId && conn.to !== elementId
//         ),
//         groups
//       });
//     } catch (error) {
//       setError('Failed to remove element and its connections');
//     }
//   }, [removeElement, removeConnection, elements, connections, groups, saveState, setError]);

//   // Visualization creators
//   const createChartElement = useCallback((data: AIResearchResponse) => {
//     const chartElement: Omit<CanvasElement, 'id'> = {
//       type: 'chart',
//       content: {
//         data: [
//           { name: 'Daily Passengers', value: data.daily_passengers },
//           { name: 'EV Spaces', value: data.ev_parking_spaces }
//         ],
//         type: 'bar'
//       },
//       position: { x: 100, y: 100 },
//       size: { width: 400, height: 300 },
//       metadata: {
//         source: data.sources?.[0]?.url,
//         timestamp: new Date().toISOString(),
//         confidence: data.confidence
//       }
//     };
//     handleElementAdd(chartElement);
//   }, [handleElementAdd]);

//   const createCompetitorTable = useCallback((competitors: AIResearchResponse['competitors']) => {
//     if (!competitors) return;
    
//     const tableElement: Omit<CanvasElement, 'id'> = {
//       type: 'table',
//       content: {
//         headers: ['Company', 'Stations', 'Locations'],
//         rows: competitors.map(comp => [
//           comp.name,
//           comp.stations.toString(),
//           comp.locations.join(', ')
//         ])
//       },
//       position: { x: 100, y: 450 },
//       size: { width: 400, height: 200 }
//     };
//     handleElementAdd(tableElement);
//   }, [handleElementAdd]);

//   // AI Research Integration
//   const handleResearchQuery = async (query: string) => {
//     try {
//       setLoading(true);
//       const response = await fetch('/api/research', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ query })
//       });

//       if (!response.ok) throw new Error('Research query failed');
      
//       const data: AIResearchResponse = await response.json();
      
//       if (data.daily_passengers || data.ev_parking_spaces) {
//         createChartElement(data);
//       }
//       if (data.competitors) {
//         createCompetitorTable(data);
//       }
      
//       setResearchResults(data);
//     } catch (error) {
//       setError('Failed to process research query');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Proposal Generation
//   const handleProposalGeneration = async (template: string, requirements: string[]) => {
//     try {
//       setLoading(true);
//       const response = await fetch('/api/generate_proposal', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ template, requirements })
//       });

//       if (!response.ok) throw new Error('Proposal generation failed');
      
//       const data: ProposalData = await response.json();
      
//       const proposalElement: Omit<CanvasElement, 'id'> = {
//         type: 'proposal',
//         content: {
//           title: data.generated_proposal,
//           content: requirements,
//           metadata: data.metadata
//         },
//         position: { x: 100, y: 100 },
//         size: { width: 500, height: 400 },
//         metadata: {
//           author: data.metadata.author,
//           version: data.metadata.version,
//           timestamp: new Date().toISOString()
//         }
//       };
      
//       handleElementAdd(proposalElement);
//       setProposalData(data);
//     } catch (error) {
//       setError('Failed to generate proposal');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Cursor handling with throttling
//   const handleMouseMove = useCallback((e: React.MouseEvent) => {
//     const now = Date.now();
//     if (now - lastUpdateTimestamp < 50) return;

//     if (!canvasRef.current) return;
    
//     const rect = canvasRef.current.getBoundingClientRect();
//     const position = {
//       x: (e.clientX - rect.left) / scale,
//       y: (e.clientY - rect.top) / scale
//     };
    
//     updateCursorPosition(position);
//     wsService.sendMessage('CURSOR_UPDATE', { position });
//     setLastUpdateTimestamp(now);
//   }, [updateCursorPosition, scale, lastUpdateTimestamp]);

//   // // Workspace operations
//   // const saveWorkspace = useCallback(async () => {
//   //   try {
//   //     const workspace = {
//   //       elements,
//   //       connections,
//   //       groups,
//   //       metadata: {
//   //         lastModified: new Date().toISOString(),
//   //         version: '1.0'
//   //       }
//   //     };
      
//   //     await new Promise(resolve => setTimeout(resolve, 1000));
//   //     console.log('Workspace saved:', workspace);
//   //   } catch (error) {
//   //     setError('Failed to save workspace');
//   //   }
//   // }, [elements, connections, groups]);

//   // Enhanced render function
//   const renderElement = useCallback((element: CanvasElement) => {
//     try {
//       switch (element.type) {
//         case 'text':
//           return (
//             <div className="p-4 bg-white rounded-lg shadow-lg min-w-[100px]">
//               {element.content}
//             </div>
//           );
//         case 'code':
//           return (
//             <div className="min-w-[200px]">
//               <CodeBlock
//                 code={element.content}
//                 language="typescript"
//                 showLineNumbers={true}
//               />
//             </div>
//           );
//         case 'chart':
//           return (
//             <div className="w-96 h-64">
//               <Chart {...element.content} />
//             </div>
//           );
//         case 'mermaid':
//           return (
//             <div className="p-4 bg-white rounded-lg shadow-lg">
//               <MermaidDiagram content={element.content} />
//             </div>
//           );
//         case 'meeting-transcript':
//           return (
//             <div className="p-4 bg-white rounded-lg shadow-lg max-w-2xl">
//               <div className="text-sm text-gray-500 mb-2">
//                 Meeting Transcript - {new Date(element.metadata?.timestamp || '').toLocaleString()}
//               </div>
//               {element.content}
//             </div>
//           );
//         case 'proposal':
//           return (
//             <div className="p-6 bg-white rounded-lg shadow-lg max-w-3xl">
//               <div className="text-lg font-semibold mb-4">
//                 {element.content.title}
//               </div>
//               <div className="space-y-2">
//                 {element.content.content.map((req: string, index: number) => (
//                   <div key={index} className="flex items-start gap-2">
//                     <span className="text-blue-500">•</span>
//                     <span>{req}</span>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-4 text-sm text-gray-500">
//                 Author: {element.metadata?.author} | Version: {element.metadata?.version}
//               </div>
//             </div>
//           );
//         case 'diagram':
//         case 'table':
//           return (
//             <div className="p-4 bg-white rounded-lg shadow-lg">
//               {element.content}
//             </div>
//           );
//         default:
//           return null;
//       }
//     } catch (error) {
//       setError('Failed to render element');
//       return null;
//     }
//   }, [setError]);

//   return (
//     <div 
//       className="relative w-full h-full overflow-hidden bg-gray-50"
//       {...gestureHandlers}
//       onMouseMove={handleMouseMove}
//     >
//       {/* Loading Indicator */}
//       {loading && (
//         <div className="absolute top-4 right-4 flex items-center space-x-2">
//           <div className="spinner" />
//           <span className="text-gray-600">Processing...</span>
//         </div>
//       )}

//       {/* Error Display */}
//       {error && (
//         <div className="absolute top-4 left-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           {error}
//           <button 
//             className="ml-2 font-bold"
//             onClick={() => setError(null)}
//           >
//             ×
//           </button>
//         </div>
//       )}

//       {/* Collaboration Toolbar */}
//       <CollaborationToolbar />

//       {/* Canvas Toolbar */}
//       <CanvasToolbar
//         onAddElement={handleElementAdd}
//         onUndo={undo}
//         onRedo={redo}
//         onZoomIn={() => setScale(Math.min(2, scale + 0.1))}
//         onZoomOut={() => setScale(Math.max(0.1, scale - 0.1))}
//         onToggleGrid={() => setShowGrid(!showGrid)}
//         onSave={saveWorkspace}
//         onShare={() => {/* Implement share functionality */}}
//         showGrid={showGrid}
//         canUndo={canUndo}
//         canRedo={canRedo}
//       />

//       {/* Main Canvas */}
//       <div
//         ref={canvasRef}
//         className="canvas-base absolute w-full h-full"
//         style={{
//           transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
//           transformOrigin: '0 0',
//           transition: 'transform 0.1s ease-out',
//         }}
//       >
//         {/* Grid */}
//         <div className="absolute inset-0 grid grid-cols-[repeat(40,minmax(25px,1fr))] grid-rows-[repeat(40,minmax(25px,1fr))] opacity-10 pointer-events-none">
//           {Array.from({ length: 1600 }).map((_, i) => (
//             <div key={i} className="border border-gray-200" />
//           ))}
//         </div>

//         {/* Connections */}
//         <svg className="absolute inset-0 pointer-events-none">
//           <AnimatePresence>
//             {connections.map(connection => (
//               <motion.path
//                 key={connection.id}
//                 d={generateConnectionPath(connection)}
//                 stroke={selectedElements.includes(connection.id) ? '#3B82F6' : '#94A3B8'}
//                 strokeWidth="2"
//                 fill="none"
//                 initial={{ pathLength: 0, opacity: 0 }}
//                 animate={{ pathLength: 1, opacity: 1 }}
//                 exit={{ pathLength: 0, opacity: 0 }}
//                 transition={{ duration: 0.3 }}
//               />
//             ))}
//           </AnimatePresence>
//         </svg>

//         {/* Elements */}
//         <AnimatePresence>
//           {elements.map((element) => (
//             <motion.div
//               key={element.id}
//               className={`absolute ${
//                 selectedElements.includes(element.id) ? 'ring-2 ring-blue-500' : ''
//               }`}
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{
//                 opacity: 1,
//                 scale: element.scale || 1,
//                 x: element.position.x,
//                 y: element.position.y,
//                 rotate: element.rotation || 0,
//               }}
//               exit={{ opacity: 0, scale: 0.8 }}
//               drag
//               dragMomentum={false}
//               onDragStart={() => startResize(element.id, element.size, element.position)}
//               onDrag={(e, info) => {
//                 if (resizeState.isResizing) {
//                   const updates = updateResize(info.offset.x, info.offset.y);
//                   if (updates) {
//                     handleElementUpdate(element.id, {
//                       size: updates.size,
//                       position: updates.position,
//                     });
//                   }
//                 }
//               }}
//               onDragEnd={endResize}
//             >
//               {renderElement(element)}
              
//               {/* Resize Handles */}
//               {selectedElements.includes(element.id) && (
//                 <div className="absolute inset-0">
//                   {['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'].map(handle => (
//                     <div
//                       key={handle}
//                       className={`absolute w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-${handle}-resize`}
//                       style={{
//                         ...getResizeHandlePosition(handle),
//                         transform: 'translate(-50%, -50%)',
//                       }}
//                       onMouseDown={(e) => {
//                         e.stopPropagation();
//                         startResize(element.id, element.size, element.position);
//                       }}
//                     />
//                   ))}
//                 </div>
//               )}
//             </motion.div>
//           ))}
//         </AnimatePresence>

//         {/* Collaborator Cursors */}
//         {activeCollaborators.map((collaborator) => (
//           <CursorPresence
//             key={collaborator.id}
//             user={collaborator}
//             position={cursorPositions[collaborator.id]}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Canvas;


/// 1221 Sonnet


// // 'use client';

// // import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { useHydratedStore } from '@/store/useStore';
// // import { wsService } from '@/lib/websocket';
// // import { useCanvasHistory } from './hooks/useCanvasHistory';
// // import { useCanvasGestures } from './hooks/useCanvasGestures';
// // import { useCanvasSelection } from './hooks/useCanvasSelection';
// // import { useCanvasResize } from './hooks/useCanvasResize';
// // import CodeBlock from '../CodeBlock';
// // import Chart from '../Chart';
// // import { CursorPresence } from '../CursorPresence';
// // import { CollaborationToolbar } from '../CollaborationToolbar';
// // import MermaidDiagram from '../MermaidDiagram';
// // import CanvasToolbar from '../CanvasToolbar';
// // import { Toast, ToastDescription, ToastTitle } from '@/components/ui/toast';
// // import { Alert } from '@/components/ui/alert';
// // import _ from 'lodash';
// // import Papa from 'papaparse';

// // // Types for AI Integration
// // interface AIResearchResponse {
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

// // interface ProposalData {
// //   generated_proposal: string;
// //   metadata: {
// //     author: string;
// //     version: string;
// //   };
// // }

// // interface Point {
// //   x: number;
// //   y: number;
// // }

// // interface Connection {
// //   id: string;
// //   from: string;
// //   to: string;
// //   type: 'straight' | 'curved';
// //   controlPoints?: Point[];
// // }

// // interface CanvasElement {
// //   id: string;
// //   type: 'text' | 'code' | 'chart' | 'diagram' | 'table' | 'mermaid' | 'meeting-transcript' | 'proposal';
// //   content: any;
// //   position: Point;
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
// //   };
// // }

// // // Helper functions
// // function getResizeHandlePosition(handle: string) {
// //   const positions: { [key: string]: { left: string; top: string } } = {
// //     n: { left: '50%', top: '0%' },
// //     s: { left: '50%', top: '100%' },
// //     e: { left: '100%', top: '50%' },
// //     w: { left: '0%', top: '50%' },
// //     ne: { left: '100%', top: '0%' },
// //     nw: { left: '0%', top: '0%' },
// //     se: { left: '100%', top: '100%' },
// //     sw: { left: '0%', top: '100%' },
// //   };
// //   return positions[handle];
// // }

// // function generateConnectionPath(connection: Connection): string {
// //   try {
// //     if (!connection.from || !connection.to) return '';
    
// //     if (connection.type === 'curved' && connection.controlPoints?.length === 2) {
// //       const [cp1, cp2] = connection.controlPoints;
// //       return `M ${connection.from} C ${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${connection.to}`;
// //     }

// //     return `M ${connection.from} L ${connection.to}`;
// //   } catch (error) {
// //     console.error('Failed to generate connection path:', error);
// //     return '';
// //   }
// // }

// // function Canvas() {
// //   const canvasRef = useRef<HTMLDivElement>(null);
// //   const [isConnecting, setIsConnecting] = useState(false);
// //   const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState(Date.now());
// //   const [loading, setLoading] = useState(false);
// //   const [gridVisible, setGridVisible] = useState(true);

// //   const {
// //     elements = [],
// //     connections = [],
// //     groups = {},
// //     selectedElements,
// //     scale,
// //     viewMode,
// //     snapToGrid,
// //     versions,
// //     history,
// //     currentVersion,
// //     collaborators = [],
// //     cursorPositions,
// //     activeUsers,
// //     error,
// //     addElement,
// //     updateElement,
// //     removeElement,
// //     setSelectedElements,
// //     updateCursorPosition,
// //     setScale,
// //     setError,
// //     addConnection,
// //     updateConnection,
// //     removeConnection,
// //     undo,
// //     redo,
// //     setShowGrid,
// //     setResearchResults,
// //     setProposalData,
// //     addCollaborator,
// //     removeCollaborator,
// //     updateCollaborator,
// //     createVersion,
// //     switchVersion,
// //     addHistoryEntry,
// //     saveWorkspace
// //   } = useHydratedStore();

// //   // Active collaborators calculation
// //   const activeCollaborators = useMemo(() => 
// //     collaborators.filter(c => 
// //       cursorPositions[c.id] && 
// //       Date.now() - new Date(cursorPositions[c.id].timestamp).getTime() < 30000
// //     ),
// //     [collaborators, cursorPositions]
// //   );

// //   // Custom hooks
// //   const { state: historyState, canUndo, canRedo, saveState } = useCanvasHistory({
// //     elements,
// //     connections,
// //     groups
// //   });

// //   const { handlers: gestureHandlers, pan } = useCanvasGestures();
// //   const { startResize, updateResize, endResize, resizeState } = useCanvasResize();
// //   const { selection, updateSelection } = useCanvasSelection();

// //   // Base element handlers
// //   const handleElementAdd = useCallback((element: Omit<CanvasElement, 'id'>) => {
// //     const newElement = addElement(element);
// //     wsService.sendMessage('ELEMENT_ADD', { element: newElement });
    
// //     const timeoutId = setTimeout(() => {
// //       saveState({
// //         elements: [...elements, newElement],
// //         connections,
// //         groups
// //       });
// //     }, 1000);

// //     return () => clearTimeout(timeoutId);
// //   }, [addElement, elements, connections, groups, saveState]);

// //   const handleElementUpdate = useCallback((
// //     elementId: string,
// //     updates: Partial<CanvasElement>
// //   ) => {
// //     updateElement(elementId, updates);
// //     wsService.sendMessage('ELEMENT_UPDATE', { elementId, updates });
    
// //     const timeoutId = setTimeout(() => {
// //       saveState({
// //         elements: elements.map(el => 
// //           el.id === elementId ? { ...el, ...updates } : el
// //         ),
// //         connections,
// //         groups
// //       });
// //     }, 1000);

// //     return () => clearTimeout(timeoutId);
// //   }, [elements, connections, groups, updateElement, saveState]);

// //   const handleElementRemove = useCallback((elementId: string) => {
// //     try {
// //       const connectedPaths = connections.filter(
// //         conn => conn.from === elementId || conn.to === elementId
// //       );
// //       connectedPaths.forEach(path => removeConnection(path.id));

// //       removeElement(elementId);
// //       wsService.sendMessage('ELEMENT_REMOVE', { elementId });

// //       saveState({
// //         elements: elements.filter(el => el.id !== elementId),
// //         connections: connections.filter(
// //           conn => conn.from !== elementId && conn.to !== elementId
// //         ),
// //         groups
// //       });
// //     } catch (error) {
// //       setError('Failed to remove element and its connections');
// //     }
// //   }, [removeElement, removeConnection, elements, connections, groups, saveState, setError]);

// //   // Visualization creators
// //   const createChartElement = useCallback((data: AIResearchResponse) => {
// //     const chartElement: Omit<CanvasElement, 'id'> = {
// //       type: 'chart',
// //       content: {
// //         data: [
// //           { name: 'Daily Passengers', value: data.daily_passengers },
// //           { name: 'EV Spaces', value: data.ev_parking_spaces }
// //         ],
// //         type: 'bar'
// //       },
// //       position: { x: 100, y: 100 },
// //       size: { width: 400, height: 300 },
// //       metadata: {
// //         source: data.sources?.[0]?.url,
// //         timestamp: new Date().toISOString(),
// //         confidence: data.confidence
// //       }
// //     };
// //     handleElementAdd(chartElement);
// //   }, [handleElementAdd]);

// //   const createCompetitorTable = useCallback((competitors: AIResearchResponse['competitors']) => {
// //     if (!competitors) return;
    
// //     const tableElement: Omit<CanvasElement, 'id'> = {
// //       type: 'table',
// //       content: {
// //         headers: ['Company', 'Stations', 'Locations'],
// //         rows: competitors.map(comp => [
// //           comp.name,
// //           comp.stations.toString(),
// //           comp.locations.join(', ')
// //         ])
// //       },
// //       position: { x: 100, y: 450 },
// //       size: { width: 400, height: 200 }
// //     };
// //     handleElementAdd(tableElement);
// //   }, [handleElementAdd]);

// //   // AI Research Integration
// //   const handleResearchQuery = async (query: string) => {
// //     try {
// //       setLoading(true);
// //       const response = await fetch('/api/research', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ query })
// //       });

// //       if (!response.ok) throw new Error('Research query failed');
      
// //       const data: AIResearchResponse = await response.json();
      
// //       if (data.daily_passengers || data.ev_parking_spaces) {
// //         createChartElement(data);
// //       }
// //       if (data.competitors) {
// //         createCompetitorTable(data.competitors);
// //       }
      
// //       setResearchResults(data);
// //     } catch (error) {
// //       setError('Failed to process research query');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Proposal Generation
// //   const handleProposalGeneration = async (template: string, requirements: string[]) => {
// //     try {
// //       setLoading(true);
// //       const response = await fetch('/api/generate_proposal', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ template, requirements })
// //       });

// //       if (!response.ok) throw new Error('Proposal generation failed');
      
// //       const data: ProposalData = await response.json();
      
// //       const proposalElement: Omit<CanvasElement, 'id'> = {
// //         type: 'proposal',
// //         content: {
// //           title: data.generated_proposal,
// //           content: requirements,
// //           metadata: data.metadata
// //         },
// //         position: { x: 100, y: 100 },
// //         size: { width: 500, height: 400 },
// //         metadata: {
// //           author: data.metadata.author,
// //           version: data.metadata.version,
// //           timestamp: new Date().toISOString()
// //         }
// //       };
      
// //       handleElementAdd(proposalElement);
// //       setProposalData(data);
// //     } catch (error) {
// //       setError('Failed to generate proposal');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Cursor handling with throttling
// //   const handleMouseMove = useCallback((e: React.MouseEvent) => {
// //     const now = Date.now();
// //     if (now - lastUpdateTimestamp < 50) return;

// //     if (!canvasRef.current) return;
    
// //     const rect = canvasRef.current.getBoundingClientRect();
// //     const position = {
// //       x: (e.clientX - rect.left) / scale,
// //       y: (e.clientY - rect.top) / scale
// //     };
    
// //     updateCursorPosition(position);
// //     wsService.sendMessage('CURSOR_UPDATE', { position });
// //     setLastUpdateTimestamp(now);
// //   }, [updateCursorPosition, scale, lastUpdateTimestamp]);

// //   // Workspace operations
// //   const handleSaveWorkspace = useCallback(async () => {
// //     try {
// //       setLoading(true);
// //       const workspace = {
// //         elements,
// //         connections,
// //         groups,
// //         metadata: {
// //           lastModified: new Date().toISOString(),
// //           version: '1.0'
// //         }
// //       };
      
// //       await saveWorkspace(workspace);
// //       createVersion({
// //         id: Date.now().toString(),
// //         workspace,
// //         timestamp: new Date().toISOString()
// //       });
// //     } catch (error) {
// //       setError('Failed to save workspace');
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [elements, connections, groups, createVersion, saveWorkspace, setError]);

// //   // Enhanced render function
// //   const renderElement = useCallback((element: CanvasElement) => {
// //     try {
// //       switch (element.type) {
// //         case 'text':
// //           return (
// //             <div className="p-4 bg-white rounded-lg shadow-lg min-w-[100px]">
// //               {element.content}
// //             </div>
// //           );
// //         case 'code':
// //           return (
// //             <div className="min-w-[200px]">
// //               <CodeBlock
// //                 code={element.content}
// //                 language="typescript"
// //                 showLineNumbers={true}
// //               />
// //             </div>
// //           );
// //         case 'chart':
// //           return (
// //             <div className="w-96 h-64">
// //               <Chart {...element.content} />
// //             </div>
// //           );
// //         case 'mermaid':
// //           return (
// //             <div className="p-4 bg-white rounded-lg shadow-lg">
// //               <MermaidDiagram content={element.content} />
// //             </div>
// //           );
// //         case 'meeting-transcript':
// //           return (
// //             <div className="p-4 bg-white rounded-lg shadow-lg max-w-2xl">
// //               <div className="text-sm text-gray-500 mb-2">
// //                 Meeting Transcript - {new Date(element.metadata?.timestamp || '').toLocaleString()}
// //               </div>
// //               {element.content}
// //             </div>
// //           );
// //         case 'proposal':
// //           return (
// //             <div className="p-6 bg-white rounded-lg shadow-lg max-w-3xl">
// //               <div className="text-lg font-semibold mb-4">
// //                 {element.content.title}
// //               </div>
// //               <div className="space-y-2">
// //                 {element.content.content.map((req: string, index: number) => (
// //                   <div key={index} className="flex items-start gap-2">
// //                     <span className="text-blue-500">•</span>
// //                     <span>{req}</span>
// //                   </div>
// //                 ))}
// //               </div>
// //               <div className="mt-4 text-sm text-gray-500">
// //                 Author: {element.metadata?.author} | Version: {element.metadata?.version}
// //               </div>
// //             </div>
// //           );
// //         case 'diagram':
// //         case '




// 'use client';

// import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useHydratedStore } from '@/store/useStore';
// import { wsService } from '@/lib/websocket';
// import { useCanvasHistory } from './hooks/useCanvasHistory';
// import { useCanvasGestures } from './hooks/useCanvasGestures';
// import { useCanvasSelection } from './hooks/useCanvasSelection';
// import { useCanvasResize } from './hooks/useCanvasResize';
// import CodeBlock from '../CodeBlock';
// import Chart from '../Chart';
// import { CursorPresence } from '../CursorPresence';
// import { CollaborationToolbar } from '../CollaborationToolbar';
// import MermaidDiagram from '../MermaidDiagram';
// import CanvasToolbar from '../CanvasToolbar';
// import { Toast, ToastDescription, ToastTitle } from '@/components/ui/toast';
// import { Alert } from '@/components/ui/alert';
// import _ from 'lodash';
// import Papa from 'papaparse';

// // Types for AI Integration
// interface AIResearchResponse {
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

// interface Point {
//   x: number;
//   y: number;
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
//   type: 'text' | 'code' | 'chart' | 'diagram' | 'table' | 'mermaid' | 'meeting-transcript' | 'proposal';
//   content: any;
//   position: Point;
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
//   };
// }

// // Helper functions
// function getResizeHandlePosition(handle: string) {
//   const positions: { [key: string]: { left: string; top: string } } = {
//     n: { left: '50%', top: '0%' },
//     s: { left: '50%', top: '100%' },
//     e: { left: '100%', top: '50%' },
//     w: { left: '0%', top: '50%' },
//     ne: { left: '100%', top: '0%' },
//     nw: { left: '0%', top: '0%' },
//     se: { left: '100%', top: '100%' },
//     sw: { left: '0%', top: '100%' },
//   };
//   return positions[handle];
// }

// function generateConnectionPath(connection: Connection): string {
//   try {
//     if (!connection.from || !connection.to) return '';
    
//     if (connection.type === 'curved' && connection.controlPoints?.length === 2) {
//       const [cp1, cp2] = connection.controlPoints;
//       return `M ${connection.from} C ${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${connection.to}`;
//     }

//     return `M ${connection.from} L ${connection.to}`;
//   } catch (error) {
//     console.error('Failed to generate connection path:', error);
//     return '';
//   }
// }

// function Canvas() {
//   const canvasRef = useRef<HTMLDivElement>(null);
//   const [isConnecting, setIsConnecting] = useState(false);
//   const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState(Date.now());
//   const [loading, setLoading] = useState(false);
//   const [gridVisible, setGridVisible] = useState(true);

//   const {
//     elements = [],
//     connections = [],
//     groups = {},
//     selectedElements,
//     scale,
//     viewMode,
//     snapToGrid,
//     versions,
//     history,
//     currentVersion,
//     collaborators = [],
//     cursorPositions,
//     activeUsers,
//     error,
//     addElement,
//     updateElement,
//     removeElement,
//     setSelectedElements,
//     updateCursorPosition,
//     setScale,
//     setError,
//     addConnection,
//     updateConnection,
//     removeConnection,
//     undo,
//     redo,
//     setShowGrid,
//     setResearchResults,
//     setProposalData,
//     addCollaborator,
//     removeCollaborator,
//     updateCollaborator,
//     createVersion,
//     switchVersion,
//     addHistoryEntry,
//     saveWorkspace
//   } = useHydratedStore();

//   // Active collaborators calculation
//   const activeCollaborators = useMemo(() => 
//     collaborators.filter(c => 
//       cursorPositions[c.id] && 
//       Date.now() - new Date(cursorPositions[c.id].timestamp).getTime() < 30000
//     ),
//     [collaborators, cursorPositions]
//   );

//   // Custom hooks
//   const { state: historyState, canUndo, canRedo, saveState } = useCanvasHistory({
//     elements,
//     connections,
//     groups
//   });

//   const { handlers: gestureHandlers, pan } = useCanvasGestures();
//   const { startResize, updateResize, endResize, resizeState } = useCanvasResize();
//   const { selection, updateSelection } = useCanvasSelection();

//   // Base element handlers
//   const handleElementAdd = useCallback((element: Omit<CanvasElement, 'id'>) => {
//     const newElement = addElement(element);
//     wsService.sendMessage('ELEMENT_ADD', { element: newElement });
    
//     const timeoutId = setTimeout(() => {
//       saveState({
//         elements: [...elements, newElement],
//         connections,
//         groups
//       });
//     }, 1000);

//     return () => clearTimeout(timeoutId);
//   }, [addElement, elements, connections, groups, saveState]);

//   const handleElementUpdate = useCallback((
//     elementId: string,
//     updates: Partial<CanvasElement>
//   ) => {
//     updateElement(elementId, updates);
//     wsService.sendMessage('ELEMENT_UPDATE', { elementId, updates });
    
//     const timeoutId = setTimeout(() => {
//       saveState({
//         elements: elements.map(el => 
//           el.id === elementId ? { ...el, ...updates } : el
//         ),
//         connections,
//         groups
//       });
//     }, 1000);

//     return () => clearTimeout(timeoutId);
//   }, [elements, connections, groups, updateElement, saveState]);

//   const handleElementRemove = useCallback((elementId: string) => {
//     try {
//       const connectedPaths = connections.filter(
//         conn => conn.from === elementId || conn.to === elementId
//       );
//       connectedPaths.forEach(path => removeConnection(path.id));

//       removeElement(elementId);
//       wsService.sendMessage('ELEMENT_REMOVE', { elementId });

//       saveState({
//         elements: elements.filter(el => el.id !== elementId),
//         connections: connections.filter(
//           conn => conn.from !== elementId && conn.to !== elementId
//         ),
//         groups
//       });
//     } catch (error) {
//       setError('Failed to remove element and its connections');
//     }
//   }, [removeElement, removeConnection, elements, connections, groups, saveState, setError]);

//   // Visualization creators
//   const createChartElement = useCallback((data: AIResearchResponse) => {
//     const chartElement: Omit<CanvasElement, 'id'> = {
//       type: 'chart',
//       content: {
//         data: [
//           { name: 'Daily Passengers', value: data.daily_passengers },
//           { name: 'EV Spaces', value: data.ev_parking_spaces }
//         ],
//         type: 'bar'
//       },
//       position: { x: 100, y: 100 },
//       size: { width: 400, height: 300 },
//       metadata: {
//         source: data.sources?.[0]?.url,
//         timestamp: new Date().toISOString(),
//         confidence: data.confidence
//       }
//     };
//     handleElementAdd(chartElement);
//   }, [handleElementAdd]);

//   const createCompetitorTable = useCallback((competitors: AIResearchResponse['competitors']) => {
//     if (!competitors) return;
    
//     const tableElement: Omit<CanvasElement, 'id'> = {
//       type: 'table',
//       content: {
//         headers: ['Company', 'Stations', 'Locations'],
//         rows: competitors.map(comp => [
//           comp.name,
//           comp.stations.toString(),
//           comp.locations.join(', ')
//         ])
//       },
//       position: { x: 100, y: 450 },
//       size: { width: 400, height: 200 }
//     };
//     handleElementAdd(tableElement);
//   }, [handleElementAdd]);

//   // AI Research Integration
//   const handleResearchQuery = async (query: string) => {
//     try {
//       setLoading(true);
//       const response = await fetch('/api/research', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ query })
//       });

//       if (!response.ok) throw new Error('Research query failed');
      
//       const data: AIResearchResponse = await response.json();
      
//       if (data.daily_passengers || data.ev_parking_spaces) {
//         createChartElement(data);
//       }
//       if (data.competitors) {
//         createCompetitorTable(data.competitors);
//       }
      
//       setResearchResults(data);
//     } catch (error) {
//       setError('Failed to process research query');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Proposal Generation
//   const handleProposalGeneration = async (template: string, requirements: string[]) => {
//     try {
//       setLoading(true);
//       const response = await fetch('/api/generate_proposal', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ template, requirements })
//       });

//       if (!response.ok) throw new Error('Proposal generation failed');
      
//       const data: ProposalData = await response.json();
      
//       const proposalElement: Omit<CanvasElement, 'id'> = {
//         type: 'proposal',
//         content: {
//           title: data.generated_proposal,
//           content: requirements,
//           metadata: data.metadata
//         },
//         position: { x: 100, y: 100 },
//         size: { width: 500, height: 400 },
//         metadata: {
//           author: data.metadata.author,
//           version: data.metadata.version,
//           timestamp: new Date().toISOString()
//         }
//       };
      
//       handleElementAdd(proposalElement);
//       setProposalData(data);
//     } catch (error) {
//       setError('Failed to generate proposal');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Cursor handling with throttling
//   const handleMouseMove = useCallback((e: React.MouseEvent) => {
//     const now = Date.now();
//     if (now - lastUpdateTimestamp < 50) return;

//     if (!canvasRef.current) return;
    
//     const rect = canvasRef.current.getBoundingClientRect();
//     const position = {
//       x: (e.clientX - rect.left) / scale,
//       y: (e.clientY - rect.top) / scale
//     };
    
//     updateCursorPosition(position);
//     wsService.sendMessage('CURSOR_UPDATE', { position });
//     setLastUpdateTimestamp(now);
//   }, [updateCursorPosition, scale, lastUpdateTimestamp]);

//   // Workspace operations
//   const handleSaveWorkspace = useCallback(async () => {
//     try {
//       setLoading(true);
//       const workspace = {
//         elements,
//         connections,
//         groups,
//         metadata: {
//           lastModified: new Date().toISOString(),
//           version: '1.0'
//         }
//       };
      
//       await saveWorkspace(workspace);
//       createVersion({
//         id: Date.now().toString(),
//         workspace,
//         timestamp: new Date().toISOString()
//       });
//     } catch (error) {
//       setError('Failed to save workspace');
//     } finally {
//       setLoading(false);
//     }
//   }, [elements, connections, groups, createVersion, saveWorkspace, setError]);

//   // Enhanced render function
//   const renderElement = useCallback((element: CanvasElement) => {
//     try {
//       switch (element.type) {
//         case 'text':
//           return (
//             <div className="p-4 bg-white rounded-lg shadow-lg min-w-[100px]">
//               {element.content}
//             </div>
//           );
//         case 'code':
//           return (
//             <div className="min-w-[200px]">
//               <CodeBlock
//                 code={element.content}
//                 language="typescript"
//                 showLineNumbers={true}
//               />
//             </div>
//           );
//         case 'chart':
//           return (
//             <div className="w-96 h-64">
//               <Chart {...element.content} />
//             </div>
//           );
//         case 'mermaid':
//           return (
//             <div className="p-4 bg-white rounded-lg shadow-lg">
//               <MermaidDiagram content={element.content} />
//             </div>
//           );
//         case 'meeting-transcript':
//           return (
//             <div className="p-4 bg-white rounded-lg shadow-lg max-w-2xl">
//               <div className="text-sm text-gray-500 mb-2">
//                 Meeting Transcript - {new Date(element.metadata?.timestamp || '').toLocaleString()}
//               </div>
//               {element.content}
//             </div>
//           );
//         case 'proposal':
//           return (
//             <div className="p-6 bg-white rounded-lg shadow-lg max-w-3xl">
//               <div className="text-lg font-semibold mb-4">
//                 {element.content.title}
//               </div>
//               <div className="space-y-2">
//                 {element.content.content.map((req: string, index: number) => (
//                   <div key={index} className="flex items-start gap-2">
//                     <span className="text-blue-500">•</span>
//                     <span>{req}</span>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-4 text-sm text-gray-500">
//                 Author: {element.metadata?.author} | Version: {element.metadata?.version}
//               </div>
//             </div>
//           );
//         case 'diagram':
//         case 'table':
//           return (
//             <div className="p-4 bg-white rounded-lg shadow-lg">
//               {element.content}
//             </div>
//           );
//         default:
//           return null;
//       }
//     } catch (error) {
//       setError('Failed to render element');
//       return null;
//     }
//   }, [setError]);

//   return (
//     <div 
//       className="relative w-full h-full overflow-hidden bg-gray-50"
//       {...gestureHandlers}
//       onMouseMove={handleMouseMove}
//       ref={canvasRef}
//     >
//       {/* Loading Indicator */}
//       {loading && (
//         <div className="absolute top-4 right-4 flex items-center space-x-2">
//           <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent" />
//           <span className="text-gray-600">Processing...</span>
//         </div>
//       )}

//       {/* Error Display */}
//       {error && (
//         <Alert variant="destructive" className="absolute top-4 left-4">
//           <button 
//             className="absolute right-2 top-2 opacity-70 hover:opacity-100"
//             onClick={() => setError(null)}
//           >
//             ×
//           </button>
//           {error}
//         </Alert>
//       )}

//       {/* Collaboration Toolbar */}
//       <CollaborationToolbar />

//       {/* Canvas Toolbar */}
//       <CanvasToolbar
//         onAddElement={handleElementAdd}
//         onUndo={undo}
//         onRedo={redo}
//         onZoomIn={() => setScale(Math.min(2, scale + 0.1))}
//         onZoomOut={() => setScale(Math.max(0.1, scale - 0.1))}
//         onToggleGrid={() => setGridVisible(!gridVisible)}
//         onSave={handleSaveWorkspace}
//         onShare={() => {/* Implement share functionality */}}
//         showGrid={gridVisible}
//         canUndo={canUndo}
//         canRedo={canRedo}
//       />

//       {/* Main Canvas */}
//       <div
//         className="canvas-base absolute w-full h-full"
//         style={{
//           transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
//           transformOrigin: '0 0',
//           transition: 'transform 0.1s ease-out',
//         }}
//       >
//         {/* Grid */}
//         {gridVisible && (
//           <div className="absolute inset-0 grid grid-cols-[repeat(40,minmax(25px,1fr))] grid-rows-[repeat(40,minmax(25px,1fr))] opacity-10 pointer-events-none">
//             {Array.from({ length: 1600 }).map((_, i) => (
//               <div key={i} className="border border-gray-200" />
//             ))}
//           </div>
//         )}

//         {/* Connections */}
//         <svg className="absolute inset-0 pointer-events-none">
//           <AnimatePresence>
//             {connections.map(connection => (
//               <motion.path
//                 key={connection.id}
//                 d={generateConnectionPath(connection)}
//                 stroke={selectedElements.includes(connection.id) ? '#3B82F6' : '#94A3B8'}
//                 strokeWidth="2"
//                 fill="none"
//                 initial={{ pathLength: 0, opacity: 0 }}
//                 animate={{ pathLength: 1, opacity: 1 }}
//                 exit={{ pathLength: 0, opacity: 0 }}
//                 transition={{ duration: 0.3 }}
//               />
//             ))}
//           </AnimatePresence>
//         </svg>

//         {/* Elements */}
//         <AnimatePresence>
//           {elements.map((element) => (
//             <motion.div
//               key={element.id}
//               className={`absolute ${
//                 selectedElements.includes(element.id) ? 'ring-2 ring-blue-500' : ''
//               }`}
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{
//                 opacity: 1,
//                 scale: element.scale || 1,
//                 x: element.position.x,
//                 y: element.position.y,
//                 rotate: element.rotation || 0,
//               }}
//               exit={{ opacity: 0, scale: 0.8 }}
//               drag
//               dragMomentum={false}
//               onDragStart={() => startResize(element.id, element.size, element.position)}
//               onDrag={(e, info) => {
//                 if (resizeState.isResizing) {
//                   const updates = updateResize(info.offset.x, info.offset.y);
//                   if (updates) {
//                     handleElementUpdate(element.id, {
//                       size: updates.size,
//                       position: updates.position,
//                     });
//                   }
//                 }
//               }}
//               onDragEnd={endResize}
//             >
//               {renderElement(element)}
              
//               {/* Resize Handles */}
//               {selectedElements.includes(element.id) && (
//                 <div className="absolute inset-0">
//                   {['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'].map(handle => (
//                     <div
//                       key={handle}
//                       className={`absolute w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-${handle}-resize`}
//                       style={{
//                         ...getResizeHandlePosition(handle),
//                         transform: 'translate(-50%, -50%)',
//                       }}
//                       onMouseDown={(e) => {
//                         e.stopPropagation();
//                         startResize(element.id, element.size, element.position);
//                       }}
//                     />
//                   ))}
//                 </div>
//               )}
//             </motion.div>
//           ))}
//         </AnimatePresence>

//         {/* Collaborator Cursors */}
//         {activeCollaborators.map((collaborator) => (
//           <CursorPresence
//             key={collaborator.id}
//             user={collaborator}
//             position={cursorPositions[collaborator.id]}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Canvas;





// // 1221 11:28

'use client';

import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHydratedStore } from '@/store/useStore';
import { wsService } from '@/lib/websocket';
import { useCanvasHistory } from './hooks/useCanvasHistory';
import { useCanvasGestures } from './hooks/useCanvasGestures';
import { useCanvasSelection } from './hooks/useCanvasSelection';
import { useCanvasResize } from './hooks/useCanvasResize';
import CodeBlock from '../CodeBlock';
import Chart from '../Chart';
import { CursorPresence } from '../CursorPresence';
import { CollaborationToolbar } from '../CollaborationToolbar';
import MermaidDiagram from '../MermaidDiagram';
import CanvasToolbar from '../CanvasToolbar';
import { Toast, ToastDescription, ToastTitle } from '@/components/ui/toast';
import { Alert } from '@/components/ui/alert';
import _ from 'lodash';
import Papa from 'papaparse';

// Types for AI Integration
interface AIResearchResponse {
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

interface Point {
  x: number;
  y: number;
}

// interface Connection {
//   id: string;
//   from: string;
//   to: string;
//   type: 'straight' | 'curved';
//   controlPoints?: Point[];
// }

interface Connection {
  id: string;
  from: string;
  to: string;
  type: 'straight' | 'curved';
  controlPoints?: Array<{ x: number; y: number }>;
}

interface CanvasElement {
  id: string;
  type: 'text' | 'code' | 'chart' | 'diagram' | 'table' | 'mermaid' | 'meeting-transcript' | 'proposal';
  content: any;
  position: Point;
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
  };
}

// Helper functions
function getResizeHandlePosition(handle: string) {
  const positions: { [key: string]: { left: string; top: string } } = {
    n: { left: '50%', top: '0%' },
    s: { left: '50%', top: '100%' },
    e: { left: '100%', top: '50%' },
    w: { left: '0%', top: '50%' },
    ne: { left: '100%', top: '0%' },
    nw: { left: '0%', top: '0%' },
    se: { left: '100%', top: '100%' },
    sw: { left: '0%', top: '100%' },
  };
  return positions[handle];
}

function generateConnectionPath(connection: Connection): string {
  try {
    if (!connection.from || !connection.to) return '';
    
    if (connection.type === 'curved' && connection.controlPoints?.length === 2) {
      const [cp1, cp2] = connection.controlPoints;
      return `M ${connection.from} C ${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${connection.to}`;
    }

    return `M ${connection.from} L ${connection.to}`;
  } catch (error) {
    console.error('Failed to generate connection path:', error);
    return '';
  }
}




function Canvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStart, setConnectionStart] = useState<string | null>(null);
  const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState(Date.now());
  const [loading, setLoading] = useState(false);
  const [gridVisible, setGridVisible] = useState(true);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  
  const {
    elements,
    connections,
    groups,
    selectedElements,
    scale,
    viewMode,
    snapToGrid,
    collaborators,
    cursorPositions,
    activeUsers,
    error,
    setResearchResults,
    setProposalData,
    addElement,
    updateElement,
    removeElement,
    addConnection,
    updateConnection,
    removeConnection,
    setSelectedElements,
    updateCursorPosition,
    setScale,
    setError,
    createVersion,  // Single declaration
    undo,
    redo,
    saveWorkspace
  } = useHydratedStore(
    useCallback(
      (state) => ({
        elements: state.elements || [],
        connections: state.connections || [],
        groups: state.groups || [],
        selectedElements: state.selectedElements || [],
        scale: state.scale || 1,
        viewMode: state.viewMode || 'edit',
        snapToGrid: state.snapToGrid || false,
        collaborators: state.collaborators || [],
        cursorPositions: state.cursorPositions || {},
        activeUsers: state.activeUsers || [],
        error: state.error || null,
        addElement: state.addElement,
        updateElement: state.updateElement,
        removeElement: state.removeElement,
        addConnection: state.addConnection,
        updateConnection: state.updateConnection,
        removeConnection: state.removeConnection,
        setSelectedElements: state.setSelectedElements,
        updateCursorPosition: state.updateCursorPosition,
        setScale: state.setScale,
        setError: state.setError,
        createVersion: state.createVersion,
        undo: state.undo,
        redo: state.redo,
        saveWorkspace: state.saveWorkspace,
        setResearchResults: state.setResearchResults,
        setProposalData: state.setProposalData
      }),
      []
    )
  );
  
  
  
  // const {
   
  //   groups, // Add this
  //   createVersion, // Add this
  
  //   // scale,
   
  //   // versions,
  //   // history,
  //   // currentVersion,
  //   // collaborators,
  //   // activeUsers,
  
  //   // addElement,
  //   // updateElement,
  //   // removeElement,
  //   // setSelectedElements,
  //   // updateCursorPosition,
  //   // addConnection,
  //   // updateConnection,
  //   // removeConnection,
  //   // undo,
  //   // redo,
  //   // setShowGrid,
  //   // setResearchResults,
  //   // setProposalData,
  //   // addCollaborator,
  //   // removeCollaborator,
  //   // updateCollaborator,
  //   // switchVersion,
  //   // addHistoryEntry,
  //   saveWorkspace,

  //   elements,
  //   connections,
  //   selectedElements,
  //   scale,
  //   viewMode,
  //   snapToGrid,
  //   collaborators,
  //   cursorPositions,
  //   activeUsers,
  //   error,
  //   addElement,
  //   updateElement,
  //   removeElement,
  //   addConnection,
  //   updateConnection,
  //   removeConnection,
  //   setSelectedElements,
  //   updateCursorPosition,
  //   setScale,
  //   setError
  // } = useHydratedStore(
  //   useCallback(
  //     (state) => ({
  //       elements: state.elements || [],
  //       groups: state.groups || [], // Add default empty array
  //       versions: state.versions,
  //       history: state.history,
  //       currentVersion: state.currentVersion,
  //       connections: state.connections || [], // Provide default empty array
  //       selectedElements: state.selectedElements || [],
  //       scale: state.scale || 1,
  //       viewMode: state.viewMode || 'edit',
  //       snapToGrid: state.snapToGrid || false,
  //       collaborators: state.collaborators || [],

  //       cursorPositions: state.cursorPositions || {},
  //       activeUsers: state.activeUsers || [],
  //       error: state.error || null,
  //       createVersion: state.createVersion, // Add this


  //       setSelectedElements: state.setSelectedElements,
  //       updateCursorPosition: state.updateCursorPosition,
  //       setScale: state.setScale,
      
  
  //       // undo: state.undo,
  //       // redo: state.redo,
  //       // setShowGrid: state.setShowGrid,
  //       // setResearchResults: state.setResearchResults,
  //       // setProposalData: state.setProposalData,
  //       // addCollaborator: state.addCollaborator,
  //       // removeCollaborator: state.removeCollaborator,
  //       // updateCollaborator: state.updateCollaborator,

  //       switchVersion: state.switchVersion,
  //       addHistoryEntry: state.addHistoryEntry,
  //       saveWorkspace: state.saveWorkspace,

  //       addElement: state.addElement,
  //       updateElement: state.updateElement,
  //       removeElement: state.removeElement,
  //       addConnection: state.addConnection,
  //       updateConnection: state.updateConnection,
  //       removeConnection: state.removeConnection,
  //       setSelectedElements: state.setSelectedElements,
  //       updateCursorPosition: state.updateCursorPosition,
  //       setScale: state.setScale,
  //       setError: state.setError
  //     }),
  //     []
  //   )
  // );


  // Add connection handling functions
  const handleConnectionStart = useCallback((elementId: string) => {
    setIsConnecting(true);
    setConnectionStart(elementId);
  }, []);

  const handleConnectionEnd = useCallback((elementId: string) => {
    if (connectionStart && connectionStart !== elementId) {
      addConnection({
        from: connectionStart,
        to: elementId,
        type: 'straight'
      });
    }
    setIsConnecting(false);
    setConnectionStart(null);
  }, [connectionStart, addConnection]);

  // Active collaborators calculation
  const activeCollaborators = useMemo(() => 
    collaborators.filter(c => 
      cursorPositions[c.id] && 
      Date.now() - new Date(cursorPositions[c.id].timestamp).getTime() < 30000
    ),
    [collaborators, cursorPositions]
  );

  // // Custom hooks
  // const { state: historyState, canUndo, canRedo, saveState } = useCanvasHistory({
  //   elements,
  //   connections,
  //   groups
  // });

   // Update history state usage
   const { canUndo, canRedo, saveState } = useCanvasHistory({
    elements,
    connections,
    groups,
  });





  // const { handlers: gestureHandlers, pan } = useCanvasGestures();

    // Update gesture handlers
  const gestureHandlers = useCanvasGestures({
      onPanChange: setPan,
      scale,
      snapToGrid,
    });


  const { startResize, updateResize, endResize, resizeState } = useCanvasResize();
  const { selection, updateSelection } = useCanvasSelection();

  // Base element handlers
  const handleElementAdd = useCallback((element: Omit<CanvasElement, 'id'>) => {
    const newElement = addElement(element);
    wsService.sendMessage('ELEMENT_ADD', { element: newElement });
    
    const timeoutId = setTimeout(() => {
      saveState({
        elements: [...elements, newElement],
        connections,
        groups
      });
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [addElement, elements, connections, groups, saveState]);

  const handleElementUpdate = useCallback((
    elementId: string,
    updates: Partial<CanvasElement>
  ) => {
    updateElement(elementId, updates);
    wsService.sendMessage('ELEMENT_UPDATE', { elementId, updates });
    
    const timeoutId = setTimeout(() => {
      saveState({
        elements: elements.map(el => 
          el.id === elementId ? { ...el, ...updates } : el
        ),
        connections,
        groups
      });
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [elements, connections, groups, updateElement, saveState]);

  const handleElementRemove = useCallback((elementId: string) => {
    try {
      const connectedPaths = connections.filter(
        conn => conn.from === elementId || conn.to === elementId
      );
      connectedPaths.forEach(path => removeConnection(path.id));

      removeElement(elementId);
      wsService.sendMessage('ELEMENT_REMOVE', { elementId });

      saveState({
        elements: elements.filter(el => el.id !== elementId),
        connections: connections.filter(
          conn => conn.from !== elementId && conn.to !== elementId
        ),
        groups
      });
    } catch (error) {
      setError('Failed to remove element and its connections');
    }
  }, [removeElement, removeConnection, elements, connections, groups, saveState, setError]);

  // Visualization creators
  const createChartElement = useCallback((data: AIResearchResponse) => {
    const chartElement: Omit<CanvasElement, 'id'> = {
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
    };
    handleElementAdd(chartElement);
  }, [handleElementAdd]);

  const createCompetitorTable = useCallback((competitors: AIResearchResponse['competitors']) => {
    if (!competitors) return;
    
    const tableElement: Omit<CanvasElement, 'id'> = {
      type: 'table',
      content: {
        headers: ['Company', 'Stations', 'Locations'],
        rows: competitors.map(comp => [
          comp.name,
          comp.stations.toString(),
          comp.locations.join(', ')
        ])
      },
      position: { x: 100, y: 450 },
      size: { width: 400, height: 200 }
    };
    handleElementAdd(tableElement);
  }, [handleElementAdd]);

  // AI Research Integration
  const handleResearchQuery = async (query: string) => {
    try {
      setLoading(true);
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      if (!response.ok) throw new Error('Research query failed');
      
      const data: AIResearchResponse = await response.json();
      
      if (data.daily_passengers || data.ev_parking_spaces) {
        createChartElement(data);
      }
      if (data.competitors) {
        createCompetitorTable(data.competitors);
      }
      
      setResearchResults(data);
    } catch (error) {
      setError('Failed to process research query');
    } finally {
      setLoading(false);
    }
  };

  // Proposal Generation
  const handleProposalGeneration = async (template: string, requirements: string[]) => {
    try {
      setLoading(true);
      const response = await fetch('/api/generate_proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ template, requirements })
      });

      if (!response.ok) throw new Error('Proposal generation failed');
      
      const data: ProposalData = await response.json();
      
      const proposalElement: Omit<CanvasElement, 'id'> = {
        type: 'proposal',
        content: {
          title: data.generated_proposal,
          content: requirements,
          metadata: data.metadata
        },
        position: { x: 100, y: 100 },
        size: { width: 500, height: 400 },
        metadata: {
          author: data.metadata.author,
          version: data.metadata.version,
          timestamp: new Date().toISOString()
        }
      };
      
      handleElementAdd(proposalElement);
      setProposalData(data);
    } catch (error) {
      setError('Failed to generate proposal');
    } finally {
      setLoading(false);
    }
  };

  // Cursor handling with throttling
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const now = Date.now();
    if (now - lastUpdateTimestamp < 50) return;

    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const position = {
      x: (e.clientX - rect.left) / scale,
      y: (e.clientY - rect.top) / scale
    };
    
    updateCursorPosition(position);
    wsService.sendMessage('CURSOR_UPDATE', { position });
    setLastUpdateTimestamp(now);
  }, [updateCursorPosition, scale, lastUpdateTimestamp]);

  // // Workspace operations
  // const handleSaveWorkspace = useCallback(async () => {
  //   try {
  //     setLoading(true);
  //     const workspace = {
  //       elements,
  //       connections,
  //       groups,
  //       metadata: {
  //         lastModified: new Date().toISOString(),
  //         version: '1.0'
  //       }
  //     };
      
  //     await saveWorkspace(workspace);
  //     createVersion({
  //       id: Date.now().toString(),
  //       workspace,
  //       timestamp: new Date().toISOString()
  //     });
  //   } catch (error) {
  //     setError('Failed to save workspace');
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [elements, connections, groups, createVersion, saveWorkspace, setError]);


// Update the handleSaveWorkspace callback to properly use createVersion
const handleSaveWorkspace = useCallback(async () => {
  try {
    setLoading(true);
    const workspace = {
      elements,
      connections,
      groups,
      metadata: {
        lastModified: new Date().toISOString(),
        version: '1.0'
      }
    };
    
    await saveWorkspace(workspace);
    
    // Call createVersion with proper parameters
    createVersion(
      'current-user', // Replace with actual user ID when available
      `Saved workspace at ${new Date().toLocaleString()}`
    );
  } catch (error) {
    setError('Failed to save workspace');
  } finally {
    setLoading(false);
  }
}, [elements, connections, groups, createVersion, saveWorkspace, setError]);



  // Enhanced render function
  const renderElement = useCallback((element: CanvasElement) => {
    try {
      switch (element.type) {
        case 'text':
          return (
            <div className="p-4 bg-white rounded-lg shadow-lg min-w-[100px]">
              {element.content}
            </div>
          );
        case 'code':
          return (
            <div className="min-w-[200px]">
              <CodeBlock
                code={element.content}
                language="typescript"
                showLineNumbers={true}
              />
            </div>
          );
        case 'chart':
          return (
            <div className="w-96 h-64">
              <Chart {...element.content} />
            </div>
          );
        case 'mermaid':
          return (
            <div className="p-4 bg-white rounded-lg shadow-lg">
              <MermaidDiagram content={element.content} />
            </div>
          );
        case 'meeting-transcript':
          return (
            <div className="p-4 bg-white rounded-lg shadow-lg max-w-2xl">
              <div className="text-sm text-gray-500 mb-2">
                Meeting Transcript - {new Date(element.metadata?.timestamp || '').toLocaleString()}
              </div>
              {element.content}
            </div>
          );
        case 'proposal':
          return (
            <div className="p-6 bg-white rounded-lg shadow-lg max-w-3xl">
              <div className="text-lg font-semibold mb-4">
                {element.content.title}
              </div>
              <div className="space-y-2">
                {element.content.content.map((req: string, index: number) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span>{req}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Author: {element.metadata?.author} | Version: {element.metadata?.version}
              </div>
            </div>
          );
        case 'diagram':
        case 'table':
          return (
            <div className="p-4 bg-white rounded-lg shadow-lg">
              {element.content}
            </div>
          );
        default:
          return null;
      }
    } catch (error) {
      setError('Failed to render element');
      return null;
    }
  }, [setError]);

  return (
    <div 
      className="relative w-full h-full overflow-hidden bg-gray-50"
      {...gestureHandlers}
      onMouseMove={handleMouseMove}
      ref={canvasRef}
    >
         
      {/* Loading Indicator */}
      {loading && (
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent" />
          <span className="text-gray-600">Processing...</span>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <Alert variant="destructive" className="absolute top-4 left-4">
          <button 
            className="absolute right-2 top-2 opacity-70 hover:opacity-100"
            onClick={() => setError(null)}
          >
            ×
          </button>
          {error}
        </Alert>
      )}

      {/* Collaboration Toolbar */}
      <CollaborationToolbar />

      {/* Canvas Toolbar */}
      <CanvasToolbar
        onAddElement={handleElementAdd}
        onUndo={undo}
        onRedo={redo}
        onZoomIn={() => setScale(Math.min(2, scale + 0.1))}
        onZoomOut={() => setScale(Math.max(0.1, scale - 0.1))}
        onToggleGrid={() => setGridVisible(!gridVisible)}
        onSave={handleSaveWorkspace}
        onShare={() => {/* Implement share functionality */}}
        showGrid={gridVisible}
        canUndo={canUndo}
        canRedo={canRedo}
      />

      {/* Main Canvas */}
      <div
        className="canvas-base absolute w-full h-full"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
          transformOrigin: '0 0',
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Grid */}
        {gridVisible && (
          <div className="absolute inset-0 grid grid-cols-[repeat(40,minmax(25px,1fr))] grid-rows-[repeat(40,minmax(25px,1fr))] opacity-10 pointer-events-none">
            {Array.from({ length: 1600 }).map((_, i) => (
              <div key={i} className="border border-gray-200" />
            ))}
          </div>
        )}





{/* Connections Layer */}
<svg className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
          {(connections || []).map(connection => ( // Add null check with default empty array
            <motion.path
              key={connection.id}
              d={generateConnectionPath(connection)}
              stroke={selectedElements.includes(connection.id) ? '#3B82F6' : '#94A3B8'}
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              exit={{ pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </AnimatePresence>
      </svg>

      {/* Elements Layer */}
      <AnimatePresence>
        {elements.map((element) => (
          <motion.div
            key={element.id}
            className={`absolute ${
              selectedElements.includes(element.id) ? 'ring-2 ring-blue-500' : ''
            }`}
            style={{
              left: element.position.x,
              top: element.position.y,
              width: element.size?.width,
              height: element.size?.height,
              transform: `scale(${element.scale || 1}) rotate(${element.rotation || 0}deg)`
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: element.scale || 1,
              x: element.position.x,
              y: element.position.y,
              rotate: element.rotation || 0
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            drag
            dragMomentum={false}
            onDragStart={() => {
              if (isConnecting) {
                handleConnectionEnd(element.id);
              } else {
                startResize(element.id, element.size, element.position);
              }
            }}
            onDrag={(e, info) => {
              if (resizeState.isResizing) {
                const updates = updateResize(info.offset.x, info.offset.y);
                if (updates) {
                  handleElementUpdate(element.id, {
                    size: updates.size,
                    position: updates.position,
                  });
                }
              }
            }}
            onDragEnd={endResize}
          >
            {renderElement(element)}
            
            {/* Connection Points */}
            {selectedElements.includes(element.id) && (
              <div className="absolute inset-0">
                <div
                  className="absolute w-3 h-3 bg-blue-500 rounded-full cursor-pointer"
                  style={{ top: '50%', right: '-6px', transform: 'translateY(-50%)' }}
                  onMouseDown={() => handleConnectionStart(element.id)}
                />
              </div>
            )}




        {/* Connections
        <svg className="absolute inset-0 pointer-events-none">
          <AnimatePresence>
            {connections.map(connection => (
              <motion.path
                key={connection.id}
                d={generateConnectionPath(connection)}
                stroke={selectedElements.includes(connection.id) ? '#3B82F6' : '#94A3B8'}
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </AnimatePresence>
        </svg> */}

        {/* Elements
        <AnimatePresence>
          {elements.map((element) => (
            <motion.div
              key={element.id}
              className={`absolute ${
                selectedElements.includes(element.id) ? 'ring-2 ring-blue-500' : ''
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: element.scale || 1,
                x: element.position.x,
                y: element.position.y,
                rotate: element.rotation || 0,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              drag
              dragMomentum={false}
              onDragStart={() => startResize(element.id, element.size, element.position)}
              onDrag={(e, info) => {
                if (resizeState.isResizing) {
                  const updates = updateResize(info.offset.x, info.offset.y);
                  if (updates) {
                    handleElementUpdate(element.id, {
                      size: updates.size,
                      position: updates.position,
                    });
                  }
                }
              }}
              onDragEnd={endResize}
            >
              {renderElement(element)} */}
              
              {/* Resize Handles */}
              {selectedElements.includes(element.id) && (
                <div className="absolute inset-0">
                  {['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'].map(handle => (
                    <div
                      key={handle}
                      className={`absolute w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-${handle}-resize`}
                      style={{
                        ...getResizeHandlePosition(handle),
                        transform: 'translate(-50%, -50%)',
                      }}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        startResize(element.id, element.size, element.position);
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Collaborator Cursors */}
        {activeCollaborators.map((collaborator) => (
          <CursorPresence
            key={collaborator.id}
            user={collaborator}
            position={cursorPositions[collaborator.id]}
          />
        ))}
      </div>
    </div>
  );
}

export default Canvas;