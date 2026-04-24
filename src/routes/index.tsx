import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { RegisterPage } from '../features/auth/pages/register'
import { EmailConfirmation } from '@/features/auth/pages/email-confirmation'
import { routes } from './routes-paths'
import { ProtectedRoute } from './protected-route'
import { SigninPage } from '@/features/auth/pages/signin'
import { CompleteProfilePage } from '@/features/auth/pages/complete-profile'
import { ResetPasswordPage } from '@/features/auth/pages/reset-password'
import { ChangePasswordPage } from '@/features/auth/pages/change-password'
import { MyLinksPage } from '@/features/links/pages/my-links'
import { PublicPage } from '@/features/pages/pages/public-page'
import { DashboardLayout } from '@/layouts/dashboard-layout'

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

        <Route path={routes.publicPage} element={<PublicPage />} />

        <Route
          path={routes.admin}
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path={routes.links} element={<MyLinksPage />} />
          <Route path={routes.design} element={<div>Design Page</div>} />
          <Route path={routes.settings} element={<div>Settings Page</div>} />
        </Route>

        <Route
          path={routes.completeProfile}
          element={
            <ProtectedRoute>
              <CompleteProfilePage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to={routes.signin} />} />
      </Routes>
    </BrowserRouter>
  )
}
