import { useTranslation } from 'react-i18next'
import { Field, FieldLabel } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Lock, Mail } from 'lucide-react'
import { signinSchema, type SigninSchema } from '../schemas/signin-schema'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Spinner } from '@/components/ui/spinner'
import { signinWithPassword } from '../data-access/signin-password'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { routes } from '@/routes/routes-paths'

const fields: {
  name: keyof SigninSchema
  type: string
  labelKey: string
  placeholderKey: string
  icon: React.ReactNode
}[] = [
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

export function SigninForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [globalError, setGlobalError] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninSchema>({
    resolver: zodResolver(signinSchema),
  })

  const onSubmit = async (formData: SigninSchema) => {
    const { error } = await signinWithPassword({ ...formData })

    if (error) {
      setGlobalError(t('auth.signinFailed'))
      return
    }
    setGlobalError('')
    navigate(routes.links)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {globalError && <div className="text-red-500">{globalError}</div>}
      {fields.map(({ name, type, labelKey, placeholderKey, icon }) => (
        <Field key={name}>
          <FieldLabel
            id={`${name}-label`}
            htmlFor={name}
            className="flex items-center justify-between"
          >
            {t(labelKey)}
            {name === 'password' && (
              <Link
                to={routes.resetPassword}
                className="text-primary hover:underline"
              >
                {t('auth.resetPassword.title')}
              </Link>
            )}
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
          t('auth.signIn')
        )}
      </Button>
    </form>
  )
}
