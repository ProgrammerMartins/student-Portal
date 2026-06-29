import { Construction } from 'lucide-react'
import { Card, CardContent } from '@/shared/ui/card'

export function TimetablePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Timetable</h1>
        <p className="text-muted-foreground">Weekly class schedule.</p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Construction className="mb-4 h-12 w-12 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Timetable Not Available</h2>
          <p className="mt-2 text-sm text-muted-foreground text-center max-w-md">
            Your class timetable will appear here once the administrator publishes the schedule for the current semester.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
