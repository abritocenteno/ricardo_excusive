'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { Review } from '@/lib/types'
import AddReview from '@/components/AddReview'
import StarRating from '@/components/StarRating'
import { TbQuote } from 'react-icons/tb'

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days < 1) return 'Vandaag'
  if (days === 1) return 'Gisteren'
  if (days < 30) return `${days} dagen geleden`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months} maand${months > 1 ? 'en' : ''} geleden`
  const years = Math.floor(months / 12)
  return `${years} jaar geleden`
}

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
    <div className="relative min-h-screen bg-surface">
      {/* ── Subtle full-page background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image
          src="/images/WhatsApp_Image_2025-09-13_at_17.40.19.jpeg"
          alt=""
          fill
          className="object-cover object-center opacity-[0.07]"
          priority
        />
      </div>

      <div className="relative z-10">
        {/* ── Hero ── */}
        <section className="pt-20 pb-10 px-4 text-center max-w-4xl mx-auto">
          <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-3">
            Ricardo&apos;s Exclusive
          </p>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-4 tracking-tight">
            Recensies
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Wat onze klanten zeggen — eerlijke ervaringen van mensen die bij ons kochten.
          </p>
        </section>

        {/* ── Rating summary ── */}
        {reviews.length > 0 && (
          <div className="flex justify-center mb-12 px-4">
            <div className="inline-flex items-center gap-5 bg-surface-container border border-white/10 rounded-2xl px-8 py-4 shadow-xl">
              <span className="text-4xl font-black text-secondary">{avg.toFixed(1)}</span>
              <div>
                <StarRating rating={avg} size="md" />
                <p className="text-gray-400 text-xs mt-1">
                  {reviews.length} recensie{reviews.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── Main content ── */}
        <div className="max-w-5xl mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 items-start">

            {/* ── Review rows ── */}
            <div>
              {loading ? (
                <div className="divide-y divide-white/10 border-t border-white/10">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="py-10 flex gap-6">
                      <div className="w-8 h-8 rounded bg-surface-container animate-pulse shrink-0" />
                      <div className="flex-1 space-y-3">
                        <div className="h-4 bg-surface-container animate-pulse rounded w-1/4" />
                        <div className="h-3 bg-surface-container animate-pulse rounded w-full" />
                        <div className="h-3 bg-surface-container animate-pulse rounded w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-20">
                  <TbQuote size={48} className="text-secondary/30 mx-auto mb-4" />
                  <p className="text-gray-400">Nog geen recensies. Wees de eerste!</p>
                </div>
              ) : (
                <div className="divide-y divide-white/10 border-t border-white/10">
                  {reviews.map((r) => (
                    <div key={r.id} className="group py-10 flex gap-6 md:gap-10 items-start">
                      {/* Icon */}
                      <div className="shrink-0 pt-1">
                        <TbQuote
                          size={28}
                          className="text-secondary/60 group-hover:text-secondary transition-colors duration-300"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <h2 className="text-lg font-bold text-white">
                            {r.naam ?? 'Anoniem'}
                          </h2>
                          {r.created_at && (
                            <span className="text-gray-600 text-xs shrink-0">
                              {timeAgo(r.created_at)}
                            </span>
                          )}
                        </div>
                        <div className="mb-3">
                          <StarRating rating={r.aantal_sterren ?? 0} size="sm" />
                        </div>
                        {r.bericht && (
                          <p className="text-gray-400 leading-relaxed">
                            &ldquo;{r.bericht}&rdquo;
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Add review ── */}
            <aside className="lg:sticky lg:top-24">
              <AddReview onAdded={load} />
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}
