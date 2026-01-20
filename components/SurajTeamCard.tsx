'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { getSchoolLogoDomains } from '@/lib/schoolLogos'
import { SchoolLogo } from '@/components/SchoolLogo'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkles } from 'lucide-react'

type Member = {
  name?: string
  role?: string
  hometown?: string
  education?: string
  major?: string
  minor?: string
  motivation?: string
  bio?: string
}

export function SurajTeamCard({ member }: { member: Member }) {
  const hasAboutMe = member.hometown || member.education || member.major || member.minor
  const hasStructured = hasAboutMe || member.motivation
  const showBio = member.bio && !hasStructured
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 70, scale: 0.88 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ type: 'spring', stiffness: 72, damping: 14, mass: 0.9 }}
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
      className="animate-suraj-float"
    >
      <div className="relative overflow-hidden rounded-lg">
        {/* Shimmer sweep when card scrolls into view */}
        {isInView && (
          <div
            className="absolute inset-0 z-10 pointer-events-none animate-suraj-shimmer"
            style={{
              background: 'linear-gradient(105deg, transparent 0%, rgba(198,146,20,0.08) 40%, rgba(198,146,20,0.25) 50%, rgba(198,146,20,0.08) 60%, transparent 100%)',
              width: '45%',
            }}
          />
        )}
        <Card className="relative flex flex-col border-2 border-ucsd-gold bg-gradient-to-br from-white to-ucsd-gold/5 ring-2 ring-ucsd-gold/40 animate-suraj-border-glow overflow-visible">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold shrink-0 bg-gradient-to-br from-ucsd-gold to-primary-600 text-white animate-suraj-avatar-pulse"
                initial={{ scale: 0.8, rotate: -10 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
              >
                {member.name?.charAt(0) ?? 'S'}
              </motion.div>
              <div className="flex-1 min-w-0">
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                >
                  <CardTitle className="text-primary-600 text-lg">{member.name}</CardTitle>
                </motion.div>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <Badge variant="secondary">{member.role}</Badge>
                  <motion.span
                    className="inline-flex"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.25 }}
                  >
                    <Badge className="bg-ucsd-gold/90 text-primary-900 hover:bg-ucsd-gold border-0 gap-1 animate-suraj-badge-glow">
                      <Sparkles className="w-3 h-3" />
                      Built this site
                    </Badge>
                  </motion.span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            {hasAboutMe && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.2, duration: 0.35 }}
              >
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
              </motion.div>
            )}
            {member.motivation && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.3, duration: 0.35 }}
              >
                <h4 className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-2">My Motivation</h4>
                <p className="text-gray-600 leading-relaxed text-sm">{member.motivation}</p>
              </motion.div>
            )}
            {showBio && (
              <p className="text-gray-600 leading-relaxed text-sm">{member.bio}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
