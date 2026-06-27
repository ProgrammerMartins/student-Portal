import type { StudentProfile } from '@/features/students/types/profile'

export type RegistrationErrors = Partial<Record<string, string>>

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validatePersonal(personal: StudentProfile['personal'], passportFile?: File | null): RegistrationErrors {
  const errors: RegistrationErrors = {}

  if (!personal.fullName.trim()) errors['personal.fullName'] = 'Full name is required'
  if (!personal.gender) errors['personal.gender'] = 'Gender is required'
  if (!personal.dateOfBirth) {
    errors['personal.dateOfBirth'] = 'Date of birth is required'
  } else if (new Date(personal.dateOfBirth) > new Date()) {
    errors['personal.dateOfBirth'] = 'Date of birth cannot be in the future'
  }
  if (!personal.nationality.trim()) errors['personal.nationality'] = 'Nationality is required'
  if (!personal.stateOfOrigin.trim()) errors['personal.stateOfOrigin'] = 'State of origin is required'
  if (!personal.localGovernment.trim()) errors['personal.localGovernment'] = 'Local government is required'
  if (!personal.residentialAddress.trim()) errors['personal.residentialAddress'] = 'Residential address is required'
  if (!personal.email.trim()) {
    errors['personal.email'] = 'Email is required'
  } else if (!EMAIL_REGEX.test(personal.email)) {
    errors['personal.email'] = 'Enter a valid email address'
  }
  if (!personal.phone.trim()) {
    errors['personal.phone'] = 'Phone number is required'
  } else if (!/^\+?[\d\s()-]{10,}$/.test(personal.phone)) {
    errors['personal.phone'] = 'Enter a valid phone number'
  }

  if (passportFile) {
    if (!passportFile.type.startsWith('image/')) {
      errors['personal.passportUrl'] = 'Passport photograph must be an image'
    } else if (passportFile.size > 2 * 1024 * 1024) {
      errors['personal.passportUrl'] = 'Passport photograph must be smaller than 2MB'
    }
  } else if (!personal.passportUrl) {
    errors['personal.passportUrl'] = 'Passport photograph is required'
  }

  return errors
}

export function validateParentGuardian(parent: StudentProfile['parentGuardian']): RegistrationErrors {
  const errors: RegistrationErrors = {}

  if (!parent.fullName.trim()) errors['parentGuardian.fullName'] = 'Parent/Guardian full name is required'
  if (!parent.relationship.trim()) errors['parentGuardian.relationship'] = 'Relationship is required'
  if (!parent.phone.trim()) {
    errors['parentGuardian.phone'] = 'Phone number is required'
  } else if (!/^\+?[\d\s()-]{10,}$/.test(parent.phone)) {
    errors['parentGuardian.phone'] = 'Enter a valid phone number'
  }
  if (parent.email && !EMAIL_REGEX.test(parent.email)) {
    errors['parentGuardian.email'] = 'Enter a valid email address'
  }
  if (!parent.address.trim()) errors['parentGuardian.address'] = 'Residential address is required'

  return errors
}

export function validateEmergency(emergency: StudentProfile['emergency']): RegistrationErrors {
  const errors: RegistrationErrors = {}

  if (!emergency.fullName.trim()) errors['emergency.fullName'] = 'Emergency contact name is required'
  if (!emergency.relationship.trim()) errors['emergency.relationship'] = 'Relationship is required'
  if (!emergency.phone.trim()) {
    errors['emergency.phone'] = 'Phone number is required'
  } else if (!/^\+?[\d\s()-]{10,}$/.test(emergency.phone)) {
    errors['emergency.phone'] = 'Enter a valid phone number'
  }
  if (!emergency.address.trim()) errors['emergency.address'] = 'Residential address is required'

  return errors
}

export function validateAcademic(academic: StudentProfile['academic']): RegistrationErrors {
  const errors: RegistrationErrors = {}

  if (!academic.programme) errors['academic.programme'] = 'Programme is required'
  if (!academic.faculty) errors['academic.faculty'] = 'Faculty is required'
  if (!academic.department) errors['academic.department'] = 'Department is required'
  if (!academic.level) errors['academic.level'] = 'Level is required'

  return errors
}

export function validateAll(profile: StudentProfile): RegistrationErrors {
  return {
    ...validatePersonal(profile.personal),
    ...validateParentGuardian(profile.parentGuardian),
    ...validateEmergency(profile.emergency),
    ...validateAcademic(profile.academic),
  }
}
