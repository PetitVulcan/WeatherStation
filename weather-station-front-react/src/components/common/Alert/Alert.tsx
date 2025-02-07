// src/components/common/Alert.tsx
import React from 'react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive';
  children: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ variant = 'default', children, className, ...props }) => {
  const variantClasses = variant === 'destructive' ? 'bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100' : 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100';

  return (
    <div
      className={`p-4 rounded-md ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export { AlertDescription } from "./AlertDescription.tsx";
export { AlertTitle } from "./AlertTitle.tsx";
