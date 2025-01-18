// // /* /home/user/Guru-AI/app/geminiIntegration/multimodal-live-client.ts */
// // "use client";

// // import { EventEmitter } from "eventemitter3";
// // import { blobToJSON, base64ToArrayBuffer } from "./utils";
// // import {
// //   Content,
// //   Part,
// //   LiveConfig,
// //   LiveIncomingMessage,
// //   SetupMessage,
// //   ClientContentMessage,
// //   RealtimeInputMessage,
// //   ToolResponseMessage,
// //   ServerContentMessage,
// //   isToolCallMessage,
// //   isToolCallCancellationMessage,
// //   isServerContentMessage,
// //   isSetupCompleteMessage,
// //   isInterrupted,
// //   isTurnComplete,
// //   isModelTurn,
// //   ToolCall,
// //   ToolCallCancellation,
// //   ServerContent,
// //   StreamingLog,
// // } from "./multimodal-live-types";

// // export interface MultimodalLiveAPIClientConnection {
// //   url?: string;
// //   apiKey: string;
// // }

// // interface MultimodalLiveClientEventTypes {
// //   open: () => void;
// //   close: (event: CloseEvent) => void;
// //   content: (data: ServerContent) => void;
// //   audio: (data: ArrayBuffer) => void;
// //   interrupted: () => void;
// //   turncomplete: () => void;
// //   toolcall: (toolCall: ToolCall) => void;
// //   toolcallcancellation: (cancel: ToolCallCancellation) => void;
// // }

// // export class MultimodalLiveClient extends EventEmitter<MultimodalLiveClientEventTypes> {
// //   public ws: WebSocket | null = null;
// //   protected config: LiveConfig | null = null;
// //   public url: string = "";
// //   constructor({ url, apiKey }: MultimodalLiveAPIClientConnection) {
// //     super();
// //     url =
// //       url ||
// //       `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${apiKey}`;
// //     this.url = url;
// //   }

// //   async connect(config: LiveConfig) {
// //     this.config = config;
// //     const ws = new WebSocket(this.url);

// //     return new Promise<void>((resolve, reject) => {
// //       const onError = (ev: Event) => {
// //         this.disconnect(ws);
// //         reject(new Error(`Could not connect to "${this.url}"`));
// //       };

// //       ws.addEventListener("error", onError);
// //       ws.addEventListener("open", () => {
// //         this.ws = ws;
// //         ws.removeEventListener("error", onError);
// //         this.emit("open");
// //         this._sendDirect(<SetupMessage>{ setup: config });
// //         resolve();
// //       });

// //       ws.addEventListener("message", (evt: MessageEvent) => {
// //         if (evt.data instanceof Blob) {
// //           this.receive(evt.data);
// //         } else {
// //           console.warn("Non-blob message", evt);
// //         }
// //       });

// //       ws.addEventListener("close", (ev: CloseEvent) => {
// //         this.disconnect(ws);
// //         this.emit("close", ev);
// //       });
// //     });
// //   }

// //   disconnect(ws?: WebSocket) {
// //     if ((!ws || this.ws === ws) && this.ws) {
// //       this.ws.close();
// //       this.ws = null;
// //     }
// //   }

// //   private async receive(blob: Blob) {
// //     const response: LiveIncomingMessage = (await blobToJSON(blob)) as LiveIncomingMessage;

// //     // toolcall
// //     if (isToolCallMessage(response)) {
// //       this.emit("toolcall", response.toolCall);
// //       return;
// //     }
// //     // toolcallcancellation
// //     if (isToolCallCancellationMessage(response)) {
// //       this.emit("toolcallcancellation", response.toolCallCancellation);
// //       return;
// //     }
// //     // setupComplete
// //     if (isSetupCompleteMessage(response)) {
// //       // optional
// //       return;
// //     }
// //     // content
// //     if (isServerContentMessage(response)) {
// //       const { serverContent } = response;
// //       if (isInterrupted(serverContent)) {
// //         this.emit("interrupted");
// //         return;
// //       }
// //       if (isTurnComplete(serverContent)) {
// //         this.emit("turncomplete");
// //       }
// //       if (isModelTurn(serverContent)) {
// //         // check for audio
// //         const audioParts = serverContent.modelTurn.parts.filter(
// //           (p) => p.inlineData && p.inlineData.mimeType.startsWith("audio/pcm"),
// //         );
// //         audioParts.forEach((part) => {
// //           if (part.inlineData?.data) {
// //             const arrBuf = base64ToArrayBuffer(part.inlineData.data);
// //             this.emit("audio", arrBuf);
// //           }
// //         });
// //         this.emit("content", serverContent);
// //       }
// //     }
// //   }

// //   // sending messages
// //   private _sendDirect(payload: object) {
// //     if (!this.ws) {
// //       throw new Error("WebSocket is not connected");
// //     }
// //     this.ws.send(JSON.stringify(payload));
// //   }

// //   /** user text, typical chat request. */
// //   send(parts: Part[], turnComplete = true) {
// //     const clientContent: ClientContentMessage = {
// //       clientContent: {
// //         turns: [{ role: "user", parts }],
// //         turnComplete,
// //       },
// //     };
// //     this._sendDirect(clientContent);
// //   }

// //   /** audio or image frames in real time */
// //   sendRealtimeInput(chunks: RealtimeInputMessage["realtimeInput"]["mediaChunks"]) {
// //     const data: RealtimeInputMessage = {
// //       realtimeInput: { mediaChunks: chunks },
// //     };
// //     this._sendDirect(data);
// //   }

// //   /** respond to a function call from the model */
// //   sendToolResponse(toolResponse: ToolResponseMessage["toolResponse"]) {
// //     const msg: ToolResponseMessage = { toolResponse };
// //     this._sendDirect(msg);
// //   }
// // }



// /* /home/user/Guru-AI/app/geminiIntegration/multimodal-live-client.ts */
// /**
//  * Low-level, WebSocket-based streaming client for the Multimodal Live API.
//  * This is mostly copied from the "multimodal-live-api-web-console" sample code.
//  */

// "use client";

// import { EventEmitter } from "eventemitter3";
// import { blobToJSON, base64ToArrayBuffer } from "./utils";
// import {
//   MultimodalLiveAPIClientConnection,
//   LiveConfig,
//   SetupMessage,
//   ClientContentMessage,
//   RealtimeInputMessage,
//   ToolResponseMessage,
//   ServerContentMessage,
//   LiveIncomingMessage,
//   isToolCallMessage,
//   isToolCallCancellationMessage,
//   isSetupCompleteMessage,
//   isServerContentMessage,
//   isInterrupted,
//   isTurnComplete,
//   isModelTurn,
//   ServerContent,
//   ToolCall,
//   ToolCallCancellation,
//   Part,
// } from "./multimodal-live-types";

// interface MultimodalLiveClientEventTypes {
//   open: () => void;
//   close: (ev: CloseEvent) => void;
//   content: (data: ServerContent) => void;
//   audio: (data: ArrayBuffer) => void;
//   interrupted: () => void;
//   turncomplete: () => void;
//   toolcall: (toolCall: ToolCall) => void;
//   toolcallcancellation: (cancel: ToolCallCancellation) => void;
// }

// export class MultimodalLiveClient extends EventEmitter<MultimodalLiveClientEventTypes> {
//   public ws: WebSocket | null = null;
//   protected config: LiveConfig | null = null;
//   public url: string = "";

//   constructor({ url, apiKey }: MultimodalLiveAPIClientConnection) {
//     super();
//     // default URL if none provided:
//     url =
//       url ||
//       `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${apiKey}`;
//     this.url = url;
//   }

//   connect(config: LiveConfig): Promise<void> {
//     this.config = config;
//     const ws = new WebSocket(this.url);

//     return new Promise<void>((resolve, reject) => {
//       const onError = (ev: Event) => {
//         this.disconnect(ws);
//         reject(new Error("Could not connect to " + this.url));
//       };

//       ws.addEventListener("error", onError);
//       ws.addEventListener("open", () => {
//         this.ws = ws;
//         ws.removeEventListener("error", onError);
//         this.emit("open");
//         // send initial setup message
//         const setupMsg: SetupMessage = { setup: config };
//         this._sendDirect(setupMsg);
//         resolve();
//       });

//       ws.addEventListener("message", (evt) => {
//         if (evt.data instanceof Blob) this.receive(evt.data);
//         else console.log("Non-blob message from server:", evt.data);
//       });

//       ws.addEventListener("close", (ev: CloseEvent) => {
//         this.disconnect(ws);
//         this.emit("close", ev);
//       });
//     });
//   }

//   disconnect(ws?: WebSocket) {
//     if ((!ws || this.ws === ws) && this.ws) {
//       this.ws.close();
//       this.ws = null;
//     }
//   }

//   private async receive(blob: Blob) {
//     const response = (await blobToJSON(blob)) as LiveIncomingMessage;

//     if (isToolCallMessage(response)) {
//       this.emit("toolcall", response.toolCall);
//       return;
//     }
//     if (isToolCallCancellationMessage(response)) {
//       this.emit("toolcallcancellation", response.toolCallCancellation);
//       return;
//     }
//     if (isSetupCompleteMessage(response)) {
//       // optional: "setupComplete" event if needed
//       return;
//     }
//     if (isServerContentMessage(response)) {
//       const { serverContent } = response;
//       if (isInterrupted(serverContent)) {
//         this.emit("interrupted");
//         return;
//       }
//       if (isTurnComplete(serverContent)) {
//         this.emit("turncomplete");
//       }
//       if (isModelTurn(serverContent)) {
//         // check if there's inline audio
//         const audioParts = serverContent.modelTurn.parts.filter(
//           (p) => p.inlineData && p.inlineData.mimeType.startsWith("audio/pcm"),
//         );
//         audioParts.forEach((part) => {
//           if (part.inlineData?.data) {
//             const arrBuf = base64ToArrayBuffer(part.inlineData.data);
//             this.emit("audio", arrBuf);
//           }
//         });
//         this.emit("content", serverContent);
//       }
//     }
//   }

//   // sending messages
//   private _sendDirect(msg: object) {
//     if (!this.ws) throw new Error("WebSocket is not connected");
//     this.ws.send(JSON.stringify(msg));
//   }

//   /** For normal user text content. */
//   send(parts: Part[], turnComplete = true) {
//     const clientContent: ClientContentMessage = {
//       clientContent: { turns: [{ role: "user", parts }], turnComplete },
//     };
//     this._sendDirect(clientContent);
//   }

//   /** For streaming audio/video frames. */
//   sendRealtimeInput(chunks: RealtimeInputMessage["realtimeInput"]["mediaChunks"]) {
//     const data: RealtimeInputMessage = { realtimeInput: { mediaChunks: chunks } };
//     this._sendDirect(data);
//   }

//   /** For responding to model's function/tool calls. */
//   sendToolResponse(toolResponse: ToolResponseMessage["toolResponse"]) {
//     const msg: ToolResponseMessage = { toolResponse };
//     this._sendDirect(msg);
//   }
// }


// /* /home/user/Guru-AI/app/geminiIntegration/multimodal-live-client.ts */
// "use client";

// import { EventEmitter } from "eventemitter3";
// import {
//   isToolCallMessage,
//   isToolCallCancellationMessage,
//   isSetupCompleteMessage,
//   isServerContentMessage,
//   isInterrupted,
//   isTurnComplete,
//   isModelTurn,
//   LiveIncomingMessage,
//   MultimodalLiveAPIClientConnection,
//   LiveConfig,
//   SetupMessage,
//   ClientContentMessage,
//   RealtimeInputMessage,
//   ToolResponseMessage,
//   ServerContent,
//   ToolCall,
//   ToolCallCancellation,
// } from "./multimodal-live-types";
// import { blobToJSON, base64ToArrayBuffer } from "@/lib/utils";

// interface MultimodalLiveClientEventTypes {
//   open: () => void;
//   close: (ev: CloseEvent) => void;
//   content: (serverContent: ServerContent) => void;
//   audio: (data: ArrayBuffer) => void;
//   interrupted: () => void;
//   turncomplete: () => void;
//   toolcall: (tc: ToolCall) => void;
//   toolcallcancellation: (cc: ToolCallCancellation) => void;
// }

// export class MultimodalLiveClient extends EventEmitter<MultimodalLiveClientEventTypes> {
//   public ws: WebSocket | null = null;
//   protected config: LiveConfig | null = null;
//   public url: string = "";

//   constructor({ url, apiKey }: MultimodalLiveAPIClientConnection) {
//     super();
//     this.url =
//       url ||
//       `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${apiKey}`;
//   }

//   async connect(config: LiveConfig): Promise<void> {
//     this.config = config;
//     const ws = new WebSocket(this.url);

//     return new Promise<void>((resolve, reject) => {
//       const onError = () => {
//         this.disconnect(ws);
//         reject(new Error("Could not connect to " + this.url));
//       };

//       ws.addEventListener("error", onError);
//       ws.addEventListener("open", () => {
//         this.ws = ws;
//         ws.removeEventListener("error", onError);
//         this.emit("open");
//         const setup: SetupMessage = { setup: config };
//         this._sendJSON(setup);
//         resolve();
//       });

//       ws.addEventListener("message", async (evt) => {
//         if (evt.data instanceof Blob) {
//           const msg = (await blobToJSON(evt.data)) as LiveIncomingMessage;
//           this.handleIncoming(msg);
//         } else {
//           console.log("Got non-blob data", evt.data);
//         }
//       });

//       ws.addEventListener("close", (ev: CloseEvent) => {
//         this.disconnect(ws);
//         this.emit("close", ev);
//       });
//     });
//   }

//   disconnect(ws?: WebSocket) {
//     if ((!ws || this.ws === ws) && this.ws) {
//       this.ws.close();
//       this.ws = null;
//     }
//   }

//   private handleIncoming(msg: LiveIncomingMessage) {
//     if (isToolCallMessage(msg)) {
//       this.emit("toolcall", msg.toolCall);
//       return;
//     }
//     if (isToolCallCancellationMessage(msg)) {
//       this.emit("toolcallcancellation", msg.toolCallCancellation);
//       return;
//     }
//     if (isSetupCompleteMessage(msg)) {
//       // optional
//       return;
//     }
//     if (isServerContentMessage(msg)) {
//       const { serverContent } = msg;
//       if (isInterrupted(serverContent)) {
//         this.emit("interrupted");
//       }
//       if (isTurnComplete(serverContent)) {
//         this.emit("turncomplete");
//       }
//       if (isModelTurn(serverContent)) {
//         // handle partial audio 
//         const audioParts = serverContent.modelTurn.parts.filter(
//           (p) => p.inlineData && p.inlineData.mimeType.startsWith("audio/pcm")
//         );
//         audioParts.forEach((p) => {
//           if (p.inlineData?.data) {
//             const buf = base64ToArrayBuffer(p.inlineData.data);
//             this.emit("audio", buf);
//           }
//         });
//         this.emit("content", serverContent);
//       }
//     }
//   }

//   private _sendJSON(data: object) {
//     if (!this.ws) throw new Error("WebSocket is not open");
//     this.ws.send(JSON.stringify(data));
//   }

//   send(parts: ClientContentMessage["clientContent"]["turns"][0]["parts"]) {
//     const payload: ClientContentMessage = {
//       clientContent: {
//         turns: [{ role: "user", parts }],
//         turnComplete: true,
//       },
//     };
//     this._sendJSON(payload);
//   }

//   sendRealtimeInput(chunks: RealtimeInputMessage["realtimeInput"]["mediaChunks"]) {
//     const payload: RealtimeInputMessage = { realtimeInput: { mediaChunks: chunks } };
//     this._sendJSON(payload);
//   }

//   sendToolResponse(toolResponse: ToolResponseMessage["toolResponse"]) {
//     const payload: ToolResponseMessage = { toolResponse };
//     this._sendJSON(payload);
//   }
// }




// /* /home/user/Guru-AI/app/geminiIntegration/multimodal-live-client.ts */
// /**
//  * The low-level streaming client that handles WebSocket events 
//  * for Gemini 2.0. We add a guard in `_sendJSON()`.
//  */

// "use client";

// import { EventEmitter } from "eventemitter3";
// import {
//   isToolCallMessage,
//   isToolCallCancellationMessage,
//   isSetupCompleteMessage,
//   isServerContentMessage,
//   isInterrupted,
//   isTurnComplete,
//   isModelTurn,
//   LiveIncomingMessage,
//   MultimodalLiveAPIClientConnection,
//   LiveConfig,
//   SetupMessage,
//   ClientContentMessage,
//   RealtimeInputMessage,
//   ToolResponseMessage,
//   ServerContent,
//   ToolCall,
//   ToolCallCancellation,
// } from "./multimodal-live-types";
// import { blobToJSON, base64ToArrayBuffer } from "@/lib/utils";

// interface MultimodalLiveClientEventTypes {
//   open: () => void;
//   close: (ev: CloseEvent) => void;
//   content: (serverContent: ServerContent) => void;
//   audio: (data: ArrayBuffer) => void;
//   interrupted: () => void;
//   turncomplete: () => void;
//   toolcall: (tc: ToolCall) => void;
//   toolcallcancellation: (cc: ToolCallCancellation) => void;
// }

// export class MultimodalLiveClient extends EventEmitter<MultimodalLiveClientEventTypes> {
//   public ws: WebSocket | null = null;
//   protected config: LiveConfig | null = null;
//   public url: string = "";

//   constructor({ url, apiKey }: MultimodalLiveAPIClientConnection) {
//     super();
//     this.url =
//       url ||
//       `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${apiKey}`;
//   }

//   async connect(config: LiveConfig): Promise<void> {
//     this.config = config;
//     const ws = new WebSocket(this.url);

//     return new Promise<void>((resolve, reject) => {
//       const onError = () => {
//         this.disconnect(ws);
//         reject(new Error(`Could not connect to ${this.url}`));
//       };

//       ws.addEventListener("error", onError);
//       ws.addEventListener("open", () => {
//         this.ws = ws;
//         ws.removeEventListener("error", onError);
//         this.emit("open");
//         // send the setup message
//         const setup: SetupMessage = { setup: config };
//         this._sendJSON(setup);
//         resolve(); 
//       });

//       ws.addEventListener("message", async (evt) => {
//         if (evt.data instanceof Blob) {
//           const msg = (await blobToJSON(evt.data)) as LiveIncomingMessage;
//           this.handleIncoming(msg);
//         } else {
//           console.log("Received non-blob data", evt.data);
//         }
//       });

//       ws.addEventListener("close", (ev: CloseEvent) => {
//         this.disconnect(ws);
//         this.emit("close", ev);
//       });
//     });
//   }

//   disconnect(ws?: WebSocket) {
//     if ((!ws || this.ws === ws) && this.ws) {
//       this.ws.close();
//       this.ws = null;
//     }
//   }

//   private handleIncoming(msg: LiveIncomingMessage) {
//     if (isToolCallMessage(msg)) {
//       this.emit("toolcall", msg.toolCall);
//       return;
//     }
//     if (isToolCallCancellationMessage(msg)) {
//       this.emit("toolcallcancellation", msg.toolCallCancellation);
//       return;
//     }
//     if (isSetupCompleteMessage(msg)) {
//       // optional
//       return;
//     }
//     if (isServerContentMessage(msg)) {
//       const { serverContent } = msg;
//       if (isInterrupted(serverContent)) {
//         this.emit("interrupted");
//       }
//       if (isTurnComplete(serverContent)) {
//         this.emit("turncomplete");
//       }
//       if (isModelTurn(serverContent)) {
//         // handle partial audio
//         const audioParts = serverContent.modelTurn.parts.filter(
//           (p) => p.inlineData && p.inlineData.mimeType.startsWith("audio/pcm")
//         );
//         audioParts.forEach((part) => {
//           if (part.inlineData?.data) {
//             const buf = base64ToArrayBuffer(part.inlineData.data);
//             this.emit("audio", buf);
//           }
//         });
//         this.emit("content", serverContent);
//       }
//     }
//   }

//   /**
//    * The guard: instead of throwing an error if !this.ws, 
//    * we just log a warning and skip. This prevents a runtime crash.
//    */
//   private _sendJSON(data: object) {
//     if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
//       console.warn("Socket not open yet; ignoring message:", data);
//       return;
//     }
//     this.ws.send(JSON.stringify(data));
//   }

//   send(parts: ClientContentMessage["clientContent"]["turns"][0]["parts"]) {
//     const payload: ClientContentMessage = {
//       clientContent: {
//         turns: [{ role: "user", parts }],
//         turnComplete: true,
//       },
//     };
//     this._sendJSON(payload);
//   }

//   sendRealtimeInput(chunks: RealtimeInputMessage["realtimeInput"]["mediaChunks"]) {
//     const payload: RealtimeInputMessage = { realtimeInput: { mediaChunks: chunks } };
//     this._sendJSON(payload);
//   }

//   sendToolResponse(toolResponse: ToolResponseMessage["toolResponse"]) {
//     const payload: ToolResponseMessage = { toolResponse };
//     this._sendJSON(payload);
//   }
// }




/* /home/user/Guru-AI/app/geminiIntegration/multimodal-live-client.ts */
/**
 * Low-level WebSocket client for Gemini with advanced error logging
 * and a guard in _sendJSON so we don't crash if the socket isn't open.
 */

"use client";

import { EventEmitter } from "eventemitter3";
import {
  isToolCallMessage,
  isToolCallCancellationMessage,
  isSetupCompleteMessage,
  isServerContentMessage,
  isInterrupted,
  isTurnComplete,
  isModelTurn,
  LiveIncomingMessage,
  MultimodalLiveAPIClientConnection,
  LiveConfig,
  SetupMessage,
  ClientContentMessage,
  RealtimeInputMessage,
  ToolResponseMessage,
  ServerContent,
  ToolCall,
  ToolCallCancellation,
} from "./multimodal-live-types";
import { blobToJSON, base64ToArrayBuffer } from "@/lib/utils";

interface MultimodalLiveClientEventTypes {
  open: () => void;
  close: (ev: CloseEvent) => void;
  content: (serverContent: ServerContent) => void;
  audio: (data: ArrayBuffer) => void;
  interrupted: () => void;
  turncomplete: () => void;
  toolcall: (tc: ToolCall) => void;
  toolcallcancellation: (cc: ToolCallCancellation) => void;
}

export class MultimodalLiveClient extends EventEmitter<MultimodalLiveClientEventTypes> {
  public ws: WebSocket | null = null;
  protected config: LiveConfig | null = null;
  public url: string = "";

  constructor({ url, apiKey }: MultimodalLiveAPIClientConnection) {
    super();
    // Build the default WebSocket URL with the API key
    this.url =
      url ||
      `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${apiKey}`;
  }

  async connect(config: LiveConfig): Promise<void> {
    console.log("[MultimodalLiveClient] connect(): Opening socket to:", this.url);
    this.config = config;
    const ws = new WebSocket(this.url);

    return new Promise<void>((resolve, reject) => {
      // onError to catch handshake or other connection failures
      ws.addEventListener("error", (ev) => {
        console.error("[MultimodalLiveClient] WebSocket error event:", ev);
        console.error(
          "[MultimodalLiveClient] Possibly invalid API key or blocked endpoint. URL:",
          this.url
        );
        this.disconnect(ws);
        reject(new Error(`Could not connect to ${this.url}`));
      });

      // onOpen means the handshake succeeded
      ws.addEventListener("open", () => {
        console.log("[MultimodalLiveClient] onOpen: Socket open. Sending setup message.");
        this.ws = ws;
        const setup: SetupMessage = { setup: config };
        this._sendJSON(setup); // initial setup
        this.emit("open");
        resolve(); // connect() promise resolves
      });

      // onMessage: parse server messages
      ws.addEventListener("message", async (evt) => {
        if (evt.data instanceof Blob) {
          const msg = (await blobToJSON(evt.data)) as LiveIncomingMessage;
          this.handleIncoming(msg);
        } else {
          console.log("[MultimodalLiveClient] Non-blob data from server:", evt.data);
        }
      });

      // onClose: user or server closed the connection
      ws.addEventListener("close", (ev: CloseEvent) => {
        console.log("[MultimodalLiveClient] onClose:", ev.reason);
        this.disconnect(ws);
        this.emit("close", ev);
      });
    });
  }

  disconnect(ws?: WebSocket) {
    if ((!ws || this.ws === ws) && this.ws) {
      console.log("[MultimodalLiveClient] disconnect(): closing socket");
      this.ws.close();
      this.ws = null;
    }
  }

  private handleIncoming(msg: LiveIncomingMessage) {
    // console.log("[MultimodalLiveClient] handleIncoming:", msg);
    if (isToolCallMessage(msg)) {
      this.emit("toolcall", msg.toolCall);
      return;
    }
    if (isToolCallCancellationMessage(msg)) {
      this.emit("toolcallcancellation", msg.toolCallCancellation);
      return;
    }
    if (isSetupCompleteMessage(msg)) {
      console.log("[MultimodalLiveClient] Received setupComplete");
      return;
    }
    if (isServerContentMessage(msg)) {
      const { serverContent } = msg;
      if (isInterrupted(serverContent)) {
        console.log("[MultimodalLiveClient] serverContent: interrupted");
        this.emit("interrupted");
      }
      if (isTurnComplete(serverContent)) {
        console.log("[MultimodalLiveClient] serverContent: turnComplete");
        this.emit("turncomplete");
      }
      if (isModelTurn(serverContent)) {
        // partial audio?
        const audioParts = serverContent.modelTurn.parts.filter(
          (p) => p.inlineData && p.inlineData.mimeType.startsWith("audio/pcm")
        );
        audioParts.forEach((part) => {
          if (part.inlineData?.data) {
            const buf = base64ToArrayBuffer(part.inlineData.data);
            this.emit("audio", buf);
          }
        });
        this.emit("content", serverContent);
      }
    }
  }

  private _sendJSON(data: object) {
    // Instead of throwing an error if !this.ws, we log and skip
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.warn("[MultimodalLiveClient] Socket not open yet; ignoring message:", data);
      return;
    }
    this.ws.send(JSON.stringify(data));
  }

  // sending user text
  send(parts: ClientContentMessage["clientContent"]["turns"][0]["parts"]) {
    const payload: ClientContentMessage = {
      clientContent: {
        turns: [{ role: "user", parts }],
        turnComplete: true,
      },
    };
    this._sendJSON(payload);
  }

  // sending audio/video frames in realtime
  sendRealtimeInput(chunks: RealtimeInputMessage["realtimeInput"]["mediaChunks"]) {
    const payload: RealtimeInputMessage = { realtimeInput: { mediaChunks: chunks } };
    this._sendJSON(payload);
  }

  // responding to a function call
  sendToolResponse(toolResponse: ToolResponseMessage["toolResponse"]) {
    const payload: ToolResponseMessage = { toolResponse };
    this._sendJSON(payload);
  }
}
