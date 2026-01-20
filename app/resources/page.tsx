import { getResourcesContent } from '@/lib/content'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Users, GraduationCap, ChevronRight, HelpCircle } from 'lucide-react'

export default async function ResourcesPage() {
  const content = await getResourcesContent()
  
  const resourceIcons = [BookOpen, Users, GraduationCap]
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-6">
              <BookOpen className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 text-gray-900">
              Resources
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive guides and resources to help you succeed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {content.sections.map((section: any, index: number) => {
              const Icon = resourceIcons[index % resourceIcons.length]
              return (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                    {section.description && (
                      <CardDescription className="mt-2">{section.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    {section.subsections && section.subsections.length > 0 ? (
                      <div className="space-y-2">
                        {section.subsections.map((subsection: any, subIndex: number) => (
                          <Link
                            key={subIndex}
                            href={subsection.path}
                            className="flex items-center text-primary-600 hover:text-primary-700 font-medium group"
                          >
                            <ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                            {subsection.title}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">{section.description}</p>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* CTA Section */}
          <Card className="bg-primary-600 text-white border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <CardTitle className="text-3xl text-white">Need More Help?</CardTitle>
              </div>
              <CardDescription className="text-primary-50 text-lg">
                Can't find what you're looking for? Reach out to our team for personalized assistance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
