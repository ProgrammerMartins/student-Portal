import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { StudentProfile } from '@/features/students/types/profile'

interface RegistrationDraftStore {
  draft: StudentProfile
  updateDraft: (updates: Partial<StudentProfile>) => void
  resetDraft: () => void
}

const initialDraft: StudentProfile = {
  personal: {
    passportUrl: '',
    fullName: '',
    gender: '',
    dateOfBirth: '',
    nationality: '',
    stateOfOrigin: '',
    localGovernment: '',
    residentialAddress: '',
    email: '',
    phone: '',
  },
  parentGuardian: {
    fullName: '',
    relationship: '',
    phone: '',
    email: '',
    address: '',
  },
  emergency: {
    fullName: '',
    relationship: '',
    phone: '',
    address: '',
  },
  academic: {
    programme: '',
    faculty: '',
    department: '',
    level: '',
  },
}

export const useRegistrationDraftStore = create<RegistrationDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      updateDraft: (updates) =>
        set((state) => ({
          draft: {
            personal: { ...state.draft.personal, ...(updates.personal ?? {}) },
            parentGuardian: { ...state.draft.parentGuardian, ...(updates.parentGuardian ?? {}) },
            emergency: { ...state.draft.emergency, ...(updates.emergency ?? {}) },
            academic: { ...state.draft.academic, ...(updates.academic ?? {}) },
          },
        })),
      resetDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'portal-registration-draft',
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
)
