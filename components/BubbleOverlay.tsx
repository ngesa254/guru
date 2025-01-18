// /* /home/user/Guru-AI/app/components/BubbleOverlay.tsx */
// "use client";

// import React from "react";
// import styles from "@/app/styles/guruLive.module.css";

// interface ConversationMessage {
//   text: string;
//   sender: "ai" | "user";
// }

// interface BubbleOverlayProps {
//   conversation: ConversationMessage[];
// }

// /**
//  * This component simply overlays the conversation 
//  * in colored bubbles on top of the video, no text input area.
//  */
// const BubbleOverlay: React.FC<BubbleOverlayProps> = ({ conversation }) => {
//   return (
//     <div className={styles.bubbleOverlay}>
//       {conversation.map((msg, idx) => (
//         <div
//           key={idx}
//           className={`${styles.messageBubble} ${
//             msg.sender === "ai" ? styles.aiBubble : styles.userBubble
//           }`}
//         >
//           {msg.text}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BubbleOverlay;


/* /home/user/Guru-AI/app/components/BubbleOverlay.tsx */
/**
 * Overlays chat messages (AI=purple, User=green) on top of video feed.
 * No text input field here—just a read-only bubble list.
 */

"use client";

import React from "react";
import styles from "@/app/styles/guruLive.module.css";

interface ConversationMessage {
  text: string;
  sender: "ai" | "user";
}

interface BubbleOverlayProps {
  conversation: ConversationMessage[];
}

const BubbleOverlay: React.FC<BubbleOverlayProps> = ({ conversation }) => {
  return (
    <div className={styles.bubbleOverlay}>
      {conversation.map((msg, idx) => (
        <div
          key={idx}
          className={`${styles.messageBubble} ${
            msg.sender === "ai" ? styles.aiBubble : styles.userBubble
          }`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default BubbleOverlay;
