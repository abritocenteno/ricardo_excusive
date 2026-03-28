import Link from 'next/link'
import Image from 'next/image'
import { FiArrowRight, FiPhone } from 'react-icons/fi'

const services = [
  {
    title: 'Verkoop',
    icon: '🚗',
    description:
      'Gezien onze jarenlange ervaring in de automotive-industrie kunnen we met de grootste precisie ons aanbod controleren en met een gerust hart verkopen. Inruil is altijd mogelijk, vraag naar de actuele prijs. Vanwege een snel wisselende voorraad is het verstandig om even contact op te nemen voor vertrek. Dit om teleurstelling te voorkomen.',
    cta: { label: 'Bekijk ons aanbod', href: '/aanbod' },
  },
  {
    title: 'Onderhoud',
    icon: '🔧',
    description:
      'Ook voor onderhoud en reparaties bent U hier bij het goede adres. Of het nu gaat om een onderhoudsbeurt of vervanging distributie(ketting) of andere reparaties, wees niet bang en neem contact op voor de mogelijkheden.',
    cta: { label: 'Neem contact op', href: '/contact' },
  },
  {
    title: 'APK',
    icon: '✅',
    description:
      'Wie kent het niet, de gevreesde APK keuring.\n\nWist u dat?\n\nMet een goede 60 dagen voordat de APK verloopt mag deze al aangeboden worden met datumbehoud! Door de jarenlange expertise in het vak kunnen wij ervoor regelen dat uw wagen weer veilig de weg op kan!',
    cta: { label: 'Afspraak maken', href: '/contact' },
  },
  {
    title: 'Sleepservice',
    icon: '🚛',
    description:
      'Pech aan de auto, of bent u niet in staat om de auto zelf naar onze garage te brengen? We bieden de service om uw auto met de trailer te komen halen.',
    cta: { label: 'Bel direct', href: 'tel:+31644922136' },
  },
]

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative py-20 text-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1637970067784-927e66e07e36?w=1600&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-brand-dark/80" />
        <div className="relative z-10 px-4">
          <h1 className="text-4xl font-extrabold text-white mb-3">Onze Services</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Meer dan alleen autoverkoop — uw betrouwbare partner voor alles rondom uw auto.
          </p>
        </div>
      </section>

      {/* RDW badge */}
      <div className="flex justify-center -mt-8 relative z-10 px-4">
        <div className="bg-[#1a1b23] rounded-2xl border border-white/10 px-6 py-4 flex items-center gap-4 shadow-xl">
          <Image
            src="/images/Muurschild_RDW_Erkend_bedrijf.jpg"
            alt="RDW Erkend bedrijf"
            width={64}
            height={64}
            className="rounded-lg object-contain"
          />
          <div>
            <p className="text-white font-bold">RDW Erkend Bedrijf</p>
            <p className="text-gray-400 text-sm">Gecertificeerd voor APK keuringen</p>
          </div>
        </div>
      </div>

      {/* Services grid */}
      <section className="max-w-5xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {services.map((svc) => (
          <div
            key={svc.title}
            className="bg-[#1a1b23] rounded-xl p-6 border border-white/5 flex flex-col"
          >
            <div className="text-4xl mb-3">{svc.icon}</div>
            <h2 className="text-xl font-bold text-white mb-3">{svc.title}</h2>
            <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line flex-1">
              {svc.description}
            </p>
            <Link
              href={svc.cta.href}
              className="mt-5 inline-flex items-center gap-1.5 text-sm text-brand-purple hover:text-brand-accent font-semibold transition-colors"
            >
              {svc.cta.label} <FiArrowRight size={13} />
            </Link>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="bg-brand-purple py-10 text-center px-4">
        <h2 className="text-white font-bold text-2xl mb-2">Klaar om te beginnen?</h2>
        <p className="text-red-100 mb-6">Bel of mail ons voor een afspraak — we helpen u snel verder.</p>
        <a
          href="tel:+31644922136"
          className="inline-flex items-center gap-2 bg-white text-brand-purple font-bold px-6 py-3 rounded-xl hover:bg-red-50 transition-colors"
        >
          <FiPhone /> +31 6 44 92 21 36
        </a>
      </section>
    </div>
  )
}
