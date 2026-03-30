import { notFound } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { AutoDetails, AanbodImages } from '@/lib/types'
import ImageCarousel from '@/components/ImageCarousel'

interface Props {
  params: { id: string }
}

async function getVehicle(aanbodId: string): Promise<AutoDetails | null> {
  const { data } = await supabase
    .from('auto_details')
    .select('*')
    .eq('aanbod_id', aanbodId)
    .single()
  return data
}

async function getImages(aanbodId: string): Promise<string[]> {
  const { data } = await supabase
    .from('aanbod_images')
    .select('url')
    .eq('aanbod_id', aanbodId)
    .single()
  if (!data) return []
  const raw = data as AanbodImages
  return Array.isArray(raw.url) ? raw.url : []
}

type OptionSection = {
  label: string
  key: keyof AutoDetails
  icon: string
}

const OPTION_SECTIONS: OptionSection[] = [
  { label: 'Interieur', key: 'optiesInterieur', icon: '🪑' },
  { label: 'Exterieur', key: 'optiesExterieur', icon: '✨' },
  { label: 'Comfort', key: 'optiesComfort', icon: '💺' },
  { label: 'Infotainment', key: 'optiesInfotainment', icon: '📱' },
  { label: 'Veiligheid', key: 'optiesVeiligheid', icon: '🛡️' },
  { label: 'Motor', key: 'optiesMotor', icon: '⚙️' },
]

export default async function AanbodDetailPage({ params }: Props) {
  const [vehicle, images] = await Promise.all([
    getVehicle(params.id),
    getImages(params.id),
  ])

  if (!vehicle) notFound()

  const allImages = images.length
    ? images
    : vehicle.image_url
    ? [vehicle.image_url]
    : []

  const formattedPrice = vehicle.vraagprijs
    ? new Intl.NumberFormat('nl-NL', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
      }).format(vehicle.vraagprijs)
    : 'Prijs op aanvraag'

  const formattedKm = vehicle.kmstand
    ? new Intl.NumberFormat('nl-NL').format(vehicle.kmstand) + ' km'
    : '—'

  const whatsappMsg = encodeURIComponent(
    `Hallo, ik heb interesse in de ${vehicle.merk} ${vehicle.model} (${vehicle.bouwjaar}). Kunt u mij meer informatie geven?`
  )

  return (
    <div className="bg-surface min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-surface-container-low border-b border-outline-variant">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link
            href="/aanbod"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Terug naar aanbod
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* Left column */}
          <div>
            <ImageCarousel images={allImages} alt={`${vehicle.merk} ${vehicle.model}`} />

            {/* Description */}
            {vehicle.beschrijving && (
              <div className="mt-6 bg-surface-container rounded-2xl p-6 border border-outline-variant">
                <h2 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <span className="text-secondary">📄</span> Beschrijving
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                  {vehicle.beschrijving}
                </p>
              </div>
            )}

            {/* Options accordion */}
            {OPTION_SECTIONS.map((section) => {
              const options = vehicle[section.key] as string[]
              if (!options || !options.length) return null
              return (
                <div
                  key={section.key as string}
                  className="mt-4 bg-surface-container rounded-2xl p-6 border border-outline-variant"
                >
                  <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <span>{section.icon}</span> {section.label}
                    <span className="ml-auto text-xs text-secondary font-normal">
                      {options.length} opties
                    </span>
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                    {options.map((opt, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5F4066" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                        {opt}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          {/* Right sticky card */}
          <aside className="lg:sticky lg:top-20 h-fit space-y-4">
            {/* Price & title card */}
            <div className="bg-surface-container rounded-2xl p-6 border border-outline-variant">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h1 className="text-2xl font-bold text-white">
                  {vehicle.merk} {vehicle.model}
                </h1>
                {vehicle.sold && (
                  <span className="shrink-0 bg-red-700/80 border border-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                    VERKOCHT
                  </span>
                )}
              </div>

              <p className="text-primary font-black text-3xl mt-3">
                {formattedPrice}
              </p>

              {/* Specs */}
              <div className="mt-5 space-y-3 border-t border-outline-variant pt-5">
                {vehicle.bouwjaar && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      Bouwjaar
                    </span>
                    <span className="text-white font-semibold">{vehicle.bouwjaar}</span>
                  </div>
                )}
                {vehicle.kmstand && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M21.17 8H12V2.83"/><path d="M3.95 6.06 10 12"/></svg>
                      Kilometerstand
                    </span>
                    <span className="text-white font-semibold">{formattedKm}</span>
                  </div>
                )}
                {vehicle.brandstof && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 22V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14"/><path d="M3 22h12"/><path d="M15 4h2a2 2 0 0 1 2 2v1h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1v5a2 2 0 0 1-2 2h-2"/><path d="M7 8v3"/></svg>
                      Brandstof
                    </span>
                    <span className="text-white font-semibold">{vehicle.brandstof}</span>
                  </div>
                )}
                {vehicle.locatie && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      Locatie
                    </span>
                    <span className="text-white font-semibold">{vehicle.locatie}</span>
                  </div>
                )}
              </div>

              {/* CTA buttons */}
              {!vehicle.sold && (
                <div className="mt-6 space-y-3">
                  <a
                    href="tel:+31644922136"
                    className="flex items-center justify-center gap-2 w-full bg-secondary hover:bg-secondary/80 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-ambient"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42A2 2 0 0 1 3.58 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    Bel ons
                  </a>
                  <a
                    href={`https://wa.me/31644922136?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1ebe5c] text-white font-semibold py-3.5 rounded-xl transition-all duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                    WhatsApp
                  </a>
                  <a
                    href={`mailto:ricardo.exclusives@hotmail.com?subject=${encodeURIComponent(
                      `Interesse in ${vehicle.merk} ${vehicle.model}`
                    )}`}
                    className="flex items-center justify-center gap-2 w-full bg-outline-variant hover:bg-surface-container border border-outline-variant text-white font-semibold py-3.5 rounded-xl transition-all duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    E-mail ons
                  </a>
                </div>
              )}

              {vehicle.sold && (
                <div className="mt-6 bg-red-950/40 border border-red-800/50 rounded-xl p-4 text-center">
                  <p className="text-red-300 text-sm font-medium">
                    Dit voertuig is verkocht.
                  </p>
                  <Link
                    href="/aanbod"
                    className="mt-2 inline-block text-secondary hover:text-secondary/80 text-sm transition-colors"
                  >
                    Bekijk ons andere aanbod →
                  </Link>
                </div>
              )}
            </div>

            {/* Contact info card */}
            <div className="bg-surface-container rounded-2xl p-5 border border-outline-variant">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 font-medium">
                Ricardo&apos;s Exclusive
              </p>
              <p className="text-gray-300 text-sm">Voederheil 9C, 5411RJ Zeeland</p>
              <div className="mt-3 space-y-1 text-sm">
                <a
                  href="tel:+31644922136"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5F4066" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42A2 2 0 0 1 3.58 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  +31 6 44 92 21 36
                </a>
                <a
                  href="mailto:ricardo.exclusives@hotmail.com"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5F4066" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  ricardo.exclusives@hotmail.com
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
