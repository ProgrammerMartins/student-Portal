import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/auth-api'
import { useAuthStore } from '../stores/auth-store'

export function useLogin() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken, data.refreshToken)

      if (data.user.role === 'student' && !data.user.profileComplete) {
        navigate('/register', { replace: true })
      } else {
        navigate('/dashboard', { replace: true })
      }
    },
  })
}
