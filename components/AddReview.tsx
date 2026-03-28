'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import StarRating from './StarRating'

interface AddReviewProps {
  onAdded: () => void
}

export default function AddReview({ onAdded }: AddReviewProps) {
  const [naam, setNaam] = useState('')
  const [bericht, setBericht] = useState('')
  const [sterren, setSterren] = useState(5)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!naam.trim() || !bericht.trim()) {
      setError('Vul alle velden in.')
      return
    }
    setLoading(true)
    setError('')

    const { error: supaErr } = await supabase
      .from('reviews')
      .insert({ naam: naam.trim(), bericht: bericht.trim(), aantal_sterren: sterren })

    setLoading(false)
    if (supaErr) {
      setError('Er is een fout opgetreden. Probeer opnieuw.')
    } else {
      setSuccess(true)
      setNaam('')
      setBericht('')
      setSterren(5)
      onAdded()
      setTimeout(() => setSuccess(false), 3000)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1a1b23] rounded-xl p-5 border border-white/5 space-y-4"
    >
      <h3 className="font-semibold text-white">Schrijf een recensie</h3>

      <div>
        <label className="block text-xs text-gray-400 mb-1">Naam</label>
        <input
          type="text"
          value={naam}
          onChange={(e) => setNaam(e.target.value)}
          placeholder="Uw naam"
          className="w-full bg-[#0e0f14] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-purple"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-400 mb-1">Uw beoordeling</label>
        <StarRating rating={sterren} interactive onChange={setSterren} size="lg" />
      </div>

      <div>
        <label className="block text-xs text-gray-400 mb-1">Bericht</label>
        <textarea
          value={bericht}
          onChange={(e) => setBericht(e.target.value)}
          placeholder="Uw ervaring..."
          rows={4}
          maxLength={500}
          className="w-full bg-[#0e0f14] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-purple resize-none"
        />
        <p className="text-xs text-gray-600 text-right mt-0.5">{bericht.length}/500</p>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}
      {success && <p className="text-green-400 text-sm">Uw recensie is geplaatst!</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-purple hover:bg-brand-accent disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors"
      >
        {loading ? 'Verzenden...' : 'Verzend recensie'}
      </button>
    </form>
  )
}
