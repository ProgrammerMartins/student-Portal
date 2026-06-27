import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, University } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/ui/sheet'
import { cn } from '@/shared/utilities/cn'
import { getNavItems } from '@/shared/constants/navigation'

interface MobileNavProps {
  role: 'student' | 'admin'
}

export function MobileNav({ role }: MobileNavProps) {
  const items = getNavItems(role)
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0">
        <SheetHeader className="border-b border-border p-4 text-left">
          <SheetTitle className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <University className="h-5 w-5" />
            </div>
            <span className="font-semibold tracking-tight">UniPortal</span>
          </SheetTitle>
        </SheetHeader>
        <nav className="p-4">
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                    )
                  }
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
