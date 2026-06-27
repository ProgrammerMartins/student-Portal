import { Users } from 'lucide-react'
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

const STUDENTS = [
  { id: '1', matric: 'U2020/STD/001', name: 'Alex Johnson', department: 'Computer Science', level: '300', status: 'Active' },
  { id: '2', matric: 'U2020/STD/002', name: 'Blessing Okafor', department: 'Medicine', level: '400', status: 'Active' },
  { id: '3', matric: 'U2020/STD/003', name: 'Chinedu Musa', department: 'Electrical Engineering', level: '300', status: 'Probation' },
  { id: '4', matric: 'U2020/STD/004', name: 'Diana Eze', department: 'Business Administration', level: '200', status: 'Active' },
]

export function StudentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Students</h1>
        <p className="text-muted-foreground">View and manage student records.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Student Directory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Matric No.</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {STUDENTS.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.matric}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>{student.level}</TableCell>
                    <TableCell>
                      <Badge variant={student.status === 'Active' ? 'default' : 'destructive'}>
                        {student.status}
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
