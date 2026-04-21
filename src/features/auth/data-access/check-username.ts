import { supabase } from '@/services/supabse'

export const checkUsernameAvailability = async (username: string) => {
  const { data, error } = await supabase
    .from('public_usernames')
    .select('username')
    .ilike('username', username)
    .maybeSingle()

  if (error) return false

  return data === null
}
