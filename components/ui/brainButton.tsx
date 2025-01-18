/* ----------------------------------------------------------------------------------
   /home/user/Guru-AI/components/ui/brainButton.tsx

   A reusable button component for BRAIN-specific styling. In practice, you'd likely
   use a design system or UI library. Here, we demonstrate minimal custom styling.
----------------------------------------------------------------------------------- */
"use client";

import React from 'react';

interface BrainButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export default function BrainButton({
  variant = 'primary',
  children,
  className = '',
  ...props
}: BrainButtonProps) {
  let variantClasses = 'bg-blue-500 text-white hover:bg-blue-600';
  if (variant === 'secondary') {
    variantClasses = 'bg-gray-300 text-gray-800 hover:bg-gray-400';
  } else if (variant === 'ghost') {
    variantClasses = 'bg-transparent text-blue-500 hover:text-blue-600';
  }

  return (
    <button
      {...props}
      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-150 ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
}
