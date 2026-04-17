import { BrowserRouter, Route, Routes } from 'react-router'
import { RegisterPage } from '../features/auth/pages/register'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}
