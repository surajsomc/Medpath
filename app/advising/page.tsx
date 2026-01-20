import { getAdvisingContent } from '@/lib/content'
import ReactMarkdown from 'react-markdown'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageSquare, FileText, Users, ClipboardCheck, ArrowRight } from 'lucide-react'

export default async function AdvisingPage() {
  const content = await getAdvisingContent()

  const services = [
    {
      icon: MessageSquare,
      title: "1-on-1 Advising",
      description: "Get personalized guidance from experienced medical students. Schedule a one-on-one session to discuss your pre-med journey, application strategy, and career goals.",
    },
    {
      icon: FileText,
      title: "Essay Review",
      description: "Have your personal statements, secondary essays, and other application materials reviewed by medical students who have successfully navigated the application process.",
    },
    {
      icon: Users,
      title: "Group Sessions",
      description: "Join our group advising sessions and workshops covering topics like MCAT preparation, interview skills, and application timelines.",
    },
    {
      icon: ClipboardCheck,
      title: "Application Support",
      description: "Comprehensive support throughout your medical school application process, from planning to submission and beyond.",
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-6">
              <MessageSquare className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 text-gray-900">
              Advising Services
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get the guidance you need to succeed in your medical school journey
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Main Content */}
          <Card className="mb-12 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-3xl">About Our Advising</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline">
                <ReactMarkdown>{content.content}</ReactMarkdown>
              </div>
            </CardContent>
          </Card>

          {/* Action Links */}
          {content.links && content.links.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Get Started</h2>
              <div className="space-y-3">
                {content.links.map((link: any, index: number) => (
                  <Button
                    key={index}
                    asChild
                    size="lg"
                    className="w-full justify-between group"
                  >
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{link.title}</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
