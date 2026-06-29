import { useMemo, useState } from 'react'
import { BookOpen, Search } from 'lucide-react'
import { Input } from '@/shared/ui/input'
import { Badge } from '@/shared/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { useCourses } from '../hooks/use-courses'

export function CoursesPage() {
  const [query, setQuery] = useState('')
  const { data: coursesData, isLoading, isError } = useCourses()
  const courses = coursesData?.data ?? []

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return courses.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q),
    )
  }, [query, courses])

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
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
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
