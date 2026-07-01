import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  GraduationCap,
  BookOpen,
  BarChart3,
  Calendar,
  Bell,
  CreditCard,
  User,
  ChevronRight,
  Star,
  TrendingUp,
} from 'lucide-react'

// ── Floating 3D Card Helpers ────────────────────────────────────────────
const float = (duration: number, yRange: number, delay = 0) => ({
  y: [0, -yRange, 0],
  transition: {
    duration,
    repeat: Infinity,
    ease: 'easeInOut' as const,
    delay,
  },
})

function DashboardCard() {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl min-w-[220px]">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 bg-[#d4af37]/20 rounded-lg flex items-center justify-center">
          <BarChart3 className="w-4 h-4 text-[#d4af37]" />
        </div>
        <span className="text-white/90 text-xs font-semibold tracking-wide">ACADEMIC OVERVIEW</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: 'GPA', value: '4.72', color: '#d4af37' },
          { label: 'Credits', value: '102', color: '#10b981' },
          { label: 'Courses', value: '8', color: '#60a5fa' },
          { label: 'Rank', value: '#3', color: '#a78bfa' },
        ].map((item) => (
          <div key={item.label} className="bg-white/8 rounded-xl p-2.5 text-center">
            <p style={{ color: item.color }} className="text-base font-bold leading-none mb-1">
              {item.value}
            </p>
            <p className="text-white/50 text-[10px] uppercase tracking-wider">{item.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 bg-white/8 rounded-xl p-2.5">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-white/60 text-[10px]">Semester Progress</span>
          <span className="text-[#10b981] text-[10px] font-semibold">78%</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full w-[78%] bg-gradient-to-r from-[#10b981] to-[#34d399] rounded-full" />
        </div>
      </div>
    </div>
  )
}

function CourseCard() {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3.5 shadow-xl min-w-[190px]">
      <div className="flex items-center gap-2 mb-2.5">
        <div className="w-8 h-8 bg-[#1a56db]/40 rounded-xl flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-[#60a5fa]" />
        </div>
        <div>
          <p className="text-white text-xs font-semibold">CSC 401</p>
          <p className="text-white/50 text-[10px]">Next: 10:00 AM</p>
        </div>
      </div>
      <p className="text-white/80 text-[11px] leading-tight mb-2">Artificial Intelligence & Machine Learning</p>
      <div className="flex items-center gap-1.5">
        <div className="flex -space-x-1">
          {['#d4af37', '#10b981', '#60a5fa'].map((c, i) => (
            <div
              key={i}
              style={{ backgroundColor: c }}
              className="w-4 h-4 rounded-full border border-white/20"
            />
          ))}
        </div>
        <span className="text-white/50 text-[10px]">+24 enrolled</span>
      </div>
    </div>
  )
}

function NotifCard() {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 shadow-xl min-w-[180px]">
      <div className="flex items-start gap-2">
        <div className="w-6 h-6 bg-[#ef4444]/20 rounded-lg flex items-center justify-center mt-0.5 shrink-0">
          <Bell className="w-3.5 h-3.5 text-[#f87171]" />
        </div>
        <div>
          <p className="text-white/90 text-[11px] font-semibold leading-tight mb-0.5">Results Published</p>
          <p className="text-white/50 text-[10px] leading-tight">2024/2025 Semester 2 results are now available on the portal.</p>
          <p className="text-[#60a5fa] text-[10px] mt-1">2 mins ago</p>
        </div>
      </div>
    </div>
  )
}

function GradeCard() {
  return (
    <div className="bg-gradient-to-br from-[#d4af37]/20 to-[#f0d060]/10 backdrop-blur-xl border border-[#d4af37]/30 rounded-2xl p-3.5 shadow-xl min-w-[150px]">
      <div className="flex items-center gap-1.5 mb-2">
        <Star className="w-3.5 h-3.5 text-[#d4af37] fill-[#d4af37]" />
        <span className="text-[#d4af37] text-[10px] font-semibold tracking-wider uppercase">Achievement</span>
      </div>
      <p className="text-white text-lg font-black leading-none">A+</p>
      <p className="text-white/60 text-[10px] mt-0.5">Algorithms & DS</p>
      <div className="flex items-center gap-1 mt-2">
        <TrendingUp className="w-3 h-3 text-[#10b981]" />
        <span className="text-[#10b981] text-[10px]">Top 5%</span>
      </div>
    </div>
  )
}

function CalendarWidget() {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  const dates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3.5 shadow-xl min-w-[175px]">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#60a5fa]" />
          <span className="text-white text-[11px] font-semibold">July 2026</span>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {days.map((d) => (
          <span key={d} className="text-white/30 text-[9px] text-center">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {dates.map((d) => (
          <span
            key={d}
            className={`text-[10px] text-center py-0.5 rounded-full font-medium ${
              d === 7
                ? 'bg-[#1a56db] text-white'
                : d === 10
                ? 'bg-[#d4af37]/80 text-[#00214d]'
                : 'text-white/70 hover:text-white'
            }`}
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Particle Background ─────────────────────────────────────────────────
function Particles() {
  const prefersReduced = useReducedMotion()
  if (prefersReduced) return null
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 4 + Math.random() * 6,
    delay: Math.random() * 5,
  }))
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/20"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ── Hero Section ────────────────────────────────────────────────────────
export function HeroSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #00214d 0%, #00468e 50%, #1a56db 100%)' }}
      aria-label="Hero section"
    >
      {/* Background mesh */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(ellipse 80% 60% at 70% 40%, rgba(26,86,219,0.6) 0%, transparent 60%),
                              radial-gradient(ellipse 60% 80% at 20% 80%, rgba(16,185,129,0.2) 0%, transparent 50%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <Particles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* ─── Left: Copy ─── */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8"
            >
              <span className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse" />
              <span className="text-white/90 text-xs font-medium tracking-wide">
                2026/2027 Academic Session Now Open
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={prefersReduced ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-white font-black leading-[1.05] tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              Your Academic Journey,{' '}
              <span
                className="inline-block"
                style={{
                  background: 'linear-gradient(135deg, #d4af37 0%, #f0d060 50%, #d4af37 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Elevated.
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-white/70 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10"
            >
              The all-in-one digital student portal that streamlines registration, tracks your
              academic progress, manages payments, and keeps you connected to campus life.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link
                to="/signup"
                id="hero-get-started"
                className="group flex items-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#f0d060] text-[#00214d] font-bold text-base px-8 py-3.5 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#d4af37]/50"
                aria-label="Get started with the student portal"
              >
                Get Started
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                id="hero-learn-more"
                onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' })}
                className="flex items-center gap-2 text-white font-semibold text-base px-8 py-3.5 rounded-2xl border border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                Learn More
              </button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex items-center gap-4 mt-10 justify-center lg:justify-start"
            >
              <div className="flex -space-x-2">
                {['#d4af37', '#10b981', '#60a5fa', '#a78bfa', '#f87171'].map((c, i) => (
                  <div
                    key={i}
                    style={{ backgroundColor: c }}
                    className="w-8 h-8 rounded-full border-2 border-[#00214d] flex items-center justify-center"
                  >
                    <User className="w-4 h-4 text-white/80" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-[#d4af37] fill-[#d4af37]" />
                  ))}
                </div>
                <p className="text-white/60 text-xs">Trusted by 24,000+ students</p>
              </div>
            </motion.div>
          </div>

          {/* ─── Right: 3D Visual ─── */}
          <div className="relative flex items-center justify-center min-h-[480px] lg:min-h-[560px]">
            {/* Central glow */}
            <div
              className="absolute w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
              style={{ background: 'radial-gradient(circle, #1a56db 0%, transparent 70%)' }}
              aria-hidden="true"
            />

            {/* Main Dashboard Card */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, scale: 0.8 }}
              animate={prefersReduced ? {} : { opacity: 1, scale: 1, ...float(6, 14) }}
              transition={{ opacity: { duration: 0.6, delay: 0.3 }, scale: { duration: 0.6, delay: 0.3 } }}
              className="relative z-20"
              style={{ filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.4))' }}
            >
              <DashboardCard />
            </motion.div>

            {/* Course Card — top left */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, x: -30 }}
              animate={prefersReduced ? {} : { opacity: 1, x: 0, ...float(5, 10, 0.5) }}
              transition={{ opacity: { duration: 0.6, delay: 0.5 } }}
              className="absolute -left-6 top-12 z-10 hidden sm:block"
              style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }}
            >
              <CourseCard />
            </motion.div>

            {/* Notification Card — top right */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, x: 30 }}
              animate={prefersReduced ? {} : { opacity: 1, x: 0, ...float(7, 12, 1) }}
              transition={{ opacity: { duration: 0.6, delay: 0.6 } }}
              className="absolute -right-4 top-8 z-30 hidden sm:block"
              style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }}
            >
              <NotifCard />
            </motion.div>

            {/* Grade Badge — bottom left */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0, ...float(4.5, 8, 1.5) }}
              transition={{ opacity: { duration: 0.6, delay: 0.7 } }}
              className="absolute -left-2 bottom-16 z-30 hidden sm:block"
              style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }}
            >
              <GradeCard />
            </motion.div>

            {/* Calendar — bottom right */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0, ...float(5.5, 10, 2) }}
              transition={{ opacity: { duration: 0.6, delay: 0.8 } }}
              className="absolute -right-2 bottom-12 z-20 hidden sm:block"
              style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }}
            >
              <CalendarWidget />
            </motion.div>

            {/* Graduation Icon — top center */}
            <motion.div
              animate={prefersReduced ? {} : float(8, 16, 0.3)}
              className="absolute top-0 left-1/2 -translate-x-1/2 z-10"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl"
                style={{ background: 'linear-gradient(135deg, #d4af37 0%, #f0d060 100%)' }}
              >
                <GraduationCap className="w-8 h-8 text-[#00214d]" strokeWidth={2} />
              </div>
            </motion.div>

            {/* Fee icon — bottom center */}
            <motion.div
              animate={prefersReduced ? {} : float(6, 12, 1.2)}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-xl"
                style={{ background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)' }}
              >
                <CreditCard className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={prefersReduced ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}
