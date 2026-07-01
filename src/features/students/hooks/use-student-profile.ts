import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchStudentProfile, createStudentProfile, updateStudentProfile } from '../api/students-api'
import type { BackendStudentProfile } from '../api/students-api'

export function useStudentProfile() {
  return useQuery<BackendStudentProfile>({
    queryKey: ['student-profile'],
    queryFn: fetchStudentProfile,
    retry: false,
    staleTime: 5 * 60 * 1000,
  })
}

export function useCreateStudentProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Record<string, unknown>) => createStudentProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student-profile'] })
    },
  })
}

export function useUpdateStudentProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Record<string, unknown>) => updateStudentProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student-profile'] })
    },
  })
}
