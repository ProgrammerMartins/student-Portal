import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight, GraduationCap, ArrowRight } from 'lucide-react'
import { useScrollAnimation, fadeUpVariants } from '../hooks/useScrollAnimation'

function FloatingBlob({
  style,
  className,
}: {
  style: React.CSSProperties
  className?: string
}) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      animate={
        prefersReduced
          ? {}
          : {
              scale: [1, 1.15, 1],
              x: [0, 20, 0],
              y: [0, -15, 0],
            }
      }
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      style={style}
      aria-hidden="true"
    />
  )
}

export function CtaSection() {
  const { ref, isInView } = useScrollAnimation()

  return (
    <section
      id="contact"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #00214d 0%, #00468e 40%, #1a56db 80%, #1e40af 100%)' }}
      aria-labelledby="cta-heading"
    >
      {/* Animated blobs */}
      <FloatingBlob
        className="w-80 h-80 opacity-15"
        style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)', top: '-80px', left: '-60px' }}
      />
      <FloatingBlob
        className="w-96 h-96 opacity-10"
        style={{ background: 'radial-gradient(circle, #d4af37 0%, transparent 70%)', bottom: '-100px', right: '-80px' }}
      />
      <FloatingBlob
        className="w-64 h-64 opacity-10"
        style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)', top: '50%', right: '20%' }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUpVariants}
        >
          {/* Icon badge */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#f0d060] rounded-2xl shadow-xl mb-8 mx-auto">
            <GraduationCap className="w-8 h-8 text-[#00214d]" strokeWidth={2} />
          </div>

          {/* Headline */}
          <h2
            id="cta-heading"
            className="text-white font-black leading-tight tracking-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Ready to Begin Your{' '}
            <br className="hidden sm:block" />
            <span
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #f0d060 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Academic Journey?
            </span>
          </h2>

          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Join over 24,000 students already using the portal to manage their academic lives
            smarter. Sign up in minutes — it's free to get started.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              id="cta-register"
              className="group flex items-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#f0d060] text-[#00214d] font-bold text-base px-8 py-4 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#d4af37]/50"
              aria-label="Create your student account"
            >
              Create Your Account
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>

            <Link
              to="/login"
              id="cta-login"
              className="flex items-center gap-2 text-white font-semibold text-base px-8 py-4 rounded-2xl border border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              aria-label="Sign in to your existing account"
            >
              Sign In
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12">
            {[
              { emoji: '🔒', label: 'Bank-grade security' },
              { emoji: '⚡', label: 'Instant access' },
              { emoji: '📱', label: 'Mobile friendly' },
              { emoji: '🌍', label: 'Access anywhere' },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-white/60 text-sm">
                <span aria-hidden="true">{badge.emoji}</span>
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
