// /* /home/user/Guru-AI/app/geminiIntegration/multimodal-live-types.ts */
// "use client";

// export interface Part {
//   text?: string;
//   inlineData?: {
//     mimeType: string;
//     data: string;
//   };
//   // other fields: code, codeExecutionResult, etc.
// }

// export interface Content {
//   role: "user" | "assistant";
//   parts: Part[];
// }

// export type LiveConfig = {
//   model: string;
//   systemInstruction?: { parts: Part[] };
//   generationConfig?: {
//     responseModalities?: "text" | "audio" | "image";
//     speechConfig?: {
//       voiceConfig?: {
//         prebuiltVoiceConfig?: { voiceName: string };
//       };
//     };
//     // etc.
//   };
//   tools?: any[];
// };

// export type SetupMessage = { setup: LiveConfig };
// export type ClientContentMessage = {
//   clientContent: {
//     turns: Content[];
//     turnComplete: boolean;
//   };
// };
// export type RealtimeInputMessage = {
//   realtimeInput: {
//     mediaChunks: Array<{
//       mimeType: string;
//       data: string; // base64
//     }>;
//   };
// };
// export type ToolResponseMessage = {
//   toolResponse: {
//     functionResponses: Array<{
//       response: object;
//       id: string;
//     }>;
//   };
// };

// /** Incoming from server */
// export type ServerContent = {
//   modelTurn: {
//     parts: Part[];
//   };
// } | { turnComplete: boolean } | { interrupted: true };

// export type ServerContentMessage = {
//   serverContent: ServerContent;
// };

// /** Tool calls from the model */
// export interface LiveFunctionCall {
//   id: string;
//   name: string;
//   args: object;
// }
// export type ToolCall = {
//   functionCalls: LiveFunctionCall[];
// };
// export type ToolCallMessage = { toolCall: ToolCall };

// export type ToolCallCancellationMessage = {
//   toolCallCancellation: { ids: string[] };
// };
// export type ToolCallCancellation = { ids: string[] };

// export type SetupCompleteMessage = { setupComplete: {} };

// // union of all possible server messages
// export type LiveIncomingMessage =
//   | ToolCallMessage
//   | ToolCallCancellationMessage
//   | SetupCompleteMessage
//   | ServerContentMessage;

// // type guards
// export function isToolCallMessage(a: any): a is ToolCallMessage {
//   return typeof a === "object" && a.toolCall;
// }
// export function isToolCallCancellationMessage(a: any): a is ToolCallCancellationMessage {
//   return typeof a === "object" && a.toolCallCancellation;
// }
// export function isSetupCompleteMessage(a: any): a is SetupCompleteMessage {
//   return typeof a === "object" && a.setupComplete;
// }
// export function isServerContentMessage(a: any): a is ServerContentMessage {
//   return typeof a === "object" && a.serverContent;
// }
// export function isInterrupted(s: ServerContent): s is { interrupted: true } {
//   return (s as any).interrupted === true;
// }
// export function isTurnComplete(s: ServerContent): s is { turnComplete: boolean } {
//   return (s as any).turnComplete === true;
// }
// export function isModelTurn(s: ServerContent): s is { modelTurn: { parts: Part[] } } {
//   return (s as any).modelTurn && Array.isArray((s as any).modelTurn.parts);
// }



// /* /home/user/Guru-AI/app/geminiIntegration/multimodal-live-types.ts */
// /**
//  * Shared type definitions for the Multimodal Live API. 
//  * Mirroring the reference in "multimodal-live-api-web-console" to handle 
//  * partial text/audio, function calls, tool usage, etc.
//  */

// "use client";

// export interface MultimodalLiveAPIClientConnection {
//   url?: string;
//   apiKey: string;
// }

// export interface Part {
//   text?: string;
//   inlineData?: {
//     mimeType: string;
//     data: string; // base64
//   };
//   // code, codeExecutionResult, etc. can be added if needed
// }

// export interface Content {
//   role: "user" | "assistant";
//   parts: Part[];
// }

// export interface LiveConfig {
//   model: string;
//   systemInstruction?: { parts: Part[] };
//   generationConfig?: {
//     responseModalities?: "text" | "audio" | "image";
//     speechConfig?: {
//       voiceConfig?: {
//         prebuiltVoiceConfig?: { voiceName: string };
//       };
//     };
//   };
//   tools?: any[];
// }

// // Outgoing messages
// export type SetupMessage = { setup: LiveConfig };
// export type ClientContentMessage = {
//   clientContent: {
//     turns: Content[];
//     turnComplete: boolean;
//   };
// };
// export type RealtimeInputMessage = {
//   realtimeInput: {
//     mediaChunks: Array<{
//       mimeType: string;
//       data: string;
//     }>;
//   };
// };
// export type ToolResponseMessage = {
//   toolResponse: {
//     functionResponses: Array<{
//       response: object;
//       id: string;
//     }>;
//   };
// };

// // Incoming messages
// export type ModelTurn = { modelTurn: { parts: Part[] } };
// export type TurnComplete = { turnComplete: boolean };
// export type Interrupted = { interrupted: true };

// export type ServerContent = ModelTurn | TurnComplete | Interrupted;

// export type ServerContentMessage = { serverContent: ServerContent };
// export type SetupCompleteMessage = { setupComplete: {} };

// export interface LiveFunctionCall {
//   id: string;
//   name: string;
//   args: object;
// }
// export type ToolCall = { functionCalls: LiveFunctionCall[] };
// export type ToolCallMessage = { toolCall: ToolCall };

// export type ToolCallCancellation = { ids: string[] };
// export type ToolCallCancellationMessage = {
//   toolCallCancellation: ToolCallCancellation;
// };

// export type LiveIncomingMessage =
//   | ToolCallMessage
//   | ToolCallCancellationMessage
//   | SetupCompleteMessage
//   | ServerContentMessage;

// // Type guards
// export function isToolCallMessage(a: any): a is ToolCallMessage {
//   return typeof a === "object" && a.toolCall;
// }
// export function isToolCallCancellationMessage(a: any): a is ToolCallCancellationMessage {
//   return typeof a === "object" && a.toolCallCancellation;
// }
// export function isSetupCompleteMessage(a: any): a is SetupCompleteMessage {
//   return typeof a === "object" && a.setupComplete;
// }
// export function isServerContentMessage(a: any): a is ServerContentMessage {
//   return typeof a === "object" && a.serverContent;
// }
// export function isInterrupted(c: ServerContent): c is Interrupted {
//   return (c as any).interrupted === true;
// }
// export function isTurnComplete(c: ServerContent): c is TurnComplete {
//   return (c as any).turnComplete === true;
// }
// export function isModelTurn(c: ServerContent): c is ModelTurn {
//   return (c as any).modelTurn && Array.isArray((c as any).modelTurn.parts);
// }



/* /home/user/Guru-AI/app/geminiIntegration/multimodal-live-types.ts */
"use client";

export interface Part {
  text?: string;
  inlineData?: {
    mimeType: string;
    data: string;
  };
  // etc
}

export interface Content {
  role: "user" | "assistant";
  parts: Part[];
}

export interface LiveConfig {
  model: string;
  systemInstruction?: { parts: Part[] };
  generationConfig?: {
    responseModalities?: "text" | "audio" | "image";
    speechConfig?: {
      voiceConfig?: {
        prebuiltVoiceConfig?: { voiceName: string };
      };
    };
  };
  tools?: any[];
}

export interface MultimodalLiveAPIClientConnection {
  url?: string;
  apiKey: string;
}

/** Outgoing: Setup */
export type SetupMessage = { setup: LiveConfig };

/** Outgoing: user text */
export type ClientContentMessage = {
  clientContent: {
    turns: { role: "user"; parts: Part[] }[];
    turnComplete: boolean;
  };
};

/** Outgoing: realtime audio/video frames */
export type RealtimeInputMessage = {
  realtimeInput: {
    mediaChunks: Array<{ mimeType: string; data: string }>;
  };
};

/** Outgoing: tool response */
export type ToolResponseMessage = {
  toolResponse: {
    functionResponses: Array<{
      response: object;
      id: string;
    }>;
  };
};

/** Incoming: server content updates */
export type ModelTurn = { modelTurn: { parts: Part[] } };
export type Interrupted = { interrupted: true };
export type TurnComplete = { turnComplete: true };
export type ServerContent = ModelTurn | Interrupted | TurnComplete;

export type ServerContentMessage = {
  serverContent: ServerContent;
};

/** tool calls */
export interface LiveFunctionCall {
  id: string;
  name: string;
  args: any;
}
export type ToolCall = { functionCalls: LiveFunctionCall[] };

export type ToolCallMessage = { toolCall: ToolCall };

export type ToolCallCancellation = { ids: string[] };
export type ToolCallCancellationMessage = {
  toolCallCancellation: ToolCallCancellation;
};

export type SetupCompleteMessage = { setupComplete: {} };

export type LiveIncomingMessage =
  | ToolCallMessage
  | ToolCallCancellationMessage
  | SetupCompleteMessage
  | ServerContentMessage;

/** Type-guards */
export function isToolCallMessage(a: any): a is ToolCallMessage {
  return a.toolCall;
}
export function isToolCallCancellationMessage(a: any): a is ToolCallCancellationMessage {
  return a.toolCallCancellation;
}
export function isSetupCompleteMessage(a: any): a is SetupCompleteMessage {
  return a.setupComplete;
}
export function isServerContentMessage(a: any): a is ServerContentMessage {
  return a.serverContent;
}
export function isInterrupted(a: ServerContent): a is Interrupted {
  return (a as any).interrupted;
}
export function isTurnComplete(a: ServerContent): a is TurnComplete {
  return (a as any).turnComplete;
}
export function isModelTurn(a: ServerContent): a is ModelTurn {
  return (a as any).modelTurn && Array.isArray((a as any).modelTurn.parts);
}
