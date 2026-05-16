import { useFrame, useThree } from '@react-three/fiber'
import { Float, Icosahedron, MeshDistortMaterial } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function OrbitingParticles() {
  const points = useRef()
  const positions = useMemo(() => {
    const count = 420
    const data = new Float32Array(count * 3)
    for (let index = 0; index < count; index += 1) {
      const angle = (index / count) * Math.PI * 2
      const radius = 2.35 + Math.sin(index * 0.37) * 0.16
      data[index * 3] = Math.cos(angle) * radius
      data[index * 3 + 1] = Math.sin(index * 0.19) * 0.22
      data[index * 3 + 2] = Math.sin(angle) * radius
    }
    return data
  }, [])

  useFrame((_, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.2
      points.current.rotation.z += delta * 0.04
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#00D4FF" transparent opacity={0.82} sizeAttenuation depthWrite={false} />
    </points>
  )
}

function MouseLight() {
  const light = useRef()
  const { pointer } = useThree()

  useFrame(() => {
    if (!light.current) return
    light.current.position.x = THREE.MathUtils.lerp(light.current.position.x, pointer.x * 4, 0.08)
    light.current.position.y = THREE.MathUtils.lerp(light.current.position.y, pointer.y * 3, 0.08)
  })

  return <pointLight ref={light} position={[2, 2, 4]} intensity={16} color="#9adfff" distance={8} />
}

export default function FloatingGeometry() {
  const group = useRef()
  const { pointer } = useThree()

  useFrame((_, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.18
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.y * 0.24, 0.08)
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -pointer.x * 0.18, 0.08)
  })

  return (
    <group ref={group}>
      <ambientLight intensity={0.65} />
      <MouseLight />
      <Float speed={1.4} rotationIntensity={0.42} floatIntensity={0.72}>
        <Icosahedron args={[1.34, 2]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#6C63FF"
            distort={0.18}
            speed={1.1}
            roughness={0.28}
            metalness={0.62}
            transparent
            opacity={0.9}
          />
        </Icosahedron>
        <Icosahedron args={[1.58, 1]}>
          <meshBasicMaterial color="#00D4FF" wireframe transparent opacity={0.32} />
        </Icosahedron>
      </Float>
      <OrbitingParticles />
    </group>
  )
}
