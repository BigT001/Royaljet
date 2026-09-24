import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

type ContainerProps = {
  color: string
  position: [number, number, number]
  rotation?: [number, number, number]
  phase?: number
  animate: boolean
}

const L = 2.4
const H = 1
const W = 1

/** A stylised 20ft shipping container with corrugated side walls. */
function ShippingContainer({ color, position, rotation = [0, 0, 0], phase = 0, animate }: ContainerProps) {
  const ref = useRef<THREE.Group>(null)
  const mats = useMemo(() => {
    const c = new THREE.Color(color)
    return {
      body: new THREE.MeshStandardMaterial({ color: c, roughness: 0.55, metalness: 0.35 }),
      rib: new THREE.MeshStandardMaterial({ color: c.clone().multiplyScalar(0.82), roughness: 0.5, metalness: 0.4 }),
      frame: new THREE.MeshStandardMaterial({ color: c.clone().multiplyScalar(0.55), roughness: 0.4, metalness: 0.6 }),
    }
  }, [color])

  const ribs = useMemo(() => {
    const count = 16
    return Array.from({ length: count }, (_, i) => -L / 2 + 0.12 + (i * (L - 0.24)) / (count - 1))
  }, [])

  useFrame(({ clock }) => {
    if (!ref.current || !animate) return
    const t = clock.elapsedTime + phase
    ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.08
    ref.current.rotation.z = rotation[2] + Math.sin(t * 0.6) * 0.02
  })

  return (
    <group ref={ref} position={position} rotation={rotation}>
      <mesh material={mats.body} castShadow>
        <boxGeometry args={[L, H, W]} />
      </mesh>
      {ribs.map((x) => (
        <group key={x}>
          <mesh material={mats.rib} position={[x, 0, W / 2 + 0.012]}>
            <boxGeometry args={[0.06, H * 0.86, 0.024]} />
          </mesh>
          <mesh material={mats.rib} position={[x, 0, -W / 2 - 0.012]}>
            <boxGeometry args={[0.06, H * 0.86, 0.024]} />
          </mesh>
        </group>
      ))}
      {/* Corner posts and rails */}
      {[
        [-L / 2, 0, W / 2],
        [L / 2, 0, W / 2],
        [-L / 2, 0, -W / 2],
        [L / 2, 0, -W / 2],
      ].map((p, i) => (
        <mesh key={i} material={mats.frame} position={p as [number, number, number]}>
          <boxGeometry args={[0.08, H + 0.02, 0.08]} />
        </mesh>
      ))}
      {[H / 2, -H / 2].map((y) =>
        [W / 2, -W / 2].map((z) => (
          <mesh key={`${y}${z}`} material={mats.frame} position={[0, y, z]}>
            <boxGeometry args={[L + 0.02, 0.07, 0.07]} />
          </mesh>
        )),
      )}
      {/* Door bars on the end */}
      {[-0.22, -0.08, 0.08, 0.22].map((z) => (
        <mesh key={z} material={mats.frame} position={[L / 2 + 0.02, 0, z]}>
          <boxGeometry args={[0.02, H * 0.9, 0.025]} />
        </mesh>
      ))}
    </group>
  )
}

/** Pulls the camera back on narrow/portrait canvases so the stack is never cropped. */
function ResponsiveCamera() {
  const { camera, size } = useThree()
  useEffect(() => {
    const aspect = size.width / size.height
    camera.position.z = aspect < 1 ? 6.4 / Math.max(aspect, 0.55) : 6.4
    camera.updateProjectionMatrix()
  }, [camera, size])
  return null
}

function Stack({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null)
  useFrame(({ pointer, clock }) => {
    if (!group.current) return
    const targetY = -0.55 + pointer.x * 0.25 + (animate ? Math.sin(clock.elapsedTime * 0.2) * 0.1 : 0)
    const targetX = 0.18 - pointer.y * 0.12
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.05
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.05
  })
  return (
    <group ref={group} rotation={[0.18, -0.55, 0]} position={[0, -0.4, 0]}>
      <ShippingContainer color="#0a68e0" position={[-0.6, -0.55, 0.62]} animate={animate} />
      <ShippingContainer color="#f07d05" position={[0.55, -0.55, -0.55]} phase={1.2} animate={animate} />
      <ShippingContainer color="#113d75" position={[-0.1, 0.5, 0.05]} rotation={[0, 0.12, 0]} phase={2.1} animate={animate} />
      <ShippingContainer color="#1a86f5" position={[0.25, 1.55, 0.1]} rotation={[0, -0.25, 0]} phase={0.6} animate={animate} />
    </group>
  )
}

export default function Containers({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!wrap.current) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '100px' })
    io.observe(wrap.current)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrap} className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0.6, 6.4], fov: 40 }}
        dpr={[1, 2]}
        frameloop={visible ? 'always' : 'never'}
        gl={{ antialias: true, alpha: true }}
        role="img"
        aria-label="Stack of RoyalJet shipping containers"
      >
        <ambientLight intensity={0.9} />
        <hemisphereLight args={['#bcdbff', '#061331', 1.2]} />
        <directionalLight position={[4, 6, 5]} intensity={2.2} />
        <directionalLight position={[-5, 2, -3]} intensity={0.8} color="#ffb938" />
        <ResponsiveCamera />
        <Stack animate={!reducedMotion} />
      </Canvas>
    </div>
  )
}
