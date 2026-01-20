import { getTeamContent } from '@/lib/content'
import { getSchoolLogoDomains } from '@/lib/schoolLogos'
import { SchoolLogo } from '@/components/SchoolLogo'
import { SurajTeamCard } from '@/components/SurajTeamCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, User } from 'lucide-react'

export default async function TeamPage() {
  const content = await getTeamContent()
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-ucsd-sand to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-6">
              <Users className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 text-gray-900">
              Our Team
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the UCSD Post-Bacc Pre-Med Students Dedicated to Helping You Succeed
            </p>
          </div>

          {content.members.length === 0 ? (
            <Card className="shadow-lg border-0">
              <CardContent className="pt-12 pb-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Team members will appear here</h3>
                <p className="text-gray-600">Add team members through the admin panel at /admin</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.members.map((member: any, index: number) => {
                const hasAboutMe = member.hometown || member.education || member.major || member.minor
                const hasStructured = hasAboutMe || member.motivation
                const showBio = member.bio && !hasStructured
                const isSuraj = member.name === 'Suraj Somarajan'
                if (isSuraj) {
                  return <SurajTeamCard key={index} member={member} />
                }
                return (
                  <Card
                    key={index}
                    className="flex flex-col border-0 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center text-white text-xl font-bold shrink-0">
                          {member.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg">{member.name}</CardTitle>
                          <Badge variant="secondary" className="mt-1">
                            {member.role}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-1">
                      {hasAboutMe && (
                        <div>
                          <h4 className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-2">About Me</h4>
                          <ul className="text-gray-600 text-sm space-y-1">
                            {member.hometown && <li><span className="font-medium">Hometown:</span> {member.hometown}</li>}
                            {member.education && (
                              <li className="flex items-center gap-2 flex-wrap">
                                <span className="font-medium">Education:</span>
                                <SchoolLogo domains={getSchoolLogoDomains(member.education)} alt={member.education} size={20} />
                                <span>{member.education}</span>
                              </li>
                            )}
                            {member.major && <li><span className="font-medium">Major:</span> {member.major}</li>}
                            {member.minor && <li><span className="font-medium">Minor:</span> {member.minor}</li>}
                          </ul>
                        </div>
                      )}
                      {member.motivation && (
                        <div>
                          <h4 className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-2">My Motivation</h4>
                          <p className="text-gray-600 leading-relaxed text-sm">{member.motivation}</p>
                        </div>
                      )}
                      {showBio && (
                        <p className="text-gray-600 leading-relaxed text-sm">{member.bio}</p>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
