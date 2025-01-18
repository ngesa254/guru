// "use client";
// import React, { useState } from "react";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// // Icons
// import {
//   RefreshCw,
//   Code,
//   User,
//   HelpCircle,
//   Mail,
//   Slack,
//   Blocks,
//   Diamond,
//   X,
//   FileText,
//   Github,
//   MessageCircle,
//   ChevronRight,
// } from "lucide-react";

// interface BasicInfo {
//   name: string;
//   description: string;
// }

// export default function AgentTest() {
//   // Track which section is open
//   const [activeSection, setActiveSection] = useState<string>("");
//   // Basic info
//   const [basicInfo, setBasicInfo] = useState<BasicInfo>({
//     name: "Engineering Agent",
//     description: "Helps debug code errors and onboard to our systems faster",
//   });

//   // The sections we want to show
//   const sections = [
//     { id: "basic", title: "Basic info" },
//     { id: "knowledge", title: "Knowledge" },
//     { id: "instruction", title: "Instruction" },
//     { id: "actions", title: "Actions" },
//     { id: "triggering", title: "Triggering" },
//     { id: "publish", title: "Publish" },
//   ];

//   // Capabilities for demonstration
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

//   // Renders content for each section
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
//                   setBasicInfo({ ...basicInfo, name: e.target.value })
//                 }
//                 className="flex-1 p-2 border rounded-md"
//                 placeholder="Engineering Agent"
//               />
//             </div>
//             <textarea
//               value={basicInfo.description}
//               onChange={(e) =>
//                 setBasicInfo({ ...basicInfo, description: e.target.value })
//               }
//               className="w-full p-3 border rounded-md min-h-[100px]"
//               placeholder="Helps debug code errors and onboard to our systems faster"
//             />
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

//       case "instruction":
//         return (
//           <div className="bg-gray-50 p-4 rounded-lg">
//             <p className="text-gray-600">
//               Follow the user's requirements carefully &amp; to the letter.
//             </p>
//             <p className="text-gray-600 mt-2">
//               When asked to write code, follow these instructions:
//             </p>
//             <p className="text-gray-600 mt-1">
//               1. Directly write code and skip any guidance.
//             </p>
//           </div>
//         );

//       case "actions":
//         return (
//           <div className="flex items-center gap-6 justify-center py-4">
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
//                 <Code className="w-4 h-4 text-orange-600" />
//               </div>
//               <span className="text-sm">Code Search</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
//                 <User className="w-4 h-4 text-blue-600" />
//               </div>
//               <span className="text-sm">Expert Search</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
//                 <HelpCircle className="w-4 h-4 text-blue-600" />
//               </div>
//               <span className="text-sm">Create Jira</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
//                 <Mail className="w-4 h-4 text-red-600" />
//               </div>
//               <span className="text-sm">Create email</span>
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
//                 Configure App
//               </button>
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="w-full h-full flex flex-col">
//       {/* This area shows collapsible sections for agent configuration */}
//       <div className="space-y-4 mb-6">
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

//       {/* Agent "Preview" card (including capabilities) */}
//       <Card className="bg-white flex-1">
//         <CardHeader>
//           <div className="flex items-center gap-4">
//             <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//               <RefreshCw className="w-6 h-6 text-blue-600" />
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold">Field Service agent</h2>
//               <p className="text-gray-600">
//                 Troubleshooting information for on-site visits
//               </p>
//             </div>
//           </div>
//         </CardHeader>

//         <CardContent>
//           <div className="grid grid-cols-3 gap-4">
//             {capabilities.map((capability, index) => (
//               <div
//                 key={index}
//                 className="p-4 border rounded-lg bg-white shadow-sm"
//               >
//                 <h3 className="font-medium mb-2">{capability.title}</h3>
//                 <p className="text-sm text-gray-600">{capability.description}</p>
//               </div>
//             ))}
//           </div>

//           <div className="mt-6">
//             <Input
//               placeholder="Ask a work question or use / to reference people, files and more"
//               className="w-full"
//             />
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


// "use client";
// import React from "react";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";

// // Icons
// import { RefreshCw } from "lucide-react";

// export default function AgentTest() {
//   // Field Service agent capabilities
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

//   return (
//     <Card className="bg-white h-full flex flex-col">
//       <CardHeader>
//         <div className="flex items-center gap-4">
//           <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//             <RefreshCw className="w-6 h-6 text-blue-600" />
//           </div>
//           <div>
//             <h2 className="text-xl font-semibold">Field Service agent</h2>
//             <p className="text-gray-600">
//               Troubleshooting information for on-site visits
//             </p>
//           </div>
//         </div>
//       </CardHeader>

//       <CardContent className="flex-1 flex flex-col">
//         <div className="grid grid-cols-3 gap-4">
//           {capabilities.map((cap, index) => (
//             <div
//               key={index}
//               className="p-4 border rounded-lg bg-white shadow-sm"
//             >
//               <h3 className="font-medium mb-2">{cap.title}</h3>
//               <p className="text-sm text-gray-600">{cap.description}</p>
//             </div>
//           ))}
//         </div>

//         {/* Optional "Ask a work question" input */}
//         <div className="mt-6">
//           <Input
//             placeholder="Ask a work question or use / to reference people, files, and more"
//             className="w-full"
//           />
//         </div>
//       </CardContent>
//     </Card>
//   );
// }



// "use client";
// import React from "react";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// // Icons
// import { RefreshCw } from "lucide-react";

// export default function AgentTest() {
//   // Field Service agent capabilities
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

//   // "Create" and "TEST AGENT" placeholders
//   const handleCreate = () => {
//     // TODO: Implementation for creating the agent
//     console.log("Create agent clicked");
//   };

//   const handleTestAgent = () => {
//     // TODO: Implementation for testing the agent
//     console.log("Test agent clicked");
//   };

//   return (
//     <Card className="bg-white h-full flex flex-col">
//       <CardHeader>
//         <div className="flex items-center gap-4">
//           <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//             <RefreshCw className="w-6 h-6 text-blue-600" />
//           </div>
//           <div>
//             <h2 className="text-xl font-semibold">Field Service agent</h2>
//             <p className="text-gray-600">
//               Troubleshooting information for on-site visits
//             </p>
//           </div>
//         </div>
//       </CardHeader>

//       <CardContent className="flex-1 flex flex-col">
//         {/* Capabilities grid */}
//         <div className="grid grid-cols-3 gap-4">
//           {capabilities.map((cap, index) => (
//             <div
//               key={index}
//               className="p-4 border rounded-lg bg-white shadow-sm"
//             >
//               <h3 className="font-medium mb-2">{cap.title}</h3>
//               <p className="text-sm text-gray-600">{cap.description}</p>
//             </div>
//           ))}
//         </div>

//         {/* Optional "Ask a work question" input */}
//         <div className="mt-6">
//           <Input
//             placeholder="Ask a work question or use / to reference people, files, and more"
//             className="w-full"
//           />
//         </div>

//         {/* Bottom row with CREATE & TEST AGENT buttons */}
//         <div className="mt-6 flex items-center justify-end gap-4">
//           <Button onClick={handleCreate} variant="default">
//             CREATE
//           </Button>
//           <Button onClick={handleTestAgent} variant="secondary">
//             TEST AGENT
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }



"use client";
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export default function AgentTest() {
  // Field Service agent capabilities
  const capabilities = [
    {
      title: "Troubleshooting",
      description: "Perform routine maintenance checks",
    },
    {
      title: "Installation support",
      description: "Assist by coordinating with contractors",
    },
    {
      title: "Site preparation",
      description: "Assess the suitability of charging locations",
    },
    {
      title: "Compliance and safety",
      description: "Comply with local safety regulations",
    },
    {
      title: "Inventory management",
      description: "Track inventory and connect with suppliers",
    },
    {
      title: "Documentation",
      description: "Record site visits and customer interactions",
    },
  ];

  const handleCreate = () => {
    // Implementation for creating the agent
    console.log("PUBLISH agent clicked");
  };

  const handleTestAgent = () => {
    // Implementation for testing the agent
    console.log("TEST AGENT clicked");
  };

  return (
    <Card className="bg-white h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-4">
                    <div>
            <h2 className="text-xl font-semibold">IoT Sim Management agent</h2>
            <p className="text-gray-600">
              Troubleshooting information for on-site visits
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        {/* Capabilities */}
        <div className="grid grid-cols-3 gap-4">
          {capabilities.map((cap, index) => (
            <div key={index} className="p-4 border rounded-lg bg-white shadow-sm">
              <h3 className="font-medium mb-2">{cap.title}</h3>
              <p className="text-sm text-gray-600">{cap.description}</p>
            </div>
          ))}
        </div>

        {/* Optional "Ask a work question" input */}
        <div className="mt-6">
          <Input
            placeholder="Ask questions or provide instructions to tests your agent"
            className="w-full"
          />
        </div>

        {/* PUBLISH & TEST AGENT buttons at bottom */}
        <div className="mt-6 flex items-center justify-end gap-4">
          <Button onClick={handleTestAgent} variant="secondary">
            TEST AGENT
          </Button>
          <Button onClick={handleCreate} variant="default">
            PUBLISH AGENT
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

