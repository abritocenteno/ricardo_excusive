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
      className="group block bg-[#1a1b23] rounded-xl overflow-hidden border border-white/5 hover:border-brand-purple/50 transition-all duration-200 hover:shadow-lg hover:shadow-brand-purple/10"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0e0f14]">
        {car.image_url ? (
          <Image
            src={car.image_url}
            alt={`${car.merk} ${car.model}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
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
        <h3 className="font-bold text-white text-base truncate">
          {car.merk} {car.model}
        </h3>
        <p className="text-brand-purple font-bold text-lg mt-1">{formattedPrice}</p>

        <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-400">
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
      </div>
    </Link>
  )
}
