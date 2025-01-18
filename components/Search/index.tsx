// // components/Search/index.tsx
// 'use client';

// import React, { useState, useCallback, useEffect } from 'react';
// import { useHydratedStore } from '@/store/useStore';
// import { Input } from '@/components/ui/input';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { AiOutlineSearch } from 'react-icons/ai';
// import debounce from 'lodash/debounce';

// interface SearchResult {
//   id: string;
//   type: string;
//   title: string;
//   content: any;
//   timestamp: string;
// }

// export const Search = () => {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState<SearchResult[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const { searchElements, searchIndex, updateSearchIndex } = useHydratedStore(state => ({
//     searchElements: state.searchElements,
//     searchIndex: state.searchIndex,
//     updateSearchIndex: state.updateSearchIndex
//   }));

//   // Simulated search indexing
//   const indexContent = useCallback((content: any) => {
//     const textContent = JSON.stringify(content)
//       .toLowerCase()
//       .replace(/[^\w\s]/g, ' ');
    
//     const words = textContent.split(/\s+/).filter(Boolean);
//     return {
//       words,
//       text: textContent
//     };
//   }, []);

//   // Debounced search function
//   const performSearch = useCallback(
//     debounce(async (searchQuery: string) => {
//       setIsLoading(true);
//       try {
//         // Search through indexed content
//         const elements = searchElements(searchQuery);
        
//         // Format results
//         const formattedResults = elements.map(element => ({
//           id: element.id,
//           type: element.type,
//           title: element.metadata?.title || `${element.type} element`,
//           content: element.content,
//           timestamp: element.metadata?.timestamp || new Date().toISOString()
//         }));

//         setResults(formattedResults);
//       } catch (error) {
//         console.error('Search failed:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }, 300),
//     [searchElements]
//   );

//   // Handle search input
//   const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setQuery(value);
//     if (value.length >= 2) {
//       performSearch(value);
//     } else {
//       setResults([]);
//     }
//   }, [performSearch]);

//   // Navigate to result
//   const handleResultClick = useCallback((result: SearchResult) => {
//     // Implement navigation to the specific element or page
//     console.log('Navigating to:', result);
//   }, []);

//   return (
//     <div className="w-full max-w-xl">
//       <div className="relative">
//         <Input
//           type="search"
//           placeholder="Search canvas and documents..."
//           value={query}
//           onChange={handleSearch}
//           className="pr-10"
//         />
//         <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//           {isLoading ? (
//             <div className="animate-spin">...</div>
//           ) : (
//             <AiOutlineSearch className="text-gray-400" />
//           )}
//         </div>
//       </div>

//       {results.length > 0 && (
//         <Card className="mt-2 max-h-[400px] overflow-auto p-2">
//           {results.map(result => (
//             <Button
//               key={result.id}
//               variant="ghost"
//               className="w-full text-left justify-start mb-1"
//               onClick={() => handleResultClick(result)}
//             >
//               <div>
//                 <div className="font-medium">{result.title}</div>
//                 <div className="text-sm text-gray-500">
//                   {result.type} • {new Date(result.timestamp).toLocaleDateString()}
//                 </div>
//               </div>
//             </Button>
//           ))}
//         </Card>
//       )}
//     </div>
//   );
// };

// export default Search;



// // components/Search/index.tsx
// 'use client';

// import React, { useState, useCallback, useEffect } from 'react';
// import { useHydratedStore } from '@/store/useStore';
// import { Input } from '@/components/ui/input';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Search as SearchIcon } from 'lucide-react';
// import { AiOutlineSearch } from 'react-icons/ai';
// import debounce from 'lodash/debounce';

// interface SearchResult {
//   id: string;
//   type: string;
//   title: string;
//   content: any;
//   timestamp: string;
// }

// interface AIResearchResponse {
//   daily_passengers?: number;
//   ev_parking_spaces?: number;
//   confidence?: number;
//   sources?: Array<{
//     url: string;
//     title: string;
//     timestamp: string;
//   }>;
// }

// export function Search() {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState<SearchResult[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [mode, setMode] = useState<'search' | 'research'>('search');

//   const { 
//     searchElements, 
//     searchIndex, 
//     updateSearchIndex,
//     setResearchResults 
//   } = useHydratedStore(state => ({
//     searchElements: state.searchElements,
//     searchIndex: state.searchIndex,
//     updateSearchIndex: state.updateSearchIndex,
//     setResearchResults: state.setResearchResults
//   }));

//   // Maintain original indexContent functionality
//   const indexContent = useCallback((content: any) => {
//     const textContent = JSON.stringify(content)
//       .toLowerCase()
//       .replace(/[^\w\s]/g, ' ');
    
//     const words = textContent.split(/\s+/).filter(Boolean);
//     return {
//       words,
//       text: textContent
//     };
//   }, []);

//   // Handle AI research queries
//   const handleResearchQuery = async (searchQuery: string) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch('/api/research', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ query: searchQuery })
//       });

//       if (!response.ok) throw new Error('Research query failed');
      
//       const data: AIResearchResponse = await response.json();
//       setResearchResults(data);
      
//       // Add to search results and index
//       const result = {
//         id: Date.now().toString(),
//         type: 'research',
//         title: 'Research Results',
//         content: data,
//         timestamp: new Date().toISOString()
//       };

//       setResults([result]);
//       updateSearchIndex(indexContent(result)); // Index the research result
//     } catch (error) {
//       console.error('Research failed:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Enhanced debounced search function
//   const performSearch = useCallback(
//     debounce(async (searchQuery: string) => {
//       setIsLoading(true);
//       try {
//         if (mode === 'research') {
//           await handleResearchQuery(searchQuery);
//         } else {
//           // Regular search through indexed content
//           const elements = searchElements(searchQuery);
          
//           const formattedResults = elements.map(element => ({
//             id: element.id,
//             type: element.type,
//             title: element.metadata?.title || `${element.type} element`,
//             content: element.content,
//             timestamp: element.metadata?.timestamp || new Date().toISOString()
//           }));

//           setResults(formattedResults);
//         }
//       } catch (error) {
//         console.error('Search failed:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }, 300),
//     [mode, searchElements, handleResearchQuery, indexContent]
//   );

//   // Handle search input
//   const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setQuery(value);
//     if (value.length >= 2) {
//       performSearch(value);
//     } else {
//       setResults([]);
//     }
//   }, [performSearch]);

//   // Enhanced result click handler
//   const handleResultClick = useCallback((result: SearchResult) => {
//     if (result.type === 'research') {
//       setResearchResults(result.content);
//     } else {
//       // Maintain original navigation functionality
//       console.log('Navigating to:', result);
//     }
//   }, [setResearchResults]);

//   return (
//     <div className="w-full max-w-xl">
//       <div className="relative flex gap-2">
//         <div className="flex-1 relative">
//           <Input
//             type="search"
//             placeholder={mode === 'research' ? "Ask about EV charging data..." : "Search canvas and documents..."}
//             value={query}
//             onChange={handleSearch}
//             className="pr-10"
//           />
//           <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//             {isLoading ? (
//               <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent" />
//             ) : (
//               <AiOutlineSearch className="h-4 w-4 text-gray-400" />
//             )}
//           </div>
//         </div>
//         <Button
//           variant="outline"
//           className="min-w-[100px]"
//           onClick={() => setMode(mode === 'search' ? 'research' : 'search')}
//         >
//           {mode === 'search' ? 'Research' : 'Search'}
//         </Button>
//       </div>

//       {results.length > 0 && (
//         <Card className="mt-2 max-h-[400px] overflow-auto p-2">
//           {results.map(result => (
//             <Button
//               key={result.id}
//               variant="ghost"
//               className="w-full text-left justify-start mb-1"
//               onClick={() => handleResultClick(result)}
//             >
//               <div>
//                 <div className="font-medium">{result.title}</div>
//                 <div className="text-sm text-gray-500">
//                   {result.type} • {new Date(result.timestamp).toLocaleDateString()}
//                 </div>
//                 {result.type === 'research' && (
//                   <div className="text-sm text-blue-500 mt-1">
//                     Click to add to canvas
//                   </div>
//                 )}
//               </div>
//             </Button>
//           ))}
//         </Card>
//       )}
//     </div>
//   );
// }

// // export default Search;

// // Make sure to export both ways
// export { Search as default };




// components/Search/index.tsx
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useHydratedStore } from '@/store/useStore';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search as SearchIcon } from 'lucide-react';
import { AiOutlineSearch } from 'react-icons/ai';
import debounce from 'lodash/debounce';

// Enhanced interfaces from B
interface SearchResult {
  id: string;
  type: string;
  title: string;
  content: any;
  timestamp: string;
}

interface AIResearchResponse {
  daily_passengers?: number;
  ev_parking_spaces?: number;
  confidence?: number;
  sources?: Array<{
    url: string;
    title: string;
    timestamp: string;
  }>;
  competitors?: Array<{
    name: string;
    stations: number;
    locations: string[];
  }>;
  requirements?: string[];
}

export function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'search' | 'research'>('search');
  const [error, setError] = useState<string | null>(null); // Added error handling

  // Maintain store integration
  const { 
    searchElements, 
    searchIndex, 
    updateSearchIndex,
    setResearchResults 
  } = useHydratedStore(state => ({
    searchElements: state.searchElements,
    searchIndex: state.searchIndex,
    updateSearchIndex: state.updateSearchIndex,
    setResearchResults: state.setResearchResults
  }));

  // Enhanced indexContent with better error handling
  const indexContent = useCallback((content: any) => {
    try {
      const textContent = JSON.stringify(content)
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ');
      
      const words = textContent.split(/\s+/).filter(Boolean);
      return {
        words,
        text: textContent
      };
    } catch (err) {
      console.error('Error indexing content:', err);
      return null;
    }
  }, []);

  // Enhanced research query handler with better error handling
  const handleResearchQuery = async (searchQuery: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery })
      });

      if (!response.ok) throw new Error('Research query failed');
      
      const data: AIResearchResponse = await response.json();
      setResearchResults(data);
      
      const result = {
        id: crypto.randomUUID(),
        type: 'research',
        title: 'Research Results',
        content: data,
        timestamp: new Date().toISOString()
      };

      setResults([result]);
      const indexed = indexContent(result);
      if (indexed) {
        updateSearchIndex(indexed);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Research failed';
      setError(message);
      console.error('Research failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced debounced search with cleanup
  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      setIsLoading(true);
      setError(null);
      
      try {
        if (mode === 'research') {
          await handleResearchQuery(searchQuery);
        } else {
          const elements = searchElements(searchQuery);
          
          const formattedResults = elements.map(element => ({
            id: element.id,
            type: element.type,
            title: element.metadata?.title || `${element.type} element`,
            content: element.content,
            timestamp: element.metadata?.timestamp || new Date().toISOString()
          }));

          setResults(formattedResults);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Search failed';
        setError(message);
        console.error('Search failed:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    [mode, searchElements, handleResearchQuery]
  );

  // Enhanced search handler with validation
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setQuery(value);
    
    if (value.length >= 2) {
      debouncedSearch(value);
    } else {
      setResults([]);
    }
  }, [debouncedSearch]);

  // Enhanced result handler with error handling
  const handleResultClick = useCallback((result: SearchResult) => {
    try {
      if (result.type === 'research') {
        setResearchResults(result.content);
      } else {
        // Navigate to element
        console.log('Navigating to:', result);
      }
    } catch (error) {
      console.error('Error handling result click:', error);
      setError('Failed to handle result click');
    }
  }, [setResearchResults]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className="w-full max-w-xl">
      <div className="relative flex gap-2">
        <div className="flex-1 relative">
          <Input
            type="search"
            placeholder={mode === 'research' ? 
              "Ask about EV charging data..." : 
              "Search canvas and documents..."
            }
            value={query}
            onChange={handleSearch}
            className="pr-10"
            aria-label={mode === 'research' ? 
              "Research query input" : 
              "Search input"
            }
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isLoading ? (
              <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent" />
            ) : (
              <AiOutlineSearch className="h-4 w-4 text-gray-400" />
            )}
          </div>
        </div>
        <Button
          variant="outline"
          className="min-w-[100px]"
          onClick={() => setMode(mode === 'search' ? 'research' : 'search')}
          aria-label={`Switch to ${mode === 'search' ? 'research' : 'search'} mode`}
        >
          {mode === 'search' ? 'Research' : 'Search'}
        </Button>
      </div>

      {error && (
        <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <Card className="mt-2 max-h-[400px] overflow-auto p-2">
          {results.map(result => (
            <Button
              key={result.id}
              variant="ghost"
              className="w-full text-left justify-start mb-1"
              onClick={() => handleResultClick(result)}
            >
              <div>
                <div className="font-medium">{result.title}</div>
                <div className="text-sm text-gray-500">
                  {result.type} • {new Date(result.timestamp).toLocaleDateString()}
                </div>
                {result.type === 'research' && (
                  <div className="text-sm text-blue-500 mt-1">
                    Click to add to canvas
                  </div>
                )}
              </div>
            </Button>
          ))}
        </Card>
      )}
    </div>
  );
}

// Make sure to export both ways for maximum compatibility
export { Search as default };