// "use client";

// import React, { useState, useEffect } from "react";
// import { Card, CardContent, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { ShoppingCart, HeadsetIcon, BarChart,Users,BookIcon,Target, Truck, CogIcon, ChevronDown, Plus, MoreHorizontal, Sparkles } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from 'next/navigation';

// interface GuruCardProps {
//   title: string;
//   description: string;
//   link: string;
//   Icon: React.ElementType;
//   iconColor: string;
//   isSelected: boolean;
//   onClick: () => void;
// }

// // const GuruCard: React.FC<GuruCardProps> = ({ title, description, link, Icon, iconColor, isSelected, onClick }) => (
//   const GuruCard: React.FC<GuruCardProps> = ({ title, description, link, Icon, iconColor, isSelected, onClick }) => (
//   <Card 
//     className={`bg-gray-50 hover:bg-gray-100 transition-all duration-300 cursor-pointer shadow-sm ${isSelected ? 'bg-sky-200' : ''}`}
//      onClick={onClick}
//   >
//     <CardContent className="p-6">
//       <div className="flex items-center justify-between mb-4">
//         <div className={`p-2 rounded-full ${iconColor}`}>
//           <Icon className="w-6 h-6 text-white" />
//         </div>
//         <MoreHorizontal className="text-gray-400" />
//       </div>
//       <CardTitle className="text-xl font-bold mb-2 text-gray-800">{title}</CardTitle>
//       <p className="text-gray-600">{description}</p>
//       {/* <Link href={link} passHref>
//         <button className="mt-4 flex items-center text-blue-600 font-semibold group text-2xl">
//           Explore
//           <span className="ml-2 inline-block transform group-hover:translate-x-6 transition-transform duration-300 text-4xl">
//             →
//           </span>
//         </button>
//       </Link> */}
//     </CardContent>
//   </Card>
// );

// const GURUManager: React.FC = () => {
//   const [showAll, setShowAll] = useState(false);
//   const [selectedGuru, setSelectedGuru] = useState<string | null>(null);
//   const router = useRouter(); // Initialize the router

//   const gurus = [
//     {
//       title: "Sales Assistant",
//       description: "Prep for meetings and access all the product knowledge, so you can close more deals.",
//       link: "/application/guru/SalesAssistant",
//       Icon: Sparkles,
//       iconColor: "bg-blue-400"
//     },
//     {
//       title: "Product Recommendations (Retail)",
//       description: "Close deals faster, accurately and put customer first.",
//       link: "/application/guru/RetailAssistant",
//       Icon: ShoppingCart,
//       iconColor: "bg-green-400"
//     },
//     {
//       title: "Customer Support (Call Centre + Insights)",
//       description: "Engage customers with speed and confidence.",
//       link: "/application/guru/CustomerSupport",
//       Icon: HeadsetIcon,
//       iconColor: "bg-purple-400"
//     },
//     {
//       title: "Engineering (Developer Experience + Daraja)",
//       // description: "Aggregate Intel from market and online for strategy and decision making.",
//       description: "Build best-in-class products with velocity.",
//       link: "/application/guru/CustomerInsights",
//       // Icon: BarChart,
//       Icon: CogIcon,
//       iconColor: "bg-orange-400",
//       // iconColor: "bg-blue-400",
//     },
//     {
//       title: "People (HR)",
//       description: "Streamline HR processes and enhance employee experience.",
//       link: "/application/guru/PeopleHR",
//       Icon: Users,
//       iconColor: "bg-indigo-400"
//     },
//     {
//       title: "Finance",
//       description: "Optimize financial operations and reporting.",
//       link: "/application/guru/Finance",
//       Icon: BookIcon,
//       iconColor: "bg-emerald-400"
//     },
//     {
//       title: "Marketing",
//       description: "Drive engagement and optimize marketing strategies.",
//       link: "/application/guru/Marketing",
//       Icon: Target,
//       iconColor: "bg-rose-400"
//     },
//     {
//       title: "Supply Chain",
//       description: "Enhance supply chain efficiency and management.",
//       link: "/application/guru/SupplyChain",
//       Icon: Truck,
//       iconColor: "bg-amber-400"
//     },
//   ];

//   const visibleGurus = showAll ? gurus : gurus.slice(0, 4);

//   useEffect(() => {
//     const handlePopState = () => {
//       const currentPath = window.location.pathname;
//       const guru = gurus.find(g => g.link === currentPath);
//       if (guru) {
//         setSelectedGuru(guru.link);
//       }
//     };

//     window.addEventListener('popstate', handlePopState);
//     handlePopState(); // Set initial state

//     return () => {
//       window.removeEventListener('popstate', handlePopState);
//     };
//   }, []);

//    const handleGuruClick = (link: string) => {
//      setSelectedGuru(link);
//      router.push(link);
//     //  window.history.pushState({}, '', link);
//      window.dispatchEvent(new Event('popstate'));
//    };

//   return (
//     <div className="min-h-screen bg-gray-50 p-10">
//       <h1 className="text-4xl font-bold mb-8 text-gray-800">GURU manager</h1>
      
//       <div className="mb-8">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-gray-700">Premade by Safaricom ML</h2>
//           <Button
//             variant="ghost"
//             className="text-blue-600 hover:text-blue-700"
//             onClick={() => setShowAll(!showAll)}
//           >
//             Show {showAll ? 'less' : 'more'} <ChevronDown className="ml-2" />
//           </Button>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {visibleGurus.map((guru, index) => (
//             <GuruCard
//               key={index}
//               title={guru.title}
//               description={guru.description}
//               link={guru.link}
//               Icon={guru.Icon}
//               iconColor={guru.iconColor}
//               isSelected={selectedGuru === guru.link}
//               onClick={() => handleGuruClick(guru.link)}
//             />
//           ))}
//         </div>
//       </div>
      
     

      
//     </div>
//   );
// };

// export default GURUManager;



"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, HeadsetIcon, BarChart, Users, BookIcon, Target, Truck, CogIcon, ChevronDown, Plus, MoreHorizontal, Sparkles, Lightbulb, Scale, ClipboardCheck, Shield, ShieldIcon,ListCheckIcon, GavelIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

interface GuruCardProps {
  title: string;
  description: string;
  link: string;
  Icon: React.ElementType;
  iconColor: string;
  isSelected: boolean;
  onClick: () => void;
}

// const GuruCard: React.FC<GuruCardProps> = ({ title, description, link, Icon, iconColor, isSelected, onClick }) => (
  const GuruCard: React.FC<GuruCardProps> = ({ title, description, link, Icon, iconColor, isSelected, onClick }) => (
  <Card 
    className={`bg-gray-50 hover:bg-gray-100 transition-all duration-300 cursor-pointer shadow-sm ${isSelected ? 'bg-sky-200' : ''}`}
     onClick={onClick}
  >
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-full ${iconColor}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <MoreHorizontal className="text-gray-400" />
      </div>
      <CardTitle className="text-xl font-bold mb-2 text-gray-800">{title}</CardTitle>
      <p className="text-gray-600">{description}</p>
      {/* <Link href={link} passHref>
        <button className="mt-4 flex items-center text-blue-600 font-semibold group text-2xl">
          Explore
          <span className="ml-2 inline-block transform group-hover:translate-x-6 transition-transform duration-300 text-4xl">
            →
          </span>
        </button>
      </Link> */}
    </CardContent>
  </Card>
);

const GURUManager: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedGuru, setSelectedGuru] = useState<string | null>(null);
  const router = useRouter(); // Initialize the router

  const gurus = [
    {
      title: "Sales Assistant",
      description: "Prep for meetings and access all the product knowledge, so you can close more deals.",
      link: "/application/guru/SalesAssistant",
      Icon: Sparkles,
      iconColor: "bg-blue-400"
    },
    {
      title: "Product Discovery",
      description: "Help users discover the perfect products based on their needs and preferences.",
      link: "/application/guru/ProductDiscovery",
      Icon: Lightbulb,
      iconColor: "bg-cyan-400"
    },
    {
      title: "Customer Support (Call Centre + Insights)",
      description: "Engage customers with speed and confidence.",
      link: "/application/guru/CustomerSupport",
      Icon: HeadsetIcon,
      iconColor: "bg-purple-400"
    },
    {
      title: "Engineering (Developer Experience)",
      // description: "Aggregate Intel from market and online for strategy and decision making.",
      description: "Build best-in-class products with velocity.",
      link: "/application/guru/CustomerInsights",
      // Icon: BarChart,
      Icon: CogIcon,
      iconColor: "bg-orange-400",
      // iconColor: "bg-blue-400",
    },
    {
      title: "People (HR)",
      description: "Streamline HR processes and enhance employee experience.",
      link: "/application/guru/PeopleHR",
      Icon: Users,
      iconColor: "bg-indigo-400"
    },
    {
      title: "Finance",
      description: "Optimize financial operations and reporting.",
      link: "/application/guru/Finance",
      Icon: BookIcon,
      iconColor: "bg-emerald-400"
    },
    {
      title: "Product Recommendations (Retail)",
      description: "Close deals faster, accurately and put customer first.",
      link: "/application/guru/RetailAssistant",
      Icon: ShoppingCart,
      iconColor: "bg-green-400"
    },
    {
      title: "Marketing",
      description: "Drive engagement and optimize marketing strategies.",
      link: "/application/guru/Marketing",
      Icon: Target,
      iconColor: "bg-rose-400"
    },
    {
      title: "Supply Chain",
      description: "Enhance supply chain efficiency and management.",
      link: "/application/guru/SupplyChain",
      Icon: Truck,
      iconColor: "bg-amber-400"
    },
    {
      title: "Legal",
      description: "Navigate legal complexities and ensure compliance.",
      link: "/application/guru/Legal",
      Icon: Scale,
      iconColor: "bg-slate-400"
    },
    {
      title: "Audit",
      description: "Ensure compliance and maintain operational excellence.",
      link: "/application/guru/Audit",
      Icon: ClipboardCheck,
      iconColor: "bg-zinc-400"
    },
    {
      title: "Security",
      description: "Protect assets and maintain robust security protocols.",
      link: "/application/guru/Security",
      Icon: Shield,
      iconColor: "bg-red-400"
    }  
  ];

  const visibleGurus = showAll ? gurus : gurus.slice(0, 4);

  useEffect(() => {
    const handlePopState = () => {
      const currentPath = window.location.pathname;
      const guru = gurus.find(g => g.link === currentPath);
      if (guru) {
        setSelectedGuru(guru.link);
      }
    };

    window.addEventListener('popstate', handlePopState);
    handlePopState(); // Set initial state

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

   const handleGuruClick = (link: string) => {
     setSelectedGuru(link);
     router.push(link);
    //  window.history.pushState({}, '', link);
     window.dispatchEvent(new Event('popstate'));
   };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">AgentVerse</h1>
      
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Premade by Safaricom ML</h2>
          <Button
            variant="ghost"
            className="text-blue-600 hover:text-blue-700"
            onClick={() => setShowAll(!showAll)}
          >
            Show {showAll ? 'less' : 'more'} <ChevronDown className="ml-2" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleGurus.map((guru, index) => (
            <GuruCard
              key={index}
              title={guru.title}
              description={guru.description}
              link={guru.link}
              Icon={guru.Icon}
              iconColor={guru.iconColor}
              isSelected={selectedGuru === guru.link}
              onClick={() => handleGuruClick(guru.link)}
            />
          ))}
        </div>
      </div>
      
     

      
    </div>
  );
};

export default GURUManager;