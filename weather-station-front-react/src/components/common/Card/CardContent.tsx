// src/components/common/CardContent.tsx
import React from 'react';

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className, ...props }) => {
  return (
    <div className={`mt-4 ${className}`} {...props}>
      {children}
    </div>
  );
};