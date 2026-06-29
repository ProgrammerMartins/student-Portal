import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchNotifications, markAsRead, markAllAsRead } from '../api/notifications-api'
import type { BackendNotification } from '../api/notifications-api'

export function useNotifications() {
  return useQuery<BackendNotification[]>({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    retry: false,
    refetchInterval: 30000,
  })
}

export function useMarkAsRead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}

export function useMarkAllAsRead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}
