// Photography used across the site.
// RoyalJet's own photos live in /public/images. The rest are free-licence Unsplash photos.
// To swap a photo, drop a file in /public/images and point the entry at it, e.g. '/images/truck.jpg'.
// Every image has a branded gradient fallback, so a missing photo never breaks the layout.

const u = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`

export const images = {
  // RoyalJet photos
  containerShip: '/images/container-ship.jpg',
  containers: '/images/containers-stack.jpg',
  warehouse: '/images/warehouse-guangzhou.jpg',
  boxes: '/images/warehouse-guangzhou.jpg',
  port: '/images/containers-stack.jpg',

  // Stock photos
  airCargo: u('photo-1436491865332-7a61a109cc05'),
  truck: u('photo-1519003722824-194d4455a60c'),
  sourcing: u('photo-1553413077-190dd305871c'),
  payment: u('photo-1556742049-0cfed4f6a45d'),
  team: u('photo-1600880292203-757bb62b4baf'),
  handshake: u('photo-1521791136064-7986c2920216'),
}

export type ImageKey = keyof typeof images

/** Home hero slides — RoyalJet's own photography. */
export const heroSlides = [
  {
    image: '/images/container-ship.jpg',
    alt: 'Container ship loaded with cargo berthed at port',
    eyebrow: 'Sea Freight',
    title: ['Ship from China to Nigeria', 'with ease.'],
    body: 'Cost-effective ocean shipping for heavy and bulky cargo, with shared or full containers, handled end to end by RoyalJet.',
    stat: { k: 'LCL & FCL', v: 'Container options' },
  },
  {
    image: '/images/warehouse-guangzhou.jpg',
    alt: 'Customer goods wrapped and ready for shipment at the RoyalJet Guangzhou warehouse',
    eyebrow: 'Guangzhou Warehouse',
    title: ['Your goods, received', 'and packed with care.'],
    body: 'Send to our Guangzhou warehouse. We receive, check, wrap and consolidate every package before it leaves China.',
    stat: { k: 'FWB2404037', v: 'Warehouse code' },
  },
  {
    image: '/images/containers-stack.jpg',
    alt: 'Stacked shipping containers under a clear blue sky',
    eyebrow: 'Sourcing to Delivery',
    title: ['One trusted partner', 'from supplier to door.'],
    body: 'We source, pay suppliers, ship and deliver, so you save time and cut costs from start to finish.',
    stat: { k: 'CAN → LOS', v: 'Guangzhou to Lagos' },
  },
]
