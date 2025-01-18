// 'use client';

// import React from 'react';
// import useStore from '@/store/useStore';
// import { activeCollaboratorsSelector } from '@/store/selectors';

// export function CollaborationToolbar() {
//   const activeCollaborators = useStore(activeCollaboratorsSelector);
//   const { scale, setScale } = useStore();

//   return (
//     <div className="absolute top-4 right-4 flex items-center space-x-4 bg-white rounded-lg shadow-lg p-2">
//       {/* Collaborators */}
//       <div className="flex -space-x-2">
//         {activeCollaborators.map((user) => (
//           <div 
//             key={user.id}
//             className="relative group"
//           >
//             {user.avatar ? (
//               <img
//                 src={user.avatar}
//                 alt={user.name}
//                 className="w-8 h-8 rounded-full border-2 border-white"
//               />
//             ) : (
//               <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
//                 {user.name[0]}
//               </div>
//             )}
//             <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded">
//               {user.name}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* Zoom Controls */}
//       <div className="flex items-center space-x-2">
//         <button
//           onClick={() => setScale(scale - 0.1)}
//           className="p-1 hover:bg-gray-100 rounded"
//         >
//           -
//         </button>
//         <span className="text-sm">{Math.round(scale * 100)}%</span>
//         <button
//           onClick={() => setScale(scale + 0.1)}
//           className="p-1 hover:bg-gray-100 rounded"
//         >
//           +
//         </button>
//       </div>
//     </div>
//   );
// }


// 'use client';

// import React, { useMemo } from 'react';
// import useStore from '@/store/useStore';
// import { shallow } from 'zustand/shallow';
// import {
//   Users,
//   UserPlus,
//   Share2,
//   History,
//   Save,
//   ZoomIn,
//   ZoomOut
// } from 'lucide-react';

// export function CollaborationToolbar() {
//   const {
//     collaborators,
//     cursorPositions,
//     scale,
//     setScale,
//     addCollaborator,
//     saveWorkspace
//   } = useStore(
//     (state) => ({
//       collaborators: state.collaborators,
//       cursorPositions: state.cursorPositions,
//       scale: state.scale,
//       setScale: state.setScale,
//       addCollaborator: state.addCollaborator,
//       saveWorkspace: state.saveWorkspace
//     }),
//     shallow
//   );

//   // Active collaborators memoized calculation
//   const activeCollaborators = useMemo(() => 
//     collaborators.filter(c => 
//       cursorPositions[c.id] && 
//       Date.now() - new Date(c.cursor?.timestamp || 0).getTime() < 30000
//     ),
//     [collaborators, cursorPositions]
//   );

//   // Zoom controls with limits
//   const handleZoomIn = () => setScale(Math.min(2, scale + 0.1));
//   const handleZoomOut = () => setScale(Math.max(0.1, scale - 0.1));

//   return (
//     <div className="fixed top-4 right-4 flex items-center space-x-4">
//       {/* Collaborators Section */}
//       <div className="bg-white rounded-lg shadow-lg p-2 flex items-center space-x-4">
//         <div className="flex -space-x-2">
//           {activeCollaborators.map((user) => (
//             <div
//               key={user.id}
//               className="relative group"
//               role="listitem"
//               aria-label={`Active user: ${user.name}`}
//             >
//               {user.avatar ? (
//                 <img
//                   src={user.avatar}
//                   alt={user.name}
//                   className="w-8 h-8 rounded-full border-2 border-white"
//                 />
//               ) : (
//                 <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
//                   {user.name[0]}
//                 </div>
//               )}
//               <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded">
//                 {user.name}
//               </span>
//             </div>
//           ))}
//           <button
//             onClick={() => addCollaborator({ 
//               id: Date.now().toString(),
//               name: `User ${collaborators.length + 1}`
//             })}
//             className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
//             aria-label="Add collaborator"
//           >
//             <UserPlus size={16} />
//           </button>
//         </div>

//         {/* Tools */}
//         <div className="h-6 w-px bg-gray-200" aria-hidden="true" />
//         <div className="flex items-center space-x-2">
//           <button
//             onClick={handleZoomOut}
//             className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
//             aria-label="Zoom out"
//           >
//             <ZoomOut size={16} />
//           </button>
//           <span className="text-sm font-medium min-w-[3ch] text-center">
//             {Math.round(scale * 100)}%
//           </span>
//           <button
//             onClick={handleZoomIn}
//             className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
//             aria-label="Zoom in"
//           >
//             <ZoomIn size={16} />
//           </button>
//         </div>

//         {/* Actions */}
//         <div className="h-6 w-px bg-gray-200" aria-hidden="true" />
//         <div className="flex items-center space-x-2">
//           <button
//             onClick={saveWorkspace}
//             className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
//             aria-label="Save workspace"
//           >
//             <Save size={16} className="text-gray-600" />
//           </button>
//           <button
//             onClick={() => {/* Share functionality */}}
//             className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
//             aria-label="Share canvas"
//           >
//             <Share2 size={16} className="text-gray-600" />
//           </button>
//           <button
//             onClick={() => {/* History functionality */}}
//             className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
//             aria-label="View history"
//           >
//             <History size={16} className="text-gray-600" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }





// 'use client';

// import React, { useMemo, useCallback } from 'react';
// import { shallow } from 'zustand/shallow';
// import {
//   Users,
//   UserPlus,
//   Share2,
//   History,
//   Save,
//   ZoomIn,
//   ZoomOut
// } from 'lucide-react';

// // Import the store outside of component to prevent initialization issues
// import useStore from '@/store/useStore';

// // Stable selector function
// const storeSelector = (state: any) => ({
//   collaborators: state.collaborators || [],
//   cursorPositions: state.cursorPositions || {},
//   scale: state.scale || 1,
//   setScale: state.setScale,
//   addCollaborator: state.addCollaborator,
//   saveWorkspace: state.saveWorkspace
// });

// export const CollaborationToolbar = React.memo(() => {
//   const {
//     collaborators,
//     cursorPositions,
//     scale,
//     setScale,
//     addCollaborator,
//     saveWorkspace
//   } = useStore(storeSelector, shallow);

//   // Memoized active collaborators calculation with error handling
//   const activeCollaborators = useMemo(() => {
//     try {
//       if (!collaborators || !cursorPositions) return [];
      
//       return collaborators.filter(c => {
//         if (!c || !cursorPositions[c.id]) return false;
//         const timestamp = cursorPositions[c.id]?.timestamp;
//         if (!timestamp) return false;
        
//         return Date.now() - new Date(timestamp).getTime() < 30000;
//       });
//     } catch (error) {
//       console.error('Error calculating active collaborators:', error);
//       return [];
//     }
//   }, [collaborators, cursorPositions]);

//   // Memoized handlers
//   const handleZoomIn = useCallback(() => {
//     setScale(Math.min(2, scale + 0.1));
//   }, [scale, setScale]);

//   const handleZoomOut = useCallback(() => {
//     setScale(Math.max(0.1, scale - 0.1));
//   }, [scale, setScale]);

//   const handleAddCollaborator = useCallback(() => {
//     addCollaborator({
//       id: crypto.randomUUID(),
//       name: `User ${collaborators.length + 1}`,
//     });
//   }, [addCollaborator, collaborators.length]);

//   return (
//     <div className="fixed top-4 right-4 flex items-center space-x-4">
//       <div className="bg-white rounded-lg shadow-lg p-2 flex items-center space-x-4">
//         {/* Collaborators Section */}
//         <div className="flex -space-x-2">
//           {activeCollaborators.map((user) => (
//             <div
//               key={user.id}
//               className="relative group"
//               role="listitem"
//               aria-label={`Active user: ${user.name}`}
//             >
//               {user.avatar ? (
//                 <img
//                   src={user.avatar}
//                   alt={user.name}
//                   className="w-8 h-8 rounded-full border-2 border-white"
//                 />
//               ) : (
//                 <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
//                   {user.name[0]}
//                 </div>
//               )}
//               <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
//                 {user.name}
//               </span>
//             </div>
//           ))}
//           <button
//             onClick={handleAddCollaborator}
//             className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
//             aria-label="Add collaborator"
//           >
//             <UserPlus size={16} />
//           </button>
//         </div>

//         {/* Tools */}
//         <div className="h-6 w-px bg-gray-200" aria-hidden="true" />
//         <div className="flex items-center space-x-2">
//           <button
//             onClick={handleZoomOut}
//             className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
//             aria-label="Zoom out"
//           >
//             <ZoomOut size={16} />
//           </button>
//           <span className="text-sm font-medium min-w-[3ch] text-center">
//             {Math.round(scale * 100)}%
//           </span>
//           <button
//             onClick={handleZoomIn}
//             className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
//             aria-label="Zoom in"
//           >
//             <ZoomIn size={16} />
//           </button>
//         </div>

//         {/* Actions */}
//         <div className="h-6 w-px bg-gray-200" aria-hidden="true" />
//         <div className="flex items-center space-x-2">
//           <button
//             onClick={() => saveWorkspace()}
//             className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
//             aria-label="Save workspace"
//           >
//             <Save size={16} className="text-gray-600" />
//           </button>
//           <button
//             onClick={() => {/* Share functionality */}}
//             className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
//             aria-label="Share canvas"
//           >
//             <Share2 size={16} className="text-gray-600" />
//           </button>
//           <button
//             onClick={() => {/* History functionality */}}
//             className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
//             aria-label="View history"
//           >
//             <History size={16} className="text-gray-600" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// });

// CollaborationToolbar.displayName = 'CollaborationToolbar';




'use client';

import React, { useMemo, useCallback } from 'react';
import { shallow } from 'zustand/shallow';
import {
  Users,
  UserPlus,
  Share2,
  History,
  Save,
  Download,
  Upload,
  ZoomIn,
  ZoomOut,
  Grid,
  Monitor,
  Sun,
  Moon,
  Settings
} from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

// Import the hydrated store
import { useHydratedStore } from '@/store/useStore';
import type { Collaborator, HistoryEntry } from '@/store/useStore';

// Stable selector function
const storeSelector = (state: any) => ({
  collaborators: state.collaborators || [],
  cursorPositions: state.cursorPositions || {},
  scale: state.scale || 1,
  viewMode: state.viewMode,
  gridVisible: state.gridVisible,
  snapToGrid: state.snapToGrid,
  versions: state.versions || [],
  history: state.history || [],
  activeUsers: state.activeUsers || [],
  // Actions
  setScale: state.setScale,
  addCollaborator: state.addCollaborator,
  removeCollaborator: state.removeCollaborator,
  updateCollaborator: state.updateCollaborator,
  saveWorkspace: state.saveWorkspace,
  exportCanvas: state.exportCanvas,
  importCanvas: state.importCanvas,
  createVersion: state.createVersion,
  switchVersion: state.switchVersion
});

export const CollaborationToolbar = React.memo(() => {
  const {
    collaborators,
    cursorPositions,
    scale,
    viewMode,
    gridVisible,
    versions,
    history,
    activeUsers,
    setScale,
    addCollaborator,
    removeCollaborator,
    saveWorkspace,
    exportCanvas,
    importCanvas,
    createVersion
  } = useHydratedStore(storeSelector, shallow);

  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  // Memoized active collaborators calculation
  const activeCollaborators = useMemo(() => {
    try {
      if (!collaborators || !cursorPositions || !activeUsers) return [];
      
      return collaborators.filter(c => {
        if (!c || !cursorPositions[c.id]) return false;
        const timestamp = cursorPositions[c.id]?.timestamp;
        if (!timestamp) return false;
        
        return (
          activeUsers.includes(c.id) &&
          Date.now() - new Date(timestamp).getTime() < 30000
        );
      });
    } catch (error) {
      console.error('Error calculating active collaborators:', error);
      return [];
    }
  }, [collaborators, cursorPositions, activeUsers]);

  // Memoized handlers
  const handleZoomIn = useCallback(() => {
    setScale(Math.min(2, scale + 0.1));
  }, [scale, setScale]);

  const handleZoomOut = useCallback(() => {
    setScale(Math.max(0.1, scale - 0.1));
  }, [scale, setScale]);

  const handleAddCollaborator = useCallback(() => {
    addCollaborator({
      id: crypto.randomUUID(),
      name: `User ${collaborators.length + 1}`,
      status: 'active',
      role: 'editor'
    });
  }, [addCollaborator, collaborators.length]);

  const handleExport = useCallback(async () => {
    try {
      const blob = await exportCanvas();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `canvas-export-${new Date().toISOString()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: 'Success',
        description: 'Canvas exported successfully'
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to export canvas',
        variant: 'destructive'
      });
    }
  }, [exportCanvas, toast]);

  const handleImport = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const content = await file.text();
      const data = JSON.parse(content);
      await importCanvas(data);
      
      toast({
        title: 'Success',
        description: 'Canvas imported successfully'
      });
    } catch (error) {
      console.error('Import failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to import canvas',
        variant: 'destructive'
      });
    } finally {
      if (event.target) event.target.value = '';
    }
  }, [importCanvas, toast]);

  const handleSave = useCallback(async () => {
    try {
      await saveWorkspace();
      createVersion('current-user', 'Manual save');
      
      toast({
        title: 'Success',
        description: 'Workspace saved successfully'
      });
    } catch (error) {
      console.error('Save failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to save workspace',
        variant: 'destructive'
      });
    }
  }, [saveWorkspace, createVersion, toast]);

  return (
    <div className="fixed top-4 right-4 flex items-center space-x-4">
      <div className="bg-white rounded-lg shadow-lg p-2 flex items-center space-x-4">
        {/* Collaborators Section */}
        <div className="flex -space-x-2">
          {activeCollaborators.map((user) => (
            <Tooltip key={user.id}>
              <TooltipTrigger asChild>
                <div className="relative group">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                      {user.name[0]}
                    </div>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{user.name}</p>
                <p className="text-xs opacity-70">{user.status}</p>
              </TooltipContent>
            </Tooltip>
          ))}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleAddCollaborator}
            className="w-8 h-8 rounded-full hover:bg-gray-100"
          >
            <UserPlus className="w-4 h-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Zoom Controls */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={handleZoomOut}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium min-w-[3ch] text-center">
            {Math.round(scale * 100)}%
          </span>
          <Button variant="ghost" size="icon" onClick={handleZoomIn}>
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={handleSave}>
            <Save className="w-4 h-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => handleExport()}>
                <Download className="w-4 h-4 mr-2" />
                Export Canvas
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => document.getElementById('import-file')?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Import Canvas
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 mr-2" />
                ) : (
                  <Moon className="w-4 h-4 mr-2" />
                )}
                Toggle Theme
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Hidden file input for import */}
          <input
            id="import-file"
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
});

CollaborationToolbar.displayName = 'CollaborationToolbar';


