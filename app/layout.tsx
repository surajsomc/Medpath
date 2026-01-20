import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getHomeContent } from '@/lib/content'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Med Path',
  description: 'A group of medical students who are eager to share advice and resources with premed students at UCSD and beyond.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const home = await getHomeContent()
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation logo={home?.logo} />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
