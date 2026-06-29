import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { login, getProfile } from '../api/auth-api'
import { useAuthStore } from '../stores/auth-store'

export function useLogin() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await login(credentials)
      let profileComplete = true

      if (response.user.role === 'STUDENT') {
        try {
          const profile = await getProfile()
          profileComplete = (profile as { student?: { isProfileComplete: boolean } })?.student?.isProfileComplete ?? false
        } catch {
          profileComplete = false
        }
      }

      return {
        ...response,
        user: { ...response.user, profileComplete },
      }
    },
    onSuccess: (data) => {
      setAuth(
        {
          id: data.user.id,
          email: data.user.email,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          role: data.user.role,
          profileComplete: data.user.profileComplete ?? false,
        },
        data.accessToken,
        data.refreshToken,
      )

      const isStudent = data.user.role === 'STUDENT'
      if (isStudent && !data.user.profileComplete) {
        navigate('/register', { replace: true })
      } else {
        navigate('/dashboard', { replace: true })
      }
    },
  })
}
