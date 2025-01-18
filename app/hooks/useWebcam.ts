// /* /home/user/Guru-AI/app/hooks/useWebcam.ts */
// "use client";

// import { useState, useEffect } from "react";

// /**
//  * A direct adaptation of the “starter web application”
//  * approach for hooking the webcam in a React-friendly way.
//  */
// export function useWebcam() {
//   const [stream, setStream] = useState<MediaStream | null>(null);
//   const [isStreaming, setIsStreaming] = useState(false);

//   useEffect(() => {
//     const onEnded = () => {
//       setIsStreaming(false);
//       setStream(null);
//     };
//     if (stream) {
//       stream.getTracks().forEach((t) => t.addEventListener("ended", onEnded));
//       return () => {
//         stream.getTracks().forEach((t) => t.removeEventListener("ended", onEnded));
//       };
//     }
//   }, [stream]);

//   async function start() {
//     const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
//     setStream(mediaStream);
//     setIsStreaming(true);
//     return mediaStream;
//   }

//   function stop() {
//     if (stream) {
//       stream.getTracks().forEach((t) => t.stop());
//       setStream(null);
//       setIsStreaming(false);
//     }
//   }

//   return {
//     isStreaming,
//     stream,
//     start,
//     stop,
//   };
// }


/* /home/user/Guru-AI/app/hooks/useWebcam.ts */
"use client";

import { useState, useEffect } from "react";

export function useWebcam() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    const handleEnded = () => {
      setIsStreaming(false);
      setStream(null);
    };
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.addEventListener("ended", handleEnded);
      });
      return () => {
        stream.getTracks().forEach((track) => {
          track.removeEventListener("ended", handleEnded);
        });
      };
    }
  }, [stream]);

  async function start() {
    const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    setStream(s);
    setIsStreaming(true);
    return s;
  }
  function stop() {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setIsStreaming(false);
    }
  }

  return { isStreaming, stream, start, stop };
}
