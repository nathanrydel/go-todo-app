import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface TodoSkeletonProps {
  count: number; // Prop to determine the number of skeleton items
}

export const TodoSkeleton: React.FC<TodoSkeletonProps> = ({ count }) => {
  const skeletons = Array(count).fill(null);

  return (
    <>
      {skeletons.map((_, index) => (
        <div key={index} className="flex items-center justify-between mb-2 space-y-4">
          <div className="flex items-center space-x-2">
            {/* CheckCircle Skeleton */}
            <Skeleton className="h-5 w-5 rounded-full" />
            {/* Task Title Skeleton */}
            <Skeleton className="h-4 w-[12rem]" />
          </div>
          {/* Trash Icon Skeleton */}
          <Skeleton className="h-4 w-4" />
        </div>
      ))}
    </>
  );
};
