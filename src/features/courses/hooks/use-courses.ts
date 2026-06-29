import { useQuery } from '@tanstack/react-query'
import { fetchCourses, fetchCourse, fetchCoursesByDepartment, fetchCoursesByLevel } from '../api/courses-api'
import type { BackendCourse } from '../api/courses-api'
import type { PaginatedResult } from '@/shared/types'

export function useCourses() {
  return useQuery<PaginatedResult<BackendCourse>>({
    queryKey: ['courses'],
    queryFn: fetchCourses,
  })
}

export function useCourse(id: string) {
  return useQuery<BackendCourse>({
    queryKey: ['courses', id],
    queryFn: () => fetchCourse(id),
    enabled: !!id,
  })
}

export function useCoursesByDepartment(departmentId: string) {
  return useQuery<BackendCourse[]>({
    queryKey: ['courses', 'department', departmentId],
    queryFn: () => fetchCoursesByDepartment(departmentId),
    enabled: !!departmentId,
  })
}

export function useCoursesByLevel(level: string) {
  return useQuery<BackendCourse[]>({
    queryKey: ['courses', 'level', level],
    queryFn: () => fetchCoursesByLevel(level),
    enabled: !!level,
  })
}
