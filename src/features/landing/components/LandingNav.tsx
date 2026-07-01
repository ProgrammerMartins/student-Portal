import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Menu, X, GraduationCap } from 'lucide-react'
import { NAV_LINKS } from '../constants/landingData'

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={false}
        animate={
          scrolled
            ? { backgroundColor: 'rgba(0, 33, 77, 0.96)', backdropFilter: 'blur(20px)', borderBottomColor: 'rgba(255,255,255,0.08)' }
            : { backgroundColor: 'rgba(0, 33, 77, 0)', backdropFilter: 'blur(0px)', borderBottomColor: 'transparent' }
        }
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 left-0 right-0 z-50 border-b"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('#home')}
              className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg"
              aria-label="Go to top"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-[#d4af37] to-[#f0d060] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-5 h-5 text-[#00214d]" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-bold text-sm tracking-wide">UniPortal</span>
                <span className="text-white/50 text-[10px] tracking-widest uppercase">University</span>
              </div>
            </button>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-white/80 hover:text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/login"
                className="text-white/80 hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-[#d4af37] to-[#f0d060] text-[#00214d] font-semibold text-sm px-5 py-2 rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
              >
                Register
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#00214d] shadow-2xl lg:hidden flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#d4af37] to-[#f0d060] rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-[#00214d]" strokeWidth={2.5} />
                  </div>
                  <span className="text-white font-bold text-sm">UniPortal</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-white/70 hover:text-white p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left text-white/80 hover:text-white text-base font-medium px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              <div className="p-4 border-t border-white/10 space-y-3">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center text-white font-medium py-3 rounded-xl border border-white/20 hover:bg-white/10 transition-all duration-200"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center bg-gradient-to-r from-[#d4af37] to-[#f0d060] text-[#00214d] font-semibold py-3 rounded-xl hover:opacity-90 transition-all duration-200"
                >
                  Register Now
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
