import AnimatedHero from '@/components/AnimatedHero'
import QuickLinks from '@/components/QuickLinks'
import { getHomeContent } from '@/lib/content'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import DNAHelix from '@/components/DNAHelix'
import ParticleBackground from '@/components/ParticleBackground'
import { Activity } from 'lucide-react'

export default async function Home() {
  const content = await getHomeContent()

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <AnimatedHero content={content.hero} />
      <QuickLinks />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Interactive 3D DNA Helix */}
          <Card className="border-0 shadow-lg overflow-hidden max-w-2xl mx-auto">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary-600" />
                <CardTitle>Interactive DNA Helix</CardTitle>
              </div>
              <CardDescription>
                Explore the molecular foundation of medical science
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 rounded-lg overflow-hidden bg-gradient-to-br from-primary-50 via-ucsd-sand to-primary-100">
                <DNAHelix />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
