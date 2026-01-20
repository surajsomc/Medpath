/**
 * Maps education strings (from team.json) to .edu (or .edu-like) domains.
 * Used by SchoolLogo to pull logos from online APIs (iFetchly, Clearbit) by domain.
 * For "UCD & UCSD" etc., returns multiple domains.
 */
export function getSchoolLogoDomains(education: string | undefined): string[] {
  if (!education || typeof education !== 'string') return []

  const normalized = education.trim()
  // Multiple schools (e.g. "UCD & UCSD")
  if (normalized.includes('&') || normalized.toLowerCase().includes(' and ')) {
    const parts = normalized.split(/\s*&\s*|\s+and\s+/i).map((s) => s.trim()).filter(Boolean)
    return parts.flatMap((p) => getSchoolLogoDomains(p))
  }

  const map: Record<string, string> = {
    'ucla': 'ucla.edu',
    'ucsd': 'ucsd.edu',
    'ucsb': 'ucsb.edu',
    'ucsc': 'ucsc.edu',
    'ucd': 'ucdavis.edu',
    'uc davis': 'ucdavis.edu',
    'ucr': 'ucr.edu',
    'uc berkeley': 'berkeley.edu',
    'berkeley': 'berkeley.edu',
    'texas a&m': 'tamu.edu',
    'texas a&m university': 'tamu.edu',
    'tamu': 'tamu.edu',
    'lmu': 'lmu.edu',
    'loyola marymount': 'lmu.edu',
    'loyola marymount university': 'lmu.edu',
    'uw madison': 'wisc.edu',
    'university of wisconsin-madison': 'wisc.edu',
    'university of wisconsin madison': 'wisc.edu',
    'wisconsin': 'wisc.edu',
  }

  const key = normalized.toLowerCase()
  if (map[key]) return [map[key]]

  // Partial / fuzzy
  if (key.startsWith('uc berkeley') || key === 'ucb') return ['berkeley.edu']
  if (key.startsWith('texas a&m')) return ['tamu.edu']
  if (key.startsWith('loyola marymount')) return ['lmu.edu']
  if (key.startsWith('uc davis')) return ['ucdavis.edu']
  if (key.startsWith('uw madison') || key.startsWith('university of wisconsin')) return ['wisc.edu']

  return []
}
