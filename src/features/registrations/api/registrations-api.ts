import { apiClient } from '@/shared/services/api-client'

export interface BackendCourseRegistration {
  id: string
  studentId: string
  courseId: string
  semesterId: string
  status: string
  course?: { id: string; title: string; code: string; credits: number }
  semester?: { id: string; name: string; academicSession?: { name: string } }
}

export interface RegisteredCoursesResponse {
  registrations: BackendCourseRegistration[]
  totalCourses: number
  totalCredits: number
}

export async function registerCourses(semesterId: string, courseIds: string[]) {
  const { data } = await apiClient.post(`/registrations/semester/${semesterId}`, { courseIds })
  return data
}

export async function fetchRegisteredCourses(semesterId: string) {
  const { data } = await apiClient.get<RegisteredCoursesResponse>(`/registrations/semester/${semesterId}`)
  return data
}

export async function withdrawCourse(registrationId: string) {
  const { data } = await apiClient.delete(`/registrations/${registrationId}`)
  return data
}

export async function fetchAllRegistrations() {
  const { data } = await apiClient.get('/registrations/all')
  return data
}
