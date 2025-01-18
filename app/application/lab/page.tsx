"use client";
import React from "react";
import KazuriChat from "@/components/Chat/kazuriChat";
import AgentTest from "@/components/AgentTest";

export default function LabPage() {
  return (
    <div className="flex flex-col h-full w-full p-4">
      {/* Page Title & Description (similar style to BrainPage) */}
      <h1 className="text-2xl font-bold mb-2">KAZURI Studio</h1>
      <p className="mb-4 text-gray-600">Create your Own AI Agent with no code</p>

      {/* Main layout: Chat (left) + AgentTest (right) */}
      <div className="flex flex-row h-[600px] space-x-4">
        {/* LEFT: KazuriChat with Describe / Configure tabs */}
        <div className="flex-1 border rounded p-2 bg-gray-50 overflow-auto">
          <KazuriChat />
        </div>

        {/* RIGHT: Field Service agent card */}
        <div className="w-1/2 border rounded p-2 bg-white shadow-lg overflow-auto">
          <AgentTest />
        </div>
      </div>
    </div>
  );
}


