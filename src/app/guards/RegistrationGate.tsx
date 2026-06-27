import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/features/authentication/stores/auth-store'

export function RegistrationGate() {
  const user = useAuthStore((state) => state.user)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (user.role === 'admin' || user.profileComplete) {
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
