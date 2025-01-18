// // // /* /home/user/Guru-AI/app/geminiIntegration/GeminiProvider.tsx */
// // // "use client";

// // // import React, { createContext, useContext, useEffect, useRef, useState } from "react";
// // // import { GeminiLiveClient } from "./GeminiLiveClient";
// // // import { LiveConfig, Part } from "./multimodal-live-types";

// // // export interface IGeminiContext {
// // //   client: GeminiLiveClient | null;
// // //   connect: (cfg: LiveConfig) => Promise<void>;
// // //   disconnect: () => void;
// // //   sendUserText: (text: string) => void;
// // //   sendRealtimeAudio: (chunk: Uint8Array) => void; // etc.
// // //   lastPartial: string;
// // //   connected: boolean;
// // // }

// // // const GeminiContext = createContext<IGeminiContext | null>(null);

// // // export function GeminiProvider({
// // //   children,
// // //   apiKey,
// // // }: {
// // //   children: React.ReactNode;
// // //   apiKey: string;
// // // }) {
// // //   const clientRef = useRef<GeminiLiveClient | null>(null);
// // //   const [connected, setConnected] = useState(false);
// // //   const [lastPartial, setLastPartial] = useState("");

// // //   useEffect(() => {
// // //     // instantiate once
// // //     if (!clientRef.current) {
// // //       clientRef.current = new GeminiLiveClient({ apiKey });
// // //       clientRef.current.on("open", () => setConnected(true));
// // //       clientRef.current.on("close", () => setConnected(false));
// // //       clientRef.current.on("content", (text) => setLastPartial((prev) => prev + text));
// // //       clientRef.current.on("audio", (buf) => {
// // //         // optional: handle partial PCM
// // //       });
// // //       clientRef.current.on("error", (err) => {
// // //         console.error("Gemini error:", err);
// // //       });
// // //     }
// // //   }, [apiKey]);

// // //   async function connect(cfg: LiveConfig) {
// // //     if (clientRef.current) {
// // //       await clientRef.current.connect(cfg);
// // //     }
// // //   }

// // //   function disconnect() {
// // //     clientRef.current?.disconnect();
// // //     setConnected(false);
// // //   }

// // //   function sendUserText(text: string) {
// // //     if (clientRef.current) {
// // //       const parts: Part[] = [{ text }];
// // //       clientRef.current.sendText(parts);
// // //     }
// // //   }

// // //   function sendRealtimeAudio(chunk: Uint8Array) {
// // //     if (clientRef.current) {
// // //       const base64 = btoa(String.fromCharCode(...chunk));
// // //       // or do a more robust approach
// // //       clientRef.current.sendRealtimeInput([{ mimeType: "audio/pcm;rate=16000", data: base64 }]);
// // //     }
// // //   }

// // //   const value: IGeminiContext = {
// // //     client: clientRef.current,
// // //     connect,
// // //     disconnect,
// // //     sendUserText,
// // //     sendRealtimeAudio,
// // //     lastPartial,
// // //     connected,
// // //   };

// // //   return <GeminiContext.Provider value={value}>{children}</GeminiContext.Provider>;
// // // }

// // // export function useGeminiContext() {
// // //   const ctx = useContext(GeminiContext);
// // //   if (!ctx) {
// // //     throw new Error("useGeminiContext must be used inside <GeminiProvider>");
// // //   }
// // //   return ctx;
// // // }


// // /* /home/user/Guru-AI/app/geminiIntegration/GeminiProvider.tsx */
// // /**
// //  * A React context provider that instantiates the GeminiLiveClient. 
// //  * You can wrap your entire app or just the specific route with this 
// //  * to manage the streaming logic in state.
// //  */

// // "use client";

// // import React, { createContext, useContext, useEffect, useState, useRef } from "react";
// // import { GeminiLiveClient } from "./GeminiLiveClient";
// // import { LiveConfig, Part } from "./multimodal-live-types";

// // interface IGeminiContext {
// //   client: GeminiLiveClient | null;
// //   connect: (cfg: LiveConfig) => Promise<void>;
// //   disconnect: () => void;
// //   sendUserText: (text: string) => void;
// //   sendRealtimeAudio: (chunk: Uint8Array) => void;
// //   lastPartial: string;
// //   connected: boolean;
// // }

// // const GeminiContext = createContext<IGeminiContext | null>(null);

// // /**
// //  * Provide this at a layout or page level with your GCP API Key
// //  * for streaming text/audio with Gemini 2.0 in real time.
// //  */
// // export function GeminiProvider({
// //   children,
// //   apiKey,
// // }: {
// //   children: React.ReactNode;
// //   apiKey: string;
// // }) {
// //   const clientRef = useRef<GeminiLiveClient | null>(null);
// //   const [connected, setConnected] = useState(false);
// //   const [lastPartial, setLastPartial] = useState("");

// //   useEffect(() => {
// //     if (!clientRef.current) {
// //       clientRef.current = new GeminiLiveClient({ apiKey });
// //       clientRef.current.on("open", () => setConnected(true));
// //       clientRef.current.on("close", () => setConnected(false));
// //       clientRef.current.on("content", (txt) => {
// //         setLastPartial(txt);
// //       });
// //       clientRef.current.on("audio", (buf) => {
// //         // optional: handle partial PCM
// //       });
// //       clientRef.current.on("error", (err) => {
// //         console.error("Gemini error:", err);
// //       });
// //     }
// //   }, [apiKey]);

// //   async function connect(cfg: LiveConfig) {
// //     if (clientRef.current) {
// //       await clientRef.current.connect(cfg);
// //     }
// //   }

// //   function disconnect() {
// //     clientRef.current?.disconnect();
// //     setConnected(false);
// //   }

// //   function sendUserText(text: string) {
// //     if (clientRef.current) {
// //       const parts: Part[] = [{ text }];
// //       clientRef.current.sendText(parts);
// //     }
// //   }

// //   function sendRealtimeAudio(chunk: Uint8Array) {
// //     if (clientRef.current) {
// //       const base64 = btoa(String.fromCharCode(...chunk));
// //       clientRef.current.sendRealtimeInput([
// //         { mimeType: "audio/pcm;rate=16000", data: base64 },
// //       ]);
// //     }
// //   }

// //   const ctxValue: IGeminiContext = {
// //     client: clientRef.current,
// //     connect,
// //     disconnect,
// //     sendUserText,
// //     sendRealtimeAudio,
// //     lastPartial,
// //     connected,
// //   };

// //   return <GeminiContext.Provider value={ctxValue}>{children}</GeminiContext.Provider>;
// // }

// // export function useGeminiContext() {
// //   const ctx = useContext(GeminiContext);
// //   if (!ctx) {
// //     throw new Error("useGeminiContext must be used inside <GeminiProvider>");
// //   }
// //   return ctx;
// // }


// /* /home/user/Guru-AI/app/geminiIntegration/GeminiProvider.tsx */
// /**
//  * Provides a Gemini context, hooking up AudioRecorder + 
//  * partial text/audio streaming from the "multimodal-live-api-web-console" 
//  * sample approach. 
//  */

// "use client";

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useRef,
// } from "react";
// import { GeminiLiveClient } from "./GeminiLiveClient";
// import { LiveConfig, Part } from "./multimodal-live-types";
// import { AudioRecorder } from "@/lib/audio-recorder"; // from the sample
// import { audioContext } from "@/lib/utils";

// interface IGeminiContext {
//   connect: (cfg: LiveConfig) => Promise<void>;
//   disconnect: () => void;
//   sendUserText: (text: string) => void;
//   lastPartial: string;
//   connected: boolean;
// }

// const GeminiContext = createContext<IGeminiContext | null>(null);

// export function GeminiProvider({
//   children,
//   apiKey,
// }: {
//   children: React.ReactNode;
//   apiKey: string;
// }) {
//   const clientRef = useRef<GeminiLiveClient | null>(null);
//   const [connected, setConnected] = useState(false);
//   const [lastPartial, setLastPartial] = useState("");

//   // For capturing mic
//   const [audioRecorder] = useState(() => new AudioRecorder(16000));

//   useEffect(() => {
//     // create the Gemini client if not exist
//     if (!clientRef.current) {
//       clientRef.current = new GeminiLiveClient({ apiKey });
//       clientRef.current.on("open", () => setConnected(true));
//       clientRef.current.on("close", () => setConnected(false));
//       clientRef.current.on("content", (txt) => {
//         // partial or final text 
//         setLastPartial(txt);
//       });
//       clientRef.current.on("audio", (buf) => {
//         // optional partial PCM from model 
//         // you can play with an audio streamer if you want
//       });
//       clientRef.current.on("error", (err) => {
//         console.error("Gemini error:", err);
//       });
//     }

//     // Start mic capture 
//     // We'll do it by default. If you want to conditionally do it, 
//     // you'd place logic in your toggle. 
//     audioRecorder.on("data", (base64PCM: string) => {
//       // chunked PCM from mic 
//       clientRef.current?.sendRealtimeInput([
//         {
//           mimeType: "audio/pcm;rate=16000",
//           data: base64PCM,
//         },
//       ]);
//     });
//     audioRecorder.on("volume", (vol: number) => {
//       // optional volume meter
//     });

//     return () => {
//       // cleanup 
//       audioRecorder.stop();
//     };
//   }, [apiKey, audioRecorder]);

//   async function connect(cfg: LiveConfig) {
//     if (!clientRef.current) return;
//     await clientRef.current.connect(cfg);

//     // Once connected, start mic if user wants 
//     // (We've started in useEffect but you can do it on demand.)
//     audioRecorder.start().catch((err) => console.log("mic start error:", err));
//   }

//   function disconnect() {
//     clientRef.current?.disconnect();
//     audioRecorder.stop();
//     setConnected(false);
//   }

//   function sendUserText(text: string) {
//     if (!clientRef.current) return;
//     const parts: Part[] = [{ text }];
//     clientRef.current.sendText(parts);
//   }

//   const value: IGeminiContext = {
//     connect,
//     disconnect,
//     sendUserText,
//     lastPartial,
//     connected,
//   };

//   return (
//     <GeminiContext.Provider value={value}>{children}</GeminiContext.Provider>
//   );
// }

// export function useGeminiContext() {
//   const ctx = useContext(GeminiContext);
//   if (!ctx) {
//     throw new Error("useGeminiContext must be used inside <GeminiProvider>");
//   }
//   return ctx;
// }



// /* /home/user/Guru-AI/app/geminiIntegration/GeminiProvider.tsx */
// "use client";

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useRef,
// } from "react";
// import { GeminiLiveClient } from "./GeminiLiveClient";
// import { LiveConfig, Part } from "./multimodal-live-types";
// import { AudioRecorder } from "@/lib/audio-recorder"; // from the sample
// import { audioContext } from "@/lib/utils";

// interface IGeminiContext {
//   connect: (cfg: LiveConfig) => Promise<void>;
//   disconnect: () => void;
//   sendUserText: (text: string) => void;
//   lastPartial: string;
//   connected: boolean;
// }

// const GeminiContext = createContext<IGeminiContext | null>(null);

// export function GeminiProvider({
//   children,
//   apiKey,
// }: {
//   children: React.ReactNode;
//   apiKey: string;
// }) {
//   const clientRef = useRef<GeminiLiveClient | null>(null);
//   const [connected, setConnected] = useState(false);
//   const [lastPartial, setLastPartial] = useState("");

//   // The AudioRecorder for chunked mic streaming
//   const [audioRecorder] = useState(() => new AudioRecorder(16000));

//   // We do NOT start the mic or send frames yet—only after the socket is open

//   useEffect(() => {
//     // 1. Create your Gemini client
//     if (!clientRef.current) {
//       clientRef.current = new GeminiLiveClient({ apiKey });
//       // Listen to events from the GeminiLiveClient
//       clientRef.current.on("open", () => {
//         console.log("Gemini socket is now open!");
//         setConnected(true);
//         // 3. Once socket is open, safe to start audio
//         audioRecorder
//           .start()
//           .then(() => {
//             console.log("Audio recorder started!");
//           })
//           .catch((err) => {
//             console.error("Error starting mic:", err);
//           });
//       });
//       clientRef.current.on("close", () => {
//         console.log("Gemini socket closed.");
//         setConnected(false);
//       });
//       clientRef.current.on("content", (txt) => {
//         // partial or final text from model
//         setLastPartial(txt);
//       });
//       clientRef.current.on("audio", (buf) => {
//         // partial PCM from model, if you want to play it
//       });
//       clientRef.current.on("error", (err) => {
//         console.error("Gemini error:", err);
//       });
//     }

//     // 2. The audio recorder will emit "data" events with base64 PCM
//     audioRecorder.on("data", (base64PCM: string) => {
//       // If the socket isn't open, this won't do anything
//       clientRef.current?.sendRealtimeInput([
//         {
//           mimeType: "audio/pcm;rate=16000",
//           data: base64PCM,
//         },
//       ]);
//     });

//     // Clean up if the component unmounts
//     return () => {
//       audioRecorder.stop();
//       clientRef.current?.disconnect();
//       setConnected(false);
//     };
//   }, [apiKey, audioRecorder]);

//   /** Called by your page to do the actual connection. */
//   async function connect(cfg: LiveConfig) {
//     if (!clientRef.current) return;
//     console.log("Attempting to connect to Gemini WebSocket...");
//     try {
//       await clientRef.current.connect(cfg);
//       // This resolves AFTER the “open” event sets up the WS
//       console.log("Gemini connect() succeeded!");
//     } catch (err) {
//       console.error("Gemini connect() error:", err);
//     }
//   }

//   /** Called by your page to gracefully close the socket, stop audio, etc. */
//   function disconnect() {
//     audioRecorder.stop();
//     clientRef.current?.disconnect();
//     setConnected(false);
//   }

//   /** For sending user text to Gemini in real-time. */
//   function sendUserText(text: string) {
//     if (!clientRef.current) {
//       console.warn("No Gemini client to send text!");
//       return;
//     }
//     const parts: Part[] = [{ text }];
//     // If the socket isn't open, this might do nothing or throw:
//     try {
//       clientRef.current.sendText(parts);
//     } catch (err) {
//       console.error("Failed to send text, maybe WebSocket not open:", err);
//     }
//   }

//   const value: IGeminiContext = {
//     connect,
//     disconnect,
//     sendUserText,
//     lastPartial,
//     connected,
//   };

//   return <GeminiContext.Provider value={value}>{children}</GeminiContext.Provider>;
// }

// export function useGeminiContext() {
//   const ctx = useContext(GeminiContext);
//   if (!ctx) {
//     throw new Error("useGeminiContext must be used inside <GeminiProvider>");
//   }
//   return ctx;
// }





// /* /home/user/Guru-AI/app/geminiIntegration/GeminiProvider.tsx */
// /**
//  * The React context that manages the GeminiLiveClient. 
//  * We only start sending mic data AFTER the "open" event 
//  * so we never see "WebSocket is not open".
//  */

// "use client";

// import React, { createContext, useContext, useRef, useState, useEffect } from "react";
// import { GeminiLiveClient } from "./GeminiLiveClient";
// import { LiveConfig, Part } from "./multimodal-live-types";
// import { AudioRecorder } from "@/lib/audio-recorder";

// interface IGeminiContext {
//   connect: (cfg: LiveConfig) => Promise<void>;
//   disconnect: () => void;
//   sendUserText: (text: string) => void;
//   lastPartial: string;
//   connected: boolean;
// }

// const GeminiContext = createContext<IGeminiContext | null>(null);

// export function GeminiProvider({
//   children,
//   apiKey,
// }: {
//   children: React.ReactNode;
//   apiKey: string;
// }) {
//   const clientRef = useRef<GeminiLiveClient | null>(null);

//   const [connected, setConnected] = useState(false);
//   const [lastPartial, setLastPartial] = useState("");
//   const audioRecorderRef = useRef<AudioRecorder | null>(null);

//   useEffect(() => {
//     // 1) Create the Gemini client if none
//     if (!clientRef.current) {
//       clientRef.current = new GeminiLiveClient({ apiKey });

//       // Listen to WS events
//       clientRef.current.on("open", () => {
//         console.log("Gemini WebSocket is now open!");
//         setConnected(true);

//         // 3) Start the mic after the socket is open
//         if (!audioRecorderRef.current) {
//           audioRecorderRef.current = new AudioRecorder(16000);
//           audioRecorderRef.current.on("data", (base64PCM) => {
//             clientRef.current?.sendRealtimeInput([
//               { mimeType: "audio/pcm;rate=16000", data: base64PCM },
//             ]);
//           });
//         }

//         audioRecorderRef.current
//           .start()
//           .then(() => console.log("AudioRecorder started."))
//           .catch((err) => console.error("Could not start audio recorder:", err));
//       });

//       clientRef.current.on("close", () => {
//         console.log("Gemini WebSocket closed");
//         setConnected(false);
//       });

//       clientRef.current.on("content", (txt) => {
//         // partial or final text from model
//         setLastPartial(txt);
//       });

//       clientRef.current.on("audio", (buf) => {
//         // partial PCM from model, if needed
//       });

//       clientRef.current.on("error", (err) => {
//         console.error("Gemini error:", err);
//       });
//     }

//     // Cleanup
//     return () => {
//       audioRecorderRef.current?.stop();
//       clientRef.current?.disconnect();
//       setConnected(false);
//     };
//   }, [apiKey]);

//   // 2) The connect function: call from your page
//   async function connect(cfg: LiveConfig) {
//     if (!clientRef.current) return;
//     console.log("Connecting to Gemini with config:", cfg);
//     try {
//       await clientRef.current.connect(cfg);
//       console.log("Gemini connect() resolved, socket open or opening");
//     } catch (err) {
//       console.error("Failed to connect to Gemini:", err);
//     }
//   }

//   // Disconnect from WS + stop mic
//   function disconnect() {
//     audioRecorderRef.current?.stop();
//     audioRecorderRef.current = null;
//     clientRef.current?.disconnect();
//     setConnected(false);
//   }

//   function sendUserText(text: string) {
//     if (!clientRef.current) {
//       console.warn("No Gemini client to send user text!");
//       return;
//     }
//     const parts: Part[] = [{ text }];
//     clientRef.current.sendText(parts);
//   }

//   const ctxVal: IGeminiContext = {
//     connect,
//     disconnect,
//     sendUserText,
//     lastPartial,
//     connected,
//   };

//   return <GeminiContext.Provider value={ctxVal}>{children}</GeminiContext.Provider>;
// }

// export function useGeminiContext() {
//   const ctx = useContext(GeminiContext);
//   if (!ctx) {
//     throw new Error("useGeminiContext must be used inside <GeminiProvider>");
//   }
//   return ctx;
// }



/* /home/user/Guru-AI/app/geminiIntegration/GeminiProvider.tsx */
/**
 * React context that manages the GeminiLiveClient, 
 * hooking mic after "open". 
 * Logs everything to help debug.
 */

"use client";

import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import { GeminiLiveClient } from "./GeminiLiveClient";
import { LiveConfig, Part } from "./multimodal-live-types";
import { AudioRecorder } from "@/lib/audio-recorder";

interface IGeminiContext {
  connect: (cfg: LiveConfig) => Promise<void>;
  disconnect: () => void;
  sendUserText: (text: string) => void;
  lastPartial: string;
  connected: boolean;
}

const GeminiContext = createContext<IGeminiContext | null>(null);

export function GeminiProvider({ children, apiKey }: { children: React.ReactNode; apiKey: string }) {
  const clientRef = useRef<GeminiLiveClient | null>(null);

  const [connected, setConnected] = useState(false);
  const [lastPartial, setLastPartial] = useState("");
  const audioRecorderRef = useRef<AudioRecorder | null>(null);

  useEffect(() => {
    console.log("[GeminiProvider] Creating GeminiLiveClient with key:", apiKey);
    if (!clientRef.current) {
      clientRef.current = new GeminiLiveClient({ apiKey });
      // We'll set up event handlers after connect(...) is called
    }

    // Cleanup
    return () => {
      console.log("[GeminiProvider] unmount -> stopping mic + disconnecting");
      audioRecorderRef.current?.stop();
      clientRef.current?.disconnect();
      setConnected(false);
    };
  }, [apiKey]);

  /** The function your page calls to open the WS. */
  async function connect(cfg: LiveConfig) {
    console.log("[GeminiProvider] connect() called with config:", cfg);
    if (!clientRef.current) {
      console.warn("[GeminiProvider] No clientRef yet!");
      return;
    }

    // Listen to events only once, or do so every time
    clientRef.current.on("open", () => {
      console.log("[GeminiProvider] onOpen: WebSocket open -> Start mic");
      setConnected(true);

      if (!audioRecorderRef.current) {
        audioRecorderRef.current = new AudioRecorder(16000);
        // chunk callback
        audioRecorderRef.current.on("data", (base64PCM) => {
          console.log("[GeminiProvider] Mic chunk => sendRealtimeInput");
          clientRef.current?.sendRealtimeInput([
            { mimeType: "audio/pcm;rate=16000", data: base64PCM },
          ]);
        });
      }

      audioRecorderRef.current.start().catch((err) => {
        console.error("AudioRecorder start error:", err);
      });
    });

    clientRef.current.on("close", () => {
      console.log("[GeminiProvider] onClose -> setConnected(false)");
      setConnected(false);
    });

    clientRef.current.on("content", (serverContent) => {
      // partial or final text
      console.log("[GeminiProvider] Received partial text from server:", serverContent);
      if (typeof serverContent === "string") {
        setLastPartial(serverContent);
      } else {
        // if it's an object, or you can parse it differently
      }
    });

    clientRef.current.on("audio", (buf) => {
      console.log("[GeminiProvider] Received partial PCM from server, len=", buf.byteLength);
      // if you want to handle partial audio playback
    });

    clientRef.current.on("error", (err) => {
      console.error("[GeminiProvider] Error from Gemini:", err);
    });

    // Actually attempt the WS handshake
    try {
      await clientRef.current.connect(cfg);
      console.log("[GeminiProvider] connect() => resolved. Possibly open now or soon.");
    } catch (err) {
      console.error("[GeminiProvider] connect() => error:", err);
    }
  }

  function disconnect() {
    console.log("[GeminiProvider] disconnect() called");
    audioRecorderRef.current?.stop();
    audioRecorderRef.current = null;
    clientRef.current?.disconnect();
    setConnected(false);
  }

  function sendUserText(text: string) {
    if (!clientRef.current) {
      console.warn("[GeminiProvider] sendUserText: No clientRef!");
      return;
    }
    const parts: Part[] = [{ text }];
    console.log("[GeminiProvider] sendUserText -> client.sendText(", text, ")");
    clientRef.current.sendText(parts);
  }

  const ctxVal: IGeminiContext = {
    connect,
    disconnect,
    sendUserText,
    lastPartial,
    connected,
  };

  return <GeminiContext.Provider value={ctxVal}>{children}</GeminiContext.Provider>;
}

export function useGeminiContext() {
  const ctx = useContext(GeminiContext);
  if (!ctx) throw new Error("useGeminiContext must be used inside <GeminiProvider>");
  return ctx;
}
