import { Bell, CheckCheck, Loader2 } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { useNotifications, useMarkAsRead, useMarkAllAsRead } from '../hooks/use-notifications'
import { format } from 'date-fns'

export function NotificationsPage() {
  const { data: notifications, isLoading, isError } = useNotifications()
  const markRead = useMarkAsRead()
  const markAllRead = useMarkAllAsRead()

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Loading notifications...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-muted-foreground">
        <Bell className="mb-3 h-10 w-10" />
        <p className="text-lg font-medium">Could not load notifications</p>
        <p className="text-sm">Please try again later.</p>
      </div>
    )
  }

  const unreadCount = notifications?.filter((n) => !n.isRead).length ?? 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Stay updated on university activities.</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={() => markAllRead.mutate()} disabled={markAllRead.isPending}>
            <CheckCheck className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            All Notifications
            {unreadCount > 0 && (
              <Badge variant="default" className="ml-2">{unreadCount} new</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {!notifications || notifications.length === 0 ? (
            <p className="text-sm text-muted-foreground">No notifications.</p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start justify-between gap-4 rounded-lg border border-border p-4 ${
                  notification.isRead ? 'bg-background' : 'bg-muted/40'
                }`}
              >
                <div className="flex-1">
                  <p className={`font-medium ${notification.isRead ? 'text-foreground' : 'text-foreground'}`}>
                    {notification.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {format(new Date(notification.createdAt), 'MMM d, yyyy h:mm a')}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {!notification.isRead && <Badge variant="default">New</Badge>}
                  {!notification.isRead && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => markRead.mutate(notification.id)}
                      disabled={markRead.isPending}
                    >
                      Mark read
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}
