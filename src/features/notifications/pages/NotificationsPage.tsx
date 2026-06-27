import { Bell } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'

const NOTIFICATIONS = [
  { id: '1', title: 'Course registration deadline extended', time: '2 hours ago', read: false },
  { id: '2', title: 'Fee payment reminder', time: '1 day ago', read: false },
  { id: '3', title: 'CSC 301 assignment graded', time: '2 days ago', read: true },
  { id: '4', title: 'Welcome to the new semester', time: '1 week ago', read: true },
]

export function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">Stay updated on university activities.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            All Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {NOTIFICATIONS.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start justify-between gap-4 rounded-lg border border-border p-4 ${
                notification.read ? 'bg-background' : 'bg-muted/40'
              }`}
            >
              <div>
                <p className={`font-medium ${notification.read ? 'text-foreground' : 'text-foreground'}`}>
                  {notification.title}
                </p>
                <p className="text-xs text-muted-foreground">{notification.time}</p>
              </div>
              {!notification.read && <Badge variant="default">New</Badge>}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
