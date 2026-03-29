'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'

const IMAGES = [
  { src: '/images/WhatsApp_Image_2025-09-13_at_17.40.14.jpeg', alt: "Ricardo's Exclusive showroom" },
  { src: '/images/WhatsApp_Image_2025-08-26_at_09.19.50-2.jpeg', alt: "Ricardo's Exclusive garage" },
  { src: '/images/WhatsApp_Image_2025-09-13_at_17.40.19.jpeg', alt: "Ricardo's Exclusive voertuigen" },
  { src: '/images/WhatsApp_Image_2025-08-26_at_09.19.51.jpeg', alt: "Ricardo's Exclusive occasion" },
  { src: '/images/WhatsApp_Image_2025-09-13_at_17.40.18.jpeg', alt: "Ricardo's Exclusive collectie" },
  { src: '/images/WhatsApp_Image_2025-08-26_at_09.19.50-5.jpeg', alt: "Ricardo's Exclusive aanbod" },
  { src: '/images/WhatsApp_Image_2025-09-13_at_17.40.14_(1).jpeg', alt: "Ricardo's Exclusive showroom" },
  { src: '/images/WhatsApp_Image_2025-09-13_at_21.28.15.jpeg', alt: "Ricardo's Exclusive collectie" },
]

const INTERVAL = 5000

export default function GalleryCarousel() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const go = useCallback(
    (next: number, dir: 'left' | 'right' = 'right') => {
      if (animating) return
      setDirection(dir)
      setAnimating(true)
      setTimeout(() => {
        setCurrent((next + IMAGES.length) % IMAGES.length)
        setAnimating(false)
      }, 400)
    },
    [animating]
  )

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % IMAGES.length)
    }, INTERVAL)
  }, [])

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % IMAGES.length)
    }, INTERVAL)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const prev = () => {
    go(current - 1, 'left')
    resetTimer()
  }

  const next = () => {
    go(current + 1, 'right')
    resetTimer()
  }

  const goTo = (i: number) => {
    go(i, i > current ? 'right' : 'left')
    resetTimer()
  }

  return (
    <section className="relative w-full overflow-hidden bg-surface-container-lowest">
      {/* Image */}
      <div className="relative w-full aspect-[16/7] sm:aspect-[21/9]">
        {IMAGES.map((img, i) => (
          <div
            key={img.src}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="100vw"
            />
          </div>
        ))}

        {/* Subtle grey overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-black/30" />
        {/* Gradient vignette top + bottom */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-surface-container-lowest/60 via-transparent to-surface-container-lowest/80" />

        {/* Label bottom-left */}
        <div className="absolute bottom-5 left-5 z-20">
          <p className="text-white/60 text-xs uppercase tracking-widest font-semibold">
            Ricardo&apos;s Exclusive — Showroom
          </p>
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={prev}
          aria-label="Vorige"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-secondary/80 border border-white/10 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button
          onClick={next}
          aria-label="Volgende"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-secondary/80 border border-white/10 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 right-5 z-20 flex items-center gap-1.5">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ga naar foto ${i + 1}`}
            className="transition-all duration-300"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-5 h-1.5 bg-secondary'
                  : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  )
}
