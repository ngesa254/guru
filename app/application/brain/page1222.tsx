// // // import React from 'react';
// // // import { Card, CardContent } from '@/components/ui/card';
// // // import { Input } from '@/components/ui/input';
// // // import { Button } from '@/components/ui/button';
// // // import { Paperclip, Image, ArrowUp, Copy, Download, Play, ChevronLeft, ChevronRight } from 'lucide-react';

// // // const CodeEditor = () => (
// // //   <div className="bg-gray-800 text-green-400 font-mono p-4 h-full overflow-auto">
// // //     <pre>{`import pandas as pd
// // // import binascii

// // // # Step 1: Load the Excel File
// // // file_path = 'path_to_your_file.xlsx'
// // // excel_file = pd.ExcelFile(file_path)

// // // # Step 2: Load each sheet
// // // device_to_cloud = pd.read_excel(excel_file, sheet_name='Device to Cloud')
// // // cloud_to_device = pd.read_excel(excel_file, sheet_name='Cloud to Device')
// // // examples = pd.read_excel(excel_file, sheet_name='Examples')
// // // decrypt = pd.read_excel(excel_file, sheet_name='Decrypt')

// // // # Step 3: Parse Device-to-Cloud and Cloud-to-Device Sheets
// // // def parse_payload(sheet):
// // //     payload_data = []
// // //     for _, row in sheet.iterrows():
// // //         byte_no = row['Byte no']
// // //         description = row['Description']
// // //         example_value = row['Example Value']
// // //         payload_data.append({'byte_no': byte_no, 'description': description, 'example_value': example_value})
// // //     return payload_data

// // // device_to_cloud_payloads = parse_payload(device_to_cloud)
// // // cloud_to_device_payloads = parse_payload(cloud_to_device)

// // // # Step 4: Parse Hexadecimal Logs from Examples and Decrypt Sheets
// // // def parse_hex_logs(sheet):
// // //     logs = []
// // //     for _, row in sheet.iterrows():
// // //         device_log = row['Log + sync'] if 'Log + sync' in row else row['Device Log']
// // //         logs.append(device_log)
// // //     return logs

// // // device_logs = parse_hex_logs(examples)
// // // decrypted_logs = parse_hex_logs(decrypt)

// // // # Step 5: Convert Hexadecimal Logs to Bytes
// // // def hex_to_bytes(hex_str):
// // //     return binascii.unhexlify(hex_str.replace(' ', ''))

// // // decoded_logs = [hex_to_bytes(log) for log in device_logs]`}</pre>
// // //   </div>
// // // );

// // // const LessonContent = () => (
// // //   <div className="p-4 overflow-auto flex-grow">
// // //     <h2 className="text-xl font-bold mb-4">Engineering: Step-by-Step Guide to Building the UDP Payload Parser for Alpha Tag</h2>
    
// // //     <h3 className="text-lg font-semibold mb-2">Step 1: Install Required Libraries</h3>
// // //     <p className="mb-4">You will need `pandas` for handling the Excel file and `binascii` for working with hexadecimal data. Install them using:</p>
// // //     <pre className="bg-gray-100 p-2 rounded-md mb-4">pip install pandas</pre>

// // //     <h3 className="text-lg font-semibold mb-2">Step 2: Load the Excel File</h3>
// // //     <p className="mb-4">First, load the Excel file using `pandas`:</p>
// // //     <pre className="bg-gray-100 p-2 rounded-md mb-4">
// // // {`import pandas as pd
// // // file_path = 'path_to_your_file.xlsx'
// // // excel_file = pd.ExcelFile(file_path)`}
// // //     </pre>
// // //     <p className="mb-4">Load each sheet from the Excel file:</p>
// // //     <pre className="bg-gray-100 p-2 rounded-md mb-4">
// // // {`device_to_cloud = pd.read_excel(excel_file, sheet_name='Device to Cloud')
// // // cloud_to_device = pd.read_excel(excel_file, sheet_name='Cloud to Device')
// // // examples = pd.read_excel(excel_file, sheet_name='Examples')
// // // decrypt = pd.read_excel(excel_file, sheet_name='Decrypt')`}
// // //     </pre>

// // //     <h3 className="text-lg font-semibold mb-2">Step 3: Parse Device-to-Cloud and Cloud-to-Device Payloads</h3>
// // //     <p className="mb-4">Write a function to parse the payloads from the "Device to Cloud" and "Cloud to Device" sheets:</p>
// // //     <pre className="bg-gray-100 p-2 rounded-md mb-4">
// // // {`def parse_payload(sheet):
// // //     payload_data = []
// // //     for _, row in sheet.iterrows():
// // //         byte_no = row['Byte no']
// // //         description = row['Description']
// // //         example_value = row['Example Value']
// // //         payload_data.append({'byte_no': byte_no, 'description': description, 'example_value': example_value})
// // //     return payload_data`}
// // //     </pre>
// // //     <p className="mb-4">Apply this function to both sheets:</p>
// // //     <pre className="bg-gray-100 p-2 rounded-md mb-4">
// // // {`device_to_cloud_payloads = parse_payload(device_to_cloud)
// // // cloud_to_device_payloads = parse_payload(cloud_to_device)`}
// // //     </pre>

// // //     <h3 className="text-lg font-semibold mb-2">Step 4: Parse Hexadecimal Logs from the "Examples" and "Decrypt" Sheets</h3>
// // //     <p className="mb-4">To handle hexadecimal log data, write a function to extract logs from the respective sheets:</p>
// // //     <pre className="bg-gray-100 p-2 rounded-md mb-4">
// // // {`def parse_hex_logs(sheet):
// // //     logs = []
// // //     for _, row in sheet.iterrows():
// // //         device_log = row['Log + sync'] if 'Log + sync' in row else row['Device Log']
// // //         logs.append(device_log)
// // //     return logs`}
// // //     </pre>
// // //     <p className="mb-4">Apply this function to the logs in both "Examples" and "Decrypt" sheets:</p>
// // //     <pre className="bg-gray-100 p-2 rounded-md mb-4">
// // // {`device_logs = parse_hex_logs(examples)
// // // decrypted_logs = parse_hex_logs(decrypt)`}
// // //     </pre>

// // //     <h3 className="text-lg font-semibold mb-2">Step 5: Convert Hexadecimal Logs to Byte Data</h3>
// // //     <p className="mb-4">To convert the hexadecimal logs into byte data, use the `binascii` module:</p>
// // //     <pre className="bg-gray-100 p-2 rounded-md mb-4">
// // // {`import binascii

// // // def hex_to_bytes(hex_str):
// // //     return binascii.unhexlify(hex_str.replace(' ', ''))`}
// // //     </pre>
// // //     <p className="mb-4">Convert the parsed hexadecimal logs:</p>
// // //     <pre className="bg-gray-100 p-2 rounded-md mb-4">
// // // {`decoded_logs = [hex_to_bytes(log) for log in device_logs]`}
// // //     </pre>

// // //     <h3 className="text-lg font-semibold mb-2">Step 6: Put It All Together</h3>
// // //     <p className="mb-4">Once parsed, the data can be used for further analysis or saved into a file format like JSON. The final code integrates all these steps.</p>
// // //   </div>
// // // );

// // // const ActionBar = () => (
// // //   <div className="flex justify-between items-center p-4 bg-gray-100 border-t">
// // //     <div className="flex items-center space-x-2">
// // //       <ChevronLeft className="h-4 w-4" />
// // //       <span className="text-sm">Version 2 of 2</span>
// // //       <ChevronRight className="h-4 w-4" />
// // //     </div>
// // //     <div className="flex space-x-2">
// // //       <Button variant="outline" size="sm">
// // //         <Copy className="h-4 w-4 mr-2" />
// // //         Copy
// // //       </Button>
// // //       <Button variant="outline" size="sm">
// // //         <Download className="h-4 w-4 mr-2" />
// // //         Download
// // //       </Button>
// // //       <Button variant="outline" size="sm">
// // //         <Play className="h-4 w-4 mr-2" />
// // //         Execute
// // //       </Button>
// // //     </div>
// // //   </div>
// // // );

// // // const InputArea = () => (
// // //   <div className="p-4 border-t">
// // //     <div className="flex items-center bg-white border rounded-md">
// // //       <Input 
// // //         type="text" 
// // //         placeholder="Collaborate with GURU..." 
// // //         className="flex-grow border-none"
// // //       />
// // //       <Button variant="ghost" size="icon" className="mx-1">
// // //         <Paperclip className="h-4 w-4" />
// // //       </Button>
// // //       <Button variant="ghost" size="icon" className="mx-1">
// // //         <Image className="h-4 w-4" />
// // //       </Button>
// // //       <Button variant="ghost" size="icon" className="mx-1">
// // //         <ArrowUp className="h-4 w-4" />
// // //       </Button>
// // //     </div>
// // //   </div>
// // // );

// // // const CodeLessonLayout = () => {
// // //   return (
// // //     <div className="flex flex-col h-screen">
// // //       <div className="flex flex-grow">
// // //         <Card className="w-1/2 flex flex-col">
// // //           <CardContent className="flex-grow overflow-auto">
// // //             <LessonContent />
// // //           </CardContent>
// // //         </Card>
// // //         <Card className="w-1/2 flex flex-col bg-gray-900">
// // //           <CardContent className="flex-grow p-0">
// // //             <CodeEditor />
// // //           </CardContent>
// // //         </Card>
// // //       </div>
// // //       <ActionBar />
// // //       <InputArea />
// // //     </div>
// // //   );
// // // };

// // // export default CodeLessonLayout;



// // // import React from 'react';
// // // import React, { useState } from 'react';
// // // import { Bold, Italic, Underline, Link, Type, Image, List, ListOrdered, Quote, Undo, Redo, Table } from 'lucide-react';

// // // const DocumentEditor = () => {
// // //   const [articleTitle, setArticleTitle] = useState('');
// // //   const [articleNumber, setArticleNumber] = useState('...');

// // //   return (
// // //     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
// // //       <div className="mb-6">
// // //         <div className="flex gap-4 items-start">
// // //           <div className="w-32">
// // //             <label className="text-sm text-gray-600">Article Number</label>
// // //             <input
// // //               type="text"
// // //               value={articleNumber}
// // //               className="w-full p-2 border rounded bg-gray-50"
// // //               disabled
// // //             />
// // //           </div>
// // //           <div className="flex-1">
// // //             <label className="text-sm text-gray-600">Article Title*</label>
// // //             <input
// // //               type="text"
// // //               value={articleTitle}
// // //               onChange={(e) => setArticleTitle(e.target.value)}
// // //               placeholder="Enter article title here..."
// // //               className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// // //             />
// // //           </div>
// // //         </div>
// // //         <p className="text-xs text-gray-500 mt-1">
// // //           ⓘ Article Number is read-only and auto-generated based on the article folder selected in the right panel
// // //         </p>
// // //       </div>

// // //       <div className="border rounded-lg">
// // //         <div className="border-b p-2 flex flex-wrap gap-2 bg-gray-50">
// // //           <div className="flex items-center gap-1 border-r pr-2">
// // //             <button className="p-1.5 hover:bg-gray-200 rounded" title="Bold">
// // //               <Bold size={18} />
// // //             </button>
// // //             <button className="p-1.5 hover:bg-gray-200 rounded" title="Italic">
// // //               <Italic size={18} />
// // //             </button>
// // //             <button className="p-1.5 hover:bg-gray-200 rounded" title="Underline">
// // //               <Underline size={18} />
// // //             </button>
// // //           </div>

// // //           <div className="flex items-center gap-1 border-r pr-2">
// // //             <select className="text-sm p-1 rounded border bg-white">
// // //               <option>Paragraph</option>
// // //               <option>Heading 1</option>
// // //               <option>Heading 2</option>
// // //             </select>
// // //             <select className="text-sm p-1 rounded border bg-white w-20">
// // //               <option>12</option>
// // //               <option>14</option>
// // //               <option>16</option>
// // //             </select>
// // //           </div>

// // //           <div className="flex items-center gap-1 border-r pr-2">
// // //             <button className="p-1.5 hover:bg-gray-200 rounded" title="Link">
// // //               <Link size={18} />
// // //             </button>
// // //             <button className="p-1.5 hover:bg-gray-200 rounded" title="Image">
// // //               <Image size={18} />
// // //             </button>
// // //           </div>

// // //           <div className="flex items-center gap-1 border-r pr-2">
// // //             <button className="p-1.5 hover:bg-gray-200 rounded" title="Bullet List">
// // //               <List size={18} />
// // //             </button>
// // //             <button className="p-1.5 hover:bg-gray-200 rounded" title="Numbered List">
// // //               <ListOrdered size={18} />
// // //             </button>
// // //             <button className="p-1.5 hover:bg-gray-200 rounded" title="Quote">
// // //               <Quote size={18} />
// // //             </button>
// // //           </div>

// // //           <div className="flex items-center gap-1 border-r pr-2">
// // //             <button className="p-1.5 hover:bg-gray-200 rounded" title="Table">
// // //               <Table size={18} />
// // //             </button>
// // //           </div>

// // //           <div className="flex items-center gap-1">
// // //             <button className="p-1.5 hover:bg-gray-200 rounded" title="Undo">
// // //               <Undo size={18} />
// // //             </button>
// // //             <button className="p-1.5 hover:bg-gray-200 rounded" title="Redo">
// // //               <Redo size={18} />
// // //             </button>
// // //           </div>
// // //         </div>

// // //         <div className="p-4 min-h-[400px]">
// // //           <textarea
// // //             placeholder="Add article content"
// // //             className="w-full h-full min-h-[400px] focus:outline-none resize-none"
// // //           />
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default DocumentEditor;




// // // working - 19122024

// // // 'use client';

// // // import { useState } from 'react';
// // // import { 
// // //   Bold, 
// // //   Italic, 
// // //   Underline, 
// // //   Link, 
// // //   Image, 
// // //   List, 
// // //   ListOrdered, 
// // //   Quote, 
// // //   Undo, 
// // //   Redo, 
// // //   Table 
// // // } from 'lucide-react';

// // // const DocumentEditor = () => {
// // //   const [articleTitle, setArticleTitle] = useState('');
// // //   const [articleNumber, setArticleNumber] = useState('...');

// // //   return (
// // //     <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
// // //             <div className="border rounded-lg">
// // //         <div className="border-b p-2 flex flex-wrap gap-2 bg-gray-50">
// // //           <div className="flex items-center gap-1 border-r pr-2">
// // //             <button className="p-1.5 hover:bg-gray-200 rounded" title="Bold">
// // //               <Bold size={18} />
// // //             </button>
// // //             <button className="p-1.5 hover:bg-gray-200 rounded" title="Italic">
// // //               <Italic size={18} />
// // //             </button>
// // //             <button className="p-1.5 hover:bg-gray-200 rounded" title="Underline">
// // //               <Underline size={18} />
// // //             </button>
// // //           </div>

// // //           <div className="flex items-center gap-1 border-r pr-2">
// // //             <select className="text-sm p-1 rounded border bg-white">
// // //               <option>Paragraph</option>
// // //               <option>Heading 1</option>
// // //               <option>Heading 2</option>
// // //             </select>
// // //             <select className="text-sm p-1 rounded border bg-white w-20">
// // //               <option>12</option>
// // //               <option>14</option>
// // //               <option>16</option>
// // //             </select>
// // //           </div>

// // //           <div className="flex items-center gap-1 border-r pr-2">
// // //             <button className="p-1.5 hover:bg-gray-200 rounded" title="Link">
// // //               <Link size={18} />
// // //             </button>
// // //             <button className="p-1.5 hover:bg-gray-200 rounded" title="Image">
// // //               <Image size={18} />
// // //             </button>
// // //           </div>

// // //           <div className="flex items-center gap-1 border-r pr-2">
// // //             <button className="p-1.5 hover:bg-gray-200 rounded" title="Bullet List">
// // //               <List size={18} />
// // //             </button>
// // //             <button className="p-1.5 hover:bg-gray-200 rounded" title="Numbered List">
// // //               <ListOrdered size={18} />
// // //             </button>
// // //             <button className="p-1.5 hover:bg-gray-200 rounded" title="Quote">
// // //               <Quote size={18} />
// // //             </button>
// // //           </div>

// // //           <div className="flex items-center gap-1 border-r pr-2">
// // //             <button className="p-1.5 hover:bg-gray-200 rounded" title="Table">
// // //               <Table size={18} />
// // //             </button>
// // //           </div>

// // //           <div className="flex items-center gap-1">
// // //             <button className="p-1.5 hover:bg-gray-200 rounded" title="Undo">
// // //               <Undo size={18} />
// // //             </button>
// // //             <button className="p-1.5 hover:bg-gray-200 rounded" title="Redo">
// // //               <Redo size={18} />
// // //             </button>
// // //           </div>
// // //         </div>

// // //         <div className="p-4 min-h-[400px]">
// // //           <textarea
// // //             placeholder="Add article content"
// // //             className="w-full h-full min-h-[400px] focus:outline-none resize-none"
// // //           />
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default DocumentEditor;





// // // import React, { useState, useEffect } from 'react';
// // // import { Card } from '@/components/ui/card';
// // // import { Button } from '@/components/ui/button';
// // // import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// // // import { LineChart, XAxis, YAxis, Tooltip, Line, ResponsiveContainer } from 'recharts';
// // // import { Users, FileText, ChevronRight, Plus } from 'lucide-react';

// // // // Types for our canvas state
// // // interface User {
// // //   id: string;
// // //   name: string;
// // //   avatar?: string;
// // // }

// // // interface CanvasData {
// // //   id: string;
// // //   title: string;
// // //   content: string;
// // //   created: string;
// // //   owner: User;
// // //   collaborators: User[];
// // // }

// // // const CollaborativeCanvas = () => {
// // //   const [activeUsers, setActiveUsers] = useState<User[]>([
// // //     { id: '1', name: 'Kayo Miwa', avatar: '/api/placeholder/32/32' },
// // //     { id: '2', name: 'Lydia Bauer', avatar: '/api/placeholder/32/32' },
// // //     { id: '3', name: 'Cecil Folk', avatar: '/api/placeholder/32/32' },
// // //     { id: '4', name: 'Kai Larsson', avatar: '/api/placeholder/32/32' }
// // //   ]);

// // //   const [evData, setEvData] = useState({
// // //     dailyPassengers: 88000,
// // //     totalParkingSpaces: 11000,
// // //     evChargers: 1300,
// // //     monthlyStats: [
// // //       { month: 'Sep', usage: 2500 },
// // //       { month: 'Oct', usage: 3200 },
// // //       { month: 'Nov', usage: 4100 }
// // //     ]
// // //   });

// // //   return (
// // //     <div className="flex flex-col w-full h-full bg-white">
// // //       {/* Top Bar */}
// // //       <div className="flex items-center justify-between p-4 border-b">
// // //         <div className="flex items-center space-x-4">
// // //           <FileText className="w-6 h-6 text-gray-500" />
// // //           <h1 className="text-xl font-semibold">EV Charging Opportunity</h1>
// // //         </div>
// // //         <div className="flex items-center space-x-2">
// // //           {activeUsers.map((user) => (
// // //             <Avatar key={user.id} className="w-8 h-8">
// // //               <AvatarImage src={user.avatar} alt={user.name} />
// // //               <AvatarFallback>{user.name[0]}</AvatarFallback>
// // //             </Avatar>
// // //           ))}
// // //           <Button variant="outline" size="sm">
// // //             <Plus className="w-4 h-4 mr-2" />
// // //             Share
// // //           </Button>
// // //         </div>
// // //       </div>

// // //       {/* Main Content */}
// // //       <div className="flex-1 p-6 overflow-auto">
// // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //           {/* Stats Cards */}
// // //           <Card className="p-6">
// // //             <h2 className="text-lg font-semibold mb-4">Passenger Traffic</h2>
// // //             <div className="space-y-4">
// // //               <div className="flex justify-between items-center">
// // //                 <span className="text-gray-600">Daily Passengers</span>
// // //                 <span className="text-2xl font-bold">{evData.dailyPassengers.toLocaleString()}</span>
// // //               </div>
// // //               <div className="flex justify-between items-center">
// // //                 <span className="text-gray-600">Total Parking Spaces</span>
// // //                 <span className="text-2xl font-bold">{evData.totalParkingSpaces.toLocaleString()}</span>
// // //               </div>
// // //               <div className="flex justify-between items-center">
// // //                 <span className="text-gray-600">EV Chargers</span>
// // //                 <span className="text-2xl font-bold">{evData.evChargers.toLocaleString()}</span>
// // //               </div>
// // //             </div>
// // //           </Card>

// // //           {/* Usage Chart */}
// // //           <Card className="p-6">
// // //             <h2 className="text-lg font-semibold mb-4">Monthly EV Charger Usage</h2>
// // //             <div className="h-64">
// // //               <ResponsiveContainer width="100%" height="100%">
// // //                 <LineChart data={evData.monthlyStats}>
// // //                   <XAxis dataKey="month" />
// // //                   <YAxis />
// // //                   <Tooltip />
// // //                   <Line type="monotone" dataKey="usage" stroke="#2563eb" strokeWidth={2} />
// // //                 </LineChart>
// // //               </ResponsiveContainer>
// // //             </div>
// // //           </Card>

// // //           {/* Project Timeline */}
// // //           <Card className="p-6 col-span-1 md:col-span-2">
// // //             <h2 className="text-lg font-semibold mb-4">Project Timeline</h2>
// // //             <div className="space-y-4">
// // //               {[
// // //                 { week: 1, task: 'Identify working team', owner: 'Cecil Folk' },
// // //                 { week: 1, task: 'Kickoff meeting', owner: 'Lydia Bauer' },
// // //                 { week: '2-4', task: 'Customer research', owner: 'Aadi Kapoor' },
// // //                 { week: '2-3', task: 'Proposal outline', owner: 'Lydia Bauer' },
// // //                 { week: 3, task: 'Write proposal', owner: 'Aadi Kapoor' },
// // //                 { week: 4, task: 'Internal approvals', owner: 'Cecil Folk' },
// // //                 { week: 5, task: 'Submit proposal', owner: 'Kai Larsson' }
// // //               ].map((item, index) => (
// // //                 <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
// // //                   <div className="flex items-center space-x-4">
// // //                     <span className="text-sm font-medium">Week {item.week}</span>
// // //                     <span className="text-gray-700">{item.task}</span>
// // //                   </div>
// // //                   <div className="flex items-center space-x-2">
// // //                     <span className="text-sm text-gray-500">{item.owner}</span>
// // //                     <ChevronRight className="w-4 h-4 text-gray-400" />
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </Card>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default CollaborativeCanvas;







// // // 'use client';

// // // import React, { useEffect, useState } from 'react';
// // // import { useStore } from '@/store';
// // // import dynamic from 'next/dynamic';
// // // import { User, Canvas as CanvasType, Message } from '@/types';

// // // // Dynamically import heavy components
// // // const Canvas = dynamic(() => import('@/components/Canvas').then(mod => mod.Canvas), {
// // //   ssr: false,
// // //   loading: () => (
// // //     <div className="flex items-center justify-center h-screen">
// // //       <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
// // //     </div>
// // //   )
// // // });

// // // const Chat = dynamic(() => import('@/components/Chat').then(mod => mod.Chat), {
// // //   ssr: false
// // // });

// // // // Mock initial data (replace with actual data fetching)
// // // const mockUser: User = {
// // //   id: '1',
// // //   name: 'Test User',
// // //   avatar: '/api/placeholder/32/32'
// // // };

// // // const mockCanvas: CanvasType = {
// // //   id: '1',
// // //   title: 'EV Charging Station Analysis',
// // //   elements: [],
// // //   collaborators: [mockUser],
// // //   createdAt: new Date(),
// // //   updatedAt: new Date()
// // // };

// // // export default function BrainPage() {
// // //   const { setCurrentUser, setActiveCanvas, isLoading, error } = useStore();
// // //   const [sidebarOpen, setSidebarOpen] = useState(true);

// // //   useEffect(() => {
// // //     // Initialize user and canvas
// // //     setCurrentUser(mockUser);
// // //     setActiveCanvas(mockCanvas);

// // //     // Simulate WebSocket connection for real-time collaboration
// // //     const ws = new WebSocket('wss://mock-websocket-url');
    
// // //     ws.onmessage = (event) => {
// // //       const data = JSON.parse(event.data);
// // //       // Handle different types of real-time updates
// // //       switch (data.type) {
// // //         case 'cursor_update':
// // //           // Update collaborator cursor positions
// // //           break;
// // //         case 'canvas_update':
// // //           // Update canvas elements
// // //           break;
// // //         case 'new_message':
// // //           // Handle new chat messages
// // //           break;
// // //       }
// // //     };

// // //     return () => {
// // //       ws.close();
// // //     };
// // //   }, [setCurrentUser, setActiveCanvas]);

// // //   // Error handling
// // //   if (error) {
// // //     return (
// // //       <div className="flex items-center justify-center h-screen">
// // //         <div className="bg-red-50 p-4 rounded-lg">
// // //           <h3 className="text-red-800 font-medium">Error</h3>
// // //           <p className="text-red-600">{error}</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="flex h-screen overflow-hidden bg-gray-50">
// // //       {/* Sidebar */}
// // //       <div
// // //         className={`${
// // //           sidebarOpen ? 'w-80' : 'w-0'
// // //         } transition-all duration-300 ease-in-out bg-white border-r`}
// // //       >
// // //         <div className="h-full flex flex-col">
// // //           {/* Chat Interface */}
// // //           <div className="flex-1 overflow-hidden">
// // //             <Chat />
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Main Content */}
// // //       <div className="flex-1 flex flex-col overflow-hidden">
// // //         {/* Toolbar */}
// // //         <div className="h-16 bg-white border-b px-4 flex items-center justify-between">
// // //           <div className="flex items-center space-x-4">
// // //             <button
// // //               onClick={() => setSidebarOpen(!sidebarOpen)}
// // //               className="p-2 hover:bg-gray-100 rounded-lg"
// // //             >
// // //               <svg
// // //                 className="w-6 h-6"
// // //                 fill="none"
// // //                 stroke="currentColor"
// // //                 viewBox="0 0 24 24"
// // //               >
// // //                 <path
// // //                   strokeLinecap="round"
// // //                   strokeLinejoin="round"
// // //                   strokeWidth={2}
// // //                   d={sidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
// // //                 />
// // //               </svg>
// // //             </button>
// // //             <h1 className="text-xl font-semibold">EV Charging Station Analysis</h1>
// // //           </div>

// // //           {/* Collaboration Info */}
// // //           <div className="flex items-center space-x-2">
// // //             {mockCanvas.collaborators.map((user) => (
// // //               <div
// // //                 key={user.id}
// // //                 className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm"
// // //                 title={user.name}
// // //               >
// // //                 {user.name[0]}
// // //               </div>
// // //             ))}
// // //             <button className="p-2 hover:bg-gray-100 rounded-lg">
// // //               <svg
// // //                 className="w-6 h-6"
// // //                 fill="none"
// // //                 stroke="currentColor"
// // //                 viewBox="0 0 24 24"
// // //               >
// // //                 <path
// // //                   strokeLinecap="round"
// // //                   strokeLinejoin="round"
// // //                   strokeWidth={2}
// // //                   d="M12 6v6m0 0v6m0-6h6m-6 0H6"
// // //                 />
// // //               </svg>
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Canvas Area */}
// // //         <div className="flex-1 overflow-hidden">
// // //           <Canvas />
// // //         </div>
// // //       </div>

// // //       {/* Loading Overlay */}
// // //       {isLoading && (
// // //         <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
// // //           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }



// // // 'use client';

// // // import React, { useEffect, useState } from 'react';
// // // import dynamic from 'next/dynamic';

// // // // Types
// // // interface User {
// // //   id: string;
// // //   name: string;
// // //   avatar?: string;
// // // }

// // // interface Canvas {
// // //   id: string;
// // //   title: string;
// // //   elements: any[];
// // //   collaborators: User[];
// // //   createdAt: Date;
// // //   updatedAt: Date;
// // // }

// // // // Mock data
// // // const mockUser: User = {
// // //   id: '1',
// // //   name: 'Test User',
// // //   avatar: '/api/placeholder/32/32'
// // // };

// // // const mockCanvas: Canvas = {
// // //   id: '1',
// // //   title: 'EV Charging Station Analysis',
// // //   elements: [],
// // //   collaborators: [mockUser],
// // //   createdAt: new Date(),
// // //   updatedAt: new Date()
// // // };

// // // // Component
// // // function BrainPage() {
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [error, setError] = useState<string | null>(null);
// // //   const [sidebarOpen, setSidebarOpen] = useState(true);
// // //   const [currentUser, setCurrentUser] = useState<User | null>(null);
// // //   const [activeCanvas, setActiveCanvas] = useState<Canvas | null>(null);

// // //   useEffect(() => {
// // //     // Initialize user and canvas
// // //     setCurrentUser(mockUser);
// // //     setActiveCanvas(mockCanvas);

// // //     // Simulate WebSocket connection
// // //     const connectWebSocket = () => {
// // //       try {
// // //         const ws = new WebSocket('wss://mock-websocket-url');
        
// // //         ws.onmessage = (event) => {
// // //           const data = JSON.parse(event.data);
// // //           switch (data.type) {
// // //             case 'cursor_update':
// // //               // Handle cursor updates
// // //               break;
// // //             case 'canvas_update':
// // //               // Handle canvas updates
// // //               break;
// // //             case 'new_message':
// // //               // Handle new messages
// // //               break;
// // //           }
// // //         };

// // //         return () => {
// // //           ws.close();
// // //         };
// // //       } catch (error) {
// // //         console.error('WebSocket connection failed:', error);
// // //       }
// // //     };

// // //     connectWebSocket();
// // //   }, []);

// // //   // Error handling
// // //   if (error) {
// // //     return (
// // //       <div className="flex items-center justify-center h-screen">
// // //         <div className="bg-red-50 p-4 rounded-lg">
// // //           <h3 className="text-red-800 font-medium">Error</h3>
// // //           <p className="text-red-600">{error}</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="flex h-screen overflow-hidden bg-gray-50">
// // //       {/* Sidebar */}
// // //       <div
// // //         className={`${
// // //           sidebarOpen ? 'w-80' : 'w-0'
// // //         } transition-all duration-300 ease-in-out bg-white border-r`}
// // //       >
// // //         <div className="h-full flex flex-col">
// // //           {/* Chat Interface Placeholder */}
// // //           <div className="flex-1 overflow-hidden p-4">
// // //             <h2 className="text-lg font-semibold mb-4">Chat</h2>
// // //             {/* Chat component will be implemented here */}
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Main Content */}
// // //       <div className="flex-1 flex flex-col overflow-hidden">
// // //         {/* Toolbar */}
// // //         <div className="h-16 bg-white border-b px-4 flex items-center justify-between">
// // //           <div className="flex items-center space-x-4">
// // //             <button
// // //               onClick={() => setSidebarOpen(!sidebarOpen)}
// // //               className="p-2 hover:bg-gray-100 rounded-lg"
// // //             >
// // //               <svg
// // //                 className="w-6 h-6"
// // //                 fill="none"
// // //                 stroke="currentColor"
// // //                 viewBox="0 0 24 24"
// // //               >
// // //                 <path
// // //                   strokeLinecap="round"
// // //                   strokeLinejoin="round"
// // //                   strokeWidth={2}
// // //                   d={sidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
// // //                 />
// // //               </svg>
// // //             </button>
// // //             <h1 className="text-xl font-semibold">
// // //               {activeCanvas?.title || 'EV Charging Station Analysis'}
// // //             </h1>
// // //           </div>

// // //           {/* Collaboration Info */}
// // //           <div className="flex items-center space-x-2">
// // //             {activeCanvas?.collaborators.map((user) => (
// // //               <div
// // //                 key={user.id}
// // //                 className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm"
// // //                 title={user.name}
// // //               >
// // //                 {user.name[0]}
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         {/* Canvas Area */}
// // //         <div className="flex-1 overflow-hidden p-4">
// // //           <div className="h-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
// // //             <p className="text-gray-500">Canvas workspace will be implemented here</p>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Loading Overlay */}
// // //       {isLoading && (
// // //         <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
// // //           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default BrainPage;




// // // 'use client';

// // // import React, { useEffect, useState } from 'react';
// // // import Canvas from '@/components/Canvas';
// // // import Chat from '@/components/Chat';
// // // import { ChartComponent } from '@/components/Chart';
// // // import { create } from 'zustand';

// // // // Types
// // // interface Message {
// // //   id: string;
// // //   content: string;
// // //   type: 'user' | 'ai';
// // //   timestamp: Date;
// // // }

// // // interface CanvasElement {
// // //   id: string;
// // //   type: 'text' | 'code' | 'chart' | 'diagram' | 'table';
// // //   content: any;
// // //   position: { x: number; y: number };
// // // }

// // // interface User {
// // //   id: string;
// // //   name: string;
// // //   avatar?: string;
// // // }

// // // // Store
// // // interface BrainState {
// // //   messages: Message[];
// // //   canvasElements: CanvasElement[];
// // //   isLoading: boolean;
// // //   error: string | null;
// // //   addMessage: (message: Message) => void;
// // //   addCanvasElement: (element: CanvasElement) => void;
// // //   updateCanvasElement: (id: string, updates: Partial<CanvasElement>) => void;
// // //   removeCanvasElement: (id: string) => void;
// // //   setLoading: (loading: boolean) => void;
// // //   setError: (error: string | null) => void;
// // // }

// // // const useBrainStore = create<BrainState>((set) => ({
// // //   messages: [],
// // //   canvasElements: [],
// // //   isLoading: false,
// // //   error: null,
// // //   addMessage: (message) =>
// // //     set((state) => ({ messages: [...state.messages, message] })),
// // //   addCanvasElement: (element) =>
// // //     set((state) => ({ canvasElements: [...state.canvasElements, element] })),
// // //   updateCanvasElement: (id, updates) =>
// // //     set((state) => ({
// // //       canvasElements: state.canvasElements.map((el) =>
// // //         el.id === id ? { ...el, ...updates } : el
// // //       ),
// // //     })),
// // //   removeCanvasElement: (id) =>
// // //     set((state) => ({
// // //       canvasElements: state.canvasElements.filter((el) => el.id !== id),
// // //     })),
// // //   setLoading: (loading) => set({ isLoading: loading }),
// // //   setError: (error) => set({ error }),
// // // }));

// // // // Main Component
// // // export default function BrainPage() {
// // //   const {
// // //     messages,
// // //     canvasElements,
// // //     isLoading,
// // //     error,
// // //     addMessage,
// // //     addCanvasElement,
// // //     updateCanvasElement,
// // //     removeCanvasElement,
// // //     setLoading,
// // //     setError,
// // //   } = useBrainStore();

// // //   const [sidebarOpen, setSidebarOpen] = useState(true);

// // //   // Handle sending messages to AI
// // //   const handleSendMessage = async (content: string) => {
// // //     // Add user message
// // //     const userMessage: Message = {
// // //       id: crypto.randomUUID(),
// // //       content,
// // //       type: 'user',
// // //       timestamp: new Date(),
// // //     };
// // //     addMessage(userMessage);
// // //     setLoading(true);

// // //     try {
// // //       // Call AI API
// // //       const response = await fetch('/api/chat', {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         body: JSON.stringify({ message: content }),
// // //       });

// // //       if (!response.ok) throw new Error('AI response failed');

// // //       const data = await response.json();

// // //       // Add AI response
// // //       const aiMessage: Message = {
// // //         id: crypto.randomUUID(),
// // //         content: data.response,
// // //         type: 'ai',
// // //         timestamp: new Date(),
// // //       };
// // //       addMessage(aiMessage);

// // //       // If the response includes canvas elements, add them
// // //       if (data.canvasElements) {
// // //         data.canvasElements.forEach((element: CanvasElement) => {
// // //           addCanvasElement(element);
// // //         });
// // //       }
// // //     } catch (err) {
// // //       setError(err instanceof Error ? err.message : 'Failed to get AI response');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Handle canvas element updates
// // //   const handleElementUpdate = (id: string, updates: Partial<CanvasElement>) => {
// // //     updateCanvasElement(id, updates);
// // //   };

// // //   if (error) {
// // //     return (
// // //       <div className="flex items-center justify-center h-screen">
// // //         <div className="bg-red-50 p-4 rounded-lg">
// // //           <h3 className="text-red-800 font-medium">Error</h3>
// // //           <p className="text-red-600">{error}</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="flex h-screen overflow-hidden bg-gray-50">
// // //       {/* Sidebar with Chat */}
// // //       <div
// // //         className={`${
// // //           sidebarOpen ? 'w-80' : 'w-0'
// // //         } transition-all duration-300 ease-in-out bg-white border-r`}
// // //       >
// // //         <div className="h-full flex flex-col">
// // //           <Chat
// // //             messages={messages}
// // //             onSendMessage={handleSendMessage}
// // //             isLoading={isLoading}
// // //           />
// // //         </div>
// // //       </div>

// // //       {/* Main Content */}
// // //       <div className="flex-1 flex flex-col overflow-hidden">
// // //         {/* Toolbar */}
// // //         <div className="h-16 bg-white border-b px-4 flex items-center justify-between">
// // //           <div className="flex items-center space-x-4">
// // //             <button
// // //               onClick={() => setSidebarOpen(!sidebarOpen)}
// // //               className="p-2 hover:bg-gray-100 rounded-lg"
// // //             >
// // //               <svg
// // //                 className="w-6 h-6"
// // //                 fill="none"
// // //                 stroke="currentColor"
// // //                 viewBox="0 0 24 24"
// // //               >
// // //                 <path
// // //                   strokeLinecap="round"
// // //                   strokeLinejoin="round"
// // //                   strokeWidth={2}
// // //                   d={sidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
// // //                 />
// // //               </svg>
// // //             </button>
// // //             <h1 className="text-xl font-semibold">EV Charging Station Analysis</h1>
// // //           </div>
// // //         </div>

// // //         {/* Canvas Area */}
// // //         <div className="flex-1 overflow-hidden">
// // //           <Canvas
// // //             elements={canvasElements}
// // //             onElementAdd={addCanvasElement}
// // //             onElementUpdate={handleElementUpdate}
// // //             onElementRemove={removeCanvasElement}
// // //           />
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }



// // // app/application/brain/page.tsx
// // 'use client';

// // import React, { useEffect, useState, useCallback } from 'react';
// // import dynamic from 'next/dynamic';
// // import { Split } from '@geoffcox/react-splitter';
// // import { create } from 'zustand';
// // import _ from 'lodash';
// // import { wsService } from '@/lib/websocket';

// // // Rich component imports
// // const Chat = dynamic(() => import('@/components/Chat'), {
// //   loading: () => <div className="animate-pulse h-full bg-gray-100" />
// // });

// // const Canvas = dynamic(() => import('@/components/Canvas'), {
// //   ssr: false,
// //   loading: () => (
// //     <div className="flex items-center justify-center h-full">
// //       <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent" />
// //     </div>
// //   )
// // });

// // // Extended Types for rich features
// // interface Message {
// //   id: string;
// //   content: string;
// //   type: 'user' | 'ai';
// //   timestamp: Date;
// //   metadata?: {
// //     confidence?: number;
// //     sources?: Array<{
// //       url: string;
// //       title: string;
// //       timestamp: string;
// //     }>;
// //   };
// // }

// // interface CanvasElement {
// //   id: string;
// //   type: 'text' | 'code' | 'chart' | 'diagram' | 'table' | 'mermaid' | 'meeting-transcript' | 'proposal';
// //   content: any;
// //   position: { x: number; y: number };
// //   size: { width: number; height: number };
// //   scale?: number;
// //   rotation?: number;
// //   selected?: boolean;
// //   groupId?: string;
// //   metadata?: {
// //     source?: string;
// //     timestamp?: string;
// //     author?: string;
// //     version?: string;
// //     confidence?: number;
// //     lastModified?: string;
// //     createdBy?: string;
// //   };
// // }

// // interface Version {
// //   id: string;
// //   timestamp: string;
// //   author: string;
// //   changes: string;
// //   elements: CanvasElement[];
// // }

// // interface User {
// //   id: string;
// //   name: string;
// //   avatar?: string;
// //   lastActive?: string;
// //   status?: 'active' | 'idle' | 'offline';
// //   role?: 'editor' | 'viewer' | 'admin';
// // }

// // interface CursorPosition {
// //   x: number;
// //   y: number;
// //   timestamp: string;
// // }

// // // Enhanced Brain Store
// // interface BrainState {
// //   // Core state
// //   messages: Message[];
// //   canvasElements: CanvasElement[];
// //   isLoading: boolean;
// //   error: string | null;
  
// //   // Collaboration state
// //   activeUsers: User[];
// //   cursorPositions: Record<string, CursorPosition>;
// //   collaborators: User[];
  
// //   // Version control
// //   versions: Version[];
// //   currentVersion: string;
  
// //   // UI state
// //   scale: number;
// //   viewMode: 'edit' | 'view' | 'present';
// //   gridVisible: boolean;
// //   snapToGrid: boolean;
  
// //   // Canvas groups
// //   groups: {
// //     id: string;
// //     name: string;
// //     elementIds: string[];
// //   }[];

// //   // Actions
// //   addMessage: (message: Message) => void;
// //   addCanvasElement: (element: CanvasElement) => void;
// //   updateCanvasElement: (id: string, updates: Partial<CanvasElement>) => void;
// //   removeCanvasElement: (id: string) => void;
// //   updateCursorPosition: (userId: string, position: CursorPosition) => void;
// //   addCollaborator: (user: User) => void;
// //   createVersion: (author: string, changes: string) => void;
// //   switchVersion: (versionId: string) => void;
// //   setLoading: (loading: boolean) => void;
// //   setError: (error: string | null) => void;
// // }

// // const useBrainStore = create<BrainState>((set, get) => ({
// //   // Initialize all state
// //   messages: [],
// //   canvasElements: [],
// //   isLoading: false,
// //   error: null,
// //   activeUsers: [],
// //   cursorPositions: {},
// //   collaborators: [],
// //   versions: [],
// //   currentVersion: '',
// //   scale: 1,
// //   viewMode: 'edit',
// //   gridVisible: true,
// //   snapToGrid: true,
// //   groups: [],

// //   // Implement all actions
// //   addMessage: (message) =>
// //     set((state) => ({ messages: [...state.messages, message] })),
    
// //   addCanvasElement: (element) => {
// //     const newElement = {
// //       ...element,
// //       metadata: {
// //         ...element.metadata,
// //         createdBy: 'current-user',
// //         timestamp: new Date().toISOString()
// //       }
// //     };
// //     set((state) => ({
// //       canvasElements: [...state.canvasElements, newElement]
// //     }));
// //     wsService.sendMessage('ELEMENT_ADD', { element: newElement });
// //   },

// //   updateCanvasElement: (id, updates) =>
// //     set((state) => ({
// //       canvasElements: state.canvasElements.map(el =>
// //         el.id === id ? {
// //           ...el,
// //           ...updates,
// //           metadata: {
// //             ...el.metadata,
// //             lastModified: new Date().toISOString()
// //           }
// //         } : el
// //       )
// //     })),

// //   removeCanvasElement: (id) =>
// //     set((state) => ({
// //       canvasElements: state.canvasElements.filter(el => el.id !== id)
// //     })),

// //   updateCursorPosition: (userId, position) =>
// //     set((state) => ({
// //       cursorPositions: {
// //         ...state.cursorPositions,
// //         [userId]: position
// //       }
// //     })),

// //   addCollaborator: (user) =>
// //     set((state) => ({
// //       collaborators: [...state.collaborators, user],
// //       activeUsers: [...state.activeUsers, user.id]
// //     })),

// //   createVersion: (author, changes) => {
// //     const newVersion = {
// //       id: crypto.randomUUID(),
// //       timestamp: new Date().toISOString(),
// //       author,
// //       changes,
// //       elements: get().canvasElements
// //     };
// //     set((state) => ({
// //       versions: [...state.versions, newVersion],
// //       currentVersion: newVersion.id
// //     }));
// //   },

// //   switchVersion: (versionId) => {
// //     const version = get().versions.find(v => v.id === versionId);
// //     if (version) {
// //       set({
// //         canvasElements: version.elements,
// //         currentVersion: versionId
// //       });
// //     }
// //   },

// //   setLoading: (loading) => set({ isLoading: loading }),
// //   setError: (error) => set({ error })
// // }));

// // export default function BrainPage() {
// //   const [sidebarOpen, setSidebarOpen] = useState(true);
// //   const store = useBrainStore();

// //   // Initialize WebSocket connection
// //   useEffect(() => {
// //     const ws = wsService.connect();
    
// //     ws.onmessage = (event) => {
// //       const data = JSON.parse(event.data);
// //       switch (data.type) {
// //         case 'CURSOR_UPDATE':
// //           store.updateCursorPosition(data.userId, data.position);
// //           break;
// //         case 'ELEMENT_ADD':
// //           store.addCanvasElement(data.element);
// //           break;
// //         case 'ELEMENT_UPDATE':
// //           store.updateCanvasElement(data.elementId, data.updates);
// //           break;
// //       }
// //     };

// //     return () => wsService.disconnect();
// //   }, []);

// //   // Enhanced message handler with research integration
// //   const handleSendMessage = async (content: string) => {
// //     const userMessage = {
// //       id: crypto.randomUUID(),
// //       content,
// //       type: 'user' as const,
// //       timestamp: new Date()
// //     };
// //     store.addMessage(userMessage);
// //     store.setLoading(true);

// //     try {
// //       // Research phase
// //       const researchResponse = await fetch('/api/research', {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ query: content })
// //       });

// //       if (!researchResponse.ok) throw new Error('Research failed');
// //       const researchData = await researchResponse.json();

// //       // Create visualizations based on research data
// //       if (researchData.daily_passengers || researchData.ev_parking_spaces) {
// //         store.addCanvasElement({
// //           id: crypto.randomUUID(),
// //           type: 'chart',
// //           content: {
// //             data: [
// //               { name: 'Daily Passengers', value: researchData.daily_passengers },
// //               { name: 'EV Spaces', value: researchData.ev_parking_spaces }
// //             ],
// //             type: 'bar'
// //           },
// //           position: { x: 100, y: 100 },
// //           size: { width: 400, height: 300 },
// //           metadata: {
// //             source: researchData.sources?.[0]?.url,
// //             timestamp: new Date().toISOString(),
// //             confidence: researchData.confidence
// //           }
// //         });
// //       }

// //       // Add AI response
// //       store.addMessage({
// //         id: crypto.randomUUID(),
// //         content: JSON.stringify(researchData),
// //         type: 'ai',
// //         timestamp: new Date(),
// //         metadata: {
// //           confidence: researchData.confidence,
// //           sources: researchData.sources
// //         }
// //       });

// //     } catch (err) {
// //       store.setError(err instanceof Error ? err.message : 'Failed to process research');
// //     } finally {
// //       store.setLoading(false);
// //     }
// //   };

// //   // Rich error display
// //   if (store.error) {
// //     return (
// //       <div className="flex items-center justify-center h-screen">
// //         <div className="bg-red-50 p-4 rounded-lg shadow-lg">
// //           <h3 className="text-red-800 font-medium">Error</h3>
// //           <p className="text-red-600">{store.error}</p>
// //           <button
// //             onClick={() => store.setError(null)}
// //             className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
// //           >
// //             Dismiss
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="flex h-screen overflow-hidden bg-gray-50">
// //       {/* Sidebar with Chat */}
// //       <div
// //         className={`${
// //           sidebarOpen ? 'w-80' : 'w-0'
// //         } transition-all duration-300 ease-in-out bg-white border-r`}
// //       >
// //         <div className="h-full flex flex-col">
// //           <Chat
// //             messages={store.messages}
// //             onSendMessage={handleSendMessage}
// //             isLoading={store.isLoading}
// //           />
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="flex-1 flex flex-col overflow-hidden">
// //         {/* Toolbar */}
// //         <div className="h-16 bg-white border-b px-4 flex items-center justify-between">
// //           <div className="flex items-center space-x-4">
// //             <button
// //               onClick={() => setSidebarOpen(!sidebarOpen)}
// //               className="p-2 hover:bg-gray-100 rounded-lg"
// //             >
// //               <svg
// //                 className="w-6 h-6"
// //                 fill="none"
// //                 stroke="currentColor"
// //                 viewBox="0 0 24 24"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth={2}
// //                   d={sidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
// //                 />
// //               </svg>
// //             </button>
// //             <h1 className="text-xl font-semibold">EV Charging Station Analysis</h1>
// //           </div>

// //           {/* Collaboration indicators */}
// //           <div className="flex items-center space-x-2">
// //             {store.collaborators.map(user => (
// //               <div
// //                 key={user.id}
// //                 className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white"
// //                 title={user.name}
// //               >
// //                 {user.name[0]}
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Canvas Area */}
// //         <div className="flex-1 overflow-hidden">
// //           <Canvas
// //             elements={store.canvasElements}
// //             onElementAdd={store.addCanvasElement}
// //             onElementUpdate={store.updateCanvasElement}
// //             onElementRemove={store.removeCanvasElement}
// //             scale={store.scale}
// //             viewMode={store.viewMode}
// //             gridVisible={store.gridVisible}
// //             snapToGrid={store.snapToGrid}
// //           />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // app/application/brain/page.tsx
// 'use client';

// import React, { useEffect, useState, useCallback } from 'react';
// import dynamic from 'next/dynamic';
// import { Split } from '@geoffcox/react-splitter';
// import { create } from 'zustand';
// import _ from 'lodash';
// import { wsService } from '@/lib/websocket';
// import AssistantUI from '@/components/Search';

// // Dynamically import components with loading states
// const Canvas = dynamic(() => import('@/components/Canvas'), {
//   ssr: false,
//   loading: () => (
//     <div className="flex items-center justify-center h-full">
//       <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent" />
//     </div>
//   )
// });

// const Chat = dynamic(() => import('@/components/Chat'), {
//   loading: () => <div className="animate-pulse h-full bg-gray-100" />
// });

// // Rich feature types from original prompt
// interface ResearchResponse {
//   daily_passengers?: number;
//   ev_parking_spaces?: number;
//   confidence?: number;
//   sources?: Array<{
//     url: string;
//     title: string;
//     timestamp: string;
//   }>;
//   competitors?: Array<{
//     name: string;
//     stations: number;
//     locations: string[];
//   }>;
//   requirements?: string[];
// }

// interface ProposalData {
//   generated_proposal: string;
//   metadata: {
//     author: string;
//     version: string;
//   };
// }

// // Canvas and Chat Types
// interface Message {
//   id: string;
//   content: string;
//   type: 'user' | 'ai' | 'system';
//   timestamp: Date;
//   metadata?: {
//     confidence?: number;
//     sources?: Array<{
//       url: string;
//       title: string;
//       timestamp: string;
//     }>;
//   };
// }

// interface CanvasElement {
//   id: string;
//   type: 'text' | 'code' | 'chart' | 'diagram' | 'table' | 'mermaid' | 'meeting-transcript' | 'proposal';
//   content: any;
//   position: { x: number; y: number };
//   size: { width: number; height: number };
//   scale?: number;
//   rotation?: number;
//   selected?: boolean;
//   groupId?: string;
//   metadata?: {
//     source?: string;
//     timestamp?: string;
//     author?: string;
//     version?: string;
//     confidence?: number;
//     lastModified?: string;
//   };
// }

// interface BrainState {
//   // Core state
//   messages: Message[];
//   canvasElements: CanvasElement[];
//   isLoading: boolean;
//   error: string | null;
  
//   // Rich features state
//   researchData: ResearchResponse | null;
//   proposalData: ProposalData | null;
//   collaborators: User[];
//   cursors: Record<string, { x: number; y: number; timestamp: string }>;
  
//   // Canvas state
//   scale: number;
//   viewMode: 'edit' | 'view' | 'present';
//   gridVisible: boolean;
//   snapToGrid: boolean;
  
//   // Actions
//   addMessage: (message: Message) => void;
//   addCanvasElement: (element: CanvasElement) => void;
//   updateCanvasElement: (id: string, updates: Partial<CanvasElement>) => void;
//   removeCanvasElement: (id: string) => void;
//   setResearchData: (data: ResearchResponse) => void;
//   setProposalData: (data: ProposalData) => void;
//   setLoading: (loading: boolean) => void;
//   setError: (error: string | null) => void;
// }

// const useBrainStore = create<BrainState>((set, get) => ({
//   // Initialize state
//   messages: [],
//   canvasElements: [],
//   isLoading: false,
//   error: null,
//   researchData: null,
//   proposalData: null,
//   collaborators: [],
//   cursors: {},
//   scale: 1,
//   viewMode: 'edit',
//   gridVisible: true,
//   snapToGrid: true,
  
//   // Core actions
//   addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
//   addCanvasElement: (element) => {
//     const newElement = {
//       ...element,
//       metadata: {
//         ...element.metadata,
//         timestamp: new Date().toISOString()
//       }
//     };
//     set((state) => ({ canvasElements: [...state.canvasElements, newElement] }));
//     wsService.sendMessage('ELEMENT_ADD', { element: newElement });
//   },
//   updateCanvasElement: (id, updates) => 
//     set((state) => ({
//       canvasElements: state.canvasElements.map(el =>
//         el.id === id ? { ...el, ...updates } : el
//       )
//     })),
//   removeCanvasElement: (id) =>
//     set((state) => ({
//       canvasElements: state.canvasElements.filter(el => el.id !== id)
//     })),
//   setResearchData: (data) => set({ researchData: data }),
//   setProposalData: (data) => set({ proposalData: data }),
//   setLoading: (loading) => set({ isLoading: loading }),
//   setError: (error) => set({ error })
// }));

// export default function BrainPage() {
//   const store = useBrainStore();
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   // Initialize WebSocket connection
//   useEffect(() => {
//     const ws = wsService.connect();
    
//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       switch (data.type) {
//         case 'ELEMENT_ADD':
//           store.addCanvasElement(data.element);
//           break;
//         case 'ELEMENT_UPDATE':
//           store.updateCanvasElement(data.elementId, data.updates);
//           break;
//       }
//     };

//     return () => wsService.disconnect();
//   }, []);

//   // Research integration
//   const handleResearch = async (query: string) => {
//     store.setLoading(true);
//     try {
//       // Call research API
//       const response = await fetch('/api/research', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ query })
//       });

//       if (!response.ok) throw new Error('Research failed');
//       const data = await response.json();

//       // Add research data to canvas
//       if (data.daily_passengers || data.ev_parking_spaces) {
//         store.addCanvasElement({
//           id: crypto.randomUUID(),
//           type: 'chart',
//           content: {
//             data: [
//               { name: 'Daily Passengers', value: data.daily_passengers },
//               { name: 'EV Spaces', value: data.ev_parking_spaces }
//             ],
//             type: 'bar'
//           },
//           position: { x: 100, y: 100 },
//           size: { width: 400, height: 300 },
//           metadata: {
//             source: data.sources?.[0]?.url,
//             timestamp: new Date().toISOString(),
//             confidence: data.confidence
//           }
//         });
//       }

//       store.setResearchData(data);
//       store.addMessage({
//         id: crypto.randomUUID(),
//         content: JSON.stringify(data),
//         type: 'ai',
//         timestamp: new Date(),
//         metadata: { confidence: data.confidence, sources: data.sources }
//       });
//     } catch (err) {
//       store.setError(err instanceof Error ? err.message : 'Research failed');
//     } finally {
//       store.setLoading(false);
//     }
//   };

//   return (
//     <div className="h-full flex flex-col">
//       {/* Assistant UI Integration */}
//       <div className="border-b border-gray-200">
//         <AssistantUI />
//       </div>

//       {/* Main Workspace */}
//       <div className="flex-1 overflow-hidden">
//         <Split
//           initialPrimarySize="30%"
//           minPrimarySize="20%"
//           minSecondarySize="40%"
//           className="h-full"
//         >
//           {/* Left panel - BizChat for AI research */}
//           <div className="h-full overflow-hidden">
//             <Chat
//               messages={store.messages}
//               onSendMessage={handleResearch}
//               isLoading={store.isLoading}
//             />
//           </div>

//           {/* Right panel - Canvas for collaboration */}
//           <div className="h-full overflow-hidden bg-gray-50">
//             <Canvas
//               elements={store.canvasElements}
//               onElementAdd={store.addCanvasElement}
//               onElementUpdate={store.updateCanvasElement}
//               onElementRemove={store.removeCanvasElement}
//               scale={store.scale}
//               viewMode={store.viewMode}
//               gridVisible={store.gridVisible}
//               snapToGrid={store.snapToGrid}
//             />
//           </div>
//         </Split>
//       </div>

//       {/* Error Display */}
//       {store.error && (
//         <div className="absolute bottom-4 right-4 bg-red-50 p-4 rounded-lg shadow-lg">
//           <h3 className="text-red-800 font-medium">Error</h3>
//           <p className="text-red-600">{store.error}</p>
//           <button
//             onClick={() => store.setError(null)}
//             className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
//           >
//             Dismiss
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }




//1223 3:58

// import React, { useEffect, useState, useCallback } from 'react';
// import dynamic from 'next/dynamic';
// import { Split } from '@geoffcox/react-splitter';
// import { create } from 'zustand';
// import _ from 'lodash';
// import { wsService } from '@/lib/websocket';
// import AssistantUI from '@/components/Search';

// // Maintain dynamic imports
// const Canvas = dynamic(() => import('@/components/Canvas'), {
//   ssr: false,
//   loading: () => (
//     <div className="flex items-center justify-center h-full">
//       <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent" />
//     </div>
//   )
// });

// const Chat = dynamic(() => import('@/components/Chat'), {
//   loading: () => <div className="animate-pulse h-full bg-gray-100" />
// });

// // Keep all original interfaces
// interface ResearchResponse {
//   daily_passengers?: number;
//   ev_parking_spaces?: number;
//   confidence?: number;
//   sources?: Array<{
//     url: string;
//     title: string;
//     timestamp: string;
//   }>;
//   competitors?: Array<{
//     name: string;
//     stations: number;
//     locations: string[];
//   }>;
//   requirements?: string[];
// }

// interface ProposalData {
//   generated_proposal: string;
//   metadata: {
//     author: string;
//     version: string;
//   };
// }

// interface Message {
//   id: string;
//   content: string;
//   type: 'user' | 'ai' | 'system';
//   timestamp: Date;
//   metadata?: {
//     confidence?: number;
//     sources?: Array<{
//       url: string;
//       title: string;
//       timestamp: string;
//     }>;
//   };
// }

// interface CanvasElement {
//   id: string;
//   type: 'text' | 'code' | 'chart' | 'diagram' | 'table' | 'mermaid' | 'meeting-transcript' | 'proposal';
//   content: any;
//   position: { x: number; y: number };
//   size: { width: number; height: number };
//   scale?: number;
//   rotation?: number;
//   selected?: boolean;
//   groupId?: string;
//   metadata?: {
//     source?: string;
//     timestamp?: string;
//     author?: string;
//     version?: string;
//     confidence?: number;
//     lastModified?: string;
//   };
// }

// // Maintain original store structure
// interface BrainState {
//   messages: Message[];
//   canvasElements: CanvasElement[];
//   isLoading: boolean;
//   error: string | null;
//   researchData: ResearchResponse | null;
//   proposalData: ProposalData | null;
//   collaborators: User[];
//   cursors: Record<string, { x: number; y: number; timestamp: string }>;
//   scale: number;
//   viewMode: 'edit' | 'view' | 'present';
//   gridVisible: boolean;
//   snapToGrid: boolean;
  
//   addMessage: (message: Message) => void;
//   addCanvasElement: (element: CanvasElement) => void;
//   updateCanvasElement: (id: string, updates: Partial<CanvasElement>) => void;
//   removeCanvasElement: (id: string) => void;
//   setResearchData: (data: ResearchResponse) => void;
//   setProposalData: (data: ProposalData) => void;
//   setLoading: (loading: boolean) => void;
//   setError: (error: string | null) => void;
// }

// const useBrainStore = create<BrainState>((set, get) => ({
//   messages: [],
//   canvasElements: [],
//   isLoading: false,
//   error: null,
//   researchData: null,
//   proposalData: null,
//   collaborators: [],
//   cursors: {},
//   scale: 1,
//   viewMode: 'edit',
//   gridVisible: true,
//   snapToGrid: true,
  
//   addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
//   addCanvasElement: (element) => {
//     const newElement = {
//       ...element,
//       metadata: {
//         ...element.metadata,
//         timestamp: new Date().toISOString()
//       }
//     };
//     set((state) => ({ canvasElements: [...state.canvasElements, newElement] }));
//     wsService.sendMessage('ELEMENT_ADD', { element: newElement });
//   },
//   updateCanvasElement: (id, updates) => 
//     set((state) => ({
//       canvasElements: state.canvasElements.map(el =>
//         el.id === id ? { ...el, ...updates } : el
//       )
//     })),
//   removeCanvasElement: (id) =>
//     set((state) => ({
//       canvasElements: state.canvasElements.filter(el => el.id !== id)
//     })),
//   setResearchData: (data) => set({ researchData: data }),
//   setProposalData: (data) => set({ proposalData: data }),
//   setLoading: (loading) => set({ isLoading: loading }),
//   setError: (error) => set({ error })
// }));

// export default function BrainPage() {
//   const store = useBrainStore();
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   // Maintain WebSocket integration
//   useEffect(() => {
//     const ws = wsService.connect();
    
//     ws.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       switch (data.type) {
//         case 'ELEMENT_ADD':
//           store.addCanvasElement(data.element);
//           break;
//         case 'ELEMENT_UPDATE':
//           store.updateCanvasElement(data.elementId, data.updates);
//           break;
//       }
//     };

//     return () => wsService.disconnect();
//   }, []);

//   // Keep research integration
//   const handleResearch = async (query: string) => {
//     store.setLoading(true);
//     try {
//       const response = await fetch('/api/research', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ query })
//       });

//       if (!response.ok) throw new Error('Research failed');
//       const data = await response.json();

//       if (data.daily_passengers || data.ev_parking_spaces) {
//         store.addCanvasElement({
//           id: crypto.randomUUID(),
//           type: 'chart',
//           content: {
//             data: [
//               { name: 'Daily Passengers', value: data.daily_passengers },
//               { name: 'EV Spaces', value: data.ev_parking_spaces }
//             ],
//             type: 'bar'
//           },
//           position: { x: 100, y: 100 },
//           size: { width: 400, height: 300 },
//           metadata: {
//             source: data.sources?.[0]?.url,
//             timestamp: new Date().toISOString(),
//             confidence: data.confidence
//           }
//         });
//       }

//       store.setResearchData(data);
//       store.addMessage({
//         id: crypto.randomUUID(),
//         content: JSON.stringify(data),
//         type: 'ai',
//         timestamp: new Date(),
//         metadata: { confidence: data.confidence, sources: data.sources }
//       });
//     } catch (err) {
//       store.setError(err instanceof Error ? err.message : 'Research failed');
//     } finally {
//       store.setLoading(false);
//     }
//   };

//   return (
//     <div className="h-full flex flex-col">
//       {/* Maintain Search Integration */}
//       <div className="border-b border-gray-200">
//         <AssistantUI />
//       </div>

//       {/* Main Workspace */}
//       <div className="flex-1 overflow-hidden">
//         <Split
//           initialPrimarySize="30%"
//           minPrimarySize="20%"
//           minSecondarySize="40%"
//           className="h-full"
//         >
//           {/* Chat Panel */}
//           <div className="h-full overflow-hidden">
//             <Chat
//               messages={store.messages}
//               onSendMessage={handleResearch}
//               isLoading={store.isLoading}
//             />
//           </div>

//           {/* Canvas Panel */}
//           <div className="h-full overflow-hidden bg-gray-50">
//             <Canvas
//               elements={store.canvasElements}
//               onElementAdd={store.addCanvasElement}
//               onElementUpdate={store.updateCanvasElement}
//               onElementRemove={store.removeCanvasElement}
//               scale={store.scale}
//               viewMode={store.viewMode}
//               gridVisible={store.gridVisible}
//               snapToGrid={store.snapToGrid}
//             />
//           </div>
//         </Split>
//       </div>

//       {/* Error Display */}
//       {store.error && (
//         <div className="absolute bottom-4 right-4 bg-red-50 p-4 rounded-lg shadow-lg">
//           <h3 className="text-red-800 font-medium">Error</h3>
//           <p className="text-red-600">{store.error}</p>
//           <button
//             onClick={() => store.setError(null)}
//             className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
//           >
//             Dismiss
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


//1222 4:22

'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Search } from '@/components/Search';
const { searchElements, updateSearchIndex } = useBrainStore();

import dynamic from 'next/dynamic';
import { Split } from '@geoffcox/react-splitter';
import { create } from 'zustand';
import _ from 'lodash';
import { wsService } from '@/lib/websocket';







// // Dynamic imports with proper client-side loading
// const Canvas = dynamic(
//   () => import('@/components/Canvas').then(mod => mod.default),
//   { ssr: false }
// );

// const Chat = dynamic(
//   () => import('@/components/Chat').then(mod => mod.default)
// );

const Canvas = dynamic(
  () => import('@/components/Canvas').then(mod => mod.default),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent" />
      </div>
    )
  }
);

const Chat = dynamic(
  () => import('@/components/Chat').then(mod => mod.default),
  {
    loading: () => <div className="animate-pulse h-full bg-gray-100" />
  }
);

// // Maintain dynamic imports
// const Canvas = dynamic(() => import('@/components/Canvas'), {
//   ssr: false,
//   loading: () => (
//     <div className="flex items-center justify-center h-full">
//       <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent" />
//     </div>
//   )
// });

// const Chat = dynamic(() => import('@/components/Chat'), {
//   loading: () => <div className="animate-pulse h-full bg-gray-100" />
// });


// // Keep all original interfaces
// interface ResearchResponse {
//   daily_passengers?: number;
//   ev_parking_spaces?: number;
//   confidence?: number;
//   sources?: Array<{
//     url: string;
//     title: string;
//     timestamp: string;
//   }>;
//   competitors?: Array<{
//     name: string;
//     stations: number;
//     locations: string[];
//   }>;
//   requirements?: string[];
// }

interface User {
  id: string;
  name: string;
  avatar?: string;
  lastActive?: string;
  status?: 'active' | 'idle' | 'offline';
  role?: 'editor' | 'viewer' | 'admin';
}

// Rest of the interfaces and type definitions stay the same
interface ResearchResponse {
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


interface ProposalData {
  generated_proposal: string;
  metadata: {
    author: string;
    version: string;
  };
}

interface Message {
  id: string;
  content: string;
  type: 'user' | 'ai' | 'system';
  timestamp: Date;
  metadata?: {
    confidence?: number;
    sources?: Array<{
      url: string;
      title: string;
      timestamp: string;
    }>;
  };
}

interface CanvasElement {
  id: string;
  type: 'text' | 'code' | 'chart' | 'diagram' | 'table' | 'mermaid' | 'meeting-transcript' | 'proposal';
  content: any;
  position: { x: number; y: number };
  size: { width: number; height: number };
  scale?: number;
  rotation?: number;
  selected?: boolean;
  groupId?: string;
  metadata?: {
    source?: string;
    timestamp?: string;
    author?: string;
    version?: string;
    confidence?: number;
    lastModified?: string;
  };
}

// Maintain original store structure
interface BrainState {
  // Existing state
  messages: Message[];
  canvasElements: CanvasElement[];
  isLoading: boolean;
  error: string | null;
  researchData: ResearchResponse | null;
  proposalData: ProposalData | null;
  collaborators: User[];
  cursors: Record<string, { x: number; y: number; timestamp: string }>;
  scale: number;
  viewMode: 'edit' | 'view' | 'present';
  gridVisible: boolean;
  snapToGrid: boolean;
  
  // Search-specific state
  searchMode: 'search' | 'research';
  searchQuery: string;
  searchResults: SearchResult[];
  searchIndex: Record<string, any>;
  
  // Existing actions
  addMessage: (message: Message) => void;
  addCanvasElement: (element: CanvasElement) => void;
  updateCanvasElement: (id: string, updates: Partial<CanvasElement>) => void;
  removeCanvasElement: (id: string) => void;
  setResearchData: (data: ResearchResponse) => void;
  setProposalData: (data: ProposalData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Search actions
  setSearchMode: (mode: 'search' | 'research') => void;
  setSearchQuery: (query: string) => void;
  updateSearchIndex: (content: any) => void;
  searchElements: (query: string) => SearchResult[];
  performSearch: (query: string) => Promise<void>;
}

// Add search result interface
interface SearchResult {
  id: string;
  type: string;
  title: string;
  content: any;
  timestamp: string;
}

const useBrainStore = create<BrainState>((set, get) => ({
  // Existing state
  messages: [],
  canvasElements: [],
  isLoading: false,
  error: null,
  researchData: null,
  proposalData: null,
  collaborators: [],
  cursors: {},
  scale: 1,
  viewMode: 'edit',
  gridVisible: true,
  snapToGrid: true,
  
  // Search state
  searchMode: 'search',
  searchQuery: '',
  searchResults: [],
  searchIndex: {},
  
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  addCanvasElement: (element) => {
    const newElement = {
      ...element,
      metadata: {
        ...element.metadata,
        timestamp: new Date().toISOString()
      }
    };
    set((state) => ({ canvasElements: [...state.canvasElements, newElement] }));
    wsService.sendMessage('ELEMENT_ADD', { element: newElement });
  },
  updateCanvasElement: (id, updates) => 
    set((state) => ({
      canvasElements: state.canvasElements.map(el =>
        el.id === id ? { ...el, ...updates } : el
      )
    })),
  removeCanvasElement: (id) =>
    set((state) => ({
      canvasElements: state.canvasElements.filter(el => el.id !== id)
    })),
  setResearchData: (data) => set({ researchData: data }),
  setProposalData: (data) => set({ proposalData: data }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  // Search actions implementation
  setSearchMode: (mode) => set({ searchMode: mode }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  updateSearchIndex: (content) => {
    const textContent = JSON.stringify(content)
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ');
    
    const words = textContent.split(/\s+/).filter(Boolean);
    set((state) => ({
      searchIndex: {
        ...state.searchIndex,
        [content.id]: { words, text: textContent }
      }
    }));
  },

  searchElements: (query) => {
    const state = get();
    const searchTerms = query.toLowerCase().split(/\s+/);
    
    // Search through indexed content
    return Object.entries(state.searchIndex)
      .filter(([_, content]) => 
        searchTerms.every(term => content.text.includes(term))
      )
      .map(([id]) => {
        const element = state.canvasElements.find(el => el.id === id);
        return {
          id,
          type: element?.type || 'unknown',
          title: element?.metadata?.title || `${element?.type} element`,
          content: element?.content,
          timestamp: element?.metadata?.timestamp || new Date().toISOString()
        };
      });
  },

  performSearch: async (query) => {
    set({ isLoading: true });
    try {
      if (get().searchMode === 'research') {
        // Handle research mode
        const response = await fetch('/api/research', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query })
        });
        
        if (!response.ok) throw new Error('Research failed');
        const data = await response.json();
        set({ searchResults: [{
          id: crypto.randomUUID(),
          type: 'research',
          title: 'Research Results',
          content: data,
          timestamp: new Date().toISOString()
        }]});
      } else {
        // Handle regular search
        const results = get().searchElements(query);
        set({ searchResults: results });
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Search failed' });
    } finally {
      set({ isLoading: false });
    }
  }
}));




// export default function BrainPage() {
//   const store = useBrainStore();
//   const [sidebarOpen, setSidebarOpen] = useState(true);

// Client Component Wrapper
function BrainPageClient() {
  const store = useBrainStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Maintain WebSocket integration
  useEffect(() => {
    const ws = wsService.connect();
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case 'ELEMENT_ADD':
          store.addCanvasElement(data.element);
          break;
        case 'ELEMENT_UPDATE':
          store.updateCanvasElement(data.elementId, data.updates);
          break;
      }
    };

    return () => wsService.disconnect();
  }, []);

  // Keep research integration
  const handleResearch = async (query: string) => {
    store.setLoading(true);
    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      if (!response.ok) throw new Error('Research failed');
      const data = await response.json();

      if (data.daily_passengers || data.ev_parking_spaces) {
        store.addCanvasElement({
          id: crypto.randomUUID(),
          type: 'chart',
          content: {
            data: [
              { name: 'Daily Passengers', value: data.daily_passengers },
              { name: 'EV Spaces', value: data.ev_parking_spaces }
            ],
            type: 'bar'
          },
          position: { x: 100, y: 100 },
          size: { width: 400, height: 300 },
          metadata: {
            source: data.sources?.[0]?.url,
            timestamp: new Date().toISOString(),
            confidence: data.confidence
          }
        });
      }

      store.setResearchData(data);
      store.addMessage({
        id: crypto.randomUUID(),
        content: JSON.stringify(data),
        type: 'ai',
        timestamp: new Date(),
        metadata: { confidence: data.confidence, sources: data.sources }
      });
    } catch (err) {
      store.setError(err instanceof Error ? err.message : 'Research failed');
    } finally {
      store.setLoading(false);
    }
  };

//   return (
//     <div className="h-full flex flex-col">
//       {/* Maintain Search Integration */}
//       <div className="border-b border-gray-200">
//         <AssistantUI />
//       </div>

//       {/* Main Workspace */}
//       <div className="flex-1 overflow-hidden">
//         <Split
//           initialPrimarySize="30%"
//           minPrimarySize="20%"
//           minSecondarySize="40%"
//           className="h-full"
//         >
//           {/* Chat Panel */}
//           <div className="h-full overflow-hidden">
//             <Chat
//               messages={store.messages}
//               onSendMessage={handleResearch}
//               isLoading={store.isLoading}
//             />
//           </div>

//           {/* Canvas Panel */}
//           <div className="h-full overflow-hidden bg-gray-50">
//             <Canvas
//               elements={store.canvasElements}
//               onElementAdd={store.addCanvasElement}
//               onElementUpdate={store.updateCanvasElement}
//               onElementRemove={store.removeCanvasElement}
//               scale={store.scale}
//               viewMode={store.viewMode}
//               gridVisible={store.gridVisible}
//               snapToGrid={store.snapToGrid}
//             />
//           </div>
//         </Split>
//       </div>

//       {/* Error Display */}
//       {store.error && (
//         <div className="absolute bottom-4 right-4 bg-red-50 p-4 rounded-lg shadow-lg">
//           <h3 className="text-red-800 font-medium">Error</h3>
//           <p className="text-red-600">{store.error}</p>
//           <button
//             onClick={() => store.setError(null)}
//             className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
//           >
//             Dismiss
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


// Add back search handlers
const handleSearchResult = useCallback((result: SearchResult) => {
  if (result.type === 'research') {
    store.setResearchData(result.content);
    // Convert to canvas element if needed
    handleResearch(result.content);
  }
}, [store, handleResearch]);


 return (
    <div className="h-full flex flex-col">
      <div className="border-b border-gray-200">
        <Search 
          onResult={handleSearchResult}
          onUpdateIndex={store.updateSearchIndex}
          mode={store.searchMode}
        />
      </div>

    {/* Main Workspace */}
    <div className="flex-1 overflow-hidden">
      <Split
        initialPrimarySize="30%"
        minPrimarySize="20%"
        minSecondarySize="40%"
        className="h-full"
      >
        {/* Chat Panel */}
        <div className="h-full overflow-hidden">
          <Chat
            messages={store.messages}
            onSendMessage={handleResearch}
            isLoading={store.isLoading}
          />
        </div>

        {/* Canvas Panel */}
        <div className="h-full overflow-hidden bg-gray-50">
          <Canvas
            elements={store.canvasElements}
            onElementAdd={store.addCanvasElement}
            onElementUpdate={store.updateCanvasElement}
            onElementRemove={store.removeCanvasElement}
            scale={store.scale}
            viewMode={store.viewMode}
            gridVisible={store.gridVisible}
            snapToGrid={store.snapToGrid}
          />
        </div>
      </Split>
    </div>

    {/* Error Display */}
    {store.error && (
      <div className="absolute bottom-4 right-4 bg-red-50 p-4 rounded-lg shadow-lg">
        <h3 className="text-red-800 font-medium">Error</h3>
        <p className="text-red-600">{store.error}</p>
        <button
          onClick={() => store.setError(null)}
          className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
        >
          Dismiss
        </button>
      </div>
    )}
  </div>
);
}

// Export default function that returns the client component
export default function BrainPage() {
return <BrainPageClient />;
}