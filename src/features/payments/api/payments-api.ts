import { apiClient } from '@/shared/services/api-client'
import type { PaginatedResult } from '@/shared/types'

export interface BackendPayment {
  id: string
  studentId: string
  amount: number
  reference: string
  status: string
  createdAt: string
}

export async function fetchPayments() {
  const { data } = await apiClient.get<PaginatedResult<BackendPayment>>('/payments')
  return data
}

export async function makePayment(amount: number) {
  const { data } = await apiClient.post('/payments', { amount })
  return data
}

export async function verifyPayment(reference: string) {
  const { data } = await apiClient.post(`/payments/verify`, { reference })
  return data
}
