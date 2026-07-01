import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { signup } from '../api/auth-api'
import { useAuthStore } from '../stores/auth-store'

export function useRegister() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutation({
    mutationFn: (credentials: { email: string; password: string; firstName: string; lastName: string }) =>
      signup(credentials),
    onSuccess: (data) => {
      setAuth(
        {
          id: data.user.id,
          email: data.user.email,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          role: data.user.role.toLowerCase(),
          profileComplete: data.user.profileComplete ?? false,
        },
        data.accessToken,
        data.refreshToken,
      )
      navigate('/register', { replace: true })
    },
  })
}
