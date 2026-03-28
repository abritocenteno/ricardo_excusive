'use client'

interface StarRatingProps {
  rating: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  onChange?: (rating: number) => void
}

export default function StarRating({
  rating,
  max = 5,
  size = 'md',
  interactive = false,
  onChange,
}: StarRatingProps) {
  const sizeClass = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-2xl' : 'text-lg'

  return (
    <div className={`flex gap-0.5 ${sizeClass}`}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.round(rating)
        return (
          <button
            key={i}
            type="button"
            onClick={() => interactive && onChange?.(i + 1)}
            className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'} ${
              filled ? 'text-yellow-400' : 'text-gray-600'
            }`}
            aria-label={`${i + 1} ster`}
          >
            ★
          </button>
        )
      })}
    </div>
  )
}
