'use client'

import { useState } from 'react'
import Image from 'next/image'
import { TbMapPin, TbPhone, TbMail, TbBrandWhatsapp } from 'react-icons/tb'
import { FiMail, FiSend } from 'react-icons/fi'

const contactItems = [
  {
    Icon: TbMapPin,
    label: 'Adres',
    content: (
      <p className="text-gray-400 text-sm leading-relaxed">
        Ricardo&apos;s Exclusive Automotive<br />
        Voederheil 9C<br />
        5411RJ Zeeland
      </p>
    ),
  },
  {
    Icon: TbPhone,
    label: 'Telefoon',
    content: (
      <a
        href="tel:+31644922136"
        className="text-gray-400 text-sm hover:text-white transition-colors"
      >
        +31 6 44 92 21 36
      </a>
    ),
  },
  {
    Icon: TbMail,
    label: 'E-mail',
    content: (
      <a
        href="mailto:ricardo.exclusives@hotmail.com"
        className="text-gray-400 text-sm hover:text-white transition-colors"
      >
        ricardo.exclusives@hotmail.com
      </a>
    ),
  },
  {
    Icon: TbBrandWhatsapp,
    label: 'WhatsApp',
    content: (
      <a
        href="https://wa.me/31644922136"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 text-sm hover:text-white transition-colors"
      >
        Stuur een bericht
      </a>
    ),
  },
]

export default function ContactPage() {
  const [naam, setNaam] = useState('')
  const [telefoon, setTelefoon] = useState('')
  const [bericht, setBericht] = useState('')
  const [sent, setSent] = useState(false)

  function handleEmail(e: React.FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent('Interesse in de auto')
    const body = encodeURIComponent(`Naam: ${naam}\nTelefoon: ${telefoon}\n\n${bericht}`)
    window.location.href = `mailto:ricardo.exclusives@hotmail.com?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  function handleWhatsApp() {
    const msg = encodeURIComponent(`Hallo, mijn naam is ${naam}. ${bericht}`)
    window.open(`https://wa.me/31644922136?text=${msg}`, '_blank')
  }

  return (
    <div className="relative min-h-screen bg-surface">
      {/* ── Subtle full-page background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image
          src="/images/WhatsApp_Image_2025-08-26_at_09.19.51.jpeg"
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
            Contact
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Heeft u een vraag of interesse in een auto? Wij staan voor u klaar.
          </p>
        </section>

        {/* ── Main grid ── */}
        <div className="max-w-5xl mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* ── Left: contact info + map ── */}
            <div>
              {/* Info rows */}
              <div className="divide-y divide-white/10 border-t border-white/10 mb-10">
                {contactItems.map((item) => (
                  <div key={item.label} className="group py-6 flex gap-6 items-start">
                    <div className="shrink-0 pt-0.5">
                      <item.Icon
                        size={26}
                        className="text-secondary/70 group-hover:text-secondary transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm mb-1">{item.label}</p>
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Google Maps */}
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

            {/* ── Right: contact form ── */}
            <div className="lg:sticky lg:top-24">
              <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-3">
                Stuur een bericht
              </p>
              <h2 className="text-2xl font-bold text-white mb-6">Neem contact op</h2>

              <form onSubmit={handleEmail} className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Naam</label>
                  <input
                    type="text"
                    value={naam}
                    onChange={(e) => setNaam(e.target.value)}
                    placeholder="Uw naam"
                    required
                    className="w-full bg-surface-container border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-secondary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Telefoon</label>
                  <input
                    type="tel"
                    value={telefoon}
                    onChange={(e) => setTelefoon(e.target.value)}
                    placeholder="Uw telefoonnummer"
                    className="w-full bg-surface-container border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-secondary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Bericht</label>
                  <textarea
                    value={bericht}
                    onChange={(e) => setBericht(e.target.value)}
                    placeholder="Uw bericht..."
                    rows={7}
                    maxLength={500}
                    required
                    className="w-full bg-surface-container border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-secondary resize-none transition-colors"
                  />
                  <p className="text-xs text-gray-600 text-right mt-0.5">{bericht.length}/500</p>
                </div>

                {sent && (
                  <p className="text-green-400 text-sm">
                    Uw e-mailprogramma is geopend. Verstuur de e-mail om contact op te nemen!
                  </p>
                )}

                <div className="flex gap-3 pt-1">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <FiMail size={15} /> Stuur e-mail
                  </button>
                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5c] text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <FiSend size={15} /> WhatsApp
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
