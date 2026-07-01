import { motion } from 'framer-motion'
import {
  Zap,
  BarChart3,
  Shield,
  Calendar,
  Bell,
  ClipboardList,
} from 'lucide-react'
import { BENEFITS } from '../constants/landingData'
import {
  useScrollAnimation,
  staggerContainerVariants,
  fadeUpVariants,
} from '../hooks/useScrollAnimation'

const ICONS: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  Zap,
  BarChart3,
  Shield,
  Calendar,
  Bell,
  ClipboardList,
}

export function WhyChooseSection() {
  const { ref: headingRef, isInView: headingInView } = useScrollAnimation()
  const { ref: gridRef, isInView: gridInView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 })

  return (
    <section
      id="about"
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
      aria-labelledby="why-choose-heading"
    >
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00468e 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial="hidden"
          animate={headingInView ? 'visible' : 'hidden'}
          variants={fadeUpVariants}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#1a56db] font-semibold text-sm tracking-widest uppercase mb-4">
            Why Choose Our Portal
          </span>
          <h2
            id="why-choose-heading"
            className="font-black text-[#0f172a] leading-tight tracking-tight mb-5"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Everything You Need,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00468e 0%, #1a56db 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              All in One Place
            </span>
          </h2>
          <p className="text-[#64748b] text-lg max-w-2xl mx-auto leading-relaxed">
            Designed with students at the center, our portal removes every friction from your
            academic journey so you can focus on what truly matters — learning.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
          variants={staggerContainerVariants}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {BENEFITS.map((benefit) => {
            const Icon = ICONS[benefit.icon]
            return (
              <motion.div
                key={benefit.title}
                variants={fadeUpVariants}
                className="group relative bg-white border border-[#e2e8f0] rounded-2xl p-6 hover:border-[#1a56db]/30 hover:shadow-xl transition-all duration-300 cursor-default overflow-hidden"
                style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)' }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at top left, ${benefit.color}10 0%, transparent 60%)` }}
                  aria-hidden="true"
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${benefit.color}15`, boxShadow: `0 4px 20px ${benefit.color}20` }}
                >
                  {Icon && <Icon className="w-6 h-6" style={{ color: benefit.color } as React.CSSProperties} strokeWidth={2} />}
                </div>

                <h3 className="text-[#0f172a] font-bold text-lg mb-2 group-hover:text-[#00468e] transition-colors duration-200">
                  {benefit.title}
                </h3>
                <p className="text-[#64748b] text-sm leading-relaxed">{benefit.description}</p>

                {/* Bottom accent bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-2xl"
                  style={{ background: `linear-gradient(90deg, ${benefit.color} 0%, transparent 100%)` }}
                  aria-hidden="true"
                />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
