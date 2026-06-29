import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface StoredUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  profileComplete: boolean
}

interface AuthStore {
  user: StoredUser | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  setAuth: (user: StoredUser, accessToken: string, refreshToken: string) => void
  completeProfile: () => void
  updateUser: (updates: Partial<StoredUser>) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      setAuth: (user, accessToken, refreshToken) =>
        set({ user, accessToken, refreshToken, isAuthenticated: true }),
      completeProfile: () =>
        set((state) => ({
          user: state.user ? { ...state.user, profileComplete: true } : null,
        })),
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
      clearAuth: () =>
        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false }),
    }),
    {
      name: 'portal-auth',
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
