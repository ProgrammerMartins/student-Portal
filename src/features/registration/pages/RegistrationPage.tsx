import { useState } from 'react'
import { CheckCircle2, ScrollText } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { Checkbox } from '@/shared/ui/checkbox'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/dialog'

const DEPARTMENTS = ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Medicine', 'Business Administration']
const LEVELS = ['100', '200', '300', '400', '500', '600', '700', '800']

export function RegistrationPage() {
  const [open, setOpen] = useState(false)
  const [accepted, setAccepted] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setOpen(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Course Registration</h1>
        <p className="text-muted-foreground">Register your courses for the current semester.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ScrollText className="h-5 w-5 text-primary" />
            Student Information
          </CardTitle>
          <CardDescription>Ensure your details are accurate before submitting.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="matric">Matriculation Number</Label>
                <Input id="matric" placeholder="e.g. U2020/STD/001" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="you@university.edu" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select required>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Select required>
                  <SelectTrigger id="level">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {LEVELS.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level} Level
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Residential Address</Label>
              <Input id="address" placeholder="Enter your address" required />
            </div>

            <div className="flex items-start gap-2">
              <Checkbox id="terms" checked={accepted} onCheckedChange={(checked) => setAccepted(checked === true)} required />
              <Label htmlFor="terms" className="text-sm font-normal leading-tight">
                I confirm that the information provided is accurate and I accept the terms and conditions.
              </Label>
            </div>

            <Button type="submit" disabled={!accepted}>
              Submit Registration
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              Registration Submitted
            </DialogTitle>
            <DialogDescription>
              Your course registration has been received and is pending advisor approval.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => setOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
