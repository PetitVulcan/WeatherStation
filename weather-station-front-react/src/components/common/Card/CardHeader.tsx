// src/components/common/CardHeader.tsx
import React from 'react';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className, ...props }) => {
  return (
    <div className={`border-b pb-3 ${className}`} {...props}>
      {children}
    </div>
  );
};