import { supabase } from '@/services/supabse'

export async function deleteLink(id: string) {
  const { error } = await supabase.from('links').delete().eq('id', id)

  return { error }
}
