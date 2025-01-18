// /* ----------------------------------------------------------------------------------
//    /home/user/Guru-AI/components/Chat/brainChat.tsx

//    This component displays a single chat interface with two tabs: "Web" and "Work."
//    - Each tab hits its respective endpoint (/api/web or /api/work) for a user query.
//    - Chat messages are stored in Zustand. We simulate an AI response that includes
//      "Edit in Canvas," "Copy," "Like," "Dislike" buttons.
//    - "Edit in Canvas" triggers logic that copies the AI message into the canvas.

//    We demonstrate minimal styling and logic. Real apps might have more robust messaging flows.
// ----------------------------------------------------------------------------------- */
// "use client";

// import React, { useState } from 'react';
// import { useBrainStore } from '@/store/brainStore';
// import BrainButton from '@/components/ui/brainButton';

// interface ChatMessage {
//   role: 'user' | 'ai';
//   content: string;
// }

// export default function BrainChat() {
//   const [inputValue, setInputValue] = useState('');
//   const { chatMessages, setChatMessages, currentTab, setCurrentTab, setCanvasContent, setCanvasOpen } = useBrainStore();

//   // Switch between "Web" and "Work" tab
//   const handleTabSwitch = (tab: 'Web' | 'Work') => {
//     setCurrentTab(tab);
//   };

//   // Handle user sending a message (query)
//   const handleSend = async () => {
//     if (!inputValue.trim()) return;

//     // 1) Add the user's message to the chat
//     const userMessage: ChatMessage = {
//       role: 'user',
//       content: inputValue.trim()
//     };
//     setChatMessages([...chatMessages, userMessage]);

//     // 2) Call the appropriate API based on current tab
//     let url = '';
//     if (currentTab === 'Web') {
//       url = '/api/web';
//     } else {
//       url = '/api/work';
//     }

//     try {
//       // Send user query to the endpoint
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ query: inputValue.trim() })
//       });
//       const data = await response.json();

//       // 3) Construct an AI response message from the dummy data
//       const aiContent = JSON.stringify(data, null, 2); // For demonstration
//       const aiMessage: ChatMessage = {
//         role: 'ai',
//         content: aiContent
//       };

//       setChatMessages([...chatMessages, userMessage, aiMessage]);
//     } catch (error) {
//       console.error(error);
//       // In a real app, handle error states
//     }

//     // Clear input
//     setInputValue('');
//   };

//   // Handle "Edit in Canvas" button (copy AI content to canvas)
//   const handleEditInCanvas = (messageContent: string) => {
//     setCanvasContent(messageContent);
//     setCanvasOpen(true);
//   };

//   // For "Copy," "Like," "Dislike," we just demonstrate placeholders
//   const handleAction = (action: string, index: number) => {
//     if (action === 'Copy') {
//       navigator.clipboard.writeText(chatMessages[index].content);
//       // In real app, show a success toast or notification
//     } else if (action === 'Like') {
//       // Placeholder for rating logic
//     } else if (action === 'Dislike') {
//       // Placeholder for rating logic
//     }
//   };

//   return (
//     <div className="flex flex-col h-full w-full">
//       {/* Tabs for "Web" and "Work" */}
//       <div className="mb-2 flex space-x-4">
//         <button
//           onClick={() => handleTabSwitch('Web')}
//           className={`px-4 py-2 rounded ${currentTab === 'Web' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
//         >
//           Web
//         </button>
//         <button
//           onClick={() => handleTabSwitch('Work')}
//           className={`px-4 py-2 rounded ${currentTab === 'Work' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
//         >
//           Work
//         </button>
//       </div>

//       {/* Chat display area */}
//       <div className="flex-1 border p-2 mb-2 rounded overflow-auto bg-gray-50">
//         {chatMessages.map((message, index) => (
//           <div
//             key={index}
//             className={`mb-4 p-2 rounded ${message.role === 'user' ? 'bg-green-100 self-end' : 'bg-white'}`}
//           >
//             <div className="flex items-start gap-2 mb-1">
//               <img
//                 src={message.role === 'user' ? "/african.svg" : "/zuri-icon.svg"}
//                 alt={message.role === 'user' ? "User Icon" : "AI Icon"}
//                 className="w-6 h-6 object-cover"
//               />
//               <p className="font-bold text-sm">{message.role === 'user' ? 'User' : 'AI'}</p>
//             </div>
//             <pre className="text-sm whitespace-pre-wrap">{message.content}</pre>

//             {/* If AI message, show the action buttons */}
//             {message.role === 'ai' && (
//               <div className="mt-2 flex gap-2">
//                 {/* "Edit in Canvas" */}
//                 <BrainButton
//                   onClick={() => handleEditInCanvas(message.content)}
//                   variant="secondary"
//                 >
//                   Edit in Canvas
//                 </BrainButton>

//                 {/* "Copy" */}
//                 <BrainButton
//                   onClick={() => handleAction('Copy', index)}
//                   variant="ghost"
//                 >
//                   Copy
//                 </BrainButton>

//                 {/* "Like" */}
//                 <BrainButton
//                   onClick={() => handleAction('Like', index)}
//                   variant="ghost"
//                 >
//                   Like
//                 </BrainButton>

//                 {/* "Dislike" */}
//                 <BrainButton
//                   onClick={() => handleAction('Dislike', index)}
//                   variant="ghost"
//                 >
//                   Dislike
//                 </BrainButton>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Input area for user to type a query */}
//       <div className="flex space-x-2">
//         <input
//           type="text"
//           className="flex-1 border rounded p-2 text-sm"
//           placeholder={`Type your ${currentTab} query...`}
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter') handleSend();
//           }}
//         />
//         <BrainButton onClick={handleSend}>
//           Send
//         </BrainButton>
//       </div>
//     </div>
//   );
// }


// /* ----------------------------------------------------------------------------------
//    /home/user/Guru-AI/components/Chat/brainChat.tsx

// WORKING v0.1

//    UPDATED:
//    1. Allows partial highlight: We capture the user's highlighted text
//       (if any) before sending content to Canvas.
//    2. Ensures multiple "Edit in Canvas" actions append new content instead
//       of overwriting the old one.

//    NOTE: The rest of the code is the same as before (tabs, chat UI, etc.).
//          Only the handleEditInCanvas method and a helper getHighlightedText
//          have changed.
// ----------------------------------------------------------------------------------- */
// "use client";

// import React, { useState } from 'react';
// import { useBrainStore } from '@/store/brainStore';
// import BrainButton from '@/components/ui/brainButton';

// interface ChatMessage {
//   role: 'user' | 'ai';
//   content: string;
// }

// /**
//  * Helper function to get the currently highlighted text in the browser window.
//  * If nothing is highlighted, returns an empty string.
//  */
// function getHighlightedText(): string {
//   let selectionText = '';
//   if (typeof window !== 'undefined' && window.getSelection) {
//     selectionText = window.getSelection()!.toString();
//   }
//   return selectionText.trim();
// }

// export default function BrainChat() {
//   const [inputValue, setInputValue] = useState('');
//   const {
//     chatMessages,
//     setChatMessages,
//     currentTab,
//     setCurrentTab,
//     setCanvasContent,
//     setCanvasOpen,
//   } = useBrainStore();

//   // Switch between "Web" and "Work" tab
//   const handleTabSwitch = (tab: 'Web' | 'Work') => {
//     setCurrentTab(tab);
//   };

//   // Handle user sending a message (query)
//   const handleSend = async () => {
//     if (!inputValue.trim()) return;

//     // 1) Add the user's message to the chat
//     const userMessage: ChatMessage = {
//       role: 'user',
//       content: inputValue.trim(),
//     };
//     setChatMessages([...chatMessages, userMessage]);

//     // 2) Call the appropriate API based on current tab
//     let url = currentTab === 'Web' ? '/api/web' : '/api/work';

//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ query: inputValue.trim() }),
//       });
//       const data = await response.json();

//       // 3) Construct an AI response message from the dummy data
//       const aiContent = JSON.stringify(data, null, 2); // For demonstration
//       const aiMessage: ChatMessage = {
//         role: 'ai',
//         content: aiContent,
//       };

//       setChatMessages([...chatMessages, userMessage, aiMessage]);
//     } catch (error) {
//       console.error(error);
//       // In a real app, handle error states
//     }

//     // Clear input
//     setInputValue('');
//   };

//   /**
//    * When "Edit in Canvas" is clicked:
//    * 1) Grab any highlighted text from the browser selection.
//    * 2) If highlighted text is non-empty, send that. Otherwise, send the entire AI message.
//    * 3) Append it in the Canvas if there's already content. 
//    * 4) Force the Canvas to open.
//    */
//   const handleEditInCanvas = (messageContent: string) => {
//     const highlighted = getHighlightedText();
//     const contentToCanvas = highlighted.length > 0 ? highlighted : messageContent;

//     // Append new content if there's already content in the Canvas:
//     setCanvasContent((prev) => {
//       if (!prev) return contentToCanvas;
//       return prev + '\n\n' + contentToCanvas;
//     });

//     setCanvasOpen(true);
//   };

//   // For "Copy," "Like," "Dislike," we just demonstrate placeholders
//   const handleAction = (action: string, index: number) => {
//     if (action === 'Copy') {
//       navigator.clipboard.writeText(chatMessages[index].content);
//     } else if (action === 'Like') {
//       // Placeholder for rating logic
//     } else if (action === 'Dislike') {
//       // Placeholder for rating logic
//     }
//   };

//   return (
//     <div className="flex flex-col h-full w-full">
//       {/* Tabs for "Web" and "Work" */}
//       <div className="mb-2 flex space-x-4">
//         <button
//           onClick={() => handleTabSwitch('Web')}
//           className={`px-4 py-2 rounded ${
//             currentTab === 'Web' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
//           }`}
//         >
//           Web
//         </button>
//         <button
//           onClick={() => handleTabSwitch('Work')}
//           className={`px-4 py-2 rounded ${
//             currentTab === 'Work' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
//           }`}
//         >
//           Work
//         </button>
//       </div>

//       {/* Chat display area */}
//       <div className="flex-1 border p-2 mb-2 rounded overflow-auto bg-gray-50">
//         {chatMessages.map((message, index) => (
//           <div
//             key={index}
//             className={`mb-4 p-2 rounded ${
//               message.role === 'user' ? 'bg-green-100 self-end' : 'bg-white'
//             }`}
//           >
//             <div className="flex items-start gap-2 mb-1">
//               <img
//                 src={message.role === 'user' ? '/african.svg' : '/zuri-icon.svg'}
//                 alt={message.role === 'user' ? 'User Icon' : 'AI Icon'}
//                 className="w-6 h-6 object-cover"
//               />
//               <p className="font-bold text-sm">
//                 {message.role === 'user' ? 'User' : 'AI'}
//               </p>
//             </div>
//             <pre className="text-sm whitespace-pre-wrap">{message.content}</pre>

//             {/* If AI message, show the action buttons */}
//             {message.role === 'ai' && (
//               <div className="mt-2 flex gap-2">
//                 {/* "Edit in Canvas" */}
//                 <BrainButton onClick={() => handleEditInCanvas(message.content)} variant="secondary">
//                   Edit in Canvas
//                 </BrainButton>

//                 {/* "Copy" */}
//                 <BrainButton onClick={() => handleAction('Copy', index)} variant="ghost">
//                   Copy
//                 </BrainButton>

//                 {/* "Like" */}
//                 <BrainButton onClick={() => handleAction('Like', index)} variant="ghost">
//                   Like
//                 </BrainButton>

//                 {/* "Dislike" */}
//                 <BrainButton onClick={() => handleAction('Dislike', index)} variant="ghost">
//                   Dislike
//                 </BrainButton>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Input area for user to type a query */}
//       <div className="flex space-x-2">
//         <input
//           type="text"
//           className="flex-1 border rounded p-2 text-sm"
//           placeholder={`Type your ${currentTab} query...`}
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter') handleSend();
//           }}
//         />
//         <BrainButton onClick={handleSend}>Send</BrainButton>
//       </div>
//     </div>
//   );
// }



// "use client";

// import React, { useState } from 'react';
// import { useBrainStore } from '@/store/brainStore';
// import BrainButton from '@/components/ui/brainButton';

// interface ChatMessage {
//   role: 'user' | 'ai';
//   content: string;
// }

// /**
//  * Helper function to get the currently highlighted text in the browser window.
//  * If nothing is highlighted, returns an empty string.
//  */
// function getHighlightedText(): string {
//   let selectionText = '';
//   if (typeof window !== 'undefined' && window.getSelection) {
//     selectionText = window.getSelection()!.toString();
//   }
//   return selectionText.trim();
// }

// export default function BrainChat() {
//   const [inputValue, setInputValue] = useState('');
//   const {
//     chatMessages,
//     setChatMessages,
//     currentTab,
//     setCurrentTab,
//     setCanvasContent,
//     setCanvasOpen,
//   } = useBrainStore();

//   // Switch between "Web" and "Work" tab
//   const handleTabSwitch = (tab: 'Web' | 'Work') => {
//     setCurrentTab(tab);
//   };

//   // Handle user sending a message (query)
//   const handleSend = async () => {
//     if (!inputValue.trim()) return;

//     // Add the user's message to the chat
//     const userMessage: ChatMessage = {
//       role: 'user',
//       content: inputValue.trim(),
//     };
//     setChatMessages([...chatMessages, userMessage]);

//     // Call the appropriate API based on current tab
//     let url = currentTab === 'Web' ? '/api/web' : '/api/work';

//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ query: inputValue.trim() }),
//       });
//       const data = await response.json();

//       // Construct an AI response message from the dummy data
//       const aiContent = JSON.stringify(data, null, 2); // For demonstration
//       const aiMessage: ChatMessage = {
//         role: 'ai',
//         content: aiContent,
//       };

//       setChatMessages([...chatMessages, userMessage, aiMessage]);
//     } catch (error) {
//       console.error(error);
//       // In a real app, handle error states
//     }

//     // Clear input
//     setInputValue('');
//   };

//   /**
//    * When "Edit in Canvas" is clicked:
//    * - Grab any highlighted text from the browser selection.
//    * - If highlighted text is non-empty, send that. Otherwise, send the entire AI message.
//    * - Append it in the Canvas if there's already content.
//    * - Force the Canvas to open.
//    */
//   const handleEditInCanvas = (messageContent: string) => {
//     const highlighted = getHighlightedText();
//     const contentToCanvas = highlighted.length > 0 ? highlighted : messageContent;

//     // Append new content if there's already content in the Canvas:
//     setCanvasContent((prev) => {
//       if (!prev) return contentToCanvas;
//       return prev + '\n\n' + contentToCanvas;
//     });

//     setCanvasOpen(true);
//   };

//   // For "Copy," "Like," "Dislike," we just demonstrate placeholders
//   const handleAction = (action: string, index: number) => {
//     if (action === 'Copy') {
//       navigator.clipboard.writeText(chatMessages[index].content);
//     } else if (action === 'Like') {
//       // Now represented by a thumbs-up (👍)
//       // Placeholder for rating logic
//     } else if (action === 'Dislike') {
//       // Now represented by a thumbs-down (👎)
//       // Placeholder for rating logic
//     }
//   };

//   return (
//     <div className="flex flex-col h-full w-full">
//       {/* Tabs for "Web" and "Work" */}
//       <div className="mb-2 flex space-x-4">
//         <button
//           onClick={() => handleTabSwitch('Web')}
//           className={`px-4 py-2 rounded ${
//             currentTab === 'Web' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
//           }`}
//         >
//           Web
//         </button>
//         <button
//           onClick={() => handleTabSwitch('Work')}
//           className={`px-4 py-2 rounded ${
//             currentTab === 'Work' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
//           }`}
//         >
//           Work
//         </button>
//       </div>

//       {/* Chat display area */}
//       <div className="flex-1 border p-2 mb-2 rounded overflow-auto bg-gray-50">
//         {chatMessages.map((message, index) => (
//           <div
//             key={index}
//             className={`mb-4 p-2 rounded ${
//               message.role === 'user' ? 'bg-green-100 self-end' : 'bg-white'
//             }`}
//           >
//             <div className="flex items-start gap-2 mb-1">
//               <img
//                 src={message.role === 'user' ? '/african.svg' : '/zuri-icon.svg'}
//                 alt={message.role === 'user' ? 'User Icon' : 'AI Icon'}
//                 className="w-6 h-6 object-cover"
//               />
//               <p className="font-bold text-sm">
//                 {message.role === 'user' ? 'User' : 'AI'}
//               </p>
//             </div>
//             <pre className="text-sm whitespace-pre-wrap">{message.content}</pre>

//             {/* If AI message, show the action buttons */}
//             {message.role === 'ai' && (
//               <div className="mt-2 flex gap-2">
//                 {/* "Edit in Canvas" */}
//                 <BrainButton onClick={() => handleEditInCanvas(message.content)} variant="secondary">
//                   Edit in Canvas
//                 </BrainButton>

//                 {/* "Copy" */}
//                 <BrainButton onClick={() => handleAction('Copy', index)} variant="ghost">
//                   Copy
//                 </BrainButton>

//                 {/* Thumbs up (Like) */}
//                 <BrainButton onClick={() => handleAction('Like', index)} variant="ghost">
//                   👍
//                 </BrainButton>

//                 {/* Thumbs down (Dislike) */}
//                 <BrainButton onClick={() => handleAction('Dislike', index)} variant="ghost">
//                   👎
//                 </BrainButton>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Input area for user to type a query */}
//       <div className="flex space-x-2">
//         <input
//           type="text"
//           className="flex-1 border rounded p-2 text-sm"
//           placeholder={`Type your ${currentTab} query...`}
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter') handleSend();
//           }}
//         />
//         <BrainButton onClick={handleSend}>Send</BrainButton>
//       </div>
//     </div>
//   );
// }


// // Works but need correction v0.2


// "use client";

// import React, { useState } from 'react';
// import { useBrainStore } from '@/store/brainStore';
// import BrainButton from '@/components/ui/brainButton';

// interface ChatMessage {
//   role: 'user' | 'ai';
//   content: any;  // We'll store raw data (string or object), then convert to string for the Canvas
// }

// /**
//  * Helper function to get the currently highlighted text in the browser window.
//  * If nothing is highlighted, returns an empty string.
//  */
// function getHighlightedText(): string {
//   let selectionText = '';
//   if (typeof window !== 'undefined' && window.getSelection) {
//     selectionText = window.getSelection()!.toString();
//   }
//   return selectionText.trim();
// }

// export default function BrainChat() {
//   const [inputValue, setInputValue] = useState('');
//   const {
//     chatMessages,
//     setChatMessages,
//     currentTab,
//     setCurrentTab,
//     setCanvasContent,
//     setCanvasOpen,
//   } = useBrainStore();

//   // Switch between "Web" and "Work" tab
//   const handleTabSwitch = (tab: 'Web' | 'Work') => {
//     setCurrentTab(tab);
//   };

//   // Handle user sending a message (query)
//   const handleSend = async () => {
//     if (!inputValue.trim()) return;

//     // 1) Add the user's message to the chat
//     const userMessage: ChatMessage = {
//       role: 'user',
//       content: inputValue.trim(),
//     };
//     setChatMessages([...chatMessages, userMessage]);

//     // 2) Call the appropriate API based on currentTab
//     const url = currentTab === 'Web' ? '/api/web' : '/api/work';

//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ query: inputValue.trim() }),
//       });
//       const data = await response.json();

//       // 3) Construct an AI response message from the dummy data
//       // Could be an object, so store it "as is" to keep structure.
//       const aiMessage: ChatMessage = {
//         role: 'ai',
//         content: data,
//       };

//       setChatMessages([...chatMessages, userMessage, aiMessage]);
//     } catch (error) {
//       console.error(error);
//       // In a real app, handle error states or show a toast
//     }

//     // Clear input
//     setInputValue('');
//   };

//   /**
//    * When "Edit in Canvas" is clicked:
//    * - Grab any highlighted text from the browser selection.
//    * - If highlighted text is non-empty, use that. Otherwise, use the entire AI content.
//    * - Convert it to a string if it's an object or non-string type.
//    * - Append to existing Canvas content in Zustand.
//    * - Open the Canvas.
//    */
//   const handleEditInCanvas = (messageContent: any) => {
//     const highlighted = getHighlightedText();
//     let contentToCanvas = highlighted || messageContent;

//     // If content is an object, convert to JSON string
//     if (typeof contentToCanvas === 'object') {
//       contentToCanvas = JSON.stringify(contentToCanvas, null, 2);
//     } else {
//       contentToCanvas = String(contentToCanvas);
//     }

//     // Append new text to existing Canvas content
//     setCanvasContent((prev) => {
//       if (!prev) return contentToCanvas;
//       return prev + '\n\n' + contentToCanvas;
//     });

//     // Ensure the Canvas is visible
//     setCanvasOpen(true);
//   };

//   // "Copy," "Like," "Dislike" placeholders
//   const handleAction = (action: string, index: number) => {
//     const targetMsg = chatMessages[index];
//     if (!targetMsg) return;

//     if (action === 'Copy') {
//       let textToCopy = targetMsg.content;
//       // Convert to string if object
//       if (typeof textToCopy === 'object') {
//         textToCopy = JSON.stringify(textToCopy, null, 2);
//       }
//       navigator.clipboard.writeText(String(textToCopy));
//     } else if (action === 'Like') {
//       // Thumbs-up (👍) logic placeholder
//     } else if (action === 'Dislike') {
//       // Thumbs-down (👎) logic placeholder
//     }
//   };

//   return (
//     <div className="flex flex-col h-full w-full">
//       {/* Tabs for "Web" and "Work" */}
//       <div className="mb-2 flex space-x-4">
//         <button
//           onClick={() => handleTabSwitch('Web')}
//           className={`px-4 py-2 rounded ${
//             currentTab === 'Web' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
//           }`}
//         >
//           Web
//         </button>
//         <button
//           onClick={() => handleTabSwitch('Work')}
//           className={`px-4 py-2 rounded ${
//             currentTab === 'Work' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
//           }`}
//         >
//           Work
//         </button>
//       </div>

//       {/* Chat display area */}
//       <div className="flex-1 border p-2 mb-2 rounded overflow-auto bg-gray-50">
//         {chatMessages.map((message, index) => {
//           const isUser = message.role === 'user';

//           // Convert content to string for display
//           let displayContent = '';
//           if (typeof message.content === 'object') {
//             displayContent = JSON.stringify(message.content, null, 2);
//           } else {
//             displayContent = String(message.content);
//           }

//           return (
//             <div
//               key={index}
//               className={`mb-4 p-2 rounded ${isUser ? 'bg-green-100 self-end' : 'bg-white'}`}
//             >
//               <div className="flex items-start gap-2 mb-1">
//                 <img
//                   src={isUser ? '/african.svg' : '/zuri-icon.svg'}
//                   alt={isUser ? 'User Icon' : 'AI Icon'}
//                   className="w-6 h-6 object-cover"
//                 />
//                 <p className="font-bold text-sm">{isUser ? 'User' : 'AI'}</p>
//               </div>
//               <pre className="text-sm whitespace-pre-wrap">{displayContent}</pre>

//               {/* If AI message, show the action buttons */}
//               {!isUser && (
//                 <div className="mt-2 flex gap-2">
//                   {/* "Edit in Canvas" */}
//                   <BrainButton
//                     onClick={() => handleEditInCanvas(message.content)}
//                     variant="secondary"
//                   >
//                     Edit in Canvas
//                   </BrainButton>

//                   {/* "Copy" */}
//                   <BrainButton onClick={() => handleAction('Copy', index)} variant="ghost">
//                     Copy
//                   </BrainButton>

//                   {/* Thumbs up (Like) */}
//                   <BrainButton onClick={() => handleAction('Like', index)} variant="ghost">
//                     👍
//                   </BrainButton>

//                   {/* Thumbs down (Dislike) */}
//                   <BrainButton onClick={() => handleAction('Dislike', index)} variant="ghost">
//                     👎
//                   </BrainButton>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Input area for user to type a query */}
//       <div className="flex space-x-2">
//         <input
//           type="text"
//           className="flex-1 border rounded p-2 text-sm"
//           placeholder={`Type your ${currentTab} query...`}
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter') handleSend();
//           }}
//         />
//         <BrainButton onClick={handleSend}>Send</BrainButton>
//       </div>
//     </div>
//   );
// }



// // v0.3 
// "use client";

// import React, { useState } from 'react';
// import { useBrainStore } from '@/store/brainStore';
// import BrainButton from '@/components/ui/brainButton';

// interface ChatMessage {
//   role: 'user' | 'ai';
//   content: string; // We store everything as a string for simplicity
// }

// /**
//  * Helper function to get the currently highlighted text in the browser window.
//  * If nothing is highlighted, returns an empty string.
//  */
// function getHighlightedText(): string {
//   let selectionText = '';
//   if (typeof window !== 'undefined' && window.getSelection) {
//     selectionText = window.getSelection()!.toString();
//   }
//   return selectionText.trim();
// }

// export default function BrainChat() {
//   const [inputValue, setInputValue] = useState('');
//   const {
//     chatMessages,
//     setChatMessages,
//     currentTab,
//     setCurrentTab,
//     setCanvasContent,
//     setCanvasOpen,
//   } = useBrainStore();

//   // Switch between "Web" and "Work" tab
//   const handleTabSwitch = (tab: 'Web' | 'Work') => {
//     setCurrentTab(tab);
//   };

//   // Handle user sending a message (query)
//   const handleSend = async () => {
//     if (!inputValue.trim()) return;

//     // 1) Add the user's message to the chat
//     const userMessage: ChatMessage = {
//       role: 'user',
//       content: inputValue.trim(),
//     };
//     setChatMessages([...chatMessages, userMessage]);

//     // 2) Call the appropriate API based on current tab
//     let url = currentTab === 'Web' ? '/api/web' : '/api/work';

//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ query: inputValue.trim() }),
//       });
//       const data = await response.json();

//       // 3) Convert the AI data to a string for storage in chatMessages
//       const aiContent = JSON.stringify(data, null, 2);

//       const aiMessage: ChatMessage = {
//         role: 'ai',
//         content: aiContent,
//       };

//       setChatMessages([...chatMessages, userMessage, aiMessage]);
//     } catch (error) {
//       console.error(error);
//       // In a real app, handle error states or show a toast
//     }

//     // Clear the input
//     setInputValue('');
//   };

//   /**
//    * When "Edit in Canvas" is clicked:
//    * 1) Grab any highlighted text from the browser selection.
//    * 2) If highlighted text is non-empty, send that. Otherwise, send the entire AI message.
//    * 3) Append it to the existing Canvas content (rather than overwriting).
//    * 4) Force the Canvas to open.
//    */
//   const handleEditInCanvas = (fullMessage: string) => {
//     const highlighted = getHighlightedText();
//     const snippet = highlighted || fullMessage; // If no highlight, use full message

//     // Append snippet below existing Canvas content (with a double newline)
//     setCanvasContent((prev) => {
//       if (!prev) return snippet;
//       return prev + '\n\n' + snippet;
//     });

//     setCanvasOpen(true);
//   };

//   // Copy, Thumbs-up (Like), Thumbs-down (Dislike) placeholders
//   const handleAction = (action: string, index: number) => {
//     if (action === 'Copy') {
//       navigator.clipboard.writeText(chatMessages[index].content);
//     } else if (action === 'Like') {
//       // Thumbs-up placeholder
//     } else if (action === 'Dislike') {
//       // Thumbs-down placeholder
//     }
//   };

//   return (
//     <div className="flex flex-col h-full w-full">
//       {/* Tabs for "Web" and "Work" */}
//       <div className="mb-2 flex space-x-4">
//         <button
//           onClick={() => handleTabSwitch('Web')}
//           className={`px-4 py-2 rounded ${
//             currentTab === 'Web' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
//           }`}
//         >
//           Web
//         </button>
//         <button
//           onClick={() => handleTabSwitch('Work')}
//           className={`px-4 py-2 rounded ${
//             currentTab === 'Work' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
//           }`}
//         >
//           Work
//         </button>
//       </div>

//       {/* Chat display area */}
//       <div className="flex-1 border p-2 mb-2 rounded overflow-auto bg-gray-50">
//         {chatMessages.map((message, index) => (
//           <div
//             key={index}
//             className={`mb-4 p-2 rounded ${
//               message.role === 'user' ? 'bg-green-100 self-end' : 'bg-white'
//             }`}
//           >
//             <div className="flex items-start gap-2 mb-1">
//               <img
//                 src={message.role === 'user' ? '/african.svg' : '/zuri-icon.svg'}
//                 alt={message.role === 'user' ? 'User Icon' : 'AI Icon'}
//                 className="w-6 h-6 object-cover"
//               />
//               <p className="font-bold text-sm">
//                 {message.role === 'user' ? 'User' : 'AI'}
//               </p>
//             </div>
//             <pre className="text-sm whitespace-pre-wrap">
//               {message.content}
//             </pre>

//             {/* If AI message, show the action buttons */}
//             {message.role === 'ai' && (
//               <div className="mt-2 flex gap-2">
//                 {/* "Edit in Canvas" */}
//                 <BrainButton
//                   onClick={() => handleEditInCanvas(message.content)}
//                   variant="secondary"
//                 >
//                   Edit in Canvas
//                 </BrainButton>

//                 {/* "Copy" */}
//                 <BrainButton
//                   onClick={() => handleAction('Copy', index)}
//                   variant="ghost"
//                 >
//                   Copy
//                 </BrainButton>

//                 {/* Thumbs up (Like) */}
//                 <BrainButton
//                   onClick={() => handleAction('Like', index)}
//                   variant="ghost"
//                 >
//                   👍
//                 </BrainButton>

//                 {/* Thumbs down (Dislike) */}
//                 <BrainButton
//                   onClick={() => handleAction('Dislike', index)}
//                   variant="ghost"
//                 >
//                   👎
//                 </BrainButton>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Input area for user to type a query */}
//       <div className="flex space-x-2">
//         <input
//           type="text"
//           className="flex-1 border rounded p-2 text-sm"
//           placeholder={`Type your ${currentTab} query...`}
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter') handleSend();
//           }}
//         />
//         <BrainButton onClick={handleSend}>
//           Send
//         </BrainButton>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState } from 'react';
import { useBrainStore } from '@/store/brainStore';
import BrainButton from '@/components/ui/brainButton';

interface ChatMessage {
  role: 'user' | 'ai';
  content: string; // Keep as string so the Canvas never sees non-string data
}

/**
 * Helper function to get the currently highlighted text in the browser window.
 * If nothing is highlighted, returns an empty string.
 */
function getHighlightedText(): string {
  let selectionText = '';
  if (typeof window !== 'undefined' && window.getSelection) {
    selectionText = window.getSelection()!.toString();
  }
  return selectionText.trim();
}

export default function BrainChat() {
  const [inputValue, setInputValue] = useState('');
  const {
    chatMessages,
    setChatMessages,
    currentTab,
    setCurrentTab,
    setCanvasContent,
    setCanvasOpen,
  } = useBrainStore();

  // Switch between "Web" and "Work" tab
  const handleTabSwitch = (tab: 'Web' | 'Work') => {
    setCurrentTab(tab);
  };

  // Handle user sending a message (query)
  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // 1) Add the user's message to the chat
    const userMessage: ChatMessage = {
      role: 'user',
      content: inputValue.trim(),
    };
    setChatMessages([...chatMessages, userMessage]);

    // 2) Call the appropriate API
    const url = currentTab === 'Web' ? '/api/web' : '/api/work';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: inputValue.trim() }),
      });
      const data = await response.json();

      // Convert returned data to a string so it can be appended safely
      const aiContent = JSON.stringify(data, null, 2);

      const aiMessage: ChatMessage = {
        role: 'ai',
        content: aiContent,
      };

      setChatMessages([...chatMessages, userMessage, aiMessage]);
    } catch (error) {
      console.error(error);
      // In a real app, handle error states or show a toast
    }

    // Clear input
    setInputValue('');
  };

  /**
   * When "Edit in Canvas" is clicked:
   * 1) Grab any highlighted text in the browser selection.
   * 2) If no highlight, use the entire AI message. 
   * 3) Convert snippet to string, log it for debugging, then append to Canvas content.
   * 4) Open the Canvas.
   */
  const handleEditInCanvas = (fullMessage: string) => {
    const highlighted = getHighlightedText();
    let snippet = highlighted || fullMessage;

    // Double-check snippet is a string
    if (typeof snippet !== 'string') {
      snippet = String(snippet);
    }

    // Log snippet to confirm it is valid
    console.log('[handleEditInCanvas] snippet to append:', snippet);

    // Append snippet below existing Canvas content
    setCanvasContent((prev) => {
      if (!prev) return snippet;
      return prev + '\n\n' + snippet;
    });

    setCanvasOpen(true);
  };

  // "Copy," "Like," "Dislike" placeholders
  const handleAction = (action: string, index: number) => {
    if (action === 'Copy') {
      navigator.clipboard.writeText(chatMessages[index].content);
    } else if (action === 'Like') {
      // Thumbs-up placeholder
    } else if (action === 'Dislike') {
      // Thumbs-down placeholder
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Tabs for "Web" and "Work" */}
      <div className="mb-2 flex space-x-4">
        <button
          onClick={() => handleTabSwitch('Web')}
          className={`px-4 py-2 rounded ${
            currentTab === 'Web' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Web
        </button>
        <button
          onClick={() => handleTabSwitch('Work')}
          className={`px-4 py-2 rounded ${
            currentTab === 'Work' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Work
        </button>
      </div>

      {/* Chat display area */}
      <div className="flex-1 border p-2 mb-2 rounded overflow-auto bg-gray-50">
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 p-2 rounded ${
              message.role === 'user' ? 'bg-green-100 self-end' : 'bg-white'
            }`}
          >
            <div className="flex items-start gap-2 mb-1">
              <img
                src={message.role === 'user' ? '/african.svg' : '/zuri-icon.svg'}
                alt={message.role === 'user' ? 'User Icon' : 'AI Icon'}
                className="w-6 h-6 object-cover"
              />
              <p className="font-bold text-sm">{message.role === 'user' ? 'User' : 'Kazuri Agent (AI)'}</p>
            </div>
            <pre className="text-sm whitespace-pre-wrap">{message.content}</pre>

            {/* If AI message, show the action buttons */}
            {message.role === 'ai' && (
              <div className="mt-2 flex gap-2">
                {/* "Edit in Canvas" */}
                <BrainButton
                  onClick={() => handleEditInCanvas(message.content)}
                  variant="secondary"
                >
                  Edit in Canvas
                </BrainButton>

                {/* Copy */}
                <BrainButton onClick={() => handleAction('Copy', index)} variant="ghost">
                  Copy
                </BrainButton>

                {/* Thumbs up (Like) */}
                <BrainButton onClick={() => handleAction('Like', index)} variant="ghost">
                  👍
                </BrainButton>

                {/* Thumbs down (Dislike) */}
                <BrainButton onClick={() => handleAction('Dislike', index)} variant="ghost">
                  👎
                </BrainButton>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input area for user to type a query */}
      <div className="flex space-x-2">
        <input
          type="text"
          className="flex-1 border rounded p-2 text-sm"
          placeholder={`Type your ${currentTab} query...`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
        />
        <BrainButton onClick={handleSend}>Send</BrainButton>
      </div>
    </div>
  );
}
