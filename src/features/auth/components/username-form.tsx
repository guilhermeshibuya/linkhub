import { Field, FieldLabel } from '@/components/ui/field'
import type { RegisterSchema } from '../schemas/register-schema'
import { useTranslation } from 'react-i18next'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group'
import { usernameSchema, type UsernameSchema } from '../schemas/username-schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { registerUser } from '../data-access/register-user'
import { Spinner } from '@/components/ui/spinner'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { routes } from '@/routes/routes-paths'
import { checkUsernameAvailability } from '../data-access/check-username'
import { useDebouncedCallback } from 'use-debounce'

interface UsernameFormProps {
  step1Data: RegisterSchema
}

export function UsernameForm({ step1Data }: UsernameFormProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [globalError, setGlobalError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<UsernameSchema>({
    resolver: zodResolver(usernameSchema),
  })

  const onSubmit = async (data: UsernameSchema) => {
    setGlobalError(null)
    const result = await registerUser({ ...step1Data, ...data })

    if (!result.success) {
      if (result.field === 'username') {
        setError('username', { message: t(result.message) })
      } else {
        setGlobalError(t(result.message))
      }
      return
    }
    navigate(routes.emailConfirmation, { state: { email: step1Data.email } })
  }

  const debouncedCheck = useDebouncedCallback(async (username: string) => {
    if (!username || username.length < 3) return

    const isAvailable = await checkUsernameAvailability(username)

    if (!isAvailable) {
      setError('username', { message: t('auth.errors.usernameAlreadyInUse') })
    } else {
      clearErrors('username')
    }
  }, 500)

  const usernameRegister = register('username', {
    onChange: (e) => debouncedCheck(e.target.value),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {globalError && <div className="text-red-500">{globalError}</div>}
      <Field>
        <FieldLabel id="username-label" htmlFor="username">
          {t('auth.username')}
        </FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText className="text-zinc-600 dark:text-zinc-400">
              linkhub.com/
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            id="username"
            type="text"
            aria-invalid={!!errors.username}
            aria-labelledby="username-label"
            {...usernameRegister}
          />
        </InputGroup>
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}
      </Field>
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
