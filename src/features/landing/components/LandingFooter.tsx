import { GraduationCap, Mail, Phone, MapPin, ExternalLink, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

const FOOTER_LINKS = {
  'Quick Links': [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'Portal Preview', href: '#portal-preview' },
    { label: 'FAQ', href: '#faq' },
  ],
  'Student Services': [
    { label: 'Course Registration', href: '/login' },
    { label: 'Fee Payment', href: '/login' },
    { label: 'Results & Transcript', href: '/login' },
    { label: 'Timetable', href: '/login' },
  ],
  'Support': [
    { label: 'Help Center', href: '#contact' },
    { label: 'Submit a Ticket', href: '#contact' },
    { label: 'System Status', href: '#contact' },
    { label: 'Report an Issue', href: '#contact' },
  ],
}

const SOCIAL_LINKS = [
  { label: 'Twitter/X', href: '#', icon: '𝕏' },
  { label: 'Facebook', href: '#', icon: 'f' },
  { label: 'LinkedIn', href: '#', icon: 'in' },
  { label: 'Instagram', href: '#', icon: '▲' },
  { label: 'YouTube', href: '#', icon: '▶' },
]

export function LandingFooter() {
  const currentYear = new Date().getFullYear()

  const handleScroll = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer
      id="contact"
      className="bg-[#00152e] text-white"
      aria-label="Site footer"
    >
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-[#d4af37] to-[#f0d060] rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-5 h-5 text-[#00214d]" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-white font-bold text-base">UniPortal</p>
                <p className="text-white/40 text-[10px] tracking-widest uppercase">University System</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Empowering students with a modern, secure, and intuitive digital gateway to their
              full university experience — from registration to graduation.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              {[
                { Icon: MapPin, text: '1 University Avenue, Knowledge City, Nigeria' },
                { Icon: Phone, text: '+234 800 000 0000' },
                { Icon: Mail, text: 'support@university.edu.ng' },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-start gap-3 text-white/50 text-sm">
                  <Icon className="w-4 h-4 shrink-0 mt-0.5 text-[#d4af37]" strokeWidth={2} aria-hidden="true" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex gap-2 mt-6">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/15 hover:border-white/20 transition-all duration-200 text-xs font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
                {group}
              </h3>
              <ul className="space-y-2.5" role="list">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('#') ? (
                      <button
                        onClick={() => handleScroll(link.href)}
                        className="text-white/50 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1 group focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50 rounded"
                      >
                        <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                          {link.label}
                        </span>
                      </button>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-white/50 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1 group focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50 rounded"
                      >
                        <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                          {link.label}
                        </span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity duration-200" aria-hidden="true" />
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs text-center sm:text-left">
            © {currentYear} University Student Portal. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-white/40 text-xs">
            <button
              onClick={() => {}}
              className="hover:text-white/70 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50 rounded"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => {}}
              className="hover:text-white/70 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50 rounded"
            >
              Terms of Service
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => {}}
              className="hover:text-white/70 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50 rounded"
            >
              Accessibility
            </button>
          </div>
          <p className="text-white/30 text-xs flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-[#ef4444] fill-[#ef4444]" aria-hidden="true" /> for students
          </p>
        </div>
      </div>
    </footer>
  )
}
