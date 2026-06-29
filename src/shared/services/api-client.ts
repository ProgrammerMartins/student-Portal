import axios from 'axios'
import type { AxiosResponse } from 'axios'

export const API_TOKEN_KEY = 'access_token'

export interface ApiResponse<T> {
  success: boolean
  data: T
  timestamp?: string
}

const rawClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api/vv1',
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
    const status = error.response?.status

    if (status === 401) {
      localStorage.removeItem(API_TOKEN_KEY)
      window.location.href = '/login'
      return Promise.reject(error)
    }

    if (status >= 500) {
      // TODO: surface generic server error toast.
    }

    return Promise.reject(error)
  },
)

export const apiClient = rawClient
