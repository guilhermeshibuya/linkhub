import type { User } from '@supabase/supabase-js'
import { createContext } from 'react'

type AuthContextType = {
  user: User | null
  pageId: string | null
  loading: boolean
  signout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)
