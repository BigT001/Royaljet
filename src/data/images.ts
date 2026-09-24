// Photography used across the site. Hosted on Unsplash (free commercial licence).
// To use your own photos, drop files in /public/images and replace a URL with e.g. '/images/warehouse.jpg'.
// Every image has a branded gradient fallback, so a missing photo never breaks the layout.

const u = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`

export const images = {
  heroPort: u('photo-1494412574643-ff11b0a5c1c3', 2000),
  containerShip: u('photo-1578575437130-527eed3abbec'),
  containers: u('photo-1605745341112-85968b19335b'),
  airCargo: u('photo-1436491865332-7a61a109cc05'),
  warehouse: u('photo-1586528116311-ad8dd3c8310d'),
  boxes: u('photo-1566576721346-d4a3b4eaeb55'),
  truck: u('photo-1519003722824-194d4455a60c'),
  sourcing: u('photo-1553413077-190dd305871c'),
  payment: u('photo-1556742049-0cfed4f6a45d'),
  port: u('photo-1605745341112-85968b19335b'),
  team: u('photo-1600880292203-757bb62b4baf'),
  handshake: u('photo-1521791136064-7986c2920216'),
}

export type ImageKey = keyof typeof images
