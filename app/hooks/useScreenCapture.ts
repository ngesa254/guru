// /* /home/user/Guru-AI/app/hooks/useScreenCapture.ts */
// "use client";

// import { useState, useEffect } from "react";

// export function useScreenCapture() {
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
//     const mediaStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
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


/* /home/user/Guru-AI/app/hooks/useScreenCapture.ts */
"use client";

import { useState, useEffect } from "react";

export function useScreenCapture() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    const ended = () => {
      setStream(null);
      setIsStreaming(false);
    };
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.addEventListener("ended", ended);
      });
      return () => {
        stream.getTracks().forEach((track) => {
          track.removeEventListener("ended", ended);
        });
      };
    }
  }, [stream]);

  async function start() {
    const s = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
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
