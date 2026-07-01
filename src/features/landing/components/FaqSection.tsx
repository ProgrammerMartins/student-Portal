import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { FAQS } from '../constants/landingData'
import { useScrollAnimation, fadeUpVariants, staggerContainerVariants } from '../hooks/useScrollAnimation'

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const { ref: headingRef, isInView: headingInView } = useScrollAnimation()
  const { ref: listRef, isInView: listInView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.05 })

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section
      id="faq"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ backgroundColor: '#f8fafc' }}
      aria-labelledby="faq-heading"
    >
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #1a56db 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial="hidden"
          animate={headingInView ? 'visible' : 'hidden'}
          variants={fadeUpVariants}
          className="text-center mb-14"
        >
          <span className="inline-block text-[#10b981] font-semibold text-sm tracking-widest uppercase mb-4">
            FAQ
          </span>
          <h2
            id="faq-heading"
            className="font-black text-[#0f172a] leading-tight tracking-tight mb-5"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Frequently Asked{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #1a56db 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Questions
            </span>
          </h2>
          <p className="text-[#64748b] text-lg">
            Everything you need to know about the student portal. Can't find your answer?{' '}
            <a href="#contact" className="text-[#1a56db] font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db] rounded">
              Contact us
            </a>
            .
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          ref={listRef}
          initial="hidden"
          animate={listInView ? 'visible' : 'hidden'}
          variants={staggerContainerVariants}
          className="space-y-3"
          role="list"
        >
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={i}
                variants={fadeUpVariants}
                role="listitem"
              >
                <div
                  className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? 'border-[#1a56db]/30 shadow-md'
                      : 'border-[#e2e8f0] hover:border-[#1a56db]/20 hover:shadow-sm'
                  }`}
                >
                  {/* Question button */}
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db] focus-visible:ring-inset rounded-2xl"
                    aria-expanded={isOpen}
                    id={`faq-q-${i}`}
                    aria-controls={`faq-a-${i}`}
                  >
                    <span
                      className={`font-semibold text-base leading-snug transition-colors duration-200 ${
                        isOpen ? 'text-[#00468e]' : 'text-[#0f172a]'
                      }`}
                    >
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 ${
                        isOpen ? 'bg-[#00468e] text-white' : 'bg-[#f1f5f9] text-[#64748b]'
                      }`}
                      aria-hidden="true"
                    >
                      <Plus className="w-3.5 h-3.5" strokeWidth={3} />
                    </motion.div>
                  </button>

                  {/* Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-a-${i}`}
                        role="region"
                        aria-labelledby={`faq-q-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="px-6 pb-5 border-t border-[#e2e8f0]">
                          <p className="text-[#475569] text-sm leading-relaxed pt-4">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
