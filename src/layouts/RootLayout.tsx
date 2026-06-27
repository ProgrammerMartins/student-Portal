import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/shared/components/navigation/Sidebar'
import { Navbar } from '@/shared/components/navigation/Navbar'
import { Breadcrumbs } from '@/shared/components/navigation/Breadcrumbs'
import { SkipLink } from '@/shared/components/navigation/SkipLink'
import { PageTransition } from '@/shared/components/transitions/PageTransition'
import { useAuth } from '@/features/authentication/hooks/use-auth'
import { cn } from '@/shared/utilities/cn'

export function RootLayout() {
  const { user } = useAuth()
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem('portal-sidebar-collapsed') === 'true'
  })

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SkipLink />
      <Sidebar role={user.role} collapsed={collapsed} onToggle={() => setCollapsed((prev) => !prev)} />
      <Navbar user={user} />
      <div
        className={cn(
          'pt-16 transition-all duration-slow ease-out-expo',
          collapsed ? 'md:ml-[72px]' : 'md:ml-[260px]',
        )}
      >
        <main id="main-content" className="mx-auto max-w-[1600px] p-4 md:p-6 lg:p-8">
          <div className="mb-6">
            <Breadcrumbs />
          </div>
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>
    </div>
  )
}
