import { Canvas } from '@react-three/fiber'
import { Preload, Stars } from '@react-three/drei'
import FloatingGeometry from './FloatingGeometry'

export default function ParticleField() {
  return (
    <div className="absolute inset-0">
      <Canvas
        className="!bg-transparent"
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(0x000000, 0)
          scene.background = null
        }}
      >
        <fog attach="fog" args={['#050508', 6, 11]} />
        <Stars radius={7} depth={3} count={900} factor={2.4} saturation={0} fade speed={0.35} />
        <FloatingGeometry />
        <Preload all />
      </Canvas>
    </div>
  )
}
