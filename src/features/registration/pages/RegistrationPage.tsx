import { useState } from 'react'
import { CheckCircle2, Loader2, ScrollText, X } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Checkbox } from '@/shared/ui/checkbox'
import { Label } from '@/shared/ui/label'
import { Badge } from '@/shared/ui/badge'
import { useStudentProfile } from '@/features/students/hooks/use-student-profile'
import { useRegisteredCourses, useRegisterCourses, useWithdrawCourse } from '@/features/registrations/hooks/use-registrations'
import { useCourses } from '@/features/courses/hooks/use-courses'
import { useActiveSemester } from '@/features/semesters/hooks/use-semesters'

export function RegistrationPage() {
  const { data: profile } = useStudentProfile()
  const { data: activeSemester, isLoading: semLoading } = useActiveSemester()
  const semesterId = activeSemester?.id ?? ''
  const { data: regData, isLoading: regLoading } = useRegisteredCourses(semesterId)
  const registerCourses = useRegisterCourses(semesterId)
  const withdrawCourse = useWithdrawCourse(semesterId)
  const { data: coursesData, isLoading: coursesLoading } = useCourses()

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [showSuccess, setShowSuccess] = useState(false)

  const registeredCourseIds = new Set(regData?.registrations?.map((r: { courseId: string }) => r.courseId) ?? [])
  const registeredCourses = regData?.registrations ?? []
  const allCourses = coursesData?.data ?? []
  const availableCourses = allCourses.filter(
    (c) =>
      !registeredCourseIds.has(c.id) &&
      (!profile?.level || c.level === profile.level) &&
      (!profile?.departmentId || c.departmentId === profile.departmentId),
  )

  const toggleCourse = (courseId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(courseId)) {
        next.delete(courseId)
      } else {
        next.add(courseId)
      }
      return next
    })
  }

  const handleRegister = async () => {
    if (selectedIds.size === 0) return
    try {
      await registerCourses.mutateAsync(Array.from(selectedIds))
      setSelectedIds(new Set())
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch {
      alert('Registration failed. Please try again.')
    }
  }

  const handleWithdraw = async (registrationId: string) => {
    if (!confirm('Are you sure you want to withdraw from this course?')) return
    try {
      await withdrawCourse.mutateAsync(registrationId)
    } catch {
      alert('Withdrawal failed.')
    }
  }

  if (semLoading || regLoading || coursesLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Loading registration data...
      </div>
    )
  }

  if (!activeSemester) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-muted-foreground">
        <ScrollText className="mb-3 h-10 w-10" />
        <p className="text-lg font-medium">No Active Semester</p>
        <p className="text-sm">Course registration is not open yet. Please wait for the administrator to activate a semester.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Course Registration</h1>
        <p className="text-muted-foreground">
          {activeSemester.name} · Register for courses in the current semester.
        </p>
      </div>

      {showSuccess && (
        <div className="flex items-center gap-2 rounded-lg bg-success/10 p-4 text-success">
          <CheckCircle2 className="h-5 w-5" />
          <span className="font-medium">Courses registered successfully!</span>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ScrollText className="h-5 w-5 text-primary" />
              Registered Courses
            </CardTitle>
            <CardDescription>
              {regData
                ? `${regData.totalCourses} course(s) · ${regData.totalCredits} total credits`
                : 'No courses registered yet'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {registeredCourses.length === 0 ? (
              <p className="text-sm text-muted-foreground">You have not registered for any courses this semester.</p>
            ) : (
              <div className="space-y-2">
                {registeredCourses.map((reg: { id: string; courseId: string; status: string; course?: { id: string; code: string; title: string; credits: number } }) => (
                  <div
                    key={reg.id}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border p-3"
                  >
                    <div>
                      <p className="font-medium">{reg.course?.code ?? '—'} — {reg.course?.title ?? '—'}</p>
                      <p className="text-xs text-muted-foreground">{reg.course?.credits ?? 0} credits</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          reg.status === 'APPROVED'
                            ? 'default'
                            : reg.status === 'REJECTED'
                              ? 'destructive'
                              : 'secondary'
                        }
                      >
                        {reg.status}
                      </Badge>
                      {reg.status === 'PENDING' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleWithdraw(reg.id)}
                          disabled={withdrawCourse.isPending}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ScrollText className="h-5 w-5 text-primary" />
              Available Courses
            </CardTitle>
            <CardDescription>
              Select courses to register. Showing {availableCourses.length} course(s) for your level/department.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {availableCourses.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No available courses to register. You may have already registered for all available courses.
              </p>
            ) : (
              <div className="space-y-2">
                {availableCourses.map((course: { id: string; code: string; title: string; credits: number }) => (
                  <div
                    key={course.id}
                    className="flex items-start gap-3 rounded-lg border border-border p-3"
                  >
                    <Checkbox
                      id={course.id}
                      checked={selectedIds.has(course.id)}
                      onCheckedChange={() => toggleCourse(course.id)}
                    />
                    <Label htmlFor={course.id} className="flex-1 cursor-pointer">
                      <p className="font-medium">{course.code} — {course.title}</p>
                      <p className="text-xs text-muted-foreground">{course.credits} credits</p>
                    </Label>
                  </div>
                ))}
              </div>
            )}

            {availableCourses.length > 0 && (
              <Button
                className="w-full"
                onClick={handleRegister}
                disabled={selectedIds.size === 0 || registerCourses.isPending}
              >
                {registerCourses.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  `Register Selected (${selectedIds.size})`
                )}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
