import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Lock, Mail, User } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { registerSchema, type RegisterSchema } from '../schemas/register-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { checkEmailAvailability } from '../data-access/check-email'
import { useState } from 'react'
import { Spinner } from '@/components/ui/spinner'

const step1Fields: {
  name: keyof RegisterSchema
  type: string
  labelKey: string
  placeholderKey: string
  icon: React.ReactNode
}[] = [
  {
    name: 'name',
    type: 'text',
    labelKey: 'auth.name',
    placeholderKey: 'auth.namePlaceholder',
    icon: <User />,
  },
  {
    name: 'email',
    type: 'email',
    labelKey: 'auth.email',
    placeholderKey: 'auth.emailPlaceholder',
    icon: <Mail />,
  },
  {
    name: 'password',
    type: 'password',
    labelKey: 'auth.password',
    placeholderKey: 'auth.passwordPlaceholder',
    icon: <Lock />,
  },
]

interface RgisterFormProps {
  onComplete: (data: RegisterSchema) => void
  defaultValues?: Partial<RegisterSchema>
}

export function RegisterForm({ onComplete, defaultValues }: RgisterFormProps) {
  const { t } = useTranslation()
  const [globalError, setGlobalError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues,
  })

  const onSubmit = async (data: RegisterSchema) => {
    const emailAvailable = await checkEmailAvailability(data.email)
    if (!emailAvailable) {
      setGlobalError(t('auth.errors.emailAlreadyInUse'))
      return
    }
    setGlobalError(null)
    onComplete(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {globalError && <p className="text-red-500">{globalError}</p>}
      {step1Fields.map(({ name, type, labelKey, placeholderKey, icon }) => (
        <Field key={name}>
          <FieldLabel id={`${name}-label`} htmlFor={name}>
            {t(labelKey)}
          </FieldLabel>
          <InputGroup>
            <InputGroupAddon>{icon}</InputGroupAddon>
            <InputGroupInput
              id={name}
              type={type}
              placeholder={t(placeholderKey)}
              aria-invalid={!!errors[name]}
              aria-labelledby={`${name}-label`}
              {...register(name)}
            />
          </InputGroup>
          {errors[name] && (
            <span className="text-red-500">{errors[name]?.message}</span>
          )}
        </Field>
      ))}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Spinner />
            {t('auth.loading')}
          </>
        ) : (
          t('auth.continue')
        )}
      </Button>
    </form>
  )
}
