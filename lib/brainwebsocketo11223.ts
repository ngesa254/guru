// // // // /home/user/Guru-AI/lib/brainwebsocket.ts
// // // class MockWebSocketService {
// // //     private ws: WebSocket | null = null;
  
// // //     connect(): WebSocket {
// // //       // In real usage, connect to a real wss:// endpoint
// // //       // For now, mock
// // //       this.ws = new WebSocket('wss://example.com/mock-brain-collab');
// // //       return this.ws;
// // //     }
  
// // //     disconnect() {
// // //       if (this.ws) {
// // //         this.ws.close();
// // //         this.ws = null;
// // //       }
// // //     }
  
// // //     sendMessage(type: string, payload: any) {
// // //       if (!this.ws) return;
// // //       const msg = JSON.stringify({ type, ...payload });
// // //       this.ws.send(msg);
// // //     }
// // //   }
  
// // //   export const wsService = new MockWebSocketService();
  



// // // /home/user/Guru-AI/lib/brainwebsocket.ts
// // class MockWebSocketService {
// //     private ws: WebSocket | null = null;
  
// //     connect(): WebSocket {
// //       // In real usage, you'd connect to a real server, e.g. wss://yourdomain/collaboration
// //       this.ws = new WebSocket('wss://example.com/brain-collaboration');
// //       return this.ws;
// //     }
  
// //     disconnect() {
// //       if (this.ws) {
// //         this.ws.close();
// //         this.ws = null;
// //       }
// //     }
  
// //     sendMessage(type: string, payload: any) {
// //       if (!this.ws) return;
// //       const message = JSON.stringify({ type, ...payload });
// //       this.ws.send(message);
// //     }
// //   }
  
// //   export const wsService = new MockWebSocketService();
  


// class MockWebSocketService {
//     private ws: WebSocket | null = null;
  
//     connect(): WebSocket {
//       // In a real scenario, connect to e.g. wss://yourdomain.com/collaboration
//       this.ws = new WebSocket('wss://example.com/brain-collaboration');
//       return this.ws;
//     }
  
//     disconnect() {
//       if (this.ws) {
//         this.ws.close();
//         this.ws = null;
//       }
//     }
  
//     sendMessage(type: string, payload: any) {
//       if (!this.ws) return;
//       const msg = JSON.stringify({ type, ...payload });
//       this.ws.send(msg);
//     }
//   }
  
//   export const wsService = new MockWebSocketService();
  


class MockWebSocketService {
    private ws: WebSocket | null = null;
  
    connect(): WebSocket {
      // In production, connect to a real wss:// URL
      this.ws = new WebSocket('wss://example.com/mock-collaboration');
      return this.ws;
    }
  
    disconnect() {
      if (this.ws) {
        this.ws.close();
        this.ws = null;
      }
    }
  
    sendMessage(type: string, payload: any) {
      if (!this.ws) return;
      const message = JSON.stringify({ type, ...payload });
      this.ws.send(message);
    }
  }
  
  export const wsService = new MockWebSocketService();
  