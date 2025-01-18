// // /* /home/user/Guru-AI/app/application/guruLiveGemini/page.tsx */
// // "use client";

// // import React, { useState, useEffect, useRef } from "react";
// // import { useGeminiContext } from "@/app/geminiIntegration/GeminiProvider";
// // import styles from "@/app/styles/guruLive.module.css";

// // // Reuse your same GURU LIVE components
// // import BubbleOverlay from "@/app/components/BubbleOverlay";
// // import LiveVideoFeed from "@/app/components/LiveVideoFeed";
// // import VideoControlBar from "@/app/components/VideoControlBar";

// // export default function GuruLiveGeminiPage() {
// //   const { connect, disconnect, sendUserText, connected, lastPartial } = useGeminiContext();

// //   // local states for camera, mic, etc.
// //   const [conversation, setConversation] = useState<{ text: string; sender: "ai" | "user" }[]>([]);
// //   const [micActive, setMicActive] = useState(false);
// //   const [videoState, setVideoState] = useState<"inactive" | "selecting" | "active">("inactive");
// //   const activeStreamRef = useRef<MediaStream | null>(null);
// //   const [zoomLevel, setZoomLevel] = useState(1);

// //   // On mount, connect to Gemini with your desired config
// //   useEffect(() => {
// //     connect({
// //       model: "models/gemini-2.0-flash-exp",
// //       generationConfig: {
// //         responseModalities: "audio", // or "text"
// //         speechConfig: {
// //           voiceConfig: {
// //             prebuiltVoiceConfig: { voiceName: "Aoede" }, // steerable voice
// //           },
// //         },
// //       },
// //       tools: [{ googleSearch: {} }], // example
// //     });
// //     return () => {
// //       disconnect();
// //     };
// //   }, [connect, disconnect]);

// //   // Each time "lastPartial" changes, treat it like new AI text
// //   useEffect(() => {
// //     if (!lastPartial) return;
// //     // For demonstration, let's store partial tokens as final lines
// //     // or you can update the last AI bubble with partial text
// //     setConversation((prev) => [...prev, { text: lastPartial, sender: "ai" }]);
// //   }, [lastPartial]);

// //   /** Start/Stop camera or screen feed logic (similar to your existing code) */
// //   const startMediaStream = async (source: "camera" | "screen") => {
// //     try {
// //       let stream: MediaStream;
// //       if (source === "camera") {
// //         stream = await navigator.mediaDevices.getUserMedia({
// //           video: true,
// //           audio: true,
// //         });
// //       } else {
// //         stream = await navigator.mediaDevices.getDisplayMedia({
// //           video: true,
// //           audio: true,
// //         });
// //       }
// //       activeStreamRef.current = stream;
// //       setVideoState("active");
// //       setMicActive(true);
// //     } catch (err) {
// //       console.error("Error requesting media:", err);
// //       setVideoState("inactive");
// //       setMicActive(false);
// //     }
// //   };

// //   const stopMediaStream = () => {
// //     if (activeStreamRef.current) {
// //       activeStreamRef.current.getTracks().forEach((track) => track.stop());
// //       activeStreamRef.current = null;
// //     }
// //     setVideoState("inactive");
// //     setMicActive(false);
// //   };

// //   const handleVideoToggle = () => {
// //     if (videoState === "inactive") {
// //       setVideoState("selecting");
// //     } else if (videoState === "selecting") {
// //       setVideoState("inactive");
// //     } else {
// //       stopMediaStream();
// //     }
// //   };

// //   const handleSourceSelect = (source: "camera" | "screen") => {
// //     startMediaStream(source);
// //   };

// //   const handleMicToggle = () => {
// //     if (videoState !== "active") return;
// //     setMicActive((prev) => !prev);
// //     if (activeStreamRef.current) {
// //       activeStreamRef.current.getAudioTracks().forEach((track) => {
// //         track.enabled = !micActive;
// //       });
// //     }
// //   };

// //   const handleClose = () => {
// //     stopMediaStream();
// //     console.log("Session ended (Close).");
// //   };

// //   const handleSettings = () => {
// //     console.log("Settings clicked.");
// //   };

// //   // Called from VideoControlBar
// //   const handleNewUserMessage = (msg: string) => {
// //     setConversation((prev) => [...prev, { text: msg, sender: "user" }]);
// //     // simultaneously send to Gemini
// //     sendUserText(msg);
// //   };

// //   const handleRefresh = () => {
// //     console.log("Refresh triggered!");
// //   };
// //   const handleZoom = () => {
// //     setZoomLevel((prev) => (prev === 1 ? 1.5 : 1));
// //   };

// //   return (
// //     <div className="flex flex-col h-full w-full p-4">
// //       <h1 className="text-2xl font-bold mb-4">GURU Live + Gemini Integration</h1>
// //       <p className="mb-4 text-gray-600">
// //         Enhanced with Multimodal Live API (real-time text/audio, tool calls, steerable voices)
// //       </p>

// //       <div className="flex flex-row h-[600px] space-x-4">
// //         {/* Video area + bubble overlay */}
// //         <div className="flex-1 border rounded p-2 relative overflow-hidden">
// //           <div className={styles.mainContent}>
// //             <LiveVideoFeed
// //               videoState={videoState}
// //               micActive={micActive}
// //               currentStream={activeStreamRef.current}
// //               zoomLevel={zoomLevel}
// //             />
// //             <BubbleOverlay conversation={conversation} />

// //             {/* Minimal top controls: Refresh & Zoom */}
// //             <div className={styles.topControls}>
// //               <button className={styles.refreshButton} onClick={handleRefresh} aria-label="Refresh">
// //                 &#x21bb;
// //               </button>
// //               <div className={styles.topRightControls}>
// //                 <button className={styles.zoomButton} onClick={handleZoom} aria-label="Zoom">
// //                   {zoomLevel === 1 ? "Zoom In" : "Zoom Out"}
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Premium Video Control Bar */}
// //       <VideoControlBar
// //         videoState={videoState}
// //         onVideoToggle={handleVideoToggle}
// //         onSourceSelect={handleSourceSelect}
// //         micActive={micActive}
// //         onMicToggle={handleMicToggle}
// //         onClose={handleClose}
// //         onSettings={handleSettings}
// //         onNewUserMessage={handleNewUserMessage}
// //       />
// //     </div>
// //   );
// // }




// /* /home/user/Guru-AI/app/application/guruLiveGemini/page.tsx */
// /**
//  * GURU Live (Gemini Integration) main route for BIG TELCO:
//  * This file demonstrates an enhanced GURU LIVE page that integrates
//  * the Multimodal Live API for Gemini 2.0 using the GeminiProvider.
//  * 
//  * We replicate the look & feel of the existing "Guru Live" but now
//  * connect to a real-time streaming endpoint. It references:
//  *  - BubbleOverlay for chat bubbles (AI=Purple, User=Green)
//  *  - LiveVideoFeed for camera/screen
//  *  - VideoControlBar for controlling mic, camera/screen, etc.
//  *  - GeminiProvider context to handle streaming logic.
//  */

// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { useGeminiContext } from "@/app/geminiIntegration/GeminiProvider";
// import styles from "@/app/styles/guruLive.module.css";

// // Reuse your existing GURU LIVE components
// import BubbleOverlay from "@/components/BubbleOverlay";
// import LiveVideoFeed from "@/components/LiveVideoFeed";
// import VideoControlBar from "@/components/VideoControlBar";

// export default function GuruLiveGeminiPage() {
//   const { connect, disconnect, sendUserText, connected, lastPartial } = useGeminiContext();

//   // local conversation state
//   const [conversation, setConversation] = useState<{ text: string; sender: "ai" | "user" }[]>([]);
//   // mic/camera state
//   const [micActive, setMicActive] = useState(false);
//   const [videoState, setVideoState] = useState<"inactive" | "selecting" | "active">("inactive");
//   const activeStreamRef = useRef<MediaStream | null>(null);
//   const [zoomLevel, setZoomLevel] = useState(1);

//   // On first mount, connect to Gemini with a sample config
//   useEffect(() => {
//     connect({
//       model: "models/gemini-2.0-flash-exp",
//       generationConfig: {
//         responseModalities: "audio",
//         speechConfig: {
//           voiceConfig: { prebuiltVoiceConfig: { voiceName: "Aoede" } },
//         },
//       },
//       tools: [{ googleSearch: {} }],
//     });
//     return () => {
//       disconnect();
//     };
//   }, [connect, disconnect]);

//   // Whenever new partial text arrives from Gemini, we treat it as an AI bubble
//   useEffect(() => {
//     if (!lastPartial) return;
//     // Append partial text to conversation
//     setConversation((prev) => [...prev, { text: lastPartial, sender: "ai" }]);
//   }, [lastPartial]);

//   // camera/screen logic
//   const startMediaStream = async (source: "camera" | "screen") => {
//     try {
//       let stream: MediaStream;
//       if (source === "camera") {
//         stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       } else {
//         stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
//       }
//       activeStreamRef.current = stream;
//       setVideoState("active");
//       setMicActive(true);
//     } catch (err) {
//       console.error("Error requesting media:", err);
//       setVideoState("inactive");
//       setMicActive(false);
//     }
//   };
//   const stopMediaStream = () => {
//     if (activeStreamRef.current) {
//       activeStreamRef.current.getTracks().forEach((track) => track.stop());
//       activeStreamRef.current = null;
//     }
//     setVideoState("inactive");
//     setMicActive(false);
//   };

//   const handleVideoToggle = () => {
//     if (videoState === "inactive") setVideoState("selecting");
//     else if (videoState === "selecting") setVideoState("inactive");
//     else stopMediaStream();
//   };
//   const handleSourceSelect = (source: "camera" | "screen") => {
//     startMediaStream(source);
//   };
//   const handleMicToggle = () => {
//     if (videoState !== "active") return;
//     setMicActive((prev) => !prev);
//     if (activeStreamRef.current) {
//       activeStreamRef.current.getAudioTracks().forEach((track) => {
//         track.enabled = !micActive;
//       });
//     }
//   };
//   const handleClose = () => {
//     stopMediaStream();
//     console.log("Session ended (Close).");
//   };
//   const handleSettings = () => {
//     console.log("Settings clicked.");
//   };

//   const handleNewUserMessage = (msg: string) => {
//     setConversation((prev) => [...prev, { text: msg, sender: "user" }]);
//     // also send to Gemini
//     sendUserText(msg);
//   };

//   const handleRefresh = () => {
//     console.log("Refresh triggered!");
//   };
//   const handleZoom = () => {
//     setZoomLevel((prev) => (prev === 1 ? 1.5 : 1));
//   };

//   return (
//     <div className="flex flex-col h-full w-full p-4">
//       <h1 className="text-2xl font-bold mb-4">GURU Live (Gemini Integration)</h1>
//       <p className="mb-4 text-gray-600">
//         Multimodal streaming with text/audio + camera/screen inputs
//       </p>

//       <div className="flex flex-row h-[600px] space-x-4">
//         <div className="flex-1 border rounded p-2 relative overflow-hidden">
//           <div className={styles.mainContent}>
//             <LiveVideoFeed
//               videoState={videoState}
//               micActive={micActive}
//               currentStream={activeStreamRef.current}
//               zoomLevel={zoomLevel}
//             />
//             <BubbleOverlay conversation={conversation} />

//             <div className={styles.topControls}>
//               <button
//                 className={styles.refreshButton}
//                 onClick={handleRefresh}
//                 aria-label="Refresh"
//               >
//                 &#x21bb;
//               </button>
//               <div className={styles.topRightControls}>
//                 <button className={styles.zoomButton} onClick={handleZoom} aria-label="Zoom">
//                   {zoomLevel === 1 ? "Zoom In" : "Zoom Out"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Video control bar (mic, video, text input, etc.) */}
//       <VideoControlBar
//         videoState={videoState}
//         onVideoToggle={handleVideoToggle}
//         onSourceSelect={handleSourceSelect}
//         micActive={micActive}
//         onMicToggle={handleMicToggle}
//         onClose={handleClose}
//         onSettings={handleSettings}
//         onNewUserMessage={handleNewUserMessage}
//       />
//     </div>
//   );
// }


// /* /home/user/Guru-AI/app/application/guruLiveGemini/page.tsx */
// /**
//  * The main page that merges text/audio + camera feed + mic 
//  * sending to Gemini in real time, and receiving partial text/audio.
//  */
// "use client";

// import React, { useEffect, useState } from "react";
// import { useGeminiContext } from "@/app/geminiIntegration/GeminiProvider";
// import { useMediaStreamMux } from "@/app/hooks/use-media-stream-mux";
// import LiveVideoFeed from "@/components/LiveVideoFeed";
// import styles from "@/app/styles/guruLive.module.css";

// /** 
//  * A local "Messages" type for the chat overlay
//  */
// type Message = {
//   text: string;
//   sender: "user" | "ai";
// };

// export default function GuruLiveGeminiPage() {
//   const { connect, disconnect, sendUserText, lastPartial, connected } =
//     useGeminiContext();

//   // This merges webcam vs. screen feed. We'll just 
//   // default to webcam for demonstration.
//   const { activeStream, startWebcam, startScreen, stopAll } =
//     useMediaStreamMux();

//   const [conversation, setConversation] = useState<Message[]>([]);
//   const [micActive, setMicActive] = useState(false);
//   const [videoActive, setVideoActive] = useState(false);

//   // We'll store partial text as it arrives from Gemini. 
//   // Each time "lastPartial" changes, we treat it as a new AI message snippet.
//   useEffect(() => {
//     if (lastPartial) {
//       setConversation((prev) => [
//         ...prev,
//         { text: lastPartial, sender: "ai" },
//       ]);
//     }
//   }, [lastPartial]);

//   // On mount, connect to Gemini with a streaming config
//   useEffect(() => {
//     connect({
//       model: "models/gemini-2.0-flash-exp",
//       generationConfig: {
//         // partial text + partial audio if you like
//         responseModalities: "audio",
//         speechConfig: {
//           voiceConfig: { prebuiltVoiceConfig: { voiceName: "Aoede" } },
//         },
//         // you can set partialResults = true or similar if needed
//       },
//       tools: [], // e.g. { googleSearch: {} } etc
//       // systemInstruction: ...
//     });
//     return () => {
//       disconnect();
//     };
//   }, [connect, disconnect]);

//   /** Chat helper: send text to model + local bubble */
//   const handleSendText = (text: string) => {
//     if (!text.trim()) return;
//     setConversation((prev) => [...prev, { text, sender: "user" }]);
//     sendUserText(text);
//   };

//   /** Camera toggle logic */
//   const handleToggleCamera = async () => {
//     if (videoActive) {
//       // turn off
//       stopAll();
//       setVideoActive(false);
//     } else {
//       // turn on webcam
//       await startWebcam();
//       setVideoActive(true);
//     }
//   };

//   /** Screen toggle logic (optional) */
//   const handleToggleScreen = async () => {
//     if (videoActive) {
//       // already streaming something, stop it
//       stopAll();
//       setVideoActive(false);
//     } else {
//       await startScreen();
//       setVideoActive(true);
//     }
//   };

//   /** Mic toggle logic 
//    *  If we want raw audio to be recognized by Gemini, we rely on the 
//    *  AudioRecorder from the "multimodal-live-api-web-console" approach 
//    *  which is set up inside the GeminiProvider or a local code snippet.
//    *  Toggling mic here might instruct that code to 
//    *  actually start sending PCM frames.
//    */
//   const handleToggleMic = () => {
//     setMicActive(!micActive);
//     // The actual raw PCM sending is done 
//     // by the AudioRecorder we integrated in GeminiProvider 
//     // or a custom approach. Just toggling here for the UI.
//   };

//   return (
//     <div className="flex flex-col h-full w-full p-4">
//       <h1 className="text-2xl font-bold mb-4">GURU Live Gemini - Multimodal</h1>
//       <p className="mb-4 text-gray-600">
//         Real-time text/audio + camera/screen inputs → Gemini responses
//       </p>

//       <div className="flex flex-row h-[600px] space-x-4">
//         {/* Left side: Video feed / mic state */}
//         <div className="flex-1 border rounded p-2 relative overflow-hidden">
//           <div className={styles.mainContent}>
//             {/* Show local feed (webcam or screen) */}
//             <LiveVideoFeed
//               stream={activeStream}
//               isActive={videoActive}
//               micActive={micActive}
//               zoomLevel={1}
//             />

//             {/* Just a simple overlay for the conversation */}
//             <div
//               style={{
//                 position: "absolute",
//                 top: 20,
//                 right: 20,
//                 width: "300px",
//                 maxHeight: "80%",
//                 overflowY: "auto",
//                 background: "rgba(255,255,255,0.6)",
//                 borderRadius: 8,
//                 padding: 8,
//               }}
//             >
//               {conversation.map((msg, idx) => (
//                 <div
//                   key={idx}
//                   style={{
//                     marginBottom: "6px",
//                     padding: "6px",
//                     borderRadius: "6px",
//                     backgroundColor:
//                       msg.sender === "ai" ? "#b18bf7" : "#94dca0",
//                     color: msg.sender === "ai" ? "#fff" : "#000",
//                     alignSelf: msg.sender === "ai" ? "flex-start" : "flex-end",
//                   }}
//                 >
//                   {msg.sender === "user" ? "You: " : "AI: "}
//                   {msg.text}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right side: Controls */}
//         <div className="w-72 border rounded p-2 space-y-4">
//           <h2 className="font-bold">Controls</h2>
//           <button
//             className="border rounded px-3 py-1 w-full"
//             onClick={handleToggleCamera}
//           >
//             {videoActive ? "Stop Webcam" : "Start Webcam"}
//           </button>
//           <button
//             className="border rounded px-3 py-1 w-full"
//             onClick={handleToggleScreen}
//           >
//             {videoActive ? "Stop Screen" : "Share Screen"}
//           </button>
//           <button
//             className="border rounded px-3 py-1 w-full"
//             onClick={handleToggleMic}
//           >
//             {micActive ? "Mute Mic" : "Unmute Mic"}
//           </button>
//           <div>
//             Connected to Gemini? {connected ? "Yes" : "No"}
//           </div>
//           {/* Simple text input to send manual messages */}
//           <div className="flex space-x-2 mt-4">
//             <input
//               type="text"
//               id="textInput"
//               className="border flex-1 rounded px-2 py-1"
//               placeholder="Type a text message..."
//             />
//             <button
//               className="border rounded px-2"
//               onClick={() => {
//                 const input = document.getElementById(
//                   "textInput"
//                 ) as HTMLInputElement;
//                 if (input && input.value.trim()) {
//                   handleSendText(input.value.trim());
//                   input.value = "";
//                 }
//               }}
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// /* /home/user/Guru-AI/app/application/guruLiveGemini/page.tsx */
// /**
//  * A sample page that uses the GeminiProvider context 
//  * to connect to Gemini, send text, and display partial text. 
//  * It won't crash with "WebSocket is not open" 
//  * because we wait for "connect(...)" to finish 
//  * and rely on the new guarded code.
//  */

// "use client";

// import React, { useEffect } from "react";
// import { useGeminiContext } from "@/app/geminiIntegration/GeminiProvider";

// export default function GuruLiveGeminiPage() {
//   const { connect, disconnect, sendUserText, lastPartial, connected } =
//     useGeminiContext();

//   useEffect(() => {
//     // Kick off the WebSocket connection on mount
//     connect({
//       model: "models/gemini-2.0-flash-exp",
//       generationConfig: {
//         responseModalities: "audio",
//         speechConfig: {
//           voiceConfig: { prebuiltVoiceConfig: { voiceName: "Aoede" } },
//         },
//       },
//       tools: [],
//     });
//     return () => {
//       // close on unmount
//       disconnect();
//     };
//   }, [connect, disconnect]);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">GURU Live Gemini</h1>
//       <p>WebSocket connected? {connected ? "Yes" : "No"}</p>

//       {/* A simple button to send text to the model */}
//       <button
//         onClick={() => sendUserText("Hello, from user text input!")}
//         className="mt-2 p-2 bg-blue-600 text-white rounded"
//       >
//         Send "Hello"
//       </button>

//       <div className="mt-4">
//         <h2 className="font-bold">Last partial text from model:</h2>
//         <div className="border p-2 rounded bg-gray-100">{lastPartial}</div>
//       </div>
//     </div>
//   );
// }



/* /home/user/Guru-AI/app/application/guruLiveGemini/page.tsx */
"use client";

import React, { useEffect } from "react";
import { useGeminiContext } from "@/app/geminiIntegration/GeminiProvider";

export default function GuruLiveGeminiPage() {
  const { connect, disconnect, sendUserText, lastPartial, connected } = useGeminiContext();

  useEffect(() => {
    // Attempt to connect on mount
    console.log("[page.tsx] useEffect => connecting to Gemini");
    connect({
      model: "models/gemini-2.0-flash-exp", 
      generationConfig: {
        responseModalities: "audio",
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Aoede" } } },
      },
      tools: [],
    });
    return () => {
      console.log("[page.tsx] unmount => disconnect()");
      disconnect();
    };
  }, [connect, disconnect]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">GURU Live Gemini</h1>
      <p>WebSocket connected? {connected ? "Yes" : "No"}</p>
      <button
        className="mt-2 p-2 bg-blue-600 text-white rounded"
        onClick={() => {
          console.log("[page.tsx] user clicked 'Send Hello'");
          sendUserText("Hello from user");
        }}
      >
        Send "Hello"
      </button>
      <div className="mt-4">
        <h2 className="font-bold">Last partial text from model:</h2>
        <div className="border p-2 rounded bg-gray-100">{lastPartial}</div>
      </div>
    </div>
  );
}
