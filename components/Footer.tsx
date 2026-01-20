import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-primary-800 to-primary-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-ucsd-gold">Med Path</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
            A group of UCSD Postbacc Pre-Med students eager to help premed students achieve their dreams.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/medpath.mentorship" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-ucsd-gold transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-ucsd-gold">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="text-gray-300 hover:text-ucsd-gold transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-ucsd-gold transition-colors">About</Link></li>
              <li><Link href="/events" className="text-gray-300 hover:text-ucsd-gold transition-colors">Events</Link></li>
              <li><Link href="/advising" className="text-gray-300 hover:text-ucsd-gold transition-colors">Advising</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-ucsd-gold">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/resources" className="text-gray-300 hover:text-ucsd-gold transition-colors">Resources</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-ucsd-gold">Connect</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/contact" className="text-gray-300 hover:text-ucsd-gold transition-colors">Contact Us</Link></li>
              <li><a href="mailto:contact@medpathucsd.edu" className="text-gray-300 hover:text-ucsd-gold transition-colors">Email</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Med Path. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
