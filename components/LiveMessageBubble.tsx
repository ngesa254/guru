// /* /home/user/Guru-AI/app/components/LiveMessageBubble.tsx */
// "use client";

// import React from "react";
// import styles from "@/app/styles/guruLive.module.css";

// interface LiveMessageBubbleProps {
//   text: string;
//   sender: "ai" | "user";
// }

// const LiveMessageBubble: React.FC<LiveMessageBubbleProps> = ({ text, sender }) => {
//   const bubbleStyle =
//     sender === "ai"
//       ? styles.aiBubble // Purple bubble
//       : styles.userBubble; // Green bubble

//   return (
//     <div className={`${styles.messageBubble} ${bubbleStyle}`}>
//       {text}
//     </div>
//   );
// };

// export default LiveMessageBubble;


/* /home/user/Guru-AI/app/components/LiveMessageBubble.tsx */
"use client";

import React from "react";
import styles from "@/app/styles/guruLive.module.css";

interface LiveMessageBubbleProps {
  text: string;
  sender: "ai" | "user";
}

const LiveMessageBubble: React.FC<LiveMessageBubbleProps> = ({ text, sender }) => {
  const bubbleStyle =
    sender === "ai"
      ? styles.aiBubble // Purple bubble
      : styles.userBubble; // Green bubble

  return (
    <div className={`${styles.messageBubble} ${bubbleStyle}`}>
      {text}
    </div>
  );
};

export default LiveMessageBubble;

