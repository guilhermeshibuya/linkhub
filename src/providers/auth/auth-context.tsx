import type { Profile } from '@/features/profiles/types/profile'
import type { User } from '@supabase/supabase-js'
import { createContext } from 'react'

type AuthContextType = {
  user: User | null
  pageId: string | null
  profile: Profile | null
  loading: boolean
  signout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)
