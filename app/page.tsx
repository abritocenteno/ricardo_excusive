import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { AutoDetails, Review } from '@/lib/types'
import VehicleCard from '@/components/VehicleCard'
import ReviewCard from '@/components/ReviewCard'
import StarRating from '@/components/StarRating'
import GalleryCarousel from '@/components/GalleryCarousel'
import ReviewsCarousel from '@/components/ReviewsCarousel'

async function getFeaturedVehicles(): Promise<AutoDetails[]> {
  const { data } = await supabase
    .from('auto_details')
    .select('*')
    .eq('sold', false)
    .order('created_at', { ascending: false })
    .limit(6)
  return data ?? []
}

async function getLatestReviews(): Promise<Review[]> {
  const { data } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6)
  return data ?? []
}

async function getRatingStats(): Promise<{ avg: number; count: number }> {
  const { data } = await supabase.from('reviews').select('aantal_sterren')
  if (!data || !data.length) return { avg: 0, count: 0 }
  const valid = data.filter((r) => r.aantal_sterren != null)
  if (!valid.length) return { avg: 0, count: 0 }
  const avg = valid.reduce((sum, r) => sum + r.aantal_sterren, 0) / valid.length
  return { avg: Math.round(avg * 10) / 10, count: valid.length }
}

export default async function HomePage() {
  const [vehicles, reviews, ratingStats] = await Promise.all([
    getFeaturedVehicles(),
    getLatestReviews(),
    getRatingStats(),
  ])

  return (
    <div className="bg-surface">
      {/* ── Hero ── */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-surface-container-low" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1800&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface-container-low/80 via-transparent to-surface-container-low" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <Image
            src="/images/RENoBG.png"
            alt="Ricardo's Exclusive"
            width={400}
            height={400}
            className="mx-auto mb-6 drop-shadow-2xl w-4/5 sm:w-[480px] h-auto"
            priority
          />
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-4 tracking-tight">
            Ricardo&apos;s{' '}
            <span className="text-secondary italic">
              Exclusive
            </span>
          </h1>
          <p className="text-on-surface-variant text-lg sm:text-xl mb-3 font-light">
            Automotive
          </p>
          <p className="text-gray-300 text-base sm:text-lg mb-10 max-w-2xl mx-auto">
            Occasions van topkwaliteit — APK, onderhoud &amp; persoonlijke service
            in het hart van Zeeland.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/aanbod"
              className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-ambient hover:shadow-lg hover:-translate-y-0.5"
            >
              Bekijk aanbod
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-secondary/20 hover:bg-secondary/40 border border-secondary/50 text-secondary font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
            >
              Neem contact op
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className="border-y border-outline-variant bg-surface-container-low/80">
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7158c4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <p className="text-secondary font-extrabold text-xl">RDW</p>
            <p className="text-gray-400 text-xs">Erkend bedrijf</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7158c4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <p className="text-secondary font-extrabold text-xl">APK</p>
            <p className="text-gray-400 text-xs">Keuringsstation</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#7158c4" stroke="none"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
            </div>
            <p className="text-secondary font-extrabold text-xl">
              {ratingStats.avg > 0 ? `${ratingStats.avg}` : '—'}
            </p>
            <p className="text-gray-400 text-xs">
              {ratingStats.count > 0 ? `${ratingStats.count} recensies` : 'Nog geen recensies'}
            </p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7158c4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <p className="text-secondary font-extrabold text-xl">10+</p>
            <p className="text-gray-400 text-xs">Jaar ervaring</p>
          </div>
        </div>
      </section>

      {/* ── Gallery carousel ── */}
      <GalleryCarousel />

      {/* ── Featured vehicles ── */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-secondary text-sm font-semibold uppercase tracking-wider mb-1">
              Ons aanbod
            </p>
            <h2 className="text-3xl font-bold text-white">Uitgelichte voertuigen</h2>
          </div>
          <Link
            href="/aanbod"
            className="text-sm text-secondary hover:text-secondary/80 flex items-center gap-1.5 transition-colors font-medium"
          >
            Alles bekijken
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </div>

        {vehicles.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">Geen voertuigen beschikbaar.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </section>

      {/* ── RDW / Services banner ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-container via-secondary to-secondary-container opacity-90" />
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-8">
          <div className="shrink-0">
            <Image
              src="/images/Muurschild_RDW_Erkend_bedrijf.jpg"
              alt="RDW Erkend bedrijf"
              width={120}
              height={120}
              className="rounded-2xl shadow-2xl object-contain"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-3">
              Meer dan alleen autoverkoop
            </h2>
            <p className="text-on-surface-variant text-lg mb-6 max-w-xl">
              Van APK-keuring tot volledig onderhoud en sleepservice. Ricardo&apos;s
              Exclusive staat altijd voor u klaar — als RDW-erkend bedrijf.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-white text-secondary font-bold px-7 py-3 rounded-xl hover:bg-surface-container-lowest hover:text-on-surface transition-all duration-200"
            >
              Onze services
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      {reviews.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-secondary text-sm font-semibold uppercase tracking-wider mb-1">
                Klantervaring
              </p>
              <h2 className="text-3xl font-bold text-white">Wat klanten zeggen</h2>
              {ratingStats.avg > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  <StarRating rating={ratingStats.avg} size="md" />
                  <span className="text-gray-400 text-sm">
                    {ratingStats.avg} / 5 ({ratingStats.count} recensies)
                  </span>
                </div>
              )}
            </div>
            <Link
              href="/reviews"
              className="text-sm text-secondary hover:text-secondary/80 flex items-center gap-1.5 transition-colors font-medium"
            >
              Alle recensies
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </div>
          <div className="max-w-2xl mx-auto">
            <ReviewsCarousel reviews={reviews} />
          </div>
        </section>
      )}

      {/* ── CTA contact bar ── */}
      <section className="bg-surface-container-low border-t border-outline-variant">
        <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Interesse in een voertuig?
            </h2>
            <p className="text-gray-400 text-sm">
              Neem direct contact op — persoonlijke service gegarandeerd.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="tel:+31644922136"
              className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-white font-semibold px-6 py-3 rounded-xl transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42A2 2 0 0 1 3.58 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +31 6 44 92 21 36
            </a>
            <a
              href="https://wa.me/31644922136"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5c] text-white font-semibold px-6 py-3 rounded-xl transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
