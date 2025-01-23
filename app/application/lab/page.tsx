// "use client";
// import React from "react";
// import KazuriChat from "@/components/Chat/kazuriChat";
// import AgentTest from "@/components/AgentTest";

// export default function LabPage() {
//   return (
//     <div className="flex flex-col h-full w-full p-4">
//       {/* Page Title & Description (similar style to BrainPage) */}
//       <h1 className="text-2xl font-bold mb-2">KAZURI Studio</h1>
//       <p className="mb-4 text-gray-600">Create your Own AI Agent with no code</p>

//       {/* Main layout: Chat (left) + AgentTest (right) */}
//       <div className="flex flex-row h-[600px] space-x-4">
//         {/* LEFT: KazuriChat with Describe / Configure tabs */}
//         <div className="flex-1 border rounded p-2 bg-gray-50 overflow-auto">
//           <KazuriChat />
//         </div>

//         {/* RIGHT: Field Service agent card */}
//         <div className="w-1/2 border rounded p-2 bg-white shadow-lg overflow-auto">
//           <AgentTest />
//         </div>
//       </div>
//     </div>
//   );
// }




// "use client";
// import React, { useRef } from "react";
// import KazuriChat from "@/components/Chat/kazuriChat";
// import AgentTest, { AgentTestRef } from "@/components/AgentTest";

// export default function LabPage() {
//   // 1) Create a ref to call methods on AgentTest
//   const agentTestRef = useRef<AgentTestRef>(null);

//   // 2) Handler that receives the `basicInfo` from KazuriChat
//   const handleConfigureAgent = (basicInfo: { name: string; description: string }) => {
//     // Forward the data to AgentTest so it creates a new card
//     if (agentTestRef.current) {
//       agentTestRef.current.addAgentCard(basicInfo);
//     }
//   };

//   return (
//     <div className="flex flex-col h-full w-full p-4">
//       {/* Page Title & Description (similar style to BrainPage) */}
//       <h1 className="text-2xl font-bold mb-2">KAZURI Studio</h1>
//       <p className="mb-4 text-gray-600">Create your Own AI Agent with no code</p>

//       {/* Main layout: Chat (left) + AgentTest (right) */}
//       <div className="flex flex-row h-[600px] space-x-4">
//         {/* LEFT: KazuriChat with Describe / Configure tabs */}
//         <div className="flex-1 border rounded p-2 bg-gray-50 overflow-auto">
//           {/* Pass the handler down so KazuriChat can call it */}
//           <KazuriChat onConfigureAgent={handleConfigureAgent} />
//         </div>

//         {/* RIGHT: Field Service agent card */}
//         <div className="w-1/2 border rounded p-2 bg-white shadow-lg overflow-auto">
//           {/* Attach our ref so we can call .addAgentCard(...) inside handleConfigureAgent */}
//           <AgentTest ref={agentTestRef} />
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";
// import React, { useRef } from "react";
// import KazuriChat from "@/components/Chat/kazuriChat";
// import AgentTest, { AgentTestRef } from "@/components/AgentTest";

// export default function LabPage() {
//   // 1) Create a ref to call methods on AgentTest
//   const agentTestRef = useRef<AgentTestRef>(null);

//   // 2) Handler that receives the `basicInfo` from KazuriChat
//   const handleConfigureAgent = (basicInfo: { name: string; description: string }) => {
//     // Forward the data to AgentTest so it creates a new card
//     if (agentTestRef.current) {
//       agentTestRef.current.addAgentCard(basicInfo);
//     }
//   };

//   return (
//     <div className="flex flex-col h-full w-full p-4">
//       {/* Page Title & Description */}
//       <h1 className="text-2xl font-bold mb-2">KAZURI Studio</h1>
//       <p className="mb-4 text-gray-600">Create your Own AI Agent with no code</p>

//       {/* Main layout: Chat (left) + AgentTest (right) */}
//       <div className="flex flex-row h-[600px] space-x-4">
//         {/* LEFT: KazuriChat with Describe / Configure tabs */}
//         <div className="flex-1 border rounded p-2 bg-gray-50 overflow-auto">
//           <KazuriChat onConfigureAgent={handleConfigureAgent} />
//         </div>

//         {/* RIGHT: AgentTest panel */}
//         <div className="w-1/2 border rounded p-2 bg-white shadow-lg overflow-auto">
//           <AgentTest ref={agentTestRef} />
//         </div>
//       </div>
//     </div>
//   );
// }
// "use client";
// import React, { useRef } from "react";
// import KazuriChat from "@/components/Chat/kazuriChat";
// import AgentTest, { AgentTestRef } from "@/components/AgentTest";
// // Import the Agent type from your api.ts interface
// import { Agent } from "@/services/api";

// export default function LabPage() {
//   // 1) Create a ref to call methods on AgentTest
//   const agentTestRef = useRef<AgentTestRef>(null);

//   // 2) Handler that receives the fully created `Agent` object from KazuriChat
//   const handleConfigureAgent = (agent: Agent) => {
//     console.log("Received newly created agent from KazuriChat:", agent);

//     // 3) Forward the new agent to AgentTest so it creates a new card with real DB ID
//     agentTestRef.current?.addAgentCard({
//       id: agent.id,
//       name: agent.name,
//       // If the agent's description is stored in `configuration`
//       description: agent.configuration?.description ?? ""
//     });
//   };

//   return (
//     <div className="flex flex-col h-full w-full p-4">
//       {/* Page Title & Description */}
//       <h1 className="text-2xl font-bold mb-2">Kazuri Studio</h1>
//       <p className="mb-4 text-gray-600">Create your Own AI Agents with no code</p>

//       {/* Main layout: Chat (left) + AgentTest (right) */}
//       <div className="flex flex-row h-[600px] space-x-4">
//         {/* LEFT: KazuriChat with Describe / Configure tabs */}
//         <div className="flex-1 border rounded p-2 bg-gray-50 overflow-auto">
//           {/* Pass our handler so KazuriChat can return the created agent */}
//           <KazuriChat onConfigureAgent={handleConfigureAgent} />
//         </div>

//         {/* RIGHT: AgentTest panel */}
//         <div className="w-1/2 border rounded p-2 bg-white shadow-lg overflow-auto">
//           <AgentTest ref={agentTestRef} />
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useRef, useState, useEffect } from "react";
import KazuriChat from "@/components/Chat/kazuriChat";
import AgentTest, { AgentTestRef } from "@/components/AgentTest";
import { Agent } from "@/services/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function LabPage() {
  const agentTestRef = useRef<AgentTestRef>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfigureAgent = async (agent: Agent) => {
    try {
      setIsLoading(true);
      setError("");
      
      // Log the newly created agent for debugging
      console.log("New agent created:", agent);

      // Add the agent to the AgentTest component
      agentTestRef.current?.addAgentCard({
        id: agent.id,
        name: agent.name,
        description: agent.configuration?.description ?? "",
      });

    } catch (err) {
      console.error("Error configuring agent:", err);
      setError(err instanceof Error ? err.message : "Failed to configure agent");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Kazuri Studio</h1>
          <p className="mt-2 text-gray-600">Create and manage your AI agents with no code</p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel: Agent Creation */}
          <Card className="p-6 bg-white shadow-lg">
            <KazuriChat onConfigureAgent={handleConfigureAgent} />
          </Card>

          {/* Right Panel: Agent Testing */}
          <Card className="p-6 bg-white shadow-lg">
            <AgentTest ref={agentTestRef} />
          </Card>
        </div>
      </div>
    </div>
  );
}