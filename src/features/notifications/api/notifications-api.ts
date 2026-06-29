import { apiClient } from '@/shared/services/api-client'

export interface BackendNotification {
  id: string
  userId: string
  title: string
  message: string
  isRead: boolean
  createdAt: string
}

export async function fetchNotifications() {
  const { data } = await apiClient.get<BackendNotification[]>('/notifications')
  return data
}

export async function markAsRead(notificationId: string) {
  const { data } = await apiClient.put(`/notifications/${notificationId}/read`)
  return data
}

export async function markAllAsRead() {
  const { data } = await apiClient.put('/notifications/read-all')
  return data
}
