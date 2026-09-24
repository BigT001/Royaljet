// Generates an evenly distributed set of land points (Fibonacci sphere sampled
// against Natural Earth land polygons) for the dotted 3D globe.
// Output: src/data/globe-points.json as a flat [lat, lng, lat, lng, ...] array.
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { feature } from 'topojson-client'
import { geoContains } from 'd3-geo'

const require = createRequire(import.meta.url)
const topo = JSON.parse(readFileSync(require.resolve('world-atlas/land-110m.json'), 'utf8'))
const land = feature(topo, topo.objects.land)

const SAMPLES = 16000
const golden = Math.PI * (3 - Math.sqrt(5))
const out = []
for (let i = 0; i < SAMPLES; i++) {
  const y = 1 - (i / (SAMPLES - 1)) * 2
  const theta = golden * i
  const lat = (Math.asin(y) * 180) / Math.PI
  const lng = ((((theta * 180) / Math.PI) % 360) + 540) % 360 - 180
  if (lat < -60) continue // skip Antarctica for a cleaner look
  if (geoContains(land, [lng, lat])) out.push(+lat.toFixed(2), +lng.toFixed(2))
}
writeFileSync(new URL('../src/data/globe-points.json', import.meta.url), JSON.stringify(out))
console.log(`wrote ${out.length / 2} land points`)
