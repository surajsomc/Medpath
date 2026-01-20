import { getAboutContent } from '@/lib/content'
import ReactMarkdown from 'react-markdown'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Info, Heart, Users, Target, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default async function AboutPage() {
  const content = await getAboutContent()
  
  const values = [
    { icon: Heart, title: "Compassion", description: "We care deeply about every pre-med student's journey" },
    { icon: Users, title: "Community", description: "Building a supportive network of future medical professionals" },
    { icon: Target, title: "Excellence", description: "Helping you achieve your highest potential" }
  ]
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-6">
              <Info className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 text-gray-900">
              About Us
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Learn about our mission to support pre-med students on their journey to medical school
            </p>
          </div>

          {/* About Med Path */}
          <Card className="mb-12 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-3xl">About Med Path</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Med Path at UCSD is a group of over 300 medical students who are eager to share advice and resources with premed students at UCSD and beyond. We partner with the UCSD Career Center, the School of Medicine Office of Admissions, and the Office of Outreach & Pathway Programs to host student panels, provide 1-on-1 advising, and distribute free resources to all premed students at UCSD and beyond.
              </p>
              <div className="bg-primary-50 rounded-lg p-4">
                <p className="text-gray-700">
                  Follow us <strong className="text-primary-600">@medpathucsd</strong> on social media!
                </p>
              </div>
              <Button asChild>
                <Link href="/contact" className="inline-flex items-center gap-2">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Our Story (from CMS, if any) */}
          {content.content && (
            <Card className="mb-12 shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-3xl">Our Story</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline">
                  <ReactMarkdown>{content.content}</ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
