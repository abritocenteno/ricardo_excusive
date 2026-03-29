import VehicleCardSkeleton from '@/components/VehicleCardSkeleton'

export default function AanbodLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 animate-pulse">
      {/* Header */}
      <div className="mb-8 space-y-2">
        <div className="h-3 w-16 bg-surface-container rounded" />
        <div className="h-8 w-48 bg-surface-container rounded" />
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-3 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-10 w-32 bg-surface-container rounded-xl" />
        ))}
      </div>

      {/* Vehicle grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <VehicleCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
