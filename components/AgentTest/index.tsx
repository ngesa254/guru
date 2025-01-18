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



"use client";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Each newly created card will have these properties
interface AgentCard {
  id: number; // unique ID
  name: string;
  description: string;
  selected: boolean; // track which card is selected
}

// Define a ref so LabPage can call "addAgentCard"
export interface AgentTestRef {
  addAgentCard: (info: { name: string; description: string }) => void;
}

const AgentTest = forwardRef<AgentTestRef>((props, ref) => {
  // 1) No default items—begin empty
  const [agents, setAgents] = useState<AgentCard[]>([]);

  // 2) Expose a function to add a new card
  useImperativeHandle(ref, () => ({
    addAgentCard(info: { name: string; description: string }) {
      const newCard: AgentCard = {
        id: Date.now(), // or any other unique ID generator
        name: info.name,
        description: info.description,
        selected: false,
      };
      setAgents((prev) => [...prev, newCard]);
    },
  }));

  // 3) Single selection: unselect all except the newly clicked
  const handleSelectCard = (index: number) => {
    setAgents((prev) =>
      prev.map((agent, i) =>
        i === index
          ? { ...agent, selected: true }
          : { ...agent, selected: false }
      )
    );
  };

  // 4) Identify the currently selected card
  const selectedIndex = agents.findIndex((a) => a.selected === true);
  const hasSelected = selectedIndex !== -1;

  // 5) Test the selected agent
  const handleTestAgent = () => {
    if (!hasSelected) return;
    const agent = agents[selectedIndex];
    console.log(`TEST AGENT clicked for: ${agent.name}`);
    // Add logic here...
  };

  // 6) Publish the selected agent
  const handlePublishAgent = () => {
    if (!hasSelected) return;
    const agent = agents[selectedIndex];
    console.log(`PUBLISH agent clicked for: ${agent.name}`);
    // Add logic here...
  };

  // 7) Delete the selected agent
  const handleDeleteAgent = () => {
    if (!hasSelected) return;
    setAgents((prev) => prev.filter((_, i) => i !== selectedIndex));
  };

  return (
    <Card className="bg-white h-full flex flex-col">
      <CardHeader>
        <div>
          <h2 className="text-xl font-semibold">Agent Test</h2>
          <p className="text-gray-600">Test your agents before deployment</p>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        {/* If no agents have been created */}
        {agents.length === 0 && (
          <div className="text-gray-500 mb-4">
            No agents created yet. Please configure an agent on the left.
          </div>
        )}

        {/* Grid of newly created cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent, index) => (
            <div
              key={agent.id}
              onClick={() => handleSelectCard(index)}
              className={`p-4 border rounded-lg bg-white shadow-sm cursor-pointer transition-colors ${
                agent.selected
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <h3 className="font-medium mb-2">{agent.name}</h3>
              <p className="text-sm text-gray-600">{agent.description}</p>
            </div>
          ))}
        </div>

        {/* Optional input to ask a question or provide instructions */}
        <div className="mt-6">
          <Input
            placeholder="Ask questions or provide instructions to test your agent"
            className="w-full"
          />
        </div>

        {/* TEST, PUBLISH, DELETE buttons at bottom */}
        <div className="mt-6 flex items-center justify-end gap-4">
          <Button onClick={handleTestAgent} variant="secondary">
            TEST AGENT
          </Button>
          <Button onClick={handlePublishAgent} variant="default">
            PUBLISH
          </Button>
          <Button onClick={handleDeleteAgent} variant="destructive">
            DELETE
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});

export default AgentTest;
