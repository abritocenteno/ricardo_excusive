'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { AutoDetails } from '@/lib/types'
import VehicleCard from '@/components/VehicleCard'
import VehicleCardSkeleton from '@/components/VehicleCardSkeleton'
import VehicleFilters from '@/components/VehicleFilters'

export interface FilterState {
  merk: string
  brandstof: string
  bouwjaarMin: string
  bouwjaarMax: string
  showSold: boolean
}

type SortKey = 'merk_asc' | 'prijs_asc' | 'prijs_desc' | 'bouwjaar_desc' | 'bouwjaar_asc'

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'merk_asc',      label: 'Merk (A–Z)' },
  { value: 'prijs_asc',     label: 'Prijs (laag–hoog)' },
  { value: 'prijs_desc',    label: 'Prijs (hoog–laag)' },
  { value: 'bouwjaar_desc', label: 'Bouwjaar (nieuw–oud)' },
  { value: 'bouwjaar_asc',  label: 'Bouwjaar (oud–nieuw)' },
]

function sortVehicles(vehicles: AutoDetails[], key: SortKey): AutoDetails[] {
  return [...vehicles].sort((a, b) => {
    switch (key) {
      case 'merk_asc':
        return (a.merk ?? '').localeCompare(b.merk ?? '')
      case 'prijs_asc':
        return (a.vraagprijs ?? 0) - (b.vraagprijs ?? 0)
      case 'prijs_desc':
        return (b.vraagprijs ?? 0) - (a.vraagprijs ?? 0)
      case 'bouwjaar_desc':
        return parseInt(b.bouwjaar ?? '0') - parseInt(a.bouwjaar ?? '0')
      case 'bouwjaar_asc':
        return parseInt(a.bouwjaar ?? '0') - parseInt(b.bouwjaar ?? '0')
    }
  })
}

export default function AanbodPage() {
  const [vehicles, setVehicles] = useState<AutoDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [sortKey, setSortKey] = useState<SortKey>('merk_asc')
  const [filters, setFilters] = useState<FilterState>({
    merk: '',
    brandstof: '',
    bouwjaarMin: '',
    bouwjaarMax: '',
    showSold: false,
  })

  useEffect(() => {
    async function load() {
      setLoading(true)
      const { data } = await supabase
        .from('auto_details')
        .select('*')
        .order('created_at', { ascending: false })
      setVehicles(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const brands = Array.from(
    new Set(vehicles.map((v) => v.merk).filter(Boolean) as string[])
  ).sort()
  const fuels = Array.from(
    new Set(vehicles.map((v) => v.brandstof).filter(Boolean) as string[])
  ).sort()

  const filtered = vehicles.filter((v) => {
    if (!filters.showSold && v.sold) return false
    if (filters.merk && v.merk !== filters.merk) return false
    if (filters.brandstof && v.brandstof !== filters.brandstof) return false
    if (
      filters.bouwjaarMin &&
      v.bouwjaar &&
      parseInt(v.bouwjaar) < parseInt(filters.bouwjaarMin)
    )
      return false
    if (
      filters.bouwjaarMax &&
      v.bouwjaar &&
      parseInt(v.bouwjaar) > parseInt(filters.bouwjaarMax)
    )
      return false
    return true
  })

  const sorted = sortVehicles(filtered, sortKey)

  return (
    <div className="bg-surface min-h-screen">
      {/* Page header */}
      <div className="bg-surface-container-low border-b border-outline-variant">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <p className="text-secondary text-sm font-semibold uppercase tracking-wider mb-1">
            Voorraad
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Ons aanbod</h1>
          <p className="text-gray-400 mt-2">
            Ontdek onze collectie zorgvuldig geselecteerde voertuigen.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar filters */}
          <aside className="lg:w-72 shrink-0">
            <VehicleFilters
              filters={filters}
              onChange={setFilters}
              brands={brands}
              fuels={fuels}
            />
          </aside>

          {/* Vehicle grid */}
          <div className="flex-1">
            {loading ? (
              <>
                <div className="h-5 w-32 bg-surface-container rounded animate-pulse mb-4" />
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <VehicleCardSkeleton key={i} />
                  ))}
                </div>
              </>
            ) : filtered.length === 0 ? (
              <div className="text-center py-24">
                <div className="text-5xl mb-4">🔍</div>
                <p className="text-gray-300 text-lg font-medium">
                  Geen voertuigen gevonden
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Pas de filters aan om meer resultaten te zien.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between gap-4 mb-5">
                  <p className="text-gray-500 text-sm">
                    {filtered.length} voertuig{filtered.length !== 1 ? 'en' : ''} gevonden
                  </p>
                  <select
                    value={sortKey}
                    onChange={(e) => setSortKey(e.target.value as SortKey)}
                    className="bg-surface-container border border-white/10 text-sm text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-secondary cursor-pointer"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {sorted.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
