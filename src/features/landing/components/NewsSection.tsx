import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import { NEWS } from '../constants/landingData'
import { useScrollAnimation, fadeUpVariants, staggerContainerVariants } from '../hooks/useScrollAnimation'

export function NewsSection() {
  const { ref: headingRef, isInView: headingInView } = useScrollAnimation()
  const { ref: gridRef, isInView: gridInView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 })

  const [featured, ...rest] = NEWS

  return (
    <section
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
      aria-labelledby="news-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial="hidden"
          animate={headingInView ? 'visible' : 'hidden'}
          variants={fadeUpVariants}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-block text-[#f59e0b] font-semibold text-sm tracking-widest uppercase mb-4">
              News & Announcements
            </span>
            <h2
              id="news-heading"
              className="font-black text-[#0f172a] leading-tight tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)' }}
            >
              Stay in the Know
            </h2>
          </div>
          <button className="flex items-center gap-2 text-[#1a56db] font-semibold text-sm hover:gap-3 transition-all duration-200 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a56db] rounded-lg px-1">
            View all news
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
          variants={staggerContainerVariants}
          className="grid lg:grid-cols-3 gap-6"
        >
          {/* Featured card */}
          <motion.article
            variants={fadeUpVariants}
            className="lg:col-span-2 group relative bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden hover:border-[#1a56db]/30 hover:shadow-xl transition-all duration-300 cursor-pointer"
            tabIndex={0}
            aria-label={`Featured: ${featured.title}`}
          >
            {/* Featured image placeholder */}
            <div
              className="h-48 lg:h-56 relative overflow-hidden flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #00468e 0%, #1a56db 60%, #10b981 100%)' }}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle at 30% 70%, #d4af37 0%, transparent 40%)`,
                }}
                aria-hidden="true"
              />
              <div className="text-center text-white relative z-10">
                <div className="text-5xl mb-2" aria-hidden="true">📢</div>
                <p className="text-white/80 text-sm font-medium">University Announcement</p>
              </div>
              {/* Featured badge */}
              <div className="absolute top-4 left-4 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-3 py-1">
                <span className="text-white text-xs font-semibold">⭐ Featured</span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: `${featured.categoryColor}15`, color: featured.categoryColor }}
                >
                  {featured.category}
                </span>
                <span className="flex items-center gap-1 text-[#94a3b8] text-xs">
                  <Calendar className="w-3 h-3" aria-hidden="true" />
                  {featured.date}
                </span>
              </div>
              <h3 className="text-[#0f172a] font-black text-xl mb-2 group-hover:text-[#00468e] transition-colors duration-200 leading-tight">
                {featured.title}
              </h3>
              <p className="text-[#64748b] text-sm leading-relaxed mb-4">{featured.excerpt}</p>
              <span className="flex items-center gap-1.5 text-[#1a56db] text-sm font-semibold group-hover:gap-2.5 transition-all duration-200">
                Read more <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            </div>
          </motion.article>

          {/* Side cards */}
          <div className="flex flex-col gap-4">
            {rest.map((item) => (
              <motion.article
                key={item.title}
                variants={fadeUpVariants}
                className="group bg-white border border-[#e2e8f0] rounded-2xl p-5 hover:border-[#1a56db]/30 hover:shadow-lg transition-all duration-300 cursor-pointer flex-1"
                tabIndex={0}
                aria-label={item.title}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: `${item.categoryColor}15`, color: item.categoryColor }}
                  >
                    {item.category}
                  </span>
                  <span className="flex items-center gap-1 text-[#94a3b8] text-xs">
                    <Calendar className="w-3 h-3" aria-hidden="true" />
                    {item.date}
                  </span>
                </div>
                <h3 className="text-[#0f172a] font-bold text-sm mb-2 group-hover:text-[#00468e] transition-colors duration-200 leading-tight">
                  {item.title}
                </h3>
                <p className="text-[#64748b] text-xs leading-relaxed">{item.excerpt}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
