export const ProductDetailsSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 animate-pulse">
      <div className="mb-4 h-6 w-20 bg-gray-300 rounded"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
        <div className="w-full h-64 bg-gray-300 rounded shadow"></div>
        <div className="space-y-4">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <div className="h-6 bg-gray-300 rounded w-2/3"></div>
          <div className="h-10 bg-gray-300 rounded w-full"></div>
          <div className="h-10 bg-gray-300 rounded w-full"></div>
          <div className="h-10 bg-gray-400 rounded w-32"></div>
        </div>
      </div>
    </div>
  );
};
