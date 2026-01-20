import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Calendar } from 'lucide-react'

export default function QuickLinks() {
  const links = [
    { href: "/about", title: "About Us", icon: Users, color: "bg-primary-600" },
    { href: "/events", title: "Upcoming Events", icon: Calendar, color: "bg-ucsd-gold" }
  ]

  return (
    <div className="relative py-20 bg-gradient-to-b from-ucsd-sand to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900">
            Quick Access
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started with our most popular resources and services
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {links.map((link, index) => {
            const Icon = link.icon
            return (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow group">
                <CardHeader className="text-center pb-2">
                  <div className={`w-16 h-16 ${link.color} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{link.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button asChild variant="outline" className="w-full group-hover:bg-gray-50">
                    <Link href={link.href}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
