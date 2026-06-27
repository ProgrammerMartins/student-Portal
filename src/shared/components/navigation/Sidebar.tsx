import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { ChevronLeft, ChevronRight, University } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip'
import { cn } from '@/shared/utilities/cn'
import { getNavItems } from '@/shared/constants/navigation'
import type { NavItem } from '@/shared/constants/navigation'

interface SidebarProps {
  role: 'student' | 'admin'
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ role, collapsed, onToggle }: SidebarProps) {
  const items = getNavItems(role)

  useEffect(() => {
    window.localStorage.setItem('portal-sidebar-collapsed', String(collapsed))
  }, [collapsed])

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-30 hidden h-screen flex-col border-r border-border bg-card transition-all duration-slow ease-out-expo md:flex',
        collapsed ? 'w-[72px]' : 'w-[260px]',
      )}
    >
      <div className="flex h-16 items-center gap-3 border-b border-border px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <University className="h-5 w-5" />
        </div>
        <span
          className={cn(
            'truncate font-semibold tracking-tight text-card-foreground transition-opacity',
            collapsed && 'opacity-0',
          )}
        >
          UniPortal
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {items.map((item) => (
            <NavItemLink key={item.href} item={item} collapsed={collapsed} />
          ))}
        </ul>
      </nav>

      <div className="border-t border-border p-3">
        <Button
          variant="ghost"
          size="icon"
          className="w-full justify-center"
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && <span className="ml-2 text-sm">Collapse</span>}
        </Button>
      </div>
    </aside>
  )
}

function NavItemLink({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const Icon = item.icon
  const link = (
    <NavLink
      to={item.href}
      className={({ isActive }) =>
        cn(
          'group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
        )
      }
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className={cn('truncate transition-opacity', collapsed && 'opacity-0')}>{item.label}</span>
    </NavLink>
  )

  if (collapsed) {
    return (
      <li>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>{link}</TooltipTrigger>
          <TooltipContent side="right">{item.label}</TooltipContent>
        </Tooltip>
      </li>
    )
  }

  return <li>{link}</li>
}
