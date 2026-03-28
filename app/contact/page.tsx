'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FiMapPin, FiPhone, FiMail, FiSend } from 'react-icons/fi'

export default function ContactPage() {
  const [naam, setNaam] = useState('')
  const [telefoon, setTelefoon] = useState('')
  const [bericht, setBericht] = useState('')
  const [sent, setSent] = useState(false)

  function handleEmail(e: React.FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent('Interesse in de auto')
    const body = encodeURIComponent(
      `Naam: ${naam}\nTelefoon: ${telefoon}\n\n${bericht}`
    )
    window.location.href = `mailto:ricardo.exclusives@hotmail.com?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  function handleWhatsApp() {
    const msg = encodeURIComponent(
      `Hallo, mijn naam is ${naam}. ${bericht}`
    )
    window.open(`https://wa.me/31644922136?text=${msg}`, '_blank')
  }

  return (
    <div>
      {/* Hero */}
      <section
        className="relative py-20 text-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522758971460-1d21eed7dc1d?w=1600&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-brand-dark/80" />
        <div className="relative z-10 px-4">
          <h1 className="text-4xl font-extrabold text-white mb-3">Contact</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Heeft u een vraag of interesse in een auto? Wij staan voor u klaar.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Contact info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Onze gegevens</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-brand-purple/20 p-2 rounded-lg">
                  <FiMapPin className="text-brand-purple" size={18} />
                </div>
                <div>
                  <p className="text-white font-medium">Adres</p>
                  <p className="text-gray-400 text-sm">
                    Ricardo&apos;s Exclusive Automotive<br />
                    Voederheil 9C<br />
                    5411RJ Zeeland
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-brand-purple/20 p-2 rounded-lg">
                  <FiPhone className="text-brand-purple" size={18} />
                </div>
                <div>
                  <p className="text-white font-medium">Telefoon</p>
                  <a
                    href="tel:+31644922136"
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    +31 6 44 92 21 36
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-brand-purple/20 p-2 rounded-lg">
                  <FiMail className="text-brand-purple" size={18} />
                </div>
                <div>
                  <p className="text-white font-medium">E-mail</p>
                  <a
                    href="mailto:ricardo.exclusives@hotmail.com"
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    ricardo.exclusives@hotmail.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact icons */}
          <div className="flex gap-4">
            <a
              href="mailto:ricardo.exclusives@hotmail.com"
              className="block hover:scale-105 transition-transform"
              title="E-mail"
            >
              <Image
                src="/images/emailogo.png"
                alt="Email"
                width={52}
                height={52}
                className="rounded-xl object-contain"
              />
            </a>
            <a
              href="https://wa.me/31644922136"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:scale-105 transition-transform"
              title="WhatsApp"
            >
              <Image
                src="/images/walogo.png"
                alt="WhatsApp"
                width={52}
                height={52}
                className="rounded-xl object-contain"
              />
            </a>
          </div>

          {/* Google Maps embed */}
          <div className="rounded-xl overflow-hidden border border-white/10 aspect-video">
            <iframe
              src="https://maps.google.com/maps?q=51.706774,5.677356&z=14&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Locatie Ricardo's Exclusive"
            />
          </div>
        </div>

        {/* Contact form */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Stuur een bericht</h2>
          <form onSubmit={handleEmail} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Naam</label>
              <input
                type="text"
                value={naam}
                onChange={(e) => setNaam(e.target.value)}
                placeholder="Uw naam"
                required
                className="w-full bg-[#1a1b23] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-purple"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Telefoon</label>
              <input
                type="tel"
                value={telefoon}
                onChange={(e) => setTelefoon(e.target.value)}
                placeholder="Uw telefoonnummer"
                className="w-full bg-[#1a1b23] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-purple"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Bericht</label>
              <textarea
                value={bericht}
                onChange={(e) => setBericht(e.target.value)}
                placeholder="Uw bericht..."
                rows={8}
                maxLength={500}
                required
                className="w-full bg-[#1a1b23] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-purple resize-none"
              />
              <p className="text-xs text-gray-600 text-right mt-0.5">{bericht.length}/500</p>
            </div>

            {sent && (
              <p className="text-green-400 text-sm">
                Uw e-mailprogramma is geopend. Verstuur de e-mail om contact op te nemen!
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 bg-brand-purple hover:bg-brand-accent text-white font-semibold py-3 rounded-xl transition-colors"
              >
                <FiMail size={15} /> Stuur e-mail
              </button>
              <button
                type="button"
                onClick={handleWhatsApp}
                className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5c] text-white font-semibold py-3 rounded-xl transition-colors"
              >
                <FiSend size={15} /> WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
