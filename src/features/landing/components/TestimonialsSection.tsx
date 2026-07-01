import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { TESTIMONIALS } from '../constants/landingData'
import { useScrollAnimation, fadeUpVariants } from '../hooks/useScrollAnimation'

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const { ref: headingRef, isInView: headingInView } = useScrollAnimation()

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length)

  const testimonial = TESTIMONIALS[current]

  return (
    <section
      className="py-24 lg:py-32 bg-[#f8fafc] relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, #dbeafe 0%, transparent 60%)' }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial="hidden"
          animate={headingInView ? 'visible' : 'hidden'}
          variants={fadeUpVariants}
          className="text-center mb-14"
        >
          <span className="inline-block text-[#ef4444] font-semibold text-sm tracking-widest uppercase mb-4">
            Testimonials
          </span>
          <h2
            id="testimonials-heading"
            className="font-black text-[#0f172a] leading-tight tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Voices from Our{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Community
            </span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-[#e2e8f0] relative overflow-hidden"
              aria-live="polite"
              aria-atomic="true"
            >
              {/* Quote icon */}
              <div
                className="absolute top-6 right-8 opacity-10"
                style={{ color: testimonial.color }}
                aria-hidden="true"
              >
                <Quote className="w-16 h-16" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6" aria-label={`${testimonial.rating} out of 5 stars`}>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" aria-hidden="true" />
                ))}
              </div>

              {/* Quote text */}
              <blockquote className="text-[#1e293b] text-lg lg:text-xl leading-relaxed font-medium mb-8 relative z-10">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-sm shrink-0"
                  style={{ backgroundColor: testimonial.color }}
                  aria-hidden="true"
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-[#0f172a] font-bold text-base">{testimonial.name}</p>
                  <p className="text-[#64748b] text-sm">{testimonial.role}</p>
                </div>
              </div>

              {/* Bottom accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl"
                style={{ background: `linear-gradient(90deg, ${testimonial.color} 0%, ${testimonial.color}40 100%)` }}
                aria-hidden="true"
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Testimonial ${i + 1}`}
                  className="transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db]"
                  style={{
                    width: i === current ? '24px' : '8px',
                    height: '8px',
                    backgroundColor: i === current ? TESTIMONIALS[i].color : '#cbd5e1',
                  }}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-[#e2e8f0] flex items-center justify-center text-[#64748b] hover:bg-[#00468e] hover:text-white hover:border-[#00468e] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db]"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-[#e2e8f0] flex items-center justify-center text-[#64748b] hover:bg-[#00468e] hover:text-white hover:border-[#00468e] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db]"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
