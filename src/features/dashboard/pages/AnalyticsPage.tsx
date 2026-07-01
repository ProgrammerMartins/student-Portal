import { BarChart3, TrendingUp, Users, BookOpen } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card'
import { useAuthStore } from '@/features/authentication/stores/auth-store'
import { useAdminDashboard } from '../hooks/use-dashboard'

export function AnalyticsPage() {
  const user = useAuthStore((state) => state.user)
  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin'
  const { data: adminData } = useAdminDashboard() // Only fetches if admin/super_admin thanks to interceptors or enabled flag if we set it

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Detailed university analytics and reports.</p>
      </div>

      {!isAdmin ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Student Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Your personal academic performance analytics will appear here at the end of the semester.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Enrollment Trends
              </CardTitle>
              <CardDescription>Total students vs expected capacity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-6">
                <span className="text-4xl font-bold tracking-tight text-primary">
                  {adminData?.stats.totalStudents ?? 0}
                </span>
                <p className="text-sm text-muted-foreground mt-2">Active enrollments</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Curriculum Coverage
              </CardTitle>
              <CardDescription>Courses available across departments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-6">
                <span className="text-4xl font-bold tracking-tight text-primary">
                  {adminData?.stats.totalCourses ?? 0}
                </span>
                <p className="text-sm text-muted-foreground mt-2">Registered courses</p>
              </div>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Operational Efficiency
              </CardTitle>
              <CardDescription>Actionable metrics for administrators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between border-b pb-4">
                <span className="text-muted-foreground">Pending Student Approvals</span>
                <span className="font-medium text-warning">{adminData?.stats.pendingApprovals ?? 0}</span>
              </div>
              <div className="flex justify-between border-b pb-4">
                <span className="text-muted-foreground">Pending Course Registrations</span>
                <span className="font-medium text-warning">{adminData?.stats.pendingRegistrations ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Faculties / Departments</span>
                <span className="font-medium">{adminData?.stats.totalFaculties ?? 0} / {adminData?.stats.totalDepartments ?? 0}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
