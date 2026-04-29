import { useEffect, useState } from 'react'
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
    let isMounted = true

    async function initSession() {
      const { data } = await supabase.auth.getSession()
      const currentUser = data.session?.user ?? null

      if (!isMounted) return

      setAuthState({
        user: currentUser,
        loading: false,
      })
    }

    initSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null

      setAuthState({
        user: currentUser,
        loading: false,
      })
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ ...authState, signout }}>
      {children}
    </AuthContext.Provider>
  )
}
