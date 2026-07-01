import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  BookOpen,
  CreditCard,
  Bell,
  BarChart2,
  TrendingUp,
  GraduationCap,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Circle,
} from 'lucide-react'
import { useScrollAnimation, fadeUpVariants, scaleInVariants } from '../hooks/useScrollAnimation'

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', color: '#1a56db' },
  { icon: BookOpen, label: 'Courses', color: '#10b981' },
  { icon: BarChart2, label: 'Results', color: '#d4af37' },
  { icon: CreditCard, label: 'Payments', color: '#8b5cf6' },
  { icon: Calendar, label: 'Timetable', color: '#f59e0b' },
  { icon: Bell, label: 'Notifications', color: '#ef4444' },
]

const COURSE_LIST = [
  { code: 'CSC 401', name: 'Artificial Intelligence', grade: 'A', credit: 3, color: '#1a56db' },
  { code: 'CSC 403', name: 'Database Systems', grade: 'B+', credit: 3, color: '#10b981' },
  { code: 'MTH 301', name: 'Linear Algebra', grade: 'A-', credit: 2, color: '#d4af37' },
  { code: 'CSC 407', name: 'Software Engineering', grade: 'A', credit: 3, color: '#8b5cf6' },
]

const CHART_BARS = [62, 78, 85, 72, 90, 88, 95]
const CHART_LABELS = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb']

function BrowserChrome({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-2xl border border-[#e2e8f0]"
      style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.08)' }}
    >
      {/* Browser top bar */}
      <div className="bg-[#f1f5f9] px-4 py-3 flex items-center gap-3 border-b border-[#e2e8f0]">
        <div className="flex gap-1.5">
          <Circle className="w-3 h-3 text-[#ef4444] fill-[#ef4444]" />
          <Circle className="w-3 h-3 text-[#f59e0b] fill-[#f59e0b]" />
          <Circle className="w-3 h-3 text-[#22c55e] fill-[#22c55e]" />
        </div>
        <div className="flex-1 bg-white rounded-lg px-3 py-1 flex items-center gap-2 border border-[#e2e8f0]">
          <div className="w-2 h-2 bg-[#22c55e] rounded-full" />
          <span className="text-[#94a3b8] text-xs">portal.university.edu.ng/dashboard</span>
        </div>
      </div>
      {children}
    </div>
  )
}

function DashboardPreview() {
  const [activeNav, setActiveNav] = useState(0)

  return (
    <div className="bg-[#f8fafc] flex h-[400px] lg:h-[480px] overflow-hidden">
      {/* Sidebar */}
      <div className="w-14 lg:w-52 bg-[#00214d] flex flex-col py-4 shrink-0">
        <div className="flex items-center gap-2 px-3 lg:px-4 mb-6">
          <div className="w-7 h-7 bg-gradient-to-br from-[#d4af37] to-[#f0d060] rounded-lg flex items-center justify-center shrink-0">
            <GraduationCap className="w-4 h-4 text-[#00214d]" strokeWidth={2.5} />
          </div>
          <span className="text-white font-bold text-sm hidden lg:block">UniPortal</span>
        </div>
        <nav className="space-y-1 px-2 flex-1">
          {NAV_ITEMS.map((item, i) => {
            const Icon = item.icon
            const isActive = i === activeNav
            return (
              <button
                key={item.label}
                onClick={() => setActiveNav(i)}
                className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-left transition-all duration-200 group ${
                  isActive ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white/80 hover:bg-white/8'
                }`}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="w-4 h-4 shrink-0" style={isActive ? { color: item.color } : {}} strokeWidth={2} />
                <span className="text-xs font-medium hidden lg:block">{item.label}</span>
                {isActive && <div className="ml-auto w-1 h-4 rounded-full hidden lg:block" style={{ backgroundColor: item.color }} />}
              </button>
            )
          })}
        </nav>
        <div className="px-2 mt-auto">
          <div className="bg-white/10 rounded-xl p-2 lg:p-3 flex items-center gap-2">
            <div className="w-6 h-6 bg-[#d4af37] rounded-full flex items-center justify-center shrink-0">
              <span className="text-[#00214d] text-[9px] font-bold">AO</span>
            </div>
            <div className="hidden lg:block min-w-0">
              <p className="text-white text-[10px] font-semibold truncate">Amina Okafor</p>
              <p className="text-white/40 text-[9px] truncate">CSC/2021/042</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden p-4 lg:p-6 space-y-4">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'CGPA', value: '4.72', color: '#d4af37', Icon: TrendingUp },
            { label: 'Credits', value: '102', color: '#10b981', Icon: BookOpen },
            { label: 'Courses', value: '8', color: '#1a56db', Icon: LayoutDashboard },
            { label: 'Rank', value: '#3', color: '#8b5cf6', Icon: GraduationCap },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-3 border border-[#e2e8f0] hover:border-blue-200 hover:shadow-md transition-all duration-200 cursor-default group">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[#94a3b8] text-[10px] font-semibold uppercase tracking-wider">{stat.label}</span>
                <stat.Icon className="w-3.5 h-3.5" style={{ color: stat.color }} strokeWidth={2} />
              </div>
              <p className="text-[#0f172a] text-lg font-black leading-none" style={{ color: stat.color }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Chart + courses row */}
        <div className="grid lg:grid-cols-5 gap-3 flex-1">
          {/* Chart */}
          <div className="lg:col-span-3 bg-white rounded-xl p-4 border border-[#e2e8f0]">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-[#0f172a] text-xs font-bold">GPA Trend</h4>
              <span className="text-[#10b981] text-[10px] font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +0.3 this sem
              </span>
            </div>
            <div className="flex items-end gap-1.5 h-20">
              {CHART_BARS.map((height, i) => (
                <div key={i} className="flex flex-col items-center gap-1 flex-1">
                  <motion.div
                    className="w-full rounded-t-md"
                    style={{
                      height: `${height}%`,
                      background:
                        i === CHART_BARS.length - 1
                          ? 'linear-gradient(180deg, #1a56db 0%, #60a5fa 100%)'
                          : '#e2e8f0',
                    }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' }}
                    style={{
                      transformOrigin: 'bottom',
                      height: `${height}%`,
                      background: i === CHART_BARS.length - 1
                        ? 'linear-gradient(180deg, #1a56db 0%, #60a5fa 100%)'
                        : '#e2e8f0',
                    }}
                  />
                  <span className="text-[#94a3b8] text-[8px]">{CHART_LABELS[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Course list */}
          <div className="lg:col-span-2 bg-white rounded-xl p-3 border border-[#e2e8f0] overflow-hidden">
            <h4 className="text-[#0f172a] text-xs font-bold mb-2.5">Registered Courses</h4>
            <div className="space-y-2">
              {COURSE_LIST.map((course) => (
                <div
                  key={course.code}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#f8fafc] transition-colors cursor-default group"
                >
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-white text-[9px] font-black"
                    style={{ backgroundColor: course.color }}
                  >
                    {course.grade}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#0f172a] text-[10px] font-semibold truncate">{course.code}</p>
                    <p className="text-[#94a3b8] text-[9px] truncate">{course.name}</p>
                  </div>
                  <span className="text-[#94a3b8] text-[9px] shrink-0">{course.credit} cr</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PortalPreviewSection() {
  const { ref: headingRef, isInView: headingInView } = useScrollAnimation()
  const { ref: previewRef, isInView: previewInView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 })

  return (
    <section
      id="portal-preview"
      className="py-24 lg:py-32 bg-white relative overflow-hidden"
      aria-labelledby="portal-preview-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, #e0eaff 0%, transparent 60%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial="hidden"
          animate={headingInView ? 'visible' : 'hidden'}
          variants={fadeUpVariants}
          className="text-center mb-14"
        >
          <span className="inline-block text-[#8b5cf6] font-semibold text-sm tracking-widest uppercase mb-4">
            Portal Preview
          </span>
          <h2
            id="portal-preview-heading"
            className="font-black text-[#0f172a] leading-tight tracking-tight mb-5"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            See What Awaits You{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #1a56db 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Inside
            </span>
          </h2>
          <p className="text-[#64748b] text-lg max-w-2xl mx-auto">
            An interactive glimpse into your personalized student dashboard — clean, fast, and intuitive.
          </p>
        </motion.div>

        {/* Browser mockup */}
        <motion.div
          ref={previewRef}
          initial="hidden"
          animate={previewInView ? 'visible' : 'hidden'}
          variants={scaleInVariants}
        >
          <BrowserChrome>
            <DashboardPreview />
          </BrowserChrome>
        </motion.div>

        {/* Feature highlights below mockup */}
        <div className="grid sm:grid-cols-3 gap-6 mt-10">
          {[
            { icon: ChevronRight, label: 'Interactive Navigation', desc: 'Switch between modules instantly with zero page reload.' },
            { icon: BarChart2, label: 'Live Analytics', desc: 'Your academic metrics updated in real time as results are published.' },
            { icon: Bell, label: 'Smart Alerts', desc: 'Contextual notifications that surface the right information at the right time.' },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3 p-4 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0]">
              <div className="w-8 h-8 bg-[#1a56db]/10 rounded-xl flex items-center justify-center shrink-0">
                <item.icon className="w-4 h-4 text-[#1a56db]" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[#0f172a] font-semibold text-sm mb-0.5">{item.label}</p>
                <p className="text-[#64748b] text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
