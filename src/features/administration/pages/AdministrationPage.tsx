import { Shield } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'

export function AdministrationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Administration</h1>
        <p className="text-muted-foreground">System administration and configuration.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Admin Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Manage users, roles, academic sessions, and system settings from this central hub.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">Manage Users</Button>
            <Button variant="outline">Academic Sessions</Button>
            <Button variant="outline">System Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
