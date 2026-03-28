export interface AanbodList {
  id: string
  created_at: string
  merk: string | null
  model: string | null
  brandstof: string | null
  bouwjaar: string | null
  sold: boolean | null
}

export interface AutoDetails {
  id: string
  created_at: string
  merk: string | null
  model: string | null
  brandstof: string | null
  kmstand: number | null
  beschrijving: string | null
  image_url: string | null
  aanbod_id: string | null
  bouwjaar: string | null
  vraagprijs: number | null
  optiesInterieur: string[]
  optiesExterieur: string[]
  optiesComfort: string[]
  optiesInfotainment: string[]
  optiesVeiligheid: string[]
  optiesMotor: string[]
  sold: boolean | null
}

export interface AanbodImages {
  id: string
  created_at: string
  aanbod_id: string | null
  url: string[]
}

export interface Review {
  id: string
  created_at: string
  naam: string | null
  bericht: string | null
  aantal_sterren: number | null
}

export interface Optie {
  id: string
  created_at: string
  categorie: string | null
  optie: string | null
}
