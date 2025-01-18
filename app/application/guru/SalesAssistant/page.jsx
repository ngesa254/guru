// "use client"
// import React, { useState } from "react";

// export default function SalesAssistant() {
//   const [input, setInput] = useState("");

//   const handleInputChange = () => {
//     // setInput(e.target.value);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-white ">
//       {/* Greeting */}
//       <div className="text-center mb-10">
//         <h1 className="text-4xl font-semibold">
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">
//             Hello,
//           </span>
//           <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-red-500">
//             Ngesa.
//           </span>
//         </h1>
//         <p className="text-xl text-gray-800 mt-4">How can I help?</p>
//       </div>

//       {/* Input Section */}
//       <div className="fixed bottom-32 w-full max-w-md mx-auto px-4">
//         <div className="flex items-center bg-gray-100 p-4 rounded-full shadow-lg">
//           <input
//             type="text"
//             value={input}
//             onChange={handleInputChange}
//             placeholder="Ask me anything..."
//             className="flex-grow bg-transparent focus:outline-none text-lg px-4"
//           />
//           <button className="ml-2 text-gray-600 hover:text-gray-900">
//             {/* Send Icon (Arrow) */}
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="w-6 h-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M3 12h18m0 0l-6-6m6 6l-6 6"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


//NEW

import React from 'react'
import ChatUI from '@/components/Chat'
const page = () => {
  return (
         <div >
          <ChatUI endpoint="/api/v1/Enterpise-AI-Search"/> 
    </div>
  )
}

export default page