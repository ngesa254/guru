// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   ChevronRight,
//   Code,
//   User,
//   HelpCircle,
//   Mail,
//   Users,
//   Briefcase,
//   Slack,
//   Blocks,
//   Diamond,
//   X,
//   FileText,
//   Github,
//   MessageCircle,
//   Edit2,
//   Mic,
//   Send,
//   Settings,
// } from "lucide-react";

// // Types for chat messages
// interface Message {
//   type: "user" | "assistant";
//   content: string;
// }

// export default function KazuriChat() {
//   // 1) TABS: "Describe" or "Configure"
//   const [currentTab, setCurrentTab] = useState<"Describe" | "Configure">("Describe");

//   // 2) DESCRIBE (CHAT) STATES & LOGIC
//   const [chatMessages, setChatMessages] = useState<Message[]>([
//     {
//       type: "user",
//       content: "Hello! I'd like to create an AI agent for iot sim management.",
//     },
//     {
//       type: "assistant",
//       content: "Great! Let's get started. Describe your agent’s main function.",
//     },
//   ]);
//   const [inputValue, setInputValue] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [chatMessages]);

//   const handleSendMessage = () => {
//     if (!inputValue.trim()) return;

//     const userMsg: Message = { type: "user", content: inputValue.trim() };
//     setChatMessages((prev) => [...prev, userMsg]);
//     setInputValue("");

//     // Simulate AI reply
//     setTimeout(() => {
//       const aiMsg: Message = {
//         type: "assistant",
//         content: `AI response for: "${userMsg.content}"`,
//       };
//       setChatMessages((prev) => [...prev, aiMsg]);
//     }, 800);
//   };

//   // 3) CONFIGURE (COLLAPSIBLE SECTIONS) STATES & LOGIC
//   const [activeSection, setActiveSection] = useState<string>("");

//   // Basic info
//   const [basicInfo, setBasicInfo] = useState({
//     name: "Enter Agent name...",
//     description:
//       "Enter a description for your agent...",
//   });

//   // Track selected agent type (for "agenttype" section)
//   const [selectedAgentType, setSelectedAgentType] = useState<string>("");
//   const handleAgentTypeClick = (type: string) => {
//     setSelectedAgentType(type);
//   };

//   // ————— NEW: Track which action is selected
//   const [selectedAction, setSelectedAction] = useState<string>("");

//   // Example data for "actions" - you can add as many items as you need
//   const actionItems = [
//     {
//       id: "pull_request",
//       label: "Pull Request",
//       iconBg: "bg-orange-50",
//       iconColor: "text-orange-600",
//       icon: Code,
//     },
//     {
//       id: "expert_search",
//       label: "Expert Search",
//       iconBg: "bg-blue-50",
//       iconColor: "text-blue-600",
//       icon: User,
//     },
//     {
//       id: "create_jira",
//       label: "Create Jira",
//       iconBg: "bg-blue-50",
//       iconColor: "text-blue-600",
//       icon: HelpCircle,
//     },
//     {
//       id: "create_email",
//       label: "Create Email",
//       iconBg: "bg-red-50",
//       iconColor: "text-red-600",
//       icon: Mail,
//     },
//     // ...add as many more items as you need
//   ];

//   // Sections to show in "Configure" tab
//   const sections = [
//     { id: "basic", title: "Basic info" },
//     { id: "instruction", title: "Instruction" },
//     { id: "agenttype", title: "agent type" },
//     { id: "actions", title: "Actions" },
//     { id: "knowledge", title: "Knowledge" },
//     { id: "function", title: "Company functions" },
//     { id: "triggering", title: "Triggering" },
//     { id: "publish", title: "Publish" },
//   ];

//   // Render content for each collapsible section
//   const renderSectionContent = (sectionId: string) => {
//     switch (sectionId) {
//       case "basic":
//         return (
//           <div className="space-y-4">
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
//                 <Code className="w-4 h-4 text-blue-600" />
//               </div>
//               <input
//                 type="text"
//                 value={basicInfo.name}
//                 onChange={(e) => setBasicInfo({ ...basicInfo, name: e.target.value })}
//                 className="flex-1 p-2 border rounded-md"
//                 placeholder="Enter agent name ..."
//               />
//             </div>
//             <textarea
//               value={basicInfo.description}
//               onChange={(e) =>
//                 setBasicInfo({ ...basicInfo, description: e.target.value })
//               }
//               className="w-full p-3 border rounded-md min-h-[100px]"
//               placeholder="Enter a description for your agent..."
//             />
//           </div>
//         );

      
//       case "agenttype":
//         return (
//           <div className="mt-4 flex items-center gap-3 justify-center">
//             {/* Diamond */}
//             <div
//               onClick={() => handleAgentTypeClick("diamond")}
//               className={`cursor-pointer p-2 rounded-md transition-colors ${
//                 selectedAgentType === "diamond"
//                   ? "bg-blue-100"
//                   : "hover:bg-gray-100"
//               }`}
//             >
//               <Diamond
//                 className={`w-6 h-6 ${
//                   selectedAgentType === "diamond"
//                     ? "text-blue-500"
//                     : "text-blue-500"
//                 }`}
//               />
//             </div>

//             <div className="h-px w-16 bg-gray-200" />

//             {/* X */}
//             <div
//               onClick={() => handleAgentTypeClick("x")}
//               className={`cursor-pointer p-2 rounded-md transition-colors ${
//                 selectedAgentType === "x" ? "bg-blue-100" : "hover:bg-gray-100"
//               }`}
//             >
//               <X
//                 className={`w-6 h-6 ${
//                   selectedAgentType === "x" ? "text-blue-500" : "text-gray-400"
//                 }`}
//               />
//             </div>

//             <div className="h-px w-16 bg-gray-200" />

//             {/* FileText */}
//             <div
//               onClick={() => handleAgentTypeClick("filetext")}
//               className={`cursor-pointer p-2 rounded-md transition-colors ${
//                 selectedAgentType === "filetext"
//                   ? "bg-blue-100"
//                   : "hover:bg-gray-100"
//               }`}
//             >
//               <FileText
//                 className={`w-6 h-6 ${
//                   selectedAgentType === "filetext"
//                     ? "text-blue-500"
//                     : "text-green-500"
//                 }`}
//               />
//             </div>

//             <div className="h-px w-16 bg-gray-200" />

//             {/* Code */}
//             <div
//               onClick={() => handleAgentTypeClick("code")}
//               className={`cursor-pointer p-2 rounded-md transition-colors ${
//                 selectedAgentType === "code" ? "bg-blue-100" : "hover:bg-gray-100"
//               }`}
//             >
//               <Code
//                 className={`w-6 h-6 ${
//                   selectedAgentType === "code" ? "text-blue-500" : "text-blue-500"
//                 }`}
//               />
//             </div>

//             <div className="h-px w-16 bg-gray-200" />

//             {/* Mail */}
//             <div
//               onClick={() => handleAgentTypeClick("mail")}
//               className={`cursor-pointer p-2 rounded-md transition-colors ${
//                 selectedAgentType === "mail"
//                   ? "bg-blue-100"
//                   : "hover:bg-gray-100"
//               }`}
//             >
//               <Mail
//                 className={`w-6 h-6 ${
//                   selectedAgentType === "mail" ? "text-blue-500" : "text-gray-400"
//                 }`}
//               />
//             </div>

//             <div className="h-px w-16 bg-gray-200" />

//             {/* Github */}
//             <div
//               onClick={() => handleAgentTypeClick("github")}
//               className={`cursor-pointer p-2 rounded-md transition-colors ${
//                 selectedAgentType === "github"
//                   ? "bg-blue-100"
//                   : "hover:bg-gray-100"
//               }`}
//             >
//               <Github
//                 className={`w-6 h-6 ${
//                   selectedAgentType === "github"
//                     ? "text-blue-500"
//                     : "text-gray-600"
//                 }`}
//               />
//             </div>
//           </div>
//         );

//       case "instruction":
//   return (
//     <div className="bg-gray-50 p-4 rounded-lg">
//       <textarea
//         className="w-full p-2 border border-gray-300 rounded-lg"
//         placeholder="You are a helpful AI assistant. Please respond to the following message:{input}"
//         rows="4"
//       ></textarea>
//     </div>
//   );

      
//       // ----- UPDATED: "actions" with scrollable & selectable items -----
//       case "actions":
//         return (
//           <div className="overflow-x-auto py-4">
//             {/* Use a flex container, but allow it to scroll horizontally when items overflow */}
//             <div className="flex items-center gap-6">
//               {actionItems.map((action) => {
//                 const IconComponent = action.icon;
//                 const isSelected = selectedAction === action.id;
//                 return (
//                   <div
//                     key={action.id}
//                     onClick={() => setSelectedAction(action.id)}
//                     className={`flex items-center gap-2 cursor-pointer p-2 rounded-md transition-colors min-w-[140px] ${
//                       isSelected ? "bg-blue-100" : "hover:bg-gray-100"
//                     }`}
//                   >
//                     <div
//                       className={`w-8 h-8 ${action.iconBg} rounded-lg flex items-center justify-center`}
//                     >
//                       <IconComponent className={`w-4 h-4 ${action.iconColor}`} />
//                     </div>
//                     <span className="text-sm">{action.label}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         );

//       case "knowledge":
//         return (
//           <div className="mt-4 flex items-center gap-3 justify-center">
//             <Diamond className="w-6 h-6 text-blue-500" />
//             <div className="h-px w-16 bg-gray-200" />
//             <X className="w-6 h-6 text-gray-400" />
//             <div className="h-px w-16 bg-gray-200" />
//             <FileText className="w-6 h-6 text-green-500" />
//             <div className="h-px w-16 bg-gray-200" />
//             <Code className="w-6 h-6 text-blue-500" />
//             <div className="h-px w-16 bg-gray-200" />
//             <Mail className="w-6 h-6 text-gray-400" />
//             <div className="h-px w-16 bg-gray-200" />
//             <Github className="w-6 h-6 text-gray-600" />
//           </div>
//         );

//       case "function":
//         return (
//           <div className="flex items-center gap-6 justify-center py-4">
//             {/* TES - Technical Enterprise Services */}
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
//                 <Settings className="w-4 h-4 text-green-600" />
//               </div>
//               <span className="text-sm">TES</span>
//             </div>

//             {/* EBU - Enterprise Business Unit */}
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
//                 <Briefcase className="w-4 h-4 text-blue-600" />
//               </div>
//               <span className="text-sm">EBU</span>
//             </div>

//             {/* DIT - Digital IT */}
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
//                 <Code className="w-4 h-4 text-orange-600" />
//               </div>
//               <span className="text-sm">DIT</span>
//             </div>

//             {/* HR - Human Resources */}
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
//                 <Users className="w-4 h-4 text-purple-600" />
//               </div>
//               <span className="text-sm">HR</span>
//             </div>
//           </div>
//         );

//       case "triggering":
//         return (
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <p className="text-gray-600">
//               Auto-trigger this app when a user asks a question about the
//               company's codebase, or questions relating to engineering practices
//               and software development lifecycle.
//             </p>
//           </div>
//         );

//       case "publish":
//         return (
//           <div>
//             <div className="flex items-center gap-8 justify-center py-4">
//               <div className="flex flex-col items-center gap-2">
//                 <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-100">
//                   <MessageCircle className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <span className="text-sm text-gray-600">Chat</span>
//               </div>
//               <div className="flex flex-col items-center gap-2">
//                 <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-green-100">
//                   <Slack className="w-6 h-6 text-green-600" />
//                 </div>
//                 <span className="text-sm text-gray-600">Slack</span>
//               </div>
//               <div className="flex flex-col items-center gap-2">
//                 <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-indigo-100">
//                   <Blocks className="w-6 h-6 text-indigo-600" />
//                 </div>
//                 <span className="text-sm text-gray-600">API</span>
//               </div>
//             </div>
//             <div className="flex justify-center mt-8">
//               <button className="px-8 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium text-sm">
//                 Configure Agent
//               </button>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   // 4) RENDER
//   return (
//     <div className="flex flex-col h-full w-full">
//       {/* TAB SWITCH (Describe / Configure) */}
//       <div className="mb-2 flex space-x-4">
//         <button
//           onClick={() => setCurrentTab("Describe")}
//           className={`px-4 py-2 rounded ${
//             currentTab === "Describe"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 text-gray-700"
//           }`}
//         >
//           Describe
//         </button>
//         <button
//           onClick={() => setCurrentTab("Configure")}
//           className={`px-4 py-2 rounded ${
//             currentTab === "Configure"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 text-gray-700"
//           }`}
//         >
//           Configure
//         </button>
//       </div>

//       {currentTab === "Describe" && (
//         <div className="flex flex-col h-full">
//           {/* Chat Messages */}
//           <div className="flex-1 overflow-y-auto mb-2">
//             {chatMessages.map((msg, index) => {
//               const isUser = msg.type === "user";
//               return (
//                 <div
//                   key={index}
//                   className={`mb-4 p-2 rounded ${
//                     isUser ? "bg-green-100 self-end" : "bg-white"
//                   }`}
//                 >
//                   {/* Icon + Label */}
//                   <div className="flex items-start gap-2 mb-1">
//                     <img
//                       src={isUser ? "/african.svg" : "/zuri-icon.svg"}
//                       alt={isUser ? "User Icon" : "AI Icon"}
//                       className="w-6 h-6 object-cover"
//                     />
//                     <p className="font-bold text-sm">
//                       {isUser ? "User" : "Kazuri Agent (AI)"}
//                     </p>
//                   </div>
//                   {/* Message content */}
//                   <pre className="text-sm whitespace-pre-wrap">{msg.content}</pre>
//                 </div>
//               );
//             })}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input Bar */}
//           <div className="relative">
//             <Input
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") handleSendMessage();
//               }}
//               placeholder="Type your message..."
//               className="pr-24"
//             />
//             <div className="absolute right-2 top-2 flex gap-2">
//               <Button variant="ghost" size="icon">
//                 <Edit2 size={16} />
//               </Button>
//               <Button variant="ghost" size="icon">
//                 <Mic size={16} />
//               </Button>
//               <Button variant="ghost" size="icon" onClick={handleSendMessage}>
//                 <Send size={16} />
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}

//       {currentTab === "Configure" && (
//         <div className="h-full w-full overflow-y-auto">
//           <div className="space-y-4 mt-2">
//             {sections.map((section) => (
//               <div
//                 key={section.id}
//                 className="bg-white rounded-lg border shadow-sm p-4"
//               >
//                 <div
//                   className="flex items-center justify-between cursor-pointer"
//                   onClick={() =>
//                     setActiveSection(activeSection === section.id ? "" : section.id)
//                   }
//                 >
//                   <span className="text-gray-700 font-medium">{section.title}</span>
//                   <ChevronRight
//                     className={`w-5 h-5 text-gray-400 transition-transform ${
//                       activeSection === section.id ? "rotate-90" : ""
//                     }`}
//                   />
//                 </div>
//                 {activeSection === section.id && (
//                   <div className="mt-4">{renderSectionContent(section.id)}</div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   ChevronRight,
//   Code,
//   User,
//   HelpCircle,
//   Mail,
//   Users,
//   Briefcase,
//   Slack,
//   Blocks,
//   Diamond,
//   X,
//   FileText,
//   Github,
//   MessageCircle,
//   Edit2,
//   Mic,
//   Send,
//   Settings,
// } from "lucide-react";

// // Types for chat messages
// interface Message {
//   type: "user" | "assistant";
//   content: string;
// }

// export default function KazuriChat() {
//   // 1) TABS: "Describe" or "Configure"
//   const [currentTab, setCurrentTab] = useState<"Describe" | "Configure">("Describe");

//   // 2) DESCRIBE (CHAT) STATES & LOGIC
//   const [chatMessages, setChatMessages] = useState<Message[]>([
//     {
//       type: "user",
//       content: "Hello! I'd like to create an AI agent for iot sim management.",
//     },
//     {
//       type: "assistant",
//       content: "Great! Let's get started. Describe your agent’s main function.",
//     },
//   ]);
//   const [inputValue, setInputValue] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [chatMessages]);

//   const handleSendMessage = () => {
//     if (!inputValue.trim()) return;

//     const userMsg: Message = { type: "user", content: inputValue.trim() };
//     setChatMessages((prev) => [...prev, userMsg]);
//     setInputValue("");

//     // Simulate AI reply
//     setTimeout(() => {
//       const aiMsg: Message = {
//         type: "assistant",
//         content: `AI response for: "${userMsg.content}"`,
//       };
//       setChatMessages((prev) => [...prev, aiMsg]);
//     }, 800);
//   };

//   // 3) CONFIGURE (COLLAPSIBLE SECTIONS) STATES & LOGIC
//   const [activeSection, setActiveSection] = useState<string>("");

//   // Basic info
//   const [basicInfo, setBasicInfo] = useState({
//     name: "Enter Agent name...",
//     description: "Enter a description for your agent...",
//   });

//   // Instructions (similar approach to Basic Info)
//   const [instructions, setInstructions] = useState(
//     "You are a helpful AI assistant. Please respond to the following message:{input}"
//   );

//   // Track selected agent type (for "agenttype" section)
//   const [selectedAgentType, setSelectedAgentType] = useState<string>("");
//   const handleAgentTypeClick = (type: string) => {
//     setSelectedAgentType(type);
//   };

//   // Track which action is selected
//   const [selectedAction, setSelectedAction] = useState<string>("");

//   // Example data for "actions"
//   const actionItems = [
//     {
//       id: "pull_request",
//       label: "Pull Request",
//       iconBg: "bg-orange-50",
//       iconColor: "text-orange-600",
//       icon: Code,
//     },
//     {
//       id: "expert_search",
//       label: "Expert Search",
//       iconBg: "bg-blue-50",
//       iconColor: "text-blue-600",
//       icon: User,
//     },
//     {
//       id: "create_jira",
//       label: "Create Jira",
//       iconBg: "bg-blue-50",
//       iconColor: "text-blue-600",
//       icon: HelpCircle,
//     },
//     {
//       id: "create_email",
//       label: "Create Email",
//       iconBg: "bg-red-50",
//       iconColor: "text-red-600",
//       icon: Mail,
//     },
//     // Add as many more items as you need...
//   ];

//   // Sections to show in "Configure" tab
//   const sections = [
//     { id: "basic", title: "Basic info" },
//     { id: "instruction", title: "Instruction" },
//     { id: "agenttype", title: "agent type" },
//     { id: "actions", title: "Actions" },
//     { id: "knowledge", title: "Knowledge" },
//     { id: "function", title: "Company functions" },
//     { id: "triggering", title: "Triggering" },
//     { id: "configure", title: "configure" },
//   ];

//   // Render content for each collapsible section
//   const renderSectionContent = (sectionId: string) => {
//     switch (sectionId) {
//       case "basic":
//         return (
//           <div className="space-y-4">
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
//                 <Code className="w-4 h-4 text-blue-600" />
//               </div>
//               <input
//                 type="text"
//                 value={basicInfo.name}
//                 onChange={(e) => setBasicInfo({ ...basicInfo, name: e.target.value })}
//                 className="flex-1 p-2 border rounded-md"
//                 placeholder="Enter agent name ..."
//               />
//             </div>
//             <textarea
//               value={basicInfo.description}
//               onChange={(e) =>
//                 setBasicInfo({ ...basicInfo, description: e.target.value })
//               }
//               className="w-full p-3 border rounded-md min-h-[100px]"
//               placeholder="Enter a description for your agent..."
//             />
//           </div>
//         );

//       case "instruction":
//         return (
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <textarea
//               className="w-full p-3 border rounded-md min-h-[100px]"
//               value={instructions}
//               onChange={(e) => setInstructions(e.target.value)}
//               placeholder="You are a helpful AI assistant. Please respond to the following message:{input}"
//             />
//           </div>
//         );

//       case "agenttype":
//         return (
//           <div className="mt-4 flex items-center gap-3 justify-center">
//             {/* Diamond */}
//             <div
//               onClick={() => handleAgentTypeClick("diamond")}
//               className={`cursor-pointer p-2 rounded-md transition-colors ${
//                 selectedAgentType === "diamond"
//                   ? "bg-blue-100"
//                   : "hover:bg-gray-100"
//               }`}
//             >
//               <Diamond
//                 className={`w-6 h-6 ${
//                   selectedAgentType === "diamond"
//                     ? "text-blue-500"
//                     : "text-blue-500"
//                 }`}
//               />
//             </div>

//             <div className="h-px w-16 bg-gray-200" />

//             {/* X */}
//             <div
//               onClick={() => handleAgentTypeClick("x")}
//               className={`cursor-pointer p-2 rounded-md transition-colors ${
//                 selectedAgentType === "x" ? "bg-blue-100" : "hover:bg-gray-100"
//               }`}
//             >
//               <X
//                 className={`w-6 h-6 ${
//                   selectedAgentType === "x" ? "text-blue-500" : "text-gray-400"
//                 }`}
//               />
//             </div>

//             <div className="h-px w-16 bg-gray-200" />

//             {/* FileText */}
//             <div
//               onClick={() => handleAgentTypeClick("filetext")}
//               className={`cursor-pointer p-2 rounded-md transition-colors ${
//                 selectedAgentType === "filetext"
//                   ? "bg-blue-100"
//                   : "hover:bg-gray-100"
//               }`}
//             >
//               <FileText
//                 className={`w-6 h-6 ${
//                   selectedAgentType === "filetext"
//                     ? "text-blue-500"
//                     : "text-green-500"
//                 }`}
//               />
//             </div>

//             <div className="h-px w-16 bg-gray-200" />

//             {/* Code */}
//             <div
//               onClick={() => handleAgentTypeClick("code")}
//               className={`cursor-pointer p-2 rounded-md transition-colors ${
//                 selectedAgentType === "code" ? "bg-blue-100" : "hover:bg-gray-100"
//               }`}
//             >
//               <Code
//                 className={`w-6 h-6 ${
//                   selectedAgentType === "code" ? "text-blue-500" : "text-blue-500"
//                 }`}
//               />
//             </div>

//             <div className="h-px w-16 bg-gray-200" />

//             {/* Mail */}
//             <div
//               onClick={() => handleAgentTypeClick("mail")}
//               className={`cursor-pointer p-2 rounded-md transition-colors ${
//                 selectedAgentType === "mail"
//                   ? "bg-blue-100"
//                   : "hover:bg-gray-100"
//               }`}
//             >
//               <Mail
//                 className={`w-6 h-6 ${
//                   selectedAgentType === "mail" ? "text-blue-500" : "text-gray-400"
//                 }`}
//               />
//             </div>

//             <div className="h-px w-16 bg-gray-200" />

//             {/* Github */}
//             <div
//               onClick={() => handleAgentTypeClick("github")}
//               className={`cursor-pointer p-2 rounded-md transition-colors ${
//                 selectedAgentType === "github"
//                   ? "bg-blue-100"
//                   : "hover:bg-gray-100"
//               }`}
//             >
//               <Github
//                 className={`w-6 h-6 ${
//                   selectedAgentType === "github"
//                     ? "text-blue-500"
//                     : "text-gray-600"
//                 }`}
//               />
//             </div>
//           </div>
//         );

//       case "actions":
//         return (
//           <div className="overflow-x-auto py-4">
//             {/* Scrollable flex container for multiple actions */}
//             <div className="flex items-center gap-6">
//               {actionItems.map((action) => {
//                 const IconComponent = action.icon;
//                 const isSelected = selectedAction === action.id;
//                 return (
//                   <div
//                     key={action.id}
//                     onClick={() => setSelectedAction(action.id)}
//                     className={`flex items-center gap-2 cursor-pointer p-2 rounded-md transition-colors min-w-[140px] ${
//                       isSelected ? "bg-blue-100" : "hover:bg-gray-100"
//                     }`}
//                   >
//                     <div
//                       className={`w-8 h-8 ${action.iconBg} rounded-lg flex items-center justify-center`}
//                     >
//                       <IconComponent className={`w-4 h-4 ${action.iconColor}`} />
//                     </div>
//                     <span className="text-sm">{action.label}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         );

//       case "knowledge":
//         return (
//           <div className="mt-4 flex items-center gap-3 justify-center">
//             <Diamond className="w-6 h-6 text-blue-500" />
//             <div className="h-px w-16 bg-gray-200" />
//             <X className="w-6 h-6 text-gray-400" />
//             <div className="h-px w-16 bg-gray-200" />
//             <FileText className="w-6 h-6 text-green-500" />
//             <div className="h-px w-16 bg-gray-200" />
//             <Code className="w-6 h-6 text-blue-500" />
//             <div className="h-px w-16 bg-gray-200" />
//             <Mail className="w-6 h-6 text-gray-400" />
//             <div className="h-px w-16 bg-gray-200" />
//             <Github className="w-6 h-6 text-gray-600" />
//           </div>
//         );

//       case "function":
//         return (
//           <div className="flex items-center gap-6 justify-center py-4">
//             {/* TES - Technical Enterprise Services */}
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
//                 <Settings className="w-4 h-4 text-green-600" />
//               </div>
//               <span className="text-sm">TES</span>
//             </div>

//             {/* EBU - Enterprise Business Unit */}
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
//                 <Briefcase className="w-4 h-4 text-blue-600" />
//               </div>
//               <span className="text-sm">EBU</span>
//             </div>

//             {/* DIT - Digital IT */}
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
//                 <Code className="w-4 h-4 text-orange-600" />
//               </div>
//               <span className="text-sm">DIT</span>
//             </div>

//             {/* HR - Human Resources */}
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
//                 <Users className="w-4 h-4 text-purple-600" />
//               </div>
//               <span className="text-sm">HR</span>
//             </div>
//           </div>
//         );

//       case "triggering":
//         return (
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <p className="text-gray-600">
//               Auto-trigger this app when a user asks a question about the
//               company's codebase, or questions relating to engineering practices
//               and software development lifecycle.
//             </p>
//           </div>
//         );

//       case "configure":
//         return (
//           <div>
//             <div className="flex items-center gap-8 justify-center py-4">
//               <div className="flex flex-col items-center gap-2">
//                 <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-100">
//                   <MessageCircle className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <span className="text-sm text-gray-600">Chat</span>
//               </div>
//               <div className="flex flex-col items-center gap-2">
//                 <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-green-100">
//                   <Slack className="w-6 h-6 text-green-600" />
//                 </div>
//                 <span className="text-sm text-gray-600">Slack</span>
//               </div>
//               <div className="flex flex-col items-center gap-2">
//                 <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-indigo-100">
//                   <Blocks className="w-6 h-6 text-indigo-600" />
//                 </div>
//                 <span className="text-sm text-gray-600">API</span>
//               </div>
//             </div>
//             <div className="flex justify-center mt-8">
//               <button className="px-8 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium text-sm">
//                 Configure Agent
//               </button>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   // 4) RENDER
//   return (
//     <div className="flex flex-col h-full w-full">
//       {/* TAB SWITCH (Describe / Configure) */}
//       <div className="mb-2 flex space-x-4">
//         <button
//           onClick={() => setCurrentTab("Describe")}
//           className={`px-4 py-2 rounded ${
//             currentTab === "Describe"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 text-gray-700"
//           }`}
//         >
//           Describe
//         </button>
//         <button
//           onClick={() => setCurrentTab("Configure")}
//           className={`px-4 py-2 rounded ${
//             currentTab === "Configure"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 text-gray-700"
//           }`}
//         >
//           Configure
//         </button>
//       </div>

//       {currentTab === "Describe" && (
//         <div className="flex flex-col h-full">
//           {/* Chat Messages */}
//           <div className="flex-1 overflow-y-auto mb-2">
//             {chatMessages.map((msg, index) => {
//               const isUser = msg.type === "user";
//               return (
//                 <div
//                   key={index}
//                   className={`mb-4 p-2 rounded ${
//                     isUser ? "bg-green-100 self-end" : "bg-white"
//                   }`}
//                 >
//                   {/* Icon + Label */}
//                   <div className="flex items-start gap-2 mb-1">
//                     <img
//                       src={isUser ? "/african.svg" : "/zuri-icon.svg"}
//                       alt={isUser ? "User Icon" : "AI Icon"}
//                       className="w-6 h-6 object-cover"
//                     />
//                     <p className="font-bold text-sm">
//                       {isUser ? "User" : "Kazuri Agent (AI)"}
//                     </p>
//                   </div>
//                   {/* Message content */}
//                   <pre className="text-sm whitespace-pre-wrap">{msg.content}</pre>
//                 </div>
//               );
//             })}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input Bar */}
//           <div className="relative">
//             <Input
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") handleSendMessage();
//               }}
//               placeholder="Type your message..."
//               className="pr-24"
//             />
//             <div className="absolute right-2 top-2 flex gap-2">
//               <Button variant="ghost" size="icon">
//                 <Edit2 size={16} />
//               </Button>
//               <Button variant="ghost" size="icon">
//                 <Mic size={16} />
//               </Button>
//               <Button variant="ghost" size="icon" onClick={handleSendMessage}>
//                 <Send size={16} />
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}

//       {currentTab === "Configure" && (
//         <div className="h-full w-full overflow-y-auto">
//           <div className="space-y-4 mt-2">
//             {sections.map((section) => (
//               <div
//                 key={section.id}
//                 className="bg-white rounded-lg border shadow-sm p-4"
//               >
//                 <div
//                   className="flex items-center justify-between cursor-pointer"
//                   onClick={() =>
//                     setActiveSection(activeSection === section.id ? "" : section.id)
//                   }
//                 >
//                   <span className="text-gray-700 font-medium">{section.title}</span>
//                   <ChevronRight
//                     className={`w-5 h-5 text-gray-400 transition-transform ${
//                       activeSection === section.id ? "rotate-90" : ""
//                     }`}
//                   />
//                 </div>
//                 {activeSection === section.id && (
//                   <div className="mt-4">{renderSectionContent(section.id)}</div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   ChevronRight,
//   Code,
//   User,
//   HelpCircle,
//   Mail,
//   Users,
//   Briefcase,
//   Slack,
//   Blocks,
//   Diamond,
//   X,
//   FileText,
//   Github,
//   MessageCircle,
//   Edit2,
//   Mic,
//   Send,
//   Settings,
// } from "lucide-react";

// // Types for chat messages
// interface Message {
//   type: "user" | "assistant";
//   content: string;
// }

// // Define a prop so we can pass a callback from LabPage
// interface KazuriChatProps {
//   onConfigureAgent?: (basicInfo: { name: string; description: string }) => void;
// }

// export default function KazuriChat({ onConfigureAgent }: KazuriChatProps) {
//   // 1) TABS: "Describe" or "Configure"
//   const [currentTab, setCurrentTab] = useState<"Describe" | "Configure">("Describe");

//   // 2) DESCRIBE (CHAT) STATES & LOGIC
//   const [chatMessages, setChatMessages] = useState<Message[]>([
//     {
//       type: "user",
//       content: "Hello! I'd like to create an AI agent for iot sim management.",
//     },
//     {
//       type: "assistant",
//       content: "Great! Let's get started. Describe your agent’s main function.",
//     },
//   ]);
//   const [inputValue, setInputValue] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [chatMessages]);

//   const handleSendMessage = () => {
//     if (!inputValue.trim()) return;

//     const userMsg: Message = { type: "user", content: inputValue.trim() };
//     setChatMessages((prev) => [...prev, userMsg]);
//     setInputValue("");

//     // Simulate AI reply
//     setTimeout(() => {
//       const aiMsg: Message = {
//         type: "assistant",
//         content: `AI response for: "${userMsg.content}"`,
//       };
//       setChatMessages((prev) => [...prev, aiMsg]);
//     }, 800);
//   };

//   // 3) CONFIGURE (COLLAPSIBLE SECTIONS) STATES & LOGIC
//   const [activeSection, setActiveSection] = useState<string>("");

//   // Basic info
//   const [basicInfo, setBasicInfo] = useState({
//     name: "Enter Agent name...",
//     description: "Enter a description for your agent...",
//   });

//   // Instructions
//   const [instructions, setInstructions] = useState(
//     "You are a helpful AI assistant. Please respond to the following message:{input}"
//   );

//   // Track selected agent type (for "agenttype" section)
//   const [selectedAgentType, setSelectedAgentType] = useState<string>("");
//   const handleAgentTypeClick = (type: string) => {
//     setSelectedAgentType(type);
//   };

//   // Track which action is selected
//   const [selectedAction, setSelectedAction] = useState<string>("");

//   // Example data for "actions"
//   const actionItems = [
//     {
//       id: "pull_request",
//       label: "Pull Request",
//       iconBg: "bg-orange-50",
//       iconColor: "text-orange-600",
//       icon: Code,
//     },
//     {
//       id: "expert_search",
//       label: "Expert Search",
//       iconBg: "bg-blue-50",
//       iconColor: "text-blue-600",
//       icon: User,
//     },
//     {
//       id: "create_jira",
//       label: "Create Jira",
//       iconBg: "bg-blue-50",
//       iconColor: "text-blue-600",
//       icon: HelpCircle,
//     },
//     {
//       id: "create_email",
//       label: "Create Email",
//       iconBg: "bg-red-50",
//       iconColor: "text-red-600",
//       icon: Mail,
//     },
//   ];

//   // Sections to show in "Configure" tab
//   const sections = [
//     { id: "basic", title: "Basic info" },
//     { id: "instruction", title: "Instruction" },
//     { id: "agenttype", title: "agent type" },
//     { id: "actions", title: "Actions" },
//     { id: "knowledge", title: "Knowledge" },
//     { id: "function", title: "Company functions" },
//     { id: "triggering", title: "Triggering" },
//     { id: "configure", title: "configure" },
//   ];

//   // Handler for the "Configure Agent" button
//   const handleConfigureAgentClick = () => {
//     // Pass `basicInfo` to the parent if onConfigureAgent is provided
//     if (onConfigureAgent) {
//       onConfigureAgent(basicInfo);
//     }
//   };

//   // Render content for each collapsible section
//   const renderSectionContent = (sectionId: string) => {
//     switch (sectionId) {
//       case "basic":
//         return (
//           <div className="space-y-4">
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
//                 <Code className="w-4 h-4 text-blue-600" />
//               </div>
//               <input
//                 type="text"
//                 value={basicInfo.name}
//                 onChange={(e) => setBasicInfo({ ...basicInfo, name: e.target.value })}
//                 className="flex-1 p-2 border rounded-md"
//                 placeholder="Enter agent name ..."
//               />
//             </div>
//             <textarea
//               value={basicInfo.description}
//               onChange={(e) =>
//                 setBasicInfo({ ...basicInfo, description: e.target.value })
//               }
//               className="w-full p-3 border rounded-md min-h-[100px]"
//               placeholder="Enter a description for your agent..."
//             />
//           </div>
//         );

//       case "instruction":
//         return (
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <textarea
//               className="w-full p-3 border rounded-md min-h-[100px]"
//               value={instructions}
//               onChange={(e) => setInstructions(e.target.value)}
//               placeholder="You are a helpful AI assistant. Please respond to the following message:{input}"
//             />
//           </div>
//         );

//       case "agenttype":
//         return (
//           <div className="mt-4 flex items-center gap-3 justify-center">
//             {/* Diamond */}
//             <div
//               onClick={() => handleAgentTypeClick("diamond")}
//               className={`cursor-pointer p-2 rounded-md transition-colors ${
//                 selectedAgentType === "diamond"
//                   ? "bg-blue-100"
//                   : "hover:bg-gray-100"
//               }`}
//             >
//               <Diamond
//                 className={`w-6 h-6 ${
//                   selectedAgentType === "diamond"
//                     ? "text-blue-500"
//                     : "text-blue-500"
//                 }`}
//               />
//             </div>

//             <div className="h-px w-16 bg-gray-200" />

//             {/* X */}
//             <div
//               onClick={() => handleAgentTypeClick("x")}
//               className={`cursor-pointer p-2 rounded-md transition-colors ${
//                 selectedAgentType === "x" ? "bg-blue-100" : "hover:bg-gray-100"
//               }`}
//             >
//               <X
//                 className={`w-6 h-6 ${
//                   selectedAgentType === "x" ? "text-blue-500" : "text-gray-400"
//                 }`}
//               />
//             </div>

//             <div className="h-px w-16 bg-gray-200" />

//             {/* FileText */}
//             <div
//               onClick={() => handleAgentTypeClick("filetext")}
//               className={`cursor-pointer p-2 rounded-md transition-colors ${
//                 selectedAgentType === "filetext"
//                   ? "bg-blue-100"
//                   : "hover:bg-gray-100"
//               }`}
//             >
//               <FileText
//                 className={`w-6 h-6 ${
//                   selectedAgentType === "filetext"
//                     ? "text-blue-500"
//                     : "text-green-500"
//                 }`}
//               />
//             </div>

//             <div className="h-px w-16 bg-gray-200" />

//             {/* Code */}
//             <div
//               onClick={() => handleAgentTypeClick("code")}
//               className={`cursor-pointer p-2 rounded-md transition-colors ${
//                 selectedAgentType === "code" ? "bg-blue-100" : "hover:bg-gray-100"
//               }`}
//             >
//               <Code
//                 className={`w-6 h-6 ${
//                   selectedAgentType === "code" ? "text-blue-500" : "text-blue-500"
//                 }`}
//               />
//             </div>

//             <div className="h-px w-16 bg-gray-200" />

//             {/* Mail */}
//             <div
//               onClick={() => handleAgentTypeClick("mail")}
//               className={`cursor-pointer p-2 rounded-md transition-colors ${
//                 selectedAgentType === "mail"
//                   ? "bg-blue-100"
//                   : "hover:bg-gray-100"
//               }`}
//             >
//               <Mail
//                 className={`w-6 h-6 ${
//                   selectedAgentType === "mail" ? "text-blue-500" : "text-gray-400"
//                 }`}
//               />
//             </div>

//             <div className="h-px w-16 bg-gray-200" />

//             {/* Github */}
//             <div
//               onClick={() => handleAgentTypeClick("github")}
//               className={`cursor-pointer p-2 rounded-md transition-colors ${
//                 selectedAgentType === "github"
//                   ? "bg-blue-100"
//                   : "hover:bg-gray-100"
//               }`}
//             >
//               <Github
//                 className={`w-6 h-6 ${
//                   selectedAgentType === "github"
//                     ? "text-blue-500"
//                     : "text-gray-600"
//                 }`}
//               />
//             </div>
//           </div>
//         );

//       case "actions":
//         return (
//           <div className="overflow-x-auto py-4">
//             {/* Scrollable flex container for multiple actions */}
//             <div className="flex items-center gap-6">
//               {actionItems.map((action) => {
//                 const IconComponent = action.icon;
//                 const isSelected = selectedAction === action.id;
//                 return (
//                   <div
//                     key={action.id}
//                     onClick={() => setSelectedAction(action.id)}
//                     className={`flex items-center gap-2 cursor-pointer p-2 rounded-md transition-colors min-w-[140px] ${
//                       isSelected ? "bg-blue-100" : "hover:bg-gray-100"
//                     }`}
//                   >
//                     <div
//                       className={`w-8 h-8 ${action.iconBg} rounded-lg flex items-center justify-center`}
//                     >
//                       <IconComponent className={`w-4 h-4 ${action.iconColor}`} />
//                     </div>
//                     <span className="text-sm">{action.label}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         );

//       case "knowledge":
//         return (
//           <div className="mt-4 flex items-center gap-3 justify-center">
//             <Diamond className="w-6 h-6 text-blue-500" />
//             <div className="h-px w-16 bg-gray-200" />
//             <X className="w-6 h-6 text-gray-400" />
//             <div className="h-px w-16 bg-gray-200" />
//             <FileText className="w-6 h-6 text-green-500" />
//             <div className="h-px w-16 bg-gray-200" />
//             <Code className="w-6 h-6 text-blue-500" />
//             <div className="h-px w-16 bg-gray-200" />
//             <Mail className="w-6 h-6 text-gray-400" />
//             <div className="h-px w-16 bg-gray-200" />
//             <Github className="w-6 h-6 text-gray-600" />
//           </div>
//         );

//       case "function":
//         return (
//           <div className="flex items-center gap-6 justify-center py-4">
//             {/* TES - Technical Enterprise Services */}
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
//                 <Settings className="w-4 h-4 text-green-600" />
//               </div>
//               <span className="text-sm">TES</span>
//             </div>

//             {/* EBU - Enterprise Business Unit */}
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
//                 <Briefcase className="w-4 h-4 text-blue-600" />
//               </div>
//               <span className="text-sm">EBU</span>
//             </div>

//             {/* DIT - Digital IT */}
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
//                 <Code className="w-4 h-4 text-orange-600" />
//               </div>
//               <span className="text-sm">DIT</span>
//             </div>

//             {/* HR - Human Resources */}
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
//                 <Users className="w-4 h-4 text-purple-600" />
//               </div>
//               <span className="text-sm">HR</span>
//             </div>
//           </div>
//         );

//       case "triggering":
//         return (
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <p className="text-gray-600">
//               Auto-trigger this app when a user asks a question about the
//               company's codebase, or questions relating to engineering practices
//               and software development lifecycle.
//             </p>
//           </div>
//         );

//       case "configure":
//         return (
//           <div>
//             <div className="flex items-center gap-8 justify-center py-4">
//               <div className="flex flex-col items-center gap-2">
//                 <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-100">
//                   <MessageCircle className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <span className="text-sm text-gray-600">Chat</span>
//               </div>
//               <div className="flex flex-col items-center gap-2">
//                 <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-green-100">
//                   <Slack className="w-6 h-6 text-green-600" />
//                 </div>
//                 <span className="text-sm text-gray-600">Slack</span>
//               </div>
//               <div className="flex flex-col items-center gap-2">
//                 <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-indigo-100">
//                   <Blocks className="w-6 h-6 text-indigo-600" />
//                 </div>
//                 <span className="text-sm text-gray-600">API</span>
//               </div>
//             </div>
//             <div className="flex justify-center mt-8">
//               {/* <-- The button that triggers passing `basicInfo` up --> */}
//               <button
//                 onClick={handleConfigureAgentClick}
//                 className="px-8 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium text-sm"
//               >
//                 Configure Agent
//               </button>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   // 4) RENDER
//   return (
//     <div className="flex flex-col h-full w-full">
//       {/* TAB SWITCH (Describe / Configure) */}
//       <div className="mb-2 flex space-x-4">
//         <button
//           onClick={() => setCurrentTab("Describe")}
//           className={`px-4 py-2 rounded ${
//             currentTab === "Describe"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 text-gray-700"
//           }`}
//         >
//           Describe
//         </button>
//         <button
//           onClick={() => setCurrentTab("Configure")}
//           className={`px-4 py-2 rounded ${
//             currentTab === "Configure"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 text-gray-700"
//           }`}
//         >
//           Configure
//         </button>
//       </div>

//       {currentTab === "Describe" && (
//         <div className="flex flex-col h-full">
//           {/* Chat Messages */}
//           <div className="flex-1 overflow-y-auto mb-2">
//             {chatMessages.map((msg, index) => {
//               const isUser = msg.type === "user";
//               return (
//                 <div
//                   key={index}
//                   className={`mb-4 p-2 rounded ${
//                     isUser ? "bg-green-100 self-end" : "bg-white"
//                   }`}
//                 >
//                   {/* Icon + Label */}
//                   <div className="flex items-start gap-2 mb-1">
//                     <img
//                       src={isUser ? "/african.svg" : "/zuri-icon.svg"}
//                       alt={isUser ? "User Icon" : "AI Icon"}
//                       className="w-6 h-6 object-cover"
//                     />
//                     <p className="font-bold text-sm">
//                       {isUser ? "User" : "Kazuri Agent (AI)"}
//                     </p>
//                   </div>
//                   {/* Message content */}
//                   <pre className="text-sm whitespace-pre-wrap">{msg.content}</pre>
//                 </div>
//               );
//             })}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input Bar */}
//           <div className="relative">
//             <Input
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") handleSendMessage();
//               }}
//               placeholder="Type your message..."
//               className="pr-24"
//             />
//             <div className="absolute right-2 top-2 flex gap-2">
//               <Button variant="ghost" size="icon">
//                 <Edit2 size={16} />
//               </Button>
//               <Button variant="ghost" size="icon">
//                 <Mic size={16} />
//               </Button>
//               <Button variant="ghost" size="icon" onClick={handleSendMessage}>
//                 <Send size={16} />
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}

//       {currentTab === "Configure" && (
//         <div className="h-full w-full overflow-y-auto">
//           <div className="space-y-4 mt-2">
//             {sections.map((section) => (
//               <div
//                 key={section.id}
//                 className="bg-white rounded-lg border shadow-sm p-4"
//               >
//                 <div
//                   className="flex items-center justify-between cursor-pointer"
//                   onClick={() =>
//                     setActiveSection(activeSection === section.id ? "" : section.id)
//                   }
//                 >
//                   <span className="text-gray-700 font-medium">{section.title}</span>
//                   <ChevronRight
//                     className={`w-5 h-5 text-gray-400 transition-transform ${
//                       activeSection === section.id ? "rotate-90" : ""
//                     }`}
//                   />
//                 </div>
//                 {activeSection === section.id && (
//                   <div className="mt-4">{renderSectionContent(section.id)}</div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   ChevronRight,
//   Code,
//   User,
//   HelpCircle,
//   Mail,
//   Users,
//   Briefcase,
//   Slack,
//   Blocks,
//   Diamond,
//   X,
//   FileText,
//   Github,
//   MessageCircle,
//   Edit2,
//   Mic,
//   Send,
//   Settings,
// } from "lucide-react";

// // Types for chat messages
// interface Message {
//   type: "user" | "assistant";
//   content: string;
// }

// interface KazuriChatProps {
//   // Callback from LabPage
//   onConfigureAgent?: (basicInfo: { name: string; description: string }) => void;
// }

// export default function KazuriChat({ onConfigureAgent }: KazuriChatProps) {
//   // 1) TABS: "Describe" or "Configure"
//   const [currentTab, setCurrentTab] = useState<"Describe" | "Configure">("Describe");

//   // 2) DESCRIBE (CHAT) STATES & LOGIC
//   const [chatMessages, setChatMessages] = useState<Message[]>([
//     {
//       type: "user",
//       content: "Hello! I'd like to create an AI agent for iot sim management.",
//     },
//     {
//       type: "assistant",
//       content: "Great! Let's get started. Describe your agent’s main function.",
//     },
//   ]);
//   const [inputValue, setInputValue] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [chatMessages]);

//   const handleSendMessage = () => {
//     if (!inputValue.trim()) return;

//     const userMsg: Message = { type: "user", content: inputValue.trim() };
//     setChatMessages((prev) => [...prev, userMsg]);
//     setInputValue("");

//     // Simulate AI reply
//     setTimeout(() => {
//       const aiMsg: Message = {
//         type: "assistant",
//         content: `AI response for: "${userMsg.content}"`,
//       };
//       setChatMessages((prev) => [...prev, aiMsg]);
//     }, 800);
//   };

//   // 3) CONFIGURE (COLLAPSIBLE SECTIONS) STATES & LOGIC
//   const [activeSection, setActiveSection] = useState<string>("");

//   // Basic info
//   const [basicInfo, setBasicInfo] = useState({
//     name: "Enter Agent name...",
//     description: "Enter a description for your agent...",
//   });

//   // Instructions
//   const [instructions, setInstructions] = useState(
//     "You are a helpful AI assistant. Please respond to the following message:{input}"
//   );

//   // Agent type
//   const [selectedAgentType, setSelectedAgentType] = useState<string>("");
//   const handleAgentTypeClick = (type: string) => {
//     setSelectedAgentType(type);
//   };

//   // Actions (selectable items)
//   const [selectedAction, setSelectedAction] = useState<string>("");
//   const actionItems = [
//     {
//       id: "pull_request",
//       label: "Pull Request",
//       iconBg: "bg-orange-50",
//       iconColor: "text-orange-600",
//       icon: Code,
//     },
//     {
//       id: "expert_search",
//       label: "Expert Search",
//       iconBg: "bg-blue-50",
//       iconColor: "text-blue-600",
//       icon: User,
//     },
//     {
//       id: "create_jira",
//       label: "Create Jira",
//       iconBg: "bg-blue-50",
//       iconColor: "text-blue-600",
//       icon: HelpCircle,
//     },
//     {
//       id: "create_email",
//       label: "Create Email",
//       iconBg: "bg-red-50",
//       iconColor: "text-red-600",
//       icon: Mail,
//     },
//   ];

//   const sections = [
//     { id: "basic", title: "Basic info" },
//     { id: "instruction", title: "Instruction" },
//     { id: "agenttype", title: "agent type" },
//     { id: "actions", title: "Actions" },
//     { id: "knowledge", title: "Knowledge" },
//     { id: "function", title: "Company functions" },
//     { id: "triggering", title: "Triggering" },
//     { id: "configure", title: "configure" },
//   ];

//   const handleConfigureAgentClick = () => {
//     // Pass `basicInfo` to the parent if onConfigureAgent is provided
//     if (onConfigureAgent) {
//       onConfigureAgent(basicInfo);
//     }
//   };

//   const renderSectionContent = (sectionId: string) => {
//     switch (sectionId) {
//       case "basic":
//         return (
//           <div className="space-y-4">
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
//                 <Code className="w-4 h-4 text-blue-600" />
//               </div>
//               <input
//                 type="text"
//                 value={basicInfo.name}
//                 onChange={(e) => setBasicInfo({ ...basicInfo, name: e.target.value })}
//                 className="flex-1 p-2 border rounded-md"
//                 placeholder="Enter agent name ..."
//               />
//             </div>
//             <textarea
//               value={basicInfo.description}
//               onChange={(e) =>
//                 setBasicInfo({ ...basicInfo, description: e.target.value })
//               }
//               className="w-full p-3 border rounded-md min-h-[100px]"
//               placeholder="Enter a description for your agent..."
//             />
//           </div>
//         );

//       case "instruction":
//         return (
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <textarea
//               className="w-full p-3 border rounded-md min-h-[100px]"
//               value={instructions}
//               onChange={(e) => setInstructions(e.target.value)}
//               placeholder="You are a helpful AI assistant. Please respond to the following message:{input}"
//             />
//           </div>
//         );

//       case "agenttype":
//         return (
//           <div className="mt-4 flex items-center gap-3 justify-center">
//             <div
//               onClick={() => handleAgentTypeClick("diamond")}
//               className={`cursor-pointer p-2 rounded-md transition-colors ${
//                 selectedAgentType === "diamond" ? "bg-blue-100" : "hover:bg-gray-100"
//               }`}
//             >
//               <Diamond className="w-6 h-6 text-blue-500" />
//             </div>
//             <div className="h-px w-16 bg-gray-200" />
//             <div
//               onClick={() => handleAgentTypeClick("x")}
//               className={`cursor-pointer p-2 rounded-md transition-colors ${
//                 selectedAgentType === "x" ? "bg-blue-100" : "hover:bg-gray-100"
//               }`}
//             >
//               <X className={`w-6 h-6 ${selectedAgentType === "x" ? "text-blue-500" : "text-gray-400"}`} />
//             </div>
//             <div className="h-px w-16 bg-gray-200" />
//             <div
//               onClick={() => handleAgentTypeClick("filetext")}
//               className={`cursor-pointer p-2 rounded-md transition-colors ${
//                 selectedAgentType === "filetext" ? "bg-blue-100" : "hover:bg-gray-100"
//               }`}
//             >
//               <FileText className={`w-6 h-6 ${selectedAgentType === "filetext" ? "text-blue-500" : "text-green-500"}`} />
//             </div>
//             <div className="h-px w-16 bg-gray-200" />
//             <div
//               onClick={() => handleAgentTypeClick("code")}
//               className={`cursor-pointer p-2 rounded-md transition-colors ${
//                 selectedAgentType === "code" ? "bg-blue-100" : "hover:bg-gray-100"
//               }`}
//             >
//               <Code className="w-6 h-6 text-blue-500" />
//             </div>
//             <div className="h-px w-16 bg-gray-200" />
//             <div
//               onClick={() => handleAgentTypeClick("mail")}
//               className={`cursor-pointer p-2 rounded-md transition-colors ${
//                 selectedAgentType === "mail" ? "bg-blue-100" : "hover:bg-gray-100"
//               }`}
//             >
//               <Mail className={`w-6 h-6 ${selectedAgentType === "mail" ? "text-blue-500" : "text-gray-400"}`} />
//             </div>
//             <div className="h-px w-16 bg-gray-200" />
//             <div
//               onClick={() => handleAgentTypeClick("github")}
//               className={`cursor-pointer p-2 rounded-md transition-colors ${
//                 selectedAgentType === "github" ? "bg-blue-100" : "hover:bg-gray-100"
//               }`}
//             >
//               <Github className={`w-6 h-6 ${selectedAgentType === "github" ? "text-blue-500" : "text-gray-600"}`} />
//             </div>
//           </div>
//         );

//       case "actions":
//         return (
//           <div className="overflow-x-auto py-4">
//             <div className="flex items-center gap-6">
//               {actionItems.map((action) => {
//                 const IconComponent = action.icon;
//                 const isSelected = selectedAction === action.id;
//                 return (
//                   <div
//                     key={action.id}
//                     onClick={() => setSelectedAction(action.id)}
//                     className={`flex items-center gap-2 cursor-pointer p-2 rounded-md transition-colors min-w-[140px] ${
//                       isSelected ? "bg-blue-100" : "hover:bg-gray-100"
//                     }`}
//                   >
//                     <div className={`w-8 h-8 ${action.iconBg} rounded-lg flex items-center justify-center`}>
//                       <IconComponent className={`w-4 h-4 ${action.iconColor}`} />
//                     </div>
//                     <span className="text-sm">{action.label}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         );

//       case "knowledge":
//         return (
//           <div className="mt-4 flex items-center gap-3 justify-center">
//             <Diamond className="w-6 h-6 text-blue-500" />
//             <div className="h-px w-16 bg-gray-200" />
//             <X className="w-6 h-6 text-gray-400" />
//             <div className="h-px w-16 bg-gray-200" />
//             <FileText className="w-6 h-6 text-green-500" />
//             <div className="h-px w-16 bg-gray-200" />
//             <Code className="w-6 h-6 text-blue-500" />
//             <div className="h-px w-16 bg-gray-200" />
//             <Mail className="w-6 h-6 text-gray-400" />
//             <div className="h-px w-16 bg-gray-200" />
//             <Github className="w-6 h-6 text-gray-600" />
//           </div>
//         );

//       case "function":
//         return (
//           <div className="flex items-center gap-6 justify-center py-4">
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
//                 <Settings className="w-4 h-4 text-green-600" />
//               </div>
//               <span className="text-sm">TES</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
//                 <Briefcase className="w-4 h-4 text-blue-600" />
//               </div>
//               <span className="text-sm">EBU</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
//                 <Code className="w-4 h-4 text-orange-600" />
//               </div>
//               <span className="text-sm">DIT</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
//                 <Users className="w-4 h-4 text-purple-600" />
//               </div>
//               <span className="text-sm">HR</span>
//             </div>
//           </div>
//         );

//       case "triggering":
//         return (
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <p className="text-gray-600">
//               Auto-trigger this app when a user asks a question about the
//               company's codebase, or questions relating to engineering practices
//               and software development lifecycle.
//             </p>
//           </div>
//         );

//       case "configure":
//         return (
//           <div>
//             <div className="flex items-center gap-8 justify-center py-4">
//               <div className="flex flex-col items-center gap-2">
//                 <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-100">
//                   <MessageCircle className="w-6 h-6 text-blue-600" />
//                 </div>
//                 <span className="text-sm text-gray-600">Chat</span>
//               </div>
//               <div className="flex flex-col items-center gap-2">
//                 <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-green-100">
//                   <Slack className="w-6 h-6 text-green-600" />
//                 </div>
//                 <span className="text-sm text-gray-600">Slack</span>
//               </div>
//               <div className="flex flex-col items-center gap-2">
//                 <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-indigo-100">
//                   <Blocks className="w-6 h-6 text-indigo-600" />
//                 </div>
//                 <span className="text-sm text-gray-600">API</span>
//               </div>
//             </div>
//             <div className="flex justify-center mt-8">
//               <button
//                 onClick={handleConfigureAgentClick}
//                 className="px-8 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium text-sm"
//               >
//                 Configure Agent
//               </button>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex flex-col h-full w-full">
//       {/* TAB SWITCH (Describe / Configure) */}
//       <div className="mb-2 flex space-x-4">
//         <button
//           onClick={() => setCurrentTab("Describe")}
//           className={`px-4 py-2 rounded ${
//             currentTab === "Describe"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 text-gray-700"
//           }`}
//         >
//           Describe
//         </button>
//         <button
//           onClick={() => setCurrentTab("Configure")}
//           className={`px-4 py-2 rounded ${
//             currentTab === "Configure"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 text-gray-700"
//           }`}
//         >
//           Configure
//         </button>
//       </div>

//       {currentTab === "Describe" && (
//         <div className="flex flex-col h-full">
//           {/* Chat Messages */}
//           <div className="flex-1 overflow-y-auto mb-2">
//             {chatMessages.map((msg, index) => {
//               const isUser = msg.type === "user";
//               return (
//                 <div
//                   key={index}
//                   className={`mb-4 p-2 rounded ${
//                     isUser ? "bg-green-100 self-end" : "bg-white"
//                   }`}
//                 >
//                   <div className="flex items-start gap-2 mb-1">
//                     <img
//                       src={isUser ? "/african.svg" : "/zuri-icon.svg"}
//                       alt={isUser ? "User Icon" : "AI Icon"}
//                       className="w-6 h-6 object-cover"
//                     />
//                     <p className="font-bold text-sm">
//                       {isUser ? "User" : "Kazuri Agent (AI)"}
//                     </p>
//                   </div>
//                   <pre className="text-sm whitespace-pre-wrap">{msg.content}</pre>
//                 </div>
//               );
//             })}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input Bar */}
//           <div className="relative">
//             <Input
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") handleSendMessage();
//               }}
//               placeholder="Type your message..."
//               className="pr-24"
//             />
//             <div className="absolute right-2 top-2 flex gap-2">
//               <Button variant="ghost" size="icon">
//                 <Edit2 size={16} />
//               </Button>
//               <Button variant="ghost" size="icon">
//                 <Mic size={16} />
//               </Button>
//               <Button variant="ghost" size="icon" onClick={handleSendMessage}>
//                 <Send size={16} />
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}

//       {currentTab === "Configure" && (
//         <div className="h-full w-full overflow-y-auto">
//           <div className="space-y-4 mt-2">
//             {sections.map((section) => (
//               <div
//                 key={section.id}
//                 className="bg-white rounded-lg border shadow-sm p-4"
//               >
//                 <div
//                   className="flex items-center justify-between cursor-pointer"
//                   onClick={() =>
//                     setActiveSection(activeSection === section.id ? "" : section.id)
//                   }
//                 >
//                   <span className="text-gray-700 font-medium">{section.title}</span>
//                   <ChevronRight
//                     className={`w-5 h-5 text-gray-400 transition-transform ${
//                       activeSection === section.id ? "rotate-90" : ""
//                     }`}
//                   />
//                 </div>
//                 {activeSection === section.id && (
//                   <div className="mt-4">{renderSectionContent(section.id)}</div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // components/KazuriChat.tsx
// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/components/ui/use-toast";
// import { apiService } from "@/services/api";
// import {
//   ChevronRight,
//   Code,
//   User,
//   HelpCircle,
//   Mail,
//   Users,
//   Briefcase,
//   Slack,
//   Blocks,
//   Diamond,
//   X,
//   FileText,
//   Github,
//   MessageCircle,
//   Edit2,
//   Mic,
//   Send,
//   Settings,
// } from "lucide-react";

// interface Message {
//   type: "user" | "assistant";
//   content: string;
// }

// interface KazuriChatProps {
//   onConfigureAgent?: (info: { name: string; description: string }) => void;
// }

// export default function KazuriChat({ onConfigureAgent }: KazuriChatProps) {
//   // States
//   const [currentTab, setCurrentTab] = useState<"Describe" | "Configure">("Describe");
//   const [isLoading, setIsLoading] = useState(false);
//   const { toast } = useToast();

//   // Chat States
//   const [chatMessages, setChatMessages] = useState<Message[]>([
//     {
//       type: "assistant",
//       content: "Hello! I'm here to help you create and configure an AI agent.",
//     }
//   ]);
//   const [inputValue, setInputValue] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Configuration States
//   const [activeSection, setActiveSection] = useState<string>("");
//   const [basicInfo, setBasicInfo] = useState({
//     name: "",
//     description: "",
//   });
//   const [instructions, setInstructions] = useState("");
//   const [selectedAgentType, setSelectedAgentType] = useState<string>("");
//   const [selectedAction, setSelectedAction] = useState<string>("");

//   // Scroll to bottom of chat
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [chatMessages]);

//   // Available sections
//   const sections = [
//     { id: "basic", title: "Basic info" },
//     { id: "instruction", title: "Instruction" },
//     { id: "agenttype", title: "agent type" },
//     { id: "actions", title: "Actions" },
//     { id: "knowledge", title: "Knowledge" },
//     { id: "function", title: "Company functions" },
//     { id: "triggering", title: "Triggering" },
//     { id: "configure", title: "configure" },
//   ];

//   // Action items
//   const actionItems = [
//     {
//       id: "pull_request",
//       label: "Pull Request",
//       iconBg: "bg-orange-50",
//       iconColor: "text-orange-600",
//       icon: Code,
//     },
//     {
//       id: "expert_search",
//       label: "Expert Search",
//       iconBg: "bg-blue-50",
//       iconColor: "text-blue-600",
//       icon: User,
//     },
//     {
//       id: "create_jira",
//       label: "Create Jira",
//       iconBg: "bg-blue-50",
//       iconColor: "text-blue-600",
//       icon: HelpCircle,
//     },
//     {
//       id: "create_email",
//       label: "Create Email",
//       iconBg: "bg-red-50",
//       iconColor: "text-red-600",
//       icon: Mail,
//     },
//   ];

//   // Handle chat message sending
//   const handleSendMessage = () => {
//     if (!inputValue.trim()) return;

//     const userMsg: Message = { type: "user", content: inputValue.trim() };
//     setChatMessages((prev) => [...prev, userMsg]);
//     setInputValue("");

//     // Simulate AI reply
//     setTimeout(() => {
//       const aiMsg: Message = {
//         type: "assistant",
//         content: `AI response for: "${userMsg.content}"`,
//       };
//       setChatMessages((prev) => [...prev, aiMsg]);
//     }, 800);
//   };

//   // Handle agent type selection
//   const handleAgentTypeClick = (type: string) => {
//     setSelectedAgentType(type);
//     toast({
//       title: "Agent Type Selected",
//       description: `Selected type: ${type}`,
//     });
//   };

//   // Form validation
//   const isFormValid = () => {
//     return (
//       basicInfo.name.trim() !== "" &&
//       basicInfo.description.trim() !== "" &&
//       selectedAgentType !== ""
//     );
//   };

//   // Handle agent configuration
//   // const handleConfigureAgentClick = async () => {
//   //   if (!isFormValid()) {
//   //     toast({
//   //       title: "Error",
//   //       description: "Please fill in all required fields and select an agent type",
//   //       variant: "destructive"
//   //     });
//   //     return;
//   //   }

//   //   try {
//   //     setIsLoading(true);
      
//   //     // Create the agent configuration object
//   //     const agentConfig = {
//   //       name: basicInfo.name,
//   //       description: basicInfo.description,
//   //       type: selectedAgentType,
//   //       instructions: instructions,
//   //       actions: selectedAction ? [selectedAction] : undefined,
//   //     };

//   //     // Create the agent via API
//   //     const response = await apiService.createAgent(agentConfig);

//   //     // Notify parent component
//   //     if (onConfigureAgent) {
//   //       onConfigureAgent({
//   //         name: basicInfo.name,
//   //         description: basicInfo.description
//   //       });
//   //     }

//   //     // Reset form
//   //     setBasicInfo({ name: "", description: "" });
//   //     setSelectedAgentType("");
//   //     setInstructions("");
//   //     setSelectedAction("");

//   //     toast({
//   //       title: "Success",
//   //       description: "Agent configured successfully"
//   //     });

//   //     // Switch to chat tab
//   //     setCurrentTab("Describe");
//   //   } catch (error) {
//   //     toast({
//   //       title: "Error",
//   //       description: "Failed to configure agent",
//   //       variant: "destructive"
//   //     });
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };
//   const handleConfigureAgentClick = async () => {
//     if (!isFormValid()) {
//       toast({
//         title: "Error",
//         description: "Please fill in all required fields and select an agent type",
//         variant: "destructive"
//       });
//       return;
//     }
  
//     try {
//       setIsLoading(true);
      
//       // Create the agent configuration object
//       const agentConfig = {
//         name: basicInfo.name,
//         type: selectedAgentType,
//         configuration: {
//           description: basicInfo.description,
//           instructions: instructions,
//           actions: selectedAction ? [selectedAction] : []
//         }
//       };
  
//       // Create the agent via API
//       const response = await apiService.createAgent(agentConfig);
  
//       // Notify parent component
//       if (onConfigureAgent) {
//         // We'll pass only name and description or everything you need
//         onConfigureAgent({
//           name: basicInfo.name,
//           description: basicInfo.description,
//         });
//       }
  
//       // Reset form
//       setBasicInfo({ name: "", description: "" });
//       setSelectedAgentType("");
//       setInstructions("");
//       setSelectedAction("");
  
//       toast({
//         title: "Success",
//         description: "Agent configured successfully"
//       });
  
//       // Switch to chat tab (optional)
//       setCurrentTab("Describe");
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to configure agent",
//         variant: "destructive"
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   // Render section content
//   const renderSectionContent = (sectionId: string) => {
//     switch (sectionId) {
//       case "basic":
//         return (
//           <div className="space-y-4">
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
//                 <Code className="w-4 h-4 text-blue-600" />
//               </div>
//               <input
//                 type="text"
//                 value={basicInfo.name}
//                 onChange={(e) => setBasicInfo(prev => ({ ...prev, name: e.target.value }))}
//                 className={`flex-1 p-2 border rounded-md ${
//                   !basicInfo.name && "border-red-300"
//                 }`}
//                 placeholder="Enter agent name (required) ..."
//               />
//             </div>
//             <textarea
//               value={basicInfo.description}
//               onChange={(e) => setBasicInfo(prev => ({ ...prev, description: e.target.value }))}
//               className={`w-full p-3 border rounded-md min-h-[100px] ${
//                 !basicInfo.description && "border-red-300"
//               }`}
//               placeholder="Enter a description for your agent (required)..."
//             />
//           </div>
//         );

//       case "instruction":
//         return (
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <textarea
//               className="w-full p-3 border rounded-md min-h-[100px]"
//               value={instructions}
//               onChange={(e) => setInstructions(e.target.value)}
//               placeholder="Enter instructions for your agent..."
//             />
//           </div>
//         );

//       // case "agenttype":
//       //   return (
//       //     <div className="mt-4 flex items-center gap-3 justify-center">
//       //       <div
//       //         onClick={() => handleAgentTypeClick("diamond")}
//       //         className={`cursor-pointer p-2 rounded-md transition-colors ${
//       //           selectedAgentType === "diamond" ? "bg-blue-100" : "hover:bg-gray-100"
//       //         }`}
//       //       >
//       //         <Diamond className="w-6 h-6 text-blue-500" />
//       //       </div>
//       //       <div className="h-px w-16 bg-gray-200" />
//       //       <div
//       //         onClick={() => handleAgentTypeClick("x")}
//       //         className={`cursor-pointer p-2 rounded-md transition-colors ${
//       //           selectedAgentType === "x" ? "bg-blue-100" : "hover:bg-gray-100"
//       //         }`}
//       //       >
//       //         <X className={`w-6 h-6 ${selectedAgentType === "x" ? "text-blue-500" : "text-gray-400"}`} />
//       //       </div>
//       //       <div className="h-px w-16 bg-gray-200" />
//       //       <div
//       //         onClick={() => handleAgentTypeClick("filetext")}
//       //         className={`cursor-pointer p-2 rounded-md transition-colors ${
//       //           selectedAgentType === "filetext" ? "bg-blue-100" : "hover:bg-gray-100"
//       //         }`}
//       //       >
//       //         <FileText className={`w-6 h-6 ${selectedAgentType === "filetext" ? "text-blue-500" : "text-green-500"}`} />
//       //       </div>
//       //       <div className="h-px w-16 bg-gray-200" />
//       //       <div
//       //         onClick={() => handleAgentTypeClick("code")}
//       //         className={`cursor-pointer p-2 rounded-md transition-colors ${
//       //           selectedAgentType === "code" ? "bg-blue-100" : "hover:bg-gray-100"
//       //         }`}
//       //       >
//       //         <Code className="w-6 h-6 text-blue-500" />
//       //       </div>
//       //       <div className="h-px w-16 bg-gray-200" />
//       //       <div
//       //         onClick={() => handleAgentTypeClick("mail")}
//       //         className={`cursor-pointer p-2 rounded-md transition-colors ${
//       //           selectedAgentType === "mail" ? "bg-blue-100" : "hover:bg-gray-100"
//       //         }`}
//       //       >
//       //         <Mail className={`w-6 h-6 ${selectedAgentType === "mail" ? "text-blue-500" : "text-gray-400"}`} />
//       //       </div>
//       //       <div className="h-px w-16 bg-gray-200" />
//       //       <div
//       //         onClick={() => handleAgentTypeClick("github")}
//       //         className={`cursor-pointer p-2 rounded-md transition-colors ${
//       //           selectedAgentType === "github" ? "bg-blue-100" : "hover:bg-gray-100"
//       //         }`}
//       //       >
//       //         <Github className={`w-6 h-6 ${selectedAgentType === "github" ? "text-blue-500" : "text-gray-600"}`} />
//       //       </div>
//       //     </div>
//       //   );
//       case "agenttype":
//       const agentTypes = ["conversational", "rag", "tool_calling", "coding"];

//       return (
//         <div className="mt-4">
//           <label className="block mb-2 font-medium text-gray-700">
//             Select Agent Type
//           </label>
//           <select
//             className="border rounded-md p-2 text-sm"
//             value={selectedAgentType}
//             onChange={(e) => setSelectedAgentType(e.target.value)}
//           >
//             <option value="">-- Choose agent type --</option>
//             {agentTypes.map((type) => (
//               <option key={type} value={type}>
//                 {type}
//               </option>
//             ))}
//           </select>
//         </div>
//       );

//       case "actions":
//         return (
//           <div className="overflow-x-auto py-4">
//             <div className="flex items-center gap-6">
//               {actionItems.map((action) => {
//                 const IconComponent = action.icon;
//                 const isSelected = selectedAction === action.id;
//                 return (
//                   <div
//                     key={action.id}
//                     onClick={() => setSelectedAction(action.id)}
//                     className={`flex items-center gap-2 cursor-pointer p-2 rounded-md transition-colors min-w-[140px] ${
//                       isSelected ? "bg-blue-100" : "hover:bg-gray-100"
//                     }`}
//                   >
//                     <div className={`w-8 h-8 ${action.iconBg} rounded-lg flex items-center justify-center`}>
//                       <IconComponent className={`w-4 h-4 ${action.iconColor}`} />
//                     </div>
//                     <span className="text-sm">{action.label}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         );

//       case "knowledge":
//         return (
//           <div className="mt-4 flex items-center gap-3 justify-center">
//             <Diamond className="w-6 h-6 text-blue-500" />
//             <div className="h-px w-16 bg-gray-200" />
//             <X className="w-6 h-6 text-gray-400" />
//             <div className="h-px w-16 bg-gray-200" />
//             <FileText className="w-6 h-6 text-green-500" />
//             <div className="h-px w-16 bg-gray-200" />
//             <Code className="w-6 h-6 text-blue-500" />
//             <div className="h-px w-16 bg-gray-200" />
//             <Mail className="w-6 h-6 text-gray-400" />
//             <div className="h-px w-16 bg-gray-200" />
//             <Github className="w-6 h-6 text-gray-600" />
//           </div>
//         );

//       case "function":
//         return (
//           <div className="flex items-center gap-6 justify-center py-4">
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
//                 <Settings className="w-4 h-4 text-green-600" />
//               </div>
//               <span className="text-sm">TES</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
//                 <Briefcase className="w-4 h-4 text-blue-600" />
//               </div>
//               <span className="text-sm">EBU</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
//                 <Code className="w-4 h-4 text-orange-600" />
//               </div>
//               <span className="text-sm">DIT</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
//                 <Users className="w-4 h-4 text-purple-600" />
//               </div>
//               <span className="text-sm">HR</span>
//             </div>
//           </div>
//         );

//       case "triggering":
//         return (
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <p className="text-gray-600">
//               Auto-trigger this app when a user asks a question about the
//               company's codebase, or questions relating to engineering practices
//               and software development lifecycle.
//             </p>
//           </div>
//         );

//         case "configure":
//           return (
//             <div>
//               <div className="flex items-center gap-8 justify-center py-4">
//                 <div className="flex flex-col items-center gap-2">
//                   <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-100">
//                     <MessageCircle className="w-6 h-6 text-blue-600" />
//                   </div>
//                   <span className="text-sm text-gray-600">Chat</span>
//                 </div>
//                 <div className="flex flex-col items-center gap-2">
//                   <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-green-100">
//                     <Slack className="w-6 h-6 text-green-600" />
//                   </div>
//                   <span className="text-sm text-gray-600">Slack</span>
//                 </div>
//                 <div className="flex flex-col items-center gap-2">
//                   <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-indigo-100">
//                     <Blocks className="w-6 h-6 text-indigo-600" />
//                   </div>
//                   <span className="text-sm text-gray-600">API</span>
//                 </div>
//               </div>
//               <div className="flex justify-center mt-8">
//                 <Button
//                   onClick={handleConfigureAgentClick}
//                   disabled={isLoading || !isFormValid()}
//                   className="px-8 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium text-sm"
//                 >
//                   {isLoading ? "Configuring..." : "Configure Agent"}
//                 </Button>
//               </div>
//             </div>
//           );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex flex-col h-full w-full">
//       {/* Tab Switch */}
//       <div className="mb-2 flex space-x-4">
//         <button
//           onClick={() => setCurrentTab("Describe")}
//           className={`px-4 py-2 rounded ${
//             currentTab === "Describe"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 text-gray-700"
//           }`}
//         >
//           Describe
//         </button>
//         <button
//           onClick={() => setCurrentTab("Configure")}
//           className={`px-4 py-2 rounded ${
//             currentTab === "Configure"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-200 text-gray-700"
//           }`}
//         >
//           Configure
//         </button>
//       </div>

//       {currentTab === "Describe" && (
//         <div className="flex flex-col h-full">
//           {/* Chat Messages */}
//           <div className="flex-1 overflow-y-auto mb-2">
//             {chatMessages.map((msg, index) => {
//               const isUser = msg.type === "user";
//               return (
//                 <div
//                   key={index}
//                   className={`mb-4 p-2 rounded ${
//                     isUser ? "bg-green-100 self-end" : "bg-white"
//                   }`}
//                 >
//                   <div className="flex items-start gap-2 mb-1">
//                     <img
//                       src={isUser ? "/african.svg" : "/zuri-icon.svg"}
//                       alt={isUser ? "User Icon" : "AI Icon"}
//                       className="w-6 h-6 object-cover"
//                     />
//                     <p className="font-bold text-sm">
//                       {isUser ? "User" : "Kazuri Agent (AI)"}
//                     </p>
//                   </div>
//                   <pre className="text-sm whitespace-pre-wrap">{msg.content}</pre>
//                 </div>
//               );
//             })}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input Bar */}
//           <div className="relative">
//             <Input
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && !e.shiftKey) {
//                   e.preventDefault();
//                   handleSendMessage();
//                 }
//               }}
//               placeholder="Type your message..."
//               className="pr-24"
//               disabled={isLoading}
//             />
//             <div className="absolute right-2 top-2 flex gap-2">
//               <Button variant="ghost" size="icon" disabled={isLoading}>
//                 <Edit2 size={16} />
//               </Button>
//               <Button variant="ghost" size="icon" disabled={isLoading}>
//                 <Mic size={16} />
//               </Button>
//               <Button 
//                 variant="ghost" 
//                 size="icon" 
//                 onClick={handleSendMessage}
//                 disabled={isLoading || !inputValue.trim()}
//               >
//                 <Send size={16} />
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}

//       {currentTab === "Configure" && (
//         <div className="h-full w-full overflow-y-auto">
//           <div className="space-y-4 mt-2">
//             {sections.map((section) => (
//               <div
//                 key={section.id}
//                 className="bg-white rounded-lg border shadow-sm p-4"
//               >
//                 <div
//                   className="flex items-center justify-between cursor-pointer"
//                   onClick={() =>
//                     setActiveSection(activeSection === section.id ? "" : section.id)
//                   }
//                 >
//                   <span className="text-gray-700 font-medium">{section.title}</span>
//                   <ChevronRight
//                     className={`w-5 h-5 text-gray-400 transition-transform ${
//                       activeSection === section.id ? "rotate-90" : ""
//                     }`}
//                   />
//                 </div>
//                 {activeSection === section.id && (
//                   <div className="mt-4">{renderSectionContent(section.id)}</div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// 
"use client";
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiService, Agent } from "@/services/api";
import {
  ChevronRight,
  Code,
  User,
  HelpCircle,
  Mail,
  Users,
  Briefcase,
  Slack,
  Blocks,
  Diamond,
  X,
  FileText,
  Github,
  MessageCircle,
  Edit2,
  Mic,
  Send,
  Settings,
} from "lucide-react";

// Types for chat messages
interface Message {
  type: "user" | "assistant";
  content: string;
}

// Props: We'll send back a real Agent object on creation
interface KazuriChatProps {
  onConfigureAgent?: (agent: Agent) => void;
}

export default function KazuriChat({ onConfigureAgent }: KazuriChatProps) {
  //
  // ────────────────────────────────────────────────────────────────────────────────
  // 1) TABS: "Describe" or "Configure"
  // ────────────────────────────────────────────────────────────────────────────────
  //
  const [currentTab, setCurrentTab] = useState<"Describe" | "Configure">("Describe");

  //
  // ────────────────────────────────────────────────────────────────────────────────
  // 2) DESCRIBE (CHAT) STATES & LOGIC
  // ────────────────────────────────────────────────────────────────────────────────
  //
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      type: "assistant",
      content: "Hello! I'm here to help you create and configure an AI agent.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Always scroll to the bottom of chat when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const userMsg: Message = { type: "user", content: inputValue.trim() };
    setChatMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // Simulate an AI reply
    setTimeout(() => {
      const aiMsg: Message = {
        type: "assistant",
        content: `AI response for: "${userMsg.content}"`,
      };
      setChatMessages((prev) => [...prev, aiMsg]);
    }, 800);
  };

  //
  // ────────────────────────────────────────────────────────────────────────────────
  // 3) CONFIGURE (COLLAPSIBLE SECTIONS) STATES & LOGIC
  // ────────────────────────────────────────────────────────────────────────────────
  //
  const [activeSection, setActiveSection] = useState<string>("");

  // Basic info
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    description: "",
  });

  // Instructions
  const [instructions, setInstructions] = useState("");

  // Agent Type (Dropdown)
  const [selectedAgentType, setSelectedAgentType] = useState<string>("");

  // Actions (pick one)
  const [selectedAction, setSelectedAction] = useState<string>("");

  // Action items
  const actionItems = [
    {
      id: "pull_request",
      label: "Pull Request",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      icon: Code,
    },
    {
      id: "expert_search",
      label: "Expert Search",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      icon: User,
    },
    {
      id: "create_jira",
      label: "Create Jira",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      icon: HelpCircle,
    },
    {
      id: "create_email",
      label: "Create Email",
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
      icon: Mail,
    },
  ];

  // Define our sections, removing "knowledge"
  const sections = [
    { id: "basic", title: "Basic info" },
    { id: "instruction", title: "Instruction" },
    { id: "agenttype", title: "Agent Type" },
    { id: "actions", title: "Actions" },
    { id: "function", title: "Company functions" },
    { id: "triggering", title: "Triggering" },
    { id: "configure", title: "Configure" },
  ];

  // Validate the form
  const isFormValid = () => {
    return (
      basicInfo.name.trim() !== "" &&
      basicInfo.description.trim() !== "" &&
      selectedAgentType !== ""
    );
  };

  //
  // ────────────────────────────────────────────────────────────────────────────────
  // 4) HANDLE "Configure" Button => Create Agent in the Backend
  // ────────────────────────────────────────────────────────────────────────────────
  //
  const [isLoading, setIsLoading] = useState(false);

  const handleConfigureAgentClick = async () => {
    if (!isFormValid()) {
      alert("Please fill out name, description, and select an agent type!");
      return;
    }

    try {
      setIsLoading(true);

      // Build the agent object
      const agentConfig = {
        name: basicInfo.name,
        type: selectedAgentType, // "conversational", "rag", "tool_calling", "coding"
        configuration: {
          description: basicInfo.description,
          instructions,
          actions: selectedAction ? [selectedAction] : [],
        },
      };

      // Call the backend to create the agent
      const newAgent = await apiService.createAgent(agentConfig);

      // Notify parent that we have created a new agent
      if (onConfigureAgent) {
        onConfigureAgent(newAgent);
      }

      // Reset fields
      setBasicInfo({ name: "", description: "" });
      setSelectedAgentType("");
      setInstructions("");
      setSelectedAction("");

      alert("Agent configured successfully!");
      setCurrentTab("Describe");
    } catch (error) {
      console.error("Failed to configure agent:", error);
      alert("Error creating agent in backend");
    } finally {
      setIsLoading(false);
    }
  };

  //
  // ────────────────────────────────────────────────────────────────────────────────
  // 5) RENDER SECTION CONTENT
  // ────────────────────────────────────────────────────────────────────────────────
  //
  const renderSectionContent = (sectionId: string) => {
    switch (sectionId) {
      case "basic":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <Code className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                value={basicInfo.name}
                onChange={(e) =>
                  setBasicInfo((prev) => ({ ...prev, name: e.target.value }))
                }
                className={`flex-1 p-2 border rounded-md ${
                  !basicInfo.name && "border-red-300"
                }`}
                placeholder="Enter agent name (required) ..."
              />
            </div>
            <textarea
              value={basicInfo.description}
              onChange={(e) =>
                setBasicInfo((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className={`w-full p-3 border rounded-md min-h-[100px] ${
                !basicInfo.description && "border-red-300"
              }`}
              placeholder="Enter a description for your agent (required)..."
            />
          </div>
        );

      case "instruction":
        return (
          <div className="bg-gray-50 p-4 rounded-lg">
            <textarea
              className="w-full p-3 border rounded-md min-h-[100px]"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Enter instructions for your agent..."
            />
          </div>
        );

      case "agenttype":
        const agentTypes = ["conversational", "rag", "tool_calling", "coding"];
        return (
          <div className="mt-4">
            <label className="block mb-2 font-medium text-gray-700">
              Select Agent Type
            </label>
            <select
              className="border rounded-md p-2 text-sm"
              value={selectedAgentType}
              onChange={(e) => setSelectedAgentType(e.target.value)}
            >
              <option value="">-- choose agent type --</option>
              {agentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        );

      case "actions":
        return (
          <div className="overflow-x-auto py-4">
            <div className="flex items-center gap-6">
              {actionItems.map((action) => {
                const IconComponent = action.icon;
                const isSelected = selectedAction === action.id;
                return (
                  <div
                    key={action.id}
                    onClick={() => setSelectedAction(action.id)}
                    className={`flex items-center gap-2 cursor-pointer p-2 rounded-md transition-colors min-w-[140px] ${
                      isSelected ? "bg-blue-100" : "hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 ${action.iconBg} rounded-lg flex items-center justify-center`}
                    >
                      <IconComponent className={`w-4 h-4 ${action.iconColor}`} />
                    </div>
                    <span className="text-sm">{action.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case "function":
        return (
          <div className="flex items-center gap-6 justify-center py-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                <Settings className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm">TES</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm">EBU</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                <Code className="w-4 h-4 text-orange-600" />
              </div>
              <span className="text-sm">DIT</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-sm">HR</span>
            </div>
          </div>
        );

      case "triggering":
        return (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600">
              Auto-trigger this app when a user asks a question about the
              company's codebase, or questions relating to engineering practices
              and software development lifecycle.
            </p>
          </div>
        );

      case "configure":
        return (
          <div>
            <div className="flex items-center gap-8 justify-center py-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-100">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm text-gray-600">Chat</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-green-100">
                  <Slack className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-sm text-gray-600">Slack</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-indigo-100">
                  <Blocks className="w-6 h-6 text-indigo-600" />
                </div>
                <span className="text-sm text-gray-600">API</span>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <Button
                onClick={handleConfigureAgentClick}
                disabled={isLoading || !isFormValid()}
                className="px-8 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                {isLoading ? "Configuring..." : "Configure Agent"}
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  //
  // ────────────────────────────────────────────────────────────────────────────────
  // 6) RETURN: TABS + CONTENT
  // ────────────────────────────────────────────────────────────────────────────────
  //
  return (
    <div className="flex flex-col h-full w-full">
      {/* Tab Switch */}
      <div className="mb-2 flex space-x-4">
        <button
          onClick={() => setCurrentTab("Describe")}
          className={`px-4 py-2 rounded ${
            currentTab === "Describe"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Describe
        </button>
        <button
          onClick={() => setCurrentTab("Configure")}
          className={`px-4 py-2 rounded ${
            currentTab === "Configure"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Configure
        </button>
      </div>

      {currentTab === "Describe" && (
        <div className="flex flex-col h-full">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto mb-2">
            {chatMessages.map((msg, index) => {
              const isUser = msg.type === "user";
              return (
                <div
                  key={index}
                  className={`mb-4 p-2 rounded ${
                    isUser ? "bg-green-100 self-end" : "bg-white"
                  }`}
                >
                  <div className="flex items-start gap-2 mb-1">
                    <img
                      src={isUser ? "/african.svg" : "/zuri-icon.svg"}
                      alt={isUser ? "User Icon" : "AI Icon"}
                      className="w-6 h-6 object-cover"
                    />
                    <p className="font-bold text-sm">
                      {isUser ? "User" : "Kazuri Agent (AI)"}
                    </p>
                  </div>
                  <pre className="text-sm whitespace-pre-wrap">
                    {msg.content}
                  </pre>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Type your message..."
              className="pr-24"
              disabled={isLoading}
            />
            <div className="absolute right-2 top-2 flex gap-2">
              <Button variant="ghost" size="icon" disabled={isLoading}>
                <Edit2 size={16} />
              </Button>
              <Button variant="ghost" size="icon" disabled={isLoading}>
                <Mic size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}

      {currentTab === "Configure" && (
        <div className="h-full w-full overflow-y-auto">
          <div className="space-y-4 mt-2">
            {sections.map((section) => (
              <div
                key={section.id}
                className="bg-white rounded-lg border shadow-sm p-4"
              >
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() =>
                    setActiveSection(
                      activeSection === section.id ? "" : section.id
                    )
                  }
                >
                  <span className="text-gray-700 font-medium">
                    {section.title}
                  </span>
                  <ChevronRight
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      activeSection === section.id ? "rotate-90" : ""
                    }`}
                  />
                </div>
                {activeSection === section.id && (
                  <div className="mt-4">{renderSectionContent(section.id)}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
