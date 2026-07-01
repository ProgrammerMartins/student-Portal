import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  BookOpen,
  Award,
  CreditCard,
  CalendarDays,
  UserCircle,
  ChevronRight,
} from 'lucide-react'
import { FEATURES } from '../constants/landingData'
import {
  useScrollAnimation,
  fadeUpVariants,
  slideInLeftVariants,
  slideInRightVariants,
} from '../hooks/useScrollAnimation'

const ICONS: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  LayoutDashboard,
  BookOpen,
  Award,
  CreditCard,
  CalendarDays,
  UserCircle,
}

// ── Feature mockup visual ────────────────────────────────────────────────────
function FeatureMockup({ feature, index }: { feature: (typeof FEATURES)[number]; index: number }) {
  const Icon = ICONS[feature.icon]
  const mockItems = [
    { label: "Today's Classes", value: '3 remaining', bar: 0.4 },
    { label: 'Course Progress', value: '72%', bar: 0.72 },
    { label: 'Assignments Due', value: '2 pending', bar: 0.3 },
  ]

  return (
    <div
      className="relative rounded-2xl overflow-hidden p-6 h-full min-h-[280px]"
      style={{
        background: `linear-gradient(135deg, ${feature.highlight}12 0%, ${feature.highlight}05 100%)`,
        border: `1px solid ${feature.highlight}25`,
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${feature.highlight}20` }}
        >
          {Icon && (
            <Icon
              className="w-5 h-5"
              style={{ color: feature.highlight } as React.CSSProperties}
              strokeWidth={2}
            />
          )}
        </div>
        <div>
          <p className="text-[#0f172a] font-bold text-sm">{feature.title}</p>
          <p className="text-[#64748b] text-xs">{feature.badge} Module</p>
        </div>
        <div
          className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ backgroundColor: `${feature.highlight}15`, color: feature.highlight }}
        >
          Active
        </div>
      </div>

      {/* Mock content bars */}
      <div className="space-y-4">
        {mockItems.map((item, i) => (
          <div key={i}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[#0f172a] text-xs font-medium">{item.label}</span>
              <span className="text-[#64748b] text-xs">{item.value}</span>
            </div>
            <div className="h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${item.bar * 100}%` }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: index * 0.1 + i * 0.1, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${feature.highlight} 0%, ${feature.highlight}80 100%)`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Action button */}
      <div className="mt-5">
        <div
          className="inline-flex items-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-xl cursor-default"
          style={{ backgroundColor: `${feature.highlight}15`, color: feature.highlight }}
        >
          View Details
          <ChevronRight className="w-3 h-3" />
        </div>
      </div>

      {/* Decorative circle */}
      <div
        className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-10 pointer-events-none"
        style={{ backgroundColor: feature.highlight }}
        aria-hidden="true"
      />
    </div>
  )
}

// ── Feature row — its own component so hooks are called at component level,
//    NOT inside a .map() callback (which would violate Rules of Hooks) ────────
function FeatureRow({ feature, index }: { feature: (typeof FEATURES)[number]; index: number }) {
  const isEven = index % 2 === 0
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.15 })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
    >
      {/* Text side */}
      <motion.div
        variants={isEven ? slideInLeftVariants : slideInRightVariants}
        className={isEven ? 'lg:order-1' : 'lg:order-2'}
      >
        <div
          className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-4"
          style={{ backgroundColor: `${feature.highlight}15`, color: feature.highlight }}
        >
          {feature.badge}
        </div>
        <h3 className="text-[#0f172a] font-black text-2xl lg:text-3xl tracking-tight mb-4 leading-tight">
          {feature.title}
        </h3>
        <p className="text-[#64748b] text-base leading-relaxed mb-6">{feature.description}</p>
        <div
          className="flex items-center gap-2 text-sm font-semibold"
          style={{ color: feature.highlight }}
        >
          <span>Explore feature</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </motion.div>

      {/* Visual side */}
      <motion.div
        variants={isEven ? slideInRightVariants : slideInLeftVariants}
        className={isEven ? 'lg:order-2' : 'lg:order-1'}
      >
        <FeatureMockup feature={feature} index={index} />
      </motion.div>
    </motion.div>
  )
}

// ── Section ──────────────────────────────────────────────────────────────────
export function FeaturesSection() {
  const { ref: headingRef, isInView: headingInView } = useScrollAnimation()

  return (
    <section
      id="features"
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ backgroundColor: '#f8fafc' }}
      aria-labelledby="features-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial="hidden"
          animate={headingInView ? 'visible' : 'hidden'}
          variants={fadeUpVariants}
          className="text-center mb-20"
        >
          <span className="inline-block text-[#10b981] font-semibold text-sm tracking-widest uppercase mb-4">
            Key Features
          </span>
          <h2
            id="features-heading"
            className="font-black text-[#0f172a] leading-tight tracking-tight mb-5"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Powerful Tools for{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #1a56db 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Every Student
            </span>
          </h2>
          <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
            A complete academic ecosystem — from first registration to graduation, every touchpoint
            is thoughtfully designed.
          </p>
        </motion.div>

        {/* Alternating feature rows — each is its own component */}
        <div className="space-y-20">
          {FEATURES.map((feature, index) => (
            <FeatureRow key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
