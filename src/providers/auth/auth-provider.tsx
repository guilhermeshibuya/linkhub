import { useCallback, useEffect, useMemo, useState } from 'react'
import { AuthContext } from './auth-context'
import { type User } from '@supabase/supabase-js'
import { supabase } from '@/services/supabse'

type AuthState = {
  user: User | null
  loading: boolean
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
  })

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null

      setAuthState((prev) => {
        if (prev.user?.id === currentUser?.id && prev.loading === false) {
          return prev
        }
        return { user: currentUser, loading: false }
      })
    })

    return () => subscription.unsubscribe()
  }, [])

  const signout = useCallback(async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error)
    }
  }, [])

  const contextValue = useMemo(
    () => ({ ...authState, signout }),
    [authState, signout],
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
