// /* /home/user/Guru-AI/app/components/VideoControlBar.tsx */
// "use client";

// import React from "react";
// import { IoMdClose } from "react-icons/io";
// import { IoMdSettings } from "react-icons/io";
// import { IoMdMicOff, IoMdMic } from "react-icons/io";
// import { FaVideoSlash, FaVideo } from "react-icons/fa";

// interface VideoControlBarProps {
//   onClose: () => void;
//   onMicToggle: () => void;
//   onVideoToggle: () => void;
//   onSettings: () => void;
//   micActive: boolean;
//   videoActive: boolean;
// }

// const VideoControlBar: React.FC<VideoControlBarProps> = ({
//   onClose,
//   onMicToggle,
//   onVideoToggle,
//   onSettings,
//   micActive,
//   videoActive,
// }) => {
//   /**
//    * Style Explanation:
//    * - Absolute bottom center, ~48px height
//    * - Translucent background: rgba(128, 128, 128, 0.7)
//    * - Frosted glass effect: backdrop-blur
//    * - Drop shadow: rgba(0, 0, 0, 0.15)
//    * - Four circular buttons spaced out ~16px
//    * - Hover states and active states as specified
//    */
//   return (
//     <div
//       className={`
//         fixed 
//         bottom-4 
//         left-1/2 
//         transform 
//         -translate-x-1/2 
//         flex 
//         items-center 
//         justify-center 
//         px-4 
//         py-2 
//         space-x-4 
//         rounded-full
//         bg-[rgba(128,128,128,0.7)] 
//         backdrop-blur-md 
//         shadow-md 
//         shadow-[rgba(0,0,0,0.15)]
//       `}
//       style={{ height: "48px" }}
//       aria-label="Video Control Bar"
//     >
//       {/* Close Button */}
//       <button
//         type="button"
//         onClick={onClose}
//         aria-label="Close"
//         title="Close"
//         className={`
//           relative 
//           w-10 
//           h-10 
//           flex 
//           items-center 
//           justify-center 
//           rounded-full 
//           border 
//           border-white 
//           text-white
//           hover:bg-[rgba(128,128,128,0.3)] 
//           transition-colors 
//           focus:outline-none
//           focus:ring 
//           focus:ring-white 
//           focus:ring-offset-0
//         `}
//       >
//         <IoMdClose size={18} />
//       </button>

//       {/* Microphone Button */}
//       <button
//         type="button"
//         onClick={onMicToggle}
//         aria-label="Microphone"
//         title={micActive ? "Mute Microphone" : "Unmute Microphone"}
//         className={`
//           relative 
//           w-12 
//           h-12 
//           flex 
//           items-center 
//           justify-center 
//           rounded-full 
//           text-white
//           transition-colors 
//           focus:outline-none
//           focus:ring 
//           focus:ring-white 
//           focus:ring-offset-0
//           shadow
//           ${micActive 
//             ? "bg-[rgb(255,0,30)] hover:bg-red-600" 
//             : "bg-[#00BFFF] hover:bg-cyan-400"
//           }
//         `}
//       >
//         {micActive ? <IoMdMic size={20} /> : <IoMdMicOff size={20} />}
//       </button>

//       {/* Video Button */}
//       <button
//         type="button"
//         onClick={onVideoToggle}
//         aria-label="Video"
//         title={videoActive ? "Turn Off Video" : "Turn On Video"}
//         className={`
//           relative 
//           w-12 
//           h-12 
//           flex 
//           items-center 
//           justify-center 
//           rounded-full 
//           text-white
//           transition-colors 
//           focus:outline-none
//           focus:ring 
//           focus:ring-white 
//           focus:ring-offset-0
//           shadow
//           ${videoActive 
//             ? "bg-[rgb(255,0,30)] hover:bg-red-600" 
//             : "bg-[#00BFFF] hover:bg-cyan-400"
//           }
//         `}
//       >
//         {videoActive ? <FaVideo size={18} /> : <FaVideoSlash size={18} />}
//       </button>

//       {/* Settings Button */}
//       <button
//         type="button"
//         onClick={onSettings}
//         aria-label="Settings"
//         title="Settings"
//         className={`
//           relative 
//           w-10 
//           h-10 
//           flex 
//           items-center 
//           justify-center 
//           rounded-full 
//           border 
//           border-white 
//           text-white
//           hover:bg-[rgba(128,128,128,0.3)] 
//           transition-colors 
//           focus:outline-none
//           focus:ring 
//           focus:ring-white 
//           focus:ring-offset-0
//         `}
//       >
//         <IoMdSettings size={18} />
//       </button>
//     </div>
//   );
// };

// export default VideoControlBar;






// /* /home/user/Guru-AI/app/components/VideoControlBar.tsx */
// "use client";

// import React, { useState, useRef, MouseEvent } from "react";
// import { IoMdClose, IoMdSettings, IoMdMicOff, IoMdMic } from "react-icons/io";
// import { FaVideoSlash, FaVideo } from "react-icons/fa";

// /** 
//  * The videoState can be:
//  * 'inactive'   (gray button),
//  * 'selecting'  (shows source menu),
//  * 'active'     (red button).
//  */
// interface VideoControlBarProps {
//   videoState: "inactive" | "selecting" | "active";
//   onVideoToggle: () => void;
//   onSourceSelect: (source: "camera" | "screen") => void;
//   micActive: boolean;
//   onMicToggle: () => void;
//   onClose: () => void;
//   onSettings: () => void;
// }

// const VideoControlBar: React.FC<VideoControlBarProps> = ({
//   videoState,
//   onVideoToggle,
//   onSourceSelect,
//   micActive,
//   onMicToggle,
//   onClose,
//   onSettings,
// }) => {
//   const [showMenu, setShowMenu] = useState(false);
//   const containerRef = useRef<HTMLDivElement>(null);

//   // "Ripple" effect: minimal custom approach for demonstration
//   const createRipple = (e: MouseEvent<HTMLElement>) => {
//     const button = e.currentTarget as HTMLElement;
//     const circle = document.createElement("span");
//     const diameter = Math.max(button.clientWidth, button.clientHeight);
//     const radius = diameter / 2;

//     circle.style.width = circle.style.height = `${diameter}px`;
//     circle.style.left = `${e.clientX - (button.offsetLeft + radius)}px`;
//     circle.style.top = `${e.clientY - (button.offsetTop + radius)}px`;
//     circle.classList.add("ripple");

//     // Remove old ripple if any
//     const ripple = button.getElementsByClassName("ripple")[0];
//     if (ripple) {
//       ripple.remove();
//     }
//     button.appendChild(circle);
//   };

//   // Handle click on the video button
//   const handleVideoClick = (e: MouseEvent<HTMLElement>) => {
//     createRipple(e);
//     if (videoState === "inactive") {
//       // Show popup
//       setShowMenu(true);
//       onVideoToggle(); // sets videoState to 'selecting'
//     } else if (videoState === "selecting") {
//       // The user is re-clicking the video button while the menu is open.
//       // Hide the menu & revert to inactive
//       setShowMenu(false);
//       onVideoToggle();
//     } else {
//       // active -> turn off
//       onVideoToggle();
//     }
//   };

//   // Handle source selection from popup
//   const handleSourceSelect = (source: "camera" | "screen") => {
//     setShowMenu(false);
//     onSourceSelect(source);
//   };

//   // Determine button color for video
//   const videoBtnColor = 
//     videoState === "active"
//       ? "bg-[rgb(255,0,30)] hover:bg-red-600"
//       : videoState === "selecting"
//       ? "bg-[#f0f0f0] hover:bg-[#e4e4e4]" // or something neutral
//       : "bg-[#d3d3d3] hover:bg-[#c0c0c0]"; // 'inactive'

//   // Microphone button color
//   const micBtnColor = micActive
//     ? "bg-[rgb(255,0,30)] hover:bg-red-600"
//     : "bg-[#d3d3d3] hover:bg-[#c0c0c0]";

//   return (
//     <div
//       ref={containerRef}
//       className={`
//         fixed 
//         bottom-4 
//         left-1/2 
//         transform 
//         -translate-x-1/2 
//         flex 
//         items-center 
//         justify-center 
//         px-4 
//         py-2 
//         space-x-4 
//         rounded-full
//         bg-[rgba(128,128,128,0.7)] 
//         backdrop-blur-md 
//         shadow-md 
//         shadow-[rgba(0,0,0,0.15)]
//       `}
//       style={{ height: "48px" }}
//       aria-label="Video Control Bar"
//     >
//       {/* Close Button */}
//       <button
//         type="button"
//         onClick={(e) => {
//           createRipple(e);
//           onClose();
//         }}
//         onMouseDown={createRipple}
//         aria-label="Close"
//         title="Close"
//         className={`
//           relative 
//           w-10 
//           h-10 
//           flex 
//           items-center 
//           justify-center 
//           rounded-full 
//           border 
//           border-white 
//           text-white
//           overflow-hidden
//           focus:outline-none
//           focus:ring 
//           focus:ring-white 
//           focus:ring-offset-0
//         `}
//       >
//         <IoMdClose size={18} />
//       </button>

//       {/* Microphone Button */}
//       <button
//         type="button"
//         onClick={(e) => {
//           createRipple(e);
//           onMicToggle();
//         }}
//         onMouseDown={createRipple}
//         aria-label="Microphone"
//         title={micActive ? "Mute Microphone" : "Unmute Microphone"}
//         className={`
//           relative 
//           w-10 
//           h-10 
//           flex 
//           items-center 
//           justify-center 
//           rounded-full 
//           text-white
//           overflow-hidden
//           focus:outline-none
//           focus:ring 
//           focus:ring-white 
//           focus:ring-offset-0
//           transition-colors 
//           ${micBtnColor}
//         `}
//       >
//         {micActive ? <IoMdMic size={18} /> : <IoMdMicOff size={18} />}
//       </button>

//       {/* Video Button */}
//       <button
//         type="button"
//         onClick={handleVideoClick}
//         onMouseDown={createRipple}
//         aria-label="Video"
//         title={
//           videoState === "inactive"
//             ? "Select a video source"
//             : videoState === "selecting"
//             ? "Cancel source selection"
//             : "Stop Video"
//         }
//         className={`
//           relative 
//           w-10 
//           h-10 
//           flex 
//           items-center 
//           justify-center 
//           rounded-full 
//           text-white
//           overflow-hidden
//           focus:outline-none
//           focus:ring 
//           focus:ring-white 
//           focus:ring-offset-0
//           transition-colors 
//           ${videoBtnColor}
//         `}
//       >
//         {videoState === "active" ? (
//           <FaVideo size={18} />
//         ) : (
//           <FaVideoSlash size={18} />
//         )}
//       </button>

//       {/* Settings Button */}
//       <button
//         type="button"
//         onClick={(e) => {
//           createRipple(e);
//           onSettings();
//         }}
//         onMouseDown={createRipple}
//         aria-label="Settings"
//         title="Settings"
//         className={`
//           relative 
//           w-10 
//           h-10 
//           flex 
//           items-center 
//           justify-center 
//           rounded-full 
//           border 
//           border-white 
//           text-white
//           overflow-hidden
//           focus:outline-none
//           focus:ring 
//           focus:ring-white 
//           focus:ring-offset-0
//         `}
//       >
//         <IoMdSettings size={18} />
//       </button>

//       {/* Popup Menu for video source selection */}
//       {showMenu && videoState === "selecting" && (
//         <div
//           className={`
//             absolute 
//             bottom-[60px] /* place it above the bar */
//             flex 
//             flex-col 
//             bg-white 
//             text-gray-800 
//             rounded 
//             shadow-lg 
//             py-2 
//             min-w-[120px]
//             z-50
//           `}
//           role="menu"
//           aria-label="Select Video Source"
//         >
//           {/* Camera Option */}
//           <button
//             type="button"
//             className={`
//               w-full
//               px-4
//               py-2
//               text-left
//               hover:bg-gray-100
//               focus:bg-gray-200
//               focus:outline-none
//               ripple-button
//             `}
//             role="menuitem"
//             onClick={() => handleSourceSelect("camera")}
//           >
//             Camera
//           </button>

//           {/* Screen Option */}
//           <button
//             type="button"
//             className={`
//               w-full
//               px-4
//               py-2
//               text-left
//               hover:bg-gray-100
//               focus:bg-gray-200
//               focus:outline-none
//               ripple-button
//             `}
//             role="menuitem"
//             onClick={() => handleSourceSelect("screen")}
//           >
//             Screen
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoControlBar;




// /* /home/user/Guru-AI/app/components/VideoControlBar.tsx */
// "use client";

// import React, { useState, useRef, MouseEvent, FormEvent } from "react";
// import { IoMdClose, IoMdSettings, IoMdMicOff, IoMdMic } from "react-icons/io";
// import { FaVideoSlash, FaVideo } from "react-icons/fa";

// /** 
//  * The videoState can be:
//  * 'inactive'   (gray button),
//  * 'selecting'  (shows source menu),
//  * 'active'     (red button).
//  */
// interface VideoControlBarProps {
//   videoState: "inactive" | "selecting" | "active";
//   onVideoToggle: () => void;
//   onSourceSelect: (source: "camera" | "screen") => void;
//   micActive: boolean;
//   onMicToggle: () => void;
//   onClose: () => void;
//   onSettings: () => void;
//   onNewUserMessage: (msg: string) => void; // new
// }

// const VideoControlBar: React.FC<VideoControlBarProps> = ({
//   videoState,
//   onVideoToggle,
//   onSourceSelect,
//   micActive,
//   onMicToggle,
//   onClose,
//   onSettings,
//   onNewUserMessage,
// }) => {
//   // For showing the camera/screen menu
//   const [showMenu, setShowMenu] = useState(false);
//   // For user text input
//   const [draftMessage, setDraftMessage] = useState("");
//   const containerRef = useRef<HTMLDivElement>(null);

//   // "Ripple" effect
//   const createRipple = (e: MouseEvent<HTMLElement>) => {
//     const button = e.currentTarget as HTMLElement;
//     const circle = document.createElement("span");
//     const diameter = Math.max(button.clientWidth, button.clientHeight);
//     const radius = diameter / 2;

//     circle.style.width = circle.style.height = `${diameter}px`;
//     circle.style.left = `${e.clientX - (button.offsetLeft + radius)}px`;
//     circle.style.top = `${e.clientY - (button.offsetTop + radius)}px`;
//     circle.classList.add("ripple");

//     const ripple = button.getElementsByClassName("ripple")[0];
//     if (ripple) {
//       ripple.remove();
//     }
//     button.appendChild(circle);
//   };

//   const handleVideoClick = (e: MouseEvent<HTMLElement>) => {
//     createRipple(e);
//     if (videoState === "inactive") {
//       setShowMenu(true);
//       onVideoToggle(); // sets videoState to 'selecting'
//     } else if (videoState === "selecting") {
//       setShowMenu(false);
//       onVideoToggle(); // revert to 'inactive'
//     } else {
//       onVideoToggle(); // 'active' -> stop
//     }
//   };

//   const handleSourceSelect = (source: "camera" | "screen") => {
//     setShowMenu(false);
//     onSourceSelect(source);
//   };

//   // Button colors
//   const videoBtnColor = 
//     videoState === "active"
//       ? "bg-[rgb(255,0,30)] hover:bg-red-600"
//       : videoState === "selecting"
//       ? "bg-[#f0f0f0] hover:bg-[#e4e4e4]"
//       : "bg-[#d3d3d3] hover:bg-[#c0c0c0]";

//   const micBtnColor = micActive
//     ? "bg-[rgb(255,0,30)] hover:bg-red-600"
//     : "bg-[#d3d3d3] hover:bg-[#c0c0c0]";

//   // Handle sending a chat message from the bottom bar
//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     if (!draftMessage.trim()) return;
//     onNewUserMessage(draftMessage.trim());
//     setDraftMessage("");
//   };

//   return (
//     <div
//       ref={containerRef}
//       className={`
//         fixed 
//         bottom-4 
//         left-1/2 
//         transform 
//         -translate-x-1/2 
//         flex 
//         items-center 
//         justify-center 
//         px-4 
//         py-2 
//         space-x-4 
//         rounded-full
//         bg-[rgba(128,128,128,0.7)] 
//         backdrop-blur-md 
//         shadow-md 
//         shadow-[rgba(0,0,0,0.15)]
//       `}
//       style={{ height: "48px" }}
//       aria-label="Video Control Bar"
//     >
//       {/* Close Button */}
//       <button
//         type="button"
//         onClick={(e) => {
//           createRipple(e);
//           onClose();
//         }}
//         onMouseDown={createRipple}
//         aria-label="Close"
//         title="Close"
//         className={`
//           relative 
//           w-10 
//           h-10 
//           flex 
//           items-center 
//           justify-center 
//           rounded-full 
//           border 
//           border-white 
//           text-white
//           overflow-hidden
//           focus:outline-none
//           focus:ring 
//           focus:ring-white 
//           focus:ring-offset-0
//         `}
//       >
//         <IoMdClose size={18} />
//       </button>

//       {/* Microphone Button */}
//       <button
//         type="button"
//         onClick={(e) => {
//           createRipple(e);
//           onMicToggle();
//         }}
//         onMouseDown={createRipple}
//         aria-label="Microphone"
//         title={micActive ? "Mute Microphone" : "Unmute Microphone"}
//         className={`
//           relative 
//           w-10 
//           h-10 
//           flex 
//           items-center 
//           justify-center 
//           rounded-full 
//           text-white
//           overflow-hidden
//           focus:outline-none
//           focus:ring 
//           focus:ring-white 
//           focus:ring-offset-0
//           transition-colors 
//           ${micBtnColor}
//         `}
//       >
//         {micActive ? <IoMdMic size={18} /> : <IoMdMicOff size={18} />}
//       </button>

//       {/* Text Input for user messages (moved here!) */}
//       <form onSubmit={handleSubmit} className="flex items-center">
//         <input
//           type="text"
//           placeholder="Engage Kazuri..."
//           className={`
//             w-36
//             sm:w-48
//             md:w-56
//             lg:w-64
//             px-2
//             py-1
//             rounded
//             text-black
//             focus:outline-none
//             focus:ring
//             focus:ring-white
//             focus:ring-offset-0
//           `}
//           value={draftMessage}
//           onChange={(e) => setDraftMessage(e.target.value)}
//         />
//         <button
//           type="submit"
//           aria-label="Send"
//           className={`
//             ml-2
//             text-white
//             bg-blue-600 
//             px-3 
//             py-1 
//             rounded 
//             hover:bg-blue-500
//             focus:outline-none
//             focus:ring 
//             focus:ring-white
//             focus:ring-offset-0
//           `}
//         >
//           Send
//         </button>
//       </form>

//       {/* Video Button */}
//       <button
//         type="button"
//         onClick={handleVideoClick}
//         onMouseDown={createRipple}
//         aria-label="Video"
//         title={
//           videoState === "inactive"
//             ? "Select a video source"
//             : videoState === "selecting"
//             ? "Cancel source selection"
//             : "Stop Video"
//         }
//         className={`
//           relative 
//           w-10 
//           h-10 
//           flex 
//           items-center 
//           justify-center 
//           rounded-full 
//           text-white
//           overflow-hidden
//           focus:outline-none
//           focus:ring 
//           focus:ring-white 
//           focus:ring-offset-0
//           transition-colors 
//           ${videoBtnColor}
//         `}
//       >
//         {videoState === "active" ? (
//           <FaVideo size={18} />
//         ) : (
//           <FaVideoSlash size={18} />
//         )}
//       </button>

//       {/* Settings Button */}
//       <button
//         type="button"
//         onClick={(e) => {
//           createRipple(e);
//           onSettings();
//         }}
//         onMouseDown={createRipple}
//         aria-label="Settings"
//         title="Settings"
//         className={`
//           relative 
//           w-10 
//           h-10 
//           flex 
//           items-center 
//           justify-center 
//           rounded-full 
//           border 
//           border-white 
//           text-white
//           overflow-hidden
//           focus:outline-none
//           focus:ring 
//           focus:ring-white 
//           focus:ring-offset-0
//         `}
//       >
//         <IoMdSettings size={18} />
//       </button>

//       {/* Popup Menu for video source selection */}
//       {showMenu && videoState === "selecting" && (
//         <div
//           className={`
//             absolute 
//             bottom-[60px] /* place it above the bar */
//             flex 
//             flex-col 
//             bg-white 
//             text-gray-800 
//             rounded 
//             shadow-lg 
//             py-2 
//             min-w-[120px]
//             z-50
//           `}
//           role="menu"
//           aria-label="Select Video Source"
//         >
//           <button
//             type="button"
//             className={`
//               w-full
//               px-4
//               py-2
//               text-left
//               hover:bg-gray-100
//               focus:bg-gray-200
//               focus:outline-none
//             `}
//             role="menuitem"
//             onClick={() => handleSourceSelect("camera")}
//           >
//             Camera
//           </button>
//           <button
//             type="button"
//             className={`
//               w-full
//               px-4
//               py-2
//               text-left
//               hover:bg-gray-100
//               focus:bg-gray-200
//               focus:outline-none
//             `}
//             role="menuitem"
//             onClick={() => handleSourceSelect("screen")}
//           >
//             Screen
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoControlBar;



/* /home/user/Guru-AI/app/components/VideoControlBar.tsx */
/**
 * Bottom bar with:
 * - Close button
 * - Microphone toggle
 * - Text input for user chat
 * - Video toggle (camera/screen)
 * - Settings
 * 
 * This bar remains fixed at bottom center. 
 * We do not rename or remove it; simply show it as-is.
 */

"use client";

import React, { useState, useRef, MouseEvent, FormEvent } from "react";
import { IoMdClose, IoMdSettings, IoMdMicOff, IoMdMic } from "react-icons/io";
import { FaVideoSlash, FaVideo } from "react-icons/fa";

interface VideoControlBarProps {
  videoState: "inactive" | "selecting" | "active";
  onVideoToggle: () => void;
  onSourceSelect: (source: "camera" | "screen") => void;
  micActive: boolean;
  onMicToggle: () => void;
  onClose: () => void;
  onSettings: () => void;
  onNewUserMessage: (msg: string) => void;
}

const VideoControlBar: React.FC<VideoControlBarProps> = ({
  videoState,
  onVideoToggle,
  onSourceSelect,
  micActive,
  onMicToggle,
  onClose,
  onSettings,
  onNewUserMessage,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [draftMessage, setDraftMessage] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const createRipple = (e: MouseEvent<HTMLElement>) => {
    const button = e.currentTarget as HTMLElement;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - (button.offsetLeft + radius)}px`;
    circle.style.top = `${e.clientY - (button.offsetTop + radius)}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }
    button.appendChild(circle);
  };

  const handleVideoClick = (e: MouseEvent<HTMLElement>) => {
    createRipple(e);
    if (videoState === "inactive") {
      setShowMenu(true);
      onVideoToggle();
    } else if (videoState === "selecting") {
      setShowMenu(false);
      onVideoToggle();
    } else {
      onVideoToggle();
    }
  };

  const handleSourceSelect = (source: "camera" | "screen") => {
    setShowMenu(false);
    onSourceSelect(source);
  };

  const videoBtnColor =
    videoState === "active"
      ? "bg-[rgb(255,0,30)] hover:bg-red-600"
      : videoState === "selecting"
      ? "bg-[#f0f0f0] hover:bg-[#e4e4e4]"
      : "bg-[#d3d3d3] hover:bg-[#c0c0c0]";

  const micBtnColor = micActive
    ? "bg-[rgb(255,0,30)] hover:bg-red-600"
    : "bg-[#d3d3d3] hover:bg-[#c0c0c0]";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!draftMessage.trim()) return;
    onNewUserMessage(draftMessage.trim());
    setDraftMessage("");
  };

  return (
    <div
      ref={containerRef}
      className={`
        fixed 
        bottom-4 
        left-1/2 
        transform 
        -translate-x-1/2 
        flex 
        items-center 
        justify-center 
        px-4 
        py-2 
        space-x-4 
        rounded-full
        bg-[rgba(128,128,128,0.7)] 
        backdrop-blur-md 
        shadow-md 
        shadow-[rgba(0,0,0,0.15)]
      `}
      style={{ height: "48px" }}
      aria-label="Video Control Bar"
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={(e) => {
          createRipple(e);
          onClose();
        }}
        onMouseDown={createRipple}
        aria-label="Close"
        title="Close"
        className={`
          relative 
          w-10 
          h-10 
          flex 
          items-center 
          justify-center 
          rounded-full 
          border 
          border-white 
          text-white
          overflow-hidden
          focus:outline-none
          focus:ring 
          focus:ring-white 
          focus:ring-offset-0
        `}
      >
        <IoMdClose size={18} />
      </button>

      {/* Microphone Button */}
      <button
        type="button"
        onClick={(e) => {
          createRipple(e);
          onMicToggle();
        }}
        onMouseDown={createRipple}
        aria-label="Microphone"
        title={micActive ? "Mute Microphone" : "Unmute Microphone"}
        className={`
          relative 
          w-10 
          h-10 
          flex 
          items-center 
          justify-center 
          rounded-full 
          text-white
          overflow-hidden
          focus:outline-none
          focus:ring 
          focus:ring-white 
          focus:ring-offset-0
          transition-colors 
          ${micBtnColor}
        `}
      >
        {micActive ? <IoMdMic size={18} /> : <IoMdMicOff size={18} />}
      </button>

      {/* Text Input for user messages */}
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          placeholder="Type a message..."
          className={`
            w-36
            sm:w-48
            md:w-56
            lg:w-64
            px-2
            py-1
            rounded
            text-black
            focus:outline-none
            focus:ring
            focus:ring-white
            focus:ring-offset-0
          `}
          value={draftMessage}
          onChange={(e) => setDraftMessage(e.target.value)}
        />
        <button
          type="submit"
          aria-label="Send"
          className={`
            ml-2
            text-white
            bg-blue-600 
            px-3 
            py-1 
            rounded 
            hover:bg-blue-500
            focus:outline-none
            focus:ring 
            focus:ring-white
            focus:ring-offset-0
          `}
        >
          Send
        </button>
      </form>

      {/* Video Button */}
      <button
        type="button"
        onClick={handleVideoClick}
        onMouseDown={createRipple}
        aria-label="Video"
        title={
          videoState === "inactive"
            ? "Select a video source"
            : videoState === "selecting"
            ? "Cancel source selection"
            : "Stop Video"
        }
        className={`
          relative 
          w-10 
          h-10 
          flex 
          items-center 
          justify-center 
          rounded-full 
          text-white
          overflow-hidden
          focus:outline-none
          focus:ring 
          focus:ring-white 
          focus:ring-offset-0
          transition-colors 
          ${videoBtnColor}
        `}
      >
        {videoState === "active" ? <FaVideo size={18} /> : <FaVideoSlash size={18} />}
      </button>

      {/* Settings Button */}
      <button
        type="button"
        onClick={(e) => {
          createRipple(e);
          onSettings();
        }}
        onMouseDown={createRipple}
        aria-label="Settings"
        title="Settings"
        className={`
          relative 
          w-10 
          h-10 
          flex 
          items-center 
          justify-center 
          rounded-full 
          border 
          border-white 
          text-white
          overflow-hidden
          focus:outline-none
          focus:ring 
          focus:ring-white 
          focus:ring-offset-0
        `}
      >
        <IoMdSettings size={18} />
      </button>

      {/* Popup menu for camera/screen source selection */}
      {showMenu && videoState === "selecting" && (
        <div
          className={`
            absolute 
            bottom-[60px]
            flex 
            flex-col 
            bg-white 
            text-gray-800 
            rounded 
            shadow-lg 
            py-2 
            min-w-[120px]
            z-50
          `}
          role="menu"
          aria-label="Select Video Source"
        >
          <button
            type="button"
            className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-200 focus:outline-none"
            role="menuitem"
            onClick={() => handleSourceSelect("camera")}
          >
            Camera
          </button>
          <button
            type="button"
            className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-200 focus:outline-none"
            role="menuitem"
            onClick={() => handleSourceSelect("screen")}
          >
            Screen
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoControlBar;
