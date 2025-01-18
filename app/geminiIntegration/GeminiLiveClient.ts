// // /* /home/user/Guru-AI/app/geminiIntegration/GeminiLiveClient.ts */

// // "use client";

// // import { EventEmitter } from "eventemitter3";
// // import {
// //   MultimodalLiveClient,
// //   MultimodalLiveAPIClientConnection,
// // } from "./multimodal-live-client";
// // import { LiveConfig, Part, ToolResponseMessage, RealtimeInputMessage } from "./multimodal-live-types";

// // /**
// //  * GeminiLiveClient: High-level helper to start/stop the WebSocket,
// //  * send mic/camera frames, and handle partial responses from the model.
// //  */

// // export interface IGeminiLiveClientEvents {
// //   open: () => void;
// //   close: () => void;
// //   content: (text: string) => void;      // partial or final text
// //   audio: (buffer: ArrayBuffer) => void; // partial PCM
// //   error: (err: any) => void;
// // }

// // export class GeminiLiveClient extends EventEmitter<IGeminiLiveClientEvents> {
// //   private client: MultimodalLiveClient;
// //   private config: LiveConfig | null = null;
// //   public connected = false;

// //   constructor(connParams: MultimodalLiveAPIClientConnection) {
// //     super();
// //     this.client = new MultimodalLiveClient(connParams);

// //     this.handleClose = this.handleClose.bind(this);
// //     this.handleOpen = this.handleOpen.bind(this);
// //     this.handleContent = this.handleContent.bind(this);
// //     this.handleAudio = this.handleAudio.bind(this);
// //   }

// //   /** Prepare the session config and open WS */
// //   async connect(config: LiveConfig) {
// //     this.config = config;
// //     try {
// //       await this.client.connect(config);

// //       this.client.on("open", this.handleOpen);
// //       this.client.on("close", this.handleClose);
// //       this.client.on("audio", this.handleAudio);

// //       // The "content" event means model text or partial output
// //       // The sample code uses "content" for final or partial text tokens
// //       this.client.on("content", (content) => {
// //         // If there's a modelTurn with text parts, accumulate them
// //         if (content.modelTurn && content.modelTurn.parts) {
// //           const textParts = content.modelTurn.parts
// //             .filter((p) => p.text && p.text.trim() !== "")
// //             .map((p) => p.text)
// //             .join("\n");
// //           this.handleContent(textParts);
// //         }
// //       });

// //       this.client.on("toolcall", (toolCall) => {
// //         // Example: handle tool calls if you have custom tools
// //         // or respond to them with this.client.sendToolResponse(...)
// //         console.log("Tool call triggered by model:", toolCall);
// //       });

// //       this.client.on("toolcallcancellation", (cancel) => {
// //         console.warn("Tool call cancelled by model:", cancel);
// //       });

// //       // handle turncomplete, interrupted, etc. as needed
// //       this.connected = true;
// //     } catch (err) {
// //       this.emit("error", err);
// //       this.connected = false;
// //     }
// //   }

// //   /** Disconnect from the server. */
// //   disconnect() {
// //     this.client.disconnect();
// //     this.connected = false;
// //   }

// //   /** Send partial text input from user. */
// //   sendText(parts: Part[]) {
// //     this.client.send(parts);
// //   }

// //   /** Send media frames (audio or video) in real time. */
// //   sendRealtimeInput(chunks: RealtimeInputMessage["realtimeInput"]["mediaChunks"]) {
// //     this.client.sendRealtimeInput(chunks);
// //   }

// //   /** Tools: respond to a function call. */
// //   sendToolResponse(res: ToolResponseMessage["toolResponse"]) {
// //     this.client.sendToolResponse(res);
// //   }

// //   // Internals
// //   private handleOpen() {
// //     this.emit("open");
// //   }
// //   private handleClose() {
// //     this.emit("close");
// //   }
// //   private handleContent(text: string) {
// //     // text can be appended to the conversation as partial or final.
// //     this.emit("content", text);
// //   }
// //   private handleAudio(buffer: ArrayBuffer) {
// //     // if you want to play or handle partial audio, do it here
// //     this.emit("audio", buffer);
// //   }
// // }



// /* /home/user/Guru-AI/app/geminiIntegration/GeminiLiveClient.ts */
// /**
//  * A high-level wrapper over "multimodal-live-client" to abstract away 
//  * details of sending/receiving partial text/audio for GURU LIVE with Gemini 2.0.
//  */

// "use client";

// import { EventEmitter } from "eventemitter3";
// import { MultimodalLiveClient } from "./multimodal-live-client";
// import { MultimodalLiveAPIClientConnection, LiveConfig, Part, RealtimeInputMessage, ToolResponseMessage } from "./multimodal-live-types";

// export interface IGeminiLiveClientEvents {
//   open: () => void;
//   close: () => void;
//   content: (text: string) => void;
//   audio: (buffer: ArrayBuffer) => void;
//   error: (err: any) => void;
// }

// /**
//  * GeminiLiveClient wraps the raw MultimodalLiveClient with easy 
//  * methods to send user text or media, plus handle partial text or audio output.
//  */
// export class GeminiLiveClient extends EventEmitter<IGeminiLiveClientEvents> {
//   private client: MultimodalLiveClient;
//   private config: LiveConfig | null = null;
//   public connected = false;

//   constructor(connParams: MultimodalLiveAPIClientConnection) {
//     super();
//     this.client = new MultimodalLiveClient(connParams);

//     // bind local event listeners
//     this.handleOpen = this.handleOpen.bind(this);
//     this.handleClose = this.handleClose.bind(this);
//     this.handleAudio = this.handleAudio.bind(this);
//     this.handleContent = this.handleContent.bind(this);
//   }

//   async connect(config: LiveConfig) {
//     this.config = config;
//     try {
//       await this.client.connect(config);
//       this.client.on("open", this.handleOpen);
//       this.client.on("close", this.handleClose);

//       // partial text or model data
//       this.client.on("content", (serverContent) => {
//         if (serverContent.modelTurn && serverContent.modelTurn.parts) {
//           const textParts = serverContent.modelTurn.parts
//             .filter((p) => p.text && p.text.trim() !== "")
//             .map((p) => p.text)
//             .join(" ");
//           this.handleContent(textParts);
//         }
//       });

//       // partial PCM audio
//       this.client.on("audio", this.handleAudio);

//       // handle tool calls if needed
//       this.client.on("toolcall", (toolCall) => {
//         console.log("Tool call triggered by the model:", toolCall);
//       });
//       this.client.on("toolcallcancellation", (cancel) => {
//         console.log("Tool call CANCELLED by model:", cancel);
//       });

//       this.connected = true;
//     } catch (err) {
//       this.emit("error", err);
//       this.connected = false;
//     }
//   }

//   disconnect() {
//     this.client.disconnect();
//     this.connected = false;
//   }

//   sendText(parts: Part[]) {
//     this.client.send(parts);
//   }

//   sendRealtimeInput(chunks: RealtimeInputMessage["realtimeInput"]["mediaChunks"]) {
//     this.client.sendRealtimeInput(chunks);
//   }

//   sendToolResponse(res: ToolResponseMessage["toolResponse"]) {
//     this.client.sendToolResponse(res);
//   }

//   private handleOpen() {
//     this.emit("open");
//   }

//   private handleClose() {
//     this.emit("close");
//   }

//   private handleContent(text: string) {
//     this.emit("content", text);
//   }

//   private handleAudio(buffer: ArrayBuffer) {
//     this.emit("audio", buffer);
//   }
// }


// /* /home/user/Guru-AI/app/geminiIntegration/GeminiLiveClient.ts */
// "use client";

// import { EventEmitter } from "eventemitter3";
// import { MultimodalLiveClient } from "./multimodal-live-client";
// import {
//   MultimodalLiveAPIClientConnection,
//   LiveConfig,
//   Part,
//   RealtimeInputMessage,
//   ToolResponseMessage,
// } from "./multimodal-live-types";

// export interface IGeminiLiveClientEvents {
//   open: () => void;
//   close: () => void;
//   content: (text: string) => void;
//   audio: (buffer: ArrayBuffer) => void;
//   error: (err: any) => void;
// }

// /**
//  * Wraps the raw MultimodalLiveClient so we can parse partial text from
//  * serverContent.modelTurn.parts, and partial audio. 
//  */
// export class GeminiLiveClient extends EventEmitter<IGeminiLiveClientEvents> {
//   private client: MultimodalLiveClient;
//   private config: LiveConfig | null = null;
//   public connected = false;

//   constructor(connParams: MultimodalLiveAPIClientConnection) {
//     super();
//     this.client = new MultimodalLiveClient(connParams);

//     this.handleOpen = this.handleOpen.bind(this);
//     this.handleClose = this.handleClose.bind(this);
//     this.handleContent = this.handleContent.bind(this);
//     this.handleAudio = this.handleAudio.bind(this);
//   }

//   async connect(config: LiveConfig) {
//     this.config = config;
//     try {
//       await this.client.connect(config);
//       this.client.on("open", this.handleOpen);
//       this.client.on("close", this.handleClose);

//       this.client.on("content", (serverContent) => {
//         if (serverContent.modelTurn && serverContent.modelTurn.parts) {
//           const textParts = serverContent.modelTurn.parts
//             .filter((p) => p.text && p.text.trim() !== "")
//             .map((p) => p.text)
//             .join(" ");
//           if (textParts) this.handleContent(textParts);
//         }
//       });
//       this.client.on("audio", this.handleAudio);

//       // handle tool calls 
//       this.client.on("toolcall", (tcall) => {
//         console.log("Toolcall from model:", tcall);
//       });
//       this.client.on("toolcallcancellation", (cancel) => {
//         console.log("Toolcall cancelled:", cancel);
//       });

//       this.connected = true;
//     } catch (err) {
//       this.emit("error", err);
//       this.connected = false;
//     }
//   }

//   disconnect() {
//     this.client.disconnect();
//     this.connected = false;
//   }

//   sendText(parts: Part[]) {
//     this.client.send(parts);
//   }

//   sendRealtimeInput(chunks: RealtimeInputMessage["realtimeInput"]["mediaChunks"]) {
//     this.client.sendRealtimeInput(chunks);
//   }

//   sendToolResponse(res: ToolResponseMessage["toolResponse"]) {
//     this.client.sendToolResponse(res);
//   }

//   // internal
//   private handleOpen() {
//     this.emit("open");
//   }
//   private handleClose() {
//     this.emit("close");
//   }
//   private handleContent(text: string) {
//     this.emit("content", text);
//   }
//   private handleAudio(buffer: ArrayBuffer) {
//     this.emit("audio", buffer);
//   }
// }



/* /home/user/Guru-AI/app/geminiIntegration/GeminiLiveClient.ts */
/**
 * High-level wrapper around "multimodal-live-client" 
 * that extracts partial text from the modelTurn 
 * and partial PCM from "audio".
 */




// "use client";

// import { EventEmitter } from "eventemitter3";
// import { MultimodalLiveClient } from "./multimodal-live-client";
// import {
//   MultimodalLiveAPIClientConnection,
//   LiveConfig,
//   Part,
//   RealtimeInputMessage,
//   ToolResponseMessage,
// } from "./multimodal-live-types";

// export interface IGeminiLiveClientEvents {
//   open: () => void;
//   close: () => void;
//   content: (text: string) => void;
//   audio: (buffer: ArrayBuffer) => void;
//   error: (err: any) => void;
// }

// /**
//  * This class receives partial modelTurn data, merges text into a string,
//  * and emits "content" as a single text chunk.
//  */
// export class GeminiLiveClient extends EventEmitter<IGeminiLiveClientEvents> {
//   private client: MultimodalLiveClient;
//   private config: LiveConfig | null = null;
//   public connected = false;

//   constructor(connParams: MultimodalLiveAPIClientConnection) {
//     super();
//     this.client = new MultimodalLiveClient(connParams);

//     // Bind handlers
//     this.handleOpen = this.handleOpen.bind(this);
//     this.handleClose = this.handleClose.bind(this);
//     this.handleAudio = this.handleAudio.bind(this);
//     this.handleServerContent = this.handleServerContent.bind(this);
//   }

//   async connect(config: LiveConfig) {
//     this.config = config;
//     try {
//       await this.client.connect(config);
//       // Hook up events after connect 
//       this.client.on("open", this.handleOpen);
//       this.client.on("close", this.handleClose);

//       this.client.on("content", this.handleServerContent);
//       this.client.on("audio", this.handleAudio);

//       this.client.on("toolcall", (call) => {
//         console.log("Toolcall from model:", call);
//       });
//       this.client.on("toolcallcancellation", (cc) => {
//         console.log("Toolcall CANCELLED:", cc);
//       });

//       this.connected = true;
//     } catch (err) {
//       this.emit("error", err);
//       this.connected = false;
//     }
//   }

//   disconnect() {
//     this.client.disconnect();
//     this.connected = false;
//   }

//   sendText(parts: Part[]) {
//     this.client.send(parts);
//   }

//   sendRealtimeInput(chunks: RealtimeInputMessage["realtimeInput"]["mediaChunks"]) {
//     this.client.sendRealtimeInput(chunks);
//   }

//   sendToolResponse(res: ToolResponseMessage["toolResponse"]) {
//     this.client.sendToolResponse(res);
//   }

//   private handleOpen() {
//     this.emit("open");
//   }

//   private handleClose() {
//     this.emit("close");
//   }

//   private handleAudio(buf: ArrayBuffer) {
//     this.emit("audio", buf);
//   }

//   /**
//    * If "serverContent" has partial text, we gather it into a single string.
//    */
//   private handleServerContent(serverContent: any) {
//     if (serverContent.modelTurn && serverContent.modelTurn.parts) {
//       const textParts = serverContent.modelTurn.parts
//         .filter((p: any) => p.text && p.text.trim() !== "")
//         .map((p: any) => p.text)
//         .join(" ");
//       if (textParts) {
//         this.emit("content", textParts);
//       }
//     }
//   }
// }



/* /home/user/Guru-AI/app/geminiIntegration/GeminiLiveClient.ts */
/**
 * This class receives partial serverContent, picks out text, 
 * and emits "content" as a simple string. With logs.
 */

"use client";

import { EventEmitter } from "eventemitter3";
import { MultimodalLiveClient } from "./multimodal-live-client";
import {
  MultimodalLiveAPIClientConnection,
  LiveConfig,
  Part,
  RealtimeInputMessage,
  ToolResponseMessage,
} from "./multimodal-live-types";

export interface IGeminiLiveClientEvents {
  open: () => void;
  close: () => void;
  content: (textOrObj: any) => void;
  audio: (buffer: ArrayBuffer) => void;
  error: (err: any) => void;
}

export class GeminiLiveClient extends EventEmitter<IGeminiLiveClientEvents> {
  private client: MultimodalLiveClient;
  private config: LiveConfig | null = null;
  public connected = false;

  constructor(connParams: MultimodalLiveAPIClientConnection) {
    super();
    this.client = new MultimodalLiveClient(connParams);

    // We won't attach listeners here; we'll do it in the connect() method 
  }

  async connect(config: LiveConfig) {
    console.log("[GeminiLiveClient] connect() with config:", config);
    this.config = config;
    try {
      await this.client.connect(config);
      // Attach event listeners after connect
      this.client.on("open", () => {
        console.log("[GeminiLiveClient] onOpen");
        this.connected = true;
        this.emit("open");
      });
      this.client.on("close", () => {
        console.log("[GeminiLiveClient] onClose");
        this.connected = false;
        this.emit("close");
      });
      this.client.on("content", (serverContent) => {
        // Extract text from modelTurn if present
        if (serverContent.modelTurn && serverContent.modelTurn.parts) {
          const textParts = serverContent.modelTurn.parts
            .filter((p: any) => p.text && p.text.trim() !== "")
            .map((p: any) => p.text)
            .join(" ");
          if (textParts) {
            console.log("[GeminiLiveClient] partial textParts:", textParts);
            this.emit("content", textParts);
          }
        }
      });
      this.client.on("audio", (buf) => {
        console.log("[GeminiLiveClient] partial audio from model, len=", buf.byteLength);
        this.emit("audio", buf);
      });
      this.client.on("toolcall", (tc) => {
        console.log("[GeminiLiveClient] toolcall from model:", tc);
      });
      this.client.on("toolcallcancellation", (cc) => {
        console.log("[GeminiLiveClient] toolcall CANCELLED:", cc);
      });

      this.connected = true;
      console.log("[GeminiLiveClient] connect => success, socket presumably open soon");
    } catch (err) {
      console.error("[GeminiLiveClient] connect => error:", err);
      this.emit("error", err);
      this.connected = false;
    }
  }

  disconnect() {
    console.log("[GeminiLiveClient] disconnect()");
    this.client.disconnect();
    this.connected = false;
  }

  sendText(parts: Part[]) {
    console.log("[GeminiLiveClient] sendText(", parts, ")");
    this.client.send(parts);
  }

  sendRealtimeInput(chunks: RealtimeInputMessage["realtimeInput"]["mediaChunks"]) {
    console.log("[GeminiLiveClient] sendRealtimeInput with", chunks.length, "chunks");
    this.client.sendRealtimeInput(chunks);
  }

  sendToolResponse(res: ToolResponseMessage["toolResponse"]) {
    console.log("[GeminiLiveClient] sendToolResponse =>", res);
    this.client.sendToolResponse(res);
  }
}
