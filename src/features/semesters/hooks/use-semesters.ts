import { useQuery } from '@tanstack/react-query'
import { fetchActiveSemester } from '../api/semesters-api'
import type { BackendSemester } from '../api/semesters-api'

export function useActiveSemester() {
  return useQuery<BackendSemester>({
    queryKey: ['active-semester'],
    queryFn: fetchActiveSemester,
    retry: false,
  })
}
