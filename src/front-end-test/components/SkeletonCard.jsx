import React from "react";
export const SkeletonCard = () => {
  return (
    <div className="animate-pulse border rounded p-4 space-y-4">
      <div className="bg-gray-300 h-40 rounded"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4"></div> 
      <div className="h-5 bg-gray-300 rounded w-1/2"></div> 
    </div>
  );
};
