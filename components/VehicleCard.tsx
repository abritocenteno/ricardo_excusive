import { AutoDetails } from '@/lib/types'
import CarCard from './CarCard'

export default function VehicleCard({ vehicle }: { vehicle: AutoDetails }) {
  return <CarCard car={vehicle} />
}
