// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// interface Message {
//   id: string;
//   content: string;
//   type: 'user' | 'ai';
//   timestamp: Date;
// }

// interface ChatProps {
//   onSendMessage?: (message: string) => void;
//   messages?: Message[];
//   isLoading?: boolean;
// }

// export default function Chat({
//   onSendMessage,
//   messages = [],
//   isLoading = false,
// }: ChatProps) {
//   const [input, setInput] = useState('');
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLTextAreaElement>(null);

//   // Auto-scroll to bottom when new messages arrive
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Handle message submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim() || !onSendMessage) return;

//     onSendMessage(input);
//     setInput('');
//   };

//   // Auto-resize textarea
//   const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const textarea = e.target;
//     setInput(textarea.value);
    
//     // Reset height to auto to get the correct scrollHeight
//     textarea.style.height = 'auto';
//     textarea.style.height = `${textarea.scrollHeight}px`;
//   };

//   return (
//     <div className="flex flex-col h-full bg-white">
//       {/* Messages Area */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         <AnimatePresence>
//           {messages.map((message) => (
//             <motion.div
//               key={message.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className={`flex ${
//                 message.type === 'user' ? 'justify-end' : 'justify-start'
//               }`}
//             >
//               <div
//                 className={`max-w-[80%] p-3 rounded-lg ${
//                   message.type === 'user'
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-gray-100 text-gray-800'
//                 }`}
//               >
//                 <p className="text-sm whitespace-pre-wrap">{message.content}</p>
//                 <span className="text-xs opacity-70 mt-1 block">
//                   {new Date(message.timestamp).toLocaleTimeString()}
//                 </span>
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Area */}
//       <form onSubmit={handleSubmit} className="border-t p-4">
//         <div className="relative">
//           <textarea
//             ref={inputRef}
//             value={input}
//             onChange={handleInput}
//             placeholder="Type a message..."
//             className="w-full px-4 py-2 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[44px] max-h-32"
//             rows={1}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter' && !e.shiftKey) {
//                 e.preventDefault();
//                 handleSubmit(e);
//               }
//             }}
//           />
//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`absolute right-2 bottom-2 p-2 rounded-lg transition-colors ${
//               isLoading
//                 ? 'bg-gray-100 text-gray-400'
//                 : 'bg-blue-500 text-white hover:bg-blue-600'
//             }`}
//           >
//             {isLoading ? (
//               <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
//             ) : (
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }



// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Paperclip, Bot } from 'lucide-react';

// interface Message {
//   id: string;
//   content: string;
//   type: 'user' | 'ai';
//   timestamp: Date;
//   status?: 'sending' | 'sent' | 'error';
//   elements?: CanvasElement[];
// }

// interface CanvasElement {
//   id: string;
//   type: 'chart' | 'table' | 'code' | 'diagram';
//   content: any;
//   position: { x: number; y: number };
// }

// interface ChatProps {
//   onSendMessage?: (message: string) => void;
//   onAddCanvasElement?: (element: CanvasElement) => void;
//   messages?: Message[];
//   isLoading?: boolean;
// }

// export default function Chat({
//   onSendMessage,
//   onAddCanvasElement,
//   messages = [],
//   isLoading = false,
// }: ChatProps) {
//   const [input, setInput] = useState('');
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLTextAreaElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Auto-scroll to bottom when new messages arrive
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Handle message submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim() || !onSendMessage) return;

//     onSendMessage(input);
//     setInput('');

//     // Reset textarea height
//     if (inputRef.current) {
//       inputRef.current.style.height = 'auto';
//     }
//   };

//   // Auto-resize textarea
//   const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const textarea = e.target;
//     setInput(textarea.value);
    
//     // Reset height to auto to get the correct scrollHeight
//     textarea.style.height = 'auto';
//     textarea.style.height = `${textarea.scrollHeight}px`;
//   };

//   // Handle file upload
//   const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     try {
//       const formData = new FormData();
//       formData.append('file', file);

//       // You can implement file upload logic here
//       console.log('File uploaded:', file.name);
      
//       // Clear the input
//       event.target.value = '';
//     } catch (error) {
//       console.error('File upload failed:', error);
//     }
//   };

//   return (
//     <div className="flex flex-col h-full bg-white">
//       {/* Header */}
//       <div className="flex items-center p-4 border-b">
//         <Bot className="w-6 h-6 mr-2 text-blue-500" />
//         <h2 className="text-lg font-semibold">BizChat</h2>
//       </div>

//       {/* Messages Area */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         <AnimatePresence>
//           {messages.map((message) => (
//             <motion.div
//               key={message.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className={`flex ${
//                 message.type === 'user' ? 'justify-end' : 'justify-start'
//               }`}
//             >
//               <div
//                 className={`max-w-[80%] p-3 rounded-lg ${
//                   message.type === 'user'
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-gray-100 text-gray-800'
//                 }`}
//               >
//                 <pre className="text-sm whitespace-pre-wrap font-sans">{message.content}</pre>
//                 <span className="text-xs opacity-70 mt-1 block">
//                   {new Date(message.timestamp).toLocaleTimeString()}
//                   {message.status === 'sending' && ' • Sending...'}
//                   {message.status === 'error' && ' • Error'}
//                 </span>
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Area */}
//       <form onSubmit={handleSubmit} className="border-t p-4">
//         <div className="relative flex items-end gap-2">
//           <textarea
//             ref={inputRef}
//             value={input}
//             onChange={handleInput}
//             placeholder="Ask about EV charging research..."
//             className="flex-1 px-4 py-2 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[44px] max-h-32"
//             rows={1}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter' && !e.shiftKey) {
//                 e.preventDefault();
//                 handleSubmit(e);
//               }
//             }}
//           />
          
//           {/* File Upload */}
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleFileUpload}
//             className="hidden"
//           />
//           <button
//             type="button"
//             onClick={() => fileInputRef.current?.click()}
//             className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
//             disabled={isLoading}
//           >
//             <Paperclip className="w-5 h-5" />
//           </button>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isLoading || !input.trim()}
//             className={`p-2 rounded-lg transition-colors ${
//               isLoading || !input.trim()
//                 ? 'bg-gray-100 text-gray-400'
//                 : 'bg-blue-500 text-white hover:bg-blue-600'
//             }`}
//           >
//             {isLoading ? (
//               <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
//             ) : (
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }




// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Paperclip, Bot, FileText, Mic, ChevronDown, Send, X } from 'lucide-react';
// import { Tooltip } from '@/components/ui/tooltip';
// import { useToast } from '@/components/ui/use-toast';
// import { Button } from '@/components/ui/button';
// import { Menu } from '@/components/ui/menu';
// import { wsService } from '@/lib/websocket';

// interface Message {
//   id: string;
//   content: string;
//   type: 'user' | 'ai';
//   timestamp: Date;
//   status?: 'sending' | 'sent' | 'error';
//   elements?: CanvasElement[];
//   metadata?: {
//     confidence?: number;
//     source?: string;
//     type?: 'research' | 'proposal' | 'requirements' | 'meeting';
//   };
// }

// interface CanvasElement {
//   id: string;
//   type: 'chart' | 'table' | 'code' | 'diagram' | 'mermaid' | 'meeting-transcript' | 'proposal';
//   content: any;
//   position: { x: number; y: number };
//   size?: { width: number; height: number };
//   metadata?: {
//     source?: string;
//     timestamp?: string;
//     author?: string;
//     version?: string;
//     confidence?: number;
//   };
// }

// interface ChatProps {
//   onSendMessage?: (message: string) => void;
//   onAddCanvasElement?: (element: CanvasElement) => void;
//   messages?: Message[];
//   isLoading?: boolean;
//   collaborators?: Array<{ id: string; name: string; avatar?: string }>;
// }

// export default function Chat({
//   onSendMessage,
//   onAddCanvasElement,
//   messages = [],
//   isLoading = false,
//   collaborators = []
// }: ChatProps) {
//   const [input, setInput] = useState('');
//   const [isRecording, setIsRecording] = useState(false);
//   const [uploadMenu, setUploadMenu] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLTextAreaElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const { toast } = useToast();

//   // Real-time collaboration integration
//   useEffect(() => {
//     const handleCollaboratorActivity = (data: any) => {
//       // Handle real-time updates from collaborators
//       console.log('Collaborator activity:', data);
//     };

//     wsService.subscribe('COLLABORATOR_ACTIVITY', handleCollaboratorActivity);
//     return () => wsService.unsubscribe('COLLABORATOR_ACTIVITY', handleCollaboratorActivity);
//   }, []);

//   // Auto-scroll to bottom when new messages arrive
//   const scrollToBottom = useCallback(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, []);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, scrollToBottom]);

//   // Handle AI response processing and canvas element creation
//   const processAIResponse = useCallback(async (response: any) => {
//     if (!onAddCanvasElement) return;

//     try {
//       // Process research data
//       if (response.daily_passengers || response.ev_parking_spaces) {
//         const chartElement: CanvasElement = {
//           id: crypto.randomUUID(),
//           type: 'chart',
//           content: {
//             type: 'bar',
//             data: [
//               { name: 'Daily Passengers', value: response.daily_passengers },
//               { name: 'EV Spaces', value: response.ev_parking_spaces }
//             ]
//           },
//           position: { x: 100, y: 100 },
//           metadata: {
//             confidence: response.confidence,
//             source: response.sources?.[0]?.url,
//             timestamp: new Date().toISOString()
//           }
//         };
//         onAddCanvasElement(chartElement);
//       }

//       // Process competitor analysis
//       if (response.competitors) {
//         const tableElement: CanvasElement = {
//           id: crypto.randomUUID(),
//           type: 'table',
//           content: {
//             headers: ['Company', 'Stations', 'Locations'],
//             rows: response.competitors.map((comp: any) => [
//               comp.name,
//               comp.stations,
//               comp.locations.join(', ')
//             ])
//           },
//           position: { x: 100, y: 300 }
//         };
//         onAddCanvasElement(tableElement);

//         // Create competitor distribution diagram
//         const mermaidElement: CanvasElement = {
//           id: crypto.randomUUID(),
//           type: 'mermaid',
//           content: `
// graph TD
//     Hub[Central Hub]
//     ${response.competitors.map(comp => `
//     ${comp.name.replace(/\s+/g, '_')}[${comp.name}]
//     Hub --> ${comp.name.replace(/\s+/g, '_')}
//     ${comp.locations.map(loc => `${comp.name.replace(/\s+/g, '_')} --> ${loc.replace(/\s+/g, '_')}`).join('\n')}
//     `).join('\n')}
//           `,
//           position: { x: 550, y: 100 }
//         };
//         onAddCanvasElement(mermaidElement);
//       }

//       // Process requirements
//       if (response.requirements) {
//         const requirementsElement: CanvasElement = {
//           id: crypto.randomUUID(),
//           type: 'text',
//           content: {
//             title: 'Customer Requirements',
//             items: response.requirements
//           },
//           position: { x: 100, y: 100 }
//         };
//         onAddCanvasElement(requirementsElement);
//       }

//       // Process proposal
//       if (response.generated_proposal) {
//         const proposalElement: CanvasElement = {
//           id: crypto.randomUUID(),
//           type: 'proposal',
//           content: {
//             title: response.generated_proposal,
//             author: response.metadata.author,
//             version: response.metadata.version
//           },
//           position: { x: 100, y: 100 }
//         };
//         onAddCanvasElement(proposalElement);
//       }
//     } catch (error) {
//       console.error('Error processing AI response:', error);
//       toast({
//         title: 'Error',
//         description: 'Failed to process AI response',
//         variant: 'destructive'
//       });
//     }
//   }, [onAddCanvasElement, toast]);

//   // Handle message submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim() || !onSendMessage) return;

//     const userMessage: Message = {
//       id: crypto.randomUUID(),
//       content: input,
//       type: 'user',
//       timestamp: new Date(),
//       status: 'sending'
//     };

//     try {
//       // Determine API endpoint based on message content
//       let endpoint = '/api/research';
//       if (input.toLowerCase().includes('proposal')) {
//         endpoint = '/api/generate_proposal';
//       } else if (input.toLowerCase().includes('requirements')) {
//         endpoint = '/api/requirements';
//       }

//       const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ query: input })
//       });

//       if (!response.ok) throw new Error('API request failed');

//       const data = await response.json();
//       await processAIResponse(data);
      
//       onSendMessage(input);
//       setInput('');

//       if (inputRef.current) {
//         inputRef.current.style.height = 'auto';
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//       toast({
//         title: 'Error',
//         description: 'Failed to send message',
//         variant: 'destructive'
//       });
//     }
//   };

//   // Handle file upload
//   const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     try {
//       const formData = new FormData();
//       formData.append('file', file);

//       // Handle different file types
//       if (file.type.includes('audio')) {
//         // Process meeting recording
//         const response = await fetch('/api/transcribe', {
//           method: 'POST',
//           body: formData
//         });
//         if (!response.ok) throw new Error('Transcription failed');
//         const data = await response.json();
//         await processAIResponse(data);
//       } else {
//         // Process other documents
//         const response = await fetch('/api/document', {
//           method: 'POST',
//           body: formData
//         });
//         if (!response.ok) throw new Error('Document processing failed');
//         const data = await response.json();
//         await processAIResponse(data);
//       }

//       toast({
//         title: 'Success',
//         description: 'File uploaded successfully'
//       });
//     } catch (error) {
//       console.error('File upload failed:', error);
//       toast({
//         title: 'Error',
//         description: 'File upload failed',
//         variant: 'destructive'
//       });
//     } finally {
//       if (event.target) event.target.value = '';
//     }
//   };

//   // Handle voice input
//   const handleVoiceInput = () => {
//     setIsRecording(prev => !prev);
//     // Implementation for voice recording
//   };

//   // Auto-resize textarea
//   const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const textarea = e.target;
//     setInput(textarea.value);
//     textarea.style.height = 'auto';
//     textarea.style.height = `${textarea.scrollHeight}px`;
//   };

//   return (
//     <div className="flex flex-col h-full bg-white">
//       {/* Header with collaborators */}
//       <div className="flex items-center justify-between p-4 border-b">
//         <div className="flex items-center">
//           <Bot className="w-6 h-6 mr-2 text-blue-500" />
//           <h2 className="text-lg font-semibold">BizChat</h2>
//         </div>
        
//         {/* Collaborators */}
//         <div className="flex items-center space-x-2">
//           {collaborators.map((collaborator) => (
//             <Tooltip key={collaborator.id} content={collaborator.name}>
//               <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
//                 {collaborator.avatar ? (
//                   <img 
//                     src={collaborator.avatar} 
//                     alt={collaborator.name}
//                     className="w-full h-full rounded-full"
//                   />
//                 ) : (
//                   <span className="text-sm font-medium">
//                     {collaborator.name[0]}
//                   </span>
//                 )}
//               </div>
//             </Tooltip>
//           ))}
//         </div>
//       </div>

//       {/* Messages Area */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         <AnimatePresence>
//           {messages.map((message) => (
//             <motion.div
//               key={message.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className={`flex ${
//                 message.type === 'user' ? 'justify-end' : 'justify-start'
//               }`}
//             >
//               <div
//                 className={`max-w-[80%] p-3 rounded-lg ${
//                   message.type === 'user'
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-gray-100 text-gray-800'
//                 }`}
//               >
//                 <pre className="text-sm whitespace-pre-wrap font-sans">
//                   {message.content}
//                 </pre>
//                 <div className="flex items-center justify-between text-xs opacity-70 mt-1">
//                   <span>
//                     {new Date(message.timestamp).toLocaleTimeString()}
//                     {message.status === 'sending' && ' • Sending...'}
//                     {message.status === 'error' && ' • Error'}
//                   </span>
//                   {message.metadata?.confidence && (
//                     <span className="ml-2">
//                       Confidence: {(message.metadata.confidence * 100).toFixed(1)}%
//                     </span>
//                   )}
//                 </div>
//                 {message.metadata?.source && (
//                   <div className="text-xs opacity-70 mt-1">
//                     Source: {message.metadata.source}
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Area */}
//       <form onSubmit={handleSubmit} className="border-t p-4">
//         <div className="relative flex items-end gap-2">
//           <textarea
//             ref={inputRef}
//             value={input}
//             onChange={handleInput}
//             placeholder="Ask about EV charging research..."
//             className="flex-1 px-4 py-2 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[44px] max-h-32"
//             rows={1}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter' && !e.shiftKey) {
//                 e.preventDefault();
//                 handleSubmit(e);
//               }
//             }}
//           />
          
//           {/* Action Buttons */}
//           <div className="flex items-center space-x-2">
//             {/* Voice Input */}
//             <Button
//               type="button"
//               variant="ghost"
//               size="icon"
//               onClick={handleVoiceInput}
//               className={isRecording ? 'text-red-500' : 'text-gray-500'}
//             >
//               <Mic className="w-5 h-5" />
//             </Button>

//             {/* File Upload */}
//             <div className="relative">
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileUpload}
//                 className="hidden"
//                 accept=".doc,.docx,.pdf,.txt,.mp3,.wav"
//               />
//               <Button
//                 type="button"
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => setUploadMenu(!uploadMenu)}
//               >
//                 <Paperclip className="w-5 h-5" />
//               </Button>
              
//               {uploadMenu && (
//                 <Menu className="absolute bottom-full right-0 mb-2">
//                   <Button
//                     variant="ghost"
//                     onClick={() => {
//                       fileInputRef.current?.click();
//                       setUploadMenu(false);
//                     }}
//                   >
//                     <FileText className="w-4 h-4 mr-2" />
//                     <span>Upload Document</span>
//                     </Button>
//                     {/* Add other menu items as needed */}
//                     </Menu>
//                     )}




'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Paperclip, Bot, FileText, Mic, ChevronDown, Send } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Menu } from '@/components/ui/menu';
import { wsService } from '@/lib/websocket';

interface Message {
  id: string;
  content: string;
  type: 'user' | 'ai';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
  elements?: CanvasElement[];
  metadata?: {
    confidence?: number;
    source?: string;
    type?: 'research' | 'proposal' | 'requirements' | 'meeting';
  };
}

interface CanvasElement {
  id: string;
  type: 'chart' | 'table' | 'code' | 'diagram' | 'mermaid' | 'meeting-transcript' | 'proposal';
  content: any;
  position: { x: number; y: number };
  size?: { width: number; height: number };
  metadata?: {
    source?: string;
    timestamp?: string;
    author?: string;
    version?: string;
    confidence?: number;
  };
}

interface ChatProps {
  onSendMessage?: (message: string) => void;
  onAddCanvasElement?: (element: CanvasElement) => void;
  messages?: Message[];
  isLoading?: boolean;
  collaborators?: Array<{ id: string; name: string; avatar?: string }>;
}

export default function Chat({
  onSendMessage,
  onAddCanvasElement,
  messages = [],
  isLoading = false,
  collaborators = []
}: ChatProps) {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [uploadMenu, setUploadMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Real-time collaboration integration
  useEffect(() => {
    const handleCollaboratorActivity = (data: any) => {
      // Handle real-time updates from collaborators
      console.log('Collaborator activity:', data);
    };

    wsService.subscribe('COLLABORATOR_ACTIVITY', handleCollaboratorActivity);
    return () => wsService.unsubscribe('COLLABORATOR_ACTIVITY', handleCollaboratorActivity);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Handle AI response processing and canvas element creation
  const processAIResponse = useCallback(async (response: any) => {
    if (!onAddCanvasElement) return;

    try {
      // Process research data
      if (response.daily_passengers || response.ev_parking_spaces) {
        const chartElement: CanvasElement = {
          id: crypto.randomUUID(),
          type: 'chart',
          content: {
            type: 'bar',
            data: [
              { name: 'Daily Passengers', value: response.daily_passengers },
              { name: 'EV Spaces', value: response.ev_parking_spaces }
            ]
          },
          position: { x: 100, y: 100 },
          metadata: {
            confidence: response.confidence,
            source: response.sources?.[0]?.url,
            timestamp: new Date().toISOString()
          }
        };
        onAddCanvasElement(chartElement);
      }

      // Process competitor analysis
      if (response.competitors) {
        const tableElement: CanvasElement = {
          id: crypto.randomUUID(),
          type: 'table',
          content: {
            headers: ['Company', 'Stations', 'Locations'],
            rows: response.competitors.map((comp: any) => [
              comp.name,
              comp.stations,
              comp.locations.join(', ')
            ])
          },
          position: { x: 100, y: 300 }
        };
        onAddCanvasElement(tableElement);

        // Create competitor distribution diagram
        const mermaidElement: CanvasElement = {
          id: crypto.randomUUID(),
          type: 'mermaid',
          content: `
graph TD
    Hub[Central Hub]
    ${response.competitors.map(comp => `
    ${comp.name.replace(/\s+/g, '_')}[${comp.name}]
    Hub --> ${comp.name.replace(/\s+/g, '_')}
    ${comp.locations.map(loc => `${comp.name.replace(/\s+/g, '_')} --> ${loc.replace(/\s+/g, '_')}`).join('\n')}
    `).join('\n')}
          `,
          position: { x: 550, y: 100 }
        };
        onAddCanvasElement(mermaidElement);
      }

      // Process requirements
      if (response.requirements) {
        const requirementsElement: CanvasElement = {
          id: crypto.randomUUID(),
          type: 'text',
          content: {
            title: 'Customer Requirements',
            items: response.requirements
          },
          position: { x: 100, y: 100 }
        };
        onAddCanvasElement(requirementsElement);
      }

      // Process proposal
      if (response.generated_proposal) {
        const proposalElement: CanvasElement = {
          id: crypto.randomUUID(),
          type: 'proposal',
          content: {
            title: response.generated_proposal,
            author: response.metadata.author,
            version: response.metadata.version
          },
          position: { x: 100, y: 100 }
        };
        onAddCanvasElement(proposalElement);
      }
    } catch (error) {
      console.error('Error processing AI response:', error);
      toast({
        title: 'Error',
        description: 'Failed to process AI response',
        variant: 'destructive'
      });
    }
  }, [onAddCanvasElement, toast]);

  // Handle message submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !onSendMessage) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: input,
      type: 'user',
      timestamp: new Date(),
      status: 'sending'
    };

    try {
      // Determine API endpoint based on message content
      let endpoint = '/api/research';
      if (input.toLowerCase().includes('proposal')) {
        endpoint = '/api/generate_proposal';
      } else if (input.toLowerCase().includes('requirements')) {
        endpoint = '/api/requirements';
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input })
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      await processAIResponse(data);
      
      onSendMessage(input);
      setInput('');

      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message',
        variant: 'destructive'
      });
    }
  };

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Handle different file types
      if (file.type.includes('audio')) {
        // Process meeting recording
        const response = await fetch('/api/transcribe', {
          method: 'POST',
          body: formData
        });
        if (!response.ok) throw new Error('Transcription failed');
        const data = await response.json();
        await processAIResponse(data);
      } else {
        // Process other documents
        const response = await fetch('/api/document', {
          method: 'POST',
          body: formData
        });
        if (!response.ok) throw new Error('Document processing failed');
        const data = await response.json();
        await processAIResponse(data);
      }

      toast({
        title: 'Success',
        description: 'File uploaded successfully'
      });
    } catch (error) {
      console.error('File upload failed:', error);
      toast({
        title: 'Error',
        description: 'File upload failed',
        variant: 'destructive'
      });
    } finally {
      if (event.target) event.target.value = '';
    }
  };

  // Handle voice input
  const handleVoiceInput = () => {
    setIsRecording(prev => !prev);
    // Implementation for voice recording will go here
    // This is a placeholder for the voice recording functionality
    toast({
      title: isRecording ? 'Recording stopped' : 'Recording started',
      description: 'Voice recording functionality coming soon',
    });
  };

  // Auto-resize textarea
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    setInput(textarea.value);
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header with collaborators */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Bot className="w-6 h-6 mr-2 text-blue-500" />
          <h2 className="text-lg font-semibold">BizChat</h2>
        </div>
        
        {/* Collaborators */}
        <div className="flex items-center space-x-2">
          {collaborators.map((collaborator) => (
            <Tooltip key={collaborator.id} content={collaborator.name}>
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                {collaborator.avatar ? (
                  <img 
                    src={collaborator.avatar} 
                    alt={collaborator.name}
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <span className="text-sm font-medium">
                    {collaborator.name[0]}
                  </span>
                )}
              </div>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <pre className="text-sm whitespace-pre-wrap font-sans">
                  {message.content}
                </pre>
                <div className="flex items-center justify-between text-xs opacity-70 mt-1">
                  <span>
                    {new Date(message.timestamp).toLocaleTimeString()}
                    {message.status === 'sending' && ' • Sending...'}
                    {message.status === 'error' && ' • Error'}
                  </span>
                  {message.metadata?.confidence && (
                    <span className="ml-2">
                      Confidence: {(message.metadata.confidence * 100).toFixed(1)}%
                    </span>
                  )}
                </div>
                {message.metadata?.source && (
                  <div className="text-xs opacity-70 mt-1">
                    Source: {message.metadata.source}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="relative flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInput}
            placeholder="Ask about EV charging research..."
            className="flex-1 px-4 py-2 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[44px] max-h-32"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Voice Input */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleVoiceInput}
              className={isRecording ? 'text-red-500' : 'text-gray-500'}
            >
              <Mic className="w-5 h-5" />
            </Button>

            {/* File Upload */}
            <div className="relative">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept=".doc,.docx,.pdf,.txt,.mp3,.wav"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setUploadMenu(!uploadMenu)}
              >
                <Paperclip className="w-5 h-5" />
              </Button>
              
              {uploadMenu && (
                <Menu className="absolute bottom-full right-0 mb-2">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      fileInputRef.current?.click();
                      setUploadMenu(false);
                    }}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    <span>Upload Document</span>
                  </Button>
                  {/* Add other menu items as needed */}
                </Menu>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}