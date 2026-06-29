import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchPayments, makePayment } from '../api/payments-api'
import type { BackendPayment } from '../api/payments-api'
import type { PaginatedResult } from '@/shared/types'

export function usePayments() {
  return useQuery<PaginatedResult<BackendPayment>>({
    queryKey: ['payments'],
    queryFn: fetchPayments,
    retry: false,
  })
}

export function useMakePayment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (amount: number) => makePayment(amount),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] })
    },
  })
}
