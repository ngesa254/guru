"use client";
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiService, Agent } from "@/services/api";
import {
  ChevronRight,
  Code,
  User,
  HelpCircle,
  Mail,
  Users,
  Briefcase,
  Slack,
  Blocks,
  Diamond,
  X,
  FileText,
  Github,
  MessageCircle,
  Edit2,
  Mic,
  Send,
  Settings,
} from "lucide-react";

// Types for chat messages
interface Message {
  type: "user" | "assistant";
  content: string;
}

// Props: We'll send back a real Agent object on creation
interface KazuriChatProps {
  onConfigureAgent?: (agent: Agent) => void;
}

export default function KazuriChat({ onConfigureAgent }: KazuriChatProps) {
  // ─────────────────────────────────────────────────────────────────────────────
  // 1) We keep the chat logic internally, but default the tab to "Configure"
  //    and hide the "Describe" UI. 
  // ─────────────────────────────────────────────────────────────────────────────
  const [currentTab] = useState<"Describe" | "Configure">("Configure");

  // Chat states (still here, but won't render the chat UI)
  const [chatMessages] = useState<Message[]>([
    {
      type: "assistant",
      content: "Hello! I'm here to help you create and configure an AI agent.",
    },
  ]);
  const [inputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ─────────────────────────────────────────────────────────────────────────────
  // 2) CONFIGURE (COLLAPSIBLE SECTIONS) STATES & LOGIC
  // ─────────────────────────────────────────────────────────────────────────────
  const [activeSection, setActiveSection] = useState<string>("");

  // Basic info
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    description: "",
  });

  // Instructions
  const [instructions, setInstructions] = useState("");

  // Agent Type (Dropdown)
  const [selectedAgentType, setSelectedAgentType] = useState<string>("");

  // Actions (pick one)
  const [selectedAction, setSelectedAction] = useState<string>("");

  // Action items
  const actionItems = [
    {
      id: "pull_request",
      label: "Pull Request",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      icon: Code,
    },
    {
      id: "expert_search",
      label: "Expert Search",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      icon: User,
    },
    {
      id: "create_jira",
      label: "Create Jira",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      icon: HelpCircle,
    },
    {
      id: "create_email",
      label: "Create Email",
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
      icon: Mail,
    },
  ];

  // Sections
  const sections = [
    { id: "basic", title: "Basic info" },
    { id: "instruction", title: "Instruction" },
    { id: "agenttype", title: "Agent Type" },
    { id: "actions", title: "Actions" },
    { id: "function", title: "Company functions" },
    { id: "triggering", title: "Triggering" },
    { id: "configure", title: "Configure" },
  ];

  // Validate the form
  const isFormValid = () => {
    return (
      basicInfo.name.trim() !== "" &&
      basicInfo.description.trim() !== "" &&
      selectedAgentType !== ""
    );
  };

  // Handle "Configure Agent" click
  const [isLoading, setIsLoading] = useState(false);
  const handleConfigureAgentClick = async () => {
    if (!isFormValid()) {
      alert("Please fill out name, description, and select an agent type!");
      return;
    }

    try {
      setIsLoading(true);

      // Build the agent object
      const agentConfig = {
        name: basicInfo.name,
        type: selectedAgentType, // "conversational", "rag", "tool_calling", "coding"
        configuration: {
          description: basicInfo.description,
          instructions,
          actions: selectedAction ? [selectedAction] : [],
        },
      };

      // Call the backend to create the agent
      const newAgent = await apiService.createAgent(agentConfig);

      // Notify parent that we have created a new agent
      if (onConfigureAgent) {
        onConfigureAgent(newAgent);
      }

      // Reset fields
      setBasicInfo({ name: "", description: "" });
      setSelectedAgentType("");
      setInstructions("");
      setSelectedAction("");

      alert("Agent configured successfully!");
      // (We keep currentTab as "Configure"; chat is hidden anyway)
    } catch (error) {
      console.error("Failed to configure agent:", error);
      alert("Error creating agent in backend");
    } finally {
      setIsLoading(false);
    }
  };

  // Render content for each collapsible section
  const renderSectionContent = (sectionId: string) => {
    switch (sectionId) {
      case "basic":
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <Code className="w-4 h-4 text-blue-600" />
              </div>
              <input
                type="text"
                value={basicInfo.name}
                onChange={(e) =>
                  setBasicInfo((prev) => ({ ...prev, name: e.target.value }))
                }
                className={`flex-1 p-2 border rounded-md ${
                  !basicInfo.name && "border-red-300"
                }`}
                placeholder="Enter agent name (required) ..."
              />
            </div>
            <textarea
              value={basicInfo.description}
              onChange={(e) =>
                setBasicInfo((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className={`w-full p-3 border rounded-md min-h-[100px] ${
                !basicInfo.description && "border-red-300"
              }`}
              placeholder="Enter a description for your agent (required)..."
            />
          </div>
        );

      case "instruction":
        return (
          <div className="bg-gray-50 p-4 rounded-lg">
            <textarea
              className="w-full p-3 border rounded-md min-h-[100px]"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Enter instructions for your agent..."
            />
          </div>
        );

      case "agenttype":
        const agentTypes = ["conversational", "rag", "tool_calling", "coding"];
        return (
          <div className="mt-4">
            <label className="block mb-2 font-medium text-gray-700">
              Select Agent Type
            </label>
            <select
              className="border rounded-md p-2 text-sm"
              value={selectedAgentType}
              onChange={(e) => setSelectedAgentType(e.target.value)}
            >
              <option value="">-- choose agent type --</option>
              {agentTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        );

      case "actions":
        return (
          <div className="overflow-x-auto py-4">
            <div className="flex items-center gap-6">
              {actionItems.map((action) => {
                const IconComponent = action.icon;
                const isSelected = selectedAction === action.id;
                return (
                  <div
                    key={action.id}
                    onClick={() => setSelectedAction(action.id)}
                    className={`flex items-center gap-2 cursor-pointer p-2 rounded-md transition-colors min-w-[140px] ${
                      isSelected ? "bg-blue-100" : "hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 ${action.iconBg} rounded-lg flex items-center justify-center`}
                    >
                      <IconComponent className={`w-4 h-4 ${action.iconColor}`} />
                    </div>
                    <span className="text-sm">{action.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case "function":
        return (
          <div className="flex items-center gap-6 justify-center py-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                <Settings className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm">TES</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm">EBU</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                <Code className="w-4 h-4 text-orange-600" />
              </div>
              <span className="text-sm">DIT</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-sm">HR</span>
            </div>
          </div>
        );

      case "triggering":
        return (
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600">
              Auto-trigger this app when a user asks a question about the
              company's codebase, or questions relating to engineering practices
              and software development lifecycle.
            </p>
          </div>
        );

      case "configure":
        return (
          <div>
            <div className="flex items-center gap-8 justify-center py-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-100">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm text-gray-600">Chat</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-green-100">
                  <Slack className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-sm text-gray-600">Slack</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center cursor-pointer hover:bg-indigo-100">
                  <Blocks className="w-6 h-6 text-indigo-600" />
                </div>
                <span className="text-sm text-gray-600">API</span>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <Button
                onClick={handleConfigureAgentClick}
                disabled={isLoading || !isFormValid()}
                className="px-8 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                {isLoading ? "Configuring..." : "Configure Agent"}
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // 7) RENDER: Hide the chat side, show only "Configure"
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full w-full">
      {/* We are skipping the "Describe" tab and chat UI. */}
      {/* Render only the "Configure" portion. */}

      <div className="h-full w-full overflow-y-auto space-y-4 mt-2">
        {sections.map((section) => (
          <div
            key={section.id}
            className="bg-white rounded-lg border shadow-sm p-4"
          >
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() =>
                setActiveSection(activeSection === section.id ? "" : section.id)
              }
            >
              <span className="text-gray-700 font-medium">{section.title}</span>
              <ChevronRight
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  activeSection === section.id ? "rotate-90" : ""
                }`}
              />
            </div>
            {activeSection === section.id && (
              <div className="mt-4">{renderSectionContent(section.id)}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
