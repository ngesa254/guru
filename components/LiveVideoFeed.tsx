// /* /home/user/Guru-AI/app/components/LiveVideoFeed.tsx */
// "use client";

// import React, { useRef, useEffect } from "react";

// interface LiveVideoFeedProps {
//   isMicActive: boolean;
// }

// const LiveVideoFeed: React.FC<LiveVideoFeedProps> = ({ isMicActive }) => {
//   const videoRef = useRef<HTMLVideoElement | null>(null);

//   useEffect(() => {
//     // Request camera permissions and start video feed
//     const startVideo = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           await videoRef.current.play();
//         }
//       } catch (error) {
//         console.error("Error accessing camera:", error);
//       }
//     };

//     startVideo();

//     return () => {
//       // Clean up: stop tracks if the component unmounts
//       if (videoRef.current && videoRef.current.srcObject) {
//         const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
//         tracks.forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   return (
//     <div style={{ position: "relative", width: "100%", height: "100%" }}>
//       <video
//         ref={videoRef}
//         style={{
//           width: "100%",
//           height: "100%",
//           objectFit: "cover",
//           borderRadius: "8px",
//         }}
//         muted
//       />
//       {/* Placeholder for real-time analysis or overlay when isMicActive is true */}
//       {isMicActive && (
//         <div
//           style={{
//             position: "absolute",
//             top: 16,
//             left: 16,
//             padding: "8px 16px",
//             backgroundColor: "rgba(255, 255, 255, 0.7)",
//             borderRadius: "4px",
//           }}
//         >
//           <span>Microphone is ON</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LiveVideoFeed;



// /* /home/user/Guru-AI/app/components/LiveVideoFeed.tsx */
// "use client";

// import React, { useRef, useEffect } from "react";

// interface LiveVideoFeedProps {
//   isMicActive: boolean;
//   videoActive: boolean;
// }

// const LiveVideoFeed: React.FC<LiveVideoFeedProps> = ({ isMicActive, videoActive }) => {
//   const videoRef = useRef<HTMLVideoElement | null>(null);

//   useEffect(() => {
//     // Request camera permissions and start video feed
//     const startVideo = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: false,
//         });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           await videoRef.current.play();
//         }
//       } catch (error) {
//         console.error("Error accessing camera:", error);
//       }
//     };

//     startVideo();

//     return () => {
//       // Clean up: stop tracks if the component unmounts
//       if (videoRef.current && videoRef.current.srcObject) {
//         const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
//         tracks.forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   // Placeholder effect: if videoActive is false, we can pause video, etc.
//   useEffect(() => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       if (!videoActive) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play().catch((err) => {
//           console.error("Error playing video:", err);
//         });
//       }
//     }
//   }, [videoActive]);

//   return (
//     <div style={{ position: "relative", width: "100%", height: "100%" }}>
//       <video
//         ref={videoRef}
//         style={{
//           width: "100%",
//           height: "100%",
//           objectFit: "cover",
//           borderRadius: "8px",
//         }}
//         muted
//       />
//       {/* Placeholder for real-time analysis or overlay when isMicActive is true */}
//       {isMicActive && (
//         <div
//           style={{
//             position: "absolute",
//             top: 16,
//             left: 16,
//             padding: "8px 16px",
//             backgroundColor: "rgba(255, 255, 255, 0.7)",
//             borderRadius: "4px",
//           }}
//         >
//           <span>Microphone is ON</span>
//         </div>
//       )}
//       {!videoActive && (
//         <div
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             backgroundColor: "rgba(0,0,0,0.5)",
//             color: "white",
//             padding: "8px 16px",
//             borderRadius: "4px",
//           }}
//         >
//           Video Off
//         </div>
//       )}
//     </div>
//   );
// };

// export default LiveVideoFeed;




// /* /home/user/Guru-AI/app/components/LiveVideoFeed.tsx */
// "use client";

// import React, { useEffect, useRef } from "react";

// interface LiveVideoFeedProps {
//   videoState: "inactive" | "selecting" | "active";
//   micActive: boolean;
//   currentStream: MediaStream | null;
// }

// const LiveVideoFeed: React.FC<LiveVideoFeedProps> = ({
//   videoState,
//   micActive,
//   currentStream,
// }) => {
//   const videoRef = useRef<HTMLVideoElement | null>(null);

//   // Attach or detach the MediaStream to the <video> element
//   useEffect(() => {
//     if (!videoRef.current) return;
//     if (videoState === "active" && currentStream) {
//       videoRef.current.srcObject = currentStream;
//       videoRef.current
//         .play()
//         .catch((err) => console.error("Error playing video:", err));
//     } else {
//       // Stop video
//       videoRef.current.srcObject = null;
//     }
//   }, [videoState, currentStream]);

//   // If micActive changes, we can enable or disable audio tracks here
//   useEffect(() => {
//     if (currentStream) {
//       currentStream.getAudioTracks().forEach((track) => {
//         track.enabled = micActive;
//       });
//     }
//   }, [micActive, currentStream]);

//   return (
//     <div style={{ position: "relative", width: "100%", height: "100%" }}>
//       <video
//         ref={videoRef}
//         style={{
//           width: "100%",
//           height: "100%",
//           objectFit: "cover",
//           borderRadius: "8px",
//         }}
//         muted={!micActive}
//       />

//       {/* Show labels if videoState is inactive or selecting */}
//       {videoState !== "active" && (
//         <div
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             backgroundColor: "rgba(0,0,0,0.6)",
//             color: "#fff",
//             padding: "8px 16px",
//             borderRadius: "4px",
//           }}
//         >
//           {videoState === "inactive" && <span>Video Inactive</span>}
//           {videoState === "selecting" && <span>Selecting Video Source...</span>}
//         </div>
//       )}
//       {videoState === "active" && micActive && (
//         <div
//           style={{
//             position: "absolute",
//             top: 16,
//             left: 16,
//             padding: "8px 16px",
//             backgroundColor: "rgba(255, 0, 0, 0.7)",
//             borderRadius: "4px",
//             color: "#fff",
//           }}
//         >
//           Microphone: ON
//         </div>
//       )}
//     </div>
//   );
// };

// export default LiveVideoFeed;




// /* /home/user/Guru-AI/app/components/LiveVideoFeed.tsx */
// "use client";

// import React, { useEffect, useRef } from "react";

// interface LiveVideoFeedProps {
//   videoState: "inactive" | "selecting" | "active";
//   micActive: boolean;
//   currentStream: MediaStream | null;
//   zoomLevel: number;
// }

// const LiveVideoFeed: React.FC<LiveVideoFeedProps> = ({
//   videoState,
//   micActive,
//   currentStream,
//   zoomLevel,
// }) => {
//   const videoRef = useRef<HTMLVideoElement | null>(null);

//   // Attach or detach the MediaStream to the <video> element
//   useEffect(() => {
//     if (!videoRef.current) return;
//     if (videoState === "active" && currentStream) {
//       videoRef.current.srcObject = currentStream;
//       videoRef.current
//         .play()
//         .catch((err) => console.error("Error playing video:", err));
//     } else {
//       videoRef.current.srcObject = null;
//     }
//   }, [videoState, currentStream]);

//   // If micActive changes, we can enable or disable audio tracks
//   useEffect(() => {
//     if (currentStream) {
//       currentStream.getAudioTracks().forEach((track) => {
//         track.enabled = micActive;
//       });
//     }
//   }, [micActive, currentStream]);

//   // We'll apply a CSS transform for zoom
//   return (
//     <div
//       style={{
//         position: "relative",
//         width: "100%",
//         height: "100%",
//         overflow: "hidden",
//         borderRadius: "8px",
//         transform: `scale(${zoomLevel})`,
//         transformOrigin: "center center",
//         transition: "transform 0.3s ease-in-out",
//       }}
//     >
//       <video
//         ref={videoRef}
//         style={{
//           width: "100%",
//           height: "100%",
//           objectFit: "cover",
//         }}
//         muted={!micActive}
//       />
//       {/* If inactive or selecting, optionally show an overlay message */}
//       {videoState !== "active" && (
//         <div
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             backgroundColor: "rgba(0,0,0,0.6)",
//             color: "#fff",
//             padding: "8px 16px",
//             borderRadius: "4px",
//           }}
//         >
//           {videoState === "inactive" && <span>Video Inactive</span>}
//           {videoState === "selecting" && <span>Selecting Video Source...</span>}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LiveVideoFeed;


/* /home/user/Guru-AI/app/components/LiveVideoFeed.tsx */
/**
 * Renders camera or screen feed in a <video> element. 
 * Applies a CSS transform for zoom in/out. 
 * If not active, shows an overlay "Video Inactive" or "Selecting Video Source..."
 */

// "use client";

// import React, { useEffect, useRef } from "react";

// interface LiveVideoFeedProps {
//   videoState: "inactive" | "selecting" | "active";
//   micActive: boolean;
//   currentStream: MediaStream | null;
//   zoomLevel: number;
// }

// const LiveVideoFeed: React.FC<LiveVideoFeedProps> = ({
//   videoState,
//   micActive,
//   currentStream,
//   zoomLevel,
// }) => {
//   const videoRef = useRef<HTMLVideoElement | null>(null);

//   useEffect(() => {
//     if (!videoRef.current) return;
//     if (videoState === "active" && currentStream) {
//       videoRef.current.srcObject = currentStream;
//       videoRef.current.play().catch((err) => console.error("Error playing video:", err));
//     } else {
//       videoRef.current.srcObject = null;
//     }
//   }, [videoState, currentStream]);

//   useEffect(() => {
//     if (currentStream) {
//       currentStream.getAudioTracks().forEach((track) => {
//         track.enabled = micActive;
//       });
//     }
//   }, [micActive, currentStream]);

//   return (
//     <div
//       style={{
//         position: "relative",
//         width: "100%",
//         height: "100%",
//         overflow: "hidden",
//         borderRadius: "8px",
//         transform: `scale(${zoomLevel})`,
//         transformOrigin: "center center",
//         transition: "transform 0.3s ease-in-out",
//       }}
//     >
//       <video
//         ref={videoRef}
//         style={{ width: "100%", height: "100%", objectFit: "cover" }}
//         muted={!micActive}
//       />
//       {videoState !== "active" && (
//         <div
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             backgroundColor: "rgba(0,0,0,0.6)",
//             color: "#fff",
//             padding: "8px 16px",
//             borderRadius: "4px",
//           }}
//         >
//           {videoState === "inactive" && <span>Video Inactive</span>}
//           {videoState === "selecting" && <span>Selecting Video Source...</span>}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LiveVideoFeed;




// /* /home/user/Guru-AI/app/components/LiveVideoFeed.tsx */
// "use client";

// import React, { useEffect, useRef } from "react";

// interface LiveVideoFeedProps {
//   stream: MediaStream | null;
//   isActive: boolean;   // e.g. “videoState === 'active'”
//   micActive: boolean;  // if you want to mute/unmute local audio track
//   zoomLevel: number;
// }

// /**
//  * Replaces your simpler approach with a more general "stream" prop 
//  * that you get from useMediaStreamMux (or from your container).
//  */
// const LiveVideoFeed: React.FC<LiveVideoFeedProps> = ({
//   stream,
//   isActive,
//   micActive,
//   zoomLevel,
// }) => {
//   const videoRef = useRef<HTMLVideoElement | null>(null);

//   useEffect(() => {
//     if (!videoRef.current) return;
//     if (isActive && stream) {
//       videoRef.current.srcObject = stream;
//       videoRef.current
//         .play()
//         .catch((err) => console.error("Error playing video:", err));
//     } else {
//       videoRef.current.srcObject = null;
//     }
//   }, [stream, isActive]);

//   // Enable/disable audio tracks
//   useEffect(() => {
//     if (stream) {
//       stream.getAudioTracks().forEach((track) => {
//         track.enabled = micActive;
//       });
//     }
//   }, [micActive, stream]);

//   return (
//     <div
//       style={{
//         position: "relative",
//         width: "100%",
//         height: "100%",
//         overflow: "hidden",
//         borderRadius: "8px",
//         transform: `scale(${zoomLevel})`,
//         transformOrigin: "center center",
//         transition: "transform 0.3s ease-in-out",
//       }}
//     >
//       <video
//         ref={videoRef}
//         style={{ width: "100%", height: "100%", objectFit: "cover" }}
//         muted={!micActive}
//       />
//       {!isActive && (
//         <div
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             backgroundColor: "rgba(0,0,0,0.6)",
//             color: "#fff",
//             padding: "8px 16px",
//             borderRadius: "4px",
//           }}
//         >
//           <span>Video Inactive</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LiveVideoFeed;



/* /home/user/Guru-AI/app/components/LiveVideoFeed.tsx */
"use client";

import React, { useRef, useEffect } from "react";

interface LiveVideoFeedProps {
  stream: MediaStream | null;
  isActive: boolean;
  micActive: boolean;
  zoomLevel: number;
}

const LiveVideoFeed: React.FC<LiveVideoFeedProps> = ({
  stream,
  isActive,
  micActive,
  zoomLevel,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isActive && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current
        .play()
        .catch((err) => console.error("Error playing video:", err));
    } else {
      videoRef.current.srcObject = null;
    }
  }, [stream, isActive]);

  // If we want local mic unmute:
  useEffect(() => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = micActive;
      });
    }
  }, [micActive, stream]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: "8px",
        transform: `scale(${zoomLevel})`,
        transformOrigin: "center center",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <video
        ref={videoRef}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        muted={!micActive}
      />
      {!isActive && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0,0,0,0.6)",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "4px",
          }}
        >
          <span>Video Inactive</span>
        </div>
      )}
    </div>
  );
};

export default LiveVideoFeed;
