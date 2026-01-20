import { getEventsContent } from '@/lib/content'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { EventsCalendar } from '@/components/EventsCalendar'
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

function linkify(desc: string) {
  const re = /(https?:\/\/[^\s]+)/g
  const parts = desc.split(re)
  return parts.map((p, i) =>
    /^https?:\/\//.test(p) ? (
      <a key={i} href={p} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
        {p}
      </a>
    ) : (
      p
    )
  )
}

export default async function EventsPage() {
  const content = await getEventsContent()
  const now = new Date()
  const curY = now.getFullYear()
  const curM = now.getMonth() + 1
  const nextY = curM === 12 ? curY + 1 : curY
  const nextM = curM === 12 ? 1 : curM + 1

  return (
    <div className="min-h-screen bg-gradient-to-b from-ucsd-sand to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
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

          {/* Calendar with highlighted event days */}
          <div className="flex flex-col md:flex-row justify-center items-start gap-4 md:gap-6 mb-8">
            <EventsCalendar events={content.events} year={curY} month={curM} />
            <EventsCalendar events={content.events} year={nextY} month={nextM} />
          </div>

          {/* Event list */}
          {content.events.length === 0 ? (
            <Card className="shadow-lg border-0">
              <CardContent className="pt-12 pb-12 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No upcoming events</h3>
                <p className="text-gray-600">Check back soon for exciting opportunities!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Event details</h2>
              {content.events.map((event: any, index: number) => (
                <Card key={index} className="shadow-md hover:shadow-lg transition-shadow border-0 flex flex-col">
                  <CardHeader>
                    <div className="flex-1">
                      <div className="mb-3">
                        <CardTitle className="text-2xl text-gray-900">{event.title}</CardTitle>
                        {event.subtitle && (
                          <p className="text-base text-gray-600 mt-1">{event.subtitle}</p>
                        )}
                      </div>
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
                            <MapPin className="w-4 h-4 shrink-0" />
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline focus:underline text-inherit"
                            >
                              {event.location}
                            </a>
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-gray-700 leading-relaxed">{linkify(event.description || '')}</p>
                    {event.feedbackFormUrl && (
                      <div className="mt-auto pt-4">
                        <div className="rounded-lg border border-primary-200 bg-primary-50 px-4 py-3">
                          <p className="text-xs font-semibold text-primary-700 uppercase tracking-wider mb-1">
                            After-Panel Event Feedback Form
                          </p>
                          <a
                            href={event.feedbackFormUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-medium text-primary-700 hover:text-primary-800 hover:underline break-all"
                          >
                            {event.feedbackFormUrl}
                          </a>
                        </div>
                      </div>
                    )}
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
