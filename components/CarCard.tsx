import Link from 'next/link'
import Image from 'next/image'
import { AutoDetails } from '@/lib/types'
import { FiDroplet, FiCalendar, FiActivity } from 'react-icons/fi'

interface CarCardProps {
  car: AutoDetails
}

export default function CarCard({ car }: CarCardProps) {
  const formattedPrice = car.vraagprijs
    ? new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(car.vraagprijs)
    : 'Prijs op aanvraag'

  const formattedKm = car.kmstand
    ? new Intl.NumberFormat('nl-NL').format(car.kmstand) + ' km'
    : '-'

  return (
    <Link
      href={`/aanbod/${car.aanbod_id}`}
      className="group block bg-surface-container rounded-xl overflow-hidden border border-white/5 border-t-[3px] border-t-secondary transition-all duration-300 hover:shadow-xl hover:shadow-secondary/25 hover:-translate-y-1 hover:border-secondary/40"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-container-lowest">
        {car.image_url ? (
          <Image
            src={car.image_url}
            alt={`${car.merk} ${car.model}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/images/error_image.png"
              alt="Geen afbeelding"
              width={80}
              height={80}
              className="opacity-30"
            />
          </div>
        )}

        {/* Gradient bleed from image into card body */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface-container to-transparent pointer-events-none" />

        {car.sold && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Image
              src="/images/hd-sold-red-stamp-word-png-701751694685373mjc3xeasfb.png"
              alt="Verkocht"
              width={120}
              height={80}
              className="object-contain"
            />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-bold text-white text-base truncate mb-1">
          {car.merk} {car.model}
        </h3>
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
            {car.bouwjaar && (
              <span className="flex items-center gap-1">
                <FiCalendar size={12} />
                {car.bouwjaar}
              </span>
            )}
            {car.kmstand && (
              <span className="flex items-center gap-1">
                <FiActivity size={12} />
                {formattedKm}
              </span>
            )}
            {car.brandstof && (
              <span className="flex items-center gap-1">
                <FiDroplet size={12} />
                {car.brandstof}
              </span>
            )}
          </div>
          <p className="text-secondary font-black text-xl shrink-0">{formattedPrice}</p>
        </div>
      </div>
    </Link>
  )
}
