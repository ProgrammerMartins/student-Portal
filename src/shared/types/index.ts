export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'STUDENT' | 'ADMIN' | 'SUPER_ADMIN' | 'LECTURER'
  avatarUrl?: string
  profileComplete: boolean
}

export interface ApiError {
  message: string
  statusCode: number
}

export interface PaginatedMeta {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface PaginatedResult<T> {
  data: T[]
  meta: PaginatedMeta
}
