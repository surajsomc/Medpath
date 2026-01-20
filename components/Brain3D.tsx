'use client'

import { Brain } from 'threejs-brain-animation'

export default function Brain3D() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Brain style={{ width: '100%', height: '100%', minHeight: 400 }} />
    </div>
  )
}
