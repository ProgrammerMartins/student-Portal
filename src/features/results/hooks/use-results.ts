import { useQuery } from '@tanstack/react-query'
import { fetchResults, fetchResultsBySemester } from '../api/results-api'
import type { BackendResult, ResultsBySemesterResponse } from '../api/results-api'
import type { PaginatedResult } from '@/shared/types'

export function useResults() {
  return useQuery<PaginatedResult<BackendResult>>({
    queryKey: ['results'],
    queryFn: fetchResults,
    retry: false,
  })
}

export function useResultsBySemester(semesterId: string) {
  return useQuery<ResultsBySemesterResponse>({
    queryKey: ['results', semesterId],
    queryFn: () => fetchResultsBySemester(semesterId),
    enabled: !!semesterId,
    retry: false,
  })
}
