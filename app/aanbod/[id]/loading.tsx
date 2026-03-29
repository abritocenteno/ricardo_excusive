export default function VehicleDetailLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 animate-pulse">
      {/* Back link */}
      <div className="h-4 w-28 bg-surface-container rounded mb-6" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image carousel placeholder */}
        <div className="aspect-[4/3] bg-surface-container rounded-2xl" />

        {/* Details */}
        <div className="space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <div className="h-8 bg-surface-container rounded w-3/4" />
            <div className="h-6 bg-surface-container rounded w-1/3" />
          </div>

          {/* Price */}
          <div className="h-10 bg-surface-container rounded w-32" />

          {/* Specs grid */}
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-surface-container rounded-xl p-3 space-y-1.5">
                <div className="h-3 w-16 bg-surface-container-high rounded" />
                <div className="h-4 w-24 bg-surface-container-high rounded" />
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex gap-3 pt-2">
            <div className="h-12 flex-1 bg-surface-container rounded-xl" />
            <div className="h-12 flex-1 bg-surface-container rounded-xl" />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-10 space-y-3">
        <div className="h-5 w-40 bg-surface-container rounded" />
        <div className="h-4 bg-surface-container rounded w-full" />
        <div className="h-4 bg-surface-container rounded w-5/6" />
        <div className="h-4 bg-surface-container rounded w-4/5" />
      </div>

      {/* Options sections */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-surface-container rounded-xl p-4 space-y-3">
            <div className="h-5 w-28 bg-surface-container-high rounded" />
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="h-3 bg-surface-container-high rounded w-4/5" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
