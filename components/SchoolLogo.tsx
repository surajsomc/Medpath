'use client'

import { useState } from 'react'
import { GraduationCap } from 'lucide-react'

// Static logo URLs for domains where Google/DuckDuckGo favicons fail (tried first).
// Wikimedia Commons Special:FilePath redirects to the image.
const STATIC_LOGOS: Record<string, string> = {
  'tamu.edu':
    'https://upload.wikimedia.org/wikipedia/commons/e/ee/Texas_A%26M_University_logo.svg',
  'ucr.edu':
    'https://commons.wikimedia.org/wiki/Special:FilePath/UC_Riverside_logo.svg',
}

// Favicon/icon sources (no API key). Tried after STATIC_LOGOS; fallback to GraduationCap if all fail.
const SOURCES = [
  (d: string) => `https://www.google.com/s2/favicons?domain=${encodeURIComponent(d)}&sz=64`,
  (d: string) => `https://icons.duckduckgo.com/ip3/${encodeURIComponent(d)}.ico`,
] as const

function getSrc(domain: string, step: number): string {
  if (step === 0 && STATIC_LOGOS[domain]) return STATIC_LOGOS[domain]
  return SOURCES[step]?.(domain) ?? ''
}

type Props = { domains: string[]; alt: string; size?: number; className?: string }

export function SchoolLogo({ domains, alt, size = 24, className = '' }: Props) {
  // Per-domain: 0=static or Google, 1=DuckDuckGo, 2=show icon (all failed)
  const [step, setStep] = useState<Record<number, number>>({})

  if (!domains.length) return null

  return (
    <span className={`inline-flex items-center gap-0.5 shrink-0 ${className}`} aria-hidden>
      {domains.map((domain, i) => {
        const s = step[i] ?? 0
        if (s >= 2) {
          return (
            <span
              key={`${domain}-${i}`}
              className="inline-flex items-center justify-center rounded bg-slate-200 text-slate-500"
              style={{ width: size, height: size }}
            >
              <GraduationCap size={size * 0.6} />
            </span>
          )
        }
        const src = getSrc(domain, s)
        if (!src) return null
        return (
          <img
            key={`${domain}-${i}`}
            src={src}
            alt=""
            role="presentation"
            width={size}
            height={size}
            className="rounded object-contain"
            onError={() =>
              setStep((prev) => ({ ...prev, [i]: (prev[i] ?? 0) + 1 }))
            }
          />
        )
      })}
    </span>
  )
}
