import { useEffect, useState } from 'react'
import { AuthContext } from './auth-context'
import { type User } from '@supabase/supabase-js'
import { supabase } from '@/services/supabse'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [pageId, setPageId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user ?? null
      setUser(user)

      if (!user) {
        setPageId(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (user === null) return

    async function fetchPageId() {
      const { data } = await supabase
        .from('pages')
        .select('id')
        .eq('profile_id', user!.id)
        .maybeSingle()
      setPageId(data?.id ?? null)
      setLoading(false)
    }
    fetchPageId()
  }, [user])

  const signout = () => supabase.auth.signOut()

  return (
    <AuthContext.Provider value={{ user, pageId, loading, signout }}>
      {children}
    </AuthContext.Provider>
  )
}
