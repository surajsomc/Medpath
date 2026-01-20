'use client'

import { Brain } from 'threejs-brain-animation'

export default function Brain3D() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Brain 
        width={800} 
        height={600}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
