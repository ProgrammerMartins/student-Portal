import { API_TOKEN_KEY } from '@/shared/services/api-client'
import type { LoginCredentials, AuthResponse } from '../types/auth'

// Stub implementation — the API call shape is preserved for Phase 10 migration.
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  // TODO: replace with `const { data } = await apiClient.post<AuthResponse>('/auth/login', credentials)`
  await new Promise((resolve) => setTimeout(resolve, 1200))

  let response: AuthResponse

  if (credentials.email === 'admin@university.edu' && credentials.password === 'password') {
    response = {
      user: {
        id: 'admin-1',
        email: credentials.email,
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        profileComplete: true,
      },
      accessToken: 'mock-admin-token',
      refreshToken: 'mock-admin-refresh',
    }
  } else if (credentials.email === 'student@university.edu' && credentials.password === 'password') {
    // For demo purposes: treat the student as already registered if a profile exists in storage.
    const storedProfile = localStorage.getItem('portal-profile')
    const hasProfile = storedProfile ? JSON.parse(storedProfile).profile != null : false
    response = {
      user: {
        id: 'student-1',
        email: credentials.email,
        firstName: 'Alex',
        lastName: 'Johnson',
        role: 'student',
        profileComplete: hasProfile,
      },
      accessToken: 'mock-student-token',
      refreshToken: 'mock-student-refresh',
    }
  } else {
    throw new Error('Invalid email or password. Try student@university.edu / password')
  }

  localStorage.setItem(API_TOKEN_KEY, response.accessToken)
  return response
}

export function logout() {
  localStorage.removeItem(API_TOKEN_KEY)
}
