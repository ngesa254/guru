// 'use client';

// import React from 'react';
// import clsx from 'classnames';

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: 'default' | 'outline' | 'destructive';
//   size?: 'sm' | 'md' | 'lg';
// }

// export function Button({
//   children,
//   variant = 'default',
//   size = 'md',
//   className,
//   ...props
// }: ButtonProps) {
//   const baseStyles = 'rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';
//   const variantStyles: Record<string, string> = {
//     default: 'bg-blue-600 text-white hover:bg-blue-700',
//     outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
//     destructive: 'bg-red-600 text-white hover:bg-red-700',
//   };
//   const sizeStyles: Record<string, string> = {
//     sm: 'text-sm px-2 py-1',
//     md: 'text-base px-4 py-2',
//     lg: 'text-lg px-6 py-3',
//   };

//   return (
//     <button
//       className={clsx(
//         baseStyles,
//         variantStyles[variant],
//         sizeStyles[size],
//         className
//       )}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// }


'use client';

import React from 'react';
import clsx from 'classnames';

interface BrainButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * A simple reusable button. 
 * In real usage, you'd integrate your design system or library.
 */
export function Button({
  children,
  variant = 'default',
  size = 'md',
  className,
  ...props
}: BrainButtonProps) {
  const baseStyles = 'rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantStyles: Record<string, string> = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
  };
  const sizeStyles: Record<string, string> = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
