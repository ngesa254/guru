// import React from 'react'

// const settings = () => {
//   return (
//     <div>settings</div>
//   )
// }

// export default settings






// TEST 1

"use client"
import React, { useState } from 'react';
import { SendHorizontal, Loader2, CheckCircle2, Circle, ChevronDown, ChevronUp, Copy, FileText, ThumbsUp, ThumbsDown, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const steps = [
  'Give me a moment...',
  'Analyzing the request...',
  'Searching relevant information...',
  'Reviewing...',
  'Generating the answer...'
];

export default function settings() {
  const [isLoading, setIsLoading] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [aiResponse, setAiResponse] = useState('');

  const startAnimation = async () => {
    setIsLoading(true);
    setVisibleSteps([]);
    setCurrentStep(0);
    setIsComplete(false);
    setIsExpanded(true);
    setAiResponse('');

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setVisibleSteps(prev => [...prev, steps[i]]);
      setCurrentStep(i);
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    setIsComplete(true);
    setIsExpanded(false);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setAiResponse('Safaricom Telematics Monthly Service is a vehicle tracking and fleet management solution offered by Safaricom, a leading telecommunications company in Kenya. This service provides businesses with real-time information about their vehicles, including location, speed, fuel consumption, and driver behavior. It helps companies optimize their fleet operations, improve safety, and reduce costs.');
    
    setIsLoading(false);
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md max-w-2xl mx-auto">
      <div className="text-xs text-gray-500 mb-4 text-center border-b border-gray-300 pb-2">July 9, 2024</div>
      <div className="relative mb-4">
        <input 
          type="text"
          placeholder="What can I help with?" 
          className="w-full bg-white text-gray-800 p-3 pr-12 rounded-lg shadow-sm"
          defaultValue="What is Safaricom Telematics Monthly Service?"
        />
        <button 
          onClick={startAnimation}
          disabled={isLoading}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <SendHorizontal className="h-4 w-4" />
          )}
        </button>
      </div>

      {(isLoading || isComplete) && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {isComplete && (
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-500 font-semibold flex items-center">
                5 Steps completed
                <button onClick={toggleExpand} className="text-blue-500 ml-2">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </span>
            </div>
          )}
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 flex items-center justify-center mr-4">
              <img 
                src="/zuri-icon.svg" 
                alt="AI Icon" 
                className="w-8 h-8" 
              />
            </div>
            <span className={isComplete ? "text-green-500 font-semibold flex items-center" : "text-gray-500"}>
              {isComplete ? (
                <>
                  <span className="text-xs text-gray-500 ml-2">12:55 PM</span>
                </>
              ) : "GURU is Processing..."}
            </span>
          </div>
          
          {isExpanded && (
            <ul className="space-y-3 mb-4">
              {visibleSteps.map((step, index) => (
                <li key={index} className="flex items-center">
                  {index < currentStep ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                  ) : (
                    <Circle className={`w-5 h-5 mr-2 ${index === currentStep ? 'text-blue-500 animate-pulse' : 'text-gray-300'}`} />
                  )}
                  <span className={index <= currentStep ? 'text-gray-700' : 'text-gray-400'}>
                    {step}
                  </span>
                </li>
              ))}
            </ul>
          )}
          
          {isComplete && aiResponse && (
            <div className="space-y-4 mt-4">
              <div className="bg-gray-50 p-4 rounded-md shadow-sm space-y-2">
                <div className="flex-grow">
                  <p className="text-gray-700">{aiResponse}</p>
                </div>
              </div>
              <div className="text-xs text-gray-600 mt-2">
                References: 
                <span className="inline-flex items-center">
                  <FileText size={12} className="mr-1" />
                  <a href="#" className="text-blue-600 underline">SKU Management Process and Guidelines</a>
                </span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(aiResponse)}>
                  <Copy className="w-4 h-4 text-gray-500" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="w-4 h-4 text-gray-500" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ThumbsDown className="w-4 h-4 text-gray-500" />
                </Button>
                <Button variant="ghost" size="sm">
                  <RotateCw className="w-4 h-4 text-gray-500" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
