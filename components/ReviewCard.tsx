import { Review } from '@/lib/types'
import StarRating from './StarRating'

interface ReviewCardProps {
  review: Review
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const date = new Date(review.created_at).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="bg-[#1a1b23] rounded-xl p-5 border border-white/5">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <p className="font-semibold text-white">{review.naam || 'Anoniem'}</p>
          <p className="text-xs text-gray-500 mt-0.5">{date}</p>
        </div>
        <StarRating rating={review.aantal_sterren ?? 0} size="sm" />
      </div>
      {review.bericht && (
        <p className="text-gray-300 text-sm leading-relaxed">{review.bericht}</p>
      )}
    </div>
  )
}
