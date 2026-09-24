import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls as OrbitControlsImpl } from 'three/examples/jsm/controls/OrbitControls.js'
import points from '../data/globe-points.json'

const R = 1
const DEG = Math.PI / 180

const GUANGZHOU = { lat: 23.13, lng: 113.26, name: 'Guangzhou' }
const LAGOS = { lat: 6.52, lng: 3.38, name: 'Lagos' }

// Secondary decorative lanes (China hubs → Nigerian cities we deliver to)
const LANES: [typeof GUANGZHOU, typeof GUANGZHOU][] = [
  [{ lat: 22.54, lng: 114.06, name: 'Shenzhen' }, { lat: 9.07, lng: 7.49, name: 'Abuja' }],
  [{ lat: 29.31, lng: 120.07, name: 'Yiwu' }, { lat: 4.82, lng: 7.03, name: 'Port Harcourt' }],
  [{ lat: 31.23, lng: 121.47, name: 'Shanghai' }, { lat: 12.0, lng: 8.52, name: 'Kano' }],
]

function toVec3(lat: number, lng: number, r = R) {
  const phi = (90 - lat) * DEG
  const theta = (lng + 180) * DEG
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta))
}

function arcCurve(a: { lat: number; lng: number }, b: { lat: number; lng: number }, lift = 0.45) {
  const start = toVec3(a.lat, a.lng)
  const end = toVec3(b.lat, b.lng)
  const mid = start.clone().add(end).multiplyScalar(0.5)
  const dist = start.distanceTo(end)
  mid.normalize().multiplyScalar(R + dist * lift)
  const c1 = start.clone().lerp(mid, 0.6).normalize().multiplyScalar(R + dist * lift * 0.75)
  const c2 = end.clone().lerp(mid, 0.6).normalize().multiplyScalar(R + dist * lift * 0.75)
  return new THREE.CubicBezierCurve3(start, c1, c2, end)
}

/* ---------- Land dots ---------- */
function LandDots() {
  const geometry = useMemo(() => {
    const data = points as number[]
    const pos = new Float32Array((data.length / 2) * 3)
    for (let i = 0; i < data.length; i += 2) {
      const v = toVec3(data[i], data[i + 1], R * 1.002)
      pos.set([v.x, v.y, v.z], (i / 2) * 3)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [])

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: { uSize: { value: 5.2 }, uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) } },
        vertexShader: /* glsl */ `
          uniform float uSize; uniform float uPixelRatio;
          varying float vFacing;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vec3 n = normalize(normalMatrix * normalize(position));
            vFacing = dot(n, normalize(-mv.xyz));
            gl_PointSize = uSize * uPixelRatio * (3.2 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: /* glsl */ `
          varying float vFacing;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            float a = smoothstep(0.5, 0.2, d) * smoothstep(-0.1, 0.35, vFacing);
            vec3 col = mix(vec3(0.16, 0.45, 0.95), vec3(0.62, 0.84, 1.0), vFacing);
            gl_FragColor = vec4(col, a * 0.95);
          }`,
      }),
    [],
  )
  return <points geometry={geometry} material={material} />
}

/* ---------- Atmosphere glow ---------- */
function Atmosphere() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexShader: /* glsl */ `
          varying vec3 vN; varying vec3 vV;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz);
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: /* glsl */ `
          varying vec3 vN; varying vec3 vV;
          void main() {
            // Back faces: d ~ 0 at the outer rim, ~0.45 at the planet's limb
            float d = -dot(vN, vV);
            float i = pow(smoothstep(0.0, 0.5, d), 2.2);
            gl_FragColor = vec4(0.2, 0.55, 1.0, i * 0.85);
          }`,
      }),
    [],
  )
  return (
    <mesh material={material} scale={1.13}>
      <sphereGeometry args={[R, 64, 64]} />
    </mesh>
  )
}

/* ---------- Animated route ---------- */
function Route({
  from,
  to,
  color,
  width,
  speed,
  delay = 0,
  showPlane = false,
}: {
  from: typeof GUANGZHOU
  to: typeof GUANGZHOU
  color: string
  width: number
  speed: number
  delay?: number
  showPlane?: boolean
}) {
  const curve = useMemo(() => arcCurve(from, to), [from, to])
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 96, width, 8, false), [curve, width])
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(color) } },
        vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: /* glsl */ `
          uniform float uTime; uniform vec3 uColor; varying vec2 vUv;
          void main() {
            float t = fract(uTime);
            float head = smoothstep(t - 0.35, t, vUv.x) * step(vUv.x, t);
            float base = 0.3;
            float a = max(base, head);
            gl_FragColor = vec4(uColor, a);
          }`,
      }),
    [color],
  )
  const plane = useRef<THREE.Group>(null)
  const tmp = useMemo(() => new THREE.Vector3(), [])

  useFrame(({ clock }) => {
    const t = ((clock.elapsedTime + delay) * speed) % 1
    material.uniforms.uTime.value = t
    if (plane.current) {
      const p = curve.getPointAt(Math.min(t, 0.999))
      plane.current.position.copy(p)
      tmp.copy(curve.getTangentAt(Math.min(t, 0.999))).add(p)
      plane.current.lookAt(tmp)
      const s = Math.sin(Math.PI * t)
      plane.current.scale.setScalar(0.6 + s * 0.6)
    }
  })

  return (
    <group>
      <mesh geometry={geometry} material={material} />
      {showPlane && (
        <group ref={plane}>
          <mesh>
            <sphereGeometry args={[0.018, 16, 16]} />
            <meshBasicMaterial color="#fff" />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshBasicMaterial color={color} transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        </group>
      )}
    </group>
  )
}

/* ---------- Labels (canvas sprites, no DOM overlay needed) ---------- */
function useLabelTexture(text: string) {
  return useMemo(() => {
    const scale = 4
    const font = `600 ${13 * scale}px "Outfit Variable", Outfit, system-ui, sans-serif`
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    ctx.font = font
    const padX = 12 * scale
    const w = Math.ceil(ctx.measureText(text).width + padX * 2)
    const h = 28 * scale
    canvas.width = w
    canvas.height = h
    ctx.font = font
    ctx.fillStyle = 'rgba(3, 10, 29, 0.78)'
    ctx.strokeStyle = 'rgba(255,255,255,0.18)'
    ctx.lineWidth = scale
    ctx.beginPath()
    ctx.roundRect(scale, scale, w - scale * 2, h - scale * 2, h / 2)
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = '#fff'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, padX, h / 2 + scale)
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 4
    return { tex, aspect: w / h }
  }, [text])
}

function Label({ text }: { text: string }) {
  const { tex, aspect } = useLabelTexture(text)
  const h = 0.085
  return (
    <sprite position={[0, 0.1, 0.02]} scale={[h * aspect, h, 1]} renderOrder={10}>
      <spriteMaterial map={tex} transparent depthTest={false} />
    </sprite>
  )
}

function Controls() {
  const { camera, gl, invalidate } = useThree()
  useEffect(() => {
    const c = new OrbitControlsImpl(camera, gl.domElement)
    c.enableZoom = false
    c.enablePan = false
    c.rotateSpeed = 0.5
    c.enableDamping = true
    c.minPolarAngle = Math.PI * 0.3
    c.maxPolarAngle = Math.PI * 0.7
    // Allow vertical page scrolling on touch devices
    gl.domElement.style.touchAction = 'pan-y'
    c.addEventListener('change', () => invalidate())
    let raf = 0
    const loop = () => {
      c.update()
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => {
      cancelAnimationFrame(raf)
      c.dispose()
    }
  }, [camera, gl, invalidate])
  return null
}

/* ---------- City markers ---------- */
function City({ lat, lng, name, color, label = true }: { lat: number; lng: number; name: string; color: string; label?: boolean }) {
  const pos = useMemo(() => toVec3(lat, lng, R * 1.005), [lat, lng])
  const quat = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), pos.clone().normalize()), [pos])
  const ring = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ring.current) return
    const t = (clock.elapsedTime * 0.8) % 1
    ring.current.scale.setScalar(1 + t * 2.4)
    ;(ring.current.material as THREE.MeshBasicMaterial).opacity = 0.8 * (1 - t)
  })
  return (
    <group position={pos} quaternion={quat}>
      <mesh>
        <circleGeometry args={[0.018, 24]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh ref={ring}>
        <ringGeometry args={[0.022, 0.03, 32]} />
        <meshBasicMaterial color={color} transparent depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      {label && <Label text={name} />}
    </group>
  )
}

function GlobeScene({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null)
  // Face the midpoint between China and Nigeria towards the camera
  const baseY = -((58 + 90) * DEG)
  useFrame(({ clock }) => {
    if (!group.current || !animate) return
    group.current.rotation.y = baseY + Math.sin(clock.elapsedTime * 0.15) * 0.35
  })
  return (
    <group ref={group} rotation={[0.28, baseY, 0]}>
      <mesh>
        <sphereGeometry args={[R * 0.995, 64, 64]} />
        <meshBasicMaterial color="#071a45" />
      </mesh>
      <LandDots />
      <Route from={GUANGZHOU} to={LAGOS} color="#ff9f12" width={0.011} speed={0.22} showPlane />
      {LANES.map(([a, b], i) => (
        <Route key={b.name} from={a} to={b} color="#4aa6ff" width={0.005} speed={0.16} delay={i * 1.9} />
      ))}
      <City {...GUANGZHOU} color="#ffb938" />
      <City {...LAGOS} color="#ffb938" />
      {LANES.map(([, b]) => (
        <City key={b.name} {...b} color="#4aa6ff" label={false} />
      ))}
    </group>
  )
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export default function Globe({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const [supported] = useState(hasWebGL)

  useEffect(() => {
    if (!wrap.current) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '100px' })
    io.observe(wrap.current)
    return () => io.disconnect()
  }, [])

  if (!supported) return null

  return (
    <div ref={wrap} className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 3.1], fov: 45 }}
        dpr={[1, 2]}
        frameloop={visible && !reducedMotion ? 'always' : 'demand'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        aria-label="3D globe showing the RoyalJet shipping route from Guangzhou, China to Lagos, Nigeria"
        role="img"
      >
        <Atmosphere />
        <GlobeScene animate={!reducedMotion} />
        <Controls />
      </Canvas>
    </div>
  )
}
