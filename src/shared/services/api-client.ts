import axios from 'axios'

export const API_TOKEN_KEY = 'access_token'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(API_TOKEN_KEY)
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status

    if (status === 401) {
      // TODO: implement token refresh + re-login redirect in Phase 10 refinement.
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
