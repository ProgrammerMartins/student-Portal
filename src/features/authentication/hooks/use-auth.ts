import { useAuthStore } from '../stores/auth-store'

export function useAuth() {
  const { user, isAuthenticated, accessToken } = useAuthStore()

  return {
    user,
    isAuthenticated,
    accessToken,
    isLoading: false,
  }
}
