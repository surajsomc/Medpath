'use client'

import { useEffect, useRef } from 'react'
import Brain3D from './Brain3D'

interface HeroProps {
  content: {
    title?: string
    subtitle?: string
  }
}

export default function AnimatedHero({ content }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = 600

    // DNA helix particles
    const particles: Array<{
      x: number
      y: number
      radius: number
      speed: number
      angle: number
    }> = []

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.2,
        angle: Math.random() * Math.PI * 2
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach((particle, i) => {
        particle.angle += particle.speed * 0.01
        particle.x += Math.cos(particle.angle) * 0.5
        particle.y += Math.sin(particle.angle) * 0.3

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + Math.sin(particle.angle) * 0.1})`
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = 600
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-32 overflow-hidden">
      {/* Animated gradient background - UCSD navy */}
      <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800"></div>
      
      {/* Canvas animation layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Floating medical icons */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-16 h-16 animate-float opacity-20">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <div className="absolute top-40 right-20 w-12 h-12 animate-float opacity-20" style={{ animationDelay: '1s' }}>
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="absolute bottom-20 left-1/4 w-14 h-14 animate-float opacity-20" style={{ animationDelay: '2s' }}>
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
          </svg>
        </div>
      </div>

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 glass-dark"></div>

      {/* 3D Brain background - behind text, above overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
        <div className="w-full max-w-3xl h-full min-h-[380px] max-h-[500px] opacity-30">
          <Brain3D />
        </div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 leading-tight">
          <span className="block bg-gradient-to-r from-white via-primary-100 to-ucsd-sand bg-clip-text text-transparent drop-shadow-2xl">
            {content.title || "PRE-MED?"}
          </span>
          <span className="block mt-2 text-5xl md:text-7xl bg-gradient-to-r from-ucsd-gold via-primary-200 to-ucsd-blue bg-clip-text text-transparent">
            WE'RE HERE TO HELP
          </span>
        </h1>
        
        {content.subtitle && (
          <p className="text-xl md:text-2xl text-primary-100 font-light mb-8 drop-shadow-lg max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        )}

        {/* Scroll indicator */}
        <div className="mt-16 animate-bounce">
          <svg className="w-6 h-6 mx-auto text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  )
}
