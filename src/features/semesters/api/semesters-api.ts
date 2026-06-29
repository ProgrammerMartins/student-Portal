import { apiClient } from '@/shared/services/api-client'

export interface BackendSemester {
  id: string
  name: string
  isActive: boolean
  startDate: string
  endDate: string
  academicSessionId: string
  academicSession?: { id: string; name: string }
}

export async function fetchActiveSemester() {
  const { data } = await apiClient.get<BackendSemester>('/semesters/active')
  return data
}

export async function fetchSemesters() {
  const { data } = await apiClient.get<BackendSemester[]>('/semesters')
  return data
}
