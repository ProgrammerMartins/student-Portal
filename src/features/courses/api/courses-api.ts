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

export interface CreateCoursePayload {
  title: string
  code: string
  credits: number
  departmentId: string
  programmeId?: string
  description?: string
  level?: string
}

export async function createCourse(payload: CreateCoursePayload) {
  const { data } = await apiClient.post<BackendCourse>('/courses', payload)
  return data
}

export async function updateCourse(id: string, payload: Partial<CreateCoursePayload>) {
  const { data } = await apiClient.put<BackendCourse>(`/courses/${id}`, payload)
  return data
}

export async function deleteCourse(id: string) {
  const { data } = await apiClient.delete<{ message: string }>(`/courses/${id}`)
  return data
}
