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
    <div className="min-h-screen bg-gradient-to-b from-ucsd-sand to-white">
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
              Learn about our mission
            </p>
          </div>

          {/* About Med Path */}
          <Card className="mb-12 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-3xl">About Med Path</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                MedPath is a community of graduate pre-medical students committed to empowering students from underserved backgrounds who are interested in healthcare careers. By sharing the insight gained from our individual pre-medical paths, we provide mentorship, support, and access to opportunities that help students navigate their journey and realize their aspirations.
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
                <div className="prose prose-lg max-w-none break-words
                  prose-headings:text-gray-900 prose-headings:font-semibold
                  prose-h1:text-2xl prose-h1:mt-0 prose-h1:mb-4
                  prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3
                  prose-h3:text-lg prose-h3:mt-4 prose-h3:mb-2
                  prose-p:text-gray-700 prose-p:leading-relaxed prose-p:my-3 prose-p:mb-5
                  prose-ul:my-3 prose-ul:pl-6 prose-li:my-1
                  prose-ol:my-3 prose-ol:pl-6
                  prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-a:break-all">
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
