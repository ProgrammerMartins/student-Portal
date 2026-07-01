import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  Loader2,
  Pencil,
  RotateCcw,
  Save,
  Upload,
  User,
  X,
} from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import { useStudentProfile, useUpdateStudentProfile } from '../hooks/use-student-profile'
import { useProfileStore } from '../stores/profile-store'
import type { StudentProfile } from '../types/profile'
import { cn } from '@/shared/utilities/cn'

const sectionOrder: { key: keyof StudentProfile; title: string }[] = [
  { key: 'personal', title: 'Personal Information' },
  { key: 'academic', title: 'Academic Information' },
  { key: 'parentGuardian', title: 'Parent/Guardian Information' },
  { key: 'emergency', title: 'Emergency Contact' },
]

export function ProfilePage() {
  const profile = useProfileStore((state) => state.profile)
  const { data: apiProfile, isLoading, isError } = useStudentProfile()
  const setProfile = useProfileStore((state) => state.setProfile)

  useEffect(() => {
    if (apiProfile && !profile) {
      setProfile({
        personal: {
          fullName: `${apiProfile.firstName ?? ''} ${apiProfile.lastName ?? ''}`.trim(),
          matricNumber: apiProfile.matricNumber ?? undefined,
          gender: ((apiProfile.gender ?? '').toLowerCase() ?? '') as '' | 'male' | 'female' | 'other',
          dateOfBirth: apiProfile.dateOfBirth?.split('T')[0] ?? '',
          nationality: apiProfile.nationality ?? '',
          stateOfOrigin: apiProfile.stateOfOrigin ?? '',
          localGovernment: apiProfile.localGovernment ?? '',
          residentialAddress: apiProfile.residentialAddress ?? '',
          email: apiProfile.user?.email ?? '',
          phone: apiProfile.phoneNumber ?? '',
          passportUrl: '',
        },
        parentGuardian: {
          fullName: apiProfile.parentName ?? '',
          relationship: '',
          phone: apiProfile.parentPhoneNumber ?? '',
          email: apiProfile.parentEmail ?? '',
          address: apiProfile.parentAddress ?? '',
        },
        emergency: {
          fullName: apiProfile.emergencyContactName ?? '',
          relationship: apiProfile.emergencyContactRelationship ?? '',
          phone: apiProfile.emergencyContactPhone ?? '',
          address: '',
        },
        academic: {
          programme: apiProfile.programme?.name ?? '',
          faculty: apiProfile.faculty?.name ?? '',
          department: apiProfile.department?.name ?? '',
          level: apiProfile.level ?? '',
        },
      })
    }
  }, [apiProfile, profile, setProfile])

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center text-muted-foreground">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Loading profile...
      </div>
    )
  }

  if (isError && !profile) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-muted-foreground">
        <User className="mb-3 h-10 w-10" />
        <p className="text-lg font-medium">Profile not found</p>
        <p className="text-sm">Complete your registration to create a profile.</p>
      </div>
    )
  }

  if (!profile || !profile.personal) return null

  return <ProfileEditor profile={profile} />
}

function ProfileEditor({ profile }: { profile: StudentProfile }) {
  const updateProfileStore = useProfileStore((state) => state.updateProfile)
  const updateMutation = useUpdateStudentProfile()
  const [isEditing, setIsEditing] = useState(false)
  const [values, setValues] = useState<StudentProfile>(structuredClone(profile))
  const [passportPreview, setPassportPreview] = useState(profile.personal.passportUrl)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showDiscardDialog, setShowDiscardDialog] = useState(false)

  useEffect(() => {
    if (!isEditing) {
      setValues(structuredClone(profile))
      setPassportPreview(profile.personal.passportUrl)
    }
  }, [profile, isEditing])

  const modifiedFields = useMemo(() => {
    const fields = new Set<string>()
    sectionOrder.forEach(({ key }) => {
      Object.entries(profile[key]).forEach(([field, originalValue]) => {
        const newValue = values[key][field as keyof StudentProfile[typeof key]]
        if (String(originalValue) !== String(newValue)) {
          fields.add(`${String(key)}.${field}`)
        }
      })
    })
    if (passportPreview !== profile.personal.passportUrl) {
      fields.add('personal.passportUrl')
    }
    return fields
  }, [profile, values, passportPreview])

  const isDirty = modifiedFields.size > 0

  const setField = <S extends keyof StudentProfile>(
    section: S,
    field: keyof StudentProfile[S],
    value: unknown,
  ) => {
    setValues((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }))
  }

  const handlePassportChange = (file: File | null) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be smaller than 2MB')
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => setPassportPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleSave = async () => {
    try {
      await updateMutation.mutateAsync({
        firstName: values.personal.fullName.split(' ')[0],
        lastName: values.personal.fullName.split(' ').slice(1).join(' '),
        gender: values.personal.gender.toUpperCase(),
        dateOfBirth: values.personal.dateOfBirth,
        nationality: values.personal.nationality,
        stateOfOrigin: values.personal.stateOfOrigin,
        localGovernment: values.personal.localGovernment,
        residentialAddress: values.personal.residentialAddress,
        phoneNumber: values.personal.phone,
        parentName: values.parentGuardian.fullName,
        parentPhoneNumber: values.parentGuardian.phone,
        parentEmail: values.parentGuardian.email,
        parentAddress: values.parentGuardian.address,
        emergencyContactName: values.emergency.fullName,
        emergencyContactRelationship: values.emergency.relationship,
        emergencyContactPhone: values.emergency.phone,
        level: values.academic.level,
      })
      updateProfileStore({
        ...values,
        personal: { ...values.personal, passportUrl: passportPreview },
      })
      setIsEditing(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch {
      alert('Failed to save profile. Please try again.')
    }
  }

  const handleCancel = () => {
    if (isDirty) {
      setShowDiscardDialog(true)
    } else {
      setIsEditing(false)
    }
  }

  const handleReset = () => {
    setValues(structuredClone(profile))
    setPassportPreview(profile.personal.passportUrl)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">View and manage your student information.</p>
        </div>
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={handleReset} disabled={!isDirty || updateMutation.isPending}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button variant="outline" onClick={handleCancel} disabled={updateMutation.isPending}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={!isDirty || updateMutation.isPending}>
                {updateMutation.isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Changes
              </Button>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="rounded-lg bg-success/10 p-4 text-success"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span className="font-medium">Profile updated successfully.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <div className="relative">
              <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-border bg-muted">
                {passportPreview ? (
                  <img src={passportPreview} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <User className="h-12 w-12" />
                  </div>
                )}
              </div>
              {isEditing && (
                <label className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform hover:scale-105">
                  <Upload className="h-4 w-4" />
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => handlePassportChange(e.target.files?.[0] ?? null)}
                  />
                </label>
              )}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-semibold">{profile.personal.fullName}</h2>
              <p className="text-muted-foreground">{profile.academic.programme} · {profile.academic.department}</p>
              <p className="text-sm text-muted-foreground">{profile.personal.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {sectionOrder.map(({ key, title }) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {Object.entries(profile[key]).map(([field, originalValue]) => {
                  if (field === 'passportUrl') return null

                  const fieldKey = `${String(key)}.${field}`
                  const isModified = modifiedFields.has(fieldKey)
                  const displayLabel = field.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())
                  const isReadonly = field === 'matricNumber'

                  if (!isEditing || isReadonly) {
                    return (
                      <div key={field} className="rounded-md border border-border p-3">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">{displayLabel}</p>
                        <p className="mt-1 truncate font-medium">{String(originalValue) || '—'}</p>
                      </div>
                    )
                  }

                  return (
                    <motion.div
                      key={field}
                      animate={isModified ? { backgroundColor: 'hsl(var(--warning) / 0.08)' } : {}}
                      className={cn(
                        'rounded-md border p-3 transition-colors',
                        isModified ? 'border-warning' : 'border-border',
                      )}
                    >
                      <Label htmlFor={fieldKey} className="text-xs uppercase tracking-wide text-muted-foreground">
                        {displayLabel}
                        {isModified && <span className="ml-2 text-warning">(modified)</span>}
                      </Label>
                      <Input
                        id={fieldKey}
                        value={String(values[key][field as keyof StudentProfile[typeof key]] ?? '')}
                        onChange={(e) => setField(key, field as keyof StudentProfile[typeof key], e.target.value)}
                        className="mt-2 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                      />
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showDiscardDialog} onOpenChange={setShowDiscardDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Discard unsaved changes?</DialogTitle>
            <DialogDescription>
              You have unsaved changes. Are you sure you want to discard them?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDiscardDialog(false)}>
              Keep Editing
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setShowDiscardDialog(false)
                setIsEditing(false)
                handleReset()
              }}
            >
              Discard Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
