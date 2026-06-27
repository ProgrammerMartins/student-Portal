export interface PersonalInfo {
  passportUrl?: string
  fullName: string
  gender: 'male' | 'female' | 'other' | ''
  dateOfBirth: string
  nationality: string
  stateOfOrigin: string
  localGovernment: string
  residentialAddress: string
  email: string
  phone: string
}

export interface ParentGuardian {
  fullName: string
  relationship: string
  phone: string
  email: string
  address: string
}

export interface EmergencyContact {
  fullName: string
  relationship: string
  phone: string
  address: string
}

export interface AcademicInfo {
  programme: string
  faculty: string
  department: string
  level: string
}

export interface StudentProfile {
  personal: PersonalInfo
  parentGuardian: ParentGuardian
  emergency: EmergencyContact
  academic: AcademicInfo
}
