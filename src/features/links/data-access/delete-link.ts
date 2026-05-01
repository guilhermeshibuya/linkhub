import { supabase } from '@/services/supabse'

export async function deleteLink(id: string) {
  await supabase.from('links').delete().eq('id', id).throwOnError()
}
