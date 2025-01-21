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
"use client";
import React, { useRef } from "react";
import KazuriChat from "@/components/Chat/kazuriChat";
import AgentTest, { AgentTestRef } from "@/components/AgentTest";
// Import the Agent type from your api.ts interface
import { Agent } from "@/services/api";

export default function LabPage() {
  // 1) Create a ref to call methods on AgentTest
  const agentTestRef = useRef<AgentTestRef>(null);

  // 2) Handler that receives the fully created `Agent` object from KazuriChat
  const handleConfigureAgent = (agent: Agent) => {
    console.log("Received newly created agent from KazuriChat:", agent);

    // 3) Forward the new agent to AgentTest so it creates a new card with real DB ID
    agentTestRef.current?.addAgentCard({
      id: agent.id,
      name: agent.name,
      // If the agent's description is stored in `configuration`
      description: agent.configuration?.description ?? ""
    });
  };

  return (
    <div className="flex flex-col h-full w-full p-4">
      {/* Page Title & Description */}
      <h1 className="text-2xl font-bold mb-2">KAZURI Studio</h1>
      <p className="mb-4 text-gray-600">Create your Own AI Agent with no code</p>

      {/* Main layout: Chat (left) + AgentTest (right) */}
      <div className="flex flex-row h-[600px] space-x-4">
        {/* LEFT: KazuriChat with Describe / Configure tabs */}
        <div className="flex-1 border rounded p-2 bg-gray-50 overflow-auto">
          {/* Pass our handler so KazuriChat can return the created agent */}
          <KazuriChat onConfigureAgent={handleConfigureAgent} />
        </div>

        {/* RIGHT: AgentTest panel */}
        <div className="w-1/2 border rounded p-2 bg-white shadow-lg overflow-auto">
          <AgentTest ref={agentTestRef} />
        </div>
      </div>
    </div>
  );
}
