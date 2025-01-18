
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useBrainStore } from '@/store/brainStore';
import { wsService } from '@/lib/brainwebsocket';
import { Button } from '@/components/ui/brainButton';
import { useToast } from '@/components/ui/brainuseToast';

const Split = dynamic(
  () => import('@geoffcox/react-splitter').then(mod => mod.Split),
  { ssr: false }
);

const BrainCanvas = dynamic(
  () => import('@/components/Canvas/brainCanvas').then(mod => mod.default),
  { ssr: false }
);
const BrainChat = dynamic(
  () => import('@/components/Chat/brainChat').then(mod => mod.default),
  { ssr: false }
);

export default function BrainPage() {
  const store = useBrainStore();
  const { toast } = useToast();

  // Track active tab for queries
  const [activeTab, setActiveTab] = useState<'web' | 'work'>('web');

  // Connect to mock WebSocket
  useEffect(() => {
    const ws = wsService.connect();

    ws.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case 'ELEMENT_ADD':
          store.addCanvasElement(data.element);
          break;
        case 'ELEMENT_UPDATE':
          store.updateCanvasElement(data.elementId, data.updates);
          break;
        case 'CURSOR_UPDATE':
          store.updateCursorPosition(data.userId, data.position);
          break;
        case 'COLLABORATOR_UPDATE':
          store.addCollaborator(data.collaborator);
          break;
        case 'COLLABORATOR_LEAVE':
          store.removeCollaborator(data.userId);
          break;
        default:
          break;
      }
    };

    ws.onerror = () => {
      toast({
        title: 'Connection Error',
        description: 'Lost connection to the collaboration server',
        variant: 'destructive',
      });
    };

    return () => {
      wsService.disconnect();
    };
  }, [store, toast]);

  // Switch tabs
  const handleTabSwitch = (tab: 'web' | 'work') => {
    setActiveTab(tab);
  };

  // Chat query => call either /api/web or /api/work
  const handleQuery = useCallback(
    async (query: string) => {
      store.setLoading(true);
      try {
        const endpoint = activeTab === 'web' ? '/api/web' : '/api/work';
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query }),
        });
        if (!res.ok) throw new Error(`${activeTab.toUpperCase()} query failed`);
        const data = await res.json();

        // Add an AI chat message
        store.addMessage({
          id: crypto.randomUUID(),
          content: JSON.stringify(data, null, 2),
          type: 'ai',
          timestamp: new Date(),
        });

        // Visualize data on the canvas
        if (data.daily_passengers || data.ev_parking_spaces) {
          store.addCanvasElement({
            id: crypto.randomUUID(),
            type: 'chart',
            content: {
              data: [
                { name: 'Daily Passengers', value: data.daily_passengers },
                { name: 'EV Spaces', value: data.ev_parking_spaces },
              ],
              type: 'bar',
            },
            position: { x: 80, y: 100 },
            size: { width: 400, height: 250 },
            metadata: {
              source: data.sources?.[0]?.url,
              confidence: data.confidence,
              timestamp: new Date().toISOString(),
            },
          });
        }

        if (data.competitors?.length > 0) {
          store.addCanvasElement({
            id: crypto.randomUUID(),
            type: 'table',
            content: {
              headers: ['Company', 'Stations', 'Locations'],
              data: data.competitors.map((comp: any) => [
                comp.name,
                comp.stations,
                comp.locations.join(', '),
              ]),
            },
            position: { x: 80, y: 380 },
            size: { width: 600, height: 200 },
          });
        }

        if (data.projectMilestones) {
          store.addCanvasElement({
            id: crypto.randomUUID(),
            type: 'table',
            content: {
              headers: ['Milestone', 'Workback Schedule', 'Owner'],
              data: data.projectMilestones.map((m: any) => [
                m.milestone,
                m.workbackSchedule,
                m.owner,
              ]),
            },
            position: { x: 80, y: 600 },
            size: { width: 500, height: 200 },
            metadata: {
              source: 'Internal Work Data',
              timestamp: new Date().toISOString(),
            },
          });
        }

        if (data.requirements?.length > 0) {
          store.addCanvasElement({
            id: crypto.randomUUID(),
            type: 'text',
            content: {
              title: 'Requirements',
              items: data.requirements,
            },
            position: { x: 700, y: 100 },
            size: { width: 300, height: 180 },
          });
        }
      } catch (err: any) {
        store.setError(err.message || 'Query failed');
      } finally {
        store.setLoading(false);
      }
    },
    [activeTab, store]
  );

  // Generate proposal
  const handleProposalRequest = useCallback(
    async (requirements: string[]) => {
      store.setLoading(true);
      try {
        const response = await fetch('/api/generate_proposal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ requirements }),
        });
        if (!response.ok) throw new Error('Proposal generation failed');
        const data = await response.json();

        store.addCanvasElement({
          id: crypto.randomUUID(),
          type: 'proposal',
          content: {
            text: data.generated_proposal,
          },
          position: { x: 200, y: 850 },
          size: { width: 600, height: 250 },
          metadata: {
            author: data.metadata.author,
            version: data.metadata.version,
            timestamp: new Date().toISOString(),
          },
        });

        // Also show in chat
        store.addMessage({
          id: crypto.randomUUID(),
          content: `Proposal generated:\n${data.generated_proposal}`,
          type: 'ai',
          timestamp: new Date(),
        });

        store.setProposalData(data);
      } catch (err: any) {
        store.setError(err.message || 'Proposal generation error');
      } finally {
        store.setLoading(false);
      }
    },
    [store]
  );

  // Versioning
  const handleVersionCreate = useCallback(() => {
    store.createVersion('current-user', 'Manual Save');
    toast({
      title: 'Version Created',
      description: 'Canvas state has been saved.',
    });
  }, [store, toast]);

  const handleVersionSwitch = useCallback(
    (versionId: string) => {
      store.switchVersion(versionId);
      toast({
        title: 'Version Switched',
        description: 'Canvas state has been restored.',
      });
    },
    [store, toast]
  );

  // Cursor
  const handleCursorUpdate = useCallback((pos: { x: number; y: number }) => {
    wsService.sendMessage('CURSOR_UPDATE', { position: pos });
  }, []);

  return (
    // <div className="h-screen w-full flex flex-col">
    <div className="h-screen w-full flex flex-col bg-white">
      {/* Top bar: tab switching + version save */}
      <div className="border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'web' ? 'default' : 'outline'}
            onClick={() => handleTabSwitch('web')}
          >
            WEB
          </Button>
          <Button
            variant={activeTab === 'work' ? 'default' : 'outline'}
            onClick={() => handleTabSwitch('work')}
          >
            WORK
          </Button>
        </div>
        <Button onClick={handleVersionCreate}>Save Version</Button>
      </div>

      {/* Main area: Chat (left), Canvas (right) */}
      <div className="flex-1 overflow-hidden">
        <Split
          initialPrimarySize="30%"
          minPrimarySize="20%"
          minSecondarySize="40%"
          className="h-full"
        >
          {/* Chat */}
          <div className="h-full overflow-hidden border-r border-gray-200">
            <BrainChat
              messages={store.messages}
              onSendMessage={handleQuery}
              isLoading={store.isLoading}
              collaborators={store.collaborators}
              onProposalRequest={handleProposalRequest}
            />
          </div>

          {/* Canvas */}
          <div className="h-full overflow-hidden bg-gray-50 relative">
            <BrainCanvas
              elements={store.canvasElements}
              onElementAdd={(el) => {
                store.addCanvasElement(el);
                store.updateSearchIndex(el);
              }}
              onElementUpdate={(id, updates) => {
                store.updateCanvasElement(id, updates);
                const updatedEl = store.canvasElements.find(e => e.id === id);
                if (updatedEl) {
                  store.updateSearchIndex(updatedEl);
                }
              }}
              onElementRemove={store.removeCanvasElement}
              scale={store.scale}
              viewMode={store.viewMode}
              gridVisible={store.gridVisible}
              snapToGrid={store.snapToGrid}
              onCursorUpdate={handleCursorUpdate}
              collaborators={store.collaborators}
              cursorPositions={store.cursors}
              onVersionSwitch={handleVersionSwitch}
              versions={store.versions}
              currentVersion={store.currentVersion}
            />
          </div>
        </Split>
      </div>

      {/* Error display */}
      {store.error && (
        <div
          role="alert"
          aria-live="assertive"
          className="absolute bottom-4 right-4 bg-red-50 p-4 rounded-lg shadow-lg"
        >
          <h3 className="text-red-800 font-medium">Error</h3>
          <p className="text-red-600">{store.error}</p>
          <button
            onClick={() => store.setError(null)}
            className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
            aria-label="Dismiss error"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}