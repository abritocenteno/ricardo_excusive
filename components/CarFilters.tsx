'use client'

interface FilterState {
  merk: string
  brandstof: string
  bouwjaarMin: string
  bouwjaarMax: string
  showSold: boolean
}

interface CarFiltersProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
  brands: string[]
  fuels: string[]
}

export default function CarFilters({ filters, onChange, brands, fuels }: CarFiltersProps) {
  function update(key: keyof FilterState, value: string | boolean) {
    onChange({ ...filters, [key]: value })
  }

  function reset() {
    onChange({ merk: '', brandstof: '', bouwjaarMin: '', bouwjaarMax: '', showSold: false })
  }

  return (
    <div className="bg-[#1a1b23] rounded-xl p-4 border border-white/5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-semibold">Filters</h2>
        <button
          onClick={reset}
          className="text-xs text-gray-400 hover:text-white transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-3">
        {/* Merk */}
        <div>
          <label className="block text-xs text-gray-400 mb-1">Merk</label>
          <select
            value={filters.merk}
            onChange={(e) => update('merk', e.target.value)}
            className="w-full bg-[#0e0f14] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-purple"
          >
            <option value="">Alle merken</option>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        {/* Brandstof */}
        <div>
          <label className="block text-xs text-gray-400 mb-1">Brandstof</label>
          <select
            value={filters.brandstof}
            onChange={(e) => update('brandstof', e.target.value)}
            className="w-full bg-[#0e0f14] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-purple"
          >
            <option value="">Alle brandstof</option>
            {fuels.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* Bouwjaar min */}
        <div>
          <label className="block text-xs text-gray-400 mb-1">Bouwjaar (van)</label>
          <input
            type="number"
            placeholder="2000"
            value={filters.bouwjaarMin}
            onChange={(e) => update('bouwjaarMin', e.target.value)}
            className="w-full bg-[#0e0f14] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-purple"
          />
        </div>

        {/* Bouwjaar max */}
        <div>
          <label className="block text-xs text-gray-400 mb-1">Bouwjaar (tot)</label>
          <input
            type="number"
            placeholder={new Date().getFullYear().toString()}
            value={filters.bouwjaarMax}
            onChange={(e) => update('bouwjaarMax', e.target.value)}
            className="w-full bg-[#0e0f14] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-purple"
          />
        </div>

        {/* Show sold */}
        <div className="col-span-2 sm:col-span-4 lg:col-span-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <div
              className={`w-10 h-5 rounded-full transition-colors relative ${
                filters.showSold ? 'bg-brand-purple' : 'bg-gray-700'
              }`}
              onClick={() => update('showSold', !filters.showSold)}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                  filters.showSold ? 'translate-x-5' : ''
                }`}
              />
            </div>
            <span className="text-sm text-gray-300">Toon verkochte auto&apos;s</span>
          </label>
        </div>
      </div>
    </div>
  )
}
