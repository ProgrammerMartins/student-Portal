import { Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const SCHEDULE: Record<string, { course: string; time: string; venue: string }[]> = {
  Monday: [
    { course: 'CSC 301', time: '08:00 - 09:30', venue: 'Lab 3' },
    { course: 'MTH 205', time: '10:00 - 11:30', venue: 'Lecture Hall 2' },
  ],
  Tuesday: [
    { course: 'PHY 201', time: '12:00 - 13:30', venue: 'Science Block' },
  ],
  Wednesday: [
    { course: 'ENG 102', time: '14:00 - 15:30', venue: 'Room 204' },
  ],
  Thursday: [
    { course: 'CSC 303', time: '08:00 - 09:30', venue: 'Lab 2' },
  ],
  Friday: [
    { course: 'CSC 301', time: '10:00 - 11:30', venue: 'Lab 3' },
  ],
}

export function TimetablePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Timetable</h1>
        <p className="text-muted-foreground">Weekly class schedule.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {DAYS.map((day) => (
          <Card key={day}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="h-4 w-4 text-primary" />
                {day}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {SCHEDULE[day]?.length ? (
                SCHEDULE[day].map((entry, index) => (
                  <div key={index} className="rounded-lg border border-border p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{entry.course}</span>
                      <Badge variant="outline" className="text-xs">
                        {entry.time}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{entry.venue}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No classes scheduled.</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
