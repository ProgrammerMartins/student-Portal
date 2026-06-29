import { apiClient, API_TOKEN_KEY } from '@/shared/services/api-client'
import type { LoginCredentials } from '../types/auth'

interface BackendLoginResponse {
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    role: string
  }
  accessToken: string
  refreshToken: string
}

export interface AuthResult {
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    role: string
    profileComplete?: boolean
  }
  accessToken: string
  refreshToken: string
}

export async function login(credentials: LoginCredentials): Promise<AuthResult> {
  const { data } = await apiClient.post<BackendLoginResponse>('/auth/login', credentials)
  const result: AuthResult = {
    user: {
      id: data.user.id,
      email: data.user.email,
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      role: data.user.role,
    },
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  }
  localStorage.setItem(API_TOKEN_KEY, result.accessToken)
  return result
}

export async function logout() {
  try {
    await apiClient.post('/auth/logout')
  } finally {
    localStorage.removeItem(API_TOKEN_KEY)
  }
}

export async function getProfile() {
  const { data } = await apiClient.get('/auth/profile')
  return data
}
