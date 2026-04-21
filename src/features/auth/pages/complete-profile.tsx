import { Field, FieldLabel } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Navigate, useNavigate } from 'react-router'
import { checkUsernameAvailability } from '../data-access/check-username'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { AuthLayout } from '../layout/auth-layout'
import { usernameSchema, type UsernameSchema } from '../schemas/username-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/hooks/use-auth'
import { supabase } from '@/services/supabse'
import { useDebouncedCallback } from 'use-debounce'
import { routes } from '@/routes/routes-paths'
import { updateUsername } from '../data-access/update-username'

export function CompleteProfilePage() {
  const { user } = useAuth()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [defaultUsername, setDefaultUsername] = useState<string | null>(null)
  const [isDefaultUsername, setIsDefaultUsername] = useState(false)
  const [globalError, setGlobalError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UsernameSchema>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: '',
    },
  })

  useEffect(() => {
    async function fetchDefaultUsername() {
      if (!user) return
      const { data } = await supabase
        .from('profiles')
        .select('username, is_default_username')
        .eq('id', user.id)
        .single()

      if (!data) return

      setIsDefaultUsername(data.is_default_username)
      setDefaultUsername(data.username)
      reset({ username: data.username })
    }
    fetchDefaultUsername()
  }, [user, reset])

  const debouncedCheck = useDebouncedCallback(async (username: string) => {
    if (!username || username.length < 3) return
    if (username === defaultUsername) {
      clearErrors('username')
      return
    }

    const isUsernameAvailable = await checkUsernameAvailability(username)
    if (!isUsernameAvailable) {
      setError('username', { message: t('auth.errors.usernameAlreadyInUse') })
    } else {
      clearErrors('username')
    }
  }, 500)

  const onSubmit = async (data: UsernameSchema) => {
    setGlobalError(null)

    if (data.username === defaultUsername) {
      navigate(routes.links)
      return
    }

    const isUsernameAvailable = await checkUsernameAvailability(data.username)

    if (!isUsernameAvailable) {
      setError('username', { message: t('auth.errors.usernameAlreadyInUse') })
      return
    }

    const { error } = await updateUsername(user!.id, data.username)

    if (error) {
      setGlobalError(t('auth.errors.failedToUpdateUsername'))
    } else {
      navigate(routes.links)
    }
  }

  const usernameRegister = register('username', {
    onChange: (e) => debouncedCheck(e.target.value),
  })

  if (!user) {
    return null
  }

  if (!isDefaultUsername) return <Navigate to={routes.links} replace />

  return (
    <AuthLayout>
      <div className="space-y-3">
        <h1>{t('auth.createUsernameTitle')}</h1>
        <p>{t('auth.createUsernameDescription')}</p>
      </div>

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
    </AuthLayout>
  )
}
