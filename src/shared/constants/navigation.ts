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
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['student', 'admin'] },
  { label: 'Profile', href: '/profile', icon: User, roles: ['student', 'admin'] },
  { label: 'Students', href: '/students', icon: Users, roles: ['admin'] },
  { label: 'Courses', href: '/courses', icon: BookOpen, roles: ['student', 'admin'] },
  { label: 'Registration', href: '/registration', icon: ScrollText, roles: ['student', 'admin'] },
  { label: 'Results', href: '/results', icon: GraduationCap, roles: ['student', 'admin'] },
  { label: 'Payments', href: '/payments', icon: CreditCard, roles: ['student', 'admin'] },
  { label: 'Timetable', href: '/timetable', icon: Calendar, roles: ['student', 'admin'] },
  { label: 'Notifications', href: '/notifications', icon: Bell, roles: ['student', 'admin'] },
  { label: 'Administration', href: '/administration', icon: Shield, roles: ['admin'] },
  { label: 'Analytics', href: '/analytics', icon: BarChart3, roles: ['admin'] },
  { label: 'Settings', href: '/settings', icon: Settings, roles: ['student', 'admin'] },
]

export function getNavItems(role: 'student' | 'admin') {
  return NAV_ITEMS.filter((item) => item.roles.includes(role))
}
