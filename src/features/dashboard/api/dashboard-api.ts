import { apiClient } from '@/shared/services/api-client'

export interface StudentDashboardData {
  student: {
    id: string
    matricNumber?: string | null
    firstName?: string | null
    lastName?: string | null
    email: string
    programme?: string
    department?: string
    faculty?: string
    level?: string | null
    isProfileComplete: boolean
    isApproved: boolean
  }
  currentSemester: {
    id: string
    name: string
    session: string
    startDate: string
    endDate: string
  } | null
  registration: {
    isRegistered: boolean
    courseCount: number
    isApproved: boolean
  }
  recentResults: Array<{
    id: string
    score?: number | null
    grade?: string | null
    course: { id: string; title: string; code: string; credits: number }
    semester: { id: string; name: string; academicSession?: { name: string } }
  }>
  notifications: Array<{
    id: string
    title: string
    message: string
    isRead: boolean
    createdAt: string
  }>
  unreadNotifications: number
}

export interface AdminDashboardData {
  stats: {
    totalStudents: number
    totalCourses: number
    totalFaculties: number
    totalDepartments: number
    pendingRegistrations: number
    pendingApprovals: number
  }
  currentSemester: { id: string; name: string; session: string } | null
  recentRegistrations: Array<{
    id: string
    status: string
    student: { id: string; matricNumber?: string | null; firstName?: string | null; lastName?: string | null }
    course: { id: string; title: string; code: string }
  }>
}

export async function fetchStudentDashboard() {
  const { data } = await apiClient.get<StudentDashboardData>('/dashboard/student')
  return data
}

export async function fetchAdminDashboard() {
  const { data } = await apiClient.get<AdminDashboardData>('/dashboard/admin')
  return data
}
