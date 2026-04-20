import { supabase } from '@/services/supabse'

export const checkUsernameAvailability = async (username: string) => {
  const { data } = await supabase
    .from('profiles')
    .select('username')
    .eq('username', username)
    .maybeSingle()

  return data === null
}
