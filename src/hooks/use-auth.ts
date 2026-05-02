import { AuthContext } from '@/providers/auth/auth-context'
import { useContext } from 'react'

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context)
    throw new Error('useAuth must be used within an AuthStateProvider')
  return context
}
