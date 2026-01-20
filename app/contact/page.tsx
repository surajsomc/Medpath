import { getContactContent } from '@/lib/content'
import ContactForm from '@/components/ContactForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Info, Send, Instagram, Twitter, Facebook, ExternalLink } from 'lucide-react'

export default async function ContactPage() {
  const content = await getContactContent()
  
  const socialPlatforms: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
    instagram: {
      icon: Instagram,
      color: "bg-gradient-to-r from-pink-500 to-purple-500"
    },
    twitter: {
      icon: Twitter,
      color: "bg-gradient-to-r from-blue-400 to-blue-500"
    },
    facebook: {
      icon: Facebook,
      color: "bg-gradient-to-r from-blue-600 to-blue-700"
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-6">
              <Mail className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 text-gray-900">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're here to help you on your medical school journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Email Card */}
            {content.email && (
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary-600" />
                    </div>
                    <CardTitle>Email Us</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <a 
                    href={`mailto:${content.email}`}
                    className="text-primary-600 hover:text-primary-700 font-semibold text-lg inline-flex items-center gap-2 group"
                  >
                    {content.email}
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </CardContent>
              </Card>
            )}

            {/* Description Card */}
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
                    <Info className="w-6 h-6 text-primary-600" />
                  </div>
                  <CardTitle>About</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{content.description}</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="mb-12 shadow-lg border-0">
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-4 mx-auto">
                <Send className="w-8 h-8 text-primary-600" />
              </div>
              <CardTitle className="text-3xl">Send Us a Message</CardTitle>
              <CardDescription className="text-lg">
                Fill out the form below and we'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-2xl mx-auto">
                <ContactForm />
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          {content.socialLinks && Object.keys(content.socialLinks).length > 0 && (
            <Card className="shadow-lg border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl mb-2">Follow Us</CardTitle>
                <CardDescription className="text-lg">
                  Stay connected and get the latest updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap justify-center gap-4">
                  {Object.entries(content.socialLinks).map(([platform, url]: [string, any]) => {
                    const platformData = socialPlatforms[platform]
                    if (!platformData) return null
                    const Icon = platformData.icon
                    return (
                      <Button
                        key={platform}
                        asChild
                        variant="outline"
                        size="lg"
                        className="group hover:bg-gray-50"
                      >
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon className="w-5 h-5 mr-2" />
                          <span className="capitalize font-semibold">{platform}</span>
                          <ExternalLink className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </a>
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
