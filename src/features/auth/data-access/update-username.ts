import { supabase } from '@/services/supabse'

export async function updateUsername(id: string, newUsername: string) {
  const { error } = await supabase
    .from('profiles')
    .update({ username: newUsername, is_default_username: false })
    .eq('id', id)

  return { error }
}
