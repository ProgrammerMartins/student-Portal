import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { StudentProfile } from '../types/profile'

interface ProfileStore {
  profile: StudentProfile | null
  setProfile: (profile: StudentProfile) => void
  updateProfile: (updates: Partial<StudentProfile>) => void
  clearProfile: () => void
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      updateProfile: (updates) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : null,
        })),
      clearProfile: () => set({ profile: null }),
    }),
    {
      name: 'portal-profile',
      partialize: (state) => ({ profile: state.profile }),
    },
  ),
)
