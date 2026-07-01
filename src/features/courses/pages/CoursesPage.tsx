import { useMemo, useState } from 'react'
import { BookOpen, Plus, Search, Trash2, Download } from 'lucide-react'
import { Input } from '@/shared/ui/input'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { useCourses, useDeleteCourse } from '../hooks/use-courses'
import { CreateCourseDialog } from '../components/CreateCourseDialog'
import { useAuthStore } from '@/features/authentication/stores/auth-store'
import { downloadCsv } from '@/shared/utils/export'

export function CoursesPage() {
  const [query, setQuery] = useState('')
  const { data: coursesData, isLoading, isError } = useCourses()
  const deleteCourse = useDeleteCourse()
  const courses = coursesData?.data ?? []
  const userRole = useAuthStore((state) => state.user?.role)
  const canCreate = userRole === 'super_admin' || userRole === 'admin'

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return courses.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q),
    )
  }, [query, courses])

  const handleExport = () => {
    const exportData = filtered.map(c => ({
      Code: c.code,
      Title: c.title,
      Credits: c.credits,
      Level: c.level ?? 'N/A',
      Department: c.department?.name ?? 'N/A',
      'Department Code': c.department?.code ?? 'N/A'
    }))
    downloadCsv(exportData, 'courses_export')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">My Courses</h1>
        <p className="text-muted-foreground">View registered and available courses.</p>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Course List
          </CardTitle>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            {canCreate && <CreateCourseDialog />}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search courses..."
                className="pl-9"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-48 items-center justify-center text-muted-foreground">
              Loading courses...
            </div>
          ) : isError ? (
            <div className="flex h-48 items-center justify-center text-destructive">
              Failed to load courses.
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Department</TableHead>
                    {canCreate && <TableHead className="w-[80px] text-right">Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.code}</TableCell>
                      <TableCell>{course.title}</TableCell>
                      <TableCell>{course.credits}</TableCell>
                      <TableCell>{course.level ?? '-'}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{course.department?.code ?? '-'}</Badge>
                      </TableCell>
                      {canCreate && (
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this course?')) {
                                deleteCourse.mutate(course.id)
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={canCreate ? 6 : 5} className="h-24 text-center text-muted-foreground">
                        No courses found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
