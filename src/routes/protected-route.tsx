import { useAuth } from '@/hooks/use-auth'
import { Navigate } from 'react-router'
import { routes } from './routes-paths'

export function ProtectedRoute({ children }: { children?: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) return <p>Loading...</p>
  if (!user) return <Navigate to={routes.signin} replace />

  return children
}
