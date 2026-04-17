'use client';

export function LoadingCard() {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full animate-pulse">
      <div className="bg-gradient-to-r from-gray-300 to-gray-400 h-12"></div>
      <div className="w-full h-48 bg-gray-200"></div>
      <div className="px-4 py-3 flex gap-2">
        <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
        <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
      </div>
      <div className="px-4 pb-4 grid grid-cols-2 gap-2">
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

export function LoadingGrid({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  );
}
