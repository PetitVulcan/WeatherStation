// src/components/common/AlertDescription.tsx
import React from 'react';

interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const AlertDescription: React.FC<AlertDescriptionProps> = ({ children, className, ...props }) => {
  return (
    <p className={`text-sm ${className}`} {...props}>
      {children}
    </p>
  );
};