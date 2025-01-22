// "use client";
// import React from "react";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export default function AgentTest() {
//   // agent capabilities
//   const capabilities = [
//     {
//       title: "Troubleshooting",
//       description: "Perform routine maintenance checks",
//     },
//     {
//       title: "Installation support",
//       description: "Assist by coordinating with contractors",
//     },
//     {
//       title: "Site preparation",
//       description: "Assess the suitability of charging locations",
//     },
//     {
//       title: "Compliance and safety",
//       description: "Comply with local safety regulations",
//     },
//     {
//       title: "Inventory management",
//       description: "Track inventory and connect with suppliers",
//     },
//     {
//       title: "Documentation",
//       description: "Record site visits and customer interactions",
//     },
//   ];

//   const handleCreate = () => {
//     // Implementation for creating the agent
//     console.log("PUBLISH agent clicked");
//   };

//   const handleTestAgent = () => {
//     // Implementation for testing the agent
//     console.log("TEST AGENT clicked");
//   };

//   return (
//     <Card className="bg-white h-full flex flex-col">
//       <CardHeader>
//         <div className="flex items-center gap-4">
//                     <div>
//             <h2 className="text-xl font-semibold">Agent Test</h2>
//             <p className="text-gray-600">
//               Test your agents before deployment
//             </p>
//           </div>
//         </div>
//       </CardHeader>

//       <CardContent className="flex-1 flex flex-col">
//         {/* Capabilities */}
//         <div className="grid grid-cols-3 gap-4">
//           {capabilities.map((cap, index) => (
//             <div key={index} className="p-4 border rounded-lg bg-white shadow-sm">
//               <h3 className="font-medium mb-2">{cap.title}</h3>
//               <p className="text-sm text-gray-600">{cap.description}</p>
//             </div>
//           ))}
//         </div>

//         {/* Optional "Ask a work question" input */}
//         <div className="mt-6">
//           <Input
//             placeholder="Ask questions or provide instructions to tests your agent"
//             className="w-full"
//           />
//         </div>

//         {/* PUBLISH & TEST AGENT buttons at bottom */}
//         <div className="mt-6 flex items-center justify-end gap-4">
//           <Button onClick={handleTestAgent} variant="secondary">
//             TEST AGENT
//           </Button>
//           <Button onClick={handleCreate} variant="default">
//             PUBLISH AGENT
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }


// // WORKING 
// "use client";
// import React, { forwardRef, useImperativeHandle, useState } from "react";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// // Define a ref type so LabPage can call "addAgentCard"
// export interface AgentTestRef {
//   addAgentCard: (info: { name: string; description: string }) => void;
// }

// const AgentTest = forwardRef<AgentTestRef>((props, ref) => {
//   // agent capabilities
//   const [capabilities, setCapabilities] = useState([
//     {
//       title: "Troubleshooting",
//       description: "Perform routine maintenance checks",
//     },
//     {
//       title: "Installation support",
//       description: "Assist by coordinating with contractors",
//     },
//     {
//       title: "Site preparation",
//       description: "Assess the suitability of charging locations",
//     },
//     {
//       title: "Compliance and safety",
//       description: "Comply with local safety regulations",
//     },
//     {
//       title: "Inventory management",
//       description: "Track inventory and connect with suppliers",
//     },
//     {
//       title: "Documentation",
//       description: "Record site visits and customer interactions",
//     },
//   ]);

//   // Expose a function to add a new card (capability)
//   useImperativeHandle(ref, () => ({
//     addAgentCard(info: { name: string; description: string }) {
//       // For demonstration, let's treat it like an additional capability
//       setCapabilities((prev) => [
//         ...prev,
//         {
//           title: info.name,
//           description: info.description,
//         },
//       ]);
//     },
//   }));

//   const handleCreate = () => {
//     console.log("PUBLISH agent clicked");
//     // Additional logic for publishing...
//   };

//   const handleTestAgent = () => {
//     console.log("TEST AGENT clicked");
//     // Additional logic for testing...
//   };

//   return (
//     <Card className="bg-white h-full flex flex-col">
//       <CardHeader>
//         <div className="flex items-center gap-4">
//           <div>
//             <h2 className="text-xl font-semibold">Agent Test</h2>
//             <p className="text-gray-600">Test your agents before deployment</p>
//           </div>
//         </div>
//       </CardHeader>

//       <CardContent className="flex-1 flex flex-col">
//         {/* Capabilities */}
//         <div className="grid grid-cols-3 gap-4">
//           {capabilities.map((cap, index) => (
//             <div key={index} className="p-4 border rounded-lg bg-white shadow-sm">
//               <h3 className="font-medium mb-2">{cap.title}</h3>
//               <p className="text-sm text-gray-600">{cap.description}</p>
//             </div>
//           ))}
//         </div>

//         {/* Optional "Ask a work question" input */}
//         <div className="mt-6">
//           <Input
//             placeholder="Ask questions or provide instructions to tests your agent"
//             className="w-full"
//           />
//         </div>

//         {/* PUBLISH & TEST AGENT buttons at bottom */}
//         <div className="mt-6 flex items-center justify-end gap-4">
//           <Button onClick={handleTestAgent} variant="secondary">
//             TEST AGENT
//           </Button>
//           <Button onClick={handleCreate} variant="default">
//             PUBLISH AGENT
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// });

// export default AgentTest;



// // "use client";
// import React, { forwardRef, useImperativeHandle, useState } from "react";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// // Each newly created card will have these properties
// interface AgentCard {
//   id: number; // unique ID
//   name: string;
//   description: string;
//   selected: boolean; // track which card is selected
// }

// // Define a ref so LabPage can call "addAgentCard"
// export interface AgentTestRef {
//   addAgentCard: (info: { name: string; description: string }) => void;
// }

// const AgentTest = forwardRef<AgentTestRef>((props, ref) => {
//   // 1) No default items—begin empty
//   const [agents, setAgents] = useState<AgentCard[]>([]);

//   // 2) Expose a function to add a new card
//   useImperativeHandle(ref, () => ({
//     addAgentCard(info: { name: string; description: string }) {
//       const newCard: AgentCard = {
//         id: Date.now(), // or any other unique ID generator
//         name: info.name,
//         description: info.description,
//         selected: false,
//       };
//       setAgents((prev) => [...prev, newCard]);
//     },
//   }));

//   // 3) Single selection: unselect all except the newly clicked
//   const handleSelectCard = (index: number) => {
//     setAgents((prev) =>
//       prev.map((agent, i) =>
//         i === index
//           ? { ...agent, selected: true }
//           : { ...agent, selected: false }
//       )
//     );
//   };

//   // 4) Identify the currently selected card
//   const selectedIndex = agents.findIndex((a) => a.selected === true);
//   const hasSelected = selectedIndex !== -1;

//   // 5) Test the selected agent
//   const handleTestAgent = () => {
//     if (!hasSelected) return;
//     const agent = agents[selectedIndex];
//     console.log(`TEST AGENT clicked for: ${agent.name}`);
//     // Add logic here...
//   };

//   // 6) Publish the selected agent
//   const handlePublishAgent = () => {
//     if (!hasSelected) return;
//     const agent = agents[selectedIndex];
//     console.log(`PUBLISH agent clicked for: ${agent.name}`);
//     // Add logic here...
//   };

//   // 7) Delete the selected agent
//   const handleDeleteAgent = () => {
//     if (!hasSelected) return;
//     setAgents((prev) => prev.filter((_, i) => i !== selectedIndex));
//   };

//   return (
//     <Card className="bg-white h-full flex flex-col">
//       <CardHeader>
//         <div>
//           <h2 className="text-xl font-semibold">Agent Test</h2>
//           <p className="text-gray-600">Test your agents before deployment</p>
//         </div>
//       </CardHeader>

//       <CardContent className="flex-1 flex flex-col">
//         {/* If no agents have been created */}
//         {agents.length === 0 && (
//           <div className="text-gray-500 mb-4">
//             No agents created yet. Please configure an agent on the left.
//           </div>
//         )}

//         {/* Grid of newly created cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {agents.map((agent, index) => (
//             <div
//               key={agent.id}
//               onClick={() => handleSelectCard(index)}
//               className={`p-4 border rounded-lg bg-white shadow-sm cursor-pointer transition-colors ${
//                 agent.selected
//                   ? "border-blue-500 bg-blue-50"
//                   : "border-gray-200 hover:border-gray-300"
//               }`}
//             >
//               <h3 className="font-medium mb-2">{agent.name}</h3>
//               <p className="text-sm text-gray-600">{agent.description}</p>
//             </div>
//           ))}
//         </div>

//         {/* Optional input to ask a question or provide instructions */}
//         <div className="mt-6">
//           <Input
//             placeholder="Ask questions or provide instructions to test your agent"
//             className="w-full"
//           />
//         </div>

//         {/* TEST, PUBLISH, DELETE buttons at bottom */}
//         <div className="mt-6 flex items-center justify-end gap-4">
//           <Button onClick={handleTestAgent} variant="secondary">
//             TEST AGENT
//           </Button>
//           <Button onClick={handlePublishAgent} variant="default">
//             PUBLISH
//           </Button>
//           <Button onClick={handleDeleteAgent} variant="destructive">
//             DELETE
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// });

// export default AgentTest;

// // components/AgentTest.tsx
// import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
// import { apiService, AgentResponse } from "../../services/api";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/components/ui/use-toast";

// interface AgentCard extends AgentResponse {
//   selected: boolean;
// }

// export interface AgentTestRef {
//   addAgentCard: (info: { name: string; description: string }) => void;
// }

// const AgentTest = forwardRef<AgentTestRef>((props, ref) => {
//   const [agents, setAgents] = useState<AgentCard[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [queryInput, setQueryInput] = useState("");
//   const [queryResponse, setQueryResponse] = useState<string | null>(null);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const { toast } = useToast();

//   // Fetch agents on component mount
//   useEffect(() => {
//     const fetchAgents = async () => {
//       try {
//         setIsLoading(true);
//         const fetchedAgents = await apiService.getAgents();
//         setAgents(fetchedAgents.map(agent => ({ ...agent, selected: false })));
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Failed to fetch agents');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAgents();
//   }, []);

//   useImperativeHandle(ref, () => ({
//     async addAgentCard(info: { name: string; description: string }) {
//       try {
//         setIsLoading(true);
//         const newAgent = await apiService.createAgent(info);
//         setAgents(prev => [...prev, { ...newAgent, selected: false }]);
//         toast({
//           title: "Success",
//           description: "Agent created successfully",
//         });
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Failed to create agent');
//         toast({
//           title: "Error",
//           description: "Failed to create agent",
//           variant: "destructive",
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     },
//   }));

//   const handleSelectCard = (index: number) => {
//     setAgents(prev =>
//       prev.map((agent, i) => ({
//         ...agent,
//         selected: i === index
//       }))
//     );
//   };

//   const handleQuery = async () => {
//     const selectedAgent = agents.find(a => a.selected);
//     if (!selectedAgent || !queryInput) return;

//     try {
//       setIsLoading(true);
//       const response = await apiService.queryAgent(selectedAgent.id, queryInput);
//       setQueryResponse(response.response);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to query agent');
//       toast({
//         title: "Error",
//         description: "Failed to query agent",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (files && files.length > 0) {
//       setSelectedFile(files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     const selectedAgent = agents.find(a => a.selected);
//     if (!selectedAgent || !selectedFile) return;

//     try {
//       setIsLoading(true);
//       await apiService.uploadDocumentToAgent(selectedAgent.id, selectedFile);
//       toast({
//         title: "Success",
//         description: "Document uploaded successfully",
//       });
//       setSelectedFile(null);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to upload document');
//       toast({
//         title: "Error",
//         description: "Failed to upload document",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDeleteAgent = async () => {
//     const selectedAgent = agents.find(a => a.selected);
//     if (!selectedAgent) return;

//     try {
//       setIsLoading(true);
//       await apiService.deleteAgent(selectedAgent.id);
//       setAgents(prev => prev.filter(agent => agent.id !== selectedAgent.id));
//       toast({
//         title: "Success",
//         description: "Agent deleted successfully",
//       });
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to delete agent');
//       toast({
//         title: "Error",
//         description: "Failed to delete agent",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Card className="bg-white h-full flex flex-col">
//       <CardHeader>
//         <div>
//           <h2 className="text-xl font-semibold">Agent Test</h2>
//           <p className="text-gray-600">Test your agents before deployment</p>
//         </div>
//       </CardHeader>

//       <CardContent className="flex-1 flex flex-col">
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
//             {error}
//             <button
//               className="absolute top-0 bottom-0 right-0 px-4"
//               onClick={() => setError(null)}
//             >
//               ×
//             </button>
//           </div>
//         )}

//         {isLoading && (
//           <div className="text-center py-4">Loading...</div>
//         )}

//         {/* Agent Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//           {agents.map((agent) => (
//             <div
//               key={agent.id}
//               onClick={() => handleSelectCard(agents.indexOf(agent))}
//               className={`p-4 border rounded-lg bg-white shadow-sm cursor-pointer transition-colors ${
//                 agent.selected
//                   ? "border-blue-500 bg-blue-50"
//                   : "border-gray-200 hover:border-gray-300"
//               }`}
//             >
//               <h3 className="font-medium mb-2">{agent.name}</h3>
//               <p className="text-sm text-gray-600">{agent.description}</p>
//             </div>
//           ))}
//         </div>

//         {/* File Upload */}
//         <div className="mb-6">
//           <div className="flex gap-4">
//             <Input
//               type="file"
//               onChange={handleFileChange}
//               className="flex-1"
//             />
//             <Button
//               onClick={handleUpload}
//               disabled={!selectedFile || isLoading}
//               variant="secondary"
//             >
//               Upload Document
//             </Button>
//           </div>
//         </div>

//         {/* Query Input */}
//         <div className="mb-6">
//           <div className="flex gap-4">
//             <Input
//               value={queryInput}
//               onChange={(e) => setQueryInput(e.target.value)}
//               placeholder="Ask a question or provide instructions"
//               className="flex-1"
//             />
//             <Button
//               onClick={handleQuery}
//               disabled={!queryInput || isLoading}
//               variant="secondary"
//             >
//               Query Agent
//             </Button>
//           </div>
//         </div>

//         {/* Query Response */}
//         {queryResponse && (
//           <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//             <h4 className="font-medium mb-2">Response:</h4>
//             <p className="text-sm whitespace-pre-wrap">{queryResponse}</p>
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="mt-auto flex items-center justify-end gap-4">
//           <Button 
//             onClick={handleDeleteAgent} 
//             variant="destructive"
//             disabled={!agents.some(a => a.selected) || isLoading}
//           >
//             Delete Agent
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// });

// "use client";
// import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/components/ui/use-toast";
// import { apiService } from "@/services/api";

// // Types for our agents
// interface AgentCard {
//   id: string;
//   name: string;
//   description: string;
//   selected: boolean;
// }

// export interface AgentTestRef {
//   addAgentCard: (info: { name: string; description: string }) => void;
// }

// const AgentTest = forwardRef<AgentTestRef>((props, ref) => {
//   // State management
//   const [agents, setAgents] = useState<AgentCard[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [queryInput, setQueryInput] = useState("");
//   const [queryResponse, setQueryResponse] = useState<string | null>(null);
//   const { toast } = useToast();

//   // Fetch existing agents when component mounts
//   useEffect(() => {
//     const fetchExistingAgents = async () => {
//       try {
//         setIsLoading(true);
//         const response = await apiService.listAgents();
//         // ...
//         setAgents(agentsWithSelection);
//       } catch (error) {
//         // ...
//       } finally {
//         setIsLoading(false);
//       }
//     };
  
//     fetchExistingAgents();
//   }, []);
//   // Expose addAgentCard method to parent
//   useImperativeHandle(ref, () => ({
//     addAgentCard: async (info: { name: string; description: string }) => {
//       try {
//         setIsLoading(true);
//         const response = await apiService.createAgent(info);
//         const newAgent: AgentCard = {
//           id: response.id,
//           name: info.name,
//           description: info.description,
//           selected: false
//         };
//         setAgents(prev => [...prev, newAgent]);
//         toast({
//           title: "Success",
//           description: "Agent created successfully"
//         });
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to create agent",
//           variant: "destructive"
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   }));

//   // Handle card selection
//   const handleSelectCard = (index: number) => {
//     setAgents(prev =>
//       prev.map((agent, i) => ({
//         ...agent,
//         selected: i === index
//       }))
//     );
//     setQueryResponse(null); // Clear previous response when selecting new agent
//   };

//   // Get selected agent info
//   const selectedIndex = agents.findIndex(a => a.selected === true);
//   const hasSelected = selectedIndex !== -1;

//   // Handle testing agent
//   const handleTestAgent = async () => {
//     if (!hasSelected || !queryInput.trim()) return;

//     const selectedAgent = agents[selectedIndex];
//     try {
//       setIsLoading(true);
//       const response = await apiService.queryAgent(selectedAgent.id, queryInput);
//       setQueryResponse(response.response || response);
//       toast({
//         title: "Success",
//         description: "Agent query successful"
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to test agent",
//         variant: "destructive"
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle publishing agent
//   const handlePublishAgent = async () => {
//     if (!hasSelected) return;
//     const selectedAgent = agents[selectedIndex];
    
//     toast({
//       title: "Info",
//       description: `Publishing agent: ${selectedAgent.name}`
//     });
//     // Add your publish logic here if needed
//   };

//   // Handle deleting agent
//   const handleDeleteAgent = async () => {
//     if (!hasSelected) return;
//     const selectedAgent = agents[selectedIndex];

//     try {
//       setIsLoading(true);
//       await apiService.deleteAgent(selectedAgent.id);
//       setAgents(prev => prev.filter((_, i) => i !== selectedIndex));
//       setQueryResponse(null);
//       toast({
//         title: "Success",
//         description: "Agent deleted successfully"
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to delete agent",
//         variant: "destructive"
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Card className="bg-white h-full flex flex-col">
//       <CardHeader>
//         <div>
//           <h2 className="text-xl font-semibold">Agent Test</h2>
//           <p className="text-gray-600">Test your agents before deployment</p>
//         </div>
//       </CardHeader>

//       <CardContent className="flex-1 flex flex-col">
//         {/* Loading State */}
//         {isLoading && (
//           <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-50">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//           </div>
//         )}

//         {/* Empty State */}
//         {agents.length === 0 && !isLoading && (
//           <div className="text-gray-500 mb-4">
//             No agents created yet. Please configure an agent on the left.
//           </div>
//         )}

//         {/* Agent Cards Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {agents.map((agent, index) => (
//             <div
//               key={agent.id}
//               onClick={() => handleSelectCard(index)}
//               className={`p-4 border rounded-lg bg-white shadow-sm cursor-pointer transition-colors ${
//                 agent.selected
//                   ? "border-blue-500 bg-blue-50"
//                   : "border-gray-200 hover:border-gray-300"
//               }`}
//             >
//               <h3 className="font-medium mb-2">{agent.name}</h3>
//               <p className="text-sm text-gray-600">{agent.description}</p>
//             </div>
//           ))}
//         </div>

//         {/* Query Input */}
//         <div className="mt-6">
//           <Input
//             value={queryInput}
//             onChange={(e) => setQueryInput(e.target.value)}
//             placeholder="Ask questions or provide instructions to test your agent"
//             className="w-full"
//             disabled={!hasSelected || isLoading}
//           />
//         </div>

//         {/* Query Response */}
//         {queryResponse && (
//           <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//             <h4 className="font-medium mb-2">Response:</h4>
//             <p className="text-sm whitespace-pre-wrap">{queryResponse}</p>
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="mt-6 flex items-center justify-end gap-4">
//           <Button 
//             onClick={handleTestAgent} 
//             variant="secondary"
//             disabled={!hasSelected || !queryInput.trim() || isLoading}
//           >
//             TEST AGENT
//           </Button>
//           <Button 
//             onClick={handlePublishAgent} 
//             variant="default"
//             disabled={!hasSelected || isLoading}
//           >
//             PUBLISH
//           </Button>
//           <Button 
//             onClick={handleDeleteAgent} 
//             variant="destructive"
//             disabled={!hasSelected || isLoading}
//           >
//             DELETE
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// });

// export default AgentTest;
// "use client";
// import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/components/ui/use-toast";
// import { apiService } from "@/services/api";

// interface AgentCard {
//   id: string;
//   name: string;
//   description: string;
//   selected: boolean;
// }

// export interface AgentTestRef {
//   addAgentCard: (info: { name: string; description: string }) => void;
// }

// const AgentTest = forwardRef<AgentTestRef>((props, ref) => {
//   // State management
//   const [agents, setAgents] = useState<AgentCard[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [queryInput, setQueryInput] = useState("");
//   const [queryResponse, setQueryResponse] = useState<string | null>(null);
//   const { toast } = useToast();

//   // Fetch existing agents when component mounts
//   useEffect(() => {
//     const fetchExistingAgents = async () => {
//       try {
//         setIsLoading(true);

//         const response = await apiService.listAgents(); 
//         // Suppose each agent from the API has:
//         // {
//         //   id: number,
//         //   name: string,
//         //   type: string,
//         //   configuration: { description?: string, [key: string]: any },
//         //   ...
//         // }
//         const agentsWithSelection = response.map(agent => ({
//           id: String(agent.id),
//           name: agent.name || "Unnamed Agent",
//           // If description is stored in `configuration`
//           description: agent.configuration?.description || "",
//           selected: false
//         }));

//         setAgents(agentsWithSelection);
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to fetch existing agents",
//           variant: "destructive"
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     };
  
//     fetchExistingAgents();
//   }, [toast]);

//   // Expose addAgentCard method to parent
//   useImperativeHandle(ref, () => ({
//     addAgentCard: async (info: { name: string; description: string }) => {
//       try {
//         setIsLoading(true);

//         // Add valid type, or make it an argument if you want more control
//         const response = await apiService.createAgent({
//           name: info.name,
//           type: "conversational", 
//           configuration: {
//             description: info.description,
//           },
//         });

//         // For local UI
//         const newAgent: AgentCard = {
//           id: String(response.id),
//           name: response.name,
//           description: response.configuration?.description || "",
//           selected: false,
//         };
//         setAgents(prev => [...prev, newAgent]);

//         toast({
//           title: "Success",
//           description: "Agent created successfully"
//         });
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to create agent",
//           variant: "destructive"
//         });
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   }));

//   // Handle card selection
//   const handleSelectCard = (index: number) => {
//     setAgents(prev =>
//       prev.map((agent, i) => ({
//         ...agent,
//         selected: i === index
//       }))
//     );
//     setQueryResponse(null);
//   };

//   // Check if there's a selected agent
//   const selectedIndex = agents.findIndex(a => a.selected === true);
//   const hasSelected = selectedIndex !== -1;

//   // Handle testing agent
//   const handleTestAgent = async () => {
//     if (!hasSelected || !queryInput.trim()) return;
//     const selectedAgent = agents[selectedIndex];

//     try {
//       setIsLoading(true);
//       const response = await apiService.queryAgent(
//         Number(selectedAgent.id),
//         queryInput
//       );
//       setQueryResponse(response.response || response);
//       toast({
//         title: "Success",
//         description: "Agent query successful"
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to test agent",
//         variant: "destructive"
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle publishing agent
//   const handlePublishAgent = async () => {
//     if (!hasSelected) return;
//     const selectedAgent = agents[selectedIndex];
    
//     toast({
//       title: "Info",
//       description: `Publishing agent: ${selectedAgent.name}`
//     });
//     // Add your publish logic here if needed
//   };

//   // Handle deleting agent
//   const handleDeleteAgent = async () => {
//     if (!hasSelected) return;
//     const selectedAgent = agents[selectedIndex];

//     try {
//       setIsLoading(true);
//       await apiService.deleteAgent(Number(selectedAgent.id));
//       setAgents(prev => prev.filter((_, i) => i !== selectedIndex));
//       setQueryResponse(null);
//       toast({
//         title: "Success",
//         description: "Agent deleted successfully"
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to delete agent",
//         variant: "destructive"
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Card className="bg-white h-full flex flex-col relative">
//       <CardHeader>
//         <div>
//           <h2 className="text-xl font-semibold">Agent Test</h2>
//           <p className="text-gray-600">Test your agents before deployment</p>
//         </div>
//       </CardHeader>

//       <CardContent className="flex-1 flex flex-col">
//         {/* Loading Overlay */}
//         {isLoading && (
//           <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
//           </div>
//         )}

//         {/* Empty State */}
//         {agents.length === 0 && !isLoading && (
//           <div className="text-gray-500 mb-4">
//             No agents created yet. Please configure an agent on the left.
//           </div>
//         )}

//         {/* Agent Cards Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {agents.map((agent, index) => (
//             <div
//               key={agent.id}
//               onClick={() => handleSelectCard(index)}
//               className={`p-4 border rounded-lg bg-white shadow-sm cursor-pointer transition-colors ${
//                 agent.selected
//                   ? "border-blue-500 bg-blue-50"
//                   : "border-gray-200 hover:border-gray-300"
//               }`}
//             >
//               <h3 className="font-medium mb-2">{agent.name}</h3>
//               <p className="text-sm text-gray-600">{agent.description}</p>
//             </div>
//           ))}
//         </div>

//         {/* Query Input */}
//         <div className="mt-6">
//           <Input
//             value={queryInput}
//             onChange={(e) => setQueryInput(e.target.value)}
//             placeholder="Ask questions or provide instructions to test your agent"
//             className="w-full"
//             disabled={!hasSelected || isLoading}
//           />
//         </div>

//         {/* Query Response */}
//         {queryResponse && (
//           <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//             <h4 className="font-medium mb-2">Response:</h4>
//             <p className="text-sm whitespace-pre-wrap">{queryResponse}</p>
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="mt-6 flex items-center justify-end gap-4">
//           <Button 
//             onClick={handleTestAgent} 
//             variant="secondary"
//             disabled={!hasSelected || !queryInput.trim() || isLoading}
//           >
//             TEST AGENT
//           </Button>
//           <Button 
//             onClick={handlePublishAgent} 
//             variant="default"
//             disabled={!hasSelected || isLoading}
//           >
//             PUBLISH
//           </Button>
//           <Button 
//             onClick={handleDeleteAgent} 
//             variant="destructive"
//             disabled={!hasSelected || isLoading}
//           >
//             DELETE
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// });

// export default AgentTest;
// 'use client';

// import React, { forwardRef, useImperativeHandle, useState } from 'react';
// import { Card, CardHeader, CardContent } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { apiService, Agent } from '@/services/api';
// import { AlertCircle } from 'lucide-react';
// import { Alert, AlertDescription } from '@/components/ui/alert';

// // Interface for agent cards in the test panel
// interface AgentCard {
//   id: number;
//   name: string;
//   description: string;
//   selected: boolean;
// }

// // Define the ref interface for parent component access
// export interface AgentTestRef {
//   addAgentCard: (info: { name: string; description: string }) => void;
// }

// const AgentTest = forwardRef<AgentTestRef>((props, ref) => {
//   // State
//   const [agents, setAgents] = useState<AgentCard[]>([]);
//   const [testInput, setTestInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [testResponse, setTestResponse] = useState<string | null>(null);

//   // Expose addAgentCard method to parent
//   useImperativeHandle(ref, () => ({
//     addAgentCard(info: { name: string; description: string }) {
//       const newCard: AgentCard = {
//         id: Date.now(), // Temporary ID until we get the real one from API
//         name: info.name,
//         description: info.description,
//         selected: false,
//       };
//       setAgents(prev => [...prev, newCard]);
//     },
//   }));

//   // Card selection handler
//   const handleSelectCard = (index: number) => {
//     setAgents(prev =>
//       prev.map((agent, i) => ({
//         ...agent,
//         selected: i === index,
//       }))
//     );
//     setTestResponse(null); // Clear previous test response
//   };

//   // Get the currently selected agent
//   const selectedAgent = agents.find(a => a.selected);

//   // Test the selected agent
//   const handleTestAgent = async () => {
//     if (!selectedAgent || !testInput.trim()) return;

//     try {
//       setIsLoading(true);
//       setError(null);

//       const response = await apiService.queryAgent(selectedAgent.id, testInput);
//       setTestResponse(response.response);
//       setTestInput(''); // Clear input after successful test

//     } catch (err) {
//       console.error('Error testing agent:', err);
//       setError('Failed to test agent. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Delete the selected agent
//   const handleDeleteAgent = async () => {
//     if (!selectedAgent) return;

//     try {
//       setIsLoading(true);
//       setError(null);

//       await apiService.deleteAgent(selectedAgent.id);
//       setAgents(prev => prev.filter(a => a.id !== selectedAgent.id));
//       setTestResponse(null);

//     } catch (err) {
//       console.error('Error deleting agent:', err);
//       setError('Failed to delete agent. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Card className="bg-white h-full flex flex-col">
//       <CardHeader>
//         <div>
//           <h2 className="text-xl font-semibold">Agent Test</h2>
//           <p className="text-gray-600">Test your agents before deployment</p>
//         </div>
//       </CardHeader>

//       <CardContent className="flex-1 flex flex-col">
//         {/* Error Alert */}
//         {error && (
//           <Alert variant="destructive" className="mb-4">
//             <AlertCircle className="h-4 w-4" />
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         )}

//         {/* No Agents Message */}
//         {agents.length === 0 && (
//           <div className="text-gray-500 mb-4">
//             No agents created yet. Please configure an agent on the left.
//           </div>
//         )}

//         {/* Agent Cards Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//           {agents.map((agent, index) => (
//             <div
//               key={agent.id}
//               onClick={() => handleSelectCard(index)}
//               className={`p-4 border rounded-lg cursor-pointer transition-colors ${
//                 agent.selected
//                   ? 'border-blue-500 bg-blue-50'
//                   : 'border-gray-200 hover:border-gray-300'
//               }`}
//             >
//               <h3 className="font-medium mb-2">{agent.name}</h3>
//               <p className="text-sm text-gray-600">{agent.description}</p>
//             </div>
//           ))}
//         </div>

//         {/* Test Input and Response */}
//         {selectedAgent && (
//           <>
//             <div className="space-y-4 mb-6">
//               <div className="flex gap-2">
//                 <Input
//                   value={testInput}
//                   onChange={(e) => setTestInput(e.target.value)}
//                   placeholder="Ask a question or provide instructions to test your agent"
//                   disabled={isLoading}
//                 />
//                 <Button onClick={handleTestAgent} disabled={!testInput.trim() || isLoading}>
//                   Test
//                 </Button>
//               </div>

//               {testResponse && (
//                 <div className="p-4 bg-gray-50 rounded-lg">
//                   <h4 className="font-medium mb-2">Test Response:</h4>
//                   <p className="text-sm text-gray-600">{testResponse}</p>
//                 </div>
//               )}
//             </div>

//             {/* Action Buttons */}
//             <div className="flex justify-end gap-2 mt-auto">
//               <Button variant="destructive" onClick={handleDeleteAgent} disabled={isLoading}>
//                 Delete Agent
//               </Button>
//             </div>
//           </>
//         )}

//         {/* Loading Overlay */}
//         {isLoading && (
//           <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
//             <div className="text-blue-600">Loading...</div>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// });

// AgentTest.displayName = 'AgentTest';

// export default AgentTest;

// "use client";
// import React, {
//   forwardRef,
//   useImperativeHandle,
//   useState,
//   useEffect
// } from "react";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { apiService } from "@/services/api"; // to listAgents, queryAgent, deleteAgent, etc.

// // Each card in the UI corresponds to an agent in the DB
// interface AgentCard {
//   id: number;
//   name: string;
//   description: string;
//   selected: boolean;
// }

// export interface AgentTestRef {
//   // Called by KazuriChat (parent) to add a brand-new agent to the list
//   addAgentCard: (info: { id: number; name: string; description: string }) => void;
// }

// const AgentTest = forwardRef<AgentTestRef>((props, ref) => {
//   const [agents, setAgents] = useState<AgentCard[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   // We'll store the last test response from an agent here
//   const [testInput, setTestInput] = useState("");
//   const [testResponse, setTestResponse] = useState<string | null>(null);

//   // 1) On mount, fetch existing agents from the DB
//   useEffect(() => {
//     const fetchExistingAgents = async () => {
//       try {
//         setIsLoading(true);
//         const serverAgents = await apiService.listAgents();

//         // Convert them to AgentCard shape
//         const agentCards = serverAgents.map((agent) => ({
//           id: agent.id,
//           name: agent.name,
//           // If your backend puts the "description" in agent.configuration, read that:
//           description: agent.configuration?.description ?? "",
//           selected: false,
//         }));

//         setAgents(agentCards);
//       } catch (error) {
//         console.error("Failed to fetch existing agents:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchExistingAgents();
//   }, []);

//   // 2) Expose a method so parent can add a new card
//   //    after creating an agent in KazuriChat
//   useImperativeHandle(ref, () => ({
//     addAgentCard(info) {
//       const newCard: AgentCard = {
//         id: info.id,
//         name: info.name,
//         description: info.description,
//         selected: false,
//       };
//       setAgents((prev) => [...prev, newCard]);
//     },
//   }));

//   // 3) Handle single-card selection
//   const handleSelectCard = (index: number) => {
//     setAgents((prev) =>
//       prev.map((agent, i) => ({
//         ...agent,
//         selected: i === index,
//       }))
//     );
//     setTestResponse(null); // Clear old response
//   };

//   // 4) Identify the selected card
//   const selectedIndex = agents.findIndex((a) => a.selected === true);
//   const hasSelected = selectedIndex !== -1;

//   // 5) Test the selected agent
//   const handleTestAgent = async () => {
//     if (!hasSelected || !testInput.trim()) return;
//     const agent = agents[selectedIndex];

//     try {
//       setIsLoading(true);
//       // Query the actual backend
//       const response = await apiService.queryAgent(agent.id, testInput);
//       setTestResponse(response.response);
//     } catch (error) {
//       console.error("Failed to test agent:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // 6) Publish (placeholder — add your own logic)
//   const handlePublishAgent = () => {
//     if (!hasSelected) return;
//     const agent = agents[selectedIndex];
//     alert(`Publishing agent: ${agent.name}`);
//   };

//   // 7) Delete the selected agent from DB and local list
//   const handleDeleteAgent = async () => {
//     if (!hasSelected) return;
//     const agent = agents[selectedIndex];

//     try {
//       setIsLoading(true);
//       await apiService.deleteAgent(agent.id);
//       setAgents((prev) => prev.filter((a) => a.id !== agent.id));
//       setTestResponse(null);
//     } catch (error) {
//       console.error("Failed to delete agent:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Card className="bg-white h-full flex flex-col relative">
//       {/* Optional overlay or spinner while loading */}
//       {isLoading && (
//         <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
//         </div>
//       )}

//       <CardHeader>
//         <div>
//           <h2 className="text-xl font-semibold">Agent Test</h2>
//           <p className="text-gray-600">Test your agents before deployment</p>
//         </div>
//       </CardHeader>

//       <CardContent className="flex-1 flex flex-col">
//         {/* If no agents yet */}
//         {agents.length === 0 && !isLoading && (
//           <div className="text-gray-500 mb-4">
//             No agents created yet. Please configure an agent on the left.
//           </div>
//         )}

//         {/* Grid of agent cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {agents.map((agent, index) => (
//             <div
//               key={agent.id}
//               onClick={() => handleSelectCard(index)}
//               className={`p-4 border rounded-lg bg-white shadow-sm cursor-pointer transition-colors ${
//                 agent.selected
//                   ? "border-blue-500 bg-blue-50"
//                   : "border-gray-200 hover:border-gray-300"
//               }`}
//             >
//               <h3 className="font-medium mb-2">{agent.name}</h3>
//               <p className="text-sm text-gray-600">{agent.description}</p>
//             </div>
//           ))}
//         </div>

//         {/* Input to test the agent */}
//         {hasSelected && (
//           <div className="mt-4">
//             <label className="block mb-2 text-sm font-medium">Message to Agent:</label>
//             <Input
//               value={testInput}
//               onChange={(e) => setTestInput(e.target.value)}
//               placeholder="Ask questions or test the agent's knowledge"
//               className="w-full"
//             />
//           </div>
//         )}

//         {/* Display the agent's response if available */}
//         {testResponse && (
//           <div className="mt-4 bg-gray-100 p-2 rounded">
//             <p className="font-semibold">Agent says:</p>
//             <pre className="whitespace-pre-wrap text-sm">{testResponse}</pre>
//           </div>
//         )}

//         {/* Action buttons */}
//         <div className="mt-6 flex items-center justify-end gap-4">
//           <Button
//             onClick={handleTestAgent}
//             variant="secondary"
//             disabled={!hasSelected || !testInput.trim() || isLoading}
//           >
//             TEST AGENT
//           </Button>
//           <Button
//             onClick={handlePublishAgent}
//             variant="default"
//             disabled={!hasSelected || isLoading}
//           >
//             PUBLISH
//           </Button>
//           <Button
//             onClick={handleDeleteAgent}
//             variant="destructive"
//             disabled={!hasSelected || isLoading}
//           >
//             DELETE
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// });

// export default AgentTest;

// "use client";
// import React, {
//   forwardRef,
//   useImperativeHandle,
//   useState,
//   useEffect,
// } from "react";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { apiService, Agent } from "@/services/api";

// /**
//  * We'll store the agent's info in a local "AgentCard" shape:
//  *  - 'id' matches the real DB ID
//  *  - 'name' is the agent's name
//  *  - 'description' from agent.configuration?.description
//  *  - 'selected' whether this card is currently active
//  */
// interface AgentCard {
//   id: number;
//   name: string;
//   description: string;
//   selected: boolean;
// }

// /**
//  * This ref interface lets the parent (LabPage) call
//  *   agentTestRef.current?.addAgentCard(...)
//  * after creating an agent in KazuriChat
//  */
// export interface AgentTestRef {
//   addAgentCard: (info: { id: number; name: string; description: string }) => void;
// }

// const AgentTest = forwardRef<AgentTestRef>((props, ref) => {
//   // Local state
//   const [agents, setAgents] = useState<AgentCard[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   // We'll let the user type a custom message to test the selected agent
//   const [testInput, setTestInput] = useState("");
//   const [testResponse, setTestResponse] = useState<string | null>(null);

//   // ───────────────────────────────────────────────────────────────────────────────
//   // 1. Fetch existing agents from the DB on mount
//   // ───────────────────────────────────────────────────────────────────────────────
//   useEffect(() => {
//     const fetchExistingAgents = async () => {
//       try {
//         setIsLoading(true);
//         const dbAgents = await apiService.listAgents();
//         // Convert them into "AgentCard" objects for local display
//         const agentCards = dbAgents.map((a: Agent) => ({
//           id: a.id,
//           name: a.name,
//           // If the description is stored in `configuration.description`
//           description: a.configuration?.description ?? "",
//           selected: false,
//         }));
//         setAgents(agentCards);
//       } catch (error) {
//         console.error("Failed to fetch existing agents:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchExistingAgents();
//   }, []);

//   // ───────────────────────────────────────────────────────────────────────────────
//   // 2. Expose a method to add a new agent card (from KazuriChat)
//   // ───────────────────────────────────────────────────────────────────────────────
//   useImperativeHandle(ref, () => ({
//     addAgentCard(info) {
//       const newCard: AgentCard = {
//         id: info.id,
//         name: info.name,
//         description: info.description,
//         selected: false,
//       };
//       setAgents((prev) => [...prev, newCard]);
//     },
//   }));

//   // ───────────────────────────────────────────────────────────────────────────────
//   // 3. Card selection logic (single select)
//   // ───────────────────────────────────────────────────────────────────────────────
//   const handleSelectCard = (index: number) => {
//     setAgents((prev) =>
//       prev.map((agent, i) => ({
//         ...agent,
//         selected: i === index,
//       }))
//     );
//     // Clear previous test response when switching selection
//     setTestResponse(null);
//   };

//   // Identify the currently selected agent (if any)
//   const selectedIndex = agents.findIndex((a) => a.selected);
//   const hasSelected = selectedIndex !== -1;

//   // ───────────────────────────────────────────────────────────────────────────────
//   // 4. Test the selected agent by calling backend (queryAgent)
//   // ───────────────────────────────────────────────────────────────────────────────
//   const handleTestAgent = async () => {
//     if (!hasSelected || !testInput.trim()) return;
//     const agent = agents[selectedIndex];

//     try {
//       setIsLoading(true);
//       const response = await apiService.queryAgent(agent.id, testInput);
//       setTestResponse(response.response);
//     } catch (error) {
//       console.error("Failed to test agent:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ───────────────────────────────────────────────────────────────────────────────
//   // 5. Publish (placeholder — add your own logic)
//   // ───────────────────────────────────────────────────────────────────────────────
//   const handlePublishAgent = async () => {
//     if (!hasSelected) return;
//     const agent = agents[selectedIndex];
//     // Example: just alert for now
//     alert(`Publishing agent: ${agent.name}`);
//   };

//   // ───────────────────────────────────────────────────────────────────────────────
//   // 6. Delete the selected agent from DB and local state
//   // ───────────────────────────────────────────────────────────────────────────────
//   const handleDeleteAgent = async () => {
//     if (!hasSelected) return;
//     const agent = agents[selectedIndex];

//     try {
//       setIsLoading(true);
//       // Actually delete from DB
//       await apiService.deleteAgent(agent.id);
//       // Remove from local array
//       setAgents((prev) => prev.filter((a) => a.id !== agent.id));
//       setTestResponse(null);
//     } catch (error) {
//       console.error("Failed to delete agent:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ───────────────────────────────────────────────────────────────────────────────
//   // RENDER
//   // ───────────────────────────────────────────────────────────────────────────────
//   return (
//     <Card className="bg-white h-full flex flex-col relative">
//       {/* Optional loading overlay */}
//       {isLoading && (
//         <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
//         </div>
//       )}

//       <CardHeader>
//         <div>
//           <h2 className="text-xl font-semibold">Agent Test</h2>
//           <p className="text-gray-600">Test your agents before deployment</p>
//         </div>
//       </CardHeader>

//       <CardContent className="flex-1 flex flex-col">
//         {/* If empty */}
//         {agents.length === 0 && !isLoading && (
//           <div className="text-gray-500 mb-4">
//             No agents created yet. Please configure an agent on the left.
//           </div>
//         )}

//         {/* Grid of agent cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {agents.map((agent, index) => (
//             <div
//               key={agent.id}
//               onClick={() => handleSelectCard(index)}
//               className={`p-4 border rounded-lg bg-white shadow-sm cursor-pointer transition-colors ${
//                 agent.selected
//                   ? "border-blue-500 bg-blue-50"
//                   : "border-gray-200 hover:border-gray-300"
//               }`}
//             >
//               <h3 className="font-medium mb-2">{agent.name}</h3>
//               <p className="text-sm text-gray-600">{agent.description}</p>
//             </div>
//           ))}
//         </div>

//         {/* Testing: input for the user to ask a question */}
//         {hasSelected && (
//           <div className="mt-4">
//             <label className="block mb-2 text-sm font-medium">Test Message:</label>
//             <Input
//               value={testInput}
//               onChange={(e) => setTestInput(e.target.value)}
//               placeholder="Ask a question or provide instructions for the agent"
//               className="w-full"
//               disabled={isLoading}
//             />
//           </div>
//         )}

//         {/* Show the agent's response if available */}
//         {testResponse && (
//           <div className="mt-4 bg-gray-100 p-2 rounded">
//             <p className="font-semibold mb-1">Agent Response:</p>
//             <pre className="text-sm whitespace-pre-wrap">{testResponse}</pre>
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="mt-6 flex items-center justify-end gap-4">
//           <Button
//             onClick={handleTestAgent}
//             variant="secondary"
//             disabled={!hasSelected || !testInput.trim() || isLoading}
//           >
//             TEST AGENT
//           </Button>
//           <Button
//             onClick={handlePublishAgent}
//             variant="default"
//             disabled={!hasSelected || isLoading}
//           >
//             PUBLISH
//           </Button>
//           <Button
//             onClick={handleDeleteAgent}
//             variant="destructive"
//             disabled={!hasSelected || isLoading}
//           >
//             DELETE
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// });

// export default AgentTest;

// AgentTest.tsx ---Best working
// "use client";
// import React, {
//   forwardRef,
//   useImperativeHandle,
//   useState,
//   useEffect,
// } from "react";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { apiService, Agent } from "@/services/api";

// /**
//  * We'll store the agent's info in local "AgentCard" objects:
//  *  - 'id' matches the DB ID
//  *  - 'name' is the agent's name
//  *  - 'description' from agent.configuration?.description
//  *  - 'selected' indicates if that card is currently active
//  */
// interface AgentCard {
//   id: number;
//   name: string;
//   description: string;
//   selected: boolean;
// }

// /**
//  * This ref interface lets the parent (LabPage or similar) call:
//  *   agentTestRef.current?.addAgentCard(...)
//  * after creating an agent in KazuriChat or elsewhere.
//  */
// export interface AgentTestRef {
//   addAgentCard: (info: { id: number; name: string; description: string }) => void;
// }

// /**
//  * Message interface for multi-turn chat:
//  * role: "user" or "assistant"
//  * content: text content
//  */
// interface Message {
//   role: "user" | "assistant";
//   content: string;
// }

// const AgentTest = forwardRef<AgentTestRef>((props, ref) => {
//   // ─────────────────────────────────────────────────────────────────────────────
//   // 1) AGENTS LIST & LOADING STATES
//   // ─────────────────────────────────────────────────────────────────────────────
//   const [agents, setAgents] = useState<AgentCard[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   // ─────────────────────────────────────────────────────────────────────────────
//   // 2) MULTI-TURN CHAT STATES
//   // ─────────────────────────────────────────────────────────────────────────────
//   // messages: array of user or assistant messages
//   const [messages, setMessages] = useState<Message[]>([]);
//   // chatInput: current user input
//   const [chatInput, setChatInput] = useState("");

//   // ─────────────────────────────────────────────────────────────────────────────
//   // 3) FETCH EXISTING AGENTS ON MOUNT
//   // ─────────────────────────────────────────────────────────────────────────────
//   useEffect(() => {
//     const fetchExistingAgents = async () => {
//       try {
//         setIsLoading(true);
//         const dbAgents = await apiService.listAgents(); // e.g. from your backend
//         // Convert them into "AgentCard" objects
//         const agentCards = dbAgents.map((a: Agent) => ({
//           id: a.id,
//           name: a.name,
//           description: a.configuration?.description ?? "",
//           selected: false,
//         }));
//         setAgents(agentCards);
//       } catch (error) {
//         console.error("Failed to fetch existing agents:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchExistingAgents();
//   }, []);

//   // ─────────────────────────────────────────────────────────────────────────────
//   // 4) EXPOSE A METHOD TO ADD A NEW AGENT (FROM PARENT)
//   // ─────────────────────────────────────────────────────────────────────────────
//   useImperativeHandle(ref, () => ({
//     addAgentCard(info) {
//       // Info includes { id, name, description }
//       const newCard: AgentCard = {
//         id: info.id,
//         name: info.name,
//         description: info.description,
//         selected: false,
//       };
//       setAgents((prev) => [...prev, newCard]);
//     },
//   }));

//   // ─────────────────────────────────────────────────────────────────────────────
//   // 5) HANDLE SELECTING AN AGENT FROM THE GRID
//   // ─────────────────────────────────────────────────────────────────────────────
//   const handleSelectCard = (index: number) => {
//     setAgents((prev) =>
//       prev.map((agent, i) => ({
//         ...agent,
//         selected: i === index, // only index is selected
//       }))
//     );
//     // Clear prior chat when switching agents
//     setMessages([]);
//   };

//   // Identify selected agent
//   const selectedIndex = agents.findIndex((a) => a.selected);
//   const hasSelected = selectedIndex !== -1;

//   // ─────────────────────────────────────────────────────────────────────────────
//   // 6) MULTI-TURN CHAT: handleSendChatMessage
//   // ─────────────────────────────────────────────────────────────────────────────
//   const handleSendChatMessage = async () => {
//     if (!hasSelected || !chatInput.trim()) return;
//     const agent = agents[selectedIndex];
//     const userText = chatInput.trim();

//     // Add user message locally
//     setMessages((prev) => [...prev, { role: "user", content: userText }]);
//     setChatInput("");

//     try {
//         setIsLoading(true);
//         // Call the API
//         const response = await apiService.queryAgent(agent.id, userText);
//         console.log('Agent response:', response); // Debug log

//         // Add agent response
//         setMessages((prev) => [
//             ...prev,
//             { role: "assistant", content: response.response }
//         ]);
//     } catch (error) {
//         console.error("Failed to query agent:", error);
//         setMessages((prev) => [
//             ...prev,
//             {
//                 role: "assistant",
//                 content: "Sorry, something went wrong. Please try again.",
//             },
//         ]);
//     } finally {
//         setIsLoading(false);
//     }
//   };
//   // ─────────────────────────────────────────────────────────────────────────────
//   // 7) PUBLISH & DELETE
//   // ─────────────────────────────────────────────────────────────────────────────
//   const handlePublishAgent = async () => {
//     if (!hasSelected) return;
//     const agent = agents[selectedIndex];
//     alert(`Publishing agent: ${agent.name} (Add your real logic here)`);
//   };

//   const handleDeleteAgent = async () => {
//     if (!hasSelected) return;
//     const agent = agents[selectedIndex];

//     try {
//       setIsLoading(true);
//       await apiService.deleteAgent(agent.id); // Remove from DB
//       setAgents((prev) => prev.filter((a) => a.id !== agent.id));
//       setMessages([]);
//     } catch (error) {
//       console.error("Failed to delete agent:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ─────────────────────────────────────────────────────────────────────────────
//   // 8) RENDER UI
//   // ─────────────────────────────────────────────────────────────────────────────
//   return (
//     <Card className="bg-white h-full flex flex-col relative">
//       {/* Loading Overlay */}
//       {isLoading && (
//         <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-50">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
//         </div>
//       )}

//       <CardHeader>
//         <div>
//           <h2 className="text-xl font-semibold">Agent Hub</h2>
//           <p className="text-gray-600">Test your agents with multi-turn chat</p>
//         </div>
//       </CardHeader>

//       <CardContent className="flex-1 flex flex-col">
//         {/* If no agents exist */}
//         {agents.length === 0 && !isLoading && (
//           <div className="text-gray-500 mb-4">
//             No agents created yet. Please configure an agent first.
//           </div>
//         )}

//         {/* Agents Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {agents.map((agent, index) => (
//             <div
//               key={agent.id}
//               onClick={() => handleSelectCard(index)}
//               className={`p-4 border rounded-lg bg-white shadow-sm cursor-pointer transition-colors ${
//                 agent.selected
//                   ? "border-blue-500 bg-blue-50"
//                   : "border-gray-200 hover:border-gray-300"
//               }`}
//             >
//               <h3 className="font-medium mb-2">{agent.name}</h3>
//               <p className="text-sm text-gray-600">{agent.description}</p>
//             </div>
//           ))}
//         </div>

//         {/* Multi-turn chat area, only visible if agent is selected */}
//         {hasSelected && (
//           <div className="mt-4 flex flex-col h-72 border rounded p-3">
//             {/* Chat messages */}
//             <div className="flex-1 overflow-y-auto mb-2">
//               {messages.map((msg, i) => {
//                 const isUser = msg.role === "user";
//                 return (
//                   <div
//                     key={i}
//                     className={`mb-2 p-2 rounded ${
//                       isUser ? "bg-green-100 self-end" : "bg-gray-100"
//                     }`}
//                   >
//                     <p className="font-bold text-sm mb-1">
//                       {isUser ? "You" : "Agent"}
//                     </p>
//                     <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Chat Input */}
//             <div className="flex items-center gap-2">
//               <Input
//                 className="flex-1"
//                 value={chatInput}
//                 onChange={(e) => setChatInput(e.target.value)}
//                 placeholder="Type your message..."
//                 disabled={isLoading}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" && !e.shiftKey) {
//                     e.preventDefault();
//                     handleSendChatMessage();
//                   }
//                 }}
//               />
//               <Button
//                 onClick={handleSendChatMessage}
//                 disabled={isLoading || !chatInput.trim()}
//               >
//                 Send
//               </Button>
//             </div>
//           </div>
//         )}

//         {/* Publish / Delete Buttons */}
//         <div className="mt-6 flex items-center justify-end gap-4">
//           <Button
//             onClick={handlePublishAgent}
//             variant="default"
//             disabled={!hasSelected || isLoading}
//           >
//             PUBLISH
//           </Button>
//           <Button
//             onClick={handleDeleteAgent}
//             variant="destructive"
//             disabled={!hasSelected || isLoading}
//           >
//             DELETE
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// });

// export default AgentTest;
// AgentTest.tsx - Updated UI version - Second best
// "use client";
// import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Bot, User, Send, Loader2 } from 'lucide-react';
// import { apiService, Agent } from "@/services/api";

// // Interfaces
// interface Message {
//   role: "user" | "assistant";
//   content: string;
// }

// interface AgentCard {
//   id: number;
//   name: string;
//   description: string;
//   selected: boolean;
// }

// export interface AgentTestRef {
//   addAgentCard: (info: { id: number; name: string; description: string }) => void;
// }

// // ChatMessage Component
// const ChatMessage = ({ message }: { message: Message }) => {
//   const isUser = message.role === "user";
  
//   return (
//     <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
//       <div className={`flex items-start max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
//         {/* Avatar */}
//         <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center 
//           ${isUser ? 'bg-blue-100 ml-2' : 'bg-gray-100 mr-2'}`}>
//           {isUser ? (
//             <User className="h-5 w-5 text-blue-600" />
//           ) : (
//             <Bot className="h-5 w-5 text-gray-600" />
//           )}
//         </div>
        
//         {/* Message bubble */}
//         <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
//           <div className={`rounded-lg px-4 py-2 max-w-full break-words
//             ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
//             <p className="text-sm whitespace-pre-wrap">{message.content}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // AgentCard Component
// const AgentCardComponent = ({ 
//   agent, 
//   selected, 
//   onClick 
// }: { 
//   agent: AgentCard; 
//   selected: boolean; 
//   onClick: () => void;
// }) => (
//   <div
//     onClick={onClick}
//     className={`p-4 border rounded-lg transition-all duration-200 cursor-pointer
//       ${selected 
//         ? 'border-blue-500 bg-blue-50 shadow-md transform scale-[1.02]' 
//         : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
//       }`}
//   >
//     <h3 className="font-medium mb-2 text-gray-900">{agent.name}</h3>
//     <p className="text-sm text-gray-600 line-clamp-2">{agent.description}</p>
//   </div>
// );

// // Main Component
// const AgentTest = forwardRef<AgentTestRef>((props, ref) => {
//   // State management
//   const [agents, setAgents] = useState<AgentCard[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [chatInput, setChatInput] = useState("");

//   // Identify selected agent
//   const selectedIndex = agents.findIndex((a) => a.selected);
//   const hasSelected = selectedIndex !== -1;

//   // Fetch agents on mount
//   useEffect(() => {
//     const fetchExistingAgents = async () => {
//       try {
//         setIsLoading(true);
//         const dbAgents = await apiService.listAgents();
//         const agentCards = dbAgents.map((a: Agent) => ({
//           id: a.id,
//           name: a.name,
//           description: a.configuration?.description ?? "",
//           selected: false,
//         }));
//         setAgents(agentCards);
//       } catch (error) {
//         console.error("Failed to fetch existing agents:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchExistingAgents();
//   }, []);

//   // Expose addAgentCard method
//   useImperativeHandle(ref, () => ({
//     addAgentCard(info) {
//       const newCard: AgentCard = {
//         id: info.id,
//         name: info.name,
//         description: info.description,
//         selected: false,
//       };
//       setAgents((prev) => [...prev, newCard]);
//     },
//   }));

//   // Handler functions
//   const handleSelectCard = (index: number) => {
//     setAgents((prev) =>
//       prev.map((agent, i) => ({
//         ...agent,
//         selected: i === index,
//       }))
//     );
//     setMessages([]);
//   };

//   const handleSendChatMessage = async () => {
//     if (!hasSelected || !chatInput.trim()) return;
//     const agent = agents[selectedIndex];
//     const userText = chatInput.trim();

//     setMessages((prev) => [...prev, { role: "user", content: userText }]);
//     setChatInput("");

//     try {
//       setIsLoading(true);
//       const response = await apiService.queryAgent(agent.id, userText);
//       setMessages((prev) => [
//         ...prev,
//         { role: "assistant", content: response.response },
//       ]);
//     } catch (error) {
//       console.error("Failed to test agent:", error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: "Sorry, something went wrong. Please try again.",
//         },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDeleteAgent = async () => {
//     if (!hasSelected) return;
//     const agent = agents[selectedIndex];

//     try {
//       setIsLoading(true);
//       await apiService.deleteAgent(agent.id);
//       setAgents((prev) => prev.filter((a) => a.id !== agent.id));
//       setMessages([]);
//     } catch (error) {
//       console.error("Failed to delete agent:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePublishAgent = () => {
//     if (!hasSelected) return;
//     const agent = agents[selectedIndex];
//     alert(`Publishing agent: ${agent.name}`);
//   };

//   return (
//     <Card className="bg-white h-full flex flex-col relative">
//       {/* Loading Overlay */}
//       {isLoading && (
//         <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-50">
//           <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
//         </div>
//       )}

//       <CardHeader>
//         <div className="space-y-1">
//           <h2 className="text-2xl font-bold text-gray-900">Agent Hub</h2>
//           <p className="text-gray-500">Interact with your AI agents through multi-turn chat</p>
//         </div>
//       </CardHeader>

//       <CardContent className="flex-1 flex flex-col space-y-6">
//         {/* Empty state */}
//         {agents.length === 0 && !isLoading && (
//           <div className="text-center py-10 bg-gray-50 rounded-lg">
//             <Bot className="h-12 w-12 mx-auto text-gray-400 mb-3" />
//             <p className="text-gray-500">No agents created yet. Please configure an agent first.</p>
//           </div>
//         )}

//         {/* Agents Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {agents.map((agent, index) => (
//             <AgentCardComponent
//               key={agent.id}
//               agent={agent}
//               selected={agent.selected}
//               onClick={() => handleSelectCard(index)}
//             />
//           ))}
//         </div>

//         {/* Chat Interface */}
//         {hasSelected && (
//           <div className="flex-1 flex flex-col min-h-[400px] border rounded-lg overflow-hidden bg-gray-50">
//             {/* Selected Agent Header */}
//             <div className="bg-white p-4 border-b">
//               <div className="flex items-center space-x-2">
//                 <Bot className="h-5 w-5 text-blue-500" />
//                 <span className="font-medium">{agents[selectedIndex].name}</span>
//               </div>
//             </div>

//             {/* Messages Area */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-4">
//               {messages.map((msg, i) => (
//                 <ChatMessage key={i} message={msg} />
//               ))}
//             </div>

//             {/* Input Area */}
//             <div className="bg-white p-4 border-t">
//               <div className="flex items-center space-x-2">
//                 <Input
//                   className="flex-1"
//                   value={chatInput}
//                   onChange={(e) => setChatInput(e.target.value)}
//                   placeholder="Type your message..."
//                   disabled={isLoading}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter" && !e.shiftKey) {
//                       e.preventDefault();
//                       handleSendChatMessage();
//                     }
//                   }}
//                 />
//                 <Button
//                   onClick={handleSendChatMessage}
//                   disabled={isLoading || !chatInput.trim()}
//                   className="px-4 py-2"
//                 >
//                   <Send className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="flex items-center justify-end space-x-4">
//           <Button
//             onClick={handlePublishAgent}
//             variant="default"
//             disabled={!hasSelected || isLoading}
//             className="px-6"
//           >
//             Publish
//           </Button>
//           <Button
//             onClick={handleDeleteAgent}
//             variant="destructive"
//             disabled={!hasSelected || isLoading}
//             className="px-6"
//           >
//             Delete
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// });

// export default AgentTest;
///////////////////////////////////////////////////////////////////////////////////////////////////////The BEST
"use client";
import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bot, User, Send, X, Minimize } from 'lucide-react';
import { apiService, Agent } from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


// Interfaces
interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AgentCard {
  id: number;
  name: string;
  description: string;
  selected: boolean;
}

export interface AgentTestRef {
  addAgentCard: (info: { id: number; name: string; description: string }) => void;
}

// Typing Indicator for chat loading state
const TypingIndicator = () => (
  <div className="flex space-x-2 p-3 bg-gray-100 rounded-lg w-16 justify-center">
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
  </div>
);

// Chat Message Component
const ChatMessage = ({ message }: { message: Message }) => {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex items-start max-w-[80%] gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center
          ${isUser ? 'bg-blue-100' : 'bg-gray-100'}`}
        >
          {isUser ? (
            <User className="h-4 w-4 text-blue-600" />
          ) : (
            <Bot className="h-4 w-4 text-gray-600" />
          )}
        </div>
        <div className={`rounded-lg px-4 py-2 ${
          isUser ? 'bg-blue-600 text-white' : 'bg-white border shadow-sm'
        }`}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} className="text-sm whitespace-pre-wrap prose prose-sm">{message.content}</ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
};

// Slide-out Chat Panel Component
const ChatPanel = ({
  agent,
  messages,
  isLoading,
  onClose,
  onMinimize,
  onSend,
  inputValue,
  onInputChange
}: {
  agent: AgentCard;
  messages: Message[];
  isLoading: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onSend: () => void;
  inputValue: string;
  onInputChange: (value: string) => void;
}) => (
  <motion.div
    initial={{ x: "100%" }}
    animate={{ x: 0 }}
    exit={{ x: "100%" }}
    transition={{ type: "spring", damping: 25 }}
    className="fixed right-0 top-0 h-screen w-96 bg-white shadow-lg border-l flex flex-col z-50"
  >
    {/* Chat Header */}
    <div className="px-4 py-3 border-b flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Bot className="h-5 w-5 text-blue-600" />
        <h3 className="font-medium">{agent.name}</h3>
      </div>
      <div className="flex items-center gap-1">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onMinimize}
          className="h-8 w-8"
        >
          <Minimize className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>

    {/* Chat Messages */}
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      {messages.map((msg, i) => (
        <ChatMessage key={i} message={msg} />
      ))}
      {isLoading && <TypingIndicator />}
    </div>

    {/* Chat Input */}
    <div className="p-4 border-t bg-white">
      <div className="flex items-center gap-2">
        <Input
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
        />
        <Button 
          onClick={onSend} 
          disabled={isLoading || !inputValue.trim()}
          size="icon"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </motion.div>
);

// Main Component
const AgentTest = forwardRef<AgentTestRef>((props, ref) => {
  // State
  const [agents, setAgents] = useState<AgentCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [activeChatAgent, setActiveChatAgent] = useState<AgentCard | null>(null);
  const [isChatMinimized, setIsChatMinimized] = useState(false);

  // Fetch agents on mount
  useEffect(() => {
    const fetchExistingAgents = async () => {
      try {
        setIsLoading(true);
        const dbAgents = await apiService.listAgents();
        const agentCards = dbAgents.map((a: Agent) => ({
          id: a.id,
          name: a.name,
          description: a.configuration?.description ?? "",
          selected: false,
        }));
        setAgents(agentCards);
      } catch (error) {
        console.error("Failed to fetch existing agents:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExistingAgents();
  }, []);

  // Add agent method for parent
  useImperativeHandle(ref, () => ({
    addAgentCard(info) {
      const newCard: AgentCard = {
        id: info.id,
        name: info.name,
        description: info.description,
        selected: false,
      };
      setAgents((prev) => [...prev, newCard]);
    },
  }));

  // Handle selecting an agent card
  const handleSelectCard = (index: number) => {
    setAgents((prev) =>
      prev.map((agent, i) => ({
        ...agent,
        selected: i === index,
      }))
    );
  };

  // Handle opening chat for an agent
  const handleOpenChat = (agent: AgentCard) => {
    setActiveChatAgent(agent);
    setIsChatMinimized(false);
    setMessages([]); // Clear messages for new chat
  };

  // Handle closing chat
  const handleCloseChat = () => {
    setActiveChatAgent(null);
    setMessages([]);
    setChatInput("");
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!activeChatAgent || !chatInput.trim()) return;

    const userText = chatInput.trim();
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setChatInput("");

    try {
      setIsLoading(true);
      const response = await apiService.queryAgent(activeChatAgent.id, userText);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.response },
      ]);
    } catch (error) {
      console.error("Failed to get response:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Get selected agent index
  const selectedIndex = agents.findIndex((a) => a.selected);
  const hasSelected = selectedIndex !== -1;

  // Delete agent handler
  const handleDeleteAgent = async () => {
    if (!hasSelected) return;
    const agent = agents[selectedIndex];

    try {
      setIsLoading(true);
      await apiService.deleteAgent(agent.id);
      setAgents((prev) => prev.filter((a) => a.id !== agent.id));
      if (activeChatAgent?.id === agent.id) {
        handleCloseChat();
      }
    } catch (error) {
      console.error("Failed to delete agent:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Publish agent handler (placeholder)
  const handlePublishAgent = () => {
    if (!hasSelected) return;
    const agent = agents[selectedIndex];
    alert(`Publishing agent: ${agent.name}`);
  };

  return (
    <Card className="bg-white h-full flex flex-col relative">
      <CardHeader>
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">Agent Hub</h2>
          <p className="text-gray-500">Your AI assistants at your service</p>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-6">
        {/* Empty State */}
        {agents.length === 0 && !isLoading && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Bot className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">No agents created yet. Configure an agent to get started.</p>
          </div>
        )}

        {/* Agents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent, index) => (
            <div
              key={agent.id}
              className={`p-4 border rounded-lg transition-all duration-200
                ${agent.selected 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
            >
              <div 
                className="mb-3 cursor-pointer" 
                onClick={() => handleSelectCard(index)}
              >
                <h3 className="font-medium mb-2">{agent.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{agent.description}</p>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenChat(agent)}
                >
                  Test Agent
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button
            onClick={handlePublishAgent}
            disabled={!hasSelected}
            className="px-6"
          >
            Publish
          </Button>
          <Button
            onClick={handleDeleteAgent}
            variant="destructive"
            disabled={!hasSelected}
            className="px-6"
          >
            Delete
          </Button>
        </div>

        {/* Chat Panel */}
        <AnimatePresence>
          {activeChatAgent && !isChatMinimized && (
            <ChatPanel
              agent={activeChatAgent}
              messages={messages}
              isLoading={isLoading}
              onClose={handleCloseChat}
              onMinimize={() => setIsChatMinimized(true)}
              onSend={handleSendMessage}
              inputValue={chatInput}
              onInputChange={(value) => setChatInput(value)}
            />
          )}
        </AnimatePresence>

        {/* Minimized Chat */}
        {activeChatAgent && isChatMinimized && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border p-3 cursor-pointer"
            onClick={() => setIsChatMinimized(false)}
          >
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-500" />
              <span>{activeChatAgent.name}</span>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
});

export default AgentTest;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// "use client";
// import React, {
//   forwardRef,
//   useImperativeHandle,
//   useState,
//   useEffect,
// } from "react";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Bot, User, Send, X, Minimize } from "lucide-react";
// import { apiService, Agent } from "@/services/api";
// import { motion, AnimatePresence } from "framer-motion";

// // 1) Import for Markdown & Resizing
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { Rnd } from "react-rnd";

// // Interfaces
// interface Message {
//   role: "user" | "assistant";
//   content: string;
// }

// interface AgentCard {
//   id: number;
//   name: string;
//   description: string;
//   selected: boolean;
// }

// export interface AgentTestRef {
//   addAgentCard: (info: { id: number; name: string; description: string }) => void;
// }

// // Typing Indicator for chat loading state
// const TypingIndicator = () => (
//   <div className="flex space-x-2 p-3 bg-gray-100 rounded-lg w-16 justify-center">
//     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
//     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
//     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
//   </div>
// );

// // 2) Chat Message Component with Markdown
// const ChatMessage = ({ message }: { message: Message }) => {
//   const isUser = message.role === "user";
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       className={`flex w-full mb-4 ${isUser ? "justify-end" : "justify-start"}`}
//     >
//       <div
//         className={`flex items-start max-w-[80%] gap-2 ${
//           isUser ? "flex-row-reverse" : "flex-row"
//         }`}
//       >
//         <div
//           className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center
//             ${isUser ? "bg-blue-100" : "bg-gray-100"}`}
//         >
//           {isUser ? (
//             <User className="h-4 w-4 text-blue-600" />
//           ) : (
//             <Bot className="h-4 w-4 text-gray-600" />
//           )}
//         </div>

//         <div
//           className={`rounded-lg px-4 py-2 ${
//             isUser ? "bg-blue-600 text-white" : "bg-white border shadow-sm"
//           }`}
//         >
//           {/* Render Markdown here */}
//           <ReactMarkdown
//             remarkPlugins={[remarkGfm]}
//             className="text-sm whitespace-pre-wrap prose prose-sm"
//           >
//             {message.content}
//           </ReactMarkdown>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // 3) Slide-out Chat Panel Component with Rnd for resizing
// const ChatPanel = ({
//   agent,
//   messages,
//   isLoading,
//   onClose,
//   onMinimize,
//   onSend,
//   inputValue,
//   onInputChange,
// }: {
//   agent: AgentCard;
//   messages: Message[];
//   isLoading: boolean;
//   onClose: () => void;
//   onMinimize: () => void;
//   onSend: () => void;
//   inputValue: string;
//   onInputChange: (value: string) => void;
// }) => (
//   <motion.div
//     initial={{ x: "100%" }}
//     animate={{ x: 0 }}
//     exit={{ x: "100%" }}
//     transition={{ type: "spring", damping: 25 }}
//     // Keep position: fixed, pinned to the right
//     className="fixed right-0 top-0 h-screen z-50"
//   >
//     {/* Rnd to allow horizontal resizing from the left */}
//     <Rnd
//       default={{
//         x: 0,
//         y: 0,
//         width: 384, // Tailwind w-96 = 384px
//         height: "100%",
//       }}
//       minWidth={300}
//       maxWidth={800}
//       enableResizing={{ left: true }}
//       disableDragging
//       bounds="parent"
//       className="bg-white shadow-lg border-l flex flex-col h-full"
//     >
//       {/* The existing chat layout in a div */}
//       <div className="w-full h-full flex flex-col">
//         {/* Chat Header */}
//         <div className="px-4 py-3 border-b flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <Bot className="h-5 w-5 text-blue-600" />
//             <h3 className="font-medium">{agent.name}</h3>
//           </div>
//           <div className="flex items-center gap-1">
//             <Button variant="ghost" size="icon" onClick={onMinimize} className="h-8 w-8">
//               <Minimize className="h-4 w-4" />
//             </Button>
//             <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
//               <X className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>

//         {/* Chat Messages */}
//         <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
//           {messages.map((msg, i) => (
//             <ChatMessage key={i} message={msg} />
//           ))}
//           {isLoading && <TypingIndicator />}
//         </div>

//         {/* Chat Input */}
//         <div className="p-4 border-t bg-white">
//           <div className="flex items-center gap-2">
//             <Input
//               value={inputValue}
//               onChange={(e) => onInputChange(e.target.value)}
//               placeholder="Type your message..."
//               disabled={isLoading}
//               className="flex-1"
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && !e.shiftKey) {
//                   e.preventDefault();
//                   onSend();
//                 }
//               }}
//             />
//             <Button
//               onClick={onSend}
//               disabled={isLoading || !inputValue.trim()}
//               size="icon"
//             >
//               <Send className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </Rnd>
//   </motion.div>
// );

// // 4) Main Component (unchanged except for minor imports)
// const AgentTest = forwardRef<AgentTestRef>((props, ref) => {
//   // State
//   const [agents, setAgents] = useState<AgentCard[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [chatInput, setChatInput] = useState("");
//   const [activeChatAgent, setActiveChatAgent] = useState<AgentCard | null>(null);
//   const [isChatMinimized, setIsChatMinimized] = useState(false);

//   // Fetch agents on mount
//   useEffect(() => {
//     const fetchExistingAgents = async () => {
//       try {
//         setIsLoading(true);
//         const dbAgents = await apiService.listAgents();
//         const agentCards = dbAgents.map((a: Agent) => ({
//           id: a.id,
//           name: a.name,
//           description: a.configuration?.description ?? "",
//           selected: false,
//         }));
//         setAgents(agentCards);
//       } catch (error) {
//         console.error("Failed to fetch existing agents:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchExistingAgents();
//   }, []);

//   // Add agent method for parent
//   useImperativeHandle(ref, () => ({
//     addAgentCard(info) {
//       const newCard: AgentCard = {
//         id: info.id,
//         name: info.name,
//         description: info.description,
//         selected: false,
//       };
//       setAgents((prev) => [...prev, newCard]);
//     },
//   }));

//   // Handle selecting an agent card
//   const handleSelectCard = (index: number) => {
//     setAgents((prev) =>
//       prev.map((agent, i) => ({
//         ...agent,
//         selected: i === index,
//       }))
//     );
//   };

//   // Handle opening chat for an agent
//   const handleOpenChat = (agent: AgentCard) => {
//     setActiveChatAgent(agent);
//     setIsChatMinimized(false);
//     setMessages([]); // Clear messages for new chat
//   };

//   // Handle closing chat
//   const handleCloseChat = () => {
//     setActiveChatAgent(null);
//     setMessages([]);
//     setChatInput("");
//   };

//   // Handle sending a message
//   const handleSendMessage = async () => {
//     if (!activeChatAgent || !chatInput.trim()) return;

//     const userText = chatInput.trim();
//     setMessages((prev) => [...prev, { role: "user", content: userText }]);
//     setChatInput("");

//     try {
//       setIsLoading(true);
//       const response = await apiService.queryAgent(activeChatAgent.id, userText);
//       setMessages((prev) => [
//         ...prev,
//         { role: "assistant", content: response.response },
//       ]);
//     } catch (error) {
//       console.error("Failed to get response:", error);
//       setMessages((prev) => [
//         ...prev,
//         { role: "assistant", content: "Sorry, something went wrong. Please try again." },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Get selected agent index
//   const selectedIndex = agents.findIndex((a) => a.selected);
//   const hasSelected = selectedIndex !== -1;

//   // Delete agent handler
//   const handleDeleteAgent = async () => {
//     if (!hasSelected) return;
//     const agent = agents[selectedIndex];

//     try {
//       setIsLoading(true);
//       await apiService.deleteAgent(agent.id);
//       setAgents((prev) => prev.filter((a) => a.id !== agent.id));
//       if (activeChatAgent?.id === agent.id) {
//         handleCloseChat();
//       }
//     } catch (error) {
//       console.error("Failed to delete agent:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Publish agent handler (placeholder)
//   const handlePublishAgent = () => {
//     if (!hasSelected) return;
//     const agent = agents[selectedIndex];
//     alert(`Publishing agent: ${agent.name}`);
//   };

//   return (
//     <Card className="bg-white h-full flex flex-col relative">
//       <CardHeader>
//         <div className="space-y-1">
//           <h2 className="text-2xl font-bold text-gray-900">Agent Hub</h2>
//           <p className="text-gray-500">Your AI assistants at your service</p>
//         </div>
//       </CardHeader>

//       <CardContent className="flex-1 flex flex-col space-y-6">
//         {/* Empty State */}
//         {agents.length === 0 && !isLoading && (
//           <div className="text-center py-12 bg-gray-50 rounded-lg">
//             <Bot className="h-12 w-12 mx-auto text-gray-400 mb-3" />
//             <p className="text-gray-500">
//               No agents created yet. Configure an agent to get started.
//             </p>
//           </div>
//         )}

//         {/* Agents Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {agents.map((agent, index) => (
//             <div
//               key={agent.id}
//               className={`p-4 border rounded-lg transition-all duration-200
//                 ${
//                   agent.selected
//                     ? "border-blue-500 bg-blue-50 shadow-md"
//                     : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
//                 }`}
//             >
//               <div
//                 className="mb-3 cursor-pointer"
//                 onClick={() => handleSelectCard(index)}
//               >
//                 <h3 className="font-medium mb-2">{agent.name}</h3>
//                 <p className="text-sm text-gray-600 line-clamp-2">
//                   {agent.description}
//                 </p>
//               </div>
//               <div className="flex justify-end">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handleOpenChat(agent)}
//                 >
//                   Test Agent
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end gap-3">
//           <Button
//             onClick={handlePublishAgent}
//             disabled={!hasSelected}
//             className="px-6"
//           >
//             Publish
//           </Button>
//           <Button
//             onClick={handleDeleteAgent}
//             variant="destructive"
//             disabled={!hasSelected}
//             className="px-6"
//           >
//             Delete
//           </Button>
//         </div>

//         {/* Chat Panel */}
//         <AnimatePresence>
//           {activeChatAgent && !isChatMinimized && (
//             <ChatPanel
//               agent={activeChatAgent}
//               messages={messages}
//               isLoading={isLoading}
//               onClose={handleCloseChat}
//               onMinimize={() => setIsChatMinimized(true)}
//               onSend={handleSendMessage}
//               inputValue={chatInput}
//               onInputChange={(value) => setChatInput(value)}
//             />
//           )}
//         </AnimatePresence>

//         {/* Minimized Chat */}
//         {activeChatAgent && isChatMinimized && (
//           <motion.div
//             initial={{ y: "100%" }}
//             animate={{ y: 0 }}
//             exit={{ y: "100%" }}
//             className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border p-3 cursor-pointer"
//             onClick={() => setIsChatMinimized(false)}
//           >
//             <div className="flex items-center gap-2">
//               <Bot className="h-5 w-5 text-blue-500" />
//               <span>{activeChatAgent.name}</span>
//             </div>
//           </motion.div>
//         )}
//       </CardContent>
//     </Card>
//   );
// });

// export default AgentTest;
