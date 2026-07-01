import {
  BarChart3,
  Bell,
  BookOpen,
  Calendar,
  CreditCard,
  GraduationCap,
  LayoutDashboard,
  ScrollText,
  Settings,
  Shield,
  User,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  roles: ('student' | 'admin')[]
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/portal/dashboard', icon: LayoutDashboard, roles: ['student', 'admin'] },
  { label: 'Profile', href: '/portal/profile', icon: User, roles: ['student'] },
  { label: 'Students', href: '/portal/students', icon: Users, roles: ['admin'] },
  { label: 'Courses', href: '/portal/courses', icon: BookOpen, roles: ['student', 'admin'] },
  { label: 'Results', href: '/portal/results', icon: GraduationCap, roles: ['student', 'admin'] },
  { label: 'Payments', href: '/portal/payments', icon: CreditCard, roles: ['student', 'admin'] },
  { label: 'Timetable', href: '/portal/timetable', icon: Calendar, roles: ['student', 'admin'] },
  { label: 'Notifications', href: '/portal/notifications', icon: Bell, roles: ['student', 'admin'] },
  { label: 'Administration', href: '/portal/administration', icon: Shield, roles: ['admin'] },
  { label: 'Analytics', href: '/portal/analytics', icon: BarChart3, roles: ['admin'] },
  { label: 'Settings', href: '/portal/settings', icon: Settings, roles: ['student', 'admin'] },
]

export function getNavItems(role: 'student' | 'admin') {
  return NAV_ITEMS.filter((item) => item.roles.includes(role))
}
