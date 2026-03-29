'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Review } from '@/lib/types'
import StarRating from '@/components/StarRating'

interface ReviewsCarouselProps {
  reviews: Review[]
}

const INTERVAL = 6000

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days < 1) return 'Vandaag'
  if (days === 1) return 'Gisteren'
  if (days < 30) return `${days} dagen geleden`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months} maand${months > 1 ? 'en' : ''} geleden`
  const years = Math.floor(months / 12)
  return `${years} jaar${years > 1 ? '' : ''} geleden`
}

export default function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback(
    (index: number) => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrent((index + reviews.length) % reviews.length)
        setIsVisible(true)
      }, 300)
    },
    [reviews.length]
  )

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      goTo(current + 1)
    }, INTERVAL)
  }, [current, goTo])

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => {
        const next = (c + 1) % reviews.length
        setIsVisible(false)
        setTimeout(() => setIsVisible(true), 300)
        return next
      })
    }, INTERVAL)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [reviews.length])

  const prev = () => {
    goTo(current - 1)
    resetTimer()
  }

  const next = () => {
    goTo(current + 1)
    resetTimer()
  }

  if (!reviews.length) return null

  const review = reviews[current]

  return (
    <div className="relative">
      {/* Carousel track */}
      <div className="relative min-h-[200px] flex items-stretch">
        {/* Prev arrow */}
        <button
          onClick={prev}
          aria-label="Vorige recensie"
          className="hidden sm:flex shrink-0 items-center justify-center w-10 mr-4 text-gray-600 hover:text-secondary transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>

        {/* Card */}
        <div
          className="flex-1 transition-all duration-300"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(6px)' }}
        >
          <div className="bg-surface-container rounded-xl border border-white/5 border-t-[3px] border-t-secondary p-6 flex flex-col gap-3 h-full">
            {/* Stars + date */}
            <div className="flex items-center justify-between">
              <StarRating rating={review.aantal_sterren ?? 0} size="sm" />
              {review.created_at && (
                <span className="text-gray-500 text-xs">{timeAgo(review.created_at)}</span>
              )}
            </div>

            {/* Review text */}
            {review.bericht && (
              <p className="text-gray-300 text-sm leading-relaxed flex-1">
                &ldquo;{review.bericht}&rdquo;
              </p>
            )}

            {/* Author */}
            <div className="flex items-center gap-3 mt-auto pt-3 border-t border-white/5">
              <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold text-sm shrink-0">
                {(review.naam ?? '?')[0].toUpperCase()}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{review.naam ?? 'Anoniem'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next arrow */}
        <button
          onClick={next}
          aria-label="Volgende recensie"
          className="hidden sm:flex shrink-0 items-center justify-center w-10 ml-4 text-gray-600 hover:text-secondary transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      {/* Mobile swipe arrows */}
      <div className="flex sm:hidden items-center justify-center gap-4 mt-4">
        <button
          onClick={prev}
          aria-label="Vorige"
          className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-secondary hover:border-secondary/40 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <span className="text-gray-600 text-xs">{current + 1} / {reviews.length}</span>
        <button
          onClick={next}
          aria-label="Volgende"
          className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-secondary hover:border-secondary/40 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      {/* Dots */}
      <div className="hidden sm:flex items-center justify-center gap-2 mt-5">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => { goTo(i); resetTimer() }}
            aria-label={`Recensie ${i + 1}`}
            className="transition-all duration-300"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-5 h-1.5 bg-secondary'
                  : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
