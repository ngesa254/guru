// 

// 'use client';

// import React, { useEffect } from 'react';
// import Prism from 'prismjs';
// import 'prismjs/themes/prism-tomorrow.css';
// import 'prismjs/components/prism-typescript';
// import 'prismjs/components/prism-javascript';
// import 'prismjs/components/prism-python';
// import 'prismjs/components/prism-json';
// import 'prismjs/plugins/line-numbers/prism-line-numbers';
// import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

// interface CodeBlockProps {
//   code: string;
//   language: string;
//   showLineNumbers?: boolean;
// }

// export default function CodeBlock({ 
//   code, 
//   language, 
//   showLineNumbers = true 
// }: CodeBlockProps) {
//   useEffect(() => {
//     Prism.highlightAll();
//   }, [code, language]);

//   return (
//     <div className="relative group">
//       <pre className={`${showLineNumbers ? 'line-numbers' : ''} rounded-lg`}>
//         <code className={`language-${language}`}>{code}</code>
//       </pre>
      
//       <button
//         onClick={() => navigator.clipboard.writeText(code)}
//         className="absolute top-2 right-2 p-2 bg-gray-700 text-white rounded 
//                    opacity-0 group-hover:opacity-100 transition-opacity"
//         title="Copy code"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="16"
//           height="16"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
//           <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
//         </svg>
//       </button>
//     </div>
//   );
// }



'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-json';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
}

function CodeBlock({ code, language, showLineNumbers = true }: CodeBlockProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll();
    }
  }, [code, language]);

  return (
    <div className="relative group">
      <pre className={`${showLineNumbers ? 'line-numbers' : ''} rounded-lg`}>
        <code className={`language-${language}`}>{code}</code>
      </pre>
      <button
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity
                   bg-gray-700 text-white px-2 py-1 rounded text-sm"
        onClick={() => navigator.clipboard.writeText(code)}
      >
        Copy
      </button>
    </div>
  );
}

// Export a dynamic component to prevent SSR issues with Prism
export default dynamic(() => Promise.resolve(CodeBlock), {
  ssr: false
});