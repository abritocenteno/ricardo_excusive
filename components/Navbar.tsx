'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FiMenu, FiX } from 'react-icons/fi'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/aanbod', label: 'Aanbod' },
  { href: '/services', label: 'Services' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="bg-surface-container-lowest border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/RENoBG.png"
            alt="Ricardo's Exclusive"
            width={44}
            height={44}
            className="object-contain"
          />
          <span className="font-bold text-lg hidden sm:block text-white">
            Ricardo&apos;s Exclusive
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'text-secondary'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-surface-container-lowest border-t border-white/10 px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block py-3 text-sm font-medium border-b border-white/5 ${
                pathname === link.href
                  ? 'text-secondary'
                  : 'text-gray-300'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
