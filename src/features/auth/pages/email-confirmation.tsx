import { routes } from '@/routes/routes-paths'
import { Trans, useTranslation } from 'react-i18next'
import { Navigate, useLocation } from 'react-router'

export function EmailConfirmation() {
  const { t } = useTranslation()
  const location = useLocation()

  const userEmail = location.state?.email

  if (!userEmail) {
    return <Navigate to={routes.register} />
  }

  return (
    <main>
      <h1>{t('auth.emailConfirmation.title')}</h1>
      <Trans
        i18nKey="auth.emailConfirmation.description"
        values={{ email: userEmail }}
        components={{ bold: <strong /> }}
      />
    </main>
  )
}
