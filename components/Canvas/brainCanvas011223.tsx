// // /home/user/Guru-AI/components/Canvas/brainCanvas.tsx
// 'use client';

// import React, { useRef, useEffect } from 'react';
// import { CanvasElement, Version } from '@/store/brainStore'; // or '@/stores/brainStore'

// interface BrainCanvasProps {
//   elements: CanvasElement[];
//   onElementAdd: (element: CanvasElement) => void;
//   onElementUpdate: (id: string, updates: Partial<CanvasElement>) => void;
//   onElementRemove: (id: string) => void;
//   scale: number;
//   viewMode: 'edit' | 'view' | 'present';
//   gridVisible: boolean;
//   snapToGrid: boolean;
//   onCursorUpdate: (position: { x: number; y: number }) => void;
//   collaborators: any[];
//   cursorPositions: Record<string, { x: number; y: number; timestamp: string }>;
//   onVersionSwitch: (versionId: string) => void;
//   versions: Version[];
//   currentVersion: string;
// }

// /**
//  * A collaborative Canvas for dynamic visual editing.
//  * Real logic can be implemented with a drawing library or react-flow, etc.
//  */
// export default function BrainCanvas({
//   elements,
//   onElementAdd,
//   onElementUpdate,
//   onElementRemove,
//   scale,
//   viewMode,
//   gridVisible,
//   snapToGrid,
//   onCursorUpdate,
//   collaborators,
//   cursorPositions,
//   onVersionSwitch,
//   versions,
//   currentVersion,
// }: BrainCanvasProps) {
//   const canvasRef = useRef<HTMLDivElement>(null);

//   // Track mouse position => send to collaboration service
//   useEffect(() => {
//     const ref = canvasRef.current;
//     if (!ref) return;

//     const handleMove = (e: MouseEvent) => {
//       onCursorUpdate({ x: e.clientX, y: e.clientY });
//     };

//     ref.addEventListener('mousemove', handleMove);
//     return () => {
//       ref.removeEventListener('mousemove', handleMove);
//     };
//   }, [onCursorUpdate]);

//   return (
//     <div
//       ref={canvasRef}
//       className="relative w-full h-full"
//       style={{
//         backgroundSize: gridVisible ? '20px 20px' : 'none',
//         backgroundImage: gridVisible
//           ? 'linear-gradient(to right, #e3e3e3 1px, transparent 1px), linear-gradient(to bottom, #e3e3e3 1px, transparent 1px)'
//           : 'none',
//       }}
//       aria-label="Collaborative Canvas"
//     >
//       {/* Version Switch UI */}
//       <div className="absolute right-2 top-2 bg-white shadow p-2 rounded z-10">
//         <label className="mr-2 text-sm font-semibold">Version:</label>
//         <select
//           value={currentVersion}
//           onChange={(e) => onVersionSwitch(e.target.value)}
//           className="border rounded px-2 py-1 text-sm"
//           aria-label="Select version to switch"
//         >
//           <option value="">Current</option>
//           {versions.map((v) => (
//             <option key={v.id} value={v.id}>
//               {v.timestamp} by {v.author}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Render elements in absolutely positioned boxes */}
//       {elements.map((el) => (
//         <div
//           key={el.id}
//           id={el.id}
//           style={{
//             position: 'absolute',
//             left: el.position.x,
//             top: el.position.y,
//             width: el.size.width,
//             height: el.size.height,
//             border: '1px solid #ccc',
//             background: '#fff',
//             overflow: 'auto',
//             padding: '4px',
//           }}
//         >
//           <h3 className="text-xs font-bold mb-1">{el.type.toUpperCase()}</h3>
//           {/* Simple content rendering for demonstration */}
//           {el.type === 'chart' && (
//             <div className="text-xs">
//               <p>Chart Type: {el.content?.type}</p>
//               <pre>{JSON.stringify(el.content?.data, null, 2)}</pre>
//             </div>
//           )}
//           {el.type === 'table' && (
//             <table className="border-collapse border border-gray-400 text-xs">
//               <thead>
//                 <tr>
//                   {el.content?.headers?.map((hdr: string, i: number) => (
//                     <th key={i} className="border border-gray-300 bg-gray-200 px-2 py-1">
//                       {hdr}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {el.content?.data?.map((row: any[], rIndex: number) => (
//                   <tr key={rIndex}>
//                     {row.map((cell, cIndex) => (
//                       <td key={cIndex} className="border border-gray-300 px-2 py-1">
//                         {cell}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//           {el.type === 'text' && (
//             <div className="text-xs">
//               <h4 className="font-semibold">{el.content?.title}</h4>
//               {Array.isArray(el.content?.items) ? (
//                 <ul className="list-disc ml-5">
//                   {el.content.items.map((item: string, idx: number) => (
//                     <li key={idx}>{item}</li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>{JSON.stringify(el.content, null, 2)}</p>
//               )}
//             </div>
//           )}
//           {el.type === 'proposal' && (
//             <div className="text-xs whitespace-pre-wrap">
//               <h4 className="font-semibold mb-1">Proposal</h4>
//               {el.content?.text}
//             </div>
//           )}
//         </div>
//       ))}

//       {/* Collaborator cursors */}
//       {Object.keys(cursorPositions).map((userId) => {
//         const cursor = cursorPositions[userId];
//         const collaborator = collaborators.find(c => c.id === userId);
//         if (!cursor) return null;
//         return (
//           <div
//             key={userId}
//             className="absolute pointer-events-none flex items-center"
//             style={{
//               left: cursor.x + 8,
//               top: cursor.y + 8,
//             }}
//           >
//             <div className="bg-blue-600 w-2 h-2 rounded-full mr-1" />
//             <span className="text-xs bg-white px-1 py-0.5 rounded shadow">
//               {collaborator?.name || userId}
//             </span>
//           </div>
//         );
//       })}
//     </div>
//   );
// }


// 'use client';

// import React, { useRef, useEffect } from 'react';
// import { CanvasElement, Version } from '@/store/brainStore'; // or '@/stores/brainStore'

// interface BrainCanvasProps {
//   elements: CanvasElement[];
//   onElementAdd: (element: CanvasElement) => void;
//   onElementUpdate: (id: string, updates: Partial<CanvasElement>) => void;
//   onElementRemove: (id: string) => void;
//   scale: number;
//   viewMode: 'edit' | 'view' | 'present';
//   gridVisible: boolean;
//   snapToGrid: boolean;
//   onCursorUpdate: (position: { x: number; y: number }) => void;
//   collaborators: any[];
//   cursorPositions: Record<string, { x: number; y: number; timestamp: string }>;
//   onVersionSwitch: (versionId: string) => void;
//   versions: Version[];
//   currentVersion: string;
// }

// /**
//  * A collaborative canvas for AI-based visual editing.
//  * We’re using simplistic absolutely-positioned elements; you can integrate a real library if needed.
//  */
// export default function BrainCanvas({
//   elements,
//   onElementAdd,
//   onElementUpdate,
//   onElementRemove,
//   scale,
//   viewMode,
//   gridVisible,
//   snapToGrid,
//   onCursorUpdate,
//   collaborators,
//   cursorPositions,
//   onVersionSwitch,
//   versions,
//   currentVersion,
// }: BrainCanvasProps) {
//   const canvasRef = useRef<HTMLDivElement>(null);

//   // Listen to mouse moves => update cursor positions for collaboration
//   useEffect(() => {
//     const ref = canvasRef.current;
//     if (!ref) return;

//     function handleMove(e: MouseEvent) {
//       onCursorUpdate({ x: e.clientX, y: e.clientY });
//     }

//     ref.addEventListener('mousemove', handleMove);
//     return () => {
//       ref.removeEventListener('mousemove', handleMove);
//     };
//   }, [onCursorUpdate]);

//   return (
//     <div
//       ref={canvasRef}
//       className="relative w-full h-full"
//       style={{
//         backgroundSize: gridVisible ? '20px 20px' : 'none',
//         backgroundImage: gridVisible
//           ? 'linear-gradient(to right, #e3e3e3 1px, transparent 1px), linear-gradient(to bottom, #e3e3e3 1px, transparent 1px)'
//           : 'none',
//       }}
//       aria-label="Collaborative Canvas"
//     >
//       {/* Version switching UI */}
//       <div className="absolute right-2 top-2 bg-white shadow p-2 rounded z-10">
//         <label className="mr-2 text-sm font-semibold">Version:</label>
//         <select
//           value={currentVersion}
//           onChange={(e) => onVersionSwitch(e.target.value)}
//           className="border rounded px-2 py-1 text-sm"
//           aria-label="Select version to switch"
//         >
//           <option value="">Current</option>
//           {versions.map((v) => (
//             <option key={v.id} value={v.id}>
//               {v.timestamp} by {v.author}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Render each element in absolutely positioned boxes */}
//       {elements.map(el => (
//         <div
//           key={el.id}
//           id={el.id}
//           style={{
//             position: 'absolute',
//             left: el.position.x,
//             top: el.position.y,
//             width: el.size.width,
//             height: el.size.height,
//             border: '1px solid #ccc',
//             backgroundColor: '#fff',
//             overflow: 'auto',
//             padding: '4px',
//           }}
//         >
//           <h3 className="text-xs font-bold mb-1">{el.type.toUpperCase()}</h3>
//           {/* Minimal rendering logic */}
//           {el.type === 'chart' && (
//             <div className="text-xs">
//               <p>Chart Type: {el.content?.type}</p>
//               <pre>{JSON.stringify(el.content?.data, null, 2)}</pre>
//             </div>
//           )}
//           {el.type === 'table' && (
//             <table className="border-collapse border border-gray-300 text-xs">
//               <thead>
//                 <tr>
//                   {el.content?.headers?.map((header: string, i: number) => (
//                     <th key={i} className="border border-gray-200 bg-gray-100 px-2 py-1">
//                       {header}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {el.content?.data?.map((row: any[], rIndex: number) => (
//                   <tr key={rIndex}>
//                     {row.map((cell, cIndex) => (
//                       <td key={cIndex} className="border border-gray-200 px-2 py-1">
//                         {cell}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//           {el.type === 'text' && (
//             <div className="text-xs">
//               <h4 className="font-semibold">{el.content?.title}</h4>
//               {Array.isArray(el.content?.items) ? (
//                 <ul className="list-disc ml-4">
//                   {el.content.items.map((item: string, idx: number) => (
//                     <li key={idx}>{item}</li>
//                   ))}
//                 </ul>
//               ) : (
//                 <pre>{JSON.stringify(el.content, null, 2)}</pre>
//               )}
//             </div>
//           )}
//           {el.type === 'proposal' && (
//             <div className="text-xs whitespace-pre-wrap">
//               <h4 className="font-semibold mb-1">Proposal</h4>
//               {el.content?.text}
//             </div>
//           )}
//         </div>
//       ))}

//       {/* Show collaborator cursors */}
//       {Object.keys(cursorPositions).map(userId => {
//         const cursor = cursorPositions[userId];
//         const collaborator = collaborators.find(c => c.id === userId);
//         if (!cursor) return null;
//         return (
//           <div
//             key={userId}
//             className="absolute pointer-events-none flex items-center"
//             style={{
//               left: cursor.x + 10,
//               top: cursor.y + 10,
//             }}
//           >
//             <div className="bg-blue-600 w-2 h-2 rounded-full mr-1" />
//             <span className="text-xs bg-white px-1 py-0.5 rounded shadow">
//               {collaborator?.name || userId}
//             </span>
//           </div>
//         );
//       })}
//     </div>
//   );
// }


'use client';

import React, { useRef, useEffect } from 'react';
import { CanvasElement, Version } from '@/store/brainStore';

interface BrainCanvasProps {
  elements: CanvasElement[];
  onElementAdd: (element: CanvasElement) => void;
  onElementUpdate: (id: string, updates: Partial<CanvasElement>) => void;
  onElementRemove: (id: string) => void;
  scale: number;
  viewMode: 'edit' | 'view' | 'present';
  gridVisible: boolean;
  snapToGrid: boolean;
  onCursorUpdate: (position: { x: number; y: number }) => void;
  collaborators: any[];
  cursorPositions: Record<string, { x: number; y: number; timestamp: string }>;
  onVersionSwitch: (versionId: string) => void;
  versions: Version[];
  currentVersion: string;
}

export default function BrainCanvas({
  elements,
  onElementAdd,
  onElementUpdate,
  onElementRemove,
  scale,
  viewMode,
  gridVisible,
  snapToGrid,
  onCursorUpdate,
  collaborators,
  cursorPositions,
  onVersionSwitch,
  versions,
  currentVersion,
}: BrainCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ref = canvasRef.current;
    if (!ref) return;
    function handleMove(e: MouseEvent) {
      onCursorUpdate({ x: e.clientX, y: e.clientY });
    }
    ref.addEventListener('mousemove', handleMove);
    return () => {
      ref.removeEventListener('mousemove', handleMove);
    };
  }, [onCursorUpdate]);

  return (
    <div
      ref={canvasRef}
      className="relative w-full h-full"
      style={{
        backgroundSize: gridVisible ? '20px 20px' : 'none',
        backgroundImage: gridVisible
          ? 'linear-gradient(to right, #e3e3e3 1px, transparent 1px), linear-gradient(to bottom, #e3e3e3 1px, transparent 1px)'
          : 'none',
      }}
      aria-label="Collaborative Canvas"
    >
      <div className="absolute right-2 top-2 bg-white shadow p-2 rounded z-10">
        <label className="mr-2 text-sm font-semibold">Version:</label>
        <select
          value={currentVersion}
          onChange={(e) => onVersionSwitch(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
          aria-label="Select version to switch"
        >
          <option value="">Current</option>
          {versions.map((v) => (
            <option key={v.id} value={v.id}>
              {v.timestamp} by {v.author}
            </option>
          ))}
        </select>
      </div>

      {elements.map((el) => (
        <div
          key={el.id}
          id={el.id}
          style={{
            position: 'absolute',
            left: el.position.x,
            top: el.position.y,
            width: el.size.width,
            height: el.size.height,
            border: '1px solid #ccc',
            backgroundColor: '#fff',
            overflow: 'auto',
            padding: '4px',
          }}
        >
          <h3 className="text-xs font-bold mb-1">{el.type.toUpperCase()}</h3>
          {el.type === 'chart' && (
            <div className="text-xs">
              <p>Chart Type: {el.content?.type}</p>
              <pre>{JSON.stringify(el.content?.data, null, 2)}</pre>
            </div>
          )}
          {el.type === 'table' && (
            <table className="border-collapse border border-gray-300 text-xs">
              <thead>
                <tr>
                  {el.content?.headers?.map((hdr: string, i: number) => (
                    <th key={i} className="border border-gray-200 bg-gray-100 px-2 py-1">
                      {hdr}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {el.content?.data?.map((row: any[], rIndex: number) => (
                  <tr key={rIndex}>
                    {row.map((cell, cIndex) => (
                      <td key={cIndex} className="border border-gray-200 px-2 py-1">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {el.type === 'text' && (
            <div className="text-xs">
              <h4 className="font-semibold">{el.content?.title}</h4>
              {Array.isArray(el.content?.items) ? (
                <ul className="list-disc ml-4">
                  {el.content.items.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              ) : (
                <pre>{JSON.stringify(el.content, null, 2)}</pre>
              )}
            </div>
          )}
          {el.type === 'proposal' && (
            <div className="text-xs whitespace-pre-wrap">
              <h4 className="font-semibold mb-1">Proposal</h4>
              {el.content?.text}
            </div>
          )}
        </div>
      ))}

      {Object.keys(cursorPositions).map((userId) => {
        const cursor = cursorPositions[userId];
        const collaborator = collaborators.find(c => c.id === userId);
        if (!cursor) return null;
        return (
          <div
            key={userId}
            className="absolute pointer-events-none flex items-center"
            style={{
              left: cursor.x + 10,
              top: cursor.y + 10,
            }}
          >
            <div className="bg-blue-600 w-2 h-2 rounded-full mr-1" />
            <span className="text-xs bg-white px-1 py-0.5 rounded shadow">
              {collaborator?.name || userId}
            </span>
          </div>
        );
      })}
    </div>
  );
}
