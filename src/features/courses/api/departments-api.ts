import { apiClient } from '@/shared/services/api-client'

export interface BackendDepartment {
  id: string
  name: string
  code: string
  facultyId: string
  faculty?: { id: string; name: string; code: string }
}

export async function fetchDepartments() {
  const { data } = await apiClient.get<BackendDepartment[]>('/departments')
  return data
}
