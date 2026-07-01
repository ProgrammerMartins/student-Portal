import { Suspense, lazy } from 'react'
import { PageLoader } from '@/shared/components/loading/PageLoader'
import { useAuth } from '@/features/authentication/hooks/use-auth'

const StudentDashboard = lazy(() =>
  import('@/features/dashboard/components/StudentDashboard').then((m) => ({ default: m.StudentDashboard })),
)
const AdminDashboard = lazy(() =>
  import('@/features/dashboard/components/AdminDashboard').then((m) => ({ default: m.AdminDashboard })),
)

export function DashboardPage() {
  const { user } = useAuth()

  if (!user) return null

  const isAdmin = user.role === 'admin' || user.role === 'super_admin'

  return (
    <Suspense fallback={<PageLoader />}>
      {isAdmin ? <AdminDashboard /> : <StudentDashboard />}
    </Suspense>
  )
}
