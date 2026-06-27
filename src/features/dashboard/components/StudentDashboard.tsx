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
  Clock,
  CreditCard,
  FileText,
  GraduationCap,
  MapPin,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Progress } from '@/shared/ui/progress'
import { Badge } from '@/shared/ui/badge'
import { useAuth } from '@/features/authentication/hooks/use-auth'
import {
  activityTimeline,
  announcements,
  gpaHistory,
  registrationProgress,
  studentStats,
  timetablePreview,
  upcomingAssessments,
} from '../data/demo-data'
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
  const today = useMemo(() => new Date(), [])

  if (!user) return null

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item}>
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome back, {user.firstName}
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your academic journey today.
        </p>
      </motion.div>

      <motion.div variants={item} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {studentStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <div className="mt-2 flex items-end justify-between">
                <span className="text-3xl font-semibold tracking-tight">{stat.value}</span>
                <span
                  className={`flex items-center text-xs font-medium ${
                    stat.trend === 'up'
                      ? 'text-success'
                      : stat.trend === 'down'
                        ? 'text-destructive'
                        : 'text-muted-foreground'
                  }`}
                >
                  {stat.trend === 'up' ? (
                    <TrendingUp className="mr-1 h-3 w-3" />
                  ) : stat.trend === 'down' ? (
                    <TrendingDown className="mr-1 h-3 w-3" />
                  ) : null}
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid gap-6 xl:grid-cols-3">
        <motion.div variants={item} className="xl:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>GPA / CGPA Trend</CardTitle>
                <CardDescription>Academic performance over the last 5 semesters</CardDescription>
              </div>
              <Badge variant="secondary">
                <GraduationCap className="mr-1 h-3 w-3" />
                CGPA 3.64
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={gpaHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gpaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="semester" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 4]} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        borderColor: 'hsl(var(--border))',
                        borderRadius: 'var(--radius-md)',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="gpa"
                      stroke="var(--primary)"
                      strokeWidth={2}
                      fill="url(#gpaGradient)"
                      name="GPA"
                    />
                    <Area
                      type="monotone"
                      dataKey="cgpa"
                      stroke="var(--info)"
                      strokeWidth={2}
                      fill="transparent"
                      name="CGPA"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Registration Progress</CardTitle>
              <CardDescription>
                {registrationProgress.completed} of {registrationProgress.total} steps completed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <Progress value={(registrationProgress.completed / registrationProgress.total) * 100} />
              <ul className="space-y-3">
                {registrationProgress.steps.map((step, index) => {
                  const completed = index < registrationProgress.completed
                  return (
                    <li key={step} className="flex items-center gap-3 text-sm">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full ${
                          completed ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {completed ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-xs">{index + 1}</span>}
                      </div>
                      <span className={completed ? 'text-foreground' : 'text-muted-foreground'}>{step}</span>
                    </li>
                  )
                })}
              </ul>
              <Button variant="outline" className="w-full">
                Continue Registration
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
              <CardTitle>Today's Timetable</CardTitle>
              <CardDescription>{format(today, 'EEEE, MMMM do')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {timetablePreview.map((entry) => (
                <div key={entry.id} className="flex items-start gap-3">
                  <div className={`mt-1 h-2 w-2 rounded-full ${entry.color}`} />
                  <div className="flex-1">
                    <p className="font-medium">{entry.course}</p>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {entry.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {entry.venue}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Upcoming Assessments</CardTitle>
              <CardDescription>Next 14 days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAssessments.map((assessment) => (
                <div key={assessment.id} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{assessment.title}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {assessment.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{assessment.type}</Badge>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {format(new Date(assessment.date), 'MMM d')}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Announcements</CardTitle>
              <CardDescription>Latest university updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="group cursor-pointer">
                  <div className="flex items-center justify-between">
                    <p className="font-medium group-hover:text-primary">{announcement.title}</p>
                    <Badge variant="secondary" className="text-xs">
                      {announcement.category}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {format(new Date(announcement.date), 'MMM d, yyyy')}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <motion.div variants={item} className="xl:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="h-auto flex-col gap-2 py-4">
                <FileText className="h-5 w-5" />
                <span className="text-xs">Course Registration</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 py-4">
                <CreditCard className="h-5 w-5" />
                <span className="text-xs">Pay Fees</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 py-4">
                <CalendarDays className="h-5 w-5" />
                <span className="text-xs">View Timetable</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 py-4">
                <Calendar className="h-5 w-5" />
                <span className="text-xs">Academic Calendar</span>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activityTimeline.map((event) => (
                <div key={event.id} className="flex gap-3">
                  <div
                    className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                      event.status === 'completed' ? 'bg-success' : 'bg-warning'
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(event.timestamp), 'MMM d, h:mm a')}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
