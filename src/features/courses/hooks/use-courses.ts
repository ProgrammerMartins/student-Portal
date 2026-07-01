import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiError } from '@/shared/services/api-client'
import { fetchCourses, fetchCourse, fetchCoursesByDepartment, fetchCoursesByLevel, createCourse, deleteCourse } from '../api/courses-api'
import type { BackendCourse, CreateCoursePayload } from '../api/courses-api'
import type { PaginatedResult } from '@/shared/types'
import { fetchDepartments } from '../api/departments-api'
import type { BackendDepartment } from '../api/departments-api'

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

export function useDepartments() {
  return useQuery<BackendDepartment[]>({
    queryKey: ['departments'],
    queryFn: fetchDepartments,
  })
}

export function useCreateCourse() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateCoursePayload) => createCourse(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
      alert('Course created successfully')
    },
    onError: (error) => {
      const message = error instanceof ApiError ? error.message : 'Failed to create course'
      alert(message)
    }
  })
}

export function useDeleteCourse() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
      alert('Course deleted successfully')
    },
    onError: (error) => {
      const message = error instanceof ApiError ? error.message : 'Failed to delete course'
      alert(message)
    }
  })
}
