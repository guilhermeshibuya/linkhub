import { useEffect, useState } from 'react'
import { AuthContext } from './auth-context'
import { type User } from '@supabase/supabase-js'
import { supabase } from '@/services/supabse'
import type { Profile } from '@/features/profiles/types/profile'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [pageId, setPageId] = useState<string | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
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
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (user === null) return

    async function fetchData() {
      const [{ data: pageData }, { data: profileData }] = await Promise.all([
        supabase
          .from('pages')
          .select('id')
          .eq('profile_id', user!.id)
          .maybeSingle(),
        supabase
          .from('profiles')
          .select('name, username, profilePictureUrl:profile_picture_url')
          .eq('id', user!.id)
          .maybeSingle(),
      ])
      setPageId(pageData?.id ?? null)
      setProfile(profileData ?? null)
      setLoading(false)
    }
    fetchData()
  }, [user])

  const signout = () => supabase.auth.signOut()

  return (
    <AuthContext.Provider value={{ user, pageId, profile, loading, signout }}>
      {children}
    </AuthContext.Provider>
  )
}
