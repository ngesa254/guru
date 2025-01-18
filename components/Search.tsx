"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  Sparkle,
  Compass,
  BrainCircuit,
  Weight,
  SendHorizontal,
  ChevronDown,
  ChevronUp,
  Loader2,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCw,
  Volume2,
  FileText,
  CheckCircle2,
  Circle,
} from "lucide-react";
import useStore from '../app/store/useStore';

interface ChatMessage {
  role: "user" | "ai";
  content: string;
  reference: string;
  timestamp: string; // Store timestamp when the message is added
}

const steps = [
  "Give me a moment...",
  "Analyzing the request...",
  "Searching relevant information...",
  "Reviewing...",
  "Generating the answer...",
];

export default function AssistantUI() {
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState("");
  const firstName = useStore((state) => state.firstName);

  const getFormattedTimestamp = () => {
    const now = new Date();
    return now.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
  };

  const startLoadingSteps = async () => {
    setIsLoading(true);
    setVisibleSteps([]);
    setCurrentStep(0);
    setIsComplete(false);
    setIsExpanded(true);

    // Simulate step-by-step loading process
    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setVisibleSteps((prev) => [...prev, steps[i]]);
      setCurrentStep(i);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsComplete(true);
    setIsExpanded(false);
  };
  const toggleExpand = () => setIsExpanded(!isExpanded);
  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    const timestamp = getFormattedTimestamp(); // Capture timestamp
    setIsLoading(true);
    const newUserMessage: ChatMessage = { role: "user", content: prompt, reference: "", timestamp, };
    setChatHistory((prev) => [...prev, newUserMessage]);

    try {
      await startLoadingSteps(); // Start the loading steps

      const res = await fetch("/api/v1/Enterpise-AI-Search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
        // Extract the specific portion from verbose_output
        const verboseMatch = data.verbose_output.match(
          /Retrieval entering ([^:\n]+)/
        );
        const verboseContent = verboseMatch ? verboseMatch[0] : "No details found";
        

      const newAIMessage: ChatMessage = {
        role: "ai",
        content: data.generated_text,
        reference: verboseContent,
        timestamp: getFormattedTimestamp(), // Timestamp when AI responds
      };
      
       
      
      setChatHistory((prev) => [...prev, newAIMessage]);
      setPrompt("");
    } catch (error) {
      console.error("Error in API call:", error);
      const errorMessage: ChatMessage = {
        role: "ai",
        content: "An error occurred while processing your request.",
        reference: "No details found",
        timestamp: getFormattedTimestamp(), // Error timestamp
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = (content: string) => {
    console.log("Card clicked with content:", content);
    setPrompt(content);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
        // You can add a visual feedback here if needed
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const handleAction = (action: string, index: number) => {
    console.log(`${action} button clicked for message index:`, index);
    // You can implement your logic for each action here (e.g., Speak, Like, Dislike, Regenerate)
  };
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const formattedDateTime = now.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      });
      setCurrentDateTime(formattedDateTime);
    }, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  return (
    <div className="bg-gray-100 text-gray-800 p-8 min-h-screen">
      <div className="text-xs text-gray-500 mb-4 text-center border-b border-gray-300 pb-2">
        {currentDateTime}
      </div>
      {chatHistory.length === 0 ? (
        <>
          <h1 className="text-4xl mb-2">
            <span className="text-teal-600">Hello,</span>{' '}
            <span className="text-indigo-600">{firstName || 'User'}</span>
          </h1>
          <h2 className="text-2xl text-gray-600 mb-8">
            How can I help you today?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              onClick={() =>
                handleCardClick("What is Safaricom Telematics Monthly Service?")
              }
            >
              <CardContent className="flex flex-col items-start space-y-2">
                <p className="text-sm text-gray-700">
                  What is Safaricom Telematics Monthly Service?
                </p>
                <Sparkle className="text-amber-500" size={24} />
              </CardContent>
            </Card>
            <Card
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              onClick={() =>
                handleCardClick(
                  "I am selling Safaricom Cloud, Who do I talk to and what are their concerns?"
                )
              }
            >
              <CardContent className="flex flex-col items-start space-y-2">
                <p className="text-sm text-gray-700">
                  I am selling Safaricom Cloud, Who do I talk to and what are
                  their concerns?
                </p>
                <Compass className="text-sky-500" size={24} />
              </CardContent>
            </Card>
            <Card
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              onClick={() =>
                handleCardClick(
                  "Write for me an article about Safaricom Telematics"
                )
              }
            >
              <CardContent className="flex flex-col items-start space-y-2">
                <p className="text-sm text-gray-700">
                  Write for me an article about Safaricom Telematics
                </p>
                <BrainCircuit className="text-emerald-500" size={24} />
              </CardContent>
            </Card>
            <Card
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              onClick={() =>
                handleCardClick(
                  "How do I conduct an initial sales conversation with customers?"
                )
              }
            >
              <CardContent className="flex flex-col items-start space-y-2">
                <p className="text-sm text-gray-700">
                  How do I conduct an initial sales conversation with customers?
                </p>
                <Weight className="text-rose-500" size={24} />
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <div className="space-y-4 mb-8">
          <h2 className="text-2xl font-bold py-4 text-gray-800">AI Search</h2>
          <div className="max-h-[60vh] overflow-y-auto space-y-4">
            {chatHistory.map((message, index) => (
              <div key={index} className="flex justify-start">
                <div className="bg-white p-4 rounded-md shadow-sm space-y-2 max-w-[80%]">
                  <div className="flex items-start space-x-4">
                    {/* Display AI or User message */}
                    <div className="w-9 h-9 rounded-full flex items-center justify-center">
                      <Image
                        src={
                          message.role === "user"
                            ? "/african.svg"
                            : "/zuri-icon.svg"
                        }
                        alt={message.role === "user" ? "User Icon" : "AI Icon"}
                        width={36}
                        height={36}
                      />
                    </div>
                    <div className="flex-grow">
                      {message.role === "ai" && (
                        <div>
                          <span className="text-sm text-gray-500 ml-2">
                          {message.timestamp}
                          </span>
                          <div className="flex flex-col mb-2">
                            <div>
                              <span className="text-green-500 font-semibold flex items-center">
                                5 Steps completed
                                <button
                                  onClick={toggleExpand}
                                  className="text-blue-500 ml-2"
                                >
                                  {isExpanded ? (
                                    <ChevronUp className="w-5 h-5" />
                                  ) : (
                                    <ChevronDown className="w-5 h-5" />
                                  )}
                                </button>
                              </span>
                            </div>
                            <div>
                              {isExpanded && (
                                <ul className="space-y-3 mb-4">
                                  {visibleSteps.map((step, index) => (
                                    <li
                                      key={index}
                                      className="flex items-center"
                                    >
                                      {index < currentStep ? (
                                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                                      ) : (
                                        <Circle
                                          className={`w-5 h-5 mr-2 ${
                                            index === currentStep
                                              ? "text-blue-500 animate-pulse"
                                              : "text-gray-300"
                                          }`}
                                        />
                                      )}
                                      <span
                                        className={
                                          index <= currentStep
                                            ? "text-gray-700"
                                            : "text-gray-400"
                                        }
                                      >
                                        {step}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      <p className="text-gray-700">{message.content}</p>
                      {message.role === "ai" && (
                        <div className="text-xs text-gray-600 mt-2">
                          References:
                          <span className="inline-flex items-center">
                            <FileText size={12} className="mr-1" />
                            <a href="#" className="text-blue-600 underline">
                              {/* SKU Management Process and Guidelines */}
                              {message.reference}
                            </a>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {message.role === "ai" && (
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleAction("Speak", index)}
                        className="h-8 w-8"
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(message.content)}
                        className="h-8 w-8"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleAction("Like", index)}
                        className="h-8 w-8"
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleAction("Dislike", index)}
                        className="h-8 w-8"
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleAction("Regenerate", index)}
                        className="h-8 w-8"
                      >
                        <RotateCw className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Loading Step Indicator */}
          {isLoading && (
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 flex items-center justify-center mr-4">
                  <img src="/zuri-icon.svg" alt="AI Icon" className="w-8 h-8" />
                </div>
                <div className="text-gray-700">GURU is Processing...</div>
              </div>

              <ul className="space-y-2">
                {visibleSteps.map((step, index) => (
                  <li key={index} className="flex items-center">
                    {index < currentStep ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                    ) : (
                      <Circle
                        className={`w-5 h-5 mr-2 ${
                          index === currentStep
                            ? "text-blue-500 animate-pulse"
                            : "text-gray-300"
                        }`}
                      />
                    )}
                    <span
                      className={
                        index <= currentStep ? "text-gray-700" : "text-gray-400"
                      }
                    >
                      {step}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Input and Send Button */}
      <div className="relative">
        <Input
          placeholder="What can I help with?"
          className="w-full bg-white text-gray-800 p-3 pr-12 rounded-lg shadow-sm"
          value={prompt}
          onChange={(e) => {
            console.log("Prompt changed:", e.target.value);
            setPrompt(e.target.value);
          }}
          onKeyPress={handleKeyPress}
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            console.log("Submit button clicked");
            handleSubmit();
          }}
          disabled={isLoading}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
        >
          {isLoading ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            <SendHorizontal className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* footer */}
      <p className="text-xs text-center text-gray-500 mt-4">
        GURU can make mistakes, so double-check its responses.
        <a href="#" className="underline">
          Safaricom Privacy Policy
        </a>
      </p>
    </div>
  );
}
