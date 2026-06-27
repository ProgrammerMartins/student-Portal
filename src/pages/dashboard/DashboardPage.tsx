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

  return (
    <Suspense fallback={<PageLoader />}>
      {user.role === 'admin' ? <AdminDashboard /> : <StudentDashboard />}
    </Suspense>
  )
}
