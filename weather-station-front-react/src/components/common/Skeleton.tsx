// src/components/common/Skeleton.tsx
import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
      {...props}
    />
  );
};