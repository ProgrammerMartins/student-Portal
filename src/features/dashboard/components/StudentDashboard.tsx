import { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  ArrowRight,
  Calendar,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  FileText,
  GraduationCap,
  Loader2,
} from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useAuth } from '@/features/authentication/hooks/use-auth'
import { useStudentDashboard } from '../hooks/use-dashboard'
import { format } from 'date-fns'

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

export function StudentDashboard() {
  const { user } = useAuth()
  const { data: dashboard, isLoading, isError } = useStudentDashboard()
  const today = useMemo(() => new Date(), [])

  if (!user) return null

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
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome back, {user.firstName}
        </h1>
        <p className="text-muted-foreground">
          {dashboard.currentSemester
            ? `${dashboard.student.programme ?? ''} · ${dashboard.currentSemester.name} ${dashboard.currentSemester.session}`
            : "Here's what's happening with your academic journey today."}
        </p>
      </motion.div>

      <motion.div variants={item} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Level</p>
            <div className="mt-2 flex items-end justify-between">
              <span className="text-3xl font-semibold tracking-tight">{dashboard.student.level ?? '—'}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Matric Number</p>
            <div className="mt-2 flex items-end justify-between">
              <span className="text-lg font-semibold tracking-tight">{dashboard.student.matricNumber ?? '—'}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Programme</p>
            <div className="mt-2 flex items-end justify-between">
              <span className="text-lg font-semibold tracking-tight">{dashboard.student.programme ?? '—'}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Registered Courses</p>
            <div className="mt-2 flex items-end justify-between">
              <span className="text-3xl font-semibold tracking-tight">{dashboard.registration.courseCount}</span>
              {dashboard.registration.isApproved && (
                <span className="flex items-center text-xs font-medium text-success">
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  Approved
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-6 xl:grid-cols-3">
        <motion.div variants={item} className="xl:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Results</CardTitle>
                <CardDescription>Latest academic performance</CardDescription>
              </div>
              {dashboard.recentResults.length > 0 && (
                <Badge variant="secondary">
                  <GraduationCap className="mr-1 h-3 w-3" />
                  {dashboard.recentResults.length} results
                </Badge>
              )}
            </CardHeader>
            <CardContent>
              {dashboard.recentResults.length === 0 ? (
                <p className="text-sm text-muted-foreground">No results published yet.</p>
              ) : (
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={dashboard.recentResults.map((r) => ({ name: r.course.code, score: r.score ?? 0 }))}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="gpaGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          borderColor: 'hsl(var(--border))',
                          borderRadius: 'var(--radius-md)',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="var(--primary)"
                        strokeWidth={2}
                        fill="url(#gpaGradient)"
                        name="Score"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Registration Status</CardTitle>
              <CardDescription>
                {dashboard.registration.isRegistered
                  ? `${dashboard.registration.courseCount} course(s) registered`
                  : 'Not yet registered'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {dashboard.registration.isRegistered ? (
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span>Profile Complete</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <div className={`flex h-6 w-6 items-center justify-center rounded-full ${dashboard.registration.isRegistered ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                      <span className="text-xs">2</span>
                    </div>
                    <span>Course Registration</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm">
                    <div className={`flex h-6 w-6 items-center justify-center rounded-full ${dashboard.registration.isApproved ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                      <span className="text-xs">3</span>
                    </div>
                    <span>Advisor Approval {dashboard.registration.isApproved ? '(Approved)' : '(Pending)'}</span>
                  </li>
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Complete your registration to get started with course registration.
                </p>
              )}
              <Button variant="outline" className="w-full">
                {dashboard.registration.isRegistered ? 'View Courses' : 'Start Registration'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Current Semester</CardTitle>
              <CardDescription>{today ? format(today, 'EEEE, MMMM do') : ''}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {dashboard.currentSemester ? (
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="font-medium">{dashboard.currentSemester.name}</p>
                      <p className="text-xs text-muted-foreground">{dashboard.currentSemester.session}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-info" />
                    <div className="flex-1">
                      <p className="font-medium">Period</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(dashboard.currentSemester.startDate), 'MMM d')} — {format(new Date(dashboard.currentSemester.endDate), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No active semester.</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                {dashboard.unreadNotifications > 0
                  ? `${dashboard.unreadNotifications} unread`
                  : 'All caught up'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {dashboard.notifications.length === 0 ? (
                <p className="text-sm text-muted-foreground">No notifications.</p>
              ) : (
                dashboard.notifications.map((n) => (
                  <div key={n.id} className="flex items-start gap-3">
                    <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${n.isRead ? 'bg-muted' : 'bg-primary'}`} />
                    <div>
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-muted-foreground">{format(new Date(n.createdAt), 'MMM d, h:mm a')}</p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-3">
                <FileText className="h-5 w-5" />
                Course Registration
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <CreditCard className="h-5 w-5" />
                Pay Fees
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <CalendarDays className="h-5 w-5" />
                View Timetable
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <Calendar className="h-5 w-5" />
                Academic Calendar
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
