import useStore from '@/store/useStore';
import type { WebSocketMessage } from './websocket';

export const messageHandlers = {
  CURSOR_UPDATE: (data: any) => {
    const store = useStore.getState();
    store.updateCursorPosition(data.userId, data.position);
  },

  ELEMENT_UPDATE: (data: any) => {
    const store = useStore.getState();
    store.updateElement(data.elementId, data.updates);
  },

  ELEMENT_ADD: (data: any) => {
    const store = useStore.getState();
    store.addElement(data.element);
  },

  ELEMENT_REMOVE: (data: any) => {
    const store = useStore.getState();
    store.removeElement(data.elementId);
  },

  COLLABORATOR_JOIN: (data: any) => {
    const store = useStore.getState();
    store.updateCollaborator(data.user);
  },

  COLLABORATOR_LEAVE: (data: any) => {
    const store = useStore.getState();
    store.removeCollaborator(data.userId);
  },

  CONNECTION_UPDATE: (data: any) => {
    const store = useStore.getState();
    store.updateConnection(data.connectionId, data.updates);
  },
};

export function handleWebSocketMessage(message: WebSocketMessage) {
  const handler = messageHandlers[message.type];
  if (handler) {
    handler(message.payload);
  }
}