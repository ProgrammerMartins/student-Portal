import { apiClient } from '@/shared/services/api-client'

export async function fetchAllStudents() {
  const { data } = await apiClient.get('/students')
  return data
}

export async function fetchAllUsers() {
  const { data } = await apiClient.get('/users')
  return data
}

export async function approveStudent(studentId: string) {
  const { data } = await apiClient.post(`/students/${studentId}/approve`)
  return data
}

export async function rejectStudent(studentId: string) {
  const { data } = await apiClient.post(`/students/${studentId}/reject`)
  return data
}

export async function suspendStudent(userId: string) {
  const { data } = await apiClient.post(`/students/${userId}/suspend`)
  return data
}

export async function reactivateStudent(userId: string) {
  const { data } = await apiClient.post(`/students/${userId}/reactivate`)
  return data
}
