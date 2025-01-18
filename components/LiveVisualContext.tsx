// /* /home/user/Guru-AI/app/components/LiveVisualContext.tsx */
// "use client";

// import React, { ReactNode } from "react";
// import styles from "@/app/styles/guruLive.module.css";

// interface LiveVisualContextProps {
//   visualContext: string;
//   zoomLevel: number;
//   children: ReactNode;
// }

// const LiveVisualContext: React.FC<LiveVisualContextProps> = ({
//   visualContext,
//   zoomLevel,
//   children,
// }) => {
//   /**
//    * In a future release, an LLM can analyze `visualContext` to show
//    * different backgrounds or context overlays (Living Room, Kitchen, etc.).
//    */
//   return (
//     <div
//       className={styles.visualContextContainer}
//       style={{ transform: `scale(${zoomLevel})` }}
//       aria-label={`Visual Context: ${visualContext}`}
//     >
//       {children}
//     </div>
//   );
// };

// export default LiveVisualContext;



/* /home/user/Guru-AI/app/components/LiveVisualContext.tsx */
"use client";

import React, { ReactNode } from "react";
import styles from "@/app/styles/guruLive.module.css";

interface LiveVisualContextProps {
  visualContext: string;
  zoomLevel: number;
  children: ReactNode;
}

const LiveVisualContext: React.FC<LiveVisualContextProps> = ({
  visualContext,
  zoomLevel,
  children,
}) => {
  /**
   * In a future release, an LLM can analyze `visualContext` to show
   * different backgrounds or context overlays (Living Room, Kitchen, etc.).
   */
  return (
    <div
      className={styles.visualContextContainer}
      style={{ transform: `scale(${zoomLevel})` }}
      aria-label={`Visual Context: ${visualContext}`}
    >
      {children}
    </div>
  );
};

export default LiveVisualContext;

