// src/components/common/AlertTitle.tsx
import React from 'react';

interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const AlertTitle: React.FC<AlertTitleProps> = ({ children, className, ...props }) => {
  return (
    <h4 className={`font-bold mb-2 ${className}`} {...props}>
      {children}
    </h4>
  );
};