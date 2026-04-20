import { RegisterForm } from '../components/register-form'
import { AuthLayout } from '../layout/auth-layout'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import type { RegisterSchema } from '../schemas/register-schema'
import { UsernameForm } from '../components/username-form'
import { ChevronLeft } from 'lucide-react'
import { AppleIcon } from '../components/apple-icon'
import { GoogleIcon } from '../components/google-icon'

export function RegisterPage() {
  const { t } = useTranslation()
  const [step, setStep] = useState<1 | 2>(1)
  const [step1Data, setStep1Data] = useState<RegisterSchema | null>(null)

  const handleStep1Complete = (data: RegisterSchema) => {
    setStep1Data(data)
    setStep(2)
  }

  return (
    <AuthLayout>
      {step === 1 ? (
        <>
          <div className="space-y-3">
            <h1>{t('auth.welcome')}</h1>
            <p>{t('auth.registerMessage')}</p>
          </div>
          <RegisterForm
            onComplete={handleStep1Complete}
            defaultValues={step1Data ?? undefined}
          />
          <p className="text-center text-zinc-600 dark:text-zinc-400">
            {t('auth.alreadyHaveAnAccount')} <span>{t('auth.signIn')}</span>
          </p>
          <div className="flex items-center gap-4">
            <div className="h-px w-full bg-low-contrast" />
            <p className="text-low-contrast">
              {t('auth.separator').toUpperCase()}
            </p>
            <div className="h-px w-full bg-low-contrast" />
          </div>
          <Button variant="outline">
            <GoogleIcon />
            {t('auth.continueWithGoogle')}
          </Button>
          <Button variant="outline">
            <AppleIcon /> {t('auth.continueWithApple')}
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="ghost"
            className="self-start"
            onClick={() => setStep(1)}
          >
            <ChevronLeft /> <span>{t('auth.back')}</span>
          </Button>
          <div className="space-y-3">
            <h1>{t('auth.createUsernameTitle')}</h1>
            <p>{t('auth.createUsernameDescription')}</p>
          </div>
          <UsernameForm step1Data={step1Data!} />
        </>
      )}
    </AuthLayout>
  )
}
