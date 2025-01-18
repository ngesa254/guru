// "use client";
// import React from "react";

// // Import our new components
// import KazuriChat from "@/components/Chat/kazuriChat";
// import AgentTest from "@/components/AgentTest";

// export default function LabPage() {
//   return (
//     <div className="flex flex-col h-full w-full p-4">
//       {/* Top header area */}
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2">
//           <h1 className="text-2xl font-bold">GURU Studio</h1>
//           {/* Optional: a button or label for the agent name */}
//           {/* <button className="px-3 py-1 bg-gray-200 rounded-md text-sm font-medium">
//             Field Service agent
//           </button> */}
//         </div>
//         <div className="flex items-center gap-2">
//           <span className="text-sm text-gray-500">Draft auto-saved</span>
//           <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium">
//             Create
//           </button>
//           {/* More actions (vertical dots) */}
//           <button className="p-2 rounded hover:bg-gray-100">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="20"
//               height="20"
//               fill="currentColor"
//               className="text-gray-700"
//               viewBox="0 0 256 256"
//             >
//               <circle cx="128" cy="64" r="16"></circle>
//               <circle cx="128" cy="128" r="16"></circle>
//               <circle cx="128" cy="192" r="16"></circle>
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/*
//         Main layout:
//           - Left side: KazuriChat
//           - Right side: AgentTest
//         Inspired by Brain page, we use flex row with space-x
//        */}
//       <div className="flex flex-row h-[600px] space-x-4">
//         {/* Left: Chat Section */}
//         <div className="flex-1 border rounded p-2 bg-gray-50 overflow-auto">
//           <KazuriChat />
//         </div>

//         {/* Right: AgentTest Section */}
//         <div className="w-1/2 border rounded p-2 bg-white shadow-lg overflow-auto">
//           <AgentTest />
//         </div>
//       </div>
//     </div>
//   );
// }




// "use client";
// import React from "react";
// import KazuriChat from "@/components/Chat/kazuriChat";
// import AgentTest from "@/components/AgentTest";

// export default function LabPage() {
//   return (
//     <div className="flex flex-col h-full w-full p-4">
//       {/* Top header area */}
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2">
//           {/* <h1 className="text-2xl font-bold">GURU Studio</h1>
//            */}

// <h1 className="text-2xl font-bold mb-4">KAZURI Studio</h1>

// <p className="mb-4 text-gray-600">
// Create your Own AI Agent with no code
// </p>
//         </div>


        
//         <div className="flex items-center gap-2">
//           <span className="text-sm text-gray-500">Draft auto-saved</span>
//           <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium">
//             Create
//           </button>
//           {/* More actions (3 vertical dots) */}
//           <button className="p-2 rounded hover:bg-gray-100">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="20"
//               height="20"
//               fill="currentColor"
//               className="text-gray-700"
//               viewBox="0 0 256 256"
//             >
//               <circle cx="128" cy="64" r="16"></circle>
//               <circle cx="128" cy="128" r="16"></circle>
//               <circle cx="128" cy="192" r="16"></circle>
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* Main layout: KazuriChat (left) + Field Service agent card (right) */}
//       <div className="flex flex-row h-[600px] space-x-4">
//         {/* LEFT: Chat with Describe & Configure tabs */}
//         <div className="flex-1 border rounded p-2 bg-gray-50 overflow-auto">
//           <KazuriChat />
//         </div>

//         {/* RIGHT: Field Service agent card only */}
//         <div className="w-1/2 border rounded p-2 bg-white shadow-lg overflow-auto">
//           <AgentTest />
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";
// import React from "react";
// import KazuriChat from "@/components/Chat/kazuriChat";
// import AgentTest from "@/components/AgentTest";

// export default function LabPage() {
//   return (
//     <div className="flex flex-col h-full w-full p-4">
//       {/* Page Title & Description (mirroring Brain style) */}
//       <h1 className="text-2xl font-bold mb-2">KAZURI Studio</h1>
//       <p className="mb-4 text-gray-600">Create your Own AI Agent with no code</p>

//       {/* Main layout: Chat (left) + AgentTest (right) */}
//       <div className="flex flex-row h-[600px] space-x-4">
//         {/* LEFT: KazuriChat */}
//         <div className="flex-1 border rounded p-2 bg-gray-50 overflow-auto">
//           <KazuriChat />
//         </div>

//         {/* RIGHT: AgentTest */}
//         <div className="w-1/2 border rounded p-2 bg-white shadow-lg overflow-auto">
//           <AgentTest />
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import React from "react";
import KazuriChat from "@/components/Chat/kazuriChat";
import AgentTest from "@/components/AgentTest";

export default function LabPage() {
  return (
    <div className="flex flex-col h-full w-full p-4">
      {/* Page Title & Description (similar style to BrainPage) */}
      <h1 className="text-2xl font-bold mb-2">KAZURI Studio</h1>
      <p className="mb-4 text-gray-600">Create your Own AI Agent with no code</p>

      {/* Main layout: Chat (left) + AgentTest (right) */}
      <div className="flex flex-row h-[600px] space-x-4">
        {/* LEFT: KazuriChat with Describe / Configure tabs */}
        <div className="flex-1 border rounded p-2 bg-gray-50 overflow-auto">
          <KazuriChat />
        </div>

        {/* RIGHT: Field Service agent card */}
        <div className="w-1/2 border rounded p-2 bg-white shadow-lg overflow-auto">
          <AgentTest />
        </div>
      </div>
    </div>
  );
}


