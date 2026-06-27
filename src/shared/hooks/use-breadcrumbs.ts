import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { NAV_ITEMS } from '@/shared/constants/navigation'

export interface BreadcrumbItem {
  label: string
  href: string
}

export function useBreadcrumbs(): BreadcrumbItem[] {
  const location = useLocation()

  return useMemo(() => {
    const segments = location.pathname.split('/').filter(Boolean)
    const crumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }]

    segments.forEach((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join('/')}`
      const navMatch = NAV_ITEMS.find((item) => item.href === href)
      const label = navMatch?.label ?? segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
      crumbs.push({ label, href })
    })

    return crumbs
  }, [location.pathname])
}
