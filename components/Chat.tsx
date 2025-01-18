
"use client"
import React, { useState, useEffect, FC } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkle, Compass, BrainCircuit, Weight, SendHorizontal, Loader2, Copy, User, Volume2, ThumbsUp, ThumbsDown, RotateCw } from "lucide-react";

interface ChatMessage {
  role: 'user' | 'ai'
  content: string
}

interface ChatUIProps {
  endpoint: string; // Define the endpoint prop type
} 

interface TypingTextProps {
  text?: string;
  typingSpeed?: number;
}

const TypingText: FC<TypingTextProps> = ({ text = "What can I help with?", typingSpeed = 20 }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    }
  }, [index, text, typingSpeed]);

  return <span>{displayText}</span>;
};

const ChatUI: FC<ChatUIProps> = ({ endpoint }) => {
  const [prompt, setPrompt] = useState("")
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  

  const handleSubmit = async () => {
    if (!prompt.trim()) return

    setIsLoading(true)
    const newUserMessage: ChatMessage = { role: 'user', content: prompt }
    setChatHistory(prev => [...prev, newUserMessage])

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      const data = await res.json()
      const newAIMessage: ChatMessage = { role: 'ai', content: data.generated_text }
      setChatHistory(prev => [...prev, newAIMessage])
      setPrompt("")
    } catch (error) {
      console.error('Error in API call:', error)
      const errorMessage: ChatMessage = { role: 'ai', content: "An error occurred while processing your request." }
      setChatHistory(prev => [...prev, errorMessage])
      console.log(endpoint)
    } finally {
      setIsLoading(false)
      console.log(endpoint)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log("Enter key pressed")
      handleSubmit()
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Text copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }

  const handleAction = (action: string, index: number) => {
    console.log(`Action ${action} triggered for message at index ${index}`);
    // Implement the logic for each action here
  }

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 text-gray-800 p-8 min-h-screen flex flex-col items-center justify-center">
      {chatHistory.length === 0 ? (
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2">
            <span className="text-green-500"><TypingText /></span>
          </h1>
        </div>
      ) : (
        <div className="space-y-4 mb-8 w-full max-w-2xl">
          <h2 className="text-2xl font-bold py-4 text-gray-800">GURU</h2>
          <div className="max-h-[60vh] overflow-y-auto space-y-4">
            {chatHistory.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2`}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center overflow-hidden ${message.role === 'user' ? 'bg-green-500' : 'bg-green-600'}`}>
                    <img
                      src={message.role === 'user' ? "/african.svg" : "/zuri-icon.svg"}
                      alt={message.role === 'user' ? "User Icon" : "AI Icon"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`bg-white p-4 rounded-md shadow-sm space-y-2 max-w-[80%] ${message.role === 'user' ? 'bg-green-50' : ''}`}>
                    <p className="text-gray-700">{message.content}</p>
                    {message.role === 'ai' && (
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleAction('Speak', index)}
                          className="h-8 w-8 hover:text-green-500"
                        >
                          <Volume2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(message.content)}
                          className="h-8 w-8 hover:text-green-500"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleAction('Like', index)}
                          className="h-8 w-8 hover:text-green-500"
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleAction('Dislike', index)}
                          className="h-8 w-8 hover:text-green-500"
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleAction('Regenerate', index)}
                          className="h-8 w-8 hover:text-green-500"
                        >
                          <RotateCw className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="relative w-full max-w-2xl">
        <Input 
          placeholder="Chat with GURU..." 
          className="w-full bg-white text-gray-800 p-3 pr-12 rounded-lg shadow-sm border-green-100 focus:ring-green-500 focus:border-green-500"
          value={prompt}
          onChange={(e) => {
            console.log("Prompt changed:", e.target.value)
            setPrompt(e.target.value)
          }}
          onKeyPress={handleKeyPress}
        />
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => {
            console.log("Submit button clicked")
            handleSubmit()
          }}
          disabled={isLoading}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-600"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <SendHorizontal className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      <p className="text-xs text-center text-gray-500 mt-4">
        GURU uses AI, so double-check its responses. 
        <a href="#" className="text-green-500 hover:text-green-600 underline">Safaricom Privacy Policy</a>
      </p>
    </div>
  )
}
export default ChatUI;