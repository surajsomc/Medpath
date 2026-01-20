'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function Heart() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  // Create realistic heart geometry using bezier curves (based on GitHub examples)
  const heartGeometry = useMemo(() => {
    const x = 0, y = 0
    const heartShape = new THREE.Shape()
    
    // Create heart shape using bezier curves (from MattSchroyer/heart and other GitHub examples)
    heartShape.moveTo(x + 5, y + 5)
    heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y)
    heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7)
    heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19)
    heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7)
    heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y)
    heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5)
    
    // Extrude the shape to create 3D volume
    const extrudeSettings = {
      depth: 8,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 2,
      bevelSize: 1,
      bevelThickness: 1
    }
    
    const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings)
    
    // Scale to appropriate size
    geometry.scale(0.15, 0.15, 0.15)
    
    return geometry
  }, [])
  
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle pulsing animation (heartbeat effect)
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.03 + 1
      meshRef.current.scale.set(pulse, pulse, pulse)
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <mesh ref={meshRef} geometry={heartGeometry} rotation={[0, 0, Math.PI]}>
      <meshStandardMaterial
        color="#8b0000"
        roughness={0.3}
        metalness={0.2}
        emissive="#4a0000"
        emissiveIntensity={0.1}
      />
    </mesh>
  )
}

function HeartbeatParticles() {
  const particles = useRef<THREE.Points>(null)
  
  useFrame((state) => {
    if (particles.current) {
      const time = state.clock.elapsedTime
      const positions = particles.current.geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < positions.length; i += 3) {
        const i3 = i / 3
        const angle = (i3 / 20) * Math.PI * 2
        const radius = 2 + Math.sin(time * 2 + angle) * 0.3
        positions[i] = Math.cos(angle) * radius
        positions[i + 1] = Math.sin(angle) * radius + Math.sin(time * 3 + angle) * 0.5
        positions[i + 2] = Math.sin(angle * 2) * radius
      }
      particles.current.geometry.attributes.position.needsUpdate = true
      particles.current.rotation.y = time * 0.1
    }
  })

  const count = 40
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const color = new THREE.Color()
  
  for (let i = 0; i < count * 3; i += 3) {
    const i3 = i / 3
    const angle = (i3 / count) * Math.PI * 2
    const radius = 2
    positions[i] = Math.cos(angle) * radius
    positions[i + 1] = Math.sin(angle) * radius
    positions[i + 2] = Math.sin(angle * 2) * radius
    
    color.setHSL(0, 0.8, 0.6) // Red hue
    colors[i] = color.r
    colors[i + 1] = color.g
    colors[i + 2] = color.b
  }

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.15} vertexColors transparent opacity={0.8} />
    </points>
  )
}

export default function Heart3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-5, -5, 5]} intensity={0.8} color="#ff6b6b" />
        <directionalLight position={[0, 10, 5]} intensity={0.8} />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} />
        <Heart />
        <HeartbeatParticles />
        <OrbitControls 
          enableZoom={true} 
          autoRotate 
          autoRotateSpeed={0.3}
          minDistance={4}
          maxDistance={10}
        />
      </Canvas>
    </div>
  )
}
