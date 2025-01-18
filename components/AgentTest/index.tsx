"use client";
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AgentTest() {
  // Field Service agent capabilities
  const capabilities = [
    {
      title: "Troubleshooting",
      description: "Perform routine maintenance checks",
    },
    {
      title: "Installation support",
      description: "Assist by coordinating with contractors",
    },
    {
      title: "Site preparation",
      description: "Assess the suitability of charging locations",
    },
    {
      title: "Compliance and safety",
      description: "Comply with local safety regulations",
    },
    {
      title: "Inventory management",
      description: "Track inventory and connect with suppliers",
    },
    {
      title: "Documentation",
      description: "Record site visits and customer interactions",
    },
  ];

  const handleCreate = () => {
    // Implementation for creating the agent
    console.log("PUBLISH agent clicked");
  };

  const handleTestAgent = () => {
    // Implementation for testing the agent
    console.log("TEST AGENT clicked");
  };

  return (
    <Card className="bg-white h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-4">
                    <div>
            <h2 className="text-xl font-semibold">Agent Test</h2>
            <p className="text-gray-600">
              Test your agents before deployment
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        {/* Capabilities */}
        <div className="grid grid-cols-3 gap-4">
          {capabilities.map((cap, index) => (
            <div key={index} className="p-4 border rounded-lg bg-white shadow-sm">
              <h3 className="font-medium mb-2">{cap.title}</h3>
              <p className="text-sm text-gray-600">{cap.description}</p>
            </div>
          ))}
        </div>

        {/* Optional "Ask a work question" input */}
        <div className="mt-6">
          <Input
            placeholder="Ask questions or provide instructions to tests your agent"
            className="w-full"
          />
        </div>

        {/* PUBLISH & TEST AGENT buttons at bottom */}
        <div className="mt-6 flex items-center justify-end gap-4">
          <Button onClick={handleTestAgent} variant="secondary">
            TEST AGENT
          </Button>
          <Button onClick={handleCreate} variant="default">
            PUBLISH AGENT
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

