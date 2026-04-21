import { Trans, useTranslation } from 'react-i18next'
import { AuthLayout } from '../layout/auth-layout'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Mail, MailCheck } from 'lucide-react'
import { useNavigate } from 'react-router'
import { Field, FieldLabel } from '@/components/ui/field'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { emailSchema } from '../schemas/email-schema'
import type { EmailSchema } from '../schemas/email-schema'
import { sendResetPasswordEmail } from '../data-access/reset-password'
import { useState } from 'react'
import { Spinner } from '@/components/ui/spinner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function ResetPasswordPage() {
  const [globalError, setGlobalError] = useState<string>('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { t } = useTranslation()
  const navigate = useNavigate()

  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailSchema>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(emailSchema),
  })

  const onSubmit = async (data: EmailSchema) => {
    const { error } = await sendResetPasswordEmail(data.email)

    if (error) {
      setGlobalError(t('auth.resetPassword.sendError'))
      return
    }

    setGlobalError('')
    setIsDialogOpen(true)
  }

  return (
    <AuthLayout>
      <Button
        variant="ghost"
        className="self-start"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft /> <span>{t('auth.back')}</span>
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader className="flex flex-col items-center">
            <MailCheck size="48" className="text-primary" />
            <DialogTitle>
              <h1>{t('auth.resetPassword.checkEmailTitle')}</h1>
            </DialogTitle>
            <DialogDescription className="text-center">
              <Trans
                i18nKey="auth.resetPassword.checkEmailDescription"
                values={{ email: getValues('email') }}
                components={{ bold: <strong /> }}
              />
            </DialogDescription>
          </DialogHeader>
          <Button>{t('close')}</Button>
        </DialogContent>
      </Dialog>
      <div className="space-y-3">
        <h1>{t('auth.resetPassword.title')}</h1>
        <p>{t('auth.resetPassword.description')}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {globalError && <p className="text-red-500">{globalError}</p>}
        <Field>
          <FieldLabel id="email-label" htmlFor="email">
            {t('auth.email')}
          </FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <Mail />
            </InputGroupAddon>
            <InputGroupInput
              id="email"
              type="email"
              aria-labelledby='email-label"'
              placeholder={t('auth.emailPlaceholder')}
              {...register('email')}
            />
          </InputGroup>
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </Field>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Spinner />
              {t('auth.loading')}
            </>
          ) : (
            t('auth.resetPassword.sendButton')
          )}
        </Button>
      </form>
    </AuthLayout>
  )
}
