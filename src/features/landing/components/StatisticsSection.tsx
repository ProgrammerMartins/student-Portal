import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { STATS } from '../constants/landingData'
import { useScrollAnimation, fadeUpVariants, staggerContainerVariants } from '../hooks/useScrollAnimation'

function AnimatedCounter({ target, suffix, duration = 2 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null!)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!isInView) return
    const startTime = performance.now()
    const startValue = 0

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / (duration * 1000), 1)
      const easedProgress = easeOut(progress)
      const currentValue = Math.round(startValue + (target - startValue) * easedProgress)
      setCount(currentValue)
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [isInView, target, duration])

  const formatted =
    target >= 10000
      ? count.toLocaleString()
      : count.toString()

  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  )
}

export function StatisticsSection() {
  const { ref: headingRef, isInView: headingInView } = useScrollAnimation()
  const { ref: gridRef, isInView: gridInView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 })

  return (
    <section
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #00214d 0%, #00468e 50%, #1a56db 100%)' }}
      aria-labelledby="stats-heading"
    >
      {/* Background glow blobs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #d4af37 0%, transparent 70%)' }}
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
          <span className="inline-block text-[#d4af37] font-semibold text-sm tracking-widest uppercase mb-4">
            By the Numbers
          </span>
          <h2
            id="stats-heading"
            className="text-white font-black leading-tight tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            A University That Shapes{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #f0d060 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Futures
            </span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
          variants={staggerContainerVariants}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUpVariants}
              className="group relative bg-white/8 hover:bg-white/14 border border-white/12 hover:border-white/25 rounded-2xl p-5 text-center transition-all duration-300 cursor-default"
            >
              {/* Icon */}
              <div className="text-2xl mb-3" role="img" aria-hidden="true">{stat.icon}</div>

              {/* Counter */}
              <p
                className="font-black text-2xl lg:text-3xl leading-none mb-1.5 tabular-nums"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #d4af37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>

              {/* Label */}
              <p className="text-white/60 text-xs font-medium uppercase tracking-wider leading-tight">
                {stat.label}
              </p>

              {/* Bottom glow */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
