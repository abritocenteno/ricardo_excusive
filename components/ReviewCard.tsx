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
    <div className="bg-surface-container rounded-xl border border-white/5 border-t-[3px] border-t-secondary transition-all duration-300 hover:shadow-xl hover:shadow-secondary/25 hover:-translate-y-1 hover:border-secondary/40 p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-bold text-white">{review.naam || 'Anoniem'}</p>
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
