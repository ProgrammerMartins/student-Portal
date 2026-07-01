import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  fetchAllStudents,
  approveStudent,
  rejectStudent,
  suspendStudent,
  reactivateStudent,
} from '../api/students-api'

export function useAllStudents(params?: { page?: number; limit?: number; search?: string }) {
  return useQuery({
    queryKey: ['admin-students', params],
    queryFn: () => fetchAllStudents(params),
  })
}

export function useApproveStudent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => approveStudent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-students'] })
    },
  })
}

export function useRejectStudent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => rejectStudent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-students'] })
    },
  })
}

export function useSuspendStudent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (userId: string) => suspendStudent(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-students'] })
    },
  })
}

export function useReactivateStudent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (userId: string) => reactivateStudent(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-students'] })
    },
  })
}
