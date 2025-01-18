'use client';

import useStore from '@/store/useStore';

class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private maxRetries = 5;
  private retryCount = 0;

  connect(url: string = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001') {
    if (this.ws?.readyState === WebSocket.OPEN) return;

    this.ws = new WebSocket(url);

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleMessage(data);
    };

    this.ws.onclose = () => {
      if (this.retryCount < this.maxRetries) {
        this.reconnect(url);
      }
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  private handleMessage(data: any) {
    const store = useStore.getState();

    switch (data.type) {
      case 'CURSOR_UPDATE':
        store.updateCursorPosition(data.userId, data.position);
        break;
      
      case 'ELEMENT_UPDATE':
        store.updateElement(data.elementId, data.updates);
        break;
      
      case 'ELEMENT_ADD':
        store.addElement(data.element);
        break;
      
      case 'ELEMENT_REMOVE':
        store.removeElement(data.elementId);
        break;

      case 'COLLABORATOR_JOIN':
        store.updateCollaborator(data.user);
        break;
      
      case 'COLLABORATOR_LEAVE':
        store.removeCollaborator(data.userId);
        break;
    }
  }

  sendMessage(type: string, payload: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }));
    }
  }

  private reconnect(url: string) {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }

    this.reconnectTimeout = setTimeout(() => {
      this.retryCount++;
      this.connect(url);
    }, 2000 * Math.pow(2, this.retryCount));
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
  }
}

export const wsService = new WebSocketService();