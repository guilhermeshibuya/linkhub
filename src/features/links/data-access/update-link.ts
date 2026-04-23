import { supabase } from '@/services/supabse'
import type { Link } from '../types/link'

export async function updateLink(linkId: string, updates: Partial<Link>) {
  const { error } = await supabase
    .from('links')
    .update({
      is_visible: updates.isVisible,
      position: updates.position,
      title: updates.title,
      url: updates.url,
    })
    .eq('id', linkId)

  return { error }
}
