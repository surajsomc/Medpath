'use client'

import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function DNAStrand() {
  const groupRef = useRef<THREE.Group>(null)
  const basePairs = 20
  const radius = 0.5
  const height = 4
  const turns = 2

  useEffect(() => {
    if (!groupRef.current) return

    // Create DNA double helix structure
    const geometry1 = new THREE.BufferGeometry()
    const geometry2 = new THREE.BufferGeometry()
    const positions1: number[] = []
    const positions2: number[] = []
    const colors1: number[] = []
    const colors2: number[] = []

    const color1 = new THREE.Color(0x3b82f6) // Blue
    const color2 = new THREE.Color(0x8b5cf6) // Purple

    for (let i = 0; i <= basePairs; i++) {
      const t = i / basePairs
      const angle = t * Math.PI * 2 * turns
      const y = (t - 0.5) * height

      // First strand
      const x1 = Math.cos(angle) * radius
      const z1 = Math.sin(angle) * radius
      positions1.push(x1, y, z1)
      colors1.push(color1.r, color1.g, color1.b)

      // Second strand (opposite side)
      const x2 = Math.cos(angle + Math.PI) * radius
      const z2 = Math.sin(angle + Math.PI) * radius
      positions2.push(x2, y, z2)
      colors2.push(color2.r, color2.g, color2.b)

      // Add base pairs (connecting lines)
      if (i < basePairs) {
        positions1.push(x2, y, z2)
        colors1.push(0.8, 0.8, 0.9)
      }
    }

    geometry1.setAttribute('position', new THREE.Float32BufferAttribute(positions1, 3))
    geometry1.setAttribute('color', new THREE.Float32BufferAttribute(colors1, 3))
    geometry2.setAttribute('position', new THREE.Float32BufferAttribute(positions2, 3))
    geometry2.setAttribute('color', new THREE.Float32BufferAttribute(colors2, 3))

    const material1 = new THREE.LineBasicMaterial({ 
      vertexColors: true,
      linewidth: 3,
      transparent: true,
      opacity: 0.9
    })
    const material2 = new THREE.LineBasicMaterial({ 
      vertexColors: true,
      linewidth: 3,
      transparent: true,
      opacity: 0.9
    })

    const line1 = new THREE.Line(geometry1, material1)
    const line2 = new THREE.Line(geometry2, material2)

    groupRef.current.add(line1)
    groupRef.current.add(line2)

    // Add spheres for base pairs
    const sphereGeometry = new THREE.SphereGeometry(0.08, 16, 16)
    const sphereMaterial1 = new THREE.MeshBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.8 })
    const sphereMaterial2 = new THREE.MeshBasicMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.8 })

    for (let i = 0; i <= basePairs; i++) {
      const t = i / basePairs
      const angle = t * Math.PI * 2 * turns
      const y = (t - 0.5) * height

      const x1 = Math.cos(angle) * radius
      const z1 = Math.sin(angle) * radius
      const x2 = Math.cos(angle + Math.PI) * radius
      const z2 = Math.sin(angle + Math.PI) * radius

      const sphere1 = new THREE.Mesh(sphereGeometry, sphereMaterial1)
      sphere1.position.set(x1, y, z1)
      groupRef.current.add(sphere1)

      const sphere2 = new THREE.Mesh(sphereGeometry, sphereMaterial2)
      sphere2.position.set(x2, y, z2)
      groupRef.current.add(sphere2)
    }

    return () => {
      geometry1.dispose()
      geometry2.dispose()
      material1.dispose()
      material2.dispose()
      sphereGeometry.dispose()
      sphereMaterial1.dispose()
      sphereMaterial2.dispose()
    }
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return <group ref={groupRef} />
}

function FloatingMolecules() {
  const particles = useRef<THREE.Points>(null)
  
  useEffect(() => {
    if (!particles.current) return
    
    const count = 100
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    const color = new THREE.Color()
    
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8
      positions[i + 1] = (Math.random() - 0.5) * 8
      positions[i + 2] = (Math.random() - 0.5) * 8
      
      const hue = Math.random() * 0.2 + 0.5 // Blue to purple range
      color.setHSL(hue, 0.7, 0.6)
      colors[i] = color.r
      colors[i + 1] = color.g
      colors[i + 2] = color.b
    }
    
    particles.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particles.current.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  }, [])

  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.x = state.clock.elapsedTime * 0.05
      particles.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <points ref={particles}>
      <bufferGeometry />
      <pointsMaterial size={0.1} vertexColors transparent opacity={0.6} />
    </points>
  )
}

export default function DNAHelix() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        <DNAStrand />
        <FloatingMolecules />
        <OrbitControls 
          enableZoom={true} 
          autoRotate 
          autoRotateSpeed={0.5}
          minDistance={4}
          maxDistance={10}
        />
      </Canvas>
    </div>
  )
}
