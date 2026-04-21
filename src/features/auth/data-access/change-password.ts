import { supabase } from '@/services/supabse'

export async function changePassword(password: string) {
  const { error } = await supabase.auth.updateUser({
    password,
  })

  return { error }
}
