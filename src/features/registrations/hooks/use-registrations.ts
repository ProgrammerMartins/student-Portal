import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { registerCourses, fetchRegisteredCourses, withdrawCourse } from '../api/registrations-api'
import type { RegisteredCoursesResponse } from '../api/registrations-api'

export function useRegisteredCourses(semesterId: string) {
  return useQuery<RegisteredCoursesResponse>({
    queryKey: ['registrations', semesterId],
    queryFn: () => fetchRegisteredCourses(semesterId),
    enabled: !!semesterId,
  })
}

export function useRegisterCourses(semesterId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (courseIds: string[]) => registerCourses(semesterId, courseIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registrations', semesterId] })
    },
  })
}

export function useWithdrawCourse(semesterId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (registrationId: string) => withdrawCourse(registrationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registrations', semesterId] })
    },
  })
}
