import { useTranslation } from 'react-i18next'
import { AuthLayout } from '../layout/auth-layout'
import { Field, FieldLabel } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Lock } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { passwordSchema, type PasswordSchema } from '../schemas/password-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { changePassword } from '../data-access/change-password'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { routes } from '@/routes/routes-paths'

export function ChangePasswordPage() {
  const [globalError, setGlobalError] = useState<string>('')
  const { t } = useTranslation()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordSchema>({
    defaultValues: {
      password: '',
    },
    resolver: zodResolver(passwordSchema),
  })

  const onSubmit = async (data: PasswordSchema) => {
    const { error } = await changePassword(data.password)

    if (error) {
      setGlobalError(t('auth.changePassword.error'))
      return
    }

    setGlobalError('')
    // to-do toast?
    navigate(routes.links)
  }
  return (
    <AuthLayout>
      <div className="space-y-3">
        <h1>{t('auth.changePassword.title')}</h1>
        <p>{t('auth.changePassword.description')}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {globalError && <p className="text-red-500">{globalError}</p>}
        <Field>
          <FieldLabel id="password-label" htmlFor="password">
            {t('auth.password')}
          </FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <Lock />
            </InputGroupAddon>
            <InputGroupInput
              id="password"
              type="password"
              aria-labelledby="password-label"
              aria-invalid={!!errors.password}
              placeholder={t('auth.changePassword.inputPlaceholder')}
              {...register('password')}
            />
          </InputGroup>
          {errors.password && (
            <p className="text-red-500" role="alert">
              {errors.password.message}
            </p>
          )}
        </Field>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Spinner />
              {t('auth.loading')}
            </>
          ) : (
            t('auth.changePassword.submitButton')
          )}
        </Button>
      </form>
    </AuthLayout>
  )
}
