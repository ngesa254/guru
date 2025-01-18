// 'use client';

// import React, { useEffect, useRef } from 'react';
// import mermaid from 'mermaid';

// interface MermaidDiagramProps {
//   content: string;
//   config?: any;
// }

// const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ content, config }) => {
//   const containerRef = useRef<HTMLDivElement>(null);
  
//   useEffect(() => {
//     mermaid.initialize({
//       startOnLoad: true,
//       theme: 'default',
//       securityLevel: 'loose',
//       ...config
//     });
    
//     const renderDiagram = async () => {
//       if (containerRef.current) {
//         try {
//           containerRef.current.innerHTML = '';
//           const { svg } = await mermaid.render(
//             `mermaid-${Math.random().toString(36).substr(2, 9)}`,
//             content
//           );
//           containerRef.current.innerHTML = svg;
//         } catch (error) {
//           console.error('Failed to render mermaid diagram:', error);
//           containerRef.current.innerHTML = 'Failed to render diagram';
//         }
//       }
//     };

//     renderDiagram();
//   }, [content, config]);

//   return (
//     <div 
//       ref={containerRef}
//       className="mermaid-diagram w-full h-full min-h-[100px]"
//     />
//   );
// };

// export default MermaidDiagram;



'use client';

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

interface MermaidDiagramProps {
  content: string;
  config?: any;
}

function MermaidDiagramComponent({ content, config }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (containerRef.current) {
        try {
          const { default: mermaid } = await import('mermaid');
          
          mermaid.initialize({
            startOnLoad: false,
            theme: 'default',
            securityLevel: 'loose',
            ...config
          });

          containerRef.current.innerHTML = '';
          const { svg } = await mermaid.render(
            `mermaid-${Math.random().toString(36).substring(2, 9)}`,
            content
          );
          
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        } catch (error) {
          console.error('Failed to render mermaid diagram:', error);
          if (containerRef.current) {
            containerRef.current.innerHTML = 'Failed to render diagram';
          }
        }
      }
    };

    renderDiagram();
  }, [content, config]);

  return (
    <div 
      ref={containerRef}
      className="mermaid-diagram w-full h-full min-h-[100px] p-4 bg-white rounded-lg shadow-lg"
    />
  );
}

// Prevent SSR issues with dynamic import
export default dynamic(() => Promise.resolve(MermaidDiagramComponent), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[100px] flex items-center justify-center bg-white rounded-lg shadow-lg">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
  )
});