import { getEventsContent } from '@/lib/content'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, MapPin } from 'lucide-react'

function formatEventDate(d: unknown): string {
  if (d == null) return ''
  const s = String(d)
  if (s.includes('T')) {
    try { return new Date(s).toLocaleDateString(undefined, { dateStyle: 'medium' }) }
    catch { return s }
  }
  return s
}

export default async function EventsPage() {
  const content = await getEventsContent()
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-6">
              <Calendar className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 text-gray-900">
              Upcoming Events
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join us for workshops, panels, and networking opportunities
            </p>
          </div>
          
          {content.events.length === 0 ? (
            <Card className="shadow-lg border-0">
              <CardContent className="pt-12 pb-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No upcoming events</h3>
                <p className="text-gray-600">Check back soon for exciting opportunities!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {content.events.map((event: any, index: number) => (
                <Card key={index} className="shadow-md hover:shadow-lg transition-shadow border-0">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-3 text-gray-900">{event.title}</CardTitle>
                        <div className="flex flex-wrap gap-3 mb-4">
                          <Badge variant="secondary" className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {formatEventDate(event.date)}
                          </Badge>
                          {event.time && (
                            <Badge variant="secondary" className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {event.time}
                            </Badge>
                          )}
                          {event.location && (
                            <Badge variant="secondary" className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{event.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
