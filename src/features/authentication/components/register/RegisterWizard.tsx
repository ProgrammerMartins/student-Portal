import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Loader2,
  Upload,
  User,
  Users,
  Phone,
  BookOpen,
} from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'

import { useAuthStore } from '@/features/authentication/stores/auth-store'
import { useRegistrationDraftStore } from '@/features/authentication/stores/registration-draft-store'
import { useProfileStore } from '@/features/students/stores/profile-store'
import { useCreateStudentProfile } from '@/features/students/hooks/use-student-profile'
import type { StudentProfile } from '@/features/students/types/profile'
import {
  validatePersonal,
  validateParentGuardian,
  validateEmergency,
  validateAcademic,
  type RegistrationErrors,
} from '../../lib/validate-registration'
import { cn } from '@/shared/utilities/cn'

const STEPS = [
  { key: 'personal', label: 'Personal', icon: User },
  { key: 'parent', label: 'Parent/Guardian', icon: Users },
  { key: 'emergency', label: 'Emergency', icon: Phone },
  { key: 'academic', label: 'Academic', icon: BookOpen },
  { key: 'review', label: 'Review', icon: GraduationCap },
]

const FACULTIES = ['Science', 'Engineering', 'Medicine', 'Arts', 'Social Sciences', 'Business']
const DEPARTMENTS: Record<string, string[]> = {
  Science: ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology'],
  Engineering: ['Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Computer Engineering'],
  Medicine: ['Medicine', 'Nursing', 'Pharmacy', 'Public Health'],
  Arts: ['English', 'History', 'Theatre Arts', 'Linguistics'],
  'Social Sciences': ['Economics', 'Political Science', 'Sociology', 'Psychology'],
  Business: ['Business Administration', 'Accounting', 'Finance', 'Marketing'],
}
const PROGRAMMES = ['B.Sc', 'B.Eng', 'B.A', 'MBBS', 'B.Pharm', 'B.Ed']
const LEVELS = ['100', '200', '300', '400', '500', '600']
const GENDERS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
]

export function RegisterWizard() {
  const navigate = useNavigate()
  const completeProfile = useAuthStore((state) => state.completeProfile)
  const updateUser = useAuthStore((state) => state.updateUser)
  const setProfile = useProfileStore((state) => state.setProfile)
  const { draft, updateDraft, resetDraft } = useRegistrationDraftStore()

  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<RegistrationErrors>({})
  const [touched, setTouched] = useState<Set<string>>(new Set())
  const [passportFile, setPassportFile] = useState<File | null>(null)
  const [passportPreview, setPassportPreview] = useState<string>(draft.personal?.passportUrl ?? '')
  const createProfile = useCreateStudentProfile()
  const [showSuccess, setShowSuccess] = useState(false)

  const profile = useMemo<StudentProfile>(
    () => ({
      personal: { ...draft.personal, passportUrl: passportPreview },
      parentGuardian: draft.parentGuardian,
      emergency: draft.emergency,
      academic: draft.academic,
    }),
    [draft, passportPreview],
  )

  const handlePassportChange = (file: File | null) => {
    setTouched((prev) => new Set(prev).add('personal.passportUrl'))
    if (!file) {
      setPassportFile(null)
      setPassportPreview('')
      return
    }
    const validation = validatePersonal(profile.personal, file)
    if (validation['personal.passportUrl']) {
      setErrors((prev) => ({ ...prev, 'personal.passportUrl': validation['personal.passportUrl'] }))
      return
    }
    setPassportFile(file)
    const reader = new FileReader()
    reader.onloadend = () => setPassportPreview(reader.result as string)
    reader.readAsDataURL(file)
    setErrors((prev) => {
      const next = { ...prev }
      delete next['personal.passportUrl']
      return next
    })
  }

  const setField = <K extends keyof StudentProfile>(
    section: K,
    field: keyof StudentProfile[K],
    value: unknown,
  ) => {
    setTouched((prev) => new Set(prev).add(`${String(section)}.${String(field)}`))
    updateDraft({
      [section]: { [field]: value } as never,
    } as Partial<StudentProfile>)
    setErrors((prev) => {
      const next = { ...prev }
      delete next[`${String(section)}.${String(field)}`]
      return next
    })
  }

  const validateStep = (index: number) => {
    let stepErrors: RegistrationErrors = {}
    const touchedKeys: string[] = []
    switch (index) {
      case 0:
        stepErrors = validatePersonal(profile.personal, passportFile)
        touchedKeys.push(
          'personal.passportUrl',
          'personal.fullName',
          'personal.gender',
          'personal.dateOfBirth',
          'personal.nationality',
          'personal.stateOfOrigin',
          'personal.localGovernment',
          'personal.residentialAddress',
          'personal.email',
          'personal.phone',
        )
        break
      case 1:
        stepErrors = validateParentGuardian(profile.parentGuardian)
        touchedKeys.push(
          'parentGuardian.fullName',
          'parentGuardian.relationship',
          'parentGuardian.phone',
          'parentGuardian.email',
          'parentGuardian.address',
        )
        break
      case 2:
        stepErrors = validateEmergency(profile.emergency)
        touchedKeys.push(
          'emergency.fullName',
          'emergency.relationship',
          'emergency.phone',
          'emergency.address',
        )
        break
      case 3:
        stepErrors = validateAcademic(profile.academic)
        touchedKeys.push('academic.programme', 'academic.faculty', 'academic.department', 'academic.level')
        break
    }
    setTouched((prev) => new Set([...prev, ...touchedKeys]))
    setErrors(stepErrors)
    return Object.keys(stepErrors).length === 0
  }

  const handleNext = () => {
    if (!validateStep(step)) return
    setStep((prev) => Math.min(prev + 1, STEPS.length - 1))
  }

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0))

  const handleSubmit = async () => {
    const valid = validateStep(step)
    if (!valid) return

    try {
      await createProfile.mutateAsync({
        firstName: profile.personal.fullName.split(' ')[0],
        lastName: profile.personal.fullName.split(' ').slice(1).join(' '),
        gender: profile.personal.gender.toUpperCase(),
        dateOfBirth: profile.personal.dateOfBirth,
        nationality: profile.personal.nationality,
        stateOfOrigin: profile.personal.stateOfOrigin,
        localGovernment: profile.personal.localGovernment,
        residentialAddress: profile.personal.residentialAddress,
        phoneNumber: profile.personal.phone,
        parentName: profile.parentGuardian.fullName,
        parentPhoneNumber: profile.parentGuardian.phone,
        parentEmail: profile.parentGuardian.email,
        parentAddress: profile.parentGuardian.address,
        emergencyContactName: profile.emergency.fullName,
        emergencyContactRelationship: profile.emergency.relationship,
        emergencyContactPhone: profile.emergency.phone,
        level: profile.academic.level,
      })
    } catch {
      alert('Registration failed. Please try again.')
      return
    }

    setProfile(profile)
    completeProfile()
    updateUser({ firstName: profile.personal.fullName.split(' ')[0], lastName: profile.personal.fullName.split(' ').slice(1).join(' ') })
    resetDraft()
    setShowSuccess(true)

    setTimeout(() => {
      navigate('/dashboard', { replace: true })
    }, 1200)
  }

  return (
    <div className="mx-auto max-w-3xl py-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Complete Your Profile</h1>
        <p className="text-muted-foreground">Finish your student registration to access the portal.</p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((s, index) => {
            const Icon = s.icon
            const active = index === step
            const completed = index < step
            return (
              <div key={s.key} className="flex flex-1 flex-col items-center">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors',
                    active
                      ? 'border-primary bg-primary text-primary-foreground'
                      : completed
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-background text-muted-foreground',
                  )}
                >
                  {completed ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>
                <span
                  className={cn(
                    'mt-2 hidden text-xs font-medium sm:block',
                    active ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {s.label}
                </span>
              </div>
            )
          })}
        </div>
        <div className="relative mt-3 h-1 w-full rounded-full bg-muted">
          <motion.div
            className="absolute left-0 top-0 h-full rounded-full bg-primary"
            initial={false}
            animate={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{STEPS[step].label}</CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
              className="space-y-5"
            >
              {step === 0 && (
                <PersonalStep
                  data={profile.personal}
                  passportPreview={passportPreview}
                  passportFile={passportFile}
                  errors={errors}
                  touched={touched}
                  onChange={setField}
                  onPassportChange={handlePassportChange}
                />
              )}
              {step === 1 && (
                <ParentGuardianStep
                  data={profile.parentGuardian}
                  errors={errors}
                  touched={touched}
                  onChange={setField}
                />
              )}
              {step === 2 && (
                <EmergencyStep
                  data={profile.emergency}
                  errors={errors}
                  touched={touched}
                  onChange={setField}
                />
              )}
              {step === 3 && (
                <AcademicStep
                  data={profile.academic}
                  errors={errors}
                  touched={touched}
                  onChange={setField}
                />
              )}
              {step === 4 && <ReviewStep profile={profile} />}
            </motion.div>
          </AnimatePresence>

          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 rounded-lg bg-success/10 p-4 text-center text-success"
            >
              <CheckCircle2 className="mx-auto mb-2 h-6 w-6" />
              <p className="font-medium">Registration completed successfully!</p>
              <p className="text-sm">Redirecting to your dashboard...</p>
            </motion.div>
          )}

          <div className="mt-8 flex items-center justify-between">
            <Button variant="outline" onClick={handleBack} disabled={step === 0 || createProfile.isPending}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            {step < STEPS.length - 1 ? (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={createProfile.isPending}>
                {createProfile.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Registration
                    <CheckCircle2 className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface StepProps<T> {
  data: T
  errors: RegistrationErrors
  touched: Set<string>
  onChange: <K extends keyof StudentProfile>(section: K, field: keyof StudentProfile[K], value: unknown) => void
}

function PersonalStep({
  data,
  passportPreview,
  passportFile,
  errors,
  touched,
  onChange,
  onPassportChange,
}: StepProps<StudentProfile['personal']> & {
  passportPreview: string
  passportFile: File | null
  onPassportChange: (file: File | null) => void
}) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="relative h-32 w-32 overflow-hidden rounded-lg border-2 border-dashed border-border bg-muted">
          {passportPreview ? (
            <img src={passportPreview} alt="Passport preview" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
              <Upload className="h-8 w-8" />
              <span className="mt-1 text-xs">Upload photo</span>
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <Label htmlFor="passport">
            Passport Photograph <span className="text-destructive">*</span>
          </Label>
          <Label
            htmlFor="passport"
            className="flex h-9 w-full max-w-full cursor-pointer items-center gap-2 overflow-hidden rounded-md border border-input px-3 text-sm shadow-xs"
          >
            <Upload className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="min-w-0 truncate text-muted-foreground">
              {passportFile ? passportFile.name : 'Choose file'}
            </span>
          </Label>
          <Input
            id="passport"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => onPassportChange(e.target.files?.[0] ?? null)}
          />
          <p className="text-xs text-muted-foreground">JPEG or PNG, max 2MB.</p>
          <FieldError name="personal.passportUrl" errors={errors} touched={touched.has('personal.passportUrl')} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          label="Full Name"
          required
          value={data.fullName}
          onChange={(v) => onChange('personal', 'fullName', v)}
          error={errors['personal.fullName']}
          touched={touched.has('personal.fullName')}
        />
        <SelectField
          label="Gender"
          required
          value={data.gender}
          onChange={(v) => onChange('personal', 'gender', v)}
          options={GENDERS}
          error={errors['personal.gender']}
          touched={touched.has('personal.gender')}
        />
        <TextField
          label="Date of Birth"
          type="date"
          required
          value={data.dateOfBirth}
          onChange={(v) => onChange('personal', 'dateOfBirth', v)}
          error={errors['personal.dateOfBirth']}
          touched={touched.has('personal.dateOfBirth')}
        />
        <TextField
          label="Nationality"
          required
          value={data.nationality}
          onChange={(v) => onChange('personal', 'nationality', v)}
          error={errors['personal.nationality']}
          touched={touched.has('personal.nationality')}
        />
        <TextField
          label="State of Origin"
          required
          value={data.stateOfOrigin}
          onChange={(v) => onChange('personal', 'stateOfOrigin', v)}
          error={errors['personal.stateOfOrigin']}
          touched={touched.has('personal.stateOfOrigin')}
        />
        <TextField
          label="Local Government Area"
          required
          value={data.localGovernment}
          onChange={(v) => onChange('personal', 'localGovernment', v)}
          error={errors['personal.localGovernment']}
          touched={touched.has('personal.localGovernment')}
        />
        <TextField
          label="Email Address"
          type="email"
          required
          value={data.email}
          onChange={(v) => onChange('personal', 'email', v)}
          error={errors['personal.email']}
          touched={touched.has('personal.email')}
        />
        <TextField
          label="Phone Number"
          required
          value={data.phone}
          onChange={(v) => onChange('personal', 'phone', v)}
          error={errors['personal.phone']}
          touched={touched.has('personal.phone')}
        />
      </div>
      <TextField
        label="Residential Address"
        required
        value={data.residentialAddress}
        onChange={(v) => onChange('personal', 'residentialAddress', v)}
        error={errors['personal.residentialAddress']}
        touched={touched.has('personal.residentialAddress')}
      />
    </div>
  )
}

function ParentGuardianStep({ data, errors, touched, onChange }: StepProps<StudentProfile['parentGuardian']>) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <TextField
        label="Parent/Guardian Full Name"
        required
        value={data.fullName}
        onChange={(v) => onChange('parentGuardian', 'fullName', v)}
        error={errors['parentGuardian.fullName']}
        touched={touched.has('parentGuardian.fullName')}
      />
      <TextField
        label="Relationship"
        required
        value={data.relationship}
        onChange={(v) => onChange('parentGuardian', 'relationship', v)}
        error={errors['parentGuardian.relationship']}
        touched={touched.has('parentGuardian.relationship')}
      />
      <TextField
        label="Phone Number"
        required
        value={data.phone}
        onChange={(v) => onChange('parentGuardian', 'phone', v)}
        error={errors['parentGuardian.phone']}
        touched={touched.has('parentGuardian.phone')}
      />
      <TextField
        label="Email Address"
        type="email"
        value={data.email}
        onChange={(v) => onChange('parentGuardian', 'email', v)}
        error={errors['parentGuardian.email']}
        touched={touched.has('parentGuardian.email')}
      />
      <div className="md:col-span-2">
        <TextField
          label="Residential Address"
          required
          value={data.address}
          onChange={(v) => onChange('parentGuardian', 'address', v)}
          error={errors['parentGuardian.address']}
          touched={touched.has('parentGuardian.address')}
        />
      </div>
    </div>
  )
}

function EmergencyStep({ data, errors, touched, onChange }: StepProps<StudentProfile['emergency']>) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <TextField
        label="Contact Name"
        required
        value={data.fullName}
        onChange={(v) => onChange('emergency', 'fullName', v)}
        error={errors['emergency.fullName']}
        touched={touched.has('emergency.fullName')}
      />
      <TextField
        label="Relationship"
        required
        value={data.relationship}
        onChange={(v) => onChange('emergency', 'relationship', v)}
        error={errors['emergency.relationship']}
        touched={touched.has('emergency.relationship')}
      />
      <TextField
        label="Phone Number"
        required
        value={data.phone}
        onChange={(v) => onChange('emergency', 'phone', v)}
        error={errors['emergency.phone']}
        touched={touched.has('emergency.phone')}
      />
      <div className="md:col-span-2">
        <TextField
          label="Residential Address"
          required
          value={data.address}
          onChange={(v) => onChange('emergency', 'address', v)}
          error={errors['emergency.address']}
          touched={touched.has('emergency.address')}
        />
      </div>
    </div>
  )
}

function AcademicStep({ data, errors, touched, onChange }: StepProps<StudentProfile['academic']>) {
  const departments = DEPARTMENTS[data.faculty] ?? []

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <SelectField
        label="Programme"
        required
        value={data.programme}
        onChange={(v) => onChange('academic', 'programme', v)}
        options={PROGRAMMES.map((p) => ({ value: p, label: p }))}
        error={errors['academic.programme']}
        touched={touched.has('academic.programme')}
      />
      <SelectField
        label="Faculty"
        required
        value={data.faculty}
        onChange={(v) => {
          onChange('academic', 'faculty', v)
          onChange('academic', 'department', '')
        }}
        options={FACULTIES.map((f) => ({ value: f, label: f }))}
        error={errors['academic.faculty']}
        touched={touched.has('academic.faculty')}
      />
      {data.faculty ? (
        <SelectField
          label="Department"
          required
          value={data.department}
          onChange={(v) => onChange('academic', 'department', v)}
          options={departments.map((d) => ({ value: d, label: d }))}
          error={errors['academic.department']}
          touched={touched.has('academic.department')}
        />
      ) : (
        <div className="space-y-2">
          <Label>
            Department<span className="text-destructive"> *</span>
          </Label>
          <div className="flex h-9 items-center rounded-md border border-input bg-muted/50 px-3 text-sm text-muted-foreground">
            Select a faculty first
          </div>
        </div>
      )}
      <SelectField
        label="Level"
        required
        value={data.level}
        onChange={(v) => onChange('academic', 'level', v)}
        options={LEVELS.map((l) => ({ value: l, label: `${l} Level` }))}
        error={errors['academic.level']}
        touched={touched.has('academic.level')}
      />
    </div>
  )
}

function ReviewStep({ profile }: { profile: StudentProfile }) {
  const sections = [
    { title: 'Personal Information', data: profile.personal },
    { title: 'Parent/Guardian Information', data: profile.parentGuardian },
    { title: 'Emergency Contact', data: profile.emergency },
    { title: 'Academic Information', data: profile.academic },
  ]

  return (
    <div className="space-y-6">
      {profile.personal.passportUrl && (
        <div className="flex items-center gap-4">
          <img
            src={profile.personal.passportUrl}
            alt="Passport"
            className="h-20 w-20 rounded-lg object-cover"
          />
          <div>
            <p className="font-medium">{profile.personal.fullName}</p>
            <p className="text-sm text-muted-foreground">{profile.personal.email}</p>
          </div>
        </div>
      )}
      {sections.map((section) => (
        <div key={section.title}>
          <h3 className="mb-2 font-semibold">{section.title}</h3>
          <dl className="grid gap-2 sm:grid-cols-2">
            {Object.entries(section.data).map(([key, value]) => {
              if (key === 'passportUrl') return null
              return (
                <div key={key} className="rounded-md border border-border p-2">
                  <dt className="text-xs uppercase tracking-wide text-muted-foreground">{key}</dt>
                  <dd className="truncate text-sm font-medium">{value || '—'}</dd>
                </div>
              )
            })}
          </dl>
        </div>
      ))}
    </div>
  )
}

function TextField({
  label,
  value,
  onChange,
  required,
  type = 'text',
  error,
  touched,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  type?: string
  error?: string
  touched?: boolean
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={label}>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      <Input
        id={label}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error && touched}
      />
      <FieldError error={error} touched={touched} />
    </div>
  )
}

function SelectField({
  label,
  value,
  onChange,
  required,
  options,
  error,
  touched,
  disabled,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  options: { value: string; label: string }[]
  error?: string
  touched?: boolean
  disabled?: boolean
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={label}>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      <Select value={value || undefined} onValueChange={onChange}{...(disabled ? { disabled } : {})}>
        <SelectTrigger id={label} aria-invalid={!!error && touched} className="w-full justify-between">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent position="popper" className="w-full min-w-[var(--radix-select-trigger-width)]">
          {options.length === 0 && (
            <SelectItem value="__empty__" disabled>
              No options available
            </SelectItem>
          )}
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError error={error} touched={touched} />
    </div>
  )
}

function FieldError({
  name,
  error,
  touched,
  errors,
}: {
  name?: string
  error?: string
  touched?: boolean
  errors?: RegistrationErrors
}) {
  const message = name && errors ? errors[name] : error
  if (!message || !touched) return null
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-xs text-destructive"
    >
      {message}
    </motion.p>
  )
}
