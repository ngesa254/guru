// /* /home/user/Guru-AI/app/components/LiveChatInterface.tsx */
// "use client";

// import React, { useState } from "react";
// import LiveMessageBubble from "./LiveMessageBubble";
// import styles from "@/app/styles/guruLive.module.css";

// interface ConversationMessage {
//   text: string;
//   sender: "ai" | "user";
// }

// interface LiveChatInterfaceProps {
//   conversation: ConversationMessage[];
//   onNewUserMessage: (message: string) => void;
// }

// const LiveChatInterface: React.FC<LiveChatInterfaceProps> = ({
//   conversation,
//   onNewUserMessage,
// }) => {
//   const [draftMessage, setDraftMessage] = useState("");

//   const handleSend = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!draftMessage.trim()) return;
//     onNewUserMessage(draftMessage.trim());
//     setDraftMessage("");
//   };

//   return (
//     <div className={styles.chatInterface}>
//       <div className={styles.messagesContainer}>
//         {conversation.map((msg, idx) => (
//           <LiveMessageBubble key={idx} text={msg.text} sender={msg.sender} />
//         ))}
//       </div>

//       {/* Fallback manual text input for debugging / demonstration */}
//       <form onSubmit={handleSend} className={styles.chatForm}>
//         <input
//           type="text"
//           placeholder="Type a message..."
//           className={styles.textInput}
//           value={draftMessage}
//           onChange={(e) => setDraftMessage(e.target.value)}
//         />
//         <button type="submit" className={styles.sendButton}>
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LiveChatInterface;



// /* /home/user/Guru-AI/app/components/LiveChatInterface.tsx */
// "use client";

// import React, { useState } from "react";
// import LiveMessageBubble from "./LiveMessageBubble";
// import styles from "@/app/styles/guruLive.module.css";

// interface ConversationMessage {
//   text: string;
//   sender: "ai" | "user";
// }

// interface LiveChatInterfaceProps {
//   conversation: ConversationMessage[];
//   onNewUserMessage: (message: string) => void;
// }

// const LiveChatInterface: React.FC<LiveChatInterfaceProps> = ({
//   conversation,
//   onNewUserMessage,
// }) => {
//   const [draftMessage, setDraftMessage] = useState("");

//   const handleSend = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!draftMessage.trim()) return;
//     onNewUserMessage(draftMessage.trim());
//     setDraftMessage("");
//   };

//   return (
//     <div className={styles.chatInterface}>
//       <div className={styles.messagesContainer}>
//         {conversation.map((msg, idx) => (
//           <LiveMessageBubble key={idx} text={msg.text} sender={msg.sender} />
//         ))}
//       </div>

//       {/* Fallback manual text input for debugging / demonstration */}
//       <form onSubmit={handleSend} className={styles.chatForm}>
//         <input
//           type="text"
//           placeholder="Type a message..."
//           className={styles.textInput}
//           value={draftMessage}
//           onChange={(e) => setDraftMessage(e.target.value)}
//         />
//         <button type="submit" className={styles.sendButton}>
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LiveChatInterface;



/* /home/user/Guru-AI/app/components/LiveChatInterface.tsx */
"use client";

import React, { useState } from "react";
import LiveMessageBubble from "./LiveMessageBubble";
import styles from "@/app/styles/guruLive.module.css";

interface ConversationMessage {
  text: string;
  sender: "ai" | "user";
}

interface LiveChatInterfaceProps {
  conversation: ConversationMessage[];
  onNewUserMessage: (message: string) => void;
}

const LiveChatInterface: React.FC<LiveChatInterfaceProps> = ({
  conversation,
  onNewUserMessage,
}) => {
  const [draftMessage, setDraftMessage] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftMessage.trim()) return;
    onNewUserMessage(draftMessage.trim());
    setDraftMessage("");
  };

  return (
    <div className={styles.chatInterface}>
      <div className={styles.messagesContainer}>
        {conversation.map((msg, idx) => (
          <LiveMessageBubble key={idx} text={msg.text} sender={msg.sender} />
        ))}
      </div>

      <form onSubmit={handleSend} className={styles.chatForm}>
        <input
          type="text"
          placeholder="Type a message..."
          className={styles.textInput}
          value={draftMessage}
          onChange={(e) => setDraftMessage(e.target.value)}
        />
        <button type="submit" className={styles.sendButton}>
          Send
        </button>
      </form>
    </div>
  );
};

export default LiveChatInterface;

