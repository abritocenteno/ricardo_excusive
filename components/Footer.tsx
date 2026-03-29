import Image from 'next/image'
import Link from 'next/link'
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-white/10 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Brand */}
        <div className="flex flex-col gap-3">
          <Image
            src="/images/RENoBG.png"
            alt="Ricardo's Exclusive"
            width={52}
            height={52}
            className="object-contain"
          />
          <p className="text-white font-bold">Ricardo&apos;s Exclusive Automotive</p>
          <p className="text-gray-400 text-sm">
            Kwaliteitsauto&apos;s en betrouwbare service in Zeeland.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-white font-semibold mb-3">Navigatie</p>
          <ul className="space-y-2 text-sm text-gray-400">
            {[
              { href: '/', label: 'Home' },
              { href: '/aanbod', label: 'Aanbod' },
              { href: '/services', label: 'Services' },
              { href: '/reviews', label: 'Reviews' },
              { href: '/contact', label: 'Contact' },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-white font-semibold mb-3">Contact</p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <FiMapPin className="mt-0.5 shrink-0 text-secondary" />
              <span>Voederheil 9C, 5411RJ Zeeland</span>
            </li>
            <li className="flex items-center gap-2">
              <FiPhone className="shrink-0 text-secondary" />
              <a href="tel:+31644922136" className="hover:text-white transition-colors">
                +31 6 44 92 21 36
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FiMail className="shrink-0 text-secondary" />
              <a
                href="mailto:ricardo.exclusives@hotmail.com"
                className="hover:text-white transition-colors"
              >
                ricardo.exclusives@hotmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-gray-600">
        &copy; {new Date().getFullYear()} Ricardo&apos;s Exclusive Automotive. Alle rechten voorbehouden.
      </div>
    </footer>
  )
}
