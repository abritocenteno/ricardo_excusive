import VehicleCardSkeleton from '@/components/VehicleCardSkeleton'

export default function HomeLoading() {
  return (
    <div className="bg-surface animate-pulse">
      {/* Hero */}
      <section className="min-h-[600px] bg-surface-container-low flex items-center justify-center">
        <div className="text-center px-4 w-full max-w-4xl mx-auto space-y-5">
          <div className="mx-auto h-48 w-80 bg-surface-container rounded-xl" />
          <div className="h-10 bg-surface-container rounded-xl w-96 mx-auto" />
          <div className="h-4 bg-surface-container rounded w-72 mx-auto" />
          <div className="h-4 bg-surface-container rounded w-[480px] mx-auto" />
          <div className="flex gap-4 justify-center pt-2">
            <div className="h-12 w-40 bg-surface-container rounded-xl" />
            <div className="h-12 w-40 bg-surface-container rounded-xl" />
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-outline-variant bg-surface-container-low/80">
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-surface-container" />
              <div className="h-5 w-12 bg-surface-container rounded" />
              <div className="h-3 w-20 bg-surface-container rounded" />
            </div>
          ))}
        </div>
      </section>

      {/* Gallery placeholder */}
      <div className="w-full aspect-[16/7] sm:aspect-[21/9] bg-surface-container-low" />

      {/* Featured vehicles */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div className="space-y-2">
            <div className="h-3 w-20 bg-surface-container rounded" />
            <div className="h-7 w-56 bg-surface-container rounded" />
          </div>
          <div className="h-4 w-24 bg-surface-container rounded" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <VehicleCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  )
}
