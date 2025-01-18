// /* /home/user/Guru-AI/app/hooks/use-media-stream-mux.ts */
// "use client";

// import { useState } from "react";
// import { useWebcam } from "./useWebcam";
// import { useScreenCapture } from "./useScreenCapture";

// export function useMediaStreamMux() {
//   const webcam = useWebcam();
//   const screenCap = useScreenCapture();
//   const [activeStream, setActiveStream] = useState<MediaStream | null>(null);

//   // Start either the webcam or screen, stop the other
//   async function startWebcam() {
//     await stopAll();
//     const s = await webcam.start();
//     setActiveStream(s);
//   }
//   async function startScreen() {
//     await stopAll();
//     const s = await screenCap.start();
//     setActiveStream(s);
//   }
//   function stopAll() {
//     webcam.stop();
//     screenCap.stop();
//     setActiveStream(null);
//   }

//   return {
//     activeStream,
//     startWebcam,
//     startScreen,
//     stopAll,
//     webcam,
//     screenCap,
//   };
// }



/* /home/user/Guru-AI/app/hooks/use-media-stream-mux.ts */
"use client";

import { useState } from "react";
import { useWebcam } from "./useWebcam";
import { useScreenCapture } from "./useScreenCapture";

export function useMediaStreamMux() {
  const webcam = useWebcam();
  const screenCap = useScreenCapture();
  const [activeStream, setActiveStream] = useState<MediaStream | null>(null);

  async function startWebcam() {
    stopAll();
    const s = await webcam.start();
    setActiveStream(s);
  }
  async function startScreen() {
    stopAll();
    const s = await screenCap.start();
    setActiveStream(s);
  }
  function stopAll() {
    webcam.stop();
    screenCap.stop();
    setActiveStream(null);
  }

  return {
    activeStream,
    startWebcam,
    startScreen,
    stopAll,
    webcam,
    screenCap,
  };
}
