import Link from 'next/link'
import Image from 'next/image'
import { TbSteeringWheel, TbTool, TbClipboardCheck, TbTruckDelivery } from 'react-icons/tb'
import { FiPhone } from 'react-icons/fi'

const services = [
  {
    title: 'Verkoop',
    Icon: TbSteeringWheel,
    description:
      'Gezien onze jarenlange ervaring in de automotive-industrie kunnen we met de grootste precisie ons aanbod controleren en met een gerust hart verkopen. Inruil is altijd mogelijk, vraag naar de actuele prijs. Vanwege een snel wisselende voorraad is het verstandig om even contact op te nemen voor vertrek. Dit om teleurstelling te voorkomen.',
    cta: { label: 'Bekijk ons aanbod', href: '/aanbod' },
  },
  {
    title: 'Onderhoud',
    Icon: TbTool,
    description:
      'Ook voor onderhoud en reparaties bent U hier bij het goede adres. Of het nu gaat om een onderhoudsbeurt of vervanging distributie(ketting) of andere reparaties, wees niet bang en neem contact op voor de mogelijkheden.',
    cta: { label: 'Neem contact op', href: '/contact' },
  },
  {
    title: 'APK',
    Icon: TbClipboardCheck,
    description:
      'Wie kent het niet, de gevreesde APK keuring.\n\nWist u dat met een goede 60 dagen voordat de APK verloopt, deze al aangeboden mag worden met datumbehoud! Door de jarenlange expertise in het vak kunnen wij ervoor regelen dat uw wagen weer veilig de weg op kan.',
    cta: { label: 'Afspraak maken', href: '/contact' },
  },
  {
    title: 'Sleepservice',
    Icon: TbTruckDelivery,
    description:
      'Pech aan de auto, of bent u niet in staat om de auto zelf naar onze garage te brengen? We bieden de service om uw auto met de trailer te komen halen.',
    cta: { label: 'Bel direct', href: 'tel:+31644922136' },
  },
]

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen bg-surface">
      {/* ── Subtle full-page background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image
          src="/images/WhatsApp_Image_2025-09-13_at_17.40.14.jpeg"
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
            Onze Services
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Meer dan alleen autoverkoop — uw betrouwbare partner voor alles rondom uw auto.
          </p>
        </section>

        {/* ── RDW badge ── */}
        <div className="flex justify-center mb-12 px-4">
          <div className="inline-flex items-center gap-4 bg-surface-container border border-white/10 rounded-2xl px-6 py-4 shadow-xl">
            <Image
              src="/images/Muurschild_RDW_Erkend_bedrijf.jpg"
              alt="RDW Erkend bedrijf"
              width={52}
              height={52}
              className="rounded-lg object-contain"
            />
            <div>
              <p className="text-white font-bold text-sm">RDW Erkend Bedrijf</p>
              <p className="text-gray-400 text-xs">Gecertificeerd voor APK keuringen</p>
            </div>
          </div>
        </div>

        {/* ── Editorial service rows ── */}
        <section className="max-w-5xl mx-auto px-4 pb-20">
          <div className="divide-y divide-white/10 border-t border-white/10">
            {services.map((svc) => (
              <div key={svc.title} className="group py-12 md:py-14 flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                {/* Left column — icon */}
                <div className="shrink-0 pt-1">
                  <svc.Icon
                    size={38}
                    className="text-secondary/70 group-hover:text-secondary transition-colors duration-300"
                  />
                </div>

                {/* Right column — content */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-secondary/90 transition-colors duration-300">
                    {svc.title}
                  </h2>
                  <p className="text-gray-400 leading-relaxed whitespace-pre-line mb-6 max-w-2xl">
                    {svc.description}
                  </p>
                  <Link
                    href={svc.cta.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-white border border-secondary/40 hover:border-secondary hover:bg-secondary/10 px-4 py-2 rounded-lg transition-all duration-200"
                  >
                    {svc.cta.label}
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-secondary/10 border-t border-secondary/20 py-14 text-center px-4">
          <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-3">
            Direct contact
          </p>
          <h2 className="text-white font-bold text-3xl mb-2">Klaar om te beginnen?</h2>
          <p className="text-gray-400 mb-8 max-w-sm mx-auto">
            Bel of mail ons voor een afspraak — we helpen u snel verder.
          </p>
          <a
            href="tel:+31644922136"
            className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-secondary/20"
          >
            <FiPhone size={16} /> +31 6 44 92 21 36
          </a>
        </section>
      </div>
    </div>
  )
}
