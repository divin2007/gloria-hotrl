import React from 'react';

export const SkeletonLine = ({ className = "h-4 w-full" }) => (
  <div className={`bg-surface-container-high animate-pulse rounded ${className}`}></div>
);

export const SkeletonCard = () => (
  <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-editorial space-y-4">
    <SkeletonLine className="h-4 w-1/4" />
    <div className="flex justify-between items-end">
      <SkeletonLine className="h-8 w-1/3" />
      <SkeletonLine className="h-4 w-1/4" />
    </div>
  </div>
);

export const SkeletonTable = ({ rows = 5 }) => (
  <div className="space-y-4">
    {[...Array(rows)].map((_, i) => (
      <div key={i} className="flex gap-4 items-center px-8 py-5 border-b border-outline-variant/10">
        <div className="w-10 h-10 rounded-full bg-surface-container-high animate-pulse" />
        <div className="flex-grow space-y-2">
          <SkeletonLine className="h-3 w-1/4" />
          <SkeletonLine className="h-2 w-1/2" />
        </div>
        <SkeletonLine className="h-6 w-16" />
        <SkeletonLine className="h-4 w-12" />
      </div>
    ))}
  </div>
);
