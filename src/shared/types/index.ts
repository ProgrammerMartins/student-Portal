export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'student' | 'admin'
  avatarUrl?: string
  profileComplete: boolean
}

export interface ApiError {
  message: string
  statusCode: number
}
