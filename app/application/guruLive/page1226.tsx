'use client';

import React, { useState, useEffect } from 'react';
import { PlayCircle, XCircle } from 'lucide-react';

const AnimatedWaveInterface = () => {
  const [isHolding, setIsHolding] = useState(false);
  const [wavePosition, setWavePosition] = useState(0);

  useEffect(() => {
    let animationFrame: number | null = null; // Explicitly define the type
    
    const animateWave = () => {
      setWavePosition((prevPosition) => (prevPosition + 1) % 100);
      animationFrame = requestAnimationFrame(animateWave);
    };

    if (isHolding) {
      animationFrame = requestAnimationFrame(animateWave);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isHolding]);

  return (
    <div className="relative h-screen w-full bg-gray-100 text-gray-800 overflow-hidden">
      <div className="absolute top-4 left-4 font-semibold">
        Guru Live
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1/3 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-200 to-green-200"
          style={{
            transform: `translateY(${50 - wavePosition}%)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-8">
        <button
          className="bg-white shadow-md rounded-full p-4 text-gray-800 hover:bg-gray-50 transition-colors duration-200"
          onMouseDown={() => setIsHolding(true)}
          onMouseUp={() => setIsHolding(false)}
          onTouchStart={() => setIsHolding(true)}
          onTouchEnd={() => setIsHolding(false)}
        >
          <PlayCircle size={24} />
          <span className="ml-2">Hold</span>
        </button>
        <button className="bg-white shadow-md rounded-full p-4 text-gray-800 hover:bg-gray-50 transition-colors duration-200">
          <XCircle size={24} />
          <span className="ml-2">End</span>
        </button>
      </div>
    </div>
  );
};

export default AnimatedWaveInterface;
