import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, QuadraticBezierLine, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

const R = 1.6
const DEG = Math.PI / 180

/** lon = 0 faces +z (the camera) */
function toVec(lat, lon, r = R) {
  const la = lat * DEG
  const lo = lon * DEG
  return new THREE.Vector3(r * Math.cos(la) * Math.sin(lo), r * Math.sin(la), r * Math.cos(la) * Math.cos(lo))
}

// Very rough continents as [lat, lon, radius°] blobs: a stylised, low-poly world.
const LAND = [
  [8, 20, 22], [-10, 25, 16], [-25, 25, 11], [20, 0, 15], [22, 20, 14], [29, -7, 8], [30, 28, 8], [12, 40, 8], [-19, 47, 4],
  [48, 10, 12], [55, 25, 10], [63, 15, 8], [41, -4, 6], [53, -2, 4], [44, 12, 4],
  [50, 70, 20], [60, 100, 20], [35, 80, 12], [22, 78, 8], [30, 105, 14], [15, 100, 7], [45, 120, 10], [65, 140, 14], [25, 45, 10], [36, 138, 4],
  [50, -100, 18], [40, -95, 14], [60, -120, 14], [65, -90, 12], [20, -100, 7], [72, -42, 10],
  [-5, -60, 14], [-20, -58, 12], [-35, -66, 7], [5, -70, 6],
  [-25, 135, 12],
]
const LAND_VEC = LAND.map(([la, lo, r]) => ({ v: toVec(la, lo, 1), cos: Math.cos(r * DEG) }))
const MOROCCO = [31.8, -7.1]
const ROUTES = [
  [48.85, 2.35], // Paris
  [51.5, -0.12], // London
  [40.7, -74], // New York
  [25.2, 55.3], // Dubai
  [14.7, -17.4], // Dakar
]

function isLand(dir) {
  return LAND_VEC.some(({ v, cos }) => dir.dot(v) > cos)
}

function useGlobeGeometry() {
  return useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(R, 12) // polyhedron geometries are already non-indexed
    const pos = geo.attributes.position
    const colors = new Float32Array(pos.count * 3)
    const ocean = new THREE.Color('#2F4BA8')
    const land = new THREE.Color('#E3A33B')
    const desert = new THREE.Color('#D9774F')
    const tmp = new THREE.Color()
    const morocco = new THREE.Color('#F4EBDD')
    const a = new THREE.Vector3()
    const b = new THREE.Vector3()
    const c = new THREE.Vector3()
    const mVec = toVec(MOROCCO[0], MOROCCO[1], 1)
    for (let i = 0; i < pos.count; i += 3) {
      a.fromBufferAttribute(pos, i)
      b.fromBufferAttribute(pos, i + 1)
      c.fromBufferAttribute(pos, i + 2)
      const centroid = a.add(b).add(c).divideScalar(3).normalize()
      const lat = Math.asin(centroid.y) / DEG
      let col
      // subtle per-face jitter keeps the low-poly facets readable without looking noisy
      const jitter = (Math.sin(i * 12.9898) * 43758.5453) % 1
      if (centroid.dot(mVec) > Math.cos(4.5 * DEG)) col = morocco
      else if (lat < -68 || isLand(centroid)) col = tmp.copy(land).lerp(desert, Math.abs(lat) < 35 ? 0.55 + jitter * 0.15 : jitter * 0.2)
      else col = tmp.copy(ocean).offsetHSL(0, 0, jitter * 0.03)
      for (let k = 0; k < 3; k++) col.toArray(colors, (i + k) * 3)
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.computeVertexNormals()
    return geo
  }, [])
}

function Marker() {
  const ring = useRef()
  const p = useMemo(() => toVec(MOROCCO[0], MOROCCO[1], R), [])
  const q = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), p.clone().normalize()), [p])
  useFrame(({ clock }) => {
    const t = (clock.elapsedTime % 1.8) / 1.8
    ring.current.scale.setScalar(1 + t * 2.4)
    ring.current.material.opacity = 1 - t
  })
  return (
    <group position={p} quaternion={q}>
      <mesh position={[0, 0.16, 0]}>
        <coneGeometry args={[0.05, 0.22, 12]} />
        <meshStandardMaterial color="#F4EBDD" emissive="#E3A33B" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.07, 20, 20]} />
        <meshStandardMaterial color="#C65D3B" emissive="#C65D3B" emissiveIntensity={0.5} />
      </mesh>
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[0.06, 0.09, 32]} />
        <meshBasicMaterial color="#F4EBDD" transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function Routes() {
  const from = useMemo(() => toVec(MOROCCO[0], MOROCCO[1], R), [])
  return ROUTES.map(([la, lo]) => {
    const to = toVec(la, lo, R)
    const mid = from.clone().add(to).multiplyScalar(0.5)
    const lift = 1 + from.distanceTo(to) * 0.35
    mid.normalize().multiplyScalar(R * lift)
    return (
      <group key={`${la}${lo}`}>
        <QuadraticBezierLine start={from} end={to} mid={mid} color="#F4EBDD" lineWidth={1.4} dashed dashScale={20} dashSize={0.6} gapSize={0.4} transparent opacity={0.85} />
        <mesh position={to}>
          <sphereGeometry args={[0.03, 12, 12]} />
          <meshBasicMaterial color="#F4EBDD" />
        </mesh>
      </group>
    )
  })
}

function World({ progress }) {
  const group = useRef()
  const geo = useGlobeGeometry()
  useFrame((state, dt) => {
    const p = progress ? progress.get() : 0
    // idle spin plus a scroll-linked swing: the globe turns away from Morocco then comes home
    group.current.userData.idle = (group.current.userData.idle || 0) + dt * 0.08
    const target = Math.sin(group.current.userData.idle) * 0.25 + Math.sin(p * Math.PI) * -1.4
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, target, 4, dt)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, 0.5 - p * 0.2, 4, dt)
  })
  return (
    <group ref={group} rotation={[0.5, 0, 0]}>
      <mesh geometry={geo}>
        <meshStandardMaterial vertexColors flatShading roughness={0.85} metalness={0.05} />
      </mesh>
      <mesh scale={1.08}>
        <sphereGeometry args={[R, 48, 48]} />
        <meshBasicMaterial color="#E3A33B" transparent opacity={0.07} side={THREE.BackSide} />
      </mesh>
      <Marker />
      <Routes />
    </group>
  )
}

export default function Globe({ progress }) {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5.4], fov: 40 }} gl={{ antialias: true, alpha: true }} aria-label="3D globe with Morocco highlighted">
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 3, 5]} intensity={2.2} color="#FFF1D6" />
      <directionalLight position={[-5, -2, -3]} intensity={0.6} color="#7FA8E0" />
      <World progress={progress} />
      <Sparkles count={60} scale={7} size={2} speed={0.3} color="#E3A33B" opacity={0.6} />
      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
    </Canvas>
  )
}
