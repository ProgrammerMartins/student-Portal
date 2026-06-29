import { apiClient } from '@/shared/services/api-client'
import type { PaginatedResult } from '@/shared/types'

export interface BackendCourse {
  id: string
  title: string
  code: string
  credits: number
  departmentId: string
  level?: string | null
  department?: { id: string; name: string; code: string }
}

export async function fetchCourses() {
  const { data } = await apiClient.get<PaginatedResult<BackendCourse>>('/courses')
  return data
}

export async function fetchCourse(id: string) {
  const { data } = await apiClient.get<BackendCourse>(`/courses/${id}`)
  return data
}

export async function fetchCoursesByDepartment(departmentId: string) {
  const { data } = await apiClient.get<BackendCourse[]>(`/courses/department/${departmentId}`)
  return data
}

export async function fetchCoursesByLevel(level: string) {
  const { data } = await apiClient.get<BackendCourse[]>(`/courses/level/${level}`)
  return data
}
