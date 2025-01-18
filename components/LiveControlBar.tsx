/* /home/user/Guru-AI/app/components/LiveControlBar.tsx */
"use client";

import React from "react";
import { IoMdClose } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { IoMdMicOff, IoMdMic } from "react-icons/io";

interface LiveControlBarProps {
  onClose: () => void;
  onMicClick: () => void;
  micActive: boolean;
  onSettings: () => void;
}

const LiveControlBar: React.FC<LiveControlBarProps> = ({
  onClose,
  onMicClick,
  micActive,
  onSettings,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "60px",
        backgroundColor: "#f0f0f0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderTop: "1px solid #ccc",
      }}
    >
      {/* Close Button */}
      <button
        style={{
          margin: "0 10px",
          backgroundColor: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          boxShadow: "0 0 5px rgba(0,0,0,0.1)",
          cursor: "pointer",
        }}
        onClick={onClose}
        aria-label="Close"
      >
        <IoMdClose size={20} />
      </button>

      {/* Microphone Button */}
      <button
        style={{
          margin: "0 10px",
          backgroundColor: micActive ? "#00f" : "#fff",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          boxShadow: micActive ? "0 0 10px rgba(0,0,255,0.5)" : "0 0 5px rgba(0,0,0,0.1)",
          cursor: "pointer",
          color: micActive ? "#fff" : "#000",
          transition: "all 0.2s ease-in-out",
        }}
        onClick={onMicClick}
        aria-label="Microphone"
      >
        {micActive ? <IoMdMic size={20} /> : <IoMdMicOff size={20} />}
      </button>

      {/* Settings Button */}
      <button
        style={{
          margin: "0 10px",
          backgroundColor: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          boxShadow: "0 0 5px rgba(0,0,0,0.1)",
          cursor: "pointer",
        }}
        onClick={onSettings}
        aria-label="Settings"
      >
        <IoMdSettings size={20} />
      </button>
    </div>
  );
};

export default LiveControlBar;
