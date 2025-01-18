
// IDEA 6
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const messages = [
  "Prepare me for a meeting with KenGen on IoT Fuel management solution and Site sensors",
  "Plan a pre-sales survey with Eldoret Water",
  "Recommend an IoT SIM card profile with package",
  "Provision 500 sim-cards for Telematics use case",
  "What is the status of Alpha systems Smart Water Meter contracting",
  "Summarize IoT CoE Squad Teams stand up",
  "Update me on the status of the VT08 Video Telematics Devices tests/ validations",
  "Show me the AT Commands for FMB125 SMS/GPRS",
  "Pull a report from Salesforce of all the deals I closed last month and predict next month's numbers",
  "Analyze and debug Shangda (MajiSmart) integrations",
  "Show me list of pre-qualified Video Telematics Vendors",
  "Do a Market analysis and share a list of suppliers for Temp Tag Batteries",
  "Research the latest trends in Cyber Security for the last 6 months and prepare a report for our next product launch",
  "Summarize Q3 Cloud financial report",
  "Generate a usage report for our IoT devices in the past quarter",
  "Monitor stock levels and forecast demand for IoT devices to ensure optimal stock availability",
  "Confirm if the supplier is prequalified and review attached quote.",
  "Give me the total number of devices we have in our inventory",
  "Configure for me a GPS Tracking device",
  "Prepare an FAQ document on our IoT solutions for the customer support team",
  "Generate monthly performance reports for connected IoT devices",
  "Propose a maintenance schedule for our deployed GPS tracking devices",
  "Monitor our inventory of Temp Tag Batteries and set up automated reorder alerts",
  "Assist with preparing tender documents for large-scale IoT implementation",
  "Research local and international regulations for temperature-sensitive IoT devices",
  "Prepare a detailed report on the competition in the smart water metering market",
  "Draft a service-level agreement (SLA) for IoT device maintenance",
  "Assess the current market for 5G IoT solutions and share opportunities",
  "Research the best pricing and availability for Temp Tag Batteries",
  "Schedule a follow-up calls with the KQ to discuss the proposal",
  "Set up sales meeting with a prospective customer",
  "Draft personalized email replies to video customer inquiries",
  "Develop a training guide for field engineers on the new IoT devices",
  "Draft a technical specification document for a new IoT device"
];

const TypewriterText = ({ speed = 50 }) => {
  const [displayText, setDisplayText] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  

  useEffect(() => {
    let i = 0;
    const currentMessage = messages[messageIndex];
    
    const typingEffect = setInterval(() => {
      if (i <= currentMessage.length) {
        setDisplayText(currentMessage.slice(0, i));
        i++;
      } else {
        clearInterval(typingEffect);
        setTimeout(() => {
          setDisplayText('');
          setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 2000); // Wait 2 seconds before starting the next message
      }
    }, speed);

    return () => clearInterval(typingEffect);
  }, [messageIndex, speed]);

  return <span className="animate-pulse">{displayText || "Animation will appear here..."}</span>;
};


const GuruAIInterface = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white text-gray-800 font-sans">
      <div className="w-full lg:w-2/3 p-6 lg:p-12 flex flex-col justify-center">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 lg:mb-8 text-gray-800">
          GURU
          <span className="block text-xl lg:text-2xl font-normal mt-2 text-green-500">WORK AI COMPANION (FOR ME)</span>
        </h1>
        <div className="text-lg lg:text-xl text-gray-600 h-24 border-l-4 border-green-500 pl-4 bg-gray-100 rounded overflow-hidden">
          <TypewriterText speed={30} />
        </div>
      </div>


      {/* <div className="w-full lg:w-1/3 bg-gray-100 p-6 lg:p-12 flex flex-col justify-center items-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-8 lg:mb-12 text-green-500">TryGURU</h2>
        <div className="w-full max-w-xs space-y-4">
        <a 
        href="/login" 
        className="flex-1 bg-green-500 text-white py-3 px-6 rounded-full hover:bg-green-600 transition duration-300 text-lg font-semibold text-center"
      >
        Log in
      </a>   

          <a href="/signup" >          
            <button className="flex-1 bg-white text-green-500 border border-green-500 py-3 px-6 rounded-full hover:bg-green-50 transition duration-300 text-lg font-semibold text-center">
            Sign up
          </button>
          </a>

        </div>
      </div>
    </div> */}


<div className="w-full lg:w-1/3 bg-gray-100 p-6 lg:p-12 flex flex-col justify-center items-center">
  <h2 className="text-3xl lg:text-4xl font-bold mb-8 lg:mb-12 text-green-500">TryGURU</h2>
  <div className="w-full max-w-xs">
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
      <a 
        href="/login" 
        className="flex-1 bg-green-500 text-white py-3 px-6 rounded-full hover:bg-green-600 transition duration-300 text-lg font-semibold text-center"
      >
        Log in
      </a>
      <a href="/signup" className="flex-1">          
        <button className="w-full bg-white text-green-500 border border-green-500 py-3 px-6 rounded-full hover:bg-green-50 transition duration-300 text-lg font-semibold text-center">
          Sign up
        </button>
      </a>
    </div>
  </div>
</div>
</div>

  );
};

export default GuruAIInterface;




