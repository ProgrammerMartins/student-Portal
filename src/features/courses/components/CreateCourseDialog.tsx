import { useState } from 'react'
import { Plus, Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { useDepartments, useCreateCourse } from '../hooks/use-courses'
import { ApiError } from '@/shared/services/api-client'

export function CreateCourseDialog() {
  const [open, setOpen] = useState(false)
  const { data: departments, isLoading: deptsLoading } = useDepartments()
  const createCourse = useCreateCourse()

  const [title, setTitle] = useState('')
  const [code, setCode] = useState('')
  const [credits, setCredits] = useState('')
  const [departmentId, setDepartmentId] = useState('')
  const [level, setLevel] = useState('')
  const [description, setDescription] = useState('')

  const resetForm = () => {
    setTitle('')
    setCode('')
    setCredits('')
    setDepartmentId('')
    setLevel('')
    setDescription('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createCourse.mutateAsync({
        title,
        code,
        credits: Number(credits),
        departmentId,
        level: level || undefined,
        description: description || undefined,
      })
      resetForm()
      setOpen(false)
    } catch {
      // error handled by api-client interceptor
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Course</DialogTitle>
            <DialogDescription>
              Add a new course to the system.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Introduction to Programming"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="code">Course Code</Label>
                <Input
                  id="code"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="CSC101"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="credits">Credits</Label>
                <Input
                  id="credits"
                  type="number"
                  min={1}
                  required
                  value={credits}
                  onChange={(e) => setCredits(e.target.value)}
                  placeholder="3"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="department">Department</Label>
              <Select value={departmentId} onValueChange={setDepartmentId} required>
                <SelectTrigger>
                  <SelectValue placeholder={deptsLoading ? 'Loading...' : 'Select department'} />
                </SelectTrigger>
                <SelectContent>
                  {departments?.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="level">Level</Label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">100 Level</SelectItem>
                  <SelectItem value="200">200 Level</SelectItem>
                  <SelectItem value="300">300 Level</SelectItem>
                  <SelectItem value="400">400 Level</SelectItem>
                  <SelectItem value="500">500 Level</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Course description"
              />
            </div>

            {createCourse.isError && (
              <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {createCourse.error instanceof ApiError
                  ? `(${createCourse.error.statusCode}) ${createCourse.error.message}`
                  : createCourse.error instanceof Error
                    ? createCourse.error.message
                    : 'Failed to create course'}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createCourse.isPending}>
              {createCourse.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Course'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
