export default function VehicleCardSkeleton() {
  return (
    <div className="bg-surface-container rounded-xl overflow-hidden border border-white/5 border-t-[3px] border-t-secondary/30 animate-pulse">
      {/* Image area */}
      <div className="aspect-[16/10] bg-surface-container-high" />
      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-surface-container-high rounded w-3/4" />
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-3">
            <div className="h-3 bg-surface-container-high rounded w-10" />
            <div className="h-3 bg-surface-container-high rounded w-16" />
            <div className="h-3 bg-surface-container-high rounded w-12" />
          </div>
          <div className="h-5 bg-surface-container-high rounded w-16" />
        </div>
      </div>
    </div>
  )
}
