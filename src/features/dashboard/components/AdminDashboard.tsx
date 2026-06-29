import { motion } from 'framer-motion'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  ArrowRight,
  Clock,
  Loader2,
} from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { useAdminDashboard } from '../hooks/use-dashboard'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
}

export function AdminDashboard() {
  const { data: dashboard, isLoading, isError } = useAdminDashboard()

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Loading dashboard...
      </div>
    )
  }

  if (isError || !dashboard) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-muted-foreground">
        <p className="text-lg font-medium">Could not load dashboard data</p>
        <p className="text-sm">Please try again later.</p>
      </div>
    )
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="text-2xl font-semibold tracking-tight">Administrator Dashboard</h1>
        <p className="text-muted-foreground">
          {dashboard.currentSemester
            ? `${dashboard.currentSemester.name} · ${dashboard.currentSemester.session}`
            : 'University-wide overview and operational insights.'}
        </p>
      </motion.div>

      <motion.div variants={item} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total Students</p>
            <div className="mt-2 flex items-end justify-between">
              <span className="text-3xl font-semibold tracking-tight">{dashboard.stats.totalStudents.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Courses</p>
            <div className="mt-2 flex items-end justify-between">
              <span className="text-3xl font-semibold tracking-tight">{dashboard.stats.totalCourses}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Faculties</p>
            <div className="mt-2 flex items-end justify-between">
              <span className="text-3xl font-semibold tracking-tight">{dashboard.stats.totalFaculties}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Departments</p>
            <div className="mt-2 flex items-end justify-between">
              <span className="text-3xl font-semibold tracking-tight">{dashboard.stats.totalDepartments}</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-6 xl:grid-cols-2">
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Pending Items</CardTitle>
              <CardDescription>Actions requiring your attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-medium">Registration Approvals</p>
                  <p className="text-sm text-muted-foreground">{dashboard.stats.pendingRegistrations} pending</p>
                </div>
                <span className="text-2xl font-semibold text-warning">{dashboard.stats.pendingRegistrations}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-medium">Student Approvals</p>
                  <p className="text-sm text-muted-foreground">{dashboard.stats.pendingApprovals} pending</p>
                </div>
                <span className="text-2xl font-semibold text-warning">{dashboard.stats.pendingApprovals}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Student Distribution</CardTitle>
              <CardDescription>Total students at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Students', value: dashboard.stats.totalStudents },
                      { name: 'Courses', value: dashboard.stats.totalCourses },
                      { name: 'Departments', value: dashboard.stats.totalDepartments },
                      { name: 'Faculties', value: dashboard.stats.totalFaculties },
                    ]}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        borderColor: 'var(--border)',
                        borderRadius: 'var(--radius-md)',
                      }}
                    />
                    <Bar dataKey="value" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div variants={item}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Registrations</CardTitle>
              <CardDescription>
                {dashboard.currentSemester
                  ? `Latest course registrations for ${dashboard.currentSemester.name}`
                  : 'Latest course registrations'}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            {dashboard.recentRegistrations.length === 0 ? (
              <p className="text-sm text-muted-foreground">No recent registrations.</p>
            ) : (
              <div className="space-y-3">
                {dashboard.recentRegistrations.map((reg) => (
                  <div
                    key={reg.id}
                    className="flex items-center justify-between gap-4 rounded-lg border border-border p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{reg.course.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {reg.student.firstName} {reg.student.lastName} ({reg.student.matricNumber ?? 'N/A'})
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium ${reg.status === 'APPROVED' ? 'text-success' : reg.status === 'PENDING' ? 'text-warning' : 'text-destructive'}`}>
                        {reg.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
