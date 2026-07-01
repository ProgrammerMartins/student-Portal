import { apiClient } from '@/shared/services/api-client'
import type { PaginatedResult } from '@/shared/types'

export interface BackendUser {
  id: string
  email: string
  firstName: string
  lastName: string
  isActive: boolean
  isLocked: boolean
  role: {
    id: string
    name: string
  }
}

export async function fetchUsers(params?: { page?: number; limit?: number; search?: string }) {
  const { data } = await apiClient.get<PaginatedResult<BackendUser>>('/users', { params })
  return data
}

export async function deleteUser(id: string) {
  const { data } = await apiClient.delete<{ message: string }>(`/users/${id}`)
  return data
}

export async function toggleUserStatus(id: string, isActive: boolean) {
  const { data } = await apiClient.put<BackendUser>(`/users/${id}`, { isActive })
  return data
}
