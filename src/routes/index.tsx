import { BrowserRouter, Route, Routes } from 'react-router'
import { RegisterPage } from '../features/auth/pages/register'
import { EmailConfirmation } from '@/features/auth/pages/email-confirmation'
import { routes } from './routes-paths'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.register} element={<RegisterPage />} />
        <Route
          path={routes.emailConfirmation}
          element={<EmailConfirmation />}
        />
      </Routes>
    </BrowserRouter>
  )
}
