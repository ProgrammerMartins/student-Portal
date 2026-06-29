import { useQuery } from '@tanstack/react-query'
import { fetchStudentDashboard, fetchAdminDashboard } from '../api/dashboard-api'
import type { StudentDashboardData, AdminDashboardData } from '../api/dashboard-api'

export function useStudentDashboard() {
  return useQuery<StudentDashboardData>({
    queryKey: ['student-dashboard'],
    queryFn: fetchStudentDashboard,
    retry: false,
  })
}

export function useAdminDashboard() {
  return useQuery<AdminDashboardData>({
    queryKey: ['admin-dashboard'],
    queryFn: fetchAdminDashboard,
    retry: false,
  })
}
