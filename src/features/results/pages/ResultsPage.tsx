import { Loader2, GraduationCap, Download } from 'lucide-react'
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
import { Button } from '@/shared/ui/button'
import { useResults } from '../hooks/use-results'
import { downloadCsv } from '@/shared/utils/export'

export function ResultsPage() {
  const { data: resultsData, isLoading, isError } = useResults()
  const results = resultsData?.data ?? []

  const handleExport = () => {
    const exportData = results.map(r => ({
      Course: r.course?.code ?? 'N/A',
      Title: r.course?.title ?? 'N/A',
      Units: r.course?.credits ?? 0,
      Semester: r.semester?.name ?? 'N/A',
      Score: r.score ?? 'N/A',
      Grade: r.grade ?? 'N/A'
    }))
    downloadCsv(exportData, 'results_export')
  }

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Loading results...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-muted-foreground">
        <GraduationCap className="mb-3 h-10 w-10" />
        <p className="text-lg font-medium">Could not load results</p>
        <p className="text-sm">No results published yet.</p>
      </div>
    )
  }

  const totalUnits = results.reduce((sum, r) => sum + (r.course?.credits ?? 0), 0)
  const scores = results.filter((r) => r.score != null).map((r) => r.score!)
  const highestScore = scores.length > 0 ? Math.max(...scores) : null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Academic Results</h1>
        <p className="text-muted-foreground">Semester grades and cumulative performance.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total Courses</p>
            <p className="mt-2 text-3xl font-semibold">{results.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Units Taken</p>
            <p className="mt-2 text-3xl font-semibold">{totalUnits}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Highest Score</p>
            <p className="mt-2 text-3xl font-semibold">
              {highestScore != null ? `${highestScore}%` : '—'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Semesters</p>
            <p className="mt-2 text-3xl font-semibold">
              {new Set(results.map((r) => r.semester?.name)).size}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            Result Slip
          </CardTitle>
          {results.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {!results || results.length === 0 ? (
            <p className="text-sm text-muted-foreground">No results available yet.</p>
          ) : (
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
                      <TableCell className="font-medium">{result.course?.code ?? '—'}</TableCell>
                      <TableCell>{result.course?.title ?? '—'}</TableCell>
                      <TableCell>{result.course?.credits ?? 0}</TableCell>
                      <TableCell>{result.semester?.name ?? '—'}</TableCell>
                      <TableCell>{result.score != null ? `${result.score}%` : '—'}</TableCell>
                      <TableCell>
                        {result.grade ? (
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
                        ) : '—'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
