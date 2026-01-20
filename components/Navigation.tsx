'use client'

import Link from 'next/link'
import { useState } from 'react'

interface NavigationProps {
  logo?: string
}

export default function Navigation({ logo }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors flex items-center gap-2">
            {logo ? (
              <img src={logo} alt="Med Path" className="h-8 w-auto object-contain" />
            ) : (
              <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            )}
            <span>Med Path</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-primary-600">
              Home
            </Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-primary-600 flex items-center">
                About
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  About us
                </Link>
                <Link href="/about/team" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Our Team
                </Link>
              </div>
            </div>
            <Link href="/events" className="text-gray-700 hover:text-primary-600">
              Events
            </Link>
            <Link href="/advising" className="text-gray-700 hover:text-primary-600">
              Advising
            </Link>
            <Link href="/resources" className="text-gray-700 hover:text-primary-600">
              Resources
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link href="/" className="block py-2 text-gray-700">Home</Link>
            <div>
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className="w-full text-left py-2 text-gray-700 flex items-center justify-between"
              >
                About
                <svg className={`w-4 h-4 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {resourcesOpen && (
                <div className="pl-4 space-y-2">
                  <Link href="/about" className="block py-2 text-gray-600">About us</Link>
                  <Link href="/about/team" className="block py-2 text-gray-600">Our Team</Link>
                </div>
              )}
            </div>
            <Link href="/events" className="block py-2 text-gray-700">Events</Link>
            <Link href="/advising" className="block py-2 text-gray-700">Advising</Link>
            <Link href="/resources" className="block py-2 text-gray-700">Resources</Link>
            <Link href="/contact" className="block py-2 text-gray-700">Contact</Link>
          </div>
        )}
      </div>
    </nav>
  )
}
