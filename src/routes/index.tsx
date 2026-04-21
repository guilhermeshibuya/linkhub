import { BrowserRouter, Route, Routes } from 'react-router'
import { RegisterPage } from '../features/auth/pages/register'
import { EmailConfirmation } from '@/features/auth/pages/email-confirmation'
import { routes } from './routes-paths'
import { ProtectedRoute } from './protected-route'
import { LinksPage } from '@/features/links/pages/links'
import { SigninPage } from '@/features/auth/pages/signin'
import { CompleteProfilePage } from '@/features/auth/pages/complete-profile'
import { ResetPasswordPage } from '@/features/auth/pages/reset-password'
import { ChangePasswordPage } from '@/features/auth/pages/change-password'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.register} element={<RegisterPage />} />
        <Route path={routes.signin} element={<SigninPage />} />
        <Route
          path={routes.emailConfirmation}
          element={<EmailConfirmation />}
        />
        <Route path={routes.resetPassword} element={<ResetPasswordPage />} />
        <Route path={routes.changePassword} element={<ChangePasswordPage />} />
        <Route
          path={routes.links}
          element={
            <ProtectedRoute>
              <LinksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.completeProfile}
          element={
            <ProtectedRoute>
              <CompleteProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
