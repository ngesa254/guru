// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { apiService, Agent } from "@/services/api";
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

// // Props: We'll send back a real Agent object on creation
// interface KazuriChatProps {
//   onConfigureAgent?: (agent: Agent) => void;
// }

// export default function KazuriChat({ onConfigureAgent }: KazuriChatProps) {
//   // ─────────────────────────────────────────────────────────────────────────────
//   // 1) We keep the chat logic internally, but default the tab to "Configure"
//   //    and hide the "Describe" UI. 
//   // ─────────────────────────────────────────────────────────────────────────────
//   const [currentTab] = useState<"Describe" | "Configure">("Configure");

//   // Chat states (still here, but won't render the chat UI)
//   const [chatMessages] = useState<Message[]>([
//     {
//       type: "assistant",
//       content: "Hello! I'm here to help you create and configure an AI agent.",
//     },
//   ]);
//   const [inputValue] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // ─────────────────────────────────────────────────────────────────────────────
//   // 2) CONFIGURE (COLLAPSIBLE SECTIONS) STATES & LOGIC
//   // ─────────────────────────────────────────────────────────────────────────────
//   const [activeSection, setActiveSection] = useState<string>("");

//   // Basic info
//   const [basicInfo, setBasicInfo] = useState({
//     name: "",
//     description: "",
//   });

//   // Instructions
//   const [instructions, setInstructions] = useState("");

//   // Agent Type (Dropdown)
//   const [selectedAgentType, setSelectedAgentType] = useState<string>("");

//   // Actions (pick one)
//   const [selectedAction, setSelectedAction] = useState<string>("");

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

//   // Sections
//   const sections = [
//     { id: "basic", title: "Basic info" },
//     { id: "instruction", title: "Instruction" },
//     { id: "agenttype", title: "Agent Type" },
//     { id: "actions", title: "Actions" },
//     { id: "function", title: "Company functions" },
//     { id: "triggering", title: "Triggering" },
//     { id: "configure", title: "Configure" },
//   ];

//   // Validate the form
//   const isFormValid = () => {
//     return (
//       basicInfo.name.trim() !== "" &&
//       basicInfo.description.trim() !== "" &&
//       selectedAgentType !== ""
//     );
//   };

//   // Handle "Configure Agent" click
//   const [isLoading, setIsLoading] = useState(false);
//   const handleConfigureAgentClick = async () => {
//     if (!isFormValid()) {
//       alert("Please fill out name, description, and select an agent type!");
//       return;
//     }

//     try {
//       setIsLoading(true);

//       // Build the agent object
//       const agentConfig = {
//         name: basicInfo.name,
//         type: selectedAgentType, // "conversational", "rag", "tool_calling", "coding"
//         configuration: {
//           description: basicInfo.description,
//           instructions,
//           actions: selectedAction ? [selectedAction] : [],
//         },
//       };

//       // Call the backend to create the agent
//       const newAgent = await apiService.createAgent(agentConfig);

//       // Notify parent that we have created a new agent
//       if (onConfigureAgent) {
//         onConfigureAgent(newAgent);
//       }

//       // Reset fields
//       setBasicInfo({ name: "", description: "" });
//       setSelectedAgentType("");
//       setInstructions("");
//       setSelectedAction("");

//       alert("Agent configured successfully!");
//       // (We keep currentTab as "Configure"; chat is hidden anyway)
//     } catch (error) {
//       console.error("Failed to configure agent:", error);
//       alert("Error creating agent in backend");
//     } finally {
//       setIsLoading(false);
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
//                 onChange={(e) =>
//                   setBasicInfo((prev) => ({ ...prev, name: e.target.value }))
//                 }
//                 className={`flex-1 p-2 border rounded-md ${
//                   !basicInfo.name && "border-red-300"
//                 }`}
//                 placeholder="Enter agent name (required) ..."
//               />
//             </div>
//             <textarea
//               value={basicInfo.description}
//               onChange={(e) =>
//                 setBasicInfo((prev) => ({
//                   ...prev,
//                   description: e.target.value,
//                 }))
//               }
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

//       case "agenttype":
//         const agentTypes = ["conversational", "rag", "tool_calling", "coding"];
//         return (
//           <div className="mt-4">
//             <label className="block mb-2 font-medium text-gray-700">
//               Select Agent Type
//             </label>
//             <select
//               className="border rounded-md p-2 text-sm"
//               value={selectedAgentType}
//               onChange={(e) => setSelectedAgentType(e.target.value)}
//             >
//               <option value="">-- choose agent type --</option>
//               {agentTypes.map((type) => (
//                 <option key={type} value={type}>
//                   {type}
//                 </option>
//               ))}
//             </select>
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
//               <Button
//                 onClick={handleConfigureAgentClick}
//                 disabled={isLoading || !isFormValid()}
//                 className="px-8 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium text-sm"
//               >
//                 {isLoading ? "Configuring..." : "Configure Agent"}
//               </Button>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   // ─────────────────────────────────────────────────────────────────────────────
//   // 7) RENDER: Hide the chat side, show only "Configure"
//   // ─────────────────────────────────────────────────────────────────────────────
//   return (
//     <div className="flex flex-col h-full w-full">
//       {/* We are skipping the "Describe" tab and chat UI. */}
//       {/* Render only the "Configure" portion. */}

//       <div className="h-full w-full overflow-y-auto space-y-4 mt-2">
//         {sections.map((section) => (
//           <div
//             key={section.id}
//             className="bg-white rounded-lg border shadow-sm p-4"
//           >
//             <div
//               className="flex items-center justify-between cursor-pointer"
//               onClick={() =>
//                 setActiveSection(activeSection === section.id ? "" : section.id)
//               }
//             >
//               <span className="text-gray-700 font-medium">{section.title}</span>
//               <ChevronRight
//                 className={`w-5 h-5 text-gray-400 transition-transform ${
//                   activeSection === section.id ? "rotate-90" : ""
//                 }`}
//               />
//             </div>
//             {activeSection === section.id && (
//               <div className="mt-4">{renderSectionContent(section.id)}</div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// "use client";
// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { apiService, Agent } from "@/services/api";
// import {
//   Bot,
//   Database,
//   Wrench,
//   Code2,
//   PlusCircle,
//   CheckCircle2,
//   AlertCircle,
//   Info,
// } from "lucide-react";

// interface KazuriChatProps {
//   onConfigureAgent?: (agent: Agent) => void;
// }

// // Define the agent types with their configurations
// const AGENT_TYPES = [
//   {
//     id: "conversational",
//     name: "Conversational Agent",
//     icon: Bot,
//     description: "Natural conversation and general assistance",
//     color: "text-blue-600",
//     bgColor: "bg-blue-50",
//     features: [
//       "Natural language understanding",
//       "Multi-turn conversations",
//       "General knowledge assistance",
//       "Contextual responses"
//     ]
//   },
//   {
//     id: "rag",
//     name: "Document Assistant",
//     icon: Database,
//     description: "Answers questions based on your documents",
//     color: "text-emerald-600",
//     bgColor: "bg-emerald-50",
//     features: [
//       "Document analysis",
//       "Contextual answers",
//       "Knowledge base support",
//       "File processing"
//     ]
//   },
//   {
//     id: "tool_calling",
//     name: "Tool-Using Agent",
//     icon: Wrench,
//     description: "Uses external tools and APIs to accomplish tasks",
//     color: "text-purple-600",
//     bgColor: "bg-purple-50",
//     features: [
//       "API integration",
//       "Tool orchestration",
//       "Task automation",
//       "System integration"
//     ]
//   },
//   {
//     id: "coding",
//     name: "Coding Assistant",
//     icon: Code2,
//     description: "Helps with code and development tasks",
//     color: "text-orange-600",
//     bgColor: "bg-orange-50",
//     features: [
//       "Code generation",
//       "Bug fixing",
//       "Code explanation",
//       "Best practices"
//     ]
//   }
// ];

// export default function KazuriChat({ onConfigureAgent }: KazuriChatProps) {
//   // Form States
//   const [agentType, setAgentType] = useState("");
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [instructions, setInstructions] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   // Validation
//   const isValid = name.trim() && description.trim() && agentType;

//   // Handle agent creation
//   const handleCreateAgent = async () => {
//     if (!isValid) return;
    
//     setIsLoading(true);
//     setError("");
    
//     try {
//       const newAgent = await apiService.createAgent({
//         name: name.trim(),
//         type: agentType,
//         description: description.trim(),
//       });
      
//       setSuccess(true);
//       if (onConfigureAgent) {
//         onConfigureAgent(newAgent);
//       }
      
//       // Reset form
//       setName("");
//       setDescription("");
//       setInstructions("");
//       setAgentType("");
      
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to create agent");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
//       {/* Header */}
//       <div className="text-center space-y-2">
//         <h1 className="text-2xl font-bold text-gray-900">Create New Agent</h1>
//         <p className="text-gray-500">Choose your agent type and configure its capabilities</p>
//       </div>

//       {/* Main Form */}
//       <div className="space-y-8">
//         {/* Step indicator */}
//         <div className="flex items-center justify-center space-x-2 text-sm">
//           <span className={`px-3 py-1 rounded-full ${agentType ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}>
//             1. Select Type
//           </span>
//           <span className="text-gray-300">→</span>
//           <span className={`px-3 py-1 rounded-full ${agentType && !isValid ? 'bg-gray-100' : agentType ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}>
//             2. Configure
//           </span>
//         </div>

//         {/* Agent Type Selection */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {AGENT_TYPES.map((type) => {
//             const Icon = type.icon;
//             const isSelected = agentType === type.id;
            
//             return (
//               <div
//                 key={type.id}
//                 onClick={() => setAgentType(type.id)}
//                 className={`relative p-6 rounded-xl border-2 transition-all cursor-pointer
//                   ${isSelected 
//                     ? 'border-blue-500 bg-blue-50/50 shadow-sm' 
//                     : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
//                   }`}
//               >
//                 {isSelected && (
//                   <CheckCircle2 className="absolute top-4 right-4 w-5 h-5 text-blue-500" />
//                 )}
//                 <div className="space-y-4">
//                   <div className={`w-12 h-12 rounded-lg ${type.bgColor} flex items-center justify-center`}>
//                     <Icon className={`w-6 h-6 ${type.color}`} />
//                   </div>
//                   <div>
//                     <h3 className="font-medium text-gray-900">{type.name}</h3>
//                     <p className="text-sm text-gray-500 mt-1">{type.description}</p>
//                   </div>
//                   <ul className="space-y-2">
//                     {type.features.map((feature, idx) => (
//                       <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
//                         <PlusCircle className="w-4 h-4 text-gray-400" />
//                         {feature}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Agent Details */}
//         {agentType && (
//           <div className="bg-white rounded-xl border p-6 space-y-6 animate-in slide-in-from-bottom-4 duration-500">
//             <div className="space-y-4">
//               <label className="block">
//                 <span className="text-gray-700 font-medium">Agent Name</span>
//                 <Input
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Give your agent a name"
//                   className="mt-1"
//                 />
//               </label>

//               <label className="block">
//                 <span className="text-gray-700 font-medium">Description</span>
//                 <textarea
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   placeholder="What will this agent do? Be specific about its purpose."
//                   rows={3}
//                   className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
//                 />
//               </label>

//               <div className="bg-blue-50 rounded-lg p-4 flex gap-3">
//                 <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
//                 <div className="text-sm text-blue-700">
//                   <p className="font-medium">Configuration Tips:</p>
//                   <ul className="mt-2 space-y-1 list-disc list-inside">
//                     <li>Be specific about the agent's purpose</li>
//                     <li>Consider the scope of tasks it will handle</li>
//                     <li>Think about who will interact with this agent</li>
//                   </ul>
//                 </div>
//               </div>

//               <label className="block">
//                 <span className="text-gray-700 font-medium">Additional Instructions (Optional)</span>
//                 <textarea
//                   value={instructions}
//                   onChange={(e) => setInstructions(e.target.value)}
//                   placeholder="Add any specific guidelines or constraints for your agent"
//                   rows={4}
//                   className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
//                 />
//               </label>
//             </div>
//           </div>
//         )}

//         {/* Error Message */}
//         {error && (
//           <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
//             <AlertCircle className="w-5 h-5" />
//             <p>{error}</p>
//           </div>
//         )}

//         {/* Success Message */}
//         {success && (
//           <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg">
//             <CheckCircle2 className="w-5 h-5" />
//             <p>Agent created successfully! You can now test it in the agent hub.</p>
//           </div>
//         )}

//         {/* Create Button */}
//         <div className="flex justify-end pt-4">
//           <Button
//             onClick={handleCreateAgent}
//             disabled={!isValid || isLoading}
//             className={`px-8 py-2 rounded-lg transition-all ${
//               isValid && !isLoading 
//                 ? 'bg-blue-600 hover:bg-blue-700 text-white'
//                 : 'bg-gray-100 text-gray-400 cursor-not-allowed'
//             }`}
//           >
//             {isLoading ? (
//               <div className="flex items-center gap-2">
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 Creating Agent...
//               </div>
//             ) : (
//               'Create Agent'
//             )}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client"; THA BEST
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiService, Agent, Tool } from "@/services/api";
import {
  Bot,
  Database,
  Wrench,
  Code2,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  Info,
  Upload,
  X,
  FileText,
} from "lucide-react";

interface KazuriChatProps {
  onConfigureAgent?: (agent: Agent) => void;
}

const AGENT_TYPES = [
  {
    id: "conversational",
    name: "Conversational Agent",
    icon: Bot,
    description: "Natural conversation and general assistance",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    features: [
      "Natural language understanding",
      "Multi-turn conversations",
      "General knowledge assistance",
      "Contextual responses"
    ]
  },
  {
    id: "rag",
    name: "Document Assistant",
    icon: Database,
    description: "Answers questions based on your documents",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    features: [
      "Document analysis",
      "Contextual answers",
      "Knowledge base support",
      "File processing"
    ]
  },
  {
    id: "tool_calling",
    name: "Tool-Using Agent",
    icon: Wrench,
    description: "Uses external tools and APIs to accomplish tasks",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    features: [
      "API integration",
      "Tool orchestration",
      "Task automation",
      "System integration"
    ]
  },
  {
    id: "coding",
    name: "Coding Assistant",
    icon: Code2,
    description: "Helps with code and development tasks",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    features: [
      "Code generation",
      "Bug fixing",
      "Code explanation",
      "Best practices"
    ]
  }
];

const ACCEPTED_FILE_TYPES = [
  '.pdf', '.doc', '.docx', '.txt', '.csv', 
  '.xlsx', '.xls', '.pptx', '.ppt', '.md'
];

export default function KazuriChat({ onConfigureAgent }: KazuriChatProps) {
  // Basic form states
  const [agentType, setAgentType] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Document and tool states
  const [documents, setDocuments] = useState<File[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [isLoadingTools, setIsLoadingTools] = useState(false);

  // Fetch tools when tool_calling is selected
  useEffect(() => {
    if (agentType === 'tool_calling') {
      const fetchTools = async () => {
        setIsLoadingTools(true);
        try {
          const availableTools = await apiService.listTools();
          setTools(availableTools);
        } catch (error) {
          console.error('Failed to fetch tools:', error);
          setError('Failed to load available tools');
        } finally {
          setIsLoadingTools(false);
        }
      };
      fetchTools();
    }
  }, [agentType]);

  // Document handling
  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Filter out unsupported file types
      const validFiles = Array.from(files).filter(file => 
        ACCEPTED_FILE_TYPES.some(type => file.name.toLowerCase().endsWith(type))
      );
      
      if (validFiles.length !== files.length) {
        setError('Some files were skipped due to unsupported file types');
      }
      
      setDocuments(prev => [...prev, ...validFiles]);
    }
  };

  const removeDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  // Tool selection
  const toggleTool = (toolName: string) => {
    setSelectedTools(prev =>
      prev.includes(toolName)
        ? prev.filter(t => t !== toolName)
        : [...prev, toolName]
    );
  };

  // Validation
  const isValid = name.trim() && 
    description.trim() && 
    agentType && 
    (agentType !== 'rag' || documents.length > 0) &&
    (agentType !== 'tool_calling' || selectedTools.length > 0);

  // Create agent
  const handleCreateAgent = async () => {
    if (!isValid) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      // Create the base agent
      const newAgent = await apiService.createAgent({
        name: name.trim(),
        type: agentType,
        description: description.trim(),
        configuration: {
          instructions: instructions.trim(),
          selectedTools: selectedTools,
        }
      });

      // Upload documents for RAG agent
      if (agentType === 'rag' && documents.length > 0) {
        for (const document of documents) {
          await apiService.uploadDocument(newAgent.id, document);
        }
      }
      
      setSuccess(true);
      if (onConfigureAgent) {
        onConfigureAgent(newAgent);
      }
      
      // Reset form
      setName("");
      setDescription("");
      setInstructions("");
      setAgentType("");
      setDocuments([]);
      setSelectedTools([]);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create agent");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Create New Agent</h1>
        <p className="text-gray-500">Choose your agent type and configure its capabilities</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-2 text-sm">
        <span className={`px-3 py-1 rounded-full ${agentType ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}>
          1. Select Type
        </span>
        <span className="text-gray-300">→</span>
        <span className={`px-3 py-1 rounded-full ${agentType && !isValid ? 'bg-gray-100' : agentType ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}>
          2. Configure
        </span>
      </div>

      {/* Main Form */}
      <div className="space-y-8">
        {/* Agent Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {AGENT_TYPES.map((type) => {
            const Icon = type.icon;
            const isSelected = agentType === type.id;
            
            return (
              <div
                key={type.id}
                onClick={() => {
                  setAgentType(type.id);
                  setError("");
                }}
                className={`relative p-6 rounded-xl border-2 transition-all cursor-pointer
                  ${isSelected 
                    ? 'border-blue-500 bg-blue-50/50 shadow-sm' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
              >
                {isSelected && (
                  <CheckCircle2 className="absolute top-4 right-4 w-5 h-5 text-blue-500" />
                )}
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-lg ${type.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${type.color}`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{type.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                  </div>
                  <ul className="space-y-2">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                        <PlusCircle className="w-4 h-4 text-gray-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Configuration Form */}
        {agentType && (
          <div className="bg-white rounded-xl border p-6 space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            {/* Basic Info */}
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-700 font-medium">Agent Name</span>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Give your agent a name"
                  className="mt-1"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-medium">Description</span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What will this agent do? Be specific about its purpose."
                  rows={3}
                  className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-medium">Instructions (Optional)</span>
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Add any specific guidelines or constraints for your agent"
                  rows={4}
                  className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                />
              </label>
            </div>

            {/* Document Upload for RAG */}
            {agentType === 'rag' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Upload Documents</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Input
                    type="file"
                    onChange={handleDocumentUpload}
                    className="hidden"
                    id="document-upload"
                    multiple
                    accept={ACCEPTED_FILE_TYPES.join(',')}
                  />
                  <label
                    htmlFor="document-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Drop files here or click to upload
                    </span>
                    <span className="text-xs text-gray-400">
                      Supports PDF, DOC, DOCX, TXT, and more
                    </span>
                  </label>
                </div>

                {/* Document List */}
                {documents.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-700">Uploaded Documents</h4>
                    <div className="space-y-2">
                      {documents.map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{doc.name}</span>
                          </div>
                          <button
                            onClick={() => removeDocument(index)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tool Selection for tool_calling */}
            {agentType === 'tool_calling' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Select Tools</h3>
                {isLoadingTools ? (
                  <div className="text-center py-4">Loading available tools...</div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {tools.map((tool) => (
                      <div
                        key={tool.name}
                        onClick={() => toggleTool(tool.name)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedTools.includes(tool.name)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{tool.name}</span>
                          {selectedTools.includes(tool.name) && (
                            <CheckCircle2 className="w-4 h-4 text-blue-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{tool.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}
        {success && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg">
            <CheckCircle2 className="w-5 h-5" />
            <p>Agent created successfully! You can now test it in the agent hub.</p>
          </div>
        )}

        {/* Configuration Tips */}
        {agentType && (
          <div className="bg-blue-50 rounded-lg p-4 flex gap-3">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-700">
              <p className="font-medium">Configuration Tips:</p>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                {agentType === 'rag' && [
                  'Upload relevant documents to train your agent. ',
                  'Supported formats include PDF, DOC, TXT, and more. ',
                  'Larger documents may take longer to process.'
                ]}
                {agentType === 'tool_calling' && [
                  'Select tools that match your agent\'s purpose. ',
                  'You can combine multiple tools for complex tasks. ',
                  'Tools can be added or removed later'
                ]}
                {agentType === 'conversational' && [
                  'Be specific about the agent\'s purpose and tone.',
                  ' Consider adding example conversations in instructions.',
                  ' Define any specific knowledge domains'
                ]}
                {agentType === 'coding' && [
                  'Specify preferred programming languages. ',
                  'Define coding style and documentation requirements. ',
                  'Include any specific libraries or frameworks to focus on'
                ]}
              </ul>
            </div>
          </div>
        )}

        {/* Create Button */}
        <div className="flex justify-end pt-4">
          <Button
            onClick={handleCreateAgent}
            disabled={!isValid || isLoading}
            className={`px-8 py-2 rounded-lg transition-all ${
              isValid && !isLoading 
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating Agent...
              </div>
            ) : (
              'Create Agent'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

//export default KazuriChat;


///////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect } from 'react';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { apiService } from '@/services/api';
// import {
//   Bot,
//   Database,
//   Wrench,
//   Code2,
//   CheckCircle2,
//   AlertCircle,
//   Upload,
//   X,
//   FileText,
// } from 'lucide-react';

// const AGENT_TYPES = [
//   {
//     id: "RAG",
//     name: "Document Assistant",
//     icon: Database,
//     description: "Answers questions based on uploaded files",
//     color: "text-emerald-600",
//     bgColor: "bg-emerald-50",
//   },
//   {
//     id: "CONVERSATIONAL",
//     name: "Conversational Agent",
//     icon: Bot,
//     description: "Natural conversation and general assistance",
//     color: "text-blue-600",
//     bgColor: "bg-blue-50",
//   },
//   {
//     id: "TOOL_CALLING",
//     name: "Tool-Using Agent",
//     icon: Wrench,
//     description: "Uses external tools and APIs for tasks",
//     color: "text-purple-600",
//     bgColor: "bg-purple-50",
//   },
//   {
//     id: "CODING",
//     name: "Coding Assistant",
//     icon: Code2,
//     description: "Helps with code and development tasks",
//     color: "text-orange-600",
//     bgColor: "bg-orange-50",
//   }
// ];

// const ACCEPTED_FILE_TYPES = [
//   '.pdf', '.txt', '.doc', '.docx', '.csv', 
//   '.xlsx', '.xls', '.pptx', '.ppt', '.md'
// ];

// export default function AgentCreator({ onConfigureAgent }) {
//   // Basic states
//   const [name, setName] = useState("");
//   const [agentType, setAgentType] = useState("");
//   const [description, setDescription] = useState("");
//   const [instructions, setInstructions] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [currentAgent, setCurrentAgent] = useState(null);

//   // Document handling states
//   const [documents, setDocuments] = useState([]);
//   const [uploadProgress, setUploadProgress] = useState({});

//   // Tool handling states
//   const [tools, setTools] = useState([]);
//   const [selectedTools, setSelectedTools] = useState([]);
//   const [isLoadingTools, setIsLoadingTools] = useState(false);

//   // Load tools when TOOL_CALLING is selected
//   useEffect(() => {
//     if (agentType === 'TOOL_CALLING') {
//       const loadTools = async () => {
//         setIsLoadingTools(true);
//         try {
//           const availableTools = await apiService.listTools();
//           setTools(availableTools);
//         } catch (err) {
//           console.error('Failed to load tools:', err);
//           setError('Failed to load available tools');
//           setTimeout(() => setError(''), 5000);
//         } finally {
//           setIsLoadingTools(false);
//         }
//       };
//       loadTools();
//     }
//   }, [agentType]);

//   // Handle file selection
//   const handleFileSelect = (event) => {
//     const files = Array.from(event.target.files);
//     const validFiles = files.filter(file => 
//       ACCEPTED_FILE_TYPES.some(type => file.name.toLowerCase().endsWith(type))
//     );
    
//     if (validFiles.length !== files.length) {
//       setError('Some files were not added due to unsupported formats');
//       setTimeout(() => setError(''), 5000);
//     }
    
//     setDocuments(prev => [...prev, ...validFiles]);
//   };

//   // Remove document
//   const removeDocument = (index) => {
//     setDocuments(prev => prev.filter((_, i) => i !== index));
//     const fileName = documents[index].name;
//     setUploadProgress(prev => {
//       const updated = { ...prev };
//       delete updated[fileName];
//       return updated;
//     });
//   };

//   // Toggle tool selection
//   const toggleTool = (toolName) => {
//     setSelectedTools(prev =>
//       prev.includes(toolName)
//         ? prev.filter(t => t !== toolName)
//         : [...prev, toolName]
//     );
//   };

//   // Upload files
//   const uploadFiles = async (agentId) => {
//     for (const file of documents) {
//       setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
      
//       const formData = new FormData();
//       formData.append('file', file);
      
//       try {
//         await apiService.uploadDocument(agentId, file);
//         setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
//       } catch (err) {
//         console.error('Upload error:', err);
//         setError(`Failed to upload ${file.name}: ${err.message}`);
//         setTimeout(() => setError(''), 5000);
//       }
//     }
//   };

//   // Create agent
//   const handleCreateAgent = async () => {
//     setIsLoading(true);
//     setError("");
    
//     try {
//       const agentData = {
//         name: name,
//         type: agentType,
//         configuration: {
//           description: description,
//           instructions: instructions,
//           ...(agentType === 'RAG' && {
//             supported_formats: ACCEPTED_FILE_TYPES,
//             embedding_model: "all-MiniLM-L6-v2",
//             max_tokens: 1000
//           }),
//           ...(agentType === 'TOOL_CALLING' && {
//             tools: selectedTools
//           }),
//           ...(agentType === 'CODING' && {
//             supported_languages: [
//               "python", "javascript", "typescript",
//               "java", "c++", "go", "rust"
//             ]
//           })
//         }
//       };

//       const newAgent = await apiService.createAgent(agentData);
//       setCurrentAgent(newAgent);

//       // If RAG agent, upload documents
//       if (agentType === 'RAG' && documents.length > 0) {
//         await uploadFiles(newAgent.id);
//       }

//       setSuccess("Agent created successfully!");
//       setTimeout(() => setSuccess(""), 5000);

//       if (onConfigureAgent) {
//         onConfigureAgent(newAgent);
//       }

//       // Reset form
//       setName("");
//       setDescription("");
//       setInstructions("");
//       setAgentType("");
//       setDocuments([]);
//       setSelectedTools([]);

//     } catch (err) {
//       console.error('Agent creation error:', err);
//       setError(err.message);
//       setTimeout(() => setError(''), 5000);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Validation
//   const isValid = name && agentType && 
//     (agentType !== 'RAG' || documents.length > 0) &&
//     (agentType !== 'TOOL_CALLING' || selectedTools.length > 0);

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-8">
//       {/* Agent Type Selection */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {AGENT_TYPES.map((type) => {
//           const Icon = type.icon;
//           const isSelected = agentType === type.id;
          
//           return (
//             <div
//               key={type.id}
//               onClick={() => setAgentType(type.id)}
//               className={`
//                 relative p-6 rounded-xl border-2 cursor-pointer transition-all
//                 ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
//               `}
//             >
//               {isSelected && (
//                 <CheckCircle2 className="absolute top-4 right-4 w-5 h-5 text-blue-500" />
//               )}
//               <div className="space-y-4">
//                 <div className={`w-12 h-12 rounded-lg ${type.bgColor} flex items-center justify-center`}>
//                   <Icon className={`w-6 h-6 ${type.color}`} />
//                 </div>
//                 <div>
//                   <h3 className="font-medium text-gray-900">{type.name}</h3>
//                   <p className="text-sm text-gray-500 mt-1">{type.description}</p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Configuration Form */}
//       {agentType && (
//         <div className="space-y-6 bg-white rounded-xl border p-6">
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Agent Name</label>
//               <Input
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Give your agent a name"
//                 className="mt-1"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Instructions</label>
//               <textarea
//                 value={instructions}
//                 onChange={(e) => setInstructions(e.target.value)}
//                 placeholder="Specific instructions for your agent..."
//                 rows={4}
//                 className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
//               />
//             </div>

//             {/* Document Upload for RAG */}
//             {agentType === 'RAG' && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Upload Documents</label>
//                 <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                   <div className="space-y-1 text-center">
//                     <Input
//                       type="file"
//                       multiple
//                       onChange={handleFileSelect}
//                       accept={ACCEPTED_FILE_TYPES.join(',')}
//                       className="hidden"
//                       id="document-upload"
//                     />
//                     <label
//                       htmlFor="document-upload"
//                       className="cursor-pointer"
//                     >
//                       <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                       <p className="text-sm text-gray-600">Click to upload documents</p>
//                       <p className="text-xs text-gray-500">{ACCEPTED_FILE_TYPES.join(', ')}</p>
//                     </label>
//                   </div>
//                 </div>

//                 {/* Document List */}
//                 {documents.length > 0 && (
//                   <div className="mt-4 space-y-2">
//                     {documents.map((doc, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
//                       >
//                         <div className="flex items-center gap-2">
//                           <FileText className="w-4 h-4 text-gray-400" />
//                           <span className="text-sm text-gray-600">{doc.name}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           {uploadProgress[doc.name] !== undefined && (
//                             <div className="w-20 bg-gray-200 rounded-full h-1">
//                               <div
//                                 className="bg-blue-500 h-1 rounded-full"
//                                 style={{ width: `${uploadProgress[doc.name]}%` }}
//                               />
//                             </div>
//                           )}
//                           <button
//                             onClick={() => removeDocument(index)}
//                             className="text-gray-400 hover:text-red-500"
//                           >
//                             <X className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Tool Selection for TOOL_CALLING */}
//             {agentType === 'TOOL_CALLING' && (
//               <div className="space-y-4">
//                 <label className="block text-sm font-medium text-gray-700">Select Tools</label>
//                 {isLoadingTools ? (
//                   <div className="text-center py-4">
//                     <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
//                     <p className="mt-2 text-sm text-gray-500">Loading available tools...</p>
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-2 gap-3">
//                     {tools.map((tool) => (
//                       <div
//                         key={tool.name}
//                         onClick={() => toggleTool(tool.name)}
//                         className={`p-4 border rounded-lg cursor-pointer transition-all ${
//                           selectedTools.includes(tool.name)
//                             ? 'border-blue-500 bg-blue-50'
//                             : 'border-gray-200 hover:border-gray-300'
//                         }`}
//                       >
//                         <div className="flex items-center justify-between">
//                           <span className="font-medium">{tool.name}</span>
//                           {selectedTools.includes(tool.name) && (
//                             <CheckCircle2 className="w-4 h-4 text-blue-500" />
//                           )}
//                         </div>
//                         <p className="text-sm text-gray-500 mt-1">{tool.description}</p>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//                 {tools.length === 0 && !isLoadingTools && (
//                   <p className="text-sm text-gray-500">No tools available</p>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Create Button */}
//           <Button
//             onClick={handleCreateAgent}
//             disabled={!isValid || isLoading}
//             className="w-full"
//           >
//             {isLoading ? (
//               <div className="flex items-center justify-center gap-2">
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 Creating Agent...
//               </div>
//             ) : (
//               'Create Agent'
//             )}
//           </Button>
//         </div>
//       )}

//       {/* Notifications */}
//       {error && (
//           <div className="fixed top-4 right-4 bg-red-50 text-red-900 p-4 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-right-5 fade-in duration-300">
//               <AlertCircle className="w-5 h-5 text-red-600" />
//               <div>
//                   <h3 className="font-medium">Error</h3>
//                   <p className="text-sm">{error}</p>
//               </div>
//               <button 
//                   onClick={() => setError("")} 
//                   className="ml-4 text-red-800 hover:text-red-900"
//               >
//                   <X className="w-4 h-4" />
//               </button>
//           </div>
//       )}

//       {success && (
//           <div className="fixed top-4 right-4 bg-green-50 text-green-900 p-4 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-right-5 fade-in duration-300">
//               <CheckCircle2 className="w-5 h-5 text-green-600" />
//               <div>
//                   <h3 className="font-medium">Success</h3>
//                   <p className="text-sm">{success}</p>
//               </div>
//               <button 
//                   onClick={() => setSuccess("")} 
//                   className="ml-4 text-green-800 hover:text-green-900"
//               >
//                   <X className="w-4 h-4" />
//               </button>
//           </div>
//       )}
//        </div>
//   );
// };
