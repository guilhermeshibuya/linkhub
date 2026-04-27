import { useEffect, useMemo, useState } from 'react'
import { AuthContext } from './auth-context'
import { type User } from '@supabase/supabase-js'
import { supabase } from '@/services/supabse'
import type { Profile } from '@/features/profiles/types/profile'

type AuthState = {
  user: User | null
  pageId: string | null
  profile: Profile | null
  loading: boolean
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    pageId: null,
    profile: null,
    loading: true,
  })

  useEffect(() => {
    let isMounted = true

    async function initSession() {
      const { data } = await supabase.auth.getSession()
      const currentUser = data.session?.user ?? null

      if (!isMounted) return

      setAuthState((prev) => ({
        ...prev,
        user: currentUser,
        loading: currentUser ? true : false,
      }))
    }

    initSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null

      setAuthState((prev) => {
        const isSameUser = prev.user?.id === currentUser?.id

        return {
          user: currentUser,
          pageId: isSameUser ? prev.pageId : null,
          profile: isSameUser ? prev.profile : null,
          loading: isSameUser ? false : currentUser ? true : false,
        }
      })
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    async function fetchUserData(user: User) {
      try {
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

        if (!isMounted) return

        setAuthState((prev) => ({
          ...prev,
          pageId: pageData?.id ?? null,
          profile: profileData ?? null,
          loading: false,
        }))
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        if (isMounted) {
          setAuthState((prev) => ({ ...prev, loading: false }))
        }
      }
    }

    if (!authState.user) return

    fetchUserData(authState.user)

    return () => {
      isMounted = false
    }
  }, [authState.user])

  const signout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error)
    }
  }

  const value = useMemo(
    () => ({
      user: authState.user,
      pageId: authState.pageId,
      profile: authState.profile,
      loading: authState.loading,
      signout,
    }),
    [authState],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
