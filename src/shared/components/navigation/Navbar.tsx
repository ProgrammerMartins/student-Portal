import { Bell, LogOut, Moon, Search, Sun, User as UserIcon } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { useTheme } from '@/shared/providers/theme-provider'
import { useAuthStore } from '@/features/authentication/stores/auth-store'
import { logout as clearApiToken } from '@/features/authentication/api/auth-api'
import { MobileNav } from './MobileNav'
import type { User as UserType } from '@/shared/types'
import { Link, useNavigate } from 'react-router-dom'

interface NavbarProps {
  user: UserType
}

function toSidebarRole(role: string): 'student' | 'admin' {
  if (role === 'STUDENT' || role === 'student') return 'student'
  return 'admin'
}

export function Navbar({ user }: NavbarProps) {
  const navigate = useNavigate()
  const { resolvedTheme, toggle } = useTheme()
  const clearAuth = useAuthStore((state) => state.clearAuth)

  return (
    <header className="fixed left-0 right-0 top-0 z-20 h-16 border-b border-border bg-card/80 backdrop-blur-md md:left-[260px]">
      <div className="flex h-full items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex items-center gap-3">
          <MobileNav role={toSidebarRole(user.role)} />
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="h-9 w-[200px] pl-9 md:w-[280px]"
              aria-label="Global search"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive ring-2 ring-card" />
          </Button>

          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {resolvedTheme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} />
                  <AvatarFallback>
                    <UserIcon className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-medium">
                    {user.firstName} {user.lastName}
                  </span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  clearAuth()
                  clearApiToken()
                  navigate('/login', { replace: true })
                }}
                className="text-destructive focus:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
