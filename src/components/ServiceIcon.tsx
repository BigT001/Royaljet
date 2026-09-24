import { Boxes, Plane, Search, ShieldCheck, Ship, Truck, Wallet, Warehouse, type LucideProps } from 'lucide-react'
import type { ServiceIcon as IconName } from '../data/site'

const map = {
  plane: Plane,
  ship: Ship,
  search: Search,
  boxes: Boxes,
  wallet: Wallet,
  warehouse: Warehouse,
  truck: Truck,
  shield: ShieldCheck,
} satisfies Record<IconName, unknown>

export default function ServiceIcon({ name, ...props }: { name: IconName } & LucideProps) {
  const Icon = map[name]
  return <Icon {...props} />
}
