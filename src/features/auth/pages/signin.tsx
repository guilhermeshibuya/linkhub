import { useTranslation } from 'react-i18next'
import { AuthLayout } from '../layout/auth-layout'
import { SigninForm } from '../components/signin-form'
import { Button } from '@/components/ui/button'
import { GoogleIcon } from '../components/google-icon'
import { handleGoogleLogin } from '../data-access/google-login'
import { Link, Navigate } from 'react-router'
import { routes } from '@/routes/routes-paths'
import { useAuth } from '@/hooks/use-auth'
import { Spinner } from '@/components/ui/spinner'

export function SigninPage() {
  const { user, loading } = useAuth()
  const { t } = useTranslation()

  if (loading) return <Spinner />
  if (user) return <Navigate to={`${routes.admin}/${routes.links}`} />

  return (
    <AuthLayout>
      <div className="space-y-3">
        <h1>{t('auth.welcomeBack')}</h1>
        <p>{t('auth.signinMessage')}</p>
      </div>
      <SigninForm />
      <p className="text-center text-zinc-600 dark:text-zinc-400">
        {t('auth.dontHaveAnAccount')}{' '}
        <Link to={routes.register} className="text-primary hover:underline">
          {t('auth.register')}
        </Link>
      </p>
      <div className="flex items-center gap-4">
        <div className="h-px w-full bg-low-contrast" />
        <p className="text-low-contrast">{t('auth.separator').toUpperCase()}</p>
        <div className="h-px w-full bg-low-contrast" />
      </div>
      <Button onClick={handleGoogleLogin} variant="outline">
        <GoogleIcon />
        {t('auth.continueWithGoogle')}
      </Button>
    </AuthLayout>
  )
}
