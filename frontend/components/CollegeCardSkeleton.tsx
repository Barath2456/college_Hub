export default function CollegeCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
      <div className="h-44 bg-gray-200" />
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-3" />
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <div className="h-2 bg-gray-200 rounded w-1/2 mx-auto mb-1" />
            <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto" />
          </div>
          <div className="p-2 bg-gray-100 rounded-lg">
            <div className="h-2 bg-gray-200 rounded w-1/2 mx-auto mb-1" />
            <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto" />
          </div>
          <div className="p-2 bg-gray-100 rounded-lg">
            <div className="h-2 bg-gray-200 rounded w-1/2 mx-auto mb-1" />
            <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 h-8 bg-gray-200 rounded-lg" />
          <div className="h-8 w-20 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
