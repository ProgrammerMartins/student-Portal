import { apiClient } from '@/shared/services/api-client'

export interface BackendStudentProfile {
  id: string
  userId: string
  matricNumber?: string | null
  firstName?: string | null
  lastName?: string | null
  gender?: string | null
  dateOfBirth?: string | null
  nationality?: string | null
  stateOfOrigin?: string | null
  localGovernment?: string | null
  residentialAddress?: string | null
  phoneNumber?: string | null
  alternativePhoneNumber?: string | null
  parentName?: string | null
  parentPhoneNumber?: string | null
  parentEmail?: string | null
  parentAddress?: string | null
  emergencyContactName?: string | null
  emergencyContactPhone?: string | null
  emergencyContactRelationship?: string | null
  programmeId?: string | null
  departmentId?: string | null
  facultyId?: string | null
  level?: string | null
  isProfileComplete: boolean
  isApproved: boolean
  programme?: { id: string; name: string; code: string }
  department?: { id: string; name: string; code: string }
  faculty?: { id: string; name: string; code: string }
  user?: { id: string; email: string; isActive: boolean }
}

export async function fetchStudentProfile() {
  const { data } = await apiClient.get<BackendStudentProfile>('/students/profile')
  return data
}

export async function createStudentProfile(profileData: Record<string, unknown>) {
  const { data } = await apiClient.post<BackendStudentProfile>('/students/profile', profileData)
  return data
}

export async function updateStudentProfile(profileData: Record<string, unknown>) {
  const { data } = await apiClient.put<BackendStudentProfile>('/students/profile', profileData)
  return data
}

export async function fetchProfileCompletion() {
  const { data } = await apiClient.get('/students/profile/completion')
  return data
}
