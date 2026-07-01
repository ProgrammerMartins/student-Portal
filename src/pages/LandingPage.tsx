import { Suspense } from 'react'
import { LandingNav } from '@/features/landing/components/LandingNav'
import { HeroSection } from '@/features/landing/components/HeroSection'
import { WhyChooseSection } from '@/features/landing/components/WhyChooseSection'
import { FeaturesSection } from '@/features/landing/components/FeaturesSection'
import { PortalPreviewSection } from '@/features/landing/components/PortalPreviewSection'
import { StatisticsSection } from '@/features/landing/components/StatisticsSection'
import { TestimonialsSection } from '@/features/landing/components/TestimonialsSection'
import { NewsSection } from '@/features/landing/components/NewsSection'
import { FaqSection } from '@/features/landing/components/FaqSection'
import { CtaSection } from '@/features/landing/components/CtaSection'
import { LandingFooter } from '@/features/landing/components/LandingFooter'

export function LandingPage() {
  return (
    <div className="min-h-screen antialiased font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Skip to main content — accessibility */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] bg-white text-[#00468e] font-semibold px-4 py-2 rounded-xl shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00468e]"
      >
        Skip to main content
      </a>

      <LandingNav />

      <main id="main-content">
        <HeroSection />
        <WhyChooseSection />
        <FeaturesSection />
        <PortalPreviewSection />
        <StatisticsSection />
        <TestimonialsSection />
        <NewsSection />
        <FaqSection />
        <CtaSection />
      </main>

      <LandingFooter />
    </div>
  )
}
