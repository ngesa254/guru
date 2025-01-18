// // /* /home/user/Guru-AI/app/application/guruLive/page.tsx */

// // "use client";

// // import React, { useState, useEffect, useCallback } from "react";
// // import styles from "@/app/styles/guruLive.module.css";

// // // Components
// // import LiveVideoFeed from "@/components/LiveVideoFeed";
// // import LiveChatInterface from "@/components/LiveChatInterface";
// // import LiveControlBar from "@/components/LiveControlBar";
// // import LiveVisualContext from "@/components/LiveVisualContext";

// // const GuruLivePage: React.FC = () => {
// //   // Placeholder for video analysis, voice recognition, etc.
// //   const [conversation, setConversation] = useState<{ text: string; sender: "ai" | "user" }[]>([]);
// //   const [isMicActive, setIsMicActive] = useState<boolean>(false);
// //   const [visualContext, setVisualContext] = useState<string>("LivingRoom"); // Example context
// //   const [toggleOption, setToggleOption] = useState<boolean>(false);
// //   const [zoomLevel, setZoomLevel] = useState<number>(1);

// //   // Start/Stop Voice Recognition Placeholder
// //   const handleMicClick = useCallback(() => {
// //     setIsMicActive((prev) => !prev);
// //     // Placeholder: In a real app, you'd set up or stop the Web Speech API here
// //   }, []);

// //   const handleNewUserMessage = (message: string) => {
// //     // Add user's message to conversation
// //     setConversation((prev) => [...prev, { text: message, sender: "user" }]);
// //     // Simulate AI response after a short delay
// //     setTimeout(() => {
// //       setConversation((prev) => [
// //         ...prev,
// //         { text: "This is an AI response to: " + message, sender: "ai" },
// //       ]);
// //     }, 800);
// //   };

// //   // Refresh button logic (top-left)
// //   const handleRefresh = () => {
// //     // Placeholder: re-fetch or re-analyze the video feed
// //     console.log("Refresh triggered!");
// //   };

// //   // Toggle button logic (top-right, leftmost)
// //   const handleToggle = () => {
// //     setToggleOption((prev) => !prev);
// //     console.log("Toggle set to: ", !toggleOption);
// //   };

// //   // Zoom button logic (top-right, rightmost)
// //   const handleZoom = () => {
// //     setZoomLevel((prevZoom) => (prevZoom === 1 ? 1.5 : 1));
// //     console.log("Zoom toggled, new level:", zoomLevel === 1 ? 1.5 : 1);
// //   };

// //   // Close session (X button in bottom control bar)
// //   const handleClose = () => {
// //     // Placeholder: end session or redirect user
// //     console.log("Session ended.");
// //   };

// //   // Settings button (bottom control bar)
// //   const handleSettings = () => {
// //     // Placeholder: open settings modal
// //     console.log("Settings clicked.");
// //   };

// //   return (
// //     <div className={styles.guruLiveContainer}>
// //         <h1 className="text-2xl font-bold mb-4">GURU Live</h1>
// //         <p className="mb-4 text-gray-600">
// //         Multimodal | Start interacting in real-time using text, voice, video or screen shairing
// // </p>


      

// //       {/* MAIN VISUAL CONTEXT + CHAT OVERLAY */}
// //       <div className={styles.mainContent}>
// //         <LiveVisualContext
// //           visualContext={visualContext}
// //           zoomLevel={zoomLevel}
// //         >
// //           <LiveVideoFeed isMicActive={isMicActive} />
// //         </LiveVisualContext>

// //         <LiveChatInterface
// //           conversation={conversation}
// //           onNewUserMessage={handleNewUserMessage}
// //         />

// //         {/* TOP CONTROLS (Refresh, Toggle, Zoom) */}
// //       <div className={styles.topControls}>
// //         <button className={styles.refreshButton} onClick={handleRefresh} aria-label="Refresh">
// //           &#x21bb; {/* Simple refresh icon */}
// //         </button>

// //         <div className={styles.topRightControls}>
// //           <button
// //             className={styles.toggleButton}
// //             onClick={handleToggle}
// //             aria-label="Toggle Option"
// //             aria-checked={toggleOption}
// //           >
// //             {toggleOption ? "ON" : "OFF"}
// //           </button>
// //           <button className={styles.zoomButton} onClick={handleZoom} aria-label="Zoom">
// //             {zoomLevel === 1 ? "Zoom In" : "Zoom Out"}
// //           </button>
// //         </div>
// //       </div>
// //       </div>

// //       {/* BOTTOM CONTROL BAR */}
// //       <LiveControlBar
// //         onClose={handleClose}
// //         onMicClick={handleMicClick}
// //         micActive={isMicActive}
// //         onSettings={handleSettings}
// //       />
// //     </div>
// //   );
// // };

// // export default GuruLivePage;




// /* /home/user/Guru-AI/app/application/guruLive/page.tsx */
// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import styles from "@/app/styles/guruLive.module.css";

// // Components
// import LiveVideoFeed from "@/components/LiveVideoFeed";
// import LiveChatInterface from "@/components/LiveChatInterface";
// import VideoControlBar from "@/components/VideoControlBar";
// import LiveVisualContext from "@/components/LiveVisualContext";

// const GuruLivePage: React.FC = () => {
//   // Placeholder for video analysis, voice recognition, etc.
//   const [conversation, setConversation] = useState<{ text: string; sender: "ai" | "user" }[]>([]);
//   const [isMicActive, setIsMicActive] = useState<boolean>(false);
//   const [isVideoActive, setIsVideoActive] = useState<boolean>(true); // Example: video on by default
//   const [visualContext, setVisualContext] = useState<string>("LivingRoom"); // Example context
//   const [toggleOption, setToggleOption] = useState<boolean>(false);
//   const [zoomLevel, setZoomLevel] = useState<number>(1);

//   // Start/Stop Voice Recognition Placeholder
//   const handleMicClick = useCallback(() => {
//     setIsMicActive((prev) => !prev);
//     // Placeholder: In a real app, you'd set up/stop Web Speech API here
//   }, []);

//   // Toggle video placeholder
//   const handleVideoClick = useCallback(() => {
//     setIsVideoActive((prev) => !prev);
//     // Placeholder: In a real app, you'd manipulate MediaStream tracks here
//   }, []);

//   const handleNewUserMessage = (message: string) => {
//     // Add user's message to conversation
//     setConversation((prev) => [...prev, { text: message, sender: "user" }]);
//     // Simulate AI response after a short delay
//     setTimeout(() => {
//       setConversation((prev) => [
//         ...prev,
//         { text: "This is an AI response to: " + message, sender: "ai" },
//       ]);
//     }, 800);
//   };

//   // Refresh button logic (top-left)
//   const handleRefresh = () => {
//     // Placeholder: re-fetch or re-analyze the video feed
//     console.log("Refresh triggered!");
//   };

//   // Toggle button logic (top-right, leftmost)
//   const handleToggle = () => {
//     setToggleOption((prev) => !prev);
//     console.log("Toggle set to: ", !toggleOption);
//   };

//   // Zoom button logic (top-right, rightmost)
//   const handleZoom = () => {
//     setZoomLevel((prevZoom) => (prevZoom === 1 ? 1.5 : 1));
//     console.log("Zoom toggled, new level:", zoomLevel === 1 ? 1.5 : 1);
//   };

//   // Close session (X button)
//   const handleClose = () => {
//     // Placeholder: end session or redirect user
//     console.log("Session ended.");
//   };

//   // Settings button
//   const handleSettings = () => {
//     // Placeholder: open settings modal
//     console.log("Settings clicked.");
//   };

//   return (
//     <div className={styles.guruLiveContainer}>
//       <h1 className="text-2xl font-bold mb-4">GURU Live</h1>
//       <p className="mb-4 text-gray-600">
//         Multimodal | Start interacting in real-time using text, voice, video, or screen sharing
//       </p>

//       {/* MAIN VISUAL CONTEXT + CHAT OVERLAY */}
//       <div className={styles.mainContent}>
//         <LiveVisualContext visualContext={visualContext} zoomLevel={zoomLevel}>
//           <LiveVideoFeed isMicActive={isMicActive} videoActive={isVideoActive} />
//         </LiveVisualContext>

//         <LiveChatInterface
//           conversation={conversation}
//           onNewUserMessage={handleNewUserMessage}
//         />

//         {/* TOP CONTROLS (Refresh, Toggle, Zoom) */}
//         <div className={styles.topControls}>
//           <button className={styles.refreshButton} onClick={handleRefresh} aria-label="Refresh">
//             &#x21bb; {/* Simple refresh icon */}
//           </button>

//           <div className={styles.topRightControls}>
//             <button
//               className={styles.toggleButton}
//               onClick={handleToggle}
//               aria-label="Toggle Option"
//               aria-checked={toggleOption}
//             >
//               {toggleOption ? "ON" : "OFF"}
//             </button>
//             <button className={styles.zoomButton} onClick={handleZoom} aria-label="Zoom">
//               {zoomLevel === 1 ? "Zoom In" : "Zoom Out"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* PREMIUM VIDEO CONTROL BAR (BOTTOM) */}
//       <VideoControlBar
//         onClose={handleClose}
//         onMicToggle={handleMicClick}
//         onVideoToggle={handleVideoClick}
//         onSettings={handleSettings}
//         micActive={isMicActive}
//         videoActive={isVideoActive}
//       />
//     </div>
//   );
// };

// export default GuruLivePage;



// /* /home/user/Guru-AI/app/application/guruLive/page.tsx */
// "use client";

// import React, { useState, useEffect, useCallback, useRef } from "react";
// import styles from "@/app/styles/guruLive.module.css";

// // Components
// import LiveChatInterface from "@/components/LiveChatInterface";
// import LiveVisualContext from "@/components/LiveVisualContext";
// import LiveVideoFeed from "@/components/LiveVideoFeed";
// import VideoControlBar from "@/components/VideoControlBar";

// const GuruLivePage: React.FC = () => {
//   // Chat state
//   const [conversation, setConversation] = useState<{ text: string; sender: "ai" | "user" }[]>([]);
  
//   // Microphone & Video states
//   const [micActive, setMicActive] = useState(false);
//   const [videoState, setVideoState] = useState<"inactive" | "selecting" | "active">("inactive");
//   // Possible videoSource: "camera" or "screen"
//   const [videoSource, setVideoSource] = useState<"camera" | "screen" | null>(null);

//   // For demonstration of zoom and top controls
//   const [visualContext] = useState<string>("LivingRoom");
//   const [toggleOption, setToggleOption] = useState<boolean>(false);
//   const [zoomLevel, setZoomLevel] = useState<number>(1);

//   // We'll keep track of an active MediaStream to manage it properly.
//   const activeStreamRef = useRef<MediaStream | null>(null);

//   // Handle microphone & video synergy:
//   // If the user chooses a source and grants permission, we turn both mic and video "on" (active).
//   // If user stops, we reset them to off.
//   const startMediaStream = useCallback(
//     async (source: "camera" | "screen") => {
//       try {
//         let stream: MediaStream;
//         if (source === "camera") {
//           // getUserMedia for camera + audio
//           stream = await navigator.mediaDevices.getUserMedia({
//             video: true,
//             audio: true,
//           });
//         } else {
//           // getDisplayMedia for screen share, plus attempt audio if supported
//           stream = await navigator.mediaDevices.getDisplayMedia({
//             video: true,
//             audio: true,
//           });
//         }
//         activeStreamRef.current = stream;
//         setVideoSource(source);
//         setVideoState("active");
//         setMicActive(true); // sync mic with video for demonstration
//       } catch (err) {
//         console.error("Error requesting media: ", err);
//         // Reset to inactive if user denies
//         setVideoSource(null);
//         setVideoState("inactive");
//         setMicActive(false);
//       }
//     },
//     []
//   );

//   const stopMediaStream = useCallback(() => {
//     if (activeStreamRef.current) {
//       activeStreamRef.current.getTracks().forEach((track) => {
//         track.stop();
//       });
//       activeStreamRef.current = null;
//     }
//     setVideoSource(null);
//     setVideoState("inactive");
//     setMicActive(false);
//   }, []);

//   // The user clicked the video button
//   const handleVideoToggle = useCallback(() => {
//     if (videoState === "inactive") {
//       // Show source menu
//       setVideoState("selecting");
//     } else if (videoState === "selecting") {
//       // If user re-clicks, hide the popup?
//       setVideoState("inactive");
//     } else {
//       // active → stop
//       stopMediaStream();
//     }
//   }, [videoState, stopMediaStream]);

//   // The user clicked "Camera" or "Screen" in the popup
//   const handleSourceSelection = useCallback(
//     (source: "camera" | "screen") => {
//       startMediaStream(source);
//     },
//     [startMediaStream]
//   );

//   // Microphone button toggles mic if the stream is already active
//   const handleMicToggle = useCallback(() => {
//     if (videoState !== "active") {
//       // If video isn't active, do nothing or you can adapt for audio-only
//       return;
//     }
//     setMicActive((prev) => !prev);
//     // Actually enable/disable audio track if we want to sync with MediaStream
//     if (activeStreamRef.current) {
//       activeStreamRef.current.getAudioTracks().forEach((track) => {
//         track.enabled = !micActive;
//       });
//     }
//   }, [videoState, micActive]);

//   // Close or X button
//   const handleClose = useCallback(() => {
//     stopMediaStream();
//     console.log("Session ended (Close).");
//   }, [stopMediaStream]);

//   // Settings
//   const handleSettings = useCallback(() => {
//     console.log("Settings clicked.");
//   }, []);

//   // Chat helper
//   const handleNewUserMessage = (message: string) => {
//     setConversation((prev) => [...prev, { text: message, sender: "user" }]);
//     setTimeout(() => {
//       setConversation((prev) => [
//         ...prev,
//         { text: "AI response to: " + message, sender: "ai" },
//       ]);
//     }, 800);
//   };

//   // Refresh button logic (top-left)
//   const handleRefresh = () => {
//     console.log("Refresh triggered!");
//   };

//   // Toggle button logic (top-right, leftmost)
//   const handleToggle = () => {
//     setToggleOption((prev) => !prev);
//     console.log("Toggle set to: ", !toggleOption);
//   };

//   // Zoom button logic (top-right, rightmost)
//   const handleZoom = () => {
//     setZoomLevel((prevZoom) => (prevZoom === 1 ? 1.5 : 1));
//   };

//   return (
//     <div className={styles.guruLiveContainer}>
//       <h1 className="text-2xl font-bold mb-4">GURU Live</h1>
//       <p className="mb-4 text-gray-600">
//         Multimodal | Start interacting in real-time using text, voice, video, or screen sharing
//       </p>

//       {/* MAIN VISUAL CONTEXT + CHAT OVERLAY */}
//       <div className={styles.mainContent}>
//         <LiveVisualContext visualContext={visualContext} zoomLevel={zoomLevel}>
//           {/* The actual video feed component (camera or screen) */}
//           <LiveVideoFeed
//             videoState={videoState}
//             micActive={micActive}
//             currentStream={activeStreamRef.current}
//           />
//         </LiveVisualContext>

//         <LiveChatInterface
//           conversation={conversation}
//           onNewUserMessage={handleNewUserMessage}
//         />

//         {/* TOP CONTROLS (Refresh, Toggle, Zoom) */}
//         <div className={styles.topControls}>
//           <button className={styles.refreshButton} onClick={handleRefresh} aria-label="Refresh">
//             &#x21bb; {/* Simple refresh icon */}
//           </button>

//           <div className={styles.topRightControls}>
//             <button
//               className={styles.toggleButton}
//               onClick={handleToggle}
//               aria-label="Toggle Option"
//               aria-checked={toggleOption}
//             >
//               {toggleOption ? "ON" : "OFF"}
//             </button>
//             <button className={styles.zoomButton} onClick={handleZoom} aria-label="Zoom">
//               {zoomLevel === 1 ? "Zoom In" : "Zoom Out"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* PREMIUM VIDEO CONTROL BAR (BOTTOM) */}
//       <VideoControlBar
//         videoState={videoState}
//         onVideoToggle={handleVideoToggle}
//         onSourceSelect={handleSourceSelection}
//         micActive={micActive}
//         onMicToggle={handleMicToggle}
//         onClose={handleClose}
//         onSettings={handleSettings}
//       />
//     </div>
//   );
// };

// export default GuruLivePage;




/* /home/user/Guru-AI/app/application/guruLive/page.tsx */
// "use client";

// import React, { useState, useCallback, useRef } from "react";
// import styles from "@/app/styles/guruLive.module.css";

// // Components
// import LiveVideoFeed from "@/components/LiveVideoFeed";
// import VideoControlBar from "@/components/VideoControlBar";
// import BubbleOverlay from "@/components/BubbleOverlay";

// const GuruLivePage: React.FC = () => {
//   // Conversation holds user vs. AI messages
//   const [conversation, setConversation] = useState<{ text: string; sender: "ai" | "user" }[]>([]);

//   // Microphone & Video states
//   const [micActive, setMicActive] = useState(false);
//   const [videoState, setVideoState] = useState<"inactive" | "selecting" | "active">("inactive");
//   const [videoSource, setVideoSource] = useState<"camera" | "screen" | null>(null);

//   // Manage an active MediaStream
//   const activeStreamRef = useRef<MediaStream | null>(null);

//   // Basic top controls: Refresh & Zoom
//   const [zoomLevel, setZoomLevel] = useState<number>(1);

//   // START or STOP a video+audio stream
//   const startMediaStream = async (source: "camera" | "screen") => {
//     try {
//       let stream: MediaStream;
//       if (source === "camera") {
//         stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true,
//         });
//       } else {
//         stream = await navigator.mediaDevices.getDisplayMedia({
//           video: true,
//           audio: true,
//         });
//       }
//       activeStreamRef.current = stream;
//       setVideoSource(source);
//       setVideoState("active");
//       setMicActive(true);
//     } catch (err) {
//       console.error("Error requesting media:", err);
//       setVideoSource(null);
//       setVideoState("inactive");
//       setMicActive(false);
//     }
//   };

//   const stopMediaStream = useCallback(() => {
//     if (activeStreamRef.current) {
//       activeStreamRef.current.getTracks().forEach((track) => track.stop());
//       activeStreamRef.current = null;
//     }
//     setVideoSource(null);
//     setVideoState("inactive");
//     setMicActive(false);
//   }, []);

//   // Video button logic
//   const handleVideoToggle = useCallback(() => {
//     if (videoState === "inactive") {
//       // Show the popup for source selection
//       setVideoState("selecting");
//     } else if (videoState === "selecting") {
//       // Cancel selection
//       setVideoState("inactive");
//     } else {
//       // active -> stop
//       stopMediaStream();
//     }
//   }, [videoState, stopMediaStream]);

//   // Source selection in popup
//   const handleSourceSelect = useCallback(
//     (source: "camera" | "screen") => {
//       startMediaStream(source);
//     },
//     []
//   );

//   // Microphone toggle
//   const handleMicToggle = useCallback(() => {
//     if (videoState !== "active") {
//       return;
//     }
//     setMicActive((prev) => !prev);
//     if (activeStreamRef.current) {
//       activeStreamRef.current.getAudioTracks().forEach((track) => {
//         track.enabled = !micActive;
//       });
//     }
//   }, [videoState, micActive]);

//   // Refresh button
//   const handleRefresh = () => {
//     console.log("Refresh triggered!");
//   };

//   // Zoom button logic
//   const handleZoom = () => {
//     setZoomLevel((prevZoom) => (prevZoom === 1 ? 1.5 : 1));
//   };

//   // Close or X button
//   const handleClose = useCallback(() => {
//     stopMediaStream();
//     console.log("Session ended (Close).");
//   }, [stopMediaStream]);

//   // Settings button
//   const handleSettings = useCallback(() => {
//     console.log("Settings clicked.");
//   }, []);

//   // Handle new user message from the control bar’s text input
//   const handleNewUserMessage = (msg: string) => {
//     // User bubble
//     setConversation((prev) => [...prev, { text: msg, sender: "user" }]);
//     // Simulated AI response
//     setTimeout(() => {
//       setConversation((prev) => [
//         ...prev,
//         { text: "AI response to: " + msg, sender: "ai" },
//       ]);
//     }, 800);
//   };

//   return (
//     <div className={styles.guruLiveContainer} style={{ background: "transparent" }}>
      
//       <h1 className="text-2xl font-bold mb-4">GURU Live</h1>
//          <p className="mb-4 text-gray-600">
//         Multimodal | Start interacting in real-time using text, voice, video or screen shairing
// </p>
//       {/* No separate background. Video + bubble overlay only. */}

     
//       {/* MAIN CONTENT: Only the video feed, with bubble overlay on top */}
//       <div className={styles.mainContent}>
//         <LiveVideoFeed
//           videoState={videoState}
//           micActive={micActive}
//           currentStream={activeStreamRef.current}
//           zoomLevel={zoomLevel}
//         />

//         {/* BUBBLE OVERLAY: AI = Purple, User = Green */}
//         <BubbleOverlay conversation={conversation} />
        
//         {/* TOP CONTROLS (Refresh & Zoom only) */}
//         <div className={styles.topControls}>
//           <button className={styles.refreshButton} onClick={handleRefresh} aria-label="Refresh">
//             &#x21bb; {/* Simple refresh icon */}
//           </button>

//           {/* Right side: Zoom only */}
//           <div className={styles.topRightControls}>
//             <button className={styles.zoomButton} onClick={handleZoom} aria-label="Zoom">
//               {zoomLevel === 1 ? "Zoom In" : "Zoom Out"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* BOTTOM CONTROL BAR */}
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
// };

// export default GuruLivePage;



/* /home/user/Guru-AI/app/application/guruLive/page.tsx */
"use client";

import React, { useState, useCallback, useRef } from "react";
import styles from "@/app/styles/guruLive.module.css";


// Components
import LiveVideoFeed from "@/components/LiveVideoFeed";
import VideoControlBar from "@/components/VideoControlBar";
import BubbleOverlay from "@/components/BubbleOverlay";

const GuruLivePage: React.FC = () => {
  // Conversation holds user vs. AI messages
  const [conversation, setConversation] = useState<{ text: string; sender: "ai" | "user" }[]>([]);

  // Microphone & Video states
  const [micActive, setMicActive] = useState(false);
  const [videoState, setVideoState] = useState<"inactive" | "selecting" | "active">("inactive");
  const [videoSource, setVideoSource] = useState<"camera" | "screen" | null>(null);

  // Manage an active MediaStream
  const activeStreamRef = useRef<MediaStream | null>(null);

  // Basic top controls: Refresh & Zoom
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // START or STOP a video+audio stream
  const startMediaStream = async (source: "camera" | "screen") => {
    try {
      let stream: MediaStream;
      if (source === "camera") {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
      } else {
        stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });
      }
      activeStreamRef.current = stream;
      setVideoSource(source);
      setVideoState("active");
      setMicActive(true);
    } catch (err) {
      console.error("Error requesting media:", err);
      setVideoSource(null);
      setVideoState("inactive");
      setMicActive(false);
    }
  };

  const stopMediaStream = useCallback(() => {
    if (activeStreamRef.current) {
      activeStreamRef.current.getTracks().forEach((track) => track.stop());
      activeStreamRef.current = null;
    }
    setVideoSource(null);
    setVideoState("inactive");
    setMicActive(false);
  }, []);

  // Video button logic
  const handleVideoToggle = useCallback(() => {
    if (videoState === "inactive") {
      // Show the popup for source selection
      setVideoState("selecting");
    } else if (videoState === "selecting") {
      // Cancel selection
      setVideoState("inactive");
    } else {
      // active -> stop
      stopMediaStream();
    }
  }, [videoState, stopMediaStream]);

  // Source selection in popup
  const handleSourceSelect = useCallback(
    (source: "camera" | "screen") => {
      startMediaStream(source);
    },
    []
  );

  // Microphone toggle
  const handleMicToggle = useCallback(() => {
    if (videoState !== "active") return;
    setMicActive((prev) => !prev);

    if (activeStreamRef.current) {
      activeStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !micActive;
      });
    }
  }, [videoState, micActive]);

  // Refresh button
  const handleRefresh = () => {
    console.log("Refresh triggered!");
  };

  // Zoom button logic
  const handleZoom = () => {
    setZoomLevel((prevZoom) => (prevZoom === 1 ? 1.5 : 1));
  };

  // Close or X button
  const handleClose = useCallback(() => {
    stopMediaStream();
    console.log("Session ended (Close).");
  }, [stopMediaStream]);

  // Settings button
  const handleSettings = useCallback(() => {
    console.log("Settings clicked.");
  }, []);

  // Handle new user message from the control bar’s text input
  const handleNewUserMessage = (msg: string) => {
    // User bubble
    setConversation((prev) => [...prev, { text: msg, sender: "user" }]);
    // Simulated AI response
    setTimeout(() => {
      setConversation((prev) => [
        ...prev,
        { text: "Kazuri Agent response to: " + msg, sender: "ai" },
      ]);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full w-full p-4">
      {/* Page Title & Description (like Brain page) */}
      <h1 className="text-2xl font-bold mb-4">GURU Live</h1>
      <p className="mb-4 text-gray-600">
        Multi-Modal | Start interacting in real-time using text, voice, video, or screen sharing
      </p>

      {/* 
        Outer layout: 
        - We mimic BrainPage with a flex row (if needed), 
          but here we only have the "video area".
      */}
      <div className="flex flex-row h-[600px] space-x-4">
        {/* 
          Main area with video feed + bubble overlay 
          - border, rounded, p-2 for a consistent look 
        */}
        <div className="flex-1 border rounded p-2 relative overflow-hidden">
          {/* The old 'mainContent' is now inside this wrapper */}
          <div className={styles.mainContent}>
            <LiveVideoFeed
              videoState={videoState}
              micActive={micActive}
              currentStream={activeStreamRef.current}
              zoomLevel={zoomLevel}
            />

            {/* BUBBLE OVERLAY: AI = Purple, User = Green */}
            <BubbleOverlay conversation={conversation} />

            {/* TOP CONTROLS (Refresh & Zoom only) */}
            <div className={styles.topControls}>
              <button
                className={styles.refreshButton}
                onClick={handleRefresh}
                aria-label="Refresh"
              >
                &#x21bb; {/* Simple refresh icon */}
              </button>

              {/* Right side: Zoom only */}
              <div className={styles.topRightControls}>
                <button
                  className={styles.zoomButton}
                  onClick={handleZoom}
                  aria-label="Zoom"
                >
                  {zoomLevel === 1 ? "Zoom In" : "Zoom Out"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM CONTROL BAR (remains fixed/absolute) */}
      <VideoControlBar
        videoState={videoState}
        onVideoToggle={handleVideoToggle}
        onSourceSelect={handleSourceSelect}
        micActive={micActive}
        onMicToggle={handleMicToggle}
        onClose={handleClose}
        onSettings={handleSettings}
        onNewUserMessage={handleNewUserMessage}
      />
    </div>
  );
};

export default GuruLivePage;

