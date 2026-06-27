import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/features/authentication/stores/auth-store'

export function RequireProfile() {
  const user = useAuthStore((state) => state.user)

  if (user?.role === 'student' && !user.profileComplete) {
    return <Navigate to="/register" replace />
  }

  return <Outlet />
}
