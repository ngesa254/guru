// // // /home/user/Guru-AI/components/Chat/brainChat.tsx
// // 'use client';

// // import React, { useState, useEffect, useRef } from 'react';
// // import { Button } from '@/components/ui/button';
// // import { Message, User } from '@/stores/brainStore';

// // interface BrainChatProps {
// //   messages: Message[];
// //   onSendMessage: (query: string) => void;  // Could be web or work search
// //   isLoading: boolean;
// //   collaborators: User[];
// //   onProposalRequest?: (requirements: string[]) => void;
// // }

// // export default function BrainChat({
// //   messages,
// //   onSendMessage,
// //   isLoading,
// //   collaborators,
// //   onProposalRequest,
// // }: BrainChatProps) {
// //   const [input, setInput] = useState('');
// //   const [proposalReqs, setProposalReqs] = useState('');
// //   const scrollRef = useRef<HTMLDivElement>(null);

// //   // Scroll to bottom on new messages
// //   useEffect(() => {
// //     if (scrollRef.current) {
// //       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
// //     }
// //   }, [messages]);

// //   const handleSend = () => {
// //     if (!input.trim()) return;
// //     onSendMessage(input.trim());
// //     setInput('');
// //   };

// //   const handleProposalGen = () => {
// //     if (!onProposalRequest) return;
// //     const reqs = proposalReqs
// //       .split(',')
// //       .map((r) => r.trim())
// //       .filter((r) => r.length > 0);
// //     if (reqs.length > 0) {
// //       onProposalRequest(reqs);
// //       setProposalReqs('');
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col h-full">
// //       {/* Messages */}
// //       <div ref={scrollRef} className="flex-1 overflow-auto p-2 border-b border-gray-200">
// //         {messages.map((msg) => (
// //           <div
// //             key={msg.id}
// //             className={`mb-2 p-2 rounded ${
// //               msg.type === 'ai' ? 'bg-gray-100' : 'bg-blue-50'
// //             }`}
// //           >
// //             <strong>{msg.type.toUpperCase()}:</strong>
// //             <div className="mt-1 whitespace-pre-wrap text-sm">{msg.content}</div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Input area */}
// //       <div className="p-2 space-y-2">
// //         <div className="flex gap-2">
// //           <input
// //             type="text"
// //             value={input}
// //             placeholder="Enter query..."
// //             onChange={(e) => setInput(e.target.value)}
// //             onKeyDown={(e) => {
// //               if (e.key === 'Enter') handleSend();
// //             }}
// //             className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
// //           />
// //           <Button onClick={handleSend} disabled={isLoading}>
// //             Send
// //           </Button>
// //         </div>

// //         {/* Optional: “Generate Proposal” text field */}
// //         {onProposalRequest && (
// //           <div className="border-t pt-2 space-y-1 text-sm">
// //             <label className="font-semibold block">Proposal Requirements:</label>
// //             <input
// //               type="text"
// //               value={proposalReqs}
// //               placeholder="comma-separated e.g. Faster charging, More coverage..."
// //               onChange={(e) => setProposalReqs(e.target.value)}
// //               className="w-full border border-gray-300 rounded px-2 py-1"
// //             />
// //             <Button variant="outline" size="sm" onClick={handleProposalGen} disabled={isLoading}>
// //               Generate Proposal
// //             </Button>
// //           </div>
// //         )}

// //         {isLoading && <div className="text-xs text-gray-500">Loading...</div>}
// //       </div>
// //     </div>
// //   );
// // }


// // /home/user/Guru-AI/components/Chat/brainChat.tsx
// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { Button } from '@/components/ui/button';
// import { Message, User } from '@/store/brainStore'; // or '@/stores/brainStore'

// interface BrainChatProps {
//   messages: Message[];
//   onSendMessage: (query: string) => void;
//   isLoading: boolean;
//   collaborators: User[];
//   onProposalRequest?: (requirements: string[]) => void;
// }

// /**
//  * A chat-like UI used for:
//  *  1. Searching “web” or “work”
//  *  2. Generating proposals
//  *  3. Displaying system/AI messages
//  */
// export default function BrainChat({
//   messages,
//   onSendMessage,
//   isLoading,
//   collaborators,
//   onProposalRequest,
// }: BrainChatProps) {
//   const [input, setInput] = useState('');
//   const [proposalReqs, setProposalReqs] = useState('');
//   const scrollRef = useRef<HTMLDivElement>(null);

//   // Auto-scroll to bottom on new messages
//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // Normal “search” or “chat” send
//   const handleSend = () => {
//     if (!input.trim()) return;
//     onSendMessage(input.trim());
//     setInput('');
//   };

//   // “Generate proposal” request
//   const handleGenerateProposal = () => {
//     if (!onProposalRequest) return;
//     const reqsArray = proposalReqs
//       .split(',')
//       .map(r => r.trim())
//       .filter(r => r.length > 0);
//     if (reqsArray.length) {
//       onProposalRequest(reqsArray);
//       setProposalReqs('');
//     }
//   };

//   return (
//     <div className="flex flex-col h-full">
//       {/* Messages */}
//       <div className="flex-1 overflow-auto p-2 border-b border-gray-200" ref={scrollRef}>
//         {messages.map((m) => (
//           <div
//             key={m.id}
//             className={`mb-2 p-2 rounded ${
//               m.type === 'ai' ? 'bg-gray-100' : 'bg-blue-50'
//             }`}
//           >
//             <strong>{m.type.toUpperCase()}:</strong>
//             <div className="mt-1 whitespace-pre-wrap text-sm">{m.content}</div>
//           </div>
//         ))}
//       </div>

//       {/* Input area */}
//       <div className="p-2 space-y-2">
//         <div className="flex gap-2">
//           <input
//             type="text"
//             value={input}
//             placeholder="Type your query..."
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter') handleSend();
//             }}
//             className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
//           />
//           <Button variant="default" onClick={handleSend} disabled={isLoading}>
//             Send
//           </Button>
//         </div>

//         {/* Additional section for proposal generation */}
//         {onProposalRequest && (
//           <div className="border-t pt-2 space-y-1 text-sm">
//             <label className="font-semibold block">Proposal Requirements (comma-separated):</label>
//             <input
//               type="text"
//               value={proposalReqs}
//               placeholder="Faster charging, better coverage..."
//               onChange={(e) => setProposalReqs(e.target.value)}
//               className="w-full border border-gray-300 rounded px-2 py-1"
//             />
//             <Button variant="outline" size="sm" onClick={handleGenerateProposal} disabled={isLoading}>
//               Generate Proposal
//             </Button>
//           </div>
//         )}

//         {/* Loading indicator */}
//         {isLoading && <div className="text-xs text-gray-500">Loading...</div>}
//       </div>
//     </div>
//   );
// }


// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import { Button } from '@/components/ui/brainButton';
// import { Message, User } from '@/store/brainStore';

// interface BrainChatProps {
//   messages: Message[];
//   onSendMessage: (query: string) => void; // “Web” or “Work” query
//   isLoading: boolean;
//   collaborators: User[];
//   onProposalRequest?: (requirements: string[]) => void;
// }

// /**
//  * A single chat interface where the user can type queries for:
//  *   - WEB endpoint
//  *   - WORK endpoint
//  * or request a proposal. No “search” component needed.
//  */
// export default function BrainChat({
//   messages,
//   onSendMessage,
//   isLoading,
//   collaborators,
//   onProposalRequest,
// }: BrainChatProps) {
//   const [input, setInput] = useState('');
//   const [proposalReqs, setProposalReqs] = useState('');
//   const scrollRef = useRef<HTMLDivElement>(null);

//   // Auto-scroll to bottom on new messages
//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // Normal query to web/work
//   const handleSend = () => {
//     if (!input.trim()) return;
//     onSendMessage(input.trim());
//     setInput('');
//   };

//   // Generate proposal
//   const handleGenerateProposal = () => {
//     if (!onProposalRequest) return;
//     const reqsArray = proposalReqs
//       .split(',')
//       .map(r => r.trim())
//       .filter(Boolean);
//     if (reqsArray.length) {
//       onProposalRequest(reqsArray);
//       setProposalReqs('');
//     }
//   };

//   return (
//     <div className="flex flex-col h-full">
//       {/* Messages area */}
//       <div ref={scrollRef} className="flex-1 overflow-auto p-2 border-b border-gray-200">
//         {messages.map((m) => (
//           <div
//             key={m.id}
//             className={`mb-2 p-2 rounded ${
//               m.type === 'ai' ? 'bg-gray-100' : 'bg-blue-50'
//             }`}
//           >
//             <strong>{m.type.toUpperCase()}:</strong>
//             <div className="mt-1 whitespace-pre-wrap text-sm">{m.content}</div>
//           </div>
//         ))}
//       </div>

//       {/* Input + proposal area */}
//       <div className="p-2 space-y-2">
//         <div className="flex gap-2">
//           <input
//             type="text"
//             placeholder="Type your query here..."
//             className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter') handleSend();
//             }}
//           />
//           <Button variant="default" onClick={handleSend} disabled={isLoading}>
//             Send
//           </Button>
//         </div>

//         {/* Optional: “Generate Proposal” */}
//         {onProposalRequest && (
//           <div className="border-t pt-2 space-y-1 text-sm">
//             <label className="font-semibold block">
//               Proposal Requirements (comma-separated):
//             </label>
//             <input
//               type="text"
//               placeholder="Faster charging, bigger coverage, renewable energy..."
//               className="w-full border border-gray-300 rounded px-2 py-1"
//               value={proposalReqs}
//               onChange={(e) => setProposalReqs(e.target.value)}
//             />
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={handleGenerateProposal}
//               disabled={isLoading}
//             >
//               Generate Proposal
//             </Button>
//           </div>
//         )}

//         {isLoading && <div className="text-xs text-gray-500">Loading...</div>}
//       </div>
//     </div>
//   );
// }


'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/brainButton';
import { Message, User } from '@/store/brainStore';

interface BrainChatProps {
  messages: Message[];
  onSendMessage: (query: string) => void; // "web" or "work" query
  isLoading: boolean;
  collaborators: User[];
  onProposalRequest?: (requirements: string[]) => void;
}

/**
 * A single chat interface to talk to either the "web" or "work" endpoint.
 */
export default function BrainChat({
  messages,
  onSendMessage,
  isLoading,
  collaborators,
  onProposalRequest,
}: BrainChatProps) {
  const [input, setInput] = useState('');
  const [proposalReqs, setProposalReqs] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Normal query
  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input.trim());
    setInput('');
  };

  // Generate proposal
  const handleGenerateProposal = () => {
    if (!onProposalRequest) return;
    const reqsArray = proposalReqs
      .split(',')
      .map(r => r.trim())
      .filter(Boolean);
    if (reqsArray.length) {
      onProposalRequest(reqsArray);
      setProposalReqs('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div ref={scrollRef} className="flex-1 overflow-auto p-2 border-b border-gray-200">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`mb-2 p-2 rounded ${
              m.type === 'ai' ? 'bg-gray-100' : 'bg-blue-50'
            }`}
          >
            <strong>{m.type.toUpperCase()}:</strong>
            <div className="mt-1 whitespace-pre-wrap text-sm">{m.content}</div>
          </div>
        ))}
      </div>

      <div className="p-2 space-y-2">
        {/* Normal input */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your query here..."
            className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
          />
          <Button variant="default" onClick={handleSend} disabled={isLoading}>
            Send
          </Button>
        </div>

        {/* Proposal generation */}
        {onProposalRequest && (
          <div className="border-t pt-2 space-y-1 text-sm">
            <label className="font-semibold block">
              Proposal Requirements (comma-separated):
            </label>
            <input
              type="text"
              placeholder="Faster charging, bigger coverage, renewable energy..."
              className="w-full border border-gray-300 rounded px-2 py-1"
              value={proposalReqs}
              onChange={(e) => setProposalReqs(e.target.value)}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerateProposal}
              disabled={isLoading}
            >
              Generate Proposal
            </Button>
          </div>
        )}

        {isLoading && <div className="text-xs text-gray-500">Loading...</div>}
      </div>
    </div>
  );
}
