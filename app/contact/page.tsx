import { getContactContent } from '@/lib/content'
import GoogleFormEmbed from '@/components/GoogleFormEmbed'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Info, Send, Instagram, ExternalLink } from 'lucide-react'

export default async function ContactPage() {
  const content = await getContactContent()
  
  const socialPlatforms: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
    instagram: { icon: Instagram, color: 'bg-gradient-to-r from-pink-500 to-purple-500' },
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-ucsd-sand to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-ucsd-gold/20">
              <Mail className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 text-primary-600">
              Get In Touch
            </h1>
            <p className="text-xl max-w-2xl mx-auto text-ucsd-blue">
              We're here to help you on your healthcare career journey!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Email Card */}
            {content.email && (
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-ucsd-gold">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary-100">
                      <Mail className="w-6 h-6 text-primary-600" />
                    </div>
                    <CardTitle className="text-primary-600">Email Us</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <a 
                    href={`mailto:${content.email}`}
                    className="font-semibold text-lg inline-flex items-center gap-2 group hover:underline text-ucsd-blue"
                  >
                    {content.email}
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </CardContent>
              </Card>
            )}

            {/* Description Card */}
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-ucsd-gold">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary-100">
                    <Info className="w-6 h-6 text-primary-600" />
                  </div>
                  <CardTitle className="text-primary-600">About</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-primary-600/90">{content.description}</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="mb-12 shadow-lg border-0 border-t-4 border-t-ucsd-gold">
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 mx-auto bg-primary-100">
                <Send className="w-8 h-8 text-primary-600" />
              </div>
              <CardTitle className="text-3xl text-primary-600">Send Us a Message</CardTitle>
              <CardDescription className="text-lg text-ucsd-blue">
                Fill out the form below and we'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-3xl mx-auto">
                <GoogleFormEmbed
                  formUrl={content?.socialLinks?.googleForm?.googleFormUrl || ''}
                  height={content?.socialLinks?.googleForm?.formHeight || 1200}
                  title={content?.socialLinks?.googleForm?.formTitle || 'Contact Us'}
                />
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          {content.socialLinks && Object.keys(content.socialLinks).some(k => typeof content.socialLinks[k] === 'string') && (
            <Card className="shadow-lg border-0 border-t-4 border-t-ucsd-gold">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl mb-2 text-primary-600">Follow Us</CardTitle>
                <CardDescription className="text-lg text-ucsd-blue">
                  Stay connected and get the latest updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap justify-center gap-4">
                  {Object.entries(content.socialLinks).map(([platform, url]: [string, any]) => {
                    if (typeof url !== 'string') return null
                    const platformData = socialPlatforms[platform]
                    if (!platformData) return null
                    const Icon = platformData.icon
                    return (
                      <Button
                        key={platform}
                        asChild
                        variant="outline"
                        size="lg"
                        className="group border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600"
                      >
                        <a href={url} target="_blank" rel="noopener noreferrer">
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
