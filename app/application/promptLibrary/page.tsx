// "use client"
// import React, { useState } from 'react'
// import { Search, ChevronDown } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// interface Prompt {
//   id: string
//   title: string
//   description: string
//   department: string
//   category: string
//   tag: string
//   tagColor: string
// }

// const prompts: Prompt[] = [
//   {
//     id: '1',
//     title: 'Research documents for a blog post',
//     description: 'Identify and summarize key resources for a blog post.',
//     department: 'Marketing',
//     category: 'Content',
//     tag: 'Marketing',
//     tagColor: 'bg-purple-100 text-purple-800'
//   },
//   {
//     id: '2',
//     title: 'Explore time management techniques',
//     description: 'Discover time management techniques with description...',
//     department: 'Operations',
//     category: 'Productivity',
//     tag: 'All Teams',
//     tagColor: 'bg-gray-100 text-gray-800'
//   },
//   {
//     id: '3',
//     title: 'Find teammates who worked on a feature',
//     description: 'Identify individuals who have worked on a feature.',
//     department: 'Engineering',
//     category: 'Collaboration',
//     tag: 'Engineering',
//     tagColor: 'bg-blue-100 text-blue-800'
//   },
//   {
//     id: '4',
//     title: 'Understand financial terminology',
//     description: 'Define and understand financial and company...',
//     department: 'Finance',
//     category: 'Training',
//     tag: 'Finance',
//     tagColor: 'bg-green-100 text-green-800'
//   }
// ]

// const departments = ['All Departments', 'Marketing', 'Engineering', 'Finance', 'Operations']
// const categories = ['All Categories', 'Content', 'Productivity', 'Collaboration', 'Training']

// export default function PromptLibrary() {
//   const [searchQuery, setSearchQuery] = useState('')
//   const [selectedDepartment, setSelectedDepartment] = useState('All Departments')
//   const [selectedCategory, setSelectedCategory] = useState('All Categories')

//   const filteredPrompts = prompts.filter(prompt => {
//     const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          prompt.description.toLowerCase().includes(searchQuery.toLowerCase())
//     const matchesDepartment = selectedDepartment === 'All Departments' || prompt.department === selectedDepartment
//     const matchesCategory = selectedCategory === 'All Categories' || prompt.category === selectedCategory
//     return matchesSearch && matchesDepartment && matchesCategory
//   })

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-12">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">Prompt Library</h1>
//           <p className="text-xl text-gray-600 mb-6">
//             Create and discover prompts that unlock more powerful ways to use Chat.
//           </p>
//           <Button 
//             variant="outline" 
//             className="border-2 border-blue-500 text-blue-500 hover:bg-blue-50"
//           >
//             Request a prompt
//           </Button>
//         </div>

//         {/* Filters */}
//         <div className="flex flex-wrap gap-4 mb-8">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="flex items-center gap-2">
//                 {selectedDepartment}
//                 <ChevronDown className="h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="start" className="w-[200px]">
//               {departments.map(dept => (
//                 <DropdownMenuItem 
//                   key={dept}
//                   onClick={() => setSelectedDepartment(dept)}
//                 >
//                   {dept}
//                 </DropdownMenuItem>
//               ))}
//             </DropdownMenuContent>
//           </DropdownMenu>

//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="flex items-center gap-2">
//                 {selectedCategory}
//                 <ChevronDown className="h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="start" className="w-[200px]">
//               {categories.map(cat => (
//                 <DropdownMenuItem 
//                   key={cat}
//                   onClick={() => setSelectedCategory(cat)}
//                 >
//                   {cat}
//                 </DropdownMenuItem>
//               ))}
//             </DropdownMenuContent>
//           </DropdownMenu>

//           <div className="flex-1">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//               <Input
//                 placeholder="Search prompts"
//                 className="pl-10 w-full"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Prompt Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {filteredPrompts.map(prompt => (
//             <div
//               key={prompt.id}
//               className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
//             >
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 {prompt.title}
//               </h3>
//               <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                 {prompt.description}
//               </p>
//               <span className={`inline-block px-3 py-1 rounded-full text-sm ${prompt.tagColor}`}>
//                 {prompt.tag}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Show More Button */}
//         <div className="text-center mt-8">
//           <Button variant="outline">
//             Show more
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }


// WORKING v0.1
// "use client"
// import React, { useState } from 'react'
// import { Search, ChevronDown } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// interface Prompt {
//   id: string
//   title: string
//   description: string
//   department: string
//   category: string
//   tag: string
//   tagColor: string
// }

// const initialPrompts: Prompt[] = [
//   {
//     id: '1',
//     title: 'Research documents for a blog post',
//     description: 'Identify and summarize key resources for a blog post.',
//     department: 'Marketing',
//     category: 'Content',
//     tag: 'Marketing',
//     tagColor: 'bg-purple-100 text-purple-800'
//   },
//   {
//     id: '2',
//     title: 'Explore time management techniques',
//     description: 'Discover time management techniques with description...',
//     department: 'Operations',
//     category: 'Productivity',
//     tag: 'All Teams',
//     tagColor: 'bg-gray-100 text-gray-800'
//   },
//   {
//     id: '3',
//     title: 'Find teammates who worked on a feature',
//     description: 'Identify individuals who have worked on a feature.',
//     department: 'Engineering',
//     category: 'Collaboration',
//     tag: 'Engineering',
//     tagColor: 'bg-blue-100 text-blue-800'
//   },
//   {
//     id: '4',
//     title: 'Understand financial terminology',
//     description: 'Define and understand financial and company...',
//     department: 'Finance',
//     category: 'Training',
//     tag: 'Finance',
//     tagColor: 'bg-green-100 text-green-800'
//   }
// ]

// // const additionalPrompts: Prompt[] = [
// //   {
// //     id: '5',
// //     title: 'Review security compliance',
// //     description: 'Based on security requirements, determine if...',
// //     department: 'Security',
// //     category: 'Compliance',
// //     tag: 'Security',
// //     tagColor: 'bg-blue-100 text-blue-800'
// //   },
// //   {
// //     id: '6',
// //     title: 'Synthesize user testing observations',
// //     description: 'Analyze user feedback to identify and categorize key...',
// //     department: 'Design',
// //     category: 'Research',
// //     tag: 'Design',
// //     tagColor: 'bg-purple-100 text-purple-800'
// //   },
// //   {
// //     id: '7',
// //     title: 'Find sales apps that mention competitor',
// //     description: 'Identify and summarize all open Salesforce...',
// //     department: 'Sales',
// //     category: 'Research',
// //     tag: 'Sales',
// //     tagColor: 'bg-green-100 text-green-800'
// //   },
// //   {
// //     id: '8',
// //     title: 'Compare contracts',
// //     description: 'Use a table to compare the difference between two...',
// //     department: 'Legal',
// //     category: 'Analysis',
// //     tag: 'Legal',
// //     tagColor: 'bg-orange-100 text-orange-800'
// //   },
// //   // Add more prompts as seen in the second image
// // ]

// // const departments = ['All Departments', 'Marketing', 'Engineering', 'Finance', 'Operations', 'Security', 'Design', 'Sales', 'Legal']
// // const categories = ['All Categories', 'Content', 'Productivity', 'Collaboration', 'Training', 'Compliance', 'Research', 'Analysis']



// const additionalPrompts: Prompt[] = [
//   {
//     id: '5',
//     title: 'Review security compliance',
//     description: 'Based on security requirements, determine if...',
//     department: 'Security',
//     category: 'Compliance',
//     tag: 'Security',
//     tagColor: 'bg-blue-100 text-blue-800'
//   },
//   {
//     id: '6',
//     title: 'Synthesize user testing observations',
//     description: 'Analyze user feedback to identify and categorize key...',
//     department: 'Design',
//     category: 'Research',
//     tag: 'Design',
//     tagColor: 'bg-purple-100 text-purple-800'
//   },
//   {
//     id: '7',
//     title: 'Find sales apps that mention competitor',
//     description: 'Identify and summarize all open Salesforce...',
//     department: 'Sales',
//     category: 'Research',
//     tag: 'Sales',
//     tagColor: 'bg-green-100 text-green-800'
//   },
//   {
//     id: '8',
//     title: 'Compare contracts',
//     description: 'Use a table to compare the difference between two...',
//     department: 'Legal',
//     category: 'Analysis',
//     tag: 'Legal',
//     tagColor: 'bg-orange-100 text-orange-800'
//   },
//   {
//     id: '9',
//     title: 'Get an EA\'s support',
//     description: 'Act as an executive assistant by summarizing...',
//     department: 'Operations',
//     category: 'Support',
//     tag: 'All teams',
//     tagColor: 'bg-gray-100 text-gray-800'
//   },
//   {
//     id: '10',
//     title: 'Learn company lingo',
//     description: 'Explain the meaning of the specified company term...',
//     department: 'Operations',
//     category: 'Training',
//     tag: 'All teams',
//     tagColor: 'bg-gray-100 text-gray-800'
//   },
//   {
//     id: '11',
//     title: 'Write a contract amendment email',
//     description: 'Create email asking for details on specific change...',
//     department: 'Legal',
//     category: 'Communication',
//     tag: 'Finance',
//     tagColor: 'bg-green-100 text-green-800'
//   },
//   {
//     id: '12',
//     title: 'Debug an error message',
//     description: 'Identify the cause of an error message and how to...',
//     department: 'Engineering',
//     category: 'Troubleshooting',
//     tag: 'Engineering',
//     tagColor: 'bg-blue-100 text-blue-800'
//   },
//   {
//     id: '13',
//     title: 'Create social media copy for employees',
//     description: 'Draft social media posts for employees to share for...',
//     department: 'Marketing',
//     category: 'Content',
//     tag: 'Marketing',
//     tagColor: 'bg-purple-100 text-purple-800'
//   },
//   {
//     id: '14',
//     title: 'Draft an email to a prospect',
//     description: 'Draft a personalized email to a potential client...',
//     department: 'Sales',
//     category: 'Communication',
//     tag: 'Sales',
//     tagColor: 'bg-green-100 text-green-800'
//   },
//   {
//     id: '15',
//     title: 'Determine impact on contract and operations',
//     description: 'Based on a new product that is being added...',
//     department: 'Legal',
//     category: 'Analysis',
//     tag: 'Legal',
//     tagColor: 'bg-orange-100 text-orange-800'
//   },
//   {
//     id: '16',
//     title: 'Condense text with a new title',
//     description: 'Brainstorm and create variations/headlines of...',
//     department: 'Marketing',
//     category: 'Content',
//     tag: 'Marketing',
//     tagColor: 'bg-purple-100 text-purple-800'
//   }
// ]

// const departments = [
//   'All Departments', 
//   'Marketing', 
//   'Engineering', 
//   'Finance', 
//   'Operations', 
//   'Security', 
//   'Design', 
//   'Sales', 
//   'Legal'
// ]

// const categories = [
//   'All Categories', 
//   'Content', 
//   'Productivity', 
//   'Collaboration', 
//   'Training', 
//   'Compliance', 
//   'Research', 
//   'Analysis', 
//   'Support', 
//   'Communication', 
//   'Troubleshooting'
// ]




// export default function PromptLibrary() {
//   const [searchQuery, setSearchQuery] = useState('')
//   const [selectedDepartment, setSelectedDepartment] = useState('All Departments')
//   const [selectedCategory, setSelectedCategory] = useState('All Categories')
//   const [showMore, setShowMore] = useState(false)

//   const allPrompts = showMore ? [...initialPrompts, ...additionalPrompts] : initialPrompts

//   const filteredPrompts = allPrompts.filter(prompt => {
//     const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          prompt.description.toLowerCase().includes(searchQuery.toLowerCase())
//     const matchesDepartment = selectedDepartment === 'All Departments' || prompt.department === selectedDepartment
//     const matchesCategory = selectedCategory === 'All Categories' || prompt.category === selectedCategory
//     return matchesSearch && matchesDepartment && matchesCategory
//   })

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-12">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">Prompt Library</h1>
//           <p className="text-xl text-gray-600 mb-6">
//             Create and discover prompts that unlock more powerful ways to use Chat.
//           </p>
//           <Button 
//             variant="outline" 
//             className="border-2 border-blue-500 text-blue-500 hover:bg-blue-50"
//           >
//             Request a prompt
//           </Button>
//         </div>

//         {/* Filters */}
//         <div className="flex flex-wrap gap-4 mb-8">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="flex items-center gap-2">
//                 {selectedDepartment}
//                 <ChevronDown className="h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="start" className="w-[200px]">
//               {departments.map(dept => (
//                 <DropdownMenuItem 
//                   key={dept}
//                   onClick={() => setSelectedDepartment(dept)}
//                 >
//                   {dept}
//                 </DropdownMenuItem>
//               ))}
//             </DropdownMenuContent>
//           </DropdownMenu>

//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="flex items-center gap-2">
//                 {selectedCategory}
//                 <ChevronDown className="h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="start" className="w-[200px]">
//               {categories.map(cat => (
//                 <DropdownMenuItem 
//                   key={cat}
//                   onClick={() => setSelectedCategory(cat)}
//                 >
//                   {cat}
//                 </DropdownMenuItem>
//               ))}
//             </DropdownMenuContent>
//           </DropdownMenu>

//           <div className="flex-1">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//               <Input
//                 placeholder="Search prompts"
//                 className="pl-10 w-full"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//           </div>
//         </div>

//         {/* Prompt Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {filteredPrompts.map(prompt => (
//             <div
//               key={prompt.id}
//               className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
//             >
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 {prompt.title}
//               </h3>
//               <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                 {prompt.description}
//               </p>
//               <span className={`inline-block px-3 py-1 rounded-full text-sm ${prompt.tagColor}`}>
//                 {prompt.tag}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Show More Button */}
//         <div className="text-center mt-8">
//           <Button 
//             variant="outline"
//             onClick={() => setShowMore(!showMore)}
//           >
//             {showMore ? 'Show less' : 'Show more'}
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }



// "use client"
// import React, { useState } from 'react'
// import { Search, ChevronDown } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// interface Prompt {
//   id: string
//   title: string
//   description: string
//   department: string
//   category: string
//   tag: string
//   tagColor: string
// }

// // ----------------------------------------------------
// // Initial prompts (4)
// // ----------------------------------------------------
// const initialPrompts: Prompt[] = [
//   {
//     id: '1',
//     title: 'Research documents for a blog post',
//     description: 'Identify and summarize key resources for a blog post.',
//     department: 'Marketing',
//     category: 'Content',
//     tag: 'Marketing',
//     tagColor: 'bg-purple-100 text-purple-800'
//   },
//   {
//     id: '2',
//     title: 'Explore time management techniques',
//     description: 'Discover time management techniques with description...',
//     department: 'Operations',
//     category: 'Productivity',
//     tag: 'All Teams',
//     tagColor: 'bg-gray-100 text-gray-800'
//   },
//   {
//     id: '3',
//     title: 'Find teammates who worked on a feature',
//     description: 'Identify individuals who have worked on a feature.',
//     department: 'Engineering',
//     category: 'Collaboration',
//     tag: 'Engineering',
//     tagColor: 'bg-blue-100 text-blue-800'
//   },
//   {
//     id: '4',
//     title: 'Understand financial terminology',
//     description: 'Define and understand financial and company...',
//     department: 'Finance',
//     category: 'Training',
//     tag: 'Finance',
//     tagColor: 'bg-green-100 text-green-800'
//   }
// ]

// // ----------------------------------------------------
// // Additional prompts
// // ----------------------------------------------------
// const additionalPrompts: Prompt[] = [
//   {
//     id: '5',
//     title: 'Review security compliance',
//     description: 'Based on security requirements, determine if...',
//     department: 'Security',
//     category: 'Compliance',
//     tag: 'Security',
//     tagColor: 'bg-blue-100 text-blue-800'
//   },
//   {
//     id: '6',
//     title: 'Synthesize user testing observations',
//     description: 'Analyze user feedback to identify and categorize key...',
//     department: 'Design',
//     category: 'Research',
//     tag: 'Design',
//     tagColor: 'bg-purple-100 text-purple-800'
//   },
//   {
//     id: '7',
//     title: 'Find sales apps that mention competitor',
//     description: 'Identify and summarize all open Salesforce...',
//     department: 'Sales',
//     category: 'Research',
//     tag: 'Sales',
//     tagColor: 'bg-green-100 text-green-800'
//   },
//   {
//     id: '8',
//     title: 'Compare contracts',
//     description: 'Use a table to compare the difference between two...',
//     department: 'Legal',
//     category: 'Analysis',
//     tag: 'Legal',
//     tagColor: 'bg-orange-100 text-orange-800'
//   },
//   {
//     id: '9',
//     title: 'Get an EA\'s support',
//     description: 'Act as an executive assistant by summarizing...',
//     department: 'Operations',
//     category: 'Support',
//     tag: 'All teams',
//     tagColor: 'bg-gray-100 text-gray-800'
//   },
//   {
//     id: '10',
//     title: 'Learn company lingo',
//     description: 'Explain the meaning of the specified company term...',
//     department: 'Operations',
//     category: 'Training',
//     tag: 'All teams',
//     tagColor: 'bg-gray-100 text-gray-800'
//   },
//   {
//     id: '11',
//     title: 'Write a contract amendment email',
//     description: 'Create email asking for details on specific change...',
//     department: 'Legal',
//     category: 'Communication',
//     tag: 'Finance',
//     tagColor: 'bg-green-100 text-green-800'
//   },
//   {
//     id: '12',
//     title: 'Debug an error message',
//     description: 'Identify the cause of an error message and how to...',
//     department: 'Engineering',
//     category: 'Troubleshooting',
//     tag: 'Engineering',
//     tagColor: 'bg-blue-100 text-blue-800'
//   },
//   {
//     id: '13',
//     title: 'Create social media copy for employees',
//     description: 'Draft social media posts for employees to share for...',
//     department: 'Marketing',
//     category: 'Content',
//     tag: 'Marketing',
//     tagColor: 'bg-purple-100 text-purple-800'
//   },
//   {
//     id: '14',
//     title: 'Draft an email to a prospect',
//     description: 'Draft a personalized email to a potential client...',
//     department: 'Sales',
//     category: 'Communication',
//     tag: 'Sales',
//     tagColor: 'bg-green-100 text-green-800'
//   },
//   {
//     id: '15',
//     title: 'Determine impact on contract and operations',
//     description: 'Based on a new product that is being added...',
//     department: 'Legal',
//     category: 'Analysis',
//     tag: 'Legal',
//     tagColor: 'bg-orange-100 text-orange-800'
//   },
//   {
//     id: '16',
//     title: 'Condense text with a new title',
//     description: 'Brainstorm and create variations/headlines of...',
//     department: 'Marketing',
//     category: 'Content',
//     tag: 'Marketing',
//     tagColor: 'bg-purple-100 text-purple-800'
//   }
// ]

// // ----------------------------------------------------
// // Dropdown filter arrays
// // ----------------------------------------------------
// const departments = [
//   'All Departments', 
//   'Marketing', 
//   'Engineering', 
//   'Finance', 
//   'Operations', 
//   'Security', 
//   'Design', 
//   'Sales', 
//   'Legal'
// ]

// const categories = [
//   'All Categories', 
//   'Content', 
//   'Productivity', 
//   'Collaboration', 
//   'Training', 
//   'Compliance', 
//   'Research', 
//   'Analysis', 
//   'Support', 
//   'Communication', 
//   'Troubleshooting'
// ]

// export default function PromptLibrary() {
//   // Search, filters
//   const [searchQuery, setSearchQuery] = useState('')
//   const [selectedDepartment, setSelectedDepartment] = useState('All Departments')
//   const [selectedCategory, setSelectedCategory] = useState('All Categories')

//   // Show More / Show Less toggling (preserved)
//   const [showMore, setShowMore] = useState(false)

//   // NEW: track how many prompts we want to show (initially 4)
//   const [visibleCount, setVisibleCount] = useState(4)

//   // Merge the two prompt lists (this preserves existing logic where 'Show More' toggles additional prompts)
//   // Instead of just toggling to show all, we’ll increment the count of how many we show at a time.
//   const allPrompts = [...initialPrompts, ...additionalPrompts]

//   // Filter logic (unchanged)
//   const filteredPrompts = allPrompts.filter(prompt => {
//     const matchesSearch =
//       prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       prompt.description.toLowerCase().includes(searchQuery.toLowerCase())
//     const matchesDepartment =
//       selectedDepartment === 'All Departments' ||
//       prompt.department === selectedDepartment
//     const matchesCategory =
//       selectedCategory === 'All Categories' ||
//       prompt.category === selectedCategory

//     return matchesSearch && matchesDepartment && matchesCategory
//   })

//   // Slice the filtered prompts up to `visibleCount`
//   const displayedPrompts = filteredPrompts.slice(0, visibleCount)

//   // Handle "Show More" / "Show Less"
//   const handleShowMoreOrLess = () => {
//     if (!showMore) {
//       // If currently collapsed, open up by adding 4 more
//       // or until we reach the end of filteredPrompts
//       const newCount = Math.min(visibleCount + 4, filteredPrompts.length)
//       setVisibleCount(newCount)

//       // If we haven't reached the end, remain in "Show More" mode
//       // If we have reached or exceeded total, set `showMore` to true (implies we can show "Show less" next)
//       if (newCount >= filteredPrompts.length) {
//         setShowMore(true)
//       }
//     } else {
//       // "Show Less" -> reset to just 4 prompts
//       setVisibleCount(4)
//       setShowMore(false)
//     }
//   }

//   return (
//     <div className="flex flex-col min-h-screen w-full p-8 bg-gradient-to-b from-blue-50 to-white">
//       {/* Top section, reminiscent of BrainPage's structure */}
//       <h1 className="text-4xl font-bold text-gray-900 mb-2">Prompt Library</h1>
//       <p className="text-xl text-gray-600 mb-6">
//         Create and discover prompts that unlock more powerful ways to use Chat.
//       </p>
//       <Button 
//         variant="outline" 
//         className="border-2 border-blue-500 text-blue-500 hover:bg-blue-50 mb-8"
//       >
//         Request a prompt
//       </Button>

//       {/* Filter Bar */}
//       <div className="flex flex-wrap gap-4 mb-8">
//         {/* Department Filter */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" className="flex items-center gap-2">
//               {selectedDepartment}
//               <ChevronDown className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="start" className="w-[200px]">
//             {departments.map(dept => (
//               <DropdownMenuItem 
//                 key={dept}
//                 onClick={() => setSelectedDepartment(dept)}
//               >
//                 {dept}
//               </DropdownMenuItem>
//             ))}
//           </DropdownMenuContent>
//         </DropdownMenu>

//         {/* Category Filter */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" className="flex items-center gap-2">
//               {selectedCategory}
//               <ChevronDown className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="start" className="w-[200px]">
//             {categories.map(cat => (
//               <DropdownMenuItem 
//                 key={cat}
//                 onClick={() => setSelectedCategory(cat)}
//               >
//                 {cat}
//               </DropdownMenuItem>
//             ))}
//           </DropdownMenuContent>
//         </DropdownMenu>

//         {/* Search Bar */}
//         <div className="flex-1">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <Input
//               placeholder="Search prompts"
//               className="pl-10 w-full"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Prompt Grid Wrapper (similar “flex-col” approach, but we keep 4/2/1 columns on breakpoints) */}
//       <div className="flex-1">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {displayedPrompts.map(prompt => (
//             <div
//               key={prompt.id}
//               className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
//             >
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 {prompt.title}
//               </h3>
//               <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                 {prompt.description}
//               </p>
//               <span
//                 className={`inline-block px-3 py-1 rounded-full text-sm ${prompt.tagColor}`}
//               >
//                 {prompt.tag}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Show More / Show Less Button */}
//       {/* Keeping it outside the grid wrapper, preserving the absolute/fixed-like position if desired */}
//       <div className="text-center mt-8">
//         <Button 
//           variant="outline"
//           onClick={handleShowMoreOrLess}
//         >
//           {showMore ? 'Show less' : 'Show more'}
//         </Button>
//       </div>
//     </div>
//   )
// }



// "use client";
// import React, { useState } from 'react';
// import { Search, ChevronDown } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// interface Prompt {
//   id: string;
//   title: string;
//   description: string;
//   department: string;
//   category: string;
//   tag: string;
//   tagColor: string;
// }

// const initialPrompts: Prompt[] = [
//   {
//     id: '1',
//     title: 'Research documents for a blog post',
//     description: 'Identify and summarize key resources for a blog post.',
//     department: 'Marketing',
//     category: 'Content',
//     tag: 'Marketing',
//     tagColor: 'bg-purple-100 text-purple-800',
//   },
//   {
//     id: '2',
//     title: 'Explore time management techniques',
//     description: 'Discover time management techniques with description...',
//     department: 'Operations',
//     category: 'Productivity',
//     tag: 'All Teams',
//     tagColor: 'bg-gray-100 text-gray-800',
//   },
//   {
//     id: '3',
//     title: 'Find teammates who worked on a feature',
//     description: 'Identify individuals who have worked on a feature.',
//     department: 'Engineering',
//     category: 'Collaboration',
//     tag: 'Engineering',
//     tagColor: 'bg-blue-100 text-blue-800',
//   },
//   {
//     id: '4',
//     title: 'Understand financial terminology',
//     description: 'Define and understand financial and company...',
//     department: 'Finance',
//     category: 'Training',
//     tag: 'Finance',
//     tagColor: 'bg-green-100 text-green-800',
//   },
// ];

// const additionalPrompts: Prompt[] = [
//   {
//     id: '5',
//     title: 'Review security compliance',
//     description: 'Based on security requirements, determine if...',
//     department: 'Security',
//     category: 'Compliance',
//     tag: 'Security',
//     tagColor: 'bg-blue-100 text-blue-800',
//   },
//   {
//     id: '6',
//     title: 'Synthesize user testing observations',
//     description: 'Analyze user feedback to identify and categorize key...',
//     department: 'Design',
//     category: 'Research',
//     tag: 'Design',
//     tagColor: 'bg-purple-100 text-purple-800',
//   },
//   {
//     id: '7',
//     title: 'Find sales apps that mention competitor',
//     description: 'Identify and summarize all open Salesforce...',
//     department: 'Sales',
//     category: 'Research',
//     tag: 'Sales',
//     tagColor: 'bg-green-100 text-green-800',
//   },
//   {
//     id: '8',
//     title: 'Compare contracts',
//     description: 'Use a table to compare the difference between two...',
//     department: 'Legal',
//     category: 'Analysis',
//     tag: 'Legal',
//     tagColor: 'bg-orange-100 text-orange-800',
//   },
//   {
//     id: '9',
//     title: 'Get an EA\'s support',
//     description: 'Act as an executive assistant by summarizing...',
//     department: 'Operations',
//     category: 'Support',
//     tag: 'All teams',
//     tagColor: 'bg-gray-100 text-gray-800',
//   },
//   {
//     id: '10',
//     title: 'Learn company lingo',
//     description: 'Explain the meaning of the specified company term...',
//     department: 'Operations',
//     category: 'Training',
//     tag: 'All teams',
//     tagColor: 'bg-gray-100 text-gray-800',
//   },
//   {
//     id: '11',
//     title: 'Write a contract amendment email',
//     description: 'Create email asking for details on specific change...',
//     department: 'Legal',
//     category: 'Communication',
//     tag: 'Finance',
//     tagColor: 'bg-green-100 text-green-800',
//   },
//   {
//     id: '12',
//     title: 'Debug an error message',
//     description: 'Identify the cause of an error message and how to...',
//     department: 'Engineering',
//     category: 'Troubleshooting',
//     tag: 'Engineering',
//     tagColor: 'bg-blue-100 text-blue-800',
//   },
//   {
//     id: '13',
//     title: 'Create social media copy for employees',
//     description: 'Draft social media posts for employees to share for...',
//     department: 'Marketing',
//     category: 'Content',
//     tag: 'Marketing',
//     tagColor: 'bg-purple-100 text-purple-800',
//   },
//   {
//     id: '14',
//     title: 'Draft an email to a prospect',
//     description: 'Draft a personalized email to a potential client...',
//     department: 'Sales',
//     category: 'Communication',
//     tag: 'Sales',
//     tagColor: 'bg-green-100 text-green-800',
//   },
//   {
//     id: '15',
//     title: 'Determine impact on contract and operations',
//     description: 'Based on a new product that is being added...',
//     department: 'Legal',
//     category: 'Analysis',
//     tag: 'Legal',
//     tagColor: 'bg-orange-100 text-orange-800',
//   },
//   {
//     id: '16',
//     title: 'Condense text with a new title',
//     description: 'Brainstorm and create variations/headlines of...',
//     department: 'Marketing',
//     category: 'Content',
//     tag: 'Marketing',
//     tagColor: 'bg-purple-100 text-purple-800',
//   },
// ];

// const departments = [
//   'All Departments',
//   'Marketing',
//   'Engineering',
//   'Finance',
//   'Operations',
//   'Security',
//   'Design',
//   'Sales',
//   'Legal',
// ];

// const categories = [
//   'All Categories',
//   'Content',
//   'Productivity',
//   'Collaboration',
//   'Training',
//   'Compliance',
//   'Research',
//   'Analysis',
//   'Support',
//   'Communication',
//   'Troubleshooting',
// ];

// export default function PromptLibrary() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
//   const [selectedCategory, setSelectedCategory] = useState('All Categories');

//   // For the Show More button logic
//   const [showMore, setShowMore] = useState(false);
//   const [visibleCount, setVisibleCount] = useState(4);

//   // Combine both prompt arrays
//   const allPrompts = [...initialPrompts, ...additionalPrompts];

//   // Filter logic
//   const filteredPrompts = allPrompts.filter((prompt) => {
//     const matchesSearch =
//       prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       prompt.description.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesDepartment =
//       selectedDepartment === 'All Departments' ||
//       prompt.department === selectedDepartment;
//     const matchesCategory =
//       selectedCategory === 'All Categories' ||
//       prompt.category === selectedCategory;

//     return matchesSearch && matchesDepartment && matchesCategory;
//   });

//   // Slice the filtered prompts up to `visibleCount`
//   const displayedPrompts = filteredPrompts.slice(0, visibleCount);

//   // Handle "Show More" / "Show Less" in increments of 4
//   const handleShowMoreOrLess = () => {
//     if (!showMore) {
//       // Add 4 more or show all if fewer than 4 remain
//       const newCount = Math.min(visibleCount + 4, filteredPrompts.length);
//       setVisibleCount(newCount);

//       if (newCount >= filteredPrompts.length) {
//         setShowMore(true);
//       }
//     } else {
//       // Reset to 4
//       setVisibleCount(4);
//       setShowMore(false);
//     }
//   };

//   return (
//     <div className="flex flex-col w-full min-h-screen p-8 bg-white">
//       {/* Header */}
//       {/* <h1 className="text-4xl font-bold text-gray-900 mb-2">
//         Prompt Library
//       </h1>
//       <p className="text-xl text-gray-600 mb-6">
        
//       </p> */}


// <h1 className="text-2xl font-bold mb-4">PROMPT Library</h1>

// <p className="mb-4 text-gray-600">
// Create and discover prompts that unlock more powerful ways to use Chat.
// </p>
//       <Button
//         variant="outline"
//         className="border-2 border-blue-500 text-blue-500 hover:bg-blue-50 mb-8"
//       >
//         Request a prompt
//       </Button>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-4 mb-8">
//         {/* Department Filter */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" className="flex items-center gap-2">
//               {selectedDepartment}
//               <ChevronDown className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="start" className="w-[200px]">
//             {departments.map((dept) => (
//               <DropdownMenuItem
//                 key={dept}
//                 onClick={() => setSelectedDepartment(dept)}
//               >
//                 {dept}
//               </DropdownMenuItem>
//             ))}
//           </DropdownMenuContent>
//         </DropdownMenu>

//         {/* Category Filter */}
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" className="flex items-center gap-2">
//               {selectedCategory}
//               <ChevronDown className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="start" className="w-[200px]">
//             {categories.map((cat) => (
//               <DropdownMenuItem
//                 key={cat}
//                 onClick={() => setSelectedCategory(cat)}
//               >
//                 {cat}
//               </DropdownMenuItem>
//             ))}
//           </DropdownMenuContent>
//         </DropdownMenu>

//         {/* Search bar */}
//         <div className="flex-1">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <Input
//               placeholder="Search prompts"
//               className="pl-10 w-full"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Prompt Grid */}
//       <div className="flex-1">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {displayedPrompts.map((prompt) => (
//             <div
//               key={prompt.id}
//               className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
//             >
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 {prompt.title}
//               </h3>
//               <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                 {prompt.description}
//               </p>
//               <span
//                 className={`inline-block px-3 py-1 rounded-full text-sm ${prompt.tagColor}`}
//               >
//                 {prompt.tag}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Show More / Show Less Button */}
//       <div className="text-center mt-8">
//         <Button variant="outline" onClick={handleShowMoreOrLess}>
//           {showMore ? 'Show less' : 'Show more'}
//         </Button>
//       </div>
//     </div>
//   );
// }




// "use client";
// import React, { useState } from 'react';
// import { Search, ChevronDown } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// interface Prompt {
//   id: string;
//   title: string;
//   description: string;
//   department: string;
//   category: string;
//   tag: string;
//   tagColor: string;
// }

// // ----------------------------------------------------
// // Initial prompts (4)
// // ----------------------------------------------------
// const initialPrompts: Prompt[] = [
//   {
//     id: '1',
//     title: 'Research documents for a blog post',
//     description: 'Identify and summarize key resources for a blog post.',
//     department: 'Marketing',
//     category: 'Content',
//     tag: 'Marketing',
//     tagColor: 'bg-purple-100 text-purple-800',
//   },
//   {
//     id: '2',
//     title: 'Explore time management techniques',
//     description: 'Discover time management techniques with description...',
//     department: 'Operations',
//     category: 'Productivity',
//     tag: 'All Teams',
//     tagColor: 'bg-gray-100 text-gray-800',
//   },
//   {
//     id: '3',
//     title: 'Find teammates who worked on a feature',
//     description: 'Identify individuals who have worked on a feature.',
//     department: 'Engineering',
//     category: 'Collaboration',
//     tag: 'Engineering',
//     tagColor: 'bg-blue-100 text-blue-800',
//   },
//   {
//     id: '4',
//     title: 'Understand financial terminology',
//     description: 'Define and understand financial and company...',
//     department: 'Finance',
//     category: 'Training',
//     tag: 'Finance',
//     tagColor: 'bg-green-100 text-green-800',
//   },
// ];

// // ----------------------------------------------------
// // Additional prompts
// // ----------------------------------------------------
// const additionalPrompts: Prompt[] = [
//   {
//     id: '5',
//     title: 'Review security compliance',
//     description: 'Based on security requirements, determine if...',
//     department: 'Security',
//     category: 'Compliance',
//     tag: 'Security',
//     tagColor: 'bg-blue-100 text-blue-800',
//   },
//   {
//     id: '6',
//     title: 'Synthesize user testing observations',
//     description: 'Analyze user feedback to identify and categorize key...',
//     department: 'Design',
//     category: 'Research',
//     tag: 'Design',
//     tagColor: 'bg-purple-100 text-purple-800',
//   },
//   {
//     id: '7',
//     title: 'Find sales apps that mention competitor',
//     description: 'Identify and summarize all open Salesforce...',
//     department: 'Sales',
//     category: 'Research',
//     tag: 'Sales',
//     tagColor: 'bg-green-100 text-green-800',
//   },
//   {
//     id: '8',
//     title: 'Compare contracts',
//     description: 'Use a table to compare the difference between two...',
//     department: 'Legal',
//     category: 'Analysis',
//     tag: 'Legal',
//     tagColor: 'bg-orange-100 text-orange-800',
//   },
//   {
//     id: '9',
//     title: 'Get an EA\'s support',
//     description: 'Act as an executive assistant by summarizing...',
//     department: 'Operations',
//     category: 'Support',
//     tag: 'All teams',
//     tagColor: 'bg-gray-100 text-gray-800',
//   },
//   {
//     id: '10',
//     title: 'Learn company lingo',
//     description: 'Explain the meaning of the specified company term...',
//     department: 'Operations',
//     category: 'Training',
//     tag: 'All teams',
//     tagColor: 'bg-gray-100 text-gray-800',
//   },
//   {
//     id: '11',
//     title: 'Write a contract amendment email',
//     description: 'Create email asking for details on specific change...',
//     department: 'Legal',
//     category: 'Communication',
//     tag: 'Finance',
//     tagColor: 'bg-green-100 text-green-800',
//   },
//   {
//     id: '12',
//     title: 'Debug an error message',
//     description: 'Identify the cause of an error message and how to...',
//     department: 'Engineering',
//     category: 'Troubleshooting',
//     tag: 'Engineering',
//     tagColor: 'bg-blue-100 text-blue-800',
//   },
//   {
//     id: '13',
//     title: 'Create social media copy for employees',
//     description: 'Draft social media posts for employees to share for...',
//     department: 'Marketing',
//     category: 'Content',
//     tag: 'Marketing',
//     tagColor: 'bg-purple-100 text-purple-800',
//   },
//   {
//     id: '14',
//     title: 'Draft an email to a prospect',
//     description: 'Draft a personalized email to a potential client...',
//     department: 'Sales',
//     category: 'Communication',
//     tag: 'Sales',
//     tagColor: 'bg-green-100 text-green-800',
//   },
//   {
//     id: '15',
//     title: 'Determine impact on contract and operations',
//     description: 'Based on a new product that is being added...',
//     department: 'Legal',
//     category: 'Analysis',
//     tag: 'Legal',
//     tagColor: 'bg-orange-100 text-orange-800',
//   },
//   {
//     id: '16',
//     title: 'Condense text with a new title',
//     description: 'Brainstorm and create variations/headlines of...',
//     department: 'Marketing',
//     category: 'Content',
//     tag: 'Marketing',
//     tagColor: 'bg-purple-100 text-purple-800',
//   },
// ];

// // ----------------------------------------------------
// // Dropdown filters
// // ----------------------------------------------------
// const departments = [
//   'All Departments',
//   'Marketing',
//   'Engineering',
//   'Finance',
//   'Operations',
//   'Security',
//   'Design',
//   'Sales',
//   'Legal',
// ];

// const categories = [
//   'All Categories',
//   'Content',
//   'Productivity',
//   'Collaboration',
//   'Training',
//   'Compliance',
//   'Research',
//   'Analysis',
//   'Support',
//   'Communication',
//   'Troubleshooting',
// ];

// export default function PromptLibrary() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
//   const [selectedCategory, setSelectedCategory] = useState('All Categories');

//   // Show More / Show Less
//   const [showMore, setShowMore] = useState(false);
//   const [visibleCount, setVisibleCount] = useState(4);

//   // Combine initial + additional
//   const allPrompts = [...initialPrompts, ...additionalPrompts];

//   // Filter logic
//   const filteredPrompts = allPrompts.filter((prompt) => {
//     const matchesSearch =
//       prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       prompt.description.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesDepartment =
//       selectedDepartment === 'All Departments' ||
//       prompt.department === selectedDepartment;
//     const matchesCategory =
//       selectedCategory === 'All Categories' ||
//       prompt.category === selectedCategory;
//     return matchesSearch && matchesDepartment && matchesCategory;
//   });

//   // The subset we display
//   const displayedPrompts = filteredPrompts.slice(0, visibleCount);

//   // Increments of 4 for Show More
//   const handleShowMoreOrLess = () => {
//     if (!showMore) {
//       const newCount = Math.min(visibleCount + 4, filteredPrompts.length);
//       setVisibleCount(newCount);
//       if (newCount >= filteredPrompts.length) setShowMore(true);
//     } else {
//       setVisibleCount(4);
//       setShowMore(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-full w-full p-4">
//       <h1 className="text-2xl font-bold mb-4">PROMPT Library</h1>
//       <p className="mb-4 text-gray-600">
//         Create and discover prompts that unlock more powerful ways to use Chat.
//       </p>

//       {/*
//         Replicate the Brain layout: a flex row with one main "card" container for the library.
//         You can adjust the height or let content expand; here we choose a fixed-ish height for similarity.
//       */}
//       <div className="flex flex-row h-[600px] space-x-4">
//         <div className="flex-1 border rounded p-4 relative overflow-hidden bg-white">
//           {/* "Request a prompt" -> style it like the "Web" tab from BrainChat (a small blue button). */}
//           <Button
//             onClick={() => alert("Requesting a prompt...")}
//             className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 mb-6"
//           >
//             Request a prompt
//           </Button>

//           {/* Filters row */}
//           <div className="flex flex-wrap gap-4 mb-6">
//             {/* Department Filter */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
//                 >
//                   {selectedDepartment} <ChevronDown className="h-4 w-4 ml-1" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="start" className="w-[200px]">
//                 {departments.map((dept) => (
//                   <DropdownMenuItem
//                     key={dept}
//                     onClick={() => setSelectedDepartment(dept)}
//                   >
//                     {dept}
//                   </DropdownMenuItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>

//             {/* Category Filter */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
//                 >
//                   {selectedCategory} <ChevronDown className="h-4 w-4 ml-1" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="start" className="w-[200px]">
//                 {categories.map((cat) => (
//                   <DropdownMenuItem
//                     key={cat}
//                     onClick={() => setSelectedCategory(cat)}
//                   >
//                     {cat}
//                   </DropdownMenuItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>

//             {/* Search input */}
//             <div className="flex-1 min-w-[200px]">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
//                 <Input
//                   placeholder="Search prompts"
//                   className="pl-10 w-full"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Prompt Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {displayedPrompts.map((prompt) => (
//               <div
//                 key={prompt.id}
//                 className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
//               >
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                   {prompt.title}
//                 </h3>
//                 <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                   {prompt.description}
//                 </p>
//                 <span
//                   className={`inline-block px-3 py-1 rounded-full text-sm ${prompt.tagColor}`}
//                 >
//                   {prompt.tag}
//                 </span>
//               </div>
//             ))}
//           </div>

//           {/* Show More / Show Less */}
//           <div className="text-center mt-8">
//             <Button
//               onClick={handleShowMoreOrLess}
//               className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
//             >
//               {showMore ? 'Show less' : 'Show more'}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





// "use client";
// import React, { useState } from 'react';
// import { Search, ChevronDown } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// interface Prompt {
//   id: string;
//   title: string;
//   description: string;
//   department: string;
//   category: string;
//   tag: string;
//   tagColor: string;
// }

// const initialPrompts: Prompt[] = [
//   {
//     id: '1',
//     title: 'Research documents for a blog post',
//     description: 'Identify and summarize key resources for a blog post.',
//     department: 'Marketing',
//     category: 'Content',
//     tag: 'Marketing',
//     tagColor: 'bg-purple-100 text-purple-800',
//   },
//   {
//     id: '2',
//     title: 'Explore time management techniques',
//     description: 'Discover time management techniques with description...',
//     department: 'Operations',
//     category: 'Productivity',
//     tag: 'All Teams',
//     tagColor: 'bg-gray-100 text-gray-800',
//   },
//   {
//     id: '3',
//     title: 'Find teammates who worked on a feature',
//     description: 'Identify individuals who have worked on a feature.',
//     department: 'Engineering',
//     category: 'Collaboration',
//     tag: 'Engineering',
//     tagColor: 'bg-blue-100 text-blue-800',
//   },
//   {
//     id: '4',
//     title: 'Understand financial terminology',
//     description: 'Define and understand financial and company...',
//     department: 'Finance',
//     category: 'Training',
//     tag: 'Finance',
//     tagColor: 'bg-green-100 text-green-800',
//   },
// ];

// const additionalPrompts: Prompt[] = [
//   {
//     id: '5',
//     title: 'Review security compliance',
//     description: 'Based on security requirements, determine if...',
//     department: 'Security',
//     category: 'Compliance',
//     tag: 'Security',
//     tagColor: 'bg-blue-100 text-blue-800',
//   },
//   {
//     id: '6',
//     title: 'Synthesize user testing observations',
//     description: 'Analyze user feedback to identify and categorize key...',
//     department: 'Design',
//     category: 'Research',
//     tag: 'Design',
//     tagColor: 'bg-purple-100 text-purple-800',
//   },
//   {
//     id: '7',
//     title: 'Find sales apps that mention competitor',
//     description: 'Identify and summarize all open Salesforce...',
//     department: 'Sales',
//     category: 'Research',
//     tag: 'Sales',
//     tagColor: 'bg-green-100 text-green-800',
//   },
//   {
//     id: '8',
//     title: 'Compare contracts',
//     description: 'Use a table to compare the difference between two...',
//     department: 'Legal',
//     category: 'Analysis',
//     tag: 'Legal',
//     tagColor: 'bg-orange-100 text-orange-800',
//   },
//   {
//     id: '9',
//     title: 'Get an EA\'s support',
//     description: 'Act as an executive assistant by summarizing...',
//     department: 'Operations',
//     category: 'Support',
//     tag: 'All teams',
//     tagColor: 'bg-gray-100 text-gray-800',
//   },
//   {
//     id: '10',
//     title: 'Learn company lingo',
//     description: 'Explain the meaning of the specified company term...',
//     department: 'Operations',
//     category: 'Training',
//     tag: 'All teams',
//     tagColor: 'bg-gray-100 text-gray-800',
//   },
//   {
//     id: '11',
//     title: 'Write a contract amendment email',
//     description: 'Create email asking for details on specific change...',
//     department: 'Legal',
//     category: 'Communication',
//     tag: 'Finance',
//     tagColor: 'bg-green-100 text-green-800',
//   },
//   {
//     id: '12',
//     title: 'Debug an error message',
//     description: 'Identify the cause of an error message and how to...',
//     department: 'Engineering',
//     category: 'Troubleshooting',
//     tag: 'Engineering',
//     tagColor: 'bg-blue-100 text-blue-800',
//   },
//   {
//     id: '13',
//     title: 'Create social media copy for employees',
//     description: 'Draft social media posts for employees to share for...',
//     department: 'Marketing',
//     category: 'Content',
//     tag: 'Marketing',
//     tagColor: 'bg-purple-100 text-purple-800',
//   },
//   {
//     id: '14',
//     title: 'Draft an email to a prospect',
//     description: 'Draft a personalized email to a potential client...',
//     department: 'Sales',
//     category: 'Communication',
//     tag: 'Sales',
//     tagColor: 'bg-green-100 text-green-800',
//   },
//   {
//     id: '15',
//     title: 'Determine impact on contract and operations',
//     description: 'Based on a new product that is being added...',
//     department: 'Legal',
//     category: 'Analysis',
//     tag: 'Legal',
//     tagColor: 'bg-orange-100 text-orange-800',
//   },
//   {
//     id: '16',
//     title: 'Condense text with a new title',
//     description: 'Brainstorm and create variations/headlines of...',
//     department: 'Marketing',
//     category: 'Content',
//     tag: 'Marketing',
//     tagColor: 'bg-purple-100 text-purple-800',
//   },
// ];

// const departments = [
//   'All Departments',
//   'Marketing',
//   'Engineering',
//   'Finance',
//   'Operations',
//   'Security',
//   'Design',
//   'Sales',
//   'Legal',
// ];

// const categories = [
//   'All Categories',
//   'Content',
//   'Productivity',
//   'Collaboration',
//   'Training',
//   'Compliance',
//   'Research',
//   'Analysis',
//   'Support',
//   'Communication',
//   'Troubleshooting',
// ];

// export default function PromptLibrary() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
//   const [selectedCategory, setSelectedCategory] = useState('All Categories');

//   const [showMore, setShowMore] = useState(false);
//   const [visibleCount, setVisibleCount] = useState(4);

//   // Merge the two arrays
//   const allPrompts = [...initialPrompts, ...additionalPrompts];

//   // Filter
//   const filteredPrompts = allPrompts.filter((prompt) => {
//     const matchesSearch =
//       prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       prompt.description.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesDepartment =
//       selectedDepartment === 'All Departments' ||
//       prompt.department === selectedDepartment;
//     const matchesCategory =
//       selectedCategory === 'All Categories' ||
//       prompt.category === selectedCategory;
//     return matchesSearch && matchesDepartment && matchesCategory;
//   });

//   // Take only up to visibleCount
//   const displayedPrompts = filteredPrompts.slice(0, visibleCount);

//   // Show More logic in increments of 4
//   const handleShowMoreOrLess = () => {
//     if (!showMore) {
//       const newCount = Math.min(visibleCount + 4, filteredPrompts.length);
//       setVisibleCount(newCount);
//       if (newCount >= filteredPrompts.length) {
//         setShowMore(true);
//       }
//     } else {
//       setVisibleCount(4);
//       setShowMore(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-full w-full p-4">
//       <h1 className="text-2xl font-bold mb-4">PROMPT Library</h1>
//       <p className="mb-4 text-gray-600">
//         Create and discover prompts that unlock more powerful ways to use Chat.
//       </p>

//       {/* 
//          We wrap the main library content in a flex row for a "card" style,
//          mimicking how BrainPage has Chat (left) + Canvas (right). 
//          We'll use a single "card" for the library prompts.
//       */}
//       <div className="flex flex-row h-[600px] space-x-4 relative">
//         {/* Main Card Container */}
//         <div className="flex-1 border rounded p-4 bg-white relative overflow-hidden">
//           {/* "Request a prompt" -> styled like Brain's small "Web" tab */}
//           <Button
//             onClick={() => alert("Requesting a prompt...")}
//             className="px-4 py-2 mb-6 rounded bg-blue-500 text-white hover:bg-blue-600"
//           >
//             Request a prompt
//           </Button>

//           {/* Filter row */}
//           <div className="flex flex-wrap gap-4 mb-6">
//             {/* Department Filter */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300">
//                   {selectedDepartment} <ChevronDown className="h-4 w-4 ml-1" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="start" className="w-[200px]">
//                 {departments.map((dept) => (
//                   <DropdownMenuItem
//                     key={dept}
//                     onClick={() => setSelectedDepartment(dept)}
//                   >
//                     {dept}
//                   </DropdownMenuItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>

//             {/* Category Filter */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300">
//                   {selectedCategory} <ChevronDown className="h-4 w-4 ml-1" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="start" className="w-[200px]">
//                 {categories.map((cat) => (
//                   <DropdownMenuItem
//                     key={cat}
//                     onClick={() => setSelectedCategory(cat)}
//                   >
//                     {cat}
//                   </DropdownMenuItem>
//                 ))}
//               </DropdownMenuContent>
//             </DropdownMenu>

//             {/* Search */}
//             <div className="flex-1 min-w-[200px]">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
//                 <Input
//                   placeholder="Search prompts"
//                   className="pl-10 w-full"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Prompt Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {displayedPrompts.map((prompt) => (
//               <div
//                 key={prompt.id}
//                 className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
//               >
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                   {prompt.title}
//                 </h3>
//                 <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                   {prompt.description}
//                 </p>
//                 <span
//                   className={`inline-block px-3 py-1 rounded-full text-sm ${prompt.tagColor}`}
//                 >
//                   {prompt.tag}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* 
//         Show More / Show Less Button
//         Placed *outside* the main card wrapper with fixed positioning
//         so it's always visible at the bottom center. 
//       */}
//       <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
//         <Button variant="outline" onClick={handleShowMoreOrLess}>
//           {showMore ? 'Show less' : 'Show more'}
//         </Button>
//       </div>
//     </div>
//   );
// }



"use client";
import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Prompt {
  id: string;
  title: string;
  description: string;
  department: string;
  category: string;
  tag: string;
  tagColor: string;
}

/* -------------------------------------------------------------------
   We have 24 total prompts now: 4 in initialPrompts + 20 in additionalPrompts.
   The "Show More" logic in increments of 4 will reveal them all, 
   unless filters/search limit the total.
------------------------------------------------------------------- */

const initialPrompts: Prompt[] = [
  {
    id: '1',
    title: 'Research documents for a blog post',
    description: 'Identify and summarize key resources for a blog post.',
    department: 'Marketing',
    category: 'Content',
    tag: 'Marketing',
    tagColor: 'bg-purple-100 text-purple-800',
  },
  {
    id: '2',
    title: 'Explore time management techniques',
    description: 'Discover time management techniques with description...',
    department: 'Operations',
    category: 'Productivity',
    tag: 'All Teams',
    tagColor: 'bg-gray-100 text-gray-800',
  },
  {
    id: '3',
    title: 'Find teammates who worked on a feature',
    description: 'Identify individuals who have worked on a feature.',
    department: 'Engineering',
    category: 'Collaboration',
    tag: 'Engineering',
    tagColor: 'bg-blue-100 text-blue-800',
  },
  {
    id: '4',
    title: 'Understand financial terminology',
    description: 'Define and understand financial and company...',
    department: 'Finance',
    category: 'Training',
    tag: 'Finance',
    tagColor: 'bg-green-100 text-green-800',
  },
];

const additionalPrompts: Prompt[] = [
  {
    id: '5',
    title: 'Review security compliance',
    description: 'Based on security requirements, determine if...',
    department: 'Security',
    category: 'Compliance',
    tag: 'Security',
    tagColor: 'bg-blue-100 text-blue-800',
  },
  {
    id: '6',
    title: 'Synthesize user testing observations',
    description: 'Analyze user feedback to identify and categorize key...',
    department: 'Design',
    category: 'Research',
    tag: 'Design',
    tagColor: 'bg-purple-100 text-purple-800',
  },
  {
    id: '7',
    title: 'Find sales apps that mention competitor',
    description: 'Identify and summarize all open Salesforce...',
    department: 'Sales',
    category: 'Research',
    tag: 'Sales',
    tagColor: 'bg-green-100 text-green-800',
  },
  {
    id: '8',
    title: 'Compare contracts',
    description: 'Use a table to compare the difference between two...',
    department: 'Legal',
    category: 'Analysis',
    tag: 'Legal',
    tagColor: 'bg-orange-100 text-orange-800',
  },
  {
    id: '9',
    title: 'Get an EA\'s support',
    description: 'Act as an executive assistant by summarizing...',
    department: 'Operations',
    category: 'Support',
    tag: 'All teams',
    tagColor: 'bg-gray-100 text-gray-800',
  },
  {
    id: '10',
    title: 'Learn company lingo',
    description: 'Explain the meaning of the specified company term...',
    department: 'Operations',
    category: 'Training',
    tag: 'All teams',
    tagColor: 'bg-gray-100 text-gray-800',
  },
  {
    id: '11',
    title: 'Write a contract amendment email',
    description: 'Create email asking for details on specific change...',
    department: 'Legal',
    category: 'Communication',
    tag: 'Finance',
    tagColor: 'bg-green-100 text-green-800',
  },
  {
    id: '12',
    title: 'Debug an error message',
    description: 'Identify the cause of an error message and how to...',
    department: 'Engineering',
    category: 'Troubleshooting',
    tag: 'Engineering',
    tagColor: 'bg-blue-100 text-blue-800',
  },
  {
    id: '13',
    title: 'Create social media copy for employees',
    description: 'Draft social media posts for employees to share for...',
    department: 'Marketing',
    category: 'Content',
    tag: 'Marketing',
    tagColor: 'bg-purple-100 text-purple-800',
  },
  {
    id: '14',
    title: 'Draft an email to a prospect',
    description: 'Draft a personalized email to a potential client...',
    department: 'Sales',
    category: 'Communication',
    tag: 'Sales',
    tagColor: 'bg-green-100 text-green-800',
  },
  {
    id: '15',
    title: 'Determine impact on contract and operations',
    description: 'Based on a new product that is being added...',
    department: 'Legal',
    category: 'Analysis',
    tag: 'Legal',
    tagColor: 'bg-orange-100 text-orange-800',
  },
  {
    id: '16',
    title: 'Condense text with a new title',
    description: 'Brainstorm and create variations/headlines of...',
    department: 'Marketing',
    category: 'Content',
    tag: 'Marketing',
    tagColor: 'bg-purple-100 text-purple-800',
  },
  {
    id: '17',
    title: 'Plan a team-building event',
    description: 'Suggest possible activities and venues for a fun event...',
    department: 'Operations',
    category: 'Collaboration',
    tag: 'All Teams',
    tagColor: 'bg-gray-100 text-gray-800',
  },
  {
    id: '18',
    title: 'Run a new product brainstorming session',
    description: 'Gather ideas for a new product feature or line...',
    department: 'Marketing',
    category: 'Content',
    tag: 'Marketing',
    tagColor: 'bg-purple-100 text-purple-800',
  },
  {
    id: '19',
    title: 'Check compliance with international tax laws',
    description: 'Review tax obligations for overseas business operations...',
    department: 'Finance',
    category: 'Compliance',
    tag: 'Finance',
    tagColor: 'bg-green-100 text-green-800',
  },
  {
    id: '20',
    title: 'Gather user feedback on design prototypes',
    description: 'Collect and analyze user responses from a new prototype...',
    department: 'Design',
    category: 'Research',
    tag: 'Design',
    tagColor: 'bg-purple-100 text-purple-800',
  },
  {
    id: '21',
    title: 'Outline a training curriculum',
    description: 'Create an initial syllabus for an internal training program...',
    department: 'Operations',
    category: 'Training',
    tag: 'All teams',
    tagColor: 'bg-gray-100 text-gray-800',
  },
  {
    id: '22',
    title: 'Respond to a sales inquiry',
    description: 'Draft an email or message replying to a new customer lead...',
    department: 'Sales',
    category: 'Communication',
    tag: 'Sales',
    tagColor: 'bg-green-100 text-green-800',
  },
  {
    id: '23',
    title: 'Investigate potential security breach',
    description: 'Determine scope of a potential security incident...',
    department: 'Security',
    category: 'Troubleshooting',
    tag: 'Security',
    tagColor: 'bg-blue-100 text-blue-800',
  },
  {
    id: '24',
    title: 'Compare different marketing channels',
    description: 'Create a table to evaluate cost, reach, and engagement...',
    department: 'Marketing',
    category: 'Analysis',
    tag: 'Marketing',
    tagColor: 'bg-purple-100 text-purple-800',
  },
];

const departments = [
  'All Departments',
  'Marketing',
  'Engineering',
  'Finance',
  'Operations',
  'Security',
  'Design',
  'Sales',
  'Legal',
];

const categories = [
  'All Categories',
  'Content',
  'Productivity',
  'Collaboration',
  'Training',
  'Compliance',
  'Research',
  'Analysis',
  'Support',
  'Communication',
  'Troubleshooting',
];

export default function PromptLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  // Show More / Show Less
  const [showMore, setShowMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);

  // Merge the arrays
  const allPrompts = [...initialPrompts, ...additionalPrompts];

  // Filter logic
  const filteredPrompts = allPrompts.filter((prompt) => {
    const matchesSearch =
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      selectedDepartment === 'All Departments' ||
      prompt.department === selectedDepartment;
    const matchesCategory =
      selectedCategory === 'All Categories' ||
      prompt.category === selectedCategory;

    return matchesSearch && matchesDepartment && matchesCategory;
  });

  // Slice to visibleCount
  const displayedPrompts = filteredPrompts.slice(0, visibleCount);

  // Increments of 4
  const handleShowMoreOrLess = () => {
    if (!showMore) {
      // "Show More"
      const newCount = visibleCount + 4;
      if (newCount >= filteredPrompts.length) {
        setVisibleCount(filteredPrompts.length);
        setShowMore(true);
      } else {
        setVisibleCount(newCount);
      }
    } else {
      // "Show Less"
      setVisibleCount(4);
      setShowMore(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full p-4">
      <h1 className="text-2xl font-bold mb-4">PROMPT Library</h1>
      <p className="mb-4 text-gray-600">
        Discover, use or even edit custom-made agents that unlock more powerful ways to WORK.
      </p>

      <div className="flex flex-row h-[600px] space-x-4 relative">
        <div className="flex-1 border rounded p-4 bg-white relative overflow-hidden">
          {/* "Request a prompt" button styled like Brain's small "Web" tab */}
          <Button
            onClick={() => alert("Requesting a prompt...")}
            className="px-4 py-2 mb-6 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Request a prompt
          </Button>

          {/* Filters row */}
          <div className="flex flex-wrap gap-4 mb-6">
            {/* Department Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300">
                  {selectedDepartment}
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[200px]">
                {departments.map((dept) => (
                  <DropdownMenuItem
                    key={dept}
                    onClick={() => setSelectedDepartment(dept)}
                  >
                    {dept}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Category Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300">
                  {selectedCategory}
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[200px]">
                {categories.map((cat) => (
                  <DropdownMenuItem
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search */}
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search prompts"
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Prompt Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedPrompts.map((prompt) => (
              <div
                key={prompt.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {prompt.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {prompt.description}
                </p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm ${prompt.tagColor}`}
                >
                  {prompt.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Show More Button - outside the card, fixed bottom center */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <Button variant="outline" onClick={handleShowMoreOrLess}>
          {showMore ? 'Show less' : 'Show more'}
        </Button>
      </div>
    </div>
  );
}


