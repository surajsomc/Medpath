import { getAdvisingContent } from '@/lib/content'
import ReactMarkdown from 'react-markdown'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default async function AdvisingPage() {
  const content = await getAdvisingContent()

  return (
    <div className="min-h-screen bg-gradient-to-b from-ucsd-sand to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-6">
              <Users className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 text-gray-900">
              Mentorship
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with our post-bacc pre-med mentors
            </p>
          </div>

          {/* Main Content */}
          <Card className="mb-10 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-2xl">About Mentorship</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-w-none break-words text-gray-700 leading-relaxed
                [&>p]:mb-5 [&>p:last-of-type]:mb-0
                [&>h2]:mt-12 [&>h2]:mb-3 [&>h2]:text-lg [&>h2]:font-semibold [&>h2]:text-gray-900
                [&>ul]:my-3 [&>ul]:pl-6 [&>li]:my-1
                [&_a]:text-primary-600 [&_a]:no-underline hover:[&_a]:underline">
                <ReactMarkdown>{content.content}</ReactMarkdown>
              </div>
              <Button asChild className="mt-6" size="lg">
                <Link href="/about/team" className="inline-flex items-center gap-2">
                  Meet Our Team
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
