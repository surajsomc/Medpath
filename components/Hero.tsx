interface HeroProps {
  content: {
    title?: string
    subtitle?: string
  }
}

export default function Hero({ content }: HeroProps) {
  return (
    <div className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white py-24 overflow-hidden">
      {/* Medical-themed background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      {/* Medical imagery overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stethoscope */}
          <path d="M200 200 Q250 150 300 200 Q350 250 400 200" stroke="white" strokeWidth="8" fill="none"/>
          <circle cx="400" cy="200" r="25" fill="white"/>
          {/* Medical cross */}
          <rect x="500" y="150" width="40" height="40" fill="white"/>
          <rect x="510" y="140" width="20" height="60" fill="white"/>
          <rect x="490" y="160" width="60" height="20" fill="white"/>
          {/* Heart monitor */}
          <rect x="700" y="180" width="120" height="80" fill="white" rx="5"/>
          <path d="M720 220 L760 200 L800 240 L840 210 L880 230" stroke="white" strokeWidth="4" fill="none"/>
          {/* DNA helix */}
          <path d="M1000 200 Q1020 150 1040 200 Q1060 250 1080 200" stroke="white" strokeWidth="6" fill="none"/>
          <path d="M1000 200 Q1020 250 1040 200 Q1060 150 1080 200" stroke="white" strokeWidth="6" fill="none"/>
          <line x1="1005" y1="195" x2="1075" y2="195" stroke="white" strokeWidth="3"/>
          <line x1="1005" y1="205" x2="1075" y2="205" stroke="white" strokeWidth="3"/>
          {/* Graduation cap */}
          <path d="M150 350 L250 350 L200 320 Z" fill="white"/>
          <circle cx="200" cy="350" r="15" fill="white"/>
          {/* Medical book */}
          <rect x="450" y="320" width="80" height="100" fill="white" rx="3"/>
          <line x1="470" y1="340" x2="520" y2="340" stroke="white" strokeWidth="2"/>
          <line x1="470" y1="360" x2="510" y2="360" stroke="white" strokeWidth="2"/>
          {/* Microscope */}
          <rect x="700" y="320" width="60" height="80" fill="white" rx="5"/>
          <circle cx="730" cy="360" r="20" fill="white"/>
          <rect x="720" y="300" width="20" height="30" fill="white"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="mb-6">
          <div className="relative inline-block">
            {/* Main medical icon with glow effect */}
            <svg className="w-20 h-20 mx-auto text-white opacity-90 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {/* Decorative medical elements */}
            <svg className="absolute -top-2 -right-2 w-8 h-8 text-white opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
          {content.title || "PRE-MED? WE'RE HERE TO HELP"}
        </h1>
        {content.subtitle && (
          <p className="text-xl md:text-2xl text-primary-50 font-light drop-shadow-md">{content.subtitle}</p>
        )}
        {/* Medical mentorship badge */}
        <div className="mt-8 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="text-sm font-medium">300+ Medical Student Mentors</span>
        </div>
      </div>
    </div>
  )
}
