import { apiClient } from '@/shared/services/api-client'
import type { PaginatedResult } from '@/shared/types'

export interface BackendResult {
  id: string
  studentId: string
  courseId: string
  score?: number | null
  grade?: string | null
  semesterId: string
  course?: { id: string; title: string; code: string; credits: number }
  semester?: { id: string; name: string; academicSession?: { name: string } }
}

export async function fetchResults() {
  const { data } = await apiClient.get<PaginatedResult<BackendResult>>('/results')
  return data
}

export interface ResultsBySemesterResponse {
  results: BackendResult[]
  totalCredits: number
}

export async function fetchResultsBySemester(semesterId: string) {
  const { data } = await apiClient.get<ResultsBySemesterResponse>(`/results/semester/${semesterId}`)
  return data
}
