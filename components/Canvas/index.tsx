// // 1221 11:28

'use client';


import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useCallback, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { useHydratedStore } from '@/store/useStore';
import { useHydratedStore } from '@/store/useStore';
// NOT import useHydratedStore from '@/store/useStore';



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

  //   // Update gesture handlers
  // const gestureHandlers = useCanvasGestures({
  //     onPanChange: setPan,
  //     scale,
  //     snapToGrid,
  //   });


  // Replace the existing pan state and gesture handlers with:

// const [gestureState, setGestureState] = useState({
//   isPanning: false,
//   startX: 0,
//   startY: 0
// });

  //   // Updated gesture handlers integration
  // const { handlers: gestureHandlers, state: gestureState, ref: gestureRef } = useCanvasGestures({
  //   onPanChange: (delta) => {
  //     setPanState(prev => ({
  //       x: prev.x + delta.x,
  //       y: prev.y + delta.y
  //     }));
  //   },
  //   onScaleChange: setScale,
  //   initialScale: scale,
  //   snapToGrid
  // });

// // Update the gesture handlers integration
// const { handlers: gestureHandlers, state: gestureState, ref: gestureRef } = useCanvasGestures({
//   onPanChange: (delta) => {
//     setPan(prev => ({
//       x: prev.x + delta.x,
//       y: prev.y + delta.y
//     }));
//   },
//   onScaleChange: setScale,
//   initialScale: scale,
//   snapToGrid
// });


const { 
  handlers: gestureHandlers, 
  state: gestureState, 
  ref: gestureRef 
} = useCanvasGestures({
  onPanChange: (delta) => {
    setPan(prev => ({
      x: prev.x + delta.x,
      y: prev.y + delta.y
    }));
  },
  onScaleChange: setScale,
  initialScale: scale,
  snapToGrid
});

// // Update the style object in the canvas div:
// <div
//   className="canvas-base absolute w-full h-full"
//   style={{
//     transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
//     transformOrigin: '0 0',
//     transition: gestureState.isPanning ? 'none' : 'transform 0.1s ease-out',
//   }}
// ></div>




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

//    // Wrapper component for gesture handling
//    const CanvasContainer = useCallback(({ children }: { children: React.ReactNode }) => (
//     <div
//       className="relative w-full h-full overflow-hidden bg-gray-50"
//       {...gestureHandlers}
//       onMouseMove={handleMouseMove}
//       ref={(el) => {
//         if (el) {
//           canvasRef.current = el;
//           if (gestureRef) {
//             // @ts-ignore - we know this ref exists
//             gestureRef.current = el;
//           }
//         }
//       }}
//     >
//       {children}
//     </div>
//   ), [gestureHandlers, handleMouseMove, gestureRef]);

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





// {/* Connections Layer */}
// <svg className="absolute inset-0 pointer-events-none">
//         <AnimatePresence>
//           {(connections || []).map(connection => ( // Add null check with default empty array
//             <motion.path
//               key={connection.id}
//               d={generateConnectionPath(connection)}
//               stroke={selectedElements.includes(connection.id) ? '#3B82F6' : '#94A3B8'}
//               strokeWidth="2"
//               fill="none"
//               initial={{ pathLength: 0, opacity: 0 }}
//               animate={{ pathLength: 1, opacity: 1 }}
//               exit={{ pathLength: 0, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//             />
//           ))}
//         </AnimatePresence>
//       </svg>

//       {/* Elements Layer */}
//       <AnimatePresence>
//         {elements.map((element) => (
//           <motion.div
//             key={element.id}
//             className={`absolute ${
//               selectedElements.includes(element.id) ? 'ring-2 ring-blue-500' : ''
//             }`}
//             style={{
//               left: element.position.x,
//               top: element.position.y,
//               width: element.size?.width,
//               height: element.size?.height,
//               transform: `scale(${element.scale || 1}) rotate(${element.rotation || 0}deg)`
//             }}
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{
//               opacity: 1,
//               scale: element.scale || 1,
//               x: element.position.x,
//               y: element.position.y,
//               rotate: element.rotation || 0
//             }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             drag
//             dragMomentum={false}
//             onDragStart={() => {
//               if (isConnecting) {
//                 handleConnectionEnd(element.id);
//               } else {
//                 startResize(element.id, element.size, element.position);
//               }
//             }}
//             onDrag={(e, info) => {
//               if (resizeState.isResizing) {
//                 const updates = updateResize(info.offset.x, info.offset.y);
//                 if (updates) {
//                   handleElementUpdate(element.id, {
//                     size: updates.size,
//                     position: updates.position,
//                   });
//                 }
//               }
//             }}
//             onDragEnd={endResize}
//           >
//             {renderElement(element)}
            
//             {/* Connection Points */}
//             {selectedElements.includes(element.id) && (
//               <div className="absolute inset-0">
//                 <div
//                   className="absolute w-3 h-3 bg-blue-500 rounded-full cursor-pointer"
//                   style={{ top: '50%', right: '-6px', transform: 'translateY(-50%)' }}
//                   onMouseDown={() => handleConnectionStart(element.id)}
//                 />
//               </div>
//             )}




//         {/* Connections
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
//         </svg> */}

//         {/* Elements
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
//               {renderElement(element)} */}
              
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

// Wrapper component for gesture handling
  const CanvasContainer = useCallback(({ children }: { children: React.ReactNode }) => (
    <div
      className="relative w-full h-full overflow-hidden bg-gray-50"
      {...gestureHandlers}
      onMouseMove={handleMouseMove}
      ref={(el) => {
        if (el) {
          canvasRef.current = el;
          if (gestureRef) {
            // @ts-ignore - we know this ref exists
            gestureRef.current = el;
          }
        }
      }}
    >
      {children}
    </div>
  ), [gestureHandlers, handleMouseMove, gestureRef]);

  return (
    <CanvasContainer>
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

      {/* Main Canvas Content */}

      {/* <div
        className="canvas-base absolute w-full h-full"
        style={{
          transform: `translate(${panState.x}px, ${panState.y}px) scale(${scale})`,
          transformOrigin: '0 0',
          transition: gestureState.isPanning ? 'none' : 'transform 0.1s ease-out',
        }}
      > */}

        {/* // Update the style object in the canvas div:
        <div
          className="canvas-base absolute w-full h-full"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: '0 0',
            transition: gestureState.isPanning ? 'none' : 'transform 0.1s ease-out',
          }}
        >   */}

        <div
          className="canvas-base absolute w-full h-full"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: '0 0',
            transition: gestureState.isPanning ? 'none' : 'transform 0.1s ease-out',
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
            {(connections || []).map(connection => (
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
    </CanvasContainer>
  );
};

export default Canvas;