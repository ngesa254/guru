'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CursorPresenceProps {
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  position: { x: number; y: number };
}

export function CursorPresence({ user, position }: CursorPresenceProps) {
  return (
    <motion.div
      className="absolute pointer-events-none z-50"
      initial={position}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        damping: 30,
        mass: 0.5,
      }}
    >
      {/* Cursor */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500">
        <path d="M5.64,3.64L21.36,12L5.64,20.36V3.64M3,1V23L23,12L3,1Z" />
      </svg>
      
      {/* User Label */}
      <div className="absolute left-5 top-0 bg-blue-500 text-white px-2 py-1 rounded-md text-sm whitespace-nowrap">
        {user.name}
        {user.avatar && (
          <img 
            src={user.avatar} 
            alt={user.name}
            className="w-5 h-5 rounded-full ml-2 inline-block" 
          />
        )}
      </div>
    </motion.div>
  );
}