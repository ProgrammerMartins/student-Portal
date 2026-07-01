import axios from 'axios'
import type { AxiosResponse } from 'axios'

export const API_TOKEN_KEY = 'access_token'

export interface ApiResponse<T> {
  success: boolean
  data: T
  timestamp?: string
}

export interface BackendErrorResponse {
  success: false
  statusCode: number
  message: string | string[]
  error?: string
  timestamp: string
  path: string
}

export class ApiError extends Error {
  public statusCode: number
  public errorType: string | undefined
  public timestamp: string | undefined
  public path: string | undefined

  constructor(backendError: BackendErrorResponse) {
    const message = Array.isArray(backendError.message)
      ? backendError.message.join('; ')
      : backendError.message
    super(message)
    this.name = 'ApiError'
    this.statusCode = backendError.statusCode
    this.errorType = backendError.error
    this.timestamp = backendError.timestamp
    this.path = backendError.path
  }
}

const rawClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

rawClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(API_TOKEN_KEY)
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

rawClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<unknown>>) => {
    if (response.data?.success) {
      ;(response as AxiosResponse<unknown>).data = response.data.data
    }
    return response as AxiosResponse<unknown>
  },
  async (error) => {
    if (error.response?.data) {
      const body = error.response.data as BackendErrorResponse
      if (body.statusCode) {
        const apiError = new ApiError(body)

        if (apiError.statusCode === 401 && window.location.pathname !== '/login') {
          import('@/features/authentication/stores/auth-store').then(({ useAuthStore }) => {
            useAuthStore.getState().clearAuth()
            localStorage.removeItem(API_TOKEN_KEY)
            window.location.href = '/login'
          })
        }

        return Promise.reject(apiError)
      }
    }

    return Promise.reject(error)
  },
)

export const apiClient = rawClient
