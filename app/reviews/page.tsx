'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { Review } from '@/lib/types'
import ReviewCard from '@/components/ReviewCard'
import AddReview from '@/components/AddReview'
import StarRating from '@/components/StarRating'

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
    setReviews(data ?? [])
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const avg =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + (r.aantal_sterren ?? 0), 0) / reviews.length
      : 0

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-2">Recensies</h1>

      {/* Summary */}
      {reviews.length > 0 && (
        <div className="flex items-center gap-3 mb-8">
          <span className="text-5xl font-extrabold text-brand-purple">
            {avg.toFixed(1)}
          </span>
          <div>
            <StarRating rating={avg} size="lg" />
            <p className="text-gray-400 text-sm mt-0.5">{reviews.length} recensie{reviews.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
        {/* Reviews list */}
        <div>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-[#1a1b23] rounded-xl h-28 animate-pulse" />
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-4">💬</p>
              <p className="text-gray-400">Nog geen recensies. Wees de eerste!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
          )}
        </div>

        {/* Add review */}
        <aside>
          <AddReview onAdded={load} />
        </aside>
      </div>
    </div>
  )
}
