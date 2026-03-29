'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'

interface ImageCarouselProps {
  images: string[]
  alt?: string
}

export default function ImageCarousel({ images, alt = 'Auto' }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  if (!images.length) {
    return (
      <div className="aspect-video bg-surface-container rounded-xl flex items-center justify-center">
        <Image src="/images/error_image.png" alt="Geen afbeelding" width={80} height={80} className="opacity-30" />
      </div>
    )
  }

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))

  return (
    <>
      {/* Main */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-surface-container cursor-pointer group"
        onClick={() => setLightbox(true)}>
        <Image
          src={images[current]}
          alt={`${alt} ${current + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
          priority
        />
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 transition-opacity opacity-0 group-hover:opacity-100"
            >
              <FiChevronLeft size={18} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 transition-opacity opacity-0 group-hover:opacity-100"
            >
              <FiChevronRight size={18} />
            </button>
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
              {current + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`relative shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-colors ${
                i === current ? 'border-secondary' : 'border-transparent'
              }`}
            >
              <Image src={img} alt={`thumb ${i + 1}`} fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2"
            onClick={() => setLightbox(false)}
          >
            <FiX size={22} />
          </button>
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full p-2"
              >
                <FiChevronLeft size={22} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full p-2"
              >
                <FiChevronRight size={22} />
              </button>
            </>
          )}
          <div
            className="relative max-w-4xl w-full mx-8 aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[current]}
              alt={`${alt} ${current + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <p className="absolute bottom-4 text-white/60 text-sm">
            {current + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  )
}
