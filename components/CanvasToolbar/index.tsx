// 'use client';

// import React from 'react';
// import { 
//   Layout, 
//   Type, 
//   Image, 
//   LineChart, 
//   Table, 
//   Code, 
//   Share2, 
//   Save, 
//   Undo, 
//   Redo,
//   Grid,
//   ZoomIn,
//   ZoomOut
// } from 'lucide-react';

// interface ToolbarProps {
//   onAddElement: (type: string) => void;
//   onUndo: () => void;
//   onRedo: () => void;
//   onZoomIn: () => void;
//   onZoomOut: () => void;
//   onToggleGrid: () => void;
//   onSave: () => void;
//   onShare: () => void;
//   showGrid: boolean;
//   canUndo: boolean;
//   canRedo: boolean;
// }

// export default function CanvasToolbar({
//   onAddElement,
//   onUndo,
//   onRedo,
//   onZoomIn,
//   onZoomOut,
//   onToggleGrid,
//   onSave,
//   onShare,
//   showGrid,
//   canUndo,
//   canRedo
// }: ToolbarProps) {
//   const tools = [
//     { group: 'Elements', items: [
//       { icon: Type, label: 'Text', action: () => onAddElement('text') },
//       { icon: Image, label: 'Image', action: () => onAddElement('image') },
//       { icon: LineChart, label: 'Chart', action: () => onAddElement('chart') },
//       { icon: Table, label: 'Table', action: () => onAddElement('table') },
//       { icon: Code, label: 'Code', action: () => onAddElement('code') },
//     ]},
//     { group: 'View', items: [
//       { icon: ZoomIn, label: 'Zoom In', action: onZoomIn },
//       { icon: ZoomOut, label: 'Zoom Out', action: onZoomOut },
//       { icon: Grid, label: 'Toggle Grid', action: onToggleGrid, active: showGrid },
//     ]},
//     { group: 'Actions', items: [
//       { icon: Undo, label: 'Undo', action: onUndo, disabled: !canUndo },
//       { icon: Redo, label: 'Redo', action: onRedo, disabled: !canRedo },
//       { icon: Save, label: 'Save', action: onSave },
//       { icon: Share2, label: 'Share', action: onShare },
//     ]},
//   ];

//   return (
//     <div className="flex items-center gap-4 p-2 bg-white border-b">
//       {tools.map((group, groupIndex) => (
//         <div key={group.group} className="flex items-center">
//           {groupIndex > 0 && <div className="w-px h-6 bg-gray-200 mx-4" />}
//           <div className="flex items-center gap-2">
//             {group.items.map((item) => (
//               <button
//                 key={item.label}
//                 onClick={item.action}
//                 disabled={item.disabled}
//                 className={`p-2 rounded-lg hover:bg-gray-100 transition-colors
//                   ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
//                   ${item.active ? 'bg-blue-50 text-blue-600' : ''}`}
//                 title={item.label}
//               >
//                 <item.icon className="w-5 h-5" />
//               </button>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


// 'use client';

// import React from 'react';
// import { 
//   Layout, 
//   Type, 
//   Image, 
//   LineChart, 
//   Table, 
//   Code, 
//   Share2, 
//   Save, 
//   Undo, 
//   Redo,
//   Grid,
//   ZoomIn,
//   ZoomOut,
//   FileText,
//   GitBranch,
//   MessageSquare,
//   FileCode,
//   Box
// } from 'lucide-react';

// interface ToolbarProps {
//   onAddElement: (type: string) => void;
//   onUndo: () => void;
//   onRedo: () => void;
//   onZoomIn: () => void;
//   onZoomOut: () => void;
//   onToggleGrid: () => void;
//   onSave: () => void;
//   onShare: () => void;
//   showGrid: boolean;
//   canUndo: boolean;
//   canRedo: boolean;
// }

// export default function CanvasToolbar({
//   onAddElement,
//   onUndo,
//   onRedo,
//   onZoomIn,
//   onZoomOut,
//   onToggleGrid,
//   onSave,
//   onShare,
//   showGrid,
//   canUndo,
//   canRedo
// }: ToolbarProps) {
//   const tools = [
//     { group: 'Elements', items: [
//       { icon: Type, label: 'Text', action: () => onAddElement('text') },
//       { icon: Image, label: 'Image', action: () => onAddElement('image') },
//       { icon: LineChart, label: 'Chart', action: () => onAddElement('chart') },
//       { icon: Table, label: 'Table', action: () => onAddElement('table') },
//       { icon: Code, label: 'Code', action: () => onAddElement('code') },
//       { icon: Box, label: 'Diagram', action: () => onAddElement('diagram') },
//       { icon: FileCode, label: 'Mermaid', action: () => onAddElement('mermaid') },
//       { icon: MessageSquare, label: 'Meeting Transcript', action: () => onAddElement('meeting-transcript') },
//       { icon: FileText, label: 'Proposal', action: () => onAddElement('proposal') }
//     ]},
//     { group: 'View', items: [
//       { icon: ZoomIn, label: 'Zoom In', action: onZoomIn },
//       { icon: ZoomOut, label: 'Zoom Out', action: onZoomOut },
//       { icon: Grid, label: 'Toggle Grid', action: onToggleGrid, active: showGrid },
//       { icon: Layout, label: 'Layout', action: () => onAddElement('layout') }
//     ]},
//     { group: 'Version Control', items: [
//       { icon: Undo, label: 'Undo', action: onUndo, disabled: !canUndo },
//       { icon: Redo, label: 'Redo', action: onRedo, disabled: !canRedo },
//       { icon: GitBranch, label: 'Versions', action: () => onAddElement('version') }
//     ]},
//     { group: 'Actions', items: [
//       { icon: Save, label: 'Save', action: onSave },
//       { icon: Share2, label: 'Share', action: onShare }
//     ]},
//   ];

//   return (
//     <div className="flex items-center gap-4 p-2 bg-white border-b">
//       {tools.map((group, groupIndex) => (
//         <div key={group.group} className="flex items-center">
//           {groupIndex > 0 && <div className="w-px h-6 bg-gray-200 mx-4" />}
//           <div className="flex items-center gap-2">
//             <span className="text-sm text-gray-500 font-medium">{group.group}</span>
//             {group.items.map((item) => (
//               <button
//                 key={item.label}
//                 onClick={item.action}
//                 disabled={item.disabled}
//                 className={`p-2 rounded-lg hover:bg-gray-100 transition-colors
//                   ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
//                   ${item.active ? 'bg-blue-50 text-blue-600' : ''}`}
//                 title={item.label}
//               >
//                 <item.icon className="w-5 h-5" />
//               </button>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


'use client';

import React from 'react';
import { 
  Layout, 
  Type, 
  Image, 
  LineChart, 
  Table, 
  Code, 
  Share2, 
  Save, 
  Undo, 
  Redo,
  Grid,
  ZoomIn,
  ZoomOut,
  FileText,
  GitBranch,
  MessageSquare,
  FileCode,
  Box,
  Users,
  History,
  Filter,
  Search
} from 'lucide-react';

interface ToolbarProps {
  onAddElement: (type: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onToggleGrid: () => void;
  onSave: () => void;
  onShare: () => void;
  showGrid: boolean;
  canUndo: boolean;
  canRedo: boolean;
}

export default function CanvasToolbar({
  onAddElement,
  onUndo,
  onRedo,
  onZoomIn,
  onZoomOut,
  onToggleGrid,
  onSave,
  onShare,
  showGrid,
  canUndo,
  canRedo
}: ToolbarProps) {
  const tools = [
    { group: 'Content', items: [
      { icon: Type, label: 'Text', action: () => onAddElement('text') },
      { icon: Code, label: 'Code Block', action: () => onAddElement('code') },
      { icon: LineChart, label: 'Chart', action: () => onAddElement('chart') },
      { icon: FileCode, label: 'Mermaid', action: () => onAddElement('mermaid') },
      { icon: Table, label: 'Table', action: () => onAddElement('table') },
      { icon: Box, label: 'Diagram', action: () => onAddElement('diagram') }
    ]},
    { group: 'Research', items: [
      { icon: MessageSquare, label: 'Meeting Transcript', action: () => onAddElement('meeting-transcript') },
      { icon: FileText, label: 'Proposal', action: () => onAddElement('proposal') },
      { icon: Search, label: 'Research', action: () => onAddElement('research') }
    ]},
    { group: 'View', items: [
      { icon: ZoomIn, label: 'Zoom In', action: onZoomIn },
      { icon: ZoomOut, label: 'Zoom Out', action: onZoomOut },
      { icon: Grid, label: 'Toggle Grid', action: onToggleGrid, active: showGrid },
      { icon: Layout, label: 'Layout', action: () => onAddElement('layout') }
    ]},
    { group: 'Collaboration', items: [
      { icon: Users, label: 'Collaborators', action: () => onAddElement('collaborators') },
      { icon: Share2, label: 'Share', action: onShare },
      { icon: Filter, label: 'Filter', action: () => onAddElement('filter') }
    ]},
    { group: 'History', items: [
      { icon: Undo, label: 'Undo', action: onUndo, disabled: !canUndo },
      { icon: Redo, label: 'Redo', action: onRedo, disabled: !canRedo },
      { icon: History, label: 'History', action: () => onAddElement('history') },
      { icon: GitBranch, label: 'Versions', action: () => onAddElement('version') }
    ]},
    { group: 'Save', items: [
      { icon: Save, label: 'Save', action: onSave }
    ]}
  ];

  return (
    <div className="flex items-center gap-4 p-2 bg-white border-b">
      {tools.map((group, groupIndex) => (
        <div key={group.group} className="flex items-center">
          {groupIndex > 0 && <div className="w-px h-6 bg-gray-200 mx-4" />}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 font-medium">{group.group}</span>
            {group.items.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                disabled={item.disabled}
                className={`p-2 rounded-lg hover:bg-gray-100 transition-colors
                  ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                  ${item.active ? 'bg-blue-50 text-blue-600' : ''}`}
                title={item.label}
              >
                <item.icon className="w-5 h-5" />
                <span className="sr-only">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}