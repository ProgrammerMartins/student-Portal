import { GraduationCap } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { results, calculateGPA } from '../data/results'

export function ResultsPage() {
  const gpa = calculateGPA(results.filter((r) => r.semester === '2024/1'))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Academic Results</h1>
        <p className="text-muted-foreground">Semester grades and cumulative performance.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Current GPA</p>
            <p className="mt-2 text-3xl font-semibold">{gpa}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total Courses</p>
            <p className="mt-2 text-3xl font-semibold">{results.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Units Taken</p>
            <p className="mt-2 text-3xl font-semibold">
              {results.reduce((sum, r) => sum + r.units, 0)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Highest Grade</p>
            <p className="mt-2 text-3xl font-semibold">
              {Math.max(...results.map((r) => r.score))}%
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            Result Slip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Units</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium">{result.courseCode}</TableCell>
                    <TableCell>{result.courseTitle}</TableCell>
                    <TableCell>{result.units}</TableCell>
                    <TableCell>{result.semester}</TableCell>
                    <TableCell>{result.score}%</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          result.grade === 'A'
                            ? 'default'
                            : result.grade === 'F'
                              ? 'destructive'
                              : 'secondary'
                        }
                      >
                        {result.grade}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
